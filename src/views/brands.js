import { escapeHTML, setHTML } from '../api.js';

export function renderBrands(container, app) {
    const s = app.state.settings || {};

    // Build brands array from settings (with SVG fallback logos)
    const defaultSvgs = [
        `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
            <circle cx="20" cy="20" r="18" fill="#E20015"/><text x="20" y="25" text-anchor="middle" fill="white" font-size="11" font-weight="bold" font-family="Arial">b</text>
            <text x="50" y="26" fill="#1a1a1a" font-size="18" font-weight="900" font-family="Arial">BOSCH</text></svg>`,
        `<svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
            <rect x="0" y="8" width="26" height="26" rx="3" fill="#00ADEF"/><text x="13" y="27" text-anchor="middle" fill="white" font-size="14" font-weight="900" font-family="Arial">M</text>
            <text x="36" y="28" fill="#1a1a1a" font-size="18" font-weight="900" font-family="Arial">MAKITA</text></svg>`,
        `<svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
            <rect x="0" y="5" width="135" height="32" rx="4" fill="#FEBD17"/>
            <text x="68" y="27" text-anchor="middle" fill="#1a1a1a" font-size="16" font-weight="900" font-family="Arial" letter-spacing="2">DEWALT</text></svg>`,
        `<svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
            <rect x="0" y="5" width="32" height="32" rx="4" fill="#E30613"/><text x="16" y="27" text-anchor="middle" fill="white" font-size="13" font-weight="900" font-family="Arial">HI</text>
            <text x="42" y="28" fill="#1a1a1a" font-size="18" font-weight="900" font-family="Arial">HiKOKI</text></svg>`,
        `<svg viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
            <rect x="0" y="5" width="155" height="32" rx="4" fill="#E31837"/>
            <text x="78" y="27" text-anchor="middle" fill="white" font-size="13" font-weight="900" font-family="Arial" letter-spacing="1">MILWAUKEE</text></svg>`,
        `<svg viewBox="0 0 110 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
            <rect x="0" y="5" width="105" height="32" rx="4" fill="#E2001A"/>
            <text x="52" y="27" text-anchor="middle" fill="white" font-size="17" font-weight="900" font-family="Arial" letter-spacing="3">HILTI</text></svg>`,
    ];

    const getBrandVal = (n, prop) => {
        if (n === 1) {
            if (prop === 'name') return s.brand1_name;
            if (prop === 'tag') return s.brand1_tag;
            if (prop === 'desc') return s.brand1_desc;
            if (prop === 'logo') return s.brand1_logo;
        }
        if (n === 2) {
            if (prop === 'name') return s.brand2_name;
            if (prop === 'tag') return s.brand2_tag;
            if (prop === 'desc') return s.brand2_desc;
            if (prop === 'logo') return s.brand2_logo;
        }
        if (n === 3) {
            if (prop === 'name') return s.brand3_name;
            if (prop === 'tag') return s.brand3_tag;
            if (prop === 'desc') return s.brand3_desc;
            if (prop === 'logo') return s.brand3_logo;
        }
        if (n === 4) {
            if (prop === 'name') return s.brand4_name;
            if (prop === 'tag') return s.brand4_tag;
            if (prop === 'desc') return s.brand4_desc;
            if (prop === 'logo') return s.brand4_logo;
        }
        if (n === 5) {
            if (prop === 'name') return s.brand5_name;
            if (prop === 'tag') return s.brand5_tag;
            if (prop === 'desc') return s.brand5_desc;
            if (prop === 'logo') return s.brand5_logo;
        }
        if (n === 6) {
            if (prop === 'name') return s.brand6_name;
            if (prop === 'tag') return s.brand6_tag;
            if (prop === 'desc') return s.brand6_desc;
            if (prop === 'logo') return s.brand6_logo;
        }
        return '';
    };

    const getDefaultBrandName = (idx) => {
        if (idx === 0) return 'BOSCH';
        if (idx === 1) return 'MAKITA';
        if (idx === 2) return 'DEWALT';
        if (idx === 3) return 'HIKOKI';
        if (idx === 4) return 'MILWAUKEE';
        if (idx === 5) return 'HILTI';
        return '';
    };

    const getDefaultSvg = (idx) => {
        if (idx === 0) return defaultSvgs[0];
        if (idx === 1) return defaultSvgs[1];
        if (idx === 2) return defaultSvgs[2];
        if (idx === 3) return defaultSvgs[3];
        if (idx === 4) return defaultSvgs[4];
        if (idx === 5) return defaultSvgs[5];
        return '';
    };

    const brands = [1,2,3,4,5,6].map((n, i) => ({
        name: getBrandVal(n, 'name') || getDefaultBrandName(i),
        tag:  getBrandVal(n, 'tag')  || 'Power Tools',
        desc: getBrandVal(n, 'desc') || '',
        logo: getBrandVal(n, 'logo') || '',
        svg:  getDefaultSvg(i)
    }));

    // Support customized rich markup for admin-defined titles by preserving structural theme accents safely
    const rawTitleHTML = s.brands_title
        ? s.brands_title.replace('text-bosch-red', 'text-[#ed1c24]')
        : 'Our Trusted <span class="text-[#ed1c24]">Brands</span>';

    setHTML(container, `
        <div class="animate-fade-in min-h-screen bg-slate-50">
            <!-- Page Header -->
            <section class="bg-white border-b border-slate-100 py-8">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div class="text-xs font-black uppercase tracking-[0.4em] text-[#ed1c24] mb-6">Authorized Partners</div>
                    <h1 class="text-6xl font-black text-slate-900 tracking-tight mb-6 uppercase">
                        ${rawTitleHTML}
                    </h1>
                    <p class="text-slate-500 font-bold text-lg max-w-2xl mx-auto">
                        ${escapeHTML(s.brands_subtitle || "We partner exclusively with the world's most trusted power tool manufacturers to ensure every spare part meets strict industrial standards.")}
                    </p>
                </div>
            </section>

            <!-- Brand Cards -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    ` + brands.map(b => `
                        <div class="bg-white rounded-none overflow-hidden group transition-all duration-500 hover:-translate-y-1 ring-1 ring-slate-900/5 shadow-sm hover:shadow-md flex flex-row items-center p-3 gap-3 animate-in zoom-in duration-700 h-full cursor-pointer" onclick="app.renderCatalog(document.getElementById('view-container'))">
                            <div class="relative w-20 h-20 rounded-none bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center shrink-0 border border-slate-100 overflow-hidden">
                                ` + (b.logo
                                    ? `<img src="${escapeHTML(app.api(b.logo))}" alt="${escapeHTML(b.name)}" class="w-full h-full object-contain p-2 drop-shadow-sm group-hover:scale-110 transition-transform duration-500">`
                                    : `<div class="grayscale group-hover:grayscale-0 transition-all duration-500 scale-75">${b.svg}</div>`) + `
                            </div>
                            <div class="flex-1 min-w-0 pr-1 flex flex-col justify-center">
                                <h4 class="font-bold text-sm text-slate-900 leading-tight tracking-tight truncate mb-0.5 group-hover:text-[#ed1c24] transition-colors">${escapeHTML(b.name)}</h4>
                                <div class="flex items-center gap-1.5 mb-1">
                                    <span class="text-xs font-black text-slate-500 uppercase tracking-widest bg-slate-50 px-1.5 py-0.5 rounded-none border border-slate-100">${escapeHTML(b.tag)}</span>
                                </div>
                                <p class="text-xs text-slate-500 font-medium truncate">${escapeHTML(b.desc)}</p>
                            </div>
                            <a href="/catalog" data-link class="w-8 h-8 rounded-none bg-slate-50 group-hover:bg-[#ed1c24] text-slate-500 group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm group-hover:shadow-red-500/30" title="Explore Spares">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                            </a>
                        </div>
                    `).join('') + `
                </div>
            </section>
        </div>
    `);
}
