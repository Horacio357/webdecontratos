'use client';

import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-center flex flex-col items-center">
      <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="text-4xl font-extrabold mb-4">Hubo un problema</h1>
      <p className="text-xl text-slate-400 mb-12 max-w-md">
        No pudimos procesar tu pago. Por favor, intenta nuevamente o contacta a soporte si el problema persiste.
      </p>
      <div className="flex gap-4">
        <Link href="/precios" className="px-10 py-4 rounded-2xl bg-brand-blue text-white font-bold hover:bg-blue-600 transition-all">
          Reintentar
        </Link>
        <Link href="/" className="px-10 py-4 rounded-2xl border border-white/10 font-bold hover:bg-white/5 transition-all">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
