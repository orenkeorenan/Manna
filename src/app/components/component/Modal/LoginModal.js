import React from 'react'
import Modal from './Modal'

function LoginModal({
    onClose,
    handleLogin,
    loginEmail,
    loginPassword,
    setLoginEmail,
    setLoginPassword,
}) {
  return (
    <Modal
        title="Welcome back" 
        onClose={onClose}
    >
        <form 
            onSubmit={handleLogin} 
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
            }}
        >
            <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
            />
            <button 
                style={{
                    marginTop: "0.5rem",
                    background: "#000",
                    color: "#fff",
                    border: "none",
                    padding: "0.6rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                }}
            >
                Login
            </button>
        </form>
    </Modal>
  )
}

export default LoginModal