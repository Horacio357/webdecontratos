'use client';

import Link from 'next/link';

export default function PendientePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-center flex flex-col items-center">
      <div className="w-24 h-24 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 className="text-4xl font-extrabold mb-4">Pago Pendiente</h1>
      <p className="text-xl text-slate-400 mb-12 max-w-md">
        Estamos esperando la confirmación de tu pago. Esto puede tardar unos minutos dependiendo del medio utilizado.
      </p>
      <Link href="/dashboard" className="px-10 py-4 rounded-2xl bg-brand-blue text-white font-bold hover:bg-blue-600 transition-all">
        Ir al Dashboard
      </Link>
    </div>
  );
}
