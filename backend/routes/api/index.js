const router = require("express").Router();
const userRoutes = require("./users");
const pactRoutes = require("./pacts");

router.use("/users", userRoutes);
router.use("/pacts", pactRoutes);

module.exports = router;
