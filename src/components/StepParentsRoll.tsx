import React, { useState } from 'react'
import type { ClanInfo, DetailModalItem } from '../types/ninja'
import { CLAN_POOL } from '../data/ninjaData'
import { rollSingleClan, rollReincarnation } from '../utils/gachaEngine'
import { playRollTick, playThunder, playClickSound } from '../utils/audio'
import confetti from 'canvas-confetti'
import { Zap, Sparkles, ArrowRight, Dices, Info } from 'lucide-react'
import { JutsuDetailModal } from './finalCard/JutsuDetailModal'
import { getClanDetailFromClan } from './finalCard/cardMetaHelpers'

interface StepParentsRollProps {
  onComplete: (
    fatherClan: ClanInfo,
    motherClan: ClanInfo,
    reincarnation: 'None' | 'Asura' | 'Indra' | 'Indra + Asura'
  ) => void
}

export const StepParentsRoll: React.FC<StepParentsRollProps> = ({ onComplete }) => {
  const [hasDrawn, setHasDrawn] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [fatherDisplay, setFatherDisplay] = useState<ClanInfo | null>(null)
  const [motherDisplay, setMotherDisplay] = useState<ClanInfo | null>(null)
  const [hasTriggeredFlash, setHasTriggeredFlash] = useState(false)
  const [inspectedClan, setInspectedClan] = useState<DetailModalItem | null>(null)

  // Stored results from the real draw click
  const [drawnFather, setDrawnFather] = useState<ClanInfo | null>(null)
  const [drawnMother, setDrawnMother] = useState<ClanInfo | null>(null)
  const [drawnReincarnation, setDrawnReincarnation] = useState<'None' | 'Asura' | 'Indra' | 'Indra + Asura'>('None')

  const handleDraw = () => {
    if (isSpinning || hasDrawn) return
    playClickSound()
    setIsSpinning(true)

    // ACTUAL ON-DEMAND ROLL HAPPENS RIGHT HERE AT THE CLICK MOMENT!
    const rolledFather = rollSingleClan()
    const rolledMother = rollSingleClan()
    const rolledReincarnation = rollReincarnation()

    let tickCount = 0
    const maxTicks = 25

    const interval = setInterval(() => {
      tickCount++
      setFatherDisplay(CLAN_POOL[Math.floor(Math.random() * CLAN_POOL.length)])
      setMotherDisplay(CLAN_POOL[Math.floor(Math.random() * CLAN_POOL.length)])
      playRollTick()

      if (tickCount >= maxTicks) {
        clearInterval(interval)
        setFatherDisplay(rolledFather)
        setMotherDisplay(rolledMother)
        setDrawnFather(rolledFather)
        setDrawnMother(rolledMother)
        setDrawnReincarnation(rolledReincarnation)
        setIsSpinning(false)
        setHasDrawn(true)

        // Check Epic/Mythic trigger for lightning & sfx
        const isEpicOrMythic =
          rolledFather.rarity === 'Epic' ||
          rolledFather.rarity === 'Mythic' ||
          rolledMother.rarity === 'Epic' ||
          rolledMother.rarity === 'Mythic'

        if (isEpicOrMythic) {
          setHasTriggeredFlash(true)
          playThunder()
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#fbbf24', '#dc2626', '#c084fc', '#3b82f6']
          })
        }
      }
    }, 90)
  }

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'Mythic':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-amber-500/30'
      case 'Epic':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/60 shadow-purple-500/30'
      case 'Rare':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/60 shadow-sky-500/30'
      default:
        return 'bg-slate-700/30 text-slate-400 border-slate-700'
    }
  }

  const isHighTier =
    hasDrawn &&
    drawnFather &&
    drawnMother &&
    (drawnFather.rarity === 'Epic' ||
      drawnFather.rarity === 'Mythic' ||
      drawnMother.rarity === 'Epic' ||
      drawnMother.rarity === 'Mythic')

  return (
    <div
      className={`w-full max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden transition-all duration-300 ${
        hasTriggeredFlash ? 'ring-2 ring-amber-500/50' : ''
      }`}
    >
      {/* Lightning Flash Overlay on Epic/Mythic finish */}
      {hasTriggeredFlash && (
        <div className="absolute inset-0 bg-amber-400/10 pointer-events-none animate-pulse" />
      )}

      {/* Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold tracking-wider uppercase">
          <Zap className="w-3.5 h-3.5 text-blue-400" />
          Tahap 2: Silsilah Garis Darah
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100 font-['Cinzel'] tracking-wide">
          {!hasDrawn && !isSpinning
            ? 'Tarik Gulungan Silsilah Orang Tua'
            : isSpinning
            ? 'Mesin Takdir Sedang Berputar...'
            : 'Garis Keturunan Terpilih!'}
        </h2>
      </div>

      {/* Dual Slot Reel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 items-stretch">
        {/* Father Clan Slot */}
        <div className="relative p-6 rounded-2xl bg-slate-950 border border-slate-800/90 flex flex-col items-center text-center shadow-inner group h-full">
          <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-3 shrink-0">
            Garis Darah Ayah (父)
          </span>
          <div
            onClick={() => {
              if (!hasDrawn || !fatherDisplay) return
              playClickSound()
              setInspectedClan(getClanDetailFromClan(fatherDisplay, 'father', motherDisplay))
            }}
            role={hasDrawn ? 'button' : undefined}
            tabIndex={hasDrawn ? 0 : undefined}
            title={hasDrawn ? 'Klik untuk melihat detail & sejarah Klan Ayah' : undefined}
            className={`w-full p-5 rounded-xl border transition-all duration-200 flex flex-col items-center justify-between min-h-[175px] h-[175px] shrink-0 ${
              !hasDrawn && !isSpinning
                ? 'bg-slate-900/30 border-dashed border-slate-700'
                : isSpinning
                ? 'bg-slate-900/60 border-slate-700'
                : 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-700 hover:border-slate-500 shadow-lg cursor-pointer group hover:scale-[1.01] active:scale-[0.99]'
            }`}
          >
            {/* 1. Title Area - Fixed Height to prevent jumping */}
            <div className="h-14 w-full flex items-center justify-center text-center px-1">
              {!fatherDisplay ? (
                <span className="text-slate-600 font-black text-3xl font-['Cinzel'] tracking-widest animate-pulse">
                  ???
                </span>
              ) : (
                <span
                  className={`text-xl sm:text-2xl font-black font-['Cinzel'] tracking-wide leading-tight line-clamp-2 transition-all ${
                    isSpinning ? 'text-slate-400 blur-[0.5px]' : 'text-slate-100'
                  }`}
                  title={fatherDisplay.name}
                >
                  {fatherDisplay.name}
                </span>
              )}
            </div>

            {/* 2. Badge Area - Fixed Height */}
            <div className="h-7 w-full flex items-center justify-center shrink-0 my-0.5">
              {fatherDisplay ? (
                <span
                  className={`text-xs px-3 py-1 rounded-full border font-bold uppercase tracking-wider ${getRarityBadge(
                    fatherDisplay.rarity
                  )}`}
                >
                  {fatherDisplay.rarity}
                </span>
              ) : (
                <span className="text-[11px] px-2.5 py-0.5 rounded-full border border-slate-800 bg-slate-900 text-slate-600 font-semibold uppercase tracking-wider">
                  STATUS
                </span>
              )}
            </div>

            {/* 3. Minimalist Hint Area */}
            <div className="h-6 w-full flex items-center justify-center text-center">
              {hasDrawn && fatherDisplay ? (
                <span className="text-[10px] text-slate-500 group-hover:text-amber-300 flex items-center gap-1 transition-colors">
                  <Info className="w-3 h-3" /> Klik untuk detail klan
                </span>
              ) : isSpinning ? (
                <span className="text-[10px] text-amber-400/80 font-mono animate-pulse">
                  Memutar...
                </span>
              ) : (
                <span className="text-[10px] text-slate-600 italic">Belum ditarik</span>
              )}
            </div>
          </div>
        </div>

        {/* Mother Clan Slot */}
        <div className="relative p-6 rounded-2xl bg-slate-950 border border-slate-800/90 flex flex-col items-center text-center shadow-inner group h-full">
          <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-3 shrink-0">
            Garis Darah Ibu (母)
          </span>
          <div
            onClick={() => {
              if (!hasDrawn || !motherDisplay) return
              playClickSound()
              setInspectedClan(getClanDetailFromClan(motherDisplay, 'mother', fatherDisplay))
            }}
            role={hasDrawn ? 'button' : undefined}
            tabIndex={hasDrawn ? 0 : undefined}
            title={hasDrawn ? 'Klik untuk melihat detail & sejarah Klan Ibu' : undefined}
            className={`w-full p-5 rounded-xl border transition-all duration-200 flex flex-col items-center justify-between min-h-[175px] h-[175px] shrink-0 ${
              !hasDrawn && !isSpinning
                ? 'bg-slate-900/30 border-dashed border-slate-700'
                : isSpinning
                ? 'bg-slate-900/60 border-slate-700'
                : 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-700 hover:border-slate-500 shadow-lg cursor-pointer group hover:scale-[1.01] active:scale-[0.99]'
            }`}
          >
            {/* 1. Title Area - Fixed Height to prevent jumping */}
            <div className="h-14 w-full flex items-center justify-center text-center px-1">
              {!motherDisplay ? (
                <span className="text-slate-600 font-black text-3xl font-['Cinzel'] tracking-widest animate-pulse">
                  ???
                </span>
              ) : (
                <span
                  className={`text-xl sm:text-2xl font-black font-['Cinzel'] tracking-wide leading-tight line-clamp-2 transition-all ${
                    isSpinning ? 'text-slate-400 blur-[0.5px]' : 'text-slate-100'
                  }`}
                  title={motherDisplay.name}
                >
                  {motherDisplay.name}
                </span>
              )}
            </div>

            {/* 2. Badge Area - Fixed Height */}
            <div className="h-7 w-full flex items-center justify-center shrink-0 my-0.5">
              {motherDisplay ? (
                <span
                  className={`text-xs px-3 py-1 rounded-full border font-bold uppercase tracking-wider ${getRarityBadge(
                    motherDisplay.rarity
                  )}`}
                >
                  {motherDisplay.rarity}
                </span>
              ) : (
                <span className="text-[11px] px-2.5 py-0.5 rounded-full border border-slate-800 bg-slate-900 text-slate-600 font-semibold uppercase tracking-wider">
                  STATUS
                </span>
              )}
            </div>

            {/* 3. Minimalist Hint Area */}
            <div className="h-6 w-full flex items-center justify-center text-center">
              {hasDrawn && motherDisplay ? (
                <span className="text-[10px] text-slate-500 group-hover:text-amber-300 flex items-center gap-1 transition-colors">
                  <Info className="w-3 h-3" /> Klik untuk detail klan
                </span>
              ) : isSpinning ? (
                <span className="text-[10px] text-amber-400/80 font-mono animate-pulse">
                  Memutar...
                </span>
              ) : (
                <span className="text-[10px] text-slate-600 italic">Belum ditarik</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action / Trigger Area */}
      {!hasDrawn ? (
        <div className="pt-2">
          <button
            onClick={handleDraw}
            disabled={isSpinning}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-600 hover:from-blue-500 hover:to-amber-500 text-white font-black text-base tracking-wider uppercase font-['Cinzel'] shadow-xl shadow-blue-950/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 border border-blue-500/40 disabled:opacity-50"
          >
            <Dices className="w-5 h-5 text-amber-200" />
            <span>{isSpinning ? 'MEMUTAR SLOT KLAN...' : 'TARIK GACHA KLAN (DRAW)'}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in pt-2">
          {drawnFather && drawnMother && (
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between flex-wrap gap-2 ${
                isHighTier
                  ? 'bg-amber-950/30 border-amber-700/50 text-amber-200'
                  : 'bg-slate-950/80 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles
                  className={`w-5 h-5 ${isHighTier ? 'text-amber-400' : 'text-slate-400'}`}
                />
                <div>
                  <h4 className="font-bold text-sm">
                    Kombinasi Darah: {drawnFather.name} × {drawnMother.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {drawnFather.name === drawnMother.name
                      ? '★ Keturunan Darah Murni (Pure Bloodline)'
                      : 'Keturunan Darah Campuran (Hybrid Chakra)'}
                  </p>
                </div>
              </div>

              {isHighTier && (
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/50">
                  ⚡ S-Rank / High Potential Detected!
                </span>
              )}
            </div>
          )}

          {/* Proceed Button */}
          <button
            onClick={() => {
              if (!drawnFather || !drawnMother) return
              playClickSound()
              onComplete(drawnFather, drawnMother, drawnReincarnation)
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-base tracking-wider uppercase font-['Cinzel'] shadow-xl shadow-red-950/60 transition-all flex items-center justify-center gap-3 border border-red-500/40"
          >
            <span>Lanjut: Cek Kebangkitan Mata & Dojutsu (Step 3)</span>
            <ArrowRight className="w-5 h-5 text-amber-200" />
          </button>
        </div>
      )}

      {/* Clan Detail Modal */}
      {inspectedClan && (
        <JutsuDetailModal
          item={inspectedClan}
          onClose={() => setInspectedClan(null)}
        />
      )}
    </div>
  )
}
