# 📌 API Routes Overview

This document provides a structured overview of all API endpoints for TaskFlow, grouped by feature domain.

---

## 🛡️ Authentication

| Method | Endpoint         | Description                       | Access        |
| ------ | ---------------- | --------------------------------- | ------------- |
| POST   | `/auth/register` | Register new user                 | Admin only    |
| POST   | `/auth/login`    | User login                        | Public        |
| GET    | `/auth/refresh`  | Refresh JWT token                 | Authenticated |
| POST   | `/auth/logout`   | Logout & invalidate refresh token | Authenticated |

---

## 👤 Users

| Method | Endpoint     | Description         | Access        |
| ------ | ------------ | ------------------- | ------------- |
| GET    | `/users`     | List all users      | Admin only    |
| GET    | `/users/:id` | Get user profile    | Authenticated |
| PUT    | `/users/:id` | Update user details | Admin/Owner   |
| DELETE | `/users/:id` | Delete user         | Admin only    |

---

## 📁 Projects

| Method | Endpoint        | Description                    | Access        |
| ------ | --------------- | ------------------------------ | ------------- |
| POST   | `/projects`     | Create new project             | Manager/Admin |
| GET    | `/projects`     | List all projects (role-based) | Role-based    |
| GET    | `/projects/:id` | Get project details            | Authenticated |
| PUT    | `/projects/:id` | Update project                 | Manager/Admin |
| DELETE | `/projects/:id` | Delete project                 | Admin only    |

---

## ✅ Tasks

| Method | Endpoint                     | Description                    | Access           |
| ------ | ---------------------------- | ------------------------------ | ---------------- |
| POST   | `/projects/:projectId/tasks` | Create task                    | Manager/Admin    |
| GET    | `/projects/:projectId/tasks` | List all tasks under a project | Authenticated    |
| GET    | `/tasks/:id`                 | Get task details               | Authenticated    |
| PUT    | `/tasks/:id`                 | Update task                    | Assigned/Manager |
| DELETE | `/tasks/:id`                 | Delete task                    | Manager/Admin    |

---

## 💬 Comments

| Method | Endpoint                  | Description               | Access         |
| ------ | ------------------------- | ------------------------- | -------------- |
| POST   | `/tasks/:taskId/comments` | Add comment to a task     | Authenticated  |
| GET    | `/tasks/:taskId/comments` | Get comments under a task | Authenticated  |
| DELETE | `/comments/:id`           | Delete comment            | Author/Manager |

---

## 📊 Reports & Analytics

| Method | Endpoint             | Description                   | Access        |
| ------ | -------------------- | ----------------------------- | ------------- |
| GET    | `/reports/projects`  | Summary of all projects       | Admin/Manager |
| GET    | `/reports/tasks`     | Task completion status report | Admin/Manager |
| GET    | `/reports/users/:id` | User activity report          | Admin/Manager |

---
