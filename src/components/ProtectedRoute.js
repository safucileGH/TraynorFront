import React from 'react';
import { Navigate } from 'react-router-dom';

// Este componente recibe como 'children' el componente que queremos proteger.
function ProtectedRoute({ children }) {
  // 1. Buscamos el token en el almacenamiento local del navegador.
  const token = localStorage.getItem('token');

  // 2. Si NO hay token...
  if (!token) {
    // ...redirigimos al usuario a la página de login.
    return <Navigate to="/login" replace />;
  }

  // 3. Si hay un token, simplemente mostramos el componente protegido.
  return children;
}

export default ProtectedRoute;