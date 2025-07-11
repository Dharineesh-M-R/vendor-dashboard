import express from "express";
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

export default router;
