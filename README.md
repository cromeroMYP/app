# Base de Datos Online

Una aplicación web simple para crear, leer, actualizar y eliminar registros con **nombre**, **puntaje** y **porcentaje**.

## 🚀 Características

- ✅ Agregar nuevos registros
- ✅ Ver todos los registros en una tabla
- ✅ Editar registros existentes
- ✅ Eliminar registros
- ✅ Interfaz responsive y moderna
- ✅ Base de datos local SQLite

## 📋 Requisitos

- Node.js (v14 o superior)
- npm

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/cromeroMYP/app.git
cd app
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor:
```bash
npm start
```

4. Abrir en el navegador:
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
app/
├── server.js              # Servidor Express y API REST
├── package.json           # Dependencias del proyecto
├── database.db           # Base de datos SQLite (se crea automáticamente)
├── public/
│   ├── index.html        # Interfaz HTML
│   ├── styles.css        # Estilos CSS
│   └── app.js            # Lógica JavaScript
└── README.md             # Este archivo
```

## 🔌 API REST

### GET - Obtener todos los registros
```
GET /api/registros
```

### GET - Obtener un registro
```
GET /api/registros/:id
```

### POST - Crear nuevo registro
```
POST /api/registros
Body: {
  "nombre": "Juan",
  "puntaje": 85,
  "porcentaje": 92.5
}
```

### PUT - Actualizar un registro
```
PUT /api/registros/:id
Body: {
  "nombre": "Juan",
  "puntaje": 90,
  "porcentaje": 95.0
}
```

### DELETE - Eliminar un registro
```
DELETE /api/registros/:id
```

## 💻 Tecnologías Usadas

- **Backend:** Node.js, Express.js
- **Base de Datos:** SQLite3
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **CORS:** Habilitado para desarrollo

## 📝 Ejemplo de Uso

1. Llena el formulario con:
   - Nombre: "María"
   - Puntaje: 95
   - Porcentaje: 98.5

2. Click en "Agregar Registro"
3. El registro aparecerá en la tabla
4. Puedes editar o eliminar registros con los botones

## 🚀 Despliegue

Para desplegar en producción:

- **Heroku:** 
  ```bash
  heroku create tu-app
  git push heroku main
  ```

- **Vercel:** Configurar `server.js` como función serverless
- **Firebase:** Migrar a Firebase Realtime Database

## 📄 Licencia

MIT

## 👤 Autor

cromeroMYP
