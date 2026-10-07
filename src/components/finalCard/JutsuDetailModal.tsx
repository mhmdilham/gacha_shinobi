import React from 'react'
import type { JutsuInfo, DetailModalItem } from '../../types/ninja'
import { X } from 'lucide-react'

interface JutsuDetailModalProps {
  jutsu?: JutsuInfo | null
  item?: DetailModalItem | JutsuInfo | null
  onClose: () => void
}

export const JutsuDetailModal: React.FC<JutsuDetailModalProps> = ({ jutsu, item, onClose }) => {
  const data = item || jutsu
  if (!data) return null

  const getTierBadgeStyle = (tier?: string) => {
    if (!tier) return 'bg-slate-800 text-slate-300 border-slate-700'
    const t = tier.toUpperCase()
    if (t.includes('KINJUTSU') || t.includes('TERLARANG')) {
      return 'bg-rose-950 text-rose-300 border-rose-600'
    }
    if (t.includes('GOD') || t.includes('TIER 0') || t.includes('MYTHIC') || t.includes('S-RANK') || t.includes('AVATAR')) {
      return 'bg-amber-950 text-amber-300 border-amber-500'
    }
    if (t.includes('A-RANK') || t.includes('LEGENDARY') || t.includes('EPIC')) {
      return 'bg-purple-950 text-purple-300 border-purple-500'
    }
    if (t.includes('B-RANK') || t.includes('RARE')) {
      return 'bg-sky-950 text-sky-300 border-sky-600'
    }
    if (t.includes('STANDAR') || t.includes('COMMON')) {
      return 'bg-slate-800 text-slate-400 border-slate-700'
    }
    return 'bg-emerald-950 text-emerald-300 border-emerald-600'
  }

  const categoryLabel =
    ('category' in data && data.category) ||
    (data.tier === 'Kinjutsu' ? '💀 JURUS TERLARANG' : `JUTSU ${data.tier?.toUpperCase() || 'INFO'}`)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 shadow-2xl text-slate-200">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`shrink-0 whitespace-nowrap text-[10px] font-black px-2.5 py-0.5 rounded-md border uppercase tracking-wider ${getTierBadgeStyle(
                  data.tier
                )}`}
              >
                {categoryLabel}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                +{data.pts.toLocaleString()} Power PTS
              </span>
            </div>
            <h3 className="text-xl font-black font-['Cinzel'] text-slate-100 mt-1 flex items-center gap-2">
              {'icon' in data && data.icon && <span className="text-2xl">{data.icon}</span>}
              <span>{data.name}</span>
            </h3>
            {data.kanji && <span className="text-xs font-serif text-slate-400">{data.kanji}</span>}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="space-y-3.5 my-4 text-xs">
          {/* Power Classification */}
          {data.powerTierDesc && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                Tingkat Kekuatan & Klasifikasi:
              </span>
              <p className="font-bold text-amber-300 text-sm">
                {data.powerTierDesc}
              </p>
            </div>
          )}

          {/* Famous User */}
          {data.famousUser && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                Karakter Terkenal di Anime/Manga:
              </span>
              <p className="font-semibold text-sky-300 text-xs">
                {data.famousUser}
              </p>
            </div>
          )}

          {/* Description */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
              {'category' in data && data.category === 'Afinitas Cakra'
                ? 'Analisis Sifat Cakra:'
                : 'category' in data && data.category === 'Status Bijuu'
                ? 'Karakteristik Wadah Monster:'
                : 'category' in data && data.category?.includes('Silsilah')
                ? 'Latar Belakang & Ciri Khas Klan:'
                : 'category' in data && data.category?.includes('Sinergi')
                ? 'Analisis Sinergi Genetik:'
                : 'Analisis Kemampuan Tempur:'}
            </span>
            <p className="text-slate-300 text-xs leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Extra Notes */}
          {'extraNotes' in data && data.extraNotes && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25">
              <span className="text-[10px] uppercase font-bold text-amber-300 block mb-0.5">
                Catatan Khusus:
              </span>
              <p className="text-amber-200/90 text-xs leading-relaxed">
                {data.extraNotes}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Tutup Analisis
          </button>
        </div>
      </div>
    </div>
  )
}
