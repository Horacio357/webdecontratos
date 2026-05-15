'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function SuccessPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-center flex flex-col items-center">
      <div className="w-24 h-24 bg-brand-emerald/10 text-brand-emerald rounded-full flex items-center justify-center mb-8 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-4xl font-extrabold mb-4">¡Pago Exitoso!</h1>
      <p className="text-xl text-slate-400 mb-12 max-w-md">
        ¡Bienvenido a Legalis Pro! Tu suscripción se ha activado correctamente. Ya puedes disfrutar de acceso ilimitado.
      </p>
      <Link href="/dashboard" className="px-10 py-4 rounded-2xl bg-brand-blue text-white font-bold hover:bg-blue-600 transition-all">
        Ir al Dashboard
      </Link>
    </div>
  );
}
