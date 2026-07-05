import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(
  import.meta.env.PROD
    ? "https://jk-community.onrender.com/api/user"
    : "http://localhost:3000/api/user",
  {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) {
    return (
      <div
        style={{
          background: "#0B0B14",
          color: "white",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "22px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0B0B14",
        color: "white",
        padding: "60px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "#171727",
          borderRadius: "20px",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <img
          src={user.avatar}
          alt=""
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            border: "5px solid #8b5cf6",
          }}
        />

        <h1
          style={{
            marginTop: "20px",
            fontSize: "38px",
          }}
        >
          {user.username}
        </h1>

        <p
          style={{
            color: "#888",
            fontSize: "18px",
          }}
        >
          Discord Member
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "50px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              background: "#202035",
              padding: "25px",
              borderRadius: "15px",
              width: "220px",
            }}
          >
            <h3>Applications</h3>

            <h1 style={{ color: "#8b5cf6" }}>
              0
            </h1>
          </div>

          <div
            style={{
              background: "#202035",
              padding: "25px",
              borderRadius: "15px",
              width: "220px",
            }}
          >
            <h3>Status</h3>

            <h1 style={{ color: "#22c55e" }}>
              Active
            </h1>
          </div>

          <div
            style={{
              background: "#202035",
              padding: "25px",
              borderRadius: "15px",
              width: "220px",
            }}
          >
            <h3>Role</h3>

            <h1 style={{ color: "#f59e0b" }}>
              Member
            </h1>
          </div>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          style={{
            marginTop: "45px",
            padding: "15px 40px",
            border: "none",
            borderRadius: "12px",
            background: "#8b5cf6",
            color: "white",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
}