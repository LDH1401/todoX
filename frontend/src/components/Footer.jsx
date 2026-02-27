import React from "react";

const Footer = ({completedTasksCount, activeTasksCount}) => {
    return (
        <>
            {completedTasksCount + activeTasksCount > 0 && (
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        {
                            completedTasksCount > 0 && (
                                <>
                                    Tuyệt vời! Bạn đã hoàn thành {completedTasksCount} công việc.
                                    {
                                        activeTasksCount > 0 && `, Còn ${activeTasksCount} công việc nữa thôi, cố lên nhé!`
                                    }
                                </>
                            )
                        }
                        {
                            completedTasksCount === 0 && activeTasksCount > 0 && `Hãy bắt đầu với ${activeTasksCount} công việc!`
                        }
                    </p>    
                </div>
            )}
        </>
    )
}

export default Footer