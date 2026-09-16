function MemberCard({ member }) {
    const isActive = member.membership_status === 1;

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col justify-between max-w-sm">
            
            {/* Header: Avatar, Nombre e Indicador de Estado */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    {/* Avatar o Iniciales usando tu color primary */}
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-base shadow-sm overflow-hidden shrink-0">
                        {member.photo_pat ? (
                            <img 
                                src={`http://localhost:3000/${member.photo_pat.replace(/\\/g, '/')}`} 
                                alt={`${member.name}`} 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span>{member.name.charAt(0)}{member.surname.charAt(0)}</span>
                        )}
                    </div>

                    <div>
                        <h3 className="text-slate-800 font-semibold text-base leading-snug">
                            {member.name} {member.surname}
                        </h3>
                        <p className="text-slate-500 text-xs truncate max-w-[150px]">{member.email}</p>
                    </div>
                </div>

                {/* Badge de Estado */}
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                    isActive 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                        : 'bg-rose-50 text-rose-600 border-rose-200'
                }`}>
                    {isActive ? 'Activo' : 'Vencido'}
                </span>
            </div>

            {/* Cuerpo: Detalles de contacto y vigencia */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">Teléfono:</span>
                    <span className="font-medium text-slate-700">{member.phone}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">Vence:</span>
                    <span className={`font-semibold ${isActive ? 'text-slate-700' : 'text-rose-600'}`}>
                        {member.membership_end}
                    </span>
                </div>
            </div>

            {/* Acciones con detalles de color primary */}
            <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium py-1.5 rounded-xl transition-colors">
                    Ver
                </button>
                <button className="flex-1 bg-primary hover:opacity-90 text-white text-xs font-medium py-1.5 rounded-xl transition-colors shadow-sm shadow-primary/20">
                    Renovar
                </button>
            </div>

        </div>
    );
}

export default MemberCard;