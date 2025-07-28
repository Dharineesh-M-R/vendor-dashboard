import express from "express";
import { getAllUsers } from "../controllers/admin.js";
import supabase from "../supabaseClient.js";

const router = express.Router();

router.get("/all-users", getAllUsers);

router.put('/make-admin', async (req, res) => {
  const { userId } = req.body;
  const requesterEmail = req.headers['x-user-email'];

  // Verify requester is admin
  const { data: requester, error: requesterError } = await supabase
    .from('users')
    .select('role')
    .eq('email', requesterEmail)
    .single();

  if (requesterError || !requester || requester.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { error } = await supabase
    .from('users')
    .update({ role: 'admin' })
    .eq('id', userId);

  if (error) {
    return res.status(500).json({ message: 'Failed to update role' });
  }

  res.status(200).json({ message: 'User promoted to admin' });
});

router.put('/make-staff', async (req, res) => {
  const { userId } = req.body;
  const requesterEmail = req.headers['x-user-email'];

  const { data: requester, error: requesterError } = await supabase
    .from('users')
    .select('role')
    .eq('email', requesterEmail)
    .single();

  if (requesterError || !requester || requester.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { error } = await supabase
    .from('users')
    .update({ role: 'staff' })
    .eq('id', userId);

  if (error) {
    return res.status(500).json({ message: 'Failed to update role' });
  }

  res.status(200).json({ message: 'User demoted to staff' });
});


export const adminRouter = router;
