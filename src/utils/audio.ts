// Web Audio API Synthesizer for ninja sound effects (zero external files required)

let audioCtx: AudioContext | null = null
let isMuted = false

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export function toggleMute(): boolean {
  isMuted = !isMuted
  return isMuted
}

export function getMuteStatus(): boolean {
  return isMuted
}

export function playClickSound() {
  playRollTick()
}

export function playRollTick() {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'triangle'
  osc.frequency.setValueAtTime(600 + Math.random() * 200, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.05)

  gain.gain.setValueAtTime(0.15, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start()
  osc.stop(ctx.currentTime + 0.05)
}

export function playThunder() {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  // White noise burst for lightning strike
  const bufferSize = ctx.sampleRate * 0.8
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }

  const noise = ctx.createBufferSource()
  noise.buffer = buffer

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(800, ctx.currentTime)
  filter.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.8)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.4, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8)

  // Sub bass boom
  const osc = ctx.createOscillator()
  const oscGain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(120, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.6)

  oscGain.gain.setValueAtTime(0.5, ctx.currentTime)
  oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)

  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  osc.connect(oscGain)
  oscGain.connect(ctx.destination)

  noise.start()
  osc.start()
  noise.stop(ctx.currentTime + 0.8)
  osc.stop(ctx.currentTime + 0.6)
}

export function playSharinganAwakening() {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(220, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4)
  osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.2)

  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(350, ctx.currentTime)
  filter.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.5)

  gain.gain.setValueAtTime(0.01, ctx.currentTime)
  gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.3)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)

  osc.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  osc.start()
  osc.stop(ctx.currentTime + 1.2)
}

export function playBijuuRoar() {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(90, ctx.currentTime)
  osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 0.8)

  const lfo = ctx.createOscillator()
  const lfoGain = ctx.createGain()
  lfo.frequency.setValueAtTime(15, ctx.currentTime) // vibrato
  lfoGain.gain.setValueAtTime(25, ctx.currentTime)
  lfo.connect(osc.frequency)

  gain.gain.setValueAtTime(0.3, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9)

  osc.connect(gain)
  gain.connect(ctx.destination)

  lfo.start()
  osc.start()
  lfo.stop(ctx.currentTime + 0.9)
  osc.stop(ctx.currentTime + 0.9)
}

export function playFanfare() {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  // Pentatonic arpeggio (Japanese traditional scale notes: D4, F4, G4, A4, C5, D5)
  const notes = [293.66, 349.23, 392.0, 440.0, 523.25, 587.33]
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1)

    gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1)
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + idx * 0.1 + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.5)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime + idx * 0.1)
    osc.stop(ctx.currentTime + idx * 0.1 + 0.5)
  })
}

export function playStamp() {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(180, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.25)

  gain.gain.setValueAtTime(0.6, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start()
  osc.stop(ctx.currentTime + 0.25)
}
