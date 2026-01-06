# Express MySQL Auth

A full-stack authentication project built with **Next.js** on the frontend and **Express.js + MySQL** on the backend.  
This project demonstrates a clean and scalable authentication flow suitable for modern web applications.

🔗 Repository: https://github.com/leoangr/express-mysql-auth.git

---

## ✨ Features

- User authentication (login & registration)
- Secure backend with Express.js
- MySQL database integration
- Modern frontend with Next.js 15
- Type-safe development using TypeScript
- Responsive UI with Tailwind CSS
- Cookie-based authentication (credentials included)
- Clean project structure (frontend & backend separated)

---

## 🛠 Tech Stack

### Frontend
- **Next.js 15**
- **TypeScript**
- **Tailwind CSS**

### Backend
- **Express.js**
- **MySQL**
- **Node.js**

---

## 🚀 Getting Started

### 1️⃣ Clone Repository
```bash
git clone https://github.com/leoangr/express-mysql-auth.git
cd express-mysql-auth
```
### 2️⃣ Setup Backend
```bash
cd backend
npm install
```
#### Create .env file:
```bash
DB_HOST="localhost"
DB_USERNAME="root"
DB_PASSWORD=""
DB_NAME="express-auth"

JWT_SECRET="your_secret_key"
COOKIE_SECURE="false"     #if https change to true 
COOKIE_SAMESITE="None"    #if domain is the same change to Lax
```
#### Run backend:
```bash
npm run dev
```
### 3️⃣ Setup Frontend
```bash
cd frontend
npm install
```
#### Create .env file:
```bash
NEXT_PUBLIC_API_DOMAIN="http://localhost:4000"
```
#### Run frontend:
```bash
npm run dev
```

### 🔐 Authentication Flow

- User submits credentials from Next.js frontend  
- Request is sent to Express API
- Backend validates user against MySQL database
- Authentication state is handled securely using cookies
- User session is maintained across requests

### 📌 Notes

- Make sure MySQL service is running
- Import express-auth.sql file in the backend folder into your database
- Update database credentials in .env
- This project is suitable as a starter template for auth-based applications

### 👤 Author
- [https://leoanggoro.my.id](https://leoanggoro.my.id)
- [https://github.com/leoangr](https://github.com/leoangr)
