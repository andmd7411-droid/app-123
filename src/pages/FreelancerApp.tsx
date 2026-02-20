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
    ExternalLink,
    ChevronRight,
    DollarSign,
    Info,
    X,
    Search,
    Filter,
    MoreVertical,
    Briefcase,
    Trash2,
    Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const translations = {
    en: {
        back: "Back to Hub",
        title: "Freelance Super-Dashboard",
        month: "February 2026",
        nav: ['Overview', 'Invoices', 'Expenses', 'Clients', 'Reports'],
        vatLimit: "VAT Limit",
        stats: [
            { label: 'Total Revenue', trend: 'UP' },
            { label: 'Expenses', trend: '-12%' },
            { label: 'Unpaid', trend: 'ALERT' },
            { label: 'Active Invoices', trend: 'NEW' }
        ],
        scanTitle: "INTELLIGENT SCANNING",
        scanDesc: "Upload a receipt and AI will automatically extract data for your expense report.",
        scanBtn: "OPEN CAMERA",
        guideTitle: "Accounting Guide",
        guideDesc: "Find out which expenses are deductible in 2026.",
        activityTitle: "Recent Activity",
        viewAll: "View All",
        tableHeaders: ['Merchant', 'Date', 'Amount', 'Category', 'Actions'],
        scanningTitle: "AI Processing...",
        scanningDesc: "Extracting amount, date and vendor...",
        scannerTitle: "RECEIPT SCANNER",
        scannerDesc: "Position the receipt in the center for precise analysis.",
        startCapture: "START CAPTURE",
        cancel: "CANCEL",
        comingSoon: "Feature coming soon",
        guideDetailTitle: "2026 Tax Deductions",
        guideDetailDesc: "Based on your local regulations, you can deduct:",
        guideItems: ["Home office equipment", "Software subscriptions", "Professional training", "Client meeting travel"],
        close: "Close",
        invoiceStatus: { paid: 'PAID', pending: 'PENDING', overdue: 'OVERDUE' },
        clientsTitle: "Client List",
        newClient: "NEW CLIENT",
        expensesTitle: "Expense History",
        reportsTitle: "Financial Reports",
        addInvoice: "New Invoice",
        addClient: "Add Client",
        clientName: "Client Name",
        industry: "Industry",
        amount: "Amount",
        save: "Save",
        deleteConfirm: "Are you sure?"
    },
    fr: {
        back: "Retour au Hub",
        title: "Super-Dashboard Freelance",
        month: "Février 2026",
        nav: ['Aperçu', 'Factures', 'Dépenses', 'Clients', 'Rapports'],
        vatLimit: "Limite TVA",
        stats: [
            { label: 'Revenu Total', trend: 'HAUT' },
            { label: 'Dépenses', trend: '-12%' },
            { label: 'Impayés', trend: 'ALERTE' },
            { label: 'Factures Actives', trend: 'NOUVEAU' }
        ],
        scanTitle: "NUMÉRISATION INTELLIGENTE",
        scanDesc: "Chargez un reçu et l'IA extraira automatiquement les données pour votre rapport de dépenses.",
        scanBtn: "OUVRIR LA CAMÉRA",
        guideTitle: "Guide Comptable",
        guideDesc: "Découvrez quelles dépenses sont déductibles en 2026.",
        activityTitle: "Activité Récente",
        viewAll: "Tout Voir",
        tableHeaders: ['Marchand', 'Date', 'Montant', 'Catégorie', 'Actions'],
        scanningTitle: "Traitement IA...",
        scanningDesc: "Extraction du montant, de la date et du fournisseur...",
        scannerTitle: "SCANNER DE REÇUS",
        scannerDesc: "Positionnez le reçu au centre pentru une analyse précise.",
        startCapture: "LANCER LA CAPTURE",
        cancel: "ANNULER",
        comingSoon: "Fonctionnalité bientôt disponible",
        guideDetailTitle: "Déductions Fiscales 2026",
        guideDetailDesc: "Selon vos réglementations locales, vous pouvez déduire :",
        guideItems: ["Équipement de bureau à domicile", "Abonnements logiciels", "Formation professionnelle", "Déplacements pentru rendez-vous clients"],
        close: "Fermer",
        invoiceStatus: { paid: 'PAYÉ', pending: 'EN ATTENTE', overdue: 'RETARD' },
        clientsTitle: "Liste des Clients",
        newClient: "NOUVEAU CLIENT",
        expensesTitle: "Historique des Dépenses",
        reportsTitle: "Rapports Financiers",
        addInvoice: "Nouvelle Facture",
        addClient: "Ajouter Client",
        clientName: "Nom du Client",
        industry: "Secteur",
        amount: "Montant",
        save: "Enregistrer",
        deleteConfirm: "Êtes-vous sûr ?"
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
        { id: 1, merchant: 'Market Hub', date: '2026-02-18', amount: 154.20, category: 'Food', status: 'verified' },
        { id: 2, merchant: 'Apple Store', date: '2026-02-15', amount: 4999.00, category: 'Hardware', status: 'verified' },
        { id: 3, merchant: 'Cloud Tech', date: '2026-02-01', amount: 45.00, category: 'Software', status: 'pending' },
    ]);

    const [invoices, setInvoices] = useState([
        { id: 'INV-001', client: 'TechFlow Inc', date: '2026-02-10', amount: 3500.00, status: 'paid' },
        { id: 'INV-002', client: 'Creative Labs', date: '2026-02-20', amount: 1200.00, status: 'pending' },
        { id: 'INV-003', client: 'Global Systems', date: '2026-01-15', amount: 5000.00, status: 'overdue' },
    ]);

    const [clients, setClients] = useState([
        { id: 1, name: 'TechFlow Inc', industry: 'Software', totalInvoiced: '$12,400', rating: 5 },
        { id: 2, name: 'Creative Labs', industry: 'Design', totalInvoiced: '$5,200', rating: 4 },
        { id: 3, name: 'Global Systems', industry: 'Logistics', totalInvoiced: '$25,000', rating: 5 },
    ]);

    const handleScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            const newReceipt = { id: Date.now(), merchant: 'Leroy Merlin', date: new Date().toISOString().split('T')[0], amount: Math.floor(Math.random() * 500) + 50, category: 'Supplies', status: 'pending' };
            setReceipts(prev => [newReceipt, ...prev]);
            setIsScanning(false);
            setView('dashboard');
        }, 3000);
    };

    const deleteReceipt = (id: number) => setReceipts(prev => prev.filter(r => r.id !== id));
    const deleteInvoice = (id: string) => setInvoices(prev => prev.filter(inv => inv.id !== id));
    const deleteClient = (id: number) => setClients(prev => prev.filter(c => c.id !== id));

    const addInvoice = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newInv = {
            id: `INV-${Math.floor(Math.random() * 900) + 100}`,
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

    const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

    const renderOverview = () => (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: TrendingUp, color: 'emerald', label: t.stats[0].label, value: `$${invoices.reduce((acc, inv) => acc + (inv.status === 'paid' ? inv.amount : 0), 0).toLocaleString()}`, trend: <ArrowUpRight className="text-emerald-400" size={16} /> },
                    { icon: ArrowDownRight, color: 'rose', label: t.stats[1].label, value: `$${receipts.reduce((acc, r) => acc + r.amount, 0).toLocaleString()}`, trend: <span className="text-rose-400 text-xs font-bold font-mono">{t.stats[1].trend}</span> },
                    { icon: Clock, color: 'amber', label: t.stats[2].label, value: `$${invoices.reduce((acc, inv) => acc + (inv.status !== 'paid' ? inv.amount : 0), 0).toLocaleString()}`, trend: <AlertCircle className="text-amber-400" size={16} /> },
                    { icon: FileText, color: 'blue', label: t.stats[3].label, value: invoices.length.toString(), trend: <Plus size={16} className="text-blue-400" />, action: () => setShowInvoiceModal(true) }
                ].map((card, i) => (
                    <button key={i} onClick={card.action} className="bg-[#111113] p-6 rounded-[32px] border border-white/5 text-left hover:border-white/10 hover:bg-white/[0.02] transition-all group active:scale-95">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 bg-${card.color}-500/10 rounded-2xl`}>
                                <card.icon className={`text-${card.color}-400`} size={20} />
                            </div>
                            {card.trend}
                        </div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{card.label}</p>
                        <h3 className="text-3xl font-black group-hover:text-blue-400 transition-colors">{card.value}</h3>
                    </button>
                ))}
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-[#111113] border border-white/5 rounded-[40px] p-8 relative overflow-hidden group">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-black mb-2 italic uppercase">{t.scanTitle}</h2>
                        <p className="text-gray-400 text-sm mb-6 max-w-xs">{t.scanDesc}</p>
                        <button onClick={() => setView('scan')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                            <Camera size={18} /> {t.scanBtn}
                        </button>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-blue-600/10 blur-3xl rounded-full translate-x-1/2 group-hover:scale-110 transition-transform" />
                </div>
                <button onClick={() => setShowGuide(true)} className="flex-1 bg-[#0D0D10] border border-white/5 rounded-[40px] p-8 flex items-center justify-between group cursor-pointer hover:border-white/10 transition-all active:scale-[0.98]">
                    <div className="text-left">
                        <h3 className="text-xl font-bold mb-1 group-hover:text-blue-400 transition-colors">{t.guideTitle}</h3>
                        <p className="text-gray-500 text-sm">{t.guideDesc}</p>
                    </div>
                    <div className="w-12 h-12 bg-white/5 group-hover:bg-blue-500 group-hover:text-white rounded-full flex items-center justify-center transition-all">
                        <ChevronRight size={20} />
                    </div>
                </button>
            </div>

            {renderActivityTable()}
        </motion.div>
    );

    const renderInvoices = () => (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">{t.nav[1]}</h2>
                <button onClick={() => setShowInvoiceModal(true)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                    <Plus size={18} /> {t.addInvoice.toUpperCase()}
                </button>
            </div>
            <div className="bg-[#111113] border border-white/5 rounded-[40px] overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="px-8 py-5 text-[10px] uppercase font-black text-gray-500 tracking-widest">ID</th>
                            <th className="px-8 py-5 text-[10px] uppercase font-black text-gray-500 tracking-widest">{lang === 'en' ? 'CLIENT' : 'CLIENT'}</th>
                            <th className="px-8 py-5 text-[10px] uppercase font-black text-gray-500 tracking-widest">{lang === 'en' ? 'AMOUNT' : 'MONTANT'}</th>
                            <th className="px-8 py-5 text-[10px] uppercase font-black text-gray-500 tracking-widest text-right">{t.tableHeaders[4]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map(inv => (
                            <tr key={inv.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all group">
                                <td className="px-8 py-6 font-mono text-sm text-blue-400 font-bold">{inv.id}</td>
                                <td className="px-8 py-6 font-bold">{inv.client}</td>
                                <td className="px-8 py-6 font-black">${inv.amount.toFixed(2)}</td>
                                <td className="px-8 py-6 text-right space-x-2">
                                    <button onClick={() => deleteInvoice(inv.id)} className="p-2 bg-rose-500/10 hover:bg-rose-500 rounded-lg transition-all text-rose-500 hover:text-white active:scale-90">
                                        <Trash2 size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );

    const renderClients = () => (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="flex justify-between items-center bg-[#111113] p-8 rounded-[40px] border border-white/5">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-400 border border-blue-500/20"><Users size={32} /></div>
                    <div><h2 className="text-3xl font-black italic uppercase">{t.clientsTitle}</h2><p className="text-xs text-blue-400 font-bold tracking-widest uppercase">{clients.length} {lang === 'en' ? 'ACTIVE' : 'ACTIFS'}</p></div>
                </div>
                <button onClick={() => setShowClientModal(true)} className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-black italic uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-500/20">{t.newClient}</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map(client => (
                    <div key={client.id} className="bg-[#111113] border border-white/5 rounded-[32px] p-8 hover:border-blue-500/50 transition-all group relative">
                        <button onClick={() => deleteClient(client.id)} className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-rose-600 rounded-lg transition-all text-gray-500 hover:text-white opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all mb-6">
                            <Briefcase size={20} className="text-gray-400 group-hover:text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-1">{client.name}</h3>
                        <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-6">{client.industry}</p>
                        <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                            <span className="text-xs text-gray-500 font-bold uppercase">{lang === 'en' ? 'Billed' : 'Facturé'}</span>
                            <span className="text-lg font-black">{client.totalInvoiced}</span>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );

    const renderReports = () => (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4 py-8">
                <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto border border-blue-500/10"><BarChart3 className="text-blue-400" size={32} /></div>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">{t.reportsTitle}</h2>
                <p className="text-gray-500 max-w-md mx-auto">{lang === 'en' ? 'AI-powered financial insights for your freelance business.' : 'Analyses financières par IA pour votre entreprise de freelance.'}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#111113] border border-white/5 rounded-[40px] p-8">
                    <div className="flex items-center gap-3 mb-8"><TrendingUp size={20} className="text-emerald-500" /><h3 className="font-bold uppercase tracking-widest text-xs text-gray-400">{lang === 'en' ? 'Income' : 'Revenu'}</h3></div>
                    <div className="space-y-6">
                        {clients.slice(0, 3).map((c, i) => {
                            const val = Math.floor(Math.random() * 40) + 20;
                            return (
                                <div key={c.id} className="space-y-2">
                                    <div className="flex justify-between text-xs font-black uppercase"><span className="text-gray-400">{c.name}</span><span>{val}%</span></div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} className="h-full bg-blue-600 rounded-full" /></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="bg-[#111113] border border-white/5 rounded-[40px] p-8 flex flex-col items-center justify-center text-center">
                    <div className="p-6 bg-blue-600/10 rounded-full mb-6 relative"><FileText className="text-blue-500" size={40} /><div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-black p-2 rounded-full ring-4 ring-[#111113]">PDF</div></div>
                    <h3 className="text-xl font-bold mb-2 uppercase italic tracking-tighter">{lang === 'en' ? 'ANNUAL TAX REPORT' : 'RAPPORT FISCAL ANNUEL'}</h3>
                    <p className="text-gray-500 text-sm mb-8 leading-relaxed px-4">{lang === 'en' ? 'Ready for download.' : 'Prêt pour le téléchargement.'}</p>
                    <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black uppercase italic tracking-widest transition-all active:scale-95 shadow-xl"><Download size={18} className="inline mr-2" /> {lang === 'en' ? 'DOWNLOAD' : 'TÉLÉCHARGER'}</button>
                </div>
            </div>
        </motion.div>
    );

    const renderActivityTable = () => (
        <div className="bg-[#111113] border border-white/5 rounded-[40px] overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between"><h3 className="text-xl font-bold">{t.activityTitle}</h3><button onClick={() => setActiveTab(2)} className="text-xs text-blue-400 font-bold hover:underline transition-all">Dépenses</button></div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left border-b border-white/5">
                            <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-gray-500 font-black">{t.tableHeaders[0]}</th>
                            <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-gray-500 font-black">{t.tableHeaders[1]}</th>
                            <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-gray-500 font-black">{t.tableHeaders[2]}</th>
                            <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-gray-500 font-black text-right">{t.tableHeaders[4]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receipts.map((r) => (
                            <tr key={r.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                <td className="px-8 py-5 flex items-center gap-3"><div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white shadow-inner"><DollarSign size={14} /></div><span className="font-bold">{r.merchant}</span></td>
                                <td className="px-8 py-5 text-gray-400 text-sm font-mono">{r.date}</td>
                                <td className="px-8 py-5 font-black">${r.amount.toFixed(2)}</td>
                                <td className="px-8 py-5 text-right"><button onClick={() => deleteReceipt(r.id)} className="p-2 bg-rose-500/10 hover:bg-rose-500 rounded-lg transition-all text-rose-500 hover:text-white active:scale-90 shadow-sm"><Trash2 size={14} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-[#0A0A0B] text-white overflow-hidden">
            <header className="flex items-center justify-between px-6 py-4 bg-[#111113] border-b border-white/5 z-20 shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/')} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white"><ArrowLeft size={20} /></button>
                    <div className="flex items-center gap-3"><div className="p-2 bg-blue-500/10 rounded-lg shadow-inner"><Wallet className="text-blue-400 w-5 h-5" /></div><h1 className="text-sm font-bold tracking-tight">{t.title}</h1></div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5"><Calendar size={16} className="text-gray-400" /><span className="text-sm font-black text-gray-300 uppercase">{t.month}</span></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border border-white/10 shadow-lg shadow-blue-500/20" />
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                <aside className="hidden lg:flex w-64 flex-col bg-[#0D0D0F] border-r border-white/5 p-4 py-8 shadow-2xl">
                    <nav className="space-y-1">
                        {[{ icon: BarChart3, label: t.nav[0] }, { icon: FileText, label: t.nav[1] }, { icon: Wallet, label: t.nav[2] }, { icon: Users, label: t.nav[3] }, { icon: TrendingUp, label: t.nav[4] }].map((item, idx) => (
                            <button key={item.label} onClick={() => setActiveTab(idx)} className={cn("w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all", activeTab === idx ? "bg-blue-600 text-white font-black shadow-lg shadow-blue-500/20" : "text-gray-500 hover:bg-white/5 hover:text-white hover:translate-x-1")}>
                                <item.icon size={18} /> <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                    <div className="mt-auto p-6 bg-blue-500/5 rounded-[32px] border border-blue-500/10 shadow-inner">
                        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-3">{t.vatLimit}</p>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-3"><div className="h-full w-[40%] bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" /></div>
                        <p className="text-[10px] font-black text-gray-400 tracking-widest">$12,400 / $35,000</p>
                    </div>
                </aside>

                <main className="flex-1 overflow-y-auto bg-black p-4 md:p-12 relative">
                    <AnimatePresence mode="wait">
                        {view === 'dashboard' ? (
                            <div key="tabs">{activeTab === 0 && renderOverview()} {activeTab === 1 && renderInvoices()} {activeTab === 2 && renderActivityTable()} {activeTab === 3 && renderClients()} {activeTab === 4 && renderReports()}</div>
                        ) : (
                            <motion.div key="scan" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 h-full flex flex-col items-center justify-center max-w-md mx-auto">
                                <div className="relative w-full aspect-[4/5] bg-[#111113] border-2 border-dashed border-white/20 rounded-[48px] overflow-hidden flex flex-col items-center justify-center p-8 shadow-2xl shadow-blue-900/10">
                                    {isScanning ? (
                                        <div className="text-center space-y-6"><div className="relative w-24 h-24 mx-auto"><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute inset-0 border-4 border-blue-500/20 border-t-blue-500 rounded-full" /><Camera className="text-blue-400 absolute inset-0 m-auto animate-pulse" /></div><h3 className="text-xl font-bold uppercase italic tracking-tighter">{t.scanningTitle}</h3><p className="text-gray-500 text-sm">{t.scanningDesc}</p></div>
                                    ) : (
                                        <>
                                            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 shadow-inner"><Camera className="text-blue-400" size={32} /></div>
                                            <h3 className="text-2xl font-black mb-2 italic uppercase">{t.scannerTitle}</h3>
                                            <p className="text-gray-400 text-center text-sm mb-8 leading-relaxed px-4">{t.scannerDesc}</p>
                                            <button onClick={handleScan} className="px-12 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black shadow-lg shadow-blue-500/20 transition-all active:scale-95">{t.startCapture}</button>
                                            <button onClick={() => setView('dashboard')} className="mt-6 text-gray-500 font-bold text-sm hover:text-white transition-colors">{t.cancel}</button>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Add Invoice Modal */}
            <AnimatePresence>
                {showInvoiceModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowInvoiceModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-[#111113] border border-white/10 rounded-[40px] p-8 max-w-md w-full shadow-2xl">
                            <h2 className="text-2xl font-black italic uppercase mb-6">{t.addInvoice}</h2>
                            <form onSubmit={addInvoice} className="space-y-6">
                                <div><label className="text-[10px] font-black uppercase text-gray-500 mb-2 block tracking-widest">{t.clientName}</label>
                                    <select name="client" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer">
                                        {clients.map(c => <option key={c.id} value={c.name} className="bg-[#111113]">{c.name}</option>)}
                                    </select>
                                </div>
                                <div><label className="text-[10px] font-black uppercase text-gray-500 mb-2 block tracking-widest">{t.amount} ($)</label>
                                    <input name="amount" type="number" step="0.01" required placeholder="0.00" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 transition-all outline-none" />
                                </div>
                                <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black uppercase italic tracking-widest shadow-lg shadow-blue-500/20 transition-all active:scale-95">{t.save}</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Add Client Modal */}
            <AnimatePresence>
                {showClientModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowClientModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-[#111113] border border-white/10 rounded-[40px] p-8 max-w-md w-full shadow-2xl">
                            <h2 className="text-2xl font-black italic uppercase mb-6">{t.addClient}</h2>
                            <form onSubmit={addClient} className="space-y-6">
                                <div><label className="text-[10px] font-black uppercase text-gray-500 mb-2 block tracking-widest">{t.clientName}</label>
                                    <input name="name" required placeholder="Acme Corp" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 transition-all outline-none" />
                                </div>
                                <div><label className="text-[10px] font-black uppercase text-gray-500 mb-2 block tracking-widest">{t.industry}</label>
                                    <input name="industry" required placeholder="Design / Tech / Legal" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 transition-all outline-none" />
                                </div>
                                <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black uppercase italic tracking-widest shadow-lg shadow-blue-500/20 transition-all active:scale-95">{t.save}</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showGuide && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowGuide(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-[#111113] border border-white/10 rounded-[40px] p-8 max-w-lg w-full shadow-2xl">
                            <button onClick={() => setShowGuide(false)} className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full"><X size={20} /></button>
                            <div className="flex items-center gap-4 mb-8"><div className="w-16 h-16 bg-blue-500/10 rounded-3xl flex items-center justify-center text-blue-400"><FileText size={32} /></div><div><h2 className="text-2xl font-black italic uppercase tracking-tight">{t.guideDetailTitle}</h2><p className="text-gray-500 text-sm">{t.guideDetailDesc}</p></div></div>
                            <div className="space-y-4 mb-8">
                                {t.guideItems.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-blue-500/50 transition-all"><CheckCircle className="text-blue-500" size={18} /><span className="font-bold text-gray-300 group-hover:text-white transition-colors">{item}</span></div>
                                ))}
                            </div>
                            <button onClick={() => setShowGuide(false)} className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black uppercase italic tracking-widest">{t.close}</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
