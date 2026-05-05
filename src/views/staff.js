export async function renderStaffPanel(container, app) {
    const role = app.state.user?.role?.toLowerCase();
    if (role !== 'staff' && role !== 'admin') {
        app.showToast('Staff access required', 'error');
        history.pushState(null, null, app.basePath + '/login');
        app.handleRouting();
        return;
    }

    container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>`;

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

        container.innerHTML = `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${getStaffSidebar(app)}
                <main class="flex-1 p-8 lg:p-12 space-y-10">

                    <!-- Header -->
                    <div>
                        <div class="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Staff Console</div>
                        <h2 class="text-4xl font-black text-slate-900 tracking-tight">Inventory <span class="text-blue-600">Workstation</span></h2>
                        <p class="text-slate-500 mt-2 font-medium">Welcome, ${app.state.user?.name}. Manage stock levels and view inventory status.</p>
                    </div>

                    <!-- Stats -->
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        ${[
                            { label: 'Total SKUs', value: products?.length || 0, color: 'blue', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
                            { label: 'Total Units', value: totalStock, color: 'emerald', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
                            { label: 'Low Stock', value: low_stock?.length || 0, color: 'amber', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
                            { label: 'Out of Stock', value: outOfStock, color: 'rose', icon: 'M6 18L18 6M6 6l12 12' }
                        ].map(s => `
                            <div class="bg-white border border-slate-200 rounded-3xl p-7 space-y-4 hover:shadow-xl hover:shadow-${s.color}-900/5 transition-all">
                                <div class="w-12 h-12 rounded-2xl bg-${s.color}-50 flex items-center justify-center">
                                    <svg class="w-6 h-6 text-${s.color}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${s.icon}"/></svg>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${s.label}</p>
                                    <p class="text-3xl font-black text-slate-900 mt-1">${s.value}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Low Stock Alert -->
                    ${low_stock && low_stock.length > 0 ? `
                        <div class="bg-rose-50 border border-rose-200 rounded-3xl p-6">
                            <div class="flex items-center justify-between mb-5">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center">
                                        <svg class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                                    </div>
                                    <p class="text-xs font-black text-rose-700 uppercase tracking-widest">⚠ ${low_stock.length} Item${low_stock.length > 1 ? 's' : ''} Need Restocking</p>
                                </div>
                                <button onclick="app.renderStockAdjustModal()" class="px-4 py-2 bg-rose-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-700 transition-all">
                                    Adjust Stock
                                </button>
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                ${low_stock.map(item => `
                                    <div class="bg-white border border-rose-100 rounded-2xl p-4">
                                        <p class="text-xs font-black text-slate-900 truncate">${item.part_name}</p>
                                        <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">${item.brand || 'N/A'}</p>
                                        <div class="mt-3 flex items-center justify-between">
                                            <span class="text-sm font-black ${item.stock_quantity <= 0 ? 'text-rose-600' : 'text-amber-600'}">${item.stock_quantity}</span>
                                            <button onclick="app.renderStockAdjustModal(${item.id})" class="text-[9px] font-black text-blue-600 hover:underline uppercase tracking-widest">Restock</button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : `
                        <div class="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 flex items-center gap-4">
                            <div class="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                            </div>
                            <p class="text-xs font-black text-emerald-700 uppercase tracking-widest">All stock levels are healthy — no alerts</p>
                        </div>
                    `}

                    <!-- Quick Actions -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <button onclick="app.renderStockAdjustModal()"
                            class="bg-white border-2 border-dashed border-blue-200 rounded-3xl p-8 text-center hover:border-blue-600 hover:bg-blue-50 transition-all group space-y-3">
                            <div class="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <svg class="w-7 h-7 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                            </div>
                            <p class="font-black text-sm text-slate-900">Adjust Stock</p>
                            <p class="text-xs text-slate-400 font-medium">Record stock in or stock out</p>
                        </button>
                        <a href="/admin/stock-logs" data-link
                            class="bg-white border-2 border-dashed border-emerald-200 rounded-3xl p-8 text-center hover:border-emerald-600 hover:bg-emerald-50 transition-all group space-y-3 block">
                            <div class="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto group-hover:bg-emerald-600 transition-all">
                                <svg class="w-7 h-7 text-emerald-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            </div>
                            <p class="font-black text-sm text-slate-900">Stock Log History</p>
                            <p class="text-xs text-slate-400 font-medium">View all transactions</p>
                        </a>
                        <a href="/admin/reports" data-link
                            class="bg-white border-2 border-dashed border-amber-200 rounded-3xl p-8 text-center hover:border-amber-600 hover:bg-amber-50 transition-all group space-y-3 block">
                            <div class="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto group-hover:bg-amber-600 transition-all">
                                <svg class="w-7 h-7 text-amber-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                            </div>
                            <p class="font-black text-sm text-slate-900">Reports & Export</p>
                            <p class="text-xs text-slate-400 font-medium">View charts and export CSV</p>
                        </a>
                    </div>

                    <!-- Recent Activity -->
                    <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden">
                        <div class="p-8 border-b border-slate-100 flex items-center gap-4">
                            <div class="w-2 h-8 bg-blue-600 rounded-full"></div>
                            <h3 class="text-lg font-black text-slate-900">Recent Stock Activity</h3>
                        </div>
                        ${recentLogs.length > 0 ? `
                            <div class="divide-y divide-slate-100">
                                ${recentLogs.map(log => `
                                    <div class="p-5 px-8 flex items-center justify-between hover:bg-slate-50 transition-all">
                                        <div class="flex items-center gap-4">
                                            <div class="w-9 h-9 rounded-xl flex items-center justify-center ${log.type === 'in' ? 'bg-emerald-50' : 'bg-rose-50'}">
                                                <svg class="w-4 h-4 ${log.type === 'in' ? 'text-emerald-600' : 'text-rose-600'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="${log.type === 'in' ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'}"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm font-black text-slate-900">${log.part_name}</p>
                                                <p class="text-[10px] text-slate-400 font-bold uppercase">${log.brand_name || 'N/A'} • ${new Date(log.created_at).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <span class="text-sm font-black ${log.type === 'in' ? 'text-emerald-600' : 'text-rose-600'}">
                                            ${log.type === 'in' ? '+' : '-'}${log.quantity} units
                                        </span>
                                    </div>
                                `).join('')}
                            </div>
                        ` : `<div class="p-16 text-center text-slate-400 font-bold">No stock activity yet.</div>`}
                    </div>

                </main>
            </div>
        `;
    } catch (e) {
        container.innerHTML = `<div class="p-20 text-center text-rose-500 font-bold">Failed to load staff panel.</div>`;
    }
}

function getStaffSidebar(app) {
    const userName = app.state.user?.name || 'Staff';
    const path = window.location.pathname;

    const link = (href, label, icon, active) => `
        <a href="${href}" data-link class="flex items-center gap-4 px-4 py-3.5 rounded-2xl ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'} transition-all font-bold text-[11px] uppercase tracking-tight group">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="${icon}"/></svg>
            <span class="${active ? '' : 'group-hover:translate-x-1'} transition-transform">${label}</span>
        </a>`;

    return `
        <aside class="w-full lg:w-72 bg-[#fdfdfd] border-r border-slate-200 flex flex-col sticky top-20 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            <div class="p-8 border-b border-slate-100 bg-slate-50/30">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-lg">${userName.charAt(0)}</div>
                    <div>
                        <p class="text-xs font-black text-slate-900">${userName}</p>
                        <span class="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-widest">Staff</span>
                    </div>
                </div>
            </div>
            <div class="flex-1 p-6 space-y-8">
                <div class="space-y-2">
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-4 opacity-60">Inventory Console</p>
                    <nav class="space-y-1.5">
                        ${link('/staff', 'Staff Dashboard', 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', path.includes('/staff') && !path.includes('/stock') && !path.includes('/report'))}
                        ${link('/admin/stock-logs', 'Stock Movement Log', 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', path.includes('/stock-logs'))}
                        ${link('/admin/reports', 'Reports & Export', 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', path.includes('/reports'))}
                        ${link('/admin/inventory', 'View Inventory', 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', path.includes('/inventory'))}
                    </nav>
                </div>
            </div>
            <div class="p-6 border-t border-slate-100">
                <a href="/logout" data-link class="flex items-center gap-4 px-4 py-4 rounded-2xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-black text-xs group">
                    <div class="w-10 h-10 rounded-xl bg-rose-100/50 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    </div>
                    Logout
                </a>
            </div>
        </aside>`;
}
