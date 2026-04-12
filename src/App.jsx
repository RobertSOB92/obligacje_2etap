import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AmountInput from "./components/AmountInput";
import SliderInput from "./components/SliderInput";
import ResultCard from "./components/ResultCard";
import ComparisonChart from "./components/ComparisonChart";
import ExplanationSection from "./components/ExplanationSection";
import { useBondsCalculator } from "./hooks/useBondsCalculator";
import { COI, EDO, formatPLN } from "./utils/bondsMath";
import { Calculator, ArrowDown } from "lucide-react";

export default function App() {
  // ── Input state ──
  const [amount, setAmount] = useState(100_000);
  const [years, setYears] = useState(4);
  const [inflation, setInflation] = useState(0.05); // 5%

  // ── Calculated results ──
  const {
    investedCapital,
    bonds,
    coiFinal,
    edoFinal,
    winner,
    chartData,
  } = useBondsCalculator(amount, years, inflation);

  return (
    <div className="relative z-10 min-h-screen overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />

        {/* ════════ Input Section ════════ */}
        <section id="kalkulator" className="mb-12 animate-fade-up">
          <div className="glass-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center">
                <Calculator size={20} className="text-sky-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Kalkulator</h2>
                <p className="text-slate-400 text-sm">
                  Odpowiedz na 3 proste pytania
                </p>
              </div>
            </div>

            <AmountInput value={amount} onChange={setAmount} />

            <SliderInput
              id="years-slider"
              label="⏳ Za ile lat będziesz potrzebować tych pieniędzy?"
              tooltip='Wybierz, na ile lat chcesz ulokować oszczędności. Im dłużej, tym więcej zarabiasz — ale pieniądze są "zamrożone".'
              value={years}
              onChange={setYears}
              min={1}
              max={40}
              step={1}
              formatValue={(v) =>
                `${v} ${v === 1 ? "rok" : v <= 4 ? "lata" : "lat"}`
              }
            />

            <SliderInput
              id="inflation-slider"
              label="📈 Jaka będzie średnia inflacja? (szacunek)"
              tooltip="Nikt nie zna przyszłej inflacji. Ustaw wartość, którą uważasz za prawdopodobną. Historyczna średnia w Polsce to ok. 3-5% rocznie."
              value={inflation}
              onChange={setInflation}
              min={-0.02}
              max={0.15}
              step={0.005}
              formatValue={(v) => `${(v * 100).toFixed(1)}%`}
            />

            {/* Summary line */}
            <div className="mt-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/30">
              <p className="text-slate-300 text-sm text-center leading-relaxed">
                Kupujesz{" "}
                <strong className="text-white">{bonds.toLocaleString("pl-PL")} obligacji</strong>{" "}
                za{" "}
                <strong className="text-sky-400">{formatPLN(investedCapital)}</strong>{" "}
                na{" "}
                <strong className="text-white">
                  {years} {years === 1 ? "rok" : years <= 4 ? "lata" : "lat"}
                </strong>
                {" "}przy inflacji{" "}
                <strong className="text-amber-400">
                  {(inflation * 100).toFixed(1)}%
                </strong>
              </p>
            </div>
          </div>
        </section>

        {/* ════════ Scroll indicator ════════ */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center gap-1 text-slate-500 text-xs animate-bounce">
            <span>Wyniki poniżej</span>
            <ArrowDown size={16} />
          </div>
        </div>

        {/* ════════ Results Section ════════ */}
        <section id="wyniki" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
            Ile dostaniesz &bdquo;na rękę&rdquo;?
          </h2>
          <p className="text-slate-400 text-center text-sm mb-8">
            Porównanie po {years} {years === 1 ? "roku" : years <= 4 ? "latach" : "latach"} — uwzględniamy wszystkie opłaty i podatki
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResultCard
              bondType="COI"
              finalData={coiFinal}
              investedCapital={investedCapital}
              isWinner={winner === "COI"}
              years={years}
              inflation={inflation}
              cycleLength={COI.cycleLengthYears}
              margin={COI.margin}
            />
            <ResultCard
              bondType="EDO"
              finalData={edoFinal}
              investedCapital={investedCapital}
              isWinner={winner === "EDO"}
              years={years}
              inflation={inflation}
              cycleLength={EDO.cycleLengthYears}
              margin={EDO.margin}
            />
          </div>

          {/* Difference callout */}
          {winner !== "TIE" && (
            <div className="mt-6 text-center animate-fade-up-delay">
              <p className="text-slate-400 text-sm">
                {winner === "COI" ? "📘 COI" : "📗 EDO"} daje Ci{" "}
                <strong className="text-emerald-400">
                  {formatPLN(
                    Math.abs(coiFinal.netPayout - edoFinal.netPayout)
                  )}{" "}
                  więcej
                </strong>{" "}
                na rękę w tym scenariuszu.
              </p>
            </div>
          )}
        </section>

        {/* ════════ Chart Section ════════ */}
        <section id="wykres" className="mb-12">
          <ComparisonChart data={chartData} investedCapital={investedCapital} />
        </section>

        {/* ════════ Explanation Section ════════ */}
        <ExplanationSection />

        {/* ════════ Footer ════════ */}
        <Footer />
      </div>
    </div>
  );
}
