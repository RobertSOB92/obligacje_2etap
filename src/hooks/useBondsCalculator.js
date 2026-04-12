import { useMemo } from "react";
import {
  calculateCOI,
  calculateEDO,
  numberOfBonds,
  BOND_FACE_VALUE,
} from "../utils/bondsMath";

/**
 * Custom hook — runs both COI & EDO calculations and returns
 * derived comparison data ready for the UI layer.
 */
export function useBondsCalculator(amount, years, inflation) {
  return useMemo(() => {
    const bonds = numberOfBonds(amount);
    const investedCapital = bonds * BOND_FACE_VALUE;

    const coiBreakdown = calculateCOI(amount, years, inflation);
    const edoBreakdown = calculateEDO(amount, years, inflation);

    const coiFinal = coiBreakdown[coiBreakdown.length - 1];
    const edoFinal = edoBreakdown[edoBreakdown.length - 1];

    const winner =
      coiFinal.netPayout > edoFinal.netPayout
        ? "COI"
        : edoFinal.netPayout > coiFinal.netPayout
          ? "EDO"
          : "TIE";

    // Chart data — combines both breakdowns into a single array
    const chartData = [];
    for (let y = 0; y <= years; y++) {
      chartData.push({
        year: `Rok ${y}`,
        COI: Math.round(coiBreakdown[y].netPayout),
        EDO: Math.round(edoBreakdown[y].netPayout),
      });
    }

    return {
      investedCapital,
      bonds,
      coiBreakdown,
      edoBreakdown,
      coiFinal,
      edoFinal,
      winner,
      chartData,
    };
  }, [amount, years, inflation]);
}
