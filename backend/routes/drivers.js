import express from "express";
import supabase from "../supabaseClient";

const souter = express.Router();

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
});

export default router;
