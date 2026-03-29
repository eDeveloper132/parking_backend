# API Documentation - Bike Parking Management Server

This document details the available endpoints, required fields, and authentication levels for the Bike Parking Management Server.

## Base URL
`https://parking-backend-xi.vercel.app/api` or `http://localhost:2500/api`

---

## 🔐 Authentication
Most routes require a JSON Web Token (JWT) in the `Cookie` or `Authorization` header.
- **Header:** `Authorization: Bearer <your_token>`
- **Cookie:** `token=<your_token>`

---

## 1. Admin & Authentication (`/admin`)

### Register Admin
- **Endpoint:** `POST /admin/register`
- **Auth:** Public
- **Body (JSON):**
  ```json
  {
    "name": "Full Name",
    "email": "admin@example.com",
    "password": "securepassword",
    "mobile": "03001234567",
    "role": "admin" // or "manager"
  }
  ```

### Login Admin
- **Endpoint:** `POST /admin/login`
- **Auth:** Public
- **Body (JSON):**
  ```json
  {
    "email": "admin@example.com",
    "password": "securepassword"
  }
  ```
- **Response:** Returns `success: true`, `admin` details, and a `token`.

### Delete Admin
- **Endpoint:** `DELETE /admin/:id`
- **Auth:** Required (Role: `admin`)

---

## 2. Customer Management (`/customers`)

### Create Customer
- **Endpoint:** `POST /customers`
- **Auth:** Required (Role: `admin` or `manager`)
- **Body (JSON):**
  ```json
  {
    "ownerName": "John Doe",
    "fatherName": "Richard Doe",
    "cnic": "12345-6789012-3",
    "mobileNumber": "03001112223",
    "bikeNumber": "LEA-1234",
    "bikeModel": "Honda 70",
    "address": "123 Street, City",
    "entryDate": "2023-10-01T10:00:00Z",
    "status": "active", // "active" or "inactive"
    "notes": "Optional notes"
  }
  ```

### Get Single Customer
- **Endpoint:** `GET /customers/:id`
- **Auth:** Public (or as configured)

### Search/List Customers
- **Endpoint:** `GET /customers`
- **Auth:** Public
- **Query Params:**
  - `q`: Search string (matches name, bike number, or mobile)
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 20)

### Update Customer
- **Endpoint:** `PUT /customers/:id`
- **Auth:** Public (Update logic as per your frontend needs)
- **Body:** Any partial customer fields.

### Delete Customer
- **Endpoint:** `DELETE /customers/:id`
- **Auth:** Required (Role: `admin`)

---

## 3. Fee Management (`/fees`)

### Create Fee Record
- **Endpoint:** `POST /fees`
- **Auth:** Public (Verify if you intended to add `requireAuth` here)
- **Body (JSON):**
  ```json
  {
    "customerId": "6524...", // MongoDB ID
    "month": "october", // All lowercase month name
    "year": 2023,
    "amount": 1000,
    "paymentDate": "2023-10-05T00:00:00Z",
    "paymentStatus": "paid", // "paid" or "unpaid"
    "paymentMethod": "cash", // "cash" or "online"
    "notes": "Paid for full month"
  }
  ```

### Mark Fee as Paid
- **Endpoint:** `PUT /fees/:id/pay`
- **Auth:** Public
- **Body (JSON):**
  ```json
  {
    "paymentMethod": "online",
    "paymentDate": "2023-10-10T12:00:00Z", // Optional, defaults to now
    "amount": 1000 // Optional, to update the amount
  }
  ```

### Get Monthly Report
- **Endpoint:** `GET /fees/reports/monthly/:month/:year`
- **Auth:** Public
- **Params:**
  - `month`: e.g., `october`
  - `year`: e.g., `2023`
- **Response:** Aggregated totals (paid/unpaid count and total amount).

### Delete Fee Record
- **Endpoint:** `DELETE /fees/:id`
- **Auth:** Required (Role: `admin`)

---

## Response Format
All responses follow this general structure:

**Success:**
```json
{
  "success": true,
  "data": { ... } // or other keys like "admin", "customer", etc.
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description here"
}
```
