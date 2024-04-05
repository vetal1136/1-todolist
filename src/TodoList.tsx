import React, {JSX, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void

}


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export const TodoList = ({
                             title,
                             tasks,
                             removeTask,
                             // changeTodolistFilter
                         }: TodoListPropsType) => {

    const [filter, setFilter] = useState<FilterValuesType>("all")



    const getTasksForTodolist = (allTasks: Array<TaskType>, nextFilterValue: FilterValuesType) => {

        switch (nextFilterValue) {
            case "active":
                return allTasks.filter(t => t.isDone === false);
            case "completed":
                return allTasks.filter(t => t.isDone === true);
            default:
                return allTasks;
        }
    }

    const tasksForTodolist = getTasksForTodolist(tasks, filter)

    const tasksList: Array<JSX.Element> = tasksForTodolist.map(task => {
        const removeTaskHandler = () => removeTask(task.id)
        return (<li>
            <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
            <button onClick={removeTaskHandler}>x</button>
        </li>)
    })

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("active")}>Active</button>
                <button onClick={() => setFilter("completed")}>Completed</button>
            </div>
        </div>
    );
};

