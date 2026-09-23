import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseVoiceRecognitionOptions {
  lang?: string; // e.g. 'ta-IN', 'en-IN'
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
}

export function useVoiceRecognition(options: UseVoiceRecognitionOptions = {}) {
  const {
    lang = 'ta-IN',
    continuous = false,
    interimResults = true,
    onResult,
    onError,
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore already stopped
      }
      setIsListening(false);
    }
  }, []);

  const startListening = useCallback(
    (customLang?: string) => {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        const msg = 'Speech Recognition is not supported on this browser. Please use Chrome, Edge, or Safari.';
        setErrorMessage(msg);
        onError?.(msg);
        return;
      }

      // Stop previous instance if running
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }

      setTranscript('');
      setInterimTranscript('');
      setErrorMessage(null);

      try {
        const recognition = new SpeechRecognition();
        recognition.lang = customLang || lang || 'ta-IN';
        recognition.continuous = continuous;
        recognition.interimResults = interimResults;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsListening(true);
          setErrorMessage(null);
        };

        recognition.onresult = (event: any) => {
          let currentInterim = '';
          let currentFinal = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            const text = result[0].transcript;
            if (result.isFinal) {
              currentFinal += text;
            } else {
              currentInterim += text;
            }
          }

          if (currentFinal) {
            setTranscript((prev) => {
              const updated = prev ? `${prev} ${currentFinal}` : currentFinal;
              onResult?.(updated, true);
              return updated;
            });
          }

          setInterimTranscript(currentInterim);
          if (currentInterim) {
            onResult?.(currentInterim, false);
          }
        };

        recognition.onerror = (event: any) => {
          let msg = 'Speech recognition error occurred.';
          if (event.error === 'no-speech') {
            msg = 'No speech detected. Please speak into the microphone.';
          } else if (event.error === 'audio-capture') {
            msg = 'Microphone not accessible. Please check your mic permissions.';
          } else if (event.error === 'not-allowed') {
            msg = 'Microphone permission denied. Please allow microphone access.';
          } else if (event.error === 'network') {
            msg = 'Network connection issue with speech service.';
          }
          setErrorMessage(msg);
          onError?.(msg);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (err: any) {
        const msg = err.message || 'Failed to start microphone.';
        setErrorMessage(msg);
        onError?.(msg);
        setIsListening(false);
      }
    },
    [lang, continuous, interimResults, onResult, onError]
  );

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setErrorMessage(null);
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    errorMessage,
    startListening,
    stopListening,
    resetTranscript,
  };
}

// Text to speech helper for Tamil and English
export function speakText(text: string, lang: 'ta-IN' | 'en-IN' | 'ta' | 'en' = 'ta-IN') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  window.speechSynthesis.cancel(); // Stop ongoing speech

  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  const targetLang = lang.startsWith('ta') ? 'ta-IN' : 'en-IN';
  utterance.lang = targetLang;
  utterance.rate = 0.95; // slightly slower for clearer comprehension by farmers
  utterance.pitch = 1.0;

  // Try to find native Tamil voice if available
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find((v) => v.lang === targetLang || v.lang.startsWith(targetLang.slice(0, 2)));
  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
