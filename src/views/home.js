import { state } from '../state.js';

export function renderHome(container) {
    container.innerHTML = `
        <div class="animate-fade-in">
            <!-- Hero Section (Reference Image 1) -->
            <section class="relative bg-white pt-20 pb-16 overflow-hidden border-b border-slate-100">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div class="flex flex-col lg:flex-row items-center gap-20">
                        <div class="flex-1 text-center lg:text-left">
                            <h1 class="text-6xl lg:text-[84px] font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
                                ${(state.settings.hero_title || 'THE RIGHT PART. EVERY TIME.').split('.').join('.<br/>')}
                            </h1>
                            <p class="text-xl text-slate-600 mb-12 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                                ${state.settings.hero_subtitle || 'Premium B2B procurement portal for genuine power tool spare parts.'}
                            </p>
                            
                            <div class="flex flex-wrap justify-center lg:justify-start gap-10 mb-16">
                                <div class="flex items-center gap-3">
                                    <div class="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg></div>
                                    <span class="text-sm font-black text-slate-800 uppercase tracking-wider">Genuine Parts</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg></div>
                                    <span class="text-sm font-black text-slate-800 uppercase tracking-wider">B2B Pricing</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg></div>
                                    <span class="text-sm font-black text-slate-800 uppercase tracking-wider">Pan India</span>
                                </div>
                            </div>

                        </div>
                        
                        <!-- Hero Image -->
                        <div class="flex-1 relative hidden lg:block">
                            <div class="absolute -inset-10 bg-primary/10 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
                            <div class="relative rounded-[48px] overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-all duration-700 h-[650px]">
                                <img src="${app.api(state.settings.hero_image) || 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000'}" alt="Industrial Parts" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                            </div>
                            <div class="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-6 animate-bounce">
                                <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Partners</p>
                                    <p class="text-2xl font-black text-slate-900">5,000+</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tabbed Search Module (Full Width Command Center) -->
                <div class="relative z-20 mt-12 mb-12">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,86,179,0.15)] border border-slate-100 p-2 overflow-hidden animate-slide-up">
                            <div class="flex p-1 gap-1">
                                <button class="flex-1 py-4 text-xs font-black uppercase tracking-widest text-primary bg-primary/5 rounded-2xl border border-primary/10">Search by Part</button>
                                <button class="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Search by Tool</button>
                            </div>
                            <div class="p-6 flex flex-col md:flex-row gap-4">
                                <div class="relative flex-shrink-0 w-full md:w-64">
                                    <select class="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 text-sm font-black text-slate-800 appearance-none focus:outline-none focus:border-primary transition-all">
                                        <option>SELECT BRAND</option>
                                        <option>BOSCH</option>
                                        <option>MAKITA</option>
                                        <option>DEWALT</option>
                                        <option>HIKOKI</option>
                                    </select>
                                    <div class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M19 9l-7 7-7-7"/></svg>
                                    </div>
                                </div>
                                <div class="relative flex-grow">
                                    <input type="text" placeholder="Enter Part Name, No. or Model..." class="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-14 text-sm font-bold text-slate-800 focus:outline-none focus:border-primary transition-all">
                                    <div class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                    </div>
                                </div>
                                <button class="h-14 px-12 bg-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">Find Parts</button>
                            </div>
                            <div class="px-8 pb-6 flex items-center gap-4">
                                <span class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Hot Searches:</span>
                                <div class="flex gap-4">
                                    <a href="#" class="text-[11px] font-bold text-primary hover:underline">Carbon Brush</a>
                                    <a href="#" class="text-[11px] font-bold text-primary hover:underline">Armature</a>
                                    <a href="#" class="text-[11px] font-bold text-primary hover:underline">Field Coil</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Features Section (Reference Image 2) -->
            <section class="pb-16 bg-slate-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-24">
                        <h2 class="text-4xl font-black text-slate-900 mb-4 tracking-tight">Built for Professionals.</h2>
                        <p class="text-slate-500 font-bold text-lg">Streamlining industrial spare parts procurement across India.</p>
                        <div class="w-24 h-1.5 bg-primary mx-auto rounded-full mt-8"></div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        ${[
                            { icon:'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', t:'Wide Inventory', d:'Over 15,000 SKUs from 20+ world-class brands ready to ship.' },
                            { icon:'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', t:'Precision Lookup', d:'Advanced search by part number, model, or technical diagram.' },
                            { icon:'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6 0a1 1 0 001 1h1m-6 0a1 1 0 001 1h1', t:'Bulk Processing', d:'Dedicated workflow for volume orders and recurring maintenance.' },
                            { icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', t:'B2B Benefits', d:'Special contract pricing, credit facility, and priority support.' }
                        ].map(f => `
                            <div class="flex flex-col items-center text-center group">
                                <div class="w-20 h-20 rounded-[28px] bg-white shadow-premium border border-slate-100 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
                                    <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="${f.icon}"/></svg>
                                </div>
                                <h4 class="text-lg font-black text-slate-900 mb-3">${f.t}</h4>
                                <p class="text-sm text-slate-500 font-medium leading-relaxed px-2">${f.d}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <!-- Shop by Category - Dynamic Accordion -->
            <section class="pb-16 bg-white relative overflow-hidden">
                <div class="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div class="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                        <div class="max-w-3xl">
                            <h2 class="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4">Shop by Core Categories.</h2>
                            <p class="text-slate-500 font-bold text-lg leading-relaxed max-w-xl">Precision-engineered spares for every industrial tool in your fleet. Hover to explore.</p>
                        </div>
                        <a href="/catalog" data-link class="inline-flex items-center gap-3 px-8 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 uppercase tracking-widest text-[10px] font-black group transition-all border border-slate-200">
                            View Entire Catalog 
                            <div class="w-6 h-6 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/20 text-white">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </a>
                    </div>
                    
                    <div class="flex flex-col md:flex-row gap-4 h-[400px] md:h-[250px] lg:h-[300px] w-full">
                        ${[
                            { t: state.settings.cat1_title || 'Electrical Spares', d: state.settings.cat1_desc || 'Switches, Carbon Brushes, Armatures & Field Coils built for high thermal endurance.', img: state.settings.cat1_img || 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800', icon:'M13 10V3L4 14h7v7l9-11h-7z' },
                            { t: state.settings.cat2_title || 'Mechanical Units', d: state.settings.cat2_desc || 'Precision Gears, Bearings, Shafts & Housing Assemblies ensuring seamless kinetic transfer.', img: state.settings.cat2_img || 'https://images.unsplash.com/photo-1530124566582-a618bc2615ad?auto=format&fit=crop&q=80&w=800', icon:'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
                            { t: state.settings.cat3_title || 'Power Attachments', d: state.settings.cat3_desc || 'Chucks, SDS Adaptors, Cutting Discs & Drill Bits engineered for brutal workloads.', img: state.settings.cat3_img || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800', icon:'M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5' },
                            { t: state.settings.cat4_title || 'Maintenance Kits', d: state.settings.cat4_desc || 'Complete Service Kits for Industrial Hammer Drills & Saws. Minimize your downtime.', img: state.settings.cat4_img || 'https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?auto=format&fit=crop&q=80&w=800', icon:'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' }
                        ].map((c) => `
                            <a href="/catalog" data-link class="group relative rounded-[40px] overflow-hidden bg-slate-800 flex-1 hover:flex-[3] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] flex items-end p-6 md:p-10 shadow-2xl hover:shadow-primary/20 cursor-pointer">
                                <div class="absolute inset-0">
                                    <img src="${c.img}" alt="${c.t}" class="w-full h-full object-cover opacity-50 mix-blend-overlay group-hover:scale-110 group-hover:opacity-100 transition-all duration-[1200ms] ease-out">
                                </div>
                                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-70 transition-all duration-700"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                                
                                <div class="relative z-10 w-full flex flex-col justify-end">
                                    <div class="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-6 group-hover:bg-primary group-hover:text-white group-hover:-translate-y-2 transition-all duration-500 border border-white/10 shrink-0 shadow-lg">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${c.icon}"/></svg>
                                    </div>
                                    <div class="overflow-hidden">
                                        <h4 class="text-2xl md:text-3xl font-black text-white mb-2 whitespace-nowrap transform group-hover:translate-x-2 transition-transform duration-500">${c.t}</h4>
                                        <div class="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                            <div class="overflow-hidden">
                                                <div class="transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                                    <p class="text-sm md:text-base text-slate-300 font-bold leading-relaxed pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 whitespace-normal min-w-[200px] max-w-sm">${c.d}</p>
                                                    <span class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 bg-primary/10 px-4 py-2 rounded-xl">
                                                        Explore Collection <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </section>

            <!-- Brand Strip -->
            <section class="py-12 bg-white border-y border-slate-100">
                <div class="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <span class="text-2xl font-black tracking-tighter text-slate-400">BOSCH</span>
                    <span class="text-2xl font-black tracking-tighter text-slate-400">MAKITA</span>
                    <span class="text-2xl font-black tracking-tighter text-slate-400">DEWALT</span>
                    <span class="text-2xl font-black tracking-tighter text-slate-400">HIKOKI</span>
                    <span class="text-2xl font-black tracking-tighter text-slate-400">MILWAUKEE</span>
                    <span class="text-2xl font-black tracking-tighter text-slate-400">HILTI</span>
                </div>
            </section>
        </div>
    `;
}
