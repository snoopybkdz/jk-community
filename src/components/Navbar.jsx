import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";

export default function Navbar({ user }) {
  const navigate = useNavigate();

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
      <h1
        onClick={() => navigate("/")}
        style={{
          color: "#a855f7",
          fontSize: "30px",
          margin: 0,
          cursor: "pointer",
        }}
      >
        JK Community
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "35px",
        }}
      >
        <div
          onClick={() => navigate("/")}
          style={{
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          🏠 Home
        </div>

        <div
          onClick={() => navigate("/apply")}
          style={{
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          📄 Staff Application
        </div>

        <UserMenu user={user} />
      </div>
    </nav>
  );
}