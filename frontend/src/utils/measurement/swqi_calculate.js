export function calculateSWQI({ temperature, bod, tss, doVal, conductivity }) {
  const ITEMP = parseFloat(temperature);
  const IBOD = parseFloat(bod);
  const ITSS = parseFloat(tss);
  const IDO = parseFloat(doVal);
  const ICOND = parseFloat(conductivity);

  if ([ITEMP, IBOD, ITSS, IDO, ICOND].some(v => isNaN(v))) return 0;
  return ITEMP * (IBOD + ITSS + IDO + ICOND);
}