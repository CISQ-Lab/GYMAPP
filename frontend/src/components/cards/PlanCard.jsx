import { apiFetch } from '../../services/api';
import { useState } from 'react';
import showError from "../messages/showError.js"
import useGym from "../../hooks/useGym.jsx"
import Success from '../messages/success.js';
import confirmation from '../messages/confirmation.js';
import { NavLink } from 'react-router-dom';

export default function PlanCard({ name, onEdit, Delete, ...props }) {

  const { gym } = useGym();
  const [isActive, setActive] = useState(props.isActive ?? true)

  const toggleStatus = async () => {
    try {
      const data = await apiFetch("/gyms/changePlanActive", {
        method: 'PATCH',
        body: JSON.stringify({
          planId: props.id,
          gymId: gym?.id
        })
      })
      if (data.success) {
        setActive(!isActive);
      }

    } catch (error) {
      showError(error)
    }

  }

  const deletePlan = async () => {

    try {
      const data = await apiFetch("/gyms/deletePlan", {
        method: 'DELETE',
        body: JSON.stringify({
          planId: props.id,
          gymId: gym?.id
        })
      })

      if (data.success) {
        Delete(props.id);
        Success(data.message);
      }

    } catch (error) {
      showError(error)
    }
  }

  const deleteConfirmation = () => confirmation({ text: "¿Quieres eliminar el plan? Esto no se puede deshacer.", onConfirm: deletePlan });

  return (
    <div className="group relative bg-white border border-gray-100 hover:border-primary/40 rounded-2xl p-5 shadow-sm hover:shadow-md overflow-hidden transition-all duration-200 flex flex-col justify-between">

      {/* Línea de acento superior con tu color primario (consistente con las StatCards) */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />

      {/* Contenido Superior */}
      <div>
        {/* Encabezado: Nombre y Badge de Estado */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3 mt-1">
          <div>
            <span className="text-[10px] font-semibold tracking-wider text-primary uppercase block">
              Plan Registrado
            </span>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
              {name}
            </h3>
          </div>

          {/* Badge de Estado refinado */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide border ${isActive
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                : 'bg-gray-100 text-gray-500 border-gray-200'
              }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
            {isActive ? 'Activo' : 'Inactivo'}
          </span>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-4 min-h-[40px] line-clamp-2">
          {props.description || 'Sin descripción'}
        </p>

        {/* Métricas clave */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50/80 rounded-xl border border-gray-100 mb-4 text-xs">
          <div>
            <span className="text-gray-400 block font-medium">Duración</span>
            <span className="text-gray-900 font-semibold">{props.duration} días</span>
          </div>
          <div>
            <span className="text-gray-400 block font-medium">Precio Base</span>
            <span className="text-gray-900 font-bold">{props.price ? `$${props.price}` : 'No definido'}</span>
          </div>
        </div>
      </div>

      {/* Botones de Acción Directos */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">

        {/* Botón Editar */}
        <NavLink
          to="./editplan"
          state={{ id: props.id }}
          className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 text-xs font-medium transition-colors border border-gray-200"
          title="Editar plan"
        >
          <svg className="w-3.5 h-3.5 shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Editar</span>
        </NavLink>

        {/* Botón Activar / Desactivar */}
        <button
          type="button"
          onClick={toggleStatus}
          className={`flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border ${isActive
              ? 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
            }`}
          title={isActive ? 'Desactivar plan' : 'Activar plan'}
        >
          <span>{isActive ? 'Desactivar' : 'Activar'}</span>
        </button>

        {/* Botón Eliminar */}
        <button
          type="button"
          onClick={deleteConfirmation}
          className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-medium transition-colors"
          title="Eliminar plan"
        >
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Eliminar</span>
        </button>

      </div>
    </div>
  );
}