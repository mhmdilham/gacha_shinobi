import type { ClanInfo, ClanRarity } from '../../types/ninja'
import { CLAN_POOL } from '../../data/ninjaData'
import { randomFloat } from './math'

// Step 2: Roll Clan based on weights
// Common 30%, Rare 50%, Epic 17%, Mythic 3%
export function rollSingleClan(): ClanInfo {
  const rand = randomFloat() * 100
  let targetRarity: ClanRarity

  if (rand < 30) {
    targetRarity = 'Common'
  } else if (rand < 80) {
    targetRarity = 'Rare'
  } else if (rand < 97) {
    targetRarity = 'Epic'
  } else {
    targetRarity = 'Mythic'
  }

  const pool = CLAN_POOL.filter((c) => c.rarity === targetRarity)
  return pool[Math.floor(Math.random() * pool.length)]
}

// Reincarnation Status roll
export function rollReincarnation(): 'None' | 'Asura' | 'Indra' | 'Indra + Asura' {
  const rand = randomFloat() * 100
  if (rand < 0.5) return 'Indra + Asura' // 0.5% Legendary
  if (rand < 2.0) return 'Indra'
  if (rand < 4.0) return 'Asura'
  return 'None'
}
