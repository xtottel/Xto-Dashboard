import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRoutes } from '@/routes/auth';
//import { userRoutes } from '@/routes/user';
import { logger } from '@/utils/logger';
import 'dotenv/config';
 
const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    if (origin === "http://localhost:3000") return callback(null, true);
    
    const hostname = new URL(origin).hostname;
    if (/\.?xtopay\.co$/.test(hostname)) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// Rate limiting middleware
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  
  // Simple in-memory rate limiting (in production, use Redis)
  if (!req.app.locals.rateLimits) {
    req.app.locals.rateLimits = new Map();
  }
  
  let limit = req.app.locals.rateLimits.get(ip);
  
  if (!limit || now > limit.resetTime) {
    limit = { count: 0, resetTime: now + 60000 };
    req.app.locals.rateLimits.set(ip, limit);
  }
  
  limit.count++;
  
  if (limit.count > 100) {
    return res.status(429).json({ error: "Too many requests. Slow down a bit." });
  }
  
  next();
});

// Routes - temporarily commented out
app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Welcome endpoint
app.get('/welcome', (req, res) => {
  res.json({
    message: 'Welcome to XtoPay API Server!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      auth: '/auth',
      welcome: '/welcome',
      docs: '/api-docs' // You might want to add API documentation later
    },
    status: 'operational'
  });
});

// Default endpoint (/)
app.get('/', (req, res) => {
  res.redirect('/welcome');
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  logger.info(`🚀 Server started on http://localhost:${PORT}`);
});