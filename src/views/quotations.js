export async function renderQuotations(container, appInstance) {
    if (!appInstance.state.user) { history.pushState(null, null, appInstance.basePath + '/login'); appInstance.handleRouting(); return; }
    container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>`;
    
    try {
        const res = await fetch(appInstance.api('api/quotations.php'));
        const quotations = await res.json();
        
        container.innerHTML = `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${appInstance.getSidebar('quotations')}
                <main class="flex-1 p-8 lg:p-12">
                    <div class="max-w-6xl mx-auto space-y-12 animate-fade-in">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div>
                                <div class="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Procurement History</div>
                                <h2 class="text-4xl font-black tracking-tight text-slate-900">Your <span class="text-blue-600">Quotations</span></h2>
                                <p class="text-slate-500 font-medium mt-2 text-lg">Track your request for quotes and approval statuses.</p>
                            </div>
                            <button onclick="app.renderCatalog(document.getElementById('view-container'))" class="btn btn-secondary flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                                New Request
                            </button>
                        </div>

                        <div class="table-container">
                            <table class="data-table w-full text-left">
                                <thead>
                                    <tr>
                                        <th>ID / Date</th>
                                        <th>Items Count</th>
                                        <th>Status</th>
                                        <th>Amount</th>
                                        <th class="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100">
                                    ${quotations.length ? quotations.map(q => `
                                        <tr class="hover:bg-slate-50 transition-all">
                                            <td class="p-6">
                                                <div class="font-bold text-slate-900">#Q-${String(q.id).padStart(4, '0')}</div>
                                                <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">${new Date(q.created_at).toLocaleDateString()}</div>
                                            </td>
                                            <td class="p-6 font-bold text-slate-600">${q.item_count || 0} Products</td>
                                            <td class="p-6">
                                                <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${appInstance.getStatusClass(q.status)}">
                                                    ${q.status}
                                                </span>
                                            </td>
                                            <td class="p-6 font-black text-slate-900">
                                                ${q.status === 'pending' ? '<span class="text-slate-400 font-bold italic">Awaiting Pricing</span>' : `₹${parseFloat(q.total_amount || 0).toLocaleString()}`}
                                            </td>
                                            <td class="p-6 text-right">
                                                <div class="flex justify-end gap-3">
                                                    <button onclick="app.viewQuotationDetails(${q.id})" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-slate-200 transition-all">View</button>
                                                    ${q.status === 'priced' ? `<button onclick="app.approveQuotation(${q.id})" class="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">Approve</button>` : ''}
                                                </div>
                                            </td>
                                        </tr>
                                    `).join('') : `
                                        <tr>
                                            <td colspan="5" class="p-20 text-center text-slate-400 font-bold">You haven't requested any quotations yet.</td>
                                        </tr>
                                    `}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        `;
    } catch (e) {
        container.innerHTML = `<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load quotations.</div>`;
    }
}

export async function viewQuotationDetails(id, appInstance) {
    const modal = document.createElement('div');
    modal.id = 'quotation-modal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto';
    
    try {
        const res = await fetch(appInstance.api(`api/quotations.php?id=${id}`));
        const data = await res.json();
        
        modal.innerHTML = `
            <div class="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in duration-300 my-8">
                <div class="p-10 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h2 class="text-2xl font-black text-slate-900">Quotation Details</h2>
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">#Q-${String(id).padStart(4, '0')} • Requested on ${new Date(data.created_at).toLocaleDateString()}</p>
                    </div>
                    <button onclick="document.getElementById('quotation-modal').remove()" class="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 flex items-center justify-center transition-all">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <div class="p-10 space-y-10">
                    <div class="overflow-hidden border border-slate-200 rounded-2xl">
                        <table class="w-full text-left">
                            <thead class="bg-slate-50">
                                <tr>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Spare Part</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Unit Price</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                ${data.items.map(item => `
                                    <tr>
                                        <td class="p-6">
                                            <div class="font-bold text-slate-900">${item.part_name}</div>
                                            <div class="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-0.5">${item.brand} • ${item.machine_model}</div>
                                        </td>
                                        <td class="p-6 text-sm font-bold text-slate-600">${item.quantity}</td>
                                        <td class="p-6 text-sm font-black text-slate-900 text-right">${item.unit_price ? `₹${parseFloat(item.unit_price).toLocaleString()}` : '<span class="text-slate-400 italic">Pending</span>'}</td>
                                        <td class="p-6 text-sm font-black text-slate-900 text-right">${item.unit_price ? `₹${(item.quantity * item.unit_price).toLocaleString()}` : '---'}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                            ${data.total_amount ? `
                                <tfoot class="bg-slate-50 font-black">
                                    <tr>
                                        <td colspan="3" class="p-6 text-right text-slate-400 uppercase tracking-widest text-xs">Total Amount</td>
                                        <td class="p-6 text-right text-2xl text-slate-900">₹${parseFloat(data.total_amount).toLocaleString()}</td>
                                    </tr>
                                </tfoot>
                            ` : ''}
                        </table>
                    </div>
                    
                    <div class="flex justify-end gap-4">
                        <button onclick="document.getElementById('quotation-modal').remove()" class="px-8 py-4 rounded-2xl border border-slate-200 text-slate-400 font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all">Close Details</button>
                        ${data.status === 'priced' ? `<button onclick="app.approveQuotation(${id})" class="px-10 py-4 rounded-2xl bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">Approve & Order</button>` : ''}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } catch (e) {
        appInstance.showToast('Failed to load quotation details', 'error');
    }
}

export async function approveQuotation(id, appInstance) {
    try {
        const res = await fetch(appInstance.api('api/quotations.php'), {
            method: 'PUT',
            body: JSON.stringify({ quotation_id: id, status: 'approved' })
        });
        const result = await res.json();
        if (result.success) {
            appInstance.showToast('Quotation approved. We will generate your invoice shortly.');
            const modal = document.getElementById('quotation-modal');
            if (modal) modal.remove();
            appInstance.renderQuotations(document.getElementById('view-container'));
        }
    } catch (e) {
        appInstance.showToast('Error approving quotation', 'error');
    }
}
