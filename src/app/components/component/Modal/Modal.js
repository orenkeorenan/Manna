import React, { useEffect } from "react";

function Modal({ title, children, onClose }) {

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);

    // Prevent background scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div 
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} // prevent outside click
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          minWidth: "320px",
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "transparent",
            border: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
            color: "#666",
          }}
        >
          ✕
        </button>

        {title && <h2>{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export default Modal;
