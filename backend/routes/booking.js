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

router.get('/datafromdb', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('booking') // replace with your actual table name
      .select('*');

    if (error) {
      console.error('Supabase Error:', error.message);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('booking')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Supabase delete error:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Booking deleted', data });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



export default router;
