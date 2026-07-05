import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const itemStyle = {
    cursor: "pointer",
    fontSize: "18px",
    color: "white",
    transition: "all .25s ease",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 50px",
        borderBottom: "1px solid #222",
      }}
    >
      {/* Left Logo */}
      <h1
        onClick={() => navigate("/")}
        style={{
          margin: 0,
          color: "#a855f7",
          fontSize: "42px",
          cursor: "pointer",
        }}
      >
        JK Community
      </h1>

      {/* Right Menu */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "35px",
        }}
      >
        <div
          onClick={() => navigate("/")}
          style={itemStyle}
          onMouseEnter={(e) => {
            e.target.style.color = "#a855f7";
            e.target.style.transform = "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "white";
            e.target.style.transform = "scale(1)";
          }}
        >
          🏠 Home
        </div>

        <UserMenu user={user} />
      </div>
    </nav>
  );
}