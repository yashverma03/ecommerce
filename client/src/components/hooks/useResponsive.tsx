import { useState, useEffect } from 'react';

/**
 * A custom React hook to track viewport width and determine whether it's below specified breakpoints.
 * @param {number[]} breakpoints - An array of breakpoint values.
 * @returns {boolean[]} An array of boolean values indicating whether the viewport width is below each breakpoint.
 * @example
 * const ResponsiveComponent = () => {
 *   // Define the breakpoints you want to track
 *   const breakpoints = [300, 600];
 *
 *   // Call the useResponsive hook, passing the array of breakpoints
 *   const [isMobile, isTablet] = useResponsive(breakpoints);
 *
 *   // Conditional rendering based on viewport width
 *   if (isMobile) {
 *     return <div>Show mobile content here</div>;
 *   } else if (isTablet) {
 *     return <div>Show tablet content here</div>;
 *   } else {
 *     // Display content for desktop view
 *     return <div>Show desktop content here</div>;
 *   }
 * }
 */
const useResponsive = (breakpoints: number[]) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isBelowBreakpoints = breakpoints.map((breakpoint) => windowWidth < breakpoint);
  return isBelowBreakpoints;
};

export default useResponsive;
