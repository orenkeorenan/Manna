import React from 'react'
import Modal from './Modal'
import Inputs from '../Inputs/Inputs'
import Buttons from '../Buttons/Buttons'

function CreateEventModal({
  eventDate,
  setEventDate,
  startTime,
  setStartTime,
  duration,
  setDuration,
  address,
  setAddress,
  placeType,
  setPlaceType,
  floorDetail,
  setFloorDetail,
  city,
  setCity,
  handlePostDetails,
  loading,
  onClose
}) {
  return (
    <Modal title="Tell us more ✨" onClose={onClose}>
      <Inputs
        placeholder="Event date (YYYY-MM-DD)"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />
      <Inputs
        placeholder="Start time (18:30)"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <Inputs
        placeholder="Duration (2.5 hours)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <Inputs
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Inputs
        placeholder="Place type (Cafe, Bar)"
        value={placeType}
        onChange={(e) => setPlaceType(e.target.value)}
      />
      <Inputs
        placeholder="Floor / building detail"
        value={floorDetail}
        onChange={(e) => setFloorDetail(e.target.value)}
      />
      <Inputs
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        <Buttons onClick={handlePostDetails}>
          {loading ? "Posting..." : "Post Event"}
        </Buttons>
        <Buttons
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Buttons>
      </div>
    </Modal>
  )
}

export default CreateEventModal
