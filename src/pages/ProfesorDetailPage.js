import React, { useState, useEffect } from 'react';
// ¡Importamos el hook 'useParams' de React Router!
import { useParams } from 'react-router-dom';

function ProfesorDetailPage() {
  // 1. OBTENER EL ID DE LA URL
  // useParams() nos devuelve un objeto con los parámetros de la URL.
  // Como nuestra ruta es "/profesor/:id", nos dará un objeto como { id: '1' }
  const { id } = useParams();

  // 2. ESTADOS DEL COMPONENTE
  // Un estado para guardar los datos del profesor cuando lleguen de la API
  const [profesor, setProfesor] = useState(null);
  // Un estado para saber si estamos cargando los datos
  const [loading, setLoading] = useState(true);

  // 3. LLAMADA A LA API
  // Este efecto se ejecuta cuando el componente se carga por primera vez.
  useEffect(() => {
    // Usamos el 'id' de la URL para construir la dirección correcta
    fetch(`http://localhost:3001/api/profesores/${id}`)
      .then(response => response.json())
      .then(data => {
        setProfesor(data); // Guardamos los datos del profesor en el estado
        setLoading(false); // Cambiamos el estado de carga a falso
      })
      .catch(error => {
        console.error("Error al obtener detalle del profesor:", error);
        setLoading(false); // También paramos de cargar si hay un error
      });
  }, [id]); // La dependencia [id] hace que el efecto se vuelva a ejecutar si cambia el ID en la URL.

  // 4. RENDERIZADO CONDICIONAL
  // Mientras esperamos la respuesta de la API, mostramos un mensaje de "Cargando..."
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no encontramos al profesor, mostramos un mensaje
  if (!profesor) {
    return <div>Profesor no encontrado.</div>;
  }

  // 5. MOSTRAR LOS DATOS
  // Una vez que tenemos los datos, los mostramos en la página.
  return (
    <div className="profesor-detail">
      <h1>{profesor.nombre_completo}</h1>
      <p><strong>Email:</strong> {profesor.email}</p>
      <p><strong>Modalidad:</strong> {profesor.modalidad}</p>
      <p><strong>Especialidades:</strong> {profesor.especialidades ? JSON.parse(profesor.especialidades).join(', ') : 'No especificadas'}</p>
      <p><strong>Años de experiencia:</strong> {profesor.años_experiencia || "No especificado"}</p>
      <p><strong>Biografía:</strong> {profesor.biografia || "Biografía no disponible."}</p>
      {/* Y así podríamos seguir con todos los demás campos */}
    </div>
  );
}

export default ProfesorDetailPage;