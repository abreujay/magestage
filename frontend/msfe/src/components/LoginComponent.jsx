import React, { useState } from "react";
import "./LoginComponent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Username:", username);
        console.log("Password:", password);

        try {
            
            const response = await submitData()
            console.log('Resposta do Login:', response)
            setMessage("Login Bem Sucedido...")
            setError("")

            if(response.status === 200){

                navigate('/home')

            }

        } catch (error) {
            
            console.error('Ocorreu um Erro no POST LOGIN:', error)
            setError("Não Foi Possível Efetuar Login...");
            setMessage("");

        }

    };

    async function submitData(){

        const response = await axios.post('http://localhost:3000/api/login', {

            username: username,
            userpass: password

        })

        return response

    }

    return (
        <div className="login-container">
            <div className="form-wrapper">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Digite seu username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-login">
                        Entrar
                    </button>
                </form>
                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}   
                <p className="signup-link">
                    Não tem uma conta? <a href="/register">Cadastrar</a>
                </p>
            </div>
        </div>
    );
};

export default LoginComponent;
