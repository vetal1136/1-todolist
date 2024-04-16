import React, {ChangeEvent, JSX, KeyboardEvent, useRef, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void

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
                             changeTaskStatus
                             // changeTodolistFilter
                         }: TodoListPropsType) => {

    const [filter, setFilter] = useState<FilterValuesType>("all")
    const [taskTitle, setTaskTitle] = useState("")
    const [taskInputError, setTaskInputError] = useState<string | null>(null)


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
            const onChangeSetTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)
            return (<li key={task.id}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={onChangeSetTaskStatusHandler}
                /> <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                <button onClick={onClickRemoveTaskHandler}>x</button>
            </li>)
        })
        : <div>Your tasksList is empty</div>

    const onClickHandlerCreator = (filter: FilterValuesType) => {
        return () => setFilter(filter)
    }

    const onClickAddTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle) {
            addTask(trimmedTaskTitle)
            setTaskInputError(null)
        } else {
            setTaskInputError("Field is empty")
        }
        setTaskTitle("")
    }

    const onChangeSetTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskInputError(null)
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
                    className={taskInputError ? "task-input-error" : ""}
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
                {taskInputError && <div className="task-input-error-message">{taskInputError}</div>}
            </div>
            <ul>
            {tasksList}
            </ul>
            <div>
                <button
                    className={filter === "all" ? "filter-btn-active" : ""}
                    onClick={onClickHandlerCreator("all")}>All
                </button>
                <button
                    className={filter === "active" ? "filter-btn-active" : ""}
                    onClick={onClickHandlerCreator("active")}>Active
                </button>
                <button
                    className={filter === "completed" ? "filter-btn-active" : ""}
                    onClick={onClickHandlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

