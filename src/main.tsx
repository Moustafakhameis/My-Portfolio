import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Suppress THREE.Clock deprecation warning from @react-three/fiber
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('THREE.Clock:')) return;
  originalWarn(...args);
};
import './index.css'
import App from './App.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
