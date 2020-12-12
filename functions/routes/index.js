const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

router.post("/post", controllers.post);
router.get("/get/:item_id", controllers.get);
router.get("/get", controllers.getAll);
router.put("/update:item_id", controllers.put);
router.delete("/delete/:item_id", controllers.delete);

module.exports = router;
