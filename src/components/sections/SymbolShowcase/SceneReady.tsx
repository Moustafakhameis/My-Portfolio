import { useEffect } from 'react';

export function SceneReady({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    // Wait a brief moment after mounting to ensure the first frame renders
    const timer = setTimeout(onReady, 100);
    return () => clearTimeout(timer);
  }, [onReady]);
  return null;
}
