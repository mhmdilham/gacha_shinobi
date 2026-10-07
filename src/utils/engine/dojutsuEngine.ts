import type { ClanInfo, DojutsuType } from '../../types/ninja'
import { randomFloat } from './math'

// Step 3: Dojutsu & Kekkei Genkai Evaluation
export function evaluateDojutsu(
  fatherClan: ClanInfo,
  motherClan: ClanInfo,
  reincarnation: 'None' | 'Asura' | 'Indra' | 'Indra + Asura'
): {
  dojutsu: DojutsuType
  hyugaBranch?: 'Main Family' | 'Branch Family'
  dojutsuNote?: string
  isTransplantedDojutsu?: boolean
} {
  const hasUchiha = fatherClan.name === 'Uchiha' || motherClan.name === 'Uchiha'
  const hasSenjuOrUzumaki =
    fatherClan.name === 'Senju' ||
    fatherClan.name === 'Uzumaki' ||
    motherClan.name === 'Senju' ||
    motherClan.name === 'Uzumaki'
  const hasHyuga = fatherClan.name === 'Hyuga' || motherClan.name === 'Hyuga'
  const hasOtsutsuki = fatherClan.name === 'Otsutsuki' || motherClan.name === 'Otsutsuki'

  // Special Auto-Unlock: Reinkarnasi Indra + Asura
  if (reincarnation === 'Indra + Asura') {
    return {
      dojutsu: 'Six Paths Rinnegan',
      dojutsuNote: 'Chakra Enam Jalan menyatu dari reinkarnasi Indra dan Asura!'
    }
  }

  // 1. Jalur Uchiha
  if (hasUchiha) {
    const roll = randomFloat() * 100
    let uchihaDojutsu: DojutsuType = 'Belum Awakened'

    if (roll < 20) {
      uchihaDojutsu = 'Belum Awakened'
    } else if (roll < 55) {
      uchihaDojutsu = 'Sharingan 1 Tomoe'
    } else if (roll < 80) {
      uchihaDojutsu = 'Sharingan 2 Tomoe'
    } else if (roll < 92) {
      uchihaDojutsu = 'Sharingan 3 Tomoe'
    } else if (roll < 98) {
      uchihaDojutsu = 'Mangekyo Sharingan (MS)'
    } else {
      uchihaDojutsu = 'Eternal Mangekyo Sharingan (EMS)'
    }

    // Branching Spesial Rinnegan (Uchiha + Senju/Uzumaki DENGAN intermediate EMS)
    if (hasSenjuOrUzumaki && uchihaDojutsu === 'Eternal Mangekyo Sharingan (EMS)') {
      const rinneRoll = randomFloat() * 100
      if (rinneRoll < 70) {
        // Tetap EMS
        return {
          dojutsu: uchihaDojutsu,
          dojutsuNote: 'Darah campuran Uchiha & Senju, namun sel belum menyatu sempurna untuk membangkitkan Rinnegan.'
        }
      } else if (rinneRoll < 90) {
        return {
          dojutsu: 'Rinnegan Biasa (6 Paths)',
          dojutsuNote: 'Percampuran sel Uchiha & Senju berhasil membangkitkan mata Samsara (Rinnegan)!'
        }
      } else if (rinneRoll < 98) {
        return {
          dojutsu: 'Rinne Sharingan',
          dojutsuNote: 'Kekuatan mata leluhur dewa terbangun dengan sembilan tomoe merah darah!'
        }
      } else {
        return {
          dojutsu: 'Six Paths Rinnegan',
          dojutsuNote: 'Six Paths Rinnegan lengkap dengan 6 tomoe keabadian!'
        }
      }
    }

    return {
      dojutsu: uchihaDojutsu,
      dojutsuNote: uchihaDojutsu === 'Belum Awakened' ? 'Potensi tersembunyi Uchiha belum terpicu oleh trauma batin.' : undefined
    }
  }

  // 2. Jalur Hyuga
  if (hasHyuga) {
    const branchRoll = randomFloat() * 100
    const branch = branchRoll < 60 ? 'Branch Family' : 'Main Family'

    // Peluang Tenseigan jika Hyuga + Otsutsuki
    if (hasOtsutsuki) {
      const tenseiganRoll = randomFloat() * 100
      if (tenseiganRoll < 3) {
        return {
          dojutsu: 'Tenseigan',
          hyugaBranch: branch,
          dojutsuNote: 'Penyatuan mata Byakugan murni dengan darah Otsutsuki membangkitkan Tenseigan!'
        }
      }
    }

    const byakuganRoll = randomFloat() * 100
    if (byakuganRoll < 85) {
      return {
        dojutsu: 'Byakugan Standar',
        hyugaBranch: branch,
        dojutsuNote: branch === 'Branch Family' ? 'Mata tersegel kutukan segel burung dalam sangkar (Juinjutsu).' : 'Keluarga Utama tanpa segel kutukan.'
      }
    } else {
      return {
        dojutsu: 'Pure Byakugan',
        hyugaBranch: branch,
        dojutsuNote: 'Penglihatan teleskopik dan aliran cakra 360 derajat hampir tanpa titik buta.'
      }
    }
  }

  // 3. Jalur Otsutsuki Murni
  if (hasOtsutsuki) {
    const otsuRoll = randomFloat() * 100
    if (otsuRoll < 50) {
      return { dojutsu: 'Pure Byakugan', dojutsuNote: 'Mata surgawi murni klan Otsutsuki.' }
    } else if (otsuRoll < 85) {
      return { dojutsu: 'Rinnegan Biasa (6 Paths)', dojutsuNote: 'Mata dewa pemanipulasi jalur cakra.' }
    } else {
      return { dojutsu: 'Rinne Sharingan', dojutsuNote: 'Mata ketiga di dahi berdaya Mugen Tsukuyomi!' }
    }
  }

  // 4. Jalur Cangkok / Transplantasi / Rampasan Perang (Non-Dojutsu Bloodline)
  // Shinobi tanpa keturunan klan Dojutsu (bukan Uchiha, Hyuga, Otsutsuki) memiliki peluang kecil
  // mendapatkan mata melalui cangkok (Kakashi & Danzo), rampasan perang (Ao), atau eksperimen wadah cakra (Nagato)
  const isHatake = fatherClan.name === 'Hatake' || motherClan.name === 'Hatake'
  const isKiriClan =
    fatherClan.name === 'Hozuki' ||
    motherClan.name === 'Hozuki' ||
    fatherClan.name === 'Hoshigaki' ||
    motherClan.name === 'Hoshigaki'

  // Hitung peluang transplantasi berdasarkan silsilah lore
  let transplantChance = 0.055 // Base 5.5% untuk klan umum / warga biasa (Kasus Danzo / pasar gelap perang)
  if (isHatake) {
    transplantChance = 0.18 // 18% untuk Hatake (Kasus legendaris Kakashi Hatake)
  } else if (hasSenjuOrUzumaki) {
    transplantChance = 0.08 // 8% untuk Uzumaki/Senju (Kasus Nagato Uzumaki / wadah cakra raksasa)
  } else if (isKiriClan) {
    transplantChance = 0.075 // 7.5% untuk Kirigakure (Kasus Ao Kirigakure)
  }

  const rollTransplant = randomFloat()
  if (rollTransplant < transplantChance) {
    const subRoll = randomFloat() * 100

    if (isHatake) {
      // Kasus Kakashi Hatake: Mayoritas Sharingan 3 Tomoe, Sharingan 2 Tomoe, atau Mangekyo Kamui
      if (subRoll < 65) {
        return {
          dojutsu: 'Sharingan 3 Tomoe',
          dojutsuNote: 'Mata kiri Sharingan 3 Tomoe cangkokan dari kawan Uchiha yang gugur (Kasus Kakashi Hatake)!',
          isTransplantedDojutsu: true
        }
      } else if (subRoll < 85) {
        return {
          dojutsu: 'Sharingan 2 Tomoe',
          dojutsuNote: 'Mata Sharingan 2 Tomoe cangkokan di masa Perang Dunia Shinobi Ketiga!',
          isTransplantedDojutsu: true
        }
      } else {
        return {
          dojutsu: 'Mangekyo Sharingan (MS)',
          dojutsuNote: 'Mangekyo Sharingan (Kamui) bangkit di mata cangkokan akibat trauma batin kehilangan rekan berharga (Kasus Kakashi Hatake)!',
          isTransplantedDojutsu: true
        }
      }
    } else if (hasSenjuOrUzumaki) {
      // Kasus Nagato Uzumaki / Tubuh Wadah Dewa: Wadah Rinnegan Madara, Sharingan, atau Byakugan
      if (subRoll < 35) {
        return {
          dojutsu: 'Rinnegan Biasa (6 Paths)',
          dojutsuNote: 'Mata Samsara Rinnegan Madara ditanamkan diam-diam sejak kecil ke dalam wadah cakra kolosal (Kasus Nagato Uzumaki)!',
          isTransplantedDojutsu: true
        }
      } else if (subRoll < 70) {
        return {
          dojutsu: 'Sharingan 3 Tomoe',
          dojutsuNote: 'Cangkok Sharingan 3 Tomoe yang menyatu berkat vitalitas sel cakra masif klan kehidupan!',
          isTransplantedDojutsu: true
        }
      } else if (subRoll < 85) {
        return {
          dojutsu: 'Sharingan 2 Tomoe',
          dojutsuNote: 'Transplantasi Sharingan 2 Tomoe yang distabilkan dengan daya tahan fisik tinggi!',
          isTransplantedDojutsu: true
        }
      } else {
        return {
          dojutsu: 'Byakugan Standar',
          dojutsuNote: 'Byakugan rampasan perang yang ditanamkan ke dalam tubuh berdaya cakra tinggi!',
          isTransplantedDojutsu: true
        }
      }
    } else if (isKiriClan) {
      // Kasus Ao Kirigakure: Rampasan Byakugan dari Hyuga di medan perang
      if (subRoll < 65) {
        return {
          dojutsu: 'Byakugan Standar',
          dojutsuNote: 'Mata kanan Byakugan rampasan perang hasil menundukkan shinobi klan Hyuga di medan laga (Kasus Ao Kirigakure)!',
          isTransplantedDojutsu: true
        }
      } else if (subRoll < 90) {
        return {
          dojutsu: 'Sharingan 3 Tomoe',
          dojutsuNote: 'Sharingan 3 Tomoe rampasan operasi intelijen rahasia Desa Kabut!',
          isTransplantedDojutsu: true
        }
      } else {
        return {
          dojutsu: 'Sharingan 2 Tomoe',
          dojutsuNote: 'Mata Sharingan 2 Tomoe hasil jarahan medan perang Kirigakure!',
          isTransplantedDojutsu: true
        }
      }
    } else {
      // Kasus Danzo Shimura / Shinobi Sipil / Eksperimen Genetik Gelap Orochimaru
      if (subRoll < 35) {
        return {
          dojutsu: 'Sharingan 2 Tomoe',
          dojutsuNote: 'Mata Sharingan 2 Tomoe hasil operasi cangkok pasar gelap perang ninja!',
          isTransplantedDojutsu: true
        }
      } else if (subRoll < 70) {
        return {
          dojutsu: 'Sharingan 3 Tomoe',
          dojutsuNote: 'Transplantasi Sharingan 3 Tomoe melalui bedah ninja medis terlarang!',
          isTransplantedDojutsu: true
        }
      } else if (subRoll < 90) {
        return {
          dojutsu: 'Byakugan Standar',
          dojutsuNote: 'Byakugan rampasan perang dari shinobi Konoha yang dilindungi penutup mata khusus!',
          isTransplantedDojutsu: true
        }
      } else if (subRoll < 97) {
        return {
          dojutsu: 'Mangekyo Sharingan (MS)',
          dojutsuNote: 'Mangekyo Sharingan cangkokan terlarang hasil eksperimen cakra genetik gelap (Kasus Danzo Shimura)!',
          isTransplantedDojutsu: true
        }
      } else {
        return {
          dojutsu: 'Rinnegan Biasa (6 Paths)',
          dojutsuNote: 'Rinnegan dewa yang tertanam misterius melalui eksperimen genetik cakra terlarang!',
          isTransplantedDojutsu: true
        }
      }
    }
  }

  return { dojutsu: 'None' }
}
