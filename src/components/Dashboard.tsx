import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Database, 
  UserX, 
  Zap, 
  ArrowUpRight,
  ShieldAlert,
  Globe,
  Lock
} from 'lucide-react';
import { motion } from 'motion/react';
import { View } from '../App';

interface DashboardProps {
  setView: (view: View) => void;
}

export default function Dashboard({ setView }: DashboardProps) {
  const stats = [
    { label: 'Network Integrity', value: '99.9%', icon: Globe, color: 'text-cyan-500', trend: 'OPTIMIZED' },
    { label: 'Protection Shield', value: 'ACTIVE', icon: ShieldCheck, color: 'text-cyan-400', trend: 'NOMINAL' },
    { label: 'Global Threats', value: '2,401', icon: UserX, color: 'text-red-500', trend: '+12 DETECTED' },
    { label: 'Encrypted Volume', value: '1.2 TB', icon: Lock, color: 'text-white', trend: 'MOUNTED' },
  ];

  return (
    <div className="space-y-4 pb-4">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black italic tracking-tighter text-white uppercase cyan-glow">Command Console</h1>
            <span className="text-[10px] text-cyan-500 animate-pulse font-mono tracking-widest bg-cyan-500/10 px-2 py-0.5 border border-cyan-500/20">LIVE_FEED</span>
          </div>
          <p className="text-[11px] text-gray-500 font-mono uppercase tracking-tight max-w-md">
            HEURISTIC ENGINE: ACTIVE // VIRTUAL_SHIELD: NOMINAL // ZERO_FAIL_POLICY: ENABLED
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setView('scanner')}
            className="px-4 py-2 bg-cyan-600 text-black font-bold uppercase text-[10px] tracking-widest hover:bg-cyan-500 transition-colors"
          >
            Deep Scan
          </button>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 bg-[#0d0d0d] border border-[#222] group hover:border-cyan-500/30 transition-all cursor-default"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className={`text-[9px] font-bold font-mono tracking-widest ${stat.trend.includes('DETECTED') ? 'text-red-500' : 'text-gray-500'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="text-xl font-black text-white font-mono tracking-tighter">{stat.value}</div>
            <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Main Feed */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          <div className="bg-[#0d0d0d] border border-cyan-900/30 p-4 relative h-80 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[11px] font-bold uppercase text-cyan-400 tracking-wider italic flex items-center gap-2">
                <Activity className="w-3 h-3" />
                Packet Flow Analytics
              </h3>
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => <div key={i} className="w-1 h-1 bg-cyan-500/40" />)}
              </div>
            </div>
            
            {/* High Density Bar Chart */}
            <div className="flex-grow flex items-end justify-between gap-1 pb-4">
              {[...Array(48)].map((_, i) => {
                const height = Math.random() * 80 + 10;
                const isPeak = height > 75;
                return (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.02, duration: 1 }}
                    className={`w-full ${isPeak ? 'bg-red-500/60' : 'bg-cyan-500/30'}`}
                  />
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-[9px] text-gray-600 font-mono tracking-widest uppercase">
              <span>00:00</span>
              <span>12:00</span>
              <span>23:59</span>
            </div>
          </div>

          <div className="bg-[#0d0d0d] border border-[#222] p-4">
            <h3 className="text-[11px] font-bold uppercase text-gray-400 tracking-wider italic mb-4 flex items-center gap-2">
              <ShieldAlert className="w-3 h-3 text-red-500" />
              Recent Incidents
            </h3>
            <div className="space-y-1 font-mono">
              {[
                { type: 'Port Attack', source: 'IP 182.24.1.88', time: '02:14:12', severity: 'High' },
                { type: 'Auth Bypass', source: 'Kernel_Sect', time: '02:10:05', severity: 'Critical' },
                { type: 'Trojan Drop', source: 'Android/Payload', time: '01:45:33', severity: 'Med' },
              ].map((incident, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-[#151515] hover:bg-[#1a1a1a] transition-colors text-[10px] border-l-2 border-[#333] hover:border-cyan-500">
                  <div className="flex items-center gap-4">
                    <span className={`${incident.severity === 'Critical' ? 'text-red-500' : incident.severity === 'High' ? 'text-amber-500' : 'text-cyan-500'} font-bold`}>
                      [{incident.severity.toUpperCase()}]
                    </span>
                    <span className="text-gray-300 font-bold">{incident.type}</span>
                    <span className="text-gray-500">{incident.source}</span>
                  </div>
                  <span className="text-gray-500">{incident.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#1a0f0f] border border-red-900/50 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-[11px] font-bold uppercase text-red-500 tracking-wider italic mb-4">Intruder Profile</h3>
              <div className="flex gap-4 mb-4">
                <div className="w-16 h-16 bg-black border border-red-500 flex items-center justify-center text-red-500 text-[10px] font-mono">
                  [REDACTED]
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-[10px] text-red-400 font-bold uppercase tracking-widest">PHANTOM-X</div>
                  <div className="text-[9px] text-gray-500 font-mono">IP: 203.0.113.88</div>
                </div>
              </div>
              <div className="text-[10px] text-gray-400 space-y-1">
                <div className="flex justify-between"><span className="text-red-400 uppercase">Origin:</span> Khabarovsk, RU</div>
                <div className="flex justify-between"><span className="text-red-400 uppercase">Technique:</span> Brute-force SSH</div>
              </div>
            </div>
            <button className="w-full bg-red-600 text-white text-[10px] font-bold py-2 mt-4 uppercase hover:bg-red-500 transition-colors">
              Blacklist Source
            </button>
          </div>

          <div className="bg-[#0d0d0d] border border-[#222] p-4 flex flex-col gap-4 h-full">
            <h3 className="text-[11px] font-bold uppercase text-gray-400 tracking-wider border-b border-[#222] pb-2">
              Device Health
            </h3>
            <div className="space-y-4">
              {[
                { label: 'CPU Usage', value: 24, color: 'bg-cyan-500' },
                { label: 'Memory Leak', value: 12, color: 'bg-cyan-500' },
                { label: 'Radio Noise', value: 68, color: 'text-amber-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[9px] uppercase font-bold tracking-widest font-mono">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="text-white">{item.value}%</span>
                  </div>
                  <div className="h-1 w-full bg-[#151515]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1 }}
                      className={`h-full ${item.color.startsWith('bg') ? item.color : 'bg-cyan-500/50'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-4 flex flex-col gap-2">
              <button className="bg-cyan-900/30 text-cyan-400 text-[10px] font-bold py-2 uppercase border border-cyan-900/50">System Purge</button>
              <button className="bg-white text-black text-[10px] font-bold py-2 uppercase">Recalibrate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
