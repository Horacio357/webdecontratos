import Link from 'next/link';

export default function WizardSelector() {
  const documents = [
    { id: 'alquiler', title: "Contrato de Alquiler", icon: "🏠" },
    { id: 'compraventa', title: "Boleto de Compraventa", icon: "🤝" },
    { id: 'poder', title: "Poder General", icon: "📜" },
    { id: 'comodato', title: "Comodato", icon: "📦" },
    { id: 'nda', title: "Confidencialidad (NDA)", icon: "🔒" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-white mb-4">¿Qué documento necesitás crear?</h1>
      <p className="text-slate-400 mb-12">Seleccioná una plantilla para comenzar el proceso guiado por IA.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <Link key={doc.id} href={`/wizard/${doc.id}`}>
            <div className="glass-card p-8 rounded-3xl hover:border-electric-blue/30 transition-all group cursor-pointer h-full flex flex-col items-center text-center">
              <span className="text-5xl mb-6">{doc.icon}</span>
              <h3 className="text-xl font-bold text-white mb-4">{doc.title}</h3>
              <p className="text-sm text-slate-500 mb-8">Adaptado al Código Civil y Comercial de la Nación.</p>
              <div className="mt-auto px-6 py-2 rounded-xl bg-white/5 text-white text-sm font-semibold group-hover:bg-electric-blue transition-all">
                Seleccionar
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
