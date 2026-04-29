import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  Bug, 
  RefreshCw, 
  FileText, 
  CheckCircle2,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Scanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scannedItems, setScannedItems] = useState<string[]>([]);
  const [threats, setThreats] = useState<any[]>([]);
  const [scanComplete, setScanComplete] = useState(false);

  const filesToScan = [
    '/system/lib/kernel.so',
    '/usr/bin/security_core',
    '/data/app/bank_app_v2.apk',
    '/sys/kernel/debug/tracing',
    '/etc/hosts',
    '/home/user/downloads/unknown_script.py',
    '/system/framework/framework-res.apk',
    '/data/user/0/com.android.settings',
    '/proc/sys/net/ipv4/ip_forward',
    '/sys/fs/selinux/policy',
  ];

  const startScan = () => {
    setIsScanning(true);
    setProgress(0);
    setScannedItems([]);
    setThreats([]);
    setScanComplete(false);

    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      const progressValue = (count / filesToScan.length) * 100;
      setProgress(progressValue);
      setScannedItems(prev => [filesToScan[count - 1], ...prev.slice(0, 4)]);

      // Randomly find "threats" for demonstration
      if (Math.random() > 0.85) {
        setThreats(prev => [...prev, {
          file: filesToScan[count - 1],
          type: 'Malicious Signature',
          severity: 'High'
        }]);
      }

      if (count >= filesToScan.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          setScanComplete(true);
        }, 1000);
      }
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <section className="flex items-center justify-between border-b border-[#333] pb-3">
        <div>
          <h1 className="text-xl font-black italic tracking-tighter text-white uppercase">Threat Scanner</h1>
          <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-1">HEURISTIC_ENGINE_V4 // SIGNATURE_SCAN_ACTIVE</p>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-4">
        {/* Scanner Visual */}
        <div className="col-span-12 lg:col-span-7 bg-[#0d0d0d] border border-cyan-900/30 p-6 flex flex-col items-center justify-center min-h-[400px] relative">
          <div className="absolute top-4 left-4 p-2 border border-[#222] bg-black/50 text-[9px] font-mono text-cyan-500 z-10">
            <p>STATUS: {isScanning ? 'RUNNING' : scanComplete ? 'FINISHED' : 'IDLE'}</p>
            <p>FILES: {progress}%</p>
          </div>
          
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="relative mb-8">
              <div className={`w-40 h-40 rounded-full border-[10px] ${isScanning ? 'border-cyan-500/20' : 'border-[#1a1a1a]'} flex items-center justify-center p-4 transition-colors`}>
                <div className="w-full h-full rounded-full border-2 border-cyan-500/10 flex items-center justify-center bg-black relative overflow-hidden">
                  {isScanning && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent"
                      animate={{ top: ['100%', '-100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  {scanComplete ? (
                    <ShieldCheck className="w-12 h-12 text-cyan-400 cyan-glow" />
                  ) : (
                    <Search className={`w-12 h-12 ${isScanning ? 'text-cyan-400 animate-pulse' : 'text-gray-700'}`} />
                  )}
                </div>
              </div>
            </div>

            <div className="w-full max-w-xs space-y-4 text-center">
              {isScanning && (
                <div className="space-y-1">
                  <div className="h-1 w-full bg-[#151515]">
                    <motion.div 
                      className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                    <span>PROGRESS: {Math.round(progress)}%</span>
                  </div>
                </div>
              )}

              {!isScanning && (
                <button
                  onClick={startScan}
                  className="w-full py-2 bg-cyan-600 text-black font-black uppercase text-[10px] tracking-widest hover:bg-cyan-500 transition-all border border-cyan-400"
                >
                  INITIALIZE SYSTEM SCAN
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Scan Log & Results */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#0d0d0d] border border-[#222] p-4 flex-grow max-h-48 overflow-hidden">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 border-b border-[#222] pb-1">Activity Log</h3>
            <div className="space-y-1 font-mono text-[9px]">
              <AnimatePresence initial={false}>
                {scannedItems.map((item, i) => (
                  <motion.div
                    key={`${item}-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-between p-1 bg-[#151515] border-l border-cyan-500"
                  >
                    <span className="text-gray-400 truncate max-w-[150px]">{item}</span>
                    <span className="text-cyan-500">SYNC</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-[#0d0d0d] border border-[#222] p-4 flex-grow">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 border-b border-[#222] pb-1">Identified Threats</h3>
            <div className="space-y-1">
              {threats.length > 0 ? (
                threats.map((threat, i) => (
                  <div key={i} className="p-2 bg-[#1a0f0f] border-l-2 border-red-500 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-red-400 uppercase tracking-tight">{threat.file.split('/').pop()}</div>
                      <div className="text-[8px] text-gray-500 font-mono mt-0.5">{threat.type}</div>
                    </div>
                    <button className="text-[8px] font-bold uppercase text-red-500 border border-red-500 px-1 py-0.5">PURGE</button>
                  </div>
                ))
              ) : (
                <div className="h-20 flex flex-col items-center justify-center text-center opacity-40 italic text-[10px]">
                  {scanComplete ? 'DATABASE CLEAR' : 'SCAN_PENDING'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .bg-radial-gradient {
          background: radial-gradient(circle at center, var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}} />
    </div>
  );
}

function Activity({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
