import React, { useState, useRef } from 'react';
import { 
  User, 
  School, 
  Bell, 
  RotateCcw, 
  Save, 
  CheckCircle2, 
  AlertTriangle,
  Send,
  Camera,
  Trash2,
  Image as ImageIcon,
  Upload,
  CreditCard,
  ShieldCheck,
  Key,
  Clock,
  Sparkles,
  Loader2,
  Check,
  ExternalLink
} from 'lucide-react';
import { notificationService } from '../../services/notifications';
import { subscriptionService } from '../../services/subscriptionService';
import { DEFAULT_SUBSCRIPTION } from '../../data/defaultState';

export function ProfileSettings({ 
  profile, 
  settings, 
  subscription = DEFAULT_SUBSCRIPTION,
  onSaveProfile, 
  onSaveSettings, 
  onUpdateSubscription,
  onResetData 
}) {
  const [formData, setFormData] = useState({ ...profile });
  const [settingsData, setSettingsData] = useState({ ...settings });
  const [statusMessage, setStatusMessage] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [tokenFeedback, setTokenFeedback] = useState(null);
  const photoInputRef = useRef(null);

  const subStatus = subscriptionService.getSubscriptionStatus(subscription);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar yang valid (JPG, PNG, atau WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Resize to max 400x400 to keep state compact and snappy
        const maxDim = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setFormData(prev => ({ ...prev, photoUrl: compressedDataUrl }));
        showStatus('Foto profil berhasil diunggah! Klik "Simpan Identitas Profil" untuk menyimpan.');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, photoUrl: '' }));
    if (photoInputRef.current) photoInputRef.current.value = '';
    showStatus('Foto profil telah dihapus.');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onSaveProfile(formData);
    showStatus('Profil sekolah dan kepala sekolah berhasil disimpan!');
  };

  const showStatus = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const handleTestNotification = () => {
    notificationService.sendTestNotification();
    showStatus('Notifikasi uji telah dikirimkan ke layar Anda.');
  };

  const handleRedeemToken = async (e) => {
    e.preventDefault();
    const cleaned = (tokenInput || '').trim().toUpperCase();
    if (!cleaned) {
      setTokenFeedback({ type: 'error', message: 'Silakan ketik atau tempel kode token langganan terlebih dahulu.' });
      return;
    }

    setIsRedeeming(true);
    setTokenFeedback(null);

    try {
      const result = await subscriptionService.redeemToken(cleaned, subscription);
      if (result.success) {
        setTokenFeedback({ 
          type: 'success', 
          message: result.message || 'Token berhasil ditukarkan! Masa aktif langganan Anda telah diperpanjang.' 
        });
        setTokenInput('');
        if (onUpdateSubscription) {
          onUpdateSubscription(result.updatedSubscription);
        }
      } else {
        setTokenFeedback({ 
          type: 'error', 
          message: result.error || 'Token tidak valid atau sudah pernah digunakan.' 
        });
      }
    } catch (err) {
      setTokenFeedback({ 
        type: 'error', 
        message: 'Terjadi kendala saat memproses token: ' + (err.message || 'Silakan coba kembali.') 
      });
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Toast message */}
      {statusMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-sm flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* 1. Identity & School Profile Form */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-navy-800 text-white dark:bg-slate-800 dark:text-emerald-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Identitas Kepala Sekolah & Satuan Pendidikan
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Data ini akan dicantumkan secara resmi pada cetak laporan portofolio dan kartu refleksi harian
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-5 pt-1">
          {/* Foto Profil Kepala Sekolah */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative group shrink-0">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 shadow-sm flex items-center justify-center">
                {formData.photoUrl ? (
                  <img 
                    src={formData.photoUrl} 
                    alt="Foto Profil Kepala Sekolah" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-slate-400 dark:text-slate-500" />
                )}
              </div>
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="absolute inset-0 bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer text-[10px] font-bold"
                title="Ganti Foto Profil"
              >
                <Camera className="w-5 h-5 mb-0.5" />
                <span>Ganti</span>
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Pas Foto Resmi Kepala Sekolah
                </h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  Opsional
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gunakan foto formal/berpakaian dinas. Foto akan disematkan pada lembar kartu portofolio dan profil harian.
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <input 
                  type="file" 
                  ref={photoInputRef}
                  accept="image/png, image/jpeg, image/webp" 
                  onChange={handlePhotoUpload} 
                  className="hidden" 
                />
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-600 transition-all shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{formData.photoUrl ? 'Ganti Foto' : 'Unggah Foto'}</span>
                </button>

                {formData.photoUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Nama Lengkap Kepala Sekolah & Gelar
              </label>
              <input
                type="text"
                name="principalName"
                value={formData.principalName}
                onChange={handleProfileChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Nomor Induk Pegawai (NIP)
              </label>
              <input
                type="text"
                name="nip"
                value={formData.nip}
                onChange={handleProfileChange}
                placeholder="19750812 199903 2 004"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Nama Satuan Pendidikan (Sekolah)
              </label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleProfileChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Alamat Sekolah / Satuan Pendidikan
              </label>
              <input
                type="text"
                name="schoolAddress"
                value={formData.schoolAddress || ''}
                onChange={handleProfileChange}
                placeholder="Jl. Nama Jalan No. XX, Kelurahan, Kecamatan, Kota/Kabupaten"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-900 text-white dark:bg-emerald-500 dark:text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Identitas Profil</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. Subscription & Executive Membership */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-navy-800 text-white shadow-md">
              <CreditCard className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Status Langganan & Keanggotaan
                </h3>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  subscription?.isTrial 
                    ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30' 
                    : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                }`}>
                  <Sparkles className="w-3 h-3" />
                  {subscription?.isTrial ? 'Trial 7 Hari' : 'VIP Eksekutif'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Kelola masa aktif lisensi kepemimpinan dan perpanjangan keanggotaan berbasis token
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
              subStatus.isActive 
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
            }`}>
              <span className={`w-2 h-2 rounded-full ${subStatus.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
              {subStatus.statusLabel}
            </span>
          </div>
        </div>

        {/* Current Plan Overview Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/80 dark:from-slate-800/60 dark:to-slate-900/60 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                Paket Aktif Saat Ini
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                {subscription?.planName || (subscription?.isTrial ? 'Masa Uji Coba 7 Hari (Trial)' : 'Paket 3 Bulan (90 Hari) Kepemimpinan Berdampak')}
              </h4>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                Masa Berlaku Hingga
              </span>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {subStatus.formattedExpiry}
              </p>
            </div>
          </div>

          {/* Progress Bar Sisa Hari */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Sisa Masa Aktif:
              </span>
              <span className="font-extrabold text-navy-800 dark:text-emerald-400">
                {subStatus.daysRemaining} Hari Kalender
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  subStatus.daysRemaining > 30 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                    : subStatus.daysRemaining > 10 
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400' 
                      : 'bg-gradient-to-r from-rose-500 to-orange-500'
                }`}
                style={{ width: `${Math.max(5, Math.min(100, subStatus.percentageRemaining))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Token Redemption Form */}
        <div className="pt-1 space-y-3">
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Perpanjang Langganan dengan Token Resmi
            </label>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Masukkan kode token aktivasi 1x pakai yang Anda terima dari Administrator untuk menambah masa aktif keanggotaan.
            </p>
          </div>

          <form onSubmit={handleRedeemToken} className="space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <div className="relative flex-1">
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
                  placeholder="Silahkan masukkan token Anda di sini!"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm uppercase font-mono tracking-wider text-slate-900 dark:text-white placeholder:normal-case placeholder:font-sans placeholder:tracking-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={isRedeeming || !tokenInput.trim()}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-900 text-white dark:bg-emerald-500 dark:text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 disabled:opacity-50 disabled:pointer-events-none shrink-0"
              >
                {isRedeeming ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Memvalidasi...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Klaim / Perpanjang</span>
                  </>
                )}
              </button>
            </div>

            {/* Token Feedback message */}
            {tokenFeedback && (
              <div className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 animate-in fade-in ${
                tokenFeedback.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                  : 'bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300'
              }`}>
                {tokenFeedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                )}
                <span>{tokenFeedback.message}</span>
              </div>
            )}
          </form>

          {/* Link Perpanjangan / Pembelian Token Resmi */}
          <div className="mt-3 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="font-bold text-slate-900 dark:text-white block">
                Belum memiliki token atau ingin memperpanjang masa aktif?
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Dapatkan kode token resmi (Paket 1 Bulan & 3 Bulan) melalui tautan berikut.
              </p>
            </div>
            <a
              href="https://fatherlab.myscalev.com/p/keps-jurnal-3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all hover:scale-105 shrink-0"
            >
              <span>Dapatkan Token Langganan</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. Notifications & Daily Reminders */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Pengingat & Notifikasi Harian (PWA Push)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Notifikasi otomatis untuk menjaga kebiasaan kepemimpinan situasional tanpa terlewat
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <span className="text-2xl">🌅</span>
            <div>
              <strong className="text-sm font-bold text-slate-900 dark:text-white block">
                07:00 Pagi (Aksi Pagi)
              </strong>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                "Cek Situasi Kepemimpinan & Aksi Nyata Hari Ini"
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <span className="text-2xl">📝</span>
            <div>
              <strong className="text-sm font-bold text-slate-900 dark:text-white block">
                13:30 Siang (Refleksi Harian)
              </strong>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                "Waktunya Menulis Refleksi & Evaluasi Kepemimpinan Harian"
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-500">
            Status Izin: <strong className="text-slate-800 dark:text-slate-200">{notificationService.getPermission().toUpperCase()}</strong>
          </span>
          <button
            type="button"
            onClick={handleTestNotification}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Uji Notifikasi Sekarang</span>
          </button>
        </div>
      </div>

      {/* 4. Danger Zone: Reset Data */}
      <div className="p-6 rounded-3xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-3">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
          <AlertTriangle className="w-5 h-5" />
          <span>Zona Risiko (Reset Data)</span>
        </div>
        <p className="text-xs text-rose-700 dark:text-rose-300 leading-relaxed">
          Mengembalikan aplikasi ke pengaturan awal pabrik. Seluruh refleksi dan centang aksi kepemimpinan yang belum dicadangkan akan dihapus secara permanen.
        </p>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Apakah Anda yakin ingin menghapus seluruh data jurnal dan mengembalikannya ke pengaturan awal? Tindakan ini tidak dapat dibatalkan.')) {
              onResetData();
              showStatus('Seluruh data berhasil direset ke pengaturan awal.');
            }
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-all shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Seluruh Data Aplikasi</span>
        </button>
      </div>
    </div>
  );
}
