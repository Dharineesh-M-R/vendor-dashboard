import express from "express";
import supabase from "../supabaseClient.js";

const router = express.Router();

// POST /senddata
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
      console.error("🔥 Supabase insert error:", error);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ message: "Vehicle inserted successfully", data });
  } catch (err) {
    console.error("💥 Unexpected server error:", err);
    return res.status(500).json({ error: "Internal server error", detail: err.message });
  }
});

// ✅ ADD THIS: GET /getdata (FIXED: req/res order was wrong)
router.get("/getdata", async (req, res) => {
  const { data, error } = await supabase.from("vehicles").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
});

// ✅ ADD THIS: DELETE /delete/:vehid
router.delete("/delete/:vehid", async (req, res) => {
  const { vehid } = req.params;

  const { error } = await supabase
    .from("vehicles")
    .delete()
    .eq("vehid", vehid);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ message: "Vehicle deleted successfully." });
});


export default router;
