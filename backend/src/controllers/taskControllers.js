import Task from '../models/Task.js';

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({createdAt: -1}); // lấy tất cả tasks và sắp xếp theo createdAt giảm dần
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks", error.message);
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
        const {title, status, completed} = req.body; // lấy title, status, completed từ request body
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, // lấy id từ request params
            {
                title, 
                status, 
                completed
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
