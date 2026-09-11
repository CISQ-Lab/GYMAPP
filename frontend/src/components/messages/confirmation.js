import Swal from 'sweetalert2';

export default function confirmation({text = "Esto no se puede deshacer.", onConfirm, confirmText = "SI"}) {

    Swal.fire({
        title: "¿Estas seguro?",
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmText,
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed){
            onConfirm();
        } 
    });

}
