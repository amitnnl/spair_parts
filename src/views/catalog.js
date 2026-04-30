import { state } from '../state.js';

export async function renderCatalog(container, appInstance) {
    container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>`;
    
    try {
        const res = await fetch(appInstance.api('api/products.php'));
        const data = await res.json();
        state.products = data.products;
        state.brands = data.brands;
        state.models = data.models;
        
        container.innerHTML = `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${appInstance.getSidebar('catalog')}
                <main class="flex-1 p-8 lg:p-12">
                    <div class="max-w-7xl mx-auto space-y-12 animate-fade-in">
                        <div>
                            <div class="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Inventory Explorer</div>
                            <h2 class="text-4xl font-black tracking-tight text-slate-900">Genuine <span class="text-primary">Parts Catalog</span></h2>
                            <p class="text-slate-500 font-medium mt-2 text-lg">Browse through our extensive collection of industrial spare parts.</p>
                        </div>
                        
                        <div id="catalog-content"></div>
                    </div>
                </main>
            </div>
        `;
        renderCatalogContent(data.products, document.getElementById('catalog-content'), appInstance);
    } catch (e) {
        container.innerHTML = `<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load products.</div>`;
    }
}

export function renderCatalogContent(products, container, appInstance) {
    container.innerHTML = `
        <div class="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-900/5 p-8 lg:p-12 relative overflow-hidden mb-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                <div class="relative md:col-span-1">
                    <input type="text" id="catalog-search" class="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-12 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400" placeholder="Search by Part name or Model...">
                    <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </div>
                </div>
                <div class="relative">
                    <select id="brand-filter" class="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-blue-500 transition-all cursor-pointer uppercase tracking-widest">
                        <option value="">Filter by Brand</option>
                        ${(state.brands || []).map(b => `<option value="${b}">${b}</option>`).join('')}
                    </select>
                    <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg></div>
                </div>
                <div class="relative">
                    <select id="model-filter" class="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-blue-500 transition-all cursor-pointer uppercase tracking-widest">
                        <option value="">Filter by Model</option>
                        ${(state.models || []).map(m => `<option value="${m}">${m}</option>`).join('')}
                    </select>
                    <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg></div>
                </div>
            </div>
        </div>

        <div id="catalog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            ${filterAndRenderProducts()}
        </div>
    `;

    const filterAction = () => {
        document.getElementById('catalog-grid').innerHTML = filterAndRenderProducts();
    };

    document.getElementById('catalog-search').oninput = filterAction;
    document.getElementById('brand-filter').onchange = filterAction;
    document.getElementById('model-filter').onchange = filterAction;
}

export function filterAndRenderProducts() {
    const query = document.getElementById('catalog-search')?.value.toLowerCase() || '';
    const brand = document.getElementById('brand-filter')?.value || '';
    const model = document.getElementById('model-filter')?.value || '';

    const filtered = (state.products || []).filter(p => {
        const matchesQuery = p.part_name.toLowerCase().includes(query) || 
                             (p.machine_model && p.machine_model.toLowerCase().includes(query)) ||
                             (p.brand && p.brand.toLowerCase().includes(query));
        const matchesBrand = !brand || p.brand === brand;
        const matchesModel = !model || p.machine_model === model || (p.other_fitments && p.other_fitments.includes(model));
        return matchesQuery && matchesBrand && matchesModel;
    });

    if (filtered.length === 0) {
        return `
            <div class="col-span-full py-20 text-center animate-in fade-in duration-500">
                <h3 class="text-xl font-bold text-slate-400">No parts found</h3>
            </div>
        `;
    }

    return filtered.map(p => productCard(p)).join('');
}

export function productCard(p) {
    return `
        <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 animate-in zoom-in duration-700">
            <div class="relative h-64 bg-slate-50 overflow-hidden">
                <img src="${cleanImageUrl(p.photo, p.part_name)}" class="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700">
                <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 bg-white/90 backdrop-blur shadow-sm border border-slate-100 text-[10px] font-black uppercase tracking-widest text-blue-600 rounded-lg">${p.brand}</span>
                </div>
            </div>
            <div class="p-8">
                <div class="mb-6">
                    <h4 class="font-black text-lg text-slate-900 leading-tight mb-1">${p.part_name}</h4>
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fits: ${p.machine_model || 'Universal'}</span>
                    </div>
                </div>
                
                <div class="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div>
                        <span class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">B2B Pricing</span>
                        <span class="text-sm font-bold text-slate-900">RFQ Required</span>
                    </div>
                    <button onclick="app.addToCart(${p.id})" class="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function cleanImageUrl(url, fallbackText = 'Part') {
    if (!url) return `https://placehold.co/600x600/0f172a/6366f1?text=${encodeURIComponent(fallbackText)}`;
    return url.replace('via.placeholder.com', 'placehold.co');
}
