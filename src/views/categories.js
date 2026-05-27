import { escapeHTML, setHTML } from '../api.js';

export function renderCategories(container, app) {
    const categories = app.state.categories || [];

    setHTML(container, `
        <div class="animate-fade-in py-12 bg-slate-50 min-h-screen">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-5xl font-black text-[#111111] tracking-tight mb-4 uppercase">Core <span class="text-[#ed1c24]">Categories</span></h2>
                    <p class="text-slate-500 font-bold text-lg max-w-2xl mx-auto">Explore our extensive inventory organized by functional systems to find the exact part you need faster.</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    ` + categories.map(c => `
                        <div onclick="app.renderCatalog(document.getElementById('view-container'))" class="bg-white border-2 border-slate-100 rounded-none overflow-hidden group cursor-pointer transition-all duration-500 animate-in zoom-in duration-700 hover-red-glow flex flex-col justify-between">
                            <!-- Top half: Standard-sized, clean-background image box -->
                            <div class="relative h-64 bg-slate-50 overflow-hidden">
                                ${c.image_url ? `<img src="${escapeHTML(app.api(c.image_url))}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="${escapeHTML(c.title)}">` : `<div class="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300"><svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${escapeHTML(c.icon_svg)}"/></svg></div>`}
                                <div class="absolute top-4 left-4 w-10 h-10 bg-slate-900/60 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover:bg-[#ed1c24] transition-all duration-300">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="${escapeHTML(c.icon_svg)}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </div>
                            </div>
                            <!-- Bottom half: Info section -->
                            <div class="p-6 flex flex-col justify-between h-48 border-t border-slate-100 bg-white flex-1">
                                <div class="space-y-2">
                                    <h4 class="font-black text-lg text-[#111111] uppercase tracking-widest truncate group-hover:text-[#ed1c24] transition-colors" title="${escapeHTML(c.title)}">${escapeHTML(c.title)}</h4>
                                    <p class="text-slate-400 text-xs font-semibold leading-relaxed line-clamp-3">${escapeHTML(c.description || '')}</p>
                                </div>
                                
                                <div class="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <div>
                                        <span class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">B2B Collection</span>
                                        <span class="text-sm font-black text-[#111111] uppercase">Explore Parts</span>
                                    </div>
                                    <button class="p-3 bg-[#ed1c24] hover:bg-[#111111] text-white rounded-none transition-all shadow-sm" title="Explore Spares">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('') + `
                </div>
            </div>
        </div>
    `);
}
