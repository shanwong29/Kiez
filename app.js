require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

// WHEN INTRODUCING USERS DO THIS:
// INSTALL THESE DEPENDENCIES: passport-local, passport, bcrypt, express-session, connect-mongo
// AND UN-COMMENT OUT FOLLOWING LINES:

const session = require("express-session");
const passport = require("passport");

require("./configs/passport");

// IF YOU STILL DIDN'T, GO TO 'configs/passport.js' AND UN-COMMENT OUT THE WHOLE FILE

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/kiez", {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "/client/build")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// ADD SESSION SETTINGS HERE:

const MongoStore = require("connect-mongo")(session);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

// USE passport.initialize() and passport.session() HERE:

app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

// CORS settings
// const cors = require("cors");
// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:3000"]
//   })
// );

// ROUTES MIDDLEWARE STARTS HERE:

const index = require("./routes/index");
app.use("/api", index);

const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

const eventRoutes = require("./routes/events");
app.use("/api/events", eventRoutes);

const commentRoutes = require("./routes/comments");
app.use("/api/comments", commentRoutes);

const referenceRoutes = require("./routes/reference");
app.use("/api/reference", referenceRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const chatRoutes = require("./routes/chat");
app.use("/api/chat", chatRoutes);

app.use((req, res) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});

module.exports = app;
