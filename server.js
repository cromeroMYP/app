const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Inicializar base de datos
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Conectado a la base de datos SQLite');
    initializeDatabase();
  }
});

// Crear tabla si no existe
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS registros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      puntaje INTEGER NOT NULL,
      porcentaje REAL NOT NULL,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Tabla de registros lista');
    }
  });
}

// RUTAS API

// GET - Obtener todos los registros
app.get('/api/registros', (req, res) => {
  db.all('SELECT * FROM registros ORDER BY id DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// GET - Obtener un registro por ID
app.get('/api/registros/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM registros WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Registro no encontrado' });
    } else {
      res.json(row);
    }
  });
});

// POST - Crear nuevo registro
app.post('/api/registros', (req, res) => {
  const { nombre, puntaje, porcentaje } = req.body;

  // Validación
  if (!nombre || puntaje === undefined || porcentaje === undefined) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  if (isNaN(puntaje) || isNaN(porcentaje)) {
    return res.status(400).json({ error: 'Puntaje y porcentaje deben ser números' });
  }

  db.run(
    'INSERT INTO registros (nombre, puntaje, porcentaje) VALUES (?, ?, ?)',
    [nombre, puntaje, porcentaje],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID, nombre, puntaje, porcentaje });
      }
    }
  );
});

// PUT - Actualizar un registro
app.put('/api/registros/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, puntaje, porcentaje } = req.body;

  if (!nombre || puntaje === undefined || porcentaje === undefined) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  db.run(
    'UPDATE registros SET nombre = ?, puntaje = ?, porcentaje = ? WHERE id = ?',
    [nombre, puntaje, porcentaje, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id, nombre, puntaje, porcentaje });
      }
    }
  );
});

// DELETE - Eliminar un registro
app.delete('/api/registros/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM registros WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ mensaje: 'Registro eliminado' });
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
