import UserMenu from "./UserMenu";

export default function Navbar({ user }) {
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
        style={{
          color: "#a855f7",
          fontSize: "30px",
          margin: 0,
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
          style={{
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          🏠 Home
        </div>

        <div
          style={{
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          📄 Clan Application
        </div>

        <UserMenu user={user} />
      </div>
    </nav>
  );
}