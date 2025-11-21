import React, { useState, useEffect } from 'react';

function AdminPage() {
  const [pendientes, setPendientes] = useState([]);
  const [mensaje, setMensaje] = useState('Cargando profesores pendientes...');

  // Función para obtener la lista de pendientes (la dejamos como estaba)
  const fetchPendientes = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/api/admin/pendientes', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        setMensaje('No hay profesores pendientes de aprobación.');
      }
      setPendientes(data);
    })
    .catch(error => {
      console.error("Error al obtener pendientes:", error);
      setMensaje('Error al cargar la lista.');
    });
  };

  // Usamos useEffect para llamar a la función al cargar la página
  useEffect(() => {
    fetchPendientes();
  }, []);

  // --- ¡NUEVA FUNCIÓN PARA CAMBIAR EL ESTADO! ---
  const handleStatusChange = (profesorId, nuevoEstado) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3001/api/admin/profesores/${profesorId}`, {
      method: 'PATCH', // Usamos el método PATCH
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ nuevoEstado: nuevoEstado }) // Enviamos el nuevo estado
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      // Para una experiencia de usuario fluida, actualizamos la lista en el momento
      // Filtrando al profesor que acabamos de modificar.
      setPendientes(pendientes.filter(p => p.id !== profesorId));
    })
    .catch(error => console.error("Error al actualizar estado:", error));
  };

  return (
    <div>
      <h1>Panel de Administrador</h1>
      <h2>Profesores Pendientes de Aprobación</h2>

      {pendientes.length > 0 ? (
        <ul>
          {pendientes.map(profesor => (
            <li key={profesor.id} style={{ marginBottom: '10px' }}>
              {profesor.nombre_completo} ({profesor.email})

              {/* --- ¡NUEVOS BOTONES! --- */}
              <button onClick={() => handleStatusChange(profesor.id, 'aprobado')} style={{ marginLeft: '10px' }}>
                Aprobar
              </button>
              <button onClick={() => handleStatusChange(profesor.id, 'rechazado')} style={{ marginLeft: '5px' }}>
                Rechazar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>{mensaje}</p>
      )}
    </div>
  );
}

export default AdminPage;