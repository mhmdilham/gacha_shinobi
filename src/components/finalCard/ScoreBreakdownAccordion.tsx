import React, { useState } from 'react'
import type { PowerScoreBreakdown } from '../../types/ninja'
import { Award, ChevronDown, ChevronUp } from 'lucide-react'
import { playClickSound } from '../../utils/audio'

interface ScoreBreakdownAccordionProps {
  scores: PowerScoreBreakdown
}

export const ScoreBreakdownAccordion: React.FC<ScoreBreakdownAccordionProps> = ({ scores }) => {
  const [showBreakdown, setShowBreakdown] = useState(false)

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
      <button
        onClick={() => {
          playClickSound()
          setShowBreakdown(!showBreakdown)
        }}
        className="w-full px-6 py-3.5 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-slate-300 hover:bg-slate-800/50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          Rincian Formula Power Score
        </span>
        {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {showBreakdown && (
        <div className="p-6 pt-2 border-t border-slate-800/80 text-xs space-y-2 bg-slate-950/60">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Rata-rata Klan:</span>
              <strong className="text-slate-200">+{scores.clanBaseAverage} pts</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Dojutsu:</span>
              <strong className="text-slate-200">+{scores.dojutsuScore} pts</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Elemen Cakra:</span>
              <strong className="text-slate-200">+{scores.elementScore} pts</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Combo Bloodline:</span>
              <strong className="text-slate-200">+{scores.kekkeiGenkaiScore} pts</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Monster Bijuu:</span>
              <strong className="text-slate-200">+{scores.bijuuScore} pts</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Mode Transformasi:</span>
              <strong className="text-slate-200">+{scores.modeScore} pts</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Jutsu Signature:</span>
              <strong className="text-slate-200">+{scores.jutsuScore} pts</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Bonus Reinkarnasi:</span>
              <strong className="text-slate-200">+{scores.reincarnationBonus} pts</strong>
            </div>
            {scores.bijuuDominanceBonus > 0 && (
              <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-700/60">
                <span className="text-red-400 block text-[10px]">Dominasi Bijuu:</span>
                <strong className="text-amber-200">+{scores.bijuuDominanceBonus} pts</strong>
              </div>
            )}
          </div>
          <div className="text-[11px] text-slate-400 pt-2 text-right">
            Total Skor Akumulasi: <strong className="text-amber-300 font-bold">{scores.total} Pts</strong>
          </div>
        </div>
      )}
    </div>
  )
}
