import FormAdd from "../../components/forms/FormAdd"
import Input from "../../components/layout/Input"
import DropZone from "../../components/layout/Dropzone"
import { useState } from "react"
import { apiFetch } from "../../services/api"
import Success from "../../components/messages/success"
import showError from "../../components/messages/showError"
import useGym from "../../hooks/useGym"

export default function AddNewProduct() {

    const [file, setFile] = useState()
    const { gym } = useGym();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        form.append("gymId", gym?.id);
    
        try {
            const data = await apiFetch("/products/createnewproduct", {
                method: 'POST',
                body: form
            })

            if (data.success) {
                Success(data.message);
            }
        } catch (error) {

            showError(error.message);

        }

    }


    return (
        <FormAdd title="Agregar nuevo producto" onSubmit={handleSubmit}>

            <Input ph="Ingresa el nombre del producto" name="name" required />
            <Input ph="Ingresa el Precio del producto" name="price" type="number" required />
            <Input ph="Ingresa el stock del producto" name="stock" type="number" required />
            <Input ph="Ingresa una breve descripcion" name="description" />
            <Input ph="SKU" name="sku" />

            <DropZone name="product_photo" setFile={setFile} title="Sube o arrastra la imagen de tu producto"></DropZone>

        </FormAdd>
    )
}