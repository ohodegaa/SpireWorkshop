const mongoose = require("mongoose");
//const validator = require("validator");

const excludedFromClient = ["password", "__v"];

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // should be deselected by default for security

    },
    name: String,
    mail: String,
    __v: {
        type: Number,
        select: false
    }
});



// use user.getSafe to exclude parameters when json is returned to client
userSchema.methods.getSafe = function() {
    let obj = this.toObject();
    for (let ex of excludedFromClient) {
        delete obj[ex];
    }
    return obj
}


module.exports = User = mongoose.model("User", userSchema);

