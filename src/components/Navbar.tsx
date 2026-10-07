import React, { useState } from 'react'
import { Volume2, VolumeX, BookOpen, RotateCcw } from 'lucide-react'
import { toggleMute, playClickSound } from '../utils/audio'

interface NavbarProps {
  onOpenRules: () => void
  onReset: () => void
  canReset: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRules, onReset, canReset }) => {
  const [muted, setMuted] = useState(false)

  const handleToggleSound = () => {
    const isNowMuted = toggleMute()
    setMuted(isNowMuted)
    if (!isNowMuted) {
      playClickSound()
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-red-700 to-amber-600 flex items-center justify-center shadow-lg shadow-red-950/50 border border-red-500/30">
            <span className="text-xl font-black text-amber-200">忍</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-wider text-slate-100 font-['Cinzel']">
                GACHA SHINOBI
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800/60">
                v2.0 Plan
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Sistem Generator Kartu Ninja & Silsilah Darah
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClickSound()
              handleToggleSound()
            }}
            title={muted ? 'Aktifkan Suara' : 'Matikan Suara'}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold"
          >
            {muted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span className="hidden md:inline">{muted ? 'Muted' : 'Sound ON'}</span>
          </button>

          <button
            onClick={() => {
              playClickSound()
              onOpenRules()
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg border border-amber-600/40 bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 transition-all flex items-center gap-1.5 text-xs font-semibold"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Pohon Peluang (Rates)</span>
          </button>

          {canReset && (
            <button
              onClick={() => {
                playClickSound()
                onReset()
              }}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg border border-rose-900/50 bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <RotateCcw className="w-4 h-4 text-rose-400" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
