# ComposeGenie

A comprehensive web portal for generating production-ready docker-compose files with automated security scanning, misconfiguration detection, and intelligent service recommendations from Docker Hub.

To be eligible for MLSA X HACKTOBERFEST: 
Register here: https://register.mlsakiit.com/
Star this repo: https://github.com/keploy/keploy


## Key Features

### 📦 Docker Hub Integration

- **Service Catalog**: Browse and search Docker Hub for official and verified images
- **Version Selection**: Choose from available image versions and tags
- **Automated Fetching**: Real-time service information from Docker Hub
- **Image Metadata**: View pulls, stars, descriptions, and documentation

### Security Scanning (Pre-Download)

- **Vulnerability Detection**: Scan images for CVEs before downloading compose file
- **Severity Assessment**: Identify critical, high, medium, and low vulnerabilities
- **Alternative Suggestions**: Automatically suggest safer image versions if severe issues found
- **Block Downloads**: Prevent downloading files with critical security issues
- **Risk Reports**: Detailed security assessment for each service

### Misconfiguration Detection

- **Port Conflict Detection**: Identify overlapping port mappings across services
- **Missing Environment Variables**: Detect required env vars not configured
- **Resource Limits**: Warn about missing CPU/memory constraints
- **Volume Mount Issues**: Validate volume paths and permissions
- **Network Configuration**: Check network settings and connectivity
- **Dependency Issues**: Validate service dependencies and startup order

### Intelligent Recommendations

- **Version Alternatives**: Suggest different image versions when vulnerabilities detected
- **Security Patches**: Recommend patched versions with fixes
- **Performance Optimization**: Suggest lighter or faster image alternatives
- **Best Practices**: Configuration improvements based on Docker standards

## 🏗️ Architecture

<img width="1283" height="492" alt="Untitled Diagram drawio" src="https://github.com/user-attachments/assets/eb4d2c4d-b2d0-416f-8af5-d4a88a5d8316" />

### Folder Structure
```
docker_compose_generator/
├── frontend/                  # React web portal
│   ├── src/components/       # UI components
│   │   ├── ServiceCatalog/   # Docker Hub service browser
│   │   ├── ComposerBuilder/  # Compose file builder
│   │   ├── SecurityDashboard/ # Vulnerability scan results
│   │   └── ValidationPanel/   # Misconfiguration warnings
│   └── src/pages/            # Application pages
├── backend/                   # Node.js API server
│   ├── src/routes/           # REST API endpoints
│   ├── src/controllers/      # Request handlers
│   ├── src/services/         # Business logic
│   │   ├── dockerhub.js      # Docker Hub API integration
│   │   ├── compose.js        # Compose file generation
│   │   └── validation.js     # Configuration validation
│   └── src/models/           # Database models
└── services/                  # Specialized microservices
    ├── security-scanner/      # CVE scanning (Python/FastAPI)
    ├── config-validator/      # Misconfiguration detection (Go)
    └── template-generator/    # Template management (Node.js)
```

## 🛠️ Technology Stack

### Frontend

- **React 19** with modern hooks and functional components
- **React Router 7** for client-side routing
- **TypeScript** for type-safe development
- **Tailwind CSS 4** for responsive UI design
- **Vite** for fast build and development

### Backend

- **Node.js** with Express framework
- **MongoDB** for data persistence (templates, scan cache)
- **Docker Hub API** for service catalog integration
- **Express Rate Limit** for API throttling
- **Winston** structured logging

### Microservices

- **Python/FastAPI** (Security Scanner) - Trivy integration for CVE scanning
- **Go/Gin** (Config Validator) - High-performance validation engine
- **Node.js/Express** (Template Generator) - Template management
- **Redis** for caching and job queuing
- **PostgreSQL** for scan results and analytics

## 🚦 Getting Started

### Prerequisites

- Node.js 22+ (LTS)
- Python 3.9+
- Go 1.21+
- MongoDB 8.0+
- Redis 7.4+
- Docker & Docker Compose

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Sanjeev-Kumar78/docker_compose_generator.git
cd docker_compose_generator

# Start all services with Docker Compose
docker-compose up -d

# Or run individual components:

# Frontend (React App)
cd frontend 
npm install
npm run dev

# Backend API
cd backend 
npm install 
npm run dev

# Microservices
cd services/security-scanner
python -m uvicorn main:app --reload
cd services/template-generator 
npm run dev
cd services/config-validator
go run main.go
```

The application (Local Runtime Endpoints) will be available at:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Security Scanner**: http://localhost:8001
- **Template Generator**: http://localhost:8002
- **Config Validator**: http://localhost:8003

## 🎯 Use Cases

### Development Teams

- **Quick Setup**: Browse Docker Hub and compose multi-service environments rapidly
- **Safe Dependencies**: Pre-scanned images ensure secure development environments
- **Error Prevention**: Catch port conflicts and missing configs before runtime
- **Learning Tool**: Understand service configurations and relationships

### DevOps Engineers

- **Production Deployment**: Generate secure, validated compose files
- **Security Compliance**: Automated vulnerability scanning before deployment
- **Configuration Validation**: Prevent common deployment failures
- **Version Management**: Evaluate and select safe image versions

### Security Teams

- **Vulnerability Prevention**: Block downloads with critical security issues
- **Risk Assessment**: Detailed security reports for all services
- **Compliance Checking**: Validate against security standards
- **Audit Trail**: Track security scan results and decisions

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTOR.md](CONTRIBUTOR.md) for guidelines on:

- Setting up the development environment
- Code style and standards
- Submitting pull requests
- Reporting issues

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Roadmap

- [x] Basic project structure
- [x] Frontend framework setup (React 19 + Vite + TypeScript)
- [ ] Docker Hub API integration for service catalog
- [ ] Docker Compose file builder UI
- [ ] Security scanner service (CVE detection)
- [ ] Configuration validator service (misconfiguration detection)
- [ ] Port conflict detection
- [ ] Missing environment variable detection
- [ ] Alternative version suggestion engine
- [ ] Download blocking for severe vulnerabilities
- [ ] Template management system
- [ ] Export options (Compose, Swarm, Kubernetes)
- [ ] CI/CD pipeline integration

## 📚 Documentation

- **[Architecture](ARCHITECTURE.md)**: Complete system architecture and data flows
- **[Quick Reference](docs/QUICK_REFERENCE.md)**: Quick start guide and API reference
- **[Backend README](backend/README.md)**: Backend API documentation
- **[Frontend README](frontend/README.md)**: Frontend documentation
- **[Services README](services/README.md)**: Microservices overview

## 📞 Support

- **Documentation**: [Wiki](https://github.com/Sanjeev-Kumar78/docker_compose_generator/wiki)
- **Issues**: [GitHub Issues](https://github.com/Sanjeev-Kumar78/docker_compose_generator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Sanjeev-Kumar78/docker_compose_generator/discussions)

---

**Made with ❤️ for the Docker community**
