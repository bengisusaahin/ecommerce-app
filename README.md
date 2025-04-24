# Ecommerce-app

This project is part of the **NewMindAi Sprints**. It was built using **NestJS** and follows **modular, clean code principles** with **semantic commits**. It implements CRUD functionality for **Users** and **Products**, utilizes **validations**, **guards**, and **response interceptors** for a robust backend API.

## 🚀 Features

- Built with **NestJS** and **TypeScript**
- CRUD operations for **Users** and **Products**
- **DTO validation** with `class-validator`
- **Guards** for Admin and Super Admin role access
- **Pipes** for data validation and transformation
- **Global Exception Filter** for standardizing error responses
- **Interceptors** for consistent success response structure
- Implements **Atomic Commits** with **Semantic Commit Messages**

## 🔧 Installation

```bash
npm install
npm run start:dev
```

> Make sure you have nodemon installed globally or as a dev dependency.

## 🔗 Available Endpoints
- `/users` → List of users

- `/products` → List of products

- `/products/:id` → Get a specific product by ID

- `/users/:id` → Get a specific user by ID

- `/users` → Create a new user

- `/products` → Add a new product

- `/users/:id` →Update user details (including role update, Super Admin only)

## ✅ Sprint Summary
- [x] CRUD Implementation for Users and Products
- [x] DTO Validation with class-validator
- [x] Guards for Admin and Super Admin access control
- [x] Interceptors for consistent API responses
- [x] Exception Filter to handle error responses
- [x] Pagination and Sorting for GET requests

##  Commit Strategy

This project follows:

- **Atomic Commits**  
  Each commit introduces a single, meaningful change.

- **Semantic Commit Messages**  
  Examples:
  - `feat: add /oldestEmployee API endpoint`
  - `refactor: modularize API route handling`
  - `fix: handle invalid JSON gracefully`

> This strategy improves collaboration, code review, and readability of the project history.
## Contact

<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="padding-right: 10px;">Bengisu Şahin - <a href="mailto:bengisusaahin@gmail.com">bengisusaahin@gmail.com</a></td>
    <td>
      <a href="https://www.linkedin.com/in/bengisu-sahin/" target="_blank">
        <img src="https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" alt="linkedin" style="vertical-align: middle;" />
      </a>
    </td>
  </tr>
</table>