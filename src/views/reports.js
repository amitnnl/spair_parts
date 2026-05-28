export async function renderReports(container, app) {
    const role = app.state.user?.role?.toLowerCase();
    if (role !== 'admin' && role !== 'staff') { app.showToast('Access required', 'error'); return; }

    container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>`;

    try {
        const [productsRes, logsRes] = await Promise.all([
            fetch(app.api('api/products.php')),
            fetch(app.api('api/stock_logs.php'))
        ]);
        const { products } = await productsRes.json();
        const { logs, low_stock } = await logsRes.json();
        // Store for CSV export
        window._reportData = { products, logs, low_stock };

        container.innerHTML = `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${app.getSidebar('reports')}
                <main class="flex-1 p-8 lg:p-12 space-y-10">

                    <!-- Header -->
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div class="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Analytics</div>
                            <h2 class="text-4xl font-black text-slate-900 tracking-tight">Inventory <span class="text-blue-600">Reports</span></h2>
                            <p class="text-slate-500 mt-2 font-medium">Stock overview, low-stock alerts, and exportable reports.</p>
                        </div>
                        <div class="flex flex-wrap gap-3 no-print">
                            <button onclick="app.exportStockReport()" 
                                class="px-5 py-3 bg-emerald-600 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                                Export PDF
                            </button>
                            <button onclick="app.exportStockCSV()" 
                                class="px-5 py-3 bg-blue-600 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                                Export Excel / CSV
                            </button>
                        </div>
                    </div>

                    <!-- Summary Stats -->
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        ${[
                            { label: 'Total SKUs', value: products?.length || 0, color: 'blue', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
                            { label: 'Low Stock Items', value: low_stock?.length || 0, color: 'rose', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
                            { label: 'Out of Stock', value: (products || []).filter(p => (p.stock_quantity || 0) <= 0).length, color: 'amber', icon: 'M6 18L18 6M6 6l12 12' },
                            { label: 'Stock Transactions', value: logs?.length || 0, color: 'emerald', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
                        ].map(s => `
                            <div class="bg-white border border-slate-200 rounded-3xl p-7 space-y-4">
                                <div class="w-12 h-12 rounded-2xl bg-${s.color}-50 flex items-center justify-center">
                                    <svg class="w-6 h-6 text-${s.color}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${s.icon}"/></svg>
                                </div>
                                <div>
                                    <p class="text-xs font-black text-slate-500 uppercase tracking-widest">${s.label}</p>
                                    <p class="text-3xl font-black text-slate-900 mt-1">${s.value}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Charts Row -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Stock Level Chart -->
                        <div class="bg-white border border-slate-200 rounded-3xl p-8">
                            <h3 class="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Stock Level by Brand</h3>
                            <canvas id="chart-stock-brand" height="260"></canvas>
                        </div>
                        <!-- Stock In vs Out Chart -->
                        <div class="bg-white border border-slate-200 rounded-3xl p-8">
                            <h3 class="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Stock Movement (Last 30 Days)</h3>
                            <canvas id="chart-movement" height="260"></canvas>
                        </div>
                    </div>

                    <!-- Low Stock Table (Printable) -->
                    <div id="printable-report" class="bg-white border border-slate-200 rounded-3xl overflow-hidden">
                        <div class="p-8 border-b border-slate-100 flex justify-between items-center">
                            <div class="flex items-center gap-4">
                                <div class="w-2 h-8 bg-rose-500 rounded-full"></div>
                                <h3 class="text-lg font-black text-slate-900">Low Stock Report</h3>
                            </div>
                            <span class="text-xs text-slate-500 font-bold">Generated: ${new Date().toLocaleDateString()}</span>
                        </div>
                        ${low_stock && low_stock.length > 0 ? `
                            <div class="overflow-x-auto">
                                <table class="w-full text-left">
                                    <thead class="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th class="p-5 pl-8 text-xs font-black text-slate-500 uppercase tracking-widest">Part Name</th>
                                            <th class="p-5 text-xs font-black text-slate-500 uppercase tracking-widest">Brand</th>
                                            <th class="p-5 text-xs font-black text-slate-500 uppercase tracking-widest">Current Stock</th>
                                            <th class="p-5 pr-8 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-100">
                                        ${low_stock.map(item => `
                                            <tr class="hover:bg-rose-50/50 transition-all">
                                                <td class="p-5 pl-8 font-black text-slate-900 text-sm">${item.part_name}</td>
                                                <td class="p-5 text-xs font-bold text-slate-500 uppercase">${item.brand || 'N/A'}</td>
                                                <td class="p-5 text-sm font-black ${item.stock_quantity <= 0 ? 'text-rose-600' : 'text-amber-600'}">${item.stock_quantity} units</td>
                                                <td class="p-5 pr-8">
                                                    <span class="px-3 py-1 rounded-full text-xs font-black uppercase ${item.stock_quantity <= 0 ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-amber-50 text-amber-600 border border-amber-200'}">
                                                        ${item.stock_quantity <= 0 ? 'Out of Stock' : 'Low Stock'}
                                                    </span>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        ` : `<div class="p-16 text-center text-slate-500 font-bold">✓ All items are well-stocked.</div>`}
                    </div>

                </main>
            </div>
        `;

        // Load Chart.js and draw charts
        if (!window.Chart) {
            await new Promise((resolve, reject) => {
                const s = document.createElement('script');
                s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
                s.onload = resolve; s.onerror = reject;
                document.head.appendChild(s);
            });
        }

        // Chart 1: Stock per brand
        const brandMap = {};
        (products || []).forEach(p => {
            const b = p.brand || 'Unknown';
            brandMap[b] = (brandMap[b] || 0) + (p.stock_quantity || 0);
        });
        const brandLabels = Object.keys(brandMap);
        const brandData = Object.values(brandMap);
        new window.Chart(document.getElementById('chart-stock-brand'), {
            type: 'bar',
            data: {
                labels: brandLabels,
                datasets: [{ label: 'Units in Stock', data: brandData, backgroundColor: '#3b82f6', borderRadius: 8, borderSkipped: false }]
            },
            options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true }, x: { grid: { display: false } } } }
        });

        // Chart 2: Stock In vs Out per day (last 30 days)
        const last30 = {};
        const today = new Date();
        for (let i = 29; i >= 0; i--) {
            const d = new Date(today); d.setDate(d.getDate() - i);
            const key = d.toISOString().split('T')[0];
            last30[key] = { in: 0, out: 0 };
        }
        (logs || []).forEach(l => {
            const day = l.created_at?.split(' ')[0] || l.created_at?.split('T')[0];
            if (last30[day]) last30[day][l.type] += parseInt(l.quantity);
        });
        const movDates = Object.keys(last30).map(d => new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short' }));
        new window.Chart(document.getElementById('chart-movement'), {
            type: 'line',
            data: {
                labels: movDates,
                datasets: [
                    { label: 'Stock In', data: Object.values(last30).map(v => v.in), borderColor: '#10b981', backgroundColor: '#10b98130', fill: true, tension: 0.4 },
                    { label: 'Stock Out', data: Object.values(last30).map(v => v.out), borderColor: '#f43f5e', backgroundColor: '#f43f5e20', fill: true, tension: 0.4 }
                ]
            },
            options: { responsive: true, plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true }, x: { ticks: { maxTicksLimit: 8 }, grid: { display: false } } } }
        });

    } catch (e) {
        container.innerHTML = `<div class="p-20 text-center text-rose-500 font-bold">Failed to load reports.</div>`;
    }
}

export function exportStockReport() {
    window.print();
}

export function exportStockCSV() {
    const { products, low_stock } = window._reportData || {};
    if (!products) { alert('Report data not loaded yet. Please open Reports page first.'); return; }

    // Build CSV rows
    const rows = [
        // Headers
        ['Part Name', 'Brand', 'Machine Model', 'Stock Qty', 'Cost (₹)', 'Status', 'Part ID']
    ];

    products.forEach(p => {
        const qty = parseInt(p.stock_quantity ?? 0);
        const status = qty <= 0 ? 'Out of Stock' : qty <= 5 ? 'Low Stock' : 'In Stock';
        rows.push([
            p.part_name || '',
            p.brand || '',
            p.machine_model || '',
            qty,
            p.cost || 0,
            status,
            p.id
        ]);
    });

    // Also add a separator and stock log summary
    rows.push([]);
    rows.push(['--- STOCK LOG SUMMARY ---']);
    rows.push(['Date', 'Part Name', 'Brand', 'Type', 'Quantity', 'Note', 'Logged By']);
    const { logs } = window._reportData || {};
    (logs || []).forEach(l => {
        rows.push([
            new Date(l.created_at).toLocaleString(),
            l.part_name || '',
            l.brand_name || '',
            l.type === 'in' ? 'Stock In' : 'Stock Out',
            l.quantity,
            l.note || '',
            l.logged_by || ''
        ]);
    });

    // Escape and join
    const csv = rows.map(row =>
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    // Trigger download
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TORVO_Stock_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}
