import express from "express";
import bodyParser from "body-parser";
import session from "express-session";

import router from "./routes/routes.js";
import dotenv from "dotenv";

// To fix Heroku deployment issue
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("frontend"));

app.use(
  session({
    secret: "abc",
    cookie: { maxAge: 6000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

// app.use(router);
app.use("/", router);

app.listen(PORT, () => {
  console.log("Listening for connections on port ${PORT}");
});

export default app;
