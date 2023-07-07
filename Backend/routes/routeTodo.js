const express = require('express');
const router = express.Router();

const Todo = require('../models/todoSchema');

router.get("/", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})

router.post("/", (req, res) => {
    const todo = new Todo({
        task_desc: req.body.task_desc,
        task_due: req.body.task_due,
        is_complete: req.body.is_complete,
        user_id: req.body.user_id
    });
    todo.save();
    res.json(todo);
})

router.put("/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.task_desc=req.body.task_desc,
    todo.task_due=req.body.task_due,
    todo.is_complete=req.body.is_complete,
    todo.user_id=req.body.user_id
    todo.save();
    res.json(todo);
})

router.put("/completeTask/:id" , async (req,res) => {
    const todo = await Todo.findById(req.params.id);
    todo.is_complete = !todo.is_complete;
    todo.save();
    res.json(todo);
})

router.delete("/:id", async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);    
})

module.exports = router; 