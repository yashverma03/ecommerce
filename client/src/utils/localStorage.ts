/**
 * Retrieves data from the local storage and parses it into a JavaScript object.
 * @param {string} key - The key to retrieve the data under.
 * @returns {Record<string, any> | null} The retrieved data if found, otherwise null.
 */
export const getFromLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    const parsedData: Record<string, any> | null = JSON.parse(data ?? 'null');
    return parsedData;
  } catch (error) {
    console.error('Error in getData:', error);
    return null;
  }
};

/**
 * Converts the given value to a JSON string and stores it in the local storage.
 * @param {string} key - The key to store the data under.
 * @param {unknown} value - The value to be stored.
 */
export const setToLocalStorage = (key: string, value: unknown) => {
  try {
    const formattedValue = JSON.stringify(value);
    localStorage.setItem(key, formattedValue);
  } catch (error) {
    console.error('Error in setData:', error);
  }
};
