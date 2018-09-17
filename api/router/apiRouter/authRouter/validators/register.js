const Joi = require("joi");

module.exports = registerSchema = {
    body: {
        username: Joi.string().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
        mail: Joi.string().email(),
        name: Joi.string(),
    }
}