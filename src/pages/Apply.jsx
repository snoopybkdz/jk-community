import { useNavigate } from "react-router-dom";

export default function Apply() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0B0B14",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "430px",
          background: "#171727",
          border: "1px solid #2d2d40",
          borderRadius: "20px",
          padding: "35px",
          boxShadow: "0 15px 40px rgba(0,0,0,.45)",
          transition: ".3s",
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
            color: "white",
            boxShadow: "0 0 25px rgba(168,85,247,.55)",
          }}
        >
          📄
        </div>

        {/* Title */}
        <h2
          style={{
            color: "white",
            marginTop: "28px",
            marginBottom: "15px",
            fontSize: "34px",
          }}
        >
          Staff Application
        </h2>

        {/* Description */}
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

        {/* Button */}
        <button
          onClick={() => navigate("/apply/form")}
          onMouseEnter={(e) => {
            e.target.style.background = "#9333ea";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#a855f7";
            e.target.style.transform = "translateY(0)";
          }}
          style={{
            width: "100%",
            marginTop: "30px",
            padding: "17px",
            background: "#a855f7",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: ".25s",
            boxShadow: "0 10px 25px rgba(168,85,247,.35)",
          }}
        >
          ➜ Submit Form
        </button>
      </div>
    </div>
  );
}