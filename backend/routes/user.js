// routes/user.js
import express from 'express';
import supabase from '../supabaseClient.js'; // update this path as needed

const router = express.Router();

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

export default router;
