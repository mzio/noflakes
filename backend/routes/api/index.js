const router = require("express").Router();
const userRoutes = require("./users");
const pactRoutes = require("./pacts");

router.use("/users", userRoutes);
router.use("/pacts", pactRoutes);

router.get("/", (req, res) => {
  res.json({
    status: "API is working",
    message: "NoFlake is working!"
  });
});

module.exports = router;
