import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";
const TaskList = ({filteredTasks, filter}) => {
    
    if(filteredTasks.length === 0 || !filteredTasks) {
        return <TaskEmptyState filter={filter}/>
    }

    return (
        <div className="space-y-3">
            {filteredTasks.map((task, index) => (
                <TaskCard 
                    key={task._id ?? index}
                    task={task}
                    index={index}
                />

            ))}

        </div>
    )
}

export default TaskList