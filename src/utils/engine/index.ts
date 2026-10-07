import type { ShinobiCharacter, VillageId } from '../../types/ninja'
import { rollSingleClan, rollReincarnation } from './clanEngine'
import { evaluateDojutsu } from './dojutsuEngine'
import {
  rollElements,
  rollBijuu,
  rollSpecialMode,
  evaluateBijuuMasteryAndGift
} from './elementBijuuEngine'
import { evaluateJutsusAndCombos } from './jutsuEngine'
import { calculatePowerScore } from './scoreEngine'

// Re-export all sub-engine functions
export * from './math'
export * from './clanEngine'
export * from './dojutsuEngine'
export * from './elementBijuuEngine'
export * from './jutsuEngine'
export * from './scoreEngine'

// Complete Gacha Roll Runner
export function runCompleteGacha(name: string, village: VillageId): ShinobiCharacter {
  const fatherClan = rollSingleClan()
  const motherClan = rollSingleClan()
  const reincarnation = rollReincarnation()

  const { dojutsu, hyugaBranch, dojutsuNote, isTransplantedDojutsu } = evaluateDojutsu(
    fatherClan,
    motherClan,
    reincarnation
  )
  const baseElements = rollElements(fatherClan, motherClan)
  const bijuu = rollBijuu(dojutsu, reincarnation, fatherClan, motherClan, baseElements)
  const specialMode = rollSpecialMode(baseElements, dojutsu, bijuu, reincarnation)
  const { extraKekkeiGenkai, signatureJutsus, tacticalJutsus } = evaluateJutsusAndCombos(
    fatherClan,
    motherClan,
    baseElements,
    dojutsu,
    bijuu
  )

  const {
    bijuuMastery,
    bijuuGift,
    bijuuDominanceBonus,
    inheritedKekkeiGenkai,
    inheritedElements
  } = evaluateBijuuMasteryAndGift(
    bijuu,
    dojutsu,
    fatherClan,
    motherClan,
    extraKekkeiGenkai,
    baseElements
  )

  // Gabungkan elemen dan kekkei genkai hadiah Bijuu
  const elements = Array.from(new Set([...baseElements, ...inheritedElements]))
  const finalKekkeiGenkai = Array.from(new Set([...extraKekkeiGenkai, ...inheritedKekkeiGenkai]))

  const { scores, rank } = calculatePowerScore(
    fatherClan,
    motherClan,
    dojutsu,
    elements,
    finalKekkeiGenkai,
    bijuu,
    specialMode,
    signatureJutsus,
    tacticalJutsus,
    reincarnation,
    bijuuDominanceBonus
  )

  return {
    id: 'shinobi-' + Math.random().toString(36).substring(2, 9),
    name,
    village,
    fatherClan,
    motherClan,
    reincarnation,
    dojutsu,
    hyugaBranch,
    dojutsuNote,
    isTransplantedDojutsu,
    elements,
    extraKekkeiGenkai: finalKekkeiGenkai,
    bijuu,
    bijuuMastery,
    bijuuGift,
    specialMode,
    signatureJutsus,
    tacticalJutsus,
    scores,
    rank,
    timestamp: Date.now()
  }
}
