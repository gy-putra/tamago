/**
 * Format a number value to Indonesian Rupiah (IDR) currency format
 * @param value - The numeric value to format
 * @returns Formatted currency string (e.g., "Rp 350.000")
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

/**
 * Parse a currency string back to a number (for forms/calculations)
 * @param currencyString - Formatted currency string
 * @returns Numeric value
 */
export function parseCurrency(currencyString: string): number {
  // Remove currency symbols and convert back to number
  const numericString = currencyString.replace(/[^\d]/g, "");
  return parseInt(numericString, 10) || 0;
}