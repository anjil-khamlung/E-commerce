const express = require("express");
const { generateEsewaSignature } = require("../controllers/esewaController");

const router = express.Router();

router.post("/signature", generateEsewaSignature);

module.exports = router;
