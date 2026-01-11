"use client"

import React, { useState } from "react";

const categories = [
    { value: "coffee", label: "☕ Coffee" },
    { value: "study", label: "📚 Study" },
    { value: "dinner", label: "🍽 Dinner" },
    { value: "drinks", label: "🍻 Drinks" },
    { value: "sports", label: "⚽ Sports" },
    { value: "etc", label: "✨ Etc" },
];

function CattegoryEvent({ category, setCategory }) {
    const [open, setOpen] = useState(false);

    const selected = categories.find((c) => c.value === category);

    return (
        <div style={{ position: "relative", minWidth: "160px" }}>
        {/* Trigger */}
            <div
                onClick={() => setOpen(!open)}
                style={{
                    padding: "0.6rem 0.8rem",
                    borderRadius: "0.6rem",
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid #d1d5db",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <span>{selected ? selected.label : "Select category"}</span>
                <span style={{ opacity: 0.5 }}>▾</span>
            </div>

        {/* Dropdown */}
        {open && (
            <div
                style={{
                    position: "absolute",
                    top: "110%",
                    left: 0,
                    right: 0,
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "0.6rem",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    zIndex: 50,
                    overflow: "hidden",
                }}
            >
            {categories.map((cat) => (
                <div
                    key={cat.value}
                    onClick={() => {
                        setCategory(cat.value);
                        setOpen(false);
                    }}
                    style={{
                        padding: "0.6rem 0.8rem",
                        cursor: "pointer",
                        transition: "0.2s",
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#f3f4f6")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                    }
                >
                {cat.label}
                </div>
            ))}
            </div>
        )}
        </div>
    );
}

export default CattegoryEvent;
