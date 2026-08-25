import { useState } from "react"
import { apiFetch } from "../../services/api" 

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dataR, setData] = useState('');
  

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await apiFetch("/auth/login", {
            method: "POST",
            body: {
                email,
                password
            }
        })
        const data = await response.json();

        console.log(email);
        console.log(password);
        console.log(data.message)
        setData(data.message)

        if(data.token){
            localStorage.setItem("token", data.token);
        }
    }

    const getUsers = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3000/api/users");
        const data = await response.json();

        console.log(data);
        setData(data)
    }


    return (
        <>
            <form onSubmit={handleSubmit} id="login">
                <div className="flex flex-col space-y-3 p-3 w-100">
                    <input className="border" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="border" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="border" type="submit" >Enviar</button>

                </div>


            </form>

            <p>Tu email es: {email}</p>
            <p>Tu contraseña es: {password}</p>
            <p >Respuesta del servidor: {dataR}</p>

        </>

    )
}