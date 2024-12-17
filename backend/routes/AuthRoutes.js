const express = require("express");
const { Login, Signup } = require("../controllers/Users");
const router = express.Router();

router.post("/login", Login);
router.post("/register", Signup);

module.exports = router;
