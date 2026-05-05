import {TaskModel} from "../Models/task.model.js";
import {UserModel} from "../Models/user.model.js";


async function post_task (req, res)  {
    try {
        const body = req.body;


        if (!body) {
            return res.status(400).send({message: "Request data must be provided"});
        }


        if (body.label === null || body.label === "" || typeof body.label !== "string") {
            return res.status(400).send({message: "Request data must be provided and in correct format"});
        }



        const user = await UserModel.findOne({_id:req.user_id})
        body.ownerID = [ user.email ]
        for (let email in body.email){
            body.ownerID.push(email)
        }
        let tasks = user.tasks
        let data = await TaskModel.insertOne(body);
        tasks.push(data._id)
        await UserModel.findOneAndUpdate({_id:req.user_id}, { $set: {tasks:tasks} }, {returnDocument: "after"});
        return res.status(200).send(JSON.stringify(data));
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: "Something went wrong"});
    }

}

async function get_tasks (req, res) {
    try {
        let data = await TaskModel.find({}).exec();
        return res.send(JSON.stringify(data));
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({message: "Something went wrong"});
    }

}

async function get_task (req, res) {
    try {
        console.log(req.params.id);
        let data = await TaskModel.findOne({_id:req.params.id});
        if (data==null){
            return res.status(404).send({message: "Task not found"});
        }
        console.log(data);
        return res.send(JSON.stringify(data));
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({message: "Something went wrong"});
    }
}

async function edit_task (req, res)  {
    try {
        const body = req.body;
        console.log(body);
        let task = await TaskModel.findOne({_id:req.params.id})
        if (task==null){
            return res.status(404).send({message: "Task not found"});
        }
        let permitted = false
        for (let i=0; i<task.ownerID.length; i++){

            if (await UserModel.findOne({email:task.ownerID[i]})){

                permitted = true;
            }
        }
        if (!permitted){
            return res.status(403).send({message: "no access"})
        }
        if (!body) {
            return res.status(400).send({message: "Request data must be provided"});
        }

        let filter = {_id:req.params.id}
        let data = await TaskModel.findOneAndUpdate(filter, { $set: body }, {returnDocument: "after"});

        return res.send(JSON.stringify(data));
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: "Something went wrong"});
    }

}
async function delete_task (req, res) {
    try {
        let task = await TaskModel.findOne({_id:req.params.id})
        if (task==null){
            return res.status(404).send({message: "Task not found"});
        }
        let permitted = false
        for (let i=0; i<task.ownerID.length; i++){

            if (await UserModel.findOne({email:task.ownerID[i]})){

                permitted = true;
            }
        }
        if (!permitted){
            return res.status(403).send({message: "no access"})
        }
        let data = await TaskModel.deleteOne({_id:req.params.id});
        console.log(data);
        return res.send(JSON.stringify(data));
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({message: "Something went wrong"});
    }
}
export default { post_task, get_tasks, edit_task, delete_task, get_task };