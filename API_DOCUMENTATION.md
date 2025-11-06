# TaskMaster API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "bio": "",
      "avatar": "",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login User
**POST** `/auth/login`

Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "bio": "",
      "avatar": "",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Get Current User
**GET** `/auth/me`

Get currently authenticated user information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "",
    "avatar": "",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## User Profile Endpoints

### 1. Get Profile
**GET** `/users/profile`

Get user profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "Full-stack developer",
    "avatar": "https://example.com/avatar.jpg",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Update Profile
**PUT** `/users/profile`

Update user profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "bio": "Full-stack developer passionate about building scalable applications",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "...",
    "name": "John Doe Updated",
    "email": "john@example.com",
    "bio": "Full-stack developer passionate about building scalable applications",
    "avatar": "https://example.com/avatar.jpg",
    "role": "user"
  }
}
```

### 3. Update Password
**PUT** `/users/password`

Update user password.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "password123",
  "newPassword": "newpassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

---

## Task Endpoints

### 1. Get All Tasks
**GET** `/tasks`

Get all tasks for authenticated user with optional filters.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): Filter by status (`pending`, `in-progress`, `completed`)
- `priority` (optional): Filter by priority (`low`, `medium`, `high`)
- `search` (optional): Search in title and description
- `sortBy` (optional): Sort field (`createdAt`, `dueDate`, `priority`) - default: `createdAt`
- `order` (optional): Sort order (`asc`, `desc`) - default: `desc`

**Example:**
```
GET /tasks?status=pending&priority=high&search=project&sortBy=dueDate&order=asc
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "title": "Complete project documentation",
      "description": "Write comprehensive README and API documentation",
      "status": "pending",
      "priority": "high",
      "dueDate": "2024-12-31T00:00:00.000Z",
      "tags": ["documentation", "urgent"],
      "user": {
        "_id": "...",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. Get Single Task
**GET** `/tasks/:id`

Get a specific task by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API documentation",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "tags": ["documentation", "urgent"],
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Create Task
**POST** `/tasks`

Create a new task.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API documentation",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-12-31",
  "tags": ["documentation", "urgent"]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "...",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API documentation",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "tags": ["documentation", "urgent"],
    "user": "...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. Update Task
**PUT** `/tasks/:id`

Update an existing task.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API documentation",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2024-12-31",
  "tags": ["documentation", "urgent", "in-progress"]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "...",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API documentation",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "tags": ["documentation", "urgent", "in-progress"],
    "user": "...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### 5. Delete Task
**DELETE** `/tasks/:id`

Delete a task.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {}
}
```

### 6. Get Task Statistics
**GET** `/tasks/stats`

Get task statistics for authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "total": 10,
    "pending": 3,
    "in-progress": 4,
    "completed": 3
  }
}
```

---

## Health Check

### Server Health
**GET** `/health`

Check server health status.

**Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### Forbidden (403)
```json
{
  "success": false,
  "message": "Not authorized to update this task"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Task not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## Testing with Postman

1. Import `postman_collection.json` into Postman
2. Set the `base_url` variable to `http://localhost:5000/api`
3. Register or login to get a JWT token
4. Set the `token` variable with your JWT token
5. Test all endpoints

## Rate Limiting

Currently, no rate limiting is implemented. For production:
- Implement rate limiting using `express-rate-limit`
- Set appropriate limits per endpoint (e.g., 100 requests per 15 minutes)
- Consider different limits for authenticated vs. unauthenticated requests

