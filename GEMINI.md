# Bike Parking Management Server

A specialized Node.js/TypeScript backend for managing bike parking facilities. It provides APIs for administrative control, customer management, and fee handling.

## Project Overview

- **Purpose:** Manage bike parking operations including admins, customers, and fees.
- **Main Technologies:**
  - **Runtime:** Node.js (>=18.0.0)
  - **Language:** TypeScript (using `.mts` and `.ts` extensions)
  - **Web Framework:** Express 5.x
  - **Database:** MongoDB via Mongoose
  - **Authentication:** JWT (JSON Web Tokens) and Bcrypt for password hashing
  - **Middleware:** `cors`, `cookie-parser`, `express-async-handler`
  - **Logging/CLI:** `chalk`

## Architecture

The project follows a modular **Routes-Controllers-Services-Models (RCSM)** architecture:

- `index.mts`: Entry point, middleware configuration, and route initialization.
- `routes/`: Express router definitions (e.g., `admin.mts`, `customer.mts`, `fee.mts`).
- `controllers/`: Handles incoming HTTP requests and delegates to services.
- `services/`: Contains the core business logic and database interactions.
- `schemas/`:
  - `models/`: Mongoose model definitions.
  - `types/`: TypeScript interface/type definitions for data structures.
- `middlewares/`: Custom Express middlewares (e.g., `auth-middleware.mts` for authentication and role-based access).
- `config/`: Configuration files like `db.mts` for database connection logic.
- `ROUTES.md`: Detailed API documentation for all endpoints, request bodies, and authentication requirements.

## Building and Running

### Prerequisites
- Node.js (>=18.0.0)
- MongoDB instance (Atlas or local)
- `.env` file with `MONGODB_URI`, `JWT_SECRET`, and `PORT` (defaults to 2500 if not set).

### Commands
- **Install Dependencies:** `npm install`
- **Build and Start:** `npm run start` (transpiles TS and runs the server)
- **Development Mode:** `npm run serve` (uses `nodemon` for auto-restarts)

## Deployment

The project is configured for deployment on **Vercel**.
- `vercel.json`: Configuration for Vercel deployment, including routing all requests to the `index.mts` entry point.
- The `NODE_ENV` environment variable is used to determine whether to start a local listener.

## Development Conventions

- **Project Structure:** Do **not** change the project's folder structure or organization.
- **Compilation:** Compiled files (e.g., `.js`, `.mjs`, `.d.ts`) must remain in the same directory as their source files. Do **not** configure or use a separate output directory like `dist/`, `build/`, or `out/`.
- **File Extensions:** Use `.mts` for files using ES Modules syntax and `.ts` for standard TypeScript. Note that imports in compiled code often refer to `.mjs` or `.js` counterparts.
- **Error Handling:** Use `express-async-handler` in controllers to catch async errors and pass them to the global error handler in `index.mts`.
- **Database:** Use Mongoose models stored in `schemas/models/`. Always define corresponding TypeScript types in `schemas/types/`.
- **Logic Separation:** Keep controllers thin; place business logic, hashing, and token generation in service files (`services/`).
- **Authentication:** Use the `requireAuth` and `requireRole` middlewares in routes to protect sensitive endpoints.
- **Environment Variables:** Always use `process.env` for sensitive configurations like database URIs and secrets.
