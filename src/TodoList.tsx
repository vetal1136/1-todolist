import React, {JSX} from 'react';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export const TodoList = ({title, tasks}: TodoListPropsType) => {
    //1. const title = props.title
    // const tasks = props.tasks

    // 2. const{title, tasks} = props

    const tasksList: Array<JSX.Element> = tasks.map(task => {
        return (<li>
            <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

