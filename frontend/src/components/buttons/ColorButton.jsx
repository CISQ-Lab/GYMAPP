export default function ColorButton({ color, value, onClick }) {
    return (
        <button
            className="rounded-full p-3 border-black border-2 mr-3 cursor-pointer"
            style={{ backgroundColor: color }}
            value={value} onClick={onClick} />

    )



}