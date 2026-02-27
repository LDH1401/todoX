import dotenv from 'dotenv';
import express from 'express';
import taskRoutes from './routes/taskRoutes.js';
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5001;

const  app = express();

// middleware
app.use(express.json());
app.use(cors({origin: "http://localhost:5173"}));

app.use("/api/tasks", taskRoutes);

connectDB().then(() => { // kết nối database thành công thì mới bắt đầu server
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
});

