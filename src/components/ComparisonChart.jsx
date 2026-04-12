import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { formatPLN } from "../utils/bondsMath";

/**
 * Bar chart comparing COI vs EDO net payout over time.
 */
export default function ComparisonChart({ data, investedCapital }) {
  return (
    <div className="glass-card p-6 sm:p-8 animate-fade-up-delay">
      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
        📊 Jak rosną Twoje pieniądze
      </h3>
      <p className="text-slate-400 text-sm mb-6">
        Porównanie kwoty "na rękę" po każdym roku (po opłatach i podatku)
      </p>

      <div className="w-full h-[320px] sm:h-[380px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={{ stroke: "#263054" }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v
              }
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <Tooltip
              content={<CustomTooltip investedCapital={investedCapital} />}
              cursor={{ fill: "rgba(148,163,184,0.06)" }}
            />
            <Legend content={<CustomLegend />} />
            <ReferenceLine
              y={investedCapital}
              stroke="#fbbf24"
              strokeWidth={2}
              strokeDasharray="8 4"
            />
            <Bar
              dataKey="COI"
              fill="url(#coiGradient)"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="EDO"
              fill="url(#edoGradient)"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="coiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#0284c7" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="edoGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.7} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/** Custom legend with "Twoja wpłata" entry */
function CustomLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-400 mt-1">
      <span className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
        COI (4-letnie)
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        EDO (10-letnie)
      </span>
      <span className="flex items-center gap-1.5">
        <svg width="16" height="3" className="flex-shrink-0">
          <line x1="0" y1="1.5" x2="16" y2="1.5" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 2" />
        </svg>
        <span className="text-amber-400 font-semibold">Twoja wpłata</span>
      </span>
    </div>
  );
}

/** Custom styled tooltip for the chart */
function CustomTooltip({ active, payload, label, investedCapital }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-slate-800/95 backdrop-blur border border-slate-700 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-slate-300 font-semibold text-sm mb-2">{label}</p>
      {payload.map((entry) => {
        const profit = entry.value - (investedCapital || 0);
        return (
          <div key={entry.dataKey} className="mb-1.5 last:mb-0">
            <div className="flex items-center justify-between gap-6 text-sm">
              <span className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: entry.fill || entry.color }}
                />
                <span className="text-slate-400">
                  {entry.dataKey === "COI" ? "COI" : "EDO"}
                </span>
              </span>
              <span className="text-white font-semibold tabular-nums">
                {formatPLN(entry.value)}
              </span>
            </div>
            <div className="text-xs text-right tabular-nums mt-0.5">
              <span className={profit >= 0 ? "text-emerald-400" : "text-rose-400"}>
                {profit >= 0 ? "+" : ""}{formatPLN(profit)} zysku
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
