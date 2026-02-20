import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Video,
    Scissors,
    Type,
    Smartphone,
    Play,
    Download,
    Settings,
    Sparkles,
    Volume2,
    Maximize2,
    Clock,
    CheckCircle2,
    Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const translations = {
    en: {
        back: "Back to Hub",
        steps: ['upload', 'config', 'export'],
        uploadTitle: "Add Long Video",
        uploadDesc: "Drag your file here or select a podcast/vlog to extract viral moments.",
        uploadBtn: "Choose Video File",
        configTitle: "Viral Configuration",
        configDesc: "Customize how the AI processes your clip.",
        captions: "Animated Captions",
        captionStyles: ['Hormozi Style', 'Minimal Modern', 'Bold Yellow'],
        autoCrop: "Auto-Cropping",
        focusMode: "Focus Mode: Face Detection",
        sensitivity: "Motion detection sensitivity",
        generateBtn: "GENERATE VIRAL CLIPS",
        processing: "PROCESSING",
        readyTitle: "Ready to Publish!",
        readyDesc: (count: number) => `I generated ${count} optimized clips for vertical video. They are cut, centered and have synchronized captions.`,
        momentTitle: (i: number) => `Viral Moment #${i}`,
        processAlt: "PROCESS ANOTHER CLIP",
        downloadAll: "DOWNLOAD ALL (.ZIP)"
    },
    fr: {
        back: "Retour au Hub",
        steps: ['chargement', 'config', 'export'],
        uploadTitle: "Ajouter une Vidéo Longue",
        uploadDesc: "Glissez votre fichier ici ou sélectionnez un podcast/vlog pour extraire des moments viraux.",
        uploadBtn: "Choisir un Fichier Vidéo",
        configTitle: "Configuration Virale",
        configDesc: "Personnalisez la façon dont l'IA traite votre clip.",
        captions: "Légendes Animées",
        captionStyles: ['Style Hormozi', 'Minimal Moderne', 'Jaune Vif'],
        autoCrop: "Recadrage Auto",
        focusMode: "Mode Focus : Détection Faciale",
        sensitivity: "Sensibilité de la détection de mouvement",
        generateBtn: "GÉNÉRER DES CLIPS VIRAUX",
        processing: "TRAITEMENT",
        readyTitle: "Prêt à Publier !",
        readyDesc: (count: number) => `J'ai généré ${count} clips optimisés pour la vidéo verticale. Ils sont coupés, centrés et ont des légendes synchronisées.`,
        momentTitle: (i: number) => `Moment Viral #${i}`,
        processAlt: "TRAITER UN AUTRE CLIP",
        downloadAll: "TOUT TÉLÉCHARGER (.ZIP)"
    }
};

export default function ClipperApp() {
    const navigate = useNavigate();
    const [lang] = useState<'en' | 'fr'>(() => {
        return (localStorage.getItem('app_lang') as 'en' | 'fr') || 'en';
    });
    const t = translations[lang];

    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [step, setStep] = useState<'upload' | 'config' | 'export'>('upload');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const startProcessing = () => {
        setIsProcessing(true);
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.random() * 15;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    setIsProcessing(false);
                    setStep('export');
                }, 800);
            }
            setProgress(Math.min(currentProgress, 100));
        }, 400);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setVideoFile(file);
            setStep('config');
        }
    };

    return (
        <div className="flex flex-col h-screen bg-[#0A0A0B] text-white overflow-hidden">
            {/* Top Bar */}
            <header className="flex items-center justify-between px-6 py-4 bg-[#111113] border-b border-white/5 relative z-20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-rose-500/10 rounded-lg">
                            <Video className="text-rose-400 w-5 h-5" />
                        </div>
                        <h1 className="text-sm font-bold">Viral Auto-Clipper</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {t.steps.map((s, i) => (
                        <React.Fragment key={s}>
                            <div className={`text-[10px] font-bold tracking-widest uppercase ${step === translations.en.steps[i] ? 'text-rose-400' : 'text-gray-600'}`}>
                                {s}
                            </div>
                            {i < 2 && <div className="w-4 h-px bg-white/5" />}
                        </React.Fragment>
                    ))}
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {step === 'upload' && (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="max-w-2xl w-full"
                            >
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="group relative border-2 border-dashed border-white/10 hover:border-rose-500/50 rounded-[40px] p-20 text-center cursor-pointer transition-all bg-white/[0.02] hover:bg-rose-500/[0.02]"
                                >
                                    <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                                        <Video className="text-rose-400 w-10 h-10" />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-4">{t.uploadTitle}</h2>
                                    <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                                        {t.uploadDesc}
                                    </p>
                                    <button className="px-8 py-4 bg-rose-600 hover:bg-rose-700 rounded-2xl font-bold transition-all shadow-lg shadow-rose-500/20">
                                        {t.uploadBtn}
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="video/*"
                                        onChange={handleFileUpload}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {step === 'config' && (
                            <motion.div
                                key="config"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl h-full"
                            >
                                {/* Preview Window */}
                                <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-6">
                                    <div className="relative w-[300px] aspect-[9/16] bg-[#0A0A0B] border-[10px] border-[#1C1C1E] rounded-[48px] overflow-hidden shadow-2xl">
                                        <div className="absolute top-0 w-full h-[60px] bg-gradient-to-b from-black/80 to-transparent z-10" />
                                        <div className="absolute inset-x-8 top-32 h-[200px] border-2 border-rose-500/50 rounded-2xl flex items-center justify-center bg-rose-500/5">
                                            <Smartphone className="text-rose-500/50" />
                                        </div>
                                        <div className="absolute bottom-40 w-full px-6 text-center">
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: [0.8, 1.2, 1], opacity: 1 }}
                                                transition={{ repeat: Infinity, duration: 1 }}
                                                className="text-2xl font-black italic text-amber-400 uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,1)]"
                                            >
                                                {lang === 'en' ? 'WANT RESULTS?' : 'DES RÉSULTATS ?'}
                                            </motion.div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-gray-400 hover:text-white">
                                            <Play size={20} />
                                        </button>
                                        <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-gray-400 hover:text-white">
                                            <Maximize2 size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Settings Panel */}
                                <div className="lg:col-span-8 space-y-8 py-10 overflow-y-auto">
                                    <div>
                                        <h2 className="text-3xl font-extrabold mb-2 uppercase tracking-tighter">{t.configTitle}</h2>
                                        <p className="text-gray-400">{t.configDesc}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-6 bg-white/[0.03] border border-white/[0.05] rounded-3xl space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Type className="text-rose-400" size={18} />
                                                <h3 className="font-bold">{t.captions}</h3>
                                            </div>
                                            <div className="space-y-3">
                                                {t.captionStyles.map(style => (
                                                    <label key={style} className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/5 rounded-xl cursor-pointer hover:border-rose-500/30 transition-all">
                                                        <input type="radio" name="style" className="accent-rose-500" defaultChecked={style.includes('Hormozi')} />
                                                        <span className="text-sm font-medium">{style}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-6 bg-white/[0.03] border border-white/[0.05] rounded-3xl space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Scissors className="text-rose-400" size={18} />
                                                <h3 className="font-bold">{t.autoCrop}</h3>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center text-xs text-gray-500">
                                                    <span>{t.focusMode}</span>
                                                    <span className="text-rose-400 uppercase font-bold tracking-tighter">On</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full w-2/3 bg-rose-500 rounded-full" />
                                                </div>
                                                <p className="text-[10px] text-gray-600">{t.sensitivity}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={startProcessing}
                                        disabled={isProcessing}
                                        className="w-full relative group py-5 bg-rose-600 hover:bg-rose-700 rounded-3xl font-black text-xl overflow-hidden transition-all shadow-xl shadow-rose-500/20"
                                    >
                                        {isProcessing ? (
                                            <div className="flex items-center justify-center gap-4">
                                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                {t.processing} {Math.round(progress)}%
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-3">
                                                <Sparkles size={24} />
                                                {t.generateBtn}
                                            </div>
                                        )}
                                        {isProcessing && (
                                            <div
                                                className="absolute bottom-0 left-0 h-1.5 bg-white/30 transition-all duration-300"
                                                style={{ width: `${progress}%` }}
                                            />
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 'export' && (
                            <motion.div
                                key="export"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="max-w-4xl w-full text-center py-20"
                            >
                                <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <CheckCircle2 className="text-emerald-400 w-12 h-12" />
                                </div>
                                <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">{t.readyTitle}</h2>
                                <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                                    {t.readyDesc(3)}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="group p-6 bg-white/[0.03] border border-white/[0.05] rounded-3xl hover:border-rose-500/30 transition-all">
                                            <div className="aspect-[9/16] bg-white/5 rounded-2xl mb-4 overflow-hidden relative">
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                                    <Play size={40} className="text-white" />
                                                </div>
                                            </div>
                                            <h4 className="font-bold mb-1">{t.momentTitle(i)}</h4>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">00:45 • 4K High</span>
                                                <button className="text-rose-400 hover:text-white transition-colors">
                                                    <Download size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 justify-center">
                                    <button onClick={() => setStep('upload')} className="px-10 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-all">
                                        {t.processAlt}
                                    </button>
                                    <button className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold transition-all flex items-center justify-center gap-2">
                                        <Download size={20} />
                                        {t.downloadAll}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
