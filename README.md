# Bike Parking Management Server

A robust, specialized Node.js/TypeScript backend for managing bike parking facilities. This server provides a secure and scalable API for administrative control, customer registration, and fee management.

## 🚀 Features

- **Admin Management:** Secure registration and login for admins and managers with role-based access control (RBAC).
- **Customer Management:** Comprehensive CRUD operations for managing bike parking customers, including search and status tracking.
- **Fee Handling:** Track monthly parking fees, mark payments, and generate basic financial reports.
- **Secure Authentication:** JWT-based authentication with password hashing using Bcrypt.
- **TypeScript First:** Fully typed codebase for better maintainability and developer experience.
- **Cloud Ready:** Optimized for deployment on Vercel with MongoDB Atlas.

## 🛠️ Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/) (>=18.0.0)
- **Framework:** [Express 5.x](https://expressjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Authentication:** [JWT](https://jwt.io/) & [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Deployment:** [Vercel](https://vercel.com/)

## 📁 Project Structure

```text
├── config/             # Database connection logic
├── controllers/        # Request handlers (thin layer)
├── middlewares/        # Authentication and error handling
├── routes/             # API route definitions
├── schemas/
│   ├── models/        # Mongoose database models
│   └── types/         # TypeScript interface definitions
├── services/           # Business logic and DB interactions
├── index.mts           # Server entry point
└── ROUTES.md           # Detailed API documentation
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (>=18.0.0)
- MongoDB instance (Local or Atlas)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd server-bikeParking
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory and add the following:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=2500
    NODE_ENV=development
    ```

### Running the Server

- **Development Mode (with Auto-restart):**
  ```bash
  npm run serve
  ```
- **Production Build & Start:**
  ```bash
  npm run start
  ```

## 📖 API Documentation

Detailed documentation of all available endpoints, request bodies, and authentication requirements can be found in [ROUTES.md](./ROUTES.md).

### Core Endpoints Preview:
- `POST /api/admin/login` - Admin authentication
- `GET /api/customers` - List and search customers
- `POST /api/fees` - Create a fee record
- `GET /api/fees/reports/monthly/:month/:year` - Monthly financial report

## 🚀 Deployment

This project is pre-configured for **Vercel**. Simply connect your repository to Vercel, configure your environment variables, and it will deploy automatically.

## 📄 License

This project is licensed under the MIT License - see the [package.json](package.json) for details.

## 👨‍💻 Backend Partner

- **Mohammad Ilyas**

## 👨‍💻 Frontend Partner

- **Mohammad Shakir Barkati**

