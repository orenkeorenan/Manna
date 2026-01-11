"use client";
import React, { useState } from "react";
import Inputs from "../component/Inputs/Inputs";
import CattegoryEvent from "./CattegoryEvent/CattegoryEvent";
import TitleEvent from "./TitleEvent/TitleEvent";
import Buttons from "../component/Buttons/Buttons";
import CreateEventModal from "../component/Modal/CreateEventModal";

export default function CreateEvent() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [eventId, setEventId] = useState(null);

  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [address, setAddress] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [floorDetail, setFloorDetail] = useState("");
  const [city, setCity] = useState("");

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
      setShowDetails(true);
      setCategory("");
      setTitle("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  }

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

  const handleCloseModal = () => {
    setShowDetails(false);
  };

  return (
    <>
      {/* STEP 1 */}
        <div
            style={{
            backgroundColor: "#f3f4f6",
            width: "80vw",
            padding: "1rem",
            borderRadius: "0.75rem 0.75rem 0 0",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            justifyContent: "center",
            }}
        >
            <CattegoryEvent category={category} setCategory={setCategory} />
            <TitleEvent setTitle={setTitle} title={title} />
            <Buttons onClick={handleCreate} loading={loading}>
                {loading ? "Creating..." : "Create"}
            </Buttons>
        </div>

        {/* STEP 2 MODAL */}
        {showDetails && (
            <CreateEventModal
                eventDate={eventDate}
                setEventDate={setEventDate}
                startTime={startTime}
                setStartTime={setStartTime}
                duration={duration}
                setDuration={setDuration}
                address={address}
                setAddress={setAddress}
                placeType={placeType}
                setPlaceType={setPlaceType}
                floorDetail={floorDetail}
                setFloorDetail={setFloorDetail}
                city={city}
                setCity={setCity}
                handlePostDetails={handlePostDetails}
                loading={loading}
                onClose={handleCloseModal}   
            />
        )}
    </>
  );
}
