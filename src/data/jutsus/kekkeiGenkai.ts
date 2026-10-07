import type { JutsuInfo } from '../../types/ninja'

export const KEKKEI_GENKAI_INFOS: Record<string, JutsuInfo> = {
  'Suika no Jutsu (Tubuh Cair)': {
    name: 'Kirimeru Suika no Jutsu (Tubuh Cair)',
    kanji: '水化の術',
    tier: 'A-Rank',
    pts: 350,
    famousUser: 'Suigetsu & Mangetsu Hozuki (Klan Hozuki)',
    powerTierDesc: 'Kekkei Genkai Rahasia Klan Hozuki • Kebal Serangan Fisik Mutlak',
    description:
      'Kemampuan garis darah rahasia klan Hozuki untuk mengubah seluruh struktur molekul tubuh menjadi air cair sesuka hati, meniadakan semua tebasan pedang dan serangan fisik tumpul secara mutlak.'
  },
  'Mokuton (Elemen Kayu)': {
    name: 'Mokuton: Jukai Kotan (Kelahiran Hutan Rimba)',
    kanji: '木遁・樹界降誕',
    tier: 'S-Rank',
    pts: 400,
    famousUser: 'Hashirama Senju (Dewa Shinobi)',
    powerTierDesc: 'Kekkei Genkai Legendaris • Manipulasi Hayati & Penakluk Bijuu',
    description:
      'Kombinasi elemen Air dan Tanah milik Senju yang menumbuhkan pepohonan raksasa hidup dalam sekejap untuk mengikat, menyerap cakra, dan menundukkan bahkan monster Bijuu terkuat.'
  },
  'Enton (Manipulasi Api Hitam Amaterasu)': {
    name: 'Enton: Kagutsuchi (Kendali Api Hitam Abadi)',
    kanji: '炎遁・加具土命',
    tier: 'S-Rank',
    pts: 360,
    famousUser: 'Sasuke Uchiha',
    powerTierDesc: 'Kekkei Genkai Lanjut Mangekyo • Manipulasi Bentuk Api Hitam',
    description:
      'Kekkei Genkai manipulasi bentuk api hitam Amaterasu menjadi pedang tajam, panah, atau perisai duri mematikan yang membakar tanpa henti.'
  },
  'Hyoton (Elemen Es Abadi)': {
    name: 'Hyoton: Makyo Hyosho (Cermin Es Iblis)',
    kanji: '氷遁・魔鏡氷晶',
    tier: 'A-Rank',
    pts: 350,
    famousUser: 'Haku (Klan Yuki)',
    powerTierDesc: 'Kekkei Genkai Garis Darah Yuki • Es Mutlak Kecepatan Cahaya',
    description:
      'Penyatuan cakra Air dan Angin untuk memanipulasi es bersuhu dingin ekstrem, menciptakan kubah cermin es berkecepatan cahaya.'
  },
  'Shikotsumyaku (Manipulasi Struktur Tulang)': {
    name: 'Shikotsumyaku: Sawarabi no Mai (Tarian Pakis Tulang)',
    kanji: '屍骨脈・早蕨の舞',
    tier: 'S-Rank',
    pts: 350,
    famousUser: 'Kimimaro (Klan Kaguya)',
    powerTierDesc: 'Kekkei Genkai Garis Darah Kaguya • Tulang Keras Sepekat Baja',
    description:
      'Kemampuan memanipulasi osteoblas dan osteoklas tubuh untuk menumbuhkan serta mengeraskan tulang menjadi senjata dan zirah yang lebih keras dari baja padat.'
  },
  'Jiton (Manipulasi Pasir Magnet)': {
    name: 'Jiton: Sabaku Taiso (Pemakaman Pasir Magnet Raksasa)',
    kanji: '磁遁・砂漠大葬',
    tier: 'S-Rank',
    pts: 350,
    famousUser: 'Gaara & Rasa (Keluarga Kazekage)',
    powerTierDesc: 'Kekkei Genkai Magnetik • Manipulasi Pasir & Medan Magnet',
    description:
      'Penyatuan cakra Angin dan Tanah menghasilkan gaya medan magnet berkekuatan tinggi untuk mengendalikan gelombang pasir padat penghancur benteng musuh.'
  },
  'Jiton (Magnet & Pasir Shukaku)': {
    name: 'Jiton: Fuin Sabaku Sotaiso (Segel Piramida Pasir Magnet Shukaku)',
    kanji: '磁遁・砂漠層大葬封印',
    tier: 'S-Rank',
    pts: 350,
    famousUser: 'Ichibi (Shukaku) & Gaara',
    powerTierDesc: 'Kekkei Genkai Berkah Bijuu • Pasir Magnet & Pola Segel Cakra',
    description:
      'Kekkei Genkai magnet alami warisan Shukaku yang memanifestasikan pasir berpola segel Fuinjutsu kutukan untuk mengunci musuh selamanya.'
  },
  'Youton (Lava Son Goku)': {
    name: 'Youton: Shakugaryu Gan (Lahar Batu Pijar Son Goku)',
    kanji: '熔遁・灼河櫚岩の術',
    tier: 'S-Rank',
    pts: 350,
    famousUser: 'Roushi (Jinchuriki Yonbi) & Son Goku',
    powerTierDesc: 'Kekkei Genkai Berkah Bijuu • Lahar Vulkanik Melelehkan Baja',
    description:
      'Penggabungan Api dan Tanah membentuk lahar batu pijar vulkanik bersuhu ribuan derajat celsius yang melelehkan segala pertahanan musuh.'
  },
  'Futton (Uap Mendidih Kokuo)': {
    name: 'Futton: Koumu no Jutsu (Uap Asam Mendidih Kokuo)',
    kanji: '沸遁・巧霧の術',
    tier: 'S-Rank',
    pts: 350,
    famousUser: 'Han (Jinchuriki Gobi) & Mei Terumi',
    powerTierDesc: 'Kekkei Genkai Berkah Bijuu • Uap Bertekanan Korosif Ekstrem',
    description:
      'Penggabungan Api dan Air menciptakan semburan uap mendidih bertekanan dahsyat yang mampu melarutkan zirah Susanoo dan mengikis materi musuh seketika.'
  }
}

export function getKekkeiGenkaiInfo(name: string): JutsuInfo {
  if (KEKKEI_GENKAI_INFOS[name]) {
    return KEKKEI_GENKAI_INFOS[name]
  }
  for (const key of Object.keys(KEKKEI_GENKAI_INFOS)) {
    if (name.includes(key) || key.includes(name)) {
      return KEKKEI_GENKAI_INFOS[key]
    }
  }
  return {
    name,
    kanji: '血継限界',
    tier: 'S-Rank',
    pts: 350,
    powerTierDesc: 'Kekkei Genkai Warisan Garis Darah Khusus',
    description:
      'Kemampuan khusus manipulasi gabungan elemen dan sel genetika langka yang diwariskan melalui garis keturunan pejuang legendaris.'
  }
}
