import {TaskModel} from "../Models/task.model.js";

async function post_task (req, res)  {
    try {
        const body = req.body;


        if (!body) {
            return res.status(400).send({message: "Request data must be provided"});
        }


        if (body.label === null || body.label.trim() === "" || typeof body.label !== "string") {
            return res.status(400).send({message: "Request data must be provided and in correct format"});
        }





        let data = await TaskModel.insertOne(body);
        return res.status(200).send(JSON.stringify(data));
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: "Something went wrong"});
    }

}

async function test (req, res)  {
    res.send({message: "test"});
}

export default { post_task, test };