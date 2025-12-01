function TaskItem({ task, onToggle, onComplete}) {
    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <button
                className="complete-btn"
                onClick={() => onComplete(task.id)}
            >
                Complete
            </button>    
        </div>
    )
}

export default TaskItem