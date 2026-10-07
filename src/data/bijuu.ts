import type { BijuuType } from '../types/ninja'

export interface BijuuInfo {
  name: BijuuType
  tailCount: number
  icon: string
  tier: string
  desc: string
  affinityElements: string[]
  famousJinchuriki?: string
}

export const BIJUU_SCORE_MAP: Record<BijuuType, number> = {
  'Bukan Jinchuriki': 0,
  'Ichibi (Shukaku - 1 Ekor)': 300,
  'Nibi (Matatabi - 2 Ekor)': 400,
  'Sanbi (Isobu - 3 Ekor)': 500,
  'Yonbi (Son Goku - 4 Ekor)': 600,
  'Gobi (Kokuo - 5 Ekor)': 700,
  'Rokubi (Saiken - 6 Ekor)': 800,
  'Nanabi (Chomei - 7 Ekor)': 900,
  'Hachibi (Gyuki - 8 Ekor)': 1100,
  'Kyubi (Kurama Yin/Yang - 9 Ekor)': 1400,
  'Kyubi (Full Kurama - 9 Ekor)': 1800,
  'Juubi (Ekor Sepuluh / Shinju)': 3000
}

export const BIJUU_METAS: Record<string, { icon: string; tier: string; border: string; desc: string }> = {
  Juubi: {
    icon: '👁️',
    tier: 'SHINJU PURBA (EKOR 10)',
    border: 'border-red-500/80 bg-gradient-to-br from-red-950/50 via-slate-900 to-slate-950 shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    desc: 'Wadah Shinju Ekor Sepuluh • Induk seluruh cakra di muka bumi'
  },
  Kurama: {
    icon: '🦊',
    tier: 'KYUBI (EKOR SEMBILAN)',
    border: 'border-amber-500/80 bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]',
    desc: 'Wadah Rubah Ekor Sembilan • Cadangan cakra kolosal & Bijuu Dama peledak area'
  },
  Gyuki: {
    icon: '🐙',
    tier: 'HACHIBI (EKOR DELAPAN)',
    border: 'border-orange-500/70 bg-gradient-to-br from-orange-950/40 via-slate-900 to-slate-950 shadow-[0_0_12px_rgba(249,115,22,0.25)]',
    desc: 'Wadah Gurita-Banteng Ekor Delapan • Fisik kolosal, taktis tempur lincah & cakra petir'
  },
  Shukaku: {
    icon: '🦝',
    tier: 'ICHIBI (EKOR SATU)',
    border: 'border-yellow-500/70 bg-gradient-to-br from-yellow-950/40 via-slate-900 to-slate-950 shadow-[0_0_12px_rgba(234,179,8,0.25)]',
    desc: 'Wadah Tanuki Ekor Satu • Manipulasi pasir hisap & Fuinjutsu alami'
  },
  DefaultJinchuriki: {
    icon: '👹',
    tier: 'WADAH BIJUU',
    border: 'border-amber-600/70 bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950 shadow-[0_0_10px_rgba(217,119,6,0.2)]',
    desc: 'Wadah monster berekor legendaris • Pasokan cakra masif tak habis-habis'
  },
  NonJinchuriki: {
    icon: '👤',
    tier: 'BUKAN JINCHURIKI',
    border: 'border-slate-800 bg-slate-900/90',
    desc: 'Mengandalkan kapasitas cakra murni tanpa campur tangan monster berekor'
  }
}

export const BIJUU_ELEMENT_RESONANCE = [
  {
    bijuu: 'Ichibi (Shukaku - 1 Ekor)' as BijuuType,
    tails: 1,
    name: 'Shukaku',
    elements: ['Futon (Angin)', 'Doton (Tanah)'],
    grantKekkeiGenkai: 'Jiton (Magnet & Pasir Shukaku)',
    jinchuriki: 'Gaara & Bunpuku'
  },
  {
    bijuu: 'Nibi (Matatabi - 2 Ekor)' as BijuuType,
    tails: 2,
    name: 'Matatabi',
    elements: ['Katon (Api)'],
    jinchuriki: 'Yugito Nii'
  },
  {
    bijuu: 'Sanbi (Isobu - 3 Ekor)' as BijuuType,
    tails: 3,
    name: 'Isobu',
    elements: ['Suiton (Air)'],
    jinchuriki: 'Yagura Karatachi & Rin Nohara'
  },
  {
    bijuu: 'Yonbi (Son Goku - 4 Ekor)' as BijuuType,
    tails: 4,
    name: 'Son Goku',
    elements: ['Katon (Api)', 'Doton (Tanah)'],
    grantKekkeiGenkai: 'Youton (Lava Son Goku)',
    jinchuriki: 'Roushi'
  },
  {
    bijuu: 'Gobi (Kokuo - 5 Ekor)' as BijuuType,
    tails: 5,
    name: 'Kokuo',
    elements: ['Katon (Api)', 'Suiton (Air)'],
    grantKekkeiGenkai: 'Futton (Uap Mendidih Kokuo)',
    jinchuriki: 'Han'
  },
  {
    bijuu: 'Rokubi (Saiken - 6 Ekor)' as BijuuType,
    tails: 6,
    name: 'Saiken',
    elements: ['Suiton (Air)'],
    jinchuriki: 'Utakata'
  },
  {
    bijuu: 'Nanabi (Chomei - 7 Ekor)' as BijuuType,
    tails: 7,
    name: 'Chomei',
    elements: ['Futon (Angin)'],
    jinchuriki: 'Fuu'
  },
  {
    bijuu: 'Hachibi (Gyuki - 8 Ekor)' as BijuuType,
    tails: 8,
    name: 'Gyuki',
    elements: ['Raiton (Petir)'],
    jinchuriki: 'Killer Bee & Blue B'
  },
  {
    bijuu: 'Kyubi (Kurama Yin/Yang - 9 Ekor)' as BijuuType,
    tails: 9,
    name: 'Kurama (Separuh)',
    elements: ['Katon (Api)', 'Futon (Angin)'],
    jinchuriki: 'Naruto Uzumaki & Minato Namikaze'
  },
  {
    bijuu: 'Kyubi (Full Kurama - 9 Ekor)' as BijuuType,
    tails: 9,
    name: 'Kurama (Utuh)',
    elements: ['Katon (Api)', 'Futon (Angin)'],
    jinchuriki: 'Naruto Uzumaki, Kushina, Mito'
  },
  {
    bijuu: 'Juubi (Ekor Sepuluh / Shinju)' as BijuuType,
    tails: 10,
    name: 'Shinju / Juubi',
    elements: ['Onmyoton (Yin-Yang)'],
    jinchuriki: 'Hagoromo Otsutsuki, Obito & Madara Rikudou'
  }
]

export interface BijuuAnimItem {
  name: string
  icon: string
  label: string
}

export const BIJUU_ANIM_ROSTER: BijuuAnimItem[] = [
  { name: 'Ichibi (Shukaku)', icon: '🦝', label: 'Ekor Satu' },
  { name: 'Nibi (Matatabi)', icon: '🐈', label: 'Ekor Dua' },
  { name: 'Sanbi (Isobu)', icon: '🐢', label: 'Ekor Tiga' },
  { name: 'Yonbi (Son Goku)', icon: '🐒', label: 'Ekor Empat' },
  { name: 'Gobi (Kokuo)', icon: '🐴', label: 'Ekor Lima' },
  { name: 'Rokubi (Saiken)', icon: '🐌', label: 'Ekor Enam' },
  { name: 'Nanabi (Chomei)', icon: '🪲', label: 'Ekor Tujuh' },
  { name: 'Hachibi (Gyuki)', icon: '🐙', label: 'Ekor Delapan' },
  { name: 'Kyubi (Kurama)', icon: '🦊', label: 'Ekor Sembilan' },
  { name: 'Juubi (Shinju)', icon: '👁️', label: 'Ekor Sepuluh' },
  { name: 'Bukan Jinchuriki (Cakra Murni)', icon: '👤', label: 'Bukan Jinchuriki' }
]

