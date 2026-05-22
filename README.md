Accessible Emoji Authentication System — MERN Registration & Login

A clean, beginner-friendly MERN authentication project built for the "User Registration & Login" lecture. Covers sign-up, password hashing, JWT creation, and saving the token to localStorage.

---

## Project Demonstration & Walkthrough

### 🔴 [Watch the quick walkthrough video](https://drive.google.com/drive/folders/12O-UEuhUKGnLWzlGbVse22ZdNzXbeFQ8?usp=sharing)

> **Note:** If the link does not open directly, copy and paste it into your browser.

---

## Project Structure

```
mern-creative-auth-system/
├── backend/
│   ├── controllers/
│   │   └── authController.js   ← register + login logic
│   ├── models/
│   │   └── User.js             ← Mongoose schema (username, email, password, emojiPattern)
│   ├── routes/
│   │   └── auth.js             ← POST /register and POST /login
│   ├── .env.example            ← copy to .env and fill in your values
│   ├── .gitignore
│   ├── package.json
│   └── server.js               ← entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── EmojiGrid.js     ← emoji selection grid
    │   ├── pages/
    │   │   ├── Register.js      ← sign-up form
    │   │   ├── Login.js         ← login form (stores token)
    │   │   └── Dashboard.js     ← protected landing page
    │   ├── App.js               ← routes and auth flow
    │   ├── App.css              ← styles and layout
    │   └── index.js             ← React entry point
    ├── package.json
    └── public/
```

---

## Setup Instructions

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder and add your values:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/auth-demo
JWT_SECRET=any_long_random_string_here
PORT=3005
```

Start the server:

```bash
npm run dev        # uses nodemon — auto-restarts on file changes
# or
npm start          # plain node
```

Server runs on **http://localhost:3005**

---

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on **http://localhost:3000**

---

## API Endpoints

| Method | URL | Body | What it does |
|--------|-----|------|-------------|
| POST | `/api/auth/register` | `{ username, email, password, emojiPattern }` | Creates a new user with hashed password |
| POST | `/api/auth/login` | `{ email, password, emojiPattern }` | Returns a JWT on success |

---

## How to Test in Postman

**Register:**

```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "Danika Rood",
  "email": "danikaworx@gmail.com",
  "password": "securePassword123",
  "emojiPattern": ["🐱", "🔥", "🧠"]
}
```

Expected: `201 { "message": "Account created successfully!" }`

---

**Login:**

```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "danikaworx@gmail.com",
  "password": "securePassword123",
  "emojiPattern": ["🐱", "🔥", "🧠"]
}
```

Expected: `200 { "token": "eyJ...", "message": "Welcome back!" }`

---

## Seeing the Token in DevTools

1. Open the app in your browser
2. Register a new account and log in
3. Open DevTools (F12)
4. Go to the **Application** tab → **Local Storage** → `localhost:3000`
5. You should see a `token` key with the JWT value

To decode the token, paste it into **https://jwt.io**.

---

## What’s NOT in this project

- `verifyToken` or authorization middleware wired to routes
- Role-based access control
- Protected Express routes using `Authorization: Bearer <token>` headers

---

## Dependencies

**Backend:** express, mongoose, bcryptjs, jsonwebtoken, dotenv, cors, nodemon

**Frontend:** react, react-dom, react-router-dom, axios
