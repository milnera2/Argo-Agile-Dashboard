import {UserModel} from './Models/user.model.js';
import createConnection from "./db.js"
import AuthModule from './Modules/auth.module.js'

async function setupAdmin() {
    try {
        await createConnection();
        console.log("Database connected.");

        const userData = {
            email: "example@admin.com",
            username: "admin",
            password: "admin"
        };

        userData.email = userData.email.toLowerCase();
        userData.username = userData.username.toLowerCase();
        userData.role = "lead";

        const encrypted_password = AuthModule.createPasswordHash(userData.password);
        userData.passwordHash = encrypted_password.hash;
        userData.passwordSalt = encrypted_password.salt;

        await UserModel.create(userData);
        console.log("Created admin successfully");

    } catch (error) {
        console.error("Error creating admin:", error.message);
    }
}

setupAdmin();