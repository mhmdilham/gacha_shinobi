import React from 'react'
import type { ShinobiCharacter, DetailModalItem } from '../../types/ninja'
import { Eye, Flame, ShieldAlert, Sparkles, Info } from 'lucide-react'
import {
  getDojutsuMeta,
  getElementMeta,
  getBijuuMeta,
  getModeMeta,
  getDojutsuDetail,
  getElementDetail,
  getBijuuDetail,
  getModeDetail
} from './cardMetaHelpers'
import { playClickSound } from '../../utils/audio'

interface AttributeCardsGridProps {
  character: ShinobiCharacter
  onSelectAttribute: (item: DetailModalItem) => void
}

export const AttributeCardsGrid: React.FC<AttributeCardsGridProps> = ({
  character,
  onSelectAttribute
}) => {
  const dojutsuMeta = getDojutsuMeta(character.dojutsu)
  const bijuuMeta = getBijuuMeta(character.bijuu)
  const modeMeta = getModeMeta(character.specialMode)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-6 text-xs items-stretch">
      {/* 1. Dojutsu Card */}
      <button
        type="button"
        onClick={() => {
          playClickSound()
          onSelectAttribute(getDojutsuDetail(character))
        }}
        title="Klik untuk melihat analisis & kekuatan Dojutsu"
        className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between h-full min-h-[115px] hover:scale-[1.015] active:scale-[0.99] cursor-pointer group hover:shadow-lg ${dojutsuMeta.border}`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                Mata / Dojutsu
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold text-emerald-400">
                +{character.scores.dojutsuScore} PTS
              </span>
              <Info className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
            </div>
          </div>

          {/* Title & Badge */}
          <div className="flex items-center gap-2.5 mt-2.5">
            <span className="text-2xl shrink-0">{dojutsuMeta.icon}</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm sm:text-base text-slate-100 font-['Cinzel'] leading-tight truncate">
                {character.dojutsu === 'None'
                  ? 'Mata Standar'
                  : character.dojutsu}
              </h4>
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                {character.dojutsu !== 'None' && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-black uppercase tracking-wider ${dojutsuMeta.color} bg-black/40 border border-white/10`}>
                    {dojutsuMeta.tier}
                  </span>
                )}
                {character.hyugaBranch && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-950/80 border border-indigo-600/60 text-indigo-300 font-semibold">
                    {character.hyugaBranch === 'Main Family' ? '👑 Soke' : '🔒 Bunke'}
                  </span>
                )}
                {character.isTransplantedDojutsu && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-950/90 border border-rose-500/70 text-rose-300 font-bold">
                    💉 Cangkok
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* 2. Afinitas Cakra Card */}
      <button
        type="button"
        onClick={() => {
          playClickSound()
          onSelectAttribute(getElementDetail(character))
        }}
        title="Klik untuk melihat analisis Afinitas Cakra"
        className="p-4 rounded-2xl border border-slate-800 bg-slate-900/90 text-left flex flex-col justify-between h-full min-h-[115px] hover:scale-[1.015] active:scale-[0.99] cursor-pointer group hover:border-slate-700 hover:shadow-lg transition-all"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                Afinitas Cakra
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold text-emerald-400">
                +{character.scores.elementScore} PTS
              </span>
              <Info className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
            </div>
          </div>

          {/* Elements Badges */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {character.elements.map((el) => {
              const meta = getElementMeta(el)
              return (
                <span
                  key={el}
                  className={`px-2.5 py-1 rounded-xl border text-xs font-bold flex items-center gap-1.5 shadow-sm ${meta.badgeClass}`}
                >
                  <span>{meta.icon}</span>
                  <span>{meta.shortName}</span>
                  <span className="text-[10px] font-serif opacity-75">{meta.kanji}</span>
                </span>
              )
            })}
          </div>
        </div>
      </button>

      {/* 3. Status Bijuu Card */}
      <button
        type="button"
        onClick={() => {
          playClickSound()
          onSelectAttribute(getBijuuDetail(character))
        }}
        title="Klik untuk melihat analisis & karakteristik Bijuu"
        className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between h-full min-h-[115px] hover:scale-[1.015] active:scale-[0.99] cursor-pointer group hover:shadow-lg ${bijuuMeta.border}`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                Status Bijuu
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold text-emerald-400">
                +{character.scores.bijuuScore} PTS
              </span>
              <Info className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
            </div>
          </div>

          {/* Title & Badge */}
          <div className="flex items-center gap-2.5 mt-2.5">
            <span className="text-2xl shrink-0">{bijuuMeta.icon}</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm sm:text-base text-slate-100 font-['Cinzel'] leading-tight truncate">
                {character.bijuu}
              </h4>
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                {character.bijuu !== 'Bukan Jinchuriki' && (
                  <span className="inline-block text-[9px] px-1.5 py-0.2 rounded font-black uppercase tracking-wider bg-amber-950/90 text-amber-300 border border-amber-600/70">
                    {bijuuMeta.tier}
                  </span>
                )}
                {character.bijuuMastery === 'Penakluk Bijuu Liar (Subjugator)' && (
                  <span className="inline-block text-[9px] px-1.5 py-0.2 rounded font-black uppercase tracking-wider bg-red-950/90 border border-red-500/80 text-red-300 shadow-[0_0_8px_rgba(239,68,68,0.3)]">
                    👑 SUBJUGATOR
                  </span>
                )}
                {character.bijuuMastery === 'Jinchuriki Harmonis' && (
                  <span className="inline-block text-[9px] px-1.5 py-0.2 rounded font-black uppercase tracking-wider bg-emerald-950/90 border border-emerald-500/80 text-emerald-300">
                    🤝 HARMONIS
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* 4. Mode Transformasi Card */}
      <button
        type="button"
        onClick={() => {
          playClickSound()
          onSelectAttribute(getModeDetail(character))
        }}
        title="Klik untuk melihat analisis Mode Transformasi"
        className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between h-full min-h-[115px] hover:scale-[1.015] active:scale-[0.99] cursor-pointer group hover:shadow-lg ${modeMeta.border}`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                Mode Transformasi
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold text-emerald-400">
                +{character.scores.modeScore} PTS
              </span>
              <Info className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
            </div>
          </div>

          {/* Title & Badge */}
          <div className="flex items-center gap-2.5 mt-2.5">
            <span className="text-2xl shrink-0">{modeMeta.icon}</span>
            <div className="flex-1 min-w-0">
              <h4 className={`font-bold text-sm sm:text-base font-['Cinzel'] leading-tight truncate ${modeMeta.titleClass}`}>
                {character.specialMode === 'None' ? 'Gaya Tempur Standar' : character.specialMode}
              </h4>
              {character.specialMode !== 'None' && (
                <span className={`inline-block text-[9px] px-1.5 py-0.2 rounded font-black uppercase tracking-wider mt-1 ${modeMeta.badgeClass}`}>
                  {modeMeta.tier}
                </span>
              )}
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}
