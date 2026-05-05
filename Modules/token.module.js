import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../Configs/configs.js'

/**
 *
 * @param {Create JSONWebToken} payload
 * @param {*} duration
 * @returns
 */
function createAccessToken (payload, duration="") {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: duration});
}

/**
 * Verify JSONWebToken
 * @param {String} token
 * @returns
 */
function verifyToken (token) {
    try {

        return jwt.verify(token, TOKEN_SECRET);
    } catch (err) {
        console.log(err)
        throw {message: "Access token is invalid."};
    }
}


export default {createAccessToken, verifyToken};