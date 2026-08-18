import { useNavigate } from "react-router-dom";
import ColorButton from "../../components/buttons/ColorButton";
import UseTheme from "../../hooks/useTheme"

export default function SetTheme() {

    const navigate = useNavigate();
    const {theme, setTheme} = UseTheme();
    const changeColor = (color) => setTheme(prev => ({
        ...prev,
        primaryColor: color
    }))

    const changeTheme = (theme) => setTheme(prev => ({
        ...prev,
        mode: theme
    }))

    return (

        <>

            <button onClick={() => navigate(-1)} className="bg-white hover:bg-gray-300 p-2 rounded transition duration-200 cursor-pointer">
                Go Back
            </button>


            <div className="flex flex-col justify-between bg-white shadow-md rounded p-4 m-2 text-gray-800 space-y-3">
                <div>
                    <p>Cambiar modo Claro/Oscuro</p>
                    <div className="flex space-x-3 mt-2">
                        <ColorButton color="white" value="light" onClick={(e) => changeTheme(e.target.value)}/>
                        <ColorButton color="black" value="dark" onClick={(e) => changeTheme(e.target.value)}/>
                    </div>

                </div>
                <div>
                    <p>Cambiar Color Principal</p>
                    <div>
                        <ColorButton color="#2563eb" value="blue" onClick={(e) => changeColor(e.target.value)}/>
                        <ColorButton color="#16a34a" value="green" onClick={(e) => changeColor(e.target.value)}/>
                        <ColorButton color="#9333ea" value="purple" onClick={(e) => changeColor(e.target.value)}/>
                        <ColorButton color="#dc2626" value="red" onClick={(e) => changeColor(e.target.value)}/>
                        <ColorButton color="#ea580c" value="orange" onClick={(e) => changeColor(e.target.value)}/>
                    </div>

                </div>
            </div>


        </>

    );
}