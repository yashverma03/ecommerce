import { useEffect, useState } from 'react';

/**
 * A custom React hook to manage feedback visibility based on a timer.
 * @param {unknown[]} dependencies - The dependencies that trigger the timer reset.
 * @param {number} duration - The duration in milliseconds for which the feedback message should be visible. Default is 3000ms.
 * @returns {boolean} isVisible - A boolean indicating the visibility of the feedback message.
 */
const useFeedback = (dependencies: unknown[], duration = 3000) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, dependencies);

  return isVisible;
};

export default useFeedback;
