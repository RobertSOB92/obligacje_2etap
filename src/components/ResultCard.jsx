import {
  Trophy,
  ArrowRight,
  AlertTriangle,
  Coins,
  TrendingUp,
  HandCoins,
  Receipt,
  Banknote,
} from "lucide-react";
import { formatPLN } from "../utils/bondsMath";

/**
 * Single result card: shows the final breakdown for one bond type.
 * Highlights as "winner" if it yields more net payout.
 */
export default function ResultCard({
  bondType,
  finalData,
  investedCapital,
  isWinner,
  years,
  inflation,
  cycleLength,
  margin,
}) {
  const effectiveInflation = Math.max(0, inflation);
  const rate = ((effectiveInflation + margin) * 100).toFixed(1);
  const firstYearRateStr = bondType === "COI" ? "5,75" : "6,25";
  const totalInterest =
    finalData.cumulativeInterest ?? finalData.totalInterest ?? 0;
  const netProfit = finalData.netPayout - investedCapital;
  const hasEarlyFee = finalData.earlyFee > 0;
  const isEarly = years % cycleLength !== 0;

  return (
    <div
      className={`glass-card p-6 sm:p-8 relative overflow-hidden animate-fade-up ${
        isWinner ? "glass-card-winner" : ""
      }`}
    >
      {/* Header */}
      <div className="mb-6">
        {/* Winner badge - in flow, above title */}
        {isWinner && (
          <div className="mb-3">
            <span className="badge-winner inline-flex items-center gap-1.5">
              <Trophy size={14} />
              Najlepszy wybór
            </span>
          </div>
        )}

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
          {bondType === "COI" ? "📘 COI – 4-letnie" : "📗 EDO – 10-letnie"}
        </h3>
        <p className="text-slate-400 text-sm">
          {bondType === "COI"
            ? "Odsetki wypłacane co roku (bez reinwestycji)"
            : "Zyski pracujące na kolejne zyski (efekt kuli śnieżnej 🌀)"}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
          <TrendingUp size={13} className="text-sky-400 flex-shrink-0" />
          <span>Oprocentowanie:</span>
          <span className="text-sky-400 font-semibold">1. rok {firstYearRateStr}%, potem {rate}%</span>
          <span className="text-slate-500">(inflacja {inflation < 0 ? `${(inflation * 100).toFixed(1)}%→0%` : `${(effectiveInflation * 100).toFixed(1)}%`} + marża {(margin * 100).toFixed(1)}%)</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        <Row
          icon={<Banknote size={16} className="text-slate-400" />}
          label="Twoja wpłata"
          value={formatPLN(investedCapital)}
          muted
        />
        <Row
          icon={<Coins size={16} className="text-emerald-400" />}
          label={`Wypracowany zysk (${years} ${yearsLabel(years)})`}
          value={`+ ${formatPLN(totalInterest)}`}
          positive
        />
        {hasEarlyFee && (
          <Row
            icon={<AlertTriangle size={16} className="text-amber-400" />}
            label="Opłata za wcześniejszą wypłatę"
            value={`- ${formatPLN(finalData.earlyFee)}`}
            negative
            tooltip={`Wyciągasz pieniądze przed końcem ${cycleLength}-letniego cyklu. Opłata pobierana TYLKO z zysków.`}
          />
        )}
        {!hasEarlyFee && isEarly && (
          <Row
            icon={<AlertTriangle size={16} className="text-slate-600" />}
            label="Opłata za wcześniejszą wypłatę"
            value="0,00 zł"
            muted
            tooltip="Brak opłaty — zyski są wystarczające lub wypada koniec cyklu."
          />
        )}
        <Row
          icon={<Receipt size={16} className="text-rose-400" />}
          label="Podatek Belki (19%)"
          value={`- ${formatPLN(finalData.tax)}`}
          negative
        />

        {/* Divider */}
        <div className="border-t border-slate-700/50 my-2" />

        {/* Net Payout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span className="flex items-center gap-2 font-semibold text-white">
            <HandCoins size={18} className={isWinner ? "text-emerald-400" : "text-sky-400"} />
            Kwota na rękę
          </span>
          <span
            className={`text-xl sm:text-2xl font-extrabold tabular-nums ${
              isWinner ? "text-emerald-400" : "text-white"
            }`}
          >
            {formatPLN(finalData.netPayout)}
          </span>
        </div>

        {/* Net profit */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Czysty zysk netto</span>
          <span
            className={`font-bold ${
              netProfit > 0 ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {netProfit >= 0 ? "+" : ""}
            {formatPLN(netProfit)}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Single row in the breakdown */
function Row({ icon, label, value, positive, negative, muted, tooltip }) {
  return (
    <div className="flex flex-wrap items-start sm:items-center justify-between gap-x-3 gap-y-1 text-sm group">
      <span
        className={`flex items-start sm:items-center gap-2 ${
          muted ? "text-slate-500" : "text-slate-300"
        } flex-1 min-w-[60%]`}
        title={tooltip}
      >
        <span className="mt-0.5 sm:mt-0 flex-shrink-0">{icon}</span>
        <span className="leading-snug">{label}</span>
      </span>
      <span
        className={`font-semibold tabular-nums whitespace-nowrap text-right ml-auto ${
          positive
            ? "text-emerald-400"
            : negative
              ? "text-rose-400"
              : muted
                ? "text-slate-500"
                : "text-slate-200"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function yearsLabel(y) {
  if (y === 1) return "rok";
  if (y >= 2 && y <= 4) return "lata";
  return "lat";
}
