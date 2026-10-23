export default function ProductCard({
  name,
  description,
  price,
  photo_path,
  sku,
  stock = 0,
  isActive = true,
  mode,
  onQuickBuy,
  onAddToCart
}) {
  const formattedPrice = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(Number(price) || 0);

  const isOutOfStock = Number(stock) <= 0;
  const isLowStock = Number(stock) > 0 && Number(stock) <= 5;
  const isDisabled = !isActive || isOutOfStock;

  return (
    <div className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-200 ${
      isDisabled ? 'opacity-75 bg-gray-50/50' : 'hover:shadow-md hover:border-primary/30'
    }`}>

      {/* 1. Cabecera con Imagen / Fallback SVG */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-50 border-b border-gray-100 flex items-center justify-center">
        {photo_path ? (
          <img
            src={photo_path}
            alt={name}
            className={`h-full w-full object-scale-down transition-transform duration-300 ${
              !isDisabled && 'group-hover:scale-110'
            }`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <svg
              className="h-10 w-10 text-gray-300 stroke-[1.5]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            <span className="text-xs mt-1 font-medium text-gray-400">Sin imagen</span>
          </div>
        )}

        {/* Badges de Estado e Inventario */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Stock Badge */}
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm border ${
              isOutOfStock
                ? 'bg-rose-500/10 text-rose-700 border-rose-200/60'
                : isLowStock
                ? 'bg-amber-500/10 text-amber-700 border-amber-200/60'
                : 'bg-white/80 text-gray-700 border-gray-200/60'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isOutOfStock ? 'bg-rose-500' : isLowStock ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
            />
            {isOutOfStock ? 'Agotado' : `${stock} disp.`}
          </span>

          {/* Badge de Activo / Inactivo */}
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm border ${
              isActive
                ? 'bg-emerald-500/10 text-emerald-700 border-emerald-200/60'
                : 'bg-gray-500/10 text-gray-600 border border-gray-200/60'
            }`}
          >
            {isActive ? 'Activo' : 'Inactivo'}
          </span>
        </div>
      </div>

      {/* 2. Cuerpo de la Tarjeta */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {sku && (
            <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-gray-400 block mb-1">
              SKU: {sku}
            </span>
          )}

          <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>

          <p className="mt-1.5 text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {description || 'Sin descripción disponible.'}
          </p>
        </div>

        {/* 3. Pie de la Tarjeta con Precio y Botones de Acción */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Precio unitario</span>
            <div className="text-lg font-bold text-primary">
              {formattedPrice}
            </div>
          </div>

          {/* Acciones para el Admin POS */}
          {
            mode ? <div className="flex items-center gap-2">
            {/* Botón: Venta rápida (1 solo artículo) */}
            <button
              type="button"
              disabled={isDisabled}
              onClick={onQuickBuy}
              title="Venta rápida (1 artículo)"
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2.5 text-xs font-semibold text-primary transition-colors ${
                isDisabled
                  ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                  : 'hover:bg-primary/10 active:scale-[0.98]'
              }`}
            >
              <svg className="h-3.5 w-3.5 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              Vender
            </button>

            {/* Botón: Añadir al Carrito (múltiples artículos) */}
            <button
              type="button"
              disabled={isDisabled}
              onClick={onAddToCart}
              title="Añadir a la lista de venta"
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                isDisabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  : 'bg-primary text-white shadow-sm hover:bg-primary/90 hover:shadow-md active:scale-[0.98]'
              }`}
            >
              <svg className="h-3.5 w-3.5 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              Al Carrito
            </button>
          </div> :
          <p>prueba</p>
          }
          
        </div>
      </div>
    </div>
  );
}