import type { SpecialModeType } from '../types/ninja'

export interface SpecialModeMeta {
  type: SpecialModeType
  icon: string
  tier: string
  pts: number
  titleClass: string
  badgeClass: string
  border: string
  desc: string
}

export const SPECIAL_MODES_METAS: Record<SpecialModeType, SpecialModeMeta> = {
  'Six Paths Sage Mode (SPSM / Rikudo Sennin)': {
    type: 'Six Paths Sage Mode (SPSM / Rikudo Sennin)',
    icon: '✨👁️',
    tier: 'SENJUTSU ENAM JALAN',
    pts: 5000,
    titleClass: 'text-yellow-200',
    badgeClass: 'bg-gradient-to-r from-amber-900/90 via-yellow-900/90 to-amber-900/90 border-yellow-400 text-yellow-100 shadow-[0_0_15px_rgba(250,204,21,0.45)] ring-1 ring-yellow-400/40',
    border: 'border-yellow-400/80 bg-gradient-to-br from-amber-950/60 via-slate-900 to-yellow-950/40 shadow-[0_0_20px_rgba(250,204,21,0.35)]',
    desc: 'Mode Senjutsu Enam Jalan warisan Hagoromo (Mata silang tanpa oranye) • Melayang bebas, kebal disintegrasi ninjutsu, & tandingan setara Six Paths Rinnegan (Naruto Rikudo).'
  },
  'Bijuu Chakra Mode (KCM / Bijuu Cloak)': {
    type: 'Bijuu Chakra Mode (KCM / Bijuu Cloak)',
    icon: '🦊🔥',
    tier: 'AVATAR BIJUU EMAS',
    pts: 2000,
    titleClass: 'text-amber-300',
    badgeClass: 'bg-amber-950/90 border-amber-500/80 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.35)]',
    border: 'border-amber-500/70 bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]',
    desc: 'Manifestasi selubung cakra emas pekat monster berekor • Kecepatan kilat cahaya & pertahanan avatar raksasa tandingan Susanoo (Naruto KCM & Killer Bee).'
  },
  'Hachimon Tonkou (Delapan Gerbang Kematian)': {
    type: 'Hachimon Tonkou (Delapan Gerbang Kematian)',
    icon: '🥋💥',
    tier: 'GERBANG KEMATIAN',
    pts: 850,
    titleClass: 'text-rose-300',
    badgeClass: 'bg-rose-950/90 border-rose-500/80 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.3)]',
    border: 'border-rose-500/70 bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-950 shadow-[0_0_15px_rgba(244,63,94,0.3)]',
    desc: 'Pelepas batas fisik 8 gerbang batin pembakar uap darah merah • Melampaui kekuatan gabungan 5 Kage (Might Guy).'
  },
  'Sage Mode — Katak Myoboku': {
    type: 'Sage Mode — Katak Myoboku',
    icon: '🐸',
    tier: 'SENJUTSU KATAK',
    pts: 600,
    titleClass: 'text-emerald-300',
    badgeClass: 'bg-emerald-950/80 border-emerald-500/70 text-emerald-300',
    border: 'border-emerald-500/60 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 shadow-[0_0_15px_rgba(168,85,247,0.2)]',
    desc: 'Penginderaan bahaya cakra alam & Taijutsu tak terlihat Kawazu Kumite Gunung Myoboku (Jiraiya, Naruto, Minato).'
  },
  'Sage Mode — Ular Ryuchi': {
    type: 'Sage Mode — Ular Ryuchi',
    icon: '🐍',
    tier: 'SENJUTSU ULAR',
    pts: 600,
    titleClass: 'text-purple-300',
    badgeClass: 'bg-purple-950/80 border-purple-500/70 text-purple-300',
    border: 'border-purple-500/60 bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 shadow-[0_0_15px_rgba(168,85,247,0.25)]',
    desc: 'Kebal racun, fleksibilitas tubuh cairan, & manipulasi benda anorganik Gua Ryuchi (Kabuto Yakushi & Mitsuki).'
  },
  'Sage Mode — Siput Shikkotsu': {
    type: 'Sage Mode — Siput Shikkotsu',
    icon: '🐌',
    tier: 'SENJUTSU SIPUT',
    pts: 600,
    titleClass: 'text-teal-300',
    badgeClass: 'bg-teal-950/80 border-teal-500/70 text-teal-300',
    border: 'border-teal-500/60 bg-gradient-to-br from-teal-950/40 via-slate-900 to-slate-950 shadow-[0_0_15px_rgba(20,184,166,0.25)]',
    desc: 'Regenerasi sel biologis instan & cakra penyembuh massal Hutan Shikkotsu Katsuyu (Hashirama Senju & Tsunade).'
  },
  'Segel Kutukan Orochimaru (Curse Mark)': {
    type: 'Segel Kutukan Orochimaru (Curse Mark)',
    icon: '🦇🟣',
    tier: 'SEGEL KUTUKAN',
    pts: 450,
    titleClass: 'text-indigo-300',
    badgeClass: 'bg-indigo-950/80 border-indigo-500/70 text-indigo-300',
    border: 'border-indigo-500/60 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 shadow-[0_0_12px_rgba(99,102,241,0.25)]',
    desc: 'Enzim cakra alami terkutuk klan Juugo • Transformasi wujud iblis & lonjakan kekuatan fisik drastis (Sasuke & Kimimaro).'
  },
  'None': {
    type: 'None',
    icon: '⚔️',
    tier: 'GAYA STANDAR',
    pts: 0,
    titleClass: 'text-slate-300',
    badgeClass: 'bg-slate-800 border-slate-700 text-slate-400',
    border: 'border-slate-800 bg-slate-900/90',
    desc: 'Mengandalkan murni keahlian dasar Taijutsu, Shurikenjutsu, & Ninjutsu tanpa transformasi wujud khusus.'
  }
}
