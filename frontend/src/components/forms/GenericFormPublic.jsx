
export default function GenericFormPublic({ handleSubmit, children, hidden }) {
    return (
        <div
            className={`
                absolute z-10
                w-[calc(100%-4rem)] max-w-md
                p-7 sm:p-8
                rounded-xl shadow-2xl
                bg-red-400/10 backdrop-blur-sm
                transition-all ease-in-out duration-300 transform
                ${
                    !hidden
                        ? "opacity-100 translate-x-0 visible"
                        : "opacity-0 -translate-x-12 invisible pointer-events-none"
                }
            `}
        >
            <form onSubmit={handleSubmit} id="login">
                <div className="flex flex-col space-y-4">
                    {children}
                </div>
            </form>
        </div>
    );
}
