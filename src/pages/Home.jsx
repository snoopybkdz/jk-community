import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(
      import.meta.env.PROD
        ? "https://jk-community.onrender.com/api/user"
        : "http://localhost:3000/api/user",
      {
        credentials: "include",
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data);

        if (data) {
          localStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0B0B14,#111122)",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <Navbar user={user} />

      {/* Hero */}
      <div
        style={{
          textAlign: "center",
          marginTop: "120px",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            marginBottom: "20px",
          }}
        >
          مرحباً بك في
          <br />
          <span style={{ color: "#a855f7" }}>
            JK Community
          </span>
        </h1>

        <p
          style={{
            color: "#aaa",
            fontSize: "22px",
            maxWidth: "800px",
            margin: "auto",
            lineHeight: "1.8",
          }}
        >
          الموقع الرسمي لتقديم طلبات الإدارة والانضمام إلى فريق العمل.
          جميع الطلبات تتم مراجعتها من قبل الإدارة بشكل يدوي.
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "120px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#171727",
            padding: "30px",
            borderRadius: "20px",
            width: "220px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#a855f7" }}>1500+</h2>
          <p>عضو في المجتمع</p>
        </div>

        <div
          style={{
            background: "#171727",
            padding: "30px",
            borderRadius: "20px",
            width: "220px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#a855f7" }}>25</h2>
          <p>عضو في الإدارة</p>
        </div>

        <div
          style={{
            background: "#171727",
            padding: "30px",
            borderRadius: "20px",
            width: "220px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#a855f7" }}>24/7</h2>
          <p>دعم ومساعدة</p>
        </div>
      </div>

      {/* Application Card */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "90px",
          marginBottom: "100px",
        }}
      >
        <div
          onClick={() => navigate("/apply")}
          style={{
            width: "430px",
            background: "#171727",
            border: "1px solid #2d2d40",
            borderRadius: "20px",
            padding: "35px",
            cursor: "pointer",
            transition: ".25s",
            boxShadow: "0 15px 40px rgba(0,0,0,.4)",
          }}
        >
          <div
            style={{
              width: "65px",
              height: "65px",
              borderRadius: "16px",
              background: "#a855f7",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "30px",
              color: "#fff",
              boxShadow: "0 0 20px rgba(168,85,247,.45)",
            }}
          >
            📄
          </div>

          <h2
            style={{
              marginTop: "25px",
              marginBottom: "15px",
              fontSize: "34px",
            }}
          >
            Staff Application
          </h2>

          <p
            style={{
              color: "#9ca3af",
              lineHeight: "1.9",
              fontSize: "17px",
            }}
          >
            Welcome to the official JK Community Staff Application Form.
            Please fill out this form honestly and carefully.
            Make sure you meet all the listed requirements before applying.
            Once submitted, our Staff Management Team will review your application.
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/apply");
            }}
            style={{
              width: "100%",
              marginTop: "30px",
              padding: "17px",
              border: "none",
              borderRadius: "12px",
              background: "#a855f7",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(168,85,247,.35)",
            }}
          >
            ➜ Submit Form
          </button>
        </div>
      </div>
    </div>
  );
}