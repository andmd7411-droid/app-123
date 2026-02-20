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
    Lock
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
        title: "Secure AI Chat",
        status: "Local Mode Active",
        privacy: "End-to-End Private",
        upload: "Upload Document",
        recentDocs: "Recent Documents",
        noDocs: "No documents uploaded for analysis.",
        assistantTitle: "Your Private AI Assistant",
        assistantDesc: "Ask anything about your contracts, reports or documents. Processing happens instantly on your GPU, without internet.",
        hints: ["Summarize document", "Find termination clauses", "Create a table with key data"],
        inputPlaceholderDoc: "Ask something about this document...",
        inputPlaceholderNoDoc: "Upload a document or ask a question...",
        processing: "Processing local data...",
        footer: "GPT power at your local. All data is processed privately on this computer.",
        assistantReplyDoc: (name: string) => `I have analyzed the document "${name}". Based on local content, I can tell you it seems to contain standard clauses. Do you have any specific questions about any section?`,
        assistantReplyNoDoc: "I am ready to help. Please upload a PDF document for a detailed and secure analysis, 100% offline."
    },
    fr: {
        back: "Retour au Hub",
        title: "Chat IA Sécurisé",
        status: "Mode Local Activé",
        privacy: "Privé de Bout en Bout",
        upload: "Charger un Document",
        recentDocs: "Documents Récents",
        noDocs: "Aucun document chargé pour analyse.",
        assistantTitle: "Votre Assistant IA Privé",
        assistantDesc: "Posez n'importe quelle question sur vos contrats, rapports ou documents. Le traitement se fait instantanément sur votre GPU, sans internet.",
        hints: ["Résumer le document", "Trouver les clauses de résiliation", "Créer un tableau avec les données clés"],
        inputPlaceholderDoc: "Posez une question sur ce document...",
        inputPlaceholderNoDoc: "Chargez un document ou posez une question...",
        processing: "Traitement des données locales...",
        footer: "La puissance de GPT en local. Toutes les données sont traitées de manière privée sur cet ordinateur.",
        assistantReplyDoc: (name: string) => `J'ai analysé le document "${name}". D'après le contenu local, il semble contenir des clauses standard. Avez-vous des questions spécifiques sur une section ?`,
        assistantReplyNoDoc: "Je suis prêt à vous aider. Veuillez charger un document PDF pour une analyse détaillée et sécurisée, 100% hors ligne."
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

    const sendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsProcessing(true);

        // Simulated Local AI Logic
        setTimeout(() => {
            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: file
                    ? t.assistantReplyDoc(file.name)
                    : t.assistantReplyNoDoc,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMsg]);
            setIsProcessing(false);
        }, 1500);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setIsProcessing(true);
            setTimeout(() => setIsProcessing(false), 2000);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-[#0A0A0B] text-white">
            {/* Top Bar */}
            <header className="flex items-center justify-between px-6 py-4 bg-[#111113] border-b border-white/5">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <Shield className="text-indigo-400 w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold">{t.title}</h1>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] text-emerald-500 uppercase font-bold tracking-widest">{t.status}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                        <Lock size={12} className="text-gray-500" />
                        <span className="text-[10px] text-gray-400 font-medium">{t.privacy}</span>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <aside className="hidden lg:flex w-80 flex-col bg-[#0D0D0F] border-r border-white/5">
                    <div className="p-6">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/10"
                        >
                            <Upload size={18} />
                            {t.upload}
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={handleFileUpload}
                        />
                    </div>

                    <div className="flex-1 px-4 overflow-y-auto">
                        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">{t.recentDocs}</h3>
                        {file ? (
                            <div className="group flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl">
                                <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400">
                                    <FileText size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{file.name}</p>
                                    <p className="text-[10px] text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                                </div>
                                <button onClick={() => setFile(null)} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-white/10 rounded-lg transition-all text-gray-500 hover:text-rose-400">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-12 px-6">
                                <Search className="mx-auto text-gray-700 mb-4" size={32} />
                                <p className="text-sm text-gray-500 leading-relaxed">{t.noDocs}</p>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Chat Area */}
                <main className="flex-1 flex flex-col min-w-0 relative">
                    <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth" ref={scrollRef}>
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6">
                                <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center mb-4">
                                    <Bot className="text-indigo-400 w-10 h-10" />
                                </div>
                                <h2 className="text-2xl font-bold">{t.assistantTitle}</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    {t.assistantDesc}
                                </p>
                                <div className="grid grid-cols-1 gap-3 w-full">
                                    {t.hints.map(hint => (
                                        <button
                                            key={hint}
                                            onClick={() => setInput(hint)}
                                            className="px-4 py-3 bg-white/[0.03] border border-white/[0.05] hover:border-indigo-500/30 rounded-2xl text-sm text-gray-300 hover:text-white transition-all text-left"
                                        >
                                            "{hint}"
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            messages.map((m) => (
                                <motion.div
                                    key={m.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "flex gap-4 max-w-3xl",
                                        m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg shrink-0 flex items-center justify-center",
                                        m.role === 'user' ? "bg-indigo-600" : "bg-white/5 border border-white/10"
                                    )}>
                                        {m.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-indigo-400" />}
                                    </div>
                                    <div className={cn(
                                        "p-4 rounded-2xl text-sm leading-relaxed",
                                        m.role === 'user'
                                            ? "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-500/10"
                                            : "bg-[#161618] border border-white/5 text-gray-200 rounded-tl-none"
                                    )}>
                                        {m.content}
                                    </div>
                                </motion.div>
                            ))
                        )}
                        {isProcessing && (
                            <div className="flex gap-4 max-w-3xl mr-auto">
                                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Bot size={16} className="text-indigo-400" />
                                </div>
                                <div className="bg-[#161618] border border-white/5 p-4 rounded-2xl rounded-tl-none">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B] to-transparent">
                        <form
                            onSubmit={sendMessage}
                            className="max-w-4xl mx-auto relative group"
                        >
                            <div className="absolute inset-0 bg-indigo-500/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                            <div className="relative flex items-center bg-[#161618] border border-white/10 group-focus-within:border-indigo-500/50 rounded-[24px] overflow-hidden transition-all px-2">
                                <button
                                    type="button"
                                    className="p-3 text-gray-500 hover:text-indigo-400 transition-colors"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Paperclip size={20} />
                                </button>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={file ? t.inputPlaceholderDoc : t.inputPlaceholderNoDoc}
                                    className="flex-1 bg-transparent border-none focus:ring-0 text-white py-4 px-2 text-sm placeholder:text-gray-600"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isProcessing}
                                    className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-white/5 disabled:hover:bg-white/5 disabled:text-gray-700 text-white rounded-xl transition-all m-1.5"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <p className="mt-3 text-center text-[10px] text-gray-600">
                                {t.footer}
                            </p>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}
