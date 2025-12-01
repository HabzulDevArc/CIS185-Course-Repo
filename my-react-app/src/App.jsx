import { useState, useEffect } from 'react'
import './App.css'
import TaskInput from './TaskInput'
import TaskList from './TaskList'
import FilterButtons from './FilterButtons'

function App() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (newTask) => {
    setTasks([...tasks, newTask])
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const getFilteredTasks = () => {
    if (filter === 'active') {
      return tasks.filter(task => !task.completed)
    }
    if (filter === 'completed') {
      return tasks.filter(task => task.completed)
    }
    return tasks
  }

  const filteredTasks = getFilteredTasks()
  const activeCount = tasks.filter(task => !task.completed).length

  return (
    <div className="app">
      <h1>Git 'er Done App</h1>
      <TaskInput onAddTask={addTask} />
      <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
      <p className="task-count">
        {activeCount} active task{activeCount !== 1 ? 's' : ''} remaining
      </p>
    </div>
  )
}

export default App