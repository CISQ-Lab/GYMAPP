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
    <div className="group relative bg-neutral-900 border border-neutral-800 hover:border-primary/50 rounded-xl p-5 shadow-md overflow-hidden transition-all duration-200 flex flex-col justify-between">

      {/* Capa de tinte con el color primario */}
      <div className="absolute inset-0 bg-primary/10 pointer-events-none group-hover:bg-primary/15 transition-colors" />

      {/* Contenido Superior */}
      <div>
        {/* Encabezado: Nombre y Estado */}
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <span className="text-[10px] font-semibold tracking-wider text-primary uppercase block">
              Plan Registrado
            </span>
            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
              {name}
            </h3>
          </div>

          {/* Badge de Estado */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm shrink-0 ${isActive
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-neutral-800/80 text-neutral-400 border-neutral-700'
              }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-500'}`} />
            {isActive ? 'Activo' : 'Inactivo'}
          </span>
        </div>

        {/* Descripción */}
        <p className="relative z-10 text-sm text-neutral-300 mb-4 min-h-[40px] line-clamp-2">
          {props.description || 'Sin descripción'}
        </p>

        {/* Métricas clave */}
        <div className="relative z-10 grid grid-cols-2 gap-2 p-3 bg-neutral-950/70 backdrop-blur-md rounded-lg border border-neutral-800/80 mb-4 text-xs">
          <div>
            <span className="text-neutral-400 block font-medium">Duración</span>
            <span className="text-neutral-100 font-semibold">{props.duration} días</span>
          </div>
          <div>
            <span className="text-neutral-400 block font-medium">Precio Base</span>
            <span className="text-white font-bold">{props.price ? `$${props.price}` : 'No definido'}</span>
          </div>
        </div>
      </div>

      {/* Botones Directos de Acción Responsivos */}
      <div className="relative grid items-center gap-1.5 pt-3 border-t border-neutral-800/80">

        {/* Botón Editar */}
        <NavLink to="./editplan" state={{ id: props.id }} className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-md
         bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-medium transition-colors border border-primary/40">
          <button
            type="button"
            title="Editar plan"
          >
            <div className='flex space-x-1'>
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Editar</span>
            </div>
          </button>
        </NavLink>

        {/* Botón Activar / Desactivar */}
        <button
          type="button"
          onClick={toggleStatus}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors border ${isActive
            ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/20'
            : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20'
            }`}
          title={isActive ? 'Desactivar plan' : 'Activar plan'}
        >
          <span>{isActive ? 'Desactivar' : 'Activar'}</span>
        </button>

        {/* Botón Eliminar */}
        <button
          type="button"
          onClick={deleteConfirmation}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-md bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-medium transition-colors"
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