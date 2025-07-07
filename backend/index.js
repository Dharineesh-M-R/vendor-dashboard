import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

const app = express(); // ✅ move this BEFORE app.use

app.use(cors());
app.use(express.json());

// Register routes after initializing the app
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes); // handles /api/user/:email

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
