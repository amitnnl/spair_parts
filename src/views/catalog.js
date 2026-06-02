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
            <div class="flex flex-col min-h-[calc(100vh-80px)] bg-slate-50">
                <main class="flex-1 p-6 lg:p-10">
                    <div class="max-w-[100rem] mx-auto space-y-12 animate-fade-in">
                        <div class="flex items-start justify-between">
                            <div>
                                <div class="text-xs font-black uppercase tracking-[0.3em] text-[#ed1c24] mb-2">Inventory Explorer</div>
                                <h2 class="text-4xl font-black tracking-tight text-[#111111] uppercase">Genuine <span class="text-[#ed1c24]">Parts Catalog</span></h2>
                                <p class="text-slate-500 font-medium mt-2 text-lg">Browse through our extensive collection of industrial spare parts.</p>
                            </div>
                        </div>
                        
                        <div id="catalog-content"></div>
                    </div>
                </main>
            </div>
        `);
        renderCatalogContent(data.products, document.getElementById('catalog-content'), appInstance);
    } catch (e) {
        setHTML(container, '<div class="bg-rose-50 border border-rose-100 rounded-none p-12 text-center text-rose-500 font-bold">Failed to load products.</div>');
    }
}

export function renderCatalogContent(products, container, appInstance) {
    const filters = appInstance.state.searchFilters || {};
    
    // Unhide the global search bar automatically when on catalog
    const searchContainer = document.getElementById('global-search-container');
    if (searchContainer) searchContainer.classList.remove('hidden');

    const searchInput = document.getElementById('global-text-search');
    const brandSelect = document.getElementById('global-brand-select');
    const modelSelect = document.getElementById('global-model-select');
    const categorySelect = document.getElementById('global-category-select');
    const itemSelect = document.getElementById('global-item-select');

    // Only set values if there are active filters from a search execution
    if (searchInput && filters.query) searchInput.value = filters.query;
    if (brandSelect && filters.brand) brandSelect.value = filters.brand;
    if (modelSelect && filters.model) modelSelect.value = filters.model;
    if (categorySelect && filters.category) categorySelect.value = filters.category;
    if (itemSelect && filters.item) itemSelect.value = filters.item;

    setHTML(container, '<div id="catalog-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">' + filterAndRenderProducts() + '</div>');

    const filterAction = () => {
        setHTML(document.getElementById('catalog-grid'), filterAndRenderProducts());
    };

    if (searchInput) searchInput.addEventListener('input', filterAction);
    if (brandSelect) brandSelect.addEventListener('change', filterAction);
    if (modelSelect) modelSelect.addEventListener('change', filterAction);
    if (categorySelect) categorySelect.addEventListener('change', filterAction);
    if (itemSelect) itemSelect.addEventListener('change', filterAction);
}


export function filterAndRenderProducts() {
    const query = document.getElementById('global-text-search')?.value.toLowerCase() || '';
    const brand = document.getElementById('global-brand-select')?.value || '';
    const model = document.getElementById('global-model-select')?.value || '';
    const category = document.getElementById('global-category-select')?.value || '';
    const item = document.getElementById('global-item-select')?.value || '';

    const filtered = (state.products || []).filter(p => {
        const matchesQuery = p.part_name.toLowerCase().includes(query) || 
                             (p.machine_model && p.machine_model.toLowerCase().includes(query)) ||
                             (p.brand && p.brand.toLowerCase().includes(query));
        const matchesBrand = !brand || p.brand === brand;
        const matchesModel = !model || p.machine_model === model || (p.other_fitments && p.other_fitments.includes(model));
        const matchesCategory = !category || p.category === category;
        const matchesItem = !item || p.item === item;
        return matchesQuery && matchesBrand && matchesModel && matchesCategory && matchesItem;
    });

    if (filtered.length === 0) {
        return `
            <div class="col-span-full py-8 text-center animate-in fade-in duration-500">
                <h3 class="text-xl font-bold text-slate-500">No parts found</h3>
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

    const orderButtons = isProfileComplete 
        ? `<button onclick="app.addToCart('${escapedId}')" class="w-8 h-8 rounded-none bg-slate-50 hover:bg-[#ed1c24] text-slate-500 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-red-500/30" title="Add to RFQ Cart">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
           </button>
           <button onclick="app.addToPartsList('${escapedId}')" class="w-8 h-8 rounded-none bg-slate-50 hover:bg-amber-400 text-slate-500 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-amber-400/30" title="Save to My Parts List">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
           </button>`
        : `<a href="/profile" data-link class="w-8 h-8 rounded-none bg-amber-50 group-hover:bg-amber-500 text-amber-500 group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm group-hover:shadow-amber-500/30" title="Complete Profile to Order">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
           </a>`;

    const actionButton = `<div class="flex flex-col gap-1 shrink-0">
           ${orderButtons}
           <button onclick="app.viewProduct('${escapedId}')" class="w-8 h-8 rounded-none bg-slate-50 hover:bg-blue-500 text-slate-500 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-blue-500/30" title="View Details">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
           </button>
       </div>`;

    return `
        <div class="bg-white rounded-none overflow-hidden group transition-all duration-500 hover:-translate-y-1 ring-1 ring-slate-900/5 shadow-sm hover:shadow-md flex flex-row items-center p-3 gap-3 animate-in zoom-in duration-700 h-full spotlight-card">
            <div class="relative w-20 h-20 rounded-none bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center shrink-0 border border-slate-100">
                <img src="${cleanImageUrl(p.photo, p.part_name)}" class="w-full h-full object-contain p-2 drop-shadow-sm group-hover:scale-110 transition-transform duration-500">
                <div class="absolute -top-2 -left-2 scale-75 origin-top-left">
                    <span class="px-2.5 py-1 bg-white/90 backdrop-blur-md border border-white/50 text-slate-900 shadow-sm text-xs font-bold uppercase tracking-widest rounded-none">${escapedBrand}</span>
                </div>
            </div>
            <div class="flex-1 min-w-0 pr-1 flex flex-col justify-center">
                <h4 class="font-bold text-sm text-slate-900 leading-tight tracking-tight truncate mb-0.5 group-hover:text-[#ed1c24] transition-colors" title="${escapedName}">${escapedName}</h4>
                <div class="flex items-center gap-1.5 mb-1">
                    <span class="text-xs font-black text-slate-500 uppercase tracking-widest bg-slate-50 px-1.5 py-0.5 rounded-none border border-slate-100">#${escapedId}</span>
                </div>
                <p class="text-xs text-slate-500 font-medium truncate">Fits: ${escapedModel}</p>
            </div>
            ${actionButton}
        </div>
    `;
}

function cleanImageUrl(url, fallbackText = 'Part') {
    if (!url) return `https://placehold.co/600x600/0f172a/6366f1?text=${encodeURIComponent(fallbackText)}`;
    return url.replace('via.placeholder.com', 'placehold.co');
}

export function renderProductModal(id, appInstance) {
    try {
        const product = state.products?.find(p => p.id == id);
        if (!product) {
            console.error('Product not found for id:', id, 'State:', state);
            alert(`Product not found! ID requested: ${id}. Total products in state: ${state.products ? state.products.length : 'undefined'}. First product ID: ${state.products && state.products.length ? state.products[0].id : 'N/A'}`);
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300';
        modal.style.zIndex = '99999';
        modal.id = 'product-view-modal';

    const escapedBrand = escapeHTML(product.brand);
    const escapedName = escapeHTML(product.part_name);
    const escapedModel = escapeHTML(product.machine_model || 'Universal');
    const imageUrl = cleanImageUrl(product.photo, product.part_name);
    
    // Additional data fields
    const escapedCategory = escapeHTML(product.category || 'Uncategorized');
    const escapedItem = escapeHTML(product.item || 'Part');

    const isProfileComplete = !state.user || state.user.profile_complete;

    const discount = appInstance.state.user && appInstance.state.user.discount_tier ? parseFloat(appInstance.state.user.discount_tier) : 0;
    const discountBadge = discount > 0 
        ? `<span class="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest rounded-none border border-emerald-100">🎉 ${discount}% wholesale discount applied</span>` 
        : '';

    modal.innerHTML = `
        <div class="bg-white w-full max-w-3xl rounded-none overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative flex flex-col md:flex-row max-h-[90vh]">
            <button class="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#ed1c24] transition-colors z-10 bg-white/80 backdrop-blur rounded-none hover:bg-rose-50" onclick="document.getElementById('product-view-modal').remove()">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            
            <div class="w-full md:w-2/5 bg-slate-50 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-slate-100 min-h-[300px]">
                <img src="${imageUrl}" class="w-full h-full max-h-64 object-contain drop-shadow-md mix-blend-multiply" alt="${escapedName}">
            </div>
            
            <div class="w-full md:w-3/5 p-8 flex flex-col overflow-y-auto">
                <div class="mb-3 flex items-center gap-2 flex-wrap">
                    <span class="px-3 py-1 bg-rose-50 text-[#ed1c24] text-xs font-black uppercase tracking-widest rounded-none border border-rose-100">${escapedBrand}</span>
                    <span class="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest rounded-none border border-slate-200">${escapedCategory}</span>
                    ${discountBadge}
                </div>
                <h2 class="text-3xl font-black text-slate-900 tracking-tight leading-tight mb-3">${escapedName}</h2>
                
                <div class="flex items-center gap-2 mb-6 pb-6 border-b border-slate-100">
                    <span class="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-none border border-slate-200">ID: #${product.id}</span>
                    <span class="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-none border border-slate-200">${escapedItem}</span>
                </div>
                
                <div class="space-y-5 mb-8 flex-1">
                    <div>
                        <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Primary Compatibility</h4>
                        <p class="text-base font-bold text-slate-700 bg-slate-50 p-3 rounded-none border border-slate-100">Fits: ${escapedModel}</p>
                    </div>
                    ${product.other_fitments ? `
                    <div>
                        <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Other Fitments</h4>
                        <p class="text-sm text-slate-600 bg-slate-50 p-3 rounded-none border border-slate-100 leading-relaxed">${escapeHTML(product.other_fitments)}</p>
                    </div>
                    ` : ''}
                    ${product.description ? `
                    <div>
                        <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Description</h4>
                        <p class="text-sm text-slate-600 bg-slate-50 p-3 rounded-none border border-slate-100 leading-relaxed">${escapeHTML(product.description).replace(/\\n/g, '<br>')}</p>
                    </div>
                    ` : ''}
                </div>
                
                <div class="flex gap-3 mt-auto pt-6 border-t border-slate-100">
                    ${isProfileComplete ? `
                    <button onclick="app.addToCart('${product.id}'); document.getElementById('product-view-modal').remove()" class="flex-1 bg-[#ed1c24] hover:bg-[#111111] text-white py-3.5 rounded-none font-black uppercase tracking-widest text-xs transition-all shadow-[0_4px_14px_rgba(237,28,36,0.2)] hover:shadow-[0_6px_20px_rgba(17,17,17,0.2)] flex items-center justify-center gap-2 hover:-translate-y-0.5">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                        Add to RFQ Cart
                    </button>
                    <button onclick="app.addToPartsList('${product.id}')" class="flex-1 bg-amber-400 hover:bg-amber-500 text-white py-3.5 rounded-none font-black uppercase tracking-widest text-xs transition-all shadow-[0_4px_14px_rgba(251,191,36,0.2)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.2)] flex items-center justify-center gap-2 hover:-translate-y-0.5" title="Save to My Parts List">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                        Save Part
                    </button>
                    ` : `
                    <a href="/profile" onclick="document.getElementById('product-view-modal').remove()" data-link class="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-none font-black uppercase tracking-widest text-xs transition-all shadow-[0_4px_14px_rgba(245,158,11,0.2)] text-center hover:-translate-y-0.5">
                        Complete Profile to Order
                    </a>
                    `}
                </div>
            </div>
        </div>
    `;

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    document.body.appendChild(modal);
    } catch (err) {
        console.error('Error rendering product modal:', err);
        alert('An error occurred while loading the product details: ' + err.message);
    }
}
