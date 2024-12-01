terraform {
  required_providers {
    kind = {
      source  = "tehcyx/kind"
      version = "0.7.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.8"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "2.31.0"
    }
  }
}

provider "kind" {}

provider "helm" {
  kubernetes {
    config_path = kind_cluster.budget.kubeconfig_path
  }
}

provider "kubernetes" {
  config_path = kind_cluster.budget.kubeconfig_path
}

resource "kubernetes_namespace" "dashboard" {
  metadata {
    name = var.k8s_dashboard_namespace
  }
}

resource "kubernetes_service_account" "admin_user" {
  metadata {
    name      = "admin-user"
    namespace = var.k8s_dashboard_namespace
  }
}

resource "kubernetes_cluster_role_binding" "admin_user_binding" {
  metadata {
    name = "admin-user-binding"
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = "cluster-admin"
  }

  subject {
    kind      = "ServiceAccount"
    name      = kubernetes_service_account.admin_user.metadata[0].name
    namespace = var.k8s_dashboard_namespace
  }
}

resource "helm_release" "kubernetes_dashboard" {
  name       = "kubernetes-dashboard"
  chart      = "kubernetes-dashboard"
  repository = "https://kubernetes.github.io/dashboard/"
  namespace  = var.k8s_dashboard_namespace
  create_namespace = false

  values = []
}

resource "kind_cluster" "budget" {
  name           = var.cluster-name
  wait_for_ready = true
  kind_config {
    kind        = "Cluster"
    api_version = "kind.x-k8s.io/v1alpha4"
    node {
      role = "control-plane"
      extra_port_mappings {
        container_port = 30000
        host_port      = 30000
      }
      extra_port_mappings {
        container_port = 30001
        host_port      = 30001
      }
      extra_port_mappings {
        container_port = 30080
        host_port      = 30080
      }
      extra_port_mappings {
        container_port = 30900
        host_port      = 30900
      }
      extra_port_mappings {
        container_port = 30901
        host_port      = 30901
      }
      extra_port_mappings {
        container_port = 30902
        host_port      = 30902
      }
      extra_port_mappings {
        container_port = 30903
        host_port      = 30903
      }
    }
    node {
      role = "worker"
    }
    node {
      role = "worker"
    }
  }
}

resource "null_resource" "load_images" {
  provisioner "local-exec" {
    command = <<EOT
kind load docker-image postgres:15 budget-monorepo-backend budget-monorepo-frontend --name budget
EOT
  }
  depends_on = [kind_cluster.budget]
}

resource "helm_release" "budget_app" {
  name             = "budget"
  chart            = "./budget-app-chart"
  values           = [file("${path.module}/budget-app-chart/values.yaml")]
  namespace        = var.budget_namespace
  create_namespace = true

  depends_on = [kind_cluster.budget]
}

resource "kubernetes_namespace" "monitoring" {
  metadata {
    name = var.monitoring_namespace
  }
}

resource "null_resource" "load_additional_scrape_configs" {
  provisioner "local-exec" {
    command = <<EOT
kubectl apply -f additional-scrape-configs.yaml -n monitoring
EOT
  }
  depends_on = [kubernetes_namespace.monitoring, kind_cluster.budget]
}

resource "helm_release" "kube_prometheus_stack" {
  name             = "kube-prometheus-stack"
  chart            = "kube-prometheus-stack"
  repository       = "https://prometheus-community.github.io/helm-charts"
  namespace        = var.monitoring_namespace
  create_namespace = true

  values = [file("${path.module}/values/prometheus-values.yaml")]

  depends_on = [kind_cluster.budget]
}

resource "helm_release" "argocd" {
  name             = "argocd"
  chart            = "argo-cd"
  repository       = "https://argoproj.github.io/argo-helm"
  namespace        = var.argocd_namespace
  create_namespace = true

  values = [file("${path.module}/values/argocd-values.yaml")]

  depends_on = [kind_cluster.budget]
}
