'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function PreciosPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async () => {
    if (!session) {
      router.push('/api/auth/signin');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/payments/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: 'pro' }),
      });

      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Elige tu plan</h1>
      <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto">
        Potencia tu gestión legal con herramientas de IA diseñadas para el mercado argentino.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Plan Gratis */}
        <div className="glass-card p-10 rounded-[2.5rem] border border-white/5 flex flex-col">
          <h3 className="text-2xl font-bold mb-2">Gratis</h3>
          <div className="text-4xl font-extrabold mb-6">$0<span className="text-lg text-slate-500 font-medium">/mes</span></div>
          <ul className="text-left space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-3">✅ 2 contratos por mes</li>
            <li className="flex items-center gap-3">✅ Plantillas básicas</li>
            <li className="flex items-center gap-3">✅ Exportación PDF</li>
          </ul>
          <button className="w-full py-4 rounded-2xl border border-white/10 font-bold hover:bg-white/5 transition-all">
            Plan Actual
          </button>
        </div>

        {/* Plan Pro */}
        <div className="glass-card p-10 rounded-[2.5rem] border-2 border-brand-blue relative flex flex-col bg-brand-blue/5">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-blue text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            Recomendado
          </div>
          <h3 className="text-2xl font-bold mb-2">Pro</h3>
          <div className="text-4xl font-extrabold mb-6">$4.999<span className="text-lg text-slate-500 font-medium">/mes</span></div>
          <ul className="text-left space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-3">✅ Contratos ilimitados</li>
            <li className="flex items-center gap-3">✅ Smart AI Agent avanzado</li>
            <li className="flex items-center gap-3">✅ Soporte prioritario</li>
            <li className="flex items-center gap-3">✅ Firma electrónica remota</li>
          </ul>
          <button 
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-brand-blue text-white font-bold hover:bg-blue-600 transition-all shadow-lg shadow-brand-blue/20 disabled:opacity-50"
          >
            {loading ? 'Procesando...' : 'Obtener Pro'}
          </button>
        </div>
      </div>
    </div>
  );
}
