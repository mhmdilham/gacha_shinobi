import type { ElementInfo } from '../types/ninja'

export const ELEMENTS_LIST: ElementInfo[] = [
  {
    type: 'Katon (Api)',
    shortName: 'Katon',
    kanji: '火遁',
    icon: '🔥',
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.2)'
  },
  {
    type: 'Raiton (Petir)',
    shortName: 'Raiton',
    kanji: '雷遁',
    icon: '⚡',
    color: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.2)'
  },
  {
    type: 'Futon (Angin)',
    shortName: 'Futon',
    kanji: '風遁',
    icon: '🌀',
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.2)'
  },
  {
    type: 'Doton (Tanah)',
    shortName: 'Doton',
    kanji: '土遁',
    icon: '🪨',
    color: '#d97706',
    bg: 'rgba(217, 119, 6, 0.2)'
  },
  {
    type: 'Suiton (Air)',
    shortName: 'Suiton',
    kanji: '水遁',
    icon: '💧',
    color: '#06b6d4',
    bg: 'rgba(6, 182, 212, 0.2)'
  },
  {
    type: 'Onmyoton (Yin-Yang)',
    shortName: 'Onmyoton',
    kanji: '陰陽遁',
    icon: '☯️',
    color: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.25)'
  }
]

export const ELEMENT_BADGE_STYLES: Record<string, string> = {
  Katon: 'bg-red-950/80 border-red-500/70 text-red-200 shadow-[0_0_8px_rgba(239,68,68,0.25)]',
  Futon: 'bg-emerald-950/80 border-emerald-500/70 text-emerald-200 shadow-[0_0_8px_rgba(16,185,129,0.25)]',
  Raiton: 'bg-blue-950/80 border-blue-500/70 text-blue-200 shadow-[0_0_8px_rgba(59,130,246,0.25)]',
  Doton: 'bg-amber-950/80 border-amber-600/70 text-amber-200 shadow-[0_0_8px_rgba(217,119,6,0.25)]',
  Suiton: 'bg-cyan-950/80 border-cyan-500/70 text-cyan-200 shadow-[0_0_8px_rgba(6,182,212,0.25)]',
  Onmyoton: 'bg-purple-950/80 border-purple-500/80 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.35)]'
}

export const ELEMENT_REACTIONS: Record<string, string> = {
  Katon: 'Kertas menghangat dan terbakar menjadi abu...',
  Raiton: 'Kertas berkerut mengeluarkan percikan listrik tajam...',
  Futon: 'Kertas tersayat terbelah oleh bilah angin...',
  Doton: 'Kertas mengering dan hancur menjadi serpihan tanah...',
  Suiton: 'Kertas basah kuyup terserap cairan cakra...',
  Onmyoton: 'Kertas memancarkan pusaran cakra hitam-putih kosmik...'
}

