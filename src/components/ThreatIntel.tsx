import React, { useState } from 'react';
import { 
  Radar, 
  MapPin, 
  Terminal, 
  User, 
  Hash, 
  ShieldAlert, 
  Globe, 
  Cpu,
  Fingerprint,
  Search,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ThreatIntel() {
  const [selectedThreat, setSelectedThreat] = useState<any>(null);

  const threats = [
    {
      id: 'TH-9821',
      alias: 'VoidWalker',
      type: 'Persistent GPS Tracker',
      origin: 'Krasnoyarsk, Russia',
      coordinates: '56.0184° N, 92.8672° E',
      risk: 'Critical',
      status: 'Active Trace',
      dossier: 'Observed attempts to intercept location metadata via secondary baseband processor. Suspected affiliation with state-sponsored reconnaissance groups. Uses rotating VPN exit nodes to mask primary IP.',
      techStack: ['Burp Suite', 'Metasploit', 'Custom RF Injection'],
      ip: '185.122.24.102'
    },
    {
      id: 'TH-1204',
      alias: 'Spectre_X',
      type: 'Man-in-the-Middle',
      origin: 'Private VPN (Netherlands)',
      coordinates: '52.3676° N, 4.9041° E',
      risk: 'High',
      status: 'Blocked',
      dossier: 'Intercepting unencrypted HTTP traffic from browser cache. Attempting to harvest session cookies for financial platforms. Attack originated from a rogue public Wi-Fi hotspot in a metropolitan airport.',
      techStack: ['Wireshark', 'Arpspoof', 'EvilProxy'],
      ip: '45.15.112.5'
    },
    {
      id: 'TH-4432',
      alias: 'ShadowLink',
      type: 'Credential Theft',
      origin: 'Ho Chi Minh City, Vietnam',
      coordinates: '10.8231° N, 106.6297° E',
      risk: 'Medium',
      status: 'Under Investigation',
      dossier: 'Scripting attacks against OAuth endpoints. Tracking user login patterns to identify weaknesses in biometric fallback mechanisms. Low-frequency attempts indicate long-term data collection goals.',
      techStack: ['Python/Selenium', 'GhostPath', 'Tor Browser'],
      ip: '103.116.14.99'
    }
  ];

  return (
    <div className="space-y-6">
      <section className="flex items-center justify-between border-b border-[#333] pb-3">
        <div>
          <h1 className="text-xl font-black italic tracking-tighter text-white uppercase cyan-glow">Threat Intelligence</h1>
          <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-1">ORBITAL_TRACE_ACTIVE // ID_RECON_V9</p>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-4 h-full">
        {/* Radar View */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
          <div className="bg-black border border-cyan-900/30 relative overflow-hidden aspect-square flex items-center justify-center">
            {/* Visual Radar */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
            <div className="relative w-full max-w-xs aspect-square">
              {/* Radar Circles */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="absolute inset-0 border border-white/[0.03] rounded-full" style={{ margin: `${(i + 1) * 12}%` }} />
              ))}
              {/* Radar Sweeper */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-cyan-600/20 to-transparent rounded-full origin-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)' }}
              />
              {/* Threat Markers */}
              {threats.map((threat, idx) => {
                const pos = [
                   { top: '20%', left: '70%' },
                   { top: '60%', left: '30%' },
                   { top: '40%', left: '80%' }
                ][idx];
                return (
                  <motion.button
                    key={threat.id}
                    onClick={() => setSelectedThreat(threat)}
                    className={`absolute w-3 h-3 border border-white shadow-lg cursor-pointer z-20 group ${threat.risk === 'Critical' ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`}
                    style={pos}
                    whileHover={{ scale: 1.5 }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-[#333] px-1 py-0.5 text-[8px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {threat.alias}
                    </div>
                  </motion.button>
                );
              })}
              {/* Center Marker */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              </div>
            </div>
          </div>

          <div className="bg-[#0d0d0d] border border-[#222] p-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 border-b border-[#222] pb-1 flex items-center gap-2">
              <Terminal className="w-3 h-3 text-cyan-500" />
              Intercept Streams
            </h3>
            <div className="space-y-1 font-mono text-[9px]">
              {threats.map((t, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedThreat(t)}
                  className={`w-full flex items-center justify-between p-2 transition-all border-l-2 ${selectedThreat?.id === t.id ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-[#151515] border-transparent text-gray-500 hover:text-gray-300'}`}
                >
                  <span>{t.id} // {t.alias}</span>
                  <span className="italic">{t.status.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dossier Detail */}
        <div className="col-span-12 lg:col-span-5 h-full">
          <AnimatePresence mode="wait">
            {selectedThreat ? (
              <motion.div
                key={selectedThreat.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#1a0f0f] border border-red-900/50 flex flex-col h-full"
              >
                <div className="p-4 bg-red-600 text-black">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-widest opacity-80 mb-1">Target Profile</div>
                      <h2 className="text-2xl font-black italic tracking-tighter uppercase">{selectedThreat.alias}</h2>
                    </div>
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[9px] font-bold font-mono">
                    <div className="bg-black/10 p-2 border border-black/10">
                      <div className="opacity-60 mb-0.5">THREAT_ID</div>
                      <div>{selectedThreat.id}</div>
                    </div>
                    <div className="bg-black/10 p-2 border border-black/10">
                      <div className="opacity-60 mb-0.5">LEVEL</div>
                      <div>{selectedThreat.risk.toUpperCase()}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex-1 space-y-4 overflow-y-auto custom-scrollbar font-mono text-[10px]">
                  <div className="space-y-2">
                    <h4 className="text-red-500 font-bold uppercase tracking-widest border-b border-red-900/30 pb-1">Origin Node</h4>
                    <div className="bg-black/20 p-2 border border-red-900/20 text-gray-300">
                      <p>LOC: {selectedThreat.origin}</p>
                      <p>COORD: {selectedThreat.coordinates}</p>
                      <p>IP: {selectedThreat.ip}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-red-500 font-bold uppercase tracking-widest border-b border-red-900/30 pb-1">Technique Log</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedThreat.techStack.map((tech: string, j: number) => (
                        <span key={j} className="px-1.5 py-0.5 bg-red-900/20 text-red-400 border border-red-900/40 uppercase text-[8px]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-red-500 font-bold uppercase tracking-widest border-b border-red-900/30 pb-1">Heuristic Analysis</h4>
                    <p className="text-gray-400 leading-relaxed italic">
                      "{selectedThreat.dossier}"
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t border-red-900/30 flex gap-2">
                  <button className="flex-1 py-2 bg-red-700 text-white text-[10px] font-bold uppercase hover:bg-red-600 transition-colors">
                    Blacklist
                  </button>
                  <button className="flex-1 py-2 border border-red-700 text-red-500 text-[10px] font-bold uppercase hover:bg-red-950 transition-colors">
                    Recon
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-[#0d0d0d] border border-[#222] h-full flex flex-col items-center justify-center p-8 text-center border-dashed border-2 opacity-30">
                <Radar className="w-12 h-12 text-gray-600 mb-4 animate-pulse" />
                <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-widest">Select Signal</h3>
                <p className="text-[10px] text-gray-500 max-w-[150px] font-mono">WAITING FOR DECODER LOCK-ON...</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .text-glow {
          text-shadow: 0 0 10px rgba(249, 115, 22, 0.3);
        }
      `}} />
    </div>
  );
}
