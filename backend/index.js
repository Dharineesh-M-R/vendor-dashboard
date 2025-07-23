import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import bookingRoutes from './routes/booking.js'; // ✅ Use a different name
import driversRoutes from './routes/drivers.js';
import vehiclesRoutes from './routes/vehicles.js';
import invoicesRoutes from './routes/invoices.js';
const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); // handles /api/user/:email
app.use('/api/booking', bookingRoutes); // handles /api/booking endpoints
app.use('/api/drivers', driversRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/invoices', invoicesRoutes);
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
