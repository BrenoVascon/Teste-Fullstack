require('dotenv').config();
const express = require('express');
const { connectDatabase, sequelize } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', taskRoutes);

const startServer = async () => {
  try {
    await connectDatabase();
    await sequelize.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
};

startServer();
