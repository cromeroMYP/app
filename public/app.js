const API_URL = 'http://localhost:3000/api';

// Elementos del DOM
const registroForm = document.getElementById('registroForm');
const registrosBody = document.getElementById('registrosBody');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const closeBtn = document.querySelector('.close');

// EVENT LISTENERS
registroForm.addEventListener('submit', agregarRegistro);
editForm.addEventListener('submit', guardarCambios);
closeBtn.addEventListener('click', cerrarModal);
window.addEventListener('click', (e) => {
  if (e.target === editModal) cerrarModal();
});

// Cargar registros al iniciar
cargarRegistros();

// FUNCIONES PRINCIPALES

async function cargarRegistros() {
  try {
    const response = await fetch(`${API_URL}/registros`);
    const registros = await response.json();

    if (registros.length === 0) {
      registrosBody.innerHTML = '<tr><td colspan="5" class="no-data">No hay registros aún</td></tr>';
    } else {
      registrosBody.innerHTML = registros.map(reg => `
        <tr>
          <td>${reg.id}</td>
          <td>${reg.nombre}</td>
          <td>${reg.puntaje}</td>
          <td>${reg.porcentaje.toFixed(2)}%</td>
          <td>
            <div class="actions">
              <button class="btn-edit" onclick="abrirModalEditar(${reg.id}, '${reg.nombre}', ${reg.puntaje}, ${reg.porcentaje})">Editar</button>
              <button class="btn-delete" onclick="eliminarRegistro(${reg.id})">Eliminar</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  } catch (error) {
    console.error('Error cargando registros:', error);
    registrosBody.innerHTML = '<tr><td colspan="5" class="no-data">Error cargando datos</td></tr>';
  }
}

async function agregarRegistro(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const puntaje = parseInt(document.getElementById('puntaje').value);
  const porcentaje = parseFloat(document.getElementById('porcentaje').value);

  if (!nombre || isNaN(puntaje) || isNaN(porcentaje)) {
    alert('Por favor completa todos los campos correctamente');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/registros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, puntaje, porcentaje })
    });

    if (response.ok) {
      registroForm.reset();
      cargarRegistros();
      showNotification('✓ Registro agregado exitosamente');
    } else {
      alert('Error al agregar el registro');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión');
  }
}

function abrirModalEditar(id, nombre, puntaje, porcentaje) {
  document.getElementById('editId').value = id;
  document.getElementById('editNombre').value = nombre;
  document.getElementById('editPuntaje').value = puntaje;
  document.getElementById('editPorcentaje').value = porcentaje;
  editModal.style.display = 'block';
}

function cerrarModal() {
  editModal.style.display = 'none';
  editForm.reset();
}

async function guardarCambios(e) {
  e.preventDefault();

  const id = document.getElementById('editId').value;
  const nombre = document.getElementById('editNombre').value.trim();
  const puntaje = parseInt(document.getElementById('editPuntaje').value);
  const porcentaje = parseFloat(document.getElementById('editPorcentaje').value);

  try {
    const response = await fetch(`${API_URL}/registros/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, puntaje, porcentaje })
    });

    if (response.ok) {
      cerrarModal();
      cargarRegistros();
      showNotification('✓ Registro actualizado exitosamente');
    } else {
      alert('Error al actualizar el registro');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión');
  }
}

async function eliminarRegistro(id) {
  if (!confirm('¿Estás seguro de que deseas eliminar este registro?')) return;

  try {
    const response = await fetch(`${API_URL}/registros/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      cargarRegistros();
      showNotification('✓ Registro eliminado exitosamente');
    } else {
      alert('Error al eliminar el registro');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión');
  }
}

// Notificación temporal
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 15px 20px;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: slideInRight 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000);
}

// Añadir estilos de animación
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);
