import { formatPLN } from "../utils/bondsMath";

/**
 * Amount input — large, centered number field with stepper controls.
 */
export default function AmountInput({ value, onChange }) {
  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    if (raw === "") {
      onChange(0);
      return;
    }
    const num = parseInt(raw, 10);
    if (!isNaN(num) && num >= 0) {
      // Allow exact value while typing so the user can actually construct a number
      onChange(Math.min(num, 10_000_000));
    }
  };

  const adjust = (delta) => {
    const next = Math.max(100, Math.min(10_000_000, value + delta));
    onChange(next);
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="amount-input"
        className="block text-slate-300 font-medium text-sm sm:text-base mb-2"
      >
        💰 Ile pieniędzy chcesz ulokować?
      </label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => adjust(-10_000)}
          className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xl font-bold
                     hover:bg-slate-700 hover:border-sky-500/30 active:scale-95 transition-all flex items-center justify-center"
          aria-label="Zmniejsz o 10 000 zł"
        >
          −
        </button>
        <input
          id="amount-input"
          type="text"
          inputMode="numeric"
          value={value.toLocaleString("pl-PL")}
          onChange={handleChange}
          className="input-amount flex-1"
        />
        <button
          type="button"
          onClick={() => adjust(10_000)}
          className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xl font-bold
                     hover:bg-slate-700 hover:border-sky-500/30 active:scale-95 transition-all flex items-center justify-center"
          aria-label="Zwiększ o 10 000 zł"
        >
          +
        </button>
      </div>
      <p className="text-xs text-slate-500 mt-2 text-center">
        Minimalna kwota: 100 zł (1 obligacja) • Krok: 100 zł
      </p>
    </div>
  );
}
