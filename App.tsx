import React, { useState, useEffect, useRef } from 'react';
import { UserRole, Championship, Team, Match, BroadcastState, Player, ActionType, MatchEvent, User } from './types';
import { MOCK_USERS, PLACEHOLDER_LOGOS, POSITIONS } from './constants';
import { BroadcastOverlay } from './components/BroadcastOverlay';
import { generateAICommentary } from './services/geminiService';
import { 
  Trophy, Users, Calendar, Tv, Settings, LogOut, 
  Play, Pause, RotateCcw, Monitor, FileText, 
  Video, Mic, ShieldAlert, X, Shirt, BarChart2,
  Plus, Edit, Trash2, Save, UserPlus, Upload, ArrowLeft, Image as ImageIcon,
  Shuffle, List, Timer, Lock, User as UserIcon, StopCircle,
  ChevronDown, ChevronUp, Radio, Home, Camera, Gamepad2, Globe, Wifi, Maximize, Minimize, RefreshCcw, Hand, Zap, Medal, Star, Target
} from 'lucide-react';

// --- Components ---

const LoginScreen = ({ users, onLogin }: { users: User[], onLogin: (user: User) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.username === username && (u as any).password === password);
    
    if (user) {
      onLogin(user);
    } else {
      setError('Credenciales inválidas. Intente nuevamente.');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#020617] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-[#020617]"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]"></div>
      
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl shadow-2xl p-8 backdrop-blur-xl ring-1 ring-white/5">
          <div className="flex flex-col items-center mb-10">
             {/* JSport Corporate Logo */}
             <div className="flex items-center gap-3 mb-2 transform hover:scale-105 transition duration-500">
                 <div className="bg-blue-600 p-3 rounded-lg shadow-lg shadow-blue-500/40 skew-x-[-10deg] border border-blue-400">
                    <Trophy className="text-white w-8 h-8" strokeWidth={2.5} />
                 </div>
                 <h1 className="text-5xl font-sports font-bold text-white tracking-tighter italic drop-shadow-lg">
                    J<span className="text-blue-500">Sport</span>
                 </h1>
             </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">Usuario</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg leading-5 bg-slate-950/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 sm:text-sm"
                  placeholder="Ingrese su usuario"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg leading-5 bg-slate-950/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 sm:text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded border border-red-900/50 animate-pulse">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg shadow-blue-600/30 transition transform hover:scale-[1.02]"
            >
              Iniciar Sesión
            </button>
          </form>
          
          <div className="mt-6 text-center">
             <p className="text-xs text-slate-500">Credenciales Demo: admin / 123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PageContainer = ({ title, icon: Icon, onBack, children }: any) => (
    <div className="flex flex-col h-full w-full bg-transparent">
        <header className="bg-slate-950/80 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md backdrop-blur-md">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onBack} 
                    className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition flex items-center justify-center border border-slate-800 hover:border-slate-600"
                    title="Volver al Menú"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="h-8 w-[1px] bg-slate-800 mx-2 hidden md:block"></div>
                <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-3 uppercase tracking-wide">
                    {Icon && <Icon className="text-yellow-500" size={24} />}
                    {title}
                </h2>
            </div>
            
            {/* Small Header Logo */}
            <div className="flex items-center gap-2 opacity-90">
                <div className="bg-blue-600 p-1.5 rounded skew-x-[-10deg] shadow shadow-blue-500/20">
                    <Trophy size={14} className="text-white" strokeWidth={3}/>
                </div>
                <span className="font-sports font-bold text-xl italic tracking-tighter text-white">
                    J<span className="text-blue-500">Sport</span>
                </span>
            </div>
        </header>
        <div className="flex-1 overflow-hidden relative flex flex-col">
            {children}
        </div>
    </div>
);

const App = () => {
  // Global State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'teams' | 'fixture' | 'live' | 'control' | 'users' | 'stats'>('home');
  
  // Data State with LocalStorage Persistence
  const [users, setUsers] = useState<User[]>(() => {
      const saved = localStorage.getItem('voleypro_users');
      return saved ? JSON.parse(saved) : MOCK_USERS;
  });
  const [championships, setChampionships] = useState<Championship[]>(() => {
      const saved = localStorage.getItem('voleypro_championships');
      return saved ? JSON.parse(saved) : [];
  });
  const [teams, setTeams] = useState<Team[]>(() => {
      const saved = localStorage.getItem('voleypro_teams');
      return saved ? JSON.parse(saved) : [];
  });

  const [currentMatchId, setCurrentMatchId] = useState<string | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingChampId, setEditingChampId] = useState<string | null>(null);
  
  // Team Editing State
  const [isEditingTeam, setIsEditingTeam] = useState(false);

  // Live Match State
  const [broadcastState, setBroadcastState] = useState<BroadcastState>({
    showScorebug: false,
    showMiniScorebug: true,
    showServingInfo: false,
    showSetStats: false,
    showLowerThird: false,
    showRotation: false,
    showPlayerStats: false,
    showMatchIntro: false,
    showTimeout: false,
    showMicOverlay: true,
    activePlayerIdForStats: null,
    triggerTransition: false
  });
  const [aiCommentary, setAiCommentary] = useState<string>("");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  
  // Video Stream Ref
  const videoRef = useRef<HTMLVideoElement>(null);
  const broadcastContainerRef = useRef<HTMLDivElement>(null);
  
  // Synchronization Channel
  const syncChannelRef = useRef<BroadcastChannel | null>(null);

  // --- Persistence Effects ---
  useEffect(() => {
      localStorage.setItem('voleypro_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
      localStorage.setItem('voleypro_championships', JSON.stringify(championships));
  }, [championships]);

  useEffect(() => {
      localStorage.setItem('voleypro_teams', JSON.stringify(teams));
  }, [teams]);


  useEffect(() => {
    // Initialize BroadcastChannel for cross-tab sync on same machine
    const channel = new BroadcastChannel('voleypro_sync_channel');
    syncChannelRef.current = channel;

    channel.onmessage = (event) => {
        const { type, payload } = event.data;
        if (type === 'SYNC_STATE') {
            if (payload.championships) setChampionships(payload.championships);
            if (payload.broadcastState) setBroadcastState(payload.broadcastState);
            if (payload.currentMatchId) setCurrentMatchId(payload.currentMatchId);
        }
    };

    return () => {
        channel.close();
    };
  }, []);

  const broadcastUpdate = (updates: { championships?: Championship[], broadcastState?: BroadcastState, currentMatchId?: string | null }) => {
      // Local Update
      if (updates.championships) setChampionships(updates.championships);
      if (updates.broadcastState) setBroadcastState(updates.broadcastState);
      if (updates.currentMatchId !== undefined) setCurrentMatchId(updates.currentMatchId!);

      // Network Update
      if (syncChannelRef.current) {
          syncChannelRef.current.postMessage({
              type: 'SYNC_STATE',
              payload: updates
          });
      }
  };


  // --- Handlers ---

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
          if (broadcastContainerRef.current) {
              broadcastContainerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(err => console.log(err));
          }
      } else {
          document.exitFullscreen().then(() => setIsFullscreen(false));
      }
  };
  
  // Camera Access Effect
  useEffect(() => {
    let currentStream: MediaStream | null = null;
    
    const startCamera = async () => {
        setCameraError(null);
        if (activeTab === 'live' && currentUser?.role === UserRole.ADMIN) {
            
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                setCameraError("El navegador no soporta acceso a cámara o no es un contexto seguro (HTTPS).");
                return;
            }

            const getMedia = async (constraints: MediaStreamConstraints): Promise<MediaStream | null> => {
                try {
                    return await navigator.mediaDevices.getUserMedia(constraints);
                } catch (err) {
                    console.warn(`Failed to get media with constraints: ${JSON.stringify(constraints)}`, err);
                    return null;
                }
            };

            // Attempt sequence to find working hardware
            // Priority: User selection (facingMode)
            const constraints = { 
                video: { 
                    facingMode: facingMode
                }, 
                audio: true 
            };

            // 1. Try with preferred constraints
            let stream = await getMedia(constraints);
            
            // 2. Fallback: Any Video + Audio (if specific facingMode fails)
            if (!stream) {
                console.log("Preferred camera failed, falling back to any video input + audio.");
                stream = await getMedia({ video: true, audio: true });
            }

            if (stream) {
                currentStream = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    try {
                        await videoRef.current.play();
                    } catch(e) {
                        console.warn("Video auto-play failed", e);
                    }
                }
            } else {
                setCameraError("No se pudo acceder a la cámara. Intente cambiar (Frontal/Trasera) o revise permisos.");
            }
        }
    };

    startCamera();

    return () => {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
        }
    };
  }, [activeTab, currentUser, facingMode]); // Added facingMode to dependency

  const handleCreateChampionship = async (name: string, logoFile: File | null) => {
    let logoUrl = "https://picsum.photos/id/1015/200/200";
    if (logoFile) {
        logoUrl = await getBase64(logoFile);
    }

    const newChamp: Championship = {
      id: Date.now().toString(),
      name,
      logo: logoUrl,
      teams: teams, 
      groups: [],
      matches: []
    };
    
    // Logic: Random groups of 4
    if (teams.length > 0) {
      const shuffledTeams = [...teams].sort(() => 0.5 - Math.random());
      for (let i = 0; i < shuffledTeams.length; i += 4) {
        const groupTeams = shuffledTeams.slice(i, i + 4);
        if (groupTeams.length === 0) continue;

        newChamp.groups.push({
          name: `Grupo ${String.fromCharCode(65 + i/4)}`,
          teamIds: groupTeams.map(t => t.id)
        });
        
        // Round Robin Fixture (All vs All)
        for (let j = 0; j < groupTeams.length; j++) {
          for (let k = j + 1; k < groupTeams.length; k++) {
             newChamp.matches.push({
               id: `match_${Date.now()}_${j}_${k}`,
               championshipId: newChamp.id,
               homeTeamId: groupTeams[j].id,
               awayTeamId: groupTeams[k].id,
               date: new Date(Date.now() + 86400000 * (j+k)).toISOString(),
               status: 'SCHEDULED',
               phase: 'GROUP',
               currentSet: 0,
               sets: [{home:0, away:0}],
               events: [],
               servingTeamId: groupTeams[j].id,
               timeouts: {},
               substitutions: {}
             });
          }
        }
      }
    }
    broadcastUpdate({ championships: [...championships, newChamp] });
  };

  const handleDeleteChampionship = (id: string) => {
      if(window.confirm("¿Estás seguro de eliminar este campeonato y todos sus partidos?")) {
          broadcastUpdate({ championships: championships.filter(c => c.id !== id) });
      }
  };

  const handleUpdateMatchStatus = (matchId: string, status: 'LIVE' | 'FINISHED' | 'SCHEDULED') => {
      broadcastUpdate({ 
          championships: championships.map(c => ({
            ...c,
            matches: c.matches.map(m => m.id === matchId ? { ...m, status } : m)
          }))
      });
  };

  const handleGenerateNextPhase = (champId: string) => {
      const champ = championships.find(c => c.id === champId);
      if(!champ || champ.groups.length < 2) return; 

      const standings: Record<string, { teamId: string, points: number }> = {};
      champ.teams.forEach(t => standings[t.id] = { teamId: t.id, points: 0 });

      champ.matches.filter(m => m.phase === 'GROUP' && m.status === 'FINISHED').forEach(m => {
          const homeWins = m.sets.filter(s => s.home > s.away).length;
          const awayWins = m.sets.filter(s => s.away > s.home).length;
          
          if(homeWins === 3) {
             standings[m.homeTeamId].points += (awayWins <= 1 ? 3 : 2);
             standings[m.awayTeamId].points += (awayWins === 2 ? 1 : 0);
          } else if (awayWins === 3) {
             standings[m.awayTeamId].points += (homeWins <= 1 ? 3 : 2);
             standings[m.homeTeamId].points += (homeWins === 2 ? 1 : 0);
          }
      });

      const qualifiedTeams: Record<string, string[]> = {}; 
      
      champ.groups.forEach(group => {
          const groupStandings = group.teamIds
              .map(tid => standings[tid])
              .sort((a,b) => b.points - a.points)
              .slice(0, 2);
          qualifiedTeams[group.name] = groupStandings.map(s => s.teamId);
      });

      const groupA = champ.groups[0];
      const groupB = champ.groups[1];

      if(groupA && groupB && qualifiedTeams[groupA.name].length === 2 && qualifiedTeams[groupB.name].length === 2) {
          const semi1 = {
             id: `semi_1_${Date.now()}`,
             championshipId: champ.id,
             homeTeamId: qualifiedTeams[groupA.name][0],
             awayTeamId: qualifiedTeams[groupB.name][1],
             date: new Date(Date.now() + 86400000 * 5).toISOString(),
             status: 'SCHEDULED',
             phase: 'SEMIFINAL',
             currentSet: 0,
             sets: [{home:0, away:0}],
             events: [],
             servingTeamId: qualifiedTeams[groupA.name][0],
             timeouts: {},
             substitutions: {}
          } as Match;

          const semi2 = {
             id: `semi_2_${Date.now()}`,
             championshipId: champ.id,
             homeTeamId: qualifiedTeams[groupB.name][0],
             awayTeamId: qualifiedTeams[groupA.name][1],
             date: new Date(Date.now() + 86400000 * 5).toISOString(),
             status: 'SCHEDULED',
             phase: 'SEMIFINAL',
             currentSet: 0,
             sets: [{home:0, away:0}],
             events: [],
             servingTeamId: qualifiedTeams[groupB.name][0],
             timeouts: {},
             substitutions: {}
          } as Match;
          
          const updatedMatches = [...champ.matches, semi1, semi2];
          broadcastUpdate({ championships: championships.map(c => c.id === champId ? { ...c, matches: updatedMatches } : c) });
      }
  };

  const handleCreateTeam = async (name: string, coach: string, logoFile: File | null) => {
    let logoUrl = PLACEHOLDER_LOGOS[Math.floor(Math.random() * PLACEHOLDER_LOGOS.length)];
    if (logoFile) {
        logoUrl = await getBase64(logoFile);
    }

    const newTeam: Team = {
      id: `team_${Date.now()}`,
      name,
      shortName: name.substring(0,3).toUpperCase(),
      color: '#' + Math.floor(Math.random()*16777215).toString(16),
      logo: logoUrl,
      coach,
      players: [],
      rosterIds: []
    };
    setTeams([...teams, newTeam]);
  };

  const handleUpdateTeam = async (teamId: string, name: string, coach: string, logoFile: File | null) => {
     let logoUrl = undefined;
     if (logoFile) {
         logoUrl = await getBase64(logoFile);
     }
     
     setTeams(prev => prev.map(t => {
         if (t.id === teamId) {
             return {
                 ...t,
                 name,
                 coach,
                 shortName: name.substring(0,3).toUpperCase(),
                 logo: logoUrl || t.logo
             }
         }
         return t;
     }));
     setIsEditingTeam(false);
  };

  const handleAddOrUpdatePlayer = async (teamId: string, formData: any, photoFile: File | null) => {
    let photoUrl = editingPlayer?.image || `https://picsum.photos/seed/${Math.random()}/200`;
    if (photoFile) {
        photoUrl = await getBase64(photoFile);
    }

    const playerData = {
        name: formData.name,
        number: parseInt(formData.number),
        position: formData.position as any,
        height: formData.height,
        weight: formData.weight,
        age: formData.age,
        image: photoUrl
    };

    if (editingPlayer) {
        setTeams(prev => prev.map(t => {
            if (t.id === teamId) {
                return {
                    ...t,
                    players: t.players.map(p => p.id === editingPlayer.id ? { ...p, ...playerData } : p)
                };
            }
            return t;
        }));
        setEditingPlayer(null);
    } else {
        const newPlayer: Player = {
            id: `p_${Date.now()}`,
            ...playerData,
            stats: { points: 0, aces: 0, blocks: 0, attacks: 0 }
        };
    
        setTeams(prev => prev.map(t => {
            if (t.id === teamId) {
                const updatedPlayers = [...t.players, newPlayer];
                const updatedRoster = updatedPlayers.length <= 6 ? updatedPlayers.map(p => p.id) : t.rosterIds;
                return { ...t, players: updatedPlayers, rosterIds: updatedRoster };
            }
            return t;
        }));
    }
  };

  // User Mgmt Logic
  const handleAddOrUpdateUser = (formData: any) => {
      const userData = {
          name: formData.name,
          username: formData.username,
          password: formData.password,
          role: formData.role,
      };

      if (editingUser) {
          setUsers(prev => prev.map(u => u.username === editingUser.username ? { ...u, ...userData } : u));
          setEditingUser(null);
      } else {
          // Check uniqueness
          if (users.find(u => u.username === userData.username)) {
              alert("El nombre de usuario ya existe.");
              return;
          }
          setUsers([...users, userData]);
      }
  };

  const handleEditMatchDate = (matchId: string, newDate: string) => {
    broadcastUpdate({ 
        championships: championships.map(c => ({
            ...c,
            matches: c.matches.map(m => m.id === matchId ? { ...m, date: newDate } : m)
        }))
    });
  };

  const handleScoreUpdate = async (matchId: string, teamId: string, points: number, action: ActionType, playerId?: string | null) => {
    const champs = [...championships];
    let match: Match | undefined;
    champs.forEach(c => {
      const m = c.matches.find(m => m.id === matchId);
      if(m) match = m;
    });

    if (!match) return;

    const isHome = match.homeTeamId === teamId;
    const currentSetIdx = match.currentSet;
    const setScore = match.sets[currentSetIdx];

    if (isHome) setScore.home += points;
    else setScore.away += points;

    const event: MatchEvent = {
      id: Date.now().toString(),
      type: action,
      teamId,
      playerId: playerId || undefined,
      scoreSnapshot: { ...setScore },
      timestamp: Date.now(),
      description: `${action} de ${isHome ? 'Casa' : 'Visita'}`
    };
    match.events.push(event);

    if (playerId) {
        // Find team across all teams to ensure we update the master record
        const teamIndex = teams.findIndex(t => t.id === teamId);
        if (teamIndex !== -1) {
             const updatedTeams = [...teams];
             const player = updatedTeams[teamIndex].players.find(p => p.id === playerId);
             
             if (player) {
                // Update stats based on action
                if(points > 0) player.stats.points += points;
                if(action === ActionType.SERVE_ACE) player.stats.aces++;
                if(action === ActionType.BLOCK) player.stats.blocks++;
                if(action === ActionType.ATTACK) player.stats.attacks++;
                
                // Save global teams state to persist stats
                setTeams(updatedTeams);
             }
        }
    }
    
    // Set logic
    let newState = {...broadcastState};
    if ((setScore.home >= 25 || setScore.away >= 25) && Math.abs(setScore.home - setScore.away) >= 2) {
        match.currentSet++;
        match.sets.push({home: 0, away: 0});
        newState.showMatchIntro = true;
        setTimeout(() => broadcastUpdate({ broadcastState: {...broadcastState, showMatchIntro: false} }), 3000);
    }
    
    // Check Match End (Best of 5)
    const homeSets = match.sets.filter(s => s.home > s.away && (s.home >= 25 || (match.sets.indexOf(s) === 4 && s.home >= 15))).length;
    const awaySets = match.sets.filter(s => s.away > s.home && (s.away >= 25 || (match.sets.indexOf(s) === 4 && s.away >= 15))).length;
    
    if (homeSets === 3 || awaySets === 3) {
        match.status = 'FINISHED';
    }

    if (match.servingTeamId !== teamId) {
       match.servingTeamId = teamId;
    }

    broadcastUpdate({ championships: champs, broadcastState: newState });
    
    const homeTeam = teams.find(t => t.id === match!.homeTeamId)!;
    const awayTeam = teams.find(t => t.id === match!.awayTeamId)!;
    const commentary = await generateAICommentary(match, homeTeam, awayTeam, event);
    setAiCommentary(commentary);
  };

  const toggleBroadcastFeature = (feature: keyof BroadcastState) => {
     const newState = { ...broadcastState, [feature]: !broadcastState[feature] };
     broadcastUpdate({ broadcastState: newState });
  };


  if (!currentUser) return <LoginScreen users={users} onLogin={setCurrentUser} />;

  // --- Views ---

  const renderHome = () => {
    // Filter buttons based on role
    const menuItems = [
        { id: 'teams', icon: Shirt, label: 'Equipos', color: 'bg-blue-600' },
        { id: 'fixture', icon: Calendar, label: 'Fixture', color: 'bg-green-600' },
        { id: 'live', icon: Tv, label: 'Transmisión', color: 'bg-red-600' },
        { id: 'users', icon: Users, label: 'Usuarios', color: 'bg-purple-600' },
        { id: 'stats', icon: BarChart2, label: 'Estadísticas', color: 'bg-orange-600' },
    ].filter(item => item.id !== 'users' || currentUser.role === UserRole.ADMIN);

    return (
    <div className="flex flex-col items-center justify-center h-full text-white p-4 overflow-y-auto">
        <div className="mb-12 flex flex-col items-center animate-fade-in-up">
            <div className="relative mb-6 group cursor-default">
                <div className="absolute inset-0 bg-blue-600 blur-[60px] opacity-20 rounded-full group-hover:opacity-30 transition duration-500"></div>
                <div className="relative bg-slate-900/50 border border-slate-700/50 p-8 rounded-3xl shadow-2xl backdrop-blur-sm flex items-center gap-6 transform -skew-x-6 hover:scale-105 transition duration-500">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-5 rounded-2xl shadow-inner border border-white/10">
                        <Trophy size={64} className="text-white" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-7xl md:text-8xl font-sports font-bold text-white tracking-tighter italic leading-none drop-shadow-2xl">
                            J<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Sport</span>
                        </h1>
                        <span className="text-sm text-slate-400 font-bold tracking-[0.3em] uppercase mt-2 text-right">Solutions</span>
                    </div>
                </div>
            </div>
            <p className="text-blue-400 tracking-widest uppercase text-xs font-bold mt-8 bg-blue-900/20 px-6 py-2 rounded-full border border-blue-900/50 shadow-lg">Professional Volleyball Manager</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full max-w-4xl px-4 mb-8">
            {menuItems.map(item => (
                <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className="group relative overflow-hidden rounded-2xl p-6 md:p-8 bg-slate-800/80 border border-slate-700 hover:border-slate-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col items-center gap-4 backdrop-blur-sm"
                >
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${item.color}`}></div>
                    <div className={`p-4 rounded-full bg-slate-950 text-white group-hover:scale-110 transition-transform duration-300 ${item.color.replace('bg-', 'text-')}`}>
                        <item.icon size={32} />
                    </div>
                    <span className="font-bold text-lg md:text-xl text-slate-200 group-hover:text-white uppercase tracking-wider">{item.label}</span>
                </button>
            ))}
        </div>
        
        <button onClick={() => setCurrentUser(null)} className="mt-auto md:mt-12 text-slate-500 hover:text-red-400 flex items-center gap-2 text-sm transition py-4">
            <LogOut size={16} /> Cerrar Sesión
        </button>
    </div>
  );
  };

  const renderTeams = () => {
    const content = selectedTeamId ? (
        <div className="p-4 md:p-8 overflow-y-auto h-full pb-20">
           <button onClick={() => { setSelectedTeamId(null); setEditingPlayer(null); setIsEditingTeam(false); }} className="mb-4 flex items-center gap-2 text-slate-400 hover:text-white transition">
              <ArrowLeft size={20} /> Volver a Lista
           </button>
           
           <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 mb-8 bg-slate-800/50 p-4 md:p-8 rounded-xl border border-slate-700 shadow-xl relative backdrop-blur-sm">
               {currentUser.role === UserRole.ADMIN && !isEditingTeam && (
                   <button onClick={() => setIsEditingTeam(true)} className="absolute top-4 right-4 text-slate-500 hover:text-white">
                       <Edit size={20} />
                   </button>
               )}

               {isEditingTeam ? (
                    <form onSubmit={(e: any) => {
                        e.preventDefault();
                        handleUpdateTeam(selectedTeamId, e.target.name.value, e.target.coach.value, e.target.logo.files[0]);
                    }} className="flex-1 w-full">
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4 items-center">
                                {/* Safe access to team using selectedTeamId */}
                                <img src={teams.find(t => t.id === selectedTeamId)?.logo} className="w-20 h-20 rounded-full border border-slate-600 opacity-50"/>
                                <div className="flex-1">
                                    <label className="text-xs text-slate-400">Cambiar Logo</label>
                                    <input type="file" name="logo" accept="image/*" className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"/>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-slate-400">Nombre del Equipo</label>
                                <input name="name" defaultValue={teams.find(t => t.id === selectedTeamId)?.name} className="w-full bg-slate-700 p-2 rounded text-white border border-slate-600 focus:border-blue-500 focus:outline-none" required />
                            </div>
                             <div>
                                <label className="text-xs text-slate-400">Entrenador</label>
                                <input name="coach" defaultValue={teams.find(t => t.id === selectedTeamId)?.coach} className="w-full bg-slate-700 p-2 rounded text-white border border-slate-600 focus:border-blue-500 focus:outline-none" required />
                            </div>
                            <div className="flex gap-2 justify-end">
                                <button type="button" onClick={() => setIsEditingTeam(false)} className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-white">Cancelar</button>
                                <button type="submit" className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white font-bold">Guardar Cambios</button>
                            </div>
                        </div>
                    </form>
               ) : (
                <>
                    <img src={teams.find(t => t.id === selectedTeamId)?.logo} className="w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-yellow-500 object-cover shadow-lg" />
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-sports text-white mb-2">{teams.find(t => t.id === selectedTeamId)?.name}</h2>
                        <p className="text-lg md:text-xl text-slate-400">Entrenador: <span className="text-white">{teams.find(t => t.id === selectedTeamId)?.coach}</span></p>
                        <div className="mt-4 flex gap-4 justify-center md:justify-start">
                            <span className="bg-blue-900 px-3 py-1 rounded text-sm text-blue-200 border border-blue-800">{(teams.find(t => t.id === selectedTeamId)?.players || []).length} Jugadores</span>
                            <span className="bg-slate-700 px-3 py-1 rounded text-sm text-slate-200">{teams.find(t => t.id === selectedTeamId)?.shortName}</span>
                        </div>
                    </div>
                </>
               )}
           </div>

           {/* Add/Edit Player Form */}
           {currentUser.role === UserRole.ADMIN && !isEditingTeam && (
               <div className="bg-slate-800/50 p-4 md:p-6 rounded-lg border border-slate-700 mb-8 transition-colors shadow-lg backdrop-blur-sm" style={editingPlayer ? {borderColor: '#eab308'} : {}}>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                      {editingPlayer ? <Edit size={18} className="text-yellow-500"/> : <UserPlus size={18} className="text-blue-500"/>} 
                      {editingPlayer ? `Editar: ${editingPlayer.name}` : 'Agregar Jugador'}
                  </h3>
                  <form onSubmit={(e: any) => {
                     e.preventDefault();
                     const formData = {
                         name: e.target.name.value,
                         number: e.target.number.value,
                         position: e.target.position.value,
                         height: e.target.height.value,
                         weight: e.target.weight.value,
                         age: e.target.age.value,
                     };
                     const photo = e.target.photo.files[0];
                     handleAddOrUpdatePlayer(selectedTeamId, formData, photo);
                     e.target.reset();
                  }}>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-4">
                          <div className="md:col-span-2">
                              <label className="text-xs text-slate-400">Nombre</label>
                              <input name="name" defaultValue={editingPlayer?.name} className="w-full bg-slate-700 p-2 rounded text-white border border-slate-600 focus:border-blue-500 focus:outline-none" required />
                          </div>
                          <div>
                              <label className="text-xs text-slate-400">Número</label>
                              <input type="number" name="number" defaultValue={editingPlayer?.number} className="w-full bg-slate-700 p-2 rounded text-white border border-slate-600 focus:border-blue-500 focus:outline-none" required />
                          </div>
                          <div>
                              <label className="text-xs text-slate-400">Posición</label>
                              <select name="position" defaultValue={editingPlayer?.position} className="w-full bg-slate-700 p-2 rounded text-white border border-slate-600 focus:border-blue-500 focus:outline-none">
                                  {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                              </select>
                          </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                          <div>
                              <label className="text-xs text-slate-400">Altura (m)</label>
                              <input name="height" defaultValue={editingPlayer?.height} placeholder="1.90" className="w-full bg-slate-700 p-2 rounded text-white border border-slate-600" />
                          </div>
                          <div>
                              <label className="text-xs text-slate-400">Peso (kg)</label>
                              <input name="weight" defaultValue={editingPlayer?.weight} placeholder="85" className="w-full bg-slate-700 p-2 rounded text-white border border-slate-600" />
                          </div>
                          <div>
                              <label className="text-xs text-slate-400">Edad</label>
                              <input name="age" type="number" defaultValue={editingPlayer?.age} className="w-full bg-slate-700 p-2 rounded text-white border border-slate-600" />
                          </div>
                          <div>
                             <label className="block text-xs text-slate-400 mb-1 cursor-pointer hover:text-white flex items-center gap-1">
                                <ImageIcon size={14}/> {editingPlayer ? 'Foto' : 'Foto'}
                             </label>
                             <input type="file" name="photo" accept="image/*" className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-slate-700 file:text-white hover:file:bg-slate-600"/>
                          </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button className={`flex-1 py-2 rounded text-white font-bold flex items-center justify-center transition shadow-lg ${editingPlayer ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-blue-600 hover:bg-blue-500'}`}>
                            {editingPlayer ? <Save size={20} className="mr-2"/> : <Plus size={20} className="mr-2"/>}
                            {editingPlayer ? 'Guardar' : 'Agregar'}
                        </button>
                        {editingPlayer && (
                            <button type="button" onClick={() => setEditingPlayer(null)} className="bg-red-600 hover:bg-red-500 px-4 rounded text-white transition"><X size={20}/></button>
                        )}
                      </div>
                  </form>
               </div>
           )}

           <h3 className="text-2xl font-bold mb-4 text-white">Plantel <span className="text-sm font-normal text-slate-400">(Click para editar)</span></h3>
           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(teams.find(t => t.id === selectedTeamId)?.players || []).map(p => (
                  <div key={p.id} onClick={() => setEditingPlayer(p)} className="bg-slate-800 p-4 rounded-lg flex items-center gap-4 hover:bg-slate-700 transition relative overflow-hidden group cursor-pointer border border-slate-700 hover:border-yellow-500/50 shadow-md">
                      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition">
                         <Edit size={16} className="text-yellow-500"/>
                      </div>
                      <img src={p.image} className="w-16 h-16 rounded-full object-cover border-2 border-slate-600" />
                      <div>
                          <div className="font-bold text-lg text-white">{p.name}</div>
                          <div className="text-sm text-yellow-500 font-mono">#{p.number} • {p.position}</div>
                          <div className="text-xs text-slate-400 mt-1 flex gap-2">
                             <span>{p.height}m</span>•<span>{p.age} años</span>
                          </div>
                      </div>
                  </div>
              ))}
              {(teams.find(t => t.id === selectedTeamId)?.players || []).length === 0 && <p className="text-slate-500 italic col-span-3">No hay jugadores registrados.</p>}
           </div>
        </div>
    ) : (
      <div className="p-4 md:p-8 overflow-y-auto h-full pb-20">
        {currentUser.role === UserRole.ADMIN && (
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8 shadow-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-white">Crear Nuevo Equipo</h3>
              <form onSubmit={(e: any) => { 
                e.preventDefault(); 
                handleCreateTeam(e.target.name.value, e.target.coach.value, e.target.logo.files[0]); 
                e.target.reset(); 
              }}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-1">
                      <input name="name" placeholder="Nombre del Equipo" className="w-full bg-slate-700 p-2 rounded text-white border border-slate-600 focus:border-blue-500 focus:outline-none" required />
                    </div>
                    <div className="md:col-span-1">
                      <input name="coach" placeholder="Entrenador" className="w-full bg-slate-700 p-2 rounded text-white border border-slate-600 focus:border-blue-500 focus:outline-none" required />
                    </div>
                    <div className="md:col-span-1">
                        <label className="text-xs text-slate-400 block mb-1">Logo del Equipo</label>
                        <input type="file" name="logo" accept="image/*" className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"/>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white font-bold flex items-center justify-center gap-2 h-10 w-full transition shadow-md"><Plus size={16}/> Crear</button>
                  </div>
              </form>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => (
            <div key={team.id} onClick={() => setSelectedTeamId(team.id)} className="bg-slate-800 rounded-xl p-6 border border-slate-700 relative group hover:border-blue-500 transition cursor-pointer hover:shadow-xl hover:shadow-blue-900/20">
               <div className="absolute top-4 right-4 text-slate-500 group-hover:text-blue-400">
                 <Edit size={16} />
               </div>
               <div className="flex items-center gap-4 mb-4">
                 <img src={team.logo} className="w-16 h-16 rounded-full border-2 border-slate-600 object-cover" />
                 <div>
                   <h3 className="text-xl font-bold group-hover:text-blue-400 transition text-white">{team.name}</h3>
                   <p className="text-sm text-slate-400">{team.coach}</p>
                 </div>
               </div>
               <div className="bg-slate-900 rounded p-2 text-sm text-slate-400 flex justify-between">
                 <span>Plantel: <span className="font-bold text-white">{team.players.length}</span></span>
                 <span className="text-xs text-blue-400">Click para editar</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    );

    return (
        <PageContainer title="Equipos" icon={Shirt} onBack={() => setActiveTab('home')}>
            {content}
        </PageContainer>
    );
  };

  const renderFixture = () => { 
    const content = (
    <div className="p-4 md:p-8 overflow-y-auto h-full pb-20">
      {currentUser.role === UserRole.ADMIN && (
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8 shadow-lg backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-white">Nuevo Campeonato</h3>
            <form onSubmit={(e: any) => { 
                e.preventDefault(); 
                handleCreateChampionship(e.target.name.value, e.target.logo.files[0]); 
                e.target.reset(); 
            }}>
               <div className="flex gap-4 items-end flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                      <input name="name" placeholder="Nombre del Torneo" className="w-full bg-slate-700 p-2 rounded text-white border border-slate-600 focus:border-blue-500 focus:outline-none" required />
                  </div>
                  <div className="min-w-[200px]">
                      <label className="text-xs text-slate-400 block mb-1">Logo Campeonato</label>
                      <input type="file" name="logo" accept="image/*" className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600"/>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded text-white font-bold h-10 transition shadow-md">Generar</button>
               </div>
               <p className="text-xs text-slate-400 mt-2">* Genera automáticamente grupos aleatorios y partidos.</p>
            </form>
        </div>
      )}

      <div className="space-y-8">
        {championships.map(champ => (
          <div key={champ.id} className="bg-slate-800/80 rounded-lg p-4 md:p-6 border border-slate-700 shadow-xl relative overflow-hidden backdrop-blur-sm">
             {champ.logo && <img src={champ.logo} className="absolute top-0 right-0 w-24 h-24 md:w-48 md:h-48 object-contain opacity-10 pointer-events-none" />}
            
            <div className="flex items-center justify-between mb-6 relative z-10 border-b border-white/10 pb-4">
               <div className="flex items-center gap-4">
                   {champ.logo && <img src={champ.logo} className="w-12 h-12 md:w-20 md:h-20 rounded object-contain shadow-lg bg-white/5 p-1" />}
                   <div>
                     {editingChampId === champ.id ? (
                        <div className="flex items-center gap-2">
                             <input 
                                defaultValue={champ.name} 
                                className="bg-slate-900 border border-slate-500 rounded p-1 text-white"
                                onBlur={(e) => {
                                    setChampionships(prev => prev.map(c => c.id === champ.id ? { ...c, name: e.target.value } : c));
                                    setEditingChampId(null);
                                }}
                                autoFocus
                             />
                             <button onClick={() => setEditingChampId(null)}><Save size={16} /></button>
                        </div>
                     ) : (
                        <h3 className="text-lg md:text-2xl font-sports text-yellow-500 flex items-center gap-2">
                            {champ.name}
                            {currentUser.role === UserRole.ADMIN && (
                                <button onClick={() => setEditingChampId(champ.id)} className="text-slate-500 hover:text-white transition scale-75"><Edit size={16} /></button>
                            )}
                        </h3>
                     )}
                     <span className="bg-slate-700 px-3 py-1 rounded text-xs text-white">{champ.matches.length} Partidos</span>
                   </div>
               </div>
               <div className="flex gap-2">
                   {currentUser.role === UserRole.ADMIN && (
                       <>
                        <button 
                            onClick={() => handleGenerateNextPhase(champ.id)}
                            className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1 md:px-4 md:py-2 rounded text-white font-bold flex items-center gap-2 shadow-lg transition text-xs md:text-base"
                        >
                            <Shuffle size={16}/> <span className="hidden md:inline">Semis</span>
                        </button>
                        <button 
                            onClick={() => handleDeleteChampionship(champ.id)}
                            className="bg-red-600 hover:bg-red-500 px-3 py-1 md:px-4 md:py-2 rounded text-white font-bold flex items-center gap-2 shadow-lg transition text-xs md:text-base"
                            title="Eliminar Campeonato"
                        >
                            <Trash2 size={16}/> 
                        </button>
                       </>
                   )}
               </div>
            </div>

            <h4 className="font-bold text-lg mb-4 text-slate-300 relative z-10 flex items-center gap-2"><Users size={18}/> Grupos y Equipos</h4>
            <div className="flex gap-4 overflow-x-auto pb-4 relative z-10 mb-6">
                {champ.groups.map(g => (
                    <div key={g.name} className="bg-slate-900/80 backdrop-blur-sm px-4 py-3 rounded-lg border-t-4 border-yellow-500 shadow-lg min-w-[200px]">
                        <div className="text-xs text-slate-400 uppercase tracking-widest mb-2 flex justify-between border-b border-slate-700 pb-1">
                            <span>Grupo</span> 
                            <span className="text-yellow-500 font-bold">{g.name.replace('Grupo ', '')}</span>
                        </div>
                        <div className="space-y-2">
                            {g.teamIds.map(tid => {
                                const t = teams.find(team => team.id === tid);
                                return t ? (
                                    <div key={tid} className="flex items-center gap-2 text-sm text-slate-200">
                                        <img src={t.logo} className="w-5 h-5 rounded-full bg-white/10 p-0.5"/>
                                        <span className="truncate">{t.name}</span>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>
                ))}
            </div>
            
            <h4 className="font-bold text-lg mb-4 text-slate-300 relative z-10">Partidos</h4>
            
            <div className="space-y-8 relative z-10">
                {champ.groups.map(group => {
                    const groupMatches = champ.matches.filter(m => {
                        return group.teamIds.includes(m.homeTeamId) && group.teamIds.includes(m.awayTeamId);
                    }).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                    if (groupMatches.length === 0) return null;

                    return (
                        <div key={group.name} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                             <h5 className="text-blue-400 font-bold mb-3 border-b border-slate-700 pb-1 flex items-center gap-2"><List size={16}/> {group.name}</h5>
                             <div className="space-y-2">
                                {groupMatches.map(m => {
                                    const home = teams.find(t => t.id === m.homeTeamId);
                                    const away = teams.find(t => t.id === m.awayTeamId);
                                    return (
                                        <div key={m.id} className="flex flex-col md:flex-row items-center justify-between bg-slate-800 p-3 rounded hover:bg-slate-700 transition border border-transparent hover:border-slate-600">
                                            <div className="flex items-center gap-3 flex-1 justify-end w-full md:w-auto">
                                                <span className="font-bold text-white text-sm md:text-base">{home?.name}</span>
                                                <img src={home?.logo} className="w-8 h-8 rounded-full object-cover" />
                                            </div>
                                            
                                            <div className="flex flex-col items-center mx-4 min-w-[150px] my-2 md:my-0">
                                                {currentUser.role === UserRole.ADMIN ? (
                                                     <input 
                                                        type="datetime-local" 
                                                        value={m.date.substring(0, 16)} 
                                                        onChange={(e) => handleEditMatchDate(m.id, e.target.value)}
                                                        className="bg-slate-900 text-[10px] text-white p-1 rounded border border-slate-600 w-full mb-1 text-center"
                                                    />
                                                ) : (
                                                    <span className="text-[10px] text-slate-400 mb-1">{new Date(m.date).toLocaleString()}</span>
                                                )}
                                                
                                                <div className="font-sports text-xl font-bold px-3 py-0.5 bg-black rounded border border-slate-600 text-white flex gap-2">
                                                    <span>{m.sets.reduce((a,b) => a + (b.home > b.away ? 1 : 0), 0)}</span>
                                                    <span>-</span>
                                                    <span>{m.sets.reduce((a,b) => a + (b.away > b.home ? 1 : 0), 0)}</span>
                                                </div>
                                                <div className="text-[10px] uppercase font-bold mt-1 text-slate-500">{m.status === 'LIVE' ? 'EN VIVO' : m.status === 'FINISHED' ? 'FINALIZADO' : 'PROGRAMADO'}</div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3 flex-1 w-full md:w-auto">
                                                <img src={away?.logo} className="w-8 h-8 rounded-full object-cover" />
                                                <span className="font-bold text-white text-sm md:text-base">{away?.name}</span>
                                            </div>

                                            <button 
                                                onClick={() => { setCurrentMatchId(m.id); setActiveTab('control'); }}
                                                className={`mt-2 md:mt-0 ml-0 md:ml-4 p-2 rounded text-white shadow-lg transition w-full md:w-auto flex justify-center items-center gap-2 ${m.status === 'LIVE' ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-600 hover:bg-blue-500'}`}
                                                title="Ir a Panel de Control"
                                            >
                                                <Gamepad2 size={16} /> <span className="md:hidden">Controlar</span>
                                            </button>
                                        </div>
                                    );
                                })}
                             </div>
                        </div>
                    );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
    );
    
    return (
        <PageContainer title="Fixture & Torneos" icon={Calendar} onBack={() => setActiveTab('home')}>
            {content}
        </PageContainer>
    );
  };

  const renderUsers = () => (
     <PageContainer title="Gestión de Usuarios" icon={Users} onBack={() => setActiveTab('home')}>
     <div className="p-4 md:p-8 overflow-y-auto h-full pb-20">
      {/* ... (Existing User Code) ... */}
     </div>
    </PageContainer>
  );

  const renderStats = () => {
    // Calculate Dream Team (Simple logic: Best in each category)
    const allPlayers = teams.flatMap(t => t.players.map(p => ({...p, teamLogo: t.logo, teamName: t.shortName})));
    
    const sortedByPoints = [...allPlayers].sort((a,b) => b.stats.points - a.stats.points);
    const sortedByBlocks = [...allPlayers].filter(p => p.position === 'Central').sort((a,b) => b.stats.blocks - a.stats.blocks);
    const sortedByAttacks = [...allPlayers].filter(p => p.position === 'Punta' || p.position === 'Opuesto').sort((a,b) => b.stats.attacks - a.stats.attacks);
    const sortedByAces = [...allPlayers].sort((a,b) => b.stats.aces - a.stats.aces);
    
    const mvp = sortedByPoints[0];
    const bestBlocker = sortedByBlocks[0];
    const bestSpiker = sortedByAttacks[0];
    const bestServer = sortedByAces[0];

    return (
     <PageContainer title="Estadísticas & Dream Team" icon={BarChart2} onBack={() => setActiveTab('home')}>
     <div className="p-4 md:p-8 overflow-y-auto h-full pb-20">
        
        {/* Dream Team Section */}
        <div className="mb-8">
            <h3 className="text-2xl font-sports mb-6 text-yellow-500 flex items-center gap-2"><Star className="fill-yellow-500"/> Mejores del Torneo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "MVP (Max Puntos)", player: mvp, icon: Medal, color: 'text-yellow-400', border: 'border-yellow-500' },
                    { title: "Mejor Bloqueo", player: bestBlocker, icon: Hand, color: 'text-blue-400', border: 'border-blue-500' },
                    { title: "Mejor Ataque", player: bestSpiker, icon: Zap, color: 'text-red-400', border: 'border-red-500' },
                    { title: "Mejor Saque", player: bestServer, icon: Target, color: 'text-green-400', border: 'border-green-500' },
                ].map((item, idx) => (
                    <div key={idx} className={`bg-slate-800/80 rounded-xl p-6 border-b-4 ${item.border} relative overflow-hidden group shadow-xl`}>
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                            <item.icon size={64} />
                        </div>
                        <h4 className={`text-sm font-bold uppercase tracking-widest mb-4 ${item.color}`}>{item.title}</h4>
                        {item.player ? (
                            <div className="flex items-center gap-4 relative z-10">
                                <img src={item.player.image} className="w-16 h-16 rounded-full border-2 border-white object-cover bg-slate-700"/>
                                <div>
                                    <div className="font-bold text-lg text-white leading-tight">{item.player.name}</div>
                                    <div className="text-xs text-slate-400 mb-1">{item.player.teamName}</div>
                                    <div className="font-mono text-xl font-bold text-white bg-slate-900/50 inline-block px-2 rounded">
                                        {item.title.includes('Puntos') ? item.player.stats.points : 
                                         item.title.includes('Bloqueo') ? item.player.stats.blocks :
                                         item.title.includes('Ataque') ? item.player.stats.attacks : item.player.stats.aces}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-slate-500 italic text-sm">Sin datos suficientes</div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-slate-800/50 p-4 md:p-6 rounded-lg border border-slate-700 shadow-lg mb-6 backdrop-blur-sm">
            <h3 className="text-xl font-sports mb-4 text-white">Tabla de Posiciones</h3>
            <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                <tr className="text-slate-400 border-b border-slate-600">
                    <th className="pb-2 text-left">Equipo</th>
                    <th className="pb-2 text-center">PG</th>
                    <th className="pb-2 text-center">PP</th>
                    <th className="pb-2 text-right">Pts</th>
                </tr>
                </thead>
                <tbody>
                {teams.map(t => {
                    let wins = 0;
                    let losses = 0;
                    let points = 0;
                    championships.forEach(c => c.matches.filter(m => m.status === 'FINISHED').forEach(m => {
                        const isHome = m.homeTeamId === t.id;
                        const isAway = m.awayTeamId === t.id;
                        if(!isHome && !isAway) return;
                        const homeSets = m.sets.filter(s=>s.home>s.away).length;
                        const awaySets = m.sets.filter(s=>s.away>s.home).length;
                        const mySets = isHome ? homeSets : awaySets;
                        const oppSets = isHome ? awaySets : homeSets;
                        if (mySets > oppSets) {
                            wins++;
                            points += (oppSets <= 1 ? 3 : 2);
                        } else {
                            losses++;
                            points += (mySets === 2 ? 1 : 0);
                        }
                    }));
                    return (
                        <tr key={t.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                        <td className="py-3 flex items-center gap-2 text-white"><img src={t.logo} className="w-6 h-6 rounded-full"/> {t.name}</td>
                        <td className="py-3 text-center text-slate-300">{wins}</td>
                        <td className="py-3 text-center text-slate-300">{losses}</td>
                        <td className="py-3 text-right font-bold text-yellow-400">{points}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            </div>
        </div>
    </div>
    </PageContainer>
  )};

  const renderControlPanel = () => {
    let activeMatch: Match | undefined;
    championships.forEach(c => { const m = c.matches.find(match => match.id === currentMatchId); if (m) activeMatch = m; });

    if (!activeMatch) return <div className="text-center p-8">Seleccione un partido desde el Fixture.</div>;
    const homeTeam = teams.find(t => t.id === activeMatch!.homeTeamId)!;
    const awayTeam = teams.find(t => t.id === activeMatch!.awayTeamId)!;

    const activePlayerId = broadcastState.activePlayerIdForStats;
    const activePlayer = [...homeTeam.players, ...awayTeam.players].find(p => p.id === activePlayerId);

    return (
        <PageContainer title="Panel de Control" icon={Gamepad2} onBack={() => setActiveTab('fixture')}>
            <div className="flex-1 bg-slate-900 flex flex-col md:flex-row overflow-hidden">
                {/* 1. Score & Match Status Control */}
                <div className="w-full md:w-1/4 p-4 border-r border-slate-800 overflow-y-auto bg-slate-800/50">
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                             <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Marcador</div>
                             <div className="text-xs font-bold text-white bg-black px-2 py-0.5 rounded border border-slate-600">Set {activeMatch.currentSet + 1}</div>
                        </div>
                        
                        {/* Player Selection Warning */}
                        {!activePlayerId && (
                            <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-500 text-xs p-2 rounded mb-2 text-center animate-pulse">
                                Seleccione un jugador a la derecha para asignar puntos
                            </div>
                        )}

                        <div className="flex gap-2">
                             <div className="flex-1 bg-blue-900/30 p-2 rounded border border-blue-900/50 text-center">
                                 <div className="font-bold text-blue-300 mb-1">{homeTeam.shortName}</div>
                                 <div className="text-4xl font-bold text-white mb-2">{activeMatch.sets[activeMatch.currentSet].home}</div>
                                 
                                 <div className="grid grid-cols-2 gap-1 mb-2">
                                    <button onClick={() => handleScoreUpdate(activeMatch!.id, homeTeam.id, 1, ActionType.ATTACK, activePlayerId)} className="bg-blue-600 hover:bg-blue-500 py-2 rounded text-xs font-bold shadow">+1 Ataque</button>
                                    <button onClick={() => handleScoreUpdate(activeMatch!.id, homeTeam.id, 1, ActionType.BLOCK, activePlayerId)} className="bg-indigo-600 hover:bg-indigo-500 py-2 rounded text-xs font-bold shadow">+1 Bloqueo</button>
                                    <button onClick={() => handleScoreUpdate(activeMatch!.id, homeTeam.id, 1, ActionType.SERVE_ACE, activePlayerId)} className="bg-green-600 hover:bg-green-500 py-2 rounded text-xs font-bold shadow col-span-2">+1 Ace</button>
                                 </div>
                                 
                                 <button onClick={() => handleScoreUpdate(activeMatch!.id, homeTeam.id, -1, ActionType.ATTACK_ERROR, activePlayerId)} className="w-full bg-slate-700 hover:bg-slate-600 py-1 rounded text-[10px]">-1 (Corregir)</button>
                             </div>
                             
                             <div className="flex-1 bg-red-900/30 p-2 rounded border border-red-900/50 text-center">
                                 <div className="font-bold text-red-300 mb-1">{awayTeam.shortName}</div>
                                 <div className="text-4xl font-bold text-white mb-2">{activeMatch.sets[activeMatch.currentSet].away}</div>
                                 
                                 <div className="grid grid-cols-2 gap-1 mb-2">
                                    <button onClick={() => handleScoreUpdate(activeMatch!.id, awayTeam.id, 1, ActionType.ATTACK, activePlayerId)} className="bg-red-600 hover:bg-red-500 py-2 rounded text-xs font-bold shadow">+1 Ataque</button>
                                    <button onClick={() => handleScoreUpdate(activeMatch!.id, awayTeam.id, 1, ActionType.BLOCK, activePlayerId)} className="bg-indigo-600 hover:bg-indigo-500 py-2 rounded text-xs font-bold shadow">+1 Bloqueo</button>
                                    <button onClick={() => handleScoreUpdate(activeMatch!.id, awayTeam.id, 1, ActionType.SERVE_ACE, activePlayerId)} className="bg-green-600 hover:bg-green-500 py-2 rounded text-xs font-bold shadow col-span-2">+1 Ace</button>
                                 </div>

                                 <button onClick={() => handleScoreUpdate(activeMatch!.id, awayTeam.id, -1, ActionType.ATTACK_ERROR, activePlayerId)} className="w-full bg-slate-700 hover:bg-slate-600 py-1 rounded text-[10px]">-1 (Corregir)</button>
                             </div>
                        </div>
                    </div>
                    
                    {currentUser.role === UserRole.ADMIN && (
                        <button 
                            onClick={() => {
                                if(window.confirm("¿Finalizar Partido?")) {
                                    handleUpdateMatchStatus(activeMatch!.id, 'FINISHED');
                                }
                            }}
                            className="w-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-red-400 hover:bg-slate-700 py-2 rounded text-xs font-bold flex items-center justify-center gap-2 transition"
                        >
                            <StopCircle size={14}/> Finalizar Partido
                        </button>
                    )}
                </div>

                {/* 2. Broadcast Graphics Switcher */}
                {currentUser.role === UserRole.ADMIN && (
                    <div className="w-full md:w-1/2 p-4 bg-slate-900 overflow-y-auto">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Monitor size={14}/> Gráficos de Transmisión</div>
                        <div className="grid grid-cols-3 gap-3">
                            <button onClick={() => toggleBroadcastFeature('showMiniScorebug')} className={`h-16 rounded-lg border-2 flex flex-col items-center justify-center transition font-bold text-sm ${broadcastState.showMiniScorebug ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600'}`}>
                                <span>Mini Bug</span>
                                <span className="text-[9px] font-normal opacity-70 mt-1">Esquina Sup.</span>
                            </button>
                            
                            <button onClick={() => toggleBroadcastFeature('showScorebug')} className={`h-16 rounded-lg border-2 flex flex-col items-center justify-center transition font-bold text-sm ${broadcastState.showScorebug ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600'}`}>
                                <span>Marcador</span>
                                <span className="text-[9px] font-normal opacity-70 mt-1">Barra Inferior</span>
                            </button>
                            
                            <button onClick={() => toggleBroadcastFeature('showSetStats')} className={`h-16 rounded-lg border-2 flex flex-col items-center justify-center transition font-bold text-sm ${broadcastState.showSetStats ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]' : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600'}`}>
                                <BarChart2 size={16} className="mb-1"/> Stats Set
                            </button>

                            <button onClick={() => toggleBroadcastFeature('showTimeout')} className={`h-16 rounded-lg border-2 flex flex-col items-center justify-center transition font-bold text-sm ${broadcastState.showTimeout ? 'bg-yellow-600 border-yellow-400 text-white shadow-[0_0_15px_rgba(202,138,4,0.5)]' : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600'}`}>
                                <Timer size={16} className="mb-1"/> TIEMPO
                            </button>
                            
                            <button onClick={() => toggleBroadcastFeature('showRotation')} className={`h-16 rounded-lg border-2 flex flex-col items-center justify-center transition font-bold text-sm ${broadcastState.showRotation ? 'bg-teal-600 border-teal-400 text-white shadow-[0_0_15px_rgba(13,148,136,0.5)]' : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600'}`}>
                                <RotateCcw size={16} className="mb-1"/> Rotación
                            </button>
                            
                            <button onClick={() => setBroadcastState(prev => ({...prev, showMatchIntro: !prev.showMatchIntro}))} className={`h-16 rounded-lg border-2 flex flex-col items-center justify-center transition font-bold text-sm ${broadcastState.showMatchIntro ? 'bg-indigo-600 border-indigo-400 text-white' : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600'}`}>
                                <Tv size={16} className="mb-1"/> Intro
                            </button>
                        </div>
                    </div>
                )}

                {/* 3. Player Stats & Serve Selector */}
                <div className="w-full md:w-1/4 p-4 border-l border-slate-800 overflow-y-auto bg-slate-800/30">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 text-center">
                        {activePlayer ? `Asignar a: ${activePlayer.name}` : 'Seleccionar Jugador para Puntos'}
                    </div>
                    <div className="grid grid-cols-2 gap-3 h-full">
                        <div className="bg-slate-800 rounded-lg p-2 border border-slate-700">
                            <div className="text-[10px] text-blue-400 text-center mb-2 font-bold uppercase border-b border-slate-700 pb-1">{homeTeam.shortName}</div>
                            <div className="grid grid-cols-3 gap-1">
                                {homeTeam.players.slice(0,6).map(p => (
                                    <button 
                                    key={p.id} 
                                    onClick={() => setBroadcastState(prev => {
                                        const isSamePlayer = prev.activePlayerIdForStats === p.id;
                                        return {
                                            ...prev, 
                                            activePlayerIdForStats: isSamePlayer ? null : p.id,
                                            showServingInfo: isSamePlayer ? !prev.showServingInfo : true
                                        };
                                    })} 
                                    className={`aspect-square rounded flex flex-col items-center justify-center transition border ${broadcastState.activePlayerIdForStats === p.id ? 'bg-blue-600 border-white text-white' : 'bg-slate-700 border-transparent text-slate-400 hover:bg-slate-600'}`}
                                    >
                                        <span className="text-xs font-bold">{p.number}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-2 border border-slate-700">
                            <div className="text-[10px] text-red-400 text-center mb-2 font-bold uppercase border-b border-slate-700 pb-1">{awayTeam.shortName}</div>
                            <div className="grid grid-cols-3 gap-1">
                                {awayTeam.players.slice(0,6).map(p => (
                                    <button 
                                    key={p.id} 
                                    onClick={() => setBroadcastState(prev => {
                                        const isSamePlayer = prev.activePlayerIdForStats === p.id;
                                        return {
                                            ...prev, 
                                            activePlayerIdForStats: isSamePlayer ? null : p.id,
                                            showServingInfo: isSamePlayer ? !prev.showServingInfo : true
                                        };
                                    })} 
                                    className={`aspect-square rounded flex flex-col items-center justify-center transition border ${broadcastState.activePlayerIdForStats === p.id ? 'bg-red-600 border-white text-white' : 'bg-slate-700 border-transparent text-slate-400 hover:bg-slate-600'}`}
                                    >
                                        <span className="text-xs font-bold">{p.number}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
  };

  const renderBroadcast = () => {
    // If no match selected, show a match selector
    if (!currentMatchId) {
       const availableMatches = championships.flatMap(c => c.matches).filter(m => m.status !== 'FINISHED').sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

       return (
       <PageContainer title="Iniciar Transmisión" icon={Tv} onBack={() => setActiveTab('home')}>
       <div className="flex flex-col items-center justify-center h-full p-8 text-center max-w-4xl mx-auto">
          <div className="bg-red-600/20 p-6 rounded-full border border-red-600/50 mb-6">
            <Radio size={48} className="text-red-500 animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Selecciona un partido para transmitir</h3>
          <p className="text-slate-400 mb-8">La transmisión se iniciará en modo espera hasta que decidas salir al aire.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {availableMatches.map(m => {
                  const home = teams.find(t => t.id === m.homeTeamId);
                  const away = teams.find(t => t.id === m.awayTeamId);
                  return (
                      <button 
                        key={m.id} 
                        onClick={() => broadcastUpdate({ currentMatchId: m.id })}
                        className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-red-500 hover:bg-slate-750 transition flex items-center justify-between group"
                      >
                          <div className="flex items-center gap-3">
                              <span className="font-bold text-white">{home?.shortName}</span>
                              <span className="text-slate-500 text-xs font-mono">vs</span>
                              <span className="font-bold text-white">{away?.shortName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                             {m.status === 'LIVE' ? <span className="text-red-500 font-bold uppercase">En Vivo</span> : new Date(m.date).toLocaleDateString()}
                             <Radio size={16} className="text-slate-600 group-hover:text-red-500"/>
                          </div>
                      </button>
                  )
              })}
              {availableMatches.length === 0 && <p className="col-span-2 text-slate-500">No hay partidos programados.</p>}
          </div>
       </div>
       </PageContainer>
       );
    }

    let activeMatch: Match | undefined;
    let champ: Championship | undefined;
    championships.forEach(c => {
       const m = c.matches.find(match => match.id === currentMatchId);
       if (m) {
           activeMatch = m;
           champ = c;
       }
    });

    if (!activeMatch) return <div>Error loading match</div>;
    const homeTeam = teams.find(t => t.id === activeMatch!.homeTeamId)!;
    const awayTeam = teams.find(t => t.id === activeMatch!.awayTeamId)!;

    // Handle Start Screen if Scheduled
    if (activeMatch.status === 'SCHEDULED') {
        return (
            <PageContainer title="Sala de Espera" icon={Tv} onBack={() => { setCurrentMatchId(null); setActiveTab('home'); }}>
            <div className="flex flex-col h-full items-center justify-center bg-black relative">
                 <img src="https://images.unsplash.com/photo-1592656094267-764a45160876?q=80&w=2000" className="opacity-30 absolute w-full h-full object-cover" />
                 <div className="relative z-10 flex flex-col items-center gap-8">
                     <div className="flex items-center gap-8 md:gap-16">
                         <div className="flex flex-col items-center">
                             <img src={homeTeam.logo} className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white shadow-2xl object-cover" />
                             <h2 className="text-3xl font-bold mt-4 uppercase italic">{homeTeam.name}</h2>
                         </div>
                         <div className="text-6xl font-sports text-yellow-500 italic">VS</div>
                         <div className="flex flex-col items-center">
                             <img src={awayTeam.logo} className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white shadow-2xl object-cover" />
                             <h2 className="text-3xl font-bold mt-4 uppercase italic">{awayTeam.name}</h2>
                         </div>
                     </div>
                     
                     <div className="mt-8 text-center">
                         <p className="text-slate-400 mb-4 uppercase tracking-widest">Listo para transmitir</p>
                         {currentUser.role === UserRole.ADMIN ? (
                             <button 
                                onClick={() => handleUpdateMatchStatus(activeMatch!.id, 'LIVE')}
                                className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl font-bold text-2xl shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:scale-105 transition flex items-center gap-3"
                             >
                                 <Radio size={32} /> INICIAR TRANSMISIÓN
                             </button>
                         ) : (
                             <p className="text-xl bg-slate-800 px-6 py-2 rounded border border-slate-600">Esperando inicio de transmisión...</p>
                         )}
                     </div>
                 </div>
            </div>
            </PageContainer>
        )
    }

    const isBroadcaster = currentUser.role === UserRole.ADMIN;

    return (
      <div className="flex flex-col h-full w-full bg-slate-900/50 backdrop-blur-md">
        <header className="bg-black border-b border-slate-800 p-2 flex items-center justify-between">
             <button onClick={() => setCurrentMatchId(null)} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm"><ArrowLeft size={16}/> Salir de Transmisión</button>
             <div className="flex items-center gap-4">
                 <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                     <Wifi size={12} className="text-green-500" />
                     Sincronización Local Activa
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                    <span className="text-xs font-bold text-red-600 tracking-widest uppercase">EN VIVO</span>
                 </div>
                 {isBroadcaster && (
                    <div className="flex gap-2">
                         <button onClick={() => setFacingMode(prev => prev === 'user' ? 'environment' : 'user')} className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-full border border-slate-600 transition" title="Cambiar Cámara">
                             <RefreshCcw size={16}/>
                         </button>
                         <button onClick={toggleFullscreen} className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-full border border-slate-600 transition" title="Pantalla Completa">
                             {isFullscreen ? <Minimize size={16}/> : <Maximize size={16}/>}
                         </button>
                    </div>
                 )}
             </div>
        </header>
        {/* FULLSCREEN LIVE MONITOR */}
        <div ref={broadcastContainerRef} className="flex-1 bg-black relative justify-center overflow-hidden flex items-center w-full">
            {isBroadcaster ? (
                 <>
                    <video ref={videoRef} autoPlay playsInline muted className="absolute w-full h-full object-cover z-0" />
                    {cameraError && (
                        <div className="absolute inset-0 z-0 flex items-center justify-center bg-slate-900/90 text-center p-8">
                             <div className="max-w-md">
                                 <ShieldAlert size={48} className="mx-auto text-red-500 mb-4"/>
                                 <h3 className="text-xl font-bold text-white mb-2">Error de Cámara</h3>
                                 <p className="text-slate-400 mb-6 text-sm">{cameraError}</p>
                                 <div className="flex gap-2 justify-center">
                                    <button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded text-white font-bold text-sm">
                                        Recargar Página
                                    </button>
                                 </div>
                             </div>
                        </div>
                    )}
                 </>
            ) : (
                <img src="https://images.unsplash.com/photo-1592656094267-764a45160876?q=80&w=2000" className="opacity-40 absolute w-full h-full object-cover" />
            )}
            
            {/* Aspect Ratio Container for Video */}
            <div className={`aspect-video w-full max-h-full relative shadow-2xl bg-black/10 z-10 pointer-events-none ${isFullscreen ? 'h-full w-full max-h-screen' : ''}`}>
                <div className="pointer-events-auto w-full h-full">
                <BroadcastOverlay 
                    match={activeMatch} 
                    homeTeam={homeTeam} 
                    awayTeam={awayTeam} 
                    broadcastState={broadcastState}
                    aiCommentary={aiCommentary}
                    championshipLogo={champ?.logo}
                    onCloseIntro={() => setBroadcastState(s => ({...s, showMatchIntro: false}))}
                />
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex h-screen w-screen bg-[#0b0f19] text-white font-sans overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_#1e293b_0%,_transparent_70%)] pointer-events-none opacity-50"></div>
        <main className="flex-1 flex flex-col w-full h-full relative z-10">
            {activeTab === 'home' && renderHome()}
            {activeTab === 'teams' && renderTeams()}
            {activeTab === 'fixture' && renderFixture()}
            {activeTab === 'live' && renderBroadcast()}
            {activeTab === 'control' && renderControlPanel()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'stats' && renderStats()}
        </main>
    </div>
  );
};

export default App;