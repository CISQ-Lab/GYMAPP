export default function StatCardGeometric({ title, value, type = "normal" }) {
  const statusBorders = {
    normal: "border-emerald-500/30",
    advertencia: "border-amber-500/30",
    peligro: "border-rose-500/30",
  };

  const borderColor = statusBorders[type] || statusBorders.normal;

  return (
    <div className="flex flex-col bg-white shadow-sm border border-gray-100 rounded-2xl p-5 m-2 transition-all hover:shadow-md relative overflow-hidden group">
      
      {/* Línea superior intacta */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary z-10" />

      {/* Círculos concéntricos geométricos en la esquina inferior derecha */}
      <div className="absolute -bottom-8 -right-8 pointer-events-none z-0">
        <div className={`w-28 h-28 rounded-full border-4 ${borderColor} transition-transform duration-500 group-hover:scale-110`} />
        <div className={`absolute top-3 left-3 w-22 h-22 rounded-full border-2 ${borderColor} transition-transform duration-500 group-hover:scale-95`} />
      </div>

      {/* Contenido */}
      <div className="relative z-10">
        <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-2 mt-1">
          {title}
        </h3>
        <p className="text-2xl font-bold text-gray-900 tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}