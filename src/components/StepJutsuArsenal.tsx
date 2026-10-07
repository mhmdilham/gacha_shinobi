import React, { useState } from 'react'
import type {
  ClanInfo,
  DojutsuType,
  ElementType,
  BijuuType,
  JutsuInfo,
  DetailModalItem
} from '../types/ninja'
import { evaluateJutsusAndCombos, rollTacticalJutsus } from '../utils/engine/jutsuEngine'
import { playClickSound, playRollTick, playThunder, playFanfare } from '../utils/audio'
import confetti from 'canvas-confetti'
import { Scroll, Dices, Swords, ArrowRight, CheckCircle2 } from 'lucide-react'
import { KekkeiGenkaiPills } from './modeJutsu/KekkeiGenkaiPills'
import { SignatureJutsuGrid } from './modeJutsu/SignatureJutsuGrid'
import { TacticalJutsuGrid } from './modeJutsu/TacticalJutsuGrid'
import { JutsuDetailModal } from './finalCard/JutsuDetailModal'

interface StepJutsuArsenalProps {
  fatherClan: ClanInfo
  motherClan: ClanInfo
  elements: ElementType[]
  dojutsu: DojutsuType
  bijuu?: BijuuType
  onComplete: (
    signatureJutsus: JutsuInfo[],
    tacticalJutsus: JutsuInfo[],
    extraKekkeiGenkai: string[]
  ) => void
}

const JUTSU_TIER_ANIM_ROSTER = [
  { tier: 'Kinjutsu', label: '💀 JURUS TERLARANG', color: '#f43f5e', border: 'border-rose-500', previewName: 'Membuka Segel Kinjutsu Kuno...' },
  { tier: 'S-Rank', label: '★ JURUS TINGKAT S', color: '#fbbf24', border: 'border-amber-500', previewName: 'Membangkitkan Jurus Pemungkas S-Rank...' },
  { tier: 'A-Rank', label: '⚡ JURUS TINGKAT A', color: '#c084fc', border: 'border-purple-500', previewName: 'Membaca Segel Ninjutsu Elit A-Rank...' },
  { tier: 'B-Rank', label: '🛡️ JURUS TINGKAT B', color: '#38bdf8', border: 'border-sky-500', previewName: 'Menyusun Teknik Utama B-Rank...' }
]

const TACTICAL_ANIM_ROSTER = [
  { icon: '🛡️', title: 'Formasi Pertahanan Mutlak', desc: 'Dinding cakra tanah & perisai elemen penahan serangan musuh' },
  { icon: '💨', title: 'Gerak Cepat Shunshin no Jutsu', desc: 'Mobilitas kilat berkecepatan tinggi berpindah posisi tempur' },
  { icon: '🎯', title: 'Taktik Jebakan & Sensor Lingkungan', desc: 'Deteksi aliran cakra musuh dan penanaman segel ledak' },
  { icon: '🗡️', title: 'Serangan Pendukung Shurikenjutsu', desc: 'Hujan senjata berbalut cakra untuk memecah formasi lawan' },
  { icon: '🧱', title: 'Manipulasi Medan Tempur', desc: 'Mengubah struktur tanah, air, atau kabut untuk keuntungan taktis' }
]

export const StepJutsuArsenal: React.FC<StepJutsuArsenalProps> = ({
  fatherClan,
  motherClan,
  elements,
  dojutsu,
  bijuu,
  onComplete
}) => {
  const [inspectedItem, setInspectedItem] = useState<DetailModalItem | JutsuInfo | null>(null)

  // Phase 1: Jutsu Signature & Kekkei Genkai
  const [hasDrawnPhase1, setHasDrawnPhase1] = useState(false)
  const [isRevealingPhase1, setIsRevealingPhase1] = useState(false)
  const [drawnSignatures, setDrawnSignatures] = useState<JutsuInfo[]>([])
  const [drawnCombos, setDrawnCombos] = useState<string[]>([])
  const [cycleTierIndex, setCycleTierIndex] = useState(0)

  // Phase 2: Tactical & Support Jutsus (Synergized)
  const [hasDrawnPhase2, setHasDrawnPhase2] = useState(false)
  const [isRevealingPhase2, setIsRevealingPhase2] = useState(false)
  const [drawnTacticals, setDrawnTacticals] = useState<JutsuInfo[]>([])
  const [cycleTacticalIndex, setCycleTacticalIndex] = useState(0)

  // FASE 1: DRAW JUTSU SIGNATURE & KEKKEI GENKAI
  const handleDrawPhase1 = () => {
    if (isRevealingPhase1 || hasDrawnPhase1) return
    playClickSound()
    setIsRevealingPhase1(true)

    const { extraKekkeiGenkai, signatureJutsus } = evaluateJutsusAndCombos(
      fatherClan,
      motherClan,
      elements,
      dojutsu,
      bijuu
    )

    let ticks = 0
    const maxTicks = 20

    const interval = setInterval(() => {
      ticks++
      setCycleTierIndex((prev) => (prev + 1) % JUTSU_TIER_ANIM_ROSTER.length)
      playRollTick()

      if (ticks >= maxTicks) {
        clearInterval(interval)
        setDrawnSignatures(signatureJutsus)
        setDrawnCombos(extraKekkeiGenkai)
        setIsRevealingPhase1(false)
        setHasDrawnPhase1(true)

        const hasKinjutsuOrSRank = signatureJutsus.some(
          (j) => j.tier === 'Kinjutsu' || j.tier === 'S-Rank'
        )

        if (hasKinjutsuOrSRank) {
          playThunder()
          confetti({
            particleCount: 85,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#ef4444', '#fbbf24', '#c084fc', '#10b981']
          })
        } else {
          playFanfare()
        }
      }
    }, 85)
  }

  // FASE 2: DRAW JUTSU TAKTIS LAPANGAN (BERSINERGI DENGAN SIGNATURE)
  const handleDrawPhase2 = () => {
    if (isRevealingPhase2 || hasDrawnPhase2 || !hasDrawnPhase1) return
    playClickSound()
    setIsRevealingPhase2(true)

    const synergizedTacticals = rollTacticalJutsus(
      fatherClan,
      motherClan,
      elements,
      dojutsu,
      drawnSignatures
    )

    let ticks = 0
    const maxTicks = 18

    const interval = setInterval(() => {
      ticks++
      setCycleTacticalIndex((prev) => (prev + 1) % TACTICAL_ANIM_ROSTER.length)
      playRollTick()

      if (ticks >= maxTicks) {
        clearInterval(interval)
        setDrawnTacticals(synergizedTacticals)
        setIsRevealingPhase2(false)
        setHasDrawnPhase2(true)
        playFanfare()
      }
    }, 85)
  }

  const currentCyclingTier = JUTSU_TIER_ANIM_ROSTER[cycleTierIndex]
  const currentCyclingTactical = TACTICAL_ANIM_ROSTER[cycleTacticalIndex]

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Scroll className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-black font-['Cinzel'] tracking-wide text-amber-300">
            Tahap 7: Arsenal Jutsu (Signature & Taktis)
          </h3>
        </div>

        {/* Phase Stepper Status */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div
            className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold transition-all ${
              hasDrawnPhase1
                ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-300'
                : isRevealingPhase1
                ? 'bg-amber-950/90 border-amber-500/80 text-amber-300 ring-2 ring-amber-500/30 animate-pulse'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            {hasDrawnPhase1 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <span>1</span>}
            <span>Fase 1: Jurus Signature</span>
          </div>

          <div
            className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold transition-all ${
              hasDrawnPhase2
                ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-300'
                : isRevealingPhase2
                ? 'bg-sky-950/90 border-sky-500/80 text-sky-300 ring-2 ring-sky-500/30 animate-pulse'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            {hasDrawnPhase2 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <span>2</span>}
            <span>Fase 2: Arsenal Taktis</span>
          </div>
        </div>
      </div>

      <div className="space-y-6 my-6">
        {/* Extra Kekkei Genkai Combos if any */}
        <KekkeiGenkaiPills
          hasDrawnPhase1={hasDrawnPhase1}
          drawnCombos={drawnCombos}
          onInspectJutsu={(j) => setInspectedItem(j)}
        />

        {/* 1. Signature Jutsus List (1 - 3 Jurus Utama) */}
        <SignatureJutsuGrid
          hasDrawnPhase1={hasDrawnPhase1}
          drawnSignatures={drawnSignatures}
          onInspectJutsu={(j) => setInspectedItem(j)}
          isSpinning={isRevealingPhase1}
          currentCyclingTier={currentCyclingTier}
        />

        {/* 2. Tactical & Support Jutsus List (Fase 2) */}
        <TacticalJutsuGrid
          hasDrawnPhase1={hasDrawnPhase1}
          hasDrawnPhase2={hasDrawnPhase2}
          drawnTacticals={drawnTacticals}
          onInspectJutsu={(j) => setInspectedItem(j)}
          isSpinning={isRevealingPhase2}
          currentCyclingTactical={currentCyclingTactical}
        />
      </div>

      {/* Action / Trigger Area */}
      {!hasDrawnPhase1 ? (
        <div className="pt-2">
          <button
            onClick={handleDrawPhase1}
            disabled={isRevealingPhase1}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white font-black text-base tracking-wider uppercase font-['Cinzel'] shadow-xl shadow-emerald-950/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 border border-emerald-500/40 disabled:opacity-50 cursor-pointer"
          >
            <Dices className="w-5 h-5 text-amber-200" />
            <span>
              {isRevealingPhase1 ? 'MEMBUKA GULUNGAN JURUS SIGNATURE...' : 'FASE 1: BUKA GULUNGAN JUTSU SIGNATURE'}
            </span>
          </button>
        </div>
      ) : !hasDrawnPhase2 ? (
        <div className="pt-2 animate-fade-in">
          <button
            onClick={handleDrawPhase2}
            disabled={isRevealingPhase2}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-black text-base tracking-wider uppercase font-['Cinzel'] shadow-xl shadow-sky-950/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 border border-sky-400/50 disabled:opacity-50 cursor-pointer"
          >
            <Swords className="w-5 h-5 text-sky-200" />
            <span>
              {isRevealingPhase2 ? 'MENYUSUN TAKTIK LAPANGAN...' : 'FASE 2: BUKA ARSENAL TAKTIS LAPANGAN'}
            </span>
          </button>
        </div>
      ) : (
        <div className="pt-2 animate-fade-in">
          <button
            onClick={() => {
              playClickSound()
              onComplete(drawnSignatures, drawnTacticals, drawnCombos)
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-base tracking-wider uppercase font-['Cinzel'] shadow-xl shadow-red-950/60 transition-all flex items-center justify-center gap-3 border border-red-500/40 cursor-pointer"
          >
            <span>Kalkulasi Skor & Tampilkan Kartu Ninja (Final)</span>
            <ArrowRight className="w-5 h-5 text-amber-200" />
          </button>
        </div>
      )}

      {/* Detail Inspect Modal */}
      {inspectedItem && (
        <JutsuDetailModal
          item={inspectedItem}
          onClose={() => setInspectedItem(null)}
        />
      )}
    </div>
  )
}
