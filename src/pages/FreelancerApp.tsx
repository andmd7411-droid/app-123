import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Wallet,
    Camera,
    TrendingUp,
    FileText,
    Users,
    AlertCircle,
    Plus,
    ArrowUpRight,
    ArrowDownRight,
    BarChart3,
    Calendar,
    CheckCircle,
    Clock,
    ChevronRight,
    DollarSign,
    X,
    Briefcase,
    Trash2,
    Download,
    Scan,
    History,
    PieChart,
    Settings2
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
        title: "Finance-OS / Freelance",
        subtitle: "Enterprise-Grade Asset Tracking",
        month: "February 2026",
        nav: ['OVERVIEW', 'INVOICES', 'EXPENSES', 'CLIENTS', 'ANALYTICS'],
        vatLimit: "Tax Threshold",
        stats: [
            { label: 'GROSS REVENUE', trend: 'UP' },
            { label: 'OPERATIONAL EXPENSES', trend: '-12%' },
            { label: 'ARREARS / UNPAID', trend: 'ALERT' },
            { label: 'ACTIVE PIPELINE', trend: 'NEW' }
        ],
        scanTitle: "OCX.NEURAL SCAN",
        scanDesc: "Drop a receipt. Our local neural engine will extract vendor, tax and amount instantly.",
        scanBtn: "INITIATE SCAN",
        guideTitle: "Deduction Matrix 2026",
        guideDesc: "Review eligible hardware & software write-offs for this period.",
        activityTitle: "Ledger History",
        viewAll: "Global View",
        tableHeaders: ['ENTITY', 'TS_STAMP', 'VAL_USD', 'TAG', 'OPS'],
        scanningTitle: "Neural Inference...",
        scanningDesc: "Character recognition & entity mapping in progress...",
        scannerTitle: "ASSET SCANNER",
        scannerDesc: "Align document edges with the frame for sub-millisecond OCR.",
        startCapture: "EXECUTE CAPTURE",
        cancel: "ABORT",
        comingSoon: "Feature locked",
        guideDetailTitle: "2026 Write-offs",
        guideDetailDesc: "Region-specific eligible deductions:",
        guideItems: ["Remote computing assets", "SaaS infrastructure", "Mentorship & Training", "Business-critical mobility"],
        close: "TERMINATE",
        invoiceStatus: { paid: 'SETTLED', pending: 'AWAITING', overdue: 'CRITICAL' },
        clientsTitle: "Client Directory",
        newClient: "PROVISION CLIENT",
        expensesTitle: "Expense Ledger",
        reportsTitle: "Quarterly Intelligence",
        addInvoice: "CREATE INVOICE",
        addClient: "REGISTER ENTITY",
        clientName: "ENTITY NAME",
        industry: "VERTICAL",
        amount: "VAL_UNIT",
        save: "PERSIST DATA",
        deleteConfirm: "Confirm erasure?"
    },
    fr: {
        back: "Retour au Hub",
        title: "Finance-OS / Freelance",
        subtitle: "Suivi d'Actifs Entreprise",
        month: "Février 2026",
        nav: ['APERCU', 'FACTURES', 'DEPENSES', 'CLIENTS', 'ANALYTIQUE'],
        vatLimit: "Seuil Fiscal",
        stats: [
            { label: 'REVENU BRUT', trend: 'HAUT' },
            { label: 'DEPENSES OP.', trend: '-12%' },
            { label: 'IMPAYES', trend: 'ALERTE' },
            { label: 'PIPELINE ACTIF', trend: 'NOUVEAU' }
        ],
        scanTitle: "SCAN NEURONAL OCX",
        scanDesc: "Chargez un reçu. Notre moteur local extraira marchand, taxe et montant instantanément.",
        scanBtn: "LANCER SCAN",
        guideTitle: "Matrice de Déduction 2026",
        guideDesc: "Consultez les amortissements Cloud & Matériel éligibles.",
        activityTitle: "Historique du Grand Livre",
        viewAll: "Vue Globale",
        tableHeaders: ['ENTITE', 'HORODATAGE', 'VAL_EUR', 'CATEGORIE', 'OPS'],
        scanningTitle: "Inférence en cours...",
        scanningDesc: "Reconnaissance de caractères & mapping d'entités...",
        scannerTitle: "SCANNER D'ACTIFS",
        scannerDesc: "Alignez les bords du document pour un OCR ultra-rapide.",
        startCapture: "LANCER CAPTURE",
        cancel: "ANNULER",
        comingSoon: "Fonctionnalité verrouillée",
        guideDetailTitle: "Déductions 2026",
        guideDetailDesc: "Amortissements éligibles par région :",
        guideItems: ["Actifs informatiques distants", "Infrastructure SaaS", "Mentorat & Formation", "Mobilité critique"],
        close: "FERMER",
        invoiceStatus: { paid: 'RÉGLÉ', pending: 'ATTENTE', overdue: 'CRITIQUE' },
        clientsTitle: "Répertoire Clients",
        newClient: "CRÉER CLIENT",
        expensesTitle: "Grand Livre Dépenses",
        reportsTitle: "Intelligence Trimestrielle",
        addInvoice: "CRÉER FACTURE",
        addClient: "ENREGISTRER ENTITÉ",
        clientName: "NOM ENTITÉ",
        industry: "SECTEUR",
        amount: "VAL_UNIT",
        save: "PERSISTER DONNÉES",
        deleteConfirm: "Confirmer effacement ?"
    }
};

export default function FreelancerApp() {
    const navigate = useNavigate();
    const [lang] = useState<'en' | 'fr'>(() => (localStorage.getItem('app_lang') as 'en' | 'fr') || 'en');
    const t = translations[lang];

    const [view, setView] = useState<'dashboard' | 'scan'>('dashboard');
    const [activeTab, setActiveTab] = useState(0);
    const [showGuide, setShowGuide] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [showClientModal, setShowClientModal] = useState(false);

    const [receipts, setReceipts] = useState([
        { id: 1, merchant: 'Vercel Edge', date: '2026-02-18', amount: 154.20, category: 'Infrastructure', status: 'verified' },
        { id: 2, merchant: 'Nvidia Corp', date: '2026-02-15', amount: 4999.00, category: 'Hardware', status: 'verified' },
        { id: 3, merchant: 'OpenAI API', date: '2026-02-01', amount: 45.00, category: 'Software', status: 'pending' },
    ]);

    const [invoices, setInvoices] = useState([
        { id: 'INV-7729', client: 'Nexus Systems', date: '2026-02-10', amount: 8500.00, status: 'paid' },
        { id: 'INV-8831', client: 'Aether Group', date: '2026-02-20', amount: 12000.00, status: 'pending' },
        { id: 'INV-1102', client: 'Iron Foundry', date: '2026-01-15', amount: 25000.00, status: 'overdue' },
    ]);

    const [clients, setClients] = useState([
        { id: 1, name: 'Nexus Systems', industry: 'Neural Networks', totalInvoiced: '$42,400', rating: 5 },
        { id: 2, name: 'Aether Group', industry: 'Spacial Computing', totalInvoiced: '$58,200', rating: 5 },
        { id: 3, name: 'Iron Foundry', industry: 'Robotics', totalInvoiced: '$125,000', rating: 4 },
    ]);

    const handleScan = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsScanning(true);
        setTimeout(() => {
            const vendors = ['Amazon Web Services', 'Google Cloud', 'Adobe Creative', 'Apple Inc', 'Digital Ocean'];
            const newReceipt = {
                id: Date.now(),
                merchant: vendors[Math.floor(Math.random() * vendors.length)],
                date: new Date().toISOString().split('T')[0],
                amount: Math.floor(Math.random() * 800) + 100,
                category: 'Cloud Services',
                status: 'pending'
            };
            setReceipts(prev => [newReceipt, ...prev]);
            setIsScanning(false);
            setView('dashboard');
        }, 3500);
    };

    const deleteReceipt = (e: React.MouseEvent, id: number) => {
        e.preventDefault(); e.stopPropagation();
        setReceipts(prev => prev.filter(r => r.id !== id));
    };

    const deleteInvoice = (e: React.MouseEvent, id: string) => {
        e.preventDefault(); e.stopPropagation();
        setInvoices(prev => prev.filter(inv => inv.id !== id));
    };

    const deleteClient = (e: React.MouseEvent, id: number) => {
        e.preventDefault(); e.stopPropagation();
        setClients(prev => prev.filter(c => c.id !== id));
    };

    const addInvoice = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newInv = {
            id: `INV-${Math.floor(Math.random() * 9000) + 1000}`,
            client: formData.get('client') as string,
            date: new Date().toISOString().split('T')[0],
            amount: parseFloat(formData.get('amount') as string) || 0,
            status: 'pending'
        };
        setInvoices(prev => [newInv, ...prev]);
        setShowInvoiceModal(false);
    };

    const addClient = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newClient = {
            id: Date.now(),
            name: formData.get('name') as string,
            industry: formData.get('industry') as string,
            totalInvoiced: '$0',
            rating: 5
        };
        setClients(prev => [newClient, ...prev]);
        setShowClientModal(false);
    };

    const handleDownloadReport = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const content = `FINANCE-OS ANNUAL REPORT 2026\n===============================\n\nTOTAL SETTLED: $${invoices.reduce((acc, inv) => acc + (inv.status === 'paid' ? inv.amount : 0), 0).toLocaleString()}\nTOTAL LIABILITIES: $${receipts.reduce((acc, r) => acc + r.amount, 0).toLocaleString()}\n\nVerified by Network Node: 771-XBR`;
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Finance_Report_2026.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const renderOverview = () => (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-7xl mx-auto space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: TrendingUp, color: 'emerald', label: t.stats[0].label, value: `$${invoices.reduce((acc, inv) => acc + (inv.status === 'paid' ? inv.amount : 0), 0).toLocaleString()}`, trend: <ArrowUpRight className="text-emerald-400" size={16} /> },
                    { icon: ArrowDownRight, color: 'rose', label: t.stats[1].label, value: `$${receipts.reduce((acc, r) => acc + r.amount, 0).toLocaleString()}`, trend: <span className="text-rose-400 text-[10px] font-black font-mono">{t.stats[1].trend}</span> },
                    { icon: Clock, color: 'amber', label: t.stats[2].label, value: `$${invoices.reduce((acc, inv) => acc + (inv.status !== 'paid' ? inv.amount : 0), 0).toLocaleString()}`, trend: <AlertCircle className="text-amber-400" size={16} /> },
                    { icon: FileText, color: 'indigo', label: t.stats[3].label, value: invoices.length.toString(), trend: <Plus size={16} className="text-indigo-400" />, action: () => setShowInvoiceModal(true) }
                ].map((card, i) => (
                    <button key={i} onClick={card.action} className="bg-[#111113] p-8 rounded-[40px] border border-white/5 text-left hover:border-indigo-500/30 hover:bg-indigo-500/[0.02] transition-all group active:scale-95 shadow-2xl relative overflow-hidden cursor-pointer">
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <div className={cn("p-4 rounded-2xl", `bg-${card.color}-500/10`)}>
                                    <card.icon className={cn(`text-${card.color}-400`)} size={20} />
                                </div>
                                {card.trend}
                            </div>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{card.label}</p>
                            <h3 className="text-3xl font-black italic tracking-tighter group-hover:text-white transition-colors">{card.value}</h3>
                        </div>
                    </button>
                ))}
            </div>

            <div className="flex flex-col xl:flex-row gap-8">
                <div className="flex-1 bg-gradient-to-br from-[#111113] to-black border border-white/5 rounded-[48px] p-10 relative overflow-hidden group shadow-3xl">
                    <div className="relative z-10 max-w-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                            <h2 className="text-3xl font-black italic uppercase tracking-tighter">{t.scanTitle}</h2>
                        </div>
                        <p className="text-gray-400 text-sm mb-10 leading-relaxed font-medium">{t.scanDesc}</p>
                        <button onClick={() => setView('scan')} className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all shadow-2xl shadow-indigo-500/20 active:scale-95 cursor-pointer">
                            <Camera size={20} /> {t.scanBtn}
                        </button>
                    </div>
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-600/10 blur-[100px] rounded-full group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute right-12 bottom-0 top-0 flex items-center opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
                        <Scan size={300} />
                    </div>
                </div>

                <div
                    onClick={() => setShowGuide(true)}
                    className="xl:w-1/3 bg-[#0D0D0F] border border-white/5 rounded-[48px] p-10 flex flex-col justify-between group cursor-pointer hover:border-indigo-500/20 transition-all active:scale-[0.98] shadow-2xl"
                >
                    <div className="flex justify-between items-start">
                        <div className="p-5 bg-emerald-500/10 rounded-3xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                            <PieChart size={28} />
                        </div>
                        <div className="w-12 h-12 bg-white/5 group-hover:bg-indigo-500 group-hover:text-white rounded-full flex items-center justify-center transition-all">
                            <ChevronRight size={24} />
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-2xl font-black mb-3 italic uppercase tracking-[0.05em] group-hover:text-indigo-400 transition-colors">{t.guideTitle}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed font-medium">{t.guideDesc}</p>
                    </div>
                </div>
            </div>

            {renderActivityTable()}
        </motion.div>
    );

    const renderActivityTable = () => (
        <div className="bg-[#111113] border border-white/5 rounded-[48px] overflow-hidden shadow-2xl">
            <div className="p-10 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <History className="text-indigo-500" size={24} />
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">{t.activityTitle}</h3>
                </div>
                <button onClick={() => setActiveTab(2)} className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] hover:text-indigo-400 transition-all cursor-pointer">{t.viewAll}</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left border-b border-white/5">
                            <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black">{t.tableHeaders[0]}</th>
                            <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black">{t.tableHeaders[1]}</th>
                            <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black">{t.tableHeaders[2]}</th>
                            <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black text-right">{t.tableHeaders[4]}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02]">
                        {receipts.map((r) => (
                            <tr key={r.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-10 py-8 flex items-center gap-5">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                                        <Briefcase size={20} />
                                    </div>
                                    <span className="font-black italic text-lg tracking-tight">{r.merchant}</span>
                                </td>
                                <td className="px-10 py-8 text-gray-500 text-[10px] font-black font-mono uppercase tracking-widest">{r.date}</td>
                                <td className="px-10 py-8 font-black text-xl italic tracking-tighter">${r.amount.toFixed(2)}</td>
                                <td className="px-10 py-8 text-right">
                                    <button
                                        title="Delete receipt"
                                        onClick={(e) => deleteReceipt(e, r.id)}
                                        className="p-3 bg-rose-500/10 hover:bg-rose-500 rounded-xl transition-all text-rose-500 hover:text-white active:scale-90 cursor-pointer"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderInvoices = () => (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
            <div className="flex justify-between items-center bg-[#111113] p-10 rounded-[48px] border border-white/5">
                <div>
                    <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-2">{t.nav[1]}</h2>
                    <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.3em]">{invoices.length} ACTIVE LEDGER ENTITIES</p>
                </div>
                <button onClick={() => setShowInvoiceModal(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all shadow-2xl active:scale-95 cursor-pointer">
                    <Plus size={20} /> {t.addInvoice}
                </button>
            </div>
            <div className="bg-[#111113] border border-white/5 rounded-[48px] overflow-hidden shadow-3xl">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.01]">
                            <th className="px-10 py-6 text-[10px] uppercase font-black text-gray-600 tracking-widest">REG_ID</th>
                            <th className="px-10 py-6 text-[10px] uppercase font-black text-gray-600 tracking-widest">ENTITY</th>
                            <th className="px-10 py-6 text-[10px] uppercase font-black text-gray-600 tracking-widest">VAL_UNIT</th>
                            <th className="px-10 py-6 text-[10px] uppercase font-black text-gray-600 tracking-widest text-right">OPS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02]">
                        {invoices.map(inv => (
                            <tr key={inv.id} className="hover:bg-white/[0.02] transition-all group">
                                <td className="px-10 py-10 font-mono text-xs text-indigo-400 font-black">{inv.id}</td>
                                <td className="px-10 py-10 font-black italic text-lg">{inv.client}</td>
                                <td className="px-10 py-10 font-black text-2xl tracking-tighter italic text-white">${inv.amount.toLocaleString()}</td>
                                <td className="px-10 py-10 text-right">
                                    <button onClick={(e) => deleteInvoice(e, inv.id)} className="p-4 bg-rose-500/10 hover:bg-rose-500 rounded-2xl transition-all text-rose-500 hover:text-white active:scale-90 cursor-pointer">
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );

    const renderReports = () => (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 max-w-5xl mx-auto">
            <div className="text-center space-y-6 py-12">
                <div className="w-24 h-24 bg-indigo-500/10 rounded-[40px] flex items-center justify-center mx-auto border border-indigo-500/10 shadow-2xl">
                    <BarChart3 className="text-indigo-400" size={40} />
                </div>
                <h2 className="text-5xl font-black italic uppercase tracking-tighter">{t.reportsTitle}</h2>
                <p className="text-gray-500 max-w-md mx-auto font-medium text-lg leading-relaxed">
                    Local neural insights for your decentralized enterprise.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-[#111113] border border-white/5 rounded-[48px] p-12 shadow-3xl">
                    <div className="flex items-center gap-4 mb-10">
                        <TrendingUp size={24} className="text-emerald-500" />
                        <h3 className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-500">LIQUIDITY_MAPPING</h3>
                    </div>
                    <div className="space-y-10">
                        {clients.slice(0, 3).map((c, idx) => {
                            const val = [85, 42, 29][idx];
                            return (
                                <div key={c.id} className="space-y-4">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest"><span className="text-gray-400">{c.name}</span><span className="text-indigo-400">{val}%</span></div>
                                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ duration: 1, delay: idx * 0.2 }} className="h-full bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="bg-[#111113] border border-white/5 rounded-[48px] p-12 flex flex-col items-center justify-center text-center shadow-3xl relative overflow-hidden group">
                    <div className="p-10 bg-indigo-600/10 rounded-[40px] mb-10 relative">
                        <FileText className="text-indigo-500" size={60} />
                        <div className="absolute -top-3 -right-3 bg-indigo-600 text-white text-[10px] font-black px-3 py-2 rounded-xl ring-8 ring-[#111113] tracking-widest">VERIFIED</div>
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase italic tracking-tighter">ANNUAL_AUDIT_2026</h3>
                    <p className="text-gray-500 text-sm mb-12 leading-relaxed px-6 font-medium">Encryption verified. Ready for local persistence.</p>
                    <button
                        type="button"
                        onClick={(e) => handleDownloadReport(e)}
                        className="w-full py-6 bg-white/5 hover:bg-indigo-600 border border-white/10 hover:border-indigo-500/50 rounded-[24px] font-black uppercase italic tracking-widest text-xs transition-all active:scale-95 shadow-2xl cursor-pointer"
                    >
                        <Download size={20} className="inline mr-3" />
                        {t.save}
                    </button>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="flex flex-col h-screen bg-[#0A0A0B] text-white font-outfit overflow-hidden">
            <header className="flex items-center justify-between px-8 py-4 bg-[#111113]/95 backdrop-blur-xl border-b border-white/5 z-50 shadow-2xl">
                <div className="flex items-center gap-6">
                    <button title={t.back} onClick={() => navigate('/')} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-gray-400 hover:text-white cursor-pointer"><ArrowLeft size={18} /></button>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-500/10 rounded-2xl shadow-inner border border-indigo-500/20"><Wallet className="text-indigo-400 w-6 h-6" /></div>
                        <div>
                            <h1 className="text-lg font-black tracking-tight">{t.title}</h1>
                            <p className="text-[10px] text-indigo-500/60 font-black uppercase tracking-[0.2em]">{t.subtitle}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                        <Calendar size={18} className="text-indigo-500" />
                        <span className="text-xs font-black text-gray-300 uppercase italic tracking-widest">{t.month}</span>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 border border-white/10 shadow-lg shadow-indigo-500/20" />
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                <aside className="hidden lg:flex w-72 flex-col bg-[#0D0D0F] border-r border-white/5 p-6 py-10 shadow-3xl">
                    <nav className="space-y-3">
                        {[{ icon: BarChart3, label: t.nav[0] }, { icon: FileText, label: t.nav[1] }, { icon: Wallet, label: t.nav[2] }, { icon: Users, label: t.nav[3] }, { icon: TrendingUp, label: t.nav[4] }].map((item, idx) => (
                            <button
                                key={item.label}
                                onClick={() => setActiveTab(idx)}
                                className={cn(
                                    "w-full flex items-center gap-5 px-6 py-5 rounded-[24px] transition-all cursor-pointer relative group",
                                    activeTab === idx
                                        ? "bg-indigo-600 text-white font-black shadow-2xl shadow-indigo-500/30"
                                        : "text-gray-500 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon size={20} className={cn(activeTab === idx ? "text-white" : "group-hover:text-indigo-400")} />
                                <span className="text-[11px] font-black uppercase tracking-[0.15em] italic">{item.label}</span>
                                {activeTab === idx && <motion.div layoutId="nav-glow" className="absolute inset-0 bg-indigo-400/20 blur-xl rounded-[24px] z-[-1]" />}
                            </button>
                        ))}
                    </nav>
                    <div className="mt-auto p-8 bg-indigo-500/5 rounded-[40px] border border-indigo-500/10 shadow-inner relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em] mb-4">{t.vatLimit}</p>
                            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden mb-4 border border-white/5 p-0.5">
                                <div className="h-full w-[40%] bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                            </div>
                            <p className="text-[11px] font-black text-gray-400 tracking-tighter italic font-mono">$12,400 / $35,000</p>
                        </div>
                        <Settings2 size={100} className="absolute -right-8 -bottom-8 opacity-[0.03] text-indigo-500 group-hover:rotate-45 transition-transform duration-1000" />
                    </div>
                </aside>

                <main className="flex-1 overflow-y-auto bg-black p-6 md:p-14 relative custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {view === 'dashboard' ? (
                            <div key="tabs">
                                {activeTab === 0 && renderOverview()}
                                {activeTab === 1 && renderInvoices()}
                                {activeTab === 2 && renderActivityTable()}
                                {activeTab === 3 && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                                        <div className="flex justify-between items-center bg-[#111113] p-10 rounded-[48px] border border-white/5">
                                            <div className="flex items-center gap-8">
                                                <div className="w-24 h-24 bg-indigo-600/10 rounded-[40px] flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-2xl"><Users size={36} /></div>
                                                <div>
                                                    <h2 className="text-4xl font-black italic uppercase tracking-tighter">{t.clientsTitle}</h2>
                                                    <p className="text-[10px] text-indigo-500 font-black tracking-[0.3em] uppercase">{clients.length} VERIFIED ENTITIES</p>
                                                </div>
                                            </div>
                                            <button onClick={() => setShowClientModal(true)} className="bg-indigo-600 hover:bg-indigo-500 px-10 py-5 rounded-[24px] font-black italic uppercase tracking-widest text-xs transition-all active:scale-95 shadow-2xl cursor-pointer">{t.newClient}</button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {clients.map(client => (
                                                <div key={client.id} className="bg-[#111113] border border-white/5 rounded-[40px] p-10 hover:border-indigo-500/40 transition-all group relative shadow-2xl">
                                                    <button title="Delete client" onClick={(e) => deleteClient(e, client.id)} className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-rose-600 rounded-xl transition-all text-gray-600 hover:text-white opacity-0 group-hover:opacity-100 cursor-pointer"><Trash2 size={16} /></button>
                                                    <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center group-hover:bg-indigo-600 transition-all mb-8 shadow-inner">
                                                        <Briefcase size={24} className="text-gray-500 group-hover:text-white" />
                                                    </div>
                                                    <h3 className="text-2xl font-black mb-2 italic tracking-tight">{client.name}</h3>
                                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-10">{client.industry}</p>
                                                    <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                                                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">LIFE_VAL</span>
                                                        <span className="text-xl font-black italic text-white tracking-widest">{client.totalInvoiced}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                                {activeTab === 4 && renderReports()}
                            </div>
                        ) : (
                            <motion.div key="scan" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 h-full flex flex-col items-center justify-center max-w-2xl mx-auto">
                                <div className="relative w-full aspect-[4/5] bg-[#0A0A0B] border border-white/10 rounded-[64px] overflow-hidden flex flex-col items-center justify-center p-14 shadow-[0_0_100px_rgba(0,0,0,0.8)] border-2 border-dashed border-indigo-500/20">
                                    <AnimatePresence mode="wait">
                                        {isScanning ? (
                                            <motion.div key="scrolling" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-10 relative z-10">
                                                <div className="relative w-32 h-32 mx-auto">
                                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute inset-0 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full" />
                                                    <Scan className="text-indigo-400 absolute inset-0 m-auto animate-pulse" size={40} />
                                                </div>
                                                <div className="space-y-4">
                                                    <h3 className="text-3xl font-black uppercase italic tracking-tighter">{t.scanningTitle}</h3>
                                                    <p className="text-gray-500 text-sm font-medium">{t.scanningDesc}</p>
                                                </div>
                                                <div className="w-64 h-1 bg-white/5 rounded-full mx-auto overflow-hidden">
                                                    <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="w-1/2 h-full bg-indigo-500" />
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center relative z-10">
                                                <div className="w-24 h-24 bg-indigo-500/10 rounded-[40px] flex items-center justify-center mb-10 shadow-2xl border border-indigo-500/20">
                                                    <Camera className="text-indigo-400" size={40} />
                                                </div>
                                                <h3 className="text-4xl font-black mb-4 italic uppercase tracking-tighter">{t.scannerTitle}</h3>
                                                <p className="text-gray-500 text-base mb-12 leading-relaxed px-10 font-medium">{t.scannerDesc}</p>
                                                <div className="flex flex-col gap-4 w-full px-10">
                                                    <button onClick={handleScan} className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 rounded-3xl font-black uppercase italic tracking-widest text-xs transition-all shadow-2xl shadow-indigo-500/20 active:scale-95 cursor-pointer">{t.startCapture}</button>
                                                    <button onClick={() => setView('dashboard')} className="py-4 text-gray-500 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors cursor-pointer">{t.cancel}</button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Modals with Premium Styling */}
            <AnimatePresence>
                {(showInvoiceModal || showClientModal || showGuide) && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setShowInvoiceModal(false); setShowClientModal(false); setShowGuide(false); }} className="absolute inset-0 bg-black/90 backdrop-blur-md" />

                        {showInvoiceModal && (
                            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative bg-[#0D0D0F] border border-white/10 rounded-[56px] p-12 max-w-md w-full shadow-[0_0_100px_rgba(99,102,241,0.15)]">
                                <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-10">{t.addInvoice}</h2>
                                <form onSubmit={addInvoice} className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-gray-600 tracking-[0.3em] block">{t.clientName}</label>
                                        <select title={t.clientName} name="client" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-indigo-500/50 transition-all outline-none appearance-none cursor-pointer font-bold italic">
                                            {clients.map(c => <option key={c.id} value={c.name} className="bg-[#0D0D0F]">{c.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-gray-600 tracking-[0.3em] block">{t.amount} ($)</label>
                                        <input name="amount" type="number" step="100" required placeholder="0.00" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-xl font-black tracking-tighter italic text-white focus:border-indigo-500/50 transition-all outline-none" />
                                    </div>
                                    <button type="submit" className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 rounded-3xl font-black uppercase italic tracking-widest text-xs transition-all active:scale-95 shadow-2xl shadow-indigo-500/20 cursor-pointer">{t.save}</button>
                                </form>
                            </motion.div>
                        )}

                        {showClientModal && (
                            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative bg-[#0D0D0F] border border-white/10 rounded-[56px] p-12 max-w-md w-full shadow-[0_0_100px_rgba(99,102,241,0.15)]">
                                <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-10">{t.addClient}</h2>
                                <form onSubmit={addClient} className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-gray-600 tracking-[0.3em] block">{t.clientName}</label>
                                        <input name="name" required placeholder="Entity X" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm font-black italic text-white focus:border-indigo-500/50 transition-all outline-none" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-gray-600 tracking-[0.3em] block">{t.industry}</label>
                                        <input name="industry" required placeholder="AI / Robotics / Energy" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm font-black italic text-white focus:border-indigo-500/50 transition-all outline-none" />
                                    </div>
                                    <button type="submit" className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 rounded-3xl font-black uppercase italic tracking-widest text-xs transition-all active:scale-95 shadow-2xl shadow-indigo-500/20 cursor-pointer">{t.save}</button>
                                </form>
                            </motion.div>
                        )}

                        {showGuide && (
                            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative bg-[#0D0D0F] border border-white/10 rounded-[64px] p-16 max-w-xl w-full shadow-[0_0_150px_rgba(0,0,0,0.5)]">
                                <button title={t.close} onClick={() => setShowGuide(false)} className="absolute top-10 right-10 p-3 bg-white/5 hover:bg-white/10 rounded-2xl cursor-pointer"><X size={24} /></button>
                                <div className="flex items-center gap-8 mb-12">
                                    <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-2xl"><FileText size={40} /></div>
                                    <div>
                                        <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-1">{t.guideDetailTitle}</h2>
                                        <p className="text-gray-500 text-sm font-medium">{t.guideDetailDesc}</p>
                                    </div>
                                </div>
                                <div className="space-y-5 mb-12">
                                    {t.guideItems.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-5 p-6 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-indigo-500/50 transition-all">
                                            <CheckCircle className="text-indigo-500" size={20} />
                                            <span className="font-black italic text-gray-300 group-hover:text-white transition-colors tracking-tight uppercase text-xs">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => setShowGuide(false)} className="w-full py-6 bg-white/5 hover:bg-indigo-600 rounded-[28px] font-black uppercase italic tracking-widest text-xs transition-all active:scale-95 cursor-pointer">{t.close}</button>
                            </motion.div>
                        )}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
