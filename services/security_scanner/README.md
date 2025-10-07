# 🛡️ Trivy Security Scanner (FastAPI)

A FastAPI service that scans Docker images for vulnerabilities using Trivy.

## Run with Docker
```bash
docker build -t trivy-scanner .
docker run -p 8000:8000 trivy-scanner

