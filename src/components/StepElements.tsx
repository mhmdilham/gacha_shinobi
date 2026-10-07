import React, { useState } from 'react'
import type { ClanInfo, ElementType, DetailModalItem } from '../types/ninja'
import { rollElements } from '../utils/engine/elementBijuuEngine'
import { ELEMENTS_LIST } from '../data/elements'
import { playClickSound, playRollTick, playFanfare, playThunder } from '../utils/audio'
import confetti from 'canvas-confetti'
import { Flame, Sparkles, ArrowRight, Dices } from 'lucide-react'
import { ElementPaperCard } from './elements/ElementPaperCard'
import { ElementResultGrid } from './elements/ElementResultGrid'
import { JutsuDetailModal } from './finalCard/JutsuDetailModal'

interface StepElementsProps {
  fatherClan: ClanInfo
  motherClan: ClanInfo
  onComplete: (elements: ElementType[]) => void
}

export const StepElements: React.FC<StepElementsProps> = ({
  fatherClan,
  motherClan,
  onComplete
}) => {
  const [hasDrawn, setHasDrawn] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [cycleIndex, setCycleIndex] = useState(0)
  const [drawnElements, setDrawnElements] = useState<ElementType[]>([])
  const [inspectedItem, setInspectedItem] = useState<DetailModalItem | null>(null)

  const handleDraw = () => {
    if (isSpinning || hasDrawn) return
    playClickSound()
    setIsSpinning(true)

    const rolled = rollElements(fatherClan, motherClan)

    let ticks = 0
    const maxTicks = 22

    const interval = setInterval(() => {
      ticks++
      setCycleIndex((prev) => (prev + 1) % ELEMENTS_LIST.length)
      playRollTick()

      if (ticks >= maxTicks) {
        clearInterval(interval)
        setDrawnElements(rolled)
        setIsSpinning(false)
        setHasDrawn(true)

        if (rolled.length >= 3 || rolled.includes('Onmyoton (Yin-Yang)')) {
          playThunder()
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#a855f7', '#3b82f6', '#ef4444', '#fbbf24']
          })
        } else {
          playFanfare()
          confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#10b981', '#fbbf24']
          })
        }
      }
    }, 85)
  }

  const currentCyclingElement = ELEMENTS_LIST[cycleIndex]

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative">
      {/* Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-800/60 text-orange-300 text-xs font-semibold tracking-wider uppercase">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          Tahap 4: Afinitas Transformasi Alam
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100 font-['Cinzel'] tracking-wide">
          {!hasDrawn && !isSpinning
            ? 'Uji Kertas Induksi Cakra'
            : isSpinning
            ? 'Kertas Cakra Sedang Bereaksi...'
            : 'Afinitas Elemen Terkuak!'}
        </h2>
      </div>

      {/* Main Content Area */}
      <div className="space-y-4 my-6">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Afinitas Elemen Dasar
          </span>
          {hasDrawn && (
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-600/60 text-amber-300 font-bold">
              {drawnElements.length} Elemen Dikuasai
            </span>
          )}
        </div>

        {/* Paper visual state */}
        <ElementPaperCard
          hasDrawn={hasDrawn}
          isSpinning={isSpinning}
          currentCyclingElement={currentCyclingElement}
        />

        {/* Revealed Elements Grid */}
        {hasDrawn && (
          <ElementResultGrid
            elements={drawnElements}
            onInspectElement={(item) => setInspectedItem(item)}
          />
        )}
      </div>

      {/* Action Button */}
      {!hasDrawn ? (
        <div className="pt-2">
          <button
            onClick={handleDraw}
            disabled={isSpinning}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black text-base tracking-wider uppercase font-['Cinzel'] shadow-xl shadow-orange-950/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 border border-orange-500/40 disabled:opacity-50 cursor-pointer"
          >
            <Dices className="w-5 h-5 text-amber-200" />
            <span>{isSpinning ? 'MEMERIKSA REAKSI KERTAS...' : 'UJI AFINITAS ELEMEN (DRAW)'}</span>
          </button>
        </div>
      ) : (
        <div className="pt-2 animate-fade-in">
          <button
            onClick={() => {
              playClickSound()
              onComplete(drawnElements)
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-base tracking-wider uppercase font-['Cinzel'] shadow-xl shadow-red-950/60 transition-all flex items-center justify-center gap-3 border border-red-500/40 cursor-pointer"
          >
            <span>Lanjut: Penentuan Wadah Bijuu (Tahap 5)</span>
            <ArrowRight className="w-5 h-5 text-amber-200" />
          </button>
        </div>
      )}

      {/* Inspect Modal */}
      {inspectedItem && (
        <JutsuDetailModal
          item={inspectedItem}
          onClose={() => setInspectedItem(null)}
        />
      )}
    </div>
  )
}
