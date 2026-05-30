import { escapeHTML, setHTML } from '../api.js';

export async function renderStaffPanel(container, app) {
    const role = app.state.user?.role?.toLowerCase();
    if (role !== 'staff' && role !== 'admin') {
        app.showToast('Secure access required', 'error');
        history.pushState(null, null, app.basePath + '/login');
        app.handleRouting();
        return;
    }

    // Premium Skeleton Loader
    setHTML(container, `
        <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-[#0B1120]">
            <div class="hidden lg:block w-72 border-r border-white/5 p-8 space-y-8 animate-pulse bg-white/[0.02]">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-white/10 rounded-2xl"></div>
                    <div class="space-y-2 flex-1"><div class="h-4 bg-white/10 rounded w-1/2"></div><div class="h-3 bg-white/10 rounded w-1/3"></div></div>
                </div>
                <div class="space-y-4 pt-4">
                    <div class="h-12 bg-white/5 rounded-2xl w-full"></div>
                    <div class="h-12 bg-white/5 rounded-2xl w-full"></div>
                    <div class="h-12 bg-white/5 rounded-2xl w-full"></div>
                </div>
            </div>
            <div class="flex-1 p-8 lg:p-12 space-y-10 animate-pulse">
                <div class="space-y-4">
                    <div class="h-10 bg-white/10 rounded-xl w-1/4"></div>
                    <div class="h-6 bg-white/5 rounded-xl w-1/3"></div>
                </div>
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="h-36 bg-white/5 rounded-3xl w-full"></div>
                    <div class="h-36 bg-white/5 rounded-3xl w-full"></div>
                    <div class="h-36 bg-white/5 rounded-3xl w-full"></div>
                    <div class="h-36 bg-white/5 rounded-3xl w-full"></div>
                </div>
                <div class="h-64 bg-white/5 rounded-3xl w-full"></div>
            </div>
        </div>
    `);

    try {
        const [productsRes, logsRes] = await Promise.all([
            fetch(app.api('api/products.php')),
            fetch(app.api('api/stock_logs.php'))
        ]);
        const { products } = await productsRes.json();
        const { logs, low_stock } = await logsRes.json();

        const totalStock = (products || []).reduce((sum, p) => sum + (parseInt(p.stock_quantity) || 0), 0);
        const outOfStock = (products || []).filter(p => (parseInt(p.stock_quantity) || 0) <= 0).length;
        const recentLogs = (logs || []).slice(0, 8);

        setHTML(container, `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-[#0B1120] text-slate-200 selection:bg-blue-500/30 font-sans relative overflow-hidden">
                <!-- Background decorative glows -->
                <div class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>
                <div class="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none"></div>

                ${getStaffSidebar(app)}
                <main class="flex-1 p-6 lg:p-12 space-y-10 relative z-10 overflow-y-auto h-[calc(100vh-80px)] no-scrollbar">

                    <!-- Header -->
                    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 group">
                        <div>
                            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-4">
                                <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                                Live Workstation
                            </div>
                            <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight">Inventory <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Command</span></h2>
                            <p class="text-slate-400 mt-3 font-medium text-lg">Welcome back, <span class="text-white">${app.state.user?.name}</span>. Real-time stock status is looking good.</p>
                        </div>
                    </div>

                    <!-- Stats -->
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        ${[
                            { label: 'Total SKUs', value: products?.length || 0, color: 'blue', gradient: 'from-blue-500/20 to-blue-600/5', text: 'text-blue-400', icon: 'M20 7l-8-4-8 4m16 0l-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
                            { label: 'Total Units', value: totalStock, color: 'emerald', gradient: 'from-emerald-500/20 to-emerald-600/5', text: 'text-emerald-400', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
                            { label: 'Low Stock', value: low_stock?.length || 0, color: 'amber', gradient: 'from-amber-500/20 to-amber-600/5', text: 'text-amber-400', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
                            { label: 'Out of Stock', value: outOfStock, color: 'rose', gradient: 'from-rose-500/20 to-rose-600/5', text: 'text-rose-400', icon: 'M6 18L18 6M6 6l12 12' }
                        ].map(s => 
                            '<div class="relative group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden cursor-default">' +
                                '<div class="absolute inset-0 bg-gradient-to-br ' + escapeHTML(s.gradient) + ' opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>' +
                                '<div class="relative z-10 flex flex-col h-full justify-between gap-4">' +
                                    '<div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner">' +
                                        '<svg class="w-6 h-6 ' + escapeHTML(s.text) + '" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="' + escapeHTML(s.icon) + '"/></svg>' +
                                    '</div>' +
                                    '<div>' +
                                        '<p class="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-1">' + escapeHTML(s.label) + '</p>' +
                                        '<p class="text-3xl md:text-4xl font-black text-white tracking-tight">' + escapeHTML(String(s.value)) + '</p>' +
                                    '</div>' +
                                '</div>' +
                            '</div>'
                        ).join('')}
                    </div>

                    <!-- Low Stock Alert -->
                    ${low_stock && low_stock.length > 0 ? `
                        <div class="relative overflow-hidden bg-rose-500/10 border border-rose-500/20 backdrop-blur-md rounded-3xl p-8">
                            <div class="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                            <div class="relative z-10">
                                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <div class="flex items-center gap-4">
                                        <div class="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                                            <svg class="w-7 h-7 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                                        </div>
                                        <div>
                                            <h3 class="text-xl font-black text-rose-400 tracking-tight">Restock Required</h3>
                                            <p class="text-sm font-medium text-rose-300/70">${low_stock.length} item${low_stock.length > 1 ? 's' : ''} have fallen below optimal threshold</p>
                                        </div>
                                    </div>
                                    <button onclick="app.renderStockAdjustModal()" class="px-6 py-3.5 bg-rose-500 hover:bg-rose-400 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 hover:-translate-y-0.5 border border-rose-400/50">
                                        Mass Adjust
                                    </button>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    ${low_stock.map(item => 
                                        '<div class="bg-[#0B1120]/50 border border-rose-500/10 rounded-2xl p-5 hover:bg-rose-500/10 transition-colors group">' +
                                            '<p class="text-sm font-black text-slate-200 truncate group-hover:text-white transition-colors">' + escapeHTML(item.part_name) + '</p>' +
                                            '<p class="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">' + escapeHTML(item.brand || 'N/A') + '</p>' +
                                            '<div class="mt-4 flex items-center justify-between">' +
                                                '<div class="px-3 py-1 rounded-lg ' + (item.stock_quantity <= 0 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30') + ' text-xs font-black">' + escapeHTML(String(item.stock_quantity)) + ' left</div>' +
                                                '<button onclick="app.renderStockAdjustModal(' + item.id + ')" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-rose-500 text-slate-400 hover:text-white flex items-center justify-center transition-all group/btn"><svg class="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg></button>' +
                                            '</div>' +
                                        '</div>'
                                    ).join('')}
                                </div>
                            </div>
                        </div>
                    ` : `
                        <div class="bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md rounded-3xl p-6 flex items-center gap-5">
                            <div class="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                <svg class="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-black text-emerald-400 tracking-tight">Inventory Healthy</h3>
                                <p class="text-sm font-medium text-emerald-300/70">All stock levels are optimal. No immediate action required.</p>
                            </div>
                        </div>
                    `}

                    <!-- Quick Actions & Activity Grid -->
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        <!-- Actions -->
                        <div class="space-y-4">
                            <h3 class="text-xs font-black text-slate-500 uppercase tracking-[0.25em] mb-5 ml-1">Quick Actions</h3>
                            <button onclick="app.renderStockAdjustModal()"
                                class="w-full relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-left hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 group">
                                <div class="flex items-center gap-5 relative z-10">
                                    <div class="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.0)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                                    </div>
                                    <div>
                                        <p class="font-black text-base text-white">Adjust Stock</p>
                                        <p class="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-wider">Record in/out tx</p>
                                    </div>
                                </div>
                            </button>
                            <a href="/admin/stock-logs" data-link
                                class="w-full relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-left hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 group block">
                                <div class="flex items-center gap-5 relative z-10">
                                    <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.0)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                    </div>
                                    <div>
                                        <p class="font-black text-base text-white">Movement Log</p>
                                        <p class="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-wider">Trace changes</p>
                                    </div>
                                </div>
                            </a>
                            <a href="/admin/reports" data-link
                                class="w-full relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-left hover:bg-amber-500/10 hover:border-amber-500/30 transition-all duration-300 group block">
                                <div class="flex items-center gap-5 relative z-10">
                                    <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(245,158,11,0.0)] group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                                    </div>
                                    <div>
                                        <p class="font-black text-base text-white">Exports & Data</p>
                                        <p class="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-wider">Deep insights</p>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <!-- Activity -->
                        <div class="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl flex flex-col">
                            <div class="p-7 border-b border-white/5 flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div class="w-2 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
                                    <h3 class="text-lg font-black text-white tracking-tight">Recent Activity</h3>
                                </div>
                                <a href="/admin/stock-logs" data-link class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider transition-all">View All</a>
                            </div>
                            <div class="flex-1 overflow-y-auto no-scrollbar p-3">
                                ${recentLogs.length > 0 ? `
                                    <div class="space-y-1">
                                        ${recentLogs.map(log => `
                                            <div class="p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors group">
                                                <div class="flex items-center gap-4">
                                                    <div class="w-10 h-10 rounded-xl flex items-center justify-center border ${log.type === 'in' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}">
                                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="${log.type === 'in' ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'}"/>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p class="text-sm font-black text-slate-200 group-hover:text-white transition-colors">${log.part_name}</p>
                                                        <p class="text-[10px] text-slate-500 font-bold uppercase mt-0.5 tracking-widest">${log.brand_name || 'N/A'} <span class="mx-1 opacity-50">•</span> ${new Date(log.created_at).toLocaleString()}</p>
                                                    </div>
                                                </div>
                                                <div class="text-right">
                                                    <span class="inline-flex items-center justify-center px-3 py-1 rounded-lg text-sm font-black border ${log.type === 'in' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}">
                                                        ${log.type === 'in' ? '+' : '-'}${log.quantity}
                                                    </span>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : `<div class="p-16 text-center text-slate-500 font-bold flex flex-col items-center justify-center h-full">
                                        <div class="w-16 h-16 mb-4 rounded-2xl bg-white/5 flex items-center justify-center text-slate-600"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg></div>
                                        No stock activity recorded yet.
                                    </div>`}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `);
    } catch (e) {
        setHTML(container, `
            <div class="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-[#0B1120] p-10 text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-rose-900/10 blur-[100px] pointer-events-none"></div>
                <div class="w-24 h-24 bg-rose-500/10 border border-rose-500/20 rounded-[2rem] flex items-center justify-center text-rose-400 mb-8 shadow-[0_0_40px_rgba(244,63,94,0.2)] relative z-10">
                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </div>
                <h2 class="text-3xl font-black text-white mb-3 tracking-tight relative z-10">System Error</h2>
                <p class="text-slate-400 font-medium max-w-md relative z-10">The secure workstation could not be initialized. Please verify your connection or try refreshing the interface.</p>
                <button onclick="window.location.reload()" class="mt-8 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all border border-white/10 hover:border-white/20 relative z-10">
                    Reboot Terminal
                </button>
            </div>
        `);
    }
}

function getStaffSidebar(app) {
    const userName = app.state.user?.name || 'Staff';
    const path = window.location.pathname;

    const link = (href, label, icon, active) => 
        '<a href="' + escapeHTML(href) + '" data-link class="relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-xs uppercase tracking-[0.15em] group overflow-hidden ' + 
        (active ? 'text-white' : 'text-slate-400 hover:text-white') + '">' +
            (active ? '<div class="absolute inset-0 bg-blue-500/20 border border-blue-500/30 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"></div>' : '<div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>') +
            '<svg class="w-5 h-5 relative z-10 ' + (active ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300') + ' transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="' + escapeHTML(icon) + '"/></svg>' +
            '<span class="relative z-10 ' + (active ? '' : 'group-hover:translate-x-1') + ' transition-transform">' + escapeHTML(label) + '</span>' +
            (active ? '<div class="absolute right-3 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,1)]"></div>' : '') +
        '</a>';

    return `
        <aside class="hidden lg:flex w-72 bg-[#0B1120]/80 backdrop-blur-3xl border-r border-white/5 flex-col sticky top-20 h-[calc(100vh-80px)] z-20">
            <div class="p-8 border-b border-white/5 bg-white/[0.01]">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/30 relative">
                        ${userName.charAt(0)}
                        <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0B1120]"></div>
                    </div>
                    <div>
                        <p class="text-sm font-black text-white tracking-tight">${userName}</p>
                        <p class="text-[10px] text-blue-400 font-black uppercase tracking-widest mt-0.5">Verified Staff</p>
                    </div>
                </div>
            </div>
            
            <div class="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar">
                <div class="space-y-3">
                    <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 ml-2">Console Modules</p>
                    <nav class="space-y-2">
                        ${link('/staff', 'Dashboard', 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', path.includes('/staff') && !path.includes('/stock') && !path.includes('/report') && !path.includes('/inventory'))}
                        ${link('/admin/stock-logs', 'Movement Log', 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', path.includes('/stock-logs'))}
                        ${link('/admin/reports', 'Analytics', 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', path.includes('/reports'))}
                        ${link('/admin/inventory', 'Inventory Matrix', 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', path.includes('/inventory'))}
                    </nav>
                </div>
            </div>

            <div class="p-6 border-t border-white/5 bg-white/[0.01]">
                <a href="/logout" data-link class="flex items-center justify-center gap-3 w-full px-5 py-4 rounded-2xl text-rose-400 hover:text-white hover:bg-rose-500/20 transition-all font-black text-[11px] uppercase tracking-[0.2em] group border border-transparent hover:border-rose-500/30 relative overflow-hidden">
                    <div class="absolute inset-0 bg-rose-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <svg class="w-5 h-5 relative z-10 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    <span class="relative z-10">Secure Logout</span>
                </a>
            </div>
        </aside>
    `;
}
