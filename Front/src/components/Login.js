import React, { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import inicio from './Inicio';

const Login = () => {
    const [nameuser, setNameuser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const InicioSession = () =>{
        Swal.fire("Información!", "Inicio de sesión exitoso!", "success");
    }

    const ErrorInicioSession = () =>{
        Swal.fire("Información!", "Error al iniciar sesión!", "waning");
    }

    const ErrorInicio = () =>{
        Swal.fire("Información!", "Error al iniciar sesión. Favor de revisar su Usuario o Contraseña!", "waning");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/login',{
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ nameuser, password }),
            });

            const data = await response.json();

            if(response.ok){
                localStorage.setItem('token', data.token);
                //alert('Inicio de sesión exitoso');
                InicioSession();
                navigate('/inicio');
            }else{
                //alert(data.message);
                ErrorInicioSession(data.message);
            }

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            //alert('Error al iniciar sesión');
            ErrorInicio();
        }
    }

  return (
    <div className='container'>
        <div className='container-form'>
            <div className='image-profile'>
                <div className='image-profile'>
                    <img src='../images/users.jpg' alt='a qui va una imagen'/>
                </div>
            </div>
        
            <div className='formulario'>
                <form onSubmit={handleSubmit}>
                    <div className='form-user'>
                        <label>Usuario:</label>
                        <input 
                            type='text'
                            value={nameuser}                            
                            placeholder='Usuario'
                            onChange={(e) => setNameuser(e.target.value)}
                        />
                    </div>
                    <div className='form-pass'>
                        <label>Contraseña:</label>
                        <input 
                            type='password'
                            value={password}                            
                            placeholder='Contraseña'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className='' type='submit'>Enviar</button>
                </form>
                <Link to={"/formulario"} ><p className='create-user'>Alta de usuario...</p></Link>
            </div>
        </div>
    </div>
  )
}

export default Login