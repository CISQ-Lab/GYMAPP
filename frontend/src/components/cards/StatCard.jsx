export default function StatCard({ title, value }) {
  return (
    // 1. Contenedor principal: Fondo blanco, sombra suave, bordes generales y redondeado total con 'overflow-hidden'
    <div className="flex flex-col bg-white shadow-sm border border-gray-100 rounded-2xl p-5 m-2 transition-all hover:shadow-md relative overflow-hidden">
      
      {/* 2. La línea de color superior: Absoluta, arriba, ancho completo, altura de 1.5 (6px) */}
      {/* Usamos 'bg-primary' para el color que definas en tu tema */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />

      {/* 3. Contenido de la tarjeta: Un poco más de padding arriba para separar de la línea de color */}
      <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-2 mt-1">
        {title}
      </h3>
      <p className="text-2xl font-bold text-gray-900 tracking-tight">
        {value}
      </p>
    </div>
  );
}