import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 flex flex-col items-center text-center px-6">
        {/* Animated background glow */}
        <div className="absolute top-0 -z-10 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
        
        <div className="animate-fade-in flex flex-col items-center max-w-7xl">
          <div className="px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-blue">LegalTech Argentina v2.0</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 text-foreground leading-[0.95]">
            Contratos <span className="text-brand-blue">Inteligentes</span> <br className="hidden md:block" /> para la Era Digital
          </h1>
          
          <p className="text-lg md:text-2xl text-foreground/60 max-w-3xl mb-12 leading-relaxed">
            Generá documentos personalizados adaptados al CCyC en minutos. 
            Seguridad jurídica potenciada por IA para profesionales modernos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <Link href="/wizard" className="px-10 py-5 rounded-2xl bg-brand-blue text-white font-bold text-xl hover:bg-blue-600 transition-all shadow-2xl shadow-brand-blue/30 active:scale-95">
              Crear Contrato Ahora
            </Link>
            <button className="px-10 py-5 rounded-2xl border border-foreground/10 text-foreground font-bold text-xl hover:bg-foreground/5 transition-all active:scale-95">
              Ver Catálogo
            </button>
          </div>
        </div>

        {/* Dashboard Preview / Visual element */}
        <div className="mt-32 w-full max-w-5xl aspect-video rounded-[3rem] border border-foreground/5 bg-foreground/[0.02] p-8 shadow-2xl relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/5 to-brand-violet/5 opacity-50" />
          <div className="h-full w-full rounded-2xl bg-background/50 backdrop-blur-sm border border-foreground/5 p-8 flex flex-col gap-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/30" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
              <div className="w-3 h-3 rounded-full bg-green-500/30" />
            </div>
            <div className="grid grid-cols-12 gap-8 flex-grow">
              <div className="col-span-4 space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-4 w-full rounded-full bg-foreground/5" />
                ))}
                <div className="h-24 w-full rounded-2xl bg-brand-blue/10 border border-brand-blue/20" />
              </div>
              <div className="col-span-8 space-y-4">
                <div className="h-12 w-1/2 rounded-2xl bg-foreground/5 mb-8" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-4 w-full rounded-full bg-foreground/[0.03]" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Adaptado al CCyC", icon: "⚖️", desc: "Cláusulas siempre actualizadas según el Código Civil y Comercial de la Nación." },
          { title: "Firma Electrónica", icon: "✍️", desc: "Cerrá acuerdos en segundos con validez legal total (Ley 25.506)." },
          { title: "Smart Wizard", icon: "⚡", desc: "Proceso guiado por IA que evita errores humanos y omisiones legales." }
        ].map((feature, i) => (
          <div key={i} className="glass-card p-10 rounded-[3rem] border border-foreground/5 hover:border-brand-blue/30 transition-all group">
            <div className="text-5xl mb-8 group-hover:scale-110 transition-transform">{feature.icon}</div>
            <h3 className="text-2xl font-extrabold mb-4 text-foreground">{feature.title}</h3>
            <p className="text-lg text-foreground/60 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Document Showcase */}
      <section className="max-w-7xl mx-auto w-full px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Plantillas Validadas</h2>
            <p className="text-xl text-foreground/60">Seleccioná un documento y comenzá la personalización guiada.</p>
          </div>
          <Link href="/documentos" className="px-6 py-3 rounded-xl border border-brand-blue/20 text-brand-blue font-bold hover:bg-brand-blue/5 transition-all">Ver todos →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Alquiler de Vivienda", desc: "Específico para la nueva ley de alquileres argentina.", color: "blue" },
            { title: "Compraventa Automotor", desc: "Seguridad total para transferencias de vehículos.", color: "violet" },
            { title: "Contrato de Servicios", desc: "Ideal para freelancers y agencias digitales.", color: "emerald" },
          ].map((doc, i) => (
            <Link href={`/wizard/${i}`} key={i} className="glass-card p-8 rounded-[2.5rem] hover:-translate-y-2 transition-all border border-foreground/5 group bg-foreground/[0.01]">
              <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center mb-8 group-hover:bg-brand-blue/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-foreground/30 group-hover:text-brand-blue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-extrabold text-foreground text-2xl mb-4 leading-tight">{doc.title}</h4>
              <p className="text-foreground/50 mb-8 leading-relaxed">{doc.desc}</p>
              <div className="flex items-center justify-between pt-6 border-t border-foreground/5">
                <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Usar Plantilla</span>
                <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-brand-blue">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto w-full px-6 mb-24">
        <div className="relative rounded-[4rem] bg-gradient-to-br from-brand-blue to-brand-violet p-16 md:p-32 overflow-hidden text-center flex flex-col items-center">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <h2 className="text-4xl md:text-7xl font-extrabold text-white mb-10 relative z-10 leading-[1.1]">
            ¿Listo para modernizar tu <br className="hidden md:block" /> gestión legal?
          </h2>
          <p className="text-white/80 text-xl md:text-2xl mb-14 max-w-2xl relative z-10 font-medium">
            Unite a los profesionales que ya están usando Legalis para ahorrar tiempo y eliminar errores.
          </p>
          <button className="px-12 py-6 rounded-2xl bg-white text-brand-blue font-extrabold text-2xl hover:scale-105 hover:shadow-2xl transition-all relative z-10 active:scale-95">
            Empezar gratis ahora
          </button>
        </div>
      </section>
    </div>
  );
}
