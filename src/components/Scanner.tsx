import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  Bug, 
  RefreshCw, 
  FileText, 
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TOTAL_FILES = 24592;

const directories = [
  '/system/bin/', '/usr/local/lib/', '/var/log/', 
  '/data/apps/com.vendor.', '/sys/kernel/debug/',
  '/etc/security/', '/opt/malware_scanner/signatures/',
  '/home/user/.config/'
];
const extensions = ['.o', '.so', '.tmp', '.log', '.dex', '.apk', '.cfg', '.conf', '.bin'];

const randomFile = () => {
    return directories[Math.floor(Math.random() * directories.length)] + 
        Math.random().toString(36).substring(2, 10) + 
        extensions[Math.floor(Math.random() * extensions.length)];
};

export default function Scanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filesScanned, setFilesScanned] = useState(0);
  const [currentFile, setCurrentFile] = useState('');
  const [scannedItems, setScannedItems] = useState<string[]>([]);
  const [threats, setThreats] = useState<any[]>([]);
  const [scanComplete, setScanComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0); // in seconds

  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScan = () => {
    setIsScanning(true);
    setProgress(0);
    setFilesScanned(0);
    setScannedItems([]);
    setThreats([]);
    setScanComplete(false);
    
    const duration = 12000; // 12 seconds for the demo scan
    const startTime = Date.now();
    setTimeRemaining(Math.ceil(duration / 1000));

    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);

    scanIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      let newProgress = (elapsed / duration) * 100;
      if (newProgress > 100) newProgress = 100;

      const newFilesScanned = Math.floor((newProgress / 100) * TOTAL_FILES);
      
      setProgress(newProgress);
      setFilesScanned(newFilesScanned);
      
      const newFile = randomFile();
      setCurrentFile(newFile);
      
      // Update activity log
      setScannedItems(prev => [newFile, ...prev].slice(0, 6));

      const remainingSeconds = Math.max(0, Math.ceil((duration - elapsed) / 1000));
      setTimeRemaining(remainingSeconds);

      // Randomly find threats
      if (Math.random() > 0.98 && threats.length < 5 && newProgress > 10 && newProgress < 90) {
        setThreats(prev => [...prev, {
          file: newFile,
          type: ['MALWARE_SIGNATURE', 'TROJAN_GENERIC', 'ROOTKIT_HIDDEN', 'ANOMALOUS_BEHAVIOR'][Math.floor(Math.random() * 4)],
          severity: ['High', 'Critical'][Math.floor(Math.random() * 2)]
        }]);
      }

      if (newProgress >= 100) {
        if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
        setIsScanning(false);
        setScanComplete(true);
        setCurrentFile('');
      }
    }, 50); // High frequency interval for visual effect
  };

  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    };
  }, []);

  return (
    <div className="space-y-6 max-w-5xl">
      <section className="flex items-center justify-between border-b border-[#333] pb-3">
        <div>
          <h1 className="text-xl font-black italic tracking-tighter text-white uppercase cyan-glow">Threat Scanner</h1>
          <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-1">HEURISTIC_ENGINE_V4 // DEEP_SCAN_PROTOCOL</p>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-4">
        {/* Scanner Visual */}
        <div className="col-span-12 lg:col-span-7 bg-[#0d0d0d] border border-cyan-900/30 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
          
          {/* Status Overlay */}
          <div className="absolute top-4 left-4 p-3 border border-[#222] bg-black/80 backdrop-blur-sm text-[9px] font-mono text-cyan-500 z-20 flex flex-col gap-1.5 w-56">
            <div className="flex justify-between items-center border-b border-[#222] pb-1.5 mb-1">
              <span className="text-gray-500 font-bold tracking-widest">SYSTEM_STATE</span>
              <span className={`font-bold ${isScanning ? 'text-cyan-400 animate-pulse' : scanComplete ? 'text-gray-400' : 'text-gray-400'}`}>
                {isScanning ? 'ANALYZING' : scanComplete ? 'FINISHED' : 'STANDBY'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">FILES_SCANNED</span>
              <span className="text-white">{filesScanned.toLocaleString()} / {TOTAL_FILES.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">THREATS_FOUND</span>
              <span className={`font-bold ${threats.length > 0 ? "text-red-500 animate-pulse" : "text-white"}`}>
                {threats.length}
              </span>
            </div>
            {isScanning && (
              <div className="flex justify-between items-center mt-1 border-t border-[#222] pt-1.5">
                <span className="text-gray-500">ETA</span>
                <span className="text-white font-bold">00:{timeRemaining.toString().padStart(2, '0')}s</span>
              </div>
            )}
          </div>
          
          <div className="relative z-10 w-full flex flex-col items-center mt-8">
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
                  {scanComplete && threats.length === 0 ? (
                    <ShieldCheck className="w-12 h-12 text-cyan-400 cyan-glow" />
                  ) : scanComplete && threats.length > 0 ? (
                     <ShieldAlert className="w-12 h-12 text-red-500 animate-pulse" />
                  ) : (
                    <Search className={`w-12 h-12 ${isScanning ? 'text-cyan-400 animate-pulse' : 'text-gray-700'}`} />
                  )}
                </div>
              </div>
            </div>

            <div className="w-full max-w-xs space-y-4 text-center z-20">
              {isScanning && (
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-[#151515] border border-[#222]">
                    <motion.div 
                      className={`h-full ${threats.length > 0 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-1">
                    <span>PROGRESS</span>
                    <span>{progress.toFixed(1)}%</span>
                  </div>
                </div>
              )}

              {!isScanning && (
                <button
                  onClick={startScan}
                  className="w-full py-2 bg-cyan-600 text-black font-black uppercase text-[10px] tracking-widest hover:bg-cyan-500 transition-all border border-cyan-400"
                >
                  {scanComplete ? 'RE-INITIALIZE SCAN' : 'INITIALIZE SYSTEM SCAN'}
                </button>
              )}
            </div>
          </div>
          
          {/* Current File Activity */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 border-t border-[#222] backdrop-blur-md">
            <div className="flex items-center gap-2 text-[9px] font-mono">
              <Activity className={`w-3 h-3 ${isScanning ? 'text-cyan-400 animate-pulse' : 'text-gray-600'}`} />
              <span className="text-gray-500 tracking-widest">ACTIVE_TARGET:</span>
              <span className="text-cyan-400 truncate flex-1">{isScanning ? currentFile : 'AWAITING_INSTRUCTION...'}</span>
            </div>
          </div>
        </div>

        {/* Scan Log & Results */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#0d0d0d] border border-[#222] p-4 flex-grow min-h-[180px] overflow-hidden">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 border-b border-[#222] pb-1 flex items-center justify-between">
              <span>Activity Log</span>
              {isScanning && <span className="text-cyan-500 animate-pulse">● LIVE</span>}
            </h3>
            <div className="space-y-1 font-mono text-[9px]">
              <AnimatePresence initial={false}>
                {scannedItems.map((item, i) => (
                  <motion.div
                    key={`${item}-${i}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-between p-1 bg-[#151515] border-l-2 border-cyan-500/50"
                  >
                    <span className="text-gray-400 truncate max-w-[200px]">{item}</span>
                    <span className="text-cyan-600">OK</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-[#0d0d0d] border border-[#222] p-4 flex-grow">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 border-b border-[#222] pb-1">Identified Threats</h3>
            <div className="space-y-2">
              {threats.length > 0 ? (
                threats.map((threat, i) => (
                  <div key={i} className="p-2 bg-[#1a0f0f] border border-red-900/30 border-l-2 border-l-red-500 flex items-center justify-between">
                    <div className="min-w-0 pr-2">
                      <div className="text-[10px] font-bold text-red-500 uppercase tracking-tight truncate">{threat.file.split('/').pop()}</div>
                      <div className="flex gap-2 items-center mt-1">
                        <span className="text-[8px] bg-red-900/20 text-red-400 px-1 py-0.5 font-mono">{threat.type}</span>
                        <span className="text-[8px] text-gray-500 font-bold">{threat.severity.toUpperCase()}</span>
                      </div>
                    </div>
                    <button className="text-[8px] font-bold uppercase text-red-500 hover:bg-red-950 transition-colors border border-red-500/50 px-2 py-1 whitespace-nowrap">
                      PURGE
                    </button>
                  </div>
                ))
              ) : (
                <div className="h-20 flex flex-col items-center justify-center text-center opacity-40 italic text-[10px] font-mono">
                  {scanComplete ? 'SYSTEM SECURE - 0 THREATS' : 'NO THREATS DETECTED'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

