import {UserModel} from '../models/user.model.js';
import AuthModule from '../Modules/auth.module.js'
import TokenModule from '../Modules/token.module.js'
import {TaskModel} from "../Models/task.model.js";
async function getAllUsers (req, res) {
    try {
        const data = await UserModel.find({}).exec();
        return res.send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong ")
    }
}

async function get_user (req, res) {
    try {
        let user = await UserModel.findOne({_id:req.params.id})
        if (user==null){
            return res.status(404).send({message: "User not found"});
        }
        if (user.ownerID !== req.user_id) {
            return res.status(403).send({message: "You don't have permission to edit this user."});
        }
        let data = await UserModel.findOne({_id:req.params.id});
        console.log(data);
        return res.send(JSON.stringify(data));
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({message: "Something went wrong"});
    }
}

async function register (req, res) {
    try {

        const userData = {
            email: req.body.email,
            password: req.body.password
        }

        if (!userData.email || !userData.password) {
            return res.status(400).send({message: "Required data must be provided."});
        }

        userData.email = userData.email.toLowerCase();
        userData.role = "member";

        const existingUser = await UserModel.findOne({email: userData.email});

        if (existingUser) {
            return res.send("User already exists");
        }


        const encrypted_password = AuthModule.createPasswordHash(userData.password);

        userData.passwordHash = encrypted_password.hash;
        userData.passwordSalt = encrypted_password.salt;
        delete userData.password;

        const createdUser = await UserModel.create(userData);

        userData.id = createdUser._id.toString();

        delete userData.passwordHash;
        delete userData.passwordSalt;

        return res.send({message: "User has been created successfully", data: userData});
    } catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong ")
    }
}

async function login (req, res) {
    try {
        const userData = {
            username: req.body.email,
            password: req.body.password
        }

        if (userData.username) {
            userData.username = userData.username.toLowerCase();
        }

        if (!userData.username || !userData.password) {
            return res.status(400).send({message: "Requested data must be provided"});
        }

        const existingUser = await UserModel.findOne({email: userData.username});

        if (!existingUser) {
            return res.status(404).send({message: "User not found"});
        }

        // Verify password
        const verified = AuthModule.verifyPassword(userData.password, existingUser.passwordSalt, existingUser.passwordHash);

        if (!verified) {
            return res.status(401).send({message:"Incorrect password"});
        }

        const payload = {
            "user_id": existingUser._id.toString()
        }

        const token = TokenModule.createAccessToken(payload, "1d");
        await UserModel.findOneAndUpdate({_id:existingUser._id}, {loggedIn:true}, {returnDocument:"after"})
        return res.send({message: "Logged in  Successfully", access_token: token, user_id: payload.user_id});
    } catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong ")
    }
}

async function logout (req, res)  {
    try {


        let user = await UserModel.findOne({_id:req.user_id})
        if (user==null){
            return res.status(404).send({message: "User not found"});
        }
        let filter = {_id:req.user_id}
        let data = await UserModel.findOneAndUpdate(filter, { $set: {loggedIn:false}}, {returnDocument: "after"});
        console.log(data);
        return res.send(JSON.stringify(data));
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: "Something went wrong"});
    }

}

async function edit_user (req, res)  {
    try {

        const body = req.body;

        if (!body) {
            return res.status(400).send({message: "Request data must be provided"});
        }
        let user = await UserModel.findOne({_id:req.params.id})
        if (user==null){
            return res.status(404).send({message: "User not found"});
        }
        if (user.ownerID !== req.user_id) {
            return res.status(403).send({message: "You don't have permission to edit this user."});
        }
        let filter = {_id:req.params.id}
        let data = await UserModel.findOneAndUpdate(filter, { $set: body}, {returnDocument: "after"});
        console.log(data);
        return res.send(JSON.stringify(data));
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: "Something went wrong"});
    }

}
async function delete_user (req, res) {
    try {
        let user = await UserModel.findOne({_id:req.params.id})
        if (user==null){
            return res.status(404).send({message: "User not found"});
        }
        if (user.ownerID !== req.user_id) {
            return res.status(403).send({message: "You don't have permission to edit this user."});
        }
        let data = await UserModel.deleteOne({_id:req.params.id});
        console.log(data);
        return res.send(JSON.stringify(data));
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({message: "Something went wrong"});
    }
}
export default {getAllUsers, register, login, edit_user, delete_user, get_user, logout};