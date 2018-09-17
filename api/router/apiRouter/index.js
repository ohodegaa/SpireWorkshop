const express = require("express");
const router = express.Router();
const authRouter = require("./authRouter");
const authCheck = require("../../utils/authentication");

router.use("/auth", authRouter);



module.exports = apiRouter = router;