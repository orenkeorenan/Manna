import React from "react";
import Inputs from "../../component/Inputs/Inputs";

function TitleEvent({ title, setTitle }) {
  return (
    <Inputs
        type="text"
        placeholder="Event title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
            flex: 1,
            padding: "0.7rem 0.75rem",
            borderRadius: "0.5rem",
            border: "1px solid #d1d5db",
            outline: "none",
            fontSize: "0.9rem",
            backgroundColor: "white",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
        onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
    />
  );
}

export default TitleEvent;
