# 📈 Crypto Exchange API

A REST API simulating a Cryptocurrency Exchange platform where users can manage assets, execute buy/sell transactions, and monitor their portfolios in real-time.

Built with a layered architecture (Controller-Service-Repository) to ensure a clear separation of concerns, scalability, and maintainability.

## 🚀 Core Functionalities

* **JWT Authentication:** Secure route protection and user session management.
* **Asset Catalog:** Full CRUD operations for digital assets with dynamic price refreshing.
* **Transactions:** Real-time buy/sell management with price capturing at the exact moment of the transaction.
* **Advanced Portfolio Aggregation:** Dynamic portfolio calculation using MongoDB Aggregation Pipelines (`$group`, `$lookup`, `$cond`).
* **CoinCap API Integration:** Fetches live market prices from an external API.
* **Cache Fallback System:** Implemented a reliable fallback mechanism that serves cached memory prices in case the external CoinCap API fails.

## 🛠️ Development Highlights

* Designed complex data aggregation pipelines for real-time analytics.
* Utilized AI tools for Pair Programming, specifically to optimize Mongoose search queries and refine TypeScript/Express request typings.

🎥 **[Watch the Video Demonstration](https://drive.google.com/file/d/1Wq3LYdQvkOeBV_a6x23l6bCZuS28qTKC/view?usp=sharing)**
