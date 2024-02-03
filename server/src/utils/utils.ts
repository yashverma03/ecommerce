export const getFormattedNumber = (value: string | undefined | null, defaultValue: number) => {
  if (value === undefined || value === null) {
    return defaultValue;
  }

  const parsedValue = parseInt(value);

  if (isNaN(parsedValue) || value.trim() === '') {
    return defaultValue;
  }

  return parsedValue;
};
