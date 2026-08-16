import { useNavigate } from "react-router-dom";

export default function SetTheme() {

    const navigate = useNavigate();

    return (

        <>

            <button onClick={() => navigate(-1)} className="bg-white hover:bg-gray-300 p-2 rounded transition duration-200 cursor-pointer">
                Go Back
            </button>

            <div className="flex flex-col justify-between bg-white shadow-md rounded p-4 m-2 text-gray-800">
                <h3 className="pb-1 border-b-2 border-double">Set Theme</h3>
                <p className="py-1">Here you can set the theme of your gym.</p>
            </div>


        </>

    );
}