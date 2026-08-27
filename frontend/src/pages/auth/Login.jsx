import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import Success from "../../components/messages/success.js"
import showError from "../../components/messages/showError.js"
import bg from "../../assets/fondoLogin.jpg"
import NavbarPublic from "../../components/NavBarPublic"
import { NavLink } from 'react-router-dom';
import { APP_NAME } from "../../config/env"
import Spinner from "../../components/spinner"
import GenericFormPublic from "../../components/forms/GenericFormPublic"
import LoginForm from "../../components/forms/loginForm"
import RegisterForm from "../../components/forms/registerForm"
import { apiFetch } from "../../services/api"

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailRegister, setEmailRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [nameRegister, setNameRegister] = useState('');
    const [lastNameRegister, setLastNameRegister] = useState('');
    const [loadingRegister, setLoadingRegister] = useState(false);
    const [confirmPasswordRegister, setConfirmPasswordRegister] = useState('');


    const [formHidden, setFormHidden] = useState(false);

    const { login, loading, user, logout } = useAuth();
    const year = new Date().getFullYear();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!email.trim() || !password.trim()) {
                throw new Error("Por favor, complete todos los campos");
            }
            await login(email, password);
        }
        catch (error) {
            showError(error.message);
        }

    }

    const handleRegister = async (e) => {
        e.preventDefault();

        try {

            if (!emailRegister.trim() || !passwordRegister.trim() || !nameRegister.trim() ||
                !lastNameRegister.trim() || !confirmPasswordRegister.trim()) {
                throw new Error("Por favor, complete todos los campos");
            }

            if (passwordRegister !== confirmPasswordRegister) {
                throw new Error("Las contraseñas no coinciden");
            }

            const data = await apiFetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    email: emailRegister,
                    password: passwordRegister,
                    confirmedPassword: confirmPasswordRegister,
                    name: nameRegister,
                    surname: lastNameRegister
                })
            })

            if (data.message) {
                Success(data.message);
            }


        } catch (error) {
            showError(error.message);
        }
    }


    return (

        <div className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden " style={{ backgroundImage: `url(${bg})` }}>
            <Spinner />
            <div className="absolute inset-0 bg-black/60" />
            <NavbarPublic />
            <main className="relative flex-1 flex items-center justify-center ">
                <GenericFormPublic handleSubmit={handleSubmit} hidden={formHidden}>
                    <LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} loading={loading} setHidden={setFormHidden} />
                </GenericFormPublic>

                <GenericFormPublic handleSubmit={handleRegister} hidden={!formHidden} setHidden={setFormHidden}>
                    <RegisterForm email={emailRegister} setEmail={setEmailRegister} password={passwordRegister} setPassword={setPasswordRegister}
                        name={nameRegister} setName={setNameRegister} lastName={lastNameRegister} setLastName={setLastNameRegister}
                        confirmPassword={confirmPasswordRegister} setConfirmPassword={setConfirmPasswordRegister} loading={loadingRegister} setHidden={setFormHidden} />
                </GenericFormPublic>
            </main>

            <footer className="p-3 bg-red-900/20 text-white backdrop-blur-xs flex justify-between items-center px-4 pb-20 sm:px-15 sm:pb-5">
                <div>
                    <p className="text-xs sm:text-lg">©{year} {APP_NAME} Todos los derechos reservados.</p>
                    <p className="text-xs sm:text-lg">Hecho con ❤️ por CISQ-Lab</p>
                </div>

                <NavLink to="/contact" className="text-blue-400 hover:underline text-xs sm:text-lg">Contáctanos</NavLink>

            </footer>

        </div>
    );
}