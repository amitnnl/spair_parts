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

    const brands = [1,2,3,4,5,6].map((n, i) => ({
        name: s['brand' + n + '_name'] || ['BOSCH','MAKITA','DEWALT','HIKOKI','MILWAUKEE','HILTI'][i],
        tag:  s['brand' + n + '_tag']  || 'Power Tools',
        desc: s['brand' + n + '_desc'] || '',
        logo: s['brand' + n + '_logo'] || '',
        svg:  defaultSvgs[i]
    }));

    container.innerHTML = `
        <div class="animate-fade-in min-h-screen bg-slate-50">
            <!-- Page Header -->
            <section class="bg-white border-b border-slate-100 py-24">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div class="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">Authorized Partners</div>
                    <h1 class="text-6xl font-black text-slate-900 tracking-tight mb-6">
                        ${s.brands_title || 'Our Trusted <span class="text-primary">Brands</span>'}
                    </h1>
                    <p class="text-slate-500 font-bold text-lg max-w-2xl mx-auto">
                        ${s.brands_subtitle || "We partner exclusively with the world's most trusted power tool manufacturers to ensure every spare part meets strict industrial standards."}
                    </p>
                </div>
            </section>

            <!-- Brand Cards -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${brands.map(b => `
                        <div class="bg-white rounded-[40px] p-10 border border-slate-100 shadow-premium hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group text-center flex flex-col items-center">
                            <div class="h-20 flex items-center justify-center mb-8 transition-all duration-500 transform group-hover:scale-110">
                                ${b.logo
                                    ? `<img src="${app.api(b.logo)}" alt="${b.name}" class="h-16 w-auto object-contain">`
                                    : `<div class="grayscale group-hover:grayscale-0 transition-all duration-500">${b.svg}</div>`}
                            </div>
                            <span class="px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-4">${b.tag}</span>
                            <h4 class="text-2xl font-black text-slate-900 mb-4">${b.name}</h4>
                            <p class="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-1">${b.desc}</p>
                            <a href="/catalog" data-link class="px-8 py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm w-full text-center">Explore Spares</a>
                        </div>
                    `).join('')}
                </div>
            </section>
        </div>
    `;
}
