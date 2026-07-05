import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import { supabase } from "../lib/supabase";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("admins")
        .select("discord_id, role");

      console.log("USER ID:", user.id);
      console.log("ADMIN DATA:", data);
      console.log("ADMIN ERROR:", error);

      if (data?.some((admin) => admin.discord_id === user.id)) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }

    checkAdmin();
  }, [user]);

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
      {/* Logo */}
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

      {/* Menu */}
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
            e.currentTarget.style.color = "#a855f7";
            e.currentTarget.style.transform = "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "white";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          🏠 Home
        </div>

        {isAdmin && (
          <div
            onClick={() => navigate("/administrator")}
            style={itemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#a855f7";
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            🛡 Administrator
          </div>
        )}

        <UserMenu user={user} />
      </div>
    </nav>
  );
}