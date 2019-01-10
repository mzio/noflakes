const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/username").get(userController.currentUsername);

module.exports = router;
