export async function renderInvoices(container, appInstance) {
    if (!appInstance.state.user) { history.pushState(null, null, appInstance.basePath + '/login'); appInstance.handleRouting(); return; }
    container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>`;
    
    try {
        const res = await fetch(appInstance.api('api/invoices.php'));
        const invoices = await res.json();
        
        container.innerHTML = `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${appInstance.getSidebar('invoices')}
                <main class="flex-1 p-8 lg:p-12">
                    <div class="max-w-6xl mx-auto space-y-12 animate-fade-in">
                        <div>
                            <div class="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Financial Records</div>
                            <h2 class="text-4xl font-black tracking-tight text-slate-900">Your <span class="text-emerald-600">Invoices</span></h2>
                            <p class="text-slate-500 font-medium mt-2">Official tax invoices for your approved procurement requests.</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            ${invoices.length ? invoices.map(inv => `
                                <div class="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 group">
                                    <div class="flex justify-between items-start">
                                        <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">${new Date(inv.created_at).toLocaleDateString()}</p>
                                            <p class="text-sm font-black text-slate-900">${inv.invoice_number}</p>
                                        </div>
                                    </div>
                                    <div class="space-y-4 pt-6 border-t border-slate-100">
                                        <div class="flex justify-between items-center">
                                            <span class="text-xs font-bold text-slate-400">Total Amount</span>
                                            <span class="text-xl font-black text-slate-900">₹${parseFloat(inv.total_amount).toLocaleString()}</span>
                                        </div>
                                        <button onclick="app.renderInvoiceDocument(${inv.id})" class="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/20">Download PDF</button>
                                    </div>
                                </div>
                            `).join('') : `
                                <div class="col-span-full bg-slate-50 border border-slate-100 rounded-3xl p-20 text-center text-slate-400 font-bold">No invoices generated yet.</div>
                            `}
                        </div>
                    </div>
                </main>
            </div>
        `;
    } catch (e) {
        container.innerHTML = `<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load invoices.</div>`;
    }
}

export async function renderInvoiceDocument(invoiceId, app) {
    const modal = document.createElement('div');
    modal.id = 'invoice-doc-modal';
    modal.className = 'fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-lg overflow-y-auto';
    
    try {
        const res = await fetch(app.api(`api/invoices.php?id=${invoiceId}`));
        const inv = await res.json();
        
        modal.innerHTML = `
            <div class="bg-white text-slate-900 w-full max-w-4xl min-h-[11in] p-16 shadow-2xl relative animate-in slide-in-from-bottom-8 duration-500 rounded-sm">
                <!-- Premium Header Ribbon -->
                <div class="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900"></div>
                
                <div class="flex justify-between items-start border-b-[3px] border-slate-900 pb-12 mt-4">
                    <div class="space-y-4">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center font-black text-2xl shadow-lg">P</div>
                            <h1 class="text-4xl font-black tracking-tighter uppercase">PARTS<span class="text-blue-600">PRO</span></h1>
                        </div>
                        <div class="text-[11px] font-black text-slate-500 space-y-1.5 uppercase tracking-[0.15em]">
                            <p>Industrial Area, Phase 2</p>
                            <p>New Delhi, 110020</p>
                            <p class="text-slate-900 mt-2">GSTIN: 07AAACT0000A1Z5</p>
                        </div>
                    </div>
                    <div class="text-right space-y-1">
                        <h2 class="text-6xl font-black text-slate-200 tracking-tighter uppercase opacity-50">Invoice</h2>
                        <p class="text-sm font-black text-slate-900">NO: ${inv.invoice_number}</p>
                        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-widest pt-2">Date: ${new Date(inv.created_at).toLocaleDateString()}</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-16 py-16">
                    <div>
                        <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Billed To:</p>
                        <div class="space-y-1">
                            <h3 class="text-xl font-black text-slate-900">${inv.user_name}</h3>
                            <p class="text-sm font-medium text-slate-500">${inv.user_email}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Payment Status:</p>
                        <span class="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">Payment on Delivery</span>
                    </div>
                </div>

                <div class="border-[1.5px] border-slate-900 rounded-xl overflow-hidden mb-12">
                    <table class="w-full text-left">
                        <thead class="bg-slate-900 text-white">
                            <tr>
                                <th class="p-5 text-[10px] font-black uppercase tracking-widest">Description</th>
                                <th class="p-5 text-[10px] font-black uppercase tracking-widest">Qty</th>
                                <th class="p-5 text-[10px] font-black uppercase tracking-widest text-right">Unit Price</th>
                                <th class="p-5 text-[10px] font-black uppercase tracking-widest text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${inv.items.map(item => `
                                <tr>
                                    <td class="p-6">
                                        <p class="font-black text-slate-900 text-sm">${item.part_name}</p>
                                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tight">${item.brand} • ${item.machine_model}</p>
                                    </td>
                                    <td class="p-6 text-sm font-bold text-slate-600">${item.quantity}</td>
                                    <td class="p-6 text-sm font-bold text-slate-900 text-right">₹${parseFloat(item.unit_price).toLocaleString()}</td>
                                    <td class="p-6 text-sm font-black text-slate-900 text-right">₹${(item.quantity * item.unit_price).toLocaleString()}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="flex justify-end border-t-[3px] border-slate-900 pt-8">
                    <div class="w-72 space-y-4">
                        <div class="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                            <span>Subtotal</span>
                            <span>₹${parseFloat(inv.total_amount).toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                            <span>GST (0%)</span>
                            <span>₹0.00</span>
                        </div>
                        <div class="flex justify-between items-center pt-4 border-t border-slate-100">
                            <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Total Payable</span>
                            <span class="text-3xl font-black text-slate-900">₹${parseFloat(inv.total_amount).toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div class="mt-24 pt-12 border-t border-slate-100 flex justify-between items-end no-print">
                    <div class="space-y-4">
                        <h4 class="text-xs font-black text-slate-900 uppercase tracking-widest">Authorised Signatory</h4>
                        <div class="w-48 h-px bg-slate-300"></div>
                        <p class="text-[10px] font-bold text-slate-400">PARTSPRO B2B Procurement Division</p>
                    </div>
                    <div class="flex gap-4">
                        <button onclick="window.print()" class="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                            Print Document
                        </button>
                        <button onclick="document.getElementById('invoice-doc-modal').remove()" class="px-8 py-3 bg-slate-50 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">Close Viewer</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    } catch (e) {
        app.showToast('Failed to load invoice details', 'error');
        modal.remove();
    }
}
