// Obtener elementos del DOM
const form = document.getElementById('registroForm');
const mensajeDiv = document.getElementById('mensaje');
const bodyTabla = document.getElementById('bodyTabla');

// Variable para almacenar los datos (simulando una base de datos en localStorage)
let registros = [];

// Cargar datos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
});

// Manejar el envío del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const edad = document.getElementById('edad').value.trim();

    // Validación
    if (!nombre || !edad) {
        mostrarMensaje('Por favor completa todos los campos', 'error');
        return;
    }

    if (edad < 1 || edad > 120) {
        mostrarMensaje('La edad debe estar entre 1 y 120', 'error');
        return;
    }

    // Crear objeto de registro
    const nuevoRegistro = {
        id: Date.now(),
        nombre: nombre,
        edad: parseInt(edad)
    };

    // Agregar a la lista de registros
    registros.push(nuevoRegistro);

    // Guardar en localStorage
    guardarDatos();

    // Mostrar mensaje de éxito
    mostrarMensaje('¡Registro guardado exitosamente!', 'exito');

    // Limpiar formulario
    form.reset();

    // Actualizar tabla
    mostrarDatos();
});

// Función para guardar datos en localStorage
function guardarDatos() {
    localStorage.setItem('registros', JSON.stringify(registros));
}

// Función para cargar datos de localStorage
function cargarDatos() {
    const datosGuardados = localStorage.getItem('registros');
    if (datosGuardados) {
        registros = JSON.parse(datosGuardados);
        mostrarDatos();
    }
}

// Función para mostrar los datos en la tabla
function mostrarDatos() {
    bodyTabla.innerHTML = '';

    if (registros.length === 0) {
        bodyTabla.innerHTML = '<tr><td colspan="4" class="mensaje-vacio">No hay registros aún</td></tr>';
        return;
    }

    registros.forEach((registro, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${registro.id}</td>
            <td>${registro.nombre}</td>
            <td>${registro.edad}</td>
            <td>
                <button class="btn-delete" onclick="eliminarRegistro(${registro.id})">Eliminar</button>
            </td>
        `;
        bodyTabla.appendChild(fila);
    });
}

// Función para eliminar un registro
function eliminarRegistro(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
        registros = registros.filter(registro => registro.id !== id);
        guardarDatos();
        mostrarDatos();
        mostrarMensaje('Registro eliminado correctamente', 'exito');
    }
}

// Función para mostrar mensajes
function mostrarMensaje(texto, tipo) {
    mensajeDiv.textContent = texto;
    mensajeDiv.className = `mensaje ${tipo}`;

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeDiv.className = 'mensaje';
    }, 3000);
}
