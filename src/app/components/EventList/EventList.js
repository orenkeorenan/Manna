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
          <h3 style={{ margin: 0 }}>{event.title || "Untitled Event"}</h3>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>Category:</strong> {event.category || "N/A"}
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>City:</strong> {event.city || "Unknown"}
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>Date:</strong>{" "}
            {event.event_date
              ? new Date(event.event_date).toLocaleDateString()
              : "Not set"}
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>Start Time:</strong> {event.start_time || "Not set"}
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>Duration:</strong> {event.duration_hours || "Not set"} hour(s)
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>Address:</strong> {event.address || "Not set"}
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>Place Type:</strong> {event.place_type || "Not set"}
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>Floor Detail:</strong> {event.floor_detail || "Not set"}
          </p>
          {event.district && (
            <p style={{ margin: "0.25rem 0" }}>
              <strong>District:</strong> {event.district}
            </p>
          )}
          {event.address_detail && (
            <p style={{ margin: "0.25rem 0" }}>
              <strong>Address Detail:</strong> {event.address_detail}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
