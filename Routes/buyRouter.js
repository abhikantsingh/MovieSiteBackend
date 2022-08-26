const { Router } = require("express");
const express = require("express");
const buyController = require("../controller/buyController");
const router = require("./AuthRoute");

router.post("/bookticket",buyController.booktickets);
module.exports = router;