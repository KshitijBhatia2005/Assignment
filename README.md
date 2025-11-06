# TaskMaster - Scalable Web App with Authentication & Dashboard

A modern, full-stack task management application built with Next.js, Express, and MongoDB. Features secure JWT authentication, real-time task management, and a beautiful responsive UI.

## 🚀 Live Demo

[Add your deployed link here]

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Security Features](#security-features)
- [Scaling for Production](#scaling-for-production)
- [Screenshots](#screenshots)

## ✨ Features

### Authentication
- ✅ User registration with validation
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcryptjs
- ✅ Protected routes and middleware
- ✅ Automatic token refresh
- ✅ Logout functionality

### Dashboard
- ✅ Real-time task statistics
- ✅ User profile display
- ✅ Profile editing capabilities
- ✅ Password change functionality
- ✅ Responsive design

### Task Management
- ✅ Create, Read, Update, Delete (CRUD) operations
- ✅ Task prioritization (Low, Medium, High)
- ✅ Task status tracking (Pending, In Progress, Completed)
- ✅ Due date management
- ✅ Task tagging system
- ✅ Advanced search functionality
- ✅ Multiple filter options (status, priority)
- ✅ Sorting capabilities (date, priority)

### UI/UX
- ✅ Modern, clean interface
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ TailwindCSS styling
- ✅ Toast notifications
- ✅ Loading states
- ✅ Form validation (client & server side)
- ✅ Error handling

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 14 (React 18)
- **Styling:** TailwindCSS
- **State Management:** Context API
- **Form Handling:** React Hook Form
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **Security:** CORS, helmet (recommended)

## 📁 Project Structure

```
Assignment/
├── frontend/                 # Next.js Frontend
│   ├── app/                 # App Router
│   │   ├── dashboard/       # Dashboard page
│   │   ├── login/          # Login page
│   │   ├── register/       # Register page
│   │   ├── profile/        # Profile page
│   │   ├── layout.js       # Root layout
│   │   ├── page.js         # Home page
│   │   └── globals.css     # Global styles
│   ├── components/          # Reusable components
│   │   ├── Navbar.js
│   │   ├── ProtectedRoute.js
│   │   ├── TaskList.js
│   │   └── TaskModal.js
│   ├── context/            # React Context
│   │   └── AuthContext.js
│   ├── utils/              # Utilities
│   │   └── api.js          # API client
│   ├── package.json
│   ├── tailwind.config.js
│   └── next.config.js
│
├── backend/                 # Express Backend
│   ├── config/             # Configuration
│   │   └── db.js           # Database connection
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── taskController.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js         # JWT authentication
│   │   ├── validator.js    # Validation
│   │   └── errorHandler.js # Error handling
│   ├── models/             # Mongoose models
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/             # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── taskRoutes.js
│   ├── utils/              # Utilities
│   │   └── generateToken.js
│   ├── server.js           # Entry point
│   ├── package.json
│   └── .env               # Environment variables
│
├── postman_collection.json  # Postman API collection
├── API_DOCUMENTATION.md     # Detailed API docs
├── package.json            # Root package.json
└── README.md              # This file
```

## 🏁 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Assignment
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install all dependencies (backend + frontend)
   npm run install:all
   ```

3. **Setup MongoDB**
   
   **Option A: Local MongoDB**
   - Install MongoDB locally
   - Start MongoDB service:
     ```bash
     # On macOS with Homebrew
     brew services start mongodb-community
     
     # On Linux
     sudo systemctl start mongod
     
     # On Windows
     net start MongoDB
     ```
   
   **Option B: MongoDB Atlas (Cloud)**
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Get your connection string
   - Whitelist your IP address

4. **Configure Backend Environment Variables**
   
   Create `backend/.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/scalable-web-app
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```
   
   For MongoDB Atlas, use:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/scalable-web-app?retryWrites=true&w=majority
   ```

5. **Configure Frontend Environment Variables**
   
   Create `frontend/.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

6. **Start the application**
   
   **Option A: Run both servers concurrently**
   ```bash
   npm run dev
   ```
   
   **Option B: Run separately**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - Health Check: http://localhost:5000/api/health

### Default Test User (Optional)

You can register a new user or create a test user:
- **Email:** test@example.com
- **Password:** test123

## 📚 API Documentation

Complete API documentation is available in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

### Quick API Overview

**Base URL:** `http://localhost:5000/api`

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (Protected)

#### User Profile
- `GET /users/profile` - Get profile (Protected)
- `PUT /users/profile` - Update profile (Protected)
- `PUT /users/password` - Update password (Protected)

#### Tasks
- `GET /tasks` - Get all tasks with filters (Protected)
- `GET /tasks/:id` - Get single task (Protected)
- `POST /tasks` - Create task (Protected)
- `PUT /tasks/:id` - Update task (Protected)
- `DELETE /tasks/:id` - Delete task (Protected)
- `GET /tasks/stats` - Get task statistics (Protected)

### Postman Collection

Import `postman_collection.json` into Postman to test all API endpoints.

1. Open Postman
2. Click Import
3. Select `postman_collection.json`
4. Set environment variables:
   - `base_url`: http://localhost:5000/api
   - `token`: (will be set after login)

## 🔐 Security Features

### Implemented Security Measures

1. **Password Security**
   - Passwords hashed using bcrypt (10 salt rounds)
   - Passwords never stored in plain text
   - Password field excluded from queries by default

2. **JWT Authentication**
   - Secure token generation
   - Token expiration (7 days default)
   - Token verification middleware
   - Automatic token validation on protected routes

3. **Input Validation**
   - Server-side validation using express-validator
   - Client-side validation using react-hook-form
   - Data sanitization
   - Type checking

4. **Database Security**
   - Mongoose schema validation
   - NoSQL injection prevention
   - Proper data types and constraints

5. **CORS Configuration**
   - Controlled cross-origin requests
   - Whitelisted origins

6. **Error Handling**
   - Custom error handler middleware
   - Consistent error responses
   - No sensitive data in error messages

### Additional Security Recommendations for Production

1. **Helmet.js** - Add HTTP headers security
   ```bash
   npm install helmet
   ```

2. **Rate Limiting** - Prevent brute force attacks
   ```bash
   npm install express-rate-limit
   ```

3. **Environment Variables** - Never commit `.env` files

4. **HTTPS** - Always use HTTPS in production

5. **Input Sanitization** - Use mongo-sanitize

6. **Session Management** - Implement refresh tokens

## 🌍 Environment Variables

### Backend (.env)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| PORT | Server port | 5000 | No |
| MONGODB_URI | MongoDB connection string | - | Yes |
| JWT_SECRET | Secret key for JWT | - | Yes |
| JWT_EXPIRE | JWT expiration time | 7d | No |
| NODE_ENV | Environment | development | No |

### Frontend (.env.local)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| NEXT_PUBLIC_API_URL | Backend API URL | http://localhost:5000/api | Yes |

## 🚀 Scaling for Production

### Frontend Scaling Strategy

#### 1. **Performance Optimization**
```javascript
// Implement code splitting
const TaskModal = dynamic(() => import('@/components/TaskModal'), {
  loading: () => <Spinner />
})

// Use Next.js Image component
import Image from 'next/image'

// Implement React.memo for expensive components
export default React.memo(TaskList)
```

#### 2. **State Management**
- **Current:** Context API (suitable for small to medium apps)
- **Scale to:** Redux Toolkit or Zustand for complex state management
- **Benefits:** Better performance, devtools, middleware support

#### 3. **Caching Strategy**
```javascript
// Implement SWR or React Query for data fetching
import useSWR from 'swr'

const { data, error } = useSWR('/api/tasks', fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 2000
})
```

#### 4. **CDN & Static Assets**
- Deploy to Vercel, Netlify, or AWS Amplify
- Use CDN for static assets
- Enable image optimization
- Implement lazy loading

#### 5. **Build Optimization**
```javascript
// next.config.js
module.exports = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: ['your-cdn-domain.com'],
  },
}
```

### Backend Scaling Strategy

#### 1. **Horizontal Scaling**
```javascript
// Implement clustering
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
} else {
  // Start server
}
```

#### 2. **Database Optimization**
```javascript
// Add indexes for better query performance
taskSchema.index({ user: 1, status: 1 })
taskSchema.index({ title: 'text', description: 'text' })

// Implement connection pooling
mongoose.connect(uri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000
})
```

#### 3. **Caching Layer**
```javascript
// Implement Redis for caching
const redis = require('redis')
const client = redis.createClient()

// Cache frequently accessed data
app.get('/api/tasks', cacheMiddleware, getTasks)
```

#### 4. **Load Balancing**
- Use Nginx or AWS ELB
- Distribute traffic across multiple instances
- Implement health checks

#### 5. **Microservices Architecture**

**Current Monolithic Structure:**
```
Frontend ↔ Backend API ↔ Database
```

**Scaled Microservices Architecture:**
```
Frontend ↔ API Gateway ↔ Auth Service ↔ Auth DB
                      ↔ Task Service ↔ Task DB
                      ↔ User Service ↔ User DB
                      ↔ Notification Service
```

**Implementation Steps:**

1. **Separate Services**
   - Auth Service (handles authentication)
   - Task Service (handles task CRUD)
   - User Service (handles user profiles)
   - Notification Service (handles emails, push notifications)

2. **API Gateway**
   - Use Express Gateway or Kong
   - Route requests to appropriate services
   - Handle authentication at gateway level

3. **Message Queue**
   - Implement RabbitMQ or AWS SQS
   - Handle asynchronous tasks
   - Decouple services

4. **Service Discovery**
   - Use Consul or Kubernetes
   - Dynamic service registration
   - Health monitoring

#### 6. **Monitoring & Logging**
```javascript
// Implement logging
const winston = require('winston')
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

// Add APM (Application Performance Monitoring)
// - New Relic
// - DataDog
// - Elastic APM
```

#### 7. **Security Enhancements**
```javascript
// Rate limiting
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

// Helmet for security headers
const helmet = require('helmet')
app.use(helmet())

// CSRF protection
const csrf = require('csurf')
app.use(csrf())
```

#### 8. **Database Scaling**

**Read Replicas:**
```javascript
// Primary database for writes
const primary = mongoose.createConnection(primaryURI)

// Read replicas for reads
const replica1 = mongoose.createConnection(replica1URI)
const replica2 = mongoose.createConnection(replica2URI)
```

**Sharding:**
- Partition data across multiple databases
- Use user ID as shard key
- Implement in MongoDB Atlas or manually

#### 9. **Containerization & Orchestration**

**Docker:**
```dockerfile
# Dockerfile for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
```

**Kubernetes:**
- Deploy to EKS, GKE, or AKS
- Auto-scaling based on load
- Self-healing capabilities
- Rolling updates

#### 10. **CI/CD Pipeline**

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: npm test
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: ./deploy.sh
```

### Infrastructure Recommendations

#### Development
- Local development with Docker
- MongoDB Atlas (free tier)
- GitHub for version control

#### Staging
- AWS EC2 or DigitalOcean Droplet
- MongoDB Atlas (shared cluster)
- CI/CD with GitHub Actions

#### Production
- **Frontend:** Vercel or AWS CloudFront + S3
- **Backend:** AWS ECS/EKS or DigitalOcean Kubernetes
- **Database:** MongoDB Atlas (dedicated cluster with replicas)
- **CDN:** CloudFlare or AWS CloudFront
- **Monitoring:** DataDog or New Relic
- **Logging:** ELK Stack or CloudWatch
- **Error Tracking:** Sentry

### Cost Optimization
- Use serverless for low-traffic endpoints
- Implement auto-scaling (scale down during low traffic)
- Use spot instances for non-critical workloads
- Optimize database queries to reduce compute time
- Implement proper caching to reduce database calls

## 📸 Screenshots

### Home Page
![Home Page](./screenshots/home.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Task Management
![Tasks](./screenshots/tasks.png)

### Profile
![Profile](./screenshots/profile.png)

## 🧪 Testing

### Backend Tests (Recommended)
```bash
cd backend
npm install --save-dev jest supertest
npm test
```

### Frontend Tests (Recommended)
```bash
cd frontend
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm test
```

## 📝 Code Quality

### Linting
```bash
# Frontend
cd frontend
npm run lint

# Backend
cd backend
npm install --save-dev eslint
npx eslint .
```

### Formatting
```bash
# Install Prettier
npm install --save-dev prettier

# Format code
npm run format
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - [Your Email]

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database
- TailwindCSS for the utility-first CSS framework

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Built with ❤️ using Next.js, Express, and MongoDB**

