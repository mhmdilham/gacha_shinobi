import React from 'react'
import type { SpecialModeType, DetailModalItem } from '../../types/ninja'
import { getModeMeta, getModeDetailFromMode } from '../finalCard/cardMetaHelpers'
import { Sparkles, Info } from 'lucide-react'
import { playClickSound } from '../../utils/audio'

interface CyclingModeInfo {
  name: string
  icon: string
  tag: string
  color: string
}

interface SpecialModeCardProps {
  hasDrawnPhase1: boolean
  drawnMode: SpecialModeType
  isSpinning?: boolean
  currentCyclingMode?: CyclingModeInfo
  onInspectMode?: (item: DetailModalItem) => void
}

export const SpecialModeCard: React.FC<SpecialModeCardProps> = ({
  hasDrawnPhase1,
  drawnMode,
  isSpinning = false,
  currentCyclingMode,
  onInspectMode
}) => {
  const meta = getModeMeta(drawnMode)

  return (
    <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          Mode Transformasi Khusus (Maklumat Gulungan Rahasia)
        </span>
      </div>

      {!hasDrawnPhase1 && !isSpinning ? (
        <div className="p-6 rounded-xl border border-dashed border-slate-800 bg-slate-900/30 text-center">
          <span className="text-3xl block mb-2">🥋</span>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Gulungan Mode Khusus Belum Terbuka
          </p>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Mendeteksi potensi Senjutsu, Hachimon, atau wujud cakra terlarang
          </span>
        </div>
      ) : isSpinning && currentCyclingMode ? (
        <div
          className="p-5 rounded-2xl border-2 transition-all flex items-center gap-4 bg-slate-900/90 shadow-xl animate-pulse"
          style={{
            borderColor: currentCyclingMode.color,
            boxShadow: `0 0 20px ${currentCyclingMode.color}40`
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-3xl bg-slate-950 shrink-0 animate-bounce"
            style={{ borderColor: currentCyclingMode.color }}
          >
            {currentCyclingMode.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider bg-black/60 border"
                style={{ color: currentCyclingMode.color, borderColor: currentCyclingMode.color }}
              >
                {currentCyclingMode.tag}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">MEMBACA GULUNGAN...</span>
            </div>
            <h4
              className="text-base sm:text-lg font-black font-['Cinzel'] truncate"
              style={{ color: currentCyclingMode.color }}
            >
              {currentCyclingMode.name}
            </h4>
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            if (!hasDrawnPhase1) return
            playClickSound()
            onInspectMode?.(getModeDetailFromMode(drawnMode))
          }}
          role={hasDrawnPhase1 ? 'button' : undefined}
          tabIndex={hasDrawnPhase1 ? 0 : undefined}
          title="Klik untuk melihat analisis Mode Transformasi"
          className={`p-5 rounded-2xl border transition-all animate-fade-in ${
            hasDrawnPhase1 ? 'cursor-pointer group hover:scale-[1.01] active:scale-[0.99]' : ''
          } ${
            drawnMode !== 'None'
              ? 'border-emerald-600/70 hover:border-emerald-500 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 shadow-lg shadow-emerald-950/30'
              : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{meta.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                {drawnMode !== 'None' && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-black uppercase tracking-wider ${meta.badgeClass}`}>
                    {meta.tier}
                  </span>
                )}
                {meta.pts > 0 && (
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">
                    +{meta.pts.toLocaleString()} PTS
                  </span>
                )}
              </div>
              <h4
                className={`text-lg font-black font-['Cinzel'] ${
                  drawnMode !== 'None' ? meta.titleClass : 'text-slate-300'
                }`}
              >
                {drawnMode !== 'None' ? drawnMode : 'Gaya Tempur Standar'}
              </h4>

              {/* Minimalist Hint Area (Keterangan deskripsi luar dihapus) */}
              {hasDrawnPhase1 && (
                <span className="text-[10px] text-slate-500 group-hover:text-emerald-300 flex items-center gap-1 transition-colors mt-1.5">
                  <Info className="w-3 h-3" /> Klik untuk analisis wujud transformasi
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
