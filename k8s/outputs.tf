output "kubernetes_dashboard_url" {
  value = "http://localhost:8443"
  description = "Lokalny URL Kubernetes Dashboard (wymagany kubectl port forward)."
}

output "argocd_url" {
  value = "http://localhost:30080"
  description = "Lokalny URL ArgoCD (NodePort)."
}

output "prometheus_url" {
  value = "http://localhost:30900"
  description = "Lokalny URL Prometheusa (NodePort)."
}

output "grafana_url" {
  value = "http://localhost:30901"
  description = "Lokalny URL Grafany (NodePort)."
}
