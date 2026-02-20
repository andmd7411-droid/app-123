import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Video,
  UserRound,
  LayoutDashboard,
  Code2,
  ChevronRight,
  Zap,
  ShieldCheck,
  Cpu,
  Languages
} from 'lucide-react';

const translations = {
  en: {
    heroTitle: "The Future of Intelligence \n on your Desktop.",
    heroSubtitle: "Five revolutionary applications in one place. Local power, total privacy, and incredible speed.",
    privacy: "Privacy",
    privacySub: "Data never leaves your device",
    localAI: "Local-First AI",
    localAISub: "Ultra-fast GPU processing",
    noSubscriptions: "No Subscriptions",
    noSubscriptionsSub: "Run anytime, anywhere",
    launchApp: "Launch App",
    footer: "© 2026 Next-Gen AI Hub. Built for performance and security.",
    apps: [
      {
        path: '/chat',
        title: 'Local AI Document Chat',
        description: 'Private and secure analysis for PDF/DOCX documents run 100% locally.',
        tag: 'PRIVATE'
      },
      {
        path: '/clipper',
        title: 'Viral Auto-Clipper',
        description: 'Transform long podcasts into TikToks/Reels with dynamic captions.',
        tag: 'VIRAL'
      },
      {
        path: '/job',
        title: 'Job Tailor AI',
        description: 'Optimize your CV and Cover Letter for any job instantly.',
        tag: 'CAREER'
      },
      {
        path: '/freelance',
        title: 'Freelance Super-Dashboard',
        description: 'Smart receipt scanning and automated invoicing for your business.',
        tag: 'MARKET'
      },
      {
        path: '/builder',
        title: 'Design-to-Code',
        description: 'Transform visual sketches into ready-to-use React and Tailwind code.',
        tag: 'DEV'
      }
    ]
  },
  fr: {
    heroTitle: "L'Avenir de l'Intelligence \n sur votre Bureau.",
    heroSubtitle: "Cinq applications révolutionnaires en un seul endroit. Puissance locale, confidentialité totale et vitesse incroyable.",
    privacy: "Confidentialité",
    privacySub: "Les données nu quittent jamais l'appareil",
    localAI: "IA Locale",
    localAISub: "Traitement GPU ultra-rapide",
    noSubscriptions: "Sans Abonnement",
    noSubscriptionsSub: "Exécutez n'importe quand",
    launchApp: "Lancer l'App",
    footer: "© 2026 Next-Gen AI Hub. Conçu pour la performance et la sécurité.",
    apps: [
      {
        path: '/chat',
        title: 'Chat de Documents IA Local',
        description: 'Analyse privée et sécurisée de documents PDF/DOCX exécutée 100% localement.',
        tag: 'PRIVÉ'
      },
      {
        path: '/clipper',
        title: 'Auto-Clipper Viral',
        description: 'Transformez des podcasts longs en TikToks/Reels avec des légendes dynamiques.',
        tag: 'VIRAL'
      },
      {
        path: '/job',
        title: 'IA Job Tailor',
        description: 'Optimisez votre CV et lettre de motivation pour n\'importe quel job instantanément.',
        tag: 'CARRIÈRE'
      },
      {
        path: '/freelance',
        title: 'Super-Dashboard Freelance',
        description: 'Numérisation intelligente des reçus et facturation automatisée.',
        tag: 'MARCHÉ'
      },
      {
        path: '/builder',
        title: 'Design-to-Code',
        description: 'Transformez vos croquis en code React et Tailwind prêt à l\'emploi.',
        tag: 'DEV'
      }
    ]
  }
};

const appIcons = [FileText, Video, UserRound, LayoutDashboard, Code2];
const appColors = [
  'from-indigo-500 to-blue-600',
  'from-rose-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-blue-500 to-cyan-600',
  'from-purple-500 to-pink-600'
];

function App() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'en' | 'fr'>(() => {
    return (localStorage.getItem('app_lang') as 'en' | 'fr') || 'en';
  });

  const t = translations[lang];

  useEffect(() => {
    localStorage.setItem('app_lang', lang);
  }, [lang]);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center md:justify-start gap-3 mb-6"
            >
              <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                <Zap className="text-indigo-400 w-6 h-6" />
              </div>
              <span className="text-indigo-400 font-bold tracking-widest text-sm uppercase">Next-Gen AI Suite</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40 leading-tight whitespace-pre-line"
            >
              {t.heroTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed"
            >
              {t.heroSubtitle}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex self-center md:self-end bg-white/5 p-1 rounded-2xl border border-white/10"
          >
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${lang === 'en' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-gray-500 hover:text-white'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${lang === 'fr' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-gray-500 hover:text-white'}`}
            >
              FR
            </button>
          </motion.div>
        </header>

        {/* Features Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 p-6 bg-white/[0.02] border border-white/[0.05] rounded-3xl backdrop-blur-sm"
        >
          <div className="flex items-center gap-4 px-4">
            <ShieldCheck className="text-emerald-400 shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-white">{t.privacy}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-tighter">{t.privacySub}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-4 border-y md:border-y-0 md:border-x border-white/[0.05] py-6 md:py-0">
            <Cpu className="text-indigo-400 shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-white">{t.localAI}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-tighter">{t.localAISub}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-4">
            <Zap className="text-amber-400 shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-white">{t.noSubscriptions}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-tighter">{t.noSubscriptionsSub}</p>
            </div>
          </div>
        </motion.div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {t.apps.map((app, index) => {
            const Icon = appIcons[index];
            return (
              <motion.div
                key={app.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                whileHover={{ y: -8 }}
                onClick={() => navigate(app.path)}
                className="group relative cursor-pointer"
              >
                <div className="absolute -inset-px bg-gradient-to-b from-white/10 to-transparent rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative h-full p-8 bg-[#161618] border border-white/[0.05] group-hover:border-white/10 rounded-[32px] transition-all overflow-hidden">
                  <div className={`w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br ${appColors[index]} p-[1px]`}>
                    <div className="w-full h-full bg-[#161618] rounded-[15px] flex items-center justify-center">
                      <Icon className="text-white group-hover:scale-110 transition-transform" size={24} />
                    </div>
                  </div>

                  <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-wider text-gray-400 mb-4 uppercase">
                    {app.tag}
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">
                    {app.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-8">
                    {app.description}
                  </p>

                  <div className="flex items-center text-sm font-bold text-white group-hover:gap-2 gap-1 transition-all">
                    {t.launchApp}
                    <ChevronRight size={16} className="text-indigo-400" />
                  </div>

                  <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br ${appColors[index]} opacity-[0.03] group-hover:opacity-10 blur-2xl rounded-full transition-opacity`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="mt-32 text-center border-t border-white/5 pt-12">
          <p className="text-gray-500 text-sm">
            {t.footer}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
