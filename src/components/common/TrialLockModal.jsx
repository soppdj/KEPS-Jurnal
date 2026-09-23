import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  KeyRound, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles,
  Loader2
} from 'lucide-react';
import { subscriptionService } from '../../services/subscriptionService';

export function TrialLockModal({ subscription, onSubscriptionUpdated }) {
  const [tokenInput, setTokenInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Lock body scroll when trial lock modal is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleRedeem = async (e) => {
    e.preventDefault();
    const cleaned = (tokenInput || '').trim().toUpperCase();
    if (!cleaned) {
      setFeedback({ 
        type: 'error', 
        message: 'Silakan masukkan kode token langganan Anda terlebih dahulu.' 
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const result = await subscriptionService.redeemToken(cleaned, subscription);
      if (result.success) {
        setFeedback({ 
          type: 'success', 
          message: result.message || 'Token valid! Aplikasi telah dibuka kuncinya.' 
        });
        setTimeout(() => {
          onSubscriptionUpdated(result.updatedSubscription);
        }, 1200);
      } else {
        setFeedback({ 
          type: 'error', 
          message: result.message || 'Kode token tidak valid atau tidak dapat digunakan.' 
        });
      }
    } catch (err) {
      setFeedback({ 
        type: 'error', 
        message: 'Terjadi gangguan saat memverifikasi token. Silakan coba lagi.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-navy-950/95 backdrop-blur-2xl overflow-y-auto">
      {/* Background Ambient Glow */}
      <div className="absolute w-[450px] h-[450px] bg-red-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-lg w-full rounded-3xl bg-gradient-to-b from-slate-900 via-navy-950 to-slate-950 border-2 border-red-500/30 shadow-2xl p-6 sm:p-8 text-center text-slate-100 relative animate-in zoom-in-95 duration-300">
        
        {/* Floating 3D Lock Icon */}
        <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-red-600 via-amber-600 to-amber-400 p-0.5 shadow-2xl shadow-red-500/30 flex items-center justify-center mb-6">
          <div className="w-full h-full rounded-[22px] bg-navy-950/90 flex items-center justify-center">
            <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 animate-pulse" strokeWidth={2.2} />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white border-2 border-navy-950 shadow-md">
            <ShieldAlert className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Warning Badges */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold mb-3">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Masa Uji Coba 3 Hari Telah Berakhir</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
          Aplikasi Terkunci
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
          Masa aktif uji coba gratis aplikasi <span className="text-white font-semibold">KEPS Jurnal v.1.0</span> pada perangkat ini telah habis. Akses ke seluruh menu (Beranda, Kasus, Jurnal Refleksi, Analisis, dan Laporan) terkunci sementara.
        </p>

        {/* Token Redemption Form */}
        <form onSubmit={handleRedeem} className="space-y-4 mb-6 text-left">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                <span>Masukkan Token Langganan</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold lowercase">
                1x pakai • terenkripsi
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Silahkan masukkan token Anda di sini!"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border-2 border-slate-700 focus:border-emerald-500 text-white placeholder-slate-500 font-mono text-xs sm:text-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all tracking-wider uppercase"
              />
            </div>
          </div>

          {/* Feedback message */}
          {feedback && (
            <div className={`p-3 rounded-xl text-xs font-medium flex items-start gap-2.5 animate-in fade-in duration-200 ${
              feedback.type === 'success' 
                ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300' 
                : 'bg-red-500/15 border border-red-500/30 text-red-300'
            }`}>
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-3d-emerald w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memverifikasi Token...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Buka Kunci & Aktifkan Langganan</span>
              </>
            )}
          </button>
        </form>

        {/* Purchase Link Option */}
        <div className="pt-4 border-t border-slate-800/80 text-center">
          <p className="text-xs text-slate-400 mb-3">
            Belum memiliki kode token atau ingin memperpanjang masa aktif?
          </p>
          <a
            href="https://fatherlab.myscalev.com/p/keps-jurnal-3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all group"
          >
            <span>Dapatkan / Beli Token Resmi</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
          </a>
        </div>

      </div>
    </div>
  );
}
