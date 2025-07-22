import express from "express";
import supabase from "../supabaseClient.js";

const router = express.Router();

router.post("/senddata", async (req, res) => {
  try {
    const {
      vehid,
      vehicle_type,
      plate_number,
      model,
      availability,
      condition_check_status,
      vehicle_insurance,
    } = req.body;

    const { data, error } = await supabase.from("vehicles").insert([
      {
        vehid,
        vehicle_type,
        plate_number,
        model,
        availability,
        condition_check_status,
        vehicle_insurance,
      },
    ]);

    if (error) {
      console.error("🔥 Supabase insert error:", error); // ✅ log Supabase error
      return res.status(500).json({ error: error.message });
    }
    return res
      .status(200)
      .json({ message: "Vehicle inserted successfully", data });
  } catch (err) {
    console.error("💥 Unexpected server error:", err); // ✅ log unexpected server error
    return res
      .status(500)
      .json({ error: "Internal server error", detail: err.message });
  }
});

export default router;
