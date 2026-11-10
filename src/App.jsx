import React, { useState, useEffect, useRef, Component } from 'react';
import {
  Settings,
  Coins,
  Gem,
  Crown,
  Globe,
  Bot,
  Users,
  Trophy,
  Dices,
  Home,
  ChevronLeft,
  Volume2,
  VolumeX,
  X,
  Star,
  Smartphone,
  Music,
  Edit3,
  Upload,
  ZoomIn,
  MessageSquare,
  Gift,
  Target,
  TrendingUp,
  Clock,
  Send,
  Heart,
  Palette,
  Gamepad2,
  Pause,
  RotateCcw,
  LogOut,
  Play,
  Swords,
  Zap,
  Shield,
  Flame,
  Sparkles,
  Check,
} from 'lucide-react';

// ==========================================
// 0. ERROR BOUNDARY
// ==========================================
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-900 text-white min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
          <pre className="bg-black p-4 rounded text-sm overflow-auto">
            {this.state.error.toString()}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// ==========================================
// 1. DATA & CONSTANTS
// ==========================================

const THEMES = {
  royal: {
    id: 'royal',
    name: 'Royal Blue & Gold',
    bgClass: 'bg-blue-900',
    primary: 'blue-600',
    secondary: 'yellow-500',
    text: 'text-yellow-400',
    border: 'border-yellow-500',
    buttonGrad: 'from-blue-500 to-blue-800 border-blue-300',
    boardFrame: 'border-yellow-600',
    boardBg: 'bg-amber-50',
    particleColor: 'bg-yellow-300',
    rayColor: 'from-yellow-200/20',
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    bgClass: 'bg-[#090014]',
    primary: 'purple-800',
    secondary: 'cyan-400',
    text: 'text-cyan-400',
    border: 'border-fuchsia-500',
    buttonGrad: 'from-fuchsia-500 to-purple-800 border-fuchsia-300',
    boardFrame: 'border-cyan-400',
    boardBg: 'bg-[#1a0b2e]',
    particleColor: 'bg-fuchsia-400',
    rayColor: 'from-cyan-400/20',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Mughal Palace',
    bgClass: 'bg-emerald-900',
    primary: 'emerald-700',
    secondary: 'amber-400',
    text: 'text-amber-400',
    border: 'border-amber-500',
    buttonGrad: 'from-emerald-500 to-emerald-800 border-emerald-300',
    boardFrame: 'border-amber-600',
    boardBg: 'bg-emerald-50',
    particleColor: 'bg-amber-300',
    rayColor: 'from-amber-200/20',
  },
  crimson: {
    id: 'crimson',
    name: 'Crimson Dragon',
    bgClass: 'bg-[#2a0404]',
    primary: 'red-800',
    secondary: 'orange-500',
    text: 'text-orange-400',
    border: 'border-red-500',
    buttonGrad: 'from-red-500 to-red-900 border-red-300',
    boardFrame: 'border-orange-600',
    boardBg: 'bg-red-50',
    particleColor: 'bg-orange-400',
    rayColor: 'from-orange-300/20',
  },
};

const DIFFICULTY_THEMES = {
  Easy: {
    id: 'easy',
    name: 'EASY • ROYAL PALACE',
    badgeColor: 'bg-yellow-500 text-yellow-950',
    boardBg: 'bg-[#FFF8E7]',
    pathBase: 'bg-[#FFF8E7]',
    pathBorder: 'border-[#D4AF37]',
    frame: 'border-yellow-500 ring-yellow-600',
    baseRed: 'bg-gradient-to-br from-red-400 to-red-600',
    baseGreen: 'bg-gradient-to-br from-green-400 to-green-600',
    baseYellow: 'bg-gradient-to-br from-yellow-300 to-yellow-500',
    baseBlue: 'bg-gradient-to-br from-blue-400 to-blue-600',
    innerBaseBorder: 'border-yellow-500',
    homePathRed: 'bg-red-400',
    homePathGreen: 'bg-green-400',
    homePathYellow: 'bg-yellow-300',
    homePathBlue: 'bg-blue-400',
    safeStar:
      'text-yellow-500 fill-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]',
    glowEffect: '',
  },
  Medium: {
    id: 'medium',
    name: 'MEDIUM • NEON ARENA',
    badgeColor: 'bg-cyan-500 text-cyan-950',
    boardBg: 'bg-[#0B0F19]',
    pathBase: 'bg-[#1A233A]',
    pathBorder: 'border-cyan-500/50',
    frame: 'border-cyan-400 ring-cyan-500',
    baseRed: 'bg-gradient-to-br from-red-600/60 to-red-900/60 backdrop-blur-sm',
    baseGreen:
      'bg-gradient-to-br from-green-600/60 to-green-900/60 backdrop-blur-sm',
    baseYellow:
      'bg-gradient-to-br from-yellow-500/60 to-yellow-800/60 backdrop-blur-sm',
    baseBlue:
      'bg-gradient-to-br from-blue-600/60 to-blue-900/60 backdrop-blur-sm',
    innerBaseBorder: 'border-cyan-400',
    homePathRed: 'bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.8)]',
    homePathGreen: 'bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.8)]',
    homePathYellow: 'bg-yellow-400/80 shadow-[0_0_10px_rgba(250,204,21,0.8)]',
    homePathBlue: 'bg-blue-500/80 shadow-[0_0_10px_rgba(59,130,246,0.8)]',
    safeStar:
      'text-cyan-300 fill-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,1)]',
    glowEffect: 'shadow-[inset_0_0_20px_rgba(34,211,238,0.15)]',
  },
  Hard: {
    id: 'hard',
    name: 'HARD • DRAGON INFERNO',
    badgeColor: 'bg-red-600 text-white',
    boardBg: 'bg-[#1A0505]',
    pathBase: 'bg-[#2D0A0A]',
    pathBorder: 'border-orange-600/60',
    frame: 'border-orange-600 ring-red-700',
    baseRed: 'bg-gradient-to-br from-red-800 to-black border border-red-500/50',
    baseGreen:
      'bg-gradient-to-br from-green-800 to-black border border-green-500/50',
    baseYellow:
      'bg-gradient-to-br from-yellow-700 to-black border border-yellow-500/50',
    baseBlue:
      'bg-gradient-to-br from-blue-800 to-black border border-blue-500/50',
    innerBaseBorder: 'border-orange-500',
    homePathRed: 'bg-red-700 shadow-[0_0_15px_rgba(239,68,68,1)] animate-pulse',
    homePathGreen:
      'bg-green-700 shadow-[0_0_15px_rgba(34,197,94,1)] animate-pulse',
    homePathYellow:
      'bg-orange-600 shadow-[0_0_15px_rgba(250,204,21,1)] animate-pulse',
    homePathBlue:
      'bg-blue-700 shadow-[0_0_15px_rgba(59,130,246,1)] animate-pulse',
    safeStar:
      'text-orange-400 fill-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,1)] animate-pulse',
    glowEffect: 'shadow-[inset_0_0_30px_rgba(239,68,68,0.2)]',
  },
};

const ESPORTS_AVATARS = [
  {
    id: 'pro_gamer',
    name: 'Pro Gamer',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e1b4b"/><stop offset="100%" stop-color="#312e81"/></linearGradient></defs><rect width="100" height="100" fill="url(#bg1)"/><circle cx="50" cy="45" r="22" fill="#fcd34d"/><path d="M28 50 Q50 80 72 50 L72 90 Q50 100 28 90 Z" fill="#dc2626"/><path d="M35 65 Q50 75 65 65" stroke="#991b1b" stroke-width="3" fill="none"/><path d="M28 45 Q28 25 50 25 Q72 25 72 45" stroke="#f97316" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M25 45 L20 60 L35 55" fill="#f97316"/><path d="M75 45 L80 60 L65 55" fill="#f97316"/><circle cx="40" cy="45" r="3" fill="#1e1b4b"/><circle cx="60" cy="45" r="3" fill="#1e1b4b"/><path d="M45 58 Q50 62 55 58" stroke="#1e1b4b" stroke-width="2" fill="none"/><path d="M40 55 L60 55" stroke="#1e1b4b" stroke-width="4" stroke-linecap="round"/></svg>`,
  },
  {
    id: 'royal_king',
    name: 'Royal King',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#78350f"/><stop offset="100%" stop-color="#451a03"/></linearGradient></defs><rect width="100" height="100" fill="url(#bg2)"/><path d="M30 40 L50 20 L70 40 Z" fill="#fbbf24"/><circle cx="50" cy="20" r="5" fill="#ef4444"/><circle cx="30" cy="40" r="4" fill="#3b82f6"/><circle cx="70" cy="40" r="4" fill="#3b82f6"/><circle cx="50" cy="55" r="22" fill="#fcd34d"/><path d="M35 75 Q50 85 65 75" stroke="#b45309" stroke-width="4" fill="none"/><circle cx="42" cy="52" r="3" fill="#451a03"/><circle cx="58" cy="52" r="3" fill="#451a03"/><path d="M45 62 Q50 66 55 62" stroke="#451a03" stroke-width="2" fill="none"/><path d="M38 48 Q42 45 46 48" stroke="#451a03" stroke-width="2" fill="none"/><path d="M54 48 Q58 45 62 48" stroke="#451a03" stroke-width="2" fill="none"/></svg>`,
  },
  {
    id: 'cat_gamer',
    name: 'Cat Gamer',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4c1d95"/><stop offset="100%" stop-color="#7e22ce"/></linearGradient></defs><rect width="100" height="100" fill="url(#bg3)"/><circle cx="50" cy="45" r="20" fill="#fcd34d"/><path d="M30 45 Q30 25 50 25 Q70 25 70 45" stroke="#a855f7" stroke-width="5" fill="none"/><path d="M35 30 L40 15 L50 25" fill="#a855f7"/><path d="M65 30 L60 15 L50 25" fill="#a855f7"/><path d="M28 55 L20 70 L35 65" fill="#a855f7"/><path d="M72 55 L80 70 L65 65" fill="#a855f7"/><circle cx="42" cy="45" r="3" fill="#1e1b4b"/><circle cx="58" cy="45" r="3" fill="#1e1b4b"/><path d="M46 58 Q50 62 54 58" stroke="#1e1b4b" stroke-width="2" fill="none"/><circle cx="50" cy="55" r="2" fill="#f472b6"/><path d="M35 75 Q50 85 65 75" stroke="#a855f7" stroke-width="4" fill="none"/></svg>`,
  },
  {
    id: 'cyber_ninja',
    name: 'Cyber Ninja',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs><rect width="100" height="100" fill="url(#bg4)"/><circle cx="50" cy="45" r="22" fill="#1e293b"/><path d="M35 45 L65 45 L65 60 L35 60 Z" fill="#334155"/><path d="M40 52 L60 52" stroke="#ef4444" stroke-width="3"/><path d="M45 50 L55 50" stroke="#ef4444" stroke-width="2"/><path d="M35 35 L50 20 L65 35" fill="#ef4444"/><path d="M30 70 Q50 90 70 70" stroke="#ef4444" stroke-width="4" fill="none"/><path d="M40 75 L50 85 L60 75" stroke="#f97316" stroke-width="2" fill="none"/></svg>`,
  },
  {
    id: 'mafia_boss',
    name: 'Mafia Boss',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1c1917"/><stop offset="100%" stop-color="#292524"/></linearGradient></defs><rect width="100" height="100" fill="url(#bg5)"/><circle cx="50" cy="45" r="22" fill="#fcd34d"/><path d="M25 40 L75 40 L70 50 L30 50 Z" fill="#1c1917"/><path d="M30 42 L35 48 L40 42 Z" fill="#3b82f6"/><path d="M60 42 L65 48 L70 42 Z" fill="#3b82f6"/><path d="M35 65 Q50 75 65 65" stroke="#1c1917" stroke-width="4" fill="none"/><path d="M45 62 Q50 66 55 62" stroke="#1c1917" stroke-width="2" fill="none"/><path d="M30 85 L70 85 L60 75 L40 75 Z" fill="#292524"/><circle cx="50" cy="80" r="2" fill="#fbbf24"/></svg>`,
  },
  {
    id: 'golden_samurai',
    name: 'Samurai',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg6" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#7f1d1d"/><stop offset="100%" stop-color="#991b1b"/></linearGradient></defs><rect width="100" height="100" fill="url(#bg6)"/><circle cx="50" cy="50" r="22" fill="#fcd34d"/><path d="M25 50 Q25 20 50 20 Q75 20 75 50" stroke="#fbbf24" stroke-width="6" fill="none"/><path d="M30 45 L40 45 L35 55 Z" fill="#fbbf24"/><path d="M70 45 L60 45 L65 55 Z" fill="#fbbf24"/><path d="M35 45 L40 55 L45 45" fill="#dc2626"/><path d="M55 45 L60 55 L65 45" fill="#dc2626"/><circle cx="42" cy="42" r="2" fill="#1c1917"/><circle cx="58" cy="42" r="2" fill="#1c1917"/><path d="M45 60 Q50 65 55 60" stroke="#1c1917" stroke-width="2" fill="none"/><path d="M25 80 L75 80 L70 70 L30 70 Z" fill="#fbbf24"/></svg>`,
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg7" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#7c2d12"/><stop offset="100%" stop-color="#c2410c"/></linearGradient></defs><rect width="100" height="100" fill="url(#bg7)"/><path d="M20 50 Q30 20 50 30 Q70 20 80 50 Q70 80 50 70 Q30 80 20 50 Z" fill="#f97316"/><path d="M30 50 Q40 35 50 40 Q60 35 70 50 Q60 65 50 60 Q40 65 30 50 Z" fill="#fbbf24"/><circle cx="42" cy="48" r="3" fill="#1c1917"/><circle cx="58" cy="48" r="3" fill="#1c1917"/><path d="M45 58 Q50 62 55 58" stroke="#1c1917" stroke-width="2" fill="none"/><path d="M40 35 L50 20 L60 35" fill="#dc2626"/></svg>`,
  },
  {
    id: 'neon_skull',
    name: 'Neon Skull',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg8" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f0f23"/><stop offset="100%" stop-color="#1a1a3a"/></linearGradient></defs><rect width="100" height="100" fill="url(#bg8)"/><circle cx="50" cy="45" r="22" fill="#e2e8f0"/><circle cx="40" cy="45" r="6" fill="#0f0f23"/><circle cx="60" cy="45" r="6" fill="#0f0f23"/><circle cx="40" cy="45" r="3" fill="#22d3ee"/><circle cx="60" cy="45" r="3" fill="#22d3ee"/><path d="M45 60 L55 60 L50 65 Z" fill="#0f0f23"/><path d="M35 70 L35 80 L40 80 L40 70" stroke="#e2e8f0" stroke-width="2" fill="none"/><path d="M45 70 L45 80 L50 80 L50 70" stroke="#e2e8f0" stroke-width="2" fill="none"/><path d="M55 70 L55 80 L60 80 L60 70" stroke="#e2e8f0" stroke-width="2" fill="none"/><path d="M65 70 L65 80 L70 80 L70 70" stroke="#e2e8f0" stroke-width="2" fill="none"/><circle cx="50" cy="45" r="22" stroke="#22d3ee" stroke-width="2" fill="none" opacity="0.5"/></svg>`,
  },
];

const VIP_FRAMES = [
  {
    id: 'none',
    name: 'None',
    cost: 0,
    style: '',
    border: 'border-2 border-yellow-400',
  },
  {
    id: 'gold',
    name: 'Gold Crown',
    cost: 500,
    style: 'border-4 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.8)]',
    border: 'border-yellow-400',
  },
  {
    id: 'fire',
    name: 'Fire Dragon',
    cost: 1500,
    style:
      'border-4 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse',
    border: 'border-red-500',
  },
  {
    id: 'diamond',
    name: 'Diamond Ice',
    cost: 2500,
    style: 'border-4 border-cyan-300 shadow-[0_0_15px_rgba(103,232,249,0.8)]',
    border: 'border-cyan-300',
  },
  {
    id: 'neon',
    name: 'Neon Esports',
    cost: 5000,
    style: 'border-4 border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.9)]',
    border: 'border-fuchsia-500',
  },
];

const DEFAULT_PLAYER = {
  name: 'Zubair',
  avatar: ESPORTS_AVATARS[0].svg,
  country: '🇵🇰',
  coins: 10000,
  gems: 100,
  ownedDice: ['golden'],
  equippedDice: 'golden',
  equippedFrame: 'gold',
  ownedFrames: ['gold'],
  lastSpin: null,
  lastFreeCoins: 0,
  photoZoom: 1,
  photoPos: { x: 0, y: 0 },
  xp: 0,
  level: 1,
  theme: 'royal',
  stats: { played: 0, won: 0 },
  missions: {
    win1: false,
    capture2: false,
    roll6x3: false,
    claimedWin: false,
    claimedCap: false,
    claimedRoll: false,
  },
};

const DICE_SKINS = [
  { id: 'golden', name: 'Golden Royal', price: 5000, currency: 'coins' },
  { id: 'diamond', name: 'Diamond Ice', price: 50, currency: 'gems' },
  { id: 'fire', name: 'Fire Dragon', price: 15000, currency: 'coins' },
  { id: 'galaxy', name: 'Galaxy Neon', price: 100, currency: 'gems' },
  { id: 'emerald', name: 'Emerald King', price: 25000, currency: 'coins' },
  { id: 'ruby', name: 'Ruby Crown', price: 200, currency: 'gems' },
];

const COLORS = {
  red: {
    main: 'bg-red-500',
    text: 'text-red-500',
    border: 'border-red-500',
    light: 'bg-red-100',
    start: 0,
    hex: '#ef4444',
  },
  green: {
    main: 'bg-green-500',
    text: 'text-green-500',
    border: 'border-green-500',
    light: 'bg-green-100',
    start: 13,
    hex: '#22c55e',
  },
  yellow: {
    main: 'bg-yellow-400',
    text: 'text-yellow-500',
    border: 'border-yellow-400',
    light: 'bg-yellow-100',
    start: 26,
    hex: '#facc15',
  },
  blue: {
    main: 'bg-blue-500',
    text: 'text-blue-500',
    border: 'border-blue-500',
    light: 'bg-blue-100',
    start: 39,
    hex: '#3b82f6',
  },
};

const PLAYER_COLORS = ['red', 'green', 'yellow', 'blue'];
const AI_NAMES = ['Alex', 'Priya', 'Sarah'];
const AI_FLAGS = ['🇺🇸', '🇮🇳', '🇬🇧'];

const MAIN_TRACK = [
  [6, 1],
  [6, 2],
  [6, 3],
  [6, 4],
  [6, 5],
  [5, 6],
  [4, 6],
  [3, 6],
  [2, 6],
  [1, 6],
  [0, 6],
  [0, 7],
  [0, 8],
  [1, 8],
  [2, 8],
  [3, 8],
  [4, 8],
  [5, 8],
  [6, 9],
  [6, 10],
  [6, 11],
  [6, 12],
  [6, 13],
  [6, 14],
  [7, 14],
  [8, 14],
  [8, 13],
  [8, 12],
  [8, 11],
  [8, 10],
  [8, 9],
  [9, 8],
  [10, 8],
  [11, 8],
  [12, 8],
  [13, 8],
  [14, 8],
  [14, 7],
  [14, 6],
  [13, 6],
  [12, 6],
  [11, 6],
  [10, 6],
  [9, 6],
  [8, 5],
  [8, 4],
  [8, 3],
  [8, 2],
  [8, 1],
  [8, 0],
  [7, 0],
  [6, 0],
];

const SAFE_SPOTS = [0, 8, 13, 21, 26, 34, 39, 47];

const HOME_PATHS = {
  red: [
    [7, 1],
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5],
    [7, 6],
  ],
  green: [
    [1, 7],
    [2, 7],
    [3, 7],
    [4, 7],
    [5, 7],
    [6, 7],
  ],
  yellow: [
    [7, 13],
    [7, 12],
    [7, 11],
    [7, 10],
    [7, 9],
    [7, 8],
  ],
  blue: [
    [13, 7],
    [12, 7],
    [11, 7],
    [10, 7],
    [9, 7],
    [8, 7],
  ],
};

const BASE_AREAS = {
  red: [
    [2, 2],
    [2, 4],
    [4, 2],
    [4, 4],
  ],
  green: [
    [2, 10],
    [2, 12],
    [4, 10],
    [4, 12],
  ],
  yellow: [
    [10, 10],
    [10, 12],
    [12, 10],
    [12, 12],
  ],
  blue: [
    [10, 2],
    [10, 4],
    [12, 2],
    [12, 4],
  ],
};

// ==========================================
// 2. AUDIO, HAPTICS & FX ENGINE
// ==========================================

let audioCtx = null;
let musicInterval = null;
let musicGain = null;

const initAudio = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

const playSound = (type) => {
  initAudio();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  switch (type) {
    case 'roll':
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start();
      osc.stop(now + 0.1);
      break;
    case 'move':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1000, now + 0.05);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start();
      osc.stop(now + 0.05);
      break;
    case 'capture':
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start();
      osc.stop(now + 0.3);
      break;
    case 'safe':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.setValueAtTime(800, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start();
      osc.stop(now + 0.2);
      break;
    case 'chat':
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start();
      osc.stop(now + 0.15);
      break;
    case 'win':
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.setValueAtTime(600, now + 0.1);
      osc.frequency.setValueAtTime(800, now + 0.2);
      osc.frequency.setValueAtTime(1200, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
      osc.start();
      osc.stop(now + 0.6);
      break;
  }
};

const startMusic = () => {
  initAudio();
  if (!audioCtx || musicInterval) return;

  musicGain = audioCtx.createGain();
  musicGain.connect(audioCtx.destination);
  musicGain.gain.setValueAtTime(0.04, audioCtx.currentTime);

  const playNote = (freq, duration, time) => {
    const osc = audioCtx.createOscillator();
    const noteGain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    noteGain.gain.setValueAtTime(0.04, time);
    noteGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(noteGain);
    noteGain.connect(musicGain);

    osc.start(time);
    osc.stop(time + duration);
  };

  const notes = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63];
  let noteIndex = 0;

  musicInterval = setInterval(() => {
    if (!audioCtx || audioCtx.state === 'suspended') return;
    const now = audioCtx.currentTime;
    playNote(notes[noteIndex], 1.5, now);
    playNote(notes[noteIndex] / 2, 1.5, now);
    noteIndex = (noteIndex + 1) % notes.length;
  }, 1200);
};

const stopMusic = () => {
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
  if (musicGain) {
    musicGain.disconnect();
    musicGain = null;
  }
};

const vibrate = (pattern) => {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

// ==========================================
// 3. UI COMPONENTS
// ==========================================

const GlossyButton = ({
  children,
  onClick,
  color = 'blue',
  className = '',
  disabled = false,
}) => {
  const colors = {
    blue: 'from-blue-500 to-blue-800 border-blue-300 text-white',
    green: 'from-green-400 to-green-700 border-green-300 text-white',
    purple: 'from-purple-500 to-purple-800 border-purple-300 text-white',
    yellow: 'from-yellow-400 to-yellow-600 border-yellow-200 text-yellow-950',
    gray: 'from-gray-500 to-gray-700 border-gray-400 text-white',
    red: 'from-red-500 to-red-800 border-red-300 text-white',
    gold: 'from-amber-300 to-amber-600 border-amber-200 text-amber-950',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative px-4 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider bg-gradient-to-b ${colors[color]} border-t-2 border-l-2 border-b-4 border-r-2 shadow-[0_4px_10px_rgba(0,0,0,0.5)] active:shadow-none active:translate-y-1 transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-white opacity-20 rounded-t-lg pointer-events-none"></div>
      <span className="relative z-10 flex items-center justify-center gap-1.5 drop-shadow-md">
        {children}
      </span>
    </button>
  );
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  hideClose = false,
  theme,
}) => {
  const activeTheme = theme || THEMES.royal;
  if (!isOpen) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div
        className={`bg-${activeTheme.primary} border-4 ${activeTheme.border} rounded-2xl w-full max-w-sm overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)]`}
      >
        <div className="bg-black/40 py-3 px-4 flex justify-between items-center border-b-2 border-white/20">
          <h3
            className={`font-bold text-xl uppercase tracking-wider drop-shadow-md ${activeTheme.text}`}
          >
            {title}
          </h3>
          {!hideClose && (
            <button
              onClick={onClose}
              className="text-white hover:text-red-400 transition-colors bg-white/10 p-1 rounded-full"
            >
              <X size={20} />
            </button>
          )}
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

const ModeCard = ({
  title,
  subtitle,
  badge,
  icon,
  watermarkIcon,
  themeGradient,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex-1 h-32 rounded-2xl overflow-hidden flex flex-col items-center justify-center shadow-[0_8px_0_rgba(0,0,0,0.5),0_15px_25px_rgba(0,0,0,0.6)] active:translate-y-1.5 active:shadow-[0_2px_0_rgba(0,0,0,0.5)] transition-all duration-150 border-2 border-white/30 group`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${themeGradient}`}
      ></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_3s_infinite_linear]"></div>
      </div>
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-2xl"></div>
      <div className="absolute -bottom-4 -right-4 opacity-15 pointer-events-none transform scale-150 rotate-12">
        {watermarkIcon}
      </div>
      <div className="absolute -top-4 -left-4 opacity-10 pointer-events-none transform scale-100 -rotate-12">
        {watermarkIcon}
      </div>
      <div className="absolute top-2 right-2 bg-black/40 border border-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm z-20 flex items-center gap-1 shadow-md">
        {badge === 'LIVE' && (
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
        )}
        <span
          className={`text-[9px] font-black tracking-wider ${
            badge === 'LIVE'
              ? 'text-green-400'
              : badge === '2X PRIZE'
              ? 'text-yellow-400'
              : 'text-white'
          }`}
        >
          {badge}
        </span>
      </div>
      <div className="relative z-10 flex flex-col items-center gap-1">
        <div className="mb-1 drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <span className="text-white font-black text-base tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-none">
          {title}
        </span>
        <span className="text-white/90 text-[10px] font-bold tracking-wide drop-shadow-md">
          {subtitle}
        </span>
      </div>
    </button>
  );
};

const Dice3D = ({
  skinId,
  value,
  isRolling,
  onClick,
  disabled,
  preview = false,
}) => {
  const [displayValue, setDisplayValue] = useState(value || 1);
  const [animClass, setAnimClass] = useState('');

  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 6) + 1);
        setAnimClass('animate-[tumble_0.1s_ease-in-out_infinite]');
      }, 100);
      const timeout = setTimeout(() => {
        clearInterval(interval);
        setDisplayValue(value || 1);
        setAnimClass('animate-[settle_0.3s_ease-out]');
      }, 700);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      setDisplayValue(value || 1);
      setAnimClass('');
    }
  }, [isRolling, value]);

  const pips = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
  };
  const activePips = pips[displayValue] || [];

  const getSkinStyles = () => {
    switch (skinId) {
      case 'golden':
        return {
          bg: 'bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-700',
          border: 'border-yellow-200',
          pip: 'bg-yellow-950 shadow-[0_0_5px_rgba(255,255,255,0.8)]',
          glow: 'shadow-[0_0_20px_rgba(250,204,21,0.6)]',
        };
      case 'diamond':
        return {
          bg: 'bg-gradient-to-br from-cyan-100 via-blue-300 to-blue-600',
          border: 'border-cyan-200',
          pip: 'bg-cyan-900 shadow-[0_0_5px_rgba(255,255,255,0.8)]',
          glow: 'shadow-[0_0_20px_rgba(103,232,249,0.6)]',
        };
      case 'fire':
        return {
          bg: 'bg-gradient-to-br from-yellow-400 via-red-500 to-red-900',
          border: 'border-orange-300',
          pip: 'bg-red-950 shadow-[0_0_5px_rgba(255,255,255,0.8)]',
          glow: 'shadow-[0_0_25px_rgba(239,68,68,0.8)] animate-pulse',
        };
      case 'galaxy':
        return {
          bg: 'bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-900',
          border: 'border-purple-300',
          pip: 'bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,1)]',
          glow: 'shadow-[0_0_25px_rgba(168,85,247,0.7)]',
        };
      case 'emerald':
        return {
          bg: 'bg-gradient-to-br from-green-300 via-emerald-600 to-emerald-900',
          border: 'border-green-200',
          pip: 'bg-emerald-950 shadow-[0_0_5px_rgba(255,255,255,0.8)]',
          glow: 'shadow-[0_0_20px_rgba(16,185,129,0.6)]',
        };
      case 'ruby':
        return {
          bg: 'bg-gradient-to-br from-rose-400 via-red-600 to-red-950',
          border: 'border-rose-300',
          pip: 'bg-rose-950 shadow-[0_0_5px_rgba(255,255,255,0.8)]',
          glow: 'shadow-[0_0_20px_rgba(225,29,72,0.6)]',
        };
      default:
        return {
          bg: 'bg-white',
          border: 'border-gray-300',
          pip: 'bg-black',
          glow: '',
        };
    }
  };
  const style = getSkinStyles();

  return (
    <div
      className={`relative flex items-center justify-center cursor-pointer select-none ${
        preview ? 'w-16 h-16' : 'w-16 h-16'
      } ${disabled && !preview ? 'opacity-60 cursor-not-allowed' : ''}`}
      onClick={!disabled ? onClick : undefined}
      style={{ perspective: '800px' }}
    >
      <style>
        {`
          @keyframes tumble {
            0% { transform: rotate(0deg) scale(1) translateY(0); }
            25% { transform: rotate(15deg) scale(1.1) translateY(-10px); }
            50% { transform: rotate(-15deg) scale(0.9) translateY(5px); }
            75% { transform: rotate(10deg) scale(1.05) translateY(-5px); }
            100% { transform: rotate(0deg) scale(1) translateY(0); }
          }
          @keyframes settle {
            0% { transform: scale(1.2); }
            50% { transform: scale(0.9); }
            100% { transform: scale(1); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(5deg); }
          }
          @keyframes shine {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(100%) rotate(45deg); }
          }
        `}
      </style>

      <div
        className={`absolute inset-0 rounded-2xl ${style.glow} transition-all duration-300`}
      ></div>

      <div
        className={`relative w-14 h-14 rounded-2xl border-[3px] flex items-center justify-center shadow-2xl transition-transform ${
          style.bg
        } ${style.border} ${animClass} ${
          preview && !isRolling ? 'animate-[float_3s_ease-in-out_infinite]' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/30 rounded-t-xl pointer-events-none z-10"></div>

        {(skinId === 'golden' || skinId === 'diamond') && (
          <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none z-20">
            <div
              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
              style={{ animation: 'shine 2s infinite linear' }}
            ></div>
          </div>
        )}

        {skinId === 'fire' && (
          <div className="absolute -inset-1 bg-red-500/20 blur-md rounded-full animate-ping pointer-events-none"></div>
        )}
        {skinId === 'galaxy' && (
          <div className="absolute -inset-1 bg-purple-500/20 blur-md rounded-full animate-pulse pointer-events-none"></div>
        )}

        <div className="grid grid-cols-3 gap-1 w-full h-full p-2 relative z-30">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              {activePips.includes(i) && (
                <div className={`w-2.5 h-2.5 rounded-full ${style.pip}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Confetti = () => {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    const newPieces = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 2 + Math.random() * 2,
      animationDelay: Math.random() * 1,
      color: [
        'bg-yellow-400',
        'bg-red-500',
        'bg-blue-500',
        'bg-green-500',
        'bg-purple-500',
        'bg-white',
      ][Math.floor(Math.random() * 6)],
      size: 6 + Math.random() * 8,
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
          }
        `}
      </style>
      {pieces.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-sm ${p.color}`}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: '-10vh',
            animation: `fall ${p.animationDuration}s linear ${p.animationDelay}s forwards`,
          }}
        />
      ))}
    </div>
  );
};

const AnimatedBackground = ({ theme }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>
        {`
          @keyframes floatDust {
            0% { transform: translateY(0) scale(1); opacity: 0.4; }
            50% { opacity: 0.8; }
            100% { transform: translateY(-150px) scale(1.2); opacity: 0; }
          }
          @keyframes driftRay {
            0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
            50% { opacity: 0.15; }
            100% { transform: translateX(100vw) skewX(-15deg); opacity: 0; }
          }
          @keyframes floatIcon {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.05; }
            50% { transform: translateY(-20px) rotate(10deg); opacity: 0.1; }
            100% { transform: translateY(0) rotate(0deg); opacity: 0.05; }
          }
        `}
      </style>

      <div
        className={`absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r ${theme.rayColor} via-transparent to-transparent opacity-20 blur-3xl`}
        style={{ animation: 'driftRay 15s linear infinite' }}
      ></div>

      {[...Array(25)].map((_, i) => (
        <div
          key={`dust-${i}`}
          className={`absolute rounded-full blur-[1px] ${theme.particleColor}`}
          style={{
            width: Math.random() * 6 + 2 + 'px',
            height: Math.random() * 6 + 2 + 'px',
            left: Math.random() * 100 + '%',
            bottom: '-10px',
            animation: `floatDust ${Math.random() * 10 + 8}s linear infinite`,
            animationDelay: `-${Math.random() * 10}s`,
          }}
        />
      ))}

      <div className="absolute inset-0 flex flex-wrap justify-around content-around opacity-20">
        <Crown
          size={80}
          className={`${theme.text} opacity-10`}
          style={{ animation: 'floatIcon 12s ease-in-out infinite' }}
        />
        <Dices
          size={90}
          className={`${theme.text} opacity-10`}
          style={{ animation: 'floatIcon 15s ease-in-out infinite 2s' }}
        />
        <Trophy
          size={70}
          className={`${theme.text} opacity-10`}
          style={{ animation: 'floatIcon 18s ease-in-out infinite 4s' }}
        />
        <Crown
          size={100}
          className={`${theme.text} opacity-5`}
          style={{ animation: 'floatIcon 14s ease-in-out infinite 1s' }}
        />
      </div>
    </div>
  );
};

// ==========================================
// 4. GAME LOGIC HELPERS
// ==========================================

const getInitialTokens = () => ({
  red: [-1, -1, -1, -1],
  green: [-1, -1, -1, -1],
  yellow: [-1, -1, -1, -1],
  blue: [-1, -1, -1, -1],
});

const getTokenCoords = (color, state, tokenIndex) => {
  if (state === -1) return BASE_AREAS[color][tokenIndex];
  if (state >= 0 && state <= 50) {
    const globalTrackIndex = (COLORS[color].start + state) % 52;
    return MAIN_TRACK[globalTrackIndex];
  }
  if (state >= 51 && state <= 56) {
    return HOME_PATHS[color][state - 51];
  }
  return [7, 7];
};

const getGlobalTrackIndex = (color, state) => {
  if (state >= 0 && state <= 50) return (COLORS[color].start + state) % 52;
  return -1;
};

// ==========================================
// 5. MAIN APP COMPONENT
// ==========================================

function LudoRoyalApp() {
  const [player, setPlayer] = useState(() => {
    try {
      const saved = localStorage.getItem('ludo_royal_player');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_PLAYER, ...parsed };
      }
      return DEFAULT_PLAYER;
    } catch {
      return DEFAULT_PLAYER;
    }
  });

  const [currentScreen, setCurrentScreen] = useState('menu');
  const [activeModal, setActiveModal] = useState(null);
  const [storeTab, setStoreTab] = useState('dice'); // 'dice' or 'themes'

  // Settings
  const [musicOn, setMusicOn] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [vibrationOn, setVibrationOn] = useState(true);

  const [spinResult, setSpinResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const [gameMode, setGameMode] = useState('offline');
  const [playerCount, setPlayerCount] = useState(2);
  const [difficulty, setDifficulty] = useState('Medium');
  const [userColor, setUserColor] = useState('red');
  const [betAmount, setBetAmount] = useState(0);
  const [passPlayers, setPassPlayers] = useState(2);

  const [players, setPlayers] = useState([]);
  const [tokens, setTokens] = useState(getInitialTokens());
  const [turnIndex, setTurnIndex] = useState(0);
  const [diceValue, setDiceValue] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [validMoves, setValidMoves] = useState([]);
  const [winner, setWinner] = useState(null);
  const [logMessage, setLogMessage] = useState('');
  const [sixStreak, setSixStreak] = useState(0);
  const [prizeWon, setPrizeWon] = useState(0);
  const [xpWon, setXpWon] = useState(0);

  // New Features State
  const [chatBubble, setChatBubble] = useState(null);
  const [liveChatOpen, setLiveChatOpen] = useState(false);
  const [customChatText, setCustomChatText] = useState('');
  const [freeCoinsTimer, setFreeCoinsTimer] = useState(0);
  const [piggyBank, setPiggyBank] = useState(0);

  // Token Hop State
  const [animatingToken, setAnimatingToken] = useState(null);

  // Profile Edit state
  const [editName, setEditName] = useState(player.name);
  const [uploadedPhoto, setUploadedPhoto] = useState(
    player.avatar &&
      player.avatar.startsWith('data:image') &&
      !player.avatar.includes('svg')
      ? player.avatar
      : null
  );
  const [photoZoom, setPhotoZoom] = useState(player.photoZoom || 1);
  const [photoPos, setPhotoPos] = useState(player.photoPos || { x: 0, y: 0 });

  const fileInputRef = useRef(null);

  const currentTheme = THEMES[player.theme] || THEMES.royal;
  const activeBoardTheme =
    DIFFICULTY_THEMES[difficulty] || DIFFICULTY_THEMES.Medium;

  useEffect(() => {
    try {
      localStorage.setItem('ludo_royal_player', JSON.stringify(player));
    } catch (e) {
      console.log('Local storage full or blocked');
    }
  }, [player]);

  useEffect(() => {
    if (musicOn) startMusic();
    else stopMusic();
    return () => stopMusic();
  }, [musicOn]);

  useEffect(() => {
    let interval;
    if (freeCoinsTimer > 0) {
      interval = setInterval(() => setFreeCoinsTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [freeCoinsTimer]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleFirstInteraction = () => {
    initAudio();
    if (musicOn) startMusic();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result);
        setPhotoZoom(1);
        setPhotoPos({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    const newAvatar = uploadedPhoto || player.avatar;
    setPlayer((prev) => ({
      ...prev,
      name: editName,
      avatar: newAvatar,
      photoZoom,
      photoPos,
    }));
    setActiveModal(null);
  };

  const handleClaimFreeCoins = () => {
    if (freeCoinsTimer > 0) return;
    initAudio();
    if (soundOn) playSound('win');
    if (vibrationOn) vibrate([100, 50, 100]);
    setPlayer((prev) => ({ ...prev, coins: prev.coins + 250 }));
    setFreeCoinsTimer(3 * 3600);
  };

  const handleClaimPiggy = () => {
    initAudio();
    if (soundOn) playSound('win');
    setPlayer((prev) => ({ ...prev, coins: prev.coins + piggyBank }));
    setPiggyBank(0);
  };

  const claimMission = (missionKey, rewardType, amount) => {
    setPlayer((prev) => {
      const newMissions = { ...prev.missions, [missionKey]: true };
      const updates = { missions: newMissions };
      if (rewardType === 'coins') updates.coins = prev.coins + amount;
      else updates.gems = prev.gems + amount;
      return { ...prev, ...updates };
    });
    if (soundOn) playSound('win');
    if (vibrationOn) vibrate(50);
  };

  const handleSpin = () => {
    if (isSpinning) return;
    initAudio();
    if (soundOn) playSound('roll');
    if (vibrationOn) vibrate(50);

    setIsSpinning(true);
    setSpinResult(null);
    setTimeout(() => {
      const rewards = [100, 500, 1000, 2000, 5000];
      const win = rewards[Math.floor(Math.random() * rewards.length)];
      setPlayer((prev) => ({
        ...prev,
        coins: prev.coins + win,
        lastSpin: new Date().toDateString(),
      }));
      setSpinResult(win);
      setIsSpinning(false);
      if (soundOn) playSound('win');
      if (vibrationOn) vibrate([100, 50, 100]);
    }, 2000);
  };

  const buyDice = (dice) => {
    if (player.ownedDice.includes(dice.id)) return;
    if (dice.currency === 'coins' && player.coins >= dice.price) {
      setPlayer((prev) => ({
        ...prev,
        coins: prev.coins - dice.price,
        ownedDice: [...prev.ownedDice, dice.id],
      }));
    } else if (dice.currency === 'gems' && player.gems >= dice.price) {
      setPlayer((prev) => ({
        ...prev,
        gems: prev.gems - dice.price,
        ownedDice: [...prev.ownedDice, dice.id],
      }));
    }
  };

  const equipDice = (id) =>
    setPlayer((prev) => ({ ...prev, equippedDice: id }));

  const buyFrame = (frame) => {
    if (player.ownedFrames.includes(frame.id)) return;
    if (player.coins >= frame.cost) {
      setPlayer((prev) => ({
        ...prev,
        coins: prev.coins - frame.cost,
        ownedFrames: [...prev.ownedFrames, frame.id],
        equippedFrame: frame.id,
      }));
    }
  };

  const equipFrame = (id) =>
    setPlayer((prev) => ({ ...prev, equippedFrame: id }));

  const changeTheme = (themeId) => {
    initAudio();
    if (soundOn) playSound('safe');
    if (vibrationOn) vibrate(30);
    setPlayer((prev) => ({ ...prev, theme: themeId }));
  };

  const sendChat = (text, emoji) => {
    initAudio();
    if (soundOn) playSound('chat');
    const message = text || emoji;
    setChatBubble({
      color: userColor,
      text: message,
      emoji: emoji || '',
      id: Date.now(),
    });
    setLiveChatOpen(false);
    setCustomChatText('');

    // Smart AI Reply
    if (gameMode !== 'pass' && players.length > 1) {
      setTimeout(() => {
        const aiColor = players.find((c) => c !== userColor);
        if (aiColor) {
          const replies = [
            'Nice!',
            '😎',
            'You too!',
            "Let's see...",
            '🔥',
            'Good luck!',
          ];
          const randomReply =
            replies[Math.floor(Math.random() * replies.length)];
          setChatBubble({
            color: aiColor,
            text: randomReply,
            emoji: '',
            id: Date.now(),
          });
          setTimeout(() => setChatBubble(null), 3000);
        }
      }, 1500);
    }

    setTimeout(() => setChatBubble(null), 3000);
  };

  const startGame = (mode, count, bet = 0) => {
    initAudio();
    setGameMode(mode);
    setPlayerCount(count);
    setBetAmount(bet);

    let seq = [];
    if (mode === 'pass') {
      seq = PLAYER_COLORS.slice(0, passPlayers);
    } else if (count === 2) {
      const oppositePairs = {
        red: 'yellow',
        yellow: 'red',
        green: 'blue',
        blue: 'green',
      };
      const aiColor = oppositePairs[userColor];
      seq = [userColor, aiColor];
    } else {
      seq = [userColor, ...PLAYER_COLORS.filter((c) => c !== userColor)];
    }

    setPlayers(seq);
    setTokens(getInitialTokens());
    setTurnIndex(0);
    setDiceValue(null);
    setValidMoves([]);
    setWinner(null);
    setSixStreak(0);
    setPrizeWon(0);
    setXpWon(0);
    setLogMessage(`${seq[0].toUpperCase()}'s turn to roll.`);
    setCurrentScreen('game');
    setActiveModal(null);
  };

  const restartGame = () => {
    startGame(gameMode, playerCount, betAmount);
  };

  const exitGame = () => {
    if (betAmount > 0 && !winner) {
      setPlayer((prev) => ({
        ...prev,
        coins: Math.max(0, prev.coins - betAmount),
      }));
    }
    setCurrentScreen('menu');
    setPlayers([]);
    setActiveModal(null);
  };

  const checkValidMoves = (color, value, currentTokens) => {
    let moves = [];
    for (let i = 0; i < 4; i++) {
      let state = currentTokens[color][i];
      if (state === 57) continue;

      if (state === -1) {
        if (value === 6) moves.push(i);
      } else {
        let newState = state + value;
        if (newState <= 57) moves.push(i);
      }
    }
    return moves;
  };

  const rollDice = () => {
    if (isRolling || validMoves.length > 0 || winner || players.length === 0)
      return;

    initAudio();
    if (soundOn) playSound('roll');
    if (vibrationOn) vibrate(30);

    setIsRolling(true);
    setLogMessage('Rolling...');

    setTimeout(() => {
      const val = Math.floor(Math.random() * 6) + 1;
      setDiceValue(val);
      setIsRolling(false);

      if (val === 6 && vibrationOn) vibrate([50, 50, 50]);

      const currentColor = players[turnIndex];
      let currentStreak = val === 6 ? sixStreak + 1 : 0;
      setSixStreak(currentStreak);

      if (currentStreak === 3) {
        setLogMessage(`3 Sixes! Turn forfeited.`);
        setSixStreak(0);
        setTimeout(() => nextTurn(false), 1500);
        return;
      }

      const moves = checkValidMoves(currentColor, val, tokens);

      if (moves.length === 0) {
        setLogMessage(`No valid moves. Pass.`);
        setTimeout(() => nextTurn(val === 6 && currentStreak < 3), 1500);
      } else if (
        moves.length === 1 &&
        tokens[currentColor][moves[0]] === -1 &&
        val === 6
      ) {
        setTimeout(() => executeMove(currentColor, moves[0], val), 500);
      } else {
        setLogMessage(`Rolled ${val}. Select a token.`);
        setValidMoves(moves);
      }
    }, 800);
  };

  const executeMove = (color, tokenIndex, val) => {
    if (soundOn) playSound('move');

    let state = tokens[color][tokenIndex];
    let targetState = state === -1 ? 0 : state + val;

    let currentStepState = state;
    const stepInterval = setInterval(() => {
      if (currentStepState < targetState) {
        currentStepState++;
        if (state === -1) currentStepState = 0;
        if (soundOn) playSound('move');

        setAnimatingToken({ color, idx: tokenIndex, state: currentStepState });
      } else {
        clearInterval(stepInterval);
        finishMove(color, tokenIndex, targetState, val);
      }
    }, 200);
  };

  const finishMove = (color, tokenIndex, newState, val) => {
    setAnimatingToken(null);

    let newTokens = JSON.parse(JSON.stringify(tokens));
    newTokens[color][tokenIndex] = newState;
    let capture = false;
    let landedGlobalIndex = getGlobalTrackIndex(color, newState);

    if (
      newState >= 0 &&
      newState <= 50 &&
      !SAFE_SPOTS.includes(landedGlobalIndex)
    ) {
      Object.keys(newTokens).forEach((enemyColor) => {
        if (enemyColor !== color) {
          newTokens[enemyColor] = newTokens[enemyColor].map((enemyState) => {
            if (
              getGlobalTrackIndex(enemyColor, enemyState) === landedGlobalIndex
            ) {
              capture = true;
              return -1;
            }
            return enemyState;
          });
        }
      });
    }

    setTokens(newTokens);
    setValidMoves([]);

    if (capture) {
      if (soundOn) playSound('capture');
      if (vibrationOn) vibrate([100, 50, 100, 50, 150]);
      setPiggyBank((prev) => prev + 50);
    } else if (SAFE_SPOTS.includes(landedGlobalIndex)) {
      if (soundOn) playSound('safe');
    }

    if (newTokens[color].every((s) => s === 57)) {
      setWinner(color);
      if (soundOn) playSound('win');
      if (vibrationOn) vibrate([200, 100, 200, 100, 400]);

      let prize = 2000;
      let xp = 100;
      if (gameMode === 'tourney') {
        prize = 10000;
        xp = 500;
      } else if (gameMode === 'online') {
        prize = betAmount * 2;
        xp = 200;
      }

      setPrizeWon(prize);
      setXpWon(xp);

      setPlayer((prev) => {
        let newXp = prev.xp + xp;
        let newLevel = prev.level;
        while (newXp >= newLevel * 500) {
          newXp -= newLevel * 500;
          newLevel++;
        }

        const isHumanWin = color === userColor || gameMode === 'pass';
        const newStats = {
          played: prev.stats.played + 1,
          won: prev.stats.won + (isHumanWin ? 1 : 0),
        };

        return {
          ...prev,
          coins: prev.coins + prize,
          xp: newXp,
          level: newLevel,
          stats: newStats,
          missions: {
            ...prev.missions,
            win1: prev.missions.win1 || isHumanWin,
            capture2: prev.missions.capture2 || isHumanWin,
          },
        };
      });
      return;
    }

    const bonusTurn = val === 6 || capture || newState === 57;
    if (bonusTurn)
      setLogMessage(capture ? `CAPTURED! Bonus turn.` : `Bonus turn!`);

    setTimeout(() => nextTurn(bonusTurn), 500);
  };

  const nextTurn = (bonus) => {
    setDiceValue(null);
    setValidMoves([]);
    if (!bonus) {
      setTurnIndex((prev) => (prev + 1) % players.length);
      setSixStreak(0);
    }
  };

  const handleTokenClick = (color, tokenIndex) => {
    if (players[turnIndex] !== color) return;
    if (!validMoves.includes(tokenIndex)) return;
    executeMove(color, tokenIndex, diceValue);
  };

  useEffect(() => {
    const isAITurn =
      players.length > 0 &&
      players[turnIndex] !== userColor &&
      !winner &&
      gameMode !== 'pass' &&
      !animatingToken &&
      activeModal !== 'gameMenu';

    if (isAITurn && !diceValue && !isRolling && validMoves.length === 0) {
      const timer = setTimeout(() => rollDice(), 1200);
      return () => clearTimeout(timer);
    }

    if (isAITurn && validMoves.length > 0 && !winner) {
      const timer = setTimeout(() => {
        const color = players[turnIndex];
        let bestMove = validMoves[0];

        // AI Logic based on difficulty
        if (difficulty === 'Easy') {
          bestMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        } else if (difficulty === 'Medium') {
          let bestScore = -1;
          validMoves.forEach((move) => {
            let score = 0;
            let state = tokens[color][move];
            let newState = state === -1 ? 0 : state + diceValue;
            let trackIdx = getGlobalTrackIndex(color, newState);

            if (SAFE_SPOTS.includes(trackIdx)) score += 50;
            if (newState >= 51) score += 30;
            if (state === -1) score += 20;

            if (score > bestScore) {
              bestScore = score;
              bestMove = move;
            }
          });
        } else {
          let bestScore = -1;
          validMoves.forEach((move) => {
            let score = 0;
            let state = tokens[color][move];
            let newState = state === -1 ? 0 : state + diceValue;
            let trackIdx = getGlobalTrackIndex(color, newState);

            if (trackIdx !== -1 && !SAFE_SPOTS.includes(trackIdx)) {
              Object.keys(tokens).forEach((enemy) => {
                if (
                  enemy !== color &&
                  tokens[enemy].some(
                    (es) => getGlobalTrackIndex(enemy, es) === trackIdx
                  )
                )
                  score += 100;
              });
            }
            if (SAFE_SPOTS.includes(trackIdx)) score += 50;
            if (newState >= 51) score += 80;
            if (newState === 57) score += 200;

            if (score === bestScore) score += Math.random() * 10;

            if (score > bestScore) {
              bestScore = score;
              bestMove = move;
            }
          });
        }
        executeMove(players[turnIndex], bestMove, diceValue);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [
    players,
    turnIndex,
    diceValue,
    isRolling,
    validMoves,
    winner,
    userColor,
    difficulty,
    tokens,
    gameMode,
    animatingToken,
    activeModal,
  ]);

  const currentFrame =
    VIP_FRAMES.find((f) => f.id === player.equippedFrame) || VIP_FRAMES[0];

  const AvatarRenderer = ({
    size = 'w-14 h-14',
    avatarSrc,
    frameStyle,
    zoom = 1,
    pos = { x: 0, y: 0 },
  }) => {
    const isPhoto = avatarSrc.startsWith('data:image');

    return (
      <div
        className={`rounded-full overflow-hidden bg-blue-200 relative flex items-center justify-center ${size} ${frameStyle}`}
      >
        {isPhoto ? (
          <div className="w-full h-full overflow-hidden relative">
            <img
              src={avatarSrc}
              alt="avatar"
              className="absolute w-full h-full object-cover"
              style={{
                transform: `scale(${zoom}) translate(${pos.x}px, ${pos.y}px)`,
                left: 0,
                top: 0,
              }}
            />
          </div>
        ) : (
          <div
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: avatarSrc }}
          />
        )}
      </div>
    );
  };

  const renderTopBar = () => (
    <div className="flex justify-between items-center px-4 pt-4 pb-2 bg-gradient-to-b from-black/60 to-transparent z-10 w-full shrink-0 relative">
      <div className="flex flex-col gap-2">
        <div className="flex items-center bg-black/40 rounded-full pl-1 pr-3 py-1 border border-white/20">
          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-2 shadow-inner">
            <Coins size={14} className="text-yellow-900" />
          </div>
          <span className="text-yellow-400 font-bold text-sm">
            {player.coins.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center bg-black/40 rounded-full pl-1 pr-3 py-1 border border-white/20">
          <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center mr-2 shadow-inner">
            <Gem size={14} className="text-cyan-900" />
          </div>
          <span className="text-cyan-400 font-bold text-sm">
            {player.gems.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div
          className={`font-black text-3xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-tighter flex items-center gap-1 ${currentTheme.text}`}
        >
          LUDO <Crown size={28} className={`fill-current`} />
        </div>
        <div className="text-white text-xs font-bold tracking-[0.3em] bg-black/50 px-3 py-0.5 rounded-full border border-white/20 -mt-1 shadow-md">
          ROYAL
        </div>
      </div>

      <button
        onClick={() => {
          initAudio();
          setActiveModal('settings');
        }}
        className={`w-10 h-10 rounded-xl border-2 shadow-[0_4px_0_rgba(0,0,0,0.5)] flex items-center justify-center text-white active:translate-y-1 active:shadow-none transition-all ${currentTheme.primary} ${currentTheme.border}`}
      >
        <Settings size={22} />
      </button>
    </div>
  );

  const renderMenu = () => {
    const xpNeeded = player.level * 500;
    const xpPercent = Math.min(100, (player.xp / xpNeeded) * 100);
    const winRate =
      player.stats.played === 0
        ? 0
        : Math.round((player.stats.won / player.stats.played) * 100);

    return (
      <div
        className={`flex flex-col h-full relative overflow-hidden ${currentTheme.bgClass}`}
        onClick={handleFirstInteraction}
      >
        <AnimatedBackground theme={currentTheme} />
        {renderTopBar()}

        <div className="mx-4 mt-2 p-3 bg-black/40 rounded-xl border border-white/20 shadow-lg relative z-10 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                initAudio();
                setEditName(player.name);
                setUploadedPhoto(
                  player.avatar.startsWith('data:image') &&
                    !player.avatar.includes('svg')
                    ? player.avatar
                    : null
                );
                setPhotoZoom(player.photoZoom || 1);
                setPhotoPos(player.photoPos || { x: 0, y: 0 });
                setActiveModal('profile');
              }}
              className="relative transition-transform active:scale-90"
            >
              <AvatarRenderer
                size="w-16 h-16"
                avatarSrc={player.avatar}
                frameStyle={currentFrame.style}
                zoom={player.photoZoom}
                pos={player.photoPos}
              />
              <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-1 border-2 border-white shadow-md">
                <Edit3 size={12} className="text-yellow-900" />
              </div>
            </button>

            <div className="flex-1">
              <div className="text-white font-bold text-lg flex items-center gap-2">
                {player.name} <span className="text-xl">{player.country}</span>
              </div>
              <div className="flex justify-between items-center text-xs mt-1">
                <span
                  className={`${currentTheme.text} font-bold bg-black/30 px-2 py-0.5 rounded`}
                >
                  Lvl {player.level} • Royal Master
                </span>
                <span className="text-white/80">
                  Win Rate: <b className="text-white">{winRate}%</b>
                </span>
              </div>
              <div className="w-full bg-black/50 rounded-full h-2 mt-1 border border-white/20 overflow-hidden">
                <div
                  className={`bg-gradient-to-r h-full rounded-full ${currentTheme.buttonGrad}`}
                  style={{ width: `${xpPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-3 bg-black/30 rounded-lg p-2 text-xs border border-white/10">
            <div className="flex flex-col items-center">
              <span className="text-white/60">Matches</span>
              <span className="text-white font-bold">
                {player.stats.played}
              </span>
            </div>
            <div className="w-px bg-white/20"></div>
            <div className="flex flex-col items-center">
              <span className="text-white/60">Wins</span>
              <span className="text-green-400 font-bold">
                {player.stats.won}
              </span>
            </div>
            <div className="w-px bg-white/20"></div>
            <div className="flex flex-col items-center">
              <span className="text-white/60">Win Rate</span>
              <span className={`font-bold ${currentTheme.text}`}>
                {winRate}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mx-4 mt-2 z-10">
          <button
            onClick={handleClaimFreeCoins}
            disabled={freeCoinsTimer > 0}
            className={`flex-1 rounded-xl p-1.5 border-2 shadow-md flex items-center justify-center gap-1 relative overflow-hidden transition-all ${
              freeCoinsTimer > 0
                ? 'bg-gray-800 border-gray-600'
                : 'bg-gradient-to-br from-green-400 to-green-700 border-green-300 active:translate-y-0.5'
            }`}
          >
            <Gift
              size={18}
              className={freeCoinsTimer > 0 ? 'text-gray-400' : 'text-white'}
            />
            <div className="flex flex-col items-start">
              <span
                className={`text-[10px] font-bold ${
                  freeCoinsTimer > 0 ? 'text-gray-400' : 'text-white'
                }`}
              >
                FREE
              </span>
              <span
                className={`text-[10px] font-bold ${
                  freeCoinsTimer > 0 ? 'text-gray-400' : 'text-white'
                }`}
              >
                {freeCoinsTimer > 0 ? formatTime(freeCoinsTimer) : '250 COINS'}
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveModal('piggy')}
            className="flex-1 bg-gradient-to-br from-pink-400 to-pink-700 rounded-xl p-1.5 border-2 border-pink-300 shadow-md flex items-center justify-center gap-1 active:translate-y-0.5"
          >
            <Heart size={18} className="text-white" />
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-bold text-white">
                PIGGY BANK
              </span>
              <span className="text-[10px] font-bold text-white">
                {piggyBank} COINS
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveModal('missions')}
            className="flex-1 bg-gradient-to-br from-blue-400 to-blue-700 rounded-xl p-1.5 border-2 border-blue-300 shadow-md flex items-center justify-center gap-1 active:translate-y-0.5"
          >
            <Target size={18} className="text-white" />
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-bold text-white">DAILY</span>
              <span className="text-[10px] font-bold text-white">MISSIONS</span>
            </div>
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-4 gap-4 mt-2 mb-20 z-10">
          <div className="flex gap-4 h-32">
            <ModeCard
              title="PLAY ONLINE"
              subtitle="Global 1v1 & 4P"
              badge="LIVE"
              icon={
                <Globe
                  size={38}
                  className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                />
              }
              watermarkIcon={<Globe size={80} className="text-white" />}
              themeGradient="from-red-500 via-red-700 to-rose-900"
              onClick={() => setActiveModal('online')}
            />
            <ModeCard
              title="PLAY OFFLINE"
              subtitle="Smart Computer"
              badge="VS AI"
              icon={
                <Bot
                  size={38}
                  className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                />
              }
              watermarkIcon={<Bot size={80} className="text-white" />}
              themeGradient="from-purple-500 via-purple-800 to-indigo-950"
              onClick={() => setActiveModal('offline')}
            />
          </div>
          <div className="flex gap-4 h-32">
            <ModeCard
              title="PASS & PLAY"
              subtitle="2-4 Friends"
              badge="LOCAL"
              icon={
                <Users
                  size={38}
                  className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                />
              }
              watermarkIcon={<Users size={80} className="text-white" />}
              themeGradient="from-emerald-400 via-emerald-700 to-teal-950"
              onClick={() => setActiveModal('pass')}
            />
            <ModeCard
              title="TOURNAMENT"
              subtitle="Knockout Cup"
              badge="2X PRIZE"
              icon={
                <Trophy
                  size={38}
                  className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                />
              }
              watermarkIcon={<Trophy size={80} className="text-white" />}
              themeGradient="from-amber-400 via-orange-600 to-amber-900"
              onClick={() => setActiveModal('tourney')}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderStore = () => (
    <div className={`flex flex-col h-full ${currentTheme.bgClass}`}>
      <AnimatedBackground theme={currentTheme} />
      {renderTopBar()}

      <div className="px-4 py-2 flex items-center justify-between border-b border-white/20 bg-black/30 shrink-0 z-10 relative">
        <button
          onClick={() => setCurrentScreen('menu')}
          className="flex items-center text-white bg-black/40 px-3 py-1.5 rounded-lg active:bg-black/60 border border-white/20"
        >
          <ChevronLeft size={20} /> Back
        </button>
        <h2
          className={`font-bold text-xl uppercase drop-shadow-md flex items-center gap-2 ${currentTheme.text}`}
        >
          STORE
        </h2>
        <div className="w-16"></div>
      </div>

      <div className="flex px-4 pt-3 gap-2 z-10 relative">
        <button
          onClick={() => setStoreTab('dice')}
          className={`flex-1 py-2 font-bold uppercase rounded-lg border-b-4 transition-all ${
            storeTab === 'dice'
              ? `bg-black/40 ${currentTheme.text} ${currentTheme.border}`
              : 'text-white/60 border-transparent hover:bg-black/20'
          }`}
        >
          Dice Skins
        </button>
        <button
          onClick={() => setStoreTab('themes')}
          className={`flex-1 py-2 font-bold uppercase rounded-lg border-b-4 transition-all ${
            storeTab === 'themes'
              ? `bg-black/40 ${currentTheme.text} ${currentTheme.border}`
              : 'text-white/60 border-transparent hover:bg-black/20'
          }`}
        >
          App Themes
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24 z-10 relative">
        {storeTab === 'dice' ? (
          <div className="grid grid-cols-2 gap-4">
            {DICE_SKINS.map((dice) => {
              const isOwned = player.ownedDice.includes(dice.id);
              const isEquipped = player.equippedDice === dice.id;
              return (
                <div
                  key={dice.id}
                  className="bg-black/40 rounded-xl p-3 border border-white/10 flex flex-col items-center shadow-lg relative backdrop-blur-sm"
                >
                  {isEquipped && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-xl z-10 border-b border-l border-green-300">
                      EQUIPPED
                    </div>
                  )}

                  <div className="w-full aspect-square bg-black/50 rounded-lg flex items-center justify-center mb-3 shadow-inner relative overflow-hidden">
                    <div className="transform scale-150">
                      <Dice3D
                        skinId={dice.id}
                        value={6}
                        isRolling={false}
                        preview={true}
                      />
                    </div>
                  </div>

                  <h3 className="text-white font-bold text-sm text-center mb-2 leading-tight h-8">
                    {dice.name}
                  </h3>
                  {isOwned ? (
                    <GlossyButton
                      color={isEquipped ? 'gray' : 'green'}
                      onClick={() => equipDice(dice.id)}
                      disabled={isEquipped}
                      className="w-full py-1.5 text-sm"
                    >
                      {isEquipped ? 'EQUIPPED' : 'EQUIP'}
                    </GlossyButton>
                  ) : (
                    <GlossyButton
                      color={dice.currency === 'coins' ? 'gold' : 'blue'}
                      onClick={() => buyDice(dice)}
                      disabled={
                        (dice.currency === 'coins' &&
                          player.coins < dice.price) ||
                        (dice.currency === 'gems' && player.gems < dice.price)
                      }
                      className="w-full py-1.5 text-sm"
                    >
                      {dice.currency === 'coins' ? (
                        <Coins size={14} />
                      ) : (
                        <Gem size={14} />
                      )}{' '}
                      {dice.price.toLocaleString()}
                    </GlossyButton>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {Object.values(THEMES).map((theme) => {
              const isEquipped = player.theme === theme.id;
              return (
                <div
                  key={theme.id}
                  className={`rounded-xl p-3 border-2 flex items-center gap-4 shadow-lg relative overflow-hidden ${
                    isEquipped
                      ? 'border-yellow-400 bg-white/10'
                      : 'border-white/10 bg-black/30'
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${theme.bgClass} ${theme.border} shadow-lg`}
                  >
                    <Palette size={28} className={theme.text} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-base">
                      {theme.name}
                    </h3>
                    <p className="text-white/60 text-xs mt-1">
                      {theme.id === 'royal' &&
                        'Classic Royal Blue & Gold luxury palace.'}
                      {theme.id === 'cyberpunk' &&
                        'Dark midnight purple with neon cyan/magenta.'}
                      {theme.id === 'emerald' &&
                        'Deep royal emerald green & antique gold.'}
                      {theme.id === 'crimson' &&
                        'Dark ruby red & molten gold ember feel.'}
                    </p>
                  </div>
                  <div>
                    {isEquipped ? (
                      <div className="flex flex-col items-center gap-1">
                        <Check size={20} className="text-green-400" />
                        <span className="text-[10px] font-bold text-green-400">
                          ACTIVE
                        </span>
                      </div>
                    ) : (
                      <GlossyButton
                        color="green"
                        onClick={() => changeTheme(theme.id)}
                        className="py-1.5 px-3 text-xs"
                      >
                        EQUIP
                      </GlossyButton>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  const renderBottomNav = () => (
    <div className="absolute bottom-0 w-full bg-black/80 border-t border-white/20 flex justify-around py-2 z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.5)] shrink-0 backdrop-blur-md">
      <button
        onClick={() => setCurrentScreen('store')}
        className={`flex flex-col items-center p-2 ${
          currentScreen === 'store' ? currentTheme.text : 'text-white/40'
        }`}
      >
        <Dices size={24} />
        <span className="text-[10px] font-bold mt-1">STORE</span>
      </button>
      <button
        onClick={() => setActiveModal('leaderboard')}
        className={`flex flex-col items-center p-2 ${
          activeModal === 'leaderboard' ? currentTheme.text : 'text-white/40'
        }`}
      >
        <Trophy size={24} />
        <span className="text-[10px] font-bold mt-1">LEADERBOARD</span>
      </button>
      <button
        onClick={() => setCurrentScreen('menu')}
        className={`flex flex-col items-center p-2 ${
          currentScreen === 'menu' ? currentTheme.text : 'text-white/40'
        }`}
      >
        <Home size={24} />
        <span className="text-[10px] font-bold mt-1">HOME</span>
      </button>
    </div>
  );

  const renderGameScreen = () => {
    if (!players || players.length === 0) return null;

    const currentColor = players[turnIndex];
    const isUserTurn = currentColor === userColor || gameMode === 'pass';

    const boardCells = [];
    for (let r = 0; r < 15; r++) {
      for (let c = 0; c < 15; c++) {
        let bgClass = activeBoardTheme.pathBase;
        let borderClass = `border-[1px] ${activeBoardTheme.pathBorder}`;
        let content = null;
        let style = {};

        const trackIdx = MAIN_TRACK.findIndex(
          (pos) => pos[0] === r && pos[1] === c
        );
        if (trackIdx !== -1) {
          bgClass = activeBoardTheme.pathBase;
          borderClass = `border-[1.5px] ${activeBoardTheme.pathBorder} shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]`;

          if (trackIdx === 0)
            bgClass =
              'bg-gradient-to-br from-red-400 to-red-600 shadow-[inset_0_0_10px_rgba(255,255,255,0.5)]';
          if (trackIdx === 13)
            bgClass =
              'bg-gradient-to-br from-green-400 to-green-600 shadow-[inset_0_0_10px_rgba(255,255,255,0.5)]';
          if (trackIdx === 26)
            bgClass =
              'bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-[inset_0_0_10px_rgba(255,255,255,0.5)]';
          if (trackIdx === 39)
            bgClass =
              'bg-gradient-to-br from-blue-400 to-blue-600 shadow-[inset_0_0_10px_rgba(255,255,255,0.5)]';

          if (SAFE_SPOTS.includes(trackIdx)) {
            content = (
              <Star
                size={16}
                className={activeBoardTheme.safeStar}
                fill="currentColor"
              />
            );
            borderClass = `border-2 border-white/50`;
          }
        }

        Object.keys(HOME_PATHS).forEach((color) => {
          if (HOME_PATHS[color].some((pos) => pos[0] === r && pos[1] === c)) {
            bgClass =
              activeBoardTheme[
                `homePath${color.charAt(0).toUpperCase() + color.slice(1)}`
              ];
            borderClass = 'border-white/30 border-[1px]';
          }
        });

        if (r >= 6 && r <= 8 && c >= 6 && c <= 8) {
          borderClass = 'border-black/20';
          if (r === 6 && c === 6) {
            bgClass = 'bg-red-500 rounded-tl-full';
            style = { backgroundColor: '#ef4444' };
          } else if (r === 6 && c === 8) {
            bgClass = 'bg-green-500 rounded-tr-full';
            style = { backgroundColor: '#22c55e' };
          } else if (r === 8 && c === 6) {
            bgClass = 'bg-blue-500 rounded-bl-full';
            style = { backgroundColor: '#3b82f6' };
          } else if (r === 8 && c === 8) {
            bgClass = 'bg-yellow-400 rounded-br-full';
            style = { backgroundColor: '#facc15' };
          } else bgClass = 'bg-black/10';

          if (r === 7 && c === 7)
            content = (
              <Crown
                size={24}
                className={`text-white ${
                  difficulty === 'Hard' ? 'animate-pulse text-orange-400' : ''
                }`}
              />
            );
        }

        const isRedBase = r >= 1 && r <= 5 && c >= 1 && c <= 5;
        const isGreenBase = r >= 1 && r <= 5 && c >= 9 && c <= 13;
        const isYellowBase = r >= 9 && r <= 13 && c >= 9 && c <= 13;
        const isBlueBase = r >= 9 && r <= 13 && c >= 1 && c <= 5;

        if (isRedBase) {
          bgClass = activeBoardTheme.baseRed;
          borderClass = 'border-black/30';
          style = {};
        }
        if (isGreenBase) {
          bgClass = activeBoardTheme.baseGreen;
          borderClass = 'border-black/30';
          style = {};
        }
        if (isYellowBase) {
          bgClass = activeBoardTheme.baseYellow;
          borderClass = 'border-black/30';
          style = {};
        }
        if (isBlueBase) {
          bgClass = activeBoardTheme.baseBlue;
          borderClass = 'border-black/30';
          style = {};
        }

        if (
          (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
          (r >= 2 && r <= 4 && c >= 10 && c <= 12) ||
          (r >= 10 && r <= 12 && c >= 10 && c <= 12) ||
          (r >= 10 && r <= 12 && c >= 2 && c <= 4)
        ) {
          bgClass = 'bg-transparent';
          borderClass = `border-2 ${activeBoardTheme.innerBaseBorder}`;
          if (r === 2 && c === 2) borderClass += ' rounded-tl-xl';
          if (r === 2 && c === 4) borderClass += ' rounded-tr-xl';
          if (r === 4 && c === 2) borderClass += ' rounded-bl-xl';
          if (r === 4 && c === 4) borderClass += ' rounded-br-xl';
        }

        const baseSpot = BASE_AREAS.red
          .concat(BASE_AREAS.green, BASE_AREAS.yellow, BASE_AREAS.blue)
          .find((pos) => pos[0] === r && pos[1] === c);
        if (baseSpot) {
          const color = Object.keys(BASE_AREAS).find((k) =>
            BASE_AREAS[k].includes(baseSpot)
          );
          bgClass = `bg-${color}-100`;
          borderClass = `border-4 ${COLORS[color].border} rounded-full`;
          style = {
            boxShadow: `0 0 15px ${COLORS[color].hex}, inset 0 0 5px rgba(0,0,0,0.3)`,
          };
        }

        boardCells.push(
          <div
            key={`${r}-${c}`}
            className={`w-full h-full border-[0.5px] ${borderClass} ${bgClass} flex items-center justify-center relative`}
            style={style}
          >
            {content}
          </div>
        );
      }
    }

    const tokensByCoord = {};
    players.forEach((color) => {
      tokens[color].forEach((state, idx) => {
        let renderState = state;
        if (
          animatingToken &&
          animatingToken.color === color &&
          animatingToken.idx === idx
        ) {
          renderState = animatingToken.state;
        }

        const coord = getTokenCoords(color, renderState, idx);
        const key = `${coord[0]}-${coord[1]}`;
        if (!tokensByCoord[key]) tokensByCoord[key] = [];
        tokensByCoord[key].push({ color, idx, renderState });
      });
    });

    const renderTokens = () => {
      return Object.keys(tokensByCoord).flatMap((coordKey) => {
        const [r, c] = coordKey.split('-').map(Number);
        const tokensHere = tokensByCoord[coordKey];

        return tokensHere.map((t, i) => {
          const { color, idx, renderState } = t;
          const isSelected =
            validMoves.includes(idx) && players[turnIndex] === color;
          const isAnimating =
            animatingToken &&
            animatingToken.color === color &&
            animatingToken.idx === idx;

          let offsetClass = '';
          if (tokensHere.length > 1 && !isAnimating) {
            const offsets = [
              '-translate-x-1 -translate-y-1',
              'translate-x-1 -translate-y-1',
              '-translate-x-1 translate-y-1',
              'translate-x-1 translate-y-1',
            ];
            offsetClass = offsets[i % 4];
          }

          const top = `${(r / 15) * 100}%`;
          const left = `${(c / 15) * 100}%`;
          const width = `${(1 / 15) * 100}%`;

          return (
            <div
              key={`token-${color}-${idx}`}
              onClick={() => isSelected && handleTokenClick(color, idx)}
              className={`absolute z-20 flex items-center justify-center transition-all duration-200 ${
                isSelected ? 'cursor-pointer hover:scale-125' : ''
              }`}
              style={{ top, left, width, height: width }}
            >
              <div
                className={`w-[85%] h-[85%] rounded-full border-2 border-white shadow-[0_2px_5px_rgba(0,0,0,0.6)] flex items-center justify-center relative ${
                  COLORS[color].main
                } ${offsetClass} ${
                  isSelected
                    ? `animate-pulse ring-4 ${currentTheme.border} ring-offset-1`
                    : ''
                } ${
                  isAnimating ? 'scale-125 z-30 shadow-2xl -translate-y-2' : ''
                }`}
              >
                <div className="w-2/3 h-2/3 rounded-full border-2 border-white/80 flex items-center justify-center">
                  <div className="w-1/2 h-1/2 bg-white/40 rounded-full"></div>
                </div>
                {renderState === 57 && (
                  <Crown
                    size={10}
                    className="text-white absolute drop-shadow"
                  />
                )}
              </div>
            </div>
          );
        });
      });
    };

    const getHUD = (color, positionClass) => {
      if (!players.includes(color)) return null;
      const isTurn = currentColor === color;
      const isUser = color === userColor;

      let name = isUser
        ? player.name
        : AI_NAMES[PLAYER_COLORS.indexOf(color) - 1] || 'Bot';
      let flag = isUser
        ? player.country
        : AI_FLAGS[PLAYER_COLORS.indexOf(color) - 1] || '🤖';
      if (gameMode === 'pass') {
        name = `Player ${PLAYER_COLORS.indexOf(color) + 1}`;
        flag = '👤';
      }

      const activeBubble =
        chatBubble && chatBubble.color === color ? chatBubble : null;

      return (
        <div
          className={`absolute ${positionClass} flex flex-col items-center z-30 transition-transform ${
            isTurn ? 'scale-110' : 'scale-90 opacity-80'
          }`}
        >
          {activeBubble && (
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1.5 rounded-xl shadow-lg border-2 border-yellow-400 whitespace-nowrap animate-bounce z-50">
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-yellow-400 transform rotate-45"></div>
              <span className="text-sm font-bold">
                {activeBubble.emoji} {activeBubble.text}
              </span>
            </div>
          )}
          <div
            className={`relative p-1 rounded-xl bg-black/60 border-2 ${
              isTurn
                ? `${currentTheme.border} shadow-[0_0_15px_rgba(255,255,255,0.3)]`
                : 'border-white/20'
            }`}
          >
            {isTurn && (
              <div
                className={`absolute -top-3 left-1/2 -translate-x-1/2 ${currentTheme.text} text-black text-[8px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap`}
              >
                TURN
              </div>
            )}
            <div
              className={`w-10 h-10 rounded-full overflow-hidden border-2 ${COLORS[color].border} bg-gray-200`}
            >
              {isUser ? (
                <AvatarRenderer
                  size="w-full h-full"
                  avatarSrc={player.avatar}
                  frameStyle="border-0"
                  zoom={player.photoZoom}
                  pos={player.photoPos}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl">
                  {flag}
                </div>
              )}
            </div>
            <div className="text-white text-[10px] font-bold mt-1 leading-none truncate w-14">
              {name}
            </div>
          </div>
        </div>
      );
    };

    const quickMessages = [
      { text: 'Well Played!', emoji: '👏' },
      { text: 'Oops!', emoji: '😂' },
      { text: 'Hurry Up!', emoji: '😎' },
      { text: 'Good Luck!', emoji: '🔥' },
    ];
    const quickEmojis = ['😂', '🔥', '😎', '😱', '👏', '❤️'];

    return (
      <div
        className={`flex flex-col h-full relative overflow-hidden select-none ${currentTheme.bgClass}`}
      >
        <AnimatedBackground theme={currentTheme} />

        <div className="flex justify-between items-center p-2 bg-black/40 z-30 border-b border-white/20 relative">
          <button
            onClick={() => {
              initAudio();
              setActiveModal('gameMenu');
            }}
            className="flex items-center text-white bg-gradient-to-b from-yellow-500 to-yellow-700 px-3 py-1.5 rounded-lg shadow-[0_2px_0_#854d0e] border border-yellow-300 active:translate-y-0.5 active:shadow-none text-sm font-bold gap-1"
          >
            <Pause size={16} /> MENU
          </button>

          <div
            className={`font-bold text-xs px-3 py-1 rounded-full border-2 border-white/20 shadow-md ${activeBoardTheme.badgeColor}`}
          >
            {activeBoardTheme.name}
          </div>

          <div className="w-16"></div>
        </div>

        <div className="flex-1 flex items-center justify-center p-2 relative">
          {getHUD('red', 'top-2 left-2')}
          {getHUD('green', 'top-2 right-2')}
          {getHUD('yellow', 'bottom-2 right-2')}
          {getHUD('blue', 'bottom-2 left-2')}

          <div
            className={`w-full max-w-[360px] aspect-square rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden relative border-[6px] ring-4 ${activeBoardTheme.boardBg} ${activeBoardTheme.frame} ${activeBoardTheme.glowEffect}`}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(15, minmax(0, 1fr))',
              gridTemplateRows: 'repeat(15, minmax(0, 1fr))',
            }}
          >
            {boardCells}
            {renderTokens()}
          </div>
        </div>

        <div className="p-4 bg-black/60 border-t border-white/20 flex justify-between items-center z-30 min-h-[110px] backdrop-blur-md relative">
          <div className="flex-1 flex flex-col justify-center pr-4">
            {isUserTurn && !winner && (
              <div className="text-white text-sm font-bold bg-black/40 px-4 py-2 rounded-xl border border-white/20 shadow-inner">
                {validMoves.length > 0
                  ? '👉 Tap a glowing token to move'
                  : '👇 Tap the dice to roll!'}
              </div>
            )}
            {!isUserTurn && !winner && (
              <div
                className={`text-sm font-bold animate-pulse flex items-center gap-2 ${currentTheme.text}`}
              >
                <Bot size={18} /> Computer is thinking...
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setLiveChatOpen(!liveChatOpen)}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-[0_2px_0_rgba(0,0,0,0.5)] border-2 active:translate-y-0.5 active:shadow-none z-40 ${currentTheme.buttonGrad}`}
            >
              <MessageSquare size={20} className="text-white" />
            </button>
            <Dice3D
              skinId={player.equippedDice}
              value={diceValue}
              isRolling={isRolling}
              onClick={rollDice}
              disabled={
                !isUserTurn || validMoves.length > 0 || isRolling || winner
              }
            />
          </div>

          {liveChatOpen && (
            <div className="absolute bottom-[110px] right-2 w-72 bg-black/95 border-2 border-white/20 rounded-2xl z-50 p-3 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in slide-in-from-bottom-2 duration-200">
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`font-bold text-xs uppercase ${currentTheme.text}`}
                >
                  Live Chat
                </span>
                <button
                  onClick={() => setLiveChatOpen(false)}
                  className="text-white bg-white/10 p-0.5 rounded-full"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="flex justify-between mb-3 pt-1 border-b border-white/10 pb-2">
                {quickEmojis.map((emoji, i) => (
                  <button
                    key={i}
                    onClick={() => sendChat('', emoji)}
                    className="text-2xl bg-white/10 w-8 h-8 rounded-full flex items-center justify-center border border-white/20 active:bg-white/20"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-1.5 mb-3">
                {quickMessages.map((msg, i) => (
                  <button
                    key={i}
                    onClick={() => sendChat(msg.text, msg.emoji)}
                    className="bg-white/10 border border-white/20 rounded-lg p-1.5 text-white font-bold text-[10px] active:bg-white/20 flex items-center justify-center gap-1"
                  >
                    <span>{msg.emoji}</span> {msg.text}
                  </button>
                ))}
              </div>

              <div className="flex gap-1">
                <input
                  type="text"
                  value={customChatText}
                  onChange={(e) => setCustomChatText(e.target.value)}
                  placeholder="Type a comment..."
                  className="flex-1 bg-white/10 text-white text-xs px-2 py-1.5 rounded-lg border border-white/20 focus:outline-none focus:border-yellow-400 placeholder-white/40"
                  maxLength={20}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customChatText.trim()) {
                      sendChat(customChatText.trim(), '');
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (customChatText.trim())
                      sendChat(customChatText.trim(), '');
                  }}
                  disabled={!customChatText.trim()}
                  className="bg-yellow-500 text-yellow-900 px-2 rounded-lg font-bold active:bg-yellow-400 disabled:opacity-50"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Game Menu Modal */}
        <Modal
          theme={currentTheme}
          isOpen={activeModal === 'gameMenu'}
          onClose={() => setActiveModal(null)}
          title="Match Options"
        >
          <div className="flex flex-col gap-3">
            <GlossyButton
              color="green"
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 text-sm flex items-center justify-center gap-2"
            >
              <Play size={18} /> RESUME MATCH
            </GlossyButton>

            <GlossyButton
              color="yellow"
              onClick={() => {
                restartGame();
                setActiveModal(null);
              }}
              className="w-full py-2.5 text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} /> RESTART MATCH
            </GlossyButton>

            <div className="flex items-center justify-between bg-black/30 p-3 rounded-xl border border-white/10">
              <span className="text-white font-bold flex items-center gap-2 text-sm">
                <Music
                  size={16}
                  className={musicOn ? 'text-green-400' : 'text-gray-400'}
                />{' '}
                Music
              </span>
              <button
                onClick={() => {
                  initAudio();
                  setMusicOn(!musicOn);
                }}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                  musicOn ? 'bg-green-500' : 'bg-gray-500'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                    musicOn ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between bg-black/30 p-3 rounded-xl border border-white/10">
              <span className="text-white font-bold flex items-center gap-2 text-sm">
                {soundOn ? (
                  <Volume2 size={16} className="text-green-400" />
                ) : (
                  <VolumeX size={16} className="text-red-400" />
                )}{' '}
                Sound
              </span>
              <button
                onClick={() => {
                  initAudio();
                  setSoundOn(!soundOn);
                }}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                  soundOn ? 'bg-green-500' : 'bg-gray-500'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                    soundOn ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            <div className="h-px bg-white/20 w-full my-1"></div>

            {!winner ? (
              <GlossyButton
                color="red"
                onClick={exitGame}
                className="w-full py-2.5 text-sm flex flex-col items-center justify-center gap-0.5"
              >
                <div className="flex items-center gap-2">
                  <LogOut size={16} /> EXIT TO LOBBY
                </div>
                {betAmount > 0 && (
                  <span className="text-[9px] font-normal opacity-90">
                    (-{betAmount} coins forfeit)
                  </span>
                )}
              </GlossyButton>
            ) : (
              <GlossyButton
                color="red"
                onClick={exitGame}
                className="w-full py-2.5 text-sm flex items-center justify-center gap-2"
              >
                <LogOut size={16} /> EXIT TO LOBBY
              </GlossyButton>
            )}
          </div>
        </Modal>

        <Modal
          theme={currentTheme}
          isOpen={!!winner}
          onClose={() => {}}
          title="VICTORY!"
          hideClose={true}
        >
          <Confetti />
          <div className="flex flex-col items-center relative z-10">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(253,224,71,0.8)] mb-4 border-4 border-yellow-200">
              <Trophy size={48} className="text-white drop-shadow-md" />
            </div>
            <h2 className="text-3xl font-black text-yellow-400 mb-2 uppercase text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {winner === userColor || gameMode === 'pass'
                ? 'VICTORY!'
                : 'YOU LOST!'}
            </h2>
            <p className="text-white/80 mb-6 text-center font-bold">
              The {winner ? winner.toUpperCase() : ''} player won!
            </p>

            <div className="w-full bg-black/40 rounded-xl p-4 border border-white/20 mb-6 flex justify-around">
              <div className="flex flex-col items-center">
                <Coins size={28} className="text-yellow-400 mb-1" />
                <span className="text-yellow-400 font-black text-xl">
                  +{prizeWon}
                </span>
                <span className="text-xs text-white/60">COINS</span>
              </div>
              <div className="w-px bg-white/20"></div>
              <div className="flex flex-col items-center">
                <TrendingUp size={28} className="text-green-400 mb-1" />
                <span className="text-green-400 font-black text-xl">
                  +{xpWon}
                </span>
                <span className="text-xs text-white/60">XP</span>
              </div>
            </div>

            <GlossyButton color="green" onClick={exitGame} className="w-full">
              Collect & Exit
            </GlossyButton>
          </div>
        </Modal>
      </div>
    );
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-black"
      onClick={handleFirstInteraction}
    >
      <div
        className={`relative w-full max-w-md h-[850px] max-h-screen overflow-hidden shadow-2xl sm:rounded-3xl sm:border-8 sm:border-gray-800 font-sans ${currentTheme.bgClass}`}
      >
        <div className="w-full h-full relative z-10">
          {currentScreen === 'menu' && renderMenu()}
          {currentScreen === 'store' && renderStore()}
          {currentScreen === 'game' && renderGameScreen()}
        </div>

        {(currentScreen === 'menu' || currentScreen === 'store') &&
          renderBottomNav()}

        <Modal
          theme={currentTheme}
          isOpen={activeModal === 'themes'}
          onClose={() => setActiveModal(null)}
          title="Select Theme"
        >
          <div className="grid grid-cols-2 gap-3">
            {Object.values(THEMES).map((t) => (
              <button
                key={t.id}
                onClick={() => changeTheme(t.id)}
                className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 ${
                  player.theme === t.id
                    ? 'border-yellow-400 bg-white/10'
                    : 'border-white/10 bg-black/20'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full ${t.bgClass} border-2 ${t.border} shadow-md flex items-center justify-center`}
                >
                  <Palette size={20} className={t.text} />
                </div>
                <span className="text-white font-bold text-sm">{t.name}</span>
                {player.theme === t.id && (
                  <span className="text-[10px] text-yellow-400 font-bold bg-yellow-400/20 px-2 py-0.5 rounded">
                    ACTIVE
                  </span>
                )}
              </button>
            ))}
          </div>
        </Modal>

        <Modal
          theme={currentTheme}
          isOpen={activeModal === 'profile'}
          onClose={() => setActiveModal(null)}
          title="Profile & Avatar"
        >
          <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">
            <div className="flex flex-col items-center justify-center gap-3 bg-black/30 p-4 rounded-xl border border-white/10">
              <div className="relative">
                <AvatarRenderer
                  size="w-24 h-24"
                  avatarSrc={uploadedPhoto || player.avatar}
                  frameStyle={currentFrame.style}
                  zoom={photoZoom}
                  pos={photoPos}
                />
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <GlossyButton
                color="blue"
                onClick={() => fileInputRef.current.click()}
                className="w-full py-2 text-sm flex items-center gap-2"
              >
                <Upload size={16} /> Upload Original Photo
              </GlossyButton>

              {uploadedPhoto && (
                <div className="w-full flex flex-col gap-2 mt-2 bg-black/40 p-2 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2">
                    <ZoomIn size={16} className={currentTheme.text} />
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.1"
                      value={photoZoom}
                      onChange={(e) => setPhotoZoom(parseFloat(e.target.value))}
                      className="w-full accent-yellow-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-white/60 font-bold">
                      Pos X
                    </span>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={photoPos.x}
                      onChange={(e) =>
                        setPhotoPos({
                          ...photoPos,
                          x: parseInt(e.target.value),
                        })
                      }
                      className="w-full accent-yellow-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-white/60 font-bold">
                      Pos Y
                    </span>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={photoPos.y}
                      onChange={(e) =>
                        setPhotoPos({
                          ...photoPos,
                          y: parseInt(e.target.value),
                        })
                      }
                      className="w-full accent-yellow-400"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="text-white/80 text-xs font-bold mb-1 block uppercase">
                Player Name
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-black/40 text-white font-bold px-4 py-2 rounded-xl border-2 border-white/20 focus:outline-none focus:border-yellow-400"
                maxLength={12}
              />
            </div>

            <div>
              <p className="text-white/80 text-xs font-bold mb-2 uppercase">
                VIP Frames
              </p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {VIP_FRAMES.map((frame) => {
                  const isOwned =
                    player.ownedFrames.includes(frame.id) ||
                    frame.id === 'none';
                  const isEquipped = player.equippedFrame === frame.id;
                  return (
                    <div
                      key={frame.id}
                      className="flex flex-col items-center gap-1 shrink-0"
                    >
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center bg-black/40 ${
                          frame.style
                        } ${isEquipped ? 'ring-2 ring-white' : ''}`}
                      >
                        <Crown
                          size={24}
                          className={
                            frame.id === 'none' ? 'text-gray-500' : 'text-white'
                          }
                        />
                      </div>
                      <span className="text-[10px] text-white font-bold">
                        {frame.name}
                      </span>
                      {isOwned ? (
                        <button
                          onClick={() => equipFrame(frame.id)}
                          disabled={isEquipped}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isEquipped
                              ? 'bg-gray-600 text-gray-300'
                              : 'bg-green-600 text-white active:bg-green-500'
                          }`}
                        >
                          {isEquipped ? 'ON' : 'EQUIP'}
                        </button>
                      ) : (
                        <button
                          onClick={() => buyFrame(frame)}
                          className="text-[10px] font-bold px-2 py-0.5 rounded bg-yellow-500 text-yellow-900 active:bg-yellow-400 flex items-center gap-0.5"
                        >
                          <Coins size={10} />
                          {frame.cost}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-white/80 text-xs font-bold mb-2 uppercase">
                Esports Avatars
              </p>
              <div className="grid grid-cols-4 gap-2">
                {ESPORTS_AVATARS.map((av) => (
                  <button
                    key={av.id}
                    onClick={() => {
                      setUploadedPhoto(null);
                      setPlayer((p) => ({ ...p, avatar: av.svg }));
                    }}
                    className={`rounded-full overflow-hidden border-2 transition-transform hover:scale-110 aspect-square ${
                      player.avatar === av.svg && !uploadedPhoto
                        ? 'border-yellow-400 ring-2 ring-yellow-300'
                        : 'border-white/20'
                    }`}
                  >
                    <div
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{ __html: av.svg }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <GlossyButton
              color="green"
              onClick={saveProfile}
              className="w-full mt-2"
            >
              Save Profile
            </GlossyButton>
          </div>
        </Modal>

        <Modal
          theme={currentTheme}
          isOpen={activeModal === 'settings'}
          onClose={() => setActiveModal(null)}
          title="Settings"
        >
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setActiveModal(null);
                setCurrentScreen('store');
                setStoreTab('themes');
              }}
              className="flex items-center justify-between bg-black/30 p-3 rounded-xl border border-white/10 hover:bg-black/50 transition-colors"
            >
              <span className="text-white font-bold flex items-center gap-2">
                <Palette size={18} className={currentTheme.text} /> Change Theme
              </span>
              <ChevronLeft size={18} className="text-white/50 rotate-180" />
            </button>

            <div className="flex items-center justify-between bg-black/30 p-3 rounded-xl border border-white/10">
              <span className="text-white font-bold flex items-center gap-2">
                <Music
                  size={18}
                  className={musicOn ? 'text-green-400' : 'text-gray-400'}
                />{' '}
                Background Music
              </span>
              <button
                onClick={() => {
                  initAudio();
                  setMusicOn(!musicOn);
                }}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  musicOn ? 'bg-green-500' : 'bg-gray-500'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                    musicOn ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between bg-black/30 p-3 rounded-xl border border-white/10">
              <span className="text-white font-bold flex items-center gap-2">
                {soundOn ? (
                  <Volume2 size={18} className="text-green-400" />
                ) : (
                  <VolumeX size={18} className="text-red-400" />
                )}{' '}
                Sound Effects
              </span>
              <button
                onClick={() => {
                  initAudio();
                  setSoundOn(!soundOn);
                }}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  soundOn ? 'bg-green-500' : 'bg-gray-500'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                    soundOn ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between bg-black/30 p-3 rounded-xl border border-white/10">
              <span className="text-white font-bold flex items-center gap-2">
                <Smartphone
                  size={18}
                  className={vibrationOn ? 'text-green-400' : 'text-gray-400'}
                />{' '}
                Vibration
              </span>
              <button
                onClick={() => setVibrationOn(!vibrationOn)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  vibrationOn ? 'bg-green-500' : 'bg-gray-500'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                    vibrationOn ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            <GlossyButton
              color="blue"
              onClick={() => setActiveModal(null)}
              className="w-full mt-2"
            >
              Close
            </GlossyButton>
          </div>
        </Modal>

        <Modal
          theme={currentTheme}
          isOpen={activeModal === 'missions'}
          onClose={() => setActiveModal(null)}
          title="Daily Missions"
        >
          <div className="flex flex-col gap-3">
            <div
              className={`p-3 rounded-xl border-2 flex justify-between items-center ${
                player.missions.claimedWin
                  ? 'bg-black/60 border-black/40'
                  : 'bg-black/30 border-white/20'
              }`}
            >
              <div>
                <p className="text-white font-bold text-sm">Win 1 Match</p>
                <p className="text-xs text-white/60">Reward: 500 Coins</p>
              </div>
              {player.missions.claimedWin ? (
                <span className="text-green-400 font-bold text-xs">
                  CLAIMED
                </span>
              ) : (
                <button
                  onClick={() => claimMission('claimedWin', 'coins', 500)}
                  disabled={!player.missions.win1}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${
                    player.missions.win1
                      ? 'bg-yellow-500 text-yellow-900'
                      : 'bg-gray-600 text-gray-400'
                  }`}
                >
                  {player.missions.win1 ? 'CLAIM' : '0/1'}
                </button>
              )}
            </div>

            <div
              className={`p-3 rounded-xl border-2 flex justify-between items-center ${
                player.missions.claimedCap
                  ? 'bg-black/60 border-black/40'
                  : 'bg-black/30 border-white/20'
              }`}
            >
              <div>
                <p className="text-white font-bold text-sm">Capture 2 Tokens</p>
                <p className="text-xs text-white/60">Reward: 5 Gems</p>
              </div>
              {player.missions.claimedCap ? (
                <span className="text-green-400 font-bold text-xs">
                  CLAIMED
                </span>
              ) : (
                <button
                  onClick={() => claimMission('claimedCap', 'gems', 5)}
                  disabled={!player.missions.capture2}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${
                    player.missions.capture2
                      ? 'bg-yellow-500 text-yellow-900'
                      : 'bg-gray-600 text-gray-400'
                  }`}
                >
                  {player.missions.capture2 ? 'CLAIM' : '0/2'}
                </button>
              )}
            </div>

            <div
              className={`p-3 rounded-xl border-2 flex justify-between items-center ${
                player.missions.claimedRoll
                  ? 'bg-black/60 border-black/40'
                  : 'bg-black/30 border-white/20'
              }`}
            >
              <div>
                <p className="text-white font-bold text-sm">Roll 3 Sixes</p>
                <p className="text-xs text-white/60">Reward: 1000 Coins</p>
              </div>
              {player.missions.claimedRoll ? (
                <span className="text-green-400 font-bold text-xs">
                  CLAIMED
                </span>
              ) : (
                <button
                  onClick={() => claimMission('claimedRoll', 'coins', 1000)}
                  disabled={!player.missions.roll6x3}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${
                    player.missions.roll6x3
                      ? 'bg-yellow-500 text-yellow-900'
                      : 'bg-gray-600 text-gray-400'
                  }`}
                >
                  {player.missions.roll6x3 ? 'CLAIM' : '0/3'}
                </button>
              )}
            </div>
            <GlossyButton
              color="blue"
              onClick={() => setActiveModal(null)}
              className="w-full mt-2"
            >
              Close
            </GlossyButton>
          </div>
        </Modal>

        <Modal
          theme={currentTheme}
          isOpen={activeModal === 'piggy'}
          onClose={() => setActiveModal(null)}
          title="Piggy Bank"
        >
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center mb-4 border-4 border-pink-300 shadow-[0_0_20px_rgba(236,72,153,0.6)]">
              <Heart size={48} className="text-white" />
            </div>
            <p className="text-white font-bold text-lg mb-2">
              You have {piggyBank} Coins
            </p>
            <p className="text-white/60 text-sm mb-4 text-center">
              Capture opponent tokens to fill the piggy bank!
            </p>
            <GlossyButton
              color="green"
              onClick={handleClaimPiggy}
              disabled={piggyBank === 0}
              className="w-full"
            >
              Collect Coins
            </GlossyButton>
            <GlossyButton
              color="blue"
              onClick={() => setActiveModal(null)}
              className="w-full mt-2"
            >
              Close
            </GlossyButton>
          </div>
        </Modal>

        <Modal
          theme={currentTheme}
          isOpen={activeModal === 'spin'}
          onClose={() => !isSpinning && setActiveModal(null)}
          title="Daily Spin"
        >
          <div className="flex flex-col items-center">
            <div
              className={`w-48 h-48 rounded-full border-8 border-yellow-500 bg-blue-700 flex items-center justify-center relative mb-6 shadow-[0_0_20px_rgba(253,224,71,0.5)] transition-transform duration-1000 ${
                isSpinning ? 'rotate-[1440deg]' : ''
              }`}
            >
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-white/20"></div>
              <div className="w-1 h-full bg-white/20 absolute"></div>
              <div className="w-full h-1 bg-white/20 absolute"></div>
              <div className="w-1 h-full bg-white/20 absolute rotate-45"></div>
              <div className="w-1 h-full bg-white/20 absolute -rotate-45"></div>
              <div className="w-12 h-12 bg-yellow-400 rounded-full z-10 border-4 border-yellow-200 shadow-lg flex items-center justify-center">
                <Crown size={24} className="text-yellow-800" />
              </div>
            </div>

            {spinResult ? (
              <div className="text-center mb-6">
                <p className="text-green-400 font-bold text-xl mb-2">
                  YOU WON!
                </p>
                <div className="flex items-center justify-center gap-2 text-yellow-400 font-black text-3xl drop-shadow-md">
                  <Coins size={32} /> +{spinResult}
                </div>
              </div>
            ) : (
              <p className="text-white/80 mb-6 text-center text-sm">
                Spin the wheel to win free coins!
              </p>
            )}

            <GlossyButton
              color="yellow"
              onClick={handleSpin}
              disabled={
                isSpinning ||
                (player.lastSpin === new Date().toDateString() && !spinResult)
              }
              className="w-full"
            >
              {isSpinning
                ? 'SPINNING...'
                : player.lastSpin === new Date().toDateString() && !spinResult
                ? 'COME BACK TOMORROW'
                : 'SPIN NOW'}
            </GlossyButton>
          </div>
        </Modal>

        <Modal
          theme={currentTheme}
          isOpen={activeModal === 'online'}
          onClose={() => setActiveModal(null)}
          title="Select Bet"
        >
          <div className="flex flex-col gap-3">
            {[500, 2000, 10000].map((bet) => (
              <button
                key={bet}
                onClick={() => startGame('online', 2, bet)}
                className={`border-2 p-3 rounded-xl flex items-center justify-between active:scale-95 transition-transform bg-black/40 border-white/20`}
              >
                <span className="text-white font-bold text-lg">
                  Classic Match
                </span>
                <div className="flex items-center bg-black/50 px-3 py-1 rounded-full text-yellow-400 font-bold">
                  <Coins size={16} className="mr-1" /> {bet}
                </div>
              </button>
            ))}
          </div>
        </Modal>

        <Modal
          theme={currentTheme}
          isOpen={activeModal === 'offline'}
          onClose={() => setActiveModal(null)}
          title="Play Offline"
        >
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-white/80 text-xs font-bold mb-2 uppercase">
                Select Token Color
              </p>
              <div className="flex gap-2">
                {PLAYER_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setUserColor(c)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      userColor === c
                        ? 'border-yellow-400 scale-110'
                        : 'border-transparent'
                    } ${COLORS[c].main} shadow-md transition-transform`}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-white/80 text-xs font-bold mb-2 uppercase">
                Difficulty
              </p>
              <div className="flex gap-2">
                {['Easy', 'Medium', 'Hard'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-1 text-sm font-bold rounded-lg border-2 ${
                      difficulty === d
                        ? 'bg-yellow-500 text-yellow-900 border-yellow-300'
                        : 'bg-black/30 text-white border-white/20'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-px bg-white/20 w-full my-1"></div>
            <GlossyButton color="green" onClick={() => startGame('offline', 2)}>
              1 vs 1 (You vs AI)
            </GlossyButton>
            <GlossyButton
              color="purple"
              onClick={() => startGame('offline', 4)}
            >
              4 Players (You vs 3 Bots)
            </GlossyButton>
          </div>
        </Modal>

        <Modal
          theme={currentTheme}
          isOpen={activeModal === 'pass'}
          onClose={() => setActiveModal(null)}
          title="Pass & Play"
        >
          <div className="flex flex-col gap-4">
            <p className="text-white/80 text-center text-sm mb-2">
              Play with friends on the same device
            </p>
            <div className="flex gap-2">
              {[2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setPassPlayers(n)}
                  className={`flex-1 py-2 font-bold rounded-lg border-2 ${
                    passPlayers === n
                      ? 'bg-green-500 border-green-300 text-white'
                      : 'bg-black/30 border-white/20 text-white'
                  }`}
                >
                  {n}P
                </button>
              ))}
            </div>
            <GlossyButton
              color="green"
              onClick={() => startGame('pass', passPlayers)}
            >
              Start Match
            </GlossyButton>
          </div>
        </Modal>

        <Modal
          theme={currentTheme}
          isOpen={activeModal === 'tourney'}
          onClose={() => setActiveModal(null)}
          title="Tournament"
        >
          <div className="flex flex-col items-center">
            <div className="w-full bg-black/40 rounded-xl p-4 border border-white/20 mb-4 flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white font-bold">Semi-Final 1</span>
                <span className="text-white/60">Winner: TBD</span>
              </div>
              <div className="h-px bg-white/20 w-full"></div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white font-bold">Semi-Final 2</span>
                <span className="text-white/60">Winner: TBD</span>
              </div>
            </div>
            <div className="text-yellow-400 font-bold mb-4 flex items-center gap-2">
              <Trophy size={20} /> Prize Pool: 10,000 <Coins size={16} />
            </div>
            <GlossyButton
              color="yellow"
              onClick={() => startGame('tourney', 4)}
              className="w-full"
            >
              Join Tournament (Free)
            </GlossyButton>
          </div>
        </Modal>

        <Modal
          theme={currentTheme}
          isOpen={activeModal === 'leaderboard'}
          onClose={() => setActiveModal(null)}
          title="Leaderboard"
        >
          <div className="flex flex-col gap-2">
            {[
              {
                rank: 1,
                name: 'LudoKing99',
                coins: '1.2M',
                color: 'text-yellow-400',
              },
              { rank: 2, name: 'Sarah', coins: '850K', color: 'text-gray-300' },
              { rank: 3, name: 'Alex', coins: '420K', color: 'text-amber-600' },
              {
                rank: 4,
                name: player.name,
                coins: player.coins.toLocaleString(),
                color: 'text-white',
              },
            ].map((u, i) => (
              <div
                key={i}
                className={`flex items-center p-2 rounded-lg ${
                  u.name === player.name
                    ? 'bg-white/20 border border-yellow-500'
                    : 'bg-black/30'
                }`}
              >
                <div
                  className={`w-8 h-8 font-bold flex items-center justify-center ${u.color}`}
                >
                  #{u.rank}
                </div>
                <div className="flex-1 text-white font-bold ml-2">{u.name}</div>
                <div className="flex items-center text-yellow-400 text-sm font-bold">
                  <Coins size={14} className="mr-1" /> {u.coins}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default function SafeApp() {
  return (
    <ErrorBoundary>
      <LudoRoyalApp />
    </ErrorBoundary>
  );
}
