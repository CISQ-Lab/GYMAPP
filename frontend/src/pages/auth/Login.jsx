import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import Swal from "sweetalert2"


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, user, logout } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        }
        catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Okey'
            })
        }

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

            <button className="p-5 bg-amber-200" onClick={logout}>Logout</button>

            <p>Tu email es: {email}</p>
            <p>Tu contraseña es: {password}</p>
            <p >Cargando: {loading ? "true" : "false"}</p>
            <p>User = {user ? `SI HAY ${user.name}` : "NO HAY"}</p>

        </>

    )
}