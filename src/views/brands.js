export function renderBrands(container, app) {
    // Using CDN-hosted, hotlink-safe SVG logos (Wikimedia blocks hotlinking)
    const brands = [
        {
            name: 'BOSCH',
            desc: 'World leader in professional power tools and accessories.',
            svg: `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
                <circle cx="20" cy="20" r="18" fill="#E20015"/>
                <text x="20" y="25" text-anchor="middle" fill="white" font-size="11" font-weight="bold" font-family="Arial">b</text>
                <text x="50" y="26" fill="#1a1a1a" font-size="18" font-weight="900" font-family="Arial">BOSCH</text>
            </svg>`
        },
        {
            name: 'MAKITA',
            desc: 'Innovation and quality in cordless tool technology.',
            svg: `<svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
                <rect x="0" y="8" width="26" height="26" rx="3" fill="#00ADEF"/>
                <text x="13" y="27" text-anchor="middle" fill="white" font-size="14" font-weight="900" font-family="Arial">M</text>
                <text x="36" y="28" fill="#1a1a1a" font-size="18" font-weight="900" font-family="Arial">MAKITA</text>
            </svg>`
        },
        {
            name: 'DEWALT',
            desc: 'Guaranteed Tough. Heavy-duty industrial power tools.',
            svg: `<svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
                <rect x="0" y="5" width="135" height="32" rx="4" fill="#FEBD17"/>
                <text x="68" y="27" text-anchor="middle" fill="#1a1a1a" font-size="16" font-weight="900" font-family="Arial" letter-spacing="2">DEWALT</text>
            </svg>`
        },
        {
            name: 'HIKOKI',
            desc: 'High-performance power tools for extreme professional use.',
            svg: `<svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
                <rect x="0" y="5" width="32" height="32" rx="4" fill="#E30613"/>
                <text x="16" y="27" text-anchor="middle" fill="white" font-size="13" font-weight="900" font-family="Arial">HI</text>
                <text x="42" y="28" fill="#1a1a1a" font-size="18" font-weight="900" font-family="Arial">HiKOKI</text>
            </svg>`
        },
        {
            name: 'MILWAUKEE',
            desc: 'Nothing but Heavy Duty. Leading industry innovation.',
            svg: `<svg viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
                <rect x="0" y="5" width="155" height="32" rx="4" fill="#E31837"/>
                <text x="78" y="27" text-anchor="middle" fill="white" font-size="13" font-weight="900" font-family="Arial" letter-spacing="1">MILWAUKEE</text>
            </svg>`
        },
        {
            name: 'HILTI',
            desc: 'Specialized solutions for construction professionals.',
            svg: `<svg viewBox="0 0 110 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
                <rect x="0" y="5" width="105" height="32" rx="4" fill="#E2001A"/>
                <text x="52" y="27" text-anchor="middle" fill="white" font-size="17" font-weight="900" font-family="Arial" letter-spacing="3">HILTI</text>
            </svg>`
        }
    ];

    container.innerHTML = `
        <div class="animate-fade-in py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-20">
                    <h2 class="text-5xl font-black text-slate-900 tracking-tight mb-4">Authorized <span class="text-primary">Brands</span></h2>
                    <p class="text-slate-500 font-bold text-lg max-w-2xl mx-auto">We partner with the world's most trusted manufacturers to ensure every spare part meets strict industrial standards.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${brands.map(b => `
                        <div class="bg-white rounded-[40px] p-10 border border-slate-100 shadow-premium hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group text-center flex flex-col items-center">
                            <div class="h-20 flex items-center justify-center mb-10 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                                ${b.svg}
                            </div>
                            <h4 class="text-2xl font-black text-slate-900 mb-4">${b.name}</h4>
                            <p class="text-sm text-slate-500 font-medium leading-relaxed mb-8">${b.desc}</p>
                            <button onclick="app.renderCatalog(document.getElementById('view-container'))" class="px-8 py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm">Explore Spares</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}
