import { db } from "@/app/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      category,
      title,
      event_date,
      start_time,
      duration_hours,
      address,
      place_type,
      floor_detail,
      city,
    } = body;

    const [result] = await db.query(
      `
        INSERT INTO events (
            category,
            title,
            event_date,
            start_time,
            duration_hours,
            address,
            place_type,
            floor_detail,
            city
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        category,
        title,
        event_date,
        start_time,
        duration_hours,
        address,
        place_type,
        floor_detail,
        city,
      ]
    );

    return Response.json({ ok: true, eventId: result.insertId });
  } catch (err) {
    console.error("EVENT CREATE ERROR:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}



export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT
        id,
        category,
        title,
        city,
        event_date,
        start_time
      FROM events
      ORDER BY id DESC
    `);

    return Response.json(rows);
  } catch (err) {
    console.error("EVENT LIST ERROR:", err);
    return Response.json([], { status: 500 });
  }
}

