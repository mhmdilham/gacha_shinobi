import React from 'react'
import type { JutsuInfo } from '../../types/ninja'
import { Info, Sparkles } from 'lucide-react'
import { playClickSound } from '../../utils/audio'

interface CyclingTierInfo {
  tier: string
  label: string
  color: string
  border: string
  previewName: string
}

interface SignatureJutsuGridProps {
  hasDrawnPhase1: boolean
  drawnSignatures: JutsuInfo[]
  onInspectJutsu: (jutsu: JutsuInfo) => void
  isSpinning?: boolean
  currentCyclingTier?: CyclingTierInfo
}

export const SignatureJutsuGrid: React.FC<SignatureJutsuGridProps> = ({
  hasDrawnPhase1,
  drawnSignatures,
  onInspectJutsu,
  isSpinning = false,
  currentCyclingTier
}) => {
  return (
    <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 block flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            ★ Jutsu Signature & Spesialisasi Utama (Fase 1)
          </span>
          <span className="text-[11px] text-slate-400">
            Jurus pemungkas rahasia yang menjadi kartu truf tempur shinobi
          </span>
        </div>
        {hasDrawnPhase1 && (
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-600/60 text-amber-300 font-bold">
            {drawnSignatures.length} Jurus Terbuka
          </span>
        )}
      </div>

      {!hasDrawnPhase1 && !isSpinning ? (
        <div className="p-8 rounded-xl border border-dashed border-slate-800 bg-slate-900/30 text-center">
          <span className="text-3xl block mb-2">🎴</span>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Gulungan Jutsu Signature Belum Ditarik
          </p>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Membuka jurus terkuat dari silsilah darah, elemen alam, atau dojutsu
          </span>
        </div>
      ) : isSpinning && currentCyclingTier ? (
        <div
          className="p-6 rounded-xl border-2 transition-all flex flex-col items-center justify-center text-center bg-slate-900/90 shadow-2xl animate-pulse"
          style={{
            borderColor: currentCyclingTier.color,
            boxShadow: `0 0 25px ${currentCyclingTier.color}33`
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] font-black px-2.5 py-0.5 rounded border uppercase tracking-wider bg-black/60"
              style={{ color: currentCyclingTier.color, borderColor: currentCyclingTier.color }}
            >
              {currentCyclingTier.label}
            </span>
            <span className="text-[10px] text-slate-400 font-mono animate-bounce">
              MEMBUKA SEGEL...
            </span>
          </div>
          <h4
            className="text-lg sm:text-xl font-black font-['Cinzel'] tracking-wide"
            style={{ color: currentCyclingTier.color }}
          >
            {currentCyclingTier.previewName}
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Menelusuri jurus pamungkas yang selaras dengan garis keturunan dan cakra...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
          {drawnSignatures.map((j) => (
            <div
              key={j.name}
              onClick={() => {
                playClickSound()
                onInspectJutsu(j)
              }}
              className="p-4 rounded-xl border border-slate-800 hover:border-amber-500/50 bg-slate-900/70 hover:bg-slate-900/95 transition-all flex flex-col justify-between cursor-pointer group shadow-sm hover:shadow-amber-950/30 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <div>
                <div className="flex items-start justify-between gap-2.5 mb-1.5">
                  <h5 className="font-bold text-sm text-slate-100 flex-1 min-w-0 leading-snug group-hover:text-amber-300 transition-colors">
                    {j.name}
                  </h5>
                  <span
                    className={`shrink-0 whitespace-nowrap text-[10px] font-black px-2.5 py-0.5 rounded-md border tracking-wider uppercase ${
                      j.tier === 'Kinjutsu'
                        ? 'bg-rose-950/90 text-rose-300 border-rose-600 shadow-[0_0_8px_rgba(244,63,94,0.4)]'
                        : j.tier === 'S-Rank'
                        ? 'bg-amber-950/90 text-amber-300 border-amber-600 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                        : j.tier === 'A-Rank'
                        ? 'bg-purple-950/90 text-purple-300 border-purple-600'
                        : 'bg-sky-950/90 text-sky-300 border-sky-600'
                    }`}
                  >
                    {j.tier === 'Kinjutsu' ? '💀 KINJUTSU' : j.tier.toUpperCase()}
                  </span>
                </div>
                <span className="text-xs font-serif text-slate-400 block mb-1">{j.kanji}</span>
                {j.powerTierDesc && (
                  <span className="inline-block text-[10px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                    ⚡ {j.powerTierDesc}
                  </span>
                )}
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                <span className="flex items-center gap-1 group-hover:text-amber-300/80 transition-colors">
                  <Info className="w-3 h-3" /> Klik untuk Detail
                </span>
                <strong className="text-emerald-400 font-bold font-mono">+{j.pts} Pts</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
