# 🥷 Gacha Shinobi — Generator Silsilah & Kartu Ninja

Aplikasi web interaktif simulator gacha ninja berdasarkan silsilah darah klan, percabangan Dojutsu (Sharingan, Byakugan, Rinnegan, Tenseigan), afinitas cakra, monster Bijuu, dan kalkulasi skor kekuatan (Power Rank) sesuai lore Naruto.

---

## ⚡ Fitur Utama

1. **Tahap 1: Inisiasi Identitas & Desa**
   - Input nama ninja (dengan generator acak).
   - Pemilihan 6 desa: *Konohagakure, Sunagakure, Kirigakure, Kumogakure, Iwagakure*, dan *Nukenin / Akatsuki*.

2. **Tahap 2: Silsilah Garis Darah (Ayah & Ibu)**
   - Animasi mesin slot berputar ganda (*Father & Mother Clan*).
   - Sistem tingkat kelangkaan (Common 40%, Rare 30%, Epic 20%, Mythic 10%).
   - Efek petir & konfeti jika mendapatkan klan *Epic* (Uchiha, Senju, Uzumaki, Hyuga) atau *Mythic* (Otsutsuki).

3. **Tahap 3: Percabangan Dojutsu & Reinkarnasi (Awakening Event)**
   - Layar dramatis menggelap dengan efek animasi pupil mata berputar.
   - **Uchiha Path**: Awakening Sharingan (Belum Awakened, 1 Tomoe, 2 Tomoe, 3 Tomoe, MS, EMS).
   - **Rinnegan Logic (Syarat Ketat)**: Membutuhkan persilangan *Uchiha + Senju/Uzumaki* **DAN** hasil minimal *EMS* untuk memicu roll Rinnegan.
   - **Hyuga Path**: Cabang Utama vs Sampingan, Byakugan Standar, Pure Byakugan, dan peluang *Tenseigan* jika bersilang dengan klan *Otsutsuki*.
   - **Reinkarnasi**: Peluang langka mendapatkan status reinkarnasi Asura, Indra, atau Indra + Asura (Auto-unlock Six Paths Rinnegan).

4. **Tahap 4: Afinitas Elemen Dasar & Wadah Bijuu**
   - Roll 1 hingga 2 elemen dasar: Katon, Raiton, Futon, Doton, Suiton.
   - Peluang 2% roll elemen ke-3: *Onmyoton (Yin-Yang)*.
   - **Bijuu Spin**: 75% Bukan Jinchuriki, 20% Ekor 1–8, 4% Kurama (Yin/Yang/Full), dan 1% Ten-Tails Juubi *(Terkunci hanya untuk pemilik Rinnegan / Six Paths Chakra)*.

5. **Tahap 5: Mode Tempur & Gulungan Jutsu Signature**
   - Sage Mode (Katak Myoboku, Ular Ryuchi, Siput Shikkotsu), Delapan Gerbang Kematian (*Hachimon Tonkou* khusus non-Dojutsu), Segel Kutukan Orochimaru.
   - Pembukaan Kekkei Genkai Campuran otomatis (*Mokuton, Enton, Suika no Jutsu*).
   - Penentuan Jutsu Signature bertingkat (B-Rank s/d Kinjutsu).

6. **Tahap 6: Kartu Ninja Resmi & Power Score**
   - Sertifikat Kartu Ninja dengan animasi stempel resmi (GENIN, CHUNIN, JONIN, KAGE, GOD SHINOBI).
   - Akumulasi Power Score transparan dengan rincian formula.
   - **Download Shinobi Card (PNG)**: Menggunakan `html-to-image` resolusi tinggi.
   - **Salin Data Shinobi**: Format teks rapi siap dibagikan ke WhatsApp, Discord, atau X.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite + TypeScript
- **Styling**: Tailwind CSS v4 + Custom Ninja Aesthetic Glow & Scanlines
- **Icons**: Lucide React
- **Audio Synthesizer**: Web Audio API (100% bebas error file eksternal)
- **Effects & Export**: Canvas Confetti & `html-to-image`

---

## 🚀 Cara Menjalankan Proyek

1. Masuk ke folder proyek:
   ```powershell
   cd c:\Users\Ilham\Documents\fun\minigames\gacha_shinobi
   ```

2. Jalankan development server:
   ```powershell
   npm run dev
   ```

3. Buka browser pada URL yang ditampilkan (biasanya `http://localhost:5173`).
