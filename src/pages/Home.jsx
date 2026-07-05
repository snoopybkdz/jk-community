import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(
  import.meta.env.PROD
    ? "https://jk-community.onrender.com/api/user"
    : "http://localhost:3000/api/user",
  {
      credentials: "include",
      mode: "cors",
    })
      .then((res) => res.json())
.then((data) => {
  console.log(data);
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
        background: "linear-gradient(135deg, #0B0B14 0%, #111122 100%)",
        color: "white",
        fontFamily: "Arial",
      }}
    >
<Navbar user={user} />
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
            lineHeight: "1.4",
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

      {/* Clan Application */}
      <div className="form-card">
        <div className="icon-box">📄</div>

        <h2>Clan Application</h2>

        <p>
          Welcome to the official JK Community Clan Application Form.
          Please complete the form honestly and carefully before submitting.
        </p>

        <button
  className="submit-btn"
  onClick={() => navigate("/apply")}
>
          ➜ Submit Form
        </button>
      </div>
    </div>
  );
}
