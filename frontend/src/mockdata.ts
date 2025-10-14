/**
 * Mock Data for Docker Compose Generator
 *
 * This file contains mock data for testing and development.
 * Update this file to quickly change test data across the application.
 */

// ============================================================================
// DOCKER HUB SERVICE CATALOG
// ============================================================================

export interface DockerImage {
  id: string;
  name: string;
  description: string;
  official: boolean;
  verified: boolean;
  pulls: number;
  stars: number;
  logo?: string;
  category: string;
  tags: string[];
  latestTag: string;
}

export const mockDockerImages: DockerImage[] = [
  {
    id: "1",
    name: "nginx",
    description: "Official build of Nginx - high performance web server",
    official: true,
    verified: true,
    pulls: 1500000000,
    stars: 18500,
    category: "Web Servers",
    tags: ["latest", "1.25.3", "1.25-alpine", "1.24.0", "alpine", "stable"],
    latestTag: "1.25.3",
  },
  {
    id: "2",
    name: "postgres",
    description:
      "PostgreSQL is a powerful, open source object-relational database system",
    official: true,
    verified: true,
    pulls: 800000000,
    stars: 12300,
    category: "Databases",
    tags: ["latest", "16", "15", "14", "16-alpine", "15.4", "14.9"],
    latestTag: "16",
  },
  {
    id: "3",
    name: "redis",
    description: "Redis is an open source key-value store",
    official: true,
    verified: true,
    pulls: 1200000000,
    stars: 11200,
    category: "Databases",
    tags: ["latest", "7.2", "7.0", "6.2", "7.2-alpine", "alpine"],
    latestTag: "7.2",
  },
  {
    id: "4",
    name: "mysql",
    description: "MySQL is the world's most popular open source database",
    official: true,
    verified: true,
    pulls: 950000000,
    stars: 14100,
    category: "Databases",
    tags: ["latest", "8.1", "8.0", "5.7", "8.0.35", "oracle"],
    latestTag: "8.1",
  },
  {
    id: "5",
    name: "mongodb",
    description:
      "MongoDB document databases provide high availability and easy scalability",
    official: true,
    verified: true,
    pulls: 650000000,
    stars: 9800,
    category: "Databases",
    tags: ["latest", "7.0", "6.0", "5.0", "7.0.2", "6.0.11"],
    latestTag: "7.0",
  },
  {
    id: "6",
    name: "node",
    description: "Node.js is a JavaScript runtime built on Chrome's V8 engine",
    official: true,
    verified: true,
    pulls: 1100000000,
    stars: 10500,
    category: "Programming Languages",
    tags: ["latest", "20", "18", "16", "20-alpine", "18-slim", "lts"],
    latestTag: "20",
  },
  {
    id: "7",
    name: "python",
    description:
      "Python is an interpreted, interactive, object-oriented, open-source programming language",
    official: true,
    verified: true,
    pulls: 980000000,
    stars: 8900,
    category: "Programming Languages",
    tags: ["latest", "3.12", "3.11", "3.10", "3.12-slim", "3.11-alpine"],
    latestTag: "3.12",
  },
  {
    id: "8",
    name: "traefik",
    description: "Traefik is a modern HTTP reverse proxy and load balancer",
    official: true,
    verified: true,
    pulls: 450000000,
    stars: 7200,
    category: "Networking",
    tags: ["latest", "v2.10", "v2.9", "v3.0", "2.10.5"],
    latestTag: "v2.10",
  },
  {
    id: "9",
    name: "rabbitmq",
    description:
      "RabbitMQ is the most widely deployed open source message broker",
    official: true,
    verified: true,
    pulls: 380000000,
    stars: 5600,
    category: "Message Queues",
    tags: ["latest", "3.12", "3.11", "3.12-management", "3.11-alpine"],
    latestTag: "3.12",
  },
  {
    id: "10",
    name: "elasticsearch",
    description:
      "Elasticsearch is a distributed, RESTful search and analytics engine",
    official: false,
    verified: true,
    pulls: 420000000,
    stars: 6100,
    category: "Search Engines",
    tags: ["latest", "8.11.0", "8.10.4", "7.17.15"],
    latestTag: "8.11.0",
  },
];

export const mockCategories = [
  "All",
  "Web Servers",
  "Databases",
  "Programming Languages",
  "Networking",
  "Message Queues",
  "Search Engines",
  "Monitoring",
  "CI/CD",
  "Development Tools",
];

// ============================================================================
// VULNERABILITY SCAN RESULTS
// ============================================================================

export interface Vulnerability {
  cve: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  score: number;
  package: string;
  installedVersion: string;
  fixedVersion: string;
  description: string;
  publishedDate: string;
  references: string[];
}

export interface ScanResult {
  scanId: string;
  image: string;
  tag: string;
  status: "completed" | "scanning" | "failed";
  timestamp: string;
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    total: number;
  };
  vulnerabilities: Vulnerability[];
  recommendation: {
    action: "allow" | "warn" | "block";
    reason: string;
    alternatives: string[];
  };
}

export const mockScanResults: ScanResult[] = [
  {
    scanId: "scan_001",
    image: "nginx",
    tag: "1.21.0",
    status: "completed",
    timestamp: "2025-10-01T10:30:00Z",
    summary: {
      critical: 2,
      high: 5,
      medium: 12,
      low: 8,
      total: 27,
    },
    vulnerabilities: [
      {
        cve: "CVE-2021-23017",
        severity: "CRITICAL",
        score: 9.8,
        package: "nginx",
        installedVersion: "1.21.0",
        fixedVersion: "1.21.1",
        description:
          "A security issue in nginx resolver could allow an attacker to forge UDP packets from the DNS server.",
        publishedDate: "2021-06-01",
        references: [
          "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-23017",
          "https://nginx.org/en/security_advisories.html",
        ],
      },
      {
        cve: "CVE-2021-44228",
        severity: "CRITICAL",
        score: 10.0,
        package: "log4j",
        installedVersion: "2.14.1",
        fixedVersion: "2.17.0",
        description:
          "Apache Log4j2 JNDI features do not protect against attacker controlled LDAP and other JNDI related endpoints.",
        publishedDate: "2021-12-10",
        references: [
          "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44228",
        ],
      },
      {
        cve: "CVE-2021-3711",
        severity: "HIGH",
        score: 7.4,
        package: "openssl",
        installedVersion: "1.1.1k",
        fixedVersion: "1.1.1l",
        description: "Buffer overflow in OpenSSL SM2 decryption.",
        publishedDate: "2021-08-24",
        references: ["https://www.openssl.org/news/secadv/20210824.txt"],
      },
    ],
    recommendation: {
      action: "block",
      reason: "Contains 2 critical vulnerabilities",
      alternatives: ["nginx:1.25.3", "nginx:1.24.0", "nginx:1.25-alpine"],
    },
  },
  {
    scanId: "scan_002",
    image: "postgres",
    tag: "13",
    status: "completed",
    timestamp: "2025-10-01T10:32:00Z",
    summary: {
      critical: 0,
      high: 3,
      medium: 8,
      low: 15,
      total: 26,
    },
    vulnerabilities: [
      {
        cve: "CVE-2023-2454",
        severity: "HIGH",
        score: 7.5,
        package: "postgresql",
        installedVersion: "13.10",
        fixedVersion: "13.11",
        description:
          "PostgreSQL SECURITY DEFINER functions bypass row security policies.",
        publishedDate: "2023-05-11",
        references: [
          "https://www.postgresql.org/support/security/CVE-2023-2454/",
        ],
      },
    ],
    recommendation: {
      action: "warn",
      reason: "Contains 3 high severity vulnerabilities",
      alternatives: ["postgres:16", "postgres:15.4", "postgres:16-alpine"],
    },
  },
  {
    scanId: "scan_003",
    image: "redis",
    tag: "7.2",
    status: "completed",
    timestamp: "2025-10-01T10:33:00Z",
    summary: {
      critical: 0,
      high: 0,
      medium: 2,
      low: 5,
      total: 7,
    },
    vulnerabilities: [
      {
        cve: "CVE-2023-28425",
        severity: "MEDIUM",
        score: 5.5,
        package: "redis",
        installedVersion: "7.2.0",
        fixedVersion: "7.2.1",
        description:
          "Redis may allow authenticated users to use the MSETNX command to trigger a runtime assertion.",
        publishedDate: "2023-09-13",
        references: [
          "https://github.com/redis/redis/security/advisories/GHSA-mvmm-4vq6-vw8c",
        ],
      },
    ],
    recommendation: {
      action: "allow",
      reason: "No critical or high vulnerabilities found",
      alternatives: ["redis:7.2-alpine", "redis:7.2.1"],
    },
  },
];

// ============================================================================
// VALIDATION RESULTS
// ============================================================================

export interface ValidationIssue {
  id: string;
  severity: "blocker" | "warning" | "suggestion";
  category:
    | "port_conflict"
    | "environment"
    | "resource"
    | "volume"
    | "network"
    | "security"
    | "best_practice";
  service?: string;
  message: string;
  line?: number;
  suggestion: string;
  autoFix?: boolean;
  documentation?: string;
}

export interface ValidationResult {
  validationId: string;
  timestamp: string;
  overall: {
    valid: boolean;
    score: number;
    blockers: number;
    warnings: number;
    suggestions: number;
  };
  issues: ValidationIssue[];
  recommendations: string[];
}

export const mockValidationResult: ValidationResult = {
  validationId: "val_001",
  timestamp: "2025-10-01T10:35:00Z",
  overall: {
    valid: false,
    score: 65,
    blockers: 2,
    warnings: 5,
    suggestions: 8,
  },
  issues: [
    {
      id: "port_conflict_001",
      severity: "blocker",
      category: "port_conflict",
      service: "web",
      message: 'Port 80 is already used by service "nginx"',
      line: 12,
      suggestion: 'Use a different port, e.g., "8080:80"',
      autoFix: true,
    },
    {
      id: "port_conflict_002",
      severity: "blocker",
      category: "port_conflict",
      service: "api",
      message: 'Port 3000 conflicts with service "frontend"',
      line: 25,
      suggestion: 'Use port 3001 instead: "3001:3000"',
      autoFix: true,
    },
    {
      id: "env_missing_001",
      severity: "warning",
      category: "environment",
      service: "postgres",
      message: "Missing required environment variable: POSTGRES_PASSWORD",
      line: 35,
      suggestion: "Add: POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-changeme}",
      documentation: "https://hub.docker.com/_/postgres",
    },
    {
      id: "env_missing_002",
      severity: "warning",
      category: "environment",
      service: "redis",
      message: "Redis is running without authentication",
      line: 48,
      suggestion:
        'Add Redis password using command: ["redis-server", "--requirepass", "${REDIS_PASSWORD}"]',
      documentation: "https://redis.io/topics/security",
    },
    {
      id: "resource_001",
      severity: "warning",
      category: "resource",
      service: "web",
      message: "No memory limits defined",
      line: 15,
      suggestion:
        "Add resource limits:\n  deploy:\n    resources:\n      limits:\n        memory: 512M\n      reservations:\n        memory: 256M",
    },
    {
      id: "security_001",
      severity: "warning",
      category: "security",
      service: "database",
      message: "Container running in privileged mode",
      line: 42,
      suggestion:
        'Remove "privileged: true" or use specific capabilities instead',
      documentation:
        "https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities",
    },
    {
      id: "volume_001",
      severity: "warning",
      category: "volume",
      service: "app",
      message: "Host volume mount may cause permission issues",
      line: 55,
      suggestion: "Consider using named volumes instead of bind mounts",
    },
    {
      id: "best_practice_001",
      severity: "suggestion",
      category: "best_practice",
      service: "web",
      message: 'Using "latest" tag is not recommended',
      line: 10,
      suggestion: 'Specify explicit version tag, e.g., "nginx:1.25.3"',
    },
    {
      id: "best_practice_002",
      severity: "suggestion",
      category: "best_practice",
      service: "api",
      message: "No health check defined",
      line: 20,
      suggestion:
        'Add health check:\n  healthcheck:\n    test: ["CMD", "curl", "-f", "http://localhost:3000/health"]\n    interval: 30s\n    timeout: 10s\n    retries: 3',
    },
    {
      id: "best_practice_003",
      severity: "suggestion",
      category: "best_practice",
      service: "database",
      message: "No restart policy defined",
      line: 40,
      suggestion: "Add: restart: unless-stopped",
    },
  ],
  recommendations: [
    "Add health checks to all critical services",
    "Specify resource limits for production deployments",
    'Use specific image tags instead of "latest"',
    "Enable restart policies for all services",
    "Use named volumes for better data management",
    "Implement proper logging configuration",
    "Add network segmentation for security",
    "Use secrets for sensitive data instead of environment variables",
  ],
};

// ============================================================================
// TEMPLATES
// ============================================================================

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  icon?: string;
  services: number;
  popularity: number;
  version: string;
  lastUpdated: string;
  author: string;
}

export const mockTemplates: Template[] = [
  {
    id: "tpl_001",
    name: "LAMP Stack",
    description: "Linux, Apache, MySQL, PHP - Classic web development stack",
    category: "Web Applications",
    tags: ["php", "mysql", "apache", "web"],
    services: 3,
    popularity: 8500,
    version: "1.2.0",
    lastUpdated: "2025-09-15",
    author: "Docker Compose Generator",
  },
  {
    id: "tpl_002",
    name: "MEAN Stack",
    description: "MongoDB, Express, Angular, Node.js - Modern JavaScript stack",
    category: "Web Applications",
    tags: ["nodejs", "mongodb", "angular", "express"],
    services: 3,
    popularity: 7200,
    version: "2.0.1",
    lastUpdated: "2025-09-20",
    author: "Docker Compose Generator",
  },
  {
    id: "tpl_003",
    name: "MERN Stack",
    description: "MongoDB, Express, React, Node.js - React-based stack",
    category: "Web Applications",
    tags: ["nodejs", "mongodb", "react", "express"],
    services: 3,
    popularity: 9100,
    version: "2.1.0",
    lastUpdated: "2025-09-25",
    author: "Docker Compose Generator",
  },
  {
    id: "tpl_004",
    name: "WordPress + MySQL",
    description: "WordPress CMS with MySQL database",
    category: "CMS",
    tags: ["wordpress", "mysql", "php", "cms"],
    services: 2,
    popularity: 12000,
    version: "1.5.2",
    lastUpdated: "2025-09-28",
    author: "Docker Compose Generator",
  },
  {
    id: "tpl_005",
    name: "ELK Stack",
    description: "Elasticsearch, Logstash, Kibana - Log analysis platform",
    category: "Monitoring",
    tags: ["elasticsearch", "logstash", "kibana", "logging"],
    services: 3,
    popularity: 6400,
    version: "8.0.0",
    lastUpdated: "2025-09-10",
    author: "Docker Compose Generator",
  },
  {
    id: "tpl_006",
    name: "Microservices Starter",
    description: "API Gateway, Service Discovery, Config Server",
    category: "Microservices",
    tags: ["microservices", "api-gateway", "service-mesh"],
    services: 5,
    popularity: 5800,
    version: "1.0.0",
    lastUpdated: "2025-09-18",
    author: "Docker Compose Generator",
  },
  {
    id: "tpl_007",
    name: "PostgreSQL + pgAdmin",
    description: "PostgreSQL database with pgAdmin web interface",
    category: "Databases",
    tags: ["postgresql", "pgadmin", "database"],
    services: 2,
    popularity: 8900,
    version: "1.3.0",
    lastUpdated: "2025-09-22",
    author: "Docker Compose Generator",
  },
  {
    id: "tpl_008",
    name: "Redis Cluster",
    description: "Redis cluster setup with sentinel for high availability",
    category: "Databases",
    tags: ["redis", "cache", "cluster", "ha"],
    services: 6,
    popularity: 4200,
    version: "2.0.0",
    lastUpdated: "2025-09-12",
    author: "Docker Compose Generator",
  },
];

// ============================================================================
// COMPOSE FILE BUILDER
// ============================================================================

export interface ServiceConfig {
  id: string;
  name: string;
  image: string;
  tag: string;
  ports: { host: number; container: number; protocol: string }[];
  environment: { key: string; value: string }[];
  volumes: { type: "bind" | "volume"; source: string; target: string }[];
  networks: string[];
  dependsOn: string[];
  restart: string;
  healthCheck?: {
    test: string[];
    interval: string;
    timeout: string;
    retries: number;
  };
  resources?: {
    limits: { memory: string; cpus: string };
    reservations: { memory: string; cpus: string };
  };
}

export const mockServiceConfigs: ServiceConfig[] = [
  {
    id: "srv_001",
    name: "nginx",
    image: "nginx",
    tag: "1.25.3",
    ports: [
      { host: 80, container: 80, protocol: "tcp" },
      { host: 443, container: 443, protocol: "tcp" },
    ],
    environment: [
      { key: "NGINX_HOST", value: "localhost" },
      { key: "NGINX_PORT", value: "80" },
    ],
    volumes: [
      { type: "bind", source: "./nginx.conf", target: "/etc/nginx/nginx.conf" },
      { type: "volume", source: "nginx_logs", target: "/var/log/nginx" },
    ],
    networks: ["frontend"],
    dependsOn: [],
    restart: "unless-stopped",
    healthCheck: {
      test: ["CMD", "curl", "-f", "http://localhost"],
      interval: "30s",
      timeout: "10s",
      retries: 3,
    },
    resources: {
      limits: { memory: "512M", cpus: "0.5" },
      reservations: { memory: "256M", cpus: "0.25" },
    },
  },
  {
    id: "srv_002",
    name: "postgres",
    image: "postgres",
    tag: "16",
    ports: [{ host: 5432, container: 5432, protocol: "tcp" }],
    environment: [
      { key: "POSTGRES_DB", value: "myapp" },
      { key: "POSTGRES_USER", value: "admin" },
      { key: "POSTGRES_PASSWORD", value: "${POSTGRES_PASSWORD}" },
    ],
    volumes: [
      {
        type: "volume",
        source: "postgres_data",
        target: "/var/lib/postgresql/data",
      },
    ],
    networks: ["backend"],
    dependsOn: [],
    restart: "unless-stopped",
    healthCheck: {
      test: ["CMD-SHELL", "pg_isready -U admin"],
      interval: "10s",
      timeout: "5s",
      retries: 5,
    },
    resources: {
      limits: { memory: "1G", cpus: "1.0" },
      reservations: { memory: "512M", cpus: "0.5" },
    },
  },
  {
    id: "srv_003",
    name: "redis",
    image: "redis",
    tag: "7.2-alpine",
    ports: [{ host: 6379, container: 6379, protocol: "tcp" }],
    environment: [],
    volumes: [{ type: "volume", source: "redis_data", target: "/data" }],
    networks: ["backend"],
    dependsOn: [],
    restart: "unless-stopped",
    healthCheck: {
      test: ["CMD", "redis-cli", "ping"],
      interval: "5s",
      timeout: "3s",
      retries: 3,
    },
    resources: {
      limits: { memory: "256M", cpus: "0.25" },
      reservations: { memory: "128M", cpus: "0.1" },
    },
  },
];

// ============================================================================
// USAGE STATISTICS
// ============================================================================

export interface UsageStats {
  totalScans: number;
  scansToday: number;
  totalValidations: number;
  validationsToday: number;
  blockedDownloads: number;
  averageScanTime: number;
  mostScannedImages: { image: string; count: number }[];
  vulnerabilityTrends: {
    date: string;
    critical: number;
    high: number;
    medium: number;
    low: number;
  }[];
}

export const mockUsageStats: UsageStats = {
  totalScans: 15234,
  scansToday: 156,
  totalValidations: 12891,
  validationsToday: 142,
  blockedDownloads: 1847,
  averageScanTime: 12.5,
  mostScannedImages: [
    { image: "nginx", count: 2341 },
    { image: "postgres", count: 1987 },
    { image: "redis", count: 1654 },
    { image: "mysql", count: 1432 },
    { image: "node", count: 1289 },
  ],
  vulnerabilityTrends: [
    { date: "2025-09-25", critical: 45, high: 120, medium: 340, low: 890 },
    { date: "2025-09-26", critical: 42, high: 115, medium: 335, low: 885 },
    { date: "2025-09-27", critical: 38, high: 118, medium: 330, low: 875 },
    { date: "2025-09-28", critical: 35, high: 112, medium: 325, low: 870 },
    { date: "2025-09-29", critical: 32, high: 108, medium: 320, low: 865 },
    { date: "2025-09-30", critical: 30, high: 105, medium: 315, low: 860 },
    { date: "2025-10-01", critical: 28, high: 102, medium: 310, low: 855 },
  ],
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get mock Docker image by name
 */
export const getMockImageByName = (name: string): DockerImage | undefined => {
  return mockDockerImages.find((img) => img.name === name);
};

/**
 * Get mock scan result by image and tag
 */
export const getMockScanResult = (
  image: string,
  tag: string
): ScanResult | undefined => {
  return mockScanResults.find(
    (scan) => scan.image === image && scan.tag === tag
  );
};

/**
 * Get mock template by ID
 */
export const getMockTemplateById = (id: string): Template | undefined => {
  return mockTemplates.find((tpl) => tpl.id === id);
};

/**
 * Filter images by category
 */
export const filterImagesByCategory = (category: string): DockerImage[] => {
  if (category === "All") return mockDockerImages;
  return mockDockerImages.filter((img) => img.category === category);
};

/**
 * Search images by query
 */
export const searchImages = (query: string): DockerImage[] => {
  const lowerQuery = query.toLowerCase();
  return mockDockerImages.filter(
    (img) =>
      img.name.toLowerCase().includes(lowerQuery) ||
      img.description.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Generate sample compose file YAML
 */
export const generateSampleComposeYaml = (
  services: ServiceConfig[]
): string => {
  let yaml = 'version: "3.8"\n\nservices:\n';

  services.forEach((service) => {
    yaml += `  ${service.name}:\n`;
    yaml += `    image: ${service.image}:${service.tag}\n`;

    if (service.ports.length > 0) {
      yaml += "    ports:\n";
      service.ports.forEach((port) => {
        yaml += `      - "${port.host}:${port.container}"\n`;
      });
    }

    if (service.environment.length > 0) {
      yaml += "    environment:\n";
      service.environment.forEach((env) => {
        yaml += `      ${env.key}: ${env.value}\n`;
      });
    }

    yaml += `    restart: ${service.restart}\n\n`;
  });

  return yaml;
};

/**
 * Calculate security score
 */
export const calculateSecurityScore = (
  summary: ScanResult["summary"]
): number => {
  const weights = { critical: 10, high: 5, medium: 2, low: 1 };
  const totalIssues =
    summary.critical * weights.critical +
    summary.high * weights.high +
    summary.medium * weights.medium +
    summary.low * weights.low;

  return Math.max(0, 100 - totalIssues);
};

// ============================================================================
// EXPORT ALL
// ============================================================================

export default {
  images: mockDockerImages,
  categories: mockCategories,
  scanResults: mockScanResults,
  validationResult: mockValidationResult,
  templates: mockTemplates,
  serviceConfigs: mockServiceConfigs,
  usageStats: mockUsageStats,
  // Helper functions
  getMockImageByName,
  getMockScanResult,
  getMockTemplateById,
  filterImagesByCategory,
  searchImages,
  generateSampleComposeYaml,
  calculateSecurityScore,
};
