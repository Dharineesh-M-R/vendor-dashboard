import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import supabase from '../supabaseClient.js'; // Add `.js` extension

const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());

// GET /api/auth/user/:email
router.get('/user/:email', async (req, res) => {
  const { email } = req.params;

  const { data, error } = await supabase
    .from('users')
    .select('name, role')
    .eq('email', email)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(data);
});



// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const { data: existingUser, error: findError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword, role }]);

    if (error) throw error;

    res.status(200).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Fetch user by email
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // 3. Login success
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: data.id,
        name: data.name,
        role: data.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/activebooking' , async (res,req) =>{
  try{
    const {data,error} = await supabase
    .from('booking')
    .select('*')

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

export default router;
