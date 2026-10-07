import { ELEMENTS_LIST, ELEMENT_BADGE_STYLES } from '../../data/elements'
import { CLAN_ICONS } from '../../data/clans'
import { BIJUU_METAS, BIJUU_SCORE_MAP } from '../../data/bijuu'
import { SPECIAL_MODES_METAS } from '../../data/modes'
import { DOJUTSU_METAS } from '../../data/dojutsu'
import type {
  DojutsuType,
  ShinobiCharacter,
  DetailModalItem,
  ClanInfo,
  ElementType,
  BijuuType,
  SpecialModeType
} from '../../types/ninja'

// Re-export Kekkei Genkai domain for backwards compatibility
export { KEKKEI_GENKAI_INFOS, getKekkeiGenkaiInfo } from '../../data/jutsus/kekkeiGenkai'

export const getJutsuBadgeMeta = (tier: string) => {
  switch (tier) {
    case 'Kinjutsu':
      return {
        pill: 'bg-gradient-to-r from-red-950/95 via-rose-950/90 to-red-950/95 border-red-500/90 text-red-100 shadow-[0_0_12px_rgba(239,68,68,0.45)] ring-1 ring-red-500/50',
        badge: 'bg-red-900/90 text-red-200 border-red-600',
        icon: '💀',
        label: 'TERLARANG'
      }
    case 'S-Rank':
      return {
        pill: 'bg-gradient-to-r from-amber-950/90 via-yellow-950/80 to-amber-950/90 border-amber-500/90 text-amber-100 shadow-[0_0_10px_rgba(245,158,11,0.35)] ring-1 ring-amber-500/40',
        badge: 'bg-amber-900/90 text-amber-200 border-amber-500',
        icon: '★',
        label: 'S-RANK'
      }
    case 'A-Rank':
      return {
        pill: 'bg-gradient-to-r from-purple-950/90 via-slate-900 to-purple-950/90 border-purple-500/80 text-purple-100 shadow-[0_0_8px_rgba(168,85,247,0.25)]',
        badge: 'bg-purple-900/90 text-purple-200 border-purple-500',
        icon: '⚡',
        label: 'A-RANK'
      }
    default:
      return {
        pill: 'bg-slate-900/90 border-sky-600/70 text-slate-200 hover:border-sky-500',
        badge: 'bg-sky-950 text-sky-300 border-sky-700',
        icon: '🛡️',
        label: 'B-RANK'
      }
  }
}

export const getClanIcon = (clanName: string): string => {
  return CLAN_ICONS[clanName] || '👤'
}

export const getClanBadgeStyle = (rarity: string) => {
  switch (rarity) {
    case 'Mythic':
      return {
        badge: 'bg-amber-950/80 border-amber-500/80 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.25)]',
        label: 'MYTHIC'
      }
    case 'Epic':
      return {
        badge: 'bg-purple-950/80 border-purple-500/80 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.25)]',
        label: 'EPIC'
      }
    case 'Rare':
      return {
        badge: 'bg-sky-950/80 border-sky-500/80 text-sky-300',
        label: 'RARE'
      }
    default:
      return {
        badge: 'bg-slate-900/90 border-slate-700/80 text-slate-300',
        label: 'COMMON'
      }
  }
}

export const getDojutsuMeta = (dojutsu: string) => {
  return DOJUTSU_METAS[dojutsu as DojutsuType] ?? DOJUTSU_METAS['None']
}

export const getElementMeta = (el: string) => {
  const match = ELEMENTS_LIST.find((item) => el.includes(item.shortName))
  if (match) {
    const badgeClass =
      ELEMENT_BADGE_STYLES[match.shortName] || 'bg-slate-900 border-slate-700 text-slate-200'
    return {
      shortName: match.shortName,
      kanji: match.kanji,
      icon: match.icon,
      badgeClass
    }
  }
  return {
    shortName: el.split(' ')[0],
    kanji: '遁',
    icon: '✨',
    badgeClass: 'bg-slate-900 border-slate-700 text-slate-200'
  }
}

export const getBijuuMeta = (bijuu: string) => {
  if (bijuu.includes('Juubi')) return BIJUU_METAS.Juubi
  if (bijuu.includes('Kurama') || bijuu.includes('Kyubi')) return BIJUU_METAS.Kurama
  if (bijuu.includes('Gyuki') || bijuu.includes('Hachibi')) return BIJUU_METAS.Gyuki
  if (bijuu.includes('Shukaku') || bijuu.includes('Ichibi')) return BIJUU_METAS.Shukaku
  if (bijuu !== 'Bukan Jinchuriki' && bijuu !== 'None') return BIJUU_METAS.DefaultJinchuriki
  return BIJUU_METAS.NonJinchuriki
}

export const getModeMeta = (mode: string) => {
  if (mode.includes('Six Paths') || mode.includes('Rikudo Sennin') || mode.includes('SPSM')) {
    return SPECIAL_MODES_METAS['Six Paths Sage Mode (SPSM / Rikudo Sennin)']
  }
  if (mode.includes('Bijuu Chakra Mode') || mode.includes('KCM') || mode.includes('Bijuu Cloak')) {
    return SPECIAL_MODES_METAS['Bijuu Chakra Mode (KCM / Bijuu Cloak)']
  }
  if (mode.includes('Katak') || mode.includes('Myoboku')) {
    return SPECIAL_MODES_METAS['Sage Mode — Katak Myoboku']
  }
  if (mode.includes('Ular') || mode.includes('Ryuchi')) {
    return SPECIAL_MODES_METAS['Sage Mode — Ular Ryuchi']
  }
  if (mode.includes('Siput') || mode.includes('Shikkotsu')) {
    return SPECIAL_MODES_METAS['Sage Mode — Siput Shikkotsu']
  }
  if (mode.includes('Hachimon') || mode.includes('Gerbang')) {
    return SPECIAL_MODES_METAS['Hachimon Tonkou (Delapan Gerbang Kematian)']
  }
  if (mode.includes('Kutukan') || mode.includes('Curse')) {
    return SPECIAL_MODES_METAS['Segel Kutukan Orochimaru (Curse Mark)']
  }
  return SPECIAL_MODES_METAS.None
}

export const getDojutsuDetailFromInfo = (params: {
  dojutsu: DojutsuType
  score?: number
  hyugaBranch?: 'Main Family' | 'Branch Family'
  isTransplantedDojutsu?: boolean
  dojutsuNote?: string
  reincarnation?: string
}): DetailModalItem => {
  const meta = getDojutsuMeta(params.dojutsu)
  const isNone = params.dojutsu === 'None' || params.dojutsu === 'Belum Awakened'

  let powerTierDesc = 'Persepsi Standar & Sensor Alami'
  let famousUser = 'Shinobi non-dojutsu (Minato, Jiraiya, Hiruzen, Guy)'

  if (params.dojutsu.includes('Rinnegan') || params.dojutsu.includes('Rinne Sharingan')) {
    powerTierDesc = 'Dojutsu Tingkat Tertinggi Rikudo (Kekuatan Para Dewa)'
    famousUser = 'Hagoromo Otsutsuki, Nagato (Pain), Madara Uchiha, Sasuke Uchiha'
  } else if (params.dojutsu.includes('Tenseigan')) {
    powerTierDesc = 'Mata Reinkarnasi Hamura (Manipulasi Gravitasi Kosmik)'
    famousUser = 'Hamura Otsutsuki, Toneri Otsutsuki'
  } else if (params.dojutsu.includes('EMS')) {
    powerTierDesc = 'Mata Mangekyo Abadi Tanpa Efek Kebutaan'
    famousUser = 'Madara Uchiha, Sasuke Uchiha'
  } else if (params.dojutsu.includes('Mangekyo')) {
    powerTierDesc = 'Mata Kebencian Legendaris (Akses Susanoo & Dimensi Khusus)'
    famousUser = 'Itachi Uchiha, Shisui Uchiha, Obito Uchiha, Kakashi Hatake'
  } else if (params.dojutsu.includes('Byakugan')) {
    powerTierDesc = 'Mata Tembus Pandang 360° & Analisis Titik Tenketsu Cakra'
    famousUser = 'Neji Hyuga, Hinata Hyuga, Hiashi Hyuga, Kaguya Otsutsuki'
  } else if (params.dojutsu.includes('Sharingan')) {
    powerTierDesc = 'Mata Hipnotis & Persepsi Prediksi Gerakan Tingkat Tinggi'
    famousUser = 'Klan Uchiha, Kakashi Hatake'
  }

  const notesList: string[] = []
  if (params.isTransplantedDojutsu) {
    notesList.push(params.dojutsuNote || 'Mata ini didapatkan melalui transplantasi / rampasan perang antardesa.')
  } else if (params.hyugaBranch) {
    notesList.push(
      params.hyugaBranch === 'Main Family'
        ? 'Keluarga Utama (Soke) — Pemegang otoritas tertinggi garis keturunan murni Hyuga tanpa segel kutukan.'
        : 'Keluarga Cabang (Bunke) — Pelindung setia klan yang ditandai segel kutukan pelindung mata.'
    )
  } else if (params.dojutsuNote) {
    notesList.push(params.dojutsuNote)
  }

  if (params.reincarnation && params.reincarnation !== 'None') {
    notesList.push(`Takdir Reinkarnasi (${params.reincarnation}) — Membawa resonansi cakra leluhur Rikudo Sennin.`)
  }

  const extraNotes = notesList.length > 0 ? notesList.join(' • ') : undefined

  return {
    name: isNone ? 'Mata Standar' : params.dojutsu,
    kanji: '瞳術 (Dōjutsu)',
    tier: meta.tier,
    category: 'Mata / Dojutsu',
    pts: params.score ?? meta.minScore,
    description: meta.desc,
    powerTierDesc,
    famousUser,
    icon: meta.icon,
    extraNotes
  }
}

export const getDojutsuDetail = (character: ShinobiCharacter): DetailModalItem => {
  return getDojutsuDetailFromInfo({
    dojutsu: character.dojutsu,
    score: character.scores.dojutsuScore,
    hyugaBranch: character.hyugaBranch,
    isTransplantedDojutsu: character.isTransplantedDojutsu,
    dojutsuNote: character.dojutsuNote,
    reincarnation: character.reincarnation
  })
}

export const getSingleElementDetail = (element: ElementType): DetailModalItem => {
  if (element === 'Katon (Api)') {
    return {
      name: 'Katon (Elemen Api)',
      kanji: '火遁 (Katon)',
      tier: 'AFINITAS ALAM',
      category: 'Transformasi Alam Cakra',
      pts: 200,
      description: 'Manipulasi cakra bertemperatur tinggi yang berdaya bakar dan berdaya ledak dahsyat. Sangat efektif untuk ofensif frontal jarak menengah-jauh. Unggul mutlak menghadapi Futon (Angin), namun dapat dipadamkan oleh Suiton (Air).',
      powerTierDesc: 'Daya Bakar & Ledakan Ofensif Tinggi',
      famousUser: 'Madara Uchiha, Sasuke Uchiha, Jiraiya, Hiruzen Sarutobi',
      icon: '🔥'
    }
  }
  if (element === 'Futon (Angin)') {
    return {
      name: 'Futon (Elemen Angin)',
      kanji: '風遁 (Fūton)',
      tier: 'AFINITAS ALAM',
      category: 'Transformasi Alam Cakra',
      pts: 200,
      description: 'Manipulasi cakra angin berdensitas tinggi setajam pisau mikroskopis. Mampu membelah pertahanan solid dan memotong material keras. Unggul mutlak terhadap Raiton (Petir), namun mudah tersulut dan memperbesar Katon (Api).',
      powerTierDesc: 'Daya Potong Mikroskopis & Penetrasi Tajam',
      famousUser: 'Naruto Uzumaki, Asuma Sarutobi, Danzo Shimura, Temari',
      icon: '🌀'
    }
  }
  if (element === 'Raiton (Petir)') {
    return {
      name: 'Raiton (Elemen Petir)',
      kanji: '雷遁 (Raiton)',
      tier: 'AFINITAS ALAM',
      category: 'Transformasi Alam Cakra',
      pts: 200,
      description: 'Manipulasi cakra petir berfrekuensi tinggi untuk penetrasi mematikan dan stimulan sistem saraf tubuh demi refleks gerak berkecepatan kilat. Unggul mutlak terhadap Doton (Tanah), namun diredam oleh Futon (Angin).',
      powerTierDesc: 'Penetrasi Fatal & Kecepatan Gerak Kilat',
      famousUser: 'Kakashi Hatake, Sasuke Uchiha, Raikage (Ay), Darui',
      icon: '⚡'
    }
  }
  if (element === 'Doton (Tanah)') {
    return {
      name: 'Doton (Elemen Tanah)',
      kanji: '土遁 (Doton)',
      tier: 'AFINITAS ALAM',
      category: 'Transformasi Alam Cakra',
      pts: 200,
      description: 'Manipulasi massa bumi dan mineral untuk pertahanan benteng kokoh, manipulasi bobot gravitasi, atau menenggelamkan musuh ke perut bumi. Unggul menghadapi Suiton (Air), namun rentan tertembus Raiton (Petir).',
      powerTierDesc: 'Pertahanan Benteng & Manipulasi Massa Bumi',
      famousUser: 'Onoki, Mu, Kitsuchi, Kakashi Hatake, Hiruzen Sarutobi',
      icon: '🪨'
    }
  }
  if (element === 'Suiton (Air)') {
    return {
      name: 'Suiton (Elemen Air)',
      kanji: '水遁 (Suiton)',
      tier: 'AFINITAS ALAM',
      category: 'Transformasi Alam Cakra',
      pts: 200,
      description: 'Manipulasi fluida air bertekanan deras untuk kontrol medan luas, tsunami pemusnah, atau memotong material padat dengan semprotan bertekanan tinggi. Unggul memadamkan Katon (Api), namun rentan terhadap Doton (Tanah).',
      powerTierDesc: 'Fleksibilitas Fluida & Dominasi Medan Tempur',
      famousUser: 'Tobirama Senju, Kisame Hoshigaki, Zabuza Momochi, Mei Terumi',
      icon: '💧'
    }
  }
  return {
    name: 'Onmyoton (Elemen Yin-Yang)',
    kanji: '陰陽遁 (Onmyōton)',
    tier: 'CHAKRA SUCI / RIKUDO',
    category: 'Transformasi Suci Hakikat Tertinggi',
    pts: 800,
    description: 'Penguasaan dua kutub fundamental spiritual (Yin - menciptakan wujud dari ketiadaan) dan fisik (Yang - meniupkan nafas kehidupan). Mampu meniadakan segala ninjutsu biasa dan membentuk Gudodama.',
    powerTierDesc: 'Penciptaan Bentuk Eksistensi & Pembatal Ninjutsu',
    famousUser: 'Hagoromo Otsutsuki, Naruto Uzumaki (Six Paths), Madara Uchiha (Rikudo)',
    icon: '☯️'
  }
}

export const getElementDetailFromElements = (elements: ElementType[], score?: number): DetailModalItem => {
  const count = elements.length
  const hasYinYang = elements.some((e) => e.includes('Yin-Yang') || e.includes('Onmyoton'))
  const elementNames = elements.map((e) => e.split(' ')[0]).join(', ')

  let tier = 'SPESIALIS TUNGGAL'
  let powerTierDesc = 'Spesialisasi Sifat Alam Tunggal Berdaya Ledak Tinggi'
  let famousUser = 'Shinobi Spesialis Elemen'

  if (count >= 5 || hasYinYang) {
    tier = 'AVATAR SHINOBI / RIKUDO'
    powerTierDesc = 'Penguasaan Menyeluruh Seluruh Transformasi Alam Dasar & Yin-Yang'
    famousUser = 'Hashirama Senju, Tobirama Senju, Hiruzen Sarutobi, Kakashi Hatake, Naruto (Six Paths)'
  } else if (count >= 3) {
    tier = 'MASTER MULTI-ELEMEN'
    powerTierDesc = `Penguasaan ${count} Transformasi Alam Simultan`
    famousUser = 'Jiraiya, Orochimaru, Mu, Onoki, Mei Terumi'
  } else if (count === 2) {
    tier = 'DUAL-ELEMEN'
    powerTierDesc = 'Kombinasi 2 Afinitas Alam Taktis'
    famousUser = 'Sasuke Uchiha (Api & Petir), Minato Namikaze (Angin & Petir)'
  }

  const desc =
    count > 1
      ? `Penguasaan ${count} transformasi alam cakra sekaligus (${elementNames}). Memungkinkan adaptabilitas medan taktis tingkat tinggi, pemanfaatan kelemahan alam lawan, dan variasi kombinasi jurus.`
      : `Spesialisasi penguasaan transformasi alam cakra murni (${elementNames}). Mengutamakan kemurnian resonansi cakra dan densitas kekuatan jurus tanpa terbagi ke jalur elemen lain.`

  const extraNotes = hasYinYang
    ? 'Memiliki akses ke Onmyoton (Yin-Yang) — transformasi penciptaan bentuk dari ketiadaan dan pembatal segala ninjutsu biasa.'
    : undefined

  return {
    name: `Afinitas Cakra (${count} Elemen)`,
    kanji: 'チャクラ性質変化',
    tier,
    category: 'Afinitas Cakra',
    pts: score ?? (count * 200 + (hasYinYang ? 600 : 0)),
    description: desc,
    powerTierDesc,
    famousUser,
    icon: '🔥',
    extraNotes
  }
}

export const getElementDetail = (character: ShinobiCharacter): DetailModalItem => {
  return getElementDetailFromElements(character.elements, character.scores.elementScore)
}

export const getBijuuDetailFromInfo = (params: {
  bijuu: BijuuType
  bijuuMastery?: string
  bijuuGift?: string
  score?: number
  bijuuDominanceBonus?: number
}): DetailModalItem => {
  const meta = getBijuuMeta(params.bijuu)
  const isHost = params.bijuu !== 'Bukan Jinchuriki'

  let powerTierDesc = 'Bebas dari resiko amukan cakra binatang buas'
  let famousUser = 'Mayoritas Shinobi Dunia Ninja'

  if (params.bijuu.includes('Juubi')) {
    powerTierDesc = 'Wadah Dewa Pohon / Bencana Akhir Peradaban'
    famousUser = 'Hagoromo Otsutsuki, Obito Uchiha, Madara Uchiha'
  } else if (params.bijuu.includes('Kurama') || params.bijuu.includes('Kyubi')) {
    powerTierDesc = 'Monster Berekor Terkuat dengan Pasokan Cakra Terbesar'
    famousUser = 'Mito Uzumaki, Kushina Uzumaki, Naruto Uzumaki, Minato Namikaze'
  } else if (params.bijuu.includes('Gyuki') || params.bijuu.includes('Hachibi')) {
    powerTierDesc = 'Banteng Raksasa Perkasa dengan Koordinasi Sempurna'
    famousUser = 'Killer B, Blue B'
  } else if (params.bijuu.includes('Shukaku')) {
    powerTierDesc = 'Manipulasi Pasir & Segel Kutukan Magnetik'
    famousUser = 'Gaara, Bunbuku'
  } else if (isHost) {
    powerTierDesc =
      params.bijuuMastery && params.bijuuMastery !== 'None'
        ? params.bijuuMastery
        : 'Wadah Monster Berekor (Jinchuriki Aktif)'
    famousUser = 'Para Jinchuriki 5 Negara Besar Ninja'
  }

  const notesList: string[] = []
  if (params.bijuuGift) {
    notesList.push(`Berkah Cakra Bijuu: ${params.bijuuGift}`)
  }
  if (params.bijuuMastery === 'Jinchuriki Harmonis') {
    notesList.push('Harmoni sempurna antara Shinobi dan Bijuu — kebal genjutsu visual konvensional dan akses penuh ke wujud penuh monster.')
  } else if (params.bijuuMastery === 'Penakluk Bijuu Liar (Subjugator)') {
    const bonusText = params.bijuuDominanceBonus ? ` (+${params.bijuuDominanceBonus} PTS)` : ''
    notesList.push(`Menundukkan cakra monster berekor secara paksa menggunakan tekad baja / kekuatan dominasi genetik${bonusText}.`)
  }

  const extraNotes = notesList.length > 0 ? notesList.join(' • ') : undefined

  return {
    name: params.bijuu,
    kanji: '尾獣 (Bijū)',
    tier: meta.tier,
    category: 'Status Bijuu',
    pts: params.score ?? (BIJUU_SCORE_MAP[params.bijuu] || 0),
    description: meta.desc,
    powerTierDesc,
    famousUser,
    icon: meta.icon,
    extraNotes
  }
}

export const getBijuuDetail = (character: ShinobiCharacter): DetailModalItem => {
  return getBijuuDetailFromInfo({
    bijuu: character.bijuu,
    bijuuMastery: character.bijuuMastery,
    bijuuGift: character.bijuuGift,
    score: character.scores.bijuuScore,
    bijuuDominanceBonus: character.scores.bijuuDominanceBonus
  })
}

export const getModeDetailFromMode = (mode: SpecialModeType, score?: number): DetailModalItem => {
  const meta = getModeMeta(mode)
  const isNone = mode === 'None'

  let powerTierDesc = 'Keahlian Murni Dasar Shinobi (Tanpa Transformasi)'
  let famousUser = 'Shinobi bertaktik konvensional & master taijutsu'

  if (mode.includes('Six Paths') || mode.includes('SPSM')) {
    powerTierDesc = 'Mode Transformasi Ilahi Dewa Enam Jalur Rikudo Sennin'
    famousUser = 'Naruto Uzumaki, Hagoromo Otsutsuki'
  } else if (mode.includes('Bijuu Chakra') || mode.includes('KCM')) {
    powerTierDesc = 'Mantel Cakra Monster Ekor Emas Berkecepatan Kilat'
    famousUser = 'Naruto Uzumaki, Minato Namikaze'
  } else if (mode.includes('Hachimon')) {
    powerTierDesc = 'Pelepasan Delapan Gerbang Pembatas Cakra Tubuh Manusia'
    famousUser = 'Might Guy, Might Duy, Rock Lee'
  } else if (mode.includes('Katak')) {
    powerTierDesc = 'Senjutsu Pertapa Katak Gunung Myoboku'
    famousUser = 'Jiraiya, Naruto Uzumaki, Minato Namikaze'
  } else if (mode.includes('Ular')) {
    powerTierDesc = 'Senjutsu Pertapa Ular Gua Ryuchi'
    famousUser = 'Kabuto Yakushi, Mitsuki'
  } else if (mode.includes('Siput')) {
    powerTierDesc = 'Senjutsu Pertapa Siput Hutan Shikkotsu'
    famousUser = 'Hashirama Senju, Tsunade (Mitotic Regeneration)'
  } else if (mode.includes('Kutukan')) {
    powerTierDesc = 'Segel Terlarang Percobaan DNA Juugo Orochimaru'
    famousUser = 'Sasuke Uchiha, Juugo, Kimimaro'
  }

  const extraNotes =
    meta.pts > 0
      ? `Memberikan peningkatan daya tempur sebesar +${meta.pts.toLocaleString()} PTS.`
      : undefined

  return {
    name: isNone ? 'Gaya Tempur Standar' : mode,
    kanji: '仙人・特殊形態',
    tier: meta.tier,
    category: 'Mode Transformasi',
    pts: score ?? meta.pts,
    description: meta.desc,
    powerTierDesc,
    famousUser,
    icon: meta.icon,
    extraNotes
  }
}

export const getModeDetail = (character: ShinobiCharacter): DetailModalItem => {
  return getModeDetailFromMode(character.specialMode, character.scores.modeScore)
}

export const getClanDetailFromClan = (
  clan: ClanInfo,
  side: 'father' | 'mother',
  otherClan?: ClanInfo | null,
  score?: number
): DetailModalItem => {
  const icon = getClanIcon(clan.name)
  const isFather = side === 'father'

  let powerTierDesc = 'Klan Pejuang Tangguh Dunia Shinobi'
  let famousUser = 'Para Tokoh Legendaris Klan'

  switch (clan.rarity) {
    case 'Mythic':
      powerTierDesc = 'Garis Keturunan Dewa / Pewaris Cakra Murni Leluhur'
      break
    case 'Epic':
      powerTierDesc = 'Klan Bangsawan Pendiri / Pemilik DNA Legendaris'
      break
    case 'Rare':
      powerTierDesc = 'Bangsawan Teknik Rahasia (Hiden) & Petarung Elit'
      break
    default:
      powerTierDesc = 'Shinobi Mandiri Tanpa Keistimewaan Darah Bangsawan'
      break
  }

  if (clan.name === 'Otsutsuki') {
    famousUser = 'Kaguya, Hagoromo, Hamura, Isshiki, Momoshiki'
  } else if (clan.name === 'Uchiha') {
    famousUser = 'Indra, Madara, Izuna, Kagami, Shisui, Itachi, Obito, Sasuke'
  } else if (clan.name === 'Senju') {
    famousUser = 'Asura, Hashirama, Tobirama, Butsuma, Tsunade'
  } else if (clan.name === 'Uzumaki') {
    famousUser = 'Ashina, Mito, Kushina, Nagato, Karin, Naruto, Boruto'
  } else if (clan.name === 'Hyuga') {
    famousUser = 'Hamura, Hiashi, Hizashi, Neji, Hinata, Hanabi'
  } else if (clan.name === 'Sarutobi') {
    famousUser = 'Sasuke Sarutobi, Hiruzen, Asuma, Konohamaru'
  } else if (clan.name === 'Hatake') {
    famousUser = 'Sakumo (Taring Putih Konoha), Kakashi'
  } else if (clan.name === 'Nara') {
    famousUser = 'Shikaku, Shikamaru, Shikadai'
  } else if (clan.name === 'Akimichi') {
    famousUser = 'Choza, Choji, Chocho'
  } else if (clan.name === 'Yamanaka') {
    famousUser = 'Inoichi, Ino, Inojin'
  } else if (clan.name === 'Aburame') {
    famousUser = 'Shibi, Shino, Torune'
  } else if (clan.name === 'Inuzuka') {
    famousUser = 'Tsume, Kiba, Hana'
  } else if (clan.name === 'Hoshigaki') {
    famousUser = 'Kisame, Shizuma'
  } else if (clan.name === 'Kaguya (Tulang)') {
    famousUser = 'Kimimaro'
  } else if (clan.name === 'Yuki') {
    famousUser = 'Haku'
  } else if (clan.name.includes('Sipil') || clan.name.includes('Tanpa Klan')) {
    famousUser = 'Minato Namikaze, Jiraiya, Sakura Haruno, Might Guy, Rock Lee'
  }

  const defaultPts =
    clan.rarity === 'Mythic' ? 1000 : clan.rarity === 'Epic' ? 550 : clan.rarity === 'Rare' ? 350 : 150

  let extraNotes: string | undefined = undefined
  if (otherClan && clan.name === otherClan.name) {
    extraNotes = `Keturunan Darah Murni (${clan.name}) — Warisan genetik terfokus memberikan potensi cakra murni maksimal.`
  }

  return {
    name: `Klan ${clan.name} (${isFather ? 'Garis Ayah' : 'Garis Ibu'})`,
    kanji: '一族 (Ichizoku)',
    tier: clan.rarity.toUpperCase(),
    category: `Silsilah Klan (${isFather ? 'Ayah' : 'Ibu'})`,
    pts: score ?? defaultPts,
    description: clan.description,
    powerTierDesc,
    famousUser,
    icon,
    extraNotes
  }
}

export const getClanDetail = (
  character: ShinobiCharacter,
  side: 'father' | 'mother'
): DetailModalItem => {
  const clan = side === 'father' ? character.fatherClan : character.motherClan
  const otherClan = side === 'father' ? character.motherClan : character.fatherClan
  const pts = side === 'father' ? character.scores.fatherClanScore : character.scores.motherClanScore
  return getClanDetailFromClan(clan, side, otherClan, pts)
}

export const getLineageSynergyDetail = (
  type: 'pureblood' | 'rikudo' | 'hamura',
  character: ShinobiCharacter
): DetailModalItem => {
  if (type === 'pureblood') {
    return {
      name: `Darah Murni Klan ${character.fatherClan.name}`,
      kanji: '純血統 (Junkettō)',
      tier: 'PUREBLOOD',
      category: 'Sinergi Garis Keturunan',
      pts: 0,
      description: `Kedua orang tua berasal dari klan ${character.fatherClan.name}. DNA dan sirkulasi cakra tidak mengalami pengenceran genetik, memaksimalkan potensi sifat bawaan klan.`,
      powerTierDesc: 'Kemurnian Genetik 100% Silsilah Tunggal',
      famousUser:
        character.fatherClan.name === 'Uchiha'
          ? 'Madara, Sasuke, Itachi'
          : character.fatherClan.name === 'Hyuga'
          ? 'Neji, Hinata'
          : 'Tetua Klan Murni',
      icon: '🩸',
      extraNotes: 'Membuka peluang tertinggi untuk awakening Dojutsu atau kemampuan khusus klan.'
    }
  }

  if (type === 'rikudo') {
    return {
      name: 'Sinergi Rikudo Sennin (Indra × Asura)',
      kanji: '六道仙人血統',
      tier: 'DIVINE SYNERGY',
      category: 'Sinergi Garis Keturunan',
      pts: 500,
      description:
        'Penyatuan dua cabang keturunan Hagoromo Otsutsuki: Garis Indra (Mata Spiritual / Uchiha) dan Garis Asura (Fisik & Cakra Hidup / Senju atau Uzumaki).',
      powerTierDesc: 'Kombinasi Genetik Terkuat di Dunia Fana',
      famousUser: 'Madara Uchiha (dengan sel Hashirama), Hagoromo Otsutsuki',
      icon: '✨',
      extraNotes: 'Fondasi utama untuk membangkitkan Rinnegan dan menguasai segala transformasi elemen.'
    }
  }

  return {
    name: 'Garis Keturunan Hamura Otsutsuki',
    kanji: '羽村血統',
    tier: 'CELESTIAL SYNERGY',
    category: 'Sinergi Garis Keturunan',
    pts: 500,
    description:
      'Penyatuan darah klan Otsutsuki dan klan Hyuga. Merupakan garis keturunan adik Hagoromo yaitu Hamura Otsutsuki.',
    powerTierDesc: 'Kekuatan Surgawi Klan Bulan',
    famousUser: 'Hamura Otsutsuki, Toneri Otsutsuki',
    icon: '🌕',
    extraNotes: 'Darah kunci untuk membangkitkan Pure Byakugan dan mata Tenseigan.'
  }
}

