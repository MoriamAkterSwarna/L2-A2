# DevPulse Backend API

## Project Overview
DevPulse Backend API is a robust, modular Node.js backend for a task tracking platform. It allows users to manage and track issues with role-based access control, distinguishing between regular contributors and maintainers.

**Live URL:** 

## Features
- **User Authentication:** Secure signup and login using JWT.
- **Role-Based Access Control (RBAC):** Differentiated roles (`contributor` and `maintainer`) to manage permissions.
- **Issue Management:** Full CRUD operations for tracking bugs and feature requests.
- **Automatic Database Initialization:** Automatically creates necessary tables on startup.

## Tech Stack
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)
- **Security:** bcrypt (password hashing)

## Setup Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## API Endpoint List

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Authenticate an existing user

### Issues
- `GET /api/issues` - Retrieve all issues (Requires Authentication)
- `GET /api/issues/:id` - Retrieve a specific issue (Requires Authentication)
- `POST /api/issues` - Create a new issue (Requires Authentication)
- `PATCH /api/issues/:id` - Update an existing issue (Requires Authentication)
- `DELETE /api/issues/:id` - Delete an issue (Requires `maintainer` role)

