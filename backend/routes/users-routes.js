const express = require("express");

const {
  createUser,
  displayUsers,
  loginUser,
  getUser,
} = require("../controllers/users-controllers");

const router = express.Router();

router.post("/signup", createUser);

router.get("/", displayUsers);

router.post("/login", loginUser);

router.get("/:userId", getUser);

module.exports = router;
