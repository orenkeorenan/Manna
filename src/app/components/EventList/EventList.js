"use client";
import { useEffect, useState } from "react";

export default function EventList({ refreshSignal }) {
  const [events, setEvents] = useState([]);

  async function fetchEvents() {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (refreshSignal) fetchEvents();
  }, [refreshSignal]);

  return (
    <div
      style={{
        width: "80vw",
        minHeight: "25rem",
        backgroundColor: "#eee",
        padding: "1rem",
      }}
    >
      {events.length === 0 && <p>No events yet</p>}

      {events.map((event) => (
        <div
          key={event.id}
          style={{
            background: "white",
            padding: "1rem",
            marginBottom: "0.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: 0 }}>{event.title ?? ""}</h3>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>Category:</strong> {event.category ?? ""}
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>City:</strong> {event.city ?? ""}
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>Date:</strong>{" "}
            {event.event_date ?? ""}
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>Start Time:</strong> {event.start_time ?? ""}
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>Duration:</strong> {event.duration_hours ?? ""} hour(s)
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>Address:</strong> {event.address ?? ""}
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>Place Type:</strong> {event.place_type ?? ""}
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>Floor Detail:</strong> {event.floor_detail ?? ""}
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>District:</strong> {event.district ?? ""}
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>Address Detail:</strong> {event.address_detail ?? ""}
          </p>
        </div>
      ))}
    </div>
  );
}
