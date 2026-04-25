# 🛍️ Odyssey — Premium E-Commerce Platform

> Watch the full walkthrough of Odyssey — architecture, UI, and features.

[![Watch on YouTube](https://www.youtube.com/watch?v=Ka0TNr2RRYA)](https://www.youtube.com/watch?v=Ka0TNr2RRYA)

> **Discover. Desire. Own.**
> A modern, curated lifestyle e-commerce experience built with performance, clean UI, and scalable architecture in mind.

---

## ✨ Key Features

* 🔐 **Firebase Authentication**

  * Email & Password login/register
  * Google OAuth integration

* 🛍️ **Dynamic Product Catalog**

  * Search functionality
  * Multi-filtering (category, price, rating)
  * Responsive grid layout

* ➕ **Product Management (Protected)**

  * Add new products
  * Manage & delete products
  * Real-time updates via Firebase

* 🔒 **Protected Routes**

  * Auth-based access control
  * Middleware + client-side guard

* 💾 **State Management**

  * Zustand for global state
  * Persistent storage support

* 🎬 **Smooth UI & Animations**

  * Framer Motion interactions
  * Micro-animations for better UX

* 📱 **Fully Responsive Design**

  * Mobile-first approach
  * Optimized for all screen sizes

---

## 🛣️ Route Summary

| Route           | Access  | Description                  |
| --------------- | ------- | ---------------------------- |
| `/`             | Public  | Landing page with 7 sections |
| `/items`        | Public  | Product listing with filters |
| `/items/[id]`   | Public  | Product details page         |
| `/items/add`    | 🔒 Auth | Add new product              |
| `/items/manage` | 🔒 Auth | Manage all products          |
| `/about`        | Public  | About the platform           |
| `/login`        | Public  | User login                   |
| `/register`     | Public  | User registration            |

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone <https://github.com/engsiam/Odyssey-Premium-E-Commerce-Platform.git>
cd odyssey
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Open in Browser

```
http://localhost:3000
```

---

## 🔧 Firebase Setup

1. Go to **Firebase Console**
2. Create a new project
3. Enable **Authentication**

   * Email/Password
   * Google Sign-In
4. Add your app config to `.env.local`
5. Add authorized domains:

   * `localhost`
   * your production URL

---

## 🏗️ Tech Stack

* **Frontend:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4
* **Animation:** Framer Motion
* **Authentication:** Firebase Auth
* **State Management:** Zustand

---

## 📦 Project Highlights

* Clean and scalable folder structure
* Reusable UI components
* Consistent design system
* Optimized performance and UX
* Production-ready architecture

---

## 🌐 Live Demo

👉 [*Live Link*](https://odyssey-premium-e-commerce-platform.vercel.app/)

---


## 🧠 Developer Notes

This project goes beyond the minimum requirements by:

* Implementing a real-world product management flow
* Using modern state management (Zustand)
* Enhancing UI with animations and responsive design

---

## 📄 License

This project is built for assessment and learning purposes.
