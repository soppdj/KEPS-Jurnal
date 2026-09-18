import React, { useState, useEffect } from 'react';
import { Mic, MicOff, AlertCircle, Sparkles, Check, ArrowDownToLine } from 'lucide-react';
import { speechService } from '../../services/speechRecognition';

export function VoiceRecorder({ onInsertText, targetFieldLabel = 'Catatan' }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimText, setInterimText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    setIsSupported(speechService.isSupported());
  }, []);

  const handleToggleRecord = () => {
    setErrorMessage('');

    if (isListening) {
      speechService.stop();
      setIsListening(false);
      // Auto-insert if transcript has content
      if (transcript.trim() && onInsertText) {
        onInsertText(transcript.trim());
      }
    } else {
      setTranscript('');
      setInterimText('');

      const started = speechService.start(
        (result) => {
          if (result.final) {
            setTranscript((prev) => prev + result.final);
            setInterimText('');
          } else {
            setInterimText(result.interim);
          }
        },
        (status) => {
          setIsListening(status === 'listening');
        },
        (errMsg) => {
          setErrorMessage(errMsg);
          setIsListening(false);
        }
      );

      if (!started) {
        setIsListening(false);
      }
    }
  };

  const handleApplyTranscript = () => {
    const fullText = (transcript + ' ' + interimText).trim();
    if (fullText && onInsertText) {
      onInsertText(fullText);
      setTranscript('');
      setInterimText('');
    }
  };

  if (!isSupported) {
    return (
      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-slate-400" />
        <span>Fitur suara memerlukan browser dengan Web Speech API (Google Chrome, Edge, Safari).</span>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-navy-900 border border-slate-700/60 text-white shadow-lg space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <button
              type="button"
              onClick={handleToggleRecord}
              className={`relative p-3 rounded-full font-bold transition-all shadow-md flex items-center justify-center ${
                isListening
                  ? 'bg-rose-500 text-white shadow-rose-500/40 animate-pulse ring-4 ring-rose-500/30'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-emerald-500/30 hover:scale-105'
              }`}
              title={isListening ? 'Hentikan Perekaman Suara' : 'Mulai Rekam Suara (Bahasa Indonesia)'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            {isListening && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                Voice Journaling
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                id-ID
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              {isListening 
                ? 'Mendengarkan... Silakan ceritakan refleksi Anda' 
                : 'Tekan mikrofon untuk mendiktekan refleksi tanpa mengetik'}
            </p>
          </div>
        </div>

        {/* Action Button if transcript exists */}
        {(transcript || interimText) && (
          <button
            type="button"
            onClick={handleApplyTranscript}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all"
          >
            <ArrowDownToLine className="w-4 h-4" />
            <span>Masukkan ke {targetFieldLabel}</span>
          </button>
        )}
      </div>

      {/* Real-time transcript box */}
      {(isListening || transcript || interimText) && (
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-300 leading-relaxed min-h-[48px] flex items-center">
          {transcript || interimText ? (
            <div>
              <span>{transcript}</span>
              <span className="opacity-60 italic">{interimText}</span>
              {isListening && <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-1 animate-blink"></span>}
            </div>
          ) : (
            <span className="text-slate-500 italic">Bicaralah sekarang, teks akan muncul secara otomatis di sini...</span>
          )}
        </div>
      )}

      {/* Error alert */}
      {errorMessage && (
        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
