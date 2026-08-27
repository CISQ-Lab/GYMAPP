import Swal from 'sweetalert2';

export default function Success(text) {
    Swal.fire({
        title: '¡Éxito!',
        text: text,
        icon: 'success',
        confirmButtonText: 'Okey'
    })
}