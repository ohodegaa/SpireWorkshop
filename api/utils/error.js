
const throwError = (status, description) => {
    throw {
        status: status,
        description: description
    }
}

module.exports = {
    throwError
}