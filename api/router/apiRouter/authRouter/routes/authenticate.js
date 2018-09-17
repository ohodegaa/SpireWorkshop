const User = require("../../../../db/models/user");

module.exports = authenticate = (req, res) => {
    User.findOne({_id: req.id})
        .exec()
        .then(user => {
            res.status(200).json({
                user
            })
        })
        .catch(err => {
            res.status(401).json({
                error: {
                    message: "Error authenticating the user",
                    description: "No user was found with that id",
                }
            });
        })
}