import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // ¡Importamos el hook!
import ProfesorCard from '../components/ProfesorCard';
import '../App.css'; 

function ProfesoresPage() { 
  const [profesores, setProfesores] = useState([]);

  // 1. Usamos el hook para leer los parámetros de la URL
  const [searchParams] = useSearchParams();
  // 2. Obtenemos el valor del parámetro 'buscar'. Si no existe, es un string vacío.
  const searchTerm = searchParams.get('buscar') || '';

  useEffect(() => {
    // 3. Usamos el término de búsqueda para construir la URL de la API
    fetch(`http://localhost:3001/api/profesores?buscar=${searchTerm}`)
      .then(response => response.json())
      .then(data => setProfesores(data))
      .catch(error => console.error('Error al obtener los profesores:', error));
  // 4. ¡Importante! Añadimos 'searchTerm' a las dependencias.
  // Esto hace que el 'useEffect' se vuelva a ejecutar cada vez que la búsqueda cambie.
  }, [searchTerm]);

  return (
    <div>
      {/* Un título dinámico que muestra lo que se buscó */}
      <h1>Resultados para: "{searchTerm || 'Todos'}"</h1>
      <div className="lista-profesores">
        {/* Si no hay resultados, mostramos un mensaje */}
        {profesores.length > 0 ? (
          profesores.map(profesor => (
            <ProfesorCard key={profesor.id} profesor={profesor} />
          ))
        ) : (
          <p>No se encontraron profesores con ese criterio.</p>
        )}
      </div>
    </div>
  );
}

export default ProfesoresPage;