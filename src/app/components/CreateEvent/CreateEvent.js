"use client";
import React, { useState } from "react";

export default function CreateEvent() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [eventId, setEventId] = useState(null);

  // STEP 2 modal fields
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [address, setAddress] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [floorDetail, setFloorDetail] = useState("");
  const [city, setCity] = useState("");

  // STEP 1: Create minimal event
  async function handleCreate() {
    if (!category || !title) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, title }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Failed to create event");
        setLoading(false);
        return;
      }

      setEventId(data.eventId);
      setShowDetails(true); // open modal
      setCategory("");
      setTitle("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  }

  // STEP 2: Update event with details
  async function handlePostDetails() {
    if (!eventDate || !startTime || !duration || !address) {
      alert("Fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_date: eventDate,
          start_time: startTime,
          duration_hours: parseFloat(duration),
          address,
          place_type: placeType,
          floor_detail: floorDetail,
          city,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        alert("Failed to post event details");
        setLoading(false);
        return;
      }

      alert("Event fully created ✅");
      props.onEventCreated?.();
      setShowDetails(false);

      // Reset modal inputs
      setEventDate("");
      setStartTime("");
      setDuration("");
      setAddress("");
      setPlaceType("");
      setFloorDetail("");
      setCity("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <>
      {/* STEP 1 */}
      <div style={styles.createBox}>
        <input
          placeholder="Category (Coffee, Study, Dinner)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleCreate} disabled={loading} style={styles.primaryBtn}>
          {loading ? "Creating..." : "Create"}
        </button>
      </div>

      {/* STEP 2 MODAL */}
      {showDetails && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={{ marginBottom: "1rem" }}>Tell us more ✨</h3>

            <input
              style={styles.input}
              placeholder="Event date (YYYY-MM-DD)"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
            <input
              style={styles.input}
              placeholder="Start time (18:30)"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <input
              style={styles.input}
              placeholder="Duration (2.5 hours)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <input
              style={styles.input}
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              style={styles.input}
              placeholder="Place type (Cafe, Bar)"
              value={placeType}
              onChange={(e) => setPlaceType(e.target.value)}
            />
            <input
              style={styles.input}
              placeholder="Floor / building detail"
              value={floorDetail}
              onChange={(e) => setFloorDetail(e.target.value)}
            />
            <input
              style={styles.input}
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
              <button onClick={handlePostDetails} style={styles.primaryBtn}>
                {loading ? "Posting..." : "Post Event"}
              </button>
              <button
                style={styles.secondaryBtn}
                onClick={() => setShowDetails(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= STYLES ================= */

const styles = {
  createBox: {
    backgroundColor: "#f3f4f6",
    width: "80vw",
    padding: "1rem",
    borderRadius: "0.75rem",
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
    justifyContent: "center",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },

  modal: {
    backgroundColor: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(12px)",
    padding: "1.5rem",
    borderRadius: "1rem",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },

  input: {
    width: "100%",
    padding: "0.6rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    marginBottom: "0.5rem",
    outline: "none",
  },

  primaryBtn: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "0.6rem 1rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
  },

  secondaryBtn: {
    backgroundColor: "#e5e7eb",
    padding: "0.6rem 1rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
  },
};
