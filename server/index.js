import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({
  path: "./server/.env",
});

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://jk-community.vercel.app",
    ],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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

// Callback
app.get(
  "/auth/discord/callback",
  passport.authenticate({
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect(
      process.env.NODE_ENV === "production"
        ? "https://jk-community.vercel.app"
        : "http://localhost:5173"
    );
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

      res.redirect(
        process.env.NODE_ENV === "production"
          ? "https://jk-community.vercel.app"
          : "http://localhost:5173"
      );
    });
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server running on port ${process.env.PORT || 3000}`
  );
});