import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Terminal, X } from 'lucide-react';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

const MOCK_THREATS = [
  { title: "ZERO-DAY EXPLOIT DETECTED", message: "Unauthorized memory access attempt in Node.js process." },
  { title: "DDoS ATTACK IN PROGRESS", message: "Volume threshold exceeded on Port 443." },
  { title: "UNAUTHORIZED LOGIN", message: "Multiple failed root login attempts from IP 192.168.1.104." },
  { title: "DATA EXFILTRATION", message: "Anomalous outbound traffic pattern on DB port." },
  { title: "MALWARE SIGNATURE MATCH", message: "Trace signature matches known ransomware strain." }
];

export default function AlertManager() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Simulate real-time alerts from Threat Intelligence module
    const triggerRandomAlert = () => {
      const isCritical = Math.random() > 0.5;
      const mockThreat = MOCK_THREATS[Math.floor(Math.random() * MOCK_THREATS.length)];
      
      const newAlert: Alert = {
        id: Math.random().toString(36).substr(2, 9),
        type: isCritical ? 'critical' : 'warning',
        title: isCritical ? mockThreat.title : "ANOMALY DETECTED",
        message: mockThreat.message,
        timestamp: new Date()
      };

      setAlerts(prev => [newAlert, ...prev].slice(0, 5)); // Keep only recent 5
      
      // Auto-dismiss after 8 seconds
      setTimeout(() => {
        setAlerts(prev => prev.filter(a => a.id !== newAlert.id));
      }, 8000);
    };

    // Trigger initial alert after a short delay
    const initialTimer = setTimeout(triggerRandomAlert, 5000);
    
    // Then trigger periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.6) { // 40% chance every 10 seconds
        triggerRandomAlert();
      }
    }, 10000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none p-4 lg:p-0">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className={`pointer-events-auto flex items-start gap-3 p-3 border backdrop-blur-md shadow-2xl ${
              alert.type === 'critical' ? 'bg-red-950/90 border-red-500/50' : 'bg-orange-950/90 border-orange-500/50'
            }`}
          >
            <div className={`mt-0.5 ${alert.type === 'critical' ? 'text-red-500 animate-pulse' : 'text-orange-500'}`}>
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${alert.type === 'critical' ? 'text-red-400' : 'text-orange-400'}`}>
                  {alert.type === 'critical' ? 'CRITICAL THREAT' : 'SYSTEM WARNING'}
                </span>
                <span className="text-[9px] text-gray-500 font-mono">
                  {alert.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white uppercase italic tracking-tight truncate leading-tight mb-1">
                {alert.title}
              </h4>
              <p className="text-[10px] text-gray-300 font-mono leading-tight">
                {alert.message}
              </p>
            </div>
            <button 
              onClick={() => dismissAlert(alert.id)}
              className="p-1 text-gray-500 hover:text-white transition-colors hover:bg-white/10 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
