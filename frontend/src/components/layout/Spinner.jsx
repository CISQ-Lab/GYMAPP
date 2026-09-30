import useAuth from "../../hooks/useAuth";


export default function Spinner({isLoading}) {
    const { loading , authenticated} = useAuth();

    if (!loading && !isLoading) {
        return null;
    }

    return (
        <div className={`h-full flex items-center justify-center ${authenticated ? "bg-black/1" : "bg-black/50" }  `}>
            <div className={`w-16 h-16 border-b-5 ${authenticated ? "border-primary" : "border-red-500"} rounded-full animate-spin`}>
            </div>
        </div>
    );
}