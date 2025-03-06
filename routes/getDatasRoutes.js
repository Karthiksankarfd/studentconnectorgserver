const express = require("express");
const { getUsers } = require("../controllers/getDatasControllers");

const router = express.Router();

router.get("/fetchusers", getUsers);

module.exports = router;
