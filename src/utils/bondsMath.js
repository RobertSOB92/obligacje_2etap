/**
 * bondsMath.js
 * Pure business-logic helpers for Polish treasury bonds (COI & EDO).
 * Every function is stateless and unit-testable.
 */

// ─── Constants ────────────────────────────────────────────────────────
export const BOND_FACE_VALUE = 100; // PLN per bond
export const TAX_RATE = 0.19; // 19% "Belka" tax

export const COI = {
  name: "COI",
  fullName: "COI – 4-letnie",
  cycleLengthYears: 4,
  margin: 0.015, // 1.5%
  earlyRedemptionFeePerBond: 0.70, // PLN
  firstYearRate: 0.0575, // 5.75%
};

export const EDO = {
  name: "EDO",
  fullName: "EDO – 10-letnie",
  cycleLengthYears: 10,
  margin: 0.02, // 2.0%
  earlyRedemptionFeePerBond: 2.0, // PLN
  firstYearRate: 0.0625, // 6.25%
};

// ─── Helpers ──────────────────────────────────────────────────────────

/** Number of bonds for a given investment amount */
export const numberOfBonds = (amount) =>
  Math.floor(amount / BOND_FACE_VALUE);

/** Annual interest rate = max(0, inflation) + margin (deflation floor per emission rules) */
export const annualRate = (inflation, margin) => Math.max(0, inflation) + margin;

/**
 * Calculate the Belka tax on a given gross profit.
 * Always rounds down (floor) to full grosze — in practice
 * the tax office rounds to full zloty but we keep precision.
 */
export const belkaTax = (grossProfit) =>
  grossProfit > 0 ? Math.floor(grossProfit * TAX_RATE * 100) / 100 : 0;

/**
 * Early redemption fee — protected: fee is deducted ONLY from accrued interest.
 * If interest < fee, investor gets 100% of capital back (fee capped at interest).
 */
export const effectiveEarlyFee = (totalInterest, feePerBond, bonds) => {
  const rawFee = feePerBond * bonds;
  return Math.min(rawFee, Math.max(totalInterest, 0));
};

/** Check whether a given year is at the end of a full cycle */
export const isFullCycleEnd = (year, cycleLength) =>
  year > 0 && year % cycleLength === 0;

// ─── COI Calculation (annual payout, no compounding, with rolling) ───

/**
 * COI — simple interest, yearly payout.
 * If investment horizon > 4 years, we "roll" — redeem after 4y, pay tax,
 * reinvest the capital (no early fee at cycle end), and continue.
 *
 * Returns a year-by-year breakdown array [year 0 … year N].
 */
export function calculateCOI(amount, years, inflation) {
  const bonds = numberOfBonds(amount);
  const capital = bonds * BOND_FACE_VALUE;

  const breakdown = [
    {
      year: 0,
      capital,
      cumulativeInterest: 0,
      earlyFee: 0,
      tax: 0,
      netPayout: capital,
    },
  ];

  let currentCapital = capital;
  let cycleInterest = 0; // interest accumulated within current 4-year cycle
  let totalPaidOutInterest = 0;
  let totalPaidTax = 0;

  for (let y = 1; y <= years; y++) {
    const cycleYear = ((y - 1) % COI.cycleLengthYears) + 1;
    const currentRate = cycleYear === 1 ? COI.firstYearRate : annualRate(inflation, COI.margin);
    
    const yearlyInterest = currentCapital * currentRate;
    cycleInterest += yearlyInterest;

    const isCycleEnd = isFullCycleEnd(y, COI.cycleLengthYears);

    if (isCycleEnd) {
      // At cycle end: pay tax on cycle interest, no early fee
      const tax = belkaTax(cycleInterest);
      totalPaidOutInterest += cycleInterest;
      totalPaidTax += tax;

      // For rolling: reinvest capital (interest was paid out yearly conceptually,
      // but tax is settled at cycle end)
      const netFromCycle = cycleInterest - tax;

      breakdown.push({
        year: y,
        capital: currentCapital,
        cumulativeInterest: totalPaidOutInterest,
        earlyFee: 0,
        tax: totalPaidTax,
        netPayout: currentCapital + totalPaidOutInterest - totalPaidTax,
      });

      // Reset for next cycle
      cycleInterest = 0;
    } else {
      // Mid-cycle exit scenario — calculate what you'd get if you left NOW
      const currentBonds = numberOfBonds(currentCapital);
      const rawFee = COI.earlyRedemptionFeePerBond * currentBonds;
      const fee = effectiveEarlyFee(cycleInterest, COI.earlyRedemptionFeePerBond, currentBonds);
      const profitAfterFee = cycleInterest - fee;
      const tax = belkaTax(profitAfterFee);

      breakdown.push({
        year: y,
        capital: currentCapital,
        cumulativeInterest: totalPaidOutInterest + cycleInterest,
        earlyFee: fee,
        tax: totalPaidTax + tax,
        netPayout:
          currentCapital +
          totalPaidOutInterest +
          cycleInterest -
          fee -
          totalPaidTax -
          tax,
      });
    }
  }

  return breakdown;
}

// ─── EDO Calculation (annual compounding, 10-year cycle) ─────────────

/**
 * EDO — compound interest (interest added to principal each year).
 * Cycle = 10 years. Early exit incurs per-bond fee, capped at accrued interest.
 *
 * Returns a year-by-year breakdown array [year 0 … year N].
 */
export function calculateEDO(amount, years, inflation) {
  const bonds = numberOfBonds(amount);
  const capital = bonds * BOND_FACE_VALUE;

  const breakdown = [
    {
      year: 0,
      capital,
      accumulatedValue: capital,
      totalInterest: 0,
      earlyFee: 0,
      tax: 0,
      netPayout: capital,
    },
  ];

  let accumulatedValue = capital;

  for (let y = 1; y <= years; y++) {
    const cycleYear = ((y - 1) % EDO.cycleLengthYears) + 1;
    const currentRate = cycleYear === 1 ? EDO.firstYearRate : annualRate(inflation, EDO.margin);
    
    const yearlyInterest = accumulatedValue * currentRate;
    accumulatedValue += yearlyInterest;
    const totalInterest = accumulatedValue - capital;

    const isCycleEnd = isFullCycleEnd(y, EDO.cycleLengthYears);

    if (isCycleEnd) {
      const tax = belkaTax(totalInterest);
      breakdown.push({
        year: y,
        capital,
        accumulatedValue,
        totalInterest,
        earlyFee: 0,
        tax,
        netPayout: accumulatedValue - tax,
      });
    } else {
      const fee = effectiveEarlyFee(totalInterest, EDO.earlyRedemptionFeePerBond, bonds);
      const profitAfterFee = totalInterest - fee;
      const tax = belkaTax(profitAfterFee);

      breakdown.push({
        year: y,
        capital,
        accumulatedValue,
        totalInterest,
        earlyFee: fee,
        tax,
        netPayout: accumulatedValue - fee - tax,
      });
    }
  }

  return breakdown;
}

// ─── Format helpers ──────────────────────────────────────────────────

export const formatPLN = (value) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export const formatPercent = (value) =>
  `${(value * 100).toFixed(1)}%`;
