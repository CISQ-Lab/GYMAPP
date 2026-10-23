import Swal from 'sweetalert2';
import { apiFetch } from '../../services/api';
import showError from './showError';
import Success from './success';

export default function confirmation({
    title = "¿Estas seguro?",
    text = "Introduce tu contraseña para continuar.",
    onConfirm,
    confirmText = "Confirmar"
}) {

    Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        input: 'password', // Cambiado a 'password' para mayor seguridad si es una contraseña
        inputPlaceholder: 'Escribe tu contraseña aquí...',
        confirmButtonText: confirmText,
        cancelButtonText: "Cancelar"
    }).then(async (result) => {

        if (result.isConfirmed) {
            try {
                const data = await apiFetch("/auth/confirmPassword", {
                    method: 'POST',
                    body: JSON.stringify({
                        password: result.value
                    })

                })
                if (data.success) {
                    Success(data.message);
                    onConfirm();
                }
                else {
                    showError(data.message);
                }
            }
            catch (error) {
                showError(error.message);
            }
        }



    });

}