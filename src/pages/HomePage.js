import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/profesores?buscar=${searchTerm}`);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    // Borramos el token del almacenamiento local
    localStorage.removeItem('token');
    alert('Has cerrado sesión.');
    // Redirigimos al usuario a la página de login
    navigate('/login');
  };

  return (
    <div className="homepage">
      <h1>Encuentra a tu Entrenador Ideal</h1>
      
      {/* --- FORMULARIO DE BÚSQUEDA --- */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Busca por nombre o especialidad..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>

      {/* --- LINKS DE NAVEGACIÓN --- */}
      <div className="nav-links" style={{ marginTop: '20px' }}>
        <Link to="/profesores">Ver todos los Profesores</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/register">Registrarse</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/login">Iniciar Sesión</Link>
      </div>

      {/* --- BOTÓN DE CERRAR SESIÓN --- */}
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>
        Cerrar Sesión
      </button>

    </div>
  );
}

export default HomePage;