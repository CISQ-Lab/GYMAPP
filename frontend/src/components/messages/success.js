import Swal from 'sweetalert2';

export default function Success(text) {
    Swal.fire({
        title: '¡Éxito!',
        text: text,
        timer: 2000,
        icon: 'success',
        confirmButtonText: 'Okey'
    })
}