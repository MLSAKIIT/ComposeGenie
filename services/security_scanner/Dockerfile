FROM aquasec/trivy:latest AS trivy-stage

FROM python:3.10-slim

WORKDIR /app
COPY . .
RUN pip install -r requirements.txt

# Copy Trivy binary from the official image
COPY --from=trivy-stage /usr/local/bin/trivy /usr/local/bin/trivy

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
