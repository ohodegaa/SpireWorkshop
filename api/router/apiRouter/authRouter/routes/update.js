const User = require("../../../../db/models/user");


module.exports = update = (req, res) => {
    User.findOneAndUpdate({_id: req.id}, req.body, {new: true})
        .exec()
        .then(user => {
            res.status(200).json({
                user
            })
        })
        .catch(err => {
            res.status(401).json({
                error: {
                    message: "Error updating user",
                    description: "Could not update user",
                }
            });
        })
}