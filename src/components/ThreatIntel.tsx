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
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          <div className="bg-black border border-cyan-900/30 relative overflow-hidden aspect-square lg:aspect-auto lg:h-[500px] flex items-center justify-center">
            {/* Visual Radar */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
            <div className="relative w-full max-w-sm aspect-square">
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
        </div>

        {/* Intercept Streams */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#0d0d0d] border border-[#222] p-4 flex-1">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 border-b border-[#222] pb-1 flex items-center gap-2">
              <Terminal className="w-3 h-3 text-cyan-500" />
              Intercept Streams
            </h3>
            <div className="space-y-1 font-mono text-[9px]">
              {threats.map((t, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedThreat(t)}
                  className={`w-full flex items-center justify-between p-3 transition-all border-l-2 ${selectedThreat?.id === t.id ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-[#151515] border-transparent text-gray-500 hover:text-gray-300'}`}
                >
                  <span className="font-bold">{t.id} // {t.alias}</span>
                  <span className={`italic ${t.risk === 'Critical' ? 'text-red-500' : ''}`}>{t.status.toUpperCase()}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-6 p-3 bg-[#111] border border-[#333] text-[9px] text-gray-500 font-mono italic">
              Select an intercept stream or orbital trace marker to load the complete target dossier.
            </div>
          </div>
        </div>

        {/* Full Details Modal */}
        <AnimatePresence>
          {selectedThreat && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-[#0a0a0a] border border-cyan-900/50 flex flex-col w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl shadow-cyan-900/20"
              >
                {/* Modal Header */}
                <div className="p-4 border-b border-cyan-900/50 flex justify-between items-center bg-[#111]">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className={`w-6 h-6 ${selectedThreat.risk === 'Critical' ? 'text-red-500 animate-pulse' : 'text-orange-500'}`} />
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Target Dossier // {selectedThreat.id}</div>
                      <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">{selectedThreat.alias}</h2>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedThreat(null)}
                    className="p-2 text-gray-500 hover:text-white hover:bg-white/10 transition-colors rounded"
                  >
                    <span className="text-xl font-mono leading-none">&times;</span>
                  </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                  
                  {/* Top Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#151515] p-3 border border-[#222]">
                      <div className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-widest">Threat Level</div>
                      <div className={`font-mono font-bold ${selectedThreat.risk === 'Critical' ? 'text-red-500' : 'text-orange-500'}`}>
                        {selectedThreat.risk.toUpperCase()}
                      </div>
                    </div>
                    <div className="bg-[#151515] p-3 border border-[#222]">
                      <div className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-widest">Type</div>
                      <div className="text-cyan-400 font-mono text-xs">{selectedThreat.type}</div>
                    </div>
                    <div className="bg-[#151515] p-3 border border-[#222]">
                      <div className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-widest">Status</div>
                      <div className="text-gray-300 font-mono text-xs">{selectedThreat.status}</div>
                    </div>
                    <div className="bg-[#151515] p-3 border border-[#222]">
                      <div className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-widest">Source IP</div>
                      <div className="text-gray-300 font-mono text-xs">{selectedThreat.ip}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-cyan-500 font-bold uppercase tracking-widest border-b border-cyan-900/30 pb-2 mb-3 text-[10px] flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          Geographic Origin
                        </h4>
                        <div className="bg-[#151515] p-4 text-xs font-mono border-l-2 border-cyan-500 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Location:</span>
                            <span className="text-gray-300">{selectedThreat.origin}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Coordinates:</span>
                            <span className="text-cyan-400">{selectedThreat.coordinates}</span>
                          </div>
                          <div className="pt-2 border-t border-[#222] mt-2">
                             <div className="w-full h-24 bg-[#0a0a0a] border border-[#222] relative overflow-hidden flex items-center justify-center">
                               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                               <Globe className="w-12 h-12 text-cyan-900 absolute opacity-50" />
                               <div className="absolute w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                             </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-cyan-500 font-bold uppercase tracking-widest border-b border-cyan-900/30 pb-2 mb-3 text-[10px] flex items-center gap-2">
                          <Cpu className="w-3 h-3" />
                          Identified Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedThreat.techStack.map((tech: string, j: number) => (
                            <span key={j} className="px-2 py-1 bg-[#151515] text-cyan-400 border border-[#222] uppercase font-mono text-[9px] tracking-wider">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-cyan-500 font-bold uppercase tracking-widest border-b border-cyan-900/30 pb-2 mb-3 text-[10px] flex items-center gap-2">
                          <Fingerprint className="w-3 h-3" />
                          Heuristic Analysis & Dossier
                        </h4>
                        <div className="bg-[#151515] p-4 text-xs border border-[#222] font-mono leading-relaxed">
                          <p className="text-gray-400">
                            {selectedThreat.dossier}
                          </p>
                          <div className="mt-4 pt-4 border-t border-[#222] text-[9px] text-gray-500">
                            &gt; PATTERN_MATCH: 89.2% CONFIDENCE <br/>
                            &gt; BEHAVIORAL_ANOMALY: DETECTED <br/>
                            &gt; RECOMMENDED_ACTION: ISOLATE &amp; TRACE
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-[#222] bg-[#111] flex justify-end gap-3">
                  <button 
                    onClick={() => setSelectedThreat(null)}
                    className="px-4 py-2 border border-[#333] text-gray-400 text-[10px] font-bold uppercase hover:bg-[#222] transition-colors"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 border border-red-900/50 bg-red-900/20 text-red-500 text-[10px] font-bold uppercase hover:bg-red-900/40 transition-colors">
                    Add to Blacklist
                  </button>
                  <button className="px-4 py-2 bg-cyan-600 text-black text-[10px] font-bold uppercase hover:bg-cyan-500 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    Initiate Counter-Trace
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .text-glow {
          text-shadow: 0 0 10px rgba(249, 115, 22, 0.3);
        }
      `}} />
    </div>
  );
}
