import supabase from "../supabaseClient.js";

/**
 * GET /api/admin/all-users
 * Returns all users, admin access only
 */
export const getAllUsers = async (req, res) => {
  const email = req.headers["x-user-email"];

  if (!email) {
    return res.status(400).json({ message: "Missing x-user-email in header" });
  }

  try {
    const { data: currentUser, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("email", email)
      .single();

    if (userError || !currentUser) {
      return res.status(403).json({ message: "User not found or unauthorized" });
    }

    if (currentUser.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { data: users, error } = await supabase
      .from("users")
      .select("id, name, email, role")
      .order("name", { ascending: true });

    if (error) {
      return res.status(500).json({ message: "Failed to fetch users", error });
    }

    return res.status(200).json(users);
  } catch (err) {
    console.error("Error in getAllUsers:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
