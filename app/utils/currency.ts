interface FormatPriceOptions {
  currency?: string; // default 'Rp.'
  shorthand?: boolean; // default false
  decimalPlaces?: number; // default 1 untuk shorthand
}

export function formatPrice(
  value: number,
  {
    currency = "Rp.",
    shorthand = false,
    decimalPlaces = 1,
  }: FormatPriceOptions = {}
): string {
  if (shorthand) {
    const absValue = Math.abs(value);
    let formatted: string;

    if (absValue >= 1_000_000_000) {
      formatted = (value / 1_000_000_000).toFixed(decimalPlaces) + "B";
    } else if (absValue >= 1_000_000) {
      formatted = (value / 1_000_000).toFixed(decimalPlaces) + "M";
    } else if (absValue >= 1_000) {
      formatted = (value / 1_000).toFixed(decimalPlaces) + "K";
    } else {
      formatted = value.toString();
    }

    return currency + formatted;
  } else {
    // format biasa dengan titik ribuan
    return currency + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}

export function limitText(text: string, limit: number = 30): string {
  if (!text) return "";
  if (text.length <= limit) return text;
  return text.slice(0, limit) + "...";
}
