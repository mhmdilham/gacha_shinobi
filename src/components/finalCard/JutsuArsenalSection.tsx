import React from 'react'
import type { ShinobiCharacter, JutsuInfo } from '../../types/ninja'
import { Info } from 'lucide-react'
import { getJutsuBadgeMeta, getKekkeiGenkaiInfo } from './cardMetaHelpers'
import { playClickSound } from '../../utils/audio'

interface JutsuArsenalSectionProps {
  character: ShinobiCharacter
  onSelectJutsu: (jutsu: JutsuInfo) => void
}

export const JutsuArsenalSection: React.FC<JutsuArsenalSectionProps> = ({
  character,
  onSelectJutsu
}) => {
  return (
    <>
      {/* Jutsu Signature Tags (1 - 3 Jurus Utama) */}
      <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-amber-400 block text-[10px] uppercase font-bold tracking-wider">
            ★ Jutsu Signature & Spesialisasi Utama ({character.signatureJutsus.length} Jurus)
          </span>
          <span className="text-[10px] text-amber-400/90 flex items-center gap-1 font-semibold">
            <Info className="w-3 h-3" /> Klik jurus & Kekkei Genkai untuk analisis kekuatan
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {character.extraKekkeiGenkai.map((kg) => {
            const kgInfo = getKekkeiGenkaiInfo(kg)
            return (
              <button
                key={kg}
                type="button"
                onClick={() => {
                  playClickSound()
                  onSelectJutsu(kgInfo)
                }}
                className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-950/90 to-yellow-950/80 border border-amber-500/80 text-amber-200 font-bold text-xs flex items-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-left"
                title="Klik untuk melihat analisis kekuatan Kekkei Genkai"
              >
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-900 border border-amber-600 text-amber-200 font-black uppercase">
                  🧬 KEKKEI GENKAI
                </span>
                <span>{kg}</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">+350</span>
              </button>
            )
          })}
          {character.signatureJutsus.map((j) => {
            const meta = getJutsuBadgeMeta(j.tier)
            return (
              <button
                key={j.name}
                type="button"
                onClick={() => {
                  playClickSound()
                  onSelectJutsu(j)
                }}
                className={`px-2.5 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-semibold text-left transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${meta.pill}`}
                title="Klik untuk melihat penjelasan kekuatan jurus"
              >
                <span
                  className={`text-[9px] font-black px-1.5 py-0.5 rounded border uppercase tracking-wider flex items-center gap-0.5 ${meta.badge}`}
                >
                  <span>{meta.icon}</span>
                  <span>{meta.label}</span>
                </span>
                <span className="font-bold">{j.name}</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold ml-auto pl-1">
                  +{j.pts}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tactical / Standard Jutsus Tags (1 - 2 Jurus Standar / Taktis) */}
      {character.tacticalJutsus && character.tacticalJutsus.length > 0 && (
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sky-400 block text-[10px] uppercase font-bold tracking-wider">
              🛡️ Arsenal Jutsu Standar & Taktis Lapangan ({character.tacticalJutsus.length} Jurus)
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Dukungan mobilitas & pertahanan
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {character.tacticalJutsus.map((j) => (
              <button
                key={j.name}
                type="button"
                onClick={() => {
                  playClickSound()
                  onSelectJutsu(j)
                }}
                className="px-2.5 py-1.5 rounded-xl border border-sky-800/60 bg-sky-950/40 hover:bg-sky-900/40 text-sky-200 flex items-center gap-2 text-xs font-semibold text-left transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                title="Klik untuk melihat penjelasan jurus taktis"
              >
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-sky-900 border border-sky-600 text-sky-200 uppercase tracking-wider">
                  TAKTIKAL
                </span>
                <span className="font-semibold text-slate-200">{j.name}</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold ml-auto pl-1">
                  +{j.pts}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
