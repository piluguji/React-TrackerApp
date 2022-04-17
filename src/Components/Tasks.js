import Task from './Task'

const Tasks = ( {tasks, deleteTask, onToggle } ) => {
    //setTasks allows us to change the tasks
    return (
    <>
        {tasks.map((task) => (
            <Task key = {task.id} task = {task} deleteTask = {deleteTask} onToggle={onToggle}/>
        ))}
    </>
  )
}

export default Tasks