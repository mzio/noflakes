const router = require("express").Router();
const userRoutes = require("./users");
const pactRoutes = require("./pacts");
const authRoutes = require("./auth");

router.use("/users", userRoutes);
router.use("/pacts", pactRoutes);
router.use("/auth", authRoutes);

module.exports = router;
