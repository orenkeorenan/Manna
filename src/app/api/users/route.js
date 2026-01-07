import { db } from "@/app/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("SIGNUP BODY:", body);

    const { name, email, password } = body;

    // 1️⃣ Check required fields
    if (!name || !email || !password) {
      console.log("❌ Missing fields");
      return Response.json({ error: "Please fill all fields" }, { status: 400 });
    }

    // 2️⃣ Check if email already exists
    const [existingUser] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      console.log("❌ User already exists:", email);
      return Response.json({ error: "You already have an account with this email" }, { status: 409 });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Insert new user
    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    console.log("✅ INSERT RESULT:", result);

    return Response.json({ success: true });
  } catch (err) {
    console.error("❌ SIGNUP ERROR:", err);
    return Response.json({ error: "Signup failed" }, { status: 500 });
  }
}
