import { escapeHTML } from '../api.js';

export async function renderInvoices(container, appInstance) {
    if (!appInstance.state.user) { history.pushState(null, null, appInstance.basePath + '/login'); appInstance.handleRouting(); return; }
    container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>`;
    
    try {
        const res = await fetch(appInstance.api('api/invoices.php'));
        const invoices = await res.json();
        
        container.innerHTML = `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${appInstance.getSidebar('invoices')}
                <main class="flex-1 m-4 lg:m-6 p-6 lg:p-10 bg-white rounded-[2.5rem] shadow-sm border border-slate-200">
                    <div class="max-w-6xl mx-auto space-y-12 animate-fade-in">
                        <div>
                            <div class="text-[10px] font-black uppercase tracking-[0.3em] text-bosch-blue">Financial Records</div>
                            <h2 class="text-4xl font-black tracking-tight text-bosch-blue uppercase">Your <span class="text-bosch-blue">Invoices</span></h2>
                            <p class="text-slate-500 font-medium mt-2">Official tax invoices for your approved procurement requests.</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            ${invoices.length ? invoices.map(inv => `
                                <div class="bg-white border-2 border-slate-100 rounded-3xl p-8 space-y-6 hover:border-bosch-blue transition-all duration-500 group">
                                    <div class="flex justify-between items-start">
                                        <div class="w-14 h-14 rounded-2xl bg-industrial-gray text-white flex items-center justify-center group-hover:bg-bosch-blue transition-all">
                                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                        </div>
                                        <div class="text-right space-y-2">
                                            <span class="px-3 py-1 rounded-none border border-slate-200 text-[9px] font-black uppercase tracking-wider ${inv.status === 'processing' ? 'bg-amber-50 text-amber-600' : inv.status === 'dispatched' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}">
                                                ${escapeHTML(inv.status || 'processing')}
                                            </span>
                                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${new Date(inv.created_at).toLocaleDateString()}</p>
                                            <p class="text-sm font-black text-bosch-blue">${escapeHTML(inv.invoice_number)}</p>
                                        </div>
                                    </div>
                                    <div class="space-y-4 pt-6 border-t border-slate-100">
                                        ${inv.tracking_number ? `
                                            <div class="p-4 bg-slate-50 rounded-none border border-slate-100">
                                                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Tracking Number</p>
                                                <p class="text-xs font-black text-bosch-blue">${escapeHTML(inv.tracking_number)}</p>
                                            </div>
                                        ` : ''}
                                        <div class="flex justify-between items-center px-1">
                                            <span class="text-xs font-bold text-slate-400">Total Amount</span>
                                            <span class="text-xl font-black text-bosch-blue">₹${parseFloat(inv.total_amount).toLocaleString()}</span>
                                        </div>
                                        <button onclick="app.renderInvoiceDocument(${inv.id})" class="w-full py-4 bg-industrial-gray text-white rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-bosch-blue transition-all shadow-xl shadow-slate-900/20">View & Download</button>
                                    </div>
                                </div>
                            `).join('') : `
                                <div class="col-span-full bg-slate-50 border border-slate-100 rounded-none p-20 text-center text-slate-400 font-bold uppercase tracking-widest">No invoices generated yet.</div>
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
            <div id="invoice-printable-area" class="bg-white text-bosch-blue w-full max-w-4xl min-h-[11in] p-12 md:p-16 shadow-2xl relative animate-in slide-in-from-bottom-8 duration-500 rounded-3xl overflow-hidden mx-auto print:shadow-none print:p-0">
                
                <!-- Print-only watermark -->
                <div class="hidden print:flex absolute inset-0 items-center justify-center opacity-[0.03] pointer-events-none z-0">
                    <h1 class="text-[150px] font-black tracking-tighter uppercase transform -rotate-45">TORVO</h1>
                </div>

                <!-- Premium Header Ribbon -->
                <div class="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-industrial-gray via-bosch-blue to-bosch-red print:h-2"></div>
                
                <div class="relative z-10 flex flex-col md:flex-row justify-between items-start border-b-[3px] border-slate-900 pb-10 mt-6 print:mt-4 print:pb-8">
                    <div class="space-y-4">
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-14 bg-bosch-blue text-white rounded-2xl flex items-center justify-center font-black text-3xl shadow-lg print:shadow-none">T</div>
                            <h1 class="text-4xl font-black tracking-tighter uppercase text-bosch-blue">TOR<span class="text-bosch-red">VO</span></h1>
                        </div>
                        <div class="text-[10px] md:text-[11px] font-black text-slate-500 space-y-1.5 uppercase tracking-[0.15em] leading-relaxed">
                            <p>${escapeHTML(app.state.settings.contact_address || 'Phase 2, Industrial Estate, New Delhi')}</p>
                            <p>Support: ${escapeHTML(app.state.settings.contact_phone || '+91 70277 51544')}</p>
                            <p class="text-bosch-blue mt-2">GSTIN: <span class="font-bold">07AAACT0000A1Z5</span></p>
                        </div>
                    </div>
                    <div class="text-right space-y-2 mt-8 md:mt-0">
                        <h2 class="text-5xl md:text-6xl font-black text-slate-100 tracking-tighter uppercase print:text-slate-200">TAX INVOICE</h2>
                        <div class="inline-block bg-slate-50 border border-slate-200 rounded-none p-4 mt-2 print:border-none print:bg-transparent print:p-0">
                            <p class="text-sm font-black text-bosch-blue">INV #: <span class="text-bosch-blue">${escapeHTML(inv.invoice_number)}</span></p>
                            <p class="text-[11px] font-bold text-slate-500 uppercase tracking-widest pt-1">Date: ${new Date(inv.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 py-10 print:py-8">
                    <div>
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">Billed To:</p>
                        <div class="space-y-1">
                            <h3 class="text-xl font-black text-bosch-blue">${escapeHTML(inv.user_name)}</h3>
                            <p class="text-sm font-bold text-slate-500">${escapeHTML(inv.user_email)}</p>
                        </div>
                    </div>
                    <div class="md:text-right">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">Payment Info:</p>
                        <div class="space-y-2">
                            <span class="inline-block px-4 py-1.5 bg-industrial-gray text-white rounded-none text-[10px] font-black uppercase tracking-widest border border-bosch-blue print:bg-transparent print:border-slate-300 print:text-slate-800">Payment on Delivery</span>
                            <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest pt-1">Status: <span class="${inv.status === 'delivered' ? 'text-bosch-blue' : 'text-amber-600'}">${escapeHTML(inv.status)}</span></p>
                        </div>
                    </div>
                </div>

                <div class="relative z-10 border-[1.5px] border-slate-900 rounded-none overflow-hidden mb-10 print:border-slate-300">
                    <table class="w-full text-left">
                        <thead class="bg-slate-900 text-white print:bg-slate-100 print:text-bosch-blue print:border-b-2 print:border-slate-900">
                            <tr>
                                <th class="p-4 md:p-5 text-[10px] font-black uppercase tracking-widest">Description</th>
                                <th class="p-4 md:p-5 text-[10px] font-black uppercase tracking-widest text-center">Qty</th>
                                <th class="p-4 md:p-5 text-[10px] font-black uppercase tracking-widest text-right">Unit Price</th>
                                <th class="p-4 md:p-5 text-[10px] font-black uppercase tracking-widest text-right bg-slate-800 print:bg-slate-200">Total</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 print:divide-slate-300">
                            ${inv.items.map(item => `
                                <tr class="hover:bg-slate-50 print:hover:bg-transparent">
                                    <td class="p-4 md:p-6">
                                        <p class="font-black text-bosch-blue text-sm md:text-base">${escapeHTML(item.part_name)}</p>
                                        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-1">${escapeHTML(item.brand)} • ${escapeHTML(item.machine_model)}</p>
                                    </td>
                                    <td class="p-4 md:p-6 text-sm font-bold text-slate-700 text-center">${item.quantity}</td>
                                    <td class="p-4 md:p-6 text-sm font-bold text-slate-700 text-right">₹${parseFloat(item.unit_price).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    <td class="p-4 md:p-6 text-sm font-black text-bosch-blue text-right bg-slate-50/50 print:bg-transparent">₹${(item.quantity * item.unit_price).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="relative z-10 flex flex-col md:flex-row justify-between items-start border-t-[3px] border-slate-900 pt-8 mt-auto print:border-slate-300">
                    <div class="mb-8 md:mb-0 max-w-xs space-y-2">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Terms & Conditions:</p>
                        <p class="text-[9px] font-bold text-slate-500 leading-relaxed text-justify">All spare parts are subject to standard warranty conditions. Returns are accepted within 7 days of delivery if parts are unused and in original packaging. This is a computer generated invoice.</p>
                    </div>
                    <div class="w-full md:w-80 space-y-3 bg-slate-50 p-6 rounded-none border border-slate-200 print:border-none print:bg-transparent print:p-0">
                        <div class="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                            <span>Subtotal</span>
                            <span class="text-slate-700">₹${parseFloat(inv.total_amount).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                            <span>GST Included</span>
                            <span class="text-slate-700">₹0.00</span>
                        </div>
                        <div class="flex justify-between items-center pt-4 border-t-2 border-slate-200 print:border-slate-900">
                            <span class="text-sm font-black text-bosch-blue uppercase tracking-widest">Total Payable</span>
                            <span class="text-3xl font-black text-bosch-blue">₹${parseFloat(inv.total_amount).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        </div>
                    </div>
                </div>

                <div class="relative z-10 mt-16 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-end print:mt-12">
                    <div class="space-y-4 mb-8 md:mb-0">
                        <h4 class="text-[10px] font-black text-bosch-blue uppercase tracking-widest">Authorised Signatory</h4>
                        <div class="w-48 h-12 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNTAiPjxwYXRoIGQ9Ik0xMCAzMGMxMC01IDIwLTEwIDMwLTggMTAgMiAyMCAxMCAzMCA4IDEwLTIgMjAtMTAgMzAtMTAgMTAtMCAyMCA4IDMwIDggMTAgMCAyMC0xMCAzMC0xMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2I4MmY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==')] bg-no-repeat bg-contain opacity-60"></div>
                        <div class="w-48 h-[2px] bg-slate-800"></div>
                        <p class="text-[9px] font-black text-slate-500 uppercase tracking-widest">TORVO B2B Procurement</p>
                    </div>
                    <div class="flex gap-4 no-print w-full md:w-auto">
                        <button onclick="document.getElementById('invoice-doc-modal').remove()" class="flex-1 md:flex-none px-6 py-3.5 bg-slate-100 text-slate-500 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-slate-200 transition-all text-center">Close</button>
                        <button onclick="window.print()" class="flex-1 md:flex-none px-8 py-3.5 bg-bosch-blue text-white rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-industrial-gray hover:shadow-lg transition-all flex items-center justify-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                            Print Document
                        </button>
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
