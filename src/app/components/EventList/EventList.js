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

  // refetch whenever refreshSignal changes
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
          }}
        >
          <strong>{event.title}</strong>
          <div>{event.category}</div>
          {event.city && <div>{event.city}</div>}
        </div>
      ))}
    </div>
  );
}
