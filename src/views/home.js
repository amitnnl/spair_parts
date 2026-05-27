import { escapeHTML, setHTML } from '../api.js';

export function renderHome(container, app) {
    const s = app.state.settings || {};

    // Wire up global click handlers for homepage interactions
    window.clickPopularSearch = (term) => {
        app.state.searchFilters = { query: term };
        history.pushState(null, null, app.basePath + '/catalog');
        app.handleRouting();
    };

    window.clickCategorySearch = (cat) => {
        app.state.searchFilters = { category: cat };
        history.pushState(null, null, app.basePath + '/catalog');
        app.handleRouting();
    };

    // Dynamically split their admin custom title so the last word lands in the red slanted italic banner!
    const rawTitle = s.hero_title || 'ALL POWER TOOL SPARE PARTS AVAILABLE';
    const titleParts = rawTitle.toUpperCase().split(' ');
    const lastWord = titleParts.pop() || '';
    const mainTitle = titleParts.join(' ') || '';

    // Dynamically parse the vertical pipe separators for the subtitle
    const rawSubtitle = s.hero_subtitle || 'GENUINE PARTS | HIGH QUALITY | LONG LIFE';
    const subtitleHTML = rawSubtitle.includes('|')
        ? rawSubtitle.split('|').map(part => '<span>' + escapeHTML(part.trim()) + '</span>').join(' <span class="text-[#ed1c24] font-black">|</span> ')
        : '<span>' + escapeHTML(rawSubtitle) + '</span>';

    // Retrieve their database custom uploaded slide images
    const slidesList = [s.hero_image, s.hero_image_2, s.hero_image_3].filter(Boolean);
    // If no custom uploaded slides exist, default to the generated spares composition graphic
    const displaySlides = slidesList.length > 0 ? slidesList : ['uploads/hero_spares_composition.png'];

    setHTML(container, `
        <div class="animate-fade-in bg-zinc-50 min-h-screen">
            <!-- ═══ HERO SECTION (Mockup layout & styling with dynamic content) ═══ -->
            <section class="relative bg-white overflow-hidden py-10 lg:py-16 border-b border-zinc-100">
                <!-- Visual Background Accents -->
                <div class="absolute top-0 right-0 w-1/3 h-full bg-[#111111] transform skew-x-12 translate-x-20 z-0 hidden lg:block"></div>
                <div class="absolute top-0 right-0 w-2 h-full bg-[#ed1c24] transform skew-x-12 translate-x-8 z-0 hidden lg:block"></div>

                <div class="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        
                        <!-- Left Column: Dynamic Content & Mockup layout -->
                        <div class="lg:col-span-6 space-y-6 text-center lg:text-left">
                            <div class="flex items-center justify-center lg:justify-start gap-2 text-zinc-800">
                                <span class="text-xs font-black uppercase tracking-[0.2em] font-sans text-zinc-900">All Power Tool</span>
                                <div class="w-10 h-[2.5px] bg-[#ed1c24]"></div>
                            </div>
                            
                            <h1 class="leading-none tracking-tighter">
                                <span class="block text-[40px] sm:text-[56px] font-black text-black leading-[0.95] tracking-tight uppercase font-poppins">` + escapeHTML(mainTitle) + `</span>
                                <span class="relative mt-3.5 inline-block bg-[#ed1c24] text-white text-xl sm:text-2xl font-black py-2 px-9 uppercase italic transform -skew-x-12 tracking-widest">
                                    ` + escapeHTML(lastWord) + `
                                </span>
                            </h1>

                            <p class="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                ` + subtitleHTML + `
                            </p>

                            <!-- Minimalist Outlined Badges -->
                            <div class="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto lg:mx-0 pt-6">
                                <div class="flex flex-col items-center text-center">
                                    <div class="w-12 h-12 rounded-full border-2 border-[#ed1c24] flex items-center justify-center text-[#ed1c24] bg-white mb-2.5 shadow-sm hover:scale-105 transition-transform duration-300">
                                        <svg class="w-6.5 h-6.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <span class="text-[9px] font-black uppercase tracking-wider text-zinc-700 leading-tight">Premium<br>Quality</span>
                                </div>
                                <div class="flex flex-col items-center text-center">
                                    <div class="w-12 h-12 rounded-full border-2 border-[#ed1c24] flex items-center justify-center text-[#ed1c24] bg-white mb-2.5 shadow-sm hover:scale-105 transition-transform duration-300">
                                        <svg class="w-6.5 h-6.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        </svg>
                                    </div>
                                    <span class="text-[9px] font-black uppercase tracking-wider text-zinc-700 leading-tight">Wide Range<br>of Parts</span>
                                </div>
                                <div class="flex flex-col items-center text-center">
                                    <div class="w-12 h-12 rounded-full border-2 border-[#ed1c24] flex items-center justify-center text-[#ed1c24] bg-white mb-2.5 shadow-sm hover:scale-105 transition-transform duration-300">
                                        <svg class="w-6.5 h-6.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                            <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                                        </svg>
                                    </div>
                                    <span class="text-[9px] font-black uppercase tracking-wider text-zinc-700 leading-tight">High<br>Durability</span>
                                </div>
                                <div class="flex flex-col items-center text-center">
                                    <div class="w-12 h-12 rounded-full border-2 border-[#ed1c24] flex items-center justify-center text-[#ed1c24] bg-white mb-2.5 shadow-sm hover:scale-105 transition-transform duration-300">
                                        <svg class="w-6.5 h-6.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" />
                                        </svg>
                                    </div>
                                    <span class="text-[9px] font-black uppercase tracking-wider text-zinc-700 leading-tight">Fast & Reliable<br>Delivery</span>
                                </div>
                            </div>
                        </div>

                        <!-- Right Column: Dynamic Slider containing B2B Settings Images -->
                        <div class="lg:col-span-6 relative flex flex-col items-center justify-center h-[350px] lg:h-[420px]">
                            <div class="absolute inset-0 bg-radial-gradient from-rose-100/30 to-transparent blur-3xl rounded-full opacity-40"></div>
                            
                            <!-- Slider Container -->
                            <div id="hero-slider" class="relative z-10 w-full h-full flex items-center justify-center">
                                ` + displaySlides.map((img, i) => '<img src="' + escapeHTML(app.api(img)) + '" alt="TORVO Slide ' + escapeHTML(i + 1) + '" class="hero-slide absolute max-h-full max-w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.04)] transition-opacity duration-1000 ' + (i === 0 ? 'opacity-100' : 'opacity-0') + '" data-index="' + escapeHTML(i) + '">').join('') + `
                            </div>

                            <!-- Carousel dots indicators -->
                            <div class="flex gap-2.5 mt-4 relative z-10 select-none">
                                ` + displaySlides.map((_, i) => '<span class="slider-dot w-2 h-2 rounded-full cursor-pointer transition-colors duration-300 ' + (i === 0 ? 'bg-[#ed1c24]' : 'bg-zinc-300') + '" data-dot="' + escapeHTML(i) + '"></span>').join('') + `
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <!-- ═══ BLACK STATS RIBBON (Mockup layout & red icons) ═══ -->
            <section class="bg-[#111111] text-white py-6 border-b border-zinc-800 no-print select-none">
                <div class="max-w-7xl mx-auto px-6 lg:px-10">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
                        <div class="flex items-center gap-4">
                            <div class="text-[#ed1c24] flex-shrink-0">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                                    <circle cx="5" cy="5" r="2.5" stroke="currentColor" stroke-width="2"/>
                                    <circle cx="19" cy="5" r="2.5" stroke="currentColor" stroke-width="2"/>
                                    <circle cx="12" cy="19" r="2.5" stroke="currentColor" stroke-width="2"/>
                                    <path d="M12 9V6M5.5 7.5l4.5 3M18.5 7.5l-4.5 3M12 15v1.5" stroke="currentColor" stroke-width="2.5"/>
                                </svg>
                            </div>
                            <div class="space-y-0.5">
                                <span class="block text-xl font-extrabold tracking-tight leading-none text-white font-poppins">10,000+</span>
                                <span class="block text-[9px] font-bold uppercase tracking-wider text-zinc-400">Parts Across Top Brands</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-[#ed1c24] flex-shrink-0">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <div class="space-y-0.5">
                                <span class="block text-xl font-extrabold tracking-tight leading-none text-white font-poppins">500+</span>
                                <span class="block text-[9px] font-bold uppercase tracking-wider text-zinc-400">Brands Available</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-[#ed1c24] flex-shrink-0">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div class="space-y-0.5">
                                <span class="block text-xl font-extrabold tracking-tight leading-none text-white font-poppins">1L+</span>
                                <span class="block text-[9px] font-bold uppercase tracking-wider text-zinc-400">Happy B2B Customers</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-[#ed1c24] flex-shrink-0">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div class="space-y-0.5">
                                <span class="block text-xl font-extrabold tracking-tight leading-none text-white font-poppins">99.7%</span>
                                <span class="block text-[9px] font-bold uppercase tracking-wider text-zinc-400">Order Accuracy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ═══ POPULAR SEARCHES BAR (Mockup: White bar with grey tag pills) ═══ -->
            <section class="bg-white py-3 border-b border-zinc-200/50 no-print shadow-sm">
                <div class="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap items-center gap-4">
                    <span class="text-[10px] font-extrabold uppercase tracking-widest text-zinc-800">Popular Searches:</span>
                    <div class="flex flex-wrap gap-2">
                        ` + ['Carbon Brush', 'Armature', 'Bearing', 'Switch', 'Chuck', 'Gear', 'Field Coil', 'Spindle', 'Rotor', 'Stator'].map(term => '<button onclick="clickPopularSearch(\'' + term + '\')" class="px-4 py-1.5 bg-zinc-50 border border-zinc-200 hover:border-[#ed1c24] hover:text-[#ed1c24] text-[10px] font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer">' + term + '</button>').join('') + `
                    </div>
                </div>
            </section>

            <!-- ═══ SHOP BY TOP CATEGORIES (Mockup categories layout with DYNAMIC text/images) ═══ -->
            <section class="py-16 bg-zinc-50">
                <div class="max-w-7xl mx-auto px-6 lg:px-10">
                    
                    <!-- Header -->
                    <div class="flex items-center justify-between mb-10">
                        <div>
                            <h2 class="text-2xl sm:text-3xl font-black text-black tracking-tight font-poppins uppercase">Shop by Top Categories</h2>
                        </div>
                        <a href="/categories" data-link class="text-xs font-bold text-[#ed1c24] hover:text-[#c1121f] transition-colors flex items-center gap-1.5 uppercase tracking-wider font-poppins">
                            View All Categories 
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M9 5l7 7-7 7"/></svg>
                        </a>
                    </div>

                    <!-- Dynamic Category Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        ` + (app.state.categories || []).map(c => `
                            <div onclick="clickCategorySearch('${escapeHTML(c.title).replace(/'/g, "\\'")}')" class="bg-white rounded-3xl overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-1 ring-1 ring-slate-900/5 shadow-sm hover:shadow-md flex flex-row items-center p-3 gap-4 animate-in zoom-in duration-700">
                                <div class="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center shrink-0 border border-slate-100">
                                    ${c.image_url 
                                        ? `<img src="${escapeHTML(app.api(c.image_url))}" alt="${escapeHTML(c.title)}" class="w-full h-full object-contain p-2 drop-shadow-sm group-hover:scale-110 transition-transform duration-500">` 
                                        : `<div class="w-full h-full flex items-center justify-center text-slate-300 group-hover:text-[#ed1c24] transition-colors duration-300"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path d="${escapeHTML(c.icon_svg)}"/></svg></div>`}
                                </div>
                                <div class="flex-1 min-w-0 pr-2">
                                    <h4 class="font-bold text-sm text-slate-900 tracking-tight truncate group-hover:text-[#ed1c24] transition-colors" title="${escapeHTML(c.title)}">${escapeHTML(c.title)}</h4>
                                    <p class="text-[10px] text-slate-400 font-medium truncate mt-0.5">${escapeHTML(c.description || 'Explore Parts')}</p>
                                </div>
                                <div class="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#ed1c24] text-slate-400 group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm group-hover:shadow-red-500/30">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                                </div>
                            </div>
                        `).join('') + `
                    </div>
                </div>
            </section>

            <!-- ═══ TRUSTED BY PROFESSIONALS (100% Mockup Exact brand logos with actual visual styling) ═══ -->
            <section class="py-12 bg-white border-y border-zinc-200/80">
                <div class="max-w-7xl mx-auto px-6 lg:px-10">
                    <div class="text-center mb-8">
                        <span class="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Trusted by Professionals. Preferred by Brands.</span>
                    </div>
                    
                    <div class="flex items-center justify-between gap-4 relative">
                        <!-- Left Arrow (Red circle chevrons) -->
                        <button class="w-8 h-8 rounded-full border border-zinc-200 hover:border-[#ed1c24] flex items-center justify-center text-zinc-400 hover:text-[#ed1c24] transition-all flex-shrink-0 cursor-pointer shadow-sm bg-white hover:bg-rose-50">
                            <span class="text-xs font-bold font-mono">&lt;</span>
                        </button>
                        
                        <!-- Brand Logos Row -->
                        <div class="flex-1 overflow-x-auto no-scrollbar py-2">
                            <div class="flex justify-between items-center min-w-[900px] gap-8 select-none">
                                
                                <!-- 1. BOSCH -->
                                <div class="flex items-center gap-1">
                                    <div class="w-5 h-5 rounded-full border-[1.5px] border-[#ed1c24] flex items-center justify-center flex-shrink-0">
                                        <div class="w-2.5 h-2.5 bg-[#ed1c24] rounded-full"></div>
                                    </div>
                                    <span class="text-lg font-black tracking-tight text-zinc-950 uppercase font-sans">BOSCH</span>
                                </div>

                                <!-- 2. Makita -->
                                <span class="text-xl font-extrabold tracking-tight text-[#008f8c] font-sans lowercase" style="font-family: sans-serif;">makita</span>

                                <!-- 3. DEWALT -->
                                <div class="bg-[#feb80a] text-black px-3 py-1 font-black text-xs uppercase tracking-tighter shadow-sm font-sans">DEWALT</div>

                                <!-- 4. metabo -->
                                <span class="text-xl font-extrabold italic tracking-tighter text-zinc-950 font-sans">metabo</span>

                                <!-- 5. BLACK+DECKER -->
                                <div class="border-2 border-[#ff6b00] px-3 py-1 text-black font-black text-[10px] tracking-tight uppercase shadow-sm">BLACK+DECKER</div>

                                <!-- 6. HITACHI -->
                                <span class="text-lg font-black tracking-tight text-[#ed1c24] uppercase font-sans">HITACHI</span>

                                <!-- 7. Milwaukee -->
                                <span class="text-2xl font-bold tracking-tighter text-[#ed1c24] italic" style="font-family: 'Brush Script MT', cursive, sans-serif;">Milwaukee</span>

                                <!-- 8. RYOBI -->
                                <span class="text-xl font-extrabold tracking-widest text-zinc-950 font-sans">RYOBI</span>
                            </div>
                        </div>

                        <!-- Right Arrow (Red circle chevrons) -->
                        <button class="w-8 h-8 rounded-full border border-zinc-200 hover:border-[#ed1c24] flex items-center justify-center text-zinc-400 hover:text-[#ed1c24] transition-all flex-shrink-0 cursor-pointer shadow-sm bg-white hover:bg-rose-50">
                            <span class="text-xs font-bold font-mono">&gt;</span>
                        </button>
                    </div>
                </div>
            </section>

            <!-- ═══ BOTTOM STATS/INFO BAR (Mockup: 5 columns with red outline circles) ═══ -->
            <section class="py-12 bg-white border-b border-zinc-100 text-zinc-600 no-print">
                <div class="max-w-7xl mx-auto px-6 lg:px-10">
                    <div class="grid grid-cols-2 md:grid-cols-5 gap-8 items-start">
                        
                        <!-- 1. Wide Range -->
                        <div class="flex items-start gap-3.5">
                            <div class="w-8 h-8 rounded-full border border-[#ed1c24] flex items-center justify-center text-[#ed1c24] flex-shrink-0 bg-white shadow-sm">
                                <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2" />
                                </svg>
                            </div>
                            <div class="space-y-1">
                                <span class="block text-[11px] font-black uppercase tracking-wider text-slate-800 leading-tight">Wide Range</span>
                                <span class="block text-[10px] text-zinc-400 font-medium">10,000+ parts in 100+ categories</span>
                            </div>
                        </div>

                        <!-- 2. Easy Lookup -->
                        <div class="flex items-start gap-3.5">
                            <div class="w-8 h-8 rounded-full border border-[#ed1c24] flex items-center justify-center text-[#ed1c24] flex-shrink-0 bg-white shadow-sm">
                                <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <div class="space-y-1">
                                <span class="block text-[11px] font-black uppercase tracking-wider text-slate-800 leading-tight">Easy Lookup</span>
                                <span class="block text-[10px] text-zinc-400 font-medium">Find parts by model, diagram & part number</span>
                            </div>
                        </div>

                        <!-- 3. Bulk Ordering -->
                        <div class="flex items-start gap-3.5">
                            <div class="w-8 h-8 rounded-full border border-[#ed1c24] flex items-center justify-center text-[#ed1c24] flex-shrink-0 bg-white shadow-sm">
                                <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                                </svg>
                            </div>
                            <div class="space-y-1">
                                <span class="block text-[11px] font-black uppercase tracking-wider text-slate-800 leading-tight">Bulk Ordering</span>
                                <span class="block text-[10px] text-zinc-400 font-medium">Simplified bulk order & repeat order</span>
                            </div>
                        </div>

                        <!-- 4. Secure Payments -->
                        <div class="flex items-start gap-3.5">
                            <div class="w-8 h-8 rounded-full border border-[#ed1c24] flex items-center justify-center text-[#ed1c24] flex-shrink-0 bg-white shadow-sm">
                                <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div class="space-y-1">
                                <span class="block text-[11px] font-black uppercase tracking-wider text-slate-800 leading-tight">Secure Payments</span>
                                <span class="block text-[10px] text-zinc-400 font-medium">Multiple payment options & GST invoicing</span>
                            </div>
                        </div>

                        <!-- 5. Pan India Delivery -->
                        <div class="flex items-start gap-3.5">
                            <div class="w-8 h-8 rounded-full border border-[#ed1c24] flex items-center justify-center text-[#ed1c24] flex-shrink-0 bg-white shadow-sm">
                                <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" />
                                </svg>
                            </div>
                            <div class="space-y-1">
                                <span class="block text-[11px] font-black uppercase tracking-wider text-slate-800 leading-tight">Pan India Delivery</span>
                                <span class="block text-[10px] text-zinc-400 font-medium">Fast & reliable delivery across India</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    `);

    // Initialize Hero Slider with Dynamic Slides
    setTimeout(() => {
        let current = 0;
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.slider-dot');
        if (slides.length <= 1) return;
        
        const timer = setInterval(() => {
            const next = (current + 1) % slides.length;
            const currentSlide = document.querySelector(`.hero-slide[data-index="${current}"]`);
            const nextSlide = document.querySelector(`.hero-slide[data-index="${next}"]`);
            
            if (!currentSlide || !nextSlide) {
                clearInterval(timer);
                return;
            }
            
            currentSlide.style.opacity = '0';
            nextSlide.style.opacity = '1';

            dots.forEach(dot => dot.classList.replace('bg-[#ed1c24]', 'bg-zinc-300'));
            const activeDot = document.querySelector(`.slider-dot[data-dot="${next}"]`);
            if (activeDot) activeDot.classList.replace('bg-zinc-300', 'bg-[#ed1c24]');

            current = next;
        }, 5000);

        // Allow manual dot navigation click
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const targetIdx = parseInt(dot.getAttribute('data-dot'));
                if (targetIdx === current) return;
                
                const currentSlide = document.querySelector(`.hero-slide[data-index="${current}"]`);
                const nextSlide = document.querySelector(`.hero-slide[data-index="${targetIdx}"]`);
                
                if (currentSlide && nextSlide) {
                    currentSlide.style.opacity = '0';
                    nextSlide.style.opacity = '1';
                    
                    dots.forEach(d => d.classList.replace('bg-[#ed1c24]', 'bg-zinc-300'));
                    dot.classList.replace('bg-zinc-300', 'bg-[#ed1c24]');
                    
                    current = targetIdx;
                }
            });
        });

        // Auto-cleanup when navigating away
        const observer = new MutationObserver(() => {
            if (!document.getElementById('hero-slider')) {
                clearInterval(timer);
                observer.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }, 100);
}
