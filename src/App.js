import { useState, useEffect } from 'react'
import Header from './Components/Header'
import Tasks from './Components/Tasks'
import AddTask from './Components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
      const getData = async () => {
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
      }
    getData()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = res.json()
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = res.json()
    return data
  }

  const addTask = async (task) => {
    setShowAddTask(false)
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json();
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 1000000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
        
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder} : task))

  }

  const name = 'Task Tracker'

  return (
    <div className="container">
      <Header 
        title = {name} 
        onAdd = {() => {setShowAddTask(!showAddTask)}}
        formStatus = {showAddTask}
      /> 
      {showAddTask && <AddTask onAdd = {addTask} ></AddTask>}
      {tasks.length > 0 ? <Tasks tasks = {tasks} deleteTask = {deleteTask} onToggle = {toggleReminder}/> : 'No Tasks To Show'}
    </div>
  );
}

export default App;
