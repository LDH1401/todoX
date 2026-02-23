import e from 'express';
import express from 'express';
import { createTask, getAllTasks, updateTask, deleteTask } from '../controllers/taskControllers.js';

const router = express.Router();

router.get("/", getAllTasks)

router.post("/f", createTask)

router.put("/:id", updateTask)

router.delete("/:id", deleteTask)

export default router;