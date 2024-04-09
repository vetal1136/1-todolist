import React, {JSX, useRef, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void

}


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const TodoList = ({
                             title,
                             tasks,
                             addTask,
                             removeTask,
                             // changeTodolistFilter
                         }: TodoListPropsType) => {

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const taskTitleInput = useRef<HTMLInputElement>(null)

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




    const onClickHandlerCreator = (filter: FilterValuesType) => {
        return () => setFilter(filter)
    }

    const onClickAddTaskHandler = () => {
        if(taskTitleInput.current) {
            const newTaskTitle = taskTitleInput.current.value
            addTask(newTaskTitle)
            taskTitleInput.current.value = ""
        }

    }

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input ref={taskTitleInput}/>
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={onClickHandlerCreator("all")}>All</button>
                <button onClick={onClickHandlerCreator("active")}>Active</button>
                <button onClick={onClickHandlerCreator("completed")}>Completed</button>
            </div>
        </div>
    );
};

