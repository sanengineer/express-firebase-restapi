const functions = require("firebase-functions");
// const admin = require("firebase-admin");
const express = require("express");
const app = express();
const cors = require("cors");
const apiroute = require("./routes/index");

app.use(cors({ origin: true }));
app.use("/api/v1", apiroute);

exports.app = functions.https.onRequest(app);
