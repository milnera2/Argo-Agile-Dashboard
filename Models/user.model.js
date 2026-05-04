import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        passwordSalt: {
            type: String,
            required: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        modifiedAt: {
            type: Date,
            default: Date.now
        },
        collection: 'Users'
    }
);

// Check if model exists to prevent re-compilation errors during hot-reloads
export const UserModel = models.users || model('users', userSchema);