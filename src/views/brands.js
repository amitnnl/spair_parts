export function renderBrands(container, app) {
    const brands = [
        { name: 'BOSCH', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Bosch-logo.svg/1280px-Bosch-logo.svg.png', desc: 'World leader in professional power tools and accessories.' },
        { name: 'MAKITA', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Makita_logo.svg/1280px-Makita_logo.svg.png', desc: 'Innovation and quality in cordless tool technology.' },
        { name: 'DEWALT', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/DeWalt_logo.svg/1280px-DeWalt_logo.svg.png', desc: 'Guaranteed Tough. Heavy-duty industrial power tools.' },
        { name: 'HIKOKI', image: 'https://www.hikoki-powertools.com/common/img/logo_hikoki.png', desc: 'High-performance power tools for extreme professional use.' },
        { name: 'MILWAUKEE', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Milwaukee_Tool_Logo.svg/1280px-Milwaukee_Tool_Logo.svg.png', desc: 'Nothing but Heavy Duty. Leading industry innovation.' },
        { name: 'HILTI', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Hilti_logo.svg/1280px-Hilti_logo.svg.png', desc: 'Specialized solutions for construction professionals.' }
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
                                <img src="${b.image}" alt="${b.name}" class="max-h-full max-w-[200px] object-contain">
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
