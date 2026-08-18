export default function ColorButton({ color, value, onClick }) {
    return (
        <button
            className="rounded-full p-3 border-black border-2 mr-3 cursor-pointer
                       transition-all duration-100 ease-out
                       hover:scale-110 hover:shadow-lg hover:border-4
                       active:scale-95 hover:brightness-150"
            style={{ backgroundColor: color }}
            value={value} onClick={onClick} />

    )



}