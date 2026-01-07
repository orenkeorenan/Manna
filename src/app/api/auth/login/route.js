import { db } from "@/app/lib/db"
import bcrypt from "bcryptjs"

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return Response.json({ error: "Missing fields" }, { status: 400 })
    }

    const [rows] = await db.query(
      "SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1",
      [email]
    )

    if (rows.length === 0) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const user = rows[0]
    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // 🚨 DO NOT return password
    return Response.json({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  } catch (err) {
    console.error("LOGIN ERROR:", err)
    return Response.json({ error: "Login failed" }, { status: 500 })
  }
}
