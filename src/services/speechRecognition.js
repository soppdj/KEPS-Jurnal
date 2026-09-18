/**
 * Web Speech API Service for Voice-to-Text Journaling
 * Optimized for Indonesian language ('id-ID')
 */

export class SpeechService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.status = 'idle'; // 'idle' | 'listening' | 'error' | 'unsupported'
    this.onTranscriptCallback = null;
    this.onStatusChangeCallback = null;
    this.onErrorCallback = null;

    this.init();
  }

  init() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.status = 'unsupported';
      console.warn('[KEPS Speech] Speech Recognition is not supported by this browser.');
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'id-ID';

      this.recognition.onstart = () => {
        this.isListening = true;
        this.status = 'listening';
        if (this.onStatusChangeCallback) this.onStatusChangeCallback('listening');
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (this.onTranscriptCallback) {
          this.onTranscriptCallback({
            final: finalTranscript,
            interim: interimTranscript,
            raw: finalTranscript || interimTranscript
          });
        }
      };

      this.recognition.onerror = (event) => {
        console.error('[KEPS Speech] Error occurred:', event.error);
        this.isListening = false;
        this.status = 'error';
        let userMessage = 'Gagal merekam suara.';
        if (event.error === 'not-allowed') {
          userMessage = 'Izin mikrofon belum diberikan. Silakan aktifkan izin mikrofon di browser.';
        } else if (event.error === 'no-speech') {
          userMessage = 'Suara tidak terdeteksi. Silakan coba berbicara lebih dekat.';
        } else if (event.error === 'network') {
          userMessage = 'Fitur suara memerlukan koneksi internet aktif pada browser ini.';
        }
        if (this.onErrorCallback) this.onErrorCallback(userMessage, event.error);
        if (this.onStatusChangeCallback) this.onStatusChangeCallback('error');
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.status = 'idle';
        if (this.onStatusChangeCallback) this.onStatusChangeCallback('idle');
      };
    } catch (e) {
      console.error('[KEPS Speech] Initialization error:', e);
      this.status = 'unsupported';
    }
  }

  isSupported() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  start(onTranscript, onStatusChange, onError) {
    if (!this.recognition) {
      if (onError) onError('Browser Anda belum mendukung input suara.');
      return false;
    }

    if (this.isListening) {
      this.stop();
      return true;
    }

    this.onTranscriptCallback = onTranscript;
    this.onStatusChangeCallback = onStatusChange;
    this.onErrorCallback = onError;

    try {
      this.recognition.start();
      return true;
    } catch (err) {
      console.error('[KEPS Speech] Failed to start recognition:', err);
      if (onError) onError('Tidak dapat memulai perekam suara. Coba lagi.');
      return false;
    }
  }

  stop() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (err) {
        console.warn('[KEPS Speech] Failed to stop smoothly:', err);
      }
    }
    this.isListening = false;
    this.status = 'idle';
    if (this.onStatusChangeCallback) this.onStatusChangeCallback('idle');
  }
}

export const speechService = new SpeechService();
