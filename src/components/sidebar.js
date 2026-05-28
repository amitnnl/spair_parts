export function getSidebar(active, app) {
    const isAdmin = app.state.user && app.state.user.role && app.state.user.role.toLowerCase() === 'admin';
    const userName = app.state.user ? app.state.user.name : 'Guest Partner';
    
    return `
        <aside class="hidden lg:flex w-72 bg-[#fdfdfd] border-r border-slate-200 flex-col sticky top-20 h-[calc(100vh-80px)] z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] print:hidden">
            <!-- User Status Card -->
            <div class="p-5 border-b border-slate-100 bg-slate-50/30">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-none bg-bosch-blue text-white flex items-center justify-center font-black text-base shadow-lg shadow-slate-900/20 shrink-0">
                        ${userName.charAt(0)}
                    </div>
                    <div>
                        <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">System Status</p>
                        <p class="text-[11px] font-bold text-emerald-600 flex items-center gap-1.5">
                            <span class="relative flex h-1.5 w-1.5">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            Live Access
                        </p>
                    </div>
                </div>
            </div>

            <div class="flex-1 p-4 space-y-5 overflow-y-auto no-scrollbar mt-1 flex flex-col justify-between">
                <div class="space-y-5">
                    ${!isAdmin ? `
                    <div class="space-y-1">
                        <p class="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 ml-3 opacity-60">Procurement Hub</p>
                        <nav class="space-y-0.5">
                            ${renderSidebarLink('/catalog', 'Spare Parts', 'M4 6h16M4 10h16M4 14h16M4 18h16', active === 'catalog')}
                            ${renderSidebarLink('/dashboard', 'Operational Overview', 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', active === 'dashboard')}
                        </nav>
                    </div>
                    ` : ''}

                    ${!isAdmin ? `
                    <div class="space-y-1">
                        <p class="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 ml-3 opacity-60">Transactions</p>
                        <nav class="space-y-0.5">
                            ${renderSidebarLink('/quotations', 'Active Quotations', 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', active === 'quotations')}
                            ${renderSidebarLink('/invoices', 'Financial Records', 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', active === 'invoices')}
                        </nav>
                    </div>
                    ` : ''}

                    ${isAdmin ? `
                        <div class="space-y-1 pt-4 border-t border-slate-100">
                            <p class="text-[8px] font-black text-bosch-blue uppercase tracking-[0.3em] mb-2 ml-3 font-poppins">Administrative Console</p>
                            <nav class="space-y-0.5">
                                ${renderSidebarLink('/admin', 'Executive Insights', 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', active === 'admin', 'slate')}
                                <button onclick="app.renderAdminInventory(document.getElementById('view-container'))" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-none ${active === 'inventory' ? 'bg-industrial-gray border-l-4 border-bosch-blue text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent'} transition-all font-bold text-[10px] uppercase tracking-wider group">
                                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                                    <span class="group-hover:translate-x-1 transition-transform">Inventory Systems</span>
                                </button>
                                ${renderSidebarLink('/admin/stock-logs', 'Stock Movement Log', 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', active === 'stock-logs', 'slate')}
                                ${renderSidebarLink('/admin/reports', 'Reports & Export', 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', active === 'reports', 'slate')}
                                ${renderSidebarLink('/admin/invoices', 'Invoice History', 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', active === 'admin-invoices', 'slate')}
                                <button onclick="app.renderAdminUsers(document.getElementById('view-container'))" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-none ${active === 'partners' ? 'bg-industrial-gray border-l-4 border-bosch-blue text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent'} transition-all font-bold text-[10px] uppercase tracking-wider group">
                                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                                    <span class="group-hover:translate-x-1 transition-transform">Global Partners</span>
                                </button>
                                <button onclick="app.renderSystemSettings()" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-none ${active === 'settings' ? 'bg-industrial-gray border-l-4 border-bosch-blue text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent'} transition-all font-bold text-[10px] uppercase tracking-wider group">
                                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>
                                    <span class="group-hover:translate-x-1 transition-transform">System Configuration</span>
                                </button>
                            </nav>
                        </div>
                    ` : ''}
                </div>
            </div>

            <div class="p-4 border-t border-slate-100 bg-slate-50/20 shrink-0">
                <a href="/logout" data-link class="flex items-center gap-3 px-4 py-3 rounded-none text-bosch-red hover:bg-bosch-red/10 transition-all font-black text-[10px] uppercase tracking-wider group">
                    <div class="w-8 h-8 rounded-none bg-bosch-red/10 flex items-center justify-center group-hover:bg-bosch-red group-hover:text-white transition-all shadow-sm shrink-0">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    </div>
                    Logout
                </a>
            </div>
        </aside>
    `;
}

function renderSidebarLink(href, label, svgPath, isActive, theme = 'blue') {
    const activeClass = theme === 'blue' 
        ? 'bg-bosch-blue text-white shadow-lg border-l-4 border-bosch-red' 
        : 'bg-industrial-gray text-white shadow-lg border-l-4 border-bosch-blue';
    
    const inactiveClass = 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent';
    
    return `
        <a href="${href}" data-link class="flex items-center gap-3 px-4 py-2.5 rounded-none ${isActive ? activeClass : inactiveClass} transition-all font-bold text-[10px] uppercase tracking-wider group">
            <svg class="w-4 h-4 shrink-0 ${isActive ? '' : 'group-hover:scale-110'} transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="${isActive ? '2.5' : '2'}">
                <path stroke-linecap="round" stroke-linejoin="round" d="${svgPath}"/>
            </svg>
            <span class="${isActive ? '' : 'group-hover:translate-x-1'} transition-transform">${label}</span>
        </a>
    `;
}
