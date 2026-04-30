export async function renderDashboard(container, app) {
    if (!app.state.user) {
        history.pushState(null, null, app.basePath + '/login');
        app.handleRouting();
        return;
    }

    container.innerHTML = `
        <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
            ${app.getSidebar('dashboard')}

            <main class="flex-1 p-8 lg:p-12 space-y-12">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-2 h-8 bg-blue-600 rounded-full"></div>
                            <h2 class="text-4xl font-black text-slate-900 tracking-tight">Partner <span class="text-blue-600">Portal</span></h2>
                        </div>
                        <p class="text-slate-500 font-bold text-lg">Exclusive procurement overview for ${app.state.user.name}.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${[
                        { l:'Total Procurement', v:(app.state.settings.currency || '₹') + '0.00', s:'+0%', c:'blue' },
                        { l:'Total Savings', v:(app.state.settings.currency || '₹') + '0.00', s:'+0%', c:'emerald' },
                        { l:'Active Orders', v:'0', s:'- -', c:'amber' },
                        { l:'Saved Items', v:'0', s:'- -', c:'indigo' }
                    ].map(s => `
                        <div class="bg-white rounded-[32px] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            <div class="absolute -right-4 -top-4 w-24 h-24 bg-${s.c}-50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 relative z-10">${s.l}</p>
                            <div class="flex items-end justify-between relative z-10">
                                <h3 class="text-4xl font-black text-slate-900">${s.v}</h3>
                                <span class="text-[10px] font-black text-${s.c}-600 bg-${s.c}-50 px-3 py-1.5 rounded-xl border border-${s.c}-100 shadow-sm">${s.s}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="bg-slate-900 rounded-[40px] p-12 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
                    <div class="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent"></div>
                    <div class="relative z-10 max-w-2xl">
                        <h3 class="text-3xl font-black tracking-tight mb-4">Express Bulk Ordering</h3>
                        <p class="text-slate-400 font-medium mb-8 leading-relaxed">Skip the catalog. Upload a CSV file with SKUs (Models) and Quantities to instantly generate a massive quotation cart using your exclusive tier pricing.</p>
                        <div class="flex flex-wrap gap-4">
                            <button onclick="app.renderBulkOrderModal()" class="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-white/10 hover:scale-105 transition-transform flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                Upload CSV Order
                            </button>
                            <button onclick="app.renderCatalog(document.getElementById('view-container'))" class="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-600/30 hover:scale-105 transition-transform">Browse Catalog Manually</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `;
    
    app.loadDashboardStats();
}

export async function loadDashboardStats(app) {
    try {
        const res = await fetch(app.api('api/dashboard_stats.php'));
        const stats = await res.json();
        const cards = document.querySelectorAll('main h3');
        if (cards.length >= 4) {
            const symbol = app.state.settings.currency || '₹';
            cards[0].textContent = symbol + parseFloat(stats.total_procured || 0).toLocaleString();
            cards[1].textContent = symbol + parseFloat(stats.total_savings || 0).toLocaleString();
            cards[2].textContent = stats.active_orders || 0;
            cards[3].textContent = stats.saved_items || 0;
        }
    } catch (e) {
        console.error('Failed to load dashboard stats', e);
    }
}

export function renderBulkOrderModal(app) {
    const modal = document.createElement('div');
    modal.id = 'bulk-order-modal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300';
    
    modal.innerHTML = `
        <div class="bg-white rounded-[32px] w-full max-w-xl p-10 space-y-8 shadow-2xl shadow-blue-900/20 relative animate-in zoom-in-95 duration-300">
            <button onclick="document.getElementById('bulk-order-modal').remove()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-all text-slate-400 hover:text-slate-900">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div>
                <h2 class="text-3xl font-black text-slate-900 tracking-tight">Express <span class="text-blue-600">Bulk Order</span></h2>
                <p class="text-slate-500 font-bold mt-2">Upload your inventory request instantly.</p>
            </div>
            
            <div class="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-3">
                <p class="text-xs text-blue-600 font-black uppercase tracking-widest">CSV Format Requirement:</p>
                <p class="text-[11px] font-bold text-slate-500">Your CSV must contain these exact column headers:</p>
                <code class="text-[10px] text-blue-800 block bg-blue-100/50 p-4 rounded-xl font-mono shadow-inner border border-blue-200/50">Model/SKU, Quantity</code>
            </div>

            <form id="bulk-order-form" class="space-y-6">
                <div class="border-[3px] border-dashed border-slate-200 rounded-[24px] p-12 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer relative group">
                    <input type="file" name="order_csv" accept=".csv" required class="absolute inset-0 opacity-0 cursor-pointer z-10" onchange="document.getElementById('csv-filename').textContent = this.files[0] ? this.files[0].name : 'Drop your CSV file here or browse'">
                    <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all text-blue-500">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <p id="csv-filename" class="text-sm text-slate-500 font-black">Drop your CSV file here or <span class="text-blue-600 underline">browse</span></p>
                </div>
                <button type="submit" class="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:scale-[1.02] transition-all">Generate Quotation Cart</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('bulk-order-form').onsubmit = async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        btn.disabled = true;
        btn.innerHTML = '<span class="animate-pulse">Processing Order...</span>';
        
        const formData = new FormData(e.target);
        try {
            const res = await fetch(app.api('api/bulk_order.php'), {
                method: 'POST',
                body: formData
            });
            const result = await res.json();
            if (result.success) {
                app.showToast(`Success! ${result.count} items added to your cart.`);
                modal.remove();
                app.state.cart = result.cart;
                app.renderCart(document.getElementById('view-container'));
            } else {
                app.showToast(result.error, 'error');
            }
        } catch (e) {
            app.showToast('Bulk order failed. Check CSV format.', 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = 'Generate Quotation Cart';
        }
    };
}

export async function renderMyPartsList(container, app) {
    if (!app.state.user) { history.pushState(null, null, app.basePath + '/login'); app.handleRouting(); return; }
    container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>`;
    
    try {
        container.innerHTML = `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${app.getSidebar('parts_list')}

                <main class="flex-1 p-8 lg:p-12">
                    <div class="max-w-6xl mx-auto space-y-12 animate-fade-in">
                        <div class="flex justify-between items-end">
                            <div>
                                <div class="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Personal Collection</div>
                                <h2 class="text-4xl font-black tracking-tight text-slate-900">My <span class="text-primary">Parts List</span></h2>
                                <p class="text-slate-500 font-medium mt-2 text-lg">Your curated selection of essential spares for quick procurement.</p>
                            </div>
                            <button onclick="app.renderCatalog(document.getElementById('view-container'))" class="px-8 py-3.5 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">Add More Spares</button>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div class="card p-8 group">
                                <div class="w-full h-48 bg-slate-50 rounded-2xl mb-6 overflow-hidden border border-slate-100 flex items-center justify-center">
                                    <svg class="w-20 h-20 text-slate-200 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                                </div>
                                <h4 class="text-lg font-black text-slate-900 mb-1">Carbon Brush GWS 600</h4>
                                <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">SKU: CB-GWS600</p>
                                <div class="flex gap-3">
                                    <button class="flex-1 h-12 rounded-xl bg-primary text-white font-black text-[10px] uppercase tracking-widest hover:bg-primary-dark transition-all">Add to Cart</button>
                                    <button class="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-all"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `;
    } catch (e) {
        app.showToast('Failed to load parts list', 'error');
    }
}
