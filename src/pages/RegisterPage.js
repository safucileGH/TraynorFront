import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  // Estados para guardar los datos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para mostrar mensajes al usuario (ej: "Registro exitoso")
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página

    const userData = {
      nombre_completo: nombre,
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST', // Usamos el método POST para enviar datos
        headers: {
          'Content-Type': 'application/json', // Le decimos al backend que estamos enviando JSON
        },
        body: JSON.stringify(userData), // Convertimos nuestro objeto a un string JSON
      });

      const data = await response.json();

      if (!response.ok) {
        // Si el servidor responde con un error (ej: email duplicado), lo mostramos
        throw new Error(data.message || 'Algo salió mal');
      }

      // Si todo sale bien, mostramos el mensaje de éxito y redirigimos
      setMessage(data.message);
      setTimeout(() => {
        navigate('/'); // Redirigir a la página de inicio después de 2 segundos
      }, 2000);

    } catch (error) {
      // Capturamos el error y lo mostramos
      setMessage(error.message);
    }
  };

  return (
    <div className="register-page">
      <h1>Registro de Profesores</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre Completo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Registrarse</button>
      </form>
      {/* Aquí mostramos el mensaje de éxito o error */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default RegisterPage;