import { escapeHTML, setHTML } from '../api.js';
import { productCard } from './catalog.js';

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
                                <span class="text-xs font-black uppercase tracking-[0.25em] font-sans text-slate-900">All Power Tools</span>
                                <div class="w-10 h-[2.5px] bg-[#ed1c24]"></div>
                            </div>
                            
                            <h1 class="leading-none tracking-tighter">
                                <span class="block text-[40px] sm:text-[56px] font-black text-black leading-[0.95] tracking-tight uppercase font-poppins">` + escapeHTML(mainTitle) + `</span>
                                <span class="relative mt-3.5 inline-block bg-[#ed1c24] text-white text-xl sm:text-2xl font-black py-2 px-9 uppercase italic transform -skew-x-12 tracking-widest">
                                    ` + escapeHTML(lastWord) + `
                                </span>
                            </h1>

                            <p class="text-xs font-extrabold tracking-[0.25em] text-slate-600 uppercase flex flex-wrap items-center justify-center lg:justify-start gap-3">
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
                                    <span class="text-xs sm:text-xs font-black uppercase tracking-widest text-slate-800 leading-tight">Premium<br>Quality</span>
                                </div>
                                <div class="flex flex-col items-center text-center">
                                    <div class="w-12 h-12 rounded-full border-2 border-[#ed1c24] flex items-center justify-center text-[#ed1c24] bg-white mb-2.5 shadow-sm hover:scale-105 transition-transform duration-300">
                                        <svg class="w-6.5 h-6.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        </svg>
                                    </div>
                                    <span class="text-xs sm:text-xs font-black uppercase tracking-widest text-slate-800 leading-tight">Wide Range<br>Of Parts</span>
                                </div>
                                <div class="flex flex-col items-center text-center">
                                    <div class="w-12 h-12 rounded-full border-2 border-[#ed1c24] flex items-center justify-center text-[#ed1c24] bg-white mb-2.5 shadow-sm hover:scale-105 transition-transform duration-300">
                                        <svg class="w-6.5 h-6.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                            <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                                        </svg>
                                    </div>
                                    <span class="text-xs sm:text-xs font-black uppercase tracking-widest text-slate-800 leading-tight">High<br>Durability</span>
                                </div>
                                <div class="flex flex-col items-center text-center">
                                    <div class="w-12 h-12 rounded-full border-2 border-[#ed1c24] flex items-center justify-center text-[#ed1c24] bg-white mb-2.5 shadow-sm hover:scale-105 transition-transform duration-300">
                                        <svg class="w-6.5 h-6.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" />
                                        </svg>
                                    </div>
                                    <span class="text-xs sm:text-xs font-black uppercase tracking-widest text-slate-800 leading-tight">Fast & Reliable<br>Delivery</span>
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
                            <div class="space-y-1">
                                <span class="block text-2xl font-extrabold tracking-tight leading-none text-white font-poppins">10,000+</span>
                                <span class="block text-xs font-bold uppercase tracking-widest text-zinc-300">Parts Across Top Brands</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-[#ed1c24] flex-shrink-0">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <div class="space-y-1">
                                <span class="block text-2xl font-extrabold tracking-tight leading-none text-white font-poppins">500+</span>
                                <span class="block text-xs font-bold uppercase tracking-widest text-zinc-300">Brands Available</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-[#ed1c24] flex-shrink-0">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div class="space-y-1">
                                <span class="block text-2xl font-extrabold tracking-tight leading-none text-white font-poppins">1L+</span>
                                <span class="block text-xs font-bold uppercase tracking-widest text-zinc-300">Happy B2B Customers</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-[#ed1c24] flex-shrink-0">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div class="space-y-1">
                                <span class="block text-2xl font-extrabold tracking-tight leading-none text-white font-poppins">99.7%</span>
                                <span class="block text-xs font-bold uppercase tracking-widest text-zinc-300">Order Accuracy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 🏆 TRENDING SEARCHES BAR (Premium Redesign) 🏆 -->
              <section class="bg-white py-5 border-b border-zinc-100 no-print relative z-20 shadow-sm">
                  <div class="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                      <div class="flex items-center gap-3 shrink-0">
                          <div class="relative flex h-2.5 w-2.5">
                              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ed1c24] opacity-75"></span>
                              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ed1c24]"></span>
                          </div>
                          <span class="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Trending Now</span>
                      </div>
                      
                      <!-- Hide scrollbar, allow horizontal scroll on smaller screens -->
                      <div class="flex overflow-x-auto no-scrollbar gap-3 pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
                          ` + ['Carbon Brush', 'Armature', 'Bearing', 'Switch', 'Chuck', 'Gear', 'Field Coil', 'Spindle', 'Rotor', 'Stator'].map(term => `
                              <button onclick="clickPopularSearch('${term}')" class="group flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 hover:border-[#ed1c24]/40 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_15px_rgba(237,28,36,0.08)] transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer">
                                  <svg class="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#ed1c24] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                  <span class="text-[11px] font-bold uppercase tracking-wider text-slate-600 group-hover:text-[#ed1c24] transition-colors">${term}</span>
                              </button>
                          `).join('') + `
                      </div>
                  </div>
              </section>

              <!-- 🏆 SHOP BY TOP CATEGORIES (Premium Light Redesign) 🏆 -->
              <section class="py-20 relative overflow-hidden bg-zinc-50">
                  <div class="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
                      <!-- Header -->
                      <div class="flex items-end justify-between mb-12">
                          <div class="max-w-2xl">
                              <div class="text-[10px] font-black uppercase tracking-[0.4em] text-[#ed1c24] mb-3 flex items-center gap-3">
                                  <span class="w-8 h-[2px] bg-[#ed1c24] rounded-full"></span>
                                  Discover Inventory
                              </div>
                              <h2 class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">Top Categories</h2>
                          </div>
                          <div class="flex items-center gap-5">
                              <!-- Scroll Arrows -->
                              <div class="hidden sm:flex gap-3">
                                  <button onclick="document.getElementById('category-scroll-track').scrollBy({left: -344, behavior: 'smooth'})" class="w-12 h-12 rounded-full border border-zinc-200 hover:border-[#ed1c24] flex items-center justify-center text-zinc-500 hover:text-[#ed1c24] transition-all duration-300 flex-shrink-0 cursor-pointer bg-white hover:bg-rose-50 shadow-sm group">
                                      <svg class="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
                                  </button>
                                  <button onclick="document.getElementById('category-scroll-track').scrollBy({left: 344, behavior: 'smooth'})" class="w-12 h-12 rounded-full border border-zinc-200 hover:border-[#ed1c24] flex items-center justify-center text-zinc-500 hover:text-[#ed1c24] transition-all duration-300 flex-shrink-0 cursor-pointer bg-white hover:bg-rose-50 shadow-sm group">
                                      <svg class="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                                  </button>
                              </div>
                              <a href="/categories" data-link class="group flex items-center justify-center w-12 h-12 sm:w-auto sm:px-6 sm:py-3 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-[#ed1c24] transition-all duration-300 shadow-md hover:shadow-red-500/20 ml-2">
                                  <span class="hidden sm:block mr-2">View All</span>
                                  <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                              </a>
                          </div>
                      </div>
  
                      <!-- Standard Width Dynamic Category Horizontal Row -->
                      <div class="w-full relative">
                          <div id="category-scroll-track" class="flex overflow-x-auto no-scrollbar gap-6 pb-8 pt-4 snap-x items-stretch px-1">
                              ` + (app.state.categories || []).map(c => {
                                  const iconOrImg = c.image_url 
                                      ? '<img src="' + escapeHTML(app.api(c.image_url)) + '" alt="' + escapeHTML(c.title) + '" class="w-full h-full object-contain p-2 drop-shadow-sm group-hover:scale-110 transition-transform duration-500">' 
                                      : '<div class="w-full h-full flex items-center justify-center text-slate-300 group-hover:text-[#ed1c24] transition-colors duration-500"><svg class="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path d="' + escapeHTML(c.icon_svg) + '"/></svg></div>';
                                  
                                  return '<div onclick="clickCategorySearch(\'' + escapeHTML(c.title).replace(/'/g, "\\'") + '\')" class="relative bg-white rounded-3xl overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-2 ring-1 ring-slate-900/5 hover:ring-[#ed1c24]/50 shadow-sm hover:shadow-[0_8px_30px_rgba(237,28,36,0.1)] flex flex-col sm:flex-row items-center sm:items-start p-5 gap-5 shrink-0 w-[260px] sm:w-[340px] snap-start h-full">' +
                                      '<div class="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:border-[#ed1c24]/20 group-hover:bg-rose-50/30 transition-colors duration-500">' +
                                          iconOrImg +
                                      '</div>' +
                                      '<div class="flex-1 min-w-0 text-center sm:text-left flex flex-col justify-between h-full z-10">' +
                                          '<div>' +
                                              '<h4 class="font-bold text-lg text-slate-900 tracking-tight truncate group-hover:text-[#ed1c24] transition-colors duration-300" title="' + escapeHTML(c.title) + '">' + escapeHTML(c.title) + '</h4>' +
                                              '<p class="text-xs text-slate-500 font-medium line-clamp-2 mt-1 leading-relaxed">' + escapeHTML(c.description || 'Explore Parts') + '</p>' +
                                          '</div>' +
                                          '<div class="mt-4 sm:mt-auto flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black uppercase tracking-widest text-[#ed1c24] group-hover:text-[#c1121f] transition-colors duration-300">' +
                                              'Shop Now ' +
                                              '<svg class="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>' +
                                          '</div>' +
                                      '</div>' +
                                  '</div>';
                              }).join('') + `
                          </div>
                          
                          <!-- Right Edge Fade Mask -->
                          <div class="absolute top-0 right-0 w-12 lg:w-32 h-full bg-gradient-to-l from-zinc-50 to-transparent pointer-events-none z-10"></div>
                      </div>
                  </div>
              </section>

            <!-- ═══ GENUINE PARTS CATALOG ═══ -->
            <section class="py-16 bg-white border-y border-zinc-200/80">
                <div class="max-w-7xl mx-auto px-6 lg:px-10">
                    <!-- Header -->
                    <div class="flex items-center justify-between mb-10">
                        <div>
                            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">Genuine Parts Catalog</h2>
                        </div>
                        <a href="/catalog" data-link class="text-sm font-bold text-[#ed1c24] hover:text-[#c1121f] transition-colors flex items-center gap-1.5 uppercase tracking-widest underline decoration-2 underline-offset-4 decoration-rose-200 hover:decoration-[#ed1c24]">
                            View All Parts 
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M9 5l7 7-7 7"/></svg>
                        </a>
                    </div>

                    <!-- Products Grid Placeholder -->
                    <div id="home-genuine-parts-container" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                        <div class="col-span-full py-20 text-center flex flex-col items-center justify-center">
                            <div class="animate-spin w-10 h-10 border-4 border-slate-200 border-t-[#ed1c24] rounded-full mb-4"></div>
                            <p class="text-xs font-black text-slate-500 uppercase tracking-widest">Loading Catalog...</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ═══ Trusted By PROFESSIONALS (100% Mockup Exact brand logos with actual visual styling) ═══ -->
            <section class="py-12 bg-white border-y border-zinc-200/80">
                <div class="max-w-7xl mx-auto px-6 lg:px-10">
                    <div class="text-center mb-8">
                        <span class="text-xs font-extrabold uppercase tracking-[0.3em] text-slate-500">Trusted By Professionals. Preferred By Brands.</span>
                    </div>
                    
                    <div class="relative w-full overflow-hidden py-4">
                        <!-- Fade masks -->
                        <div class="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                        <div class="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                        
                        <div class="animate-marquee select-none">
                            ` + Array(3).fill(`
                                <div class="flex items-center gap-16 px-8">
                                    <div class="flex items-center gap-1">
                                        <div class="w-5 h-5 rounded-full border-[1.5px] border-[#ed1c24] flex items-center justify-center flex-shrink-0">
                                            <div class="w-2.5 h-2.5 bg-[#ed1c24] rounded-full"></div>
                                        </div>
                                        <span class="text-lg font-black tracking-tight text-zinc-950 uppercase font-sans">BOSCH</span>
                                    </div>
                                    <span class="text-xl font-extrabold tracking-tight text-[#008f8c] font-sans lowercase" style="font-family: sans-serif;">makita</span>
                                    <div class="bg-[#feb80a] text-black px-3 py-1 font-black text-xs uppercase tracking-tighter shadow-sm font-sans">DEWALT</div>
                                    <span class="text-xl font-extrabold italic tracking-tighter text-zinc-950 font-sans">metabo</span>
                                    <div class="border-2 border-[#ff6b00] px-3 py-1 text-black font-black text-xs tracking-tight uppercase shadow-sm">BLACK+DECKER</div>
                                    <span class="text-lg font-black tracking-tight text-[#ed1c24] uppercase font-sans">HITACHI</span>
                                    <span class="text-2xl font-bold tracking-tighter text-[#ed1c24] italic" style="font-family: 'Brush Script MT', cursive, sans-serif;">Milwaukee</span>
                                    <span class="text-xl font-extrabold tracking-widest text-zinc-950 font-sans">RYOBI</span>
                                </div>
                            `).join('') + `
                        </div>
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
                                <span class="block text-xs font-black uppercase tracking-widest text-slate-900 leading-tight">Wide Range</span>
                                <span class="block text-xs text-slate-500 font-medium mt-1">10,000+ parts in 100+ categories</span>
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
                                <span class="block text-xs font-black uppercase tracking-widest text-slate-900 leading-tight">Easy Lookup</span>
                                <span class="block text-xs text-slate-500 font-medium mt-1">Find parts by model, diagram & part number</span>
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
                                <span class="block text-xs font-black uppercase tracking-widest text-slate-900 leading-tight">Bulk Ordering</span>
                                <span class="block text-xs text-slate-500 font-medium mt-1">Simplified bulk order & repeat order</span>
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
                                <span class="block text-xs font-black uppercase tracking-widest text-slate-900 leading-tight">Secure Payments</span>
                                <span class="block text-xs text-slate-500 font-medium mt-1">Multiple payment options & GST invoicing</span>
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
                                <span class="block text-xs font-black uppercase tracking-widest text-slate-900 leading-tight">Pan India Delivery</span>
                                <span class="block text-xs text-slate-500 font-medium mt-1">Fast & reliable delivery across India</span>
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

    // Fetch and render genuine parts catalog
    fetch(app.api('api/products.php'))
        .then(res => res.json())
        .then(data => {
            const partsContainer = document.getElementById('home-genuine-parts-container');
            if (!partsContainer) return;
            
            const parts = (data.products || []).slice(0, 10);
            
            if (parts.length === 0) {
                setHTML(partsContainer, '<div class="col-span-full py-10 text-center text-slate-500 font-bold">No parts available.</div>');
                return;
            }
            
            const html = parts.map(part => productCard(part)).join('');
            
            setHTML(partsContainer, html);
        })
        .catch(err => {
            const partsContainer = document.getElementById('home-genuine-parts-container');
            if (partsContainer) {
                setHTML(partsContainer, '<div class="col-span-full py-10 text-center text-rose-500 font-bold">Failed to load parts catalog.</div>');
            }
        });
}
