import { state } from '../state.js';
import { escapeHTML, setHTML } from '../api.js';

export async function renderCatalog(container, appInstance) {
    setHTML(container, '<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-bosch-blue border-t-transparent rounded-2xl"></div></div>');
    
    try {
        const res = await fetch(appInstance.api('api/products.php'));
        const data = await res.json();
        state.products = data.products;
        state.brands = data.brands;
        state.models = data.models;
        
        setHTML(container, `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                <!-- Custom Catalog Filter Sidebar -->
                <aside id="catalog-sidebar" class="w-full lg:w-72 bg-[#fdfdfd] border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] print:hidden transition-all duration-300 origin-left">
                    <div class="p-5 border-b border-slate-100 bg-slate-50/30">
                        <h3 class="text-xs font-black uppercase tracking-widest text-[#111111]">Inventory Filters</h3>
                    </div>
                    <div class="p-6 space-y-6 flex-1 overflow-y-auto no-scrollbar">
                        <!-- Search -->
                        <div class="space-y-3">
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Search</label>
                            <div class="relative">
                                <input type="text" id="catalog-search" class="w-full h-12 bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#ed1c24] focus:bg-white transition-all placeholder:text-slate-400" placeholder="Part name or Model...">
                                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                </div>
                            </div>
                        </div>

                        <!-- Brand -->
                        <div class="space-y-3">
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Brand</label>
                            <div class="relative">
                                <select id="brand-filter" class="w-full h-12 bg-slate-50 border border-slate-200 rounded-full px-4 text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#ed1c24] transition-all cursor-pointer uppercase tracking-widest">
                                    <option value="">All Brands</option>
                                    ` + (state.brands || []).map(b => '<option value="' + escapeHTML(b) + '">' + escapeHTML(b) + '</option>').join('') + `
                                </select>
                                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg></div>
                            </div>
                        </div>

                        <!-- Model -->
                        <div class="space-y-3">
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Model</label>
                            <div class="relative">
                                <select id="model-filter" class="w-full h-12 bg-slate-50 border border-slate-200 rounded-full px-4 text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#ed1c24] transition-all cursor-pointer uppercase tracking-widest">
                                    <option value="">All Models</option>
                                    ` + (state.models || []).map(m => '<option value="' + escapeHTML(m) + '">' + escapeHTML(m) + '</option>').join('') + `
                                </select>
                                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg></div>
                            </div>
                        </div>
                    </div>
                </aside>

                <main class="flex-1 p-6 lg:p-10">
                    <div class="max-w-[100rem] mx-auto space-y-12 animate-fade-in">
                        <div class="flex items-start justify-between">
                            <div>
                                <div class="text-[10px] font-black uppercase tracking-[0.3em] text-[#ed1c24] mb-2">Inventory Explorer</div>
                                <h2 class="text-4xl font-black tracking-tight text-[#111111] uppercase">Genuine <span class="text-[#ed1c24]">Parts Catalog</span></h2>
                                <p class="text-slate-500 font-medium mt-2 text-lg">Browse through our extensive collection of industrial spare parts.</p>
                            </div>
                            <button onclick="document.getElementById('catalog-sidebar').classList.toggle('hidden')" class="px-5 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold shadow-md hover:bg-[#ed1c24] transition-all flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
                                Toggle Filters
                            </button>
                        </div>
                        
                        <div id="catalog-content"></div>
                    </div>
                </main>
            </div>
        `);
        renderCatalogContent(data.products, document.getElementById('catalog-content'), appInstance);
    } catch (e) {
        setHTML(container, '<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load products.</div>');
    }
}

export function renderCatalogContent(products, container, appInstance) {
    const filters = appInstance.state.searchFilters || {};
    appInstance.state.searchFilters = null; // Clear to avoid sticky filters on subsequent navigation

    const initialQuery = [filters.query, filters.category, filters.item].filter(Boolean).join(' ').trim();
    const initialBrand = filters.brand || '';
    const initialModel = filters.model || '';

    const searchInput = document.getElementById('catalog-search');
    const brandSelect = document.getElementById('brand-filter');
    const modelSelect = document.getElementById('model-filter');

    if (searchInput && initialQuery) searchInput.value = initialQuery;
    if (brandSelect && initialBrand) brandSelect.value = initialBrand;
    if (modelSelect && initialModel) modelSelect.value = initialModel;

    setHTML(container, '<div id="catalog-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">' + filterAndRenderProducts() + '</div>');

    const filterAction = () => {
        setHTML(document.getElementById('catalog-grid'), filterAndRenderProducts());
    };

    if (searchInput) searchInput.oninput = filterAction;
    if (brandSelect) brandSelect.onchange = filterAction;
    if (modelSelect) modelSelect.onchange = filterAction;
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
    const escapedBrand = escapeHTML(p.brand);
    const escapedName = escapeHTML(p.part_name);
    const escapedModel = escapeHTML(p.machine_model || 'Universal');
    const escapedId = escapeHTML(p.id);
    
    const isProfileComplete = !state.user || state.user.profile_complete;

    const actionButton = isProfileComplete 
        ? `<button onclick="app.addToCart(${escapedId})" class="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#ed1c24] text-slate-400 group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm group-hover:shadow-red-500/30" title="Add to RFQ Cart">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
           </button>`
        : `<a href="/profile" data-link class="w-8 h-8 rounded-full bg-amber-50 group-hover:bg-amber-500 text-amber-500 group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm group-hover:shadow-amber-500/30" title="Complete Profile to Order">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
           </a>`;

    return `
        <div class="bg-white rounded-3xl overflow-hidden group transition-all duration-500 hover:-translate-y-1 ring-1 ring-slate-900/5 shadow-sm hover:shadow-md flex flex-row items-center p-3 gap-3 animate-in zoom-in duration-700 h-full">
            <div class="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center shrink-0 border border-slate-100">
                <img src="${cleanImageUrl(p.photo, p.part_name)}" class="w-full h-full object-contain p-2 drop-shadow-sm group-hover:scale-110 transition-transform duration-500">
                <div class="absolute -top-2 -left-2 scale-75 origin-top-left">
                    <span class="px-2.5 py-1 bg-white/90 backdrop-blur-md border border-white/50 text-slate-900 shadow-sm text-[9px] font-bold uppercase tracking-widest rounded-xl">${escapedBrand}</span>
                </div>
            </div>
            <div class="flex-1 min-w-0 pr-1 flex flex-col justify-center">
                <h4 class="font-bold text-sm text-slate-900 leading-tight tracking-tight truncate mb-0.5 group-hover:text-[#ed1c24] transition-colors" title="${escapedName}">${escapedName}</h4>
                <div class="flex items-center gap-1.5 mb-1">
                    <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-1.5 py-0.5 rounded-md border border-slate-100">#${escapedId}</span>
                </div>
                <p class="text-[10px] text-slate-500 font-medium truncate">Fits: ${escapedModel}</p>
            </div>
            ${actionButton}
        </div>
    `;
}

function cleanImageUrl(url, fallbackText = 'Part') {
    if (!url) return `https://placehold.co/600x600/0f172a/6366f1?text=${encodeURIComponent(fallbackText)}`;
    return url.replace('via.placeholder.com', 'placehold.co');
}
