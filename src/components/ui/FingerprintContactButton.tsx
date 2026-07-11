import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, CheckCircle } from 'lucide-react';

export const FingerprintContactButton = () => {
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isScanned, setIsScanned] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  const HOLD_DURATION = 1000;
  const UPDATE_INTERVAL = 10;

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    if (isScanned) return;
    
    setIsPressing(true);
    setProgress(0);
    
    const startTime = Date.now();
    
    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
      setProgress(newProgress);
    }, UPDATE_INTERVAL);

    pressTimer.current = setTimeout(() => {
      completeScan();
    }, HOLD_DURATION);
  };

  const cancelPress = () => {
    if (isScanned) return;
    setIsPressing(false);
    setProgress(0);
    if (pressTimer.current) clearTimeout(pressTimer.current);
    if (progressInterval.current) clearInterval(progressInterval.current);
  };

  const completeScan = () => {
    setIsPressing(false);
    setIsScanned(true);
    if (pressTimer.current) clearTimeout(pressTimer.current);
    if (progressInterval.current) clearInterval(progressInterval.current);

    setTimeout(() => {
      downloadVCard();
    }, 1500); 
  };

  useEffect(() => {
    return () => {
      if (pressTimer.current) clearTimeout(pressTimer.current);
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const downloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Ali Emam;Mostafa;;;
FN:Mostafa Ali Emam
TITLE:Frontend Engineer & UI Designer
TEL;TYPE=CELL:+201129482206
EMAIL:moustafakhameis@gmail.com
ADR;TYPE=WORK:;;15 May;Cairo;;;Egypt
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Mostafa_Ali_Emam_Contact.vcf';
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show premium toast
    setShowToast(true);
    
    // Reset states after delay
    setTimeout(() => {
      setIsScanned(false);
      setProgress(0);
    }, 2000);

    // Hide toast after 4s
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <motion.div 
      className="relative flex items-center justify-center cursor-pointer select-none touch-none rounded-full w-16 h-16 group"
      onPointerDown={handlePointerDown}
      onPointerUp={cancelPress}
      onPointerLeave={cancelPress}
      onPointerCancel={cancelPress}
      title="Hold to save contact"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background container */}
      <div className="absolute inset-0 rounded-full bg-slate-500/5 group-hover:bg-slate-500/10 dark:bg-white/5 dark:group-hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm border border-slate-500/10 dark:border-white/5 group-hover:border-purple-500/30" />

      {/* Idle breathing glow */}
      {!isPressing && !isScanned && (
        <motion.div
          className="absolute inset-0 rounded-full border border-purple-500/20"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
            boxShadow: [
              '0 0 0px rgba(139, 92, 246, 0)', 
              '0 0 15px rgba(139, 92, 246, 0.3)', 
              '0 0 0px rgba(139, 92, 246, 0)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Background ring for progress */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none drop-shadow-md">
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="currentColor"
          className="text-slate-200 dark:text-white/10"
          strokeWidth="2"
        />
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke={isScanned ? "#22c55e" : "#8b5cf6"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="175.93"
          initial={{ strokeDashoffset: 175.93 }}
          animate={{ strokeDashoffset: 175.93 - (175.93 * progress) / 100 }}
          transition={{ ease: "linear", duration: 0.1 }}
          style={{ filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.6))' }}
        />
      </svg>

      {/* Ripple effect on press */}
      <AnimatePresence>
        {isPressing && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 bg-purple-500/40 blur-sm rounded-full pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative overflow-hidden w-12 h-12 flex items-center justify-center rounded-full">
        {/* Main Icon */}
        <Fingerprint 
          size={28} 
          className={`transition-all duration-300 ${
            isScanned 
              ? 'text-green-500 dark:text-green-400' 
              : isPressing 
                ? 'text-purple-500 dark:text-purple-400 scale-110' 
                : 'text-slate-400 group-hover:text-purple-500 dark:text-white/50 dark:group-hover:text-purple-300'
          }`}
          style={{
            filter: isScanned 
              ? 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.8))' 
              : isPressing || progress > 0
                ? 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))'
                : 'none'
          }}
        />

        {/* Scanning Sweep Line */}
        <AnimatePresence>
          {isScanned && (
            <motion.div
              initial={{ top: '-10%', opacity: 0 }}
              animate={{ top: ['-10%', '110%', '-10%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.1, 0.9, 1] }}
              className="absolute left-0 right-0 h-[3px] w-full bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_12px_3px_rgba(34,197,94,0.8)]"
            />
          )}
        </AnimatePresence>
      </div>
      
      {/* Glow aura when scanned */}
      <AnimatePresence>
        {isScanned && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-green-500/10 blur-xl rounded-full pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Premium Toast Notification */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 0.8 
              }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex items-start gap-4 px-5 py-4 rounded-2xl bg-[#110c1f]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(124,58,237,0.15)] w-max max-w-[90vw]"
            >
              <div className="relative flex-shrink-0 mt-0.5">
                <div className="absolute inset-0 bg-green-500/30 blur-md rounded-full animate-pulse" />
                <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-green-500/20 border border-green-500/30">
                  <CheckCircle className="text-green-400" size={18} strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex flex-col text-left gap-0.5">
                <span className="text-gray-100 font-semibold text-sm tracking-wide whitespace-nowrap">Contact Saved</span>
                <span className="text-gray-400 text-[13px] whitespace-nowrap">vCard downloaded successfully</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
};

export default FingerprintContactButton;
