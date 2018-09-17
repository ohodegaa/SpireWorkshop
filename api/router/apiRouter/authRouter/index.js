const express = require("express");
const router = express.Router(express);


const authCheck = require("../../../utils/authentication");

const validate = require("../../../utils/validate");
const updateValidators = require("./validators/update");
const loginSchema = require("./validators/login");
const registerSchema = require("./validators/register");
const authenticateSchema = require("./validators/authenticate");


const register = require("./routes/register");
const login = require("./routes/login");
const update = require("./routes/update");
const authenticate = require("./routes/authenticate")


router.get("/", authCheck, authenticate);
router.patch("/", authCheck, validate(updateValidators, "One or more fields are not valid"), update);
router.post("/login", login);
router.post("/register", register);

module.exports = authRouter = router;