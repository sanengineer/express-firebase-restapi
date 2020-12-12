const admin = require("firebase-admin");
const db = admin.firestore();

// access key
var serviceAccount = require("../access-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://express-firebase-restapi.firebaseio.com",
});

module.exports = {
  post: (req, res) => {
    (async () => {
      try {
        await db
          .collection("items")
          .doc("/" + req.body.id + "/")
          .create({ item: req.body.item });
        return res.status(200).send();
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  },
  get: (req, res) => {
    (async () => {
      try {
        const document = db.collection("items").doc(req.params.item_id);
        let item = await document.get();
        let response = item.data();
        return res.status(200).send(response);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  },
  getAll: (req, res) => {
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
        return res.status(500).send(error);
      }
    })();
  },
  put: (req, res) => {
    (async () => {
      try {
        const document = db.collection("items").doc(req.params.item_id);
        await document.update({
          item: req.body.item,
        });
        return res.status(200).send();
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  },
  delete: (req, res) => {
    (async () => {
      try {
        const document = db.collection("items").doc(req.params.item_id);
        await document.delete();
        return res.status(200).send();
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  },
};
