import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  // Estados para el email y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para los mensajes de error o éxito
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Limpiar mensajes anteriores

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // --- ¡Aquí está la magia! ---
      // Por ahora, solo mostraremos que recibimos el token.
      // En el siguiente paso, lo guardaremos para mantener al usuario conectado.
      alert('¡Inicio de sesión exitoso!');
      console.log('Token Recibido:', data.token);

      // Guardamos el token en el almacenamiento local del navegador
      localStorage.setItem('token', data.token);

      navigate('/'); // Redirigimos al usuario a la página de inicio

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="login-page">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default LoginPage;