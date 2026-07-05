import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ApplicationForm() {
  const [form, setForm] = useState({
    minecraft: "",
    discord: "",
    age: "",
    country: "",
    experience: "",
    why: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

async function submit(e) {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));

  const { error } = await supabase
    .from("applications")
    .insert([
      {
        discord_id: user?.id,
        discord_username: user?.username,

        minecraft: form.minecraft,
        age: form.age,
        country: form.country,
        experience: form.experience,
        why: form.why,
      },
    ]);

  if (error) {
    console.log(error);
    alert("Failed to submit application.");
    return;
  }

  alert("Application submitted successfully!");
}

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0B0B14",
        color: "white",
        padding: "60px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "55px",
            color: "#a855f7",
            marginBottom: "20px",
          }}
        >
          Staff Application
        </h1>

        <div
          style={{
            textAlign: "center",
            color: "#b0b0b0",
            lineHeight: "2",
            marginBottom: "60px",
          }}
        >
          <h2 style={{ color: "white" }}>📌 Requirements</h2>

          <p>• You must be at least 14 years old.</p>
          <p>• Respect all server rules.</p>
          <p>• Have Discord.</p>
          <p>• Be active in the community.</p>
          <p>• Answer honestly.</p>
        </div>

        <form onSubmit={submit}>
          <Question
            number="1"
            title="What is your Minecraft Username?"
          >
            <input
              name="minecraft"
              value={form.minecraft}
              onChange={handleChange}
              placeholder="Type your answer..."
            />
          </Question>

          <Question
            number="2"
            title="What is your Discord Username?"
          >
            <input
              name="discord"
              value={form.discord}
              onChange={handleChange}
              placeholder="Type your answer..."
            />
          </Question>

          <Question
            number="3"
            title="How old are you?"
          >
            <input
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Type your answer..."
            />
          </Question>

          <Question
            number="4"
            title="Which country are you from?"
          >
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Type your answer..."
            />
          </Question>

          <Question
            number="5"
            title="Do you have previous staff experience?"
          >
            <textarea
              rows="5"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="Type your answer..."
            />
          </Question>

          <Question
            number="6"
            title="Why should we choose you?"
          >
            <textarea
              rows="7"
              name="why"
              value={form.why}
              onChange={handleChange}
              placeholder="Type your answer..."
            />
          </Question>

          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: "40px",
              padding: "18px",
              border: "none",
              borderRadius: "14px",
              background: "#a855f7",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 0 20px rgba(168,85,247,.35)",
            }}
          >
            ➜ Submit Form
          </button>
        </form>
      </div>
    </div>
  );
}

function Question({ number, title, children }) {
  return (
    <div
      style={{
        background: "#171727",
        borderRadius: "18px",
        padding: "30px",
        marginBottom: "30px",
        border: "1px solid #2d2d40",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "#a855f7",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          {number}
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: "23px",
          }}
        >
          {title}
        </h2>
      </div>

      <div>
        {children}
      </div>

      <style>{`
        input,
        textarea{
            width:100%;
            padding:16px;
            border-radius:12px;
            border:1px solid #333;
            background:#0F0F18;
            color:white;
            font-size:16px;
            outline:none;
            box-sizing:border-box;
        }

        textarea{
            resize:none;
        }

        input:focus,
        textarea:focus{
            border-color:#a855f7;
        }
      `}</style>
    </div>
  );
}
