import React from 'react'

function Modal({ title, children, onClose }) {
  return (
    <div 
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
        style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            minWidth: "320px",
        }}
    >
        <h2 style={{ marginBottom: "1rem" }}>{title}</h2>
        {children}
        <button 
            style={{
                marginTop: "1rem",
                background: "transparent",
                border: "none",
                color: "#666",
                cursor: "pointer",
            }} 
            onClick={onClose}
        >
            Close
        </button>
      </div>
    </div>
  );
}

export default Modal