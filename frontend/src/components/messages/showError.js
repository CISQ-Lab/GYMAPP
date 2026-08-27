import Swal from 'sweetalert2';

export default function showError(text) {
    Swal.fire({
        title: '¡Error!',
        text: text,
        icon: 'error',
        confirmButtonText: 'Okey'
    });
}