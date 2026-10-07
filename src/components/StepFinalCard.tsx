import React, { useRef, useState, useEffect } from 'react'
import type { ShinobiCharacter, JutsuInfo, DetailModalItem } from '../types/ninja'
import { VILLAGES } from '../data/ninjaData'
import { toPng } from 'html-to-image'
import confetti from 'canvas-confetti'
import { playStamp, playFanfare, playClickSound } from '../utils/audio'

// Modular Sub-components & Helpers
import {
  getClanIcon,
  getClanBadgeStyle,
  getClanDetail,
  getLineageSynergyDetail
} from './finalCard/cardMetaHelpers'
import { AttributeCardsGrid } from './finalCard/AttributeCardsGrid'
import { JutsuArsenalSection } from './finalCard/JutsuArsenalSection'
import { ScoreBreakdownAccordion } from './finalCard/ScoreBreakdownAccordion'
import { CardActionButtons } from './finalCard/CardActionButtons'
import { JutsuDetailModal } from './finalCard/JutsuDetailModal'

interface StepFinalCardProps {
  character: ShinobiCharacter
  onReroll: () => void
}

export const StepFinalCard: React.FC<StepFinalCardProps> = ({ character, onReroll }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [stampLanded, setStampLanded] = useState(false)
  const [inspectedItem, setInspectedItem] = useState<DetailModalItem | JutsuInfo | null>(null)

  const village = VILLAGES.find((v) => v.id === character.village) || VILLAGES[0]

  useEffect(() => {
    // Stamp drop effect after 600ms
    const tStamp = setTimeout(() => {
      setStampLanded(true)
      playStamp()

      // Fanfare & Confetti
      setTimeout(() => {
        playFanfare()
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#a855f7']
        })
      }, 300)
    }, 600)

    return () => clearTimeout(tStamp)
  }, [])

  // Download card as PNG using html-to-image
  const handleDownload = async () => {
    if (!cardRef.current) return
    try {
      setIsDownloading(true)
      playClickSound()
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        backgroundColor: '#020617'
      })
      const link = document.createElement('a')
      link.download = `Shinobi-${character.name.replace(/\s+/g, '_')}-${character.rank.replace(/\s+/g, '_')}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Failed to export card image:', err)
      alert('Gagal mengekspor kartu. Silakan gunakan tombol screenshot manual.')
    } finally {
      setIsDownloading(false)
    }
  }

  // Copy shareable summary text
  const handleCopyText = () => {
    playClickSound()
    const summary = `🥷 HASIL GACHA SHINOBI 🥷
Nama: ${character.name}
Desa: ${village.name} (${village.kanji})
Silsilah: ${character.fatherClan.name} × ${character.motherClan.name}
Mata/Dojutsu: ${character.dojutsu === 'None' ? 'Mata Standar' : character.dojutsu}
Elemen: ${character.elements.join(', ')}
Bijuu: ${character.bijuu}
${character.bijuuMastery && character.bijuuMastery !== 'None' ? `Status Wadah: ${character.bijuuMastery}\n` : ''}${character.bijuuGift ? `Berkah Bijuu: ${character.bijuuGift}\n` : ''}Mode: ${character.specialMode === 'None' ? 'Gaya Tempur Standar' : character.specialMode}
Jutsu Signature: ${character.signatureJutsus.map((j) => j.name).join(', ')}
${character.tacticalJutsus && character.tacticalJutsus.length > 0 ? `Jutsu Taktis: ${character.tacticalJutsus.map((j) => j.name).join(', ')}\n` : ''}${character.extraKekkeiGenkai.length > 0 ? `Kekkei Genkai: ${character.extraKekkeiGenkai.join(', ')}\n` : ''}⚡ POWER SCORE: ${character.scores.total.toLocaleString()} PTS
🏆 RANK: [${character.rank.toUpperCase()}]
`
    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  // Rank styling badge
  const getRankBadgeStyle = (rank: string) => {
    switch (rank) {
      case 'Legend / God Shinobi':
        return 'border-amber-400 bg-gradient-to-r from-amber-500/30 via-red-500/30 to-purple-500/30 text-amber-200 shadow-[0_0_25px_rgba(251,191,36,0.5)]'
      case 'Kage Level':
        return 'border-purple-500 bg-purple-950/60 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
      case 'Jonin / ANBU':
        return 'border-emerald-500 bg-emerald-950/60 text-emerald-200'
      case 'Chunin':
        return 'border-sky-500 bg-sky-950/60 text-sky-200'
      default:
        return 'border-slate-600 bg-slate-900 text-slate-300'
    }
  }

  const fatherIcon = getClanIcon(character.fatherClan.name)
  const motherIcon = getClanIcon(character.motherClan.name)
  const fatherBadge = getClanBadgeStyle(character.fatherClan.rarity)
  const motherBadge = getClanBadgeStyle(character.motherClan.rarity)

  const isPureblood = character.fatherClan.name === character.motherClan.name
  const isRikudoLineage =
    (character.fatherClan.name === 'Uchiha' &&
      (character.motherClan.name === 'Senju' || character.motherClan.name === 'Uzumaki')) ||
    (character.motherClan.name === 'Uchiha' &&
      (character.fatherClan.name === 'Senju' || character.fatherClan.name === 'Uzumaki'))
  const isHamuraLineage =
    (character.fatherClan.name === 'Hyuga' && character.motherClan.name === 'Otsutsuki') ||
    (character.motherClan.name === 'Hyuga' && character.fatherClan.name === 'Otsutsuki')

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* SHINOBI CARD CONTAINER TO EXPORT */}
      <div
        ref={cardRef}
        className="relative bg-slate-950 border-2 border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden transition-all text-slate-100"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 0%, rgba(220, 38, 38, 0.12), transparent 60%), radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.08), transparent 50%)'
        }}
      >
        {/* Card Border Accents */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-red-600"></div>

        {/* Header: Village & Kanji Banner */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 rounded-2xl bg-slate-900 border border-slate-800">
              {village.symbol}
            </span>
            <div>
              <span className="text-[11px] uppercase font-extrabold tracking-widest text-slate-400 block">
                Pendaftaran Ninja Resmi (忍記)
              </span>
              <h3 className="font-bold text-base sm:text-lg" style={{ color: village.color }}>
                {village.name}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm sm:text-base font-serif font-black text-slate-400 tracking-wider">
              {village.kanji}
            </span>
            <span className="block text-[10px] text-slate-400 font-mono">
              ID: {character.id}
            </span>
          </div>
        </div>

        {/* Character Main Profile */}
        <div className="my-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-0.5">
                Nama Shinobi Terdaftar
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-100 font-['Cinzel'] tracking-wide">
                {character.name}
              </h2>
            </div>
            {/* Rank Badge Header */}
            <div className="self-start sm:self-auto">
              <span
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs sm:text-sm font-black uppercase tracking-wider font-['Cinzel'] shadow-md ${getRankBadgeStyle(
                  character.rank
                )}`}
              >
                <span>⚔️</span>
                <span>{character.rank}</span>
              </span>
            </div>
          </div>

          {/* Bloodline Badges with Icons */}
          <div className="space-y-2 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              {/* Ayah Clan */}
              <button
                type="button"
                onClick={() => {
                  playClickSound()
                  setInspectedItem(getClanDetail(character, 'father'))
                }}
                className={`text-xs px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 shadow-sm hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer ${fatherBadge.badge}`}
                title="Klik untuk melihat detail & sejarah Klan Ayah"
              >
                <span>{fatherIcon}</span>
                <span>Ayah: <strong>{character.fatherClan.name}</strong></span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/40 border border-white/10 uppercase font-black">
                  {fatherBadge.label}
                </span>
              </button>

              <span className="text-xs text-slate-500 font-black">×</span>

              {/* Ibu Clan */}
              <button
                type="button"
                onClick={() => {
                  playClickSound()
                  setInspectedItem(getClanDetail(character, 'mother'))
                }}
                className={`text-xs px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 shadow-sm hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer ${motherBadge.badge}`}
                title="Klik untuk melihat detail & sejarah Klan Ibu"
              >
                <span>{motherIcon}</span>
                <span>Ibu: <strong>{character.motherClan.name}</strong></span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/40 border border-white/10 uppercase font-black">
                  {motherBadge.label}
                </span>
              </button>
            </div>

            {/* Special Lineage Synergy Tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              {isPureblood && (
                <button
                  type="button"
                  onClick={() => {
                    playClickSound()
                    setInspectedItem(getLineageSynergyDetail('pureblood', character))
                  }}
                  className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-950/80 border border-rose-500 text-rose-300 font-bold flex items-center gap-1 shadow-sm hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
                  title="Klik untuk analisis sinergi darah murni"
                >
                  <span>🩸</span> Keturunan Darah Murni ({character.fatherClan.name})
                </button>
              )}
              {isRikudoLineage && (
                <button
                  type="button"
                  onClick={() => {
                    playClickSound()
                    setInspectedItem(getLineageSynergyDetail('rikudo', character))
                  }}
                  className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500 text-amber-300 font-bold flex items-center gap-1 shadow-sm hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
                  title="Klik untuk analisis sinergi Rikudo Sennin"
                >
                  <span>✨</span> Sinergi Rikudo Sennin (Darah Indra × Asura)
                </button>
              )}
              {isHamuraLineage && (
                <button
                  type="button"
                  onClick={() => {
                    playClickSound()
                    setInspectedItem(getLineageSynergyDetail('hamura', character))
                  }}
                  className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500 text-cyan-300 font-bold flex items-center gap-1 shadow-sm hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
                  title="Klik untuk analisis garis keturunan Hamura"
                >
                  <span>🌕</span> Garis Keturunan Hamura Otsutsuki
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid Matrix */}
        <AttributeCardsGrid
          character={character}
          onSelectAttribute={(item) => setInspectedItem(item)}
        />

        {/* Jutsu Arsenal Section */}
        <JutsuArsenalSection
          character={character}
          onSelectJutsu={(j) => setInspectedItem(j)}
        />

        {/* Footer Score & STAMP */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between relative">
          <div>
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400 block">
              Total Kekuatan Tempur (Power Score)
            </span>
            <div className="text-3xl sm:text-4xl font-black font-['Cinzel'] tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-300 to-yellow-400">
              {character.scores.total.toLocaleString()}{' '}
              <span className="text-xs text-slate-400 font-sans tracking-normal">PTS</span>
            </div>
          </div>

          {/* CERTIFICATE STAMP */}
          <div
            className={`transition-all duration-300 transform ${
              stampLanded
                ? 'scale-100 opacity-100 rotate-[-8deg]'
                : 'scale-150 opacity-0 rotate-12'
            }`}
          >
            <div
              className={`px-4 sm:px-6 py-2 rounded-2xl border-2 sm:border-4 font-black uppercase text-center tracking-widest font-['Cinzel'] text-xs sm:text-base ${getRankBadgeStyle(
                character.rank
              )}`}
            >
              <span className="block text-[9px] sm:text-[10px] font-sans tracking-normal text-slate-300">
                PANGKAT RESMI
              </span>
              {character.rank}
            </div>
          </div>
        </div>

        {/* EXPANDABLE POWER SCORE BREAKDOWN */}
        <div className="mt-6">
          <ScoreBreakdownAccordion scores={character.scores} />
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <CardActionButtons
        onDownload={handleDownload}
        isDownloading={isDownloading}
        onCopyText={handleCopyText}
        copied={copied}
        onReroll={onReroll}
      />

      {/* ATTRIBUTE & JUTSU INSPECT MODAL */}
      <JutsuDetailModal
        item={inspectedItem}
        onClose={() => setInspectedItem(null)}
      />
    </div>
  )
}
