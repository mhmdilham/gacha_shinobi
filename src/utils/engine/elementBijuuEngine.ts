import type {
  ClanInfo,
  DojutsuType,
  ElementType,
  BijuuType,
  BijuuMasteryType,
  SpecialModeType
} from '../../types/ninja'
import { randomFloat } from './math'
import { CLAN_ELEMENT_BIAS } from '../../data/clans'

// Step 4: Roll Afinitas Elemen Dasar (Terkait Klan Silsilah - Data-Driven)
export function rollElements(fatherClan?: ClanInfo, motherClan?: ClanInfo): ElementType[] {
  const clans = [fatherClan?.name, motherClan?.name].filter(Boolean) as string[]

  const weights: Record<string, number> = {
    'Katon (Api)': 20,
    'Raiton (Petir)': 20,
    'Futon (Angin)': 20,
    'Doton (Tanah)': 20,
    'Suiton (Air)': 20
  }

  // Terapkan bias elemen berbasis klan silsilah (Data-Driven)
  for (const clan of clans) {
    const bias = CLAN_ELEMENT_BIAS[clan]
    if (bias) {
      for (const [el, w] of Object.entries(bias)) {
        if (w !== undefined) {
          weights[el] = Math.max(weights[el] ?? 20, w)
        }
      }
    }
  }

  // Afinitas Onmyoton: Otsutsuki melonjak ke 25%, klan lain 2%
  const onmyotonChance = clans.includes('Otsutsuki') ? 0.25 : 0.02

  const elementsPool: { type: ElementType; weight: number }[] = [
    { type: 'Katon (Api)', weight: weights['Katon (Api)'] },
    { type: 'Raiton (Petir)', weight: weights['Raiton (Petir)'] },
    { type: 'Futon (Angin)', weight: weights['Futon (Angin)'] },
    { type: 'Doton (Tanah)', weight: weights['Doton (Tanah)'] },
    { type: 'Suiton (Air)', weight: weights['Suiton (Air)'] }
  ]

  // Roll 1 atau 2 elemen dasar (Otsutsuki bisa sampai 3 elemen dasar)
  const count = clans.includes('Otsutsuki')
    ? (randomFloat() < 0.6 ? 2 : 3)
    : (randomFloat() < 0.5 ? 1 : 2)

  const selected: ElementType[] = []

  // Shuffle weighted selection
  const remaining = [...elementsPool]
  for (let i = 0; i < count; i++) {
    const totalWeight = remaining.reduce((acc, el) => acc + el.weight, 0)
    let rand = randomFloat() * totalWeight
    for (let j = 0; j < remaining.length; j++) {
      if (rand < remaining[j].weight) {
        selected.push(remaining[j].type)
        remaining.splice(j, 1)
        break
      }
      rand -= remaining[j].weight
    }
  }

  // Peluang Onmyoton Yin-Yang
  if (randomFloat() < onmyotonChance && !selected.includes('Onmyoton (Yin-Yang)')) {
    selected.push('Onmyoton (Yin-Yang)')
  }

  return selected
}

// Step 4: Roll Bijuu dengan Soft-Weighting & Lore Vitalitas Tubuh
export function rollBijuu(
  dojutsu: DojutsuType,
  reincarnation: string,
  fatherClan?: ClanInfo,
  motherClan?: ClanInfo,
  elements: ElementType[] = []
): BijuuType {
  const clans = [fatherClan?.name, motherClan?.name].filter(Boolean) as string[]
  const isUzumakiOrSenju = clans.includes('Uzumaki') || clans.includes('Senju')
  const isOtsutsuki = clans.includes('Otsutsuki')
  const hasSubjugationDojutsu =
    dojutsu.includes('Mangekyo') ||
    dojutsu.includes('EMS') ||
    dojutsu.includes('Rinnegan') ||
    dojutsu === 'Rinne Sharingan'

  // Syarat Wadah: Klan Uzumaki/Senju (vitalitas super) atau Penakluk Dojutsu (MS/EMS/Rinnegan/Otsutsuki)
  // memiliki ketahanan tubuh/kehendak menampung monster lebih tinggi (non-jinchuriki turun dari 75% ke 58%)
  const nonJinchurikiChance = (isUzumakiOrSenju || isOtsutsuki || hasSubjugationDojutsu) ? 58 : 75

  const rand = randomFloat() * 100
  if (rand < nonJinchurikiChance) {
    return 'Bukan Jinchuriki'
  }

  // 1. Juubi (Ekor Sepuluh / Shinju)
  // Syarat: Rinnegan / Indra+Asura / Otsutsuki
  const canTameJuubi =
    dojutsu === 'Rinnegan Biasa (6 Paths)' ||
    dojutsu === 'Rinne Sharingan' ||
    dojutsu === 'Six Paths Rinnegan' ||
    reincarnation === 'Indra + Asura' ||
    (isOtsutsuki && randomFloat() < 0.25)

  if (rand >= 98.5 && canTameJuubi) {
    return 'Juubi (Ekor Sepuluh / Shinju)'
  }

  // 2. Kurama (Kyubi - 9 Ekor)
  // Jika klan Uzumaki/Senju, peluang Kurama jauh lebih tinggi (tradisi wadah Konoha)
  const kuramaThreshold = isUzumakiOrSenju ? 88 : 94
  if (rand >= kuramaThreshold) {
    return randomFloat() < 0.35 ? 'Kyubi (Full Kurama - 9 Ekor)' : 'Kyubi (Kurama Yin/Yang - 9 Ekor)'
  }

  // 3. Ekor 1 s/d 8 dengan Soft-Weighting Elemen
  return getWeighted1to8Tails(elements)
}

function getWeighted1to8Tails(elements: ElementType[]): BijuuType {
  const hasFire = elements.includes('Katon (Api)')
  const hasLightning = elements.includes('Raiton (Petir)')
  const hasWind = elements.includes('Futon (Angin)')
  const hasEarth = elements.includes('Doton (Tanah)')
  const hasWater = elements.includes('Suiton (Air)')

  // Base weight 10 per bijuu, ditambah bobot kecocokan afinitas cakra
  const weights: { bijuu: BijuuType; weight: number }[] = [
    { bijuu: 'Ichibi (Shukaku - 1 Ekor)', weight: 10 + (hasWind ? 15 : 0) + (hasEarth ? 15 : 0) }, // Magnet/Pasir: Angin + Tanah
    { bijuu: 'Nibi (Matatabi - 2 Ekor)', weight: 10 + (hasFire ? 25 : 0) }, // Kobaran Api Biru Katon
    { bijuu: 'Sanbi (Isobu - 3 Ekor)', weight: 10 + (hasWater ? 25 : 0) }, // Kura-kura Air Suiton
    { bijuu: 'Yonbi (Son Goku - 4 Ekor)', weight: 10 + (hasFire ? 12 : 0) + (hasEarth ? 12 : 0) }, // Lava: Api + Tanah
    { bijuu: 'Gobi (Kokuo - 5 Ekor)', weight: 10 + (hasFire ? 12 : 0) + (hasWater ? 12 : 0) }, // Uap: Api + Air
    { bijuu: 'Rokubi (Saiken - 6 Ekor)', weight: 10 + (hasWater ? 25 : 0) }, // Asam Korosif Suiton
    { bijuu: 'Nanabi (Chomei - 7 Ekor)', weight: 10 + (hasWind ? 25 : 0) }, // Serangga Terbang Futon
    { bijuu: 'Hachibi (Gyuki - 8 Ekor)', weight: 10 + (hasLightning ? 25 : 0) } // Banteng Gurita Kilat Raiton
  ]

  const totalWeight = weights.reduce((acc, w) => acc + w.weight, 0)
  let rand = randomFloat() * totalWeight
  for (const item of weights) {
    if (rand < item.weight) {
      return item.bijuu
    }
    rand -= item.weight
  }
  return 'Ichibi (Shukaku - 1 Ekor)'
}

// Step 5: Roll Mode Khusus (Mendukung KCM untuk Jinchuriki & SPSM untuk Asura/Rikudo)
export function rollSpecialMode(
  elements: ElementType[],
  dojutsu: DojutsuType,
  bijuu?: BijuuType,
  reincarnation?: string
): SpecialModeType {
  const isJinchuriki = Boolean(bijuu && bijuu !== 'Bukan Jinchuriki')
  const isKurama = Boolean(bijuu && (bijuu.includes('Kurama') || bijuu.includes('Kyubi')))
  const isJuubi = Boolean(bijuu && bijuu.includes('Juubi'))
  const isAsura = reincarnation === 'Asura' || reincarnation === 'Indra + Asura'
  const hasYinYang = elements.includes('Onmyoton (Yin-Yang)')

  // 1. PRIORITAS DEWA: Six Paths Sage Mode (SPSM / Rikudo Sennin)
  // Syarat: (Reinkarnasi Asura + Jinchuriki) ATAU (Juubi Jinchuriki) ATAU (Asura + Onmyoton)
  if ((isAsura && (isJinchuriki || hasYinYang)) || isJuubi) {
    if (randomFloat() < 0.45) {
      return 'Six Paths Sage Mode (SPSM / Rikudo Sennin)'
    }
  }

  // 2. PRIORITAS JINCHURIKI: Bijuu Chakra Mode (KCM / Bijuu Cloak Avatar)
  // Jinchuriki Kurama memiliki peluang 40%, Jinchuriki Bijuu lain 28%
  if (isJinchuriki) {
    const kcmChance = isKurama ? 0.40 : 0.28
    if (randomFloat() < kcmChance) {
      return 'Bijuu Chakra Mode (KCM / Bijuu Cloak)'
    }
  }

  const hasEarth = elements.includes('Doton (Tanah)')
  const hasFire = elements.includes('Katon (Api)')
  const hasWind = elements.includes('Futon (Angin)')
  const hasWater = elements.includes('Suiton (Air)')

  const rand = randomFloat() * 100

  // Sage Toad: 6% (Tanah/Api/Angin)
  if (rand < 6 && (hasEarth || hasFire || hasWind)) {
    return 'Sage Mode — Katak Myoboku'
  }

  // Sage Snake: 5% (6 s/d 11) (Tanah/Air)
  if (rand >= 6 && rand < 11 && (hasEarth || hasWater)) {
    return 'Sage Mode — Ular Ryuchi'
  }

  // Sage Slug: 4% (11 s/d 15) (Air/Yin-Yang)
  if (rand >= 11 && rand < 15 && (hasWater || hasYinYang)) {
    return 'Sage Mode — Siput Shikkotsu'
  }

  // Eight Gates: 5% (15 s/d 20) - Syarat: TIDAK PUNYA DOJUTSU
  if (rand >= 15 && rand < 20 && (dojutsu === 'None' || dojutsu === 'Belum Awakened')) {
    return 'Hachimon Tonkou (Delapan Gerbang Kematian)'
  }

  // Curse Mark: 4% (20 s/d 24)
  if (rand >= 20 && rand < 24) {
    return 'Segel Kutukan Orochimaru (Curse Mark)'
  }

  return 'None'
}

// Evaluasi Dominasi Bijuu (Subjugator vs Jinchuriki Harmonis) & Hadiah Bijuu
export function evaluateBijuuMasteryAndGift(
  bijuu: BijuuType,
  dojutsu: DojutsuType,
  fatherClan?: ClanInfo | null,
  motherClan?: ClanInfo | null,
  extraKekkeiGenkai: string[] = [],
  elements: ElementType[] = []
): {
  bijuuMastery: BijuuMasteryType
  bijuuGift?: string
  bijuuDominanceBonus: number
  inheritedKekkeiGenkai: string[]
  inheritedElements: ElementType[]
} {
  if (bijuu === 'Bukan Jinchuriki') {
    return {
      bijuuMastery: 'None',
      bijuuDominanceBonus: 0,
      inheritedKekkeiGenkai: [],
      inheritedElements: []
    }
  }

  const clans = [fatherClan?.name, motherClan?.name].filter(Boolean) as string[]
  const isOtsutsuki = clans.includes('Otsutsuki')
  const hasMokuton = extraKekkeiGenkai.some((kg) => kg.includes('Mokuton'))
  const hasSubjugationDojutsu =
    dojutsu.includes('Mangekyo') ||
    dojutsu.includes('EMS') ||
    dojutsu.includes('Rinnegan') ||
    dojutsu === 'Rinne Sharingan'

  // Syarat Subjugator: Menundukkan Bijuu secara paksa lewat Dojutsu, Elemen Kayu Mokuton, atau Klan Otsutsuki
  const isSubjugator = hasSubjugationDojutsu || hasMokuton || isOtsutsuki

  const bijuuMastery: BijuuMasteryType = isSubjugator
    ? 'Penakluk Bijuu Liar (Subjugator)'
    : 'Jinchuriki Harmonis'

  // Bonus Dominasi Mental: +200 PTS jika berhasil menundukkan monster secara paksa dengan mata/kayu
  const bijuuDominanceBonus = isSubjugator ? 200 : 0

  const inheritedKekkeiGenkai: string[] = []
  const inheritedElements: ElementType[] = []
  let bijuuGift: string | undefined

  if (bijuu.includes('Shukaku')) {
    if (!extraKekkeiGenkai.some((kg) => kg.includes('Jiton'))) {
      inheritedKekkeiGenkai.push('Jiton (Magnet & Pasir Shukaku)')
    }
    bijuuGift = 'Menganugerahkan Kekkei Genkai: Jiton (Manipulasi Pasir Magnet)'
  } else if (bijuu.includes('Matatabi')) {
    if (!elements.includes('Katon (Api)')) inheritedElements.push('Katon (Api)')
    bijuuGift = 'Menganugerahkan Api Biru Neraka Matatabi (Katon Suci)'
  } else if (bijuu.includes('Isobu')) {
    if (!elements.includes('Suiton (Air)')) inheritedElements.push('Suiton (Air)')
    bijuuGift = 'Menganugerahkan Cakra Air Tekanan Koral Lautan Isobu'
  } else if (bijuu.includes('Son Goku')) {
    if (!extraKekkeiGenkai.some((kg) => kg.includes('Youton'))) {
      inheritedKekkeiGenkai.push('Youton (Lava Son Goku)')
    }
    bijuuGift = 'Menganugerahkan Kekkei Genkai: Youton (Lahar Gunung Berapi)'
  } else if (bijuu.includes('Kokuo')) {
    if (!extraKekkeiGenkai.some((kg) => kg.includes('Futton'))) {
      inheritedKekkeiGenkai.push('Futton (Uap Mendidih Kokuo)')
    }
    bijuuGift = 'Menganugerahkan Kekkei Genkai: Futton (Tenaga Uap Mendidih)'
  } else if (bijuu.includes('Saiken')) {
    if (!elements.includes('Suiton (Air)')) inheritedElements.push('Suiton (Air)')
    bijuuGift = 'Menganugerahkan Asam Korosif Pelarut Segala Materi'
  } else if (bijuu.includes('Chomei')) {
    if (!elements.includes('Futon (Angin)')) inheritedElements.push('Futon (Angin)')
    bijuuGift = 'Menganugerahkan Sayap Cakra Terbang & Serbuk Sisik Pembuta'
  } else if (bijuu.includes('Gyuki')) {
    if (!elements.includes('Raiton (Petir)')) inheritedElements.push('Raiton (Petir)')
    bijuuGift = 'Menganugerahkan Manipulasi Tinta Segel Cakra & Tanduk Petir'
  } else if (bijuu.includes('Kurama')) {
    bijuuGift = 'Menganugerahkan Cakra Emas Murni Tanpa Batas & Regenerasi Mutlak'
  } else if (bijuu.includes('Juubi')) {
    if (!elements.includes('Onmyoton (Yin-Yang)')) inheritedElements.push('Onmyoton (Yin-Yang)')
    bijuuGift = 'Menganugerahkan Cakra Asal-Usul Seluruh Alam Shinobi (Onmyoton Yin-Yang)'
  }

  return {
    bijuuMastery,
    bijuuGift,
    bijuuDominanceBonus,
    inheritedKekkeiGenkai,
    inheritedElements
  }
}
