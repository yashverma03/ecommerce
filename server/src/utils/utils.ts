/**
 * Parses a string value to an integer, returning a default value if the parsing fails or if the value is undefined or null.
 * @param {string | undefined | null} value - The string value to be parsed to an integer.
 * @param {number} defaultValue - The default value to be returned if the parsing fails or if the value is undefined or null.
 * @returns {number} The parsed integer value or the default value if parsing fails or if the value is undefined or null.
 */
export const getFormattedNumber = (value: string | undefined | null, defaultValue: number) => {
  if (value == null) {
    return defaultValue;
  }
  const parsedValue = parseInt(value);
  if (isNaN(parsedValue) || value.trim() === '') {
    return defaultValue;
  }
  return parsedValue;
};
