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
            lineHeight: "1.4",
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
            color: "#9ca3af",
            fontSize: "22px",
            maxWidth: "800px",
            margin: "auto",
            lineHeight: "1.8",
          }}
        >
          الموقع الرسمي لتقديم طلبات الإدارة والانضمام إلى فريق العمل.
          جميع الطلبات تتم مراجعتها يدوياً من قبل الإدارة.
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "100px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "220px",
            background: "#171727",
            borderRadius: "18px",
            padding: "30px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#a855f7" }}>1500+</h2>
          <p>عضو في المجتمع</p>
        </div>

        <div
          style={{
            width: "220px",
            background: "#171727",
            borderRadius: "18px",
            padding: "30px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#a855f7" }}>25</h2>
          <p>عضو في الإدارة</p>
        </div>

        <div
          style={{
            width: "220px",
            background: "#171727",
            borderRadius: "18px",
            padding: "30px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#a855f7" }}>24/7</h2>
          <p>دعم ومساعدة</p>
        </div>
      </div>

      {/* Staff Application Card */}
      <div
        onClick={() => navigate("/apply")}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-10px) scale(1.03)";
          e.currentTarget.style.boxShadow =
            "0 0 45px rgba(168,85,247,.45)";
          e.currentTarget.style.borderColor = "#a855f7";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow =
            "0 15px 40px rgba(0,0,0,.35)";
          e.currentTarget.style.borderColor = "#2d2d40";
        }}
        style={{
          width: "470px",
          margin: "90px auto",
          background: "#171727",
          borderRadius: "22px",
          border: "1px solid #2d2d40",
          padding: "35px",
          cursor: "pointer",
          transition: ".35s",
          boxShadow: "0 15px 40px rgba(0,0,0,.35)",
        }}
      >
        {/* Icon */}
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
            boxShadow: "0 0 25px rgba(168,85,247,.45)",
          }}
        >
          📄
        </div>

        {/* Title */}
        <h2
          style={{
            marginTop: "25px",
            color: "white",
            fontSize: "38px",
          }}
        >
          Staff Application
        </h2>

        {/* Description */}
        <p
          style={{
            color: "#9ca3af",
            lineHeight: "2",
            fontSize: "17px",
          }}
        >
          Welcome to the official JK Community Staff Application Form.
          Please fill out this form honestly and carefully.
          Make sure you meet all the listed requirements before applying.
          Once submitted, our Staff Management Team will review your
          application.
        </p>

        {/* Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate("/apply");
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#9333ea";
            e.target.style.boxShadow =
              "0 0 30px rgba(168,85,247,.65)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#a855f7";
            e.target.style.boxShadow = "none";
          }}
          style={{
            width: "100%",
            marginTop: "30px",
            padding: "18px",
            border: "none",
            borderRadius: "14px",
            background: "#a855f7",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: ".3s",
          }}
        >
          ➜ Submit Form
        </button>
      </div>
    </div>
  );
}