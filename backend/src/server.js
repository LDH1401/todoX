import express from 'express';

const  app = express();

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});

app.get("/api/tasks", (req, res) => {
    res.send("hell1o")
})

app.post("/api/tasks", (req, res) => {
    res.status(200).json({message: "Task created successfully"})
})

app.put("/api/tasks/:id", (req, res) => {
    res.status(200).json({message: "Task updated successfully"})
})

app.delete("/api/tasks/:id", (req, res) => {
    res.status(200).json({message: "Task deleted successfully"})
})