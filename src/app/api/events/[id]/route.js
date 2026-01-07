import { db } from "@/app/lib/db";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const {
      event_date,
      start_time,
      duration_hours,
      address,
      place_type,
      floor_detail,
      city,
      district,
      address_detail,
    } = body;

    await db.query(
      `
      UPDATE events
      SET
        event_date = ?,
        start_time = ?,
        duration_hours = ?,
        address = ?,
        place_type = ?,
        floor_detail = ?,
        city = ?,
        district = ?,
        address_detail = ?
      WHERE id = ?
      `,
      [
        event_date,
        start_time,
        duration_hours,
        address,
        place_type,
        floor_detail,
        city,
        district,
        address_detail,
        id,
      ]
    );

    return Response.json({ ok: true });
  } catch (err) {
    console.error("EVENT PATCH ERROR:", err);
    return Response.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
