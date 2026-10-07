import React from 'react'
import { X, Shield, Eye, Flame, Award } from 'lucide-react'

interface RulesModalProps {
  isOpen: boolean
  onClose: () => void
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold font-['Cinzel'] text-amber-300">
              Pohon Logika & Persentase Gacha
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content sections */}
        <div className="space-y-6 mt-4 text-sm">
          {/* Section 1: Rarity Klan */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <h3 className="font-bold text-base text-slate-100 flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              1. Rarity Klan (Ayah & Ibu di-roll terpisah)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-slate-400">Common (30%):</span>
                <p className="text-slate-400 mt-0.5">Warga Sipil / Tanpa Klan (Rakyat biasa)</p>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-900/50">
                <span className="font-bold text-blue-400">Rare (50%):</span>
                <p className="text-slate-400 mt-0.5">Inuzuka, Aburame, Nara, Akimichi, Yamanaka, Sarutobi, Hatake, Hoshigaki, Hozuki</p>
              </div>
              <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-900/50">
                <span className="font-bold text-purple-400">Epic (17%):</span>
                <p className="text-slate-400 mt-0.5">Hyuga, Uzumaki, Senju, Uchiha, Yuki, Kaguya, Garis Keturunan Kazekage</p>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-900/50">
                <span className="font-bold text-amber-400">Mythic (3%):</span>
                <p className="text-slate-400 mt-0.5">Otsutsuki (Darah Dewa Selestial Primordial)</p>
              </div>
            </div>
          </div>

          {/* Section 2: Percabangan Dojutsu */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <h3 className="font-bold text-base text-slate-100 flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-red-400" />
              2. Logika Dojutsu & Awakening (Branching If)
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
                <strong className="text-red-400">Uchiha Roll:</strong>
                <span className="text-slate-400 block mt-1">
                  Belum Awakened (20%) • 1 Tomoe (35%) • 2 Tomoe (25%) • 3 Tomoe (12%) • MS (6%) • EMS (2%)
                </span>
              </li>
              <li className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
                <strong className="text-purple-400">Rinnegan Unlock (Syarat Ketat):</strong>
                <span className="text-slate-400 block mt-1">
                  Jika perpaduan <em className="text-slate-200">Uchiha + (Senju / Uzumaki)</em> DAN berhasil mendapatkan <em className="text-slate-200">EMS</em>:
                  Maka terbuka roll Rinnegan (Gagal 70%, 6 Paths 20%, Rinne Sharingan 8%, Six Paths Rinnegan 2%).
                </span>
              </li>
              <li className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
                <strong className="text-blue-400">Hyuga & Tenseigan:</strong>
                <span className="text-slate-400 block mt-1">
                  Byakugan Standar (85%) • Pure Byakugan (15%). Jika kawin silang <em className="text-slate-200">Hyuga + Otsutsuki</em> → Tenseigan (3%).
                </span>
              </li>
              <li className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
                <strong className="text-rose-400">Cangkok Dojutsu Non-Klan (Canon Transplant & War Loot):</strong>
                <span className="text-slate-400 block mt-1">
                  Shinobi tanpa darah mata alami berpeluang mendapatkan Dojutsu via cangkok, rampasan perang, atau wadah cakra:
                </span>
                <span className="text-slate-400 block mt-1 leading-relaxed">
                  • <strong className="text-slate-200">Klan Hatake (18%):</strong> Sharingan 3 Tomoe (65%), 2 Tomoe (20%), atau MS Kamui (15%) — <em>Kasus Kakashi Hatake</em>.<br />
                  • <strong className="text-slate-200">Uzumaki & Senju (8%):</strong> Wadah Rinnegan Madara (35%), Sharingan (50%), Byakugan (15%) — <em>Kasus Nagato Uzumaki</em>.<br />
                  • <strong className="text-slate-200">Kirigakure (7.5%):</strong> Byakugan rampasan perang Hyuga (65%), Sharingan (35%) — <em>Kasus Ao Kirigakure</em>.<br />
                  • <strong className="text-slate-200">Klan Lain / Warga Sipil (5.5%):</strong> Sharingan (70%), Byakugan (20%), MS Eksperimen Gelap Danzo (7%), Rinnegan (3%).
                </span>
              </li>
              <li className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
                <strong className="text-emerald-400">Kekkei Genkai Garis Darah Canon:</strong>
                <span className="text-slate-400 block mt-1">
                  Senju (Tanah & Air) = <strong>Mokuton</strong> •
                  Yuki (Air & Angin) = <strong>Hyoton</strong> •
                  Kazekage = <strong>Jiton</strong> •
                  Kaguya = <strong>Shikotsumyaku</strong> •
                  Uchiha (min 3 Tomoe + Api & Angin) = <strong>Enton</strong> (+350 Power per Kekkei Genkai)
                </span>
              </li>
            </ul>
          </div>

          {/* Section 3: Elemen & Bijuu */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <h3 className="font-bold text-base text-slate-100 flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-orange-400" />
              3. Elemen, Bijuu & Mode Khusus
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <p className="font-semibold text-slate-200">Afinitas Elemen (Pengaruh Klan):</p>
                <p className="text-slate-400 mt-1">Uchiha (Api 65%, Petir 25%), Senju (Air & Tanah 35%), Hozuki (Air 65%), Hatake (Petir 55%), Uzumaki (Angin 45%, Air 35%).</p>
                <p className="text-purple-300 font-semibold mt-1">★ Bonus Yin-Yang Onmyoton (2% umum, 25% jika Otsutsuki).</p>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <p className="font-semibold text-slate-200">Resonansi Bijuu & Wadah (Canon Lore):</p>
                <p className="text-slate-400 mt-1">
                  • <strong>Soft-Weighting Elemen:</strong> Bijuu ekor 1-8 menyesuaikan elemen cakra karakter (Api → Matatabi/Son Goku, Air → Isobu/Saiken, Angin/Tanah → Shukaku, Petir → Gyuki).
                </p>
                <p className="text-slate-400 mt-1">
                  • <strong>Vitalitas Klan:</strong> Uzumaki & Senju memiliki resistensi wadah lebih tinggi dan peluang Kurama meningkat.
                </p>
                <p className="text-amber-300 font-semibold mt-1">
                  • <strong>Penakluk Paksa (Subjugator):</strong> Pemilik MS/EMS/Rinnegan/Mokuton/Otsutsuki menundukkan Bijuu secara paksa (+200 PTS Dominasi).
                </p>
                <p className="text-emerald-300 font-semibold mt-1">
                  • <strong>Berkah Bijuu:</strong> Bijuu menganugerahkan Kekkei Genkai bawaan (Shukaku → Jiton, Son Goku → Youton, Kokuo → Futton).
                </p>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 sm:col-span-2">
                <p className="font-semibold text-slate-200">Rasio Jurus Canon (Signature vs Taktikal):</p>
                <p className="text-slate-400 mt-1">
                  • <strong>Jutsu Signature (1 - 2 Jurus):</strong> Kartu truf pemungkas yang eksklusif (maks 3 untuk silsilah dewa Otsutsuki/Rinnegan).
                </p>
                <p className="text-slate-400 mt-0.5">
                  • <strong>Arsenal Taktis & Support (2 - 3 Jurus, maks 4):</strong> Wajib relevan dengan elemen, klan, atau dojutsu (Shunshin, Kawarimi, Kage Bunshin, Doryuheki, Suijinheki, Hakke Kusho, Chidori Nagashi, Housenka, Reppushou, Shousen Medis).
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Power Rank */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <h3 className="font-bold text-base text-slate-100 flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-amber-400" />
              4. Tingkatan Ninja Rank
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <div className="font-bold text-slate-300">Genin</div>
                <div className="text-[10px] text-slate-500">&lt; 600</div>
              </div>
              <div className="p-2 rounded bg-blue-950/40 border border-blue-900/50">
                <div className="font-bold text-blue-300">Chunin</div>
                <div className="text-[10px] text-blue-400">600 – 1.400</div>
              </div>
              <div className="p-2 rounded bg-emerald-950/40 border border-emerald-900/50">
                <div className="font-bold text-emerald-300">Jonin / ANBU</div>
                <div className="text-[10px] text-emerald-400">1.400 – 2.800</div>
              </div>
              <div className="p-2 rounded bg-purple-950/40 border border-purple-900/50">
                <div className="font-bold text-purple-300">Kage Level</div>
                <div className="text-[10px] text-purple-400">2.800 – 6.500</div>
              </div>
              <div className="p-2 rounded bg-amber-950/40 border border-amber-900/50 col-span-2 sm:col-span-1">
                <div className="font-bold text-amber-300">God Shinobi</div>
                <div className="text-[10px] text-amber-400">6.500+</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 font-bold text-sm text-white shadow-lg transition-all"
          >
            Mengerti, Siap Roll!
          </button>
        </div>
      </div>
    </div>
  )
}
