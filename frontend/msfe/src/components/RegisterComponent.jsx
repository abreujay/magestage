import React from "react";
import { useState } from "react";
import axios from "axios";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [usermail, setUsermail] = useState("");
  const [userpass, setUserpass] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        
        const response = await axios.post('http://localhost:3000/api/register', {

        username,
        usermail,
        userpass

        })
        
        setMessage('Registro concluído!')
        setError('')

    } 
    
    catch (error) {
        
        setMessage('')
        setError('Ocorreu um erro ao tentar registrar-se')
        console.error(error)

    }

  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h3>Registre-se!</h3>
        <label htmlFor="username">Nome de usuário</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="MestreDosMagos"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="username">E-mail</label>
        <input
          type="email"
          name="usermail"
          id="usermail"
          placeholder="felix123@magestage.com"
          value={usermail}
          onChange={(e) => setUsermail(e.target.value)}
          required
        />
        <label htmlFor="userpass">Senha</label>
        <input
          type="password"
          name="userpass"
          id="userpass"
          value={userpass}
          onChange={(e) => setUserpass(e.target.value)}
          required
        />
        <button id="submit">Registrar-se</button>
      </form>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default RegisterComponent;
