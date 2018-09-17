const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const validation = require("express-validation");
const _ = require("lodash");
const expressValidator = require("express-validator");
const chalk = require('chalk');
require("./db");
const app = express();

/** Routes **/
const apiRouter = require("./router/apiRouter");


app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());



/* Routes */
app.use("/api", apiRouter);


/** KEEP THESE AT THE BOTTOM **/

app.use((req, res) => {
    return res.status(404).json({
        message: "This page was not found",
        description: req.protocol + "://" + req.get("host") +  req.originalUrl + " was not found"
    })
})

app.use((err, req, res, next) => {
    console.log(chalk.bold.red(err));
    if (err instanceof validation.ValidationError) {
        let errorFields = err.errors.map(error => error.field.join(", "))
        let errorMessages = err.errors.map(error => error.messages.join(", "))
        return res.status(err.status).json({
            message: errorFields.join(", ") + " field" + (errorFields.length > 1 ? "s are " : " is ") + "not valid",
            description: errorMessages.join(", ")
        });
    }
    else {
        return res.status(500).json({
            message: "Internal server error",
            description: "Ups! Something went wrong"
        })
    }
});

module.exports = app;