# Backend API Documentation

## Server Setup

1. Install dependencies: `npm install`
2. Create `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/note-taking-app
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```
3. Start MongoDB service
4. Run server: `npm run dev` (development) or `npm start` (production)

## API Routes

### Authentication

#### POST /api/auth/signup
Register a new user.

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
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

#### POST /api/auth/login
Authenticate user and get JWT token.

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
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### Notes (Protected Routes)

All note routes require JWT authentication token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

#### GET /api/notes
Get all notes for the authenticated user.

**Headers:**
- `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "note-id",
      "title": "Note Title",
      "content": "Note Content",
      "user": "user-id",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST /api/notes
Create a new note.

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "My Note Title",
  "content": "My note content here"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "_id": "note-id",
    "title": "My Note Title",
    "content": "My note content here",
    "user": "user-id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /api/notes/:id
Update an existing note.

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Note updated successfully",
  "data": {
    "_id": "note-id",
    "title": "Updated Title",
    "content": "Updated content",
    "user": "user-id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### DELETE /api/notes/:id
Delete a note.

**Headers:**
- `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Note deleted successfully",
  "data": {}
}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Common status codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (not authorized to access resource)
- `404` - Not Found
- `500` - Server Error

## Models

### User Model
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required, min 6 characters)
- `createdAt` (Date, auto)
- `updatedAt` (Date, auto)

### Note Model
- `title` (String, required)
- `content` (String, required)
- `user` (ObjectId, required, ref: User)
- `createdAt` (Date, auto)
- `updatedAt` (Date, auto)

