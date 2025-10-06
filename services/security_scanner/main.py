from fastapi import FastAPI
import subprocess
import json
import tempfile

app = FastAPI()

@app.get("/scan")
def scan_image(image_name: str):
    try:
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

