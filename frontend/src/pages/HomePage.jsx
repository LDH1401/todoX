import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React from "react";  
import { useState, useEffect } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";
import { FilterType } from "@/lib/data";
const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]) // Bộ đệm để lưu trữ các nhiệm vụ đã truy xuất từ API

    const [activeTasksCount, setActiveTasksCount] = useState(0) // Số lượng nhiệm vụ đang làm

    const [completedTasksCount, setCompletedTasksCount] = useState(0) // Số lượng nhiệm vụ đã hoàn thành

    const [filter, setFilter] = useState("all") // Bộ lọc để xác định loại nhiệm vụ hiển thị (tất cả, đang làm, đã hoàn thành)

    const [dateQuery, setDateQuery] = useState("today") // Bộ lọc để xác định khoảng thời gian hiển thị nhiệm vụ (hôm nay, tuần này, tháng này, tất cả)

    const [page, setPage] = useState(1) // Trang hiện tại trong phân trang nhiệm vụ

    useEffect(() => {
        fetchTasks()
    }, [dateQuery]) // Gọi hàm fetchTasks mỗi khi dateQuery thay đổi để cập nhật danh sách nhiệm vụ theo khoảng thời gian đã chọn

    useEffect(() => {
      setPage(1);
    }, [filter, dateQuery]);

    const fetchTasks = async () => { // Hàm để truy xuất nhiệm vụ từ API và cập nhật bộ đệm cùng với số lượng nhiệm vụ theo trạng thái
        try{
          const res = await api.get("/tasks?filter=" + dateQuery) // Gửi yêu cầu GET đến API với bộ lọc thời gian đã chọn
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
    
    const visibleTasks = filterTasks.slice((page - 1) * visibleTaskLimit, page * visibleTaskLimit) // Tính toán các nhiệm vụ cần hiển thị trên trang hiện tại dựa trên số lượng nhiệm vụ hiển thị mỗi trang (4 nhiệm vụ)
    
    if(visibleTasks.length === 0 && filterTasks.length > 0 && page > 1) { // Nếu không có nhiệm vụ nào hiển thị trên trang hiện tại nhưng vẫn còn nhiệm vụ sau khi lọc và trang hiện tại lớn hơn 1, thì chuyển về trang trước đó
        setPage(prev => prev - 1)
    }
    const totalPages = Math.ceil(filterTasks.length / visibleTaskLimit) // Tính toán tổng số trang dựa trên tổng số nhiệm vụ sau khi lọc và số lượng nhiệm vụ hiển thị mỗi trang

    const handNextPage = () => { // Hàm để chuyển sang trang tiếp theo, sẽ tăng giá trị page lên 1 nếu chưa ở trang cuối cùng
        if(page < totalPages) {
            setPage(prev => prev + 1)
        }
    }

    const handlePrevPage = () => { // Hàm để chuyển sang trang trước, sẽ giảm giá trị page xuống 1 nếu chưa ở trang đầu tiên
        if(page > 1) {
            setPage(prev => prev - 1)
        }
    }

    const handlePageSelect = (pageNum) => { // Hàm để chuyển đến trang được chọn, sẽ đặt giá trị page bằng pageNum nếu pageNum hợp lệ
        if(pageNum >= 1 && pageNum <= totalPages) {
            setPage(pageNum)
        }
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
                filteredTasks={visibleTasks} 
                filter={filter}
                handleNewTaskAdded={handleNewTaskAdded}
              />

              <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                <TaskListPagination
                  handleNext={handNextPage}       
                  handlePrev={handlePrevPage}     
                  handlePageChange={handlePageSelect} 
                  page={page}
                  totalPages={totalPages}
                />
                <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
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