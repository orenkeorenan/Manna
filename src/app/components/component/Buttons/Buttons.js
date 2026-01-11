import React from "react";

function Buttons({
    children,
    onClick,
    variant = "primary", 
    disabled = false,
    loading = false,
    style = {},
}) {
    const baseStyle = {
        padding: "0.6rem 1rem",
        borderRadius: "0.5rem",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "0.9rem",
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.4rem",
        opacity: disabled ? 0.6 : 1,
    };

    const variants = {
        primary: {
        backgroundColor: "#2563eb",
        color: "white",
        },
        secondary: {
        backgroundColor: "#e5e7eb",
        color: "#111827",
        },
        ghost: {
        backgroundColor: "transparent",
        color: "#2563eb",
        border: "1px solid #d1d5db",
        },
        danger: {
        backgroundColor: "#ef4444",
        color: "white",
        },
    };

  return (
    <button
        onClick={!disabled && !loading ? onClick : undefined}
        disabled={disabled}
        style={{
            ...baseStyle,
            ...variants[variant],
            ...style,
        }}
        onMouseEnter={(e) => {
            if (disabled) return;
            e.target.style.filter = "brightness(0.95)";
        }}
        onMouseLeave={(e) => {
            e.target.style.filter = "none";
        }}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Buttons;
