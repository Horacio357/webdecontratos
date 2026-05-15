'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { jsPDF } from 'jspdf';

export default function WizardPage() {
  const params = useParams();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisMsg, setAnalysisMsg] = useState('Verificando cláusulas...');
  const [clauses, setClauses] = useState({
    inventory: false,
    pets: true,
    depositInDollars: false
  });
  const totalSteps = 4;

  // Auto-advance from step 3 (analysis) to step 4
  useEffect(() => {
    if (step !== 3) return;

    setAnalysisProgress(0);
    setAnalysisMsg('Verificando cláusulas...');

    const messages = [
      { at: 400,  pct: 30, msg: 'Consultando CCyC...' },
      { at: 1100, pct: 60, msg: 'Detectando contradicciones...' },
      { at: 1800, pct: 90, msg: 'Validando coherencia legal...' },
      { at: 2400, pct: 100, msg: '¡Análisis completo!' },
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];

    messages.forEach(({ at, pct, msg }) => {
      timers.push(setTimeout(() => {
        setAnalysisProgress(pct);
        setAnalysisMsg(msg);
      }, at));
    });

    // Advance to step 4 after analysis finishes
    timers.push(setTimeout(() => setStep(4), 2800));

    return () => timers.forEach(clearTimeout);
  }, [step]);

  const toggleClause = (id: keyof typeof clauses) => {
    setClauses(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const generatePDF = () => {
    console.log("Starting PDF generation...");
    setIsDownloading(true);
    
    try {
      const doc = new jsPDF();
      
      console.log("jsPDF instance created.");
      
      // Header
      doc.setFontSize(22);
      doc.setTextColor(59, 130, 246); // Brand Blue
      doc.text("LEGALIS ARGENTINA", 105, 20, { align: "center" });
      
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text("CONTRATO DE ALQUILER DE VIVIENDA", 105, 40, { align: "center" });
      
      // Body
      doc.setFontSize(12);
      doc.text("En la Ciudad de Buenos Aires, a los 14 dias del mes de Mayo de 2024...", 20, 60);
      doc.text("PRIMERA: EL LOCADOR entrega en locacion el inmueble sito en...", 20, 75);
      
      if (clauses.pets) {
        doc.text("CLAUSULA ESPECIAL: Se permite la tenencia de mascotas domesticas.", 20, 90);
      }
      
      doc.text("FIRMA LOCADOR: ____________________", 20, 150);
      doc.text("FIRMA LOCATARIO: ____________________", 20, 170);
      
      console.log("Saving PDF...");
      doc.save("contrato_legalis.pdf");
      console.log("PDF saved successfully.");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const steps = [
    { title: "Información Básica", desc: "Partes involucradas y objeto del contrato." },
    { title: "Cláusulas Específicas", desc: "Personalización según tus necesidades." },
    { title: "Revisión Legal", desc: "Validación automática de coherencia." },
    { title: "Generación", desc: "Preparando tu PDF oficial." },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-12">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2 relative flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step > i + 1 ? 'bg-brand-emerald text-white' : 
                step === i + 1 ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 
                'bg-foreground/5 text-foreground/40 border border-foreground/10'
              }`}>
                {step > i + 1 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : i + 1}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${step === i + 1 ? 'text-brand-blue' : 'text-foreground/40'}`}>
                {s.title}
              </span>
              {i < steps.length - 1 && (
                <div className={`absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-0.5 ${step > i + 1 ? 'bg-brand-emerald' : 'bg-foreground/5'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Wizard Content */}
        <div className="glass-card rounded-[2.5rem] p-8 md:p-14 min-h-[450px] flex flex-col border border-foreground/5 bg-background/50">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-foreground mb-2">{steps[step - 1].title}</h2>
            <p className="text-foreground/60">{steps[step - 1].desc}</p>
          </div>

          <div className="flex-grow">
            {/* Mock Form Content */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground/70">Nombre del Locador</label>
                    <input type="text" className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl px-5 py-4 text-foreground focus:border-brand-blue outline-none transition-all placeholder:text-foreground/30" placeholder="Ej: Juan Pérez" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground/70">DNI / CUIT</label>
                    <input type="text" className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl px-5 py-4 text-foreground focus:border-brand-blue outline-none transition-all placeholder:text-foreground/30" placeholder="20-XXXXXXXX-X" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground/70">Domicilio del Inmueble</label>
                  <input type="text" className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl px-5 py-4 text-foreground focus:border-brand-blue outline-none transition-all placeholder:text-foreground/30" placeholder="Av. Corrientes 1234, CABA" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-5 rounded-2xl bg-brand-blue/5 border border-brand-blue/20 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blue flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-foreground/80 italic leading-relaxed">
                    "Detectamos que es un inmueble para vivienda. Sugerimos incluir la cláusula de ajuste semestral según ICL."
                  </p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { id: 'inventory', label: 'Incluir inventario detallado' },
                    { id: 'pets', label: 'Permitir mascotas' },
                    { id: 'depositInDollars', label: 'Depósito en dólares' }
                  ].map((clause) => (
                    <div 
                      key={clause.id} 
                      onClick={() => toggleClause(clause.id as keyof typeof clauses)}
                      className="flex items-center justify-between p-5 rounded-2xl border border-foreground/5 bg-foreground/2 cursor-pointer hover:bg-foreground/5 transition-all group"
                    >
                      <span className="font-bold text-foreground/90">{clause.label}</span>
                      <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${clauses[clause.id as keyof typeof clauses] ? 'bg-brand-emerald' : 'bg-foreground/20'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${clauses[clause.id as keyof typeof clauses] ? 'left-7' : 'left-1'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 animate-fade-in gap-6">
                {/* Animated document icon */}
                <div className="relative w-20 h-20 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full text-brand-blue/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full text-brand-blue animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ clipPath: `inset(${100 - analysisProgress}% 0 0 0)`, transition: 'clip-path 0.5s ease' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-extrabold text-foreground">Analizando coherencia legal</h3>
                <p className="text-sm text-brand-blue font-semibold tracking-wide transition-all duration-300">{analysisMsg}</p>

                {/* Progress bar */}
                <div className="w-full max-w-sm bg-foreground/5 rounded-full h-2 overflow-hidden border border-foreground/10">
                  <div
                    className="h-full bg-gradient-to-r from-brand-blue to-brand-violet rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>
                <span className="text-xs text-foreground/40 font-mono">{analysisProgress}%</span>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 animate-fade-in">
                <div className="w-24 h-32 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-8 relative">
                   <div className="absolute top-4 left-4 right-4 h-2 bg-foreground/10 rounded-full" />
                   <div className="absolute top-8 left-4 right-8 h-2 bg-foreground/10 rounded-full" />
                   <div className="absolute top-12 left-4 right-6 h-2 bg-foreground/10 rounded-full" />
                   <div className="absolute bottom-4 right-4 w-8 h-8 rounded-lg bg-brand-emerald/50" />
                </div>
                <h3 className="text-2xl font-extrabold text-foreground mb-2">¡Todo listo!</h3>
                <p className="text-foreground/60 mb-10">Tu contrato ha sido generado con éxito siguiendo el CCyC.</p>
                <button 
                  onClick={generatePDF}
                  disabled={isDownloading}
                  className="px-10 py-4 rounded-2xl bg-brand-emerald text-white font-bold text-lg hover:bg-emerald-600 transition-all shadow-lg shadow-brand-emerald/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {isDownloading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generando...
                    </>
                  ) : (
                    "Descargar PDF"
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="mt-12 flex justify-between pt-10 border-t border-foreground/5">
            <button 
              onClick={() => step > 1 ? setStep(step - 1) : router.push('/')}
              className="px-8 py-3 rounded-2xl border border-foreground/10 text-foreground font-bold hover:bg-foreground/5 transition-all"
            >
              {step === 1 ? 'Cancelar' : 'Atrás'}
            </button>
            {step < totalSteps && (
              <button 
                onClick={() => setStep(step + 1)}
                className="px-10 py-3 rounded-2xl bg-brand-blue text-white font-bold text-lg hover:bg-blue-600 transition-all shadow-lg shadow-brand-blue/20"
              >
                Continuar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
