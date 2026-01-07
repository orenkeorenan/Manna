import { db } from "@/app/lib/db"

export async function GET() {
  const [rows] = await db.query("SELECT NOW() as time")
  return Response.json(rows[0])
}
