import { escapeHTML, setHTML } from '../api.js';

export function renderCategories(container, app) {
    const categories = [
        { t: app.state.settings.cat1_title || 'Electrical Spares', d: app.state.settings.cat1_desc || 'Switches, Carbon Brushes, Armatures & Field Coils built for high thermal endurance.', img: app.state.settings.cat1_img || 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800', icon:'M13 10V3L4 14h7v7l9-11h-7z' },
        { t: app.state.settings.cat2_title || 'Mechanical Units', d: app.state.settings.cat2_desc || 'Precision Gears, Bearings, Shafts & Housing Assemblies ensuring seamless kinetic transfer.', img: app.state.settings.cat2_img || 'https://images.unsplash.com/photo-1530124566582-a618bc2615ad?auto=format&fit=crop&q=80&w=800', icon:'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
        { t: app.state.settings.cat3_title || 'Power Attachments', d: app.state.settings.cat3_desc || 'Chucks, SDS Adaptors, Cutting Discs & Drill Bits engineered for brutal workloads.', img: app.state.settings.cat3_img || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800', icon:'M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5' },
        { t: app.state.settings.cat4_title || 'Maintenance Kits', d: app.state.settings.cat4_desc || 'Complete Service Kits for Industrial Hammer Drills & Saws. Minimize your downtime.', img: app.state.settings.cat4_img || 'https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?auto=format&fit=crop&q=80&w=800', icon:'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' }
    ];

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
                                <img src="${escapeHTML(app.api(c.img))}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="${escapeHTML(c.t)}">
                                <!-- SVG overlay badge on top left -->
                                <div class="absolute top-4 left-4 w-10 h-10 bg-slate-900/60 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover:bg-[#ed1c24] transition-all duration-300">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="${escapeHTML(c.icon)}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </div>
                            </div>
                            <!-- Bottom half: Info section -->
                            <div class="p-6 flex flex-col justify-between h-48 border-t border-slate-100 bg-white flex-1">
                                <div class="space-y-2">
                                    <h4 class="font-black text-lg text-[#111111] uppercase tracking-widest truncate group-hover:text-[#ed1c24] transition-colors" title="${escapeHTML(c.t)}">${escapeHTML(c.t)}</h4>
                                    <p class="text-slate-400 text-xs font-semibold leading-relaxed line-clamp-3">${escapeHTML(c.d)}</p>
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
