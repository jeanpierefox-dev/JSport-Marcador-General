import React, { useEffect, useState } from 'react';
import { Match, Team, BroadcastState, Player, ActionType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Video as VideoIcon, Shield } from 'lucide-react';

interface Props {
  match: Match;
  homeTeam: Team;
  awayTeam: Team;
  broadcastState: BroadcastState;
  aiCommentary: string;
  championshipLogo?: string;
  onCloseIntro?: () => void;
}

export const BroadcastOverlay: React.FC<Props> = ({ match, homeTeam, awayTeam, broadcastState, aiCommentary, championshipLogo, onCloseIntro }) => {
  const currentSet = match.sets[match.currentSet] || { home: 0, away: 0 };
  const homeSetsWon = match.sets.filter(s => s.home > s.away && (s.home >= 25 || s.home >= 15 && match.sets.indexOf(s) === 4)).length;
  const awaySetsWon = match.sets.filter(s => s.away > s.home && (s.away >= 25 || s.away >= 15 && match.sets.indexOf(s) === 4)).length;

  // Stinger Transition Effect
  const [showStinger, setShowStinger] = useState(false);
  const [isSetPoint, setIsSetPoint] = useState<string | null>(null);

  // Stats Calculations
  const calculateSetStats = (teamId: string) => {
      const stats = { attacks: 0, blocks: 0, aces: 0, errors: 0, total: 0 };
      match.events.forEach(e => {
          if (e.teamId === teamId) {
             if (e.type === ActionType.ATTACK) stats.attacks++;
             if (e.type === ActionType.BLOCK) stats.blocks++;
             if (e.type === ActionType.SERVE_ACE) stats.aces++;
             if (e.type === ActionType.ATTACK_ERROR || e.type === ActionType.SERVE_ERROR) stats.errors++; 
          } else {
             if (e.type === ActionType.OPPONENT_ERROR) stats.errors++; 
          }
      });
      stats.total = teamId === match.homeTeamId ? currentSet.home : currentSet.away;
      return stats;
  };

  const homeStats = calculateSetStats(homeTeam.id);
  const awayStats = calculateSetStats(awayTeam.id);

  // Set Point Logic
  useEffect(() => {
    const limit = match.currentSet === 4 ? 15 : 25;
    const h = currentSet.home;
    const a = currentSet.away;
    
    if (h >= limit - 1 && h > a) setIsSetPoint(homeTeam.name);
    else if (a >= limit - 1 && a > h) setIsSetPoint(awayTeam.name);
    else setIsSetPoint(null);

  }, [currentSet, match.currentSet, homeTeam.name, awayTeam.name]);

  useEffect(() => {
    if (broadcastState.triggerTransition) {
        setShowStinger(true);
        const timer = setTimeout(() => setShowStinger(false), 1500);
        return () => clearTimeout(timer);
    }
  }, [broadcastState.triggerTransition]);

  // --- SUB-COMPONENTS ---

  // 1. VNL Style Bottom Scorebug (Split Bar)
  const VNLScorebug = () => (
    <motion.div 
        initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
        // Use w-full max-w-[95%] for mobile, allow scaling
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-stretch h-12 md:h-16 font-sports shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-30 w-full max-w-[95%] md:max-w-5xl justify-center origin-bottom"
    >
        <div className="flex w-full items-stretch justify-center transform md:scale-100 scale-[0.65] origin-bottom">
            {/* Left Team (Home) */}
            <div className="flex bg-[#001f5b] text-white flex-1 justify-end items-center relative rounded-l-lg md:rounded-none overflow-visible">
                {/* Team Logo Left */}
                <div className="absolute left-[-20px] md:left-[-50px] top-1/2 -translate-y-1/2 z-20">
                    <img src={homeTeam.logo} className="w-12 h-12 md:w-20 md:h-20 object-contain drop-shadow-lg" />
                </div>

                <div className="w-16 md:w-24 flex items-center justify-center font-bold text-lg md:text-2xl tracking-wider border-r border-white/10 h-full pl-6 md:pl-0 truncate">
                    {homeTeam.shortName}
                </div>
                <div className="w-10 md:w-14 bg-white text-[#001f5b] flex flex-col items-center justify-center text-[10px] md:text-sm font-bold leading-none border-r border-[#001f5b]/10 h-full">
                    <span className="text-[6px] md:text-[8px] uppercase tracking-widest text-slate-500">Sets</span>
                    <span className="text-base md:text-xl">{homeSetsWon}</span>
                </div>
                <div className={`w-14 md:w-20 flex items-center justify-center text-3xl md:text-5xl font-bold h-full ${match.servingTeamId === homeTeam.id ? 'bg-gradient-to-b from-red-600 to-red-700' : 'bg-[#002875]'}`}>
                    {currentSet.home}
                </div>
            </div>

            {/* Center Info / Logo (Trapezoid Style) */}
            <div className="w-20 md:w-28 bg-gradient-to-b from-[#ff4600] to-[#d43a00] flex flex-col items-center justify-center relative z-10 px-1 md:px-2 skew-x-[-10deg] mx-1 border-x-2 border-white overflow-hidden shadow-lg shrink-0">
                <div className="skew-x-[10deg] flex flex-col items-center w-full">
                    <div className="text-[8px] md:text-[10px] font-bold text-white uppercase tracking-wider leading-none mb-0.5 md:mb-1 bg-black/20 w-full text-center py-0.5">
                        Set {match.currentSet + 1}
                    </div>
                    {championshipLogo ? (
                        <img src={championshipLogo} className="h-6 md:h-8 object-contain brightness-0 invert drop-shadow-md" />
                    ) : (
                        <span className="font-bold text-base md:text-xl text-white italic tracking-tighter">VNL</span>
                    )}
                </div>
            </div>

            {/* Right Team (Away) */}
            <div className="flex bg-[#001f5b] text-white flex-1 justify-start items-center relative rounded-r-lg md:rounded-none overflow-visible">
                <div className={`w-14 md:w-20 flex items-center justify-center text-3xl md:text-5xl font-bold h-full ${match.servingTeamId === awayTeam.id ? 'bg-gradient-to-b from-red-600 to-red-700' : 'bg-[#002875]'}`}>
                    {currentSet.away}
                </div>
                <div className="w-10 md:w-14 bg-white text-[#001f5b] flex flex-col items-center justify-center text-[10px] md:text-sm font-bold leading-none border-l border-[#001f5b]/10 h-full">
                    <span className="text-[6px] md:text-[8px] uppercase tracking-widest text-slate-500">Sets</span>
                    <span className="text-base md:text-xl">{awaySetsWon}</span>
                </div>
                <div className="w-16 md:w-24 flex items-center justify-center font-bold text-lg md:text-2xl tracking-wider border-l border-white/10 h-full pr-6 md:pr-0 truncate">
                    {awayTeam.shortName}
                </div>

                {/* Team Logo Right */}
                <div className="absolute right-[-20px] md:right-[-50px] top-1/2 -translate-y-1/2 z-20">
                    <img src={awayTeam.logo} className="w-12 h-12 md:w-20 md:h-20 object-contain drop-shadow-lg" />
                </div>
            </div>
        </div>
    </motion.div>
  );

  // 2. Player Card
  const PlayerStatsCard = () => {
    if (!broadcastState.activePlayerIdForStats) return null;
    const player = [...homeTeam.players, ...awayTeam.players].find(p => p.id === broadcastState.activePlayerIdForStats);
    if (!player) return null;
    const isHome = homeTeam.players.some(p => p.id === player.id);
    
    return (
        <motion.div 
            key={player.id} 
            initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}
            className="absolute bottom-20 md:bottom-28 left-2 md:left-12 flex items-end z-20 font-sports origin-bottom-left transform scale-[0.6] md:scale-100"
        >
            {/* Player Image Cutout */}
            <div className="relative z-20 -mr-4 md:-mr-6 mb-0">
                <img src={player.image} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-4 border-white shadow-lg bg-slate-200" />
                <div className={`absolute bottom-0 right-4 text-white text-[10px] md:text-sm font-bold px-2 py-0.5 rounded ${isHome ? 'bg-blue-700' : 'bg-red-700'} border border-white`}>
                    #{player.number}
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-[#001f5b] text-white pl-6 md:pl-8 pr-3 md:pr-4 py-2 md:py-3 rounded-r-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-l-8 border-l-yellow-400 min-w-[220px] md:min-w-[300px]">
                 <div className="flex justify-between items-end border-b border-white/20 pb-1 mb-1 md:mb-2">
                     <span className="text-lg md:text-2xl font-bold uppercase italic leading-none">{player.name}</span>
                     <span className="text-[8px] md:text-xs text-yellow-400 font-bold uppercase">{player.position}</span>
                 </div>
                 <div className="flex gap-4 md:gap-6 text-xs md:text-sm">
                     <div className="flex flex-col items-center">
                         <span className="text-[8px] md:text-[10px] text-slate-400 uppercase tracking-wider">Pts</span>
                         <span className="font-bold text-base md:text-2xl text-white leading-none">{player.stats.points}</span>
                     </div>
                     <div className="flex flex-col items-center">
                         <span className="text-[8px] md:text-[10px] text-slate-400 uppercase tracking-wider">Atk</span>
                         <span className="font-bold text-base md:text-2xl text-green-400 leading-none">{player.stats.attacks}</span>
                     </div>
                     <div className="flex flex-col items-center">
                         <span className="text-[8px] md:text-[10px] text-slate-400 uppercase tracking-wider">Blk</span>
                         <span className="font-bold text-base md:text-2xl text-yellow-400 leading-none">{player.stats.blocks}</span>
                     </div>
                 </div>
            </div>
        </motion.div>
    );
  };

  // 3. Set Stats (Central Table Style)
  const SetStatsTable = () => (
      <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="w-[90%] md:w-[95%] max-w-lg font-sports shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-auto origin-center transform scale-[0.65] md:scale-100"
          >
              {/* Header */}
              <div className="flex">
                  <div className="bg-[#ff4600] text-white px-4 py-2 font-bold text-xl italic flex-1 skew-x-[-10deg] mr-1 flex items-center justify-center shadow-lg border-2 border-white">
                      SET {match.currentSet + 1}
                  </div>
                  <div className="bg-white text-[#001f5b] px-8 py-2 font-bold text-sm tracking-widest flex items-center justify-center skew-x-[-10deg] ml-1 uppercase shadow-lg border-2 border-[#001f5b]">
                      Team Stats
                  </div>
              </div>

              {/* Body */}
              <div className="bg-[#001f5b] text-white mt-2 p-1 border-4 border-white shadow-2xl">
                   {/* Team Headers */}
                   <div className="flex items-center justify-between bg-[#00143a] p-3 mb-1">
                       <div className="flex items-center gap-2">
                           <img src={homeTeam.logo} className="w-8 h-8 object-contain" />
                           <span className="font-bold text-lg tracking-wider text-yellow-400">{homeTeam.shortName}</span>
                       </div>
                       <div className="flex items-center gap-4 text-2xl font-bold">
                           <span className="bg-white text-[#001f5b] px-3 py-1 rounded">{currentSet.home}</span>
                           <span className="text-slate-500 text-sm">:</span>
                           <span className="bg-white text-[#001f5b] px-3 py-1 rounded">{currentSet.away}</span>
                       </div>
                       <div className="flex items-center gap-2">
                           <span className="font-bold text-lg tracking-wider text-yellow-400">{awayTeam.shortName}</span>
                           <img src={awayTeam.logo} className="w-8 h-8 object-contain" />
                       </div>
                   </div>

                   {/* Rows */}
                   {[
                       { label: 'ATTACKS', h: homeStats.attacks, a: awayStats.attacks },
                       { label: 'BLOCKS', h: homeStats.blocks, a: awayStats.blocks },
                       { label: 'SERVES (ACES)', h: homeStats.aces, a: awayStats.aces },
                       { label: 'OPPONENT ERRORS', h: homeStats.errors, a: awayStats.errors },
                   ].map((row, i) => (
                       <div key={i} className="flex items-center h-12 border-b border-white/5 bg-[#002875] mb-0.5 relative overflow-hidden group">
                           {/* Bars Background */}
                           <div className="absolute top-0 left-0 bottom-0 bg-blue-500/20 transition-all duration-500" style={{ width: `${(row.h / (row.h+row.a || 1)) * 50}%` }}></div>
                           <div className="absolute top-0 right-0 bottom-0 bg-red-500/20 transition-all duration-500" style={{ width: `${(row.a / (row.h+row.a || 1)) * 50}%` }}></div>

                           <div className="w-16 text-center font-bold text-xl z-10">{row.h}</div>
                           <div className="flex-1 text-center z-10 flex flex-col justify-center">
                               <span className="text-xs text-slate-300 uppercase tracking-[0.2em] font-bold group-hover:text-yellow-400 transition">{row.label}</span>
                           </div>
                           <div className="w-16 text-center font-bold text-xl z-10">{row.a}</div>
                       </div>
                   ))}
              </div>
          </motion.div>
      </div>
  );

  // 4. Rotation Overlay (Visual Court)
  const RotationOverlay = () => {
    const servingTeam = match.servingTeamId === homeTeam.id ? homeTeam : awayTeam;
    const players = servingTeam.players.slice(0, 6);
    const liberos = servingTeam.players.filter(p => p.position === 'Líbero');
    
    // Position Map (Top=Net)
    const positions = [
        { id: 4, label: 'FL', left: '20%', top: '30%' },
        { id: 3, label: 'FC', left: '50%', top: '30%' },
        { id: 2, label: 'FR', left: '80%', top: '30%' },
        { id: 5, label: 'BL', left: '20%', top: '70%' },
        { id: 6, label: 'BC', left: '50%', top: '70%' },
        { id: 1, label: 'BR', left: '80%', top: '70%' }, // Server
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-16 right-2 md:top-1/2 md:right-12 md:-translate-y-1/2 z-20 flex items-center gap-2 md:gap-4 origin-top-right md:origin-right transform scale-[0.45] md:scale-100"
        >
             {/* Libero Zone */}
             {liberos.length > 0 && (
                <div className="flex flex-col gap-2 p-2 bg-black/40 rounded border border-white/20 backdrop-blur-sm">
                    <div className="text-[10px] text-center font-bold text-white uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                        <Shield size={10} className="text-yellow-500"/> Líbero
                    </div>
                    {liberos.map(lib => (
                        <div key={lib.id} className="flex flex-col items-center">
                             <div className="relative">
                                <img src={lib.image} className="w-10 h-10 rounded-full border-2 border-yellow-500 bg-slate-200 object-cover shadow-md" />
                                <div className="absolute -bottom-1 -right-1 bg-yellow-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                                    {lib.number}
                                </div>
                             </div>
                             <span className="text-[8px] font-bold text-white mt-1 bg-black/50 px-1 rounded truncate max-w-[50px]">{lib.name}</span>
                        </div>
                    ))}
                </div>
             )}

             <div className="bg-[#eab308] border-4 border-white w-64 h-80 relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded">
                 {/* Court Lines */}
                 <div className="absolute top-[33%] w-full h-1 bg-white/50"></div> {/* Attack Line */}
                 <div className="absolute top-0 w-full h-2 bg-white"></div> {/* Net */}

                 {/* Team Header */}
                 <div className="absolute -top-12 w-full flex justify-center">
                     <div className="bg-[#001f5b] text-white px-4 py-1 rounded-t flex items-center gap-2 border-x-2 border-t-2 border-white">
                         <img src={servingTeam.logo} className="w-6 h-6 object-contain" />
                         <span className="font-sports font-bold uppercase">{servingTeam.shortName} Rotation</span>
                     </div>
                 </div>

                 {/* Players */}
                 {positions.map((pos, index) => {
                     const pIndex = pos.id - 1; 
                     const player = players[pIndex];

                     return (
                         <div key={pos.id} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: pos.left, top: pos.top }}>
                             {player ? (
                                 <>
                                     <div className="relative">
                                        <img src={player.image} className="w-12 h-12 rounded-full border-2 border-white bg-slate-200 object-cover shadow-md" />
                                        <div className="absolute -bottom-1 -right-1 bg-[#001f5b] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-white">
                                            {player.number}
                                        </div>
                                     </div>
                                     <span className="text-[8px] font-bold text-[#001f5b] mt-1 bg-white/80 px-1 rounded truncate max-w-[50px]">{player.name}</span>
                                 </>
                             ) : (
                                 <div className="w-10 h-10 rounded-full border-2 border-white/50 bg-black/10"></div>
                             )}
                         </div>
                     )
                 })}
             </div>
        </motion.div>
    );
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden text-white font-sports">
      
      {/* VNL Transition Stinger */}
      <AnimatePresence>
        {showStinger && (
            <motion.div 
                initial={{ x: '-100%' }} animate={{ x: '100%' }} exit={{ x: '100%' }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0 z-[100] bg-[#ff4600] skew-x-[-20deg] flex items-center justify-center border-x-[40px] border-white"
            >
                <div className="text-white font-bold text-9xl uppercase tracking-tighter italic drop-shadow-lg skew-x-[20deg] scale-150">VNL</div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Set Point Banner */}
      <AnimatePresence>
         {isSetPoint && (
             <motion.div 
                initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }}
                className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#001f5b] via-[#002875] to-[#001f5b] border-b-8 border-yellow-400 z-50 py-2 md:py-4 flex items-center justify-center shadow-2xl"
             >
                 <div className="flex items-center gap-4 animate-pulse">
                     <span className="text-xl md:text-5xl font-bold uppercase italic tracking-widest text-white drop-shadow-[0_4px_4px_rgba(0,0,0,1)]">
                         {match.currentSet === 4 && (currentSet.home >= 14 || currentSet.away >= 14) ? 'MATCH POINT' : 'SET POINT'}
                     </span>
                 </div>
             </motion.div>
         )}
      </AnimatePresence>

      {/* Intro Overlay */}
      <AnimatePresence>
      {broadcastState.showMatchIntro && (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#001f5b]/95 backdrop-blur-md pointer-events-auto"
        >
          {onCloseIntro && <button onClick={onCloseIntro} className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white"><X className="w-6 h-6 md:w-8 md:h-8" /></button>}
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex flex-col items-center w-full max-w-6xl p-4 origin-center transform scale-[0.65] md:scale-100">
            <div className="bg-[#ff4600] text-white px-8 md:px-12 py-2 md:py-3 text-xl md:text-3xl font-bold italic tracking-widest mb-8 md:mb-12 skew-x-[-10deg] border-4 border-white shadow-[0_0_50px_rgba(255,70,0,0.5)]">THE FINALS</div>
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-8">
               <div className="flex flex-col items-center">
                   <img src={homeTeam.logo} className="w-24 h-24 md:w-80 md:h-80 object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]" />
                   <h1 className="text-3xl md:text-9xl font-bold mt-4 italic text-center uppercase text-white drop-shadow-xl">{homeTeam.shortName}</h1>
               </div>
               <div className="text-4xl md:text-9xl font-bold text-yellow-400 italic mx-4 md:mx-8">VS</div>
               <div className="flex flex-col items-center">
                   <img src={awayTeam.logo} className="w-24 h-24 md:w-80 md:h-80 object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]" />
                   <h1 className="text-3xl md:text-9xl font-bold mt-4 italic text-center uppercase text-white drop-shadow-xl">{awayTeam.shortName}</h1>
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Mini Scorebug (Top Left) - SCALED DOWN CONTAINER, SCALED UP LOGO */}
      <AnimatePresence>
        {broadcastState.showMiniScorebug && !broadcastState.showScorebug && (
           <motion.div 
             initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }}
             // Ensure absolute top-left positioning works by removing confusing container classes if any
             className="absolute top-2 left-2 flex items-start z-30 font-sports shadow-[0_10px_30px_rgba(0,0,0,0.5)] origin-top-left transform scale-[0.6] md:scale-75"
           >
             {/* Championship Logo Left of Mini Bug - ENLARGED */}
             {championshipLogo && (
                 <div className="mr-3 bg-white/10 p-2 rounded backdrop-blur-sm shadow-lg border border-white/20">
                     <img src={championshipLogo} className="w-16 h-16 object-contain drop-shadow-md" />
                 </div>
             )}
             
             <div className="flex flex-col">
                <div className="flex bg-[#001f5b] text-white h-10 items-center px-4 border-l-8 border-[#ff4600] w-48 justify-between">
                    <span className="font-bold text-xl">{homeTeam.shortName}</span>
                    <div className="flex items-center">
                        <span className="bg-white text-[#001f5b] font-bold px-2 rounded text-lg min-w-[30px] text-center">{currentSet.home}</span>
                        {match.servingTeamId === homeTeam.id && <div className="ml-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>}
                    </div>
                </div>
                <div className="flex bg-[#001f5b] text-white h-10 items-center px-4 border-l-8 border-slate-400 mt-[2px] w-48 justify-between">
                    <span className="font-bold text-xl">{awayTeam.shortName}</span>
                    <div className="flex items-center">
                        <span className="bg-white text-[#001f5b] font-bold px-2 rounded text-lg min-w-[30px] text-center">{currentSet.away}</span>
                        {match.servingTeamId === awayTeam.id && <div className="ml-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>}
                    </div>
                </div>
                <div className="bg-[#ff4600] text-white text-[10px] text-center font-bold tracking-widest uppercase py-0.5">Set {match.currentSet + 1}</div>
             </div>
           </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Scorebug */}
      <AnimatePresence>
        {broadcastState.showScorebug && <VNLScorebug />}
      </AnimatePresence>

      {/* Serving Player Info (Lower Third) */}
      <AnimatePresence>
        {broadcastState.showServingInfo && <PlayerStatsCard />}
      </AnimatePresence>

      {/* Rotation Overlay (Visual Court) */}
      <AnimatePresence>
        {broadcastState.showRotation && <RotationOverlay />}
      </AnimatePresence>

      {/* Set Statistics Box */}
      <AnimatePresence>
        {broadcastState.showSetStats && <SetStatsTable />}
      </AnimatePresence>

      {/* Timeout View (Simplified) */}
      <AnimatePresence>
        {broadcastState.showTimeout && (
            <div className="absolute inset-0 z-50 bg-[#001f5b]/90 backdrop-blur-md flex items-center justify-center font-sports text-white">
              <motion.div 
                 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                 className="bg-white p-2 shadow-2xl skew-x-[-5deg] origin-center transform scale-[0.6] md:scale-100" 
              >
                  <div className="bg-[#001f5b] w-[90vw] max-w-[600px] flex flex-col items-center pb-8 border border-white/10 skew-x-[5deg]">
                       <div className="bg-[#ff4600] text-white w-full text-center py-4 text-4xl font-bold italic tracking-widest mb-8 uppercase border-b-4 border-white">Timeout</div>
                       <div className="flex w-full justify-around items-center px-4">
                           <div className="flex flex-col items-center">
                               <img src={homeTeam.logo} className="w-32 h-32 object-contain mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"/>
                               <div className="text-3xl font-bold text-[#001f5b] bg-white px-6 py-2 rounded uppercase italic">{homeTeam.shortName}</div>
                               <div className="text-8xl font-bold mt-4 text-white drop-shadow-xl">{currentSet.home}</div>
                           </div>
                           <div className="h-40 w-[4px] bg-white/20 rounded-full"></div>
                           <div className="flex flex-col items-center">
                               <img src={awayTeam.logo} className="w-32 h-32 object-contain mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"/>
                               <div className="text-3xl font-bold text-[#001f5b] bg-white px-6 py-2 rounded uppercase italic">{awayTeam.shortName}</div>
                               <div className="text-8xl font-bold mt-4 text-white drop-shadow-xl">{currentSet.away}</div>
                           </div>
                       </div>
                  </div>
              </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
};