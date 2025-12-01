import { useState } from 'react'

function TaskInput({ onAddTask }) {
    const [inputValue, setInputValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (inputValue.trim() === '') {
            alert('You got stuff to get done, fill me out!!!')
            return
        }

        const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        createdAt: new Date()
        }

        
        onAddTask(newTask)
        setInputValue('')
    }

    return (
        <form onSubmit={handleSubmit} className="task-input">
            <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Whatchu gotta do, boo?"
            />
            <button type="submit">Add Task</button>
        </form>
    )
}

export default TaskInput
