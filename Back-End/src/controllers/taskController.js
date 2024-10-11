const Task = require('../models/Task');

exports.addTask = async (req, res) => {
    const { title } = req.body;
    const userId = req.user.id; // Obter o ID do usuário do token

    if (!title) {
        return res.status(400).json({ error: 'Título da tarefa é obrigatório' });
    }

    try {
        const newTask = await Task.create({ title, userId });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar tarefa' });
    }
};

exports.getTasks = async (req, res) => {
    const userId = req.user.id; // Obter o ID do usuário do token

    try {
        const tasks = await Task.findAll({ where: { userId } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar tarefas' });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body; // Make sure to use the correct property name
    const userId = req.user.id; // Obter o ID do usuário do token

    try {
        const task = await Task.findOne({ where: { id, userId } });

        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }

        if (title !== undefined) {
            task.title = title; // Ensure you're updating title if provided
        }
        if (status !== undefined) { // Ensure you're checking the correct property
            task.status = status; // Change 'completed' to 'status'
        }

        await task.save();
        res.json(task);
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
};


exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Obter o ID do usuário do token

    try {
        const task = await Task.findOne({ where: { id, userId } });

        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }

        await task.destroy();
        res.status(204).send(); // No Content
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover tarefa' });
    }
};
