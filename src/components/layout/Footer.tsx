import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-foreground/5 bg-background py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-violet" />
            <span className="text-xl font-bold tracking-tight text-foreground">Legalis</span>
          </div>
          <p className="text-foreground/50 max-w-sm leading-relaxed">
            Simplificamos la burocracia legal en Argentina con tecnología de vanguardia y cumplimiento normativo total.
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-6">Producto</h4>
          <ul className="space-y-4">
            <li><Link href="/documentos" className="text-sm font-semibold text-foreground/60 hover:text-brand-blue transition-colors">Plantillas</Link></li>
            <li><Link href="/precios" className="text-sm font-semibold text-foreground/60 hover:text-brand-blue transition-colors">Precios</Link></li>
            <li><Link href="/api" className="text-sm font-semibold text-foreground/60 hover:text-brand-blue transition-colors">API</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-6">Legal</h4>
          <ul className="space-y-4">
            <li><Link href="/terminos" className="text-sm font-semibold text-foreground/60 hover:text-brand-blue transition-colors">Términos</Link></li>
            <li><Link href="/privacidad" className="text-sm font-semibold text-foreground/60 hover:text-brand-blue transition-colors">Privacidad</Link></li>
            <li><Link href="/cookies" className="text-sm font-semibold text-foreground/60 hover:text-brand-blue transition-colors">Cookies</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-foreground/40">© 2024 Legalis Argentina. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          {/* Social Icons Placeholder */}
          <div className="w-5 h-5 bg-foreground/10 rounded-full" />
          <div className="w-5 h-5 bg-foreground/10 rounded-full" />
          <div className="w-5 h-5 bg-foreground/10 rounded-full" />
        </div>
      </div>
    </footer>
  );
}
