import { Info } from "lucide-react";
import { useState } from "react";

/**
 * Reusable range slider with label, value display, and optional tooltip.
 */
export default function SliderInput({
  id,
  label,
  tooltip,
  value,
  onChange,
  min,
  max,
  step,
  formatValue,
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor={id}
          className="text-slate-300 font-medium text-sm sm:text-base flex items-center gap-2"
        >
          {label}
          {tooltip && (
            <span
              className="tooltip-trigger relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip((v) => !v)}
            >
              <Info size={16} className="text-slate-500 hover:text-sky-400 transition-colors" />
              {showTooltip && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 text-xs text-slate-200 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 leading-relaxed">
                  {tooltip}
                </span>
              )}
            </span>
          )}
        </label>
        <span className="text-sky-400 font-bold text-lg tabular-nums">
          {formatValue ? formatValue(value) : value}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-slate-500 mt-1">
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
    </div>
  );
}
