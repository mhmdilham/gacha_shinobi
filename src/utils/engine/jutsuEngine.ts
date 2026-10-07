import type { ClanInfo, DojutsuType, ElementType, BijuuType, JutsuInfo } from '../../types/ninja'
import { JUTSU_POOL, TACTICAL_JUTSU_POOL } from '../../data/ninjaData'
import { randomFloat } from './math'

// Step 5: Evaluate Kekkei Genkai Campuran, Jutsu Signature (Max 1-3), & Jutsu Taktis Standar
export function evaluateJutsusAndCombos(
  fatherClan: ClanInfo,
  motherClan: ClanInfo,
  elements: ElementType[],
  dojutsu: DojutsuType,
  bijuu?: BijuuType
): {
  extraKekkeiGenkai: string[]
  signatureJutsus: JutsuInfo[]
  tacticalJutsus: JutsuInfo[]
  jutsus: JutsuInfo[] // Alias for backward compatibility
} {
  const clans = [fatherClan.name, motherClan.name]
  const extraKekkeiGenkai: string[] = []
  const candidateSignatures: JutsuInfo[] = []

  // Warisan Kekkei Genkai Bijuu
  if (bijuu) {
    if (bijuu.includes('Shukaku')) {
      extraKekkeiGenkai.push('Jiton (Magnet & Pasir Shukaku)')
    } else if (bijuu.includes('Son Goku')) {
      extraKekkeiGenkai.push('Youton (Lava Son Goku)')
    } else if (bijuu.includes('Kokuo')) {
      extraKekkeiGenkai.push('Futton (Uap Mendidih Kokuo)')
    }
  }

  const hasWater = elements.includes('Suiton (Air)')
  const hasEarth = elements.includes('Doton (Tanah)')
  const hasFire = elements.includes('Katon (Api)')
  const hasWind = elements.includes('Futon (Angin)')
  const hasLightning = elements.includes('Raiton (Petir)')
  const hasYinYang = elements.includes('Onmyoton (Yin-Yang)')

  const hasSharingan = dojutsu.includes('Sharingan')
  const hasMS = dojutsu.includes('Mangekyo') || dojutsu.includes('EMS')
  const hasRinnegan = dojutsu.includes('Rinnegan') || dojutsu === 'Rinne Sharingan'

  // --- 1. KEKKEI GENKAI & COMBO FINISHERS ---
  if ((clans.includes('Senju') || clans.includes('Otsutsuki')) && hasWater && hasEarth) {
    extraKekkeiGenkai.push('Mokuton (Elemen Kayu)')
    const mokuton = JUTSU_POOL.find((j) => j.name.includes('Mokuton'))
    if (mokuton) candidateSignatures.push(mokuton)
  }

  const hasMin3Tomoe =
    dojutsu === 'Sharingan 3 Tomoe' ||
    hasMS ||
    hasRinnegan

  if (clans.includes('Uchiha') && hasMin3Tomoe && hasFire && hasWind) {
    extraKekkeiGenkai.push('Enton (Manipulasi Api Hitam Amaterasu)')
    const enton = JUTSU_POOL.find((j) => j.name.includes('Enton'))
    if (enton) candidateSignatures.push(enton)
  }

  if (clans.includes('Hozuki') && hasWater) {
    extraKekkeiGenkai.push('Suika no Jutsu (Tubuh Cair)')
    const suika = JUTSU_POOL.find((j) => j.name.includes('Suika'))
    if (suika) candidateSignatures.push(suika)
  }

  if (clans.includes('Yuki') && hasWater && hasWind) {
    extraKekkeiGenkai.push('Hyoton (Elemen Es Abadi)')
    const hyoton = JUTSU_POOL.find((j) => j.name.includes('Hyoton'))
    if (hyoton) candidateSignatures.push(hyoton)
  }

  if (clans.includes('Kaguya')) {
    extraKekkeiGenkai.push('Shikotsumyaku (Manipulasi Struktur Tulang)')
    const sawarabi = JUTSU_POOL.find((j) => j.name.includes('Sawarabi'))
    if (sawarabi) candidateSignatures.push(sawarabi)
  }

  if (clans.includes('Garis Keturunan Kazekage')) {
    if (!extraKekkeiGenkai.some((kg) => kg.includes('Jiton'))) {
      extraKekkeiGenkai.push('Jiton (Manipulasi Pasir Magnet)')
    }
    const sabaku = JUTSU_POOL.find((j) => j.name.includes('Sabaku Taiso'))
    if (sabaku) candidateSignatures.push(sabaku)
  }

  // --- 2. DOJUTSU & GENJUTSU FINISHERS ---
  if (hasRinnegan) {
    const shinra = JUTSU_POOL.find((j) => j.name.includes('Shinra Tensei'))
    if (shinra) candidateSignatures.push(shinra)
  }

  if (hasYinYang) {
    const gudo = JUTSU_POOL.find((j) => j.name.includes('Gudodama'))
    if (gudo) candidateSignatures.push(gudo)
  }

  if (hasMS) {
    const susano = JUTSU_POOL.find((j) => j.name.includes('Susano'))
    if (susano) candidateSignatures.push(susano)

    // MS Genjutsu, Api Hitam & Kamui
    if (randomFloat() < 0.65) {
      const kamui = JUTSU_POOL.find((j) => j.name.includes('Kamui'))
      if (kamui) candidateSignatures.push(kamui)
    }
    if (randomFloat() < 0.75) {
      const tsukuyomi = JUTSU_POOL.find((j) => j.name.includes('Tsukuyomi'))
      if (tsukuyomi) candidateSignatures.push(tsukuyomi)
    }
    if (randomFloat() < 0.6) {
      const amaterasu = JUTSU_POOL.find((j) => j.name.includes('Amaterasu'))
      if (amaterasu) candidateSignatures.push(amaterasu)
    }
    if (randomFloat() < 0.05) {
      const koto = JUTSU_POOL.find((j) => j.name.includes('Kotoamatsukami'))
      if (koto) candidateSignatures.push(koto)
    }
  } else if (hasSharingan) {
    // Sharingan 1-3 Tomoe -> Peningkatan rate Genjutsu tinggi!
    if (randomFloat() < 0.75) {
      const kasegui = JUTSU_POOL.find((j) => j.name.includes('Kasegui'))
      if (kasegui) candidateSignatures.push(kasegui)
    }
    if (randomFloat() < 0.5) {
      const utakata = JUTSU_POOL.find((j) => j.name.includes('Utakata'))
      if (utakata) candidateSignatures.push(utakata)
    }
  }

  // --- 3. CLAN HERITAGE FINISHERS ---
  clans.forEach((clan) => {
    if (clan === 'Hyuga') {
      const j = JUTSU_POOL.find((item) => item.name.includes('Hakke') || item.name.includes('Juho'))
      if (j) candidateSignatures.push(j)
    } else if (clan === 'Uzumaki') {
      const j = JUTSU_POOL.find((item) => item.name.includes('Kongo Fusa'))
      if (j) candidateSignatures.push(j)
      if (!hasWind && randomFloat() < 0.5) {
        const rasengan = JUTSU_POOL.find((item) => item.name.includes('Rasengan (Pusaran'))
        if (rasengan) candidateSignatures.push(rasengan)
      }
    } else if (clan === 'Senju') {
      const j = JUTSU_POOL.find((item) => item.name.includes('Byakugou'))
      if (j) candidateSignatures.push(j)
    } else if (clan === 'Nara') {
      const j = JUTSU_POOL.find((item) => item.name.includes('Kagemane'))
      if (j) candidateSignatures.push(j)
    } else if (clan === 'Akimichi') {
      const j = JUTSU_POOL.find((item) => item.name.includes('Baika'))
      if (j) candidateSignatures.push(j)
    } else if (clan === 'Yamanaka') {
      const j = JUTSU_POOL.find((item) => item.name.includes('Shintenshin'))
      if (j) candidateSignatures.push(j)
    } else if (clan === 'Inuzuka') {
      const j = JUTSU_POOL.find((item) => item.name.includes('Gatsuga'))
      if (j) candidateSignatures.push(j)
    } else if (clan === 'Aburame') {
      const j = JUTSU_POOL.find((item) => item.name.includes('Mushidama'))
      if (j) candidateSignatures.push(j)
    } else if (clan === 'Hoshigaki' && hasWater) {
      const j = JUTSU_POOL.find((item) => item.name.includes('Daikodan'))
      if (j) candidateSignatures.push(j)
    }
  })

  // --- 4. ELEMENT FINISHERS (Sesuai elemen yang didapat) ---
  if (hasFire) {
    const katonPool = JUTSU_POOL.filter((j) => j.name.startsWith('Katon:'))
    if (katonPool.length > 0) {
      candidateSignatures.push(katonPool[Math.floor(Math.random() * katonPool.length)])
    }
  }
  if (hasLightning) {
    const raitonPool = JUTSU_POOL.filter((j) => j.name.startsWith('Chidori') || j.name.startsWith('Kirin') || j.name.startsWith('Raiton'))
    if (raitonPool.length > 0) {
      candidateSignatures.push(raitonPool[Math.floor(Math.random() * raitonPool.length)])
    }
  }
  if (hasWind) {
    const futonPool = JUTSU_POOL.filter((j) => j.name.startsWith('Futon:'))
    if (futonPool.length > 0) {
      candidateSignatures.push(futonPool[Math.floor(Math.random() * futonPool.length)])
    }
  }
  if (hasWater) {
    const suitonPool = JUTSU_POOL.filter((j) => j.name.startsWith('Suiton:'))
    if (suitonPool.length > 0) {
      candidateSignatures.push(suitonPool[Math.floor(Math.random() * suitonPool.length)])
    }
  }
  if (hasEarth) {
    const dotonPool = JUTSU_POOL.filter((j) => j.name.startsWith('Doton:'))
    if (dotonPool.length > 0) {
      candidateSignatures.push(dotonPool[Math.floor(Math.random() * dotonPool.length)])
    }
  }

  // Kinjutsu langka
  if (randomFloat() < 0.005) {
    const edo = JUTSU_POOL.find((j) => j.name.includes('Edo Tensei'))
    if (edo) candidateSignatures.unshift(edo)
  }

  // --- 5. KURASI SIGNATURE JUTSUS (KETAT 1 SAMPAI 3 JUTSU SAJA) ---
  const uniqueSignatures = Array.from(new Set(candidateSignatures))

  const tierOrder: Record<string, number> = {
    'Kinjutsu': 4,
    'S-Rank': 3,
    'A-Rank': 2,
    'B-Rank': 1
  }
  uniqueSignatures.sort((a, b) => (tierOrder[b.tier] || 0) - (tierOrder[a.tier] || 0))

  // Menentukan jumlah signature:
  // Strictly 1 - 2 signature jutsus (hanya 3 untuk silsilah dewa Otsutsuki / Rinnegan / Reinkarnasi)
  const hasLegendaryDojutsu =
    dojutsu.includes('Rinnegan') ||
    dojutsu === 'Rinne Sharingan' ||
    dojutsu === 'Six Paths Rinnegan'
  const isMythicGod = clans.includes('Otsutsuki') || hasLegendaryDojutsu

  let targetSigCount = 1
  if (isMythicGod && uniqueSignatures.length >= 3) {
    targetSigCount = randomFloat() < 0.6 ? 2 : 3
  } else if (uniqueSignatures.some((j) => j.tier === 'Kinjutsu' || j.tier === 'S-Rank')) {
    targetSigCount = randomFloat() < 0.65 ? 2 : 1
  } else {
    targetSigCount = randomFloat() < 0.25 ? 2 : 1
  }

  let finalSignatures = uniqueSignatures.slice(0, targetSigCount)
  if (finalSignatures.length === 0) {
    const fallback = JUTSU_POOL.find((j) => j.name.startsWith('Katon:')) || JUTSU_POOL[0]
    finalSignatures = [fallback]
  }

  // --- 6. ARSENAL JUTSU STANDAR / TAKTIS (2 - 3 JUTSU PENDUKUNG) ---
  const finalTacticals = rollTacticalJutsus(fatherClan, motherClan, elements, dojutsu, finalSignatures)

  return {
    extraKekkeiGenkai,
    signatureJutsus: finalSignatures,
    tacticalJutsus: finalTacticals,
    jutsus: finalSignatures
  }
}

// Roll Jutsu Taktis & Support yang Bersinergi dengan Signature, Klan, dan Elemen
export function rollTacticalJutsus(
  fatherClan: ClanInfo,
  motherClan: ClanInfo,
  elements: ElementType[],
  dojutsu: DojutsuType,
  signatureJutsus: JutsuInfo[] = []
): JutsuInfo[] {
  const clans = [fatherClan.name, motherClan.name]
  const hasWater = elements.includes('Suiton (Air)')
  const hasEarth = elements.includes('Doton (Tanah)')
  const hasLightning = elements.includes('Raiton (Petir)')
  const hasFire = elements.includes('Katon (Api)')
  const hasWind = elements.includes('Futon (Angin)')
  const hasSharingan = dojutsu.includes('Sharingan') || dojutsu.includes('EMS')
  const hasByakugan = dojutsu.includes('Byakugan') || dojutsu === 'Tenseigan'

  const sigNames = signatureJutsus.map((j) => j.name)
  const hasRasengan = sigNames.some((n) => n.includes('Rasengan'))
  const hasChidoriOrKirin = sigNames.some((n) => n.includes('Chidori') || n.includes('Kirin') || n.includes('Raikiri'))
  const hasGenjutsuSig = sigNames.some((n) => n.includes('Tsukuyomi') || n.includes('Kotoamatsukami') || n.includes('Magen'))
  const hasByakugou = sigNames.some((n) => n.includes('Byakugou'))

  // Filter kelayakan ketat berdasarkan elemen, klan, dan dojutsu
  const eligible = TACTICAL_JUTSU_POOL.filter((t) => {
    // 1. Elemen checks
    if (t.name.includes('Doton:') && !hasEarth) return false
    if (t.name.includes('Suiton:') && !hasWater) return false
    if (t.name.includes('Kirigakure') && !hasWater) return false
    if (t.name.includes('Katon:') && !hasFire) return false
    if (t.name.includes('Futon:') && !hasWind) return false
    if (t.name.includes('Chidori Nagashi') && !hasLightning) return false

    // 2. Dojutsu & Clan checks
    if (t.name.includes('Hakke Kusho') && !hasByakugan && !clans.includes('Hyuga')) return false
    if (t.name.includes('Mushi Bunshin') && !clans.includes('Aburame')) return false

    return true
  })

  // Bobot sinergi dinamis
  const weighted = eligible.map((j) => {
    let weight = 15 // Base weight

    // 1. Sinergi Kage Bunshin: Sangat tinggi jika punya Rasengan / Uzumaki / Senju
    if (j.name.includes('Kage Bunshin no Jutsu')) {
      if (hasRasengan) weight += 50
      if (clans.includes('Uzumaki') || clans.includes('Senju')) weight += 30
    }

    // 2. Sinergi Shunshin: Sangat tinggi jika punya Chidori / Raiton / Uchiha
    if (j.name.includes('Shunshin no Jutsu')) {
      if (hasChidoriOrKirin || hasLightning) weight += 45
      if (clans.includes('Uchiha') || clans.includes('Hatake')) weight += 25
    }

    // 3. Sinergi Kage Shuriken: Tinggi jika Uchiha / Sarutobi
    if (j.name.includes('Kage Shuriken')) {
      if (clans.includes('Uchiha') || clans.includes('Sarutobi') || hasSharingan) weight += 40
    }

    // 4. Sinergi Shuriken Kage Bunshin: Tinggi jika Sarutobi / Hiruzen
    if (j.name.includes('Shuriken Kage Bunshin')) {
      if (clans.includes('Sarutobi')) weight += 35
    }

    // 5. Sinergi Magen Jubaku Satsu: Tinggi jika punya Sharingan atau Genjutsu signature
    if (j.name.includes('Magen: Jubaku Satsu')) {
      if (hasSharingan || hasGenjutsuSig) weight += 45
    }

    // 6. Sinergi Shousen Jutsu / Chakra Mes (Medis): Tinggi jika Senju / Byakugou
    if (j.name.includes('Shousen Jutsu') || j.name.includes('Chakra Mes')) {
      if (clans.includes('Senju') || hasByakugou) weight += 40
    }

    // 7. Sinergi Hakke Kusho: Tinggi jika punya Byakugan / Klan Hyuga
    if (j.name.includes('Hakke Kusho')) {
      if (hasByakugan || clans.includes('Hyuga')) weight += 50
    }

    // 8. Sinergi Chidori Nagashi: Tinggi jika Raiton / Chidori
    if (j.name.includes('Chidori Nagashi')) {
      if (hasChidoriOrKirin) weight += 45
      if (hasLightning) weight += 25
    }

    // 9. Sinergi Katon Housenka: Tinggi jika Katon / Uchiha
    if (j.name.includes('Housenka')) {
      if (hasFire) weight += 30
      if (clans.includes('Uchiha')) weight += 25
    }

    // 10. Sinergi Futon Reppushou: Tinggi jika Futon
    if (j.name.includes('Reppushou')) {
      if (hasWind) weight += 35
    }

    // 11. Sinergi Doton Doryuheki: Tinggi jika Doton atau Sarutobi/Hatake
    if (j.name.includes('Doton: Doryuheki')) {
      if (hasEarth) weight += 35
    }

    // 12. Sinergi Suiton Suijinheki / Kirigakure: Tinggi jika Suiton atau Hozuki / Yuki / Hoshigaki
    if (j.name.includes('Suiton: Suijinheki') || j.name.includes('Kirigakure')) {
      if (hasWater) weight += 35
      if (clans.includes('Hozuki') || clans.includes('Yuki') || clans.includes('Hoshigaki')) weight += 25
    }

    // 13. Kawarimi no Jutsu: Selalu stabil sebagai teknik bertahan hidup darurat
    if (j.name.includes('Kawarimi')) {
      weight = 25
    }

    return { jutsu: j, weight }
  })

  // Ambil 2 - 3 jutsu taktis tanpa duplikasi (12% chance dapat 4 jurus untuk ninja serba bisa)
  const randCount = randomFloat() * 100
  let targetCount = 2
  if (randCount < 50) {
    targetCount = 2 // 50% dapat 2 jurus taktis
  } else if (randCount < 88) {
    targetCount = 3 // 38% dapat 3 jurus taktis
  } else {
    targetCount = 4 // 12% dapat 4 jurus taktis
  }

  const selected: JutsuInfo[] = []
  const pool = [...weighted]

  for (let i = 0; i < targetCount && pool.length > 0; i++) {
    const totalWeight = pool.reduce((acc, item) => acc + item.weight, 0)
    let rand = randomFloat() * totalWeight
    for (let j = 0; j < pool.length; j++) {
      if (rand < pool[j].weight) {
        selected.push(pool[j].jutsu)
        pool.splice(j, 1)
        break
      }
      rand -= pool[j].weight
    }
  }

  return selected.length > 0 ? selected : [TACTICAL_JUTSU_POOL[0]]
}
