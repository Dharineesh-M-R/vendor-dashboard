import express from 'express';
import cors from 'cors';
import supabase from '../supabaseClient.js';

const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());


router.post('/pushdetails', async (req, res) => {
  const { id, date, status, driver_name, vehicle_type, vehicle_number, location, contact_number,company_name } = req.body;


  try {
    const { data, error } = await supabase
      .from('booking')
      .insert([{ id, date, status, driver_name, vehicle_type, vehicle_number, location, contact_number,company_name }]);

    if (error) {
      console.error("Supabase insert error:", error); // 🧪 log the Supabase error
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Booking added successfully', data });
  } catch (err) {
    console.error("Server error:", err); // 🧪 log any server error
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/bookings', async (req, res) => {
  const { data, error } = await supabase.from('bookings').select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


export default router;
