const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: true }));

// access key
var serviceAccount = require("./access-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://express-firebase-restapi.firebaseio.com",
});

const db = admin.firestore();

// create
app.post("/api/create", (req, res) => {
  (async () => {
    try {
      await db
        .collection("items")
        .doc("/" + req.body.id + "/")
        .create({ item: req.body.item });
      return res.status(200).send({
        success: true,
        message: "success create 😜🤙 ",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: error.message || "😭 error while creating item",
      });
    }
  })();
});

// read item
app.get("/api/read/:item_id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("items").doc(req.params.item_id);
      let item = await document.get();
      let response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: error.message || "😭 error while get item by id",
      });
    }
  })();
});

// read all
app.get("/api/read", (req, res) => {
  (async () => {
    try {
      let query = db.collection("items");
      let response = [];
      await query.get().then((querySnapshot) => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
          const selectedItem = {
            id: doc.id,
            item: doc.data().item,
          };
          response.push(selectedItem);
        }
        return response;
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: error.message || "error while get items",
      });
    }
  })();
});

// update
app.put("/api/update/:item_id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("items").doc(req.params.item_id);
      await document.update({
        item: req.body.item,
      });
      return res.status(200).send({
        success: true,
        message: "success update item 😎 🤝",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: error.message || "😭 error while update item by id",
      });
    }
  })();
});

// delete
app.delete("/api/delete/:item_id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("items").doc(req.params.item_id);
      await document.delete();
      return res.status(200).send({
        success: true,
        message: "success delete item 😫",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: error.message || "😭 error while delete item by id",
      });
    }
  })();
});

exports.app = functions.https.onRequest(app);
