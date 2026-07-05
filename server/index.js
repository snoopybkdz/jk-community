import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({
  path: "./server/.env",
});

console.log("CLIENT_ID =", process.env.CLIENT_ID);
console.log("CLIENT_SECRET =", process.env.CLIENT_SECRET);

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: "jkcommunitysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 يوم
      httpOnly: true,
      secure: false, // localhost فقط
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL:
  process.env.NODE_ENV === "production"
    ? "https://jk-community.onrender.com/auth/discord/callback"
    : "http://localhost:3000/auth/discord/callback",
      scope: ["identify"],
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// تسجيل الدخول
app.get("/auth/discord", passport.authenticate("discord"));

// Callback بعد تسجيل الدخول
app.get(
  "/auth/discord/callback",
  passport.authenticate("discord", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173");
  }
);

// بيانات المستخدم
app.get("/api/user", (req, res) => {
  if (!req.user) {
    return res.json(null);
  }

  res.json({
    username: req.user.username,
    avatar: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
  });
});

// تسجيل الخروج
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect("http://localhost:5173");
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});