import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import Success from "../../components/messages/success.js"
import showError from "../../components/messages/showError.js"
import GenericFormPublic from "../../components/forms/GenericFormPublic"
import LoginForm from "../../components/forms/loginForm"
import RegisterForm from "../../components/forms/registerForm"
import { apiFetch } from "../../services/api"
import LayoutPublic from "../../components/layoutPublic"
import { useNavigate } from "react-router-dom";

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

    const {register, login, loading } = useAuth();

    const navigate = useNavigate();

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

            register(emailRegister, passwordRegister, confirmPasswordRegister, nameRegister, lastNameRegister);


        } catch (error) {
            showError(error.message);
        }
    }


    return (

        <LayoutPublic>
            <GenericFormPublic handleSubmit={handleSubmit} hidden={formHidden}>
                <LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} loading={loading} setHidden={setFormHidden} />
            </GenericFormPublic>

            <GenericFormPublic handleSubmit={handleRegister} hidden={!formHidden} setHidden={setFormHidden}>
                <RegisterForm email={emailRegister} setEmail={setEmailRegister} password={passwordRegister} setPassword={setPasswordRegister}
                    name={nameRegister} setName={setNameRegister} lastName={lastNameRegister} setLastName={setLastNameRegister}
                    confirmPassword={confirmPasswordRegister} setConfirmPassword={setConfirmPasswordRegister} loading={loadingRegister} setHidden={setFormHidden} />
            </GenericFormPublic>

        </LayoutPublic>



    );
}