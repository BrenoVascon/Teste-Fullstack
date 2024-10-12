const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('../config/redis'); // Certifique-se de importar seu cliente Redis

exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username e password são obrigatórios' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({ username, password: hashedPassword });
        res.status(201).json({ id: newUser.id, username: newUser.username });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(403).json({ error: 'Senha incorreta' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const userSession = { id: user.id, username: user.username };
    client.setex(`session:${username}`, 3600, JSON.stringify(userSession)); // Armazena a sessão por 1 hora

    res.json({ token });
};

exports.logout = async (req, res) => {
    const { username } = req.user; // Obtém o username do usuário autenticado

    // Remove a sessão do Redis
    await client.del(`session:${username}`);
    res.status(200).json({ message: 'Logout successful' });
};
