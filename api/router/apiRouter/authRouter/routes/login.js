const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../../../db/models/user");
const {throwError} = require("../../../../utils/error");

module.exports = login = (req, res) => {
    User.findOne({$or: [{username: req.body.username || ""}, {mail: req.body.mail || ""}]})
        .select("+password")
        .exec()
        .then(user => {
            if (!user) throwError(401, "No user found with username/email " + (req.body.username || req.body.mail))
            return user;
        })
        .then(user => {
            let isValid = bcrypt.compareSync(req.body.password, user.password)
            if (!isValid) {
                throwError(401, "Password is incorrect. Please provide a valid password.")
            }
            res.set("X-Token", "Bearer " + jwt.sign({user}, process.env.JWT_SECRET));
            return user.getSafe()
        })
        .then(user => {
            return res.status(200).json({
                user,
            })
        })
        .catch(err => {
            console.log(err);
            res.status(err.status || 500).json({
                error: {
                    message: "Error logging in the user",   // basically which endpoint action that gave an error
                    description: err.description || err,        // a description on what went wrong
                }
            });
        })

}