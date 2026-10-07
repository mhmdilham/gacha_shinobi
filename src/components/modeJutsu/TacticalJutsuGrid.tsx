import React from 'react'
import type { JutsuInfo } from '../../types/ninja'
import { Shield, Info } from 'lucide-react'
import { playClickSound } from '../../utils/audio'

interface CyclingTacticalInfo {
  icon: string
  title: string
  desc: string
}

interface TacticalJutsuGridProps {
  hasDrawnPhase1: boolean
  hasDrawnPhase2: boolean
  drawnTacticals: JutsuInfo[]
  onInspectJutsu: (jutsu: JutsuInfo) => void
  isSpinning?: boolean
  currentCyclingTactical?: CyclingTacticalInfo
}

export const TacticalJutsuGrid: React.FC<TacticalJutsuGridProps> = ({
  hasDrawnPhase1,
  hasDrawnPhase2,
  drawnTacticals,
  onInspectJutsu,
  isSpinning = false,
  currentCyclingTactical
}) => {
  return (
    <div
      className={`p-6 rounded-2xl border transition-all ${
        hasDrawnPhase2
          ? 'bg-slate-950 border-sky-600/70 shadow-lg shadow-sky-950/30'
          : isSpinning
          ? 'bg-sky-950/30 border-sky-500/80 ring-2 ring-sky-500/30 animate-pulse'
          : hasDrawnPhase1
          ? 'bg-sky-950/20 border-sky-500/60 ring-2 ring-sky-500/20'
          : 'bg-slate-950/60 border-slate-800'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-sky-400 block flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-sky-400" />
            Arsenal Jutsu Standar & Taktis Lapangan (Fase 2)
          </span>
          <span className="text-[11px] text-slate-400">
            Teknik mobilitas, substitusi, pertahanan, atau manipulasi pendukung misi (2-3 Jurus)
          </span>
        </div>
        {hasDrawnPhase2 && (
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-950/80 border border-sky-600/60 text-sky-300 font-bold">
            {drawnTacticals.length} Jurus Taktis
          </span>
        )}
      </div>

      {!hasDrawnPhase2 && !isSpinning ? (
        <div className="p-8 rounded-xl border border-dashed border-slate-800 bg-slate-900/40 text-center">
          <span className="text-3xl block mb-2">{hasDrawnPhase1 ? '🛡️' : '🔒'}</span>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            {hasDrawnPhase1
              ? 'Siap Ditarik! Klik tombol FASE 2 di bawah untuk menyesuaikan taktik lapangan.'
              : 'Peti Taktis Terkunci (Selesaikan Fase 1 terlebih dahulu)'}
          </p>
        </div>
      ) : isSpinning && currentCyclingTactical ? (
        <div className="p-6 rounded-xl border-2 border-sky-500/80 bg-gradient-to-r from-sky-950/40 via-slate-900 to-teal-950/40 shadow-xl flex flex-col items-center justify-center text-center animate-pulse">
          <div className="w-16 h-16 rounded-2xl bg-sky-950/80 border border-sky-400/50 flex items-center justify-center text-3xl mb-2 shadow-inner animate-bounce">
            {currentCyclingTactical.icon}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider bg-sky-900/80 text-sky-300 border border-sky-500">
                MENYUSUN TAKTIK
              </span>
              <span className="text-[10px] text-sky-400 font-mono">SHUFFLING...</span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-sky-200 font-['Cinzel'] tracking-wide">
              {currentCyclingTactical.title}
            </h4>
            <p className="text-xs text-slate-300 italic">
              {currentCyclingTactical.desc}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
          {drawnTacticals.map((j) => (
            <div
              key={j.name}
              onClick={() => {
                playClickSound()
                onInspectJutsu(j)
              }}
              className="p-4 rounded-xl border border-sky-800/70 hover:border-sky-500 bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-950 hover:bg-slate-900/90 flex flex-col justify-between shadow-md transition-all cursor-pointer group transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <div>
                <div className="flex items-start justify-between gap-2.5 mb-1.5">
                  <h5 className="font-bold text-sm text-slate-100 flex-1 min-w-0 leading-snug group-hover:text-sky-300 transition-colors">
                    {j.name}
                  </h5>
                  <span className="shrink-0 whitespace-nowrap text-[9px] font-black px-2 py-0.5 rounded-md bg-sky-900/90 text-sky-200 border border-sky-500 uppercase tracking-wider">
                    🛡️ TAKTIKAL
                  </span>
                </div>
                <span className="text-xs font-serif text-slate-400 block mb-1">{j.kanji}</span>
                {j.powerTierDesc && (
                  <span className="inline-block text-[10px] text-sky-300 font-bold bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">
                    🎯 {j.powerTierDesc}
                  </span>
                )}
              </div>
              <div className="mt-3 pt-2 border-t border-sky-900/60 flex justify-between items-center text-[11px] text-slate-400">
                <span className="flex items-center gap-1 group-hover:text-sky-300/80 transition-colors">
                  <Info className="w-3 h-3" /> Klik untuk Detail
                </span>
                <strong className="text-emerald-400 font-mono font-bold">+{j.pts} Pts</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
