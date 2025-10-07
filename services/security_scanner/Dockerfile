FROM python:3.10-slim

WORKDIR /app
COPY . .
RUN pip install -r requirements.txt

RUN apt-get update && apt-get install -y wget
RUN wget https://github.com/aquasecurity/trivy/releases/download/v0.67.0/trivy_0.67.0_Linux-64bit.deb \
    && dpkg -i trivy_0.67.0_Linux-64bit.deb


EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

