import React from 'react'
import type { JutsuInfo } from '../../types/ninja'
import { Sparkles, Info } from 'lucide-react'
import { playClickSound } from '../../utils/audio'
import { getKekkeiGenkaiInfo } from '../../data/jutsus/kekkeiGenkai'

interface KekkeiGenkaiPillsProps {
  hasDrawnPhase1: boolean
  drawnCombos: string[]
  onInspectJutsu: (jutsu: JutsuInfo) => void
}

export const KekkeiGenkaiPills: React.FC<KekkeiGenkaiPillsProps> = ({
  hasDrawnPhase1,
  drawnCombos,
  onInspectJutsu
}) => {
  if (!hasDrawnPhase1 || drawnCombos.length === 0) return null

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-950 to-amber-950/30 border border-amber-600/50 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300 block">
          ★ Kekkei Genkai Terbuka (Kombinasi Darah / Warisan Bijuu)
        </span>
        <span className="text-[10px] text-amber-400/90 flex items-center gap-1 font-semibold">
          <Info className="w-3 h-3" /> Klik untuk analisis garis keturunan
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {drawnCombos.map((kg) => (
          <button
            key={kg}
            type="button"
            onClick={() => {
              playClickSound()
              onInspectJutsu(getKekkeiGenkaiInfo(kg))
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-900/60 hover:bg-amber-800/80 border border-amber-500/60 hover:border-amber-400 text-amber-100 text-xs font-bold flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-md group"
            title="Klik untuk melihat detail jurus & rahasia Kekkei Genkai"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>{kg}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-500/50 text-amber-300 font-mono font-semibold ml-0.5">
              +350 PTS
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
