const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('../config/redis');


exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username e password são obrigatórios' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, password: hashedPassword });
        res.status(201).json({ id: newUser.id, username: newUser.username });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(403).json({ error: 'Senha incorreta' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const userSession = { id: user.id, username: user.username };
        await client.set(`session:${username}`, JSON.stringify(userSession), {
            EX: 3600
        });

        res.json({ token });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro no login' });
    }
};

// Função de logout
exports.logout = async (req, res) => {
    const { username } = req.user;

    try {
        await client.del(`session:${username}`);
        res.status(200).json({ message: 'Logout realizado com sucesso' });
    } catch (error) {
        console.error('Erro no logout:', error);
        res.status(500).json({ message: 'Erro no logout' });
    }
};
