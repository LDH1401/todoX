import React from "react";
import { Card } from "@/components/ui/card";
import { Circle } from "lucide-react";
const TaskEmptyState = ({ filter}) => {
    return (
        <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
            <div className="space-y-3">
                <Circle className="mx-auto size-12 text-muted-foreground" />
                <div>
                    <h3 className="font-medium text-foreground">
                        {
                            filter === "active" ? "Không có task đang làm nào!" : 
                            filter === "completed" ? "Không có task đã hoàn thành nào!" :
                            "Không có task nào!"
                        }
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        {filter === "all"
                            ? "Hãy thêm task mới để bắt đầu công việc của bạn!"
                            : `Chuyển sang "tất cả" để xem tất cả task của bạn. ${filter === "active" ? "Đã hoàn thành" : "Đang làm"}`
                        }
                    </p>
                </div>
            </div>

        </Card>
    )
}

export default TaskEmptyState