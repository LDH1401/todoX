import dotenv from 'dotenv';
import express from 'express';
import taskRoutes from './routes/taskRoutes.js';
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; // 1. Thêm thư viện này

dotenv.config();

const PORT = process.env.PORT || 5001;

// 2. Khai báo __dirname chuẩn xác thay cho path.resolve()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ... các phần code dưới giữ nguyên

// middleware
app.use(express.json());
if(process.env.NODE_ENV === "development") {
    app.use(cors({origin: "http://localhost:5173"})); // Chỉ cho phép frontend chạy trên localhost:5173 truy cập API trong môi trường phát triển
}

app.use("/api/tasks", taskRoutes);

if(process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "..", "..", "frontend", "dist");

    app.use(express.static(frontendPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

connectDB().then(() => { // kết nối database thành công thì mới bắt đầu server
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
});

