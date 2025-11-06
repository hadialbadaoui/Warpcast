// src/utils/format.ts

/**
 * Formats a number with commas as thousands separators.
 * E.g., 1234567 → "1,234,567"
 */
export function formatNumberWithCommas(value: number): string {
  return value.toLocaleString("en-US");
}

/**
 * Formats a Date (or date string / timestamp) into a human-readable format.
 * E.g., new Date() → "September 10, 2025"
 */
export function formatDateHuman(dateInput: Date | string | number): string {
  const date = typeof dateInput === "string" || typeof dateInput === "number"
    ? new Date(dateInput)
    : dateInput;

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

/**
 * Capitalizes the first letter of a string (if non-empty).
 * E.g., "challenge me" → "Challenge me"
 */
export function capitalize(input: string): string {
  if (!input) return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}
