import type { DojutsuType } from '../types/ninja'

export interface DojutsuMeta {
  type: DojutsuType
  icon: string
  tier: string
  minScore: number
  maxScore: number
  color: string
  border: string
  desc: string
}

export const DOJUTSU_METAS: Record<DojutsuType, DojutsuMeta> = {
  'Six Paths Rinnegan': {
    type: 'Six Paths Rinnegan',
    icon: '🟣⚡',
    tier: 'DEWA RIKUDO',
    minScore: 5000,
    maxScore: 6500,
    color: 'text-purple-300',
    border: 'border-purple-500/70 bg-gradient-to-br from-purple-950/50 via-slate-900 to-slate-950 shadow-[0_0_15px_rgba(168,85,247,0.2)]',
    desc: 'Rinnegan Tomoe ilahi dengan manipulasi ruang-waktu Amenotejikara'
  },
  'Rinne Sharingan': {
    type: 'Rinne Sharingan',
    icon: '🔴👁️',
    tier: 'DEWA PRIMORDIAL',
    minScore: 4500,
    maxScore: 5800,
    color: 'text-rose-300',
    border: 'border-rose-500/70 bg-gradient-to-br from-rose-950/50 via-slate-900 to-slate-950 shadow-[0_0_15px_rgba(244,63,94,0.2)]',
    desc: 'Mata pamungkas Kaguya • Pemancar ilusi global Mugen Tsukuyomi'
  },
  'Rinnegan Biasa (6 Paths)': {
    type: 'Rinnegan Biasa (6 Paths)',
    icon: '🟣',
    tier: 'DEWA SAMSARA',
    minScore: 2600,
    maxScore: 3500,
    color: 'text-purple-300',
    border: 'border-purple-500/70 bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 shadow-[0_0_15px_rgba(168,85,247,0.2)]',
    desc: 'Mata Samsara legendaris Rikudo Sennin dengan kendali 6 jalur kehidupan'
  },
  'Tenseigan': {
    type: 'Tenseigan',
    icon: '💠',
    tier: 'MATA SURGAWI',
    minScore: 2800,
    maxScore: 3600,
    color: 'text-cyan-300',
    border: 'border-cyan-500/70 bg-gradient-to-br from-cyan-950/50 via-slate-900 to-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.2)]',
    desc: 'Mata reinkarnasi murni Hamura pengendali gravitasi & orbit benda angkasa'
  },
  'Eternal Mangekyo Sharingan (EMS)': {
    type: 'Eternal Mangekyo Sharingan (EMS)',
    icon: '🔴✨',
    tier: 'LEGENDA ABADI',
    minScore: 1800,
    maxScore: 2400,
    color: 'text-rose-300',
    border: 'border-red-500/70 bg-gradient-to-br from-red-950/50 via-slate-900 to-slate-950 shadow-[0_0_15px_rgba(239,68,68,0.2)]',
    desc: 'Mangekyo abadi bebas risiko kebutaan • Membuka Susanoo Sempurna'
  },
  'Mangekyo Sharingan (MS)': {
    type: 'Mangekyo Sharingan (MS)',
    icon: '🔴🌀',
    tier: 'S-RANK KUTUKAN',
    minScore: 1200,
    maxScore: 1600,
    color: 'text-red-300',
    border: 'border-red-500/60 bg-gradient-to-br from-red-950/30 via-slate-900 to-slate-950 shadow-[0_0_10px_rgba(239,68,68,0.15)]',
    desc: 'Mata trauma emosional pembuka api hitam Amaterasu & ilusi Tsukuyomi'
  },
  'Sharingan 3 Tomoe': {
    type: 'Sharingan 3 Tomoe',
    icon: '🔴',
    tier: 'A-RANK ELITE',
    minScore: 500,
    maxScore: 700,
    color: 'text-red-300',
    border: 'border-red-700/60 bg-slate-900/90',
    desc: 'Evolusi penuh Sharingan • Pembaca gerakan ultra cepat & salin jutsu'
  },
  'Sharingan 2 Tomoe': {
    type: 'Sharingan 2 Tomoe',
    icon: '🔴',
    tier: 'B-RANK CHUNIN',
    minScore: 300,
    maxScore: 420,
    color: 'text-red-300',
    border: 'border-red-800/50 bg-slate-900/90',
    desc: 'Peningkatan persepsi refleks mata dan ketahanan terhadap genjutsu'
  },
  'Sharingan 1 Tomoe': {
    type: 'Sharingan 1 Tomoe',
    icon: '🔴',
    tier: 'C-RANK GENIN',
    minScore: 180,
    maxScore: 260,
    color: 'text-red-300',
    border: 'border-red-900/50 bg-slate-900/90',
    desc: 'Kebangkitan awal cakra mata untuk melihat aliran cakra musuh'
  },
  'Pure Byakugan': {
    type: 'Pure Byakugan',
    icon: '⚪✨',
    tier: 'BYAKUGAN MURNI',
    minScore: 750,
    maxScore: 1000,
    color: 'text-indigo-200',
    border: 'border-indigo-400/70 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 shadow-[0_0_15px_rgba(129,140,248,0.2)]',
    desc: 'Byakugan murni Otsutsuki berdaya jangkau ribuan meter & melihat takdir'
  },
  'Byakugan Standar': {
    type: 'Byakugan Standar',
    icon: '⚪',
    tier: 'KEKKEI GENKAI',
    minScore: 450,
    maxScore: 650,
    color: 'text-indigo-200',
    border: 'border-indigo-500/50 bg-slate-900/90 shadow-[0_0_10px_rgba(129,140,248,0.15)]',
    desc: 'Penglihatan tembus pandang 360° & penembus 361 titik saraf Tenketsu'
  },
  'Belum Awakened': {
    type: 'Belum Awakened',
    icon: '🌑',
    tier: 'DORMAN',
    minScore: 0,
    maxScore: 0,
    color: 'text-slate-400',
    border: 'border-slate-800 bg-slate-900/90',
    desc: 'Garis keturunan mata dorman di dalam darah, belum terpicu emosi'
  },
  'None': {
    type: 'None',
    icon: '👁️',
    tier: 'MATA STANDAR',
    minScore: 0,
    maxScore: 0,
    color: 'text-slate-400',
    border: 'border-slate-800 bg-slate-900/90',
    desc: 'Mata normal shinobi • Mengandalkan persepsi & sensor cakra alami'
  }
}
