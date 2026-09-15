import Button from "../buttons/button";
import { useNavigate } from 'react-router-dom';

export default function FormAdd({ children, onSubmit, title, loading }) {

    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center w-full min-h-[calc(100vh-20rem)]">
            <form
                onSubmit={onSubmit}
                className="bg-primary/50 border border-primary py-10 my-auto w-1/2 rounded-xl text-center"
            >
                <h1 className="mb-4">{title}</h1>

                <div className="flex flex-col items-center space-y-4">
                    {children}
                </div>

                <div className="space-x-10 pt-5">
                    <Button loading={loading}>
                        Subir
                    </Button>
                    <Button type="button" onClick={() => navigate(-1)}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    );
}