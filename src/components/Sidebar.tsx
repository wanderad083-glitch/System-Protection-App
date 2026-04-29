import React from 'react';
import { 
  Shield, 
  LayoutDashboard, 
  Zap, 
  Lock, 
  Search, 
  UserX, 
  Settings, 
  X,
  Radar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { View } from '../App';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ currentView, setCurrentView, isOpen, setIsOpen }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'scanner', label: 'Virus Scanner', icon: Search },
    { id: 'firewall', label: 'Network Firewall', icon: Lock },
    { id: 'threat-intel', label: 'Threat Intel', icon: Radar },
    { id: 'settings', label: 'Configuration', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#0d0d0d] border-r border-[#222] flex flex-col transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:h-full
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#333]">
          <div className="flex items-center justify-between mb-8 text-cyan-400">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-500 flex items-center justify-center font-bold text-black border border-cyan-400">
                S
              </div>
              <div>
                <h1 className="text-xs font-bold tracking-[0.2em] uppercase leading-none">SentryGuard</h1>
                <span className="text-[9px] text-gray-500 font-mono tracking-widest uppercase mt-1 block">v4.8.2-STABLE</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 hover:bg-white/5 rounded-full"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="bg-black/40 p-3 border border-[#333]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
              <span className="text-[10px] uppercase font-bold text-cyan-500 tracking-wider">Interface Online</span>
            </div>
            <div className="text-[10px] font-mono text-gray-500">
              UPTIME: 1,248h 12m
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id as View);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2 transition-all duration-200 group border-l-2
                ${currentView === item.id 
                  ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' 
                  : 'text-gray-500 hover:bg-[#151515] hover:text-white border-transparent'}
              `}
            >
              <item.icon className={`w-4 h-4 shrink-0 ${currentView === item.id ? 'text-cyan-400' : 'text-gray-600'}`} />
              <span className="text-[11px] font-bold uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#333] text-[9px] font-mono text-gray-600 uppercase">
          <div className="mb-2">Layer: AES-256-GCM</div>
          <div>© 2024 SECURITY-CORE INC.</div>
        </div>
      </motion.aside>
    </>
  );
}
