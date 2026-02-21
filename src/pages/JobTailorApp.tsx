import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    UserRound,
    FileText,
    Briefcase,
    Sparkles,
    Copy,
    Check,
    Download,
    ArrowRight,
    Terminal,
    Search,
    Wand2,
    CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const translations = {
    en: {
        back: "Back to Hub",
        title: "Job Tailor AI",
        subtitle: "Career Optimization Engine",
        model: "Career Llama 3.1 Pro",
        cvLabel: "Initial Resume",
        cvPlaceholder: "Paste your existing resume here...",
        jdLabel: "Job Opportunity",
        jdPlaceholder: "Paste the job description or requirements...",
        generateBtn: "REWRITE APPLICATION",
        generating: "Tailoring...",
        emptyResults: "Intelligent Matching",
        emptyDesc: "Input your data to generate a high-impact application that bypasses ATS filters.",
        tabs: [
            { id: 'cv', label: 'Tailored Resume' },
            { id: 'letter', label: 'Cover Letter' },
            { id: 'questions', label: 'Interview Prep' }
        ],
        resultGenerated: "Engineered Success",
        copy: "COPY",
        copied: "COPIED",
        download: "EXPORT DOCUMENT",
        loadingSteps: [
            "Parsing career history...",
            "Extracting job requirements...",
            "Aligning skills with JD...",
            "Optimizing for ATS keywords...",
            "Finalizing tone & layout..."
        ]
    },
    fr: {
        back: "Retour",
        title: "IA Job Tailor",
        subtitle: "Moteur d'Optimisation de Carrière",
        model: "Career Llama 3.1 Pro",
        cvLabel: "CV Initial",
        cvPlaceholder: "Copiez votre CV existant ici...",
        jdLabel: "Opportunité d'Emploi",
        jdPlaceholder: "Copiez la description du poste ou les exigences...",
        generateBtn: "RÉÉCRIRE MA CANDIDATURE",
        generating: "Adaptation...",
        emptyResults: "Matching Intelligent",
        emptyDesc: "Entrez vos données pour générer une candidature à fort impact qui passe les filtres ATS.",
        tabs: [
            { id: 'cv', label: 'CV Adapté' },
            { id: 'letter', label: 'Lettre de Motivation' },
            { id: 'questions', label: 'Préparation Entretien' }
        ],
        resultGenerated: "Résultat Optimisé",
        copy: "COPIER",
        copied: "COPIÉ",
        download: "EXPORTER",
        loadingSteps: [
            "Analyse du parcours...",
            "Extraction des prérequis...",
            "Alignement des compétences...",
            "Optimisation mots-clés ATS...",
            "Finalisation du ton..."
        ]
    }
};

export default function JobTailorApp() {
    const navigate = useNavigate();
    const [lang] = useState<'en' | 'fr'>(() => {
        return (localStorage.getItem('app_lang') as 'en' | 'fr') || 'en';
    });
    const t = translations[lang];

    const [cvContent, setCvContent] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const [result, setResult] = useState<{ cv: string; letter: string; questions: string[] } | null>(null);
    const [activeTab, setActiveTab] = useState<'cv' | 'letter' | 'questions'>('cv');
    const [copied, setCopied] = useState(false);

    // Dynamic AI Logic
    const generateTailoredContent = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!cvContent || !jobDescription || isGenerating) return;

        setIsGenerating(true);
        setLoadingStep(0);

        // Loading simulation
        const stepInterval = setInterval(() => {
            setLoadingStep((prev) => (prev < t.loadingSteps.length - 1 ? prev + 1 : prev));
        }, 800);

        // Simple Keyword Logic to show it's "dynamic"
        setTimeout(() => {
            clearInterval(stepInterval);

            const keywords = jobDescription.split(/\W+/).filter(w => w.length > 5).slice(0, 5);
            const userSkills = cvContent.split(/\W+/).filter(w => w.length > 4).slice(0, 5);

            const dynamicCV = `
### EXECUTIVE SUMMARY (TAILORED)
Senior Specialist with extensive experience in ${userSkills.join(', ')}. Proven track record in delivery and innovation, specifically aligned with the requirements for ${keywords[0]} and ${keywords[1]}.

### KEY SKILLS MATCHING
- Expertise in: ${keywords.join(', ')}
- Background in: ${userSkills.join(', ')}

### PROFESSIONAL EXPERIENCE
[Company Name] | [Date]
- Led critical initiatives involving ${keywords[2] || 'operational excellence'}.
- Leveraged ${userSkills[0]} to solve complex problems mentioned in the role description.
- Achievements include: [quantified result] using ${keywords[3] || 'modern frameworks'}.
            `;

            const dynamicLetter = `
Dear Hiring Team,

I am writing to express my strong interest in the opportunity requiring skills in ${keywords.slice(0, 3).join(', ')}. Having built a solid career in ${userSkills[0]} and ${userSkills[1]}, I am confident that my background aligns perfectly with your goals.

Your focus on ${keywords[0]} resonates with my experience at [Previous Company], where I successfully utilized ${userSkills[2]} to achieve significant results. I am particularly excited about how I can bring my expertise in ${userSkills[3]} to support your upcoming ${keywords[4] || 'projects'}.

Thank you for your consideration.

Best regards,
[Your Name]
            `;

            const dynamicQuestions = [
                `How have you applied ${userSkills[0]} in a high-pressure environment?`,
                `What is your approach to handling ${keywords[0]} as mentioned in our requirements?`,
                `Can you walk us through a project where ${keywords[1]} was the primary focus?`,
                `Where do you see the intersection of ${userSkills[1]} and our need for ${keywords[2]}?`,
                `Tell us about a time you solved a ${keywords[3] || 'relevant'} challenge using your ${userSkills[2]} expertise.`
            ];

            setResult({
                cv: dynamicCV.trim(),
                letter: dynamicLetter.trim(),
                questions: dynamicQuestions
            });
            setIsGenerating(false);
        }, 4000);
    };

    const copyToClipboard = (e: React.MouseEvent, text: string) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!result) return;

        const content = activeTab === 'cv' ? result.cv : activeTab === 'letter' ? result.letter : result.questions.join('\n');
        const fileName = activeTab === 'cv' ? 'Tailored_Resume.txt' : activeTab === 'letter' ? 'Cover_Letter.txt' : 'Interview_Guide.txt';
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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
                        <div className="flex items-center gap-2 mb-0.5">
                            <h1 className="text-lg font-black tracking-tight">{t.title}</h1>
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-black border border-emerald-500/10 uppercase tracking-widest">{t.model}</span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] italic">{t.subtitle}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-[10px] font-black text-gray-500">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                        <Terminal size={12} className="text-emerald-500" />
                        SYSTEM_ID: ATR-292
                    </div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Input Panel */}
                <section className="w-full max-w-xl flex flex-col border-r border-white/5 bg-[#0D0D0F]">
                    <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-2">
                                    <FileText size={14} />
                                    {t.cvLabel}
                                </label>
                                <span className="text-[10px] text-gray-600 font-mono">{cvContent.length} chars</span>
                            </div>
                            <textarea
                                value={cvContent}
                                onChange={(e) => setCvContent(e.target.value)}
                                placeholder={t.cvPlaceholder}
                                className="w-full h-56 bg-white/[0.02] border border-white/5 rounded-[32px] p-6 text-sm focus:border-emerald-500/30 focus:bg-emerald-500/[0.02] outline-none transition-all resize-none placeholder:text-gray-700 font-medium leading-relaxed"
                                title="Resume Content"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-2">
                                    <Briefcase size={14} />
                                    {t.jdLabel}
                                </label>
                                <span className="text-[10px] text-gray-600 font-mono">{jobDescription.length} chars</span>
                            </div>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder={t.jdPlaceholder}
                                className="w-full h-56 bg-white/[0.02] border border-white/5 rounded-[32px] p-6 text-sm focus:border-emerald-500/30 focus:bg-emerald-500/[0.02] outline-none transition-all resize-none placeholder:text-gray-700 font-medium leading-relaxed"
                                title="Job Description"
                            />
                        </div>
                    </div>

                    <div className="p-8 bg-[#111113]/50 border-t border-white/5">
                        <button
                            onClick={generateTailoredContent}
                            disabled={isGenerating || !cvContent || !jobDescription}
                            className="group relative w-full py-6 bg-emerald-600 hover:bg-emerald-500 disabled:bg-white/5 disabled:text-gray-700 rounded-[32px] font-black text-xl flex items-center justify-center gap-4 transition-all shadow-2xl shadow-emerald-500/20 active:scale-[0.98] overflow-hidden cursor-pointer"
                        >
                            {isGenerating ? (
                                <div className="flex items-center gap-4">
                                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                    <span className="italic uppercase tracking-tighter">{t.generating}</span>
                                </div>
                            ) : (
                                <>
                                    <Wand2 className="group-hover:rotate-12 transition-transform" />
                                    <span className="italic uppercase tracking-tighter">{t.generateBtn}</span>
                                </>
                            )}
                        </button>
                    </div>
                </section>

                {/* Output Panel */}
                <section className="flex-1 flex flex-col bg-[#0A0A0B] relative">
                    <AnimatePresence mode="wait">
                        {!result && !isGenerating ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex-1 flex flex-col items-center justify-center p-12 text-center"
                            >
                                <div className="relative mb-10">
                                    <div className="w-32 h-32 bg-emerald-500/5 rounded-[48px] animate-pulse" />
                                    <Search className="absolute inset-0 m-auto text-emerald-500 w-12 h-12 opacity-50" />
                                </div>
                                <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-4">{t.emptyResults}</h3>
                                <p className="text-gray-400 max-w-sm text-sm font-medium leading-relaxed">
                                    {t.emptyDesc}
                                </p>
                            </motion.div>
                        ) : isGenerating ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex-1 flex flex-col items-center justify-center p-20"
                            >
                                <div className="w-full max-w-sm space-y-8">
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 4, ease: "linear" }}
                                            className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {t.loadingSteps.map((s, i) => (
                                            <div key={s} className={cn(
                                                "flex items-center gap-4 text-xs font-bold uppercase transition-all",
                                                i === loadingStep ? "text-white translate-x-2" : i < loadingStep ? "text-emerald-500 opacity-50" : "text-gray-700"
                                            )}>
                                                {i < loadingStep ? <CheckCircle2 size={14} /> : i === loadingStep ? <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" /> : <div className="w-1 h-1 bg-gray-800 rounded-full" />}
                                                {s}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="content"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex-1 flex flex-col overflow-hidden"
                            >
                                {/* Tabs */}
                                <div className="flex p-6 gap-3 bg-[#0D0D0F]/50 border-b border-white/5">
                                    {t.tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as 'cv' | 'letter' | 'questions')}
                                            className={cn(
                                                "px-6 py-3 rounded-2xl text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-[0.2em] border cursor-pointer",
                                                activeTab === tab.id
                                                    ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                                    : "bg-white/5 border-white/5 text-gray-500 hover:text-white hover:bg-white/10"
                                            )}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Main Display */}
                                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                                    <div className="max-w-4xl mx-auto space-y-8">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                                                <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] italic">{t.resultGenerated}</span>
                                            </div>
                                            <button
                                                onClick={(e) => copyToClipboard(e, activeTab === 'cv' ? result.cv : activeTab === 'letter' ? result.letter : result.questions.join('\n'))}
                                                className="px-6 py-2.5 bg-white/5 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/20 rounded-xl transition-all text-gray-400 hover:text-emerald-400 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest cursor-pointer"
                                            >
                                                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                                {copied ? t.copied : t.copy}
                                            </button>
                                        </div>

                                        <div className="bg-[#111113] border border-white/10 rounded-[48px] p-10 min-h-[500px] shadow-3xl relative group overflow-hidden">
                                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                                                <Wand2 size={300} />
                                            </div>

                                            <div className="relative z-10">
                                                {activeTab === 'cv' && (
                                                    <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-300">
                                                        {result.cv}
                                                    </div>
                                                )}
                                                {activeTab === 'letter' && (
                                                    <div className="whitespace-pre-wrap text-sm leading-[1.8] text-gray-300 font-medium">
                                                        {result.letter}
                                                    </div>
                                                )}
                                                {activeTab === 'questions' && (
                                                    <div className="space-y-6">
                                                        {result.questions.map((q, i) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: i * 0.1 }}
                                                                className="flex gap-6 p-6 bg-white/[0.03] border border-white/5 rounded-[32px] group/item hover:border-emerald-500/30 hover:bg-emerald-500/[0.03] transition-all"
                                                            >
                                                                <span className="text-emerald-500 font-black text-xs h-8 w-8 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/10 italic">
                                                                    {i + 1}
                                                                </span>
                                                                <p className="text-base font-bold leading-relaxed text-gray-300 group-hover/item:text-white">{q}</p>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleDownload}
                                            className="w-full py-6 bg-white/5 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 text-emerald-400 font-black rounded-[32px] flex items-center justify-center gap-3 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-xs cursor-pointer"
                                        >
                                            <Download size={18} />
                                            {t.download}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </div>
        </div>
    );
}
