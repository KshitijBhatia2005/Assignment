# Deployment Guide

This guide covers deploying the TaskMaster application to various platforms.

## Quick Deploy Options

### Option 1: Vercel (Frontend) + Render (Backend) - Recommended for Beginners

#### Deploy Frontend to Vercel

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set Root Directory to `frontend`
   - Add Environment Variables:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
     ```
   - Click Deploy

#### Deploy Backend to Render

1. **Create render.yaml** (already included in backend folder)
   ```yaml
   services:
     - type: web
       name: taskmaster-api
       env: node
       region: oregon
       plan: free
       buildCommand: cd backend && npm install
       startCommand: cd backend && npm start
       envVars:
         - key: NODE_ENV
           value: production
         - key: PORT
           value: 5000
         - key: MONGODB_URI
           sync: false
         - key: JWT_SECRET
           generateValue: true
         - key: JWT_EXPIRE
           value: 7d
   ```

2. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: taskmaster-api
     - Root Directory: backend
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Add Environment Variables (from MongoDB Atlas)
   - Click "Create Web Service"

3. **Setup MongoDB Atlas**
   - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create a free cluster
   - Get connection string
   - Add to Render environment variables

### Option 2: DigitalOcean App Platform

1. **Prepare for deployment**
   ```bash
   # Create app.yaml in root
   ```

2. **Deploy**
   - Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
   - Click "Create App"
   - Connect GitHub repository
   - Configure both frontend and backend
   - Add environment variables
   - Deploy

### Option 3: AWS (Advanced)

#### Frontend to AWS Amplify

1. **Install Amplify CLI**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. **Initialize Amplify**
   ```bash
   cd frontend
   amplify init
   amplify add hosting
   amplify publish
   ```

#### Backend to AWS Elastic Beanstalk

1. **Install EB CLI**
   ```bash
   pip install awsebcli
   ```

2. **Deploy**
   ```bash
   cd backend
   eb init -p node.js taskmaster-api
   eb create taskmaster-env
   eb deploy
   ```

### Option 4: Docker Deployment

1. **Build Docker images**
   ```bash
   # Frontend
   cd frontend
   docker build -t taskmaster-frontend .
   
   # Backend
   cd backend
   docker build -t taskmaster-backend .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Deploy to any cloud provider**
   - Push images to Docker Hub or AWS ECR
   - Deploy to ECS, Kubernetes, or any container platform

---

## Environment Setup

### Production Environment Variables

#### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmaster?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_random_string_at_least_32_chars
JWT_EXPIRE=7d
FRONTEND_URL=https://yourdomain.com
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

---

## Post-Deployment Checklist

### Security
- [ ] HTTPS enabled (SSL certificate)
- [ ] Environment variables secured
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Security headers configured (Helmet.js)
- [ ] Database credentials secured
- [ ] No sensitive data in logs

### Performance
- [ ] CDN configured
- [ ] Caching enabled
- [ ] Images optimized
- [ ] Database indexes created
- [ ] Connection pooling configured
- [ ] Compression enabled

### Monitoring
- [ ] Error tracking setup (Sentry)
- [ ] Logging configured (Winston)
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Performance monitoring (New Relic/DataDog)
- [ ] Alerts configured

### Backup
- [ ] Database backups scheduled
- [ ] Code in version control
- [ ] Deployment rollback plan
- [ ] Recovery procedures documented

---

## CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd backend && npm install
          cd ../frontend && npm install
      
      - name: Run tests
        run: |
          cd backend && npm test
          cd ../frontend && npm test

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

---

## Domain Configuration

### Custom Domain Setup

1. **Purchase Domain** (Namecheap, GoDaddy, etc.)

2. **Frontend (Vercel)**
   - Add domain in Vercel dashboard
   - Update DNS records:
     ```
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

3. **Backend (Render/DigitalOcean)**
   - Add custom domain in dashboard
   - Update DNS records:
     ```
     Type: A
     Name: api
     Value: [Your server IP]
     ```

4. **SSL Certificate**
   - Automatic with Vercel/Render
   - Or use Let's Encrypt

---

## Monitoring Setup

### Sentry (Error Tracking)

1. **Sign up at sentry.io**
2. **Create project**
3. **Add to backend:**
   ```javascript
   const Sentry = require('@sentry/node');
   Sentry.init({ dsn: process.env.SENTRY_DSN });
   ```
4. **Add to frontend:**
   ```javascript
   import * as Sentry from '@sentry/nextjs';
   Sentry.init({ dsn: process.env.NEXT_PUBLIC_SENTRY_DSN });
   ```

### UptimeRobot (Uptime Monitoring)

1. **Sign up at uptimerobot.com**
2. **Add monitor:**
   - Type: HTTPS
   - URL: https://api.yourdomain.com/health
   - Interval: 5 minutes

---

## Rollback Plan

### If deployment fails:

1. **Vercel:**
   ```bash
   vercel rollback
   ```

2. **Render:**
   - Go to dashboard
   - Select previous successful deployment
   - Click "Redeploy"

3. **Manual:**
   ```bash
   git revert HEAD
   git push origin main
   ```

---

## Performance Optimization

### After Deployment

1. **Test with Lighthouse**
   ```bash
   lighthouse https://yourdomain.com
   ```

2. **Load Testing**
   ```bash
   # Using k6
   k6 run load-test.js
   ```

3. **Monitor Performance**
   - Check response times
   - Monitor error rates
   - Watch resource usage

---

## Troubleshooting

### Common Issues

**Frontend can't connect to backend:**
- Check CORS configuration
- Verify API URL in environment variables
- Check network tab in browser DevTools

**Database connection fails:**
- Verify MongoDB URI
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

**502 Bad Gateway:**
- Check if backend is running
- Verify port configuration
- Check server logs

**CORS errors:**
- Update CORS configuration in backend
- Add frontend URL to allowed origins

---

## Support

For deployment issues:
1. Check logs in deployment platform
2. Review environment variables
3. Test API endpoints with Postman
4. Check GitHub issues

---

**Deployment Complete! 🚀**

Your TaskMaster application should now be live and accessible to users worldwide.

