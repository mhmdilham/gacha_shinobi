import React from 'react'
import type { ElementInfo } from '../../types/ninja'
import { ELEMENT_REACTIONS } from '../../data/elements'

interface ElementPaperCardProps {
  hasDrawn: boolean
  isSpinning: boolean
  currentCyclingElement: ElementInfo
}

export const ElementPaperCard: React.FC<ElementPaperCardProps> = ({
  hasDrawn,
  isSpinning,
  currentCyclingElement
}) => {
  if (hasDrawn && !isSpinning) {
    return null
  }

  if (isSpinning) {
    return (
      <div
        className="p-8 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center relative overflow-hidden bg-slate-900/90 shadow-2xl animate-pulse"
        style={{
          borderColor: currentCyclingElement.color,
          boxShadow: `0 0 30px ${currentCyclingElement.color}40`
        }}
      >
        <div className="relative mb-4">
          <div
            className="w-24 h-32 rounded-xl border-2 flex flex-col items-center justify-center bg-slate-950/95 shadow-2xl transition-all duration-75 animate-bounce"
            style={{ borderColor: currentCyclingElement.color }}
          >
            <span className="text-4xl">{currentCyclingElement.icon}</span>
            <span
              className="text-sm font-serif font-black mt-2"
              style={{ color: currentCyclingElement.color }}
            >
              {currentCyclingElement.kanji}
            </span>
          </div>
          <div
            className="absolute -inset-2 rounded-2xl opacity-30 blur-lg animate-pulse"
            style={{ backgroundColor: currentCyclingElement.color }}
          />
        </div>

        <div className="space-y-1.5">
          <h4
            className="font-black text-base uppercase tracking-wider font-['Cinzel']"
            style={{ color: currentCyclingElement.color }}
          >
            {currentCyclingElement.shortName} ({currentCyclingElement.kanji})
          </h4>
          <p className="text-xs text-slate-300 italic max-w-sm">
            {ELEMENT_REACTIONS[currentCyclingElement.shortName] || 'Kertas bereaksi terhadap cakra...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 rounded-2xl border border-dashed border-slate-800 bg-slate-950/50 text-center flex flex-col items-center justify-center">
      <div className="w-20 h-28 rounded-xl bg-amber-50/10 border border-amber-300/30 flex flex-col items-center justify-center shadow-inner mb-3">
        <span className="text-3xl">📜</span>
        <span className="text-xs font-serif font-black text-amber-300/60 mt-1">印</span>
      </div>
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
        Kertas Induksi Cakra Belum Dialiri Energi
      </p>
      <p className="text-[11px] text-slate-600 mt-1">
        Alirkan cakra murni untuk menguji afinitas transformasi alam tubuhmu
      </p>
    </div>
  )
}
