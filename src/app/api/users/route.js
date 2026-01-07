import { db } from "@/app/lib/db";
import bcrypt from "bcryptjs";

// POST = signup
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // 1️⃣ Validate required fields
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "Please fill all fields" }), { status: 400 });
    }

    // 2️⃣ Check if user already exists
    const [existingUser] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return new Response(JSON.stringify({ error: "You already have an account with this email" }), { status: 409 });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Insert new user
    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return new Response(JSON.stringify({ success: true, id: result.insertId }), { status: 201 });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return new Response(JSON.stringify({ error: "Signup failed" }), { status: 500 });
  }
}

// // Optional GET = list users (for testing only)
// export async function GET() {
//   try {
//     const [rows] = await db.query("SELECT id, name, email FROM users");
//     return new Response(JSON.stringify(rows), { status: 200 });
//   } catch (err) {
//     console.error("GET USERS ERROR:", err);
//     return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
//   }
// }
