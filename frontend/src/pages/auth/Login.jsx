import { useState } from "react"
import { apiFetch } from "../../services/api" 

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dataR, setData] = useState('');
  

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await apiFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        })

        if(data.token){
            localStorage.setItem("token", data.token);
        }

        const {user} = await apiFetch("/users/me");
        console.log(user[0]);

        
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