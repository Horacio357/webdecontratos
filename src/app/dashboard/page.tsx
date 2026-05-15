import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Mi Biblioteca de Contratos</h1>
          <p className="text-slate-400">Gestioná y revisá todos tus documentos generados.</p>
        </div>
        <Link href="/wizard" className="px-6 py-3 rounded-xl bg-electric-blue text-white font-bold hover:bg-blue-600 transition-all glow-blue">
          + Nuevo Contrato
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: "Total Documentos", value: "0", color: "blue" },
          { label: "Pendientes de Firma", value: "0", color: "violet" },
          { label: "Finalizados", value: "0", color: "emerald" },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</span>
            <p className={`text-4xl font-bold text-electric-${stat.color} mt-2`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      <div className="glass-card rounded-3xl p-12 flex flex-col items-center text-center border-dashed border-white/10">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Aún no tenés contratos</h3>
        <p className="text-slate-400 mb-8 max-w-sm">
          Comenzá a usar nuestro Smart Wizard para generar tu primer documento legalmente validado.
        </p>
        <Link href="/wizard" className="text-electric-blue font-bold hover:underline">
          Crear mi primer contrato →
        </Link>
      </div>
    </div>
  );
}
