import { escapeHTML, setHTML } from '../api.js';

export async function renderDashboard(container, app) {
    if (!app.state.user) {
        history.pushState(null, null, app.basePath + '/login');
        app.handleRouting();
        return;
    }

    setHTML(container, `
        <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
            ${app.getSidebar('dashboard')}

            <main class="flex-1 m-4 lg:m-6 p-6 lg:p-10 bg-white rounded-[2.5rem] shadow-sm border border-slate-200 space-y-12">
                <div class="max-w-7xl mx-auto space-y-12 animate-fade-in">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-2 h-8 bg-bosch-blue rounded-full"></div>
                            <h2 class="text-4xl font-black text-bosch-blue tracking-tight uppercase">Partner <span class="text-bosch-blue">Portal</span></h2>
                        </div>
                        <p class="text-slate-500 font-bold text-lg">Exclusive procurement overview for ${escapeHTML(app.state.user.name)}.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${[
                        { l:'Total Procurement', v:(app.state.settings.currency || '₹') + '0.00', s:'+0%', c:'blue' },
                        { l:'Total Savings', v:(app.state.settings.currency || '₹') + '0.00', s:'+0%', c:'emerald' },
                        { l:'Active Orders', v:'0', s:'- -', c:'amber' },
                        { l:'Saved Items', v:'0', s:'- -', c:'indigo' }
                    ].map(s => `
                        <div class="bg-white rounded-3xl p-8 ring-1 ring-slate-900/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] group transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                            <div class="absolute -right-4 -top-4 w-28 h-28 bg-${escapeHTML(s.c)}-50 rounded-full blur-2xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                            <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 relative z-10">${escapeHTML(s.l)}</p>
                            <div class="flex items-end justify-between relative z-10">
                                <h3 class="text-4xl font-black text-slate-900 tracking-tight">${escapeHTML(s.v)}</h3>
                                <span class="text-xs font-black text-${escapeHTML(s.c)}-700 bg-${escapeHTML(s.c)}-50/50 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-${escapeHTML(s.c)}-100/50 shadow-sm">${escapeHTML(s.s)}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="bg-slate-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.15)] ring-1 ring-white/10">
                    <div class="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-bosch-blue/20 to-transparent"></div>
                    <div class="relative z-10 max-w-2xl">
                        <h3 class="text-3xl font-black tracking-tight mb-4 uppercase">Express Bulk Ordering</h3>
                        <p class="text-slate-500 font-medium mb-8 leading-relaxed">Skip the catalog. Upload a CSV file with SKUs (Models) and Quantities to instantly generate a massive quotation cart using your exclusive tier pricing.</p>
                        <div class="flex flex-wrap gap-4">
                            <button onclick="app.renderBulkOrderModal()" class="px-8 py-4 bg-white text-bosch-blue rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                Upload CSV Order
                            </button>
                            <button onclick="app.renderCatalog(document.getElementById('view-container'))" class="px-8 py-4 bg-bosch-blue text-white rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/30 hover:bg-slate-700 transition-colors">Browse Catalog Manually</button>
                        </div>
                    </div>
                </div>
                </div>
            </main>
        </div>
    `);
    
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
        <div class="bg-white rounded-3xl w-full max-w-xl p-8 space-y-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-300">
            <button onclick="document.getElementById('bulk-order-modal').remove()" class="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-all text-slate-500 hover:text-bosch-blue">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div>
                <h2 class="text-2xl font-black text-bosch-blue tracking-tight uppercase">Express <span class="text-bosch-blue">Bulk Order</span></h2>
                <p class="text-slate-500 font-bold mt-1 text-xs">Upload your inventory request instantly.</p>
            </div>
            
            <div class="bg-industrial-gray text-white border-l-4 border-bosch-blue rounded-none p-4 space-y-2">
                <p class="text-xs text-bosch-blue font-black uppercase tracking-widest">CSV Format Requirement:</p>
                <p class="text-xs font-bold text-slate-300">Your CSV must contain these exact column headers:</p>
                <code class="text-xs text-bosch-blue block bg-slate-900 p-2.5 rounded-none font-mono shadow-inner border border-bosch-blue/50">Model/SKU, Quantity</code>
            </div>

            <form id="bulk-order-form" class="space-y-4">
                <div class="border-[2px] border-dashed border-slate-200 rounded-none p-8 text-center hover:border-bosch-blue hover:bg-bosch-blue/5 transition-all cursor-pointer relative group">
                    <input type="file" name="order_csv" accept=".csv" required class="absolute inset-0 opacity-0 cursor-pointer z-10" onchange="document.getElementById('csv-filename').textContent = this.files[0] ? this.files[0].name : 'Drop your CSV file here or browse'">
                    <div class="w-12 h-12 bg-bosch-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:bg-bosch-blue/20 transition-all text-bosch-blue">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <p id="csv-filename" class="text-xs text-slate-500 font-black">Drop your CSV file here or <span class="text-bosch-blue underline">browse</span></p>
                </div>
                <button type="submit" class="w-full h-11 rounded-full bg-bosch-blue text-white font-black text-xs uppercase tracking-widest shadow-lg hover:bg-industrial-gray transition-colors">Generate Quotation Cart</button>
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
    setHTML(container, `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full"></div></div>`);
    
    try {
        const res = await fetch(app.api('api/user_parts.php'));
        const result = await res.json();
        const parts = result.parts || [];

        window.removeFromPartsList = async (partId) => {
            if (!confirm('Remove this part from your list?')) return;
            try {
                const r = await fetch(app.api('api/user_parts.php'), {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ part_id: partId })
                });
                const data = await r.json();
                if (data.success) {
                    app.showToast('Part removed from your list');
                    renderMyPartsList(container, app);
                } else {
                    app.showToast(data.error || 'Failed to remove', 'error');
                }
            } catch (e) {
                app.showToast('Network error', 'error');
            }
        };

        const partsHtml = parts.length > 0 ? parts.map(p => `
            <div class="card p-8 group border border-slate-200 rounded-3xl shadow-sm bg-white relative">
                <div class="w-full h-48 bg-slate-50 rounded-none mb-6 overflow-hidden border border-slate-100 flex items-center justify-center relative">
                    ${p.stock_quantity <= 0 ? `<div class="absolute top-3 left-3 bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">Out of Stock</div>` : ''}
                    <svg class="w-20 h-20 text-slate-200 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                </div>
                <h4 class="text-lg font-black text-[#111111] mb-1 uppercase tracking-widest line-clamp-1">${p.part_name || 'Unknown Part'}</h4>
                <p class="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Model: ${p.machine_model || 'N/A'}</p>
                <div class="flex gap-3">
                    <button onclick='app.addToCart(${JSON.stringify({id: p.id, part_name: p.part_name, quantity: 1})})' class="flex-1 h-12 rounded-2xl bg-[#111111] hover:bg-[#ed1c24] text-white font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-[#ed1c24]/20 transform hover:-translate-y-0.5 border border-transparent">Add to Cart</button>
                    <button onclick="window.removeFromPartsList(${p.id})" class="w-12 h-12 rounded-2xl border-2 border-slate-200 flex items-center justify-center text-rose-500 hover:bg-rose-50 hover:border-rose-200 transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                </div>
            </div>
        `).join('') : `
            <div class="col-span-full py-8 text-center">
                <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
                    <svg class="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </div>
                <h3 class="text-xl font-black text-slate-900 mb-2 uppercase tracking-widest">List is Empty</h3>
                <p class="text-slate-500 font-semibold mb-8 text-sm">You haven't saved any parts to your personal collection yet.</p>
                <button onclick="app.renderCatalog(document.getElementById('view-container'))" class="px-8 py-3.5 bg-[#111111] hover:bg-[#ed1c24] text-white font-black text-[11px] uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-xl shadow-[#111111]/10 hover:shadow-[#ed1c24]/20 transform hover:-translate-y-0.5">Browse Spares</button>
            </div>
        `;

        setHTML(container, `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${app.getSidebar('parts_list')}

                <main class="flex-1 m-4 lg:m-6 p-6 lg:p-10 bg-white rounded-[2.5rem] shadow-sm border border-slate-200">
                    <div class="max-w-6xl mx-auto space-y-12 animate-fade-in">
                        <div class="flex justify-between items-end border-b border-slate-100 pb-8">
                            <div>
                                <div class="flex items-center gap-3 mb-4">
                                    <div class="w-12 h-12 bg-[#ed1c24]/10 rounded-2xl flex items-center justify-center border border-[#ed1c24]/20">
                                        <svg class="w-6 h-6 text-[#ed1c24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                                    </div>
                                </div>
                                <h2 class="text-4xl font-black tracking-tight text-[#111111] uppercase">My <span class="text-[#ed1c24]">Parts List</span></h2>
                                <p class="text-slate-500 font-medium mt-2 text-sm max-w-lg">Your curated selection of essential spares for quick procurement.</p>
                            </div>
                            <button onclick="app.renderCatalog(document.getElementById('view-container'))" class="hidden sm:flex px-8 py-4 bg-[#111111] hover:bg-[#ed1c24] text-white font-black text-[11px] uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-xl shadow-[#111111]/10 hover:shadow-[#ed1c24]/20 transform hover:-translate-y-0.5 items-center gap-2">
                                <span>Add More Spares</span>
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                            </button>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            ${partsHtml}
                        </div>
                    </div>
                </main>
            </div>
        `);
    } catch (e) {
        app.showToast('Failed to load parts list', 'error');
    }
}
