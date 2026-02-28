import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SquarePen, Trash2 } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";

const TaskCard = ({ task, index, handleNewTaskAdded }) => {

    const [isEditing, setIsEditing] = useState(false) // Trạng thái để xác định xem task có đang ở chế độ chỉnh sửa hay không

    const [updatedTitle, setUpdatedTitle] = useState(task.title || "") // Trạng thái để lưu trữ tiêu đề đã chỉnh sửa của task

    const deleteTask = async () => {
        try{
            await api.delete(`/tasks/${task._id}`)
            toast.success("Xóa nhiệm vụ thành công!")
            handleNewTaskAdded() // Gọi lại hàm để cập nhật danh sách nhiệm vụ sau khi xóa
        }catch(error){
            console.error("Lỗi khi xóa nhiệm vụ:", error)
            toast.error("Lỗi khi xóa nhiệm vụ. Vui lòng thử lại!")
        }
    }

    const handleKeyDown = (event) => { // Xử lý sự kiện khi người dùng nhấn phím Enter để thêm task nhanh hơn
        if (event.key === "Enter") {
            updatedTask()
        }
    };

    const updatedTask = async () => {
        try{
            setIsEditing(false) // Chuyển về chế độ xem trước khi gọi API để có phản hồi nhanh hơn
            await api.put(`/tasks/${task._id}`, { title: updatedTitle })
            toast.success("Cập nhật nhiệm vụ thành công!")
            handleNewTaskAdded() // Gọi lại hàm để cập nhật danh sách nhiệm vụ sau khi chỉnh sửa
        }catch(error){
            console.error("Lỗi khi cập nhật nhiệm vụ:", error)
            toast.error("Lỗi khi cập nhật nhiệm vụ. Vui lòng thử lại!")
        }
    }

    const toggleTaskStatus = async () => {
        try{
            const newStatus = task.status === "active" ? "completed" : "active"
            await api.put(`/tasks/${task._id}`, { status: newStatus, completedAt: new Date().toISOString() })
            toast.success(`Cập nhật trạng thái nhiệm vụ thành ${newStatus === "active" ? "đang làm" : "đã hoàn thành"}!`)
            handleNewTaskAdded() // Gọi lại hàm để cập nhật danh sách nhiệm vụ sau khi thay đổi trạng thái  
        }catch(error){
            console.error("Lỗi khi cập nhật trạng thái nhiệm vụ:", error)
            toast.error("Lỗi khi cập nhật trạng thái nhiệm vụ. Vui lòng thử lại!")
        }
    }
    return (
        <Card 
            className={cn("p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
                task.status === 'completed' && 'opacity-75'
            )}
            style={{ animationDelay: `${index * 100}ms` }} // Tạo hiệu ứng fade-in với độ trễ dựa trên index
        >
            <div className="flex items-center gap-4">
                {/* Nút hoàn thành task */}
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn("flex-shrink-0 size-8 rounded-full transition-all duration-200",
                        task.status === 'completed' ? "text-success hover:text-success/80" : "text-muted-foreground hover:text-primary"
                    )}
                    onClick={toggleTaskStatus} // Gọi hàm để thay đổi trạng thái khi nhấn nút
                >
                    {task.status === 'completed' ? 
                        (<CheckCircle2 className="size-5" />)
                        : 
                        (<Circle className="size-5" />)
                    }
                </Button>

                {/* Hiển thị hoặc chỉnh sửa tiêu đề task */}
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <Input 
                            placeholder="Edit task title"
                            className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            onKeyDown={handleKeyDown} // Cho phép người dùng nhấn Enter để lưu chỉnh sửa
                            onBlur={() => {
                                setIsEditing(false) // Khi mất focus, chuyển về chế độ xem

                            }}
                        />
                        ) : (
                        <p 
                            className={cn("text-base transition-all duration-200",
                                task.status === 'completed' ? "line-through text-muted-foreground" : "text-foreground"
                            )}
                        >
                            {task.title}
                        </p>
                        )
                    }
                </div>
                {/* Ngày tạo và ngày hoàn thành */}
                <div className="flex items-center gap-2 mt-1">
                    <Calendar className="size-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                        {new Date(task.createdAt).toLocaleDateString()}     
                    </span>
                    {task.completedAt && (
                        <>
                            <span className="text-xs text-muted-foreground">-</span>
                            <Calendar className="size-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                                {new Date(task.completedAt).toLocaleDateString()}     
                            </span>
                        </>
                    )}
                </div>
                {/* Nút chỉnh sửa và xóa task */}
                <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 size-8 transition-colors text-muted-foreground hover:text-info"
                        onClick={() => {
                            setIsEditing(true) // Chuyển sang chế độ chỉnh sửa khi nhấn nút
                            setUpdatedTitle(task.title) // Đặt giá trị ban đầu của input là tiêu đề hiện tại của task   
                        }}
                    >
                        <SquarePen className="size-4" />

                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 size-8 transition-colors text-muted-foreground hover:text-destructive"
                        onClick={deleteTask} // Gọi hàm xóa khi nhấn nút
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default TaskCard