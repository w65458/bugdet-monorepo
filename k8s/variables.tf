variable "cluster-name" {
  type = string
  default = "budget"
}

variable "budget_namespace" {
  type = string
  default = "budget"
}

variable "k8s_dashboard_namespace" {
  type = string
  default = "kubernetes-dashboard"
}

variable "monitoring_namespace" {
type = string
default = "monitoring"
}

variable "argocd_namespace" {
  type = string
  default = "argocd"
}

