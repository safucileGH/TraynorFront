import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfesoresPage from './pages/ProfesoresPage';
// ¡Importamos la nueva página!
import ProfesorDetailPage from './pages/ProfesorDetailPage';
import './App.css';
// ... tus otras importaciones
import RegisterPage from './pages/RegisterPage'; // <-- AÑADE ESTA LÍNEA
import LoginPage from './pages/LoginPage'; // <-- AÑADE ESTA LÍNEA
// ...
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/AdminPage';
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profesores" element={<ProfesoresPage />} />
        <Route path="/profesor/:id" element={<ProfesorDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} /> {/* <-- AÑADE ESTA LÍNEA */}
         {/* --- AÑADE ESTA NUEVA RUTA PROTEGIDA --- */}
  <Route 
    path="/admin" 
    element={
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    } 
  />
    </Routes>
      </div>
    </BrowserRouter>
  );
}
// ...
export default App;