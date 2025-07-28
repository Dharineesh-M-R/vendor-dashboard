import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import bookingRoutes from './routes/booking.js';
import driversRoutes from './routes/drivers.js';
import vehiclesRoutes from './routes/vehicles.js';
import invoicesRoutes from './routes/invoices.js';
import { adminRouter } from './routes/admin.js'; // ✅ named import

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/drivers', driversRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/invoices', invoicesRoutes);
app.use('/api/admin', adminRouter); // ✅ named use

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
