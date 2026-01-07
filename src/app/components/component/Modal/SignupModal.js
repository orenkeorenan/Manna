import React from 'react'
import Modal from './Modal';

function SignupModal({
    onClose,
    handleSignup,
    signupName,
    setSignupName,
    signupEmail,
    setSignupEmail,
    signupPassword,
    setSignupPassword,
}) {
    return (
        <Modal 
            title="Create your Manna account ✨" 
            onClose={onClose}
        >
            <form 
                onSubmit={handleSignup} 
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                }}
            >
                <input
                    type="text"
                    placeholder="Name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
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
                    Sign up
                </button>
            </form>
        </Modal>
    )
}

export default SignupModal