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
  Upload
} from 'lucide-react';
import { notificationService } from '../../services/notifications';

export function ProfileSettings({ 
  profile, 
  settings, 
  onSaveProfile, 
  onSaveSettings, 
  onResetData 
}) {
  const [formData, setFormData] = useState({ ...profile });
  const [settingsData, setSettingsData] = useState({ ...settings });
  const [statusMessage, setStatusMessage] = useState('');
  const photoInputRef = useRef(null);

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

      {/* 2. Notifications & Daily Reminders */}
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

      {/* 3. Danger Zone: Reset Data */}
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
