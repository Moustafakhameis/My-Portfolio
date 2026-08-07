import { useState, useEffect } from 'react';

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if the device supports touch points (handles both iOS and Android)
    const checkTouch = () => {
      return (
        typeof window !== 'undefined' && 
        ('ontouchstart' in window || navigator.maxTouchPoints > 0)
      );
    };
    
    setIsTouch(checkTouch());
    
    // Optional: add resize listener in case a device changes state (uncommon but safe)
    const handleResize = () => setIsTouch(checkTouch());
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isTouch;
}
