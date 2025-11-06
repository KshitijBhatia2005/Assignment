# Quick Start Guide - TaskMaster

Get TaskMaster up and running in 5 minutes! 🚀

## Prerequisites

- Node.js (v16+) - [Download](https://nodejs.org/)
- MongoDB - [Local Install](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free)

## 🚀 Installation (5 Steps)

### Step 1: Clone and Install

```bash
# Clone the repository
cd /Users/kshitijbhatia/Documents/Assignment

# Install all dependencies
npm run install:all
```

### Step 2: Setup MongoDB

**Option A: MongoDB Atlas (Recommended - Cloud)**

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy your connection string

**Option B: Local MongoDB**

```bash
# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

### Step 3: Configure Backend

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/scalable-web-app
JWT_SECRET=my_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

**For MongoDB Atlas, use:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/scalable-web-app?retryWrites=true&w=majority
```

### Step 4: Configure Frontend

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 5: Start Application

```bash
# Start both frontend and backend
npm run dev
```

**That's it! 🎉**

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)
- API Health: [http://localhost:5000/api/health](http://localhost:5000/api/health)

## 📝 First Steps

### 1. Register a New Account

1. Go to [http://localhost:3000](http://localhost:3000)
2. Click "Get Started" or "Sign Up"
3. Fill in your details:
   - Name: Your Name
   - Email: your@email.com
   - Password: minimum 6 characters
4. Click "Create Account"

### 2. Explore the Dashboard

After registration, you'll see:
- **Statistics Cards:** Task counts
- **Create Task Button:** Add your first task
- **Search & Filters:** Find tasks easily

### 3. Create Your First Task

1. Click "New Task" button
2. Fill in task details:
   - Title (required)
   - Description (optional)
   - Status: Pending / In Progress / Completed
   - Priority: Low / Medium / High
   - Due Date (optional)
   - Tags (optional, comma-separated)
3. Click "Create Task"

### 4. Manage Tasks

- **Edit:** Click the "Edit" button on any task
- **Delete:** Click the "Delete" button (with confirmation)
- **Search:** Type in the search box
- **Filter:** Use status/priority dropdowns
- **Sort:** Choose sorting option

### 5. Update Your Profile

1. Click your avatar in the top-right
2. Select "Profile"
3. Edit your information
4. Change password if needed

## 🧪 Testing with Postman

1. Import `postman_collection.json` into Postman
2. Set variables:
   - `base_url`: http://localhost:5000/api
   - `token`: (will be set after login)
3. Test endpoints in this order:
   - Register User
   - Login User (saves token automatically)
   - Get Tasks
   - Create Task
   - Update Task
   - Delete Task

## 🐛 Troubleshooting

### Backend won't start

**Error:** `MongoDB connection failed`

**Solution:**
- Check if MongoDB is running
- Verify MONGODB_URI in .env
- For Atlas: Check IP whitelist and credentials

### Frontend can't connect to backend

**Error:** `Network Error` or CORS errors

**Solution:**
- Ensure backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in frontend/.env.local
- Clear browser cache

### Port already in use

**Error:** `Port 3000/5000 is already in use`

**Solution:**
```bash
# Find and kill process (macOS/Linux)
lsof -ti:3000 | xargs kill
lsof -ti:5000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies won't install

**Error:** `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🐳 Alternative: Docker Setup

If you prefer Docker:

```bash
# Start everything with Docker Compose
docker-compose up

# Stop services
docker-compose down

# Rebuild
docker-compose up --build
```

This automatically starts:
- MongoDB
- Backend API
- Frontend

## 📚 Next Steps

- Read [README.md](./README.md) for detailed information
- Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API reference
- Review [SCALING_NOTES.md](./SCALING_NOTES.md) for scaling strategies
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions

## 🎯 Development Workflow

```bash
# Start development
npm run dev

# Run backend only
cd backend && npm run dev

# Run frontend only
cd frontend && npm run dev

# Check backend health
curl http://localhost:5000/api/health
```

## 🔑 Default Test User (Optional)

Create a test account for quick testing:
- **Email:** test@example.com
- **Password:** test123456
- **Name:** Test User

## 📱 Access from Mobile/Tablet

To test on mobile devices on the same network:

1. Find your computer's IP address:
   ```bash
   # macOS/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. Update frontend/.env.local:
   ```env
   NEXT_PUBLIC_API_URL=http://YOUR_IP:5000/api
   ```

3. Access from mobile:
   ```
   http://YOUR_IP:3000
   ```

## 💡 Tips

1. **Keep both terminals open** - One for backend, one for frontend
2. **Check console for errors** - Helpful for debugging
3. **Use React DevTools** - Install browser extension for React debugging
4. **Test API first** - Use Postman before testing frontend
5. **Clear browser cache** - If you see old data

## 🎉 Success Checklist

- [ ] MongoDB running
- [ ] Backend started (port 5000)
- [ ] Frontend started (port 3000)
- [ ] Can access home page
- [ ] Can register new user
- [ ] Can login
- [ ] Can create task
- [ ] Can edit/delete task
- [ ] Can update profile

## ❓ Need Help?

1. Check error messages in terminal
2. Review [README.md](./README.md) troubleshooting section
3. Check browser console (F12)
4. Verify all environment variables
5. Ensure all dependencies installed

## 🚀 Ready to Deploy?

Once everything works locally, check:
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment instructions
- [SCALING_NOTES.md](./SCALING_NOTES.md) - Scaling strategies

---

**You're all set! Start building amazing tasks! 🎯**

Need more details? Check the [full README](./README.md)

