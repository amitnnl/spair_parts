export async function renderAdmin(container, app) {
    const userRole = (app.state.user && app.state.user.role) ? app.state.user.role.toLowerCase() : '';
    if (userRole !== 'admin') {
        app.showToast('Administrative privileges required', 'error');
        history.pushState(null, null, app.basePath + '/login');
        app.handleRouting();
        return;
    }

    container.innerHTML = `
        <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
            ${app.getSidebar('admin')}

            <main class="flex-1 p-8 lg:p-12 space-y-12">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h2 class="text-4xl font-black text-slate-900 tracking-tight">Executive <span class="text-blue-600">Dashboard</span></h2>
                        <p class="text-slate-500 mt-2 font-bold text-lg">Platform status and procurement oversight.</p>
                    </div>
                    <button onclick="app.printAdminReport()" class="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        Generate Report
                    </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${[
                        { l:'Active Quotations', v:'--', id:'stat-active-quotations', c:'blue' },
                        { l:'Total Partners', v:'--', id:'stat-total-partners', c:'indigo' },
                        { l:'Inventory SKUs', v:'--', id:'stat-total-skus', c:'emerald' },
                        { l:'Monthly Revenue', v:'₹0', id:'stat-revenue', c:'rose' }
                    ].map(s => `
                        <div class="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 hover:shadow-2xl hover:shadow-blue-900/5 transition-all">
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${s.l}</p>
                            <h3 class="text-3xl font-black text-slate-900" id="${s.id}">${s.v}</h3>
                            <div class="w-full h-1 bg-${s.c}-100 rounded-full overflow-hidden">
                                <div class="w-1/3 h-full bg-${s.c}-600"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="space-y-8">
                    <div class="flex items-center gap-4">
                        <div class="w-2 h-8 bg-blue-600 rounded-full"></div>
                        <h3 class="text-xl font-black text-slate-900 tracking-tight">Pending Procurements</h3>
                    </div>
                    <div id="admin-quotation-list" class="grid grid-cols-1 gap-4">
                        <div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>
                    </div>
                </div>
            </main>
        </div>
    `;
    
    app.loadAdminStats();
    app.loadAdminQuotations();
}

export async function loadAdminStats(app) {
    try {
        const res = await fetch(app.api('api/admin_stats.php'));
        const stats = await res.json();
        if (document.getElementById('stat-active-quotations')) document.getElementById('stat-active-quotations').textContent = stats.active_quotations;
        if (document.getElementById('stat-total-partners')) document.getElementById('stat-total-partners').textContent = stats.total_partners;
        if (document.getElementById('stat-total-skus')) document.getElementById('stat-total-skus').textContent = stats.total_skus;
        if (document.getElementById('stat-revenue')) document.getElementById('stat-revenue').textContent = '₹' + parseFloat(stats.total_revenue || 0).toLocaleString();
    } catch (e) {
        console.error('Failed to load admin stats', e);
    }
}

export async function loadAdminQuotations(app) {
    const list = document.getElementById('admin-quotation-list');
    if (!list) return;
    try {
        const res = await fetch(app.api('api/admin_quotations.php'));
        const quotations = await res.json();
        
        list.innerHTML = quotations.length ? quotations.map(q => `
            <div class="bg-white border border-slate-200 rounded-3xl p-6 flex justify-between items-center hover:shadow-xl hover:shadow-blue-900/5 transition-all">
                <div>
                    <div class="font-black text-slate-900">${q.user_name}</div>
                    <div class="text-[11px] text-slate-500 font-medium mt-1">${q.user_email} • ${new Date(q.created_at).toLocaleString()}</div>
                </div>
                <div class="flex items-center gap-6">
                    <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${app.getStatusClass(q.status)}">
                        ${q.status}
                    </span>
                    ${q.status === 'pending' ? `<button onclick="app.renderProcessQuotation(${q.id})" class="px-5 py-2 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">Process</button>` : ''}
                    ${q.status === 'approved' ? `<button onclick="app.generateInvoice(${q.id})" class="px-5 py-2 rounded-xl bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all">Generate Invoice</button>` : ''}
                </div>
            </div>
        `).join('') : '<div class="bg-slate-50 border border-slate-100 rounded-3xl p-12 text-center text-slate-400 font-bold">No pending requests</div>';
    } catch (e) {
        list.innerHTML = '<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load requests</div>';
    }
}

export async function renderAdminInventory(container, app) {
    container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>`;
    
    try {
        const res = await fetch(app.api('api/products.php'));
        const { products } = await res.json();
        app.state.products = products;
        
        container.innerHTML = `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${app.getSidebar('inventory')}

                <main class="flex-1 p-8 lg:p-12 space-y-12">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h2 class="text-4xl font-black text-slate-900 tracking-tight">Inventory <span class="text-blue-600">Warehouse</span></h2>
                            <p class="text-slate-500 mt-2 font-bold text-lg">Real-time stock monitoring and fitment management.</p>
                        </div>
                        <div class="flex gap-4 no-print">
                            <button onclick="app.renderImportModal()" class="px-6 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
                                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                Bulk Import
                            </button>
                            <button onclick="app.renderAddProductForm()" class="px-6 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2 hover:-translate-y-1">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                                Add Product
                            </button>
                        </div>
                    </div>

                    <div class="bg-white rounded-[32px] border border-slate-200 p-4 flex gap-4 shadow-sm">
                        <div class="relative flex-grow">
                            <input type="text" id="inventory-search" oninput="app.filterInventory()" class="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-14 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" placeholder="Search by Part Name, Brand, or Machine Model...">
                            <svg class="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/40">
                        <table class="w-full text-left border-collapse">
                            <thead class="bg-slate-50/80 border-b border-slate-200">
                                <tr>
                                    <th class="p-6 pl-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product & Fitment</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Status</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin Cost</th>
                                    <th class="p-6 pr-8 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="inventory-table-body" class="divide-y divide-slate-100 bg-white">
                                ${products.map(p => createInventoryRow(p, app)).join('')}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        `;
    } catch (e) {
        container.innerHTML = `<div class="bg-rose-50 border border-rose-100 rounded-3xl p-20 text-center text-rose-500 font-bold">Error loading warehouse data.</div>`;
    }
}

export function filterInventory() {
    const query = (document.getElementById('inventory-search')?.value || '').toLowerCase();
    const rows = document.querySelectorAll('#inventory-table-body tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
}

function createInventoryRow(p, app) {
    const isLowStock = (p.stock_quantity || 0) < 5;
    return `
        <tr class="hover:bg-slate-50/80 transition-all group">
            <td class="p-6 pl-8">
                <div class="flex items-center gap-5">
                    <div class="relative">
                        <img src="${app.cleanImageUrl(p.photo, p.part_name)}" class="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-sm group-hover:scale-105 transition-transform">
                        ${isLowStock ? '<span class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 rounded-full border-2 border-white animate-bounce"></span>' : ''}
                    </div>
                    <div>
                        <span class="font-black block text-slate-900 text-sm mb-0.5">${p.part_name}</span>
                        <span class="text-[10px] text-slate-500 uppercase font-black tracking-widest bg-slate-100 px-2 py-0.5 rounded-md inline-block">${p.machine_model || 'Universal'}</span>
                    </div>
                </div>
            </td>
            <td class="p-6">
                <span class="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">${p.brand}</span>
            </td>
            <td class="p-6">
                <div class="space-y-2">
                    <span class="text-[11px] font-black uppercase tracking-widest ${isLowStock ? 'text-rose-600' : 'text-emerald-600'}">${p.stock_quantity || 0} Units in Reserve</span>
                    <div class="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full rounded-full ${isLowStock ? 'bg-gradient-to-r from-rose-500 to-rose-400' : 'bg-gradient-to-r from-emerald-500 to-emerald-400'}" style="width: ${Math.min((p.stock_quantity || 0) * 5, 100)}%"></div>
                    </div>
                </div>
            </td>
            <td class="p-6 font-black text-slate-900 text-sm">₹${p.cost || '0.00'}</td>
            <td class="p-6 pr-8 text-right">
                <div class="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onclick="app.renderEditProductForm(${p.id})" class="p-3 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 hover:shadow-lg transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                    <button onclick="app.deleteProduct(${p.id})" class="p-3 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 hover:shadow-lg transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

export async function renderAdminUsers(container, app) {
    if (!app.state.user || app.state.user.role !== 'admin') return;
    
    container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>`;
    
    try {
        const res = await fetch(app.api('api/admin_users.php'));
        const users = await res.json();
        
        container.innerHTML = `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${app.getSidebar('partners')}

                <main class="flex-1 p-8 lg:p-12 space-y-12">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h2 class="text-4xl font-black text-slate-900 tracking-tight">Partner <span class="text-blue-600">Management</span></h2>
                            <p class="text-slate-500 mt-2 font-bold text-lg">Manage B2B client access and custom discount tiers.</p>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/40 animate-in fade-in duration-500">
                        <table class="w-full text-left border-collapse">
                            <thead class="bg-slate-50/80 border-b border-slate-200">
                                <tr>
                                    <th class="p-6 pl-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Partner Details</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Discount Tier</th>
                                    <th class="p-6 pr-8 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 bg-white">
                                ${users.map(u => `
                                    <tr class="hover:bg-slate-50/80 transition-all group">
                                        <td class="p-6 pl-8">
                                            <div class="flex items-center gap-4">
                                                <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl shadow-sm border border-blue-100">${u.name.charAt(0).toUpperCase()}</div>
                                                <div>
                                                    <span class="font-black block text-slate-900 text-sm mb-0.5">${u.name}</span>
                                                    <span class="text-[10px] text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-md inline-block">${u.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="p-6">
                                            <select onchange="app.updateUser(${u.id}, 'status', this.value)" class="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-black uppercase tracking-widest ${u.status === 'active' ? 'text-emerald-600 border-emerald-200 focus:ring-emerald-500/20' : (u.status === 'pending' ? 'text-amber-600 border-amber-200 focus:ring-amber-500/20' : 'text-rose-600 border-rose-200 focus:ring-rose-500/20')} focus:outline-none focus:ring-4 transition-all">
                                                <option value="pending" ${u.status === 'pending' ? 'selected' : ''}>Pending</option>
                                                <option value="active" ${u.status === 'active' ? 'selected' : ''}>Active</option>
                                                <option value="suspended" ${u.status === 'suspended' ? 'selected' : ''}>Suspended</option>
                                            </select>
                                        </td>
                                        <td class="p-6">
                                            <div class="flex items-center gap-2">
                                                <input type="number" step="0.1" value="${u.discount_tier || 0}" id="discount_${u.id}" class="w-20 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-black text-blue-600 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                                                <span class="text-slate-400 font-bold text-sm">%</span>
                                            </div>
                                        </td>
                                        <td class="p-6 pr-8 text-right">
                                            <button onclick="app.updateUser(${u.id}, 'discount_tier', document.getElementById('discount_${u.id}').value)" class="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-md shadow-slate-900/20">Save Tier</button>
                                        </td>
                                    </tr>
                                `).join('')}
                                ${users.length === 0 ? `<tr><td colspan="4" class="p-8 text-center text-slate-500 font-bold">No partners found.</td></tr>` : ''}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        `;
    } catch (e) {
        container.innerHTML = `<div class="p-20 text-center text-rose-500 font-bold">Error loading partners.</div>`;
    }
}

export async function renderProcessQuotation(quotationId, app) {
    const modal = document.createElement('div');
    modal.id = 'process-modal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto';
    
    const res = await fetch(app.api('api/admin_quotations.php'));
    const all = await res.json();
    const q = all.find(item => item.id == quotationId);
    
    const itemRes = await fetch(app.api(`api/admin_quotations.php?id=${quotationId}`));
    const data = await itemRes.json();
    const details = data.items;
    const discountTier = parseFloat(data.discount_tier || 0);
    
    modal.innerHTML = `
        <div class="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in duration-300 my-8">
            <div class="bg-slate-900 p-8 text-white flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-black tracking-tight">Process Quotation</h2>
                    <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Request from ${q.user_name} (#Q-${String(q.id).padStart(4, '0')})</p>
                </div>
                <button onclick="document.getElementById('process-modal').remove()" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <div class="p-8 space-y-8">
                <div class="flex flex-wrap gap-4">
                    <div class="flex-1 min-w-[200px] p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                        <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Partner Tier</p>
                        <h4 class="text-xl font-black text-slate-900">${discountTier}% Automatic Discount</h4>
                    </div>
                    <div class="flex-1 min-w-[200px] p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Status</p>
                        <h4 class="text-xl font-black text-amber-600 uppercase">${q.status}</h4>
                    </div>
                </div>
                
                <form id="price-quotation-form" class="space-y-8">
                    <div class="border border-slate-200 rounded-2xl overflow-hidden">
                        <table class="w-full text-left">
                            <thead class="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Spare Part Detail</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">MSRP (₹)</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Final Unit Price (₹)</th>
                                    <th class="p-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                ${details.map(item => `
                                    <tr class="group">
                                        <td class="p-6">
                                            <div class="font-bold text-slate-900">${item.part_name}</div>
                                            <div class="text-[10px] text-slate-500 uppercase font-black tracking-tighter mt-0.5">${item.brand} • ${item.machine_model}</div>
                                        </td>
                                        <td class="p-6 text-slate-600 font-black">${item.quantity}</td>
                                        <td class="p-6 text-slate-400 font-bold text-sm">₹${item.cost || '0.00'}</td>
                                        <td class="p-6">
                                            <div class="flex items-center gap-2">
                                                <input type="number" name="price_${item.id}" data-item-id="${item.id}" data-qty="${item.quantity}" data-msrp="${item.cost || 0}" step="0.01" value="${item.unit_price || ''}" required class="w-28 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-black text-blue-600 focus:outline-none focus:border-blue-500 transition-all unit-price-input">
                                                <button type="button" onclick="app.applyDiscountToItem(this, ${discountTier})" class="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                                </button>
                                            </div>
                                        </td>
                                        <td class="p-6 text-right font-black text-blue-600 subtotal-cell">₹${(item.quantity * (item.unit_price || 0)).toFixed(2)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                            <tfoot class="bg-slate-50 border-t border-slate-200">
                                <tr>
                                    <td colspan="4" class="p-8 text-right font-black text-slate-400 uppercase tracking-widest text-xs">Total Quotation Value:</td>
                                    <td class="p-8 text-right font-black text-3xl text-slate-900" id="quotation-total-display">₹0.00</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    
                    <div class="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
                        <button type="button" onclick="app.applyDiscountToAll(${discountTier})" class="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-all font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-600/20">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            Apply Partner Discount to All
                        </button>
                        <div class="flex gap-4 w-full md:w-auto">
                            <button type="button" onclick="document.getElementById('process-modal').remove()" class="px-8 py-3.5 rounded-2xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all font-black text-[11px] uppercase tracking-widest">Cancel</button>
                            <button type="submit" class="px-10 py-3.5 rounded-2xl bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-[1.02] transition-all">Publish & Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.querySelectorAll('.unit-price-input').forEach(input => {
        input.oninput = () => updateQuotationTotals();
    });
    updateQuotationTotals();
    
    document.getElementById('price-quotation-form').onsubmit = async (e) => {
        e.preventDefault();
        const items = Array.from(document.querySelectorAll('.unit-price-input')).map(input => ({
            item_id: input.dataset.itemId,
            unit_price: input.value
        }));
        
        const res = await fetch(app.api('api/admin_quotations.php'), {
            method: 'PUT',
            body: JSON.stringify({ quotation_id: quotationId, items })
        });
        const result = await res.json();
        if (result.success) {
            app.showToast('Quotation priced and sent successfully!');
            modal.remove();
            app.loadAdminQuotations();
        } else {
            app.showToast(result.error, 'error');
        }
    };
}

export function applyDiscountToItem(btn, discount) {
    const input = btn.closest('.flex').querySelector('input');
    const msrp = parseFloat(input.dataset.msrp);
    const discounted = msrp * (1 - (discount / 100));
    input.value = discounted.toFixed(2);
    updateQuotationTotals();
}

export function applyDiscountToAll(discount) {
    document.querySelectorAll('.unit-price-input').forEach(input => {
        const msrp = parseFloat(input.dataset.msrp);
        const discounted = msrp * (1 - (discount / 100));
        input.value = discounted.toFixed(2);
    });
    updateQuotationTotals();
}

export function updateQuotationTotals() {
    let total = 0;
    document.querySelectorAll('.unit-price-input').forEach(input => {
        const qty = parseFloat(input.dataset.qty);
        const price = parseFloat(input.value) || 0;
        const subtotal = qty * price;
        const row = input.closest('tr');
        if (row) row.querySelector('.subtotal-cell').textContent = `₹${subtotal.toFixed(2)}`;
        total += subtotal;
    });
    const display = document.getElementById('quotation-total-display');
    if (display) display.textContent = `₹${total.toFixed(2)}`;
}

export async function generateInvoice(quotationId, app) {
    try {
        const res = await fetch(app.api('api/invoices.php'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quotation_id: quotationId })
        });
        const result = await res.json();
        if (result.success) {
            app.showToast('Invoice generated successfully!');
            app.loadAdminQuotations();
        } else {
            app.showToast(result.error, 'error');
        }
    } catch (e) {
        app.showToast('Failed to generate invoice', 'error');
    }
}

export async function updateUser(id, field, value, app) {
    try {
        const payload = { id: id };
        payload[field] = value;
        
        const res = await fetch(app.api('api/admin_users.php'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await res.json();
        
        if (result.success) {
            app.showToast('Partner updated successfully');
        } else {
            app.showToast(result.error || 'Update failed', 'error');
        }
    } catch (e) {
        app.showToast('Failed to update partner', 'error');
    }
}


export async function renderSystemSettings(container, app) {
    if (!app.state.user || !app.state.user.role || app.state.user.role.toLowerCase() !== 'admin') {
        app.showToast('Access restricted to administrators', 'error');
        return;
    }
    container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>`;

    try {
        const res = await fetch(app.api('api/admin_settings.php'), { credentials: 'include' });
        const s = await res.json();

        const field = (label, name, val, type = 'text', placeholder = '', extra = '') => `
            <div class="space-y-2 ${extra}">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">${label}</label>
                <input type="${type}" name="${name}" value="${val || ''}" placeholder="${placeholder}"
                    class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
            </div>`;

        const textarea = (label, name, val, extra = '') => `
            <div class="space-y-2 ${extra}">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">${label}</label>
                <textarea name="${name}" rows="3"
                    class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none">${val || ''}</textarea>
            </div>`;

        const imgField = (label, name, current) => `
            <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">${label}</label>
                <div class="flex items-center gap-4">
                    <input type="file" name="${name}" accept="image/*"
                        class="flex-1 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold text-slate-500 focus:outline-none hover:border-blue-400 transition-all cursor-pointer">
                    ${current
                        ? `<img src="${app.api(current)}" class="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md flex-shrink-0">`
                        : `<div class="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex-shrink-0 flex items-center justify-center text-slate-300">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                           </div>`}
                </div>
            </div>`;

        const tabs = [
            { id: 'general', label: '⚙️ General' },
            { id: 'home', label: '🏠 Home Page' },
            { id: 'brands', label: '🏷️ Brands' },
            { id: 'categories', label: '📂 Categories' },
            { id: 'support', label: '💬 Support' },
            { id: 'footer', label: '📋 Footer' },
        ];

        container.innerHTML = `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${app.getSidebar('settings')}
                <main class="flex-1 p-6 lg:p-10 overflow-x-hidden">
                    <div class="max-w-5xl mx-auto">
                        <div class="mb-8">
                            <h2 class="text-3xl font-black text-slate-900">Website <span class="text-blue-600">Control Center</span></h2>
                            <p class="text-slate-500 font-medium mt-1">Edit every page, image, and text on your live website from here.</p>
                        </div>

                        <!-- Tab Nav -->
                        <div class="flex gap-2 mb-8 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
                            ${tabs.map((tab, i) => `
                                <button type="button" onclick="window.switchCMSTab('${tab.id}')" id="tab-btn-${tab.id}"
                                    class="cms-tab-btn flex-shrink-0 px-5 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${i === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}">
                                    ${tab.label}
                                </button>
                            `).join('')}
                        </div>

                        <form id="cms-form" enctype="multipart/form-data">

                            <!-- GENERAL -->
                            <div id="cms-tab-general" class="cms-tab-panel space-y-6 bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
                                <div class="pb-6 border-b border-slate-100 mb-6">
                                    <h3 class="text-xl font-black text-slate-900">General Settings</h3>
                                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Site identity, pricing & contact info</p>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    ${field('Platform / Site Name', 'site_name', s.site_name, 'text', 'PARTSPRO')}
                                    ${field('Currency Symbol', 'currency', s.currency, 'text', '₹')}
                                    ${field('Tax Rate (%)', 'tax_percent', s.tax_percent, 'number', '18')}
                                    ${field('Support Email', 'contact_email', s.contact_email, 'email', 'support@partspro.in')}
                                    ${field('Contact Phone', 'contact_phone', s.contact_phone, 'text', '+91 70277 51544')}
                                    ${field('Footer Tagline', 'footer_desc', s.footer_desc, 'text', 'The premium B2B platform...')}
                                    ${textarea('Corporate Address', 'contact_address', s.contact_address, 'md:col-span-2')}
                                    ${field('Copyright Text', 'footer_copyright', s.footer_copyright, 'text', '© 2026 PARTSPRO B2B Division.')}
                                </div>
                            </div>

                            <!-- HOME PAGE -->
                            <div id="cms-tab-home" class="cms-tab-panel space-y-6 hidden">
                                <div class="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                                    <div class="pb-6 border-b border-slate-100">
                                        <h3 class="text-xl font-black text-slate-900">Hero Section</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Main banner headline, subtitle, background image</p>
                                    </div>
                                    <div class="grid grid-cols-1 gap-5">
                                        ${field('Hero Headline', 'hero_title', s.hero_title, 'text', 'THE RIGHT PART. EVERY TIME.')}
                                        ${textarea('Hero Subtitle', 'hero_subtitle', s.hero_subtitle)}
                                        <div class="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hero Slider Images</span>
                                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                ${imgField('Hero Image 1', 'hero_image', s.hero_image)}
                                                ${imgField('Hero Image 2', 'hero_image_2', s.hero_image_2)}
                                                ${imgField('Hero Image 3', 'hero_image_3', s.hero_image_3)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- BRANDS PAGE -->
                            <div id="cms-tab-brands" class="cms-tab-panel space-y-6 hidden">
                                <div class="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                                    <div class="pb-6 border-b border-slate-100">
                                        <h3 class="text-xl font-black text-slate-900">Brands Page</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Page heading and 6 brand cards</p>
                                    </div>
                                    <div class="grid grid-cols-1 gap-4">
                                        ${field('Page Heading', 'brands_title', s.brands_title, 'text', 'Our Trusted Brands')}
                                        ${textarea('Page Subtitle', 'brands_subtitle', s.brands_subtitle)}
                                    </div>
                                    ${['Bosch', 'Makita', 'DeWalt', 'Hikoki', 'Milwaukee', 'Hilti'].map((bn, i) => {
                                        const n = i + 1;
                                        return `
                                        <div class="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                                            <span class="inline-block px-3 py-1 rounded-lg bg-rose-100 text-rose-700 text-[10px] font-black uppercase tracking-widest">Brand ${n} — Default: ${bn}</span>
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                ${field('Brand Name', 'brand' + n + '_name', s['brand' + n + '_name'], 'text', bn)}
                                                ${field('Tag / Specialty', 'brand' + n + '_tag', s['brand' + n + '_tag'], 'text', 'Power Tools')}
                                                ${textarea('Short Description', 'brand' + n + '_desc', s['brand' + n + '_desc'])}
                                                ${imgField('Brand Logo', 'brand' + n + '_logo', s['brand' + n + '_logo'])}
                                            </div>
                                        </div>`;
                                    }).join('')}
                                </div>
                            </div>

                            <!-- CATEGORIES PAGE -->
                            <div id="cms-tab-categories" class="cms-tab-panel space-y-6 hidden">
                                <div class="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                                    <div class="pb-6 border-b border-slate-100">
                                        <h3 class="text-xl font-black text-slate-900">Categories Page</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Page heading and 4 category cards</p>
                                    </div>
                                    <div class="grid grid-cols-1 gap-4">
                                        ${field('Page Heading', 'cats_page_title', s.cats_page_title, 'text', 'Core Categories')}
                                        ${textarea('Page Subtitle', 'cats_page_subtitle', s.cats_page_subtitle)}
                                    </div>
                                    <div class="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-sm text-amber-700 font-bold">
                                        ℹ️ Category cards below are shared with the Home Page panels — editing here updates both places.
                                    </div>
                                    ${[1,2,3,4].map(n => `
                                        <div class="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                                            <span class="inline-block px-3 py-1 rounded-lg bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest">Category ${n}</span>
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                ${field('Title', 'cat' + n + '_title', s['cat' + n + '_title'])}
                                                ${imgField('Card Image', 'cat' + n + '_img', s['cat' + n + '_img'])}
                                                ${textarea('Description', 'cat' + n + '_desc', s['cat' + n + '_desc'], 'md:col-span-2')}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- SUPPORT PAGE -->
                            <div id="cms-tab-support" class="cms-tab-panel space-y-6 hidden">
                                <div class="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                                    <div class="pb-6 border-b border-slate-100">
                                        <h3 class="text-xl font-black text-slate-900">Support Page</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Page heading, description and contact info cards</p>
                                    </div>
                                    <div class="grid grid-cols-1 gap-4">
                                        ${field('Page Heading', 'support_title', s.support_title, 'text', 'Expert Support Center')}
                                        ${textarea('Page Subtitle / Description', 'support_subtitle', s.support_subtitle)}
                                        ${field('Form Submit Button Text', 'support_form_cta', s.support_form_cta, 'text', 'Submit Technical Ticket')}
                                    </div>
                                    <div class="p-5 bg-green-50 border border-green-100 rounded-2xl space-y-4">
                                        <span class="text-xs font-black text-green-700 uppercase tracking-widest">Contact Cards (auto-pulled from General Settings)</span>
                                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            ${field('Email', 'contact_email', s.contact_email, 'email')}
                                            ${field('Phone', 'contact_phone', s.contact_phone)}
                                            ${textarea('Address', 'contact_address', s.contact_address)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- FOOTER -->
                            <div id="cms-tab-footer" class="cms-tab-panel space-y-6 hidden">
                                <div class="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                                    <div class="pb-6 border-b border-slate-100">
                                        <h3 class="text-xl font-black text-slate-900">Footer Content</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Tagline, address, email and copyright text</p>
                                    </div>
                                    <div class="grid grid-cols-1 gap-4">
                                        ${field('Footer Brand Tagline', 'footer_desc', s.footer_desc, 'text', 'The premium B2B platform for genuine power tool spare parts.')}
                                        ${field('Footer Email', 'contact_email', s.contact_email, 'email')}
                                        ${textarea('Footer Address', 'contact_address', s.contact_address)}
                                        ${field('Copyright Text', 'footer_copyright', s.footer_copyright, 'text', '© 2026 PARTSPRO B2B Division. All rights reserved.')}
                                    </div>
                                </div>
                            </div>

                            <!-- Save -->
                            <div class="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                                <button type="button" onclick="app.renderAdmin(document.getElementById('view-container'))"
                                    class="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-white border border-slate-200 transition-all">
                                    Cancel
                                </button>
                                <button type="submit" id="cms-save-btn"
                                    class="px-10 py-4 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:-translate-y-0.5 hover:bg-blue-700 transition-all flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                                    Save All Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        `;

        window.switchCMSTab = (tabId) => {
            document.querySelectorAll('.cms-tab-panel').forEach(p => p.classList.add('hidden'));
            document.querySelectorAll('.cms-tab-btn').forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-600/30');
                b.classList.add('text-slate-500');
            });
            document.getElementById('cms-tab-' + tabId)?.classList.remove('hidden');
            const ab = document.getElementById('tab-btn-' + tabId);
            if (ab) { ab.classList.add('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-600/30'); ab.classList.remove('text-slate-500'); }
        };

        document.getElementById('cms-form').onsubmit = async (e) => {
            e.preventDefault();
            const btn = document.getElementById('cms-save-btn');
            btn.textContent = 'Saving…';
            btn.disabled = true;
            try {
                const r = await fetch(app.api('api/admin_settings.php'), { 
                    method: 'POST', 
                    body: new FormData(e.target),
                    credentials: 'include'
                });
                const result = await r.json();
                if (result.success) { app.showToast('✅ All changes saved and live!'); await app.loadSettings(); }
                else app.showToast(result.error || 'Save failed', 'error');
            } catch(err) { app.showToast('Network error', 'error'); }
            finally {
                btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg> Save All Changes';
                btn.disabled = false;
            }
        };

    } catch (e) {
        container.innerHTML = `<div class="bg-rose-50 p-20 text-center text-rose-500 font-bold rounded-3xl">Failed to load CMS. ${e.message}</div>`;
    }
}


export function printAdminReport() {
    const stats = {
        quotes: document.getElementById('stat-active-quotations')?.textContent || '--',
        partners: document.getElementById('stat-total-partners')?.textContent || '--',
        skus: document.getElementById('stat-total-skus')?.textContent || '--',
        revenue: document.getElementById('stat-revenue')?.textContent || '₹0'
    };

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>PARTSPRO - Executive Report</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
                    body { font-family: 'Outfit', sans-serif; padding: 40px; color: #1e293b; background: #f8fafc; }
                    .header { border-bottom: 3px solid #0056B3; padding-bottom: 20px; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
                    .header h1 { font-weight: 900; color: #0056B3; margin: 0 0 5px 0; font-size: 28px; }
                    .header p { margin: 0; font-size: 14px; color: #64748b; font-weight: 700; }
                    .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
                    .stat-item { padding: 25px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
                    .stat-label { font-size: 11px; font-weight: 900; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; }
                    .stat-value { font-size: 28px; font-weight: 900; margin-top: 10px; color: #0f172a; }
                    .footer { margin-top: 60px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; font-weight: 700; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div>
                        <h1>PARTSPRO</h1>
                        <p>Executive Inventory & Revenue Report</p>
                    </div>
                    <p style="font-size:11px; color:#94a3b8;">Generated on: ${new Date().toLocaleString()}</p>
                </div>
                <div class="stats-grid">
                    <div class="stat-item"><div class="stat-label">Active Quotations</div><div class="stat-value">${stats.quotes}</div></div>
                    <div class="stat-item"><div class="stat-label">Total Partners</div><div class="stat-value">${stats.partners}</div></div>
                    <div class="stat-item"><div class="stat-label">Inventory SKUs</div><div class="stat-value">${stats.skus}</div></div>
                    <div class="stat-item"><div class="stat-label">Total Revenue</div><div class="stat-value">${stats.revenue}</div></div>
                </div>
                <div class="footer">
                    &copy; 2026 PARTSPRO B2B Division. Confidential Internal Document.
                </div>
                <script>window.print(); setTimeout(() => window.close(), 1000);</script>
            </body>
        </html>
    `);
    printWindow.document.close();
}

export function renderImportModal(app) {
    const modal = document.createElement('div');
    modal.id = 'import-modal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm';
    modal.innerHTML = `
        <div class="bg-white rounded-[32px] w-full max-w-xl p-10 space-y-8 shadow-2xl animate-in zoom-in duration-300">
            <div class="flex justify-between items-center">
                <h2 class="text-3xl font-black text-slate-900">Bulk <span class="text-blue-600">Import</span></h2>
                <button onclick="document.getElementById('import-modal').remove()" class="text-slate-400 hover:text-slate-900 transition-all">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <form id="import-form" class="space-y-6">
                <div class="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-500 transition-all cursor-pointer relative group">
                    <input type="file" name="import_csv" accept=".csv" required class="absolute inset-0 opacity-0 cursor-pointer">
                    <p class="text-slate-500 font-bold">Drop CSV file here or <span class="text-blue-600">browse</span></p>
                    <p class="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-black">Headers: Part Name, Machine Model, Brand, Cost, Stock</p>
                </div>
                <button type="submit" class="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">Process Import</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('import-form').onsubmit = (e) => importProducts(e, app);
}

async function importProducts(e, app) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Importing...';
    
    const formData = new FormData(e.target);
    try {
        const res = await fetch(app.api('api/import_products.php'), {
            method: 'POST',
            body: formData
        });
        const result = await res.json();
        if (result.success) {
            app.showToast(`Imported ${result.count} products successfully`);
            document.getElementById('import-modal').remove();
            app.renderAdminInventory(document.getElementById('view-container'));
        } else {
            app.showToast(result.error, 'error');
        }
    } catch (err) {
        app.showToast('Import failed', 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Process Import';
    }
}

export function renderAddProductForm(app) {
    renderProductForm(null, app);
}

export async function renderEditProductForm(id, app) {
    const product = app.state.products.find(p => p.id == id);
    renderProductForm(product, app);
}

async function renderProductForm(product, app) {
    const isEdit = !!product;
    const modal = document.createElement('div');
    modal.id = 'product-modal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto';

    modal.innerHTML = `
        <div class="bg-white rounded-[32px] w-full max-w-3xl p-6 md:p-10 space-y-6 shadow-2xl animate-in zoom-in duration-300 my-auto max-h-[95vh] overflow-y-auto custom-scrollbar">
            <div class="flex justify-between items-center">
                <h2 class="text-3xl font-black text-slate-900">${isEdit ? 'Edit' : 'Add New'} <span class="text-blue-600">Product</span></h2>
                <button onclick="document.getElementById('product-modal').remove()" class="text-slate-400 hover:text-slate-900 transition-all">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <form id="product-form" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                ${isEdit ? `<input type="hidden" name="id" value="${product.id}">` : ''}
                <input type="hidden" name="action" value="${isEdit ? 'update_product' : 'add_product'}">

                <!-- Spare Part Name -->
                <div class="col-span-2 space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Spare Part Name</label>
                    <div class="flex gap-2">
                        <select id="pf-partname" name="part_name_id" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                            <option value="">Select Part Name...</option>
                        </select>
                        <button type="button" onclick="window._pfAddLookup('part_name')" class="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-black text-lg hover:bg-blue-100 transition-all" title="Add new part name">+</button>
                    </div>
                </div>

                <!-- Primary Fitment Section -->
                <div class="col-span-2 pt-6 pb-2 border-t border-slate-100 mt-2">
                    <h3 class="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Primary Suitable Machine</h3>
                </div>

                <!-- Machine Brand -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Machine Brand</label>
                    <div class="flex gap-2">
                        <select id="pf-brand" name="brand_id" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                            <option value="">Select Brand...</option>
                        </select>
                        <button type="button" onclick="window._pfAddLookup('brand')" class="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-black text-lg hover:bg-blue-100 transition-all">+</button>
                    </div>
                </div>

                <!-- Machine Name -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Machine Name</label>
                    <div class="flex gap-2">
                        <select id="pf-machine" name="machine_name_id" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                            <option value="">Select Machine...</option>
                        </select>
                        <button type="button" onclick="window._pfAddLookup('machine_name')" class="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-black text-lg hover:bg-blue-100 transition-all">+</button>
                    </div>
                </div>

                <!-- Machine Model -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Machine Model</label>
                    <div class="flex gap-2">
                        <select id="pf-model" name="model_id" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                            <option value="">Select Model...</option>
                        </select>
                        <button type="button" onclick="window._pfAddLookup('model')" class="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-black text-lg hover:bg-blue-100 transition-all">+</button>
                    </div>
                </div>

                <!-- Machine Size -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Machine Size</label>
                    <div class="flex gap-2">
                        <select id="pf-size" name="machine_size_id" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                            <option value="">Select Size...</option>
                        </select>
                        <button type="button" onclick="window._pfAddLookup('machine_size')" class="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-black text-lg hover:bg-blue-100 transition-all">+</button>
                    </div>
                </div>

                <!-- Additional Machines Section -->
                <div class="col-span-2 pt-6 pb-2 border-t border-slate-100 mt-2">
                    <div class="flex justify-between items-center">
                        <h3 class="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Other Suitable Machines</h3>
                        <button type="button" onclick="window._pfAddMachineRow()" class="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">+ Add More Machine</button>
                    </div>
                    <div id="additional-machines-container" class="space-y-4 mt-4">
                        <!-- Dynamic rows here -->
                    </div>
                </div>

                <!-- Product Details -->
                <div class="col-span-2 pt-6 pb-2 border-t border-slate-100 mt-2">
                    <h3 class="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Product Details</h3>
                </div>

                <!-- Cost -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Cost (₹)</label>
                    <input type="number" step="0.01" name="cost" value="${product?.cost || ''}" placeholder="Enter Cost"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
                </div>

                <!-- Stock Quantity -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Stock Quantity</label>
                    <input type="number" name="stock_quantity" value="${product?.stock_quantity || ''}" placeholder="Enter Stock"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
                </div>

                <!-- Note -->
                <div class="col-span-2 space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Note</label>
                    <input type="text" name="note" value="${product?.note || ''}" placeholder="Technical notes or descriptions"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
                </div>

                <!-- Photo -->
                <div class="col-span-2 space-y-2 pt-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Product Photo</label>
                    <input type="file" name="photo" accept="image/*"
                        class="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100">
                </div>

                <div class="col-span-2 pt-4">
                    <button type="submit" id="pf-submit-btn"
                        class="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:scale-[1.02] transition-all">
                        Save Complete Product
                    </button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    let lookupData = null;

    fetch(app.api('api/admin_products.php?action=lookups'))
        .then(r => r.json())
        .then(data => {
            lookupData = data;
            const populate = (selectId, items, currentId) => {
                const sel = document.getElementById(selectId);
                if (!sel) return;
                items.forEach(item => {
                    const opt = document.createElement('option');
                    opt.value = item.id;
                    opt.textContent = item.name;
                    if (currentId && item.id == currentId) opt.selected = true;
                    sel.appendChild(opt);
                });
            };
            populate('pf-brand',    data.brands       || [], product?.brand_id);
            populate('pf-machine',  data.machine_names|| [], product?.machine_name_id);
            populate('pf-partname', data.part_names   || [], product?.part_name_id);
            populate('pf-model',    data.models       || [], product?.model_id);
            populate('pf-size',     data.sizes        || [], product?.machine_size_id);

            if (isEdit) {
                fetch(app.api(`api/admin_products.php?action=get_fitments&part_id=${product.id}`))
                    .then(r => r.json())
                    .then(fitRes => {
                        (fitRes.fitments || []).forEach(f => window._pfAddMachineRow(f));
                    });
            }
        })
        .catch(() => app.showToast('Could not load dropdown options', 'error'));

    window._pfAddMachineRow = (existing = null) => {
        const container = document.getElementById('additional-machines-container');
        const row = document.createElement('div');
        row.className = 'grid grid-cols-2 lg:grid-cols-4 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 relative group animate-in slide-in-from-top-2 duration-300';
        
        const genSelect = (name, items, selected) => `
            <div class="space-y-1">
                <select name="${name}" class="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] font-bold text-slate-700 focus:outline-none focus:border-blue-500">
                    <option value="">Select...</option>
                    ${items.map(i => `<option value="${i.id}" ${i.id == selected ? 'selected' : ''}>${i.name}</option>`).join('')}
                </select>
            </div>
        `;

        row.innerHTML = `
            <button type="button" onclick="this.parentElement.remove()" class="absolute -right-2 -top-2 w-6 h-6 bg-white border border-slate-200 text-rose-500 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            ${genSelect('fit_brand_id', lookupData?.brands || [], existing?.brand_id)}
            ${genSelect('fit_machine_id', lookupData?.machine_names || [], existing?.machine_id)}
            ${genSelect('fit_model_id', lookupData?.models || [], existing?.machine_model_id)}
            ${genSelect('fit_size_id', lookupData?.sizes || [], existing?.machine_size_id)}
        `;
        container.appendChild(row);
    };

    window._pfAddLookup = async (type) => {
        const labelMap = { brand: 'Brand', machine_name: 'Machine Name', part_name: 'Part Name', model: 'Model', machine_size: 'Machine Size' };
        const newName = prompt(`Enter new ${labelMap[type]} name:`);
        if (!newName || !newName.trim()) return;
        const payload = new FormData();
        payload.append('action', 'add_lookup');
        payload.append('type', type);
        payload.append('name', newName.trim());
        try {
            const r = await fetch(app.api('api/admin_products.php'), { method: 'POST', body: payload });
            const result = await r.json();
            if (result.success) {
                app.showToast(`${labelMap[type]} added!`);
                const updatedLookups = await (await fetch(app.api('api/admin_products.php?action=lookups'))).json();
                lookupData = updatedLookups;
                const selectMap = { brand: 'pf-brand', machine_name: 'pf-machine', part_name: 'pf-partname', model: 'pf-model', machine_size: 'pf-size' };
                const sel = document.getElementById(selectMap[type]);
                if (sel) {
                    const opt = document.createElement('option');
                    opt.value = result.id;
                    opt.textContent = newName.trim();
                    opt.selected = true;
                    sel.appendChild(opt);
                }
            } else {
                app.showToast(result.error || 'Failed to add', 'error');
            }
        } catch {
            app.showToast('Network error', 'error');
        }
    };

    document.getElementById('product-form').onsubmit = (e) => handleProductSubmit(e, app);
}

async function handleProductSubmit(e, app) {
    e.preventDefault();
    const btn = document.getElementById('pf-submit-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="animate-pulse">Saving Product...</span>';

    const formData = new FormData(e.target);
    const isEdit = formData.has('id');

    try {
        let res;
        if (isEdit) {
            const payload = {
                id: formData.get('id'),
                brand_id: formData.get('brand_id'),
                machine_name_id: formData.get('machine_name_id'),
                part_name_id: formData.get('part_name_id'),
                model_id: formData.get('model_id'),
                machine_size_id: formData.get('machine_size_id'),
                cost: formData.get('cost'),
                note: formData.get('note'),
            };
            res = await fetch(app.api('api/admin_products.php'), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } else {
            res = await fetch(app.api('api/admin_products.php'), {
                method: 'POST',
                body: formData
            });
        }
        
        const result = await res.json();
        if (result.success) {
            const productId = isEdit ? formData.get('id') : result.id;
            
            const fitRows = document.querySelectorAll('#additional-machines-container > div');
            for (const row of fitRows) {
                const modelId = row.querySelector('[name="fit_model_id"]').value;
                const sizeId = row.querySelector('[name="fit_size_id"]').value;
                if (modelId) {
                    const fitPayload = new FormData();
                    fitPayload.append('action', 'save_fitment');
                    fitPayload.append('part_id', productId);
                    fitPayload.append('model_id', modelId);
                    fitPayload.append('machine_size_id', sizeId);
                    await fetch(app.api('api/admin_products.php'), { method: 'POST', body: fitPayload });
                }
            }

            app.showToast(`Product ${isEdit ? 'updated' : 'created'} successfully with fitments`);
            document.getElementById('product-modal').remove();
            app.renderAdminInventory(document.getElementById('view-container'));
        } else {
            app.showToast(result.error || 'Submission failed', 'error');
        }
    } catch (err) {
        app.showToast('Submission failed', 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Save Complete Product';
    }
}

export async function deleteProduct(id, app) {
    if (!confirm('Are you sure you want to remove this product?')) return;

    try {
        const res = await fetch(app.api(`api/admin_products.php?action=delete_product&id=${id}`), {
            method: 'DELETE'
        });
        const result = await res.json();
        if (result.success) {
            app.showToast('Product removed');
            app.renderAdminInventory(document.getElementById('view-container'));
        } else {
            app.showToast(result.error, 'error');
        }
    } catch (err) {
        app.showToast('Deletion failed', 'error');
    }
}
