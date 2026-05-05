import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const userSchema = new Schema(
    {
        email: {
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
            enum: ['member', 'lead'],
            default: 'member',
            required: true
        },
        tasks: {
            type: Array,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        modifiedAt: {
            type: Date,
            default: Date.now
        }},
    {collection: "Users"});

export const UserModel = models.users || model('users', userSchema);