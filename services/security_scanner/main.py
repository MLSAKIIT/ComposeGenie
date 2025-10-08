from fastapi import FastAPI
import subprocess
import json
import os
from pathlib import Path
import shutil

app = FastAPI()


# Util: Ensure Trivy is installed and available for linux systems
def ensure_trivy_available():
    if shutil.which("trivy"):
        return True, ""

    install_dir = None
    for candidate in [Path("/usr/local/bin"), Path.home() / ".local/bin"]:
        try:
            candidate.mkdir(parents=True, exist_ok=True)
        except PermissionError:
            continue

        if os.access(candidate, os.W_OK | os.X_OK):
            install_dir = candidate
            break

    if install_dir is None:
        return False, "Couldn't find a writable directory to install Trivy."

    install_cmd = (
        "curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh "
        f"| sh -s -- -b {install_dir}"
    )

    process = subprocess.run(
        install_cmd,
        shell=True,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )

    if process.returncode != 0:
        error_output = process.stderr.strip() or process.stdout.strip()
        return False, f"Failed to install Trivy: {error_output}"

    os.environ["PATH"] = f"{install_dir}:{os.environ.get('PATH', '')}"

    if shutil.which("trivy"):
        return True, ""

    return False, "Trivy installation completed but the binary was not found on PATH."


# Endpoint to scan a Docker image
@app.get("/scan")
def scan_image(image_name: str):
    try:
        # Ensure Trivy is installed and available
        installed, message = ensure_trivy_available()

        if not installed:
            return {"error": message}

        # Run Trivy scan as subprocess
        result = subprocess.run(
            ["trivy", "image", "--format", "json", image_name],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        if result.returncode != 0:
            return {"error": result.stderr.strip()}

        # Parse Trivy JSON output
        trivy_output = json.loads(result.stdout)

        # Simplify output for frontend
        summary = [
            {
                "VulnerabilityID": vuln["VulnerabilityID"],
                "PkgName": vuln["PkgName"],
                "Severity": vuln["Severity"],
                "Title": vuln["Title"],
            }
            for result in trivy_output.get("Results", [])
            for vuln in result.get("Vulnerabilities", []) or []
        ]

        return {"image": image_name, "vulnerabilities": summary}
    except Exception as e:
        return {"error": str(e)}
