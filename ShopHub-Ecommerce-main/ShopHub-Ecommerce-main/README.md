# 🛒 ShopHub - Full-Stack E-Commerce Platform

<p align="center">
  <img src="./assets/banner.png" alt="ShopHub E-Commerce Banner" width="100%">
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red?logo=mongoose)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)
![Razorpay](https://img.shields.io/badge/Razorpay-Test%20Mode-blue?logo=razorpay)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-blue?logo=cloudinary)
![Vite](https://img.shields.io/badge/Vite-Fast-purple?logo=vite)

</p>

<p align="center">
  A modern full-stack e-commerce platform built with React, Node.js, Express.js, MongoDB and Razorpay.
</p>

<p align="center">
  ShopHub provides a complete online shopping experience with authentication, products, cart, wishlist, reviews, orders, user profiles, admin management and secure online payment integration.
</p>

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT-based authentication
- Protected routes
- Admin authentication
- Role-based authorization
- Secure password hashing using bcryptjs
- Persistent authentication

---

## 🛍️ Product Management

- Browse products
- Product listing
- Product details
- Product categories
- Product images
- Product descriptions
- Product pricing
- Product inventory
- Admin product management
- Add products
- Edit products
- Delete products

---

## 🛒 Shopping Cart

- Add products to cart
- View cart items
- Remove products from cart
- Update product quantity
- Automatic total calculation
- Protected cart routes
- Persistent cart data
- Automatic cart clearing after successful online payment

---

## ❤️ Wishlist

- Add products to wishlist
- Remove products from wishlist
- View wishlist
- Protected wishlist routes
- User-specific wishlist

---

## ⭐ Product Reviews

- Add product reviews
- Product ratings
- View product reviews
- User-based review system
- Product rating display

---

# 📦 Order Management

ShopHub supports complete order management for customers and administrators.

### Customer Features

- Place orders
- Cash on Delivery
- Online payment
- View order history
- View order details
- Cancel orders
- Track order status
- Manage shipping information
- User-specific orders

### Admin Features

- View all orders
- View customer orders
- Update order status
- Manage order workflow
- Track order progress
  
---
### Order Status

```text
Pending
   ↓
Processing
   ↓
Shipped
   ↓
Delivered
```

---
# 💳 Online Payment

```text

ShopHub currently integrates Razorpay Test Mode for online payments.

Payment Features
Razorpay Checkout
Razorpay Test Mode
Razorpay Order Creation
Payment Signature Verification
Razorpay Order ID Storage
Razorpay Payment ID Storage
Payment Status Tracking
Secure Server-side Verification
Automatic Order Creation
Automatic Cart Clearing after successful payment
```
# 🔄 Razorpay Payment Flow

The payment process follows a secure server-side verification flow.
```text
                    User
                      |
                      | Click "Pay Online"
                      ↓
              React Frontend
                      |
                      | Create Payment Order
                      ↓
              Express Backend
                      |
                      | Create Razorpay Order
                      ↓
                  Razorpay
                      |
                      | Open Checkout
                      ↓
             User completes payment
                      |
                      | Payment ID
                      | Order ID
                      | Signature
                      ↓
              React Frontend
                      |
                      | Verify Payment
                      ↓
              Express Backend
                      |
                      | Verify Signature
                      ↓
                  MongoDB
                      |
                      | Create Paid Order
                      | Save Payment Details
                      ↓
                Cart Cleared
                      |
                      ↓
                Orders Page
```
---
Payment Security
---
ShopHub does not trust the frontend alone to determine whether a payment was successful.

The backend verifies the Razorpay payment signature using the secret key.

The verification process uses:

razorpay_order_id
        +
razorpay_payment_id
        +
RAZORPAY_KEY_SECRET  

---

# 👤 User Profile

Users can manage their personal and shipping information.

Profile Information
Name
Email
Phone number
Address
City
State
PIN code
Shipping information

Shipping information is used when creating orders.

---

# 👨‍💼 Admin Dashboard

ShopHub includes a protected admin dashboard.
---
Admin Features
Product management
Add products
Edit products
Delete products
Inventory management
Order management
Update order status
Admin-only routes
Protected admin operations
---=

---
# 🎨 Modern UI

ShopHub provides a responsive shopping experience across desktop and mobile devices.

UI Features
Modern navigation bar
Responsive design
Mobile-friendly layout
Desktop-friendly layout
Hero carousel
Modern product cards
Shopping cart interface
Wishlist interface
Product details page
Order pages
User profile interface
Admin dashboard
Toast notifications
Responsive layouts
Clean modern design

---
```text
🏗️ Tech Stack
Frontend
React
React Router
Tailwind CSS
Axios
React Hot Toast
Vite
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT
bcryptjs
CORS
dotenv
External Services
MongoDB Atlas
Cloudinary
Razorpay
Development Tools
Git
GitHub
VS Code
Postman
Nodemon
```

# 🏛️ Architecture

```text
                         ┌──────────────────────┐
                         │       ShopHub        │
                         │   React Frontend     │
                         └──────────┬───────────┘
                                    │
                                    │ Axios / REST API
                                    ↓
                         ┌──────────────────────┐
                         │     Express.js       │
                         │       Backend        │
                         └──────────┬───────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ↓                     ↓                     ↓
      ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
      │   MongoDB     │     │   Cloudinary  │     │   Razorpay    │
      │     Atlas     │     │     Media     │     │  Test Mode    │
      └───────────────┘     └───────────────┘     └───────────────┘
```

📂 Project Structure
```text
ShopHub-Ecommerce/
│
├── assets/
│   └── banner.png
│
├── backend/
│   │
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── razorpay.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── productController.js
│   │   ├── reviewController.js
│   │   ├── uploadController.js
│   │   ├── userController.js
│   │   └── wishlistController.js
│   │
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   ├── authMiddleware.js
│   │   └── upload.js
│   │
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   ├── Review.js
│   │   ├── User.js
│   │   └── Wishlist.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── productRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── uploadRoutes.js
│   │   ├── userRoutes.js
│   │   └── wishlistRoutes.js
│   │
│   ├── package.json
│   └── server.js
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HeroCarousel.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Newsletter.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ScrollToTop.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AddProduct.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── EditProduct.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── RefundPolicy.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ReturnPolicy.jsx
│   │   │   └── Wishlist.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── LICENSE
```

🚀 Current Features
```text
| Feature                   | Status |
| ------------------------- | :----: |
| User Registration         |    ✅   |
| User Login                |    ✅   |
| JWT Authentication        |    ✅   |
| Protected Routes          |    ✅   |
| Admin Authentication      |    ✅   |
| Product Management        |    ✅   |
| Product Categories        |    ✅   |
| Product Inventory         |    ✅   |
| Shopping Cart             |    ✅   |
| Wishlist                  |    ✅   |
| Product Reviews           |    ✅   |
| Product Ratings           |    ✅   |
| Order Management          |    ✅   |
| Cash on Delivery          |    ✅   |
| Razorpay Test Mode        |    ✅   |
| Razorpay Checkout         |    ✅   |
| Payment Verification      |    ✅   |
| Payment ID Storage        |    ✅   |
| Razorpay Order ID Storage |    ✅   |
| Automatic Cart Clearing   |    ✅   |
| User Profile              |    ✅   |
| Shipping Address          |    ✅   |
| Admin Dashboard           |    ✅   |
| Cloudinary Integration    |    ✅   |
| Responsive UI             |    ✅   |
| Mobile-Friendly UI        |    ✅   |
| Production Deployment     |   🚧   |

```
🔐 Environment Variables
```text

Environment variables are required for both local development and production deployment.

Backend
PORT=5000

MONGO_URI=mongodb_uri

JWT_SECRET=secure_jwt_secret

CLOUDINARY_CLOUD_NAME=cloudinary_cloud_name
CLOUDINARY_API_KEY=cloudinary_api_key
CLOUDINARY_API_SECRET=cloudinary_api_secret

RAZORPAY_KEY_ID=razorpay_test_key_id
RAZORPAY_KEY_SECRET=razorpay_test_key_secret

Frontend
VITE_API_URL=http://localhost:5000/api
```
# Production Architecture
```text
                         Internet
                            |
                            ↓
                  ┌──────────────────┐
                  │     Render       │
                  │    Frontend      │
                  │   React + Vite   │
                  └────────┬─────────┘
                           |
                           | HTTPS API
                           ↓
                  ┌──────────────────┐
                  │     Render       │
                  │     Backend      │
                  │ Node + Express   │
                  └────────┬─────────┘
                           |
             ┌─────────────┼─────────────┐
             ↓             ↓             ↓
       MongoDB Atlas   Cloudinary    Razorpay
```

# 📊 Project Status       
```text
| Feature                 |     Status     |
| ----------------------- | :------------: |
| Authentication          |   ✅ Completed  |
| Product Management      |   ✅ Completed  |
| Shopping Cart           |   ✅ Completed  |
| Wishlist                |   ✅ Completed  |
| Product Reviews         |   ✅ Completed  |
| Order Management        |   ✅ Completed  |
| Admin Dashboard         |   ✅ Completed  |
| User Profile            |   ✅ Completed  |
| MongoDB Atlas           |   ✅ Completed  |
| Cloudinary              |   ✅ Completed  |
| Razorpay Test Mode      |   ✅ Completed  |
| Payment Verification    |   ✅ Completed  |
| Automatic Cart Clearing |   ✅ Completed  |
| GitHub Repository       |   ✅ Completed  |
| README Documentation    |   ✅ Completed  |
| Production Deployment   | 🚧 In Progress |
```
# 🤝 Contributing
```text
Contributions and suggestions are welcome.
---
```

# 👨‍💻 Developer

```text
Sumit Yadav

B.Tech Computer Science & Engineering

National Institute of Technology Patna

GitHub:

https://github.com/Sumit-Yadav2611

⭐ Show Your Support

If you like ShopHub:

⭐ Star this repository

🐛 Report bugs

💡 Suggest new features

🤝 Contribute to the project
```
