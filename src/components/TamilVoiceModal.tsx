import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Bot,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Sprout,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import { DistrictInfo, Language } from '../types';
import { useVoiceRecognition, speakText, stopSpeaking } from '../hooks/useVoiceRecognition';

interface TamilVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  district: DistrictInfo;
  language: Language;
  onNavigateTab?: (tabId: string, searchQuery?: string) => void;
}

export const TamilVoiceModal: React.FC<TamilVoiceModalProps> = ({
  isOpen,
  onClose,
  district,
  language,
  onNavigateTab,
}) => {
  const [selectedLang, setSelectedLang] = useState<'ta-IN' | 'en-IN'>(
    language === 'en' ? 'en-IN' : 'ta-IN'
  );
  const [spokenText, setSpokenText] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    errorMessage,
    startListening,
    stopListening,
    resetTranscript,
  } = useVoiceRecognition({
    lang: selectedLang,
    onResult: (text, isFinal) => {
      setSpokenText(text);
      if (isFinal) {
        // Auto process final transcript
        processVoiceQuery(text);
      }
    },
  });

  // Clean state on modal open/close without insecure auto-start
  useEffect(() => {
    if (isOpen) {
      setSpokenText('');
      setCustomInput('');
      setResponse(null);
      resetTranscript();
    } else {
      stopListening();
      stopSpeaking();
    }
  }, [isOpen, selectedLang]);

  const processVoiceQuery = async (queryText: string) => {
    const text = queryText.trim();
    if (!text) return;
    setIsProcessing(true);
    stopListening();
    setSpokenText(text);

    try {
      const lower = text.toLowerCase();

      // Quick shortcut navigation check if matching common tabs
      if (onNavigateTab) {
        if (lower.includes('mandi') || lower.includes('விலை') || lower.includes('rate') || lower.includes('price')) {
          onNavigateTab('mandi-prices');
        } else if (lower.includes('b2b') || lower.includes('b2c') || lower.includes('client') || lower.includes('வாடிக்கையாளர்') || lower.includes('market') || lower.includes('buyer')) {
          onNavigateTab('b2b-marketplace');
        } else if (lower.includes('disease') || lower.includes('நோய்') || lower.includes('leaf') || lower.includes('pest')) {
          onNavigateTab('disease-scanner');
        } else if (lower.includes('scheme') || lower.includes('மானியம்') || lower.includes('insurance')) {
          onNavigateTab('scheme-finder');
        }
      }

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language: selectedLang.startsWith('ta') ? 'ta' : 'en',
          district: district.nameEn,
        }),
      });

      let reply = '';
      if (res.ok) {
        const data = await res.json();
        reply = data.reply;
      } else {
        reply = selectedLang.startsWith('ta')
          ? `வணக்கம்! ${district.nameTa} மாவட்டத்திற்கான உழவர் ஆலோசனை: "${text}" குறித்து TNAU வழிகாட்டல்படி பயிர் பாதுகாப்பு, சரியான பாசன இடைவெளி மற்றும் உழவர் சந்தை நேரடி விற்பனையை மேற்கொள்ள பரிந்துரைக்கப்படுகிறது.`
          : `For ${district.nameEn} farmers: Regarding "${text}", TNAU recommends optimal seed spacing, balanced NPK foliar nutrition, and direct sales at the nearest Uzhavar Sandhai.`;
      }

      setResponse(reply);
      setIsSpeaking(true);
      speakText(reply, selectedLang);
    } catch (err) {
      console.warn('Voice AI query fallback:', err);
      const fallbackReply = selectedLang.startsWith('ta')
        ? `வணக்கம்! உங்கள் கேள்வி: "${text}". ${district.nameTa} மாவட்டத்திற்கு தேவையான பயிர் பாதுகாப்பு, மண் பரிசோதனை மற்றும் விதை தேர்வு வழிகாட்டல்கள் தயார் நிலையில் உள்ளன. ஏதேனும் சந்தேகத்திற்கு உழவர் உதவி மையம் 1800-180-1551 அழைக்கலாம்.`
        : `Regarding your query "${text}" in ${district.nameEn}: TNAU agronomic best practices suggest timely disease monitoring and consulting local Krishi Vigyan Kendra (KVK).`;
      setResponse(fallbackReply);
      speakText(fallbackReply, selectedLang);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else if (response) {
      setIsSpeaking(true);
      speakText(response, selectedLang);
    }
  };

  const sampleTamilPrompts = [
    {
      text: 'What are the crop listings and direct orders in the Farmer to Client (B2C) Marketplace?',
      label: '🏪 Farmer to Client (B2C) Marketplace',
      tab: 'b2b-marketplace',
    },
    {
      text: 'What are the Tamil Nadu government crop insurance and drip irrigation schemes?',
      label: '🛡️ Insurance & Subsidies (காப்பீடு & மானியங்கள்)',
      tab: 'scheme-finder',
    },
    {
      text: 'What is the best crop and soil recommendation for my district?',
      label: '🌱 Crop Advisory & Soil Insights',
      tab: 'crop-advisory',
    },
    {
      text: 'What is the Mettur dam water level and paddy irrigation requirement?',
      label: '💧 Mettur Dam & Water Budget',
      tab: 'smart-irrigation',
    },
    {
      text: 'What is the current live mandi price for Paddy in Thanjavur?',
      label: '🌾 Paddy Mandi Price & Trends',
      tab: 'mandi-prices',
      search: 'Paddy',
    },
    {
      text: 'How to treat banana leaf spot disease with biological remedies?',
      label: '🍌 Disease Diagnosis & PDF Report',
      tab: 'disease-scanner',
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div
        id="tamil-voice-assistant-modal"
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-emerald-500/50 overflow-hidden flex flex-col max-h-[90vh] relative animate-scaleUp"
      >
        {/* Top Accent Gradient Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={() => {
              stopListening();
              stopSpeaking();
              onClose();
            }}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/30 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shadow-md">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  Voice Assistant &amp; Search (குரல் உதவி)
                </h3>
                <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  Hands-Free AI
                </span>
              </div>
              <p className="text-xs text-emerald-100 mt-0.5 font-medium">
                Speak directly in English or Tamil for instant crop advice and live mandi prices in {district.nameEn}.
              </p>
            </div>
          </div>

          {/* Language Selector Pills */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider">
              Voice Language:
            </span>
            <div className="flex bg-emerald-950/60 p-1 rounded-xl border border-emerald-500/40">
              <button
                onClick={() => {
                  setSelectedLang('en-IN');
                  if (isListening) startListening('en-IN');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  selectedLang === 'en-IN'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                English (Default)
              </button>
              <button
                onClick={() => {
                  setSelectedLang('ta-IN');
                  if (isListening) startListening('ta-IN');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  selectedLang === 'ta-IN'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                🇮🇳 தமிழ் (Tamil)
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Microphone Interaction Circle */}
          <div className="flex flex-col items-center justify-center text-center py-2">
            <div className="relative">
              {/* Pulsing Ripple Rings when listening */}
              {isListening && (
                <>
                  <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping" />
                  <div className="absolute -inset-3 rounded-full bg-emerald-500/20 animate-pulse" />
                </>
              )}

              <button
                id="voice-mic-main-button"
                onClick={() => {
                  if (isListening) {
                    stopListening();
                  } else {
                    startListening(selectedLang);
                  }
                }}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xl relative z-10 ${
                  isListening
                    ? 'bg-gradient-to-tr from-rose-600 to-red-500 text-white scale-105 ring-4 ring-rose-300 shadow-rose-500/30'
                    : isProcessing
                    ? 'bg-emerald-700 text-white animate-pulse'
                    : 'bg-gradient-to-tr from-emerald-600 via-green-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white hover:scale-105 shadow-emerald-700/30 ring-4 ring-emerald-200/60'
                }`}
                title={isListening ? 'Click to Stop' : 'Click to Speak (பேச கிளிக் செய்யவும்)'}
              >
                {isListening ? (
                  <Mic className="w-10 h-10 animate-bounce" />
                ) : isProcessing ? (
                  <Sparkles className="w-10 h-10 animate-spin" />
                ) : (
                  <Mic className="w-10 h-10" />
                )}
              </button>
            </div>

            <p className="mt-3 text-xs sm:text-sm font-extrabold text-slate-800">
              {isListening ? (
                <span className="text-rose-600 flex items-center gap-1.5 font-black animate-pulse">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block animate-ping" />
                  Listening... Speak now in {selectedLang === 'ta-IN' ? 'Tamil' : 'English'}
                </span>
              ) : isProcessing ? (
                <span className="text-emerald-700 font-black">
                  Processing agricultural query with AI...
                </span>
              ) : (
                <span className="text-slate-700 font-bold">
                  Tap mic to speak, or type your question below
                </span>
              )}
            </p>

            {/* Error banner if browser permissions or speech fails */}
            {errorMessage && (
              <p className="mt-2 text-xs text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 font-medium">
                Note: {errorMessage} — You can also type your question directly below!
              </p>
            )}
          </div>

          {/* Quick Text Input Fallback (Works 100% in all browsers & iframes) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (customInput.trim()) {
                processVoiceQuery(customInput.trim());
                setCustomInput('');
              }
            }}
            className="flex items-center gap-2 bg-slate-50 border-2 border-emerald-500/40 focus-within:border-emerald-600 rounded-2xl p-1.5 shadow-xs transition-all"
          >
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="💬 Type your question (e.g. 'Paddy mandi price in Thanjavur' or 'வாழை நோய்')..."
              className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-hidden"
            />
            <button
              type="submit"
              disabled={!customInput.trim() || isProcessing}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs transition-all"
            >
              <span>{isProcessing ? 'Thinking...' : 'Ask AI'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Real-time Transcription Box */}
          <div className="bg-slate-50 rounded-2xl border-2 border-slate-200 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-emerald-600" />
                Transcribed / Asked Speech:
              </span>
              {(spokenText || transcript || interimTranscript) && (
                <button
                  onClick={() => {
                    setSpokenText('');
                    resetTranscript();
                    setResponse(null);
                  }}
                  className="text-[10px] font-bold text-slate-400 hover:text-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>

            <div className="min-h-[44px] text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
              {spokenText || transcript || interimTranscript ? (
                <span>
                  {spokenText || transcript}{' '}
                  {interimTranscript && (
                    <span className="text-slate-400 italic font-normal">{interimTranscript}</span>
                  )}
                </span>
              ) : (
                <span className="text-slate-400 text-xs font-medium italic">
                  எ.கா: "தஞ்சாவூர் நெல் விலை என்ன?", "வாழை இலைக்கருகல் மருந்து என்ன?" என்று பேசுங்கள்...
                </span>
              )}
            </div>

            {spokenText && !response && !isProcessing && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => processVoiceQuery(spokenText)}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>கேள் (Ask AI)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* AI Response Slide Card with Text-To-Speech Readout */}
          {response && (
            <div className="bg-gradient-to-br from-emerald-50/90 via-teal-50/90 to-white rounded-2xl border-2 border-emerald-400/80 p-5 space-y-3 shadow-md">
              <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
                <div className="flex items-center gap-2 font-black text-xs text-emerald-950">
                  <Bot className="w-4 h-4 text-emerald-700" />
                  <span>Agri-Mitra AI Voice Answer:</span>
                </div>
                <button
                  onClick={handleToggleSpeak}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-rose-600 text-white shadow-xs animate-pulse'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                  }`}
                  title="Listen in English or Tamil"
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Stop Audio</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen to Answer</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed whitespace-pre-line">
                {response}
              </p>
            </div>
          )}

          {/* Quick Voice Shortcuts & Tab Launchers */}
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Quick Voice Prompts &amp; Shortcuts:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sampleTamilPrompts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSpokenText(item.text);
                    processVoiceQuery(item.text);
                    if (item.tab && onNavigateTab) {
                      onNavigateTab(item.tab, item.search);
                    }
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-800 block group-hover:text-blue-900">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium italic">
                      "{item.text}"
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <Sprout className="w-3.5 h-3.5 text-blue-700" />
            Tamil Web Speech API (ta-IN) &amp; TNAU Agronomic Grounding
          </span>
          <button
            onClick={() => {
              stopListening();
              stopSpeaking();
              onClose();
            }}
            className="font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
