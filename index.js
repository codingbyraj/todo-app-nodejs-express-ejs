const express = require('express');
const app = express();
const ejs = require("ejs");

var todos = [];
// for html and css
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get("/todos/addtask",(req, res)=>{
    console.log(req.query);
    var task = req.query.task;
    todos.push(task);
    res.redirect('/todos');
});

app.get('/todos',(req,res)=>{
    res.render('todolist', {list:todos});
});

app.get('/todos/update',(req,res)=>{
    let id = req.query.id;
    let updatedTask = req.query.task;
    let index = id - 1;    
    if(index >=0 && index < todos.length){
        todos[index] = updatedTask;
    }
    res.redirect('/todos');
});

app.get('/delete', (req,res)=>{
    let taskIndex = req.query.taskid;
    taskIndex--;
    if(taskIndex < 0 || taskIndex  >= todos.length){
        // wrong task id
        console.log("wrong task id! Can't delete");
    }
    else{
        // if task id is valid
        todos.splice(taskIndex,1);        
    }
    res.redirect('/todos');
});

app.get("/",(req, res)=>{    
    res.render('todolist',{list:todos});
});

app.listen(9000);