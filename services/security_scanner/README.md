# 🛡️ Trivy Security Scanner (FastAPI)

A FastAPI service that scans Docker images for vulnerabilities using Trivy.

## Run with Docker
```bash
docker build -t trivy-scanner .
docker run -p 8000:8000 trivy-scanner
```

## Run with Uvicorn
```bash
pip install -r requirements.txt
uvicorn main:app
```
## How To Use
- For scanning a Docker image, send a GET request to the `http://localhost:8000/scan?image=<image_name>`

- Example: `http://localhost:8000/scan?image=nginx:latest`
- The response will contain a summary of vulnerabilities found in the image.
