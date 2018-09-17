module.exports = validate = (validators = [], errorMessage) => {
    validators.push((req, res, next) => {
        req.asyncValidationErrors()
            .then(next)
            .catch(errors => {
                let description = errors.map(err => err.param + ": " + err.msg).join(", ")
                res.status(400).json({
                    error: {
                        message: errorMessage,
                        description
                    }
                })
            })
    });
    return validators;
}