const express = require('express');
const { Task } = require('../models');
const cors = require('cors'); // Импортируем cors

const app = express();
const PORT = 3000;

// Разрешаем запросы с любого источника (для разработки)
app.use(cors());

// Или настрой CORS для конкретного домена
app.use(
  cors({
    origin: 'http://localhost:1420', // Разрешаем запросы только с этого домена
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешаем только определенные методы
    credentials: true, // Разрешаем передачу кук и заголовков авторизации
  })
);

// Middleware для обработки JSON
app.use(express.json());

// Эндпоинт для создания задачи
app.post('/tasks', async (req, res) => {
  try {
    const { text, date } = req.body;

    // Создание новой задачи
    const newTask = await Task.create({ text, date });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Ошибка при создании задачи:', error);
    res.status(500).json({ error: 'Не удалось создать задачу' });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [
        ['createdAt', 'ASC'] // Сортировка по убыванию (новые сначала)
      ]
    });
    res.json(tasks);
  } catch (error) {
    console.error('Ошибка при получении задач:', error);
    res.status(500).json({ error: 'Не удалось получить задачи' });
  }
});



// Эндпоинт для получения задачи по ID
app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Задача не найдена' });
    }
  } catch (error) {
    console.error('Ошибка при получении задачи:', error);
    res.status(500).json({ error: 'Не удалось получить задачу' });
  }
});

// Эндпоинт для обновления задачи
app.put('/tasks/:id', async (req, res) => {
  try {
    const { text, date } = req.body;

    const [updated] = await Task.update(
      { text, date },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedTask = await Task.findByPk(req.params.id);
      res.json(updatedTask);
    } else {
      res.status(404).json({ error: 'Задача не найдена' });
    }
  } catch (error) {
    console.error('Ошибка при обновлении задачи:', error);
    res.status(500).json({ error: 'Не удалось обновить задачу' });
  }
});

// Эндпоинт для удаления задачи
app.delete('/tasks/:id', async (req, res) => {
  try {
    const deleted = await Task.destroy({ where: { id: req.params.id } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Задача не найдена' });
    }
  } catch (error) {
    console.error('Ошибка при удалении задачи:', error);
    res.status(500).json({ error: 'Не удалось удалить задачу' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});