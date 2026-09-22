import React, { useEffect, useState } from 'react';
import Button from '../../components/buttons/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { SERVER_URL } from '../../config/env';
import { apiFetch } from "../../services/api"
import showError from "../../components/messages/showError"
import useGym from "../../hooks/useGym"
import Success from '../../components/messages/success';


// SVG Icons generated without third-party dependencies
const Icons = {
  User: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Building: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0V9m0 0h5m-5 0H7m5 4h5m-5 0H7m5 4h5m-5 0H7" />
    </svg>
  ),
  CreditCard: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  CheckCircle: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  XCircle: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Edit: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Save: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  ),
  Cancel: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Camera: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Award: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Activity: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  ArrowLeft: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  )
};

export default function ViewMember() {
  const [member, setMember] = useState(null);
  const [formData, setFormData] = useState(null);
  const [oldFormData, setOldFormdata] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [membership, setMembership] = useState(null)
  const [plans, setPlans] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { gym } = useGym();



  useEffect(() => {
    if (!location.state?.member) {
      return;
    }
    setMember(location.state?.member);
    setFormData(location.state?.member);
    setOldFormdata(location.state?.member);

  }, [location.state?.member])


  useEffect(() => {

    if (!member?.membership_id) {
      return;
    }

    const getMembership = async () => {
      const data = await apiFetch(`/gyms/getPlan/${member?.membership_id}`);
      if (data.success) {
        setMembership(data.plan);
      }
    }

    const getPlans = async () => {
      const data = await apiFetch(`/gyms/${member?.gym_id}/getPlans?active=1`);
      if (data.success) {
        setPlans(data.plans);
      }
    }

    try {
      getMembership();
      getPlans();
    } catch (error) {
      showError(error.message);
    }

  }, [member?.membership_id])

  const addDaysToDate = (startDateStr, days) => {
    if (!startDateStr || !days) return '';
    const date = new Date(startDateStr);
    // Ajuste para evitar desfasamientos por zona horaria UTC
    const [year, month, day] = startDateStr.split('-').map(Number);
    const localDate = new Date(year, month - 1, day);

    localDate.setDate(localDate.getDate() + Number(days));

    // Retorna formato YYYY-MM-DD para el input type="date"
    const yyyy = localDate.getFullYear();
    const mm = String(localDate.getMonth() + 1).padStart(2, '0');
    const dd = String(localDate.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  };


  // Handle standard input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => {
      const updatedValue = type === 'checkbox' ? (checked ? 1 : 0) :
        type === 'number' ? (value === '' ? '' : Number(value)) : value;

      const nextForm = {
        ...prev,
        [name]: updatedValue
      };

      // Recalcular vencimiento al cambiar el Plan
      if (name === 'membership_id') {
        const selectedPlan = plans?.find(p => String(p.id) === String(value));
        if (selectedPlan && nextForm.membership_start) {
          nextForm.membership_end = addDaysToDate(
            nextForm.membership_start,
            selectedPlan.durationDays // Asegúrate de usar el campo exacto de tu backend (ej. duration_days)
          );
        }
      }

      // Recalcular vencimiento al cambiar la Fecha de Inicio
      if (name === 'membership_start' && value) {
        const selectedPlan = plans?.find(p => String(p.id) === String(nextForm.membership_id));
        if (selectedPlan) {
          nextForm.membership_end = addDaysToDate(
            value,
            selectedPlan.durationDays
          );
        }
      }

      return nextForm;
    });
  };

  // Submit and save updated member details
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const data = await apiFetch("/gyms/member/editmember", {
        method: 'PUT',
        body: JSON.stringify({
          formData
        })
      }

      );

      if (data.success) {
        Success(data.message)
        setMember(formData);
        setIsEditing(false);
      }

    } catch (error) {
      showError("No se pudo editar, devolviendo valores antiguos, " + error.message)
      setMember(oldFormData);
      setFormData(oldFormData);
    } 
  };

  // Cancel edit mode and revert changes
  const handleCancel = () => {
    setFormData(member);
    setIsEditing(false);
  };

  // Calculate remaining subscription days
  const getDaysRemaining = (endDateStr) => {
    if (!endDateStr) return 0;
    const end = new Date(endDateStr);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = getDaysRemaining(member?.membership_end);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 sm:p-6 md:p-8">

      <div className="max-w-6xl mx-auto space-y-6">

        {/* Top Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <button className="p-2.5 hover:bg-slate-100 text-slate-500 rounded-xl transition-colors" onClick={() => navigate(-1)}>
              <Icons.ArrowLeft />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                Detalles del Miembro
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Gimnasio {gym?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <Button
                onClick={() => {
                  setFormData(member);
                  setIsEditing(true);
                }}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/70 text-white font-medium px-4 py-2.5 rounded-xl shadow-md text-sm "
              >
                <Icons.Edit />
                Editar Miembro
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2.5 rounded-xl transition-colors text-sm"
                >
                  <Icons.Cancel />
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/70 text-white font-medium px-4 py-2.5 rounded-xl shadow-md transition-all text-sm active:scale-95"
                >
                  <Icons.Save />
                  Guardar
                </Button>
              </div>
            )}
          </div>
        </header>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column - Member Summary Card */}
          { }
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center relative overflow-hidden">

              {/* Primary Accent Banner */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-primary to-primary/50"></div>

              {/* Avatar Photo */}
              <div className="relative pt-6 mb-4 flex justify-center">
                <div className="relative">
                  <img
                    src={SERVER_URL + member?.photo_pat}
                    alt={`${member?.name} ${member?.surname}`}
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md bg-slate-100"
                    onError={(e) => {
                      e.target.onerror = null;

                    }}
                  />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white">
                      <Icons.Camera />
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <h2 className="text-xl font-bold text-slate-900">
                {member?.name} {member?.surname}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1 flex items-center justify-center gap-1">
                <Icons.Mail />
                {member?.email}
              </p>

              {/* Status Badges */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2">
                {member?.membership_status === 1 ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Icons.CheckCircle />
                    Membresía Activa
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                    <Icons.XCircle />
                    Inactiva / Vencida
                  </span>
                )}

                {member?.isActive === 1 ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                    <Icons.Activity />
                    Miembro Normal
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                    <Icons.XCircle />
                    Miembro suspendido
                  </span>
                )}
              </div>

              {/* Membership Progress Box */}
              <div className="mt-5 bg-slate-50 p-4 rounded-xl border border-slate-100 text-left space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Tipo de Plan:</span>
                  <span className="font-semibold text-slate-800">
                    {membership?.name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Días Restantes:</span>
                  <span className="font-bold text-primary bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    {daysRemaining} días
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(0, (daysRemaining / membership?.durationDays) * 100))}%` }}
                  ></div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Member Data Form & Details */}
          { }
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

              {/* Form Title Header */}
              <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <h3 className="text-base font-bold text-slate-800">
                    {isEditing ? "Formulario de Edición" : "Ficha de Datos General"}
                  </h3>
                </div>
                <span className="text-xs text-primary font-semibold bg-indigo-50 px-2.5 py-1 rounded-md">
                  {isEditing ? "Edición Activada" : "Modo Lectura"}
                </span>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSave} className="p-6 space-y-6">

                {/* Section 1: Personal Information */}
                <div>
                  <h4 className="text-xs font-bold text-primary  uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Icons.User />
                    Información Personal
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* name */}
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Nombre
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={formData?.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm outline-none transition-all"
                        />
                      ) : (
                        <p className="px-3.5 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 border border-slate-100">
                          {member?.name}
                        </p>
                      )}
                    </div>

                    {/* surname */}
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Apellidos
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="surname"
                          value={formData?.surname}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm outline-none transition-all"
                        />
                      ) : (
                        <p className="px-3.5 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 border border-slate-100">
                          {member?.surname}
                        </p>
                      )}
                    </div>

                    {/* email */}
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Correo Electrónico
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm outline-none transition-all"
                        />
                      ) : (
                        <p className="px-3.5 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 border border-slate-100 flex items-center gap-2">
                          <Icons.Mail />
                          {member?.email}
                        </p>
                      )}
                    </div>

                    {/* phone */}
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Teléfono
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="phone"
                          value={formData?.phone}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm outline-none transition-all"
                        />
                      ) : (
                        <p className="px-3.5 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 border border-slate-100 flex items-center gap-2">
                          <Icons.Phone />
                          {member?.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Section 2: Membership Details */}
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Icons.CreditCard />
                    Detalles de la Membresía
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* membership_id */}
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Tipo de Membresía
                      </label>
                      {isEditing ? (
                        <select
                          name="membership_id"
                          value={formData?.membership_id}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm outline-none transition-all bg-white"
                        >

                          {plans?.map((plan) => (
                            <option key={plan.id} value={plan.id}>
                              {plan.name}
                            </option>
                          ))}

                        </select>
                      ) : (
                        <p className="px-3.5 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 border border-slate-100 flex items-center gap-2">
                          <Icons.Award />
                          {membership?.name}
                        </p>
                      )}
                    </div>

                    {/* membership_status */}
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Estado de la Membresía
                      </label>
                      {isEditing ? (
                        <div className="flex items-center gap-4 mt-2">
                          <label className="inline-flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="membership_status"
                              value="1"
                              checked={Number(formData?.membership_status) === 1}
                              onChange={() => setFormData(p => ({ ...p, membership_status: 1 }))}
                              className="w-4 h-4 text-primary focus:ring-primary"
                            />
                            <span className="text-sm font-medium text-slate-700">(Activo)</span>
                          </label>
                          <label className="inline-flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="membership_status"
                              value="0"
                              checked={Number(formData?.membership_status) === 0}
                              onChange={() => setFormData(p => ({ ...p, membership_status: 0 }))}
                              className="w-4 h-4 text-rose-600 focus:ring-rose-500"
                            />
                            <span className="text-sm font-medium text-slate-700">(Inactivo)</span>
                          </label>
                        </div>
                      ) : (
                        <p className="px-3.5 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 border border-slate-100">
                          {member?.membership_status === 1 ? 'Activa' : 'Inactiva'}
                        </p>
                      )}
                    </div>

                    {/* membership_start */}
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Fecha Inicio
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          name="membership_start"
                          value={formData?.membership_start}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm outline-none transition-all"
                        />
                      ) : (
                        <p className="px-3.5 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 border border-slate-100 flex items-center gap-2">
                          <Icons.Calendar />
                          {member?.membership_start}
                        </p>
                      )}
                    </div>

                    {/* membership_end */}
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Fecha Vencimiento
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          name="membership_end"
                          value={formData?.membership_end}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm outline-none transition-all"
                        />
                      ) : (
                        <p className="px-3.5 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 border border-slate-100 flex items-center gap-2">
                          <Icons.Calendar />
                          {member?.membership_end}
                        </p>
                      )}
                    </div>

                    <div>

                      {isEditing && (
                        <>
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Usuario activo
                          </label>
                          <div className="flex items-center gap-4 mt-2">
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="isActive"
                                value="1"
                                checked={Number(formData?.isActive) === 1}
                                onChange={() => setFormData(p => ({ ...p, isActive: 1 }))}
                                className="w-4 h-4 text-primary focus:ring-primary"
                              />
                              <span className="text-sm font-medium text-slate-700">(Activo)</span>
                            </label>
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="isActive"
                                value="0"
                                checked={Number(formData?.isActive) === 0}
                                onChange={() => setFormData(p => ({ ...p, isActive: 0 }))}
                                className="w-4 h-4 text-rose-600 focus:ring-rose-500"
                              />
                              <span className="text-sm font-medium text-slate-700">(Baja)</span>
                            </label>
                          </div>
                        </>
                      )
                      }
                    </div>
                  </div>
                </div>

                {/* Submit Action Bar */}
                {isEditing && (
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button
                      type="button"
                      onClick={handleCancel}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 "
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary text-white font-medium text-sm shadow-md flex items-center gap-2"
                    >
                      <Icons.Save />
                      Guardar Cambios
                    </Button>
                  </div>
                )}

              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}