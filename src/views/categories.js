import { escapeHTML, setHTML } from '../api.js';

export function renderCategories(container, app) {
    const categories = app.state.categories || [];

    setHTML(container, `
        <div class="animate-fade-in py-8 bg-slate-50 min-h-screen">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-5xl font-black text-slate-900 tracking-tighter mb-4 uppercase font-display">Core <span class="text-[#ed1c24]">Categories</span></h2>
                    <p class="text-slate-600 font-medium text-lg leading-relaxed max-w-2xl mx-auto">Explore our extensive inventory organized by functional systems to find the exact part you need faster.</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    ` + categories.map(c => `
                        <div onclick="app.renderCatalog(document.getElementById('view-container'))" class="bg-white rounded-3xl overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-1 ring-1 ring-slate-900/5 shadow-sm hover:shadow-md flex flex-row items-center p-3 gap-4 animate-in zoom-in duration-700">
                            <div class="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center shrink-0 border border-slate-100">
                                ${c.image_url ? `<img src="${escapeHTML(app.api(c.image_url))}" class="w-full h-full object-contain p-2 drop-shadow-sm group-hover:scale-110 transition-transform duration-500" alt="${escapeHTML(c.title)}">` : `<svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="${escapeHTML(c.icon_svg)}"/></svg>`}
                            </div>
                            <div class="flex-1 min-w-0 pr-2">
                                <h4 class="font-bold text-base text-slate-900 tracking-tight truncate group-hover:text-[#ed1c24] transition-colors" title="${escapeHTML(c.title)}">${escapeHTML(c.title)}</h4>
                                <p class="text-xs text-slate-500 font-medium truncate mt-1">${escapeHTML(c.description || 'Explore Parts')}</p>
                            </div>
                            <div class="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#ed1c24] text-slate-500 group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm group-hover:shadow-red-500/30">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                            </div>
                        </div>
                    `).join('') + `
                </div>
            </div>
        </div>
    `);
}
