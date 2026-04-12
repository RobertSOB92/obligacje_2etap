import { ShieldCheck, ChevronDown } from "lucide-react";

/**
 * Hero-style header with reassuring messaging for the "Danusia" persona.
 */
export default function Header() {
  return (
    <header className="text-center pt-10 pb-8 sm:pt-16 sm:pb-12 relative">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-xs text-slate-400 mb-6">
          <ShieldCheck size={14} className="text-emerald-400" />
          Obligacje gwarantowane przez Skarb Państwa
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
          Twój asystent oszczędzania
          <br />
          <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
            Ochroń pieniądze przed inflacją
          </span>
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Porównaj obligacje skarbowe <strong className="text-sky-400">COI</strong> i{" "}
          <strong className="text-violet-400">EDO</strong> — sprawdź, ile naprawdę możesz zarobić
          po podatkach i opłatach.
        </p>

        <div className="mt-8">
          <a
            href="#jak-to-dziala"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 hover:border-slate-600 transition-all shadow-sm"
          >
            Zobacz, jak właściwie działają te obligacje
            <ChevronDown size={16} className="text-sky-400" />
          </a>
        </div>
      </div>
    </header>
  );
}
