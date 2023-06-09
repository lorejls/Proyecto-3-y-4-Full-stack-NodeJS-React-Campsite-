import React, {useState} from "react";
import {Form, FormGroup, Label, Input} from 'reactstrap'
import axios from 'axios';
import {Link} from 'react-router-dom'




// Instalar dependencia axios para hacer la llamada al back-end (npm i axios)

const Login = () => {
    // este es el estado inicial del user
    const [user, setUser] = useState({
    // esto hace que cada vez que inicio el login los campos del input indicados están vacíos listos para ingresar los datos
        email: '',
        password: ''
    })


    const [successM, setSuccessM] = useState (null)
    const [errorM, setErrorM] = useState (null)
    // el método e.target evita el refrescado del formulario
    // esta función es la que se encarga de completar el input, de rellenar su estado en tiempo real.
    // donde el valor del user cambia constantemente
    const onChangeInput = (e) =>{
        const {name, value} = e.target
        setUser ({...user, [name]: value})
        console.log(user)
    }

// función encargada de obtener los datos del estado y enviarlos al back-end
    const loginSubmit = async (event) =>{
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/api/login', {...user})
        console.log(response.data)
        setSuccessM(response.data.message)

        // guardar información del usuario en la memoria del navegador
        localStorage.setItem('token', response.data.accessToken)
        localStorage.setItem('name', response.data.user.name)
        localStorage.setItem('companyName', response.data.user.companyName)
        localStorage.setItem('role', response.data.user.role)


      // con esta función le indico que despues del tiempo que le indique me redireccione a una ruta indicada
      setTimeout(()=>{
        window.location.href = '/my-home' //si pongo solo la barra va directamente al endpoint de partida
      }, 2000) //el tiempo que demora en ir al endpoint en milisegundos

      } catch (error) {
        setErrorM(error.response.data.message)
      }
    }

  return (
    <div className="main-container">
      <h2 className="saludo-home">Hola!</h2>
      <Form onSubmit={loginSubmit}>
        <FormGroup>
          <Label for="exampleEmail" hidden>
            Correo
          </Label>
          <Input
            id="exampleEmail"
            name="email"
            value={user.email}
            placeholder="Escribe tu correo"
            type="email"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}
        <FormGroup>
          <Label for="examplePassword" hidden>
            Contraseña
          </Label>
          <Input
            id="examplePassword"
            name="password"
            value={user.password}
            placeholder="Escribe tu contraseña"
            type="password"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}
        <div className="botones">
        <button className='button black'>Ingresar</button>
        <button className='button white'>Ingresar con Google</button>
        </div>
        <h3 className="texto-secundario">¿Olvidaste tu contraseña?</h3>
        <h3 className="texto-secundario">¿No estás registrado? No te preocupes, puedes <Link to={'/register'}>hacerlo aquí</Link></h3>
      </Form>
      {/* <div className="alert dark" role= "alert" style={{display:successM ? "block" : "none"}}>{successM}</div> */}
      <div className="alert dark" role= "alert" style={{display:errorM ? "block" : "none"}}>{errorM}</div>
    </div>
  );
};

export default Login;
