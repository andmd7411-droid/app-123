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
    Smile
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
    const [captionColor, setCaptionColor] = useState('#fbbf24'); // Amber-400

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

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
        let file: File | null = null;
        if ('files' in e.target && e.target.files?.[0]) {
            file = e.target.files[0];
        } else if ('dataTransfer' in e && e.dataTransfer.files?.[0]) {
            file = e.dataTransfer.files[0];
        }

        if (file && file.type.startsWith('video/')) {
            setVideoFile(file);
            setVideoUrl(URL.createObjectURL(file));
            setStep('analyze');
            startAnalysis();
        }
    };

    const startAnalysis = () => {
        let p = 0;
        let logIndex = 0;
        const interval = setInterval(() => {
            p += Math.random() * 8;
            if (p >= 100) {
                p = 100;
                clearInterval(interval);
                setTimeout(() => setStep('config'), 500);
            }
            if (p > (logIndex + 1) * 16.6 && logIndex < t.logs.length - 1) {
                logIndex++;
                setCurrentLog(logIndex);
            }
            setProgress(p);
        }, 300);
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const triggerDownload = (blob: Blob, fileName: string) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 1500);
    };

    const handleExport = () => {
        setIsProcessing(true);
        let p = 0;
        const interval = setInterval(() => {
            p += 2;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setIsProcessing(false);
                setStep('export');
            }
        }, 50);
    };

    return (
        <div className="flex flex-col h-screen bg-[#0A0A0B] text-white overflow-hidden font-outfit">
            {/* Header */}
            <header className="flex items-center justify-between px-8 py-5 bg-[#0D0D0F]/80 backdrop-blur-xl border-b border-white/5 relative z-50">
                <div className="flex items-center gap-6">
                    <button
                        title={t.back}
                        onClick={() => navigate('/')}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-gray-400 hover:text-white border border-white/5"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3 mb-0.5">
                            <div className="p-1.5 bg-rose-500/10 rounded-lg">
                                <Video className="text-rose-400 w-4 h-4" />
                            </div>
                            <h1 className="text-lg font-bold tracking-tight">{t.title}</h1>
                        </div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{t.subtitle}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {t.steps.map((s, i) => {
                        const stepKeys = ['upload', 'analyze', 'config', 'export'];
                        const isActive = step === stepKeys[i];
                        const isDone = stepKeys.indexOf(step) > i;
                        return (
                            <React.Fragment key={s}>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${isActive ? 'bg-rose-500 text-white' : isDone ? 'bg-emerald-500 text-white' : 'bg-white/5 text-gray-600'}`}>
                                        {isDone ? <CheckCircle2 size={12} /> : i + 1}
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-white' : 'text-gray-600'}`}>
                                        {s}
                                    </span>
                                </div>
                                {i < 3 && <div className="w-8 h-px bg-white/5" />}
                            </React.Fragment>
                        );
                    })}
                </div>
            </header>

            <div className="flex-1 overflow-hidden relative">
                {/* Background FX */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-rose-600/5 blur-[120px] rounded-full" />
                    <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
                </div>

                <main className="h-full relative z-10 p-8">
                    <AnimatePresence mode="wait">
                        {step === 'upload' && (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="h-full flex items-center justify-center"
                            >
                                <div
                                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                    onDrop={(e) => { e.preventDefault(); e.stopPropagation(); handleFileUpload(e); }}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="max-w-4xl w-full group relative"
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-500/20 via-purple-500/20 to-blue-500/20 rounded-[48px] blur-xl opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                                    <div className="relative border-2 border-dashed border-white/10 hover:border-rose-500/50 rounded-[48px] p-24 text-center cursor-pointer transition-all bg-[#0D0D0F]/40 backdrop-blur-sm group-hover:bg-[#0D0D0F]/60">
                                        <div className="w-24 h-24 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                            <Upload className="text-rose-400 w-10 h-10" />
                                        </div>
                                        <h2 className="text-4xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">{t.uploadTitle}</h2>
                                        <p className="text-gray-500 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                                            {t.uploadDesc}
                                        </p>
                                        <div className="inline-flex items-center gap-4 px-10 py-5 bg-rose-600 hover:bg-rose-700 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-rose-500/20 hover:-translate-y-1">
                                            <Play size={18} className="fill-current" />
                                            {t.uploadBtn}
                                        </div>
                                        <input
                                            type="file"
                                            title={t.uploadBtn}
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="video/*"
                                            onChange={handleFileUpload}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 'analyze' && (
                            <motion.div
                                key="analyze"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center max-w-3xl mx-auto space-y-12"
                            >
                                <div className="relative w-48 h-48">
                                    <svg className="w-full h-full rotate-[-90deg]">
                                        <circle
                                            cx="96" cy="96" r="88"
                                            className="stroke-white/5 fill-none"
                                            strokeWidth="8"
                                        />
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
                                    <p className="text-gray-500 max-w-md mx-auto">{t.analyzeDesc}</p>
                                </div>

                                <div className="w-full space-y-4 bg-white/[0.02] border border-white/5 p-6 rounded-3xl">
                                    <AnimatePresence mode="popLayout">
                                        <motion.div
                                            key={currentLog}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center gap-4 text-xs font-mono"
                                        >
                                            <span className="text-rose-500 font-bold tracking-widest">[PROCESS]</span>
                                            <span className="text-gray-400">{t.logs[currentLog]}</span>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}

                        {step === 'config' && (
                            <motion.div
                                key="config"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="h-full grid grid-cols-1 lg:grid-cols-12 gap-10"
                            >
                                {/* Preview Panel */}
                                <div className="lg:col-span-5 flex flex-col items-center justify-center gap-8">
                                    <div className="relative w-[340px] aspect-[9/16] bg-[#0D0D0F] border-[12px] border-[#1C1C1E] rounded-[56px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] group">
                                        {videoUrl ? (
                                            <>
                                                <video
                                                    ref={videoRef}
                                                    src={videoUrl}
                                                    className="w-full h-full object-cover grayscale-[20%] sepia-[10%] group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-700"
                                                    onEnded={() => setIsPlaying(false)}
                                                    playsInline
                                                />
                                                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 pointer-events-none z-30">
                                                    <AnimatePresence mode="wait">
                                                        {isPlaying && (
                                                            <motion.div
                                                                key={activeCaption}
                                                                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                                                                animate={{ scale: 1.2, opacity: 1, rotate: 5 }}
                                                                exit={{ scale: 1.5, opacity: 0, rotate: 0 }}
                                                                className="text-center"
                                                            >
                                                                <span
                                                                    className="text-3xl font-black italic uppercase tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,1)]"
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
                                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-700 bg-white/[0.02]">
                                                <Video size={48} className="mb-4 opacity-20" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{t.placeholderVideo}</span>
                                            </div>
                                        )}

                                        {/* HUD Overlay */}
                                        <div className="absolute inset-0 pointer-events-none flex flex-col p-8 bg-gradient-to-b from-black/40 via-transparent to-black/60">
                                            <div className="flex justify-between items-start">
                                                <div className="px-2 py-1 bg-rose-500 rounded text-[8px] font-black uppercase">Live Preview</div>
                                                <div className="flex gap-1">
                                                    <Smartphone size={10} className="text-white/40" />
                                                    <Maximize2 size={10} className="text-white/40" />
                                                </div>
                                            </div>
                                            <div className="mt-auto flex justify-between items-end">
                                                <div className="space-y-1">
                                                    <div className="w-20 h-0.5 bg-white/20 rounded-full overflow-hidden">
                                                        <motion.div
                                                            animate={{ width: isPlaying ? '100%' : '0%' }}
                                                            transition={{ duration: 5, repeat: Infinity }}
                                                            className="h-full bg-rose-500"
                                                        />
                                                    </div>
                                                    <div className="text-[8px] text-white/50 font-mono tracking-widest italic">00:00:15 / PRO_V1</div>
                                                </div>
                                                <div className="p-1 px-2 border border-white/20 rounded bg-white/5 text-[8px] font-bold">4K HDR</div>
                                            </div>
                                        </div>

                                        {/* Play Toggle */}
                                        <button
                                            title={isPlaying ? "Pause" : "Play"}
                                            onClick={togglePlay}
                                            className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 scale-90 group-hover:scale-100 transition-all duration-300">
                                                {isPlaying ? <Pause className="fill-white" /> : <Play className="fill-white ml-1" />}
                                            </div>
                                        </button>
                                    </div>

                                    <div className="flex gap-4 p-2 bg-white/5 rounded-3xl border border-white/5">
                                        {['#fbbf24', '#ffffff', '#fb7185', '#38bdf8'].map(c => (
                                            <button
                                                key={c}
                                                title={`Select color ${c}`}
                                                onClick={() => setCaptionColor(c)}
                                                className={`w-8 h-8 rounded-full border-2 transition-all ${captionColor === c ? 'border-white scale-110 shadow-lg' : 'border-transparent scale-90 hover:scale-100'}`}
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Controls Panel */}
                                <div className="lg:col-span-7 py-6 overflow-y-auto no-scrollbar">
                                    <div className="mb-10 flex justify-between items-start">
                                        <div>
                                            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">{t.configTitle}</h2>
                                            <p className="text-gray-500">{t.configDesc}</p>
                                        </div>
                                        <button
                                            onClick={() => { setStep('upload'); setVideoFile(null); setVideoUrl(null); }}
                                            className="p-4 bg-white/5 hover:bg-rose-500/10 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group transition-all"
                                        >
                                            <History size={14} className="group-hover:rotate-[-45deg] transition-all" />
                                            Re-Upload
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 text-rose-400">
                                                <Layers size={18} />
                                                <h3 className="text-sm font-black uppercase tracking-widest">{t.captions}</h3>
                                            </div>
                                            <div className="space-y-3">
                                                {t.captionStyles.map(s => (
                                                    <button
                                                        key={s}
                                                        className={`w-full flex items-center justify-between p-5 rounded-3xl border transition-all text-left ${s.includes('Hormozi') ? 'bg-rose-600/10 border-rose-500/50 text-white' : 'bg-white/[0.02] border-white/5 text-gray-500 hover:bg-white/5'}`}
                                                    >
                                                        <span className="text-xs font-bold uppercase tracking-tight">{s}</span>
                                                        <Zap size={14} className={s.includes('Hormozi') ? 'text-rose-400' : 'text-gray-700'} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 text-rose-400">
                                                <Settings2 size={18} />
                                                <h3 className="text-sm font-black uppercase tracking-widest">{t.autoCrop}</h3>
                                            </div>
                                            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-8">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Auto-Focus</span>
                                                    <div className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-[10px] font-black">AI_ON</div>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                                        <span className="text-gray-600 font-mono tracking-tighter">{t.sensitivity}</span>
                                                        <span className="text-white tracking-widest">85%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full" />
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/5">
                                                    <button title="Focus on Head" className="flex-1 py-1.5 bg-rose-600 rounded-xl text-[8px] font-black">HEAD_FOCUS</button>
                                                    <button title="Full Body Scan" className="flex-1 py-1.5 hover:bg-white/5 transition-all text-[8px] font-black text-gray-600">BODY_SCAN</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleExport}
                                        disabled={isProcessing}
                                        className="w-full relative group py-6 bg-rose-600 hover:bg-rose-700 rounded-[32px] font-black text-xl overflow-hidden transition-all shadow-2xl shadow-rose-500/20 active:scale-[0.98]"
                                    >
                                        <div className="relative z-10 flex items-center justify-center gap-4">
                                            {isProcessing ? (
                                                <>
                                                    <div className="w-6 h-6 border-[3px] border-white/20 border-t-white rounded-full animate-spin" />
                                                    <span className="tracking-tighter uppercase italic">{t.processing} {progress}%</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="fill-current" />
                                                    <span className="tracking-tighter uppercase italic">{t.generateBtn}</span>
                                                </>
                                            )}
                                        </div>
                                        <AnimatePresence>
                                            {isProcessing && (
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: '100%' }}
                                                    className="absolute bottom-0 left-0 w-full bg-white/10 backdrop-blur-sm"
                                                    style={{ height: `${progress}%` }}
                                                />
                                            )}
                                        </AnimatePresence>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 'export' && (
                            <motion.div
                                key="export"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center py-12"
                            >
                                <div className="space-y-6 mb-12">
                                    <div className="w-32 h-32 bg-emerald-500/10 rounded-[48px] flex items-center justify-center mx-auto relative group">
                                        <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150 group-hover:scale-200 transition-transform duration-1000" />
                                        <CheckCircle2 className="text-emerald-400 w-16 h-16 relative z-10" />
                                    </div>
                                    <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">{t.readyTitle}</h2>
                                    <p className="text-gray-500 text-lg max-w-xl mx-auto">
                                        {t.readyDesc(3)}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mb-12">
                                    {[1, 2, 3].map(i => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ y: -8 }}
                                            className="group p-6 bg-white/[0.02] border border-white/5 hover:border-emerald-500/50 rounded-[40px] transition-all overflow-hidden relative"
                                        >
                                            <div className="aspect-[9/16] bg-[#0D0D0F] rounded-[32px] mb-6 overflow-hidden relative border border-white/5">
                                                {videoUrl && <video src={videoUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" muted />}
                                                <div className="absolute inset-x-6 bottom-12 py-2 px-4 bg-emerald-500/90 backdrop-blur shadow-2xl rounded-xl rotate-[-2deg] flex items-center justify-center gap-2">
                                                    <Smile size={14} className="text-white" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Viral Hook Detected</span>
                                                </div>
                                                <button title="Play Clip" className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                                    <div className="p-4 bg-emerald-500 rounded-full shadow-2xl">
                                                        <Play className="fill-white ml-1" size={24} />
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div className="text-left">
                                                    <h4 className="font-black italic uppercase tracking-tighter text-lg">{t.momentTitle(i)}</h4>
                                                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">4K • 15 Seconds • Vert</span>
                                                </div>
                                                <button
                                                    onClick={() => { if (videoFile) triggerDownload(videoFile, `Viral_Clip_${i}.mp4`); }}
                                                    className="p-4 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-500/20 active:scale-90 transition-all"
                                                    title="Download"
                                                >
                                                    <Download size={20} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="flex flex-col md:flex-row gap-6">
                                    <button
                                        onClick={() => { setStep('upload'); setVideoFile(null); setVideoUrl(null); }}
                                        className="px-12 py-5 bg-white/5 hover:bg-white/10 rounded-3xl font-black uppercase italic tracking-widest transition-all"
                                    >
                                        {t.processAlt}
                                    </button>
                                    <button
                                        onClick={() => { if (videoFile) triggerDownload(new Blob(["ZIP Simulation"], { type: 'application/zip' }), "Viral_Export.zip"); }}
                                        className="px-12 py-5 bg-emerald-600 hover:bg-emerald-700 rounded-3xl font-black uppercase italic tracking-widest transition-all shadow-2xl shadow-emerald-500/20 flex items-center gap-3"
                                    >
                                        <Download size={20} />
                                        {t.downloadAll}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Global Hud Bottom */}
            <footer className="px-8 py-3 bg-[#0D0D0F] border-t border-white/5 flex items-center justify-between pointer-events-none opacity-40">
                <div className="flex items-center gap-6 text-[10px] font-mono tracking-widest">
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> NEURAL ENGINE ACTIVE</span>
                    <span className="text-gray-600 font-bold">// STUDIO_BUILD_v1.2.0</span>
                </div>
                <div className="hidden md:flex gap-6 text-[10px] font-black uppercase tracking-tighter grayscale">
                    <div className="flex items-center gap-2">TIKTOK <CheckCircle2 size={12} /></div>
                    <div className="flex items-center gap-2">REELS <CheckCircle2 size={12} /></div>
                    <div className="flex items-center gap-2">SHORTS <CheckCircle2 size={12} /></div>
                </div>
            </footer>
        </div>
    );
}
