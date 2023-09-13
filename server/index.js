const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
require('dotenv').config();

const port = process.env.PORT || 3001;

//For Connecting Front and Back
const cors = require("cors");

//For Requesting Body
app.use(express.json());

const corsOptions = {
    origin: 'https://fs-todo-list.netlify.app/', // Change this to your frontend app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

mongoose.connect(process.env.DB);

app.get('/getTask', async (req, res) => {
    try {
        const task = await UserModel.find({});
        // console.log(task);
        res.json(task);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
})

app.post('/addTask', async (req, res) => {
    try {
        const task = req.body;
        const newTask = new UserModel(task);
        await newTask.save();

        res.json(newTask);// Respond with the newly created task

    } catch (err) {
        console.error(err);
        res.json(err);
    }
});


app.delete('/deleteTask/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await UserModel.findByIdAndDelete(taskId);

        if (deletedTask) {
            res.json({ message: 'Task deleted successfully', task: deletedTask });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});

app.put('/updateTask/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const { task, repetition } = req.body;

        const updatedTask = await UserModel.findByIdAndUpdate(taskId, { task, repetition }, { new: true });

        if (updatedTask) {
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not Found' });
        }

    } catch (err) {
        console.error(err);
        res.json(err);
    }
});


app.listen(port, () => {
    console.log(`Servers Run Correctly In Port ${port}`);
})