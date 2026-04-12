import { Heart } from "lucide-react";

/**
 * Educational footer with capital-protection guarantee and disclaimer.
 */
export default function Footer() {
  return (
    <footer className="mt-16 mb-8">

      {/* Glossary */}
      <div className="max-w-3xl mx-auto mb-10">
        <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
          📚 Słowniczek — po ludzku
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <GlossaryItem
            term="Obligacja"
            definition="To jak pożyczka, którą dajesz państwu. W zamian dostajesz odsetki."
          />
          <GlossaryItem
            term="Inflacja"
            definition='O ile drożeje życie w ciągu roku. Im wyższa, tym bardziej "kurczą się" pieniądze na koncie.'
          />
          <GlossaryItem
            term="Podatek Belki (19%)"
            definition="Podatek od zysków z inwestycji. Płacisz go tylko od zarobku, nie od wpłaconych pieniędzy."
          />
          <GlossaryItem
            term="Marża obligacji"
            definition="Dodatek do inflacji, który gwarantuje realny zysk. Im wyższa marża, tym więcej zarabiasz ponad inflację."
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-center text-xs text-slate-600 max-w-2xl mx-auto leading-relaxed">
        <p className="mb-2">
          Kalkulator ma charakter edukacyjny i nie stanowi porady inwestycyjnej.
          Rzeczywiste wyniki mogą się różnić od przedstawionych szacunków. Parametry obligacji
          aktualne na kwiecień 2026 r.
        </p>
        <p className="flex items-center justify-center gap-1.5">
          Zbudowane z <Heart size={12} className="text-rose-500" /> w Polsce
        </p>
      </div>
    </footer>
  );
}

function GlossaryItem({ term, definition }) {
  return (
    <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-4">
      <dt className="text-sky-400 font-semibold text-sm mb-1">{term}</dt>
      <dd className="text-slate-400 text-xs leading-relaxed">{definition}</dd>
    </div>
  );
}
