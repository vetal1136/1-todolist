import React, {ChangeEvent, JSX, KeyboardEvent, useRef, useState} from 'react';
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
    const [taskTitle, setTaskTitle] = useState("")


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
    const isTitleTooLong = taskTitle.length > 15
    const ifTaskCanAdded = taskTitle && !isTitleTooLong

    const tasksList: Array<JSX.Element> | JSX.Element = tasks.length
        ? tasksForTodolist.map(task => {
            const onClickRemoveTaskHandler = () => removeTask(task.id)
            return (<li>
                <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                <button onClick={onClickRemoveTaskHandler}>x</button>
            </li>)
        })
        : <div>Your tasksList is empty</div>

    const onClickHandlerCreator = (filter: FilterValuesType) => {
        return () => setFilter(filter)
    }

    const onClickAddTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle("")
    }

    const onChangeSetTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && ifTaskCanAdded) {
            onClickAddTaskHandler()
        }
    }

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={onChangeSetTaskTitle}
                    onKeyDown={onKeyDownAddTaskHandler}
                />
                <button
                    disabled={!ifTaskCanAdded}
                    onClick={onClickAddTaskHandler
                    }>+
                </button>
                {isTitleTooLong && <div>Your task title is too long</div>}
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
