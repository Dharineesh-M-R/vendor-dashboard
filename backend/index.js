import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import bookingRoutes from './routes/booking.js'; // ✅ Use a different name

const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); // handles /api/user/:email
app.use('/api/booking', bookingRoutes); // handles /api/booking endpoints

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
