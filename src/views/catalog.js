import { state } from '../state.js';
import { escapeHTML, setHTML } from '../api.js';

export async function renderCatalog(container, appInstance) {
    setHTML(container, '<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-bosch-blue border-t-transparent rounded-none"></div></div>');
    
    try {
        const res = await fetch(appInstance.api('api/products.php'));
        const data = await res.json();
        state.products = data.products;
        state.brands = data.brands;
        state.models = data.models;
        
        setHTML(container, `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                <!-- Custom Catalog Filter Sidebar -->
                <aside class="w-full lg:w-72 bg-[#fdfdfd] border-b lg:border-b-0 lg:border-r border-slate-200 flex-col lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] print:hidden">
                    <div class="p-5 border-b border-slate-100 bg-slate-50/30">
                        <h3 class="text-xs font-black uppercase tracking-widest text-[#111111]">Inventory Filters</h3>
                    </div>
                    <div class="p-6 space-y-6 flex-1 overflow-y-auto no-scrollbar">
                        <!-- Search -->
                        <div class="space-y-3">
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Search</label>
                            <div class="relative">
                                <input type="text" id="catalog-search" class="w-full h-12 bg-slate-50 border border-slate-200 rounded-none pl-10 pr-4 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#ed1c24] focus:bg-white transition-all placeholder:text-slate-400" placeholder="Part name or Model...">
                                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                </div>
                            </div>
                        </div>

                        <!-- Brand -->
                        <div class="space-y-3">
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Brand</label>
                            <div class="relative">
                                <select id="brand-filter" class="w-full h-12 bg-slate-50 border border-slate-200 rounded-none px-4 text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#ed1c24] transition-all cursor-pointer uppercase tracking-widest">
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
                                <select id="model-filter" class="w-full h-12 bg-slate-50 border border-slate-200 rounded-none px-4 text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#ed1c24] transition-all cursor-pointer uppercase tracking-widest">
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
                        <div>
                            <div class="text-[10px] font-black uppercase tracking-[0.3em] text-[#ed1c24] mb-2">Inventory Explorer</div>
                            <h2 class="text-4xl font-black tracking-tight text-[#111111] uppercase">Genuine <span class="text-[#ed1c24]">Parts Catalog</span></h2>
                            <p class="text-slate-500 font-medium mt-2 text-lg">Browse through our extensive collection of industrial spare parts.</p>
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

    setHTML(container, '<div id="catalog-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">' + filterAndRenderProducts() + '</div>');

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
    
    return `
        <div class="bg-white border-2 border-slate-100 rounded-none overflow-hidden group transition-all duration-500 animate-in zoom-in duration-700 hover-red-glow">
            <div class="relative h-64 bg-slate-50 overflow-hidden">
                <img src="${cleanImageUrl(p.photo, p.part_name)}" class="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700">
                <div class="absolute top-4 left-4">
                    <span class="px-3 py-1.5 bg-[#111111] text-white shadow-sm border border-slate-700 text-[9px] font-black uppercase tracking-widest rounded-none">${escapedBrand}</span>
                </div>
            </div>
            <div class="p-6">
                <div class="mb-6">
                    <h4 class="font-black text-lg text-[#111111] leading-tight mb-1 uppercase tracking-widest truncate" title="${escapedName}">${escapedName}</h4>
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fits: ${escapedModel}</span>
                    </div>
                </div>
                
                <div class="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div>
                        <span class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">B2B Pricing</span>
                        <span class="text-sm font-black text-[#111111] uppercase">RFQ Required</span>
                    </div>
                    <button onclick="app.addToCart(${escapedId})" class="p-3 bg-[#ed1c24] hover:bg-[#111111] text-white rounded-none transition-all shadow-sm" title="Add to RFQ Cart">
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
