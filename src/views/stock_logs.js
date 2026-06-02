export async function renderStockLogs(container, app) {
    const isAdmin = app.state.user?.role?.toLowerCase() === 'admin';
    if (!isAdmin) {
        app.showToast('Admin access required', 'error');
        return;
    }

    container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-none"></div></div>`;

    try {
        const res = await fetch(app.api('api/stock_logs.php'));
        const data = await res.json();
        const logs = data.logs || [];
        const lowStock = data.low_stock || [];

        container.innerHTML = `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${app.getSidebar('stock-logs')}
                <main class="flex-1 p-8 lg:p-12 space-y-10">

                    <!-- Header -->
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div class="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Inventory Control</div>
                            <h2 class="text-4xl font-black text-slate-900 tracking-tight">Stock <span class="text-blue-600">Movement Log</span></h2>
                            <p class="text-slate-500 mt-2 font-medium">Real-time tracking of all stock-in and stock-out transactions.</p>
                        </div>
                        <button onclick="app.renderStockAdjustModal()"
                            class="px-6 py-3.5 bg-blue-600 text-white rounded-none font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2 hover:-translate-y-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                            Adjust Stock
                        </button>
                    </div>

                    <!-- Low Stock Alerts -->
                    ${lowStock.length > 0 ? `
                        <div class="bg-rose-50 border border-rose-200 rounded-none p-8">
                            <div class="flex items-center gap-3 mb-5">
                                <div class="w-10 h-10 rounded-none bg-rose-100 flex items-center justify-center">
                                    <svg class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                                </div>
                                <div>
                                    <p class="text-xs font-black text-rose-700 uppercase tracking-widest">⚠ Low Stock Alert — ${lowStock.length} Item${lowStock.length > 1 ? 's' : ''} Need Restocking</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                ${lowStock.map(item => `
                                    <div class="bg-white border border-rose-100 rounded-none p-4 flex flex-col gap-1">
                                        <p class="text-xs font-black text-slate-900">${item.part_name}</p>
                                        <p class="text-xs text-slate-500 font-bold uppercase">${item.brand || 'N/A'}</p>
                                        <div class="mt-2 flex items-center justify-between">
                                            <span class="text-xs font-black ${item.stock_quantity <= 0 ? 'text-rose-600' : 'text-amber-600'}">${item.stock_quantity} left</span>
                                            <button onclick="app.renderStockAdjustModal(${item.id})" class="text-xs font-black uppercase tracking-widest text-blue-600 hover:underline">Restock</button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : `
                        <div class="bg-emerald-50 border border-emerald-200 rounded-none p-5 flex items-center gap-4">
                            <div class="w-10 h-10 rounded-none bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                            </div>
                            <p class="text-xs font-black text-emerald-700 uppercase tracking-widest">All stock levels are healthy — no alerts</p>
                        </div>
                    `}

                    <!-- Transaction History Table -->
                    <div class="bg-white rounded-none border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/40">
                        <div class="p-8 border-b border-slate-100 flex items-center gap-4">
                            <div class="w-2 h-8 bg-blue-600 rounded-none"></div>
                            <h3 class="text-lg font-black text-slate-900">Transaction History</h3>
                            <span class="ml-auto text-xs font-black text-slate-500 uppercase tracking-widest">Last ${logs.length} entries</span>
                        </div>
                        ${logs.length > 0 ? `
                            <div class="overflow-x-auto">
                                <table class="w-full text-left">
                                    <thead class="bg-slate-50/80 border-b border-slate-200">
                                        <tr>
                                            <th class="p-5 pl-8 text-xs font-black text-slate-500 uppercase tracking-widest">Date & Time</th>
                                            <th class="p-5 text-xs font-black text-slate-500 uppercase tracking-widest">Part</th>
                                            <th class="p-5 text-xs font-black text-slate-500 uppercase tracking-widest">Type</th>
                                            <th class="p-5 text-xs font-black text-slate-500 uppercase tracking-widest">Quantity</th>
                                            <th class="p-5 text-xs font-black text-slate-500 uppercase tracking-widest">Note</th>
                                            <th class="p-5 pr-8 text-xs font-black text-slate-500 uppercase tracking-widest">Logged By</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-100">
                                        ${logs.map(log => `
                                            <tr class="hover:bg-slate-50/80 transition-all">
                                                <td class="p-5 pl-8">
                                                    <p class="text-xs font-black text-slate-900">${new Date(log.created_at).toLocaleDateString()}</p>
                                                    <p class="text-xs text-slate-500 font-bold">${new Date(log.created_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                                                </td>
                                                <td class="p-5">
                                                    <p class="text-xs font-black text-slate-900">${log.part_name}</p>
                                                    <p class="text-xs text-slate-500 font-bold uppercase">${log.brand_name || 'N/A'}</p>
                                                </td>
                                                <td class="p-5">
                                                    <span class="px-3 py-1 rounded-none text-xs font-black uppercase tracking-widest ${log.type === 'in' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'}">
                                                        ${log.type === 'in' ? '▲ Stock In' : '▼ Stock Out'}
                                                    </span>
                                                </td>
                                                <td class="p-5">
                                                    <span class="text-sm font-black ${log.type === 'in' ? 'text-emerald-600' : 'text-rose-600'}">
                                                        ${log.type === 'in' ? '+' : '-'}${log.quantity}
                                                    </span>
                                                </td>
                                                <td class="p-5 text-xs text-slate-500 font-medium max-w-[180px] truncate">${log.note || '—'}</td>
                                                <td class="p-5 pr-8 text-xs font-bold text-slate-700">${log.logged_by}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        ` : `
                            <div class="p-20 text-center text-slate-500 font-bold">No stock transactions recorded yet.</div>
                        `}
                    </div>

                </main>
            </div>
        `;
    } catch (e) {
        container.innerHTML = `<div class="p-20 text-center text-rose-500 font-bold">Failed to load stock logs.</div>`;
    }
}

export function renderStockAdjustModal(preselectedPartId = null, app) {
    // Remove existing modal if any
    document.getElementById('stock-adjust-modal')?.remove();

    const modal = document.createElement('div');
    modal.id = 'stock-adjust-modal';
    modal.className = 'fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/50 backdrop-blur-sm';

    modal.innerHTML = `
        <div class="bg-white w-full max-w-lg rounded-none shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div class="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                    <h2 class="text-xl font-black text-slate-900">Stock Adjustment</h2>
                    <p class="text-xs text-slate-500 font-bold mt-1">Add or remove units from inventory</p>
                </div>
                <button onclick="document.getElementById('stock-adjust-modal').remove()" class="text-slate-500 hover:text-slate-900 transition-all">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div class="p-8 space-y-6">
                <div class="space-y-2">
                    <label class="text-xs font-black text-slate-500 uppercase tracking-widest">Part ID or Search</label>
                    <input type="number" id="stock-part-id" value="${preselectedPartId || ''}" placeholder="Enter Part ID"
                        class="font-sans w-full px-5 py-4 rounded-none bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-medium text-sm">
                </div>
                <div class="grid grid-cols-2 gap-8">
                    <div class="space-y-2">
                        <label class="text-xs font-black text-slate-500 uppercase tracking-widest">Transaction Type</label>
                        <select id="stock-type" class="font-sans w-full px-5 py-4 rounded-none bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-medium text-sm">
                            <option value="in">▲ Stock In (Add)</option>
                            <option value="out">▼ Stock Out (Remove)</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <label class="text-xs font-black text-slate-500 uppercase tracking-widest">Quantity</label>
                        <input type="number" id="stock-qty" min="1" value="1" placeholder="Units"
                            class="font-sans w-full px-5 py-4 rounded-none bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-medium text-sm">
                    </div>
                </div>
                <div class="space-y-2">
                    <label class="text-xs font-black text-slate-500 uppercase tracking-widest">Note (Optional)</label>
                    <input type="text" id="stock-note" placeholder="e.g. Monthly restock from supplier, or Used for repair order"
                        class="font-sans w-full px-5 py-4 rounded-none bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-medium text-sm">
                </div>
                <button onclick="app.submitStockAdjustment()" class="w-full py-4 bg-blue-600 text-white rounded-none font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
                    Record Transaction
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

export async function submitStockAdjustment(app) {
    const part_id  = document.getElementById('stock-part-id')?.value;
    const type     = document.getElementById('stock-type')?.value;
    const quantity = document.getElementById('stock-qty')?.value;
    const note     = document.getElementById('stock-note')?.value;

    if (!part_id || !quantity) {
        app.showToast('Part ID and Quantity are required', 'error');
        return;
    }

    try {
        const res = await fetch(app.api('api/stock_logs.php'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ part_id: parseInt(part_id), type, quantity: parseInt(quantity), note })
        });
        const result = await res.json();
        if (result.success) {
            app.showToast(`Stock ${type === 'in' ? 'added' : 'removed'} successfully! New qty: ${result.new_stock}`);
            document.getElementById('stock-adjust-modal')?.remove();
            app.renderStockLogs(document.getElementById('view-container'));
        } else {
            app.showToast(result.error || 'Failed', 'error');
        }
    } catch (e) {
        app.showToast('Network error', 'error');
    }
}
