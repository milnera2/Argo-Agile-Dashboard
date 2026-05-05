const crypto = require("crypto");
const TokenModule = require("./token.module");
const UserModel = require("../models/user.model").UserModel;
const mongoose = require("mongoose");




function createPasswordHash (password) {
    const salt = crypto.randomBytes(128).toString('hex');
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const passwordString = hash.digest("hex");

    return {
        salt: salt,
        hash: passwordString
    }
}

function verifyPassword (password, salt, stored_hash) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const passwordString = hash.digest("hex");

    return passwordString === stored_hash;
}

async function verifyToken (req, res, next) {
    try {
        let token = req.headers.authorization;

        if (!token) {
            throw {message: "Requested data must be provided"};
        }

        const verified = TokenModule.verifyToken(token);

        req.user_id = verified.user_id;
        const user = await UserModel.findOne({_id: verified.user_id}).exec();
        if (!user || !user.active) {
            return res.status(403).send({message: "Access Denied"});
        }
        next();
    } catch (err) {
        return res.status(401).send(err);
    }
}

async function verifyIsAdmin (req, res, next) {
    try {
        let token = req.headers.authorization;

        if (!token) {
            throw {message: "Requested data must be provided"};
        }

        const verified = TokenModule.verifyToken(token);

        req.user_id = verified.user_id;

        const user = await UserModel.findOne({_id: verified.user_id}).exec();
        console.log(user.username)
        if (!user || user.role !== "admin") {
            return res.status(403).send({message: "Access Denied"});
        }

        next();
    } catch (err) {
        return res.status(401).send(err);
    }
}

module.exports.createPasswordHash = createPasswordHash;
module.exports.verifyPassword = verifyPassword;
module.exports.verifyToken = verifyToken;
module.exports.verifyIsAdmin = verifyIsAdmin;