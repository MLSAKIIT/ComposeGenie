# Contributing to ComposeGenie

We're excited that you're interested in contributing to Docker Compose Generator Web! This document provides guidelines and information to help you contribute effectively.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by respectful, inclusive, and collaborative behavior. We value diversity and welcome contributions from everyone.

## 🎯 Ways to Contribute

### 🐛 Bug Reports
- Use the GitHub issue tracker
- Include clear reproduction steps
- Provide system information (OS, Docker version, browser)
- Add screenshots for UI issues

### 💡 Feature Requests
- Describe the problem you're trying to solve
- Explain your proposed solution
- Consider backward compatibility
- Discuss implementation approach

### 📝 Documentation
- Improve existing documentation
- Add examples and tutorials
- Fix typos and clarify content
- Translate documentation

### 💻 Code Contributions
- Bug fixes
- Feature implementations
- Performance improvements
- Test coverage improvements

## 🏗️ Development Setup

### Prerequisites
```bash
# Core requirements
Node.js 22+
Python 3.9+
Go 1.20+
Docker & Docker Compose
MongoDB 8.0+
Redis 7.4+

# Development tools
Git
Your favorite IDE/editor
```

### Local Environment
```bash
# 1. Fork and clone the repository
git clone https://github.com/Sanjeev-Kumar78/docker_compose_generator.git
cd docker_compose_generator

# 2. Set up development dependencies
# Frontend
cd frontend 
npm install

# Backend
cd ../backend 
npm install

# 3. Start local services (MongoDB, Redis)
docker-compose -f docker-compose.dev.yml up -d

# 4. Configure environment variables
cp .env.example .env
# Edit .env with your local settings

# 5. Start development servers
# Terminal 1: Frontend
cd frontend 
npm run dev

# Terminal 2: Backend
cd backend 
npm run dev

# Terminal 3: Security Scanner
cd services/security-scanner 
python -m uvicorn main:app --reload

# Terminal 4: Template Generator
cd services/template-generator 
npm run dev

# Terminal 5: Config Validator
cd services/config-validator 
go run main.go
```

## 🔧 Development Workflow

### 1. Branch Strategy
```bash
# Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# or for bug fixes
git checkout -b fix/issue-description
```

### 2. Making Changes
- Follow existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new functionality
- Update documentation as needed

### 3. Testing Your Changes
```bash
# Frontend tests
cd frontend 
npm test

# Backend tests
cd backend 
npm test

# Integration tests
npm run test:integration

# End-to-end tests
npm run test:e2e
```

### 4. Code Quality
```bash
# Linting
npm run lint        # All projects
npm run lint:fix    # Auto-fix issues

# Type checking (if TypeScript)
npm run type-check

# Security audit
npm audit
```

## 📋 Pull Request Process

### Before Submitting
- [ ] Tests pass locally
- [ ] Code follows project conventions
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] Branch is up to date with main

### PR Template
When creating a pull request, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (for UI changes)
[Add screenshots here]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

### Review Process
1. **Automated Checks**: CI/CD pipeline runs tests and linting
2. **Code Review**: At least one maintainer reviews the code
3. **Testing**: Changes are tested in staging environment
4. **Approval**: Maintainer approves and merges

## 🏛️ Project Structure

### Frontend (React)
```
frontend/src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── services/        # API service functions
├── styles/          # Global styles and themes
└── __tests__/       # Test files
```

### Backend (Node.js)
```
backend/src/
├── routes/          # Express route definitions
├── controllers/     # Request handlers
├── services/        # Business logic
├── models/          # Database models
├── middleware/      # Custom middleware
├── utils/           # Utility functions
└── __tests__/       # Test files
```

### Services (Microservices)
Each service follows its language-specific conventions:
- **Python**: FastAPI with Pydantic models
- **Node.js**: Express with modular structure  
- **Go**: Gin with clean architecture

## 🎨 Code Style Guidelines

### JavaScript/TypeScript
- Use ESLint and Prettier configurations
- Prefer functional components and hooks
- Use async/await over Promises
- Write descriptive variable and function names

### Python
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions and classes
- Use Black for code formatting

### Go
- Follow Go community standards
- Use gofmt for formatting
- Write clear, idiomatic Go code
- Include error handling

### General
- Keep functions small and focused
- Write self-documenting code
- Add comments for complex logic
- Use consistent naming conventions

## 🧪 Testing Guidelines

### Unit Tests
- Test individual functions and components
- Mock external dependencies
- Aim for high code coverage
- Write descriptive test names

### Integration Tests
- Test API endpoints end-to-end
- Test service interactions
- Use test databases/environments
- Clean up test data

### E2E Tests
- Test critical user workflows
- Use tools like Cypress or Playwright
- Run in CI/CD pipeline
- Test across different browsers

## 📚 Documentation Standards

### Code Documentation
- Document complex algorithms
- Explain non-obvious design decisions
- Include usage examples
- Keep documentation up to date

### API Documentation
- Use Swagger specifications
- Include request/response examples
- Document error scenarios
- Provide authentication details

### User Documentation
- Write clear, step-by-step instructions
- Include screenshots and examples
- Cover common use cases
- Update with new features

## 🚀 Release Process

### Release Workflow
1. **Feature Freeze**: Stop merging new features
2. **Testing**: Comprehensive testing phase
3. **Documentation**: Update release notes and docs
4. **Deployment**: Deploy to production
5. **Post-Release**: Monitor and fix critical issues

## 🏆 Recognition

Contributors are recognized in:
- GitHub contributors page
- Release notes for significant contributions
- Project documentation
- Annual contributor highlights

---

Thank you for contributing to Docker Compose Generator Web! Together, we're making container deployment easier and more secure for everyone. 🎉
