import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Suppress THREE.Clock deprecation warning from @react-three/fiber
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('THREE.Clock:')) return;
  originalWarn(...args);
};
// Suppress annoying browser extension errors (like AdGuard) that clutter the console
const originalError = console.error;
console.error = (...args) => {
  if (args[0] && typeof args[0] === 'string' && (
    args[0].includes('The message port closed before a response was received') ||
    args[0].includes('A listener indicated an asynchronous response') ||
    args[0].includes('AG js')
  )) return;
  originalError(...args);
};

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && typeof event.reason.message === 'string' && (
    event.reason.message.includes('The message port closed before a response was received') ||
    event.reason.message.includes('A listener indicated an asynchronous response') ||
    event.reason.message.includes('AG js')
  )) {
    event.preventDefault(); // Prevents the error from showing up in red in the console
  }
});

import './index.css'
import App from './App.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
