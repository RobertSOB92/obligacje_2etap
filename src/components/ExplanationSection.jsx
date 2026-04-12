import { Clock, TrendingUp, ShieldCheck, Info } from "lucide-react";

export default function ExplanationSection() {
  return (
    <section id="jak-to-dziala" className="mb-12 max-w-4xl mx-auto animate-fade-up">
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex flex-shrink-0 items-center justify-center">
            <Info size={24} className="text-sky-400" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Jak to właściwie działa? Proste wyjaśnienie
          </h3>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 relative z-10">
          <p className="text-base sm:text-lg leading-relaxed mb-8">
            Obligacje skarbowe to po prostu bezpieczna pożyczka, której udzielasz państwu. W zamian za to, państwo obiecuje nie tylko chronić Twoje pieniądze przed inflacją (wzrostem cen), ale też dorzucić od siebie niewielki bonus. Do wyboru masz dwie główne drogi:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* COI Card */}
            <div className="bg-slate-900/50 border border-sky-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-sky-500/10 rounded-lg">
                  <Clock size={20} className="text-sky-400" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  🟢 Opcja na 4 lata (COI)<br />
                  <span className="text-sky-400 text-sm font-normal">"Wygodna wypłata co roku"</span>
                </h4>
              </div>
              <ul className="space-y-4 text-sm">
                <li>
                  <strong className="text-slate-200">Jak to działa?</strong> Zamrażasz pieniądze na 4 lata. Po każdym roku państwo wylicza Twój zysk (na podstawie aktualnej inflacji) i przelewa te pieniądze bezpośrednio na Twoje konto bankowe.
                </li>
                <li>
                  <strong className="text-slate-200">Dla kogo?</strong> Dla osób, które chcą mieć dodatkowy, przewidywalny zastrzyk gotówki co roku i wolą krótsze zobowiązania.
                </li>
                <li>
                  <strong className="text-slate-200">Wcześniejsza wypłata:</strong> Jeśli nagle potrzebujesz pieniędzy, możesz je wyciągnąć. Opłata to 0,70 zł od każdej obligacji (czyli od każdych zainwestowanych 100 zł).
                </li>
              </ul>
            </div>

            {/* EDO Card */}
            <div className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <TrendingUp size={20} className="text-emerald-400" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  🔵 Opcja na 10 lat (EDO)<br />
                  <span className="text-emerald-400 text-sm font-normal">"Kula śnieżna dla cierpliwych"</span>
                </h4>
              </div>
              <ul className="space-y-4 text-sm">
                <li>
                  <strong className="text-slate-200">Jak to działa?</strong> Zamrażasz pieniądze na maksymalnie 10 lat. Różnica polega na tym, że państwo nie przelewa Ci zysków co roku. Zamiast tego dopisuje je do Twojej głównej puli. W kolejnym roku zarabiasz już nie tylko na swojej pierwotnej wpłacie, ale też na zyskach z zeszłego roku. To tzw. "efekt kuli śnieżnej", który na dłuższą metę daje dużo więcej pieniędzy.
                </li>
                <li>
                  <strong className="text-slate-200">Dla kogo?</strong> Dla osób odkładających na konkretny, odległy cel (np. wkład własny na mieszkanie, emerytura), które chcą wycisnąć maksymalny zysk.
                </li>
                <li>
                  <strong className="text-slate-200">Wcześniejsza wypłata:</strong> Możesz wyciągnąć środki w każdej chwili. Opłata to 2,00 zł od każdej obligacji (czyli od każdych zainwestowanych 100 zł).
                </li>
              </ul>
            </div>
          </div>

          {/* Security Box */}
          <div className="bg-emerald-500/10 border-2 border-emerald-500/40 rounded-xl p-6 flex flex-col sm:flex-row gap-5 items-start shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <div className="w-12 h-12 flex-shrink-0 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <ShieldCheck size={28} className="text-emerald-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-emerald-400 mb-2">
                🛡️ Najważniejsza zasada bezpieczeństwa
              </h4>
              <p className="text-sm leading-relaxed text-slate-200 font-medium">
                Niezależnie od tego, którą opcję wybierzesz, Twój wpłacony kapitał jest zawsze w 100% bezpieczny. Jeśli zdecydujesz się wycofać pieniądze zaledwie po kilku miesiącach i opłata za zerwanie byłaby wyższa niż Twoje zyski – państwo po prostu zrezygnuje z części opłaty. Zawsze odzyskasz co najmniej tyle, ile wpłaciłeś na samym początku.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
