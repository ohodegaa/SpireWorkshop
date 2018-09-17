const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../../../db/models/user");
const {throwError} = require("../../../../utils/error");

module.exports = register = (req, res) => {
    User.findOne({$or: [{mail: req.body.mail || ""}, {username: req.body.username || ""}]})
        .exec()
        .then(user => {
            if (!user) {
                return bcrypt.hash(req.body.password, 8)
            } else {
                throwError(400, "A user has already been registered with that username and/or email");
            }
        })
        .then(hash => {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash,
                name: req.body.name,
                mail: req.body.mail,
            });
            return user.save()
        })
        .then(user => {
            user = user.getSafe();
            res.set("X-Bearer-Token", "Bearer " + jwt.sign({user}, process.env.JWT_SECRET));
            res.status(201).send(user);
        })
        .catch(err => {
            console.log(err);
            return res.status(err.status || 500).json({
                error: {
                    message: "Error creating new user",
                    description: err.description || err,
                }
            })
        })
}