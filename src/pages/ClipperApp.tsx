import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Video,
    Smartphone,
    Play,
    Pause,
    Download,
    Sparkles,
    Maximize2,
    CheckCircle2,
    Upload,
    Zap,
    History,
    Settings2,
    Layers,
    Smile,
    RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const translations = {
    en: {
        back: "Back to Hub",
        title: "Viral Studio Pro",
        subtitle: "AI-Powered Vertical Content Engine",
        steps: ['Upload', 'Analyze', 'Studio', 'Export'],
        uploadTitle: "Drop your Masterpiece",
        uploadDesc: "Drag & drop your long-form video. AI will detect high-energy moments and format them for social success.",
        uploadBtn: "Select Video File",
        analyzeTitle: "Neural Moment Detection",
        analyzeDesc: "Our AI is scanning your footage for hooks, facial triggers, and audience retention zones.",
        configTitle: "Viral Studio",
        configDesc: "Customize your viral clips with AI-generated captions and dynamic focus.",
        captions: "Interactive Captions",
        captionStyles: ['Hormozi Punch', 'Modern Minimal', 'Neon Impact'],
        autoCrop: "Dynamic Face-Focus",
        focusMode: "Smart Cropping: Enabled",
        sensitivity: "Motion Sensitivity",
        generateBtn: "RENDER VIRAL CLIPS",
        processing: "RENDERING",
        readyTitle: "Viral Package Ready!",
        readyDesc: (count: number) => `Success! ${count} high-retention clips are ready for TikTok, Reels, and Shorts.`,
        momentTitle: (i: number) => `Viral Hook #${i}`,
        processAlt: "Studio New Project",
        downloadAll: "EXPORT ALL AS .ZIP",
        placeholderVideo: "No video loaded",
        logs: [
            "Initializing Neural Engine...",
            "Analyzing audio waveforms for hooks...",
            "Detecting speaker faces...",
            "Optimizing vertical aspect ratio...",
            "Generating dynamic captions...",
            "Finalizing viral moments..."
        ]
    },
    fr: {
        back: "Retour au Hub",
        title: "Viral Studio Pro",
        subtitle: "Moteur de Contenu Vertical par IA",
        steps: ['Chargement', 'Analyse', 'Studio', 'Export'],
        uploadTitle: "Déposez votre Chef-d'œuvre",
        uploadDesc: "Glissez votre vidéo. L'IA détectera les moments forts et les formatera pour un succès garanti.",
        uploadBtn: "Choisir un Fichier",
        analyzeTitle: "Détection de Moments Neuronale",
        analyzeDesc: "Notre IA scanne votre contenu pour trouver des switchs, des expressions et des zones de rétention.",
        configTitle: "Studio Viral",
        configDesc: "Personnalisez vos clips avec des légendes générées par l'IA et un focus dynamique.",
        captions: "Légendes Interactives",
        captionStyles: ['Punch Hormozi', 'Modern Minimal', 'Impact Néon'],
        autoCrop: "Face-Focus Dynamique",
        focusMode: "Recadrage Intelligent : Activé",
        sensitivity: "Sensibilité au Mouvement",
        generateBtn: "GÉNÉRER LES CLIPS",
        processing: "GÉNÉRATION",
        readyTitle: "Pack Viral Prêt !",
        readyDesc: (count: number) => `Succès ! ${count} clips à haute rétention sont prêts pour TikTok, Reels et Shorts.`,
        momentTitle: (i: number) => `Hook Viral #${i}`,
        processAlt: "Nouveau Projet Studio",
        downloadAll: "TOUT EXPORTER (.ZIP)",
        placeholderVideo: "Aucune vidéo chargée",
        logs: [
            "Initialisation du moteur neuronal...",
            "Analyse des ondes audio pour les hooks...",
            "Détection des visages...",
            "Optimisation du ratio vertical...",
            "Génération des légendes dynamiques...",
            "Finalisation des moments viraux..."
        ]
    }
};

const VIRAL_CAPTIONS = [
    "THIS IS INSANE!",
    "WAIT FOR IT...",
    "MIND BLOWN!",
    "THE SECRET IS...",
    "WATCH TILL END",
    "POV: YOU WIN",
    "HUGE UPDATE!"
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

    useEffect(() => {
        if (isPlaying && step === 'config') {
            const interval = setInterval(() => {
                setActiveCaption(prev => (prev + 1) % VIRAL_CAPTIONS.length);
            }, 800);
            return () => clearInterval(interval);
        }
    }, [isPlaying, step]);

    const handleFileUpload = (e: any) => {
        let file: File | null = null;
        if (e.target && e.target.files && e.target.files[0]) {
            file = e.target.files[0];
        } else if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
            file = e.dataTransfer.files[0];
        }

        if (file && file.type.startsWith('video/')) {
            console.log("File uploaded:", file.name);
            setVideoFile(file);
            setVideoUrl(URL.createObjectURL(file));
            setStep('analyze');
            startAnalysis();
        }
    };

    const startAnalysis = () => {
        setIsProcessing(true);
        let p = 0;
        let logIndex = 0;
        const interval = setInterval(() => {
            p += 5;
            if (p >= 100) {
                p = 100;
                clearInterval(interval);
                setTimeout(() => {
                    setIsProcessing(false);
                    setStep('config');
                }, 500);
            }
            if (p > (logIndex + 1) * 16.6 && logIndex < t.logs.length - 1) {
                logIndex++;
                setCurrentLog(logIndex);
            }
            setProgress(p);
        }, 200);
    };

    const togglePlay = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const triggerDownload = (blob: Blob | null, fileName: string) => {
        console.log("Triggering download...");
        const finalBlob = blob || new Blob(["Viral Content Placeholder"], { type: 'video/mp4' });
        const url = URL.createObjectURL(finalBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 1000);
    };

    const handleExport = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Export started");
        setIsProcessing(true);
        setProgress(0);
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setIsProcessing(false);
                setStep('export');
            }
        }, 50);
    };

    const reset = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setStep('upload');
        setVideoFile(null);
        setVideoUrl(null);
        setProgress(0);
        setIsProcessing(false);
    };

    return (
        <div className="flex flex-col h-screen bg-[#0A0A0B] text-white selection:bg-rose-500/30 font-outfit">
            {/* Header */}
            <header className="flex-none flex items-center justify-between px-8 py-4 bg-[#0D0D0F]/90 backdrop-blur-xl border-b border-white/5 z-50">
                <div className="flex items-center gap-6">
                    <button
                        type="button"
                        title={t.back}
                        onClick={() => navigate('/')}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-gray-400 hover:text-white border border-white/5"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-rose-500/10 rounded-lg">
                                <Video className="text-rose-400 w-4 h-4" />
                            </div>
                            <h1 className="text-lg font-bold tracking-tight">{t.title}</h1>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-2">
                    {t.steps.map((s, i) => {
                        const stepKeys = ['upload', 'analyze', 'config', 'export'];
                        const isActive = step === stepKeys[i];
                        const isDone = stepKeys.indexOf(step) > i;
                        return (
                            <React.Fragment key={s}>
                                <div className="flex items-center gap-2 px-3 py-1.5 transition-all">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${isActive ? 'bg-rose-500 text-white' : isDone ? 'bg-emerald-500 text-white' : 'bg-white/5 text-gray-600'}`}>
                                        {isDone ? <CheckCircle2 size={12} /> : i + 1}
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-white' : 'text-gray-600'}`}>
                                        {s}
                                    </span>
                                </div>
                                {i < 3 && <div className="w-4 h-px bg-white/5" />}
                            </React.Fragment>
                        );
                    })}
                </div>
            </header>

            {/* Main Area */}
            <main className="flex-1 relative overflow-y-auto no-scrollbar">
                {/* Background Decor */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-rose-500/5 blur-[120px] rounded-full" />
                    <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />
                </div>

                <div className="relative z-10 min-h-full p-6 md:p-12 flex flex-col justify-center items-center">
                    <AnimatePresence mode="wait">
                        {step === 'upload' && (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-full max-w-4xl"
                            >
                                <div
                                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                    onDrop={(e) => { e.preventDefault(); e.stopPropagation(); handleFileUpload(e); }}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="group relative border-2 border-dashed border-white/10 hover:border-rose-500/50 rounded-[48px] p-16 md:p-24 text-center cursor-pointer transition-all bg-[#0D0D0F]/50 backdrop-blur-sm"
                                >
                                    <div className="w-24 h-24 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                        <Upload className="text-rose-400 w-10 h-10" />
                                    </div>
                                    <h2 className="text-4xl font-black mb-6 tracking-tight">{t.uploadTitle}</h2>
                                    <p className="text-gray-500 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                                        {t.uploadDesc}
                                    </p>
                                    <div className="inline-flex items-center gap-4 px-10 py-5 bg-rose-600 hover:bg-rose-700 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-rose-500/20 active:scale-95">
                                        <Play size={18} className="fill-current" />
                                        {t.uploadBtn}
                                    </div>
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

                        {step === 'analyze' && (
                            <motion.div
                                key="analyze"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full max-w-2xl flex flex-col items-center space-y-12"
                            >
                                <div className="relative w-48 h-48">
                                    <svg className="w-full h-full rotate-[-90deg]">
                                        <circle cx="96" cy="96" r="88" className="stroke-white/5 fill-none" strokeWidth="8" />
                                        <motion.circle
                                            cx="96" cy="96" r="88"
                                            className="stroke-rose-500 fill-none"
                                            strokeWidth="8"
                                            strokeDasharray="553"
                                            strokeDashoffset={553 - (553 * progress) / 100}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Zap className="text-rose-500 w-12 h-12 animate-pulse" />
                                    </div>
                                </div>
                                <div className="text-center space-y-4">
                                    <h2 className="text-3xl font-black uppercase tracking-tighter">{t.analyzeTitle}</h2>
                                    <p className="text-gray-500">{t.analyzeDesc}</p>
                                </div>
                                <div className="w-full bg-white/[0.02] border border-white/5 p-6 rounded-3xl min-h-[80px] flex items-center">
                                    <motion.div
                                        key={currentLog}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-4 text-xs font-mono"
                                    >
                                        <span className="text-rose-500 font-bold">[NEURAL_PROCESS]</span>
                                        <span className="text-gray-400">{t.logs[currentLog]}</span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}

                        {step === 'config' && (
                            <motion.div
                                key="config"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                            >
                                {/* Left: Video Preview */}
                                <div className="flex flex-col items-center gap-8">
                                    <div className="relative w-full max-w-[340px] aspect-[9/16] bg-black border-[12px] border-[#1C1C1E] rounded-[56px] overflow-hidden shadow-2xl group">
                                        {videoUrl ? (
                                            <>
                                                <video
                                                    ref={videoRef}
                                                    src={videoUrl}
                                                    className="w-full h-full object-cover"
                                                    onEnded={() => setIsPlaying(false)}
                                                    playsInline
                                                />
                                                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 pointer-events-none z-30">
                                                    <AnimatePresence>
                                                        {isPlaying && (
                                                            <motion.div
                                                                key={activeCaption}
                                                                initial={{ scale: 0.8, opacity: 0 }}
                                                                animate={{ scale: 1.2, opacity: 1 }}
                                                                exit={{ scale: 1.5, opacity: 0 }}
                                                                className="text-center"
                                                            >
                                                                <span
                                                                    className="text-3xl font-black italic uppercase tracking-tighter drop-shadow-lg"
                                                                    style={{ color: captionColor, WebkitTextStroke: '2px black' }}
                                                                >
                                                                    {VIRAL_CAPTIONS[activeCaption]}
                                                                </span>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-800">
                                                <Video size={48} className="mb-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{t.placeholderVideo}</span>
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            title={isPlaying ? "Pause" : "Play"}
                                            onClick={togglePlay}
                                            className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-40"
                                        >
                                            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                                                {isPlaying ? <Pause className="fill-white" /> : <Play className="fill-white ml-2" />}
                                            </div>
                                        </button>
                                    </div>
                                    <div className="flex gap-4 p-3 bg-white/5 rounded-3xl border border-white/5">
                                        {['#fbbf24', '#ffffff', '#fb7185', '#38bdf8'].map(c => (
                                            <button
                                                key={c}
                                                type="button"
                                                title={`Color ${c}`}
                                                onClick={() => setCaptionColor(c)}
                                                className={`w-10 h-10 rounded-full border-2 transition-all ${captionColor === c ? 'border-white scale-110 shadow-lg' : 'border-transparent scale-90'}`}
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Controls */}
                                <div className="space-y-10">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            <h2 className="text-4xl font-black uppercase tracking-tighter italic">{t.configTitle}</h2>
                                            <p className="text-gray-500">{t.configDesc}</p>
                                        </div>
                                        <button
                                            type="button"
                                            title="Reset"
                                            onClick={reset}
                                            className="p-4 bg-white/5 hover:bg-rose-500/10 border border-white/5 rounded-2xl transition-all"
                                        >
                                            <RotateCcw size={20} className="text-gray-400" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 text-rose-400">
                                                <Layers size={18} />
                                                <h3 className="text-xs font-black uppercase tracking-widest">{t.captions}</h3>
                                            </div>
                                            <div className="space-y-3">
                                                {t.captionStyles.map(s => (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        className={`w-full text-left p-5 rounded-3xl border transition-all text-xs font-bold uppercase ${s.includes('Hormozi') ? 'bg-rose-600/10 border-rose-500/30 text-white shadow-lg' : 'bg-white/[0.02] border-white/5 text-gray-500 hover:bg-white/5'}`}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 text-rose-400">
                                                <Settings2 size={18} />
                                                <h3 className="text-xs font-black uppercase tracking-widest">{t.autoCrop}</h3>
                                            </div>
                                            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[40px] space-y-8">
                                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                                                    <span>AI Status</span>
                                                    <span className="text-emerald-500">ACTIVE</span>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between text-[10px] font-bold text-gray-600">
                                                        <span>{t.sensitivity}</span>
                                                        <span className="text-white">85%</span>
                                                    </div>
                                                    <div className="h-1 w-full bg-white/5 rounded-full">
                                                        <div className="h-full w-[85%] bg-rose-500 rounded-full" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleExport}
                                        disabled={isProcessing}
                                        className="w-full relative py-6 bg-rose-600 hover:bg-rose-700 disabled:bg-white/5 disabled:text-gray-700 rounded-[32px] font-black text-xl uppercase italic tracking-tighter transition-all shadow-2xl shadow-rose-500/20 active:scale-[0.98]"
                                    >
                                        <div className="relative z-10 flex items-center justify-center gap-4">
                                            {isProcessing ? (
                                                <>
                                                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                    <span>{t.processing} {progress}%</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles size={24} className="fill-current" />
                                                    <span>{t.generateBtn}</span>
                                                </>
                                            )}
                                        </div>
                                        {isProcessing && (
                                            <div className="absolute inset-0 bg-white/10" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }} />
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 'export' && (
                            <motion.div
                                key="export"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full max-w-5xl flex flex-col items-center py-12"
                            >
                                <div className="text-center mb-16 space-y-4">
                                    <div className="w-24 h-24 bg-emerald-500/10 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-inner shadow-emerald-500/20">
                                        <CheckCircle2 className="text-emerald-400 w-12 h-12" />
                                    </div>
                                    <h2 className="text-5xl font-black uppercase italic tracking-tighter">{t.readyTitle}</h2>
                                    <p className="text-gray-500 text-lg max-w-xl mx-auto">{t.readyDesc(3)}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="group p-6 bg-white/[0.02] border border-white/5 hover:border-emerald-500/50 rounded-[48px] transition-all">
                                            <div className="aspect-[9/16] bg-black rounded-[32px] mb-6 overflow-hidden relative border border-white/5">
                                                {videoUrl && <video src={videoUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" muted />}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-all pointer-events-none">
                                                    <Play className="fill-white" size={32} />
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-left">
                                                    <h4 className="font-bold uppercase tracking-tight text-sm">{t.momentTitle(i)}</h4>
                                                    <span className="text-[10px] text-gray-600 font-bold">15s • 4K HDR</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    title="Download"
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); triggerDownload(videoFile, `Viral_Moment_${i}.mp4`); }}
                                                    className="p-4 bg-emerald-500 hover:bg-emerald-600 transition-all rounded-2xl text-white shadow-lg active:scale-90"
                                                >
                                                    <Download size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col md:flex-row gap-6">
                                    <button
                                        type="button"
                                        onClick={reset}
                                        className="px-12 py-5 bg-white/5 hover:bg-white/10 rounded-[32px] font-black uppercase text-sm tracking-widest transition-all"
                                    >
                                        {t.processAlt}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); triggerDownload(null, "Neural_Viral_Batch.zip"); }}
                                        className="px-12 py-5 bg-emerald-600 hover:bg-emerald-700 rounded-[32px] font-black uppercase text-sm tracking-widest transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-3 active:scale-95"
                                    >
                                        <Download size={20} />
                                        {t.downloadAll}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Footer Hud */}
            <footer className="flex-none px-8 py-3 bg-[#0D0D0F] border-t border-white/5 hidden md:flex items-center justify-between opacity-50 pointer-events-none">
                <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Neural Engine Online // v2.0.4
                </div>
                <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-tighter">
                    <div className="flex items-center gap-2 italic">TikTok Optimize <CheckCircle2 size={12} className="text-emerald-500" /></div>
                    <div className="flex items-center gap-2 italic">Reels Optimize <CheckCircle2 size={12} className="text-emerald-500" /></div>
                </div>
            </footer>
        </div>
    );
}
