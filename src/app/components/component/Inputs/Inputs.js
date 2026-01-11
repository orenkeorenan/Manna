import React from "react";

function Inputs({
    placeholder,
    value,
    onChange,
    type = "text",
    style = {},
    error = false,
}) {
  return (
    <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
            width: "100%",
            padding: "0.6rem 0.75rem",
            borderRadius: "0.5rem",
            border: error ? "1px solid #ef4444" : "1px solid #d1d5db",
            outline: "none",
            fontSize: "0.9rem",
            backgroundColor: "white",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            ...style,
        }}
        onFocus={(e) => {
            e.target.style.borderColor = "#2563eb";
            e.target.style.boxShadow = "0 0 0 2px rgba(37,99,235,0.15)";
        }}
        onBlur={(e) => {
            e.target.style.borderColor = error ? "#ef4444" : "#d1d5db";
            e.target.style.boxShadow = "none";
        }}
    />
  );
}

export default Inputs;
