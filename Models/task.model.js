import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const TaskSchema = new Schema({
    label: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    points:{
        type: Number,
        required: true,
    },
    phase: {
        type: String,
        enum: ["todo", "dev", "qa", "done"],
    },
    ownerID:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    }
},
    {collection:"Tasks"});

export const TaskModel = models.tasks || model('tasks', TaskSchema);