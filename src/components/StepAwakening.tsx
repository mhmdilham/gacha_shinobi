import React, { useState } from 'react'
import type { ClanInfo, DojutsuType, DetailModalItem } from '../types/ninja'
import { evaluateDojutsu } from '../utils/gachaEngine'
import { playSharinganAwakening, playClickSound, playThunder } from '../utils/audio'
import { Eye, ArrowRight, Award, Sparkles, Info } from 'lucide-react'
import { JutsuDetailModal } from './finalCard/JutsuDetailModal'
import { getDojutsuDetailFromInfo } from './finalCard/cardMetaHelpers'

interface StepAwakeningProps {
  fatherClan: ClanInfo
  motherClan: ClanInfo
  reincarnation: 'None' | 'Asura' | 'Indra' | 'Indra + Asura'
  onComplete: (
    dojutsu: DojutsuType,
    hyugaBranch?: 'Main Family' | 'Branch Family',
    dojutsuNote?: string,
    isTransplanted?: boolean
  ) => void
}

export const StepAwakening: React.FC<StepAwakeningProps> = ({
  fatherClan,
  motherClan,
  reincarnation,
  onComplete
}) => {
  const [hasDrawn, setHasDrawn] = useState(false)
  const [stage, setStage] = useState<'idle' | 'darkness' | 'awakening' | 'revealed'>('idle')
  const [inspectedDojutsu, setInspectedDojutsu] = useState<DetailModalItem | null>(null)

  const [dojutsuResult, setDojutsuResult] = useState<{
    dojutsu: DojutsuType
    hyugaBranch?: 'Main Family' | 'Branch Family'
    dojutsuNote?: string
    isTransplantedDojutsu?: boolean
  } | null>(null)

  const handleDraw = () => {
    if (stage !== 'idle') return
    playClickSound()
    setStage('darkness')

    // ACTUAL EVALUATION HAPPENS RIGHT HERE AT THE CLICK MOMENT!
    const evaluated = evaluateDojutsu(fatherClan, motherClan, reincarnation)
    setDojutsuResult(evaluated)

    setTimeout(() => {
      setStage('awakening')
      const hasDojutsu = evaluated.dojutsu !== 'None' && evaluated.dojutsu !== 'Belum Awakened'
      if (hasDojutsu || reincarnation !== 'None') {
        playSharinganAwakening()
      }

      setTimeout(() => {
        setStage('revealed')
        setHasDrawn(true)
        if (
          evaluated.dojutsu.includes('Rinnegan') ||
          evaluated.dojutsu === 'Tenseigan' ||
          reincarnation === 'Indra + Asura'
        ) {
          playThunder()
        }
      }, 1600)
    }, 700)
  }

  // Eye visual representation styling
  const renderEyeVisual = () => {
    if (stage !== 'revealed' || !dojutsuResult) {
      return (
        <div className="w-28 h-28 rounded-full bg-slate-950 border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-600 animate-pulse">
          <Eye className="w-12 h-12 opacity-40" />
        </div>
      )
    }

    const { dojutsu } = dojutsuResult

    if (
      dojutsu.includes('Sharingan') ||
      dojutsu === 'Mangekyo Sharingan (MS)' ||
      dojutsu === 'Eternal Mangekyo Sharingan (EMS)'
    ) {
      return (
        <div className="relative w-32 h-32 rounded-full bg-red-600 border-4 border-black flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.8)] animate-pulse">
          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center relative">
            <div className="w-4 h-4 rounded-full bg-red-600"></div>
          </div>
          <div className="absolute top-4 w-3.5 h-3.5 bg-black rounded-full"></div>
          {(dojutsu.includes('2 Tomoe') ||
            dojutsu.includes('3 Tomoe') ||
            dojutsu.includes('MS') ||
            dojutsu.includes('EMS')) && (
            <div className="absolute bottom-5 left-5 w-3.5 h-3.5 bg-black rounded-full"></div>
          )}
          {(dojutsu.includes('3 Tomoe') ||
            dojutsu.includes('MS') ||
            dojutsu.includes('EMS')) && (
            <div className="absolute bottom-5 right-5 w-3.5 h-3.5 bg-black rounded-full"></div>
          )}
        </div>
      )
    }

    if (dojutsu.includes('Rinnegan') || dojutsu === 'Rinne Sharingan') {
      return (
        <div className="relative w-32 h-32 rounded-full bg-purple-950 border-4 border-purple-400 flex items-center justify-center shadow-[0_0_60px_rgba(168,85,247,0.9)]">
          <div className="w-24 h-24 rounded-full border-2 border-purple-400/80 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-purple-400/80 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-purple-300 bg-purple-900 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-black"></div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (dojutsu.includes('Byakugan') || dojutsu === 'Pure Byakugan') {
      return (
        <div className="relative w-32 h-32 rounded-full bg-slate-100 border-4 border-slate-300 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.7)]">
          <div className="w-14 h-14 rounded-full bg-indigo-100/60 border border-indigo-200 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-white shadow-inner"></div>
          </div>
        </div>
      )
    }

    if (dojutsu === 'Tenseigan') {
      return (
        <div className="relative w-32 h-32 rounded-full bg-cyan-400 border-4 border-white flex items-center justify-center shadow-[0_0_60px_rgba(34,211,238,0.9)] animate-pulse">
          <div className="w-16 h-16 rounded-full bg-cyan-200 border-2 border-cyan-50 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-white"></div>
          </div>
        </div>
      )
    }

    return (
      <div className="w-28 h-28 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-500">
        <Eye className="w-12 h-12 opacity-40" />
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
      {/* Dark awakening overlay during draw animation */}
      {(stage === 'darkness' || stage === 'awakening') && (
        <div className="absolute inset-0 bg-black/95 z-20 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full border-2 border-red-500/40 border-t-red-500 animate-spin mb-4" />
          <h3 className="text-xl font-black font-['Cinzel'] text-red-500 tracking-wider">
            {stage === 'darkness' ? 'MEMERIKSA CABANG GENETIKA...' : 'RESONANSI CAKRA TERDETEKSI!'}
          </h3>
          <p className="text-slate-400 text-xs mt-2 max-w-sm">
            Menembus lapisan sel DNA dan memeriksa potensi Dojutsu serta takdir reinkarnasi...
          </p>
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/60 text-purple-300 text-xs font-semibold tracking-wider uppercase">
          <Eye className="w-3.5 h-3.5 text-purple-400" />
          Tahap 3: Percabangan Dojutsu & Reinkarnasi
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100 font-['Cinzel'] tracking-wide">
          {!hasDrawn ? 'Uji Kebangkitan Mata / Dojutsu' : 'Kebangkitan Kekkei Genkai Terungkap!'}
        </h2>
      </div>

      {/* Main Awakening Card */}
      <div
        onClick={() => {
          if (!hasDrawn || !dojutsuResult) return
          playClickSound()
          setInspectedDojutsu(
            getDojutsuDetailFromInfo({
              dojutsu: dojutsuResult.dojutsu,
              hyugaBranch: dojutsuResult.hyugaBranch,
              isTransplantedDojutsu: dojutsuResult.isTransplantedDojutsu,
              dojutsuNote: dojutsuResult.dojutsuNote,
              reincarnation
            })
          )
        }}
        role={hasDrawn ? 'button' : undefined}
        tabIndex={hasDrawn ? 0 : undefined}
        title={hasDrawn ? 'Klik untuk melihat analisis & kemampuan Dojutsu' : undefined}
        className={`my-6 p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center text-center shadow-inner transition-all ${
          hasDrawn
            ? 'cursor-pointer hover:border-purple-500/70 hover:scale-[1.01] active:scale-[0.99] group shadow-purple-950/20'
            : ''
        }`}
      >
        {/* Eye Display */}
        <div className="my-4">{renderEyeVisual()}</div>

        {/* Eye Name */}
        <div className="space-y-1 mt-2">
          <span className="text-xs uppercase tracking-widest font-bold text-slate-400">
            Status Dojutsu / Mata
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-100 font-['Cinzel']">
            {!hasDrawn || !dojutsuResult
              ? 'Belum Diuji'
              : dojutsuResult.dojutsu === 'None'
              ? 'Mata Standar'
              : dojutsuResult.dojutsu}
          </h3>
        </div>

        {/* Hyuga Branch Tag if available */}
        {hasDrawn && dojutsuResult?.hyugaBranch && (
          <span className="mt-2 text-xs px-3 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800 font-semibold">
            Cabang: {dojutsuResult.hyugaBranch}
          </span>
        )}

        {/* Transplanted Tag if applicable */}
        {hasDrawn && dojutsuResult?.isTransplantedDojutsu && (
          <span className="mt-2 text-xs px-3 py-1 rounded-full bg-rose-950/90 text-rose-300 border border-rose-700/80 font-bold flex items-center gap-1.5 shadow-sm">
            <span>💉</span> Cangkok / Rampasan Perang (Non-Klan Asli)
          </span>
        )}

        {/* Minimalist Hint Area (Keterangan panjang luar dihapus) */}
        {hasDrawn && (
          <span className="mt-3 text-[10px] text-slate-500 group-hover:text-purple-300 flex items-center gap-1 transition-colors">
            <Info className="w-3 h-3" /> Klik untuk melihat analisis & kemampuan mata
          </span>
        )}

        {/* Reincarnation Badge if hit */}
        {hasDrawn && reincarnation !== 'None' && (
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-amber-950/60 via-purple-950/60 to-amber-950/60 border border-amber-500/60 text-amber-200 flex items-center gap-2 max-w-md">
            <Award className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-left text-xs">
              <strong className="text-amber-300 uppercase tracking-wider block">
                ★ Takdir Reinkarnasi: {reincarnation}
              </strong>
              <span>
                Membawa residu cakra spiritual dari putra Hagoromo Otsutsuki!
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Area */}
      {!hasDrawn ? (
        <div className="pt-2">
          <button
            onClick={handleDraw}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white font-black text-base tracking-wider uppercase font-['Cinzel'] shadow-xl shadow-purple-950/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 border border-purple-500/40"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>BANGKITKAN MATA / DOJUTSU (DRAW)</span>
          </button>
        </div>
      ) : (
        <div className="pt-2 animate-fade-in">
          <button
            onClick={() => {
              if (!dojutsuResult) return
              playClickSound()
              onComplete(
                dojutsuResult.dojutsu,
                dojutsuResult.hyugaBranch,
                dojutsuResult.dojutsuNote,
                dojutsuResult.isTransplantedDojutsu
              )
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-base tracking-wider uppercase font-['Cinzel'] shadow-xl shadow-red-950/60 transition-all flex items-center justify-center gap-3 border border-red-500/40"
          >
            <span>Lanjut: Roll Afinitas Elemen & Bijuu (Step 4)</span>
            <ArrowRight className="w-5 h-5 text-amber-200" />
          </button>
        </div>
      )}

      {/* Dojutsu Detail Modal */}
      {inspectedDojutsu && (
        <JutsuDetailModal
          item={inspectedDojutsu}
          onClose={() => setInspectedDojutsu(null)}
        />
      )}
    </div>
  )
}
