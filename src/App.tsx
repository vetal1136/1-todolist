import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";


export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const todoListTitle = "What to learn"
    //state
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS & TS", isDone: true},
        {id: 3, title: "REACT", isDone: false}
    ])

    const removeTask = (taskId: number) => {
        const newState = tasks.filter(t => t.id !== taskId)
        setTasks(newState)
    }



    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
