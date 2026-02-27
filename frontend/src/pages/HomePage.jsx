import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]) // Bộ đệm để lưu trữ các nhiệm vụ đã truy xuất từ API

    const [activeTasksCount, setActiveTasksCount] = useState(0) // Số lượng nhiệm vụ đang làm

    const [completedTasksCount, setCompletedTasksCount] = useState(0) // Số lượng nhiệm vụ đã hoàn thành

    const [filter, setFilter] = useState("all") // Bộ lọc để xác định loại nhiệm vụ hiển thị (tất cả, đang làm, đã hoàn thành)

    useEffect(() => {
        fetchTasks()
    }, [])

    const fetchTasks = async () => { // Hàm để truy xuất nhiệm vụ từ API và cập nhật bộ đệm cùng với số lượng nhiệm vụ theo trạng thái
        try{
          const res = await axios.get("http://localhost:5002/api/tasks")
          setTaskBuffer(res.data.tasks)
          setActiveTasksCount(res.data.activeCount)
          setCompletedTasksCount(res.data.completedCount)  
          
        }catch(error){
          console.error("Lỗi khi truy xuất nhiệm vụ:", error)
          toast.error("Lỗi khi truy xuất nhiệm vụ")
        }
    }

    const filterTasks = taskBuffer.filter((task) => { // Lọc nhiệm vụ dựa trên trạng thái và bộ lọc đã chọn
        if(filter === "active") {
            return task.status === "active"
        }else if(filter === "completed") {
            return task.status === "completed"
        }else{
            return true
        }
    })

    const handleNewTaskAdded = () => { // Hàm được gọi khi một nhiệm vụ mới được thêm vào, sẽ gọi lại fetchTasks để cập nhật danh sách nhiệm vụ
        fetchTasks() 
    }

    return (
      <div className="min-h-screen w-full bg-white relative">

        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #f0f0f0 1px, transparent 1px),
              linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
              radial-gradient(circle 800px at 0% 200px, #d5c5ff, transparent)
            `,
            backgroundSize: "96px 64px, 96px 64px, 100% 100%",
          }}
        />
      
        <div className="container pt-8 mx-auto relative z-10">
            <div className="w-full max-w-2xl p-6 mx-auto space-y-6">

              <Header />

              <AddTask handleNewTaskAdded={handleNewTaskAdded} />

              <StatsAndFilters 
                activeTasksCount={activeTasksCount} 
                completedTasksCount={completedTasksCount}
                filter={filter}
                setFilter={setFilter}
              />
              <TaskList 
                filteredTasks={filterTasks} 
                filter={filter} 
              />

              <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                <TaskListPagination />
                <DateTimeFilter />
              </div>

              <Footer 
                activeTasksCount={activeTasksCount} 
                completedTasksCount={completedTasksCount} 
              />

            </div>
          </div>
      </div>
    )
}

export default HomePage