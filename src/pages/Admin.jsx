import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setApplications(data);
    }
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
        }}
      >
        Administrator Panel
      </h1>

      {applications.map((app) => (
        <div
          key={app.id}
          style={{
            background: "#171727",
            padding: "25px",
            borderRadius: "18px",
            marginBottom: "20px",
            border: "1px solid #2d2d40",
          }}
        >
          <h2>{app.minecraft}</h2>

          <p><b>Discord:</b> {app.discord_username}</p>

          <p><b>Age:</b> {app.age}</p>

          <p><b>Country:</b> {app.country}</p>

          <p><b>Experience:</b></p>
          <p>{app.experience}</p>

          <p><b>Why:</b></p>
          <p>{app.why}</p>
        </div>
      ))}
    </div>
  );
}