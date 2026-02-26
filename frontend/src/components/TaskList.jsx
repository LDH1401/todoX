import React from "react";
import TaskEmptyState from "./TaskEmptyState";

const TaskList = () => {
    let filter = "all"

    const filteredTasks = [  // Lọc tasks dựa trên filter
        {
            _id: "1",
            title: "học react",
            status: "active",
            completedAt: null,
            createdAt: new Date()
        },
        {
            _id: "2",
            title: "học nodejs",
            status: "completed",
            completedAt: new Date(),
            createdAt: new Date()
        }
    ]
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