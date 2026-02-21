import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Upload,
    Send,
    Shield,
    FileText,
    Paperclip,
    Trash2,
    Bot,
    User,
    Search,
    Lock,
    Sparkles,
    CheckCircle2,
    Settings,
    MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const translations = {
    en: {
        back: "Back to Hub",
        title: "DeepChat AI",
        subtitle: "Private Neural Network",
        status: "Local GPU Engaged",
        privacy: "100% Offline & Encrypted",
        upload: "Analyze Document",
        recentDocs: "Memory Buffer",
        noDocs: "Ready for deep document analysis.",
        assistantTitle: "Nexus-Prime AI",
        assistantDesc: "I am a local-first neural model. I process your data directly on your hardware with zero external latency.",
        hints: ["Summarize my contract", "Find liability clauses", "Draft a legal response"],
        inputPlaceholderDoc: "Ask Nexus about this file...",
        inputPlaceholderNoDoc: "Enter prompt or upload data...",
        processing: "Neural inference in progress...",
        footer: "Powered by Local Llama 3 // Data remains in volatile memory only.",
        dynamicReplies: {
            hello: "Greetings. I am Nexus-Prime. How can I assist your workflow today?",
            summarize: "Initiating multi-pass summarization... I've identified 3 key points and a primary risk factor in the provided context.",
            thank: "Operational efficiency is my priority. Anything else?",
            default: "Analysis complete. I've processed your query relative to the available local context. Would you like a deeper breakdown?"
        }
    },
    fr: {
        back: "Retour",
        title: "DeepChat IA",
        subtitle: "Réseau Neuronal Privé",
        status: "GPU Local Engagé",
        privacy: "100% Hors-ligne & Chiffré",
        upload: "Analyser Document",
        recentDocs: "Mémoire Tampon",
        noDocs: "Prêt pour l'analyse profonde.",
        assistantTitle: "IA Nexus-Prime",
        assistantDesc: "Je suis un modèle neuronal local. Je traite vos données directement sur votre matériel sans latence externe.",
        hints: ["Résumer mon contrat", "Trouver les clauses", "Rédiger une réponse"],
        inputPlaceholderDoc: "Posez une question sur ce fichier...",
        inputPlaceholderNoDoc: "Entrez un prompt ou chargez des données...",
        processing: "Inférence neuronale en cours...",
        footer: "Propulsé par Llama 3 Local // Les données restent en mémoire volatile.",
        dynamicReplies: {
            hello: "Salutations. Je suis Nexus-Prime. Comment puis-je vous aider aujourd'hui ?",
            summarize: "Initialisation du résumé... J'ai identifié 3 points clés et un facteur de risque majeur dans le contexte.",
            thank: "L'efficacité opérationnelle est ma priorité. Autre chose ?",
            default: "Analyse terminée. J'ai traité votre demande selon le contexte local disponible. Voulez-vous une analyse plus détaillée ?"
        }
    }
};

export default function ChatApp() {
    const navigate = useNavigate();
    const [lang] = useState<'en' | 'fr'>(() => {
        return (localStorage.getItem('app_lang') as 'en' | 'fr') || 'en';
    });
    const t = translations[lang];

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isProcessing]);

    const sendMessage = async (e?: React.FormEvent) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        if (!input.trim() || isProcessing) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsProcessing(true);

        // Advanced Simulation
        setTimeout(() => {
            const lowInput = userMsg.content.toLowerCase();
            let reply = t.dynamicReplies.default;

            if (lowInput.includes('hello') || lowInput.includes('salut')) reply = t.dynamicReplies.hello;
            else if (lowInput.includes('summarize') || lowInput.includes('resum')) reply = t.dynamicReplies.summarize;
            else if (lowInput.includes('thank') || lowInput.includes('merci')) reply = t.dynamicReplies.thank;

            if (file) reply = `[Local Context: ${file.name}] ${reply}`;

            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: reply,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMsg]);
            setIsProcessing(false);
        }, 1200);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setIsProcessing(true);
            setTimeout(() => setIsProcessing(false), 1500);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-[#0A0A0B] text-white font-outfit overflow-hidden">
            {/* Design Header */}
            <header className="flex items-center justify-between px-8 py-4 bg-[#0D0D0F]/90 backdrop-blur-xl border-b border-white/5 z-50">
                <div className="flex items-center gap-6">
                    <button
                        title={t.back}
                        onClick={() => navigate('/')}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-gray-400 hover:text-white cursor-pointer"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3 mb-0.5">
                            <h1 className="text-lg font-black tracking-tight">{t.title}</h1>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <span className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em]">{t.status}</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] italic">{t.subtitle}</p>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                        <Lock size={12} className="text-gray-500" />
                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{t.privacy}</span>
                    </div>
                    <button className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-500 hover:text-white cursor-pointer">
                        <Settings size={18} />
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <aside className="hidden lg:flex w-80 flex-col bg-[#0D0D0F] border-r border-white/5">
                    <div className="p-8">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full flex items-center justify-center gap-3 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-indigo-500/20 active:scale-95 cursor-pointer"
                            title={t.upload}
                        >
                            <Upload size={18} />
                            {t.upload}
                        </button>
                        <input
                            type="file"
                            title={t.upload}
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={handleFileUpload}
                        />
                    </div>

                    <div className="flex-1 px-6 overflow-y-auto custom-scrollbar">
                        <div className="flex items-center justify-between mb-6 px-2">
                            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{t.recentDocs}</h3>
                            <MessageSquare size={12} className="text-gray-700" />
                        </div>

                        <AnimatePresence>
                            {file ? (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="group flex items-center gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-[24px] hover:border-indigo-500/30 transition-all shadow-xl"
                                >
                                    <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-400">
                                        <FileText size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-black truncate uppercase tracking-tight">{file.name}</p>
                                        <p className="text-[10px] text-gray-600 font-bold">{(file.size / 1024).toFixed(1)} KB // LOCKED</p>
                                    </div>
                                    <button onClick={() => setFile(null)} className="opacity-0 group-hover:opacity-100 p-2 hover:bg-rose-500/10 rounded-xl transition-all text-gray-600 hover:text-rose-500 cursor-pointer" title="Remove document">
                                        <Trash2 size={16} />
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="text-center py-20 px-8 flex flex-col items-center opacity-30">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                        <Search className="text-gray-500" size={24} />
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed">{t.noDocs}</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-8 bg-black/20 border-t border-white/5">
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                            <Bot className="text-indigo-400" size={16} />
                            <div className="flex-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white">Nexus-Prime</p>
                                <p className="text-[8px] text-gray-500 font-bold">v3.1.2-STABLE</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Chat Area */}
                <main className="flex-1 flex flex-col min-w-0 bg-black relative">
                    <div className="flex-1 overflow-y-auto p-8 space-y-10 scroll-smooth custom-scrollbar" ref={scrollRef}>
                        <AnimatePresence mode="popLayout">
                            {messages.length === 0 ? (
                                <motion.div
                                    key="welcome"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="h-full flex flex-col items-center justify-center max-w-xl mx-auto text-center space-y-10"
                                >
                                    <div className="relative">
                                        <div className="w-32 h-32 bg-indigo-500/5 rounded-[48px] animate-pulse" />
                                        <Bot className="absolute inset-0 m-auto text-indigo-500 w-12 h-12" />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-black italic uppercase tracking-tighter">{t.assistantTitle}</h2>
                                        <p className="text-gray-500 font-medium leading-[1.8] text-sm px-10">
                                            {t.assistantDesc}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4">
                                        {t.hints.map(hint => (
                                            <button
                                                key={hint}
                                                onClick={() => setInput(hint)}
                                                className="p-5 bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 rounded-[32px] text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all text-center leading-relaxed cursor-pointer"
                                                title={hint}
                                            >
                                                {hint}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                messages.map((m, i) => (
                                    <motion.div
                                        key={m.id}
                                        initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={cn(
                                            "flex gap-6 max-w-[85%]",
                                            m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center border shadow-xl transition-all",
                                            m.role === 'user' ? "bg-indigo-600 border-indigo-500" : "bg-[#111113] border-white/10"
                                        )}>
                                            {m.role === 'user' ? <User size={18} /> : <Bot size={18} className="text-indigo-400" />}
                                        </div>
                                        <div className={cn(
                                            "p-6 rounded-[32px] text-sm leading-relaxed shadow-2xl",
                                            m.role === 'user'
                                                ? "bg-indigo-600 text-white rounded-tr-none border border-indigo-500 font-medium"
                                                : "bg-[#111113] border border-white/10 text-gray-200 rounded-tl-none font-medium"
                                        )}>
                                            {m.content}
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                        {isProcessing && (
                            <div className="flex gap-6 max-w-3xl mr-auto">
                                <div className="w-10 h-10 rounded-2xl bg-[#111113] border border-white/10 flex items-center justify-center shadow-xl">
                                    <Bot size={18} className="text-indigo-400" />
                                </div>
                                <div className="bg-[#111113] border border-white/10 p-6 rounded-[32px] rounded-tl-none flex flex-col gap-4 min-w-[200px] shadow-2xl">
                                    <div className="flex gap-1.5 items-center">
                                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400/50">{t.processing}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-8 bg-gradient-to-t from-black via-black to-transparent">
                        <form
                            onSubmit={sendMessage}
                            className="max-w-4xl mx-auto relative group"
                        >
                            <div className="absolute inset-x-0 -top-20 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                            <div className="relative flex items-center bg-[#0D0D0F] border border-white/10 group-focus-within:border-indigo-500/50 rounded-[32px] overflow-hidden transition-all px-4 py-2 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                <button
                                    type="button"
                                    className="p-3 text-gray-500 hover:text-indigo-400 transition-colors cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                    title="Attach file"
                                >
                                    <Paperclip size={22} />
                                </button>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={file ? t.inputPlaceholderDoc : t.inputPlaceholderNoDoc}
                                    className="flex-1 bg-transparent border-none focus:ring-0 text-white py-5 px-4 text-base placeholder:text-gray-700 font-medium"
                                />
                                <button
                                    type="submit"
                                    title="Send message"
                                    disabled={!input.trim() || isProcessing}
                                    className="p-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-white/5 disabled:text-gray-800 text-white rounded-2xl transition-all ml-2 cursor-pointer shadow-lg shadow-indigo-500/20 active:scale-95"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                            <div className="mt-4 flex flex-wrap justify-center gap-6 px-10">
                                <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.2em]">{t.footer}</p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}
