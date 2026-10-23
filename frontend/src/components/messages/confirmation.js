import Swal from 'sweetalert2';

export default function confirmation({title="¿Estas seguro?" ,text = "Esto no se puede deshacer.", onConfirm, confirmText = "SI"}) {

    Swal.fire({
        title: title,
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
