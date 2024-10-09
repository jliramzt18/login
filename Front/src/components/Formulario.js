import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const Formulario = () => {
  const [nameuser, setNameUser] = useState('');
  const [correoelectronico, setCorreoElectronico] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registerUser = () =>{
    Swal.fire("Información!", "Usuario registrado correctamente!", "success");
    navigate('/login');
  }

  const ErrorregisterUser = () =>{
    Swal.fire("Información!", "Datos incorrectos!", "warning");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Aquí haces la solicitud al back-end
      const response = await fetch('http://localhost:4000/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nameuser, correoelectronico, password }),
      });

      // Validamos el estatus del servidor
      if (!response.ok) {
        const errorResponse = await response.json(); // Si tu API regresa un mensaje de error en JSON
        console.error('Error del servidor:', errorResponse.message);
        //alert('Error al registrar el usuario: ' + errorResponse.message);
        ErrorregisterUser(errorResponse.message);
        return;
      }

      const result = await response.json(); // Procesar respuesta exitosa
      registerUser();
      //console.log('Resultado:', result); // Puedes ver el resultado en consola si lo necesitas

    } catch (error) {
      console.error('Error al dar de alta el usuario: ', error);      
      ErrorregisterUser(error.message);
    }
  };

  return (
    <div className='cont-form'>
      <div className='container-formulario'>
        <h2 className='title-user'>Alta de Usuario</h2>
        <div className='alta-form'>
          <form onSubmit={handleSubmit}>
            <div className='form'>
              <label>Usuario:</label>
              <input
                type='text'
                placeholder='Usuario'
                value={nameuser}
                onChange={(e) => setNameUser(e.target.value)}
              />
            </div>
            <div className='form'>
              <label>Correo Electrónico:</label>
              <input
                type='email'
                placeholder='Correo Electrónico'
                value={correoelectronico}
                onChange={(e) => setCorreoElectronico(e.target.value)}
              />
            </div>
            <div className='form'>
              <label>Contraseña:</label>
              <input
                type='password'
                placeholder='Contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className='enviar' type='submit'>
              Enviar
            </button>
            <Link to={'/login'}>
              <button className='regresar' type='button'>
                Regresar
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
