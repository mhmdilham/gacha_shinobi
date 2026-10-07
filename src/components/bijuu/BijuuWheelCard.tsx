import React from 'react'
import type { BijuuType, BijuuMasteryType, DetailModalItem } from '../../types/ninja'
import type { BijuuAnimItem } from '../../data/bijuu'
import { getBijuuDetailFromInfo } from '../finalCard/cardMetaHelpers'
import { playClickSound } from '../../utils/audio'
import { Crown, HeartHandshake, Info } from 'lucide-react'

interface BijuuWheelCardProps {
  hasDrawn: boolean
  isSpinning: boolean
  currentCyclingBijuu: BijuuAnimItem
  drawnBijuu: BijuuType
  bijuuMastery: BijuuMasteryType
  bijuuDominanceBonus: number
  bijuuGift?: string
  onInspectBijuu: (item: DetailModalItem) => void
}

export const BijuuWheelCard: React.FC<BijuuWheelCardProps> = ({
  hasDrawn,
  isSpinning,
  currentCyclingBijuu,
  drawnBijuu,
  bijuuMastery,
  bijuuDominanceBonus,
  bijuuGift,
  onInspectBijuu
}) => {
  const isJinchuriki = drawnBijuu !== 'Bukan Jinchuriki'

  if (!hasDrawn && !isSpinning) {
    return (
      <div className="p-8 rounded-2xl border border-dashed border-slate-800 bg-slate-950/50 text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-3">
          <span className="text-3xl">👹</span>
        </div>
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
          Segel Wadah Belum Diuji
        </p>
        <p className="text-[11px] text-slate-600 mt-1">
          Uji takdir garis keturunanmu apakah terpilih sebagai wadah monster berekor legendaris
        </p>
      </div>
    )
  }

  if (isSpinning) {
    return (
      <div className="p-8 rounded-2xl border-2 border-amber-500/80 bg-slate-950/90 shadow-[0_0_30px_rgba(245,158,11,0.25)] flex flex-col items-center justify-center text-center animate-pulse">
        <div className="w-24 h-24 rounded-full bg-amber-950/60 border-2 border-amber-500 flex items-center justify-center text-4xl shadow-inner mb-3 animate-spin">
          {currentCyclingBijuu.icon}
        </div>
        <h4 className="text-lg font-black text-amber-200 font-['Cinzel']">
          {currentCyclingBijuu.name}
        </h4>
        <span className="text-xs text-amber-400/80 uppercase font-bold tracking-widest mt-1">
          {currentCyclingBijuu.label}
        </span>
      </div>
    )
  }

  return (
    <div
      onClick={() => {
        playClickSound()
        onInspectBijuu(
          getBijuuDetailFromInfo({
            bijuu: drawnBijuu,
            bijuuMastery,
            bijuuGift,
            bijuuDominanceBonus
          })
        )
      }}
      role="button"
      tabIndex={0}
      title="Klik untuk melihat analisis lengkap wadah Bijuu"
      className={`p-6 rounded-2xl border transition-all cursor-pointer group hover:scale-[1.01] active:scale-[0.99] animate-fade-in ${
        isJinchuriki
          ? 'border-amber-600/70 hover:border-amber-500 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 shadow-lg shadow-amber-950/40'
          : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-16 h-16 rounded-2xl border flex items-center justify-center text-3xl shrink-0 ${
            isJinchuriki
              ? 'bg-amber-950/80 border-amber-500 shadow-md shadow-amber-950/60'
              : 'bg-slate-900 border-slate-700'
          }`}
        >
          {isJinchuriki ? '🦊' : '👤'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              {isJinchuriki ? 'Status Wadah Siluman' : 'Status Wadah Bijuu'}
            </span>
            {bijuuMastery === 'Penakluk Bijuu Liar (Subjugator)' && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-950/90 border border-red-500 text-red-300 flex items-center gap-1 shadow-[0_0_8px_rgba(239,68,68,0.3)]">
                <Crown className="w-3 h-3 text-red-400" />
                Penakluk Bijuu Liar (+{bijuuDominanceBonus} PTS)
              </span>
            )}
            {bijuuMastery === 'Jinchuriki Harmonis' && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-950/90 border border-emerald-500/80 text-emerald-300 flex items-center gap-1">
                <HeartHandshake className="w-3 h-3 text-emerald-400" />
                Jinchuriki Harmonis
              </span>
            )}
          </div>

          <h4
            className={`text-lg sm:text-xl font-black font-['Cinzel'] ${
              isJinchuriki ? 'text-amber-200' : 'text-slate-300'
            }`}
          >
            {drawnBijuu}
          </h4>

          <span className="text-[10px] text-slate-500 group-hover:text-amber-300 flex items-center gap-1 transition-colors mt-2">
            <Info className="w-3 h-3" /> Klik untuk analisis wadah Bijuu
          </span>
        </div>
      </div>
    </div>
  )
}
