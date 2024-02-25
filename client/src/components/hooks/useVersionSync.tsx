import { useEffect } from 'react';

const useVersionSync = () => {
  const versionKey = 'versionId';
  const currentVersion = '1.0';

  useEffect(() => {
    const savedVersion = localStorage.getItem(versionKey);

    if (currentVersion !== savedVersion) {
      localStorage.clear();
      localStorage.setItem(versionKey, currentVersion);
    }
  }, []);
};

export default useVersionSync;
