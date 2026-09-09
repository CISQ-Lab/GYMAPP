export default function Input({ type, ph , step, value, onChange, name}) {
    return (
        <input type={type} placeholder={ph} step={step} value={value} onChange={onChange} name={name}
        className="border border-white py-2 px-5 w-4/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary " />
    )

}