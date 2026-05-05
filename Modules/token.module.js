const jwt = require("jsonwebtoken");
const config = require("../configs/configs");

/**
 *
 * @param {Create JSONWebToken} payload
 * @param {*} duration
 * @returns
 */
function createAccessToken (payload, duration="") {
    return jwt.sign(payload, config.TOKEN_SECRET, { expiresIn: duration});
}

/**
 * Verify JSONWebToken
 * @param {String} token
 * @returns
 */
function verifyToken (token) {
    try {
        return jwt.verify(token, config.TOKEN_SECRET);
    } catch (err) {
        console.log(err)
        throw {message: "Access token is invalid."};
    }
}

module.exports.createAccessToken = createAccessToken;
module.exports.verifyToken = verifyToken;