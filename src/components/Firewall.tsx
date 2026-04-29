import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  Globe, 
  Shield, 
  Server, 
  Wifi, 
  ChevronRight,
  Plus,
  Trash2,
  Power
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Firewall() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [rules, setRules] = useState([
    { id: 1, name: 'Block Port 8080 (Inbound)', type: 'Inbound', action: 'Deny', protocol: 'TCP', active: true },
    { id: 2, name: 'Allow HTTPS (Outbound)', type: 'Outbound', action: 'Allow', protocol: 'TLS', active: true },
    { id: 3, name: 'Filter UDP Flood', type: 'Inbound', action: 'Deny', protocol: 'UDP', active: false },
    { id: 4, name: 'SSH Strict Login', type: 'Inbound', action: 'Deny', protocol: 'SSH', active: true },
  ]);

  const toggleRule = (id: number) => {
    setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#333] pb-3">
        <div>
          <h1 className="text-xl font-black italic tracking-tighter text-white uppercase cyan-glow">Network Firewall</h1>
          <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-1">STATEFUL_INSPECTION // PACKET_FILTER_V8</p>
        </div>
        <button 
          onClick={() => setIsEnabled(!isEnabled)}
          className={`px-6 py-2 font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3 border ${isEnabled ? 'bg-cyan-600 text-black border-cyan-400' : 'bg-transparent text-gray-500 border-[#333]'}`}
        >
          <Power className="w-3 h-3" />
          {isEnabled ? 'FIREWALL_ACTIVE' : 'INITIALIZE_GUARD'}
        </button>
      </section>

      <div className="grid grid-cols-12 gap-4">
        {/* Rules Console */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          <div className="bg-[#0d0d0d] border border-[#222] overflow-hidden">
            <div className="px-4 py-2 border-b border-[#333] flex items-center justify-between bg-white/[0.02]">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Lock className="w-3 h-3 text-cyan-500" />
                Active Rule Set
              </h3>
              <button className="text-cyan-500 hover:text-cyan-400"><Plus className="w-4 h-4" /></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-[10px]">
                <thead>
                  <tr className="bg-black">
                    <th className="px-4 py-2 font-bold text-gray-500 uppercase border-b border-[#222]">Rule</th>
                    <th className="px-4 py-2 font-bold text-gray-500 uppercase border-b border-[#222]">Protocol</th>
                    <th className="px-4 py-2 font-bold text-gray-500 uppercase border-b border-[#222]">Action</th>
                    <th className="px-4 py-2 font-bold text-gray-500 uppercase border-b border-[#222]">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222]">
                  {rules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-[#151515] transition-colors group">
                      <td className="px-4 py-2 text-gray-300">{rule.name}</td>
                      <td className="px-4 py-2">
                        <span className="text-gray-500">[{rule.protocol}]</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className={`font-bold ${rule.action === 'Deny' ? 'text-red-500' : 'text-cyan-500'}`}>
                          {rule.action.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <button 
                          onClick={() => toggleRule(rule.id)}
                          className={`w-8 h-4 rounded-full relative transition-colors ${rule.active ? 'bg-cyan-900' : 'bg-gray-800'}`}
                        >
                          <div className={`absolute top-1 w-2 h-2 rounded-full transition-all ${rule.active ? 'right-1 bg-cyan-400' : 'left-1 bg-gray-400'}`} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Traffic Monitor */}
          <div className="bg-[#0d0d0d] border border-cyan-900/30 p-4">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Wifi className="w-3 h-3 text-cyan-400" />
              Live Traffic Stream
            </h3>
            <div className="space-y-1 font-mono text-[9px]">
              {[
                { ip: '114.21.0.12', port: '443', app: 'IG_CORE', status: 'ALLOW', data: '4.2 KB' },
                { ip: '92.118.24.11', port: '8080', app: 'SYS_SRV', status: 'DENY', data: '0.0 KB' },
                { ip: '10.0.15.22', port: '22', app: 'REM_SH', status: 'DENY', data: '0.0 KB' },
                { ip: '142.250.200.78', port: '443', app: 'G_SERVICES', status: 'ALLOW', data: '128.5 KB' },
              ].map((conn, i) => (
                <div key={i} className="flex items-center justify-between p-1 bg-[#151515] border-l border-[#333] hover:border-cyan-500 transition-colors">
                  <div className="flex gap-4">
                    <span className={conn.status === 'ALLOW' ? 'text-cyan-500' : 'text-red-500'}>[{conn.status}]</span>
                    <span className="text-gray-300 font-bold w-20">{conn.app}</span>
                    <span className="text-gray-500">{conn.ip}:{conn.port}</span>
                  </div>
                  <span className="text-gray-500">{conn.data}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Panel */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#0d0d0d] border border-[#222] p-4 relative">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">System Health</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-[#151515] p-2">
                <div className="text-[9px] text-gray-500 uppercase font-bold">Latency</div>
                <div className="text-sm font-mono text-cyan-400 font-bold">1.2ms</div>
              </div>
              <div className="flex justify-between items-center bg-[#151515] p-2">
                <div className="text-[9px] text-gray-500 uppercase font-bold">DPI Load</div>
                <div className="text-sm font-mono text-cyan-400 font-bold">42%</div>
              </div>
            </div>
            
            <div className="mt-8 p-3 border border-[#333] bg-black text-[9px] text-gray-500 font-mono italic leading-tight">
              AI heuristics prioritizing encrypted traffic from verified auth-nodes.
            </div>
          </div>

          <div className="bg-[#1a0f0f] border border-red-900/40 p-4">
            <h4 className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-2">IP Blacklist</h4>
            <p className="text-[9px] text-gray-400 leading-relaxed font-mono">
              Auto-blocking requests from known VPN exit nodes and state-sponsored IP ranges.
            </p>
            <div className="mt-4 flex flex-wrap gap-1">
              {['RU', 'KP', 'IR', 'CN'].map(cc => (
                <span key={cc} className="bg-red-900/20 border border-red-900/50 px-2 py-0.5 text-[8px] font-bold text-red-400">{cc}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
