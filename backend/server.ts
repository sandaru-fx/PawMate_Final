import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import mongoose from 'mongoose';
import cors from 'cors';
import apiRoutes from './routes/api.ts';
import adminRoutes from './routes/admin.ts';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pawmate';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);
app.use('/api/admin', adminRoutes);

// Detailed Startup and Database Connection
const startServer = async () => {
  try {
    console.log('--- Server Startup Process Initialized ---');
    console.log(`Port Configured: ${PORT}`);

    // Log a redacted URI to verify env loading without leaking secrets
    const redactedUri = MONGO_URI.replace(/\/\/.*@/, '//****:****@');
    console.log(`Attempting to connect to MongoDB: ${redactedUri}`);

    if (!process.env.MONGO_URI && MONGO_URI.includes('localhost')) {
      console.warn('WARNING: Using default localhost URI. If this is on Render, check your environment variables!');
    }

    await mongoose.connect(MONGO_URI);
    console.log('✅ Successfully connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server successfully running on port ${PORT}`);
    });

  } catch (err: any) {
    console.error('❌ CRITICAL ERROR DURING SERVER STARTUP:');
    if (err instanceof Error) {
      console.error(`Message: ${err.message}`);
      console.error(`Stack: ${err.stack}`);
    } else {
      console.error('Unknown Error Type:', JSON.stringify(err, null, 2));
    }
    process.exit(1);
  }
};

startServer();

// Handle generic error
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Unhandled request error:', err);
  res.status(500).json({
    message: 'Something broke!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});