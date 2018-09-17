const jwt = require("jsonwebtoken");

const getToken = (req) => {
    return new Promise((resolve, reject) => {
        let bearerToken = req.headers["authorization"];
        if (typeof bearerToken === "undefined" || !bearerToken.split(" ")[1]) {
            throw {
                status: 401,
                message: "No token provided. Please provide a valid jwt token."
            }
        }
        resolve(bearerToken.split(" ")[1]);
    })
}

const authCheck = (req, res, next) => {
    getToken(req, res)
        .then(token => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    throw {
                        status: 401,
                        message: "Not a valid token. Please provide a valid token"
                    }
                }
                req.id = decoded.user._id;
                next();
            })
        })
        .catch(err => {
            // catches all errors (all errors regarding authentication is considered as 401 status codes)
            res.status(err.status || 500).json({
                error: {
                    message: "Error authenticating the user",
                    description: err.message || err,
                }
            })
        })
}

module.exports = getToken;
module.exports = authCheck;