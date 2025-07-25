import express from 'express';
import supabase from '../supabaseClient.js';
import cors from 'cors';

const router = express.Router();

// Middleware (✅ this should be in main server file, not router ideally)
router.use(cors());
router.use(express.json());

// POST: Insert invoice
router.post('/senddata', async (req, res) => {
  const { invid, date, amount, status, company_name, description } = req.body;

  try {
    const { data, error } = await supabase
      .from("invoice") // ✅ Make sure your table name is correct
      .insert([{ invid, date, amount, status, company_name, description }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ message: "Failed to insert invoice.", error });
    }

    return res.status(200).json({ message: "Invoice added successfully.", data });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Server error occurred.", error: err.message });
  }
});

// ❌ Wrong keyword: "asunc" → ✅ Correct: "async"
// GET: Fetch all invoice data
router.get('/datafromdb', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("invoice") // ✅ Table name must match the one you used in insert
      .select("*");

    if (error) {
      console.error("Supabase select error:", error);
      return res.status(500).json({ message: "Failed to fetch invoices.", error });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Server error occurred.", error: err.message });
  }
});

router.get('/pendingdata', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("invoice") // ✅ Table name must match the one you used in insert
      .select("*")
      .eq('status', 'Pending');

    if (error) {
      console.error("Supabase select error:", error);
      return res.status(500).json({ message: "Failed to fetch invoices.", error });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Server error occurred.", error: err.message });
  }
});

router.put("/mark-received/:invid", async (req, res) => {
  const { invid } = req.params;

  try {
    const { data, error } = await supabase
      .from("invoice")
      .update({ status: "Received" })
      .eq("invid", invid);

    if (error) {
      console.error("Supabase update error:", error);
      return res.status(500).json({ error: "Failed to update invoice." });
    }

    res.json({ message: "Invoice marked as Received.", data });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

export default router;
