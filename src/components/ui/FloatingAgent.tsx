'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FloatingAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'initial' | 'ccyc'>('initial');
  const router = useRouter();

  const handleAction = (action: string) => {
    if (action === 'wizard') {
      router.push('/wizard');
      setIsOpen(false);
    } else if (action === 'ccyc') {
      setCurrentView('ccyc');
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[999] animate-fade-in fill-mode-forwards">
      {/* Message Bubble */}
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-80 p-6 rounded-3xl mb-4 animate-fade-in border border-slate-200 dark:border-slate-700" style={{ background: 'white', boxShadow: '0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(59,130,246,0.10)' }}>
          {currentView === 'initial' ? (
            <>
              <p className="text-sm font-semibold leading-relaxed text-slate-800">
                ¡Hola! Soy tu asistente legal. ¿En qué puedo ayudarte hoy?
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <button 
                  onClick={() => handleAction('wizard')}
                  className="text-xs font-bold text-brand-blue hover:text-brand-violet transition-colors text-left flex items-center gap-2 group/link"
                >
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span> Ver cómo crear un contrato
                </button>
                <button 
                  onClick={() => handleAction('ccyc')}
                  className="text-xs font-bold text-brand-blue hover:text-brand-violet transition-colors text-left flex items-center gap-2 group/link"
                >
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span> Preguntar sobre el CCyC
                </button>
              </div>
            </>
          ) : (
            <div className="animate-fade-in">
              <button 
                onClick={() => setCurrentView('initial')}
                className="text-[10px] font-bold text-brand-blue mb-4 flex items-center gap-1 opacity-60 hover:opacity-100"
              >
                ← Volver
              </button>
              <p className="text-xs leading-relaxed text-slate-600 italic">
                "El Código Civil y Comercial rige la mayoría de los contratos en Argentina. Por ejemplo, en alquileres de vivienda, el plazo mínimo es de 2 años y los ajustes suelen ser semestrales según el ICL."
              </p>
              <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-[10px] text-brand-blue font-bold">¿Querés que analice tu caso específico?</p>
              </div>
            </div>
          )}
          {/* Arrow */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 rotate-45 border-r border-b border-slate-200" style={{ background: 'white' }} />
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => {
          console.log('Agent clicked!');
          setIsOpen(!isOpen);
        }}
        aria-label="Asistente AI"
        className="group relative w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-violet flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 active:scale-95"
      >
        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full bg-brand-blue/30 animate-ping" />
        
        {/* Agent Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>

        {/* Small "Active" dot */}
        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-brand-emerald border-2 border-background" />
      </button>
    </div>
  );
}
