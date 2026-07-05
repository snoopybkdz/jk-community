import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserMenu({ user }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const backend = import.meta.env.PROD
    ? "https://jk-community.onrender.com"
    : "http://localhost:3000";

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => {
          if (user) {
            setOpen(!open);
          }
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "#171727",
          padding: "10px 18px",
          borderRadius: "12px",
          cursor: user ? "pointer" : "default",
          userSelect: "none",
        }}
      >
        {user ? (
          <>
            <img
              src={user.avatar}
              alt="Avatar"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
              }}
            />

            <span>{user.username}</span>

            <span>▼</span>
          </>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `${backend}/auth/discord`;
            }}
            style={{
              background: "#5865F2",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            Login with Discord
          </button>
        )}
      </div>

      {user && open && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: 0,
            width: "230px",
            background: "#171727",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 15px 40px rgba(0,0,0,.45)",
            zIndex: 999,
          }}
        >
          <div
            style={{
              padding: "18px",
              borderBottom: "1px solid #2d2d40",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img
              src={user.avatar}
              alt="Avatar"
              style={{
                width: 45,
                height: 45,
                borderRadius: "50%",
              }}
            />

            <div>
              <div>{user.username}</div>

              <small style={{ color: "#888" }}>
                Discord Account
              </small>
            </div>
          </div>

          <div
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
            style={{
              padding: "15px 20px",
              cursor: "pointer",
            }}
          >
            👤 Profile
          </div>

          <div
            onClick={() => {
              setOpen(false);
              navigate("/apply");
            }}
            style={{
              padding: "15px 20px",
              cursor: "pointer",
            }}
          >
            📄 My Applications
          </div>

          <div
            onClick={() => {
              window.location.href = `${backend}/logout`;
            }}
            style={{
              padding: "15px 20px",
              cursor: "pointer",
              color: "#ff5555",
            }}
          >
            🚪 Logout
          </div>
        </div>
      )}
    </div>
  );
}

