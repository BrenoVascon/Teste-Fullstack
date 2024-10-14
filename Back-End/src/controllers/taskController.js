const User = require('../models/user');
const Task = require('../models/task');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('../config/redis');

exports.addTask = async (req, res) => {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Título é obrigatório' });
    }

    try {
      const newTask = await Task.create({ title, status: 'pending', userId: req.user.id });
      res.status(201).json(newTask);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      res.status(500).json({ error: 'Erro ao adicionar tarefa' });
    }
  };


  exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;

    try {
        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });

        if (title !== undefined) {
            task.title = title;
        }

        if (status !== undefined && ['pending', 'completed'].includes(status)) {
            task.status = status;
        } else if (status !== undefined) {
            return res.status(400).json({ error: 'Status inválido. Use "pending" ou "completed".' });
        }

        await task.save();
        res.json(task);
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
};



exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
      const task = await Task.findByPk(id);
      if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });

      await task.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
};

exports.getTasks = async (req, res) => {
    try {
      console.log('Usuário autenticado:', req.user);
      const tasks = await Task.findAll({
        where: { userId: req.user.id }
      });
      res.json(tasks);
    } catch (error) {
      console.error('Erro ao obter tarefas:', error);
      res.status(500).json({ error: 'Erro ao obter tarefas' });
    }
};
