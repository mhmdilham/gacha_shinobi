import React from 'react'
import { Download, Share2, RotateCcw, Check } from 'lucide-react'
import { playClickSound } from '../../utils/audio'

interface CardActionButtonsProps {
  onDownload: () => void
  isDownloading: boolean
  onCopyText: () => void
  copied: boolean
  onReroll: () => void
}

export const CardActionButtons: React.FC<CardActionButtonsProps> = ({
  onDownload,
  isDownloading,
  onCopyText,
  copied,
  onReroll
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
      <button
        onClick={onDownload}
        disabled={isDownloading}
        className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-950/50 transition-all border border-red-500/40 cursor-pointer"
      >
        <Download className="w-4 h-4 text-amber-200" />
        <span>{isDownloading ? 'Menyimpan Gambar...' : 'Download Kartu (PNG)'}</span>
      </button>

      <button
        onClick={onCopyText}
        className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-blue-400" />}
        <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Data Shinobi'}</span>
      </button>

      <button
        onClick={() => {
          playClickSound()
          onReroll()
        }}
        className="py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-amber-500/30 transition-all cursor-pointer"
      >
        <RotateCcw className="w-4 h-4 text-amber-400" />
        <span>Gacha Karakter Baru</span>
      </button>
    </div>
  )
}
