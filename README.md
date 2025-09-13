# 🔐 NextJS Full Stack Authentication System

A complete, production-ready authentication system built with **Next.js 14**, **TypeScript**, **MongoDB**, and **Tailwind CSS**. Features secure user registration, login, email verification, password reset, and profile management.

![NextJS](https://img.shields.io/badge/NextJS-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🔒 **Core Authentication**
- **User Registration** - Secure signup with email validation
- **User Login** - JWT-based authentication with HTTP-only cookies
- **Email Verification** - Automated email verification system
- **Password Reset** - Secure password reset with time-limited tokens
- **Profile Management** - User dashboard with account details

### 🎨 **Modern UI/UX**
- **Glass Morphism Design** - Modern backdrop blur effects
- **Loading States** - Professional spinners and animations
- **Error Handling** - User-friendly error messages
- **Dark Theme** - Sleek dark mode interface

### 🛡️ **Security Features**
- **JWT Tokens** - Secure token-based authentication
- **Password Hashing** - bcrypt for password security
- **HTTP-Only Cookies** - Secure token storage
- **Token Expiration** - Automatic session timeout

## 🚀 Quick Start

### Prerequisites
- Nextjs 
- MongoDB Atlas account or local MongoDB
- Email service (Mailtrap for development)

### 1. Clone Repository
```bash
git clone https://github.com/kartik0x00/FullStackAuthWithNextJS.git
cd FullStackAuthWithNextJS
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT Secret (Generate a strong secret)
TOKEN_SECRET=your_super_secret_jwt_key

# Email Configuration (Mailtrap for development)
SANDBOX_AUTH_USER=your_mailtrap_username
SANDBOX_AUTH_PASS=your_mailtrap_password

# Domain (for email links)
DOMAIN_NAME=http://localhost:3000
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/users/               # Authentication API routes
│   │   ├── signup/              # User registration
│   │   ├── login/               # User login
│   │   ├── logout/              # User logout
│   │   ├── me/                  # Get user profile
│   │   ├── profile/             # User profile management
│   │   ├── verifyemail/         # Email verification
│   │   ├── forgot-password/     # Password reset request
│   │   └── reset-password/      # Password reset confirmation
│   ├── login/                   # Login page
│   ├── signup/                  # Registration page
│   ├── profile/                 # User dashboard
│   ├── me/                      # User profile page
│   ├── verifyemail/            # Email verification page
│   ├── forgot-password/         # Forgot password page
│   ├── reset-password/          # Reset password page
│   └── globals.css              # Global styles
├── db/
│   └── dbconfig.ts              # MongoDB connection
├── helpers/
│   ├── mailer.ts                # Email sending utility
│   └── getDataFromUserToken.ts  # JWT token decoder
├── models/
│   └── userModel.js             # User schema
└── middleware.ts                # Route protection
```

## 🔧 API Endpoints

### Authentication Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users/signup` | Register new user |
| `POST` | `/api/users/login` | User login |
| `GET` | `/api/users/logout` | User logout |
| `GET` | `/api/users/me` | Get current user |
| `GET` | `/api/users/profile` | Get user profile |
| `POST` | `/api/users/verifyemail` | Verify email address |
| `POST` | `/api/users/forgot-password` | Request password reset |
| `POST` | `/api/users/reset-password` | Reset password |

## 🗄️ Database Schema

### User Model
```javascript
{
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date
}
```

## 🎨 UI Components

### Pages Included
- **🏠 Home Page** - Landing page with feature highlights
- **📝 Sign Up** - User registration form
- **🔑 Login** - User authentication form
- **👤 Profile** - User dashboard with account details
- **📧 Email Verification** - Email confirmation page
- **🔒 Forgot Password** - Password reset request
- **🔑 Reset Password** - New password setup

## 🛠️ Technologies Used

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token generation
- **Nodemailer** - Email sending service

## 🚀 Deployment

### Environment Variables for Production
```env
MONGODB_URI=your_production_mongodb_uri
TOKEN_SECRET=your_production_jwt_secret
SANDBOX_AUTH_USER=your_production_email_user
SANDBOX_AUTH_PASS=your_production_email_pass
DOMAIN_NAME=https://your-domain.com
```

### Deploy on Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kartik0x00/FullStackAuthWithNextJS)

## 📧 Email Configuration

### Development (Mailtrap)
1. Sign up at [Mailtrap.io](https://mailtrap.io)
2. Get SMTP credentials
3. Add to `.env.local`

### Production
Replace Mailtrap with services like:
- SendGrid
- AWS SES
- Mailgun
- Resend

## 🔒 Security Best Practices

- ✅ **Password Hashing** with bcrypt
- ✅ **JWT Tokens** stored in HTTP-only cookies
- ✅ **Token Expiration** (1 hour for reset tokens)
- ✅ **Input Validation** on client and server
- ✅ **Environment Variables** for sensitive data
- ✅ **CORS Configuration** for API security
- ✅ **Rate Limiting** (recommended for production)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kartik** - [@kartik0x00](https://github.com/kartik0x00)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- Tailwind CSS for the styling system
- Vercel for hosting platform

---

⭐ **Star this repository if you found it helpful!**

📧 **Questions?** Open an issue or reach out!

🚀 **Happy Coding!**
