const express = require('express');
const router = express.Router();
const Todo = require('../models/todoSchema');
const jwt = require('jsonwebtoken')

const TOKEN_SECRET = process.env.SECRET_JWT_PASS

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
  
	if (token == null) return res.sendStatus(401)
	jwt.verify(token, TOKEN_SECRET, (err, user) => {
  
	  if (err) return res.sendStatus(403)
  
	  req.user = user
	  next()
	})
  }

router.get("/", authenticateToken, async (req, res) => {
    if (!req.user.name) return

    const missedTodos = await Todo.find({ username: req.user.name }).find({ task_due: { $lt: new Date().setHours(0, 0, 0, 0) } }).sort({ task_due: -1 });
    const newTodos = await Todo.find({ username: req.user.name }).sort({ task_due: -1 });
    const mTodo = new Set(missedTodos.map(({ id }) => id));
    res.json([
        ...newTodos.filter(({ id }) => !mTodo.has(id)),
        ...missedTodos
    ]);
})

router.post("/", authenticateToken, (req, res) => {
    const todo = new Todo({
        task_desc: req.body.task_desc,
        task_due: req.body.task_due,
        is_complete: req.body.is_complete,
        username: req.user.name
    });
    todo.save();
    res.json(todo);
})

router.post("/addMultiple", authenticateToken, (req, res) => {
    let todos = req.body
    todos = todos.map(todo => {
        return {
            task_desc: todo.task_desc,
            task_due: todo.task_due,
            is_complete: todo.is_complete,
            username: req.user.name
        };
    })

    try {
        todos.forEach((t)=> {
            const todo = new Todo(t)
            todo.save()
        })
        res.sendStatus(201)
    }catch(err){ 
        res.sendStatus(400)
    }
})

router.put("/:id", authenticateToken, async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (todo.user_id != req.user.username) res.sendStatus(403)
    todo.task_desc=req.body.task_desc,
    todo.task_due=req.body.task_due,
    todo.user_id=req.body.user_id
    todo.save();
    res.json(todo)
}) 

router.put("/completeTask/:id" ,authenticateToken, async (req,res) => {
    const todo = await Todo.findById(req.params.id);
    todo.is_complete = !todo.is_complete;
    todo.save();
    res.json(todo);
})

router.delete("/:id", authenticateToken, async (req, res) => {
    const result = await Todo.findById(req.params.id);
    if (result.username  != req.user.name)  res.sendStatus(403)
    else {
        await Todo.deleteOne({_id: result.id});
        res.json(result);    
    }
})

module.exports = router; 