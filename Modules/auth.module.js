import crypto from 'crypto';
import TokenModule from './token.module.js';
import {UserModel} from '../Models/user.model.js';




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
        if (!user) {
            return res.status(403).send({message: "Access Denied"});
        }
        next();
    } catch (err) {
        return res.status(401).send(err);
    }
}

async function verifyLogin (req, res, next) {
    try{
        const user = await UserModel.findOne({_id: req.user_id}).exec();
        if (!user.loggedIn) {
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



export default {createPasswordHash, verifyToken, verifyIsAdmin, verifyPassword, verifyLogin};