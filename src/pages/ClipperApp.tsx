import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Video,
    Play,
    Pause,
    Download,
    Sparkles,
    CheckCircle2,
    Upload,
    Zap,
    RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const translations = {
    en: {
        back: "Back to Hub",
        title: "Viral Studio Pro",
        subtitle: "Neural Video Engine",
        steps: ['Upload', 'Analyze', 'Studio', 'Export'],
        uploadTitle: "Upload Masterpiece",
        uploadDesc: "AI will detect high-energy moments and format them for social success.",
        uploadBtn: "Select Video File",
        analyzeTitle: "Moment Detection",
        analyzeDesc: "Scanning footage for hooks and retention zones...",
        configTitle: "Video Studio",
        configDesc: "Customize your viral clips with AI captions.",
        captions: "Interactive Captions",
        captionStyles: ['Hormozi Punch', 'Modern Minimal', 'Neon Impact'],
        autoCrop: "Dynamic Focus",
        focusMode: "Smart Cropping: Enabled",
        sensitivity: "Sensitivity",
        generateBtn: "RENDER VIRAL CLIPS",
        processing: "RENDERING",
        readyTitle: "Ready to Post!",
        readyDesc: (count: number) => `Success! ${count} viral clips are ready.`,
        momentTitle: (i: number) => `Viral Hook #${i}`,
        processAlt: "New Project",
        downloadAll: "DOWNLOAD PACKAGE",
        placeholderVideo: "No video loaded",
        logs: [
            "Initializing Neural Engine...",
            "Analyzing waveforms...",
            "Detecting speaker...",
            "Optimizing ratio...",
            "Generating captions...",
            "Finalizing..."
        ]
    },
    fr: {
        back: "Retour",
        title: "Viral Studio Pro",
        subtitle: "Moteur Vidéo Neuronal",
        steps: ['Chargement', 'Analyse', 'Studio', 'Export'],
        uploadTitle: "Charger la Vidéo",
        uploadDesc: "L'IA détectera les moments forts pour TikTok, Reels et Shorts.",
        uploadBtn: "Choisir un Fichier",
        analyzeTitle: "Détection de Moments",
        analyzeDesc: "Analyse des hooks et des zones de rétention...",
        configTitle: "Studio Vidéo",
        configDesc: "Personnalisez vos clips avec des légendes IA.",
        captions: "Légendes Interactives",
        captionStyles: ['Hormozi Punch', 'Modern Minimal', 'Impact Néon'],
        autoCrop: "Focus Dynamique",
        focusMode: "Recadrage Intelligent : Activé",
        sensitivity: "Sensibilité",
        generateBtn: "GÉNÉRER LES CLIPS",
        processing: "GÉNÉRATION",
        readyTitle: "Prêt à Publier !",
        readyDesc: (count: number) => `Succès ! ${count} clips sont prêts.`,
        momentTitle: (i: number) => `Moment Viral #${i}`,
        processAlt: "Nouveau Projet",
        downloadAll: "TÉLÉCHARGER TOUT",
        placeholderVideo: "Aucune vidéo",
        logs: [
            "Initialisation...",
            "Analyse audio...",
            "Détection visage...",
            "Optimisation ratio...",
            "Légendes IA...",
            "Finalisation..."
        ]
    }
};

const VIRAL_CAPTIONS = [
    "THIS IS INSANE!",
    "WAIT FOR IT...",
    "MIND BLOWN!",
    "POV: YOU WIN"
];

export default function ClipperApp() {
    const navigate = useNavigate();
    const [lang] = useState<'en' | 'fr'>(() => {
        return (localStorage.getItem('app_lang') as 'en' | 'fr') || 'en';
    });
    const t = translations[lang];

    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentLog, setCurrentLog] = useState(0);
    const [step, setStep] = useState<'upload' | 'analyze' | 'config' | 'export'>('upload');
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeCaption, setActiveCaption] = useState(0);
    const [captionColor, setCaptionColor] = useState('#fbbf24');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Caption Loop
    useEffect(() => {
        let timer: any;
        if (isPlaying && step === 'config') {
            timer = setInterval(() => {
                setActiveCaption(prev => (prev + 1) % VIRAL_CAPTIONS.length);
            }, 800);
        }
        return () => clearInterval(timer);
    }, [isPlaying, step]);

    // Handle Upload
    const handleFileUpload = (e: any) => {
        const file = (e.target?.files?.[0] || e.dataTransfer?.files?.[0]);
        if (file && file.type.startsWith('video/')) {
            const url = URL.createObjectURL(file);
            setVideoFile(file);
            setVideoUrl(url);
            setStep('analyze');
            startAnalysis();
        }
    };

    // Simulation Phase 1
    const startAnalysis = () => {
        setIsProcessing(true);
        setProgress(0);
        let p = 0;
        const interval = setInterval(() => {
            p += 2;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setIsProcessing(false);
                setStep('config');
            }
            setCurrentLog(Math.floor((p / 100) * (t.logs.length - 1)));
        }, 100);
    };

    // Simulation Phase 2
    const handleExport = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isProcessing) return;

        setIsProcessing(true);
        setProgress(0);
        let p = 0;
        const interval = setInterval(() => {
            p += 4;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setIsProcessing(false);
                setStep('export');
            }
        }, 80);
    };

    const togglePlay = (e?: React.MouseEvent) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play().catch(console.error);
        }
        setIsPlaying(!isPlaying);
    };

    const onDownload = (e: React.MouseEvent, i: number) => {
        e.preventDefault();
        e.stopPropagation();
        const blob = videoFile || new Blob(["Simulated Video Data"], { type: "video/mp4" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Viral_Clip_${i}.mp4`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const reset = (e?: React.MouseEvent) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        setStep('upload');
        setVideoFile(null);
        setVideoUrl(null);
        setIsProcessing(false);
        setProgress(0);
        setIsPlaying(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#0A0A0B] text-white font-outfit overflow-x-hidden">
            {/* Nav Bar */}
            <nav className="sticky top-0 z-[100] w-full px-6 py-4 bg-[#0D0D0F]/95 backdrop-blur-md border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all cursor-pointer"
                        title={t.back}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black tracking-tight">{t.title}</h1>
                        <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest">{t.subtitle}</p>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    {t.steps.map((s, i) => {
                        const stepKeys = ['upload', 'analyze', 'config', 'export'];
                        const active = step === stepKeys[i];
                        const done = stepKeys.indexOf(step) > i;
                        return (
                            <div key={s} className="flex items-center gap-2">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${active ? 'bg-rose-500 text-white' : done ? 'bg-emerald-500 text-white' : 'bg-white/5 text-gray-600'}`}>
                                    {done ? <CheckCircle2 size={12} /> : i + 1}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${active ? 'text-white' : 'text-gray-500'}`}>{s}</span>
                            </div>
                        );
                    })}
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
                <AnimatePresence mode="wait">
                    {step === 'upload' && (
                        <motion.section
                            key="u"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full"
                        >
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="group relative w-full h-[500px] rounded-[60px] border-2 border-dashed border-white/10 hover:border-rose-500/50 bg-[#0D0D0F]/50 flex flex-col items-center justify-center text-center p-12 cursor-pointer transition-all duration-500"
                            >
                                <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[60px]" />
                                <div className="w-24 h-24 bg-rose-500/10 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                    <Upload className="text-rose-500 w-10 h-10" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter italic uppercase">{t.uploadTitle}</h2>
                                <p className="text-gray-500 text-lg mb-10 max-w-md">{t.uploadDesc}</p>
                                <button className="px-12 py-5 bg-rose-600 hover:bg-rose-700 rounded-3xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-rose-500/30">
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
                        </motion.section>
                    )}

                    {step === 'analyze' && (
                        <motion.section
                            key="a"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center py-20"
                        >
                            <div className="relative w-64 h-64 mb-16">
                                <svg className="w-full h-full -rotate-90">
                                    <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                    <motion.circle
                                        cx="128" cy="128" r="120"
                                        stroke="currentColor" strokeWidth="8" fill="transparent"
                                        strokeDasharray="754"
                                        strokeDashoffset={754 - (754 * progress) / 100}
                                        className="text-rose-500"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Zap className="text-rose-500 w-16 h-16 animate-pulse" />
                                </div>
                            </div>
                            <h2 className="text-4xl font-black italic uppercase mb-4">{t.analyzeTitle}</h2>
                            <p className="text-gray-500 mb-8">{t.analyzeDesc}</p>
                            <div className="w-full max-w-lg p-6 bg-white/5 rounded-3xl font-mono text-xs flex gap-4 items-center">
                                <span className="text-rose-500 shrink-0">[IA_SCAN]</span>
                                <span className="text-gray-400 truncate">{t.logs[currentLog]}</span>
                            </div>
                        </motion.section>
                    )}

                    {step === 'config' && (
                        <motion.section
                            key="c"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
                        >
                            {/* Player */}
                            <div className="flex flex-col items-center gap-8">
                                <div className="relative w-full max-w-[340px] aspect-[9/16] bg-black rounded-[60px] border-[12px] border-[#1C1C1E] overflow-hidden group shadow-2xl shadow-black/50">
                                    {videoUrl ? (
                                        <video ref={videoRef} src={videoUrl} className="w-full h-full object-cover" onEnded={() => setIsPlaying(false)} playsInline />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-800">
                                            <Video size={48} />
                                        </div>
                                    )}

                                    {/* Captions Overlay */}
                                    {isPlaying && (
                                        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                                            <motion.span
                                                key={activeCaption}
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1.3, opacity: 1 }}
                                                className="text-3xl font-black italic uppercase text-center drop-shadow-[0_4px_12px_rgba(0,0,0,1)]"
                                                style={{ color: captionColor, WebkitTextStroke: '2px black' }}
                                            >
                                                {VIRAL_CAPTIONS[activeCaption]}
                                            </motion.span>
                                        </div>
                                    )}

                                    {/* Play Overlay */}
                                    <div
                                        onClick={togglePlay}
                                        className={`absolute inset-0 z-10 flex items-center justify-center cursor-pointer transition-all duration-300 ${isPlaying ? 'bg-transparent opacity-0 hover:opacity-100 hover:bg-black/20' : 'bg-black/40 opacity-100'}`}
                                    >
                                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                                            {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-2" />}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 bg-white/5 rounded-[32px] border border-white/5">
                                    {['#fbbf24', '#ffffff', '#fb7185', '#38bdf8'].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => setCaptionColor(c)}
                                            className={`w-10 h-10 rounded-full border-4 transition-all ${captionColor === c ? 'border-white scale-110 shadow-lg' : 'border-transparent'}`}
                                            style={{ backgroundColor: c }}
                                            title="Pick color"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Options */}
                            <div className="flex flex-col gap-10">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-2">{t.configTitle}</h2>
                                        <p className="text-gray-500">{t.configDesc}</p>
                                    </div>
                                    <button onClick={() => reset()} className="p-4 bg-white/5 hover:bg-rose-500/10 rounded-2xl transition-all cursor-pointer">
                                        <RotateCcw className="text-gray-400" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-rose-500">{t.captions}</h3>
                                        <div className="flex flex-col gap-3">
                                            {t.captionStyles.map(s => (
                                                <button key={s} className={`p-5 rounded-2xl border text-left text-xs font-bold uppercase transition-all ${s.includes('Hormozi') ? 'bg-rose-500/10 border-rose-500/50 text-white' : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10'}`}>
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-rose-500">{t.autoCrop}</h3>
                                        <div className="p-8 bg-white/5 rounded-[40px] space-y-8 border border-white/5">
                                            <div className="flex justify-between text-[10px] font-black uppercase text-gray-500">
                                                <span>Status</span>
                                                <span className="text-emerald-500 italic">AL_LOCK_ON</span>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400">
                                                    <span>{t.sensitivity}</span>
                                                    <span>85%</span>
                                                </div>
                                                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full w-[85%] bg-rose-500" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleExport}
                                    disabled={isProcessing}
                                    className="w-full relative py-7 bg-rose-600 hover:bg-rose-700 disabled:bg-white/5 disabled:text-gray-700 rounded-[40px] font-black text-2xl uppercase italic tracking-tighter transition-all shadow-2xl shadow-rose-500/40 active:scale-[0.98] overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-4">
                                        {isProcessing ? (
                                            <>
                                                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                                {t.processing} {progress}%
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="fill-current" />
                                                {t.generateBtn}
                                            </>
                                        )}
                                    </span>
                                    {isProcessing && (
                                        <div className="absolute inset-0 bg-white/10 transition-all duration-100" style={{ width: `${progress}%` }} />
                                    )}
                                </button>
                            </div>
                        </motion.section>
                    )}

                    {step === 'export' && (
                        <motion.section
                            key="e"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center py-10"
                        >
                            <div className="text-center mb-16">
                                <div className="w-24 h-24 bg-emerald-500/10 rounded-[32px] flex items-center justify-center mx-auto mb-8">
                                    <CheckCircle2 size={48} className="text-emerald-500" />
                                </div>
                                <h2 className="text-6xl font-black uppercase italic tracking-tighter mb-4">{t.readyTitle}</h2>
                                <p className="text-gray-500 text-xl">{t.readyDesc(3)}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="group p-6 bg-white/5 border border-white/5 hover:border-emerald-500/50 rounded-[48px] transition-all">
                                        <div className="aspect-[9/16] bg-black rounded-[32px] mb-6 overflow-hidden relative">
                                            {videoUrl && <video src={videoUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" muted />}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 pointer-events-none transition-all">
                                                <Play size={40} className="fill-white" />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="text-left">
                                                <h4 className="font-black italic text-lg uppercase tracking-tight">{t.momentTitle(i)}</h4>
                                                <p className="text-[10px] text-gray-500 font-bold">15S VERTICAL HD</p>
                                            </div>
                                            <button
                                                onClick={(e) => onDownload(e, i)}
                                                className="p-4 bg-emerald-500 hover:bg-emerald-600 rounded-2xl shadow-lg active:scale-90 transition-all cursor-pointer"
                                                title="Download Video"
                                            >
                                                <Download size={24} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-6">
                                <button onClick={() => reset()} className="px-12 py-5 bg-white/5 hover:bg-white/10 rounded-3xl font-black uppercase text-xs tracking-widest transition-all cursor-pointer">
                                    {t.processAlt}
                                </button>
                                <button onClick={(e) => onDownload(e, 0)} className="px-12 py-5 bg-emerald-600 hover:bg-emerald-700 rounded-3xl font-black uppercase text-xs tracking-widest transition-all shadow-2xl shadow-emerald-500/20 flex items-center gap-3 active:scale-95 cursor-pointer">
                                    <Download size={20} />
                                    {t.downloadAll}
                                </button>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </main>

            {/* Status Bar */}
            <footer className="w-full px-8 py-4 bg-[#0D0D0F] border-t border-white/5 flex flex-wrap justify-between items-center gap-4 opacity-40">
                <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Neural Active // GPU_MODE: ON
                </div>
                <div className="flex gap-8 text-[10px] font-black uppercase italic tracking-tight">
                    <span>TikTok Optimized</span>
                    <span>Reels Prepared</span>
                    <span>Shorts Certified</span>
                </div>
            </footer>
        </div>
    );
}
