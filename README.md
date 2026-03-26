# 📈 Crypto Exchange API

A REST API simulating a Cryptocurrency Exchange platform where users can manage assets, execute buy/sell transactions, and monitor their portfolios in real-time.

Built with a layered architecture (Controller-Service-Repository) to ensure a clear separation of concerns, scalability, and maintainability.

---

## 🏗️ Infrastructure & CI/CD Pipeline

This project embraces modern DevOps practices for continuous integration and delivery:
* **Fully Containerized:** Uses an optimized, multi-stage `Dockerfile` to separate the build environment from the lean production runtime.
* **Automated CI/CD (GitHub Actions):** Every push triggers a workflow that automatically installs dependencies, runs the linter, compiles TypeScript, and—upon success—builds and pushes the final Docker image to Docker Hub.

### 🐳 How to Run via Docker (Production Ready)
You can pull the latest automated build directly from Docker Hub without needing to compile the code yourself:

**1. Create your local environment file:**
```bash
cp .env.example .env
# Edit .env with your real MongoDB Atlas URI and CoinCap API Key
