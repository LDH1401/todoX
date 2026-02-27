import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SquarePen, Trash2 } from "lucide-react"; 

const TaskCard = ({ task, index }) => {
    let isEditing = false; // Giả sử đang ở trạng thái không chỉnh sửa
    return (
        <Card 
            className={cn("p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
                task.status === 'complete' && 'opacity-75'
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
                >
                    {task.status === 'completed' ? 
                        (<CheckCircle2 className="size-5" />)
                        : 
                        (<Circle className="size-5" />)
                    }
                </Button>
                {/* Hiển thị hoặc chỉnh sửa tiêu đề task */}
                <div className="flex-1 min-w-0">
                    {isEditing ? 
                        (
                        <Input 
                            placeholder="Edit task title"
                            className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                            type="text"
                        />
                        ) 
                        :
                        (
                        <p 
                            className={cn("text-base transition-all duration-200",
                                task.status === 'complete' ? "line-through text-muted-foreground" : "text-foreground"
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
                                {new Date(task.completeAt).toLocaleDateString()}     
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
                    >
                        <SquarePen className="size-4" />

                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 size-8 transition-colors text-muted-foreground hover:text-destructive"
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default TaskCard