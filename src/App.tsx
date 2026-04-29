import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Zap, 
  Lock, 
  Activity, 
  Search, 
  Database, 
  UserX, 
  Settings, 
  Menu, 
  X,
  Radar,
  Bug,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Components
import Dashboard from './components/Dashboard';
import Scanner from './components/Scanner';
import Firewall from './components/Firewall';
import ThreatIntel from './components/ThreatIntel';
import Sidebar from './components/Sidebar';
import AlertManager from './components/AlertManager';

export type View = 'dashboard' | 'scanner' | 'firewall' | 'threat-intel' | 'settings';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [systemStatus, setSystemStatus] = useState<'secure' | 'warning' | 'scanning'>('secure');

  return (
    <div className="min-h-screen bg-black text-[#e0e0e0] font-sans selection:bg-cyan-500/30 selection:text-cyan-200 lg:p-4">
      <AlertManager />
      <div className="flex bg-black lg:border-8 border-[#1a1a1a] min-h-screen lg:min-h-0 lg:h-[calc(100vh-2rem)]">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#333] bg-[#0A0A0A] fixed top-0 w-full z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-cyan-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold tracking-widest text-cyan-400 uppercase text-xs">SentryGuard</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar */}
        <Sidebar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar pt-20 lg:pt-0">
          <div className="p-4 lg:p-6 w-full h-full flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-[#333] pb-3 hidden lg:flex">
              <div className="flex items-center gap-6 text-[10px] font-mono">
                <div className="flex flex-col items-start border-l border-cyan-500 pl-3">
                  <span className="text-gray-500 uppercase">System Health</span>
                  <span className="text-cyan-400 font-bold">99.8% OPTIMIZED</span>
                </div>
                <div className="flex flex-col items-start border-l border-red-500 pl-3">
                  <span className="text-gray-500 uppercase">Global Threats</span>
                  <span className="text-red-500 font-bold">2,401 DETECTED</span>
                </div>
                <div className="flex flex-col items-start border-l border-white/20 pl-3">
                  <span className="text-gray-500 uppercase">Last Scan</span>
                  <span className="text-white font-bold">02m 14s AGO</span>
                </div>
              </div>
              <div className="text-[10px] text-gray-500 font-mono">
                DEVICE_ID: NX-7700-ALPHA // ENCRYPTION: ACTIVE
              </div>
            </div>

            <div className="flex-grow">
              <AnimatePresence mode="wait">
              {currentView === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Dashboard setView={setCurrentView} />
                </motion.div>
              )}
              {currentView === 'scanner' && (
                <motion.div
                  key="scanner"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Scanner />
                </motion.div>
              )}
              {currentView === 'firewall' && (
                <motion.div
                  key="firewall"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Firewall />
                </motion.div>
              )}
              {currentView === 'threat-intel' && (
                <motion.div
                  key="threat-intel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <ThreatIntel />
                </motion.div>
              )}
              {currentView === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center p-20 text-center"
                >
                  <Settings className="w-16 h-16 text-gray-600 mb-4 animate-spin-slow" />
                  <h2 className="text-xl font-bold text-white mb-2 underline decoration-cyan-500 underline-offset-8 uppercase italic tracking-tighter">Configuration Panel</h2>
                  <p className="text-gray-400 max-w-sm">
                    Advanced system settings are strictly managed. Please authenticate with biometric credentials.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #050505;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1A1A1A;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #252525;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </div>
  );
}
