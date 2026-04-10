
# 🛒 GroFresh - Premium Grocery E-Commerce Platform



**GroFresh** is an enterprise-grade, full-stack grocery e-commerce platform built using the **MERN** (MongoDB, Express.js, React, Node.js) stack. It features a seamless shopping experience, robust admin controls, secure payment processing via Stripe, and a responsive, modern UI powered by Tailwind CSS.

### 🔗 Live Preview: [https://gro-fresh-silk.vercel.app/](https://gro-fresh-silk.vercel.app/)

---

## ✨ Enterprise-Level Features

* **Secure Authentication:** JWT-based stateless authentication with secure HTTP-only cookies and bcrypt password hashing.
* **Dual Dashboards:** * **Customer:** Browse products, manage cart, track order history, and checkout seamlessly.
    * **Admin/Seller:** Complete inventory management (add/edit products, toggle stock availability) and real-time order tracking.
* **Robust Payment Integration (Stripe):** Full Stripe checkout integration with secure webhook handling (`checkout.session.completed`) for automated order status updates.
* **Serverless-Optimized Database:** Implemented MongoDB connection caching to prevent connection exhaustion in serverless environments (Vercel).
* **Cloud Media Management:** Direct integration with Cloudinary for scalable and secure product image hosting.
* **Fluid Responsive UI:** Modern, minimalist, and fully responsive design built with Tailwind CSS, featuring CSS Grid/Flexbox layouts and custom animations.

---

## 🛠️ Tech Stack & Architecture

### **Frontend (Client)**
* **Framework:** React.js
* **Styling:** Tailwind CSS
* **State Management:** React Context API
* **Routing:** React Router DOM
* **HTTP Client:** Axios (Configured for Cross-Origin Credentials)
* **Deployment:** Vercel

### **Backend (API)**
* **Runtime:** Node.js
* **Framework:** Express.js (RESTful Architecture)
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT) & Cookie-Parser
* **Media Storage:** Cloudinary & Multer (Memory Storage)
* **Payments:** Stripe Node SDK
* **Deployment:** Vercel (Serverless Functions)

---

## 🚀 Installation & Local Setup

Follow these steps to set up the project locally on your machine.

### Prerequisites
* [Node.js](https://nodejs.org/) installed (v18+ recommended)
* [MongoDB](https://www.mongodb.com/) cluster URI
* [Stripe](https://stripe.com/) Account (for API & Webhook keys)
* [Cloudinary](https://cloudinary.com/) Account

### 1. Clone the Repository
```bash
git clone [https://github.com/Prottoy123/GroFresh.git](https://github.com/Prottoy123/GroFresh.git)
cd GroFresh
````

### 2\. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` root directory and configure the following variables:

```env
PORT=4000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary Setup
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe Setup
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Admin Credentials (For Seeding/Default Access)
SELLER_EMAIL=admin@example.com
SELLER_PASSWORD=your_secure_password
```

Run the backend server:

```bash
npm run dev
```

### 3\. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Run the development server:

```bash
npm run dev
```

-----

## 💡 Engineering Highlights (Problem Solving)

During development, several complex architectural challenges were resolved:

1.  **Serverless Connection Exhaustion:** Mitigated MongoDB connection limits on Vercel by implementing connection state caching in `db/index.js`, preventing the creation of redundant DB connections per request.
2.  **Webhook Event Syncing:** Successfully architected Stripe Webhooks with `express.raw()` body parsing to verify signatures, resolving asynchronous order updates without dropping requests.
3.  **Data Projection Optimization:** Optimized Mongoose `.populate()` queries to selectively fetch references (e.g., dynamically fetching category names from product references), minimizing bandwidth and rendering "N/A" fallbacks obsolete.

-----

## 👨‍💻 Developer

Developed with precision and care by **MD Monjurul Islam**.

  * **GitHub:** [@Prottoy123](https://www.google.com/search?q=https://github.com/Prottoy123)
  * **Role:** Full-Stack Developer (MERN)

-----

*If you find this project useful, please consider giving it a ⭐\!*

```

***

