const mongoose = require("mongoose");
const chalk = require('chalk');
const fs = require("fs");
const DB_ULR = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;


const logConnect = msg => console.log(chalk.bold.cyan(msg));
const logError = msg => console.log(chalk.bold.yellow(msg));
const logDisconnected = msg => console.log(chalk.bold.red(msg));
const logTermination = msg => console.log(chalk.bold.magenta(msg));


mongoose.connect(DB_ULR + DB_NAME)
    .then(() => {
        logConnect("Mongoose default connection is open to " + DB_ULR + ", using database " + DB_NAME)
        fs.readdir(__dirname + "/models", (err, files) => {
            if (files) {
                files.map(file => {
                    file = file.replace(".js", "")
                    mongoose.connection.db.createCollection(file + "s")
                })
            }
        })
    })
    .catch(err => {
        logError("Mongoose default connection to " + DB_ULR + " failed with error \n" + err)
    })

mongoose.connection.on("disconnected", () => {
    logDisconnected("Mongoose default connection is disconnected");
})

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        logTermination("Mongoose default connection is disconnected due to application termination")
        process.exit(0)
    })
})
