"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import LoginModal from "../component/Modal/LoginModal";
import SignupModal from "../component/Modal/SignupModal";

function Navbars() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });

    const [user, setUser] = useState(null);

    // ----------------- Form Handlers -----------------
    const resetLoginForm = () => setLoginForm({ email: "", password: "" });
    const resetSignupForm = () => setSignupForm({ name: "", email: "", password: "" });

    const closeLoginModal = () => {
        resetLoginForm();
        setShowLogin(false);
    };

    const closeSignupModal = () => {
        resetSignupForm();
        setShowSignup(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginForm),
        });
        const data = await res.json();
        if (!res.ok) return alert(data.error);

        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        closeLoginModal();
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signupForm),
        });
        const data = await res.json();
        if (!res.ok) return alert(data.error);

        closeSignupModal();
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    // ----------------- Persist user -----------------
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    return (
        <>
            <Navbar
                user={user}
                handleLogout={handleLogout}
                resetLoginForm={resetLoginForm}
                resetSignupForm={resetSignupForm}
                setShowLogin={setShowLogin}
                setShowSignup={setShowSignup}
            />

            {showLogin && (
                <LoginModal
                    onClose={closeLoginModal}
                    handleLogin={handleLogin}
                    loginEmail={loginForm.email}
                    loginPassword={loginForm.password}
                    setLoginEmail={(email) => setLoginForm((prev) => ({ ...prev, email }))}
                    setLoginPassword={(password) => setLoginForm((prev) => ({ ...prev, password }))}
                />
            )}

            {showSignup && (
                <SignupModal
                    onClose={closeSignupModal}
                    handleSignup={handleSignup}
                    signupName={signupForm.name}
                    signupEmail={signupForm.email}
                    signupPassword={signupForm.password}
                    setSignupName={(name) => setSignupForm((prev) => ({ ...prev, name }))}
                    setSignupEmail={(email) => setSignupForm((prev) => ({ ...prev, email }))}
                    setSignupPassword={(password) => setSignupForm((prev) => ({ ...prev, password }))}
                />
            )}
        </>
    );
}

export default Navbars;
