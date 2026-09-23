import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  Send,
  Bot,
  User,
  Volume2,
  VolumeX,
  RefreshCw,
  HelpCircle,
  Mic,
  MicOff,
} from 'lucide-react';
import { ChatMessage, DistrictInfo, Language } from '../types';
import { useVoiceRecognition, speakText, stopSpeaking } from '../hooks/useVoiceRecognition';
import { useLanguage } from '../context/LanguageContext';

interface AgriMitraAITabProps {
  district: DistrictInfo;
  language?: Language;
  isOfflineMode: boolean;
}

export const AgriMitraAITab: React.FC<AgriMitraAITabProps> = ({
  district,
  isOfflineMode,
}) => {
  const { t, getDistrictName, language } = useLanguage();
  const districtName = getDistrictName(district);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      text:
        language === 'ta'
          ? `வணக்கம் உழவரே! நான் உங்கள் "உழவன் AI" (Agri-Mitra AI). ${district.nameTa} மாவட்டத்தின் மண், பயிர் சாகுபடி, பூச்சி மேலாண்மை, அரசு மானியங்கள் மற்றும் சந்தை நிலவரங்கள் பற்றி என்னிடம் கேளுங்கள். (குரல் மூலமாகவும் பேசலாம்!)`
          : `Vanakkam! I am your "Agri-Mitra AI" agricultural decision assistant. Ask me anything about crop planning in ${districtName}, TNAU seed varieties, pest remedies, fertilizer dosages, or current mandi rates. You can also use the microphone to speak!`,
      timestamp: 'Just now',
    },
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);
  const [voiceLang, setVoiceLang] = useState<'ta-IN' | 'en-IN'>(
    language === 'ta' ? 'ta-IN' : 'en-IN'
  );

  const {
    isListening,
    startListening,
    stopListening,
    errorMessage: voiceError,
  } = useVoiceRecognition({
    lang: voiceLang,
    onResult: (text, isFinal) => {
      setInputVal(text);
    },
  });

  const handleToggleSpeakMessage = (msgId: string, text: string) => {
    if (activeSpeechId === msgId) {
      stopSpeaking();
      setActiveSpeechId(null);
    } else {
      stopSpeaking();
      setActiveSpeechId(msgId);
      speakText(text, language === 'ta' || /[஀-௿]/.test(text) ? 'ta-IN' : 'en-IN');
    }
  };

  const quickPrompts = [
    {
      labelEn: '🌾 Fertilizer dosage for Samba Paddy',
      labelTa: '🌾 சம்பா நெல்லுக்கு உர அளவு',
      prompt: `What is the recommended NPK fertilizer split and biofertilizer schedule for Samba Paddy in ${district.nameEn}?`,
    },
    {
      labelEn: '🌿 Organic control for Paddy Blast',
      labelTa: '🌿 குலை நோய்க்கு இயற்கை மருந்து',
      prompt: 'How to prepare and spray Panchagavya and Pseudomonas for blast control in paddy?',
    },
    {
      labelEn: '💧 100% Drip Irrigation Subsidy (PMKSY)',
      labelTa: '💧 100% சொட்டு நீர் பாசன மானியம்',
      prompt: 'What are the documents needed for 100% micro-irrigation subsidy in Tamil Nadu?',
    },
    {
      labelEn: '💰 Top profitable crops for next season',
      labelTa: '💰 அடுத்த பருவத்திற்கு அதிக லாபம் தரும் பயிர்',
      prompt: `Which short-duration cash crops yield the highest profit in ${district.nameEn} with borewell water?`,
    },
  ];

  const handleSend = async (userPrompt?: string) => {
    const textToSend = userPrompt || inputVal;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userPrompt) setInputVal('');
    setIsSending(true);

    try {
      if (isOfflineMode) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              text: `[Offline Local Cache] Regarding "${textToSend}": For ${district.nameEn} agro-climatic conditions, TNAU recommends standard NPK 120:40:40 kg/ha for HYV paddy, with split application of Urea + Potash at active tillering and panicle initiation.`,
              timestamp: 'Just now',
            },
          ]);
          setIsSending(false);
        }, 500);
        return;
      }

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language: language === 'ta' ? 'ta' : 'en',
          district: district.nameEn,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            text: data.reply,
            timestamp: 'Just now',
          },
        ]);
      }
    } catch (err) {
      console.warn('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: 'TNAU Advisory Center is currently synchronizing telemetry. Please check your network or switch to local cache mode.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div id="agri-mitra-ai-tab" className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {t.agriMitraTitle}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900">
                  TNAU Agronomic Grounding
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-0.5 font-medium leading-relaxed">
                {t.agriMitraSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Question Chips */}
        <div className="pt-4">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
            FREQUENT FARMER QUESTIONS:
          </span>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item.prompt)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 text-xs font-bold text-slate-800 transition-all text-left cursor-pointer"
              >
                {language === 'ta' ? item.labelTa : item.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col h-[480px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((msg) => {
            const isBot = msg.role === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-2xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs relative group ${
                    isBot
                      ? 'bg-blue-50/90 text-slate-900 border-2 border-blue-200/90 font-medium'
                      : 'bg-gradient-to-r from-rose-900 to-red-950 text-white font-bold border border-rose-500/40'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/60">
                    <span
                      className={`text-[10px] font-semibold ${
                        isBot ? 'text-blue-700' : 'text-rose-200'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                    {isBot && (
                      <button
                        onClick={() => handleToggleSpeakMessage(msg.id, msg.text)}
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                          activeSpeechId === msg.id
                            ? 'bg-rose-600 text-white animate-pulse'
                            : 'bg-blue-100 hover:bg-blue-200 text-blue-900'
                        }`}
                        title="Listen to this advisory"
                      >
                        {activeSpeechId === msg.id ? (
                          <>
                            <VolumeX className="w-3 h-3" />
                            <span>நிறுத்து (Stop)</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3" />
                            <span>கேள் (Listen)</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                {!isBot && (
                  <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
          {isSending && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center shrink-0">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-200" />
              </div>
              <div className="bg-blue-50 text-blue-900 border border-blue-200 p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                <span>Agri-Mitra AI is formulating recommendations...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar & Voice STT Controls */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          {/* Listening Live Status Banner */}
          {isListening && (
            <div className="flex items-center justify-between bg-rose-50 border-2 border-rose-300 px-3.5 py-2 rounded-xl text-xs text-rose-800 font-bold animate-pulse">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                <span>
                  {voiceLang === 'ta-IN' ? 'தமிழில் பேசவும்... (Listening in Tamil...)' : 'Listening in English...'}
                </span>
              </span>
              <button
                onClick={stopListening}
                className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-md hover:bg-rose-700 cursor-pointer"
              >
                நிறுத்து (Done)
              </button>
            </div>
          )}

          {voiceError && (
            <p className="text-[11px] text-rose-600 bg-rose-50 px-3 py-1 rounded-lg border border-rose-200">
              {voiceError}
            </p>
          )}

          <div className="flex items-center gap-2">
            {/* Voice Language Toggle Pill */}
            <button
              onClick={() => {
                const nextLang = voiceLang === 'ta-IN' ? 'en-IN' : 'ta-IN';
                setVoiceLang(nextLang);
                if (isListening) startListening(nextLang);
              }}
              className="px-2.5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-black border border-slate-200 transition-all shrink-0 cursor-pointer"
              title="Switch Voice Speech-to-Text Language"
            >
              {voiceLang === 'ta-IN' ? '🇮🇳 தமிழ்' : 'EN'}
            </button>

            {/* Mic Speech-to-Text Button */}
            <button
              id="agri-mitra-voice-mic-btn"
              onClick={() => {
                if (isListening) {
                  stopListening();
                } else {
                  startListening(voiceLang);
                }
              }}
              className={`p-3 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs ${
                isListening
                  ? 'bg-rose-600 text-white animate-bounce ring-2 ring-rose-400'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200'
              }`}
              title={isListening ? 'Click to stop listening' : 'Speak in Tamil / English'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.askAssistantPlaceholder}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />

            <button
              id="send-agri-mitra-chat-btn"
              onClick={() => handleSend()}
              disabled={isSending || !inputVal.trim()}
              className="px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 shadow-xs shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{t.sendButton}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
