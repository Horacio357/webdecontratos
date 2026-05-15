import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
      <div className="glass flex items-center justify-between w-full max-w-7xl px-8 py-4 rounded-2xl border border-foreground/5 bg-background/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-violet shadow-lg shadow-brand-blue/20" />
          <span className="text-xl font-bold tracking-tight text-foreground">Legalis</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold text-foreground/60 hover:text-brand-blue transition-colors">Inicio</Link>
          <Link href="/documentos" className="text-sm font-semibold text-foreground/60 hover:text-brand-blue transition-colors">Documentos</Link>
          <Link href="/precios" className="text-sm font-semibold text-foreground/60 hover:text-brand-blue transition-colors">Precios</Link>
          <Link href="/faq" className="text-sm font-semibold text-foreground/60 hover:text-brand-blue transition-colors">FAQ</Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm font-bold text-foreground/60 hover:text-foreground transition-colors">Ingresar</button>
          <button className="px-6 py-2.5 rounded-xl bg-brand-blue text-sm font-bold text-white hover:bg-blue-600 transition-all shadow-lg shadow-brand-blue/20">
            Empezar gratis
          </button>
        </div>
      </div>
    </nav>
  );
}
