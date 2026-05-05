import UserModel from '../models/user.model.js';


async function getAllUsers (req, res) {
    try {
        const data = await UserModel.find({}).exec();
        return res.send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong ")
    }
}

async function register (req, res) {
    try {

        const userData = {
            email: req.body.email,
            password: req.body.password
        }

        if (!userData.email || !userData.username || !userData.password) {
            return res.status(400).send({message: "Required data must be provided."});
        }

        userData.email = userData.email.toLowerCase();
        userData.username = userData.username.toLowerCase();
        userData.role = "user";

        const existingUser = await UserModel.findOne({$or: [{username: userData.username}, {email: userData.email}]});

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