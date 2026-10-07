export type ClanRarity = 'Common' | 'Rare' | 'Epic' | 'Mythic'

export interface ClanInfo {
  name: string
  rarity: ClanRarity
  description: string
  color: string
  hasDojutsu?: boolean
}

export type VillageId = 'konoha' | 'suna' | 'kiri' | 'kumo' | 'iwa' | 'rogue'

export interface VillageInfo {
  id: VillageId
  name: string
  kanji: string
  symbol: string
  color: string
  desc: string
}

export type DojutsuType =
  | 'None'
  | 'Belum Awakened'
  | 'Sharingan 1 Tomoe'
  | 'Sharingan 2 Tomoe'
  | 'Sharingan 3 Tomoe'
  | 'Mangekyo Sharingan (MS)'
  | 'Eternal Mangekyo Sharingan (EMS)'
  | 'Rinnegan Biasa (6 Paths)'
  | 'Rinne Sharingan'
  | 'Six Paths Rinnegan'
  | 'Byakugan Standar'
  | 'Pure Byakugan'
  | 'Tenseigan'

export type ElementType = 'Katon (Api)' | 'Raiton (Petir)' | 'Futon (Angin)' | 'Doton (Tanah)' | 'Suiton (Air)' | 'Onmyoton (Yin-Yang)'

export interface ElementInfo {
  type: ElementType
  shortName: string
  kanji: string
  icon: string
  color: string
  bg: string
}

export type BijuuType =
  | 'Bukan Jinchuriki'
  | 'Ichibi (Shukaku - 1 Ekor)'
  | 'Nibi (Matatabi - 2 Ekor)'
  | 'Sanbi (Isobu - 3 Ekor)'
  | 'Yonbi (Son Goku - 4 Ekor)'
  | 'Gobi (Kokuo - 5 Ekor)'
  | 'Rokubi (Saiken - 6 Ekor)'
  | 'Nanabi (Chomei - 7 Ekor)'
  | 'Hachibi (Gyuki - 8 Ekor)'
  | 'Kyubi (Kurama Yin/Yang - 9 Ekor)'
  | 'Kyubi (Full Kurama - 9 Ekor)'
  | 'Juubi (Ekor Sepuluh / Shinju)'

export type SpecialModeType =
  | 'None'
  | 'Sage Mode — Katak Myoboku'
  | 'Sage Mode — Ular Ryuchi'
  | 'Sage Mode — Siput Shikkotsu'
  | 'Hachimon Tonkou (Delapan Gerbang Kematian)'
  | 'Segel Kutukan Orochimaru (Curse Mark)'
  | 'Bijuu Chakra Mode (KCM / Bijuu Cloak)'
  | 'Six Paths Sage Mode (SPSM / Rikudo Sennin)'

export interface JutsuInfo {
  name: string
  kanji: string
  tier: 'B-Rank' | 'A-Rank' | 'S-Rank' | 'Kinjutsu'
  pts: number
  description: string
  famousUser?: string
  powerTierDesc?: string
}

export interface DetailModalItem {
  name: string
  kanji?: string
  tier?: string
  category?: string
  pts: number
  description: string
  famousUser?: string
  powerTierDesc?: string
  icon?: string
  badgeClass?: string
  extraNotes?: string
}

export type NinjaRank = 'Genin' | 'Chunin' | 'Jonin / ANBU' | 'Kage Level' | 'Legend / God Shinobi'

export type BijuuMasteryType = 'None' | 'Jinchuriki Harmonis' | 'Penakluk Bijuu Liar (Subjugator)'

export interface PowerScoreBreakdown {
  fatherClanScore: number
  motherClanScore: number
  clanBaseAverage: number
  dojutsuScore: number
  elementScore: number
  kekkeiGenkaiScore: number
  bijuuScore: number
  bijuuDominanceBonus: number
  modeScore: number
  jutsuScore: number
  reincarnationBonus: number
  total: number
}

export interface ShinobiCharacter {
  id: string
  name: string
  village: VillageId
  fatherClan: ClanInfo
  motherClan: ClanInfo
  reincarnation: 'None' | 'Asura' | 'Indra' | 'Indra + Asura'
  dojutsu: DojutsuType
  dojutsuNote?: string
  hyugaBranch?: 'Main Family' | 'Branch Family'
  isTransplantedDojutsu?: boolean
  elements: ElementType[]
  extraKekkeiGenkai: string[]
  bijuu: BijuuType
  bijuuMastery?: BijuuMasteryType
  bijuuGift?: string
  specialMode: SpecialModeType
  signatureJutsus: JutsuInfo[]
  tacticalJutsus?: JutsuInfo[]
  scores: PowerScoreBreakdown
  rank: NinjaRank
  timestamp: number
}
