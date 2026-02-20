import React, { useState } from 'react';
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
    AlertCircle,
    Plus,
    ArrowRight,
    HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const translations = {
    en: {
        back: "Back to Hub",
        title: "Job Tailor AI",
        model: "Career Model v2.0",
        cvLabel: "Your Base CV",
        cvPlaceholder: "Enter your CV here (text or paste)...",
        jdLabel: "Job Description",
        jdPlaceholder: "Paste the job posting description here...",
        generateBtn: "TAILOR MY APPLICATION",
        generating: "INTELLIGENT REWRITING...",
        emptyResults: "Instant results",
        emptyDesc: "Fill in the data on the left to generate a perfectly tailored employment package.",
        tabs: [
            { id: 'cv', label: 'Tailored CV' },
            { id: 'letter', label: 'Cover Letter' },
            { id: 'questions', label: 'Interview Questions' }
        ],
        resultGenerated: "Generated Result",
        copy: "COPY",
        copied: "COPIED",
        download: "DOWNLOAD DOCX / PDF",
        aiResult: {
            cv: "RELEVANT EXPERIENCE (TAILORED):\n- Senior Frontend Developer with focus on React & Tailwind (as mentioned in job requirements).\n- Experience in web performance optimization, exactly as requested in the ad.\n- Technical leadership and cross-functional collaboration...",
            letter: "Dear Hiring Manager,\n\nI am excited to apply for the Developer position. Given your requirements for a UI/UX expert with product vision, my CV highlights my previous achievements that align perfectly with your company goals...",
            questions: [
                "How did you approach a complex problem using React?",
                "Give an example of performance optimization that brought clear results.",
                "How do you collaborate with the design team during implementation?",
                "Why do you want to work with us, given our vision for AI?",
                "How do you ensure the accessibility of your interfaces?"
            ]
        }
    },
    fr: {
        back: "Retour au Hub",
        title: "IA Job Tailor",
        model: "Modèle Carrière v2.0",
        cvLabel: "Votre CV de Base",
        cvPlaceholder: "Entrez votre CV ici (texte ou copier-coller)...",
        jdLabel: "Description du Poste",
        jdPlaceholder: "Collez la description de l'annonce ici...",
        generateBtn: "ADAPTER MA CANDIDATURE",
        generating: "RÉÉCRITURE INTELLIGENTE...",
        emptyResults: "Résultats instantanés",
        emptyDesc: "Remplissez les données à gauche pour générer un dossier de candidature parfaitement adapté.",
        tabs: [
            { id: 'cv', label: 'CV Adapté' },
            { id: 'letter', label: 'Lettre de Motivation' },
            { id: 'questions', label: 'Questions d\'Entretien' }
        ],
        resultGenerated: "Résultat Généré",
        copy: "COPIER",
        copied: "COPIÉ",
        download: "TÉLÉCHARGER DOCX / PDF",
        aiResult: {
            cv: "EXPÉRIENCE PERTINENTE (ADAPTÉE) :\n- Développeur Frontend Senior spécialisé en React & Tailwind (mentionnés dans les exigences du poste).\n- Expérience en optimisation des performances web, exactement comme demandé dans l'annonce.\n- Leadership technique et collaboration transversale...",
            letter: "Madame, Monsieur le Responsable du Recrutement,\n\nC'est avec enthousiasme que je postule pour le poste de Développeur. Compte tenu de vos besoins pour un expert UI/UX avec une vision produit, mon CV met en avant mes réalisations précédentes qui s'alignent parfaitement avec les objectifs de votre entreprise...",
            questions: [
                "Comment avez-vous abordé un problème complexe en utilisant React ?",
                "Donnez un exemple d'optimisation des performances ayant apporté des résultats clairs.",
                "Comment collaborez-vous avec l'équipe de design lors de l'implémentation ?",
                "Pourquoi souhaitez-vous travailler chez nous, compte tenu de notre vision de l'IA ?",
                "Comment assurez-vous l'accessibilité de vos interfaces ?"
            ]
        }
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
    const [result, setResult] = useState<{ cv: string; letter: string; questions: string[] } | null>(null);
    const [activeTab, setActiveTab] = useState<'cv' | 'letter' | 'questions'>('cv');
    const [copied, setCopied] = useState(false);

    const generateTailoredContent = () => {
        if (!cvContent || !jobDescription) return;
        setIsGenerating(true);

        // Simulate AI Generation
        setTimeout(() => {
            setResult(t.aiResult);
            setIsGenerating(false);
        }, 2500);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

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
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <UserRound className="text-emerald-400 w-5 h-5" />
                        </div>
                        <h1 className="text-sm font-bold">{t.title}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <Sparkles size={12} className="text-emerald-400" />
                    <span className="text-[10px] uppercase font-black text-emerald-400">{t.model}</span>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Side: Input */}
                <section className="flex-1 flex flex-col border-r border-white/5 bg-[#0D0D0F]">
                    <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-gray-400 mb-2">
                                <FileText size={16} />
                                <label className="text-xs font-bold uppercase tracking-widest text-white">{t.cvLabel}</label>
                            </div>
                            <textarea
                                value={cvContent}
                                onChange={(e) => setCvContent(e.target.value)}
                                placeholder={t.cvPlaceholder}
                                className="w-full h-48 md:h-64 bg-white/[0.02] border border-white/10 rounded-2xl p-4 text-sm focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all resize-none placeholder:text-gray-700"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-gray-400 mb-2">
                                <Briefcase size={16} />
                                <label className="text-xs font-bold uppercase tracking-widest text-white">{t.jdLabel}</label>
                            </div>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder={t.jdPlaceholder}
                                className="w-full h-48 md:h-64 bg-white/[0.02] border border-white/10 rounded-2xl p-4 text-sm focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all resize-none placeholder:text-gray-700"
                            />
                        </div>
                    </div>

                    <div className="p-6 bg-[#111113] border-t border-white/5">
                        <button
                            onClick={generateTailoredContent}
                            disabled={isGenerating || !cvContent || !jobDescription}
                            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-white/5 disabled:text-gray-700 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-emerald-500/10"
                        >
                            {isGenerating ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    {t.generating}
                                </>
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    {t.generateBtn}
                                </>
                            )}
                        </button>
                    </div>
                </section>

                {/* Right Side: Results */}
                <section className="flex-1 flex flex-col bg-[#0A0A0B] relative">
                    <AnimatePresence mode="wait">
                        {!result ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex-1 flex flex-col items-center justify-center p-12 text-center"
                            >
                                <div className="w-20 h-20 bg-emerald-500/10 rounded-[32px] flex items-center justify-center mb-6">
                                    <ArrowRight className="text-emerald-400 rotate-90 md:rotate-0" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{t.emptyResults}</h3>
                                <p className="text-gray-500 max-w-sm">
                                    {t.emptyDesc}
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="content"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex-1 flex flex-col overflow-hidden"
                            >
                                {/* Tabs */}
                                <div className="flex p-4 gap-2 bg-[#111113] border-b border-white/5 overflow-x-auto no-scrollbar">
                                    {t.tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={cn(
                                                "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all uppercase tracking-widest",
                                                activeTab === tab.id
                                                    ? "bg-emerald-600 text-white"
                                                    : "text-gray-500 hover:text-white hover:bg-white/5"
                                            )}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-y-auto p-8">
                                    <div className="max-w-3xl mx-auto space-y-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{t.resultGenerated}</span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => copyToClipboard(activeTab === 'cv' ? result.cv : activeTab === 'letter' ? result.letter : result.questions.join('\n'))}
                                                    className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-gray-400 hover:text-emerald-400 flex items-center gap-2 text-xs font-bold"
                                                >
                                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                                    {copied ? t.copied : t.copy}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="bg-[#161618] border border-white/5 rounded-[32px] p-8 min-h-[400px] shadow-2xl relative">
                                            {activeTab === 'cv' && (
                                                <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-300">
                                                    {result.cv}
                                                </div>
                                            )}
                                            {activeTab === 'letter' && (
                                                <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
                                                    {result.letter}
                                                </div>
                                            )}
                                            {activeTab === 'questions' && (
                                                <div className="space-y-4">
                                                    {result.questions.map((q, i) => (
                                                        <div key={i} className="flex gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-2xl group hover:border-emerald-500/30 transition-all">
                                                            <span className="text-emerald-400 font-black text-xs h-6 w-6 rounded-full bg-emerald-400/10 flex items-center justify-center shrink-0">
                                                                {i + 1}
                                                            </span>
                                                            <p className="text-sm font-medium leading-relaxed group-hover:text-emerald-50">{q}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <button className="w-full py-4 border border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all">
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
