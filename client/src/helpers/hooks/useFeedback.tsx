import { useEffect, useState } from 'react';

/**
 * A custom React hook to manage feedback visibility based on a timer.
 * @param {boolean} dependency - The dependency that triggers the timer reset.
 * @param {number} duration - The duration in milliseconds for which the feedback message should be visible. Default is 3000ms.
 * @returns {boolean} isVisible - A boolean indicating the visibility of the feedback message.
 */
const useFeedback = (dependency: boolean, duration = 3000) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [dependency]);

  return isVisible;
};

export default useFeedback;
