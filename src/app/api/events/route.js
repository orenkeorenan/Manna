import { db } from "@/app/lib/db";

// CREATE new event
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
        category || null,
        title || null,
        event_date || null,
        start_time || null,
        duration_hours || null,
        address || null,
        place_type || null,
        floor_detail || null,
        city || null,
      ]
    );

    return Response.json({ ok: true, eventId: result.insertId });
  } catch (err) {
    console.error("EVENT CREATE ERROR:", err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}

// LIST all events
export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT
        id,
        category,
        title,
        city,
        event_date,
        start_time,
        duration_hours,
        address,
        place_type,
        floor_detail
      FROM events
      ORDER BY id DESC
    `);

    // format dates and add fallbacks
    const formatted = rows.map((e) => ({
      ...e,
      title: e.title || "Untitled Event",
      category: e.category || "N/A",
      city: e.city || "Unknown",
      event_date: e.event_date
        ? new Date(e.event_date).toISOString().split("T")[0]
        : "Not set",
      start_time: e.start_time || "Not set",
      duration_hours: e.duration_hours || "Not set",
      address: e.address || "Not set",
      place_type: e.place_type || "Not set",
      floor_detail: e.floor_detail || "Not set",
    }));

    return Response.json(formatted, { status: 200 });
  } catch (err) {
    console.error("EVENT LIST ERROR:", err);
    return Response.json([], { status: 500 });
  }
}
