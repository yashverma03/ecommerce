export const getFromLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    const parsedData = JSON.parse(data ?? 'null');
    return parsedData;
  } catch (error) {
    console.error('Error in getData:', error);
    return null;
  }
};

export const setToLocalStorage = (key: string, value: unknown) => {
  try {
    const formattedValue = JSON.stringify(value);
    localStorage.setItem(key, formattedValue);
  } catch (error) {
    console.error('Error in setData:', error);
  }
};
