import React, { useState } from 'react'
import type {
  ElementType,
  DojutsuType,
  BijuuType,
  SpecialModeType,
  DetailModalItem
} from '../types/ninja'
import { rollSpecialMode } from '../utils/engine/elementBijuuEngine'
import { playClickSound, playRollTick, playThunder, playFanfare } from '../utils/audio'
import confetti from 'canvas-confetti'
import { Sparkles, ArrowRight, Dices } from 'lucide-react'
import { SpecialModeCard } from './modeJutsu/SpecialModeCard'
import { JutsuDetailModal } from './finalCard/JutsuDetailModal'

const MODE_ANIM_ROSTER = [
  { name: 'Sage Mode — Katak Myoboku', icon: '🐸', tag: 'SENJUTSU', color: '#10b981' },
  { name: 'Sage Mode — Ular Ryuchi', icon: '🐍', tag: 'SENJUTSU', color: '#a855f7' },
  { name: 'Sage Mode — Siput Shikkotsu', icon: '🐌', tag: 'SENJUTSU', color: '#06b6d4' },
  { name: 'Hachimon Tonkou (Gerbang Kematian)', icon: '💥', tag: 'TAIJUTSU', color: '#ef4444' },
  { name: 'Segel Kutukan Orochimaru', icon: '⚡', tag: 'JUINJUTSU', color: '#f59e0b' },
  { name: 'Bijuu Chakra Mode (KCM)', icon: '🦊', tag: 'CHAKRA CLOAK', color: '#eab308' },
  { name: 'Six Paths Sage Mode (SPSM)', icon: '✨', tag: 'RIKUDO', color: '#fbbf24' },
  { name: 'Gaya Tempur Standar', icon: '🥋', tag: 'TAIJUTSU MURNI', color: '#94a3b8' }
]

interface StepSpecialModeProps {
  elements: ElementType[]
  dojutsu: DojutsuType
  bijuu?: BijuuType
  reincarnation: 'None' | 'Asura' | 'Indra' | 'Indra + Asura'
  onComplete: (mode: SpecialModeType) => void
}

export const StepSpecialMode: React.FC<StepSpecialModeProps> = ({
  elements,
  dojutsu,
  bijuu,
  reincarnation,
  onComplete
}) => {
  const [hasDrawn, setHasDrawn] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [cycleIndex, setCycleIndex] = useState(0)
  const [drawnMode, setDrawnMode] = useState<SpecialModeType>('None')
  const [inspectedItem, setInspectedItem] = useState<DetailModalItem | null>(null)

  const handleDraw = () => {
    if (isSpinning || hasDrawn) return
    playClickSound()
    setIsSpinning(true)

    const rolledMode = rollSpecialMode(elements, dojutsu, bijuu, reincarnation)

    let ticks = 0
    const maxTicks = 22

    const interval = setInterval(() => {
      ticks++
      setCycleIndex((prev) => (prev + 1) % MODE_ANIM_ROSTER.length)
      playRollTick()

      if (ticks >= maxTicks) {
        clearInterval(interval)
        setDrawnMode(rolledMode)
        setIsSpinning(false)
        setHasDrawn(true)

        const isGodlyMode =
          rolledMode.includes('Six Paths') ||
          rolledMode.includes('Hachimon') ||
          rolledMode.includes('Bijuu Chakra') ||
          rolledMode.includes('Sage Mode')

        if (isGodlyMode) {
          playThunder()
          confetti({
            particleCount: 85,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#10b981', '#fbbf24', '#ef4444', '#a855f7']
          })
        } else {
          playFanfare()
        }
      }
    }, 85)
  }

  const currentCyclingMode = MODE_ANIM_ROSTER[cycleIndex]

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative">
      {/* Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Tahap 6: Mode Transformasi & Khusus
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100 font-['Cinzel'] tracking-wide">
          {!hasDrawn && !isSpinning
            ? 'Uji Wujud Tempur Spesial'
            : isSpinning
            ? 'Menyelaraskan Energi Alam & Fisik...'
            : 'Mode Transformasi Terkuak!'}
        </h2>
      </div>

      {/* Special Mode Card */}
      <div className="my-6">
        <SpecialModeCard
          hasDrawnPhase1={hasDrawn}
          drawnMode={drawnMode}
          isSpinning={isSpinning}
          currentCyclingMode={currentCyclingMode}
          onInspectMode={(item) => setInspectedItem(item)}
        />
      </div>

      {/* Action Button */}
      {!hasDrawn ? (
        <div className="pt-2">
          <button
            onClick={handleDraw}
            disabled={isSpinning}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white font-black text-base tracking-wider uppercase font-['Cinzel'] shadow-xl shadow-emerald-950/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 border border-emerald-500/40 disabled:opacity-50 cursor-pointer"
          >
            <Dices className="w-5 h-5 text-amber-200" />
            <span>{isSpinning ? 'MEMBUKA GULUNGAN KHUSUS...' : 'BANGKITKAN MODE KHUSUS (DRAW)'}</span>
          </button>
        </div>
      ) : (
        <div className="pt-2 animate-fade-in">
          <button
            onClick={() => {
              playClickSound()
              onComplete(drawnMode)
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-base tracking-wider uppercase font-['Cinzel'] shadow-xl shadow-red-950/60 transition-all flex items-center justify-center gap-3 border border-red-500/40 cursor-pointer"
          >
            <span>Lanjut: Racik Arsenal Jutsu (Tahap 7)</span>
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
