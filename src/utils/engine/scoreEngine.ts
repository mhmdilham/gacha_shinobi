import type {
  ClanInfo,
  ClanRarity,
  DojutsuType,
  ElementType,
  BijuuType,
  SpecialModeType,
  JutsuInfo,
  PowerScoreBreakdown,
  NinjaRank
} from '../../types/ninja'
import { randomInt } from './math'
import { CLAN_RARITY_SCORES } from '../../data/clans'
import { DOJUTSU_METAS } from '../../data/dojutsu'
import { BIJUU_SCORE_MAP } from '../../data/bijuu'
import { SPECIAL_MODES_METAS } from '../../data/modes'

// 1. Data-Driven Bonus Reinkarnasi
const REINCARNATION_BONUS_MAP: Record<string, number> = {
  Asura: 800,
  Indra: 800,
  'Indra + Asura': 2500
}

// 2. Data-Driven Ambang Batas Pangkat Ninja
const RANK_THRESHOLDS: { min: number; rank: NinjaRank }[] = [
  { min: 6500, rank: 'Legend / God Shinobi' },
  { min: 2800, rank: 'Kage Level' },
  { min: 1400, rank: 'Jonin / ANBU' },
  { min: 600, rank: 'Chunin' },
  { min: 0, rank: 'Genin' }
]

function getRankFromScore(totalScore: number): NinjaRank {
  for (const t of RANK_THRESHOLDS) {
    if (totalScore >= t.min) return t.rank
  }
  return 'Genin'
}

// Step 6: Power Score Calculation Formula (Data-Driven Architecture)
export function calculatePowerScore(
  fatherClan: ClanInfo,
  motherClan: ClanInfo,
  dojutsu: DojutsuType,
  elements: ElementType[],
  extraKekkeiGenkai: string[],
  bijuu: BijuuType,
  mode: SpecialModeType,
  signatureJutsus: JutsuInfo[],
  tacticalJutsus: JutsuInfo[] = [],
  reincarnation: string,
  bijuuDominanceBonus: number = 0
): { scores: PowerScoreBreakdown; rank: NinjaRank } {
  // 1. Base Clan Score (Lookup via CLAN_RARITY_SCORES)
  const getClanBase = (rarity: ClanRarity): number => {
    const range = CLAN_RARITY_SCORES[rarity] ?? { min: 100, max: 200 }
    return randomInt(range.min, range.max)
  }

  const fatherClanScore = getClanBase(fatherClan.rarity)
  const motherClanScore = getClanBase(motherClan.rarity)
  const clanBaseAverage = Math.round((fatherClanScore + motherClanScore) / 2)

  // 2. Dojutsu Score (Lookup via DOJUTSU_METAS)
  const dojutsuMeta = DOJUTSU_METAS[dojutsu]
  const dojutsuScore =
    dojutsuMeta && dojutsuMeta.maxScore > 0
      ? randomInt(dojutsuMeta.minScore, dojutsuMeta.maxScore)
      : 0

  // 3. Elemen Score (80 per dasar, 600 jika Yin-Yang Onmyoton)
  const elementScore = elements.reduce((acc, el) => {
    return acc + (el === 'Onmyoton (Yin-Yang)' ? 600 : 80)
  }, 0)

  // 4. Kekkei Genkai Combo (+350 pts per combo)
  const kekkeiGenkaiScore = extraKekkeiGenkai.length * 350

  // 5. Bijuu Score (Lookup via BIJUU_SCORE_MAP)
  const bijuuScore = BIJUU_SCORE_MAP[bijuu] ?? 0

  // 6. Mode Score (Lookup via SPECIAL_MODES_METAS)
  const modeScore = SPECIAL_MODES_METAS[mode]?.pts ?? 0

  // 7. Jutsu Score (Akumulasi Signature + Taktis)
  const allJutsus = [...signatureJutsus, ...tacticalJutsus]
  const jutsuScore = allJutsus.reduce((acc, j) => acc + j.pts, 0)

  // 8. Reincarnation bonus (Lookup via REINCARNATION_BONUS_MAP)
  const reincarnationBonus = REINCARNATION_BONUS_MAP[reincarnation] ?? 0

  const total =
    clanBaseAverage +
    dojutsuScore +
    elementScore +
    kekkeiGenkaiScore +
    bijuuScore +
    bijuuDominanceBonus +
    modeScore +
    jutsuScore +
    reincarnationBonus

  const rank = getRankFromScore(total)

  return {
    scores: {
      fatherClanScore,
      motherClanScore,
      clanBaseAverage,
      dojutsuScore,
      elementScore,
      kekkeiGenkaiScore,
      bijuuScore,
      bijuuDominanceBonus,
      modeScore,
      jutsuScore,
      reincarnationBonus,
      total
    },
    rank
  }
}
