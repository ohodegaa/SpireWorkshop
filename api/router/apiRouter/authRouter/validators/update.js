const {check} = require("express-validator/check");

module.exports = [
    check("mail").isEmail().withMessage("Should be a valid email"),
]