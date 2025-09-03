<<<<<<< HEAD
# Capstone_project
=======
# Payroll Management System — Frontend (React + Bootstrap)

A clean, role-based React frontend for your Payroll Management System. Uses **React Router**, **Axios**, **JWT via localStorage**, and **Bootstrap (CDN)**. Backgrounds are SVG gradients for a modern look.

## 🚀 Quick Start

```bash
# 1) Extract zip, open folder
# 2) Install deps
npm install

# 3) Start dev server
npm run dev

# 4) Open the printed URL (default: http://localhost:5173)
```

> **API Base URL** defaults to `http://localhost:8080/api/v1`.  
> To change it, create a `.env` file at the project root:

```
VITE_API_BASE=http://localhost:8081/api/v1
```

## 🔐 Auth Flow

- Login calls: `POST /auth/login`  
  Expects `{ username, password }`  
  Saves `{ accessToken, user }` to `localStorage`.
- Most pages are protected using `<PrivateRoute/>` and `<RoleRoute role="..."/>`.
- On `401/403`, an interceptor logs out the user.

## 🧭 Routes

- `/login`
- `/admin` + nested modules (Employees, Departments, Jobs, Payroll, Leave, Reports)
- `/employee` + nested modules (Profile, Leave, Salary Slip)

## 📁 Structure

```
src/
  assets/               # background svgs
  components/           # Navbar, routes
  pages/                # Login, Admin & Employee sections
  services/             # axios + auth helpers
  App.jsx, main.jsx, styles.css
```

## ✅ Notes

- UI uses Bootstrap from CDN (no extra setup).
- Replace API calls in `src/services/api.js` if your backend endpoints differ.
- This is a starter — customize forms, tables, and validation as your backend evolves.
>>>>>>> ff42e5a (Initial commit)
