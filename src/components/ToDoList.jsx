import React, { useEffect, useState } from 'react'
import './ToDoList.css'

const ToDoList = () => {

    const getLocalItems = () => {
        let list = localStorage.getItem('lists');
        console.log(list);
        if(list){
            return JSON.parse(list);
        } else {
            return [];
        }
    }

const [task, setTask] = useState('');
const [tasks, setTasks] = useState(getLocalItems());

const handleInputChange = (e) => {
    setTask(e.target.value);
}

const addTask = () => {
    if(task == '')
        alert("you must write something");
    else{
    setTasks([...tasks, {text: task, completed: false}])
    }
    setTask("")
}

const addTaskAfterKeyPress = (e) => {
    if(e.key === 'Enter')
    addTask();
}

const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i)=>{
        if(index == i){
            return {...task, completed: !task.completed}
        }
        return task;
    })
    setTasks(newTasks);
}

const deleteTask = (index) => {
    const newTasks =
        tasks.filter((task,id)=>
            index !== id
        )
    setTasks(newTasks);
}

const removeAll = () =>{
    setTasks([]);
}

useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(tasks))
}, [tasks]);



  return (
    <div>
        <div>
            <img src="https://clipartcraft.com/images/checklist-clipart-schedule-2.png" alt="" width="75px" />
        </div>
      <h1>To-Do List</h1>
      <div className="input-container">
        <input type="text" value={task} onChange={handleInputChange} onKeyPress={addTaskAfterKeyPress} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task,index)=>(
            <li key={index} className={task.completed ? 'completed' : ''}>
                <span onClick={()=>toggleTaskCompletion(index)}>{task.text}</span>
                <button className='btn' onClick={()=>deleteTask(index)}>Delete</button>
            </li>
        ))}
      </ul>
      <div className="deleteAll">
        <button className="btn-delete" onClick={removeAll}>Remove All</button>
      </div>
    </div>
  )
}

export default ToDoList
