import limitDecimals from './limitDecimals';



export type FormatNumberSettings = {
  decimals?: number | string;
  thousand?: string;
  decimal?: string;
}



const defaultSettings: FormatNumberSettings = {
  decimals: 2,
  thousand: '.',
  decimal: ','
};



/**
 * Formats a number with defined thousand and decimal separator, and a decimal limit
 * (see `limitDecimals` for details on `decCount`)
 *
 * @param num - Number to format
 * @param settings - Settings for the number formatting
 *
 * @returns Formatted number as a string
 *
 * @example
 * ```ts
 * // Default format
 * formatNumber(123456); // -> 123.456,00
 *
 * // Custom format
 * formatNumber(123456, { decimals: '>3', thousand: '-', decimal: ':' }); // -> 123-456:000
 * ```
 */
export default function formatNumber(num: number, settings?: FormatNumberSettings): string {
  const { decimals, thousand, decimal } = { ...defaultSettings, ...settings };

  // Format the number to the desired number of decimals and split.
  const parts = limitDecimals(num, decimals).split('.');

  // Insert separator
  parts[0] = parts[0].replace(/(\d)(?=(\d{3})+$)/g, `$1${thousand}`);

  // Join with decimal delimiter
  return parts.join(decimal);
}
