import type { ClanInfo, ClanRarity } from '../types/ninja'

export const CLAN_POOL: ClanInfo[] = [
  // COMMON (30% Pool) - Rakyat biasa tanpa silsilah darah klan
  {
    name: 'Warga Sipil / Tanpa Klan',
    rarity: 'Common',
    description: 'Ninja berbakat dari kalangan rakyat biasa tanpa darah bangsawan (seperti Minato, Jiraiya, Sakura, Rock Lee).',
    color: '#94a3b8'
  },

  // RARE (50% Pool) - Bangsawan Hiden & Klan Pejuang Tangguh
  {
    name: 'Inuzuka',
    rarity: 'Rare',
    description: 'Klan penjinak anjing ninken dan serangan Taijutsu buas taring kembar (Kiba & Akamaru).',
    color: '#a8a29e'
  },
  {
    name: 'Aburame',
    rarity: 'Rare',
    description: 'Klan bangsawan Konoha penguasa parasit serangga kikaichu pemakan cakra (Shino Aburame).',
    color: '#a1a1aa'
  },
  {
    name: 'Nara',
    rarity: 'Rare',
    description: 'Klan ahli taktik jenius dengan teknik Hiden manipulasi bayangan (Shikamaru Nara).',
    color: '#60a5fa'
  },
  {
    name: 'Akimichi',
    rarity: 'Rare',
    description: 'Klan pengendali kalori tubuh dan pembesaran anggota tubuh (Choji Akimichi).',
    color: '#93c5fd'
  },
  {
    name: 'Yamanaka',
    rarity: 'Rare',
    description: 'Klan sensor telepati dan spesialis transfer kesadaran jiwa (Ino Yamanaka).',
    color: '#bfdbfe'
  },
  {
    name: 'Sarutobi',
    rarity: 'Rare',
    description: 'Klan legendaris penjaga Tekad Api Konoha dengan penguasaan ragam elemen (Hiruzen & Asuma).',
    color: '#38bdf8'
  },
  {
    name: 'Hatake',
    rarity: 'Rare',
    description: 'Klan jenius berdarah Taring Putih Konoha berdaya tempur taktis dan insting tajam (Kakashi Hatake).',
    color: '#0284c7'
  },
  {
    name: 'Hoshigaki',
    rarity: 'Rare',
    description: 'Klan manusia hiu Kirigakure bertubuh raksasa dengan cadangan cakra setara monster Bijuu (Kisame).',
    color: '#0ea5e9'
  },
  {
    name: 'Hozuki',
    rarity: 'Rare',
    description: 'Klan Kirigakure dengan teknik rahasia Suika no Jutsu pencair tubuh kebal serangan fisik (Suigetsu & Gengetsu).',
    color: '#2dd4bf'
  },

  // EPIC (17% Pool) - Klan Kekkei Genkai / Dojutsu / Keturunan Pendiri Legendaris
  {
    name: 'Hyuga',
    rarity: 'Epic',
    hasDojutsu: true,
    description: 'Bangsawan Konoha pemilik mata suci Byakugan dan telapak Juken pemutus Tenketsu (Neji & Hinata).',
    color: '#c084fc'
  },
  {
    name: 'Uzumaki',
    rarity: 'Epic',
    description: 'Keturunan Asura dengan cadangan cakra kolosal, vitalitas abadi, & rantai segel Adamantine (Naruto & Kushina).',
    color: '#f43f5e'
  },
  {
    name: 'Senju',
    rarity: 'Epic',
    description: 'Klan Seribu Tangan penguasa fisik kehidupan dan pelopor berdirinya desa Konoha (Hashirama & Tsunade).',
    color: '#10b981'
  },
  {
    name: 'Uchiha',
    rarity: 'Epic',
    hasDojutsu: true,
    description: 'Klan terkutuk pemilik Dojutsu Sharingan, kutukan kebencian, dan manipulasi api hitam (Sasuke, Itachi, Madara).',
    color: '#dc2626'
  },
  {
    name: 'Yuki',
    rarity: 'Epic',
    description: 'Klan Kirigakure pemilik Kekkei Genkai Hyoton es abadi dan cermin es iblis berkecepatan tinggi (Haku).',
    color: '#38bdf8'
  },
  {
    name: 'Kaguya',
    rarity: 'Epic',
    description: 'Klan petarung brutal Kirigakure dengan Kekkei Genkai Shikotsumyaku manipulasi kerangka tulang (Kimimaro).',
    color: '#e2e8f0'
  },
  {
    name: 'Garis Keturunan Kazekage',
    rarity: 'Epic',
    description: 'Silsilah keluarga Kage Sunagakure pemilik Kekkei Genkai Jiton pengendali pasir dan magnet (Gaara & Rasa).',
    color: '#eab308'
  },

  // MYTHIC (3% Pool) - Ras Dewa Selestial Primordial
  {
    name: 'Otsutsuki',
    rarity: 'Mythic',
    hasDojutsu: true,
    description: 'Ras dewa selestial primordial pemanen buah Shinju dan asal usul cakra semesta (Kaguya & Hagoromo).',
    color: '#fbbf24'
  }
]

export const CLAN_ICONS: Record<string, string> = {
  Senju: '🌲',
  Uchiha: '🪭',
  Uzumaki: '🌀',
  Hyuga: '👁️',
  Otsutsuki: '👑',
  Sarutobi: '🐒',
  Hatake: '🐺',
  Hozuki: '💧',
  Yuki: '❄️',
  Kaguya: '🦴',
  'Garis Keturunan Kazekage': '⏳',
  Chinoike: '🩸',
  Nara: '♟️',
  Akimichi: '🦋',
  Yamanaka: '🌸',
  Inuzuka: '🐾',
  Aburame: '🪲',
  Fuma: '💠',
  Hoshigaki: '🦈',
  Yotsuki: '⚡',
  Karatachi: '🌊',
  Kurama: '🎭',
  Kamizuru: '🐝',
  Shimura: '🗡️'
}

export const CLAN_RARITY_SCORES: Record<ClanRarity, { min: number; max: number }> = {
  Common: { min: 100, max: 200 },
  Rare: { min: 300, max: 550 },
  Epic: { min: 800, max: 1300 },
  Mythic: { min: 2200, max: 3500 }
}

export const CLAN_ELEMENT_BIAS: Record<string, Partial<Record<string, number>>> = {
  Uchiha: {
    'Katon (Api)': 65,
    'Raiton (Petir)': 25,
    'Futon (Angin)': 5,
    'Doton (Tanah)': 5,
    'Suiton (Air)': 5
  },
  Senju: {
    'Suiton (Air)': 35,
    'Doton (Tanah)': 35
  },
  Hozuki: {
    'Suiton (Air)': 65
  },
  Sarutobi: {
    'Katon (Api)': 45,
    'Doton (Tanah)': 35
  },
  Hatake: {
    'Raiton (Petir)': 55,
    'Doton (Tanah)': 25
  },
  Uzumaki: {
    'Futon (Angin)': 45,
    'Suiton (Air)': 35
  },
  Yuki: {
    'Suiton (Air)': 50,
    'Futon (Angin)': 40
  },
  Hoshigaki: {
    'Suiton (Air)': 65
  },
  'Garis Keturunan Kazekage': {
    'Futon (Angin)': 55,
    'Doton (Tanah)': 35
  }
}

