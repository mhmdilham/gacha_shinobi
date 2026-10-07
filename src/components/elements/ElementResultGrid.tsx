import React from 'react'
import type { ElementType, DetailModalItem } from '../../types/ninja'
import { ELEMENTS_LIST } from '../../data/elements'
import { getSingleElementDetail } from '../finalCard/cardMetaHelpers'
import { playClickSound } from '../../utils/audio'
import { Info } from 'lucide-react'

interface ElementResultGridProps {
  elements: ElementType[]
  onInspectElement: (item: DetailModalItem) => void
}

export const ElementResultGrid: React.FC<ElementResultGridProps> = ({
  elements,
  onInspectElement
}) => {
  if (elements.length === 0) return null

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {elements.map((el) => {
          const meta = ELEMENTS_LIST.find((item) => item.type === el) || ELEMENTS_LIST[0]
          const isYinYang = el === 'Onmyoton (Yin-Yang)'

          return (
            <div
              key={el}
              onClick={() => {
                playClickSound()
                onInspectElement(getSingleElementDetail(el))
              }}
              role="button"
              tabIndex={0}
              title={`Klik untuk melihat analisis elemen ${meta.shortName}`}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-3 transition-all cursor-pointer group hover:scale-[1.02] active:scale-[0.98] ${
                isYinYang
                  ? 'border-purple-500/80 bg-purple-950/40 hover:border-purple-400 shadow-lg shadow-purple-950/40'
                  : 'border-slate-800 bg-slate-900/80 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-3xl shrink-0">{meta.icon}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h5
                      className="font-bold text-sm truncate"
                      style={{ color: meta.color }}
                    >
                      {meta.shortName}
                    </h5>
                    <span className="text-[10px] font-serif opacity-70 text-slate-400">
                      ({meta.kanji})
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 group-hover:text-amber-300 flex items-center gap-1 transition-colors mt-0.5">
                    <Info className="w-3 h-3" /> Detail Elemen
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
