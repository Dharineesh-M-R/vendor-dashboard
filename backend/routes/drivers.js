import express from "express";
import cors from 'cors';
import supabase from "../supabaseClient.js"; // also check if .js is needed here depending on setup

const router = express.Router();

router.post("/driverdata", async (req, res) => {
  const {
    empid,
    driver_name,
    date_of_joining,
    vehicle_type,
    vehicle_number,
    pan_number,
    aadhar_number,
    liscence_number,
    phone_number,
    email,
    address,
    salary,
    department,
    account_number,
    ifsc_code,
  } = req.body;

  const { data, error } = await supabase
    .from("driver")
    .insert([
      {
        empid,
        driver_name,
        date_of_joining,
        vehicle_type,
        vehicle_number,
        pan_number,
        aadhar_number,
        liscence_number,
        phone_number,
        email,
        address,
        salary,
        department,
        account_number,
        ifsc_code,
      },
    ]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ message: "Driver inserted successfully", data });
});

  router.get('/driverdata', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('driver') // replace with your actual table name
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
  



router.delete('/delete/:empid', async (req, res) => {
  const { empid } = req.params;

  try {
    const { data, error } = await supabase
      .from('driver')
      .delete()
      .eq('empid', empid);

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
