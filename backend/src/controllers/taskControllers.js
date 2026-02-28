import Task from '../models/Task.js';

export const getAllTasks = async (req, res) => {
    const {filter = "today"} = req.query; // lấy filter từ query parameters
    const now = new Date(); // lấy thời điểm hiện tại
    let startDate; // biến để lưu thời điểm bắt đầu của khoảng thời gian cần lọc
    switch (filter) {
        case "today":
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // bắt đầu từ 00:00:00 của ngày hôm nay
            break;
        case "week":
            const dayOfWeek = now.getDay(); // lấy thứ trong tuần (0-6, 0 là chủ nhật)
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek); // bắt đầu từ chủ nhật của tuần này
            break;
        case "month":
            startDate = new Date(now.getFullYear(), now.getMonth(), 1); // bắt đầu từ ngày 1 của tháng này
            break;
        case "all":
        default:
            startDate = null; // không lọc theo thời gian, lấy tất cả tasks
    }

    const query = startDate ? {createdAt: {$gte: startDate}} : {}; // nếu có startDate thì lọc tasks có createdAt lớn hơn hoặc bằng startDate, nếu không thì lấy tất cả tasks

    try {
        const result = await Task.aggregate([
            {$match: query}, // lọc tasks theo query đã xác định
            {
                $facet: {
                    tasks: [{$sort: {createdAt: -1}}], // sắp xếp tasks theo createdAt giảm dần
                    activeCount: [{$match: {status: "active"}}, {$count: "count"}], // đếm số lượng tasks có status là "active"
                    completedCount: [{$match: {status: "completed"}}, {$count: "count"}] // đếm số lượng tasks có status là "completed"
                }
            }
        ])

        const tasks = result[0].tasks; // lấy mảng tasks từ kết quả aggregate
        const activeCount = result[0].activeCount[0] ? result[0].activeCount[0].count : 0; // lấy số lượng tasks active, nếu không có thì trả về 0
        const completedCount = result[0].completedCount[0] ? result[0].completedCount[0].count : 0; // lấy số lượng tasks completed, nếu không có thì trả về 0
        res.status(200).json({tasks, activeCount, completedCount}); // trả về mảng tasks và số lượng active, completed với status 200 (OK)
        
    } catch (error) {
        console.error("FULL ERROR:", error);
        res.status(500).json({message: "Error fetching tasks"});
    }
}

export const createTask = async (req, res) => {
    try{
        const {title} = req.body; // lấy title từ request body
        const newTask = new Task({title}); // tạo mới một task với title từ request body
        await newTask.save(); // lưu task mới vào database
        res.status(201).json(newTask); // trả về task mới được tạo với status 201 (Created)
    } catch (error) {
        console.error("Error creating task", error.message);
        res.status(500).json({message: "Error creating task"});
    }
}

export const updateTask = async (req, res) => {
    try {
        const {title, status, completedAt} = req.body; // lấy title, status, completed từ request body
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, // lấy id từ request params
            {
                title, 
                status, 
                completedAt
            }, // cập nhật title, status, completed của task
            {new: true} // trả về task đã được cập nhật
        );
        if (!updatedTask) {
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json(updatedTask); // trả về task đã được cập nhật với status 200 (OK)
    } catch (error) {
        console.error("Error updating task", error.message);
        res.status(500).json({message: "Error updating task"});
    }
}

export const deleteTask = async (req, res) => {
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id); // lấy id từ request params và xóa task tương ứng
        if (!deletedTask) {
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json({message: "Task deleted successfully"}); // trả về message khi xóa thành công với status 200 (OK)
    }catch (error) {
        res.status(500).json({message: "Error deleting task"});
        console.error("Error deleting task", error.message);
    }
}
