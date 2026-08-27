import useAuth from "../hooks/useAuth";


export default function Spinner() {
    const { loading , authenticated} = useAuth();

    if (!loading) {
        return null;
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${authenticated ? "bg-black" : "bg-black/50" }  z-50`}>
            <div className={`w-16 h-16 border-b-5 ${authenticated ? "border-primary" : "border-red-500"} rounded-full animate-spin`}>
            </div>
        </div>
    );
}