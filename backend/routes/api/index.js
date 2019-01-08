const router = require("express").Router();
const userRoutes = require("./users");

router.use("/users", userRoutes);

router.get("/", (req, res) => {
  res.json({
    status: "API is working",
    message: "NoFlake is working!"
  });
});

module.exports = router;
