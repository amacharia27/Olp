// apps/backend/src/app.ts

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import session from 'express-session';
import passport from 'passport';
import { configurePassport } from './config/passport.config';
import errorHandler from './utils/errorHandler';

// Import routes
import authRoutes from './api/v1/routes/auth.routes';
import studentRoutes from './api/v1/routes/student.routes';
import schoolRoutes from './api/v1/routes/school.routes'; 

const app: Express = express();

// Call passport configuration
configurePassport();

app.use('/api/v1/schools', schoolRoutes);

// --- Core Middleware ---
// Enable CORS
app.use(cors({ origin: process.env.CLIENT_URL }));
// Body parser for JSON
app.use(express.json());
// Body parser for URL-encoded data
app.use(express.urlencoded({ extended: true }));

// --- Session & Passport Middleware ---
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false, // Best practice: don't save uninitialized sessions
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// --- API Routes ---
app.get('/', (_req: Request, res: Response) => {
  res.send('OLP Monitor API is running...');
});

// Version 1 API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/students', studentRoutes);
// ... add other routes here later

// --- Error Handling Middleware ---
// This should be the last middleware
app.use(errorHandler);

export default app;