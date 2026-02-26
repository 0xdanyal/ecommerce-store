# E-Commerce Backend

This is a fully-featured **e-commerce backend** built with Node.js and Express. It includes **JWT authentication**, **role-based access control (RBAC)**, and CRUD operations for products and orders. Separate dashboards are provided for **customers** and **admins**.

---

## Features

### Authentication & Authorization
- JWT-based authentication for secure login.
- Role-Based Access Control (RBAC):
  - **Admin**: Full access to product and order management.
  - **Customer**: Can view products, place orders, and access their own dashboard.

### Product Management
- Admin can **Create, Read, Update, Delete (CRUD)** products.
- Customers can:
  - View products with **pagination**.
  - Get detailed information for a single product.

### Order Management
- Customers can place and view their orders.
- Admin can view all orders and manage order status.

### Dashboard
- Separate dashboards for **admin** and **customer**.

### API Testing
- Fully tested with **Postman**.

---

### Installation
1. Clone the repository:

```bash
git clone <YOUR_REPO_URL>
cd <REPO_FOLDER>

```

## Proof of work:

### users data
![users doc](screen%20shots%20/Users-doc.png)

### products data
![products doc](screen%20shots%20/products-doc.png)

### orders data
![orders doc](screen%20shots%20/order-doc.png)

### approving/rejecting/shipping status
![](screen%20shots%20/image.png)