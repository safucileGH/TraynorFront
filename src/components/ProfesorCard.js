import React from 'react';
// ¡Importamos Link!
import { Link } from 'react-router-dom';

function ProfesorCard({ profesor }) {
  return (
    // Envolvemos todo en un Link y le quitamos el estilo por defecto con una clase
    <Link to={`/profesor/${profesor.id}`} className="profesor-card-link">
      <div className="profesor-card">
        <h2>{profesor.nombre_completo}</h2>
        <p>Modalidad: {profesor.modalidad}</p>
        <p>Especialidades: {profesor.especialidades ? JSON.parse(profesor.especialidades).join(', ') : 'No especificadas'}</p>
      </div>
    </Link>
  );
}

export default ProfesorCard;