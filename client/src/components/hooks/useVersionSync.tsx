import { useEffect } from 'react';

/**
 * Custom React hook for version synchronization.
 * This hook checks if the current version matches the version stored in local storage.
 * If not, it clears the local storage and updates the stored version.
 */
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
