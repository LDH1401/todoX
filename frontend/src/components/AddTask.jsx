import React, { useState } from "react"; // Gộp import useState vào đây cho gọn
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const AddTask = ({ handleNewTaskAdded }) => {
    const [newTask, setNewTask] = useState(""); // Trạng thái để lưu trữ nội dung của task mới nhập vào

    const addTask = async () => {
        if (newTask.trim()) {
            try {
                await axios.post("http://localhost:5002/api/tasks", { title: newTask });
                toast.success("Thêm nhiệm vụ thành công!");
                
                if (typeof handleNewTaskAdded === "function") {
                    handleNewTaskAdded();
                }
                
                setNewTask(""); 
            } catch (error) {
                console.error("Lỗi khi thêm task:", error);
                toast.error("Lỗi khi thêm nhiệm vụ. Vui lòng thử lại!"); 
                // Nếu lỗi, chữ trong input vẫn được giữ nguyên để người dùng thử lại
            }
        } else {
            toast.error("Vui lòng nhập nội dung task");
        }
    };

    const handleKeyDown = (event) => { // Xử lý sự kiện khi người dùng nhấn phím Enter để thêm task nhanh hơn
        if (event.key === "Enter") {
            addTask();
        }
    };

    return (
        <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
            <div className="flex flex-col gap-3 sm:flex-row">
                <Input 
                    type="text" 
                    placeholder="Cần phải làm gì ?" 
                    className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:ring-primary focus:border-primary/50"
                    onChange={(event) => setNewTask(event.target.value)}
                    value={newTask}
                    onKeyDown={handleKeyDown} // Cho phép người dùng nhấn Enter để thêm task
                />
                <Button variant="gradient" size="xl" className="px-6" onClick={addTask}>
                    <Plus className="size-5 mr-2"/>
                    Thêm
                </Button>
            </div>
        </Card>
    );
};

export default AddTask;