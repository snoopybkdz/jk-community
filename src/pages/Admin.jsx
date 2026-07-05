import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setApplications(data);
  }

  async function updateStatus(id, status) {
    const { data, error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", id)
      .select();

    console.log("UPDATE DATA:", data);
    console.log("UPDATE ERROR:", error);

    if (error) {
      alert(error.message);
      return;
    }

    loadApplications();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0B0B14",
        color: "white",
        padding: "40px",
      }}
    >
      <h1
        style={{
          color: "#a855f7",
          marginBottom: "40px",
          fontSize: "45px",
        }}
      >
        🛡 Administrator Panel
      </h1>

      {applications.length === 0 && (
        <h3 style={{ color: "#888" }}>No applications found.</h3>
      )}

      {applications.map((app) => (
        <div
          key={app.id}
          style={{
            background: "#171727",
            border: "1px solid #2d2d40",
            borderRadius: "18px",
            padding: "25px",
            marginBottom: "25px",
            transition: ".3s",
            boxShadow: "0 0 15px rgba(0,0,0,.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow =
              "0 0 25px rgba(168,85,247,.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 0 15px rgba(0,0,0,.3)";
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#a855f7",
            }}
          >
            {app.minecraft}
          </h2>

          <p>
            <b>Discord:</b> {app.discord_username}
          </p>

          <p>
            <b>Status:</b>{" "}
            <span
              style={{
                color:
                  app.status === "accepted"
                    ? "#22c55e"
                    : app.status === "denied"
                    ? "#ef4444"
                    : "#f59e0b",
                fontWeight: "bold",
              }}
            >
              {app.status || "pending"}
            </span>
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() => setSelected(app)}
              style={buttonBlue}
            >
              👁 View
            </button>

            <button
              onClick={() => updateStatus(app.id, "accepted")}
              style={buttonGreen}
            >
              ✅ Accept
            </button>

            <button
              onClick={() => updateStatus(app.id, "denied")}
              style={buttonRed}
            >
              ❌ Deny
            </button>

            <button
              onClick={() => updateStatus(app.id, "pending")}
              style={buttonOrange}
            >
              ⏳ Pending
            </button>
          </div>
        </div>
      ))}

      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "700px",
              maxWidth: "95%",
              background: "#171727",
              borderRadius: "18px",
              padding: "35px",
              border: "1px solid #2d2d40",
            }}
          >
            <h2
              style={{
                color: "#a855f7",
                marginTop: 0,
              }}
            >
              📄 Application Details
            </h2>

            <p><b>Minecraft:</b> {selected.minecraft}</p>
            <p><b>Discord:</b> {selected.discord_username}</p>
            <p><b>Age:</b> {selected.age}</p>
            <p><b>Country:</b> {selected.country}</p>

            <h3 style={{ color: "#a855f7" }}>Experience</h3>
            <p>{selected.experience}</p>

            <h3 style={{ color: "#a855f7" }}>Why should we choose you?</h3>
            <p>{selected.why}</p>

            <button
              onClick={() => setSelected(null)}
              style={{
                marginTop: "25px",
                background: "#a855f7",
                color: "white",
                border: "none",
                padding: "12px 25px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const buttonBlue = {
  background: "#3b82f6",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const buttonGreen = {
  background: "#22c55e",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const buttonRed = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const buttonOrange = {
  background: "#f59e0b",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};