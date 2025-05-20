# NestJS Passport Authentication

A NestJS application with JWT authentication using Passport.js

## Features

- JWT Authentication
- User management
- Secure password hashing
- Prisma ORM integration
- TypeScript support

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (configured in .env file)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and configure your environment variables
4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

## Running the application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Endpoints

### Authentication

- POST `/auth/login` - Login with email and password
- POST `/auth/register` - Register new user

### Users

- GET `/users` - Get all users (protected)
- GET `/users/:id` - Get user by ID (protected)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/database"
JWT_SECRET=your-secret-key
JWT_EXPIRATION=24h
PORT=3000
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Technologies Used

- NestJS
- Passport.js
- JWT
- Prisma ORM
- TypeScript
- PostgreSQL

## License

This project is licensed under the MIT License - see the LICENSE file for details
