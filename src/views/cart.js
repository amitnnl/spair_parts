export function renderCart(container, app) {
    if (app.state.cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-32 animate-in fade-in duration-500">
                <div class="w-24 h-24 bg-slate-100 rounded-none flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                </div>
                <h2 class="text-2xl font-black text-slate-900 mb-2">Your cart is empty</h2>
                <p class="text-slate-500 font-medium mb-8">Add spare parts to your cart to request a quotation.</p>
                <a href="/catalog" data-link class="px-8 py-3 bg-bosch-blue text-white rounded-none font-black text-xs uppercase tracking-widest hover:bg-industrial-gray transition-all shadow-lg shadow-slate-900/20">Browse Catalogue</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="max-w-4xl mx-auto py-8 px-4 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h2 class="text-3xl font-black text-slate-900 tracking-tight">Quotation Cart</h2>
                <p class="text-slate-500 mt-1 font-medium">Review and adjust items before submitting for pricing.</p>
            </div>

            <div class="bg-white rounded-none border-2 border-slate-100 shadow-sm overflow-hidden">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th class="p-6 text-xs font-black text-slate-500 uppercase tracking-widest">Spare Part Details</th>
                            <th class="p-6 text-xs font-black text-slate-500 uppercase tracking-widest">Quantity</th>
                            <th class="p-6 text-right text-xs font-black text-slate-500 uppercase tracking-widest">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${app.state.cart.map(item => `
                            <tr class="hover:bg-slate-50/50 transition-colors">
                                <td class="p-6">
                                    <div class="font-black text-slate-900 uppercase tracking-widest">${item.part_name}</div>
                                    <div class="text-xs text-slate-500 font-medium mt-0.5 uppercase tracking-widest">${item.brand} • ${item.machine_model}</div>
                                </td>
                                <td class="p-6">
                                    <div class="flex items-center gap-3">
                                        <input type="number" min="1" value="${item.quantity}" onchange="app.updateCartQty(${item.id}, this.value)" class="font-sans w-20 h-10 bg-slate-50 border border-slate-200 rounded-none px-3 text-sm font-medium text-sm-700 focus:outline-none focus:border-bosch-blue transition-all">
                                        <span class="text-xs font-black text-slate-500 uppercase tracking-widest">Units</span>
                                    </div>
                                </td>
                                <td class="p-6 text-right">
                                    <button onclick="app.removeFromCart(${item.id})" class="text-bosch-red hover:text-white p-2 hover:bg-bosch-red rounded-none transition-all">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-slate-200">
                <div class="flex items-center gap-4 text-slate-500">
                    <svg class="w-10 h-10 text-white bg-bosch-blue p-2 rounded-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <div>
                        <p class="text-xs font-black text-slate-900 uppercase tracking-widest">Standard Response Time: 24 Hours</p>
                        <p class="text-xs font-medium leading-tight">Our team will review your request and provide competitive B2B pricing via email.</p>
                    </div>
                </div>
                <button onclick="app.submitQuotation()" class="w-full md:w-auto h-14 px-12 rounded-none bg-bosch-blue text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-900/30 hover:bg-industrial-gray transition-all">
                    Submit RFQ Request
                </button>
            </div>
        </div>
    `;
}
