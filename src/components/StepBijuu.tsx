import React, { useState } from 'react'
import type {
  ClanInfo,
  DojutsuType,
  ElementType,
  BijuuType,
  BijuuMasteryType,
  DetailModalItem
} from '../types/ninja'
import { rollBijuu, evaluateBijuuMasteryAndGift } from '../utils/engine/elementBijuuEngine'
import { playClickSound, playRollTick, playBijuuRoar, playThunder, playFanfare } from '../utils/audio'
import confetti from 'canvas-confetti'
import { ShieldAlert, ArrowRight, Dices } from 'lucide-react'
import { BijuuWheelCard } from './bijuu/BijuuWheelCard'
import { BIJUU_ANIM_ROSTER } from '../data/bijuu'
import { JutsuDetailModal } from './finalCard/JutsuDetailModal'

interface StepBijuuProps {
  fatherClan: ClanInfo
  motherClan: ClanInfo
  elements: ElementType[]
  dojutsu: DojutsuType
  reincarnation: 'None' | 'Asura' | 'Indra' | 'Indra + Asura'
  onComplete: (bijuu: BijuuType) => void
}

export const StepBijuu: React.FC<StepBijuuProps> = ({
  fatherClan,
  motherClan,
  elements,
  dojutsu,
  reincarnation,
  onComplete
}) => {
  const [hasDrawn, setHasDrawn] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [cycleIndex, setCycleIndex] = useState(0)

  const [drawnBijuu, setDrawnBijuu] = useState<BijuuType>('Bukan Jinchuriki')
  const [bijuuMastery, setBijuuMastery] = useState<BijuuMasteryType>('None')
  const [bijuuGift, setBijuuGift] = useState<string | undefined>()
  const [bijuuDominanceBonus, setBijuuDominanceBonus] = useState(0)
  const [inspectedItem, setInspectedItem] = useState<DetailModalItem | null>(null)

  const handleDraw = () => {
    if (isSpinning || hasDrawn) return
    playClickSound()
    setIsSpinning(true)

    const rolled = rollBijuu(
      dojutsu,
      reincarnation,
      fatherClan,
      motherClan,
      elements
    )

    const masteryResult = evaluateBijuuMasteryAndGift(
      rolled,
      dojutsu,
      fatherClan,
      motherClan,
      [],
      elements
    )

    let ticks = 0
    const maxTicks = 24

    const interval = setInterval(() => {
      ticks++
      setCycleIndex((prev) => (prev + 1) % BIJUU_ANIM_ROSTER.length)
      playRollTick()

      if (ticks >= maxTicks) {
        clearInterval(interval)
        setDrawnBijuu(rolled)
        setBijuuMastery(masteryResult.bijuuMastery)
        setBijuuGift(masteryResult.bijuuGift)
        setBijuuDominanceBonus(masteryResult.bijuuDominanceBonus)
        setIsSpinning(false)
        setHasDrawn(true)

        if (rolled !== 'Bukan Jinchuriki') {
          playBijuuRoar()
          if (
            rolled.includes('Kurama') ||
            rolled.includes('Kyubi') ||
            rolled.includes('Juubi') ||
            rolled.includes('Gyuki')
          ) {
            playThunder()
            confetti({
              particleCount: 90,
              spread: 75,
              origin: { y: 0.6 },
              colors: ['#ef4444', '#f59e0b', '#dc2626', '#fbbf24']
            })
          } else {
            playFanfare()
            confetti({
              particleCount: 60,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#f59e0b', '#fbbf24', '#eab308']
            })
          }
        } else {
          playFanfare()
        }
      }
    }, 85)
  }

  const currentCyclingBijuu = BIJUU_ANIM_ROSTER[cycleIndex]

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative">
      {/* Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-300 text-xs font-semibold tracking-wider uppercase">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          Tahap 5: Wadah Monster Berekor (Bijuu)
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100 font-['Cinzel'] tracking-wide">
          {!hasDrawn && !isSpinning
            ? 'Uji Takdir Wadah Bijuu'
            : isSpinning
            ? 'Pusaran Cakra Berekor Beresonansi...'
            : 'Status Wadah Ditetapkan!'}
        </h2>
      </div>

      {/* Main Wheel Card */}
      <div className="my-6">
        <BijuuWheelCard
          hasDrawn={hasDrawn}
          isSpinning={isSpinning}
          currentCyclingBijuu={currentCyclingBijuu}
          drawnBijuu={drawnBijuu}
          bijuuMastery={bijuuMastery}
          bijuuDominanceBonus={bijuuDominanceBonus}
          bijuuGift={bijuuGift}
          onInspectBijuu={(item) => setInspectedItem(item)}
        />
      </div>

      {/* Action Button */}
      {!hasDrawn ? (
        <div className="pt-2">
          <button
            onClick={handleDraw}
            disabled={isSpinning}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-black text-base tracking-wider uppercase font-['Cinzel'] shadow-xl shadow-amber-950/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 border border-amber-500/40 disabled:opacity-50 cursor-pointer"
          >
            <Dices className="w-5 h-5 text-amber-200" />
            <span>{isSpinning ? 'MEMUTAR SEGEL WADAH...' : 'UJI WADAH BIJUU (DRAW)'}</span>
          </button>
        </div>
      ) : (
        <div className="pt-2 animate-fade-in">
          <button
            onClick={() => {
              playClickSound()
              onComplete(drawnBijuu)
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-base tracking-wider uppercase font-['Cinzel'] shadow-xl shadow-red-950/60 transition-all flex items-center justify-center gap-3 border border-red-500/40 cursor-pointer"
          >
            <span>Lanjut: Roll Mode Transformasi (Tahap 6)</span>
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
