"use client";
import React from "react";
import Image from "next/image";
import MannaLogo from "../../../../../public/Manna_logo.png";

function Navbar({
    user, 
    handleLogout, 
    resetLoginForm, 
    resetSignupForm, 
    setShowLogin, 
    setShowSignup
}) {

    return (
        <nav
            style={{
                height: "3.5rem",
                padding: "0 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#ffffff",
                borderBottom: "1px solid #eee",
            }}
        >
            <Image 
                src={MannaLogo} 
                alt="Manna Logo" 
                height={42} 
                priority 
            />

            <div 
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                }}
            >
                {user ? (
                    <>
                        <span 
                            style={{
                                fontSize: "0.95rem",
                                color: "#444",
                            }}
                        >
                            Welcome back, 
                            <strong>{user.name}</strong> 👋
                        </span>
                        <button 
                            style={{
                                background: "#f3f3f3",
                                border: "none",
                                padding: "0.4rem 0.8rem",
                                borderRadius: "6px",
                                cursor: "pointer",
                            }} 
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                    <button
                        style={{
                            background: "transparent",
                            border: "1px solid #ddd",
                            padding: "0.4rem 0.9rem",
                            borderRadius: "6px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            resetLoginForm();
                            setShowLogin(true);
                        }}
                    >
                        Login
                    </button>

                    <button
                        style={{
                            background: "#000",
                            color: "#fff",
                            border: "none",
                            padding: "0.45rem 1rem",
                            borderRadius: "6px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            resetSignupForm();
                            setShowSignup(true);
                        }}
                    >
                        Sign up
                    </button>
                    </>
                )}
            </div>
        </nav>
  );
}

export default Navbar;

