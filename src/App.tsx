import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";


// CRUD
// Create
// Read
// Update
// Delete


export type FilterValuesType = "all" | "active" | "completed"

function App() {


    const todoListTitle = "What to learn"
    //state
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "JS & TS", isDone: true},
        {id: v1(), title: "REACT", isDone: false}
    ])

    const removeTask = (taskId: string) => {
        const newState = tasks.filter(t => t.id !== taskId)
        setTasks(newState)
    }


    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const newState = [newTask, ...tasks]
        setTasks(newState)
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
        // const task = tasks.find(t => t.id === taskId)
        //     if(task) {
        //
        //         task.isDone = newIsDone
        //         setTasks([...tasks])
        //     }
        const newState = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)
        setTasks(newState)
    }

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
