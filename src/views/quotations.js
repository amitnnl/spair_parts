import { escapeHTML, setHTML } from '../api.js';

export async function renderQuotations(container, appInstance) {
    if (!appInstance.state.user) { history.pushState(null, null, appInstance.basePath + '/login'); appInstance.handleRouting(); return; }
    
    // Robust role check
    const userRole = (appInstance.state.user.role || '').toLowerCase();
    const isAdmin = userRole === 'admin';
    
    console.log('Quotation View Access - Role:', userRole, 'IsAdmin:', isAdmin);
    setHTML(container, `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-bosch-blue border-t-transparent rounded-none"></div></div>`);
    
    try {
        const apiUrl = isAdmin ? 'api/admin_quotations.php' : 'api/quotations.php';
        const res = await fetch(appInstance.api(apiUrl));
        const quotations = await res.json();
        
        setHTML(container, `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${appInstance.getSidebar('quotations')}
                <main class="flex-1 m-4 lg:m-6 p-6 lg:p-10 bg-white rounded-[2.5rem] shadow-sm border border-slate-200">
                    <div class="max-w-6xl mx-auto space-y-12 animate-fade-in">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div>
                                <div class="text-xs font-black uppercase tracking-[0.3em] text-bosch-blue">${isAdmin ? 'Global Transaction Monitor' : 'Procurement History'}</div>
                                <h2 class="text-4xl font-black tracking-tight text-bosch-blue uppercase">${isAdmin ? 'All <span class="text-bosch-blue">Quotations</span>' : 'Your <span class="text-bosch-blue">Quotations</span>'}</h2>
                                <p class="text-slate-500 font-medium mt-2 text-lg">${isAdmin ? 'Manage and price all incoming partner requests.' : 'Track your request for quotes and approval statuses.'}</p>
                            </div>
                            ${!isAdmin ? `
                            <button onclick="app.renderCatalog(document.getElementById('view-container'))" class="btn btn-secondary rounded-none hover:border-bosch-blue hover:text-bosch-blue flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                                New Request
                            </button>
                            ` : ''}
                        </div>

                        <div class="table-container">
                            <table class="data-table w-full text-left">
                                <thead>
                                    <tr>
                                        <th>${isAdmin ? 'Partner / Date' : 'ID / Date'}</th>
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
                                                <div class="font-bold text-bosch-blue">${isAdmin ? escapeHTML(q.user_name) : `#Q-${String(q.id).padStart(4, '0')}`}</div>
                                                <div class="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">${new Date(q.created_at).toLocaleDateString()} ${isAdmin ? `• #Q-${String(q.id).padStart(4, '0')}` : ''}</div>
                                            </td>
                                            <td class="p-6 font-bold text-slate-600">${q.item_count || 0} Products</td>
                                            <td class="p-6">
                                                <span class="px-3 py-1 rounded-none text-xs font-black uppercase tracking-widest ${appInstance.getStatusClass(q.status)}">
                                                    ${escapeHTML(q.status)}
                                                </span>
                                            </td>
                                            <td class="p-6 font-black text-bosch-blue">
                                                ${q.status === 'pending' ? '<span class="text-slate-500 font-bold italic">Awaiting Pricing</span>' : `₹${parseFloat(q.total_amount || 0).toLocaleString()}`}
                                            </td>
                                            <td class="p-6 text-right">
                                                <div class="flex justify-end gap-3">
                                                    <button onclick="${isAdmin ? `app.renderProcessQuotation(${q.id})` : `app.viewQuotationDetails(${q.id})`}" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-none font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
                                                        ${isAdmin && q.status === 'pending' ? 'Process' : 'View'}
                                                    </button>
                                                    ${!isAdmin && q.status === 'pending' ? '<button onclick="app.editQuotation(' + q.id + ')" class="px-4 py-2 bg-amber-50 text-amber-600 rounded-none font-black text-xs uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all">Edit</button>' : ''}
                                                    ${(!isAdmin && q.status === 'priced' ? '<button onclick="app.approveQuotation(' + q.id + ')" class="px-4 py-2 bg-bosch-blue text-white rounded-none font-black text-xs uppercase tracking-widest hover:bg-industrial-gray transition-all shadow-lg shadow-slate-900/20">Approve</button>' : '')}
                                                </div>
                                            </td>
                                        </tr>
                                    `).join('') : (
                                        '<tr>' +
                                            '<td colspan="5" class="p-20 text-center text-slate-500 font-bold">' + (isAdmin ? 'No partner requests found.' : "You haven't requested any quotations yet.") + '</td>' +
                                        '</tr>'
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        `);
    } catch (e) {
        setHTML(container, `<div class="bg-rose-50 border border-rose-100 rounded-none p-12 text-center text-rose-500 font-bold">Failed to load quotations.</div>`);
    }
}

export async function viewQuotationDetails(id, appInstance) {
    const modal = document.createElement('div');
    modal.id = 'quotation-modal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto';
    
    try {
        const res = await fetch(appInstance.api(`api/quotations.php?id=${id}`));
        const data = await res.json();
        
        setHTML(modal, `
            <div class="bg-white w-full max-w-4xl rounded-none border-2 border-slate-100 shadow-premium overflow-hidden relative animate-in zoom-in duration-300 my-8">
                <div class="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div>
                        <h2 class="text-2xl font-black text-bosch-blue uppercase">Quotation Details</h2>
                        <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">#Q-${String(id).padStart(4, '0')} • Requested on ${new Date(data.created_at).toLocaleDateString()}</p>
                    </div>
                    <button onclick="document.getElementById('quotation-modal').remove()" class="w-12 h-12 rounded-none border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 hover:text-bosch-blue flex items-center justify-center transition-all">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <div class="p-10 space-y-10">
                    <div class="overflow-hidden border border-slate-200 rounded-none">
                        <table class="w-full text-left">
                            <thead class="bg-slate-50">
                                <tr>
                                    <th class="p-6 text-xs font-black text-slate-500 uppercase tracking-widest">Spare Part</th>
                                    <th class="p-6 text-xs font-black text-slate-500 uppercase tracking-widest">Qty</th>
                                    <th class="p-6 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Unit Price</th>
                                    <th class="p-6 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                ${data.items.map(item => 
                                    '<tr>' +
                                        '<td class="p-6">' +
                                            '<div class="font-bold text-bosch-blue">' + escapeHTML(item.part_name) + '</div>' +
                                            '<div class="text-xs text-slate-500 font-bold uppercase tracking-tight mt-0.5">' + escapeHTML(item.brand) + ' • ' + escapeHTML(item.machine_model) + '</div>' +
                                        '</td>' +
                                        '<td class="p-6 text-sm font-bold text-slate-600">' + escapeHTML(String(item.quantity)) + '</td>' +
                                        '<td class="p-6 text-sm font-black text-bosch-blue text-right">' + (item.unit_price ? '₹' + escapeHTML(parseFloat(item.unit_price).toLocaleString()) : '<span class="text-slate-500 italic">Pending</span>') + '</td>' +
                                        '<td class="p-6 text-sm font-black text-bosch-blue text-right">' + (item.unit_price ? '₹' + escapeHTML((item.quantity * item.unit_price).toLocaleString()) : '---') + '</td>' +
                                    '</tr>'
                                ).join('')}
                            </tbody>
                            ${data.total_amount ? (
                                '<tfoot class="bg-slate-50 font-black">' +
                                    '<tr>' +
                                        '<td colspan="3" class="p-6 text-right text-slate-500 uppercase tracking-widest text-xs">Total Amount</td>' +
                                        '<td class="p-6 text-right text-2xl text-bosch-blue">₹' + escapeHTML(parseFloat(data.total_amount).toLocaleString()) + '</td>' +
                                    '</tr>' +
                                '</tfoot>'
                            ) : ''}
                        </table>
                    </div>
                    
                    <div class="flex justify-end gap-4">
                        <button onclick="document.getElementById('quotation-modal').remove()" class="px-8 py-4 rounded-none border border-slate-200 text-slate-500 font-black text-xs uppercase tracking-widest hover:bg-slate-50 hover:text-bosch-blue transition-all">Close Details</button>
                        ${data.status === 'priced' ? '<button onclick="app.approveQuotation(' + id + ')" class="px-10 py-4 rounded-none bg-bosch-blue text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-industrial-gray transition-all">Approve & Order</button>' : ''}
                    </div>
                </div>
            </div>
        `);
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
