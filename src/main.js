// main.js - Comprehensive B2B Workflow for TORVO SPAIR
import './index.css';

const app = {
    state: {
        user: null,
        cart: [],
        products: [],
        quotations: [],
        invoices: [],
        view: 'home',
        isLoading: false,
        settings: {
            site_name: 'PARTSPRO',
            currency: '₹',
            tax_percent: '18'
        }
    },

    async init() {
        // Dynamic basePath detection for SPA routing portability
        const path = window.location.pathname;
        if (path.includes('/spairparts')) {
            this.basePath = '/spairparts';
        } else if (path.split('/').length > 2 && !path.includes('.html')) {
            // Heuristic for subdirectory hosting (e.g. /portal/dashboard)
            this.basePath = '/' + path.split('/')[1];
        } else {
            this.basePath = '';
        }
        
        await this.loadSettings();
        await this.checkAuth();
        this.bindEvents();
        this.handleRouting();
    },

    api(path) {
        // path is like 'api/products.php' - prepend basePath + / if on Apache
        if (this.basePath) {
            return this.basePath + '/' + path;
        }
        return '/' + path;
    },

    async loadSettings() {
        try {
            const res = await fetch(this.api('api/admin_settings.php'));
            const data = await res.json();
            if (data && !data.error) {
                this.state.settings = data;
                this.updateSettingsUI();
            }
        } catch (e) {}
    },

    updateSettingsUI() {
        const logoTexts = document.querySelectorAll('.logo-text');
        logoTexts.forEach(el => el.textContent = this.state.settings.site_name || 'PARTSPRO');
        document.title = `${this.state.settings.site_name || 'PARTSPRO'} | B2B Spare Parts Portal`;

        const logoContainers = document.querySelectorAll('.logo-container');
        logoContainers.forEach(container => {
            if (this.state.settings.site_logo) {
                container.innerHTML = `<img src="${this.state.settings.site_logo}" class="h-10 w-auto object-contain" alt="Logo">`;
            }
        });

        const footerEmail = document.getElementById('footer-email');
        if (footerEmail) {
            footerEmail.textContent = this.state.settings.contact_email;
            footerEmail.href = `mailto:${this.state.settings.contact_email}`;
        }

        const footerAddress = document.getElementById('footer-address');
        if (footerAddress) footerAddress.innerHTML = (this.state.settings.contact_address || '').replace(/\n/g, '<br>');

        const footerDesc = document.getElementById('footer-desc');
        if (footerDesc && this.state.settings.hero_subtitle) footerDesc.textContent = this.state.settings.hero_subtitle;
    },

    cleanImageUrl(url, fallbackText = 'Part') {
        if (!url) return `https://placehold.co/600x600/0f172a/6366f1?text=${encodeURIComponent(fallbackText)}`;
        return url.replace('via.placeholder.com', 'placehold.co');
    },

    async checkAuth() {
        try {
            const res = await fetch(this.api('api/auth.php'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'check' })
            });
            const data = await res.json();
            if (data.logged_in) {
                this.state.user = data.user;
                this.updateAuthUI();
            }
        } catch (e) {
            console.error('Auth check failed', e);
        }
    },

    bindEvents() {
        window.addEventListener('popstate', () => this.handleRouting());
        
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-link]');
            if (link) {
                e.preventDefault();
                let url = link.getAttribute('href');
                if (!url.startsWith(this.basePath) && url.startsWith('/')) {
                    url = this.basePath + url;
                }
                history.pushState(null, null, url);
                this.handleRouting();
            }
        });
    },

    handleRouting() {
        let path = window.location.pathname;
        if (this.basePath && path.startsWith(this.basePath)) {
            path = path.substring(this.basePath.length);
        }
        if (path === '') path = '/';

        const container = document.getElementById('view-container');
        
        if (path === '/catalog') {
            this.renderCatalog(container);
        } else if (path === '/quotations') {
            this.renderQuotations(container);
        } else if (path === '/dashboard') {
            this.renderDashboard(container);
        } else if (path === '/admin') {
            this.renderAdmin(container);
        } else if (path === '/login') {
            this.renderLogin(container);
        } else if (path === '/register') {
            this.renderRegister(container);
        } else if (path === '/invoices') {
            this.renderInvoices(container);
        } else if (path === '/cart') {
            this.renderCart(container);
        } else {
            // If logged in and on home, maybe show dashboard? 
            // For now, let's keep home accessible.
            this.renderHome(container);
        }
        
        // Update desktop nav active states
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            const isActive = href === path || (path === '/' && href === '/');
            link.classList.toggle('active', isActive);
        });

        // Update mobile nav active states
        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            const href = item.getAttribute('href');
            item.classList.toggle('active', href === path);
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.animatePageEntry();
    },

    // --- Views ---

    renderHome(container) {
        container.innerHTML = `
            <div class="animate-fade-in">
                <!-- Hero Section (Reference Image 1) -->
                <section class="relative bg-white pt-20 pb-32 overflow-hidden border-b border-slate-100">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div class="flex flex-col lg:flex-row items-center gap-20">
                            <div class="flex-1 text-center lg:text-left">
                                <h1 class="text-6xl lg:text-[84px] font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
                                    ${(this.state.settings.hero_title || 'THE RIGHT PART. EVERY TIME.').split('.').join('.<br/>')}
                                </h1>
                                <p class="text-xl text-slate-600 mb-12 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                                    ${this.state.settings.hero_subtitle || 'Premium B2B procurement portal for genuine power tool spare parts.'}
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

                                <!-- Tabbed Search Module -->
                                <div class="bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,86,179,0.15)] border border-slate-100 p-2 max-w-3xl overflow-hidden relative animate-slide-up">
                                    <div class="flex p-1 gap-1">
                                        <button class="flex-1 py-4 text-xs font-black uppercase tracking-widest text-primary bg-primary/5 rounded-2xl border border-primary/10">Search by Part</button>
                                        <button class="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Search by Tool</button>
                                    </div>
                                    <div class="p-6 flex flex-col md:flex-row gap-4">
                                        <div class="relative flex-shrink-0 w-full md:w-56">
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
                                        <button class="h-14 px-10 bg-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">Find Parts</button>
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
                            
                            <!-- Hero Image -->
                            <div class="flex-1 relative hidden lg:block">
                                <div class="absolute -inset-10 bg-primary/10 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
                                <div class="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-all duration-700">
                                    <img src="${this.state.settings.hero_image || 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000'}" alt="Industrial Parts" class="w-full h-full object-cover">
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
                </section>

                <!-- Features Section (Reference Image 2) -->
                <section class="py-32 bg-slate-50">
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

                <!-- Shop by Category (Reference Image 3) -->
                <section class="py-32 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                            <div class="max-w-2xl">
                                <h2 class="text-4xl font-black text-slate-900 tracking-tight">Shop by Core Categories.</h2>
                                <p class="text-slate-500 mt-4 font-bold text-lg leading-relaxed">Precision-engineered spares for every industrial tool in your fleet.</p>
                            </div>
                            <a href="/catalog" data-link class="btn btn-secondary px-8 h-14 uppercase tracking-widest text-[10px] font-black group">
                                View Entire Catalog 
                                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </a>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                            ${[
                                { t:'Electrical Spares', d:'Switches, Carbon Brushes, Armatures & Field Coils', img:'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=600' },
                                { t:'Mechanical Units', d:'Precision Gears, Bearings, Shafts & Housing Assemblies', img:'https://images.unsplash.com/photo-1530124566582-a618bc2615ad?auto=format&fit=crop&q=80&w=600' },
                                { t:'Power Attachments', d:'Chucks, SDS Adaptors, Cutting Discs & Drill Bits', img:'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=600' },
                                { t:'Maintenance Kits', d:'Complete Service Kits for Industrial Hammer Drills & Saws', img:'https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?auto=format&fit=crop&q=80&w=600' }
                            ].map(c => `
                                <div class="group relative bg-slate-50 border border-slate-100 rounded-[40px] p-10 overflow-hidden hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700">
                                    <div class="relative z-10">
                                        <div class="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-8">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                                        </div>
                                        <h4 class="text-xl font-black text-slate-900 mb-3">${c.t}</h4>
                                        <p class="text-xs text-slate-500 font-bold leading-relaxed mb-10">${c.d}</p>
                                        <a href="/catalog" data-link class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary group-hover:gap-4 transition-all">Explore Spares <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></a>
                                    </div>
                                    <div class="absolute -right-16 -bottom-16 w-64 h-64 opacity-10 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700">
                                        <img src="${c.img}" alt="${c.t}" class="w-full h-full object-cover">
                                    </div>
                                </div>
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
    },

    async renderAdminUsers(container) {
        container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>`;
        
        try {
            const res = await fetch(this.api('api/admin_users.php'));
            const users = await res.json();
            
            container.innerHTML = `
                <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                    <!-- Admin Sidebar -->
                    ${this.getSidebar('partners')}

                    <!-- Admin Main Content -->
                    <main class="flex-1 p-8 lg:p-12 space-y-12">
                        <div>
                            <h2 class="text-3xl font-black text-slate-900 tracking-tight">Partner Ecosystem</h2>
                            <p class="text-slate-500 mt-1 font-medium">Managing business relationships and discount tiers.</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="bg-white border border-slate-200 rounded-3xl p-8 flex items-center gap-6 shadow-sm">
                                <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Partners</p>
                                    <h4 class="text-2xl font-black text-slate-900">${users.filter(u => u.status === 'active').length}</h4>
                                </div>
                            </div>
                            <div class="bg-white border border-slate-200 rounded-3xl p-8 flex items-center gap-6 shadow-sm text-amber-600">
                                <div class="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
                                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Review</p>
                                    <h4 class="text-2xl font-black">${users.filter(u => u.status === 'pending').length}</h4>
                                </div>
                            </div>
                            <div class="bg-white border border-slate-200 rounded-3xl p-8 flex items-center gap-6 shadow-sm text-blue-600">
                                <div class="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Reach</p>
                                    <h4 class="text-2xl font-black" id="user-active-quotations">--</h4>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                            <table class="w-full text-left">
                                <thead class="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Partner Identity</th>
                                        <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Dynamic Tier</th>
                                        <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Registration</th>
                                        <th class="p-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Approval</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100">
                                    ${users.map(u => `
                                        <tr class="hover:bg-slate-50 transition-all group">
                                            <td class="p-6">
                                                <div class="flex items-center gap-4">
                                                    <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                                                        ${u.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <span class="font-bold block text-slate-900">${u.name}</span>
                                                        <span class="text-xs text-slate-500 font-medium">${u.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="p-6">
                                                <div class="flex items-center gap-2">
                                                    <input type="number" onchange="app.updateUserTier(${u.id}, this.value)" value="${u.discount_tier || 0}" class="w-16 h-10 bg-slate-50 border border-slate-200 rounded-lg px-2 text-sm font-black text-blue-600 focus:outline-none focus:border-blue-500 transition-all">
                                                    <span class="text-[10px] text-slate-400 font-black">% OFF</span>
                                                </div>
                                            </td>
                                            <td class="p-6">
                                                <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${this.getUserStatusClass(u.status)}">
                                                    ${u.status}
                                                </span>
                                            </td>
                                            <td class="p-6 text-[11px] text-slate-500 font-bold uppercase">
                                                ${new Date(u.created_at).toLocaleDateString()}
                                            </td>
                                            <td class="p-6 text-right">
                                                <div class="flex justify-end gap-3">
                                                    ${u.status === 'pending' ? `
                                                        <button onclick="app.updateUserStatus(${u.id}, 'active')" class="px-4 py-2 rounded-xl bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">Approve</button>
                                                        <button onclick="app.updateUserStatus(${u.id}, 'rejected')" class="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all border border-rose-100">Decline</button>
                                                    ` : `
                                                        <button onclick="app.updateUserStatus(${u.id}, 'pending')" class="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 transition-all">
                                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                                        </button>
                                                    `}
                                                </div>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            `;
        } catch (e) {
            container.innerHTML = `<div class="bg-rose-50 border border-rose-100 rounded-3xl p-20 text-center text-rose-500 font-bold">Failed to synchronize partner data.</div>`;
        }
    },

    async updateUserStatus(id, status) {
        try {
            const res = await fetch(this.api('api/admin_users.php'), {
                method: 'PUT',
                body: JSON.stringify({ id, status })
            });
            const result = await res.json();
            if (result.success) {
                this.showToast(`Partner status updated to ${status}`);
                this.renderAdminUsers(document.getElementById('view-container'));
            }
        } catch (e) {}
    },

    async updateUserTier(id, discount_tier) {
        try {
            const res = await fetch(this.api('api/admin_users.php'), {
                method: 'PUT',
                body: JSON.stringify({ id, discount_tier })
            });
            const result = await res.json();
            if (result.success) {
                this.showToast(`Dynamic tier updated to ${discount_tier}%`);
            }
        } catch (e) {}
    },

    getUserStatusClass(status) {
        switch(status) {
            case 'pending': return 'bg-amber-50 text-amber-600 border border-amber-200';
            case 'active': return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
            case 'rejected': return 'bg-rose-50 text-rose-600 border border-rose-200';
            default: return 'bg-slate-50 text-slate-500 border border-slate-200';
        }
    },

    async renderCatalog(container) {
        container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>`;
        
        try {
            const res = await fetch(this.api('api/products.php'));
            const data = await res.json();
            this.state.products = data.products;
            this.state.brands = data.brands;
            this.state.models = data.models;
            
            container.innerHTML = `
                <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                    ${this.getSidebar('catalog')}
                    <main class="flex-1 p-8 lg:p-12">
                        <div class="max-w-7xl mx-auto space-y-12 animate-fade-in">
                            <div>
                                <div class="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Inventory Explorer</div>
                                <h2 class="text-4xl font-black tracking-tight text-slate-900">Genuine <span class="text-primary">Parts Catalog</span></h2>
                                <p class="text-slate-500 font-medium mt-2 text-lg">Browse through our extensive collection of industrial spare parts.</p>
                            </div>
                            
                            <div id="catalog-content"></div>
                        </div>
                    </main>
                </div>
            `;
            this.renderCatalogContent(data.products, document.getElementById('catalog-content'));
        } catch (e) {
            container.innerHTML = `<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load products.</div>`;
        }
    },

    async renderQuotations(container) {
        if (!this.state.user) { history.pushState(null, null, this.basePath + '/login'); this.handleRouting(); return; }
        container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>`;
        
        try {
            const res = await fetch(this.api('api/quotations.php'));
            const quotations = await res.json();
            
            container.innerHTML = `
                <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                    ${this.getSidebar('quotations')}
                    <main class="flex-1 p-8 lg:p-12">
                        <div class="max-w-6xl mx-auto space-y-12 animate-fade-in">
                            <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                                <div>
                                    <div class="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Procurement History</div>
                                    <h2 class="text-4xl font-black tracking-tight text-slate-900">Your <span class="text-blue-600">Quotations</span></h2>
                                    <p class="text-slate-500 font-medium mt-2 text-lg">Track your request for quotes and approval statuses.</p>
                                </div>
                                <button onclick="app.renderCatalog(document.getElementById('view-container'))" class="btn btn-secondary flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                                    New Request
                                </button>
                            </div>

                            <div class="table-container">
                                <table class="data-table w-full text-left">
                                    <thead>
                                        <tr>
                                            <th>ID / Date</th>
                                            <th>Items Count</th>
                                            <th>Status</th>
                                            <th>Amount</th>
                                            <th class="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-100">
                                        ${quotations.length ? quotations.map(q => `
                                            <tr class="hover:bg-slate-50 transition-all">
                                                <td class="p-6">
                                                    <div class="font-bold text-slate-900">#Q-${String(q.id).padStart(4, '0')}</div>
                                                    <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">${new Date(q.created_at).toLocaleDateString()}</div>
                                                </td>
                                                <td class="p-6 font-bold text-slate-600">${q.item_count || 0} Products</td>
                                                <td class="p-6">
                                                    <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${this.getStatusClass(q.status)}">
                                                        ${q.status}
                                                    </span>
                                                </td>
                                                <td class="p-6 font-black text-slate-900">
                                                    ${q.status === 'pending' ? '<span class="text-slate-400 font-bold italic">Awaiting Pricing</span>' : `₹${parseFloat(q.total_amount || 0).toLocaleString()}`}
                                                </td>
                                                <td class="p-6 text-right">
                                                    <div class="flex justify-end gap-3">
                                                        <button onclick="app.viewQuotationDetails(${q.id})" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-slate-200 transition-all">View</button>
                                                        ${q.status === 'priced' ? `<button onclick="app.approveQuotation(${q.id})" class="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">Approve</button>` : ''}
                                                    </div>
                                                </td>
                                            </tr>
                                        `).join('') : `
                                            <tr>
                                                <td colspan="5" class="p-20 text-center text-slate-400 font-bold">You haven't requested any quotations yet.</td>
                                            </tr>
                                        `}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
            `;
        } catch (e) {
            container.innerHTML = `<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load quotations.</div>`;
        }
    },

    async renderInvoices(container) {
        if (!this.state.user) { history.pushState(null, null, this.basePath + '/login'); this.handleRouting(); return; }
        container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>`;
        
        try {
            const res = await fetch(this.api('api/invoices.php'));
            const invoices = await res.json();
            
            container.innerHTML = `
                <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                    ${this.getSidebar('invoices')}
                    <main class="flex-1 p-8 lg:p-12">
                        <div class="max-w-6xl mx-auto space-y-12 animate-fade-in">
                            <div>
                                <div class="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Financial Records</div>
                                <h2 class="text-4xl font-black tracking-tight text-slate-900">Your <span class="text-emerald-600">Invoices</span></h2>
                                <p class="text-slate-500 font-medium mt-2">Official tax invoices for your approved procurement requests.</p>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                ${invoices.length ? invoices.map(inv => `
                                    <div class="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 group">
                                        <div class="flex justify-between items-start">
                                            <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                            </div>
                                            <div class="text-right">
                                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">${new Date(inv.created_at).toLocaleDateString()}</p>
                                                <p class="text-sm font-black text-slate-900">${inv.invoice_number}</p>
                                            </div>
                                        </div>
                                        <div class="space-y-4 pt-6 border-t border-slate-100">
                                            <div class="flex justify-between items-center">
                                                <span class="text-xs font-bold text-slate-400">Total Amount</span>
                                                <span class="text-xl font-black text-slate-900">₹${parseFloat(inv.total_amount).toLocaleString()}</span>
                                            </div>
                                            <button onclick="app.renderInvoiceDocument(${inv.id})" class="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/20">Download PDF</button>
                                        </div>
                                    </div>
                                `).join('') : `
                                    <div class="col-span-full bg-slate-50 border border-slate-100 rounded-3xl p-20 text-center text-slate-400 font-bold">No invoices generated yet.</div>
                                `}
                            </div>
                        </div>
                    </main>
                </div>
            `;
        } catch (e) {
            container.innerHTML = `<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load invoices.</div>`;
        }
    },


    renderCatalogContent(products, container) {
        container.innerHTML = `
            <div class="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-900/5 p-8 lg:p-12 relative overflow-hidden mb-12">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                    <div class="relative md:col-span-1">
                        <input type="text" id="catalog-search" class="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-12 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400" placeholder="Search by Part name or Model...">
                        <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </div>
                    </div>
                    <div class="relative">
                        <select id="brand-filter" class="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-blue-500 transition-all cursor-pointer uppercase tracking-widest">
                            <option value="">Filter by Brand</option>
                            ${(this.state.brands || []).map(b => `<option value="${b}">${b}</option>`).join('')}
                        </select>
                        <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg></div>
                    </div>
                    <div class="relative">
                        <select id="model-filter" class="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-blue-500 transition-all cursor-pointer uppercase tracking-widest">
                            <option value="">Filter by Model</option>
                            ${(this.state.models || []).map(m => `<option value="${m}">${m}</option>`).join('')}
                        </select>
                        <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg></div>
                    </div>
                </div>
            </div>

            <div id="catalog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                ${this.filterAndRenderProducts()}
            </div>
        `;

        const filterAction = () => {
            document.getElementById('catalog-grid').innerHTML = this.filterAndRenderProducts();
        };

        document.getElementById('catalog-search').oninput = filterAction;
        document.getElementById('brand-filter').onchange = filterAction;
        document.getElementById('model-filter').onchange = filterAction;
    },

    filterAndRenderProducts() {
        const query = document.getElementById('catalog-search')?.value.toLowerCase() || '';
        const brand = document.getElementById('brand-filter')?.value || '';
        const model = document.getElementById('model-filter')?.value || '';

        const filtered = (this.state.products || []).filter(p => {
            const matchesQuery = p.part_name.toLowerCase().includes(query) || 
                                 (p.machine_model && p.machine_model.toLowerCase().includes(query)) ||
                                 (p.brand && p.brand.toLowerCase().includes(query));
            const matchesBrand = !brand || p.brand === brand;
            const matchesModel = !model || p.machine_model === model || (p.other_fitments && p.other_fitments.includes(model));
            return matchesQuery && matchesBrand && matchesModel;
        });

        if (filtered.length === 0) {
            return `
                <div class="col-span-full py-20 text-center animate-in fade-in duration-500">
                    <h3 class="text-xl font-bold text-slate-400">No parts found</h3>
                </div>
            `;
        }

        return filtered.map(p => this.productCard(p)).join('');
    },

    productCard(p) {
        return `
            <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 animate-in zoom-in duration-700">
                <div class="relative h-64 bg-slate-50 overflow-hidden">
                    <img src="${this.cleanImageUrl(p.photo, p.part_name)}" class="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700">
                    <div class="absolute top-4 left-4">
                        <span class="px-3 py-1 bg-white/90 backdrop-blur shadow-sm border border-slate-100 text-[10px] font-black uppercase tracking-widest text-blue-600 rounded-lg">${p.brand}</span>
                    </div>
                </div>
                <div class="p-8">
                    <div class="mb-6">
                        <h4 class="font-black text-lg text-slate-900 leading-tight mb-1">${p.part_name}</h4>
                        <div class="flex items-center gap-2">
                            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fits: ${p.machine_model || 'Universal'}</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between pt-6 border-t border-slate-100">
                        <div>
                            <span class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">B2B Pricing</span>
                            <span class="text-sm font-bold text-slate-900">RFQ Required</span>
                        </div>
                        <button onclick="app.addToCart(${p.id})" class="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    renderLogin(container) {
        container.innerHTML = `
            <div class="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 relative overflow-hidden bg-white">
                <div class="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
                    <div class="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
                </div>

                <div class="w-full max-w-md relative z-10 animate-fade-in">
                    <div class="bg-white rounded-[40px] shadow-premium border border-slate-100 p-12 space-y-10">
                        <div class="text-center">
                            <div class="w-20 h-20 bg-primary/5 text-primary rounded-[28px] flex items-center justify-center mx-auto mb-8">
                                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-1.17-1.17c-2.772-1.744-6.054-2.753-9.571-2.753m0 0c3.517 0 6.799 1.009 9.571 2.753M14 11c0-3.517 1.009-6.799 2.753-9.571m1.17 1.17c2.772 1.744 6.054 2.753 9.571 2.753m0 0c-3.517 0-6.799-1.009-9.571-2.753"/></svg>
                            </div>
                            <h2 class="text-4xl font-black text-slate-900 tracking-tight">Partner Login</h2>
                            <p class="text-slate-500 mt-4 font-bold text-lg">Secure access to the B2B portal.</p>
                        </div>
                        
                        <form id="login-form" class="space-y-8">
                            <div class="space-y-3">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Corporate Email</label>
                                <input type="email" name="email" required class="input-field h-16 px-8 rounded-2xl" placeholder="name@company.com">
                            </div>
                            <div class="space-y-3">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Access Password</label>
                                <input type="password" name="password" required class="input-field h-16 px-8 rounded-2xl" placeholder="••••••••">
                            </div>
                            <div class="flex items-center justify-between px-2">
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" class="w-5 h-5 border-2 border-slate-200 rounded-lg text-primary focus:ring-primary">
                                    <span class="text-xs font-bold text-slate-500">Keep me active</span>
                                </label>
                                <a href="#" class="text-xs font-black text-primary uppercase tracking-widest hover:underline">Reset Pass</a>
                            </div>
                            <button type="submit" class="w-full h-16 rounded-2xl bg-primary text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">Synchronize & Enter</button>
                        </form>

                        <div class="text-center pt-4">
                            <p class="text-sm font-bold text-slate-500">
                                New Partner? <a href="/register" data-link class="text-primary font-black uppercase tracking-widest text-[11px] ml-2 hover:underline">Request Onboarding</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('login-form').onsubmit = async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            btn.disabled = true;
            btn.innerHTML = '<span class="animate-pulse">Authorizing...</span>';

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            data.action = 'login';
            
            try {
                const res = await fetch(this.api('api/auth.php'), {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                const result = await res.json();
                if (result.success) {
                    this.state.user = result.user;
                    this.updateAuthUI();
                    history.pushState(null, null, this.basePath + '/dashboard');
                    this.handleRouting();
                    this.showToast(`System synchronized. Welcome, ${result.user.name}.`);
                } else {
                    this.showToast(result.error || 'Authorization failed', 'error');
                }
            } catch (e) {
                this.showToast('Authentication server offline', 'error');
            } finally {
                btn.disabled = false;
                btn.innerHTML = 'Synchronize & Enter';
            }
        };
    },

    renderRegister(container) {
        container.innerHTML = `
            <div class="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 bg-slate-50">
                <div class="w-full max-w-2xl animate-fade-in">
                    <div class="bg-white rounded-[40px] shadow-premium border border-slate-100 p-12 lg:p-16 space-y-12">
                        <div class="flex flex-col md:flex-row gap-12 items-center">
                            <div class="flex-1 space-y-6">
                                <h2 class="text-4xl font-black text-slate-900 tracking-tight">Partner <span class="text-primary">Onboarding</span></h2>
                                <p class="text-slate-500 font-bold text-lg leading-relaxed">Apply for a specialized B2B account to unlock wholesale pricing and credit facilities.</p>
                                <div class="space-y-4 pt-4">
                                    <div class="flex items-center gap-3">
                                        <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>
                                        <span class="text-xs font-black text-slate-700 uppercase tracking-widest">Wholesale Contract Pricing</span>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>
                                        <span class="text-xs font-black text-slate-700 uppercase tracking-widest">Priority Stock Allocation</span>
                                    </div>
                                </div>
                            </div>

                            <form id="register-form" class="flex-1 space-y-6">
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                                    <input type="text" name="name" required class="input-field rounded-2xl h-14" placeholder="Full Name">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Business Email</label>
                                    <input type="email" name="email" required class="input-field rounded-2xl h-14" placeholder="Corporate Email">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Create Password</label>
                                    <input type="password" name="password" required class="input-field rounded-2xl h-14" placeholder="••••••••">
                                </div>
                                <button type="submit" class="w-full h-16 rounded-2xl bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-primary hover:scale-[1.02] transition-all">Submit Application</button>
                                <p class="text-center text-[10px] font-bold text-slate-400">By applying, you agree to our B2B Terms of Service.</p>
                            </form>
                        </div>

                        <div class="divider"></div>

                        <div class="text-center">
                            <p class="text-sm font-bold text-slate-500">
                                Already a registered partner? <a href="/login" data-link class="text-primary font-black uppercase tracking-widest text-[11px] ml-2 hover:underline">Access Portal</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('register-form').onsubmit = async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            btn.disabled = true;
            btn.innerHTML = '<span class="animate-pulse">Processing...</span>';

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            data.action = 'register';
            
            try {
                const res = await fetch(this.api('api/auth.php'), {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                const result = await res.json();
                if (result.success) {
                    this.showToast('Application submitted. We will review your account soon.');
                    history.pushState(null, null, this.basePath + '/login');
                    this.handleRouting();
                } else {
                    this.showToast(result.error || 'Submission failed', 'error');
                }
            } catch (e) {
                this.showToast('Network error during submission', 'error');
            } finally {
                btn.disabled = false;
                btn.innerHTML = 'Submit Application';
            }
        };
    },

    renderCart(container) {
        if (this.state.cart.length === 0) {
            container.innerHTML = `
                <div class="text-center py-32 animate-in fade-in duration-500">
                    <div class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                    </div>
                    <h2 class="text-2xl font-black text-slate-900 mb-2">Your cart is empty</h2>
                    <p class="text-slate-500 font-medium mb-8">Add spare parts to your cart to request a quotation.</p>
                    <a href="/catalog" data-link class="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">Browse Catalogue</a>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div class="max-w-4xl mx-auto py-12 px-4 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div>
                    <h2 class="text-3xl font-black text-slate-900 tracking-tight">Quotation Cart</h2>
                    <p class="text-slate-500 mt-1 font-medium">Review and adjust items before submitting for pricing.</p>
                </div>

                <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <table class="w-full text-left border-collapse">
                        <thead class="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Spare Part Details</th>
                                <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</th>
                                <th class="p-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${this.state.cart.map(item => `
                                <tr class="hover:bg-slate-50/50 transition-colors">
                                    <td class="p-6">
                                        <div class="font-bold text-slate-900">${item.part_name}</div>
                                        <div class="text-xs text-slate-500 font-medium mt-0.5">${item.brand} • ${item.machine_model}</div>
                                    </td>
                                    <td class="p-6">
                                        <div class="flex items-center gap-3">
                                            <input type="number" min="1" value="${item.quantity}" onchange="app.updateCartQty(${item.id}, this.value)" class="w-20 h-10 bg-slate-50 border border-slate-200 rounded-lg px-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
                                            <span class="text-xs font-bold text-slate-400 uppercase">Units</span>
                                        </div>
                                    </td>
                                    <td class="p-6 text-right">
                                        <button onclick="app.removeFromCart(${item.id})" class="text-rose-500 hover:text-rose-600 p-2 hover:bg-rose-50 rounded-lg transition-all">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-slate-200">
                    <div class="flex items-center gap-4 text-slate-500">
                        <svg class="w-10 h-10 text-blue-600 bg-blue-50 p-2 rounded-xl" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <div>
                            <p class="text-xs font-bold text-slate-900 uppercase">Standard Response Time: 24 Hours</p>
                            <p class="text-[11px] font-medium leading-tight">Our team will review your request and provide competitive B2B pricing via email.</p>
                        </div>
                    </div>
                    <button onclick="app.submitQuotation()" class="w-full md:w-auto h-16 px-12 rounded-2xl bg-blue-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all active:translate-y-0">
                        Submit RFQ Request
                    </button>
                </div>
            </div>
        `;
    },
    async renderAdmin(container) {
        if (!this.state.user || this.state.user.role !== 'admin') {
            container.innerHTML = `<div class="text-center py-20"><h2 class="text-3xl font-bold text-slate-900 mb-2">Access Restricted</h2><p class="text-slate-500">Please contact the system administrator.</p></div>`;
            return;
        }

        container.innerHTML = `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${this.getSidebar('admin')}
                <main class="flex-1 p-8 lg:p-12 space-y-12">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h2 class="text-3xl font-black text-slate-900 tracking-tight">Admin Control Center</h2>
                            <p class="text-slate-500 mt-1 font-medium">Monitoring procurement lifecycle and partner operations.</p>
                        </div>
                        <div class="flex gap-3 no-print">
                            <button onclick="app.renderAddProductForm()" class="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                Add Product
                            </button>
                            <button onclick="app.printAdminReport()" class="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                Export Report
                            </button>
                        </div>
                    </div>
                    
                    <!-- Stat Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div class="stat-card">
                            <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Requests</p>
                            <h4 class="text-3xl font-black text-slate-900" id="stat-active-quotations">--</h4>
                            <div class="mt-4 flex items-center gap-2 text-[10px] font-bold text-blue-600">
                                <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                                Live Feed Active
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            </div>
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Authorized Partners</p>
                            <h4 class="text-3xl font-black text-slate-900" id="stat-total-partners">--</h4>
                            <div class="mt-4 text-[10px] font-bold text-slate-400">Verified Business Accounts</div>
                        </div>

                        <div class="stat-card">
                            <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                            </div>
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Global Inventory</p>
                            <h4 class="text-3xl font-black text-slate-900" id="stat-total-skus">--</h4>
                            <div class="mt-4 text-[10px] font-bold text-slate-400">Unique SKU Portfolio</div>
                        </div>

                        <div class="stat-card">
                            <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            </div>
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
                            <h4 class="text-3xl font-black text-slate-900" id="stat-revenue">${this.state.settings.currency}0</h4>
                            <div class="mt-4 text-[10px] font-bold text-indigo-600 uppercase">Settled Transactions</div>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 xl:grid-cols-3 gap-12">
                        <div class="xl:col-span-2 space-y-8">
                            <div class="flex justify-between items-center">
                                <h3 class="text-xl font-bold text-slate-900">Incoming Quotation Requests</h3>
                                <div class="text-xs font-bold text-slate-400 flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Updated just now
                                </div>
                            </div>
                            <div id="admin-quotation-list" class="space-y-4">
                                <div class="bg-white border border-slate-200 rounded-2xl p-8 flex items-center justify-center text-slate-400">
                                    <div class="animate-spin w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full mr-4"></div>
                                    Syncing requests...
                                </div>
                            </div>
                        </div>
                        
                        <div class="space-y-8">
                            <h3 class="text-xl font-bold text-slate-900">Quick Tools</h3>
                            <div class="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
                                <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <h4 class="text-sm font-bold text-slate-900 mb-2">Inventory Sync</h4>
                                    <p class="text-xs text-slate-500 font-medium mb-4 leading-relaxed">Update master pricing across all partner tiers instantly.</p>
                                    <button onclick="app.renderAdminInventory(document.getElementById('view-container'))" class="w-full py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Open Inventory</button>
                                </div>
                                <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <h4 class="text-sm font-bold text-slate-900 mb-2">Partner Approvals</h4>
                                    <p class="text-xs text-slate-500 font-medium mb-4 leading-relaxed">Review pending registrations and assign discount tiers.</p>
                                    <button onclick="app.renderAdminUsers(document.getElementById('view-container'))" class="w-full py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Manage Partners</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `;
        
        this.loadAdminQuotations();
        this.loadDashboardStats();
    },

    async loadDashboardStats() {
        try {
            const res = await fetch(this.api('api/admin_stats.php'));
            const stats = await res.json();
            
            document.getElementById('stat-active-quotations').textContent = stats.active_quotations;
            document.getElementById('stat-total-partners').textContent = stats.total_partners;
            document.getElementById('stat-total-skus').textContent = stats.total_skus;
            document.getElementById('stat-revenue').textContent = this.state.settings.currency + stats.revenue.toLocaleString();
            
            const partnerStat = document.getElementById('user-active-quotations');
            if (partnerStat) partnerStat.textContent = stats.active_quotations;
        } catch (e) {
            console.error('Failed to load stats', e);
        }
    },

    async loadAdminQuotations() {
        const list = document.getElementById('admin-quotation-list');
        try {
            const res = await fetch(this.api('api/admin_quotations.php'));
            const quotations = await res.json();
            
            list.innerHTML = quotations.length ? quotations.map(q => `
                <div class="bg-white border border-slate-200 rounded-3xl p-6 flex justify-between items-center hover:shadow-xl hover:shadow-blue-900/5 transition-all">
                    <div>
                        <div class="font-black text-slate-900">${q.user_name}</div>
                        <div class="text-[11px] text-slate-500 font-medium mt-1">${q.user_email} • ${new Date(q.created_at).toLocaleString()}</div>
                    </div>
                    <div class="flex items-center gap-6">
                        <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${this.getStatusClass(q.status)}">
                            ${q.status}
                        </span>
                        ${q.status === 'pending' ? `<button onclick="app.renderProcessQuotation(${q.id})" class="px-5 py-2 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">Process</button>` : ''}
                        ${q.status === 'approved' ? `<button onclick="app.generateInvoice(${q.id})" class="px-5 py-2 rounded-xl bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all">Generate Invoice</button>` : ''}
                    </div>
                </div>
            `).join('') : '<div class="bg-slate-50 border border-slate-100 rounded-3xl p-12 text-center text-slate-400 font-bold">No pending requests</div>';
        } catch (e) {
            list.innerHTML = '<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load requests</div>';
        }
    },

    async renderAdmin(container) {
        if (!this.state.user || this.state.user.role !== 'admin') {
            history.pushState(null, null, this.basePath + '/login');
            this.handleRouting();
            return;
        }

        container.innerHTML = `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${this.getSidebar('admin')}

                <main class="flex-1 p-8 lg:p-12 space-y-12">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h2 class="text-4xl font-black text-slate-900 tracking-tight">Executive <span class="text-blue-600">Dashboard</span></h2>
                            <p class="text-slate-500 mt-2 font-bold text-lg">Platform status and procurement oversight.</p>
                        </div>
                        <button onclick="app.printAdminReport()" class="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                            Generate Report
                        </button>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        ${[
                            { l:'Active Quotations', v:'--', id:'stat-active-quotations', c:'blue' },
                            { l:'Total Partners', v:'--', id:'stat-total-partners', c:'indigo' },
                            { l:'Inventory SKUs', v:'--', id:'stat-total-skus', c:'emerald' },
                            { l:'Monthly Revenue', v:'₹0', id:'stat-revenue', c:'rose' }
                        ].map(s => `
                            <div class="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 hover:shadow-2xl hover:shadow-blue-900/5 transition-all">
                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${s.l}</p>
                                <h3 class="text-3xl font-black text-slate-900" id="${s.id}">${s.v}</h3>
                                <div class="w-full h-1 bg-${s.c}-100 rounded-full overflow-hidden">
                                    <div class="w-1/3 h-full bg-${s.c}-600"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="space-y-8">
                        <div class="flex items-center gap-4">
                            <div class="w-2 h-8 bg-blue-600 rounded-full"></div>
                            <h3 class="text-xl font-black text-slate-900 tracking-tight">Pending Procurements</h3>
                        </div>
                        <div id="admin-quotation-list" class="grid grid-cols-1 gap-4">
                            <div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>
                        </div>
                    </div>
                </main>
            </div>
        `;
        
        this.loadAdminStats();
        this.loadAdminQuotations();
    },

    async loadAdminStats() {
        try {
            const res = await fetch(this.api('api/admin_stats.php'));
            const stats = await res.json();
            if (document.getElementById('stat-active-quotations')) document.getElementById('stat-active-quotations').textContent = stats.active_quotations;
            if (document.getElementById('stat-total-partners')) document.getElementById('stat-total-partners').textContent = stats.total_partners;
            if (document.getElementById('stat-total-skus')) document.getElementById('stat-total-skus').textContent = stats.total_skus;
            if (document.getElementById('stat-revenue')) document.getElementById('stat-revenue').textContent = '₹' + parseFloat(stats.total_revenue || 0).toLocaleString();
        } catch (e) {}
    },

    async renderAdminInventory(container) {
        container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>`;
        
        try {
            const res = await fetch(this.api('api/products.php'));
            const { products } = await res.json();
            this.state.products = products;
            
            container.innerHTML = `
                <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                    ${this.getSidebar('inventory')}

                    <main class="flex-1 p-8 lg:p-12 space-y-12">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h2 class="text-3xl font-black text-slate-900 tracking-tight">Inventory Warehouse</h2>
                                <p class="text-slate-500 mt-1 font-medium">Real-time stock monitoring and fitment management.</p>
                            </div>
                            <div class="flex gap-3 no-print">
                                <button onclick="app.renderImportModal()" class="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                    Bulk Import
                                </button>
                                <button onclick="app.renderAddProductForm()" class="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                                    Add Product
                                </button>
                            </div>
                        </div>

                        <div class="bg-white rounded-3xl border border-slate-200 p-4 flex gap-4">
                            <div class="relative flex-grow">
                                <input type="text" id="inventory-search" oninput="app.filterInventory()" class="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-12 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all" placeholder="Search by Part Name, Brand, or Machine Model...">
                                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                        </div>
                        
                        <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                            <table class="w-full text-left">
                                <thead class="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product & Fitment</th>
                                        <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand</th>
                                        <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Status</th>
                                        <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin Cost</th>
                                        <th class="p-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="inventory-table-body" class="divide-y divide-slate-100">
                                    ${products.map(p => this.createInventoryRow(p)).join('')}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            `;
        } catch (e) {
            container.innerHTML = `<div class="bg-rose-50 border border-rose-100 rounded-3xl p-20 text-center text-rose-500 font-bold">Error loading warehouse data.</div>`;
        }
    },

    filterInventory() {
        const query = (document.getElementById('inventory-search')?.value || '').toLowerCase();
        const rows = document.querySelectorAll('#inventory-table-body tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query) ? '' : 'none';
        });
    },

    createInventoryRow(p) {
        const isLowStock = (p.stock_quantity || 0) < 5;
        return `
            <tr class="hover:bg-slate-50 transition-all group">
                <td class="p-6">
                    <div class="flex items-center gap-4">
                        <div class="relative">
                            <img src="${this.cleanImageUrl(p.photo, p.part_name)}" class="w-12 h-12 rounded-xl object-cover border border-slate-200">
                            ${isLowStock ? '<span class="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>' : ''}
                        </div>
                        <div>
                            <span class="font-bold block text-slate-900">${p.part_name}</span>
                            <span class="text-[10px] text-slate-500 uppercase font-black tracking-widest">${p.machine_model || 'Universal'}</span>
                        </div>
                    </div>
                </td>
                <td class="p-6">
                    <span class="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">${p.brand}</span>
                </td>
                <td class="p-6">
                    <div class="space-y-1.5">
                        <span class="text-xs font-bold ${isLowStock ? 'text-rose-600' : 'text-emerald-600'}">${p.stock_quantity || 0} Units in Reserve</span>
                        <div class="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div class="h-full ${isLowStock ? 'bg-rose-500' : 'bg-emerald-500'}" style="width: ${Math.min((p.stock_quantity || 0) * 5, 100)}%"></div>
                        </div>
                    </div>
                </td>
                <td class="p-6 font-bold text-slate-900 text-sm">₹${p.cost || '0.00'}</td>
                <td class="p-6 text-right">
                    <div class="flex justify-end gap-2">
                        <button onclick="app.renderEditProductForm(${p.id})" class="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button onclick="app.deleteProduct(${p.id})" class="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    },

    renderImportModal() {
        const modal = document.createElement('div');
        modal.id = 'import-modal';
        modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm';
        
        modal.innerHTML = `
            <div class="bg-white rounded-3xl w-full max-w-lg p-10 space-y-8 shadow-2xl animate-in zoom-in duration-300">
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-black text-slate-900">Bulk <span class="text-blue-600">Import</span></h2>
                    <button onclick="document.getElementById('import-modal').remove()" class="text-slate-400 hover:text-slate-900 transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                </div>
                
                <div class="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-3">
                    <p class="text-xs text-blue-600 font-bold">CSV Format Requirement:</p>
                    <code class="text-[10px] text-blue-700 block bg-blue-100/50 p-3 rounded-xl font-mono">Brand, Machine Name, Part Name, Model, Cost, Stock</code>
                </div>

                <form id="import-form" class="space-y-6">
                    <div class="border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center hover:border-blue-500 transition-all cursor-pointer relative group">
                        <input type="file" name="csv_file" accept=".csv" required class="absolute inset-0 opacity-0 cursor-pointer">
                        <svg class="w-12 h-12 text-slate-300 mx-auto mb-4 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p class="text-sm text-slate-400 font-medium">Drop your CSV file here or <span class="text-blue-600 font-bold">browse</span></p>
                    </div>
                    <button type="submit" class="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:scale-[1.02] transition-all">Start Batch Process</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('import-form').onsubmit = async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            btn.disabled = true;
            btn.innerHTML = '<span class="animate-pulse">Processing Batch...</span>';
            
            const formData = new FormData(e.target);
            try {
                const res = await fetch(this.api('api/admin_import.php'), {
                    method: 'POST',
                    body: formData
                });
                const result = await res.json();
                if (result.success) {
                    this.showToast(`Success! Imported ${result.count} products.`);
                    modal.remove();
                    this.renderAdminInventory(document.getElementById('view-container'));
                } else {
                    this.showToast(result.error, 'error');
                }
            } catch (e) {
                this.showToast('Import failed. Check file format.', 'error');
            } finally {
                btn.disabled = false;
                btn.innerHTML = 'Start Batch Process';
            }
        };
    },

    async renderAddProductForm() {
        const modal = document.createElement('div');
        modal.id = 'product-modal';
        modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto';
        
        let lookups = { brands: [], machine_names: [], part_names: [], models: [] };
        try {
            const res = await fetch(this.api('api/admin_products.php?action=lookups'));
            const data = await res.json();
            if (data && !data.error) lookups = data;
        } catch (e) {
            console.error('Failed to load lookups', e);
        }
        
        modal.innerHTML = `
            <div class="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-8">
                <div class="relative bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                    <button onclick="document.getElementById('product-modal').remove()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                    <div class="flex items-center gap-3 mb-5">
                        <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                        </div>
                        <div>
                            <h2 class="text-lg font-bold tracking-tight">Add New Spare Part</h2>
                            <p class="text-blue-200 text-xs">Fill details, then map compatible machines</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <div id="step-dot-1" class="w-7 h-7 rounded-full bg-white text-blue-600 font-bold text-xs flex items-center justify-center">1</div>
                        <span class="text-sm font-semibold">Part Details</span>
                        <div class="flex-1 h-px bg-white/30 mx-2"></div>
                        <div id="step-dot-2" class="w-7 h-7 rounded-full bg-white/30 font-bold text-xs flex items-center justify-center">2</div>
                        <span id="step-label-2" class="text-sm text-white/50">Machine Fitments</span>
                    </div>
                </div>
                
                <div id="form-scroll-area" class="overflow-y-auto" style="max-height:68vh">
                    <form id="add-product-form" class="p-6 space-y-5">
                        <div>
                            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Part Identity</p>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="space-y-1.5">
                                    <label class="text-xs font-semibold text-slate-500">Brand</label>
                                    <div class="relative">
                                        <select name="brand_id" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all appearance-none text-slate-700">
                                            <option value="">Select Brand...</option>
                                            ${lookups.brands.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
                                        </select>
                                        <svg class="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                                        <div id="brand-container"></div>
                                        <button type="button" onclick="app.toggleNewInput('brand',this)" class="mt-1.5 text-[11px] text-blue-500 font-semibold flex items-center gap-1 hover:text-blue-700">+ Add new brand</button>
                                    </div>
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-xs font-semibold text-slate-500">Machine Type</label>
                                    <div class="relative">
                                        <select name="machine_name_id" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all appearance-none text-slate-700">
                                            <option value="">Select Machine...</option>
                                            ${lookups.machine_names.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
                                        </select>
                                        <svg class="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                                        <div id="machine_name-container"></div>
                                        <button type="button" onclick="app.toggleNewInput('machine_name',this)" class="mt-1.5 text-[11px] text-blue-500 font-semibold flex items-center gap-1 hover:text-blue-700">+ Add new machine</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="h-px bg-slate-100"></div>

                        <div>
                            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Classification</p>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="space-y-1.5">
                                    <label class="text-xs font-semibold text-slate-500">Part Name</label>
                                    <div class="relative">
                                        <select name="part_name_id" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all appearance-none text-slate-700">
                                            <option value="">Select Part Name...</option>
                                            ${lookups.part_names.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
                                        </select>
                                        <svg class="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                                        <div id="part_name-container"></div>
                                        <button type="button" onclick="app.toggleNewInput('part_name',this)" class="mt-1.5 text-[11px] text-blue-500 font-semibold flex items-center gap-1 hover:text-blue-700">+ Add new part name</button>
                                    </div>
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-xs font-semibold text-slate-500">Model / SKU</label>
                                    <div class="relative">
                                        <select name="model_id" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all appearance-none text-slate-700">
                                            <option value="">Select Model...</option>
                                            ${lookups.models.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
                                        </select>
                                        <svg class="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                                        <div id="model-container"></div>
                                        <button type="button" onclick="app.toggleNewInput('model',this)" class="mt-1.5 text-[11px] text-blue-500 font-semibold flex items-center gap-1 hover:text-blue-700">+ Add new model</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="h-px bg-slate-100"></div>

                        <div>
                            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Pricing & Inventory</p>
                            <div class="grid grid-cols-3 gap-4">
                                <div class="space-y-1.5">
                                    <label class="text-xs font-semibold text-slate-500">Cost Price</label>
                                    <div class="relative">
                                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">₹</span>
                                        <input type="number" name="cost" step="0.01" min="0" required class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all text-slate-700" placeholder="0.00">
                                    </div>
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-xs font-semibold text-slate-500">Initial Stock</label>
                                    <input type="number" name="stock_quantity" min="0" value="0" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all text-slate-700">
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-xs font-semibold text-slate-500">Note</label>
                                    <input type="text" name="note" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all text-slate-700" placeholder="Optional...">
                                </div>
                            </div>
                        </div>

                        <div>
                            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Photo</p>
                            <label class="flex items-center gap-4 p-4 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/40 transition-all group">
                                <div class="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center flex-shrink-0 transition-all">
                                    <svg class="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                </div>
                                <div>
                                    <p id="photo-label" class="text-sm font-medium text-slate-500 group-hover:text-blue-600 transition-colors">Click to upload part photo</p>
                                    <p class="text-xs text-slate-400">JPG, PNG, WEBP supported</p>
                                </div>
                                <input type="file" name="photo" accept="image/*" class="hidden" onchange="document.getElementById('photo-label').textContent=this.files[0]?.name||'Click to upload part photo'">
                            </label>
                        </div>

                        <button type="submit" id="main-save-btn" class="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-sm shadow-lg shadow-blue-500/30 hover:opacity-90 hover:scale-[1.01] transition-all flex items-center justify-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            Save Part & Continue to Fitments
                        </button>
                    </form>

                    <div id="fitment-section" class="hidden">
                        <div class="px-6 py-4 bg-emerald-50 border-t border-emerald-100 flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                            </div>
                            <div>
                                <p class="font-bold text-emerald-800 text-sm">Part saved! Now map compatible machines.</p>
                                <p class="text-[11px] text-emerald-600">Part: <span id="current-part-name" class="font-bold">--</span></p>
                            </div>
                        </div>
                        <div class="p-6 space-y-5">
                            <form id="fitment-form" class="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                                <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Link a Machine</p>
                                <input type="hidden" name="part_id" id="fitment-part-id">
                                <div class="grid grid-cols-3 gap-3">
                                    <div>
                                        <label class="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">Brand</label>
                                        <select name="brand_id" required class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 transition-all appearance-none text-slate-700">
                                            <option value="">Select...</option>
                                            ${lookups.brands.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
                                        </select>
                                    </div>
                                    <div>
                                        <label class="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">Machine</label>
                                        <select name="machine_name_id" required class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 transition-all appearance-none text-slate-700">
                                            <option value="">Select...</option>
                                            ${lookups.machine_names.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
                                        </select>
                                    </div>
                                    <div>
                                        <label class="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">Model</label>
                                        <select name="model_id" required class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 transition-all appearance-none text-slate-700">
                                            <option value="">Select...</option>
                                            ${lookups.models.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 text-white text-sm font-bold transition-all">+ Add Machine Fitment</button>
                            </form>
                            <div>
                                <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Linked Machines</p>
                                <div id="fitment-list" class="space-y-2"></div>
                            </div>
                            <button onclick="document.getElementById('product-modal').remove();app.renderAdminInventory(document.getElementById('view-container'));" class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-lg hover:opacity-90 hover:scale-[1.01] transition-all">
                                Done — View in Inventory
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const mainForm = document.getElementById('add-product-form');
        const fitmentSection = document.getElementById('fitment-section');
        const fitmentForm = document.getElementById('fitment-form');
        
        mainForm.onsubmit = async (e) => {
            e.preventDefault();
            const btn = document.getElementById('main-save-btn');
            btn.disabled = true;
            btn.innerHTML = '<span class="animate-pulse">Saving...</span>';

            try {
                const formData = new FormData(e.target);
                formData.append('action', 'add_product');
                
                const res = await fetch(this.api('api/admin_products.php'), {
                    method: 'POST',
                    body: formData
                });
                const result = await res.json();
                
                if (result.success) {
                    this.showToast('Part saved! Now add suitable machines.');
                    document.getElementById('fitment-part-id').value = result.id;
                    
                    const partSelect = mainForm.querySelector('select[name="part_name_id"]');
                    const partName = partSelect.options[partSelect.selectedIndex].text;
                    document.getElementById('current-part-name').textContent = partName;
                    
                    const dot2 = document.getElementById('step-dot-2');
                    const label2 = document.getElementById('step-label-2');
                    if (dot2) dot2.className = 'w-7 h-7 rounded-full bg-white text-blue-600 font-bold text-xs flex items-center justify-center';
                    if (label2) label2.className = 'text-sm font-semibold text-white';
                    
                    mainForm.classList.add('opacity-40', 'pointer-events-none');
                    Array.from(mainForm.querySelectorAll('[required]')).forEach(el => el.required = false);
                    btn.textContent = 'Saved ✓';
                    btn.className = 'w-full py-4 rounded-2xl bg-green-500 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-default';
                    
                    fitmentSection.classList.remove('hidden');
                    fitmentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    this.loadFitments(result.id);
                } else {
                    this.showToast(result.error || 'Failed to save product', 'error');
                    btn.disabled = false;
                    btn.textContent = 'Save';
                }
            } catch (err) {
                this.showToast('Server error during save', 'error');
                btn.disabled = false;
                btn.textContent = 'Save';
            }
        };

        fitmentForm.onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            formData.append('action', 'save_fitment');
            
            const res = await fetch(this.api('api/admin_products.php'), {
                method: 'POST',
                body: formData
            });
            const result = await res.json();
            
            if (result.success) {
                this.showToast('Machine linked successfully!');
                this.loadFitments(formData.get('part_id'));
                fitmentForm.reset();
            } else {
                this.showToast(result.error, 'error');
            }
        };
    },

    async loadFitments(partId) {
        const res = await fetch(this.api(`api/admin_products.php?action=get_fitments&part_id=${partId}`));
        const { fitments } = await res.json();
        const container = document.getElementById('fitment-list');
        
        container.innerHTML = fitments.map(f => `
            <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl animate-in slide-in-from-left-2 duration-300">
                <div class="flex items-center gap-4">
                    <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">✓</div>
                    <div>
                        <p class="text-sm font-bold text-slate-800">${f.brand_name} ${f.machine_name}</p>
                        <p class="text-[10px] text-slate-500 uppercase tracking-tighter">Model: ${f.model_name}</p>
                    </div>
                </div>
                <button onclick="app.deleteFitment(${f.id}, ${partId})" class="text-slate-300 hover:text-red-500 transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
            </div>
        `).join('');
    },

    async deleteFitment(id, partId) {
        if (!confirm('Remove this machine fitment?')) return;
        try {
            const res = await fetch(this.api(`api/admin_products.php?action=delete_fitment&id=${id}`), { method: 'DELETE' });
            const result = await res.json();
            if (result.success) {
                this.showToast('Fitment removed');
                this.loadFitments(partId);
            }
        } catch (e) {}
    },

    async deleteProduct(id) {
        if (!confirm('Are you sure you want to delete this spare part? This will remove all associated fitments.')) return;
        try {
            const res = await fetch(this.api(`api/admin_products.php?id=${id}`), { method: 'DELETE' });
            const result = await res.json();
            if (result.success) {
                this.showToast('Product deleted successfully');
                this.renderAdminInventory(document.getElementById('view-container'));
            } else {
                this.showToast(result.error || 'Failed to delete product', 'error');
            }
        } catch (e) {
            this.showToast('Server error while deleting', 'error');
        }
    },

    async renderEditProductForm(id) {
        let product = this.state.products.find(p => p.id === id);
        if (!product) {
            try {
                const res = await fetch(this.api('api/products.php'));
                const { products } = await res.json();
                this.state.products = products;
                product = products.find(p => p.id === id);
            } catch (e) {}
        }
        if (!product) {
            this.showToast('Product not found', 'error');
            return;
        }

        await this.renderAddProductForm();
        const modal = document.getElementById('product-modal');
        modal.querySelector('h2').innerHTML = 'Edit <span class="text-blue-600">Spare Part</span>';
        
        const form = document.getElementById('add-product-form');
        form.dataset.editId = id;
        
        if (product.brand_id) form.querySelector('select[name="brand_id"]').value = product.brand_id;
        if (product.machine_name_id) form.querySelector('select[name="machine_name_id"]').value = product.machine_name_id;
        if (product.part_name_id) form.querySelector('select[name="part_name_id"]').value = product.part_name_id;
        if (product.model_id) form.querySelector('select[name="model_id"]').value = product.model_id;
        if (product.cost) form.querySelector('input[name="cost"]').value = product.cost;
        if (product.note) form.querySelector('input[name="note"]').value = product.note;
        
        document.getElementById('fitment-part-id').value = id;
        document.getElementById('current-part-name').textContent = product.part_name;
        document.getElementById('fitment-section').classList.remove('hidden');
        this.loadFitments(id);
        
        form.onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            data.id = id;
            
            const res = await fetch(this.api('api/admin_products.php'), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.success) {
                this.showToast('Product updated!');
                this.renderAdminInventory(document.getElementById('view-container'));
                modal.remove();
            } else {
                this.showToast(result.error, 'error');
            }
        };
    },

    toggleNewInput(type, btn) {
        const parent = btn.closest('.relative');
        const select = parent.querySelector('select');
        const container = parent.querySelector(`#${type}-container`);
        
        if (container.innerHTML) {
            container.innerHTML = '';
            select.classList.remove('hidden');
            select.required = true;
            btn.textContent = 'Add New';
            return;
        }

        select.classList.add('hidden');
        select.required = false;
        btn.textContent = 'Cancel';
        container.innerHTML = `
            <div class="flex gap-2 animate-in slide-in-from-top-1 duration-200">
                <input type="text" id="new-${type}-name" required class="flex-grow bg-slate-50 border border-blue-500 rounded-2xl px-5 py-4 text-slate-700 focus:outline-none ring-4 ring-blue-500/10" placeholder="New ${type.replace('_', ' ')}...">
                <button type="button" onclick="app.saveNewLookup('${type}', this)" class="px-6 bg-blue-600 rounded-2xl text-white text-xs font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">Save</button>
            </div>
        `;
    },

    async saveNewLookup(type, btn) {
        const input = document.getElementById(`new-${type}-name`);
        const name = input.value;
        if (!name) return;

        btn.disabled = true;
        const formData = new FormData();
        formData.append('action', 'add_lookup');
        formData.append('type', type);
        formData.append('name', name);

        if (type === 'model') {
            const parentForm = btn.closest('form');
            const brandId = parentForm.querySelector('select[name="brand_id"]')?.value;
            const machineNameId = parentForm.querySelector('select[name="machine_name_id"]')?.value;
            if (!brandId || !machineNameId) {
                this.showToast('Select Brand and Machine Name first', 'error');
                btn.disabled = false;
                return;
            }
            formData.append('brand_id', brandId);
            formData.append('machine_name_id', machineNameId);
        }

        try {
            const res = await fetch(this.api('api/admin_products.php'), {
                method: 'POST',
                body: formData
            });
            const result = await res.json();
            if (result.success) {
                this.showToast(`${type.replace('_', ' ')} added!`);
                
                const selects = document.querySelectorAll(`select[name="${type === 'machine_name' ? 'machine_name_id' : type + '_id'}"]`);
                selects.forEach(sel => {
                    const opt = document.createElement('option');
                    opt.value = result.id;
                    opt.textContent = name;
                    opt.selected = true;
                    sel.appendChild(opt);
                });

                const parent = btn.closest('.relative');
                const select = parent.querySelector('select');
                const toggleBtn = Array.from(parent.querySelectorAll('button')).find(b => b.textContent === 'Cancel');
                if (toggleBtn) {
                    this.toggleNewInput(type, toggleBtn);
                } else {
                    container.innerHTML = '';
                    select.classList.remove('hidden');
                    select.required = true;
                }
            } else {
                this.showToast(result.error, 'error');
                btn.disabled = false;
            }
        } catch (e) {
            this.showToast('Failed to add new entry', 'error');
            btn.disabled = false;
        }
    },

    async renderProcessQuotation(quotationId) {
        const modal = document.createElement('div');
        modal.id = 'process-modal';
        modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto';
        
        const res = await fetch(this.api('api/admin_quotations.php'));
        const all = await res.json();
        const q = all.find(item => item.id == quotationId);
        
        const itemRes = await fetch(this.api(`api/admin_quotations.php?id=${quotationId}`));
        const data = await itemRes.json();
        const details = data.items;
        const discountTier = parseFloat(data.discount_tier || 0);
        
        modal.innerHTML = `
            <div class="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in duration-300 my-8">
                <div class="bg-slate-900 p-8 text-white flex justify-between items-center">
                    <div>
                        <h2 class="text-2xl font-black tracking-tight">Process Quotation</h2>
                        <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Request from ${q.user_name} (#Q-${String(q.id).padStart(4, '0')})</p>
                    </div>
                    <button onclick="document.getElementById('process-modal').remove()" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <div class="p-8 space-y-8">
                    <div class="flex flex-wrap gap-4">
                        <div class="flex-1 min-w-[200px] p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                            <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Partner Tier</p>
                            <h4 class="text-xl font-black text-slate-900">${discountTier}% Automatic Discount</h4>
                        </div>
                        <div class="flex-1 min-w-[200px] p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Status</p>
                            <h4 class="text-xl font-black text-amber-600 uppercase">${q.status}</h4>
                        </div>
                    </div>
                    
                    <form id="price-quotation-form" class="space-y-8">
                        <div class="border border-slate-200 rounded-2xl overflow-hidden">
                            <table class="w-full text-left">
                                <thead class="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Spare Part Detail</th>
                                        <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</th>
                                        <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">MSRP (₹)</th>
                                        <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Final Unit Price (₹)</th>
                                        <th class="p-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100">
                                    ${details.map(item => `
                                        <tr class="group">
                                            <td class="p-6">
                                                <div class="font-bold text-slate-900">${item.part_name}</div>
                                                <div class="text-[10px] text-slate-500 uppercase font-black tracking-tighter mt-0.5">${item.brand} • ${item.machine_model}</div>
                                            </td>
                                            <td class="p-6 text-slate-600 font-black">${item.quantity}</td>
                                            <td class="p-6 text-slate-400 font-bold text-sm">₹${item.cost || '0.00'}</td>
                                            <td class="p-6">
                                                <div class="flex items-center gap-2">
                                                    <input type="number" name="price_${item.id}" data-item-id="${item.id}" data-qty="${item.quantity}" data-msrp="${item.cost || 0}" step="0.01" value="${item.unit_price || ''}" required class="w-28 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-black text-blue-600 focus:outline-none focus:border-blue-500 transition-all unit-price-input">
                                                    <button type="button" onclick="app.applyDiscountToItem(this, ${discountTier})" class="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                                    </button>
                                                </div>
                                            </td>
                                            <td class="p-6 text-right font-black text-blue-600 subtotal-cell">₹${(item.quantity * (item.unit_price || 0)).toFixed(2)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                                <tfoot class="bg-slate-50 border-t border-slate-200">
                                    <tr>
                                        <td colspan="4" class="p-8 text-right font-black text-slate-400 uppercase tracking-widest text-xs">Total Quotation Value:</td>
                                        <td class="p-8 text-right font-black text-3xl text-slate-900" id="quotation-total-display">₹0.00</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        
                        <div class="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
                            <button type="button" onclick="app.applyDiscountToAll(${discountTier})" class="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-all font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-600/20">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                Apply Partner Discount to All
                            </button>
                            <div class="flex gap-4 w-full md:w-auto">
                                <button type="button" onclick="document.getElementById('process-modal').remove()" class="px-8 py-3.5 rounded-2xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all font-black text-[11px] uppercase tracking-widest">Cancel</button>
                                <button type="submit" class="px-10 py-3.5 rounded-2xl bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-[1.02] transition-all">Publish & Send</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.querySelectorAll('.unit-price-input').forEach(input => {
            input.oninput = () => this.updateQuotationTotals();
        });
        this.updateQuotationTotals();
        
        document.getElementById('price-quotation-form').onsubmit = async (e) => {
            e.preventDefault();
            const items = Array.from(document.querySelectorAll('.unit-price-input')).map(input => ({
                item_id: input.dataset.itemId,
                unit_price: input.value
            }));
            
            const res = await fetch(this.api('api/admin_quotations.php'), {
                method: 'PUT',
                body: JSON.stringify({ quotation_id: quotationId, items })
            });
            const result = await res.json();
            if (result.success) {
                this.showToast('Quotation priced and sent successfully!');
                modal.remove();
                this.loadAdminQuotations();
            } else {
                this.showToast(result.error, 'error');
            }
        };
    },

    applyDiscountToItem(btn, discount) {
        const input = btn.closest('.flex').querySelector('input');
        const msrp = parseFloat(input.dataset.msrp);
        const discounted = msrp * (1 - (discount / 100));
        input.value = discounted.toFixed(2);
        this.updateQuotationTotals();
    },

    applyDiscountToAll(discount) {
        document.querySelectorAll('.unit-price-input').forEach(input => {
            const msrp = parseFloat(input.dataset.msrp);
            const discounted = msrp * (1 - (discount / 100));
            input.value = discounted.toFixed(2);
        });
        this.updateQuotationTotals();
        this.showToast(`Applied ${discount}% discount to all items.`);
    },

    updateQuotationTotals() {
        let total = 0;
        document.querySelectorAll('.unit-price-input').forEach(input => {
            const qty = parseFloat(input.dataset.qty);
            const price = parseFloat(input.value) || 0;
            const subtotal = qty * price;
            const row = input.closest('tr');
            if (row) row.querySelector('.subtotal-cell').textContent = `₹${subtotal.toFixed(2)}`;
            total += subtotal;
        });
        const display = document.getElementById('quotation-total-display');
        if (display) display.textContent = `₹${total.toFixed(2)}`;
    },

    async approveQuotation(id) {
        if (!confirm('Are you sure you want to approve this quotation? This will move it to final billing.')) return;
        
        try {
            const res = await fetch(this.api('api/quotations.php'), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quotation_id: id })
            });
            const result = await res.json();
            if (result.success) {
                this.showToast('Quotation approved! Awaiting invoice generation.');
                this.renderQuotations(document.getElementById('view-container'));
            } else {
                this.showToast(result.error, 'error');
            }
        } catch (e) {
            this.showToast('Failed to approve', 'error');
        }
    },

    async generateInvoice(quotationId) {
        try {
            const res = await fetch(this.api('api/invoices.php'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quotation_id: quotationId })
            });
            const result = await res.json();
            if (result.success) {
                this.showToast('Invoice generated successfully!');
                this.loadAdminQuotations();
            } else {
                this.showToast(result.error, 'error');
            }
        } catch (e) {
            this.showToast('Failed to generate invoice', 'error');
        }
    },

    async renderInvoiceDocument(invoiceId) {
        const modal = document.createElement('div');
        modal.id = 'invoice-doc-modal';
        modal.className = 'fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-lg overflow-y-auto';
        
        try {
            const res = await fetch(this.api(`api/invoices.php?id=${invoiceId}`));
            const inv = await res.json();
            
            modal.innerHTML = `
                <div class="bg-white text-slate-900 w-full max-w-4xl min-h-[11in] p-16 shadow-2xl relative animate-in slide-in-from-bottom-8 duration-500 rounded-sm">
                    <div class="flex justify-between items-start border-b-2 border-slate-900 pb-12">
                        <div class="space-y-4">
                            <h1 class="text-4xl font-black tracking-tighter uppercase">PARTS<span class="text-blue-600">PRO</span></h1>
                            <div class="text-xs font-bold text-slate-500 space-y-1 uppercase tracking-widest">
                                <p>Industrial Area, Phase 2</p>
                                <p>New Delhi, 110020</p>
                                <p>GSTIN: 07AAACT0000A1Z5</p>
                            </div>
                        </div>
                        <div class="text-right space-y-2">
                            <h2 class="text-5xl font-light text-slate-200">TAX INVOICE</h2>
                            <p class="text-lg font-black">${inv.invoice_number}</p>
                            <p class="text-sm font-bold text-slate-400">${new Date(inv.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-12 py-12">
                        <div class="space-y-2">
                            <h3 class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Bill To:</h3>
                            <p class="text-xl font-black text-slate-900">${inv.user_name}</p>
                            <p class="text-sm font-bold text-slate-500 italic">${inv.user_email}</p>
                        </div>
                        <div class="space-y-2 text-right">
                            <h3 class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Reference:</h3>
                            <p class="text-sm font-black">Quotation #Q-${String(inv.q_id).padStart(4, '0')}</p>
                            <p class="text-xs font-bold text-slate-400">Request Date: ${new Date(inv.q_date).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div class="py-8">
                        <table class="w-full text-left">
                            <thead>
                                <tr class="border-b border-slate-200 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    <th class="py-4">Description</th>
                                    <th class="py-4 text-center">Qty</th>
                                    <th class="py-4 text-right">Unit Rate</th>
                                    <th class="py-4 text-right">Net Amount</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                ${inv.items.map(item => `
                                    <tr>
                                        <td class="py-6">
                                            <p class="font-black text-slate-900">${item.part_name}</p>
                                            <p class="text-[10px] text-slate-400 font-black uppercase mt-1 tracking-tighter">${item.brand} • ${item.machine_model}</p>
                                        </td>
                                        <td class="py-6 text-center font-black text-slate-600">${item.quantity}</td>
                                        <td class="py-6 text-right font-black text-slate-500">₹${parseFloat(item.unit_price).toLocaleString()}</td>
                                        <td class="py-6 text-right font-black text-slate-900">₹${(item.quantity * item.unit_price).toLocaleString()}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div class="flex justify-end pt-8 border-t-2 border-slate-900">
                        <div class="w-72 space-y-4">
                            <div class="flex justify-between text-xs font-black uppercase tracking-widest">
                                <span class="text-slate-400">Subtotal</span>
                                <span class="text-slate-900">₹${parseFloat(inv.total_amount).toLocaleString()}</span>
                            </div>
                            <div class="flex justify-between text-xs font-black uppercase tracking-widest">
                                <span class="text-slate-400">Taxable GST (0%)</span>
                                <span class="text-slate-300">₹0.00</span>
                            </div>
                            <div class="flex justify-between pt-4 border-t border-slate-200">
                                <span class="text-lg font-black uppercase tracking-tighter">Grand Total</span>
                                <span class="text-3xl font-black text-blue-600">₹${parseFloat(inv.total_amount).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div class="absolute bottom-16 left-16 right-16 flex justify-between items-end border-t border-slate-100 pt-8">
                        <div class="text-[10px] text-slate-400 font-bold leading-relaxed max-w-sm uppercase tracking-tight">
                            <p class="font-black text-slate-900 mb-1 tracking-widest">Terms & Conditions</p>
                            <p>1. Goods once sold will not be taken back. 2. Subject to Delhi Jurisdiction. 3. This is a computer generated document.</p>
                        </div>
                        <div class="text-right">
                            <div class="w-40 h-16 border-b-2 border-slate-900 ml-auto mb-2 opacity-10"></div>
                            <p class="text-[10px] font-black uppercase text-slate-900 tracking-widest">Authorized Signatory</p>
                        </div>
                    </div>

                    <div class="fixed top-8 right-8 flex flex-col gap-4 no-print z-[210]">
                        <button onclick="window.print()" class="w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-all">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        </button>
                        <button onclick="document.getElementById('invoice-doc-modal').remove()" class="w-14 h-14 bg-white text-slate-900 rounded-2xl shadow-2xl flex items-center justify-center border border-slate-100 hover:scale-110 transition-all">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                </div>
                
                <style>
                    @media print {
                        body * { visibility: hidden; }
                        #invoice-doc-modal, #invoice-doc-modal * { visibility: visible; }
                        #invoice-doc-modal { position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: white; p: 0; }
                        .no-print { display: none !important; }
                        .bg-white { box-shadow: none !important; border: none !important; }
                    }
                </style>
            `;
            
            document.body.appendChild(modal);
        } catch (e) {
            this.showToast('Failed to load invoice document', 'error');
        }
    },

    async viewQuotationDetails(id) {
        let data, q;
        try {
            const res = await fetch(this.api(`api/admin_quotations.php?id=${id}`));
            data = await res.json();
            if (data.error) throw new Error(data.error);
        } catch(e) {
            data = { items: [], discount_tier: 0 };
        }
        
        const resAll = await fetch(this.api('api/quotations.php'));
        const all = await resAll.json();
        q = Array.isArray(all) ? all.find(item => item.id == id) : null;
        if (!q) { this.showToast('Quotation not found', 'error'); return; }

        const modal = document.createElement('div');
        modal.id = 'quotation-doc-modal';
        modal.className = 'fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-lg overflow-y-auto';
        
        modal.innerHTML = `
            <div class="bg-white text-slate-900 w-full max-w-4xl min-h-[11in] p-16 shadow-2xl relative animate-in slide-in-from-bottom-8 duration-500 rounded-sm">
                <div class="flex justify-between items-start border-b-2 border-slate-900 pb-12">
                    <div class="space-y-4">
                        <h1 class="text-4xl font-black tracking-tighter uppercase">PARTS<span class="text-blue-600">PRO</span></h1>
                        <p class="text-xs font-black text-slate-400 uppercase tracking-widest">B2B Procurement Request</p>
                    </div>
                    <div class="text-right space-y-2">
                        <h2 class="text-5xl font-light text-slate-200">QUOTATION</h2>
                        <p class="text-lg font-black">#Q-${String(id).padStart(4, '0')}</p>
                        <p class="text-sm font-bold text-slate-400">${new Date(q.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>

                <div class="py-12">
                    <h3 class="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-6">Requested Components:</h3>
                    <table class="w-full text-left">
                        <thead>
                            <tr class="border-b border-slate-200 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                <th class="py-4">Description</th>
                                <th class="py-4 text-center">Qty</th>
                                <th class="py-4 text-right">Estimated Rate</th>
                                <th class="py-4 text-right">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${data.items.map(item => `
                                <tr>
                                    <td class="py-6">
                                        <p class="font-black text-slate-900">${item.part_name}</p>
                                        <p class="text-[10px] text-slate-400 font-black uppercase mt-1 tracking-tighter">${item.brand} • ${item.machine_model}</p>
                                    </td>
                                    <td class="py-6 text-center font-black text-slate-600">${item.quantity}</td>
                                    <td class="py-6 text-right font-black text-slate-500">${item.unit_price ? '₹' + parseFloat(item.unit_price).toLocaleString() : '---'}</td>
                                    <td class="py-6 text-right font-black text-slate-900">${item.unit_price ? '₹' + (item.quantity * item.unit_price).toLocaleString() : '<span class="text-amber-500">Awaiting Price</span>'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="flex justify-end pt-8 border-t-2 border-slate-900">
                    <div class="w-72 space-y-4">
                        <div class="flex justify-between pt-4">
                            <span class="text-lg font-black uppercase tracking-tighter">Request Total</span>
                            <span class="text-3xl font-black text-blue-600">₹${parseFloat(q.total_amount || 0).toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div class="absolute bottom-16 left-16 right-16 flex justify-between items-end border-t border-slate-100 pt-8">
                    <p class="text-[10px] text-slate-400 font-bold italic uppercase tracking-widest">Formal quotation valid for 15 days from issue date.</p>
                    <div class="flex gap-4 no-print">
                        <button onclick="window.print()" class="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-slate-900/20">Print</button>
                        <button onclick="document.getElementById('quotation-doc-modal').remove()" class="px-8 py-3 border border-slate-200 text-slate-400 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-50">Close</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    getStatusClass(status) {
        switch(status) {
            case 'pending': return 'bg-amber-50 text-amber-600 border border-amber-100';
            case 'priced': return 'bg-blue-50 text-blue-600 border border-blue-100';
            case 'approved': return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
            case 'completed': return 'bg-slate-50 text-slate-500 border border-slate-200';
            default: return 'bg-slate-50 text-slate-400';
        }
    },

    addToCart(productId) {
        if (!this.state.user) {
            this.showToast('Please login to create a quotation', 'error');
            history.pushState(null, null, this.basePath + '/login');
            this.handleRouting();
            return;
        }
        
        const product = this.state.products.find(p => p.id === productId);
        if (!product) return;

        const existing = this.state.cart.find(c => c.id === productId);
        if (existing) {
            existing.quantity++;
        } else {
            this.state.cart.push({ ...product, quantity: 1 });
        }
        
        this.updateCartBadge();
        this.showToast(`${product.part_name} added to cart`);
    },

    updateCartBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        const count = this.state.cart.reduce((sum, item) => sum + item.quantity, 0);
        badges.forEach(b => b.textContent = count);
        
        const headerBadge = document.querySelector('nav .absolute');
        if (headerBadge) headerBadge.textContent = count;
    },

    updateCartQty(id, qty) {
        const item = this.state.cart.find(c => c.id === id);
        if (item) item.quantity = parseInt(qty) || 1;
        this.updateCartBadge();
    },

    removeFromCart(id) {
        this.state.cart = this.state.cart.filter(c => c.id !== id);
        this.updateCartBadge();
        this.renderCart(document.getElementById('view-container'));
    },

    async submitQuotation() {
        if (!this.state.user) {
            this.showToast('Please login first', 'error');
            history.pushState(null, null, this.basePath + '/login');
            this.handleRouting();
            return;
        }
        try {
            const res = await fetch(this.api('api/quotations.php'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: this.state.cart.map(c => ({ part_id: c.id, quantity: c.quantity })) })
            });
            const result = await res.json();
            if (result.success) {
                this.showToast('Quotation submitted successfully!');
                this.state.cart = [];
                this.updateCartBadge();
                history.pushState(null, null, this.basePath + '/quotations');
                this.handleRouting();
            } else {
                this.showToast(result.error || 'Submission failed', 'error');
            }
        } catch (e) {
            this.showToast('Error submitting quotation', 'error');
        }
    },

    async renderDashboard(container) {
        if (!this.state.user) {
            history.pushState(null, null, this.basePath + '/login');
            this.handleRouting();
            return;
        }

        container.innerHTML = `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${this.getSidebar('dashboard')}

                <main class="flex-1 p-8 lg:p-12 space-y-12">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h2 class="text-4xl font-black text-slate-900 tracking-tight">Partner <span class="text-primary">Dashboard</span></h2>
                            <p class="text-slate-500 mt-2 font-bold text-lg">Welcome back, ${this.state.user.name}.</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        ${[
                            { l:'Total Procurement', v:'₹0.00', s:'+0%', c:'primary' },
                            { l:'Total Savings', v:'₹0.00', s:'+0%', c:'emerald' },
                            { l:'Active Orders', v:'0', s:'- -', c:'amber' },
                            { l:'Saved Items', v:'0', s:'- -', c:'rose' }
                        ].map(s => `
                            <div class="summary-card group hover:scale-[1.02] transition-all duration-300">
                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">${s.l}</p>
                                <div class="flex items-end justify-between">
                                    <h3 class="text-3xl font-black text-slate-900">${s.v}</h3>
                                    <span class="text-[10px] font-black text-${s.c}-500 bg-${s.c}-50 px-2 py-1 rounded-lg">${s.s}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </main>
            </div>
        `;
        
        this.loadDashboardStats();
    },

    updateAuthUI() {
        const loginBtn    = document.getElementById('desktop-login-btn');
        const registerBtn = document.getElementById('desktop-register-btn');
        const logoutBtn   = document.getElementById('desktop-logout-btn');
        const dashboardLink = document.getElementById('nav-dashboard');
        const cartBtn     = document.getElementById('cart-icon-desktop');
        const adminLink   = document.getElementById('nav-admin');
        const mobileProfileLink = document.getElementById('mob-profile');
        const whatsappBtn = document.getElementById('whatsapp-btn');

        if (this.state.user) {
            if (loginBtn)    loginBtn.style.display    = 'none';
            if (registerBtn) registerBtn.style.display = 'none';
            if (logoutBtn)   logoutBtn.style.display   = 'inline-flex';
            if (dashboardLink) dashboardLink.style.display = 'inline-flex';
            if (cartBtn)     cartBtn.style.display     = 'inline-flex';
            if (whatsappBtn) whatsappBtn.style.display = 'flex';

            if (adminLink) adminLink.style.display = this.state.user.role === 'admin' ? 'flex' : 'none';

            if (logoutBtn) logoutBtn.innerHTML = `
                <div class="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-[10px] font-black text-white flex-shrink-0">${this.state.user.name.charAt(0).toUpperCase()}</div>
                <span class="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap font-bold text-slate-700">${this.state.user.name}</span>
                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            `;
            if (logoutBtn) logoutBtn.onclick = (e) => { e.preventDefault(); this.logout(); };

            if (mobileProfileLink) {
                mobileProfileLink.innerHTML = `
                    <div class="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-black text-white">${this.state.user.name.charAt(0)}</div>
                    <span>Dashboard</span>
                `;
                mobileProfileLink.href = this.state.user.role === 'admin' ? '/admin' : '/dashboard';
                mobileProfileLink.setAttribute('data-link', '');
            }
        } else {
            if (loginBtn)    loginBtn.style.display    = 'inline-flex';
            if (registerBtn) registerBtn.style.display = 'inline-flex';
            if (logoutBtn)   logoutBtn.style.display   = 'none';
            if (dashboardLink) dashboardLink.style.display = 'none';
            if (cartBtn)     cartBtn.style.display     = 'none';
            if (adminLink)   adminLink.style.display   = 'none';
        }
    },

    async logout() {
        await fetch(this.api('api/auth.php'), { method: 'POST', body: JSON.stringify({ action: 'logout' }) });
        this.state.user = null;
        this.showToast('Logged out successfully');
        history.pushState(null, null, this.basePath + '/');
        this.handleRouting();
    },

    async renderMyPartsList(container) {
        if (!this.state.user) { history.pushState(null, null, this.basePath + '/login'); this.handleRouting(); return; }
        container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>`;
        
        try {
            container.innerHTML = `
                <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                    ${this.getSidebar('parts_list')}
                    <main class="flex-1 p-8 lg:p-12">
                        <div class="max-w-6xl mx-auto space-y-12 animate-fade-in">
                            <div class="flex justify-between items-end">
                                <div>
                                    <div class="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Personal Collection</div>
                                    <h2 class="text-4xl font-black tracking-tight text-slate-900">My <span class="text-primary">Parts List</span></h2>
                                    <p class="text-slate-500 font-medium mt-2 text-lg">Your curated selection of essential spares for quick procurement.</p>
                                </div>
                                <button onclick="app.renderCatalog(document.getElementById('view-container'))" class="btn btn-primary">Add More Spares</button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div class="card p-8 group">
                                    <div class="w-full h-48 bg-slate-50 rounded-2xl mb-6 overflow-hidden border border-slate-100 flex items-center justify-center">
                                        <svg class="w-20 h-20 text-slate-200 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                                    </div>
                                    <h4 class="text-lg font-black text-slate-900 mb-1">Carbon Brush GWS 600</h4>
                                    <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">SKU: CB-GWS600</p>
                                    <div class="flex gap-3">
                                        <button class="flex-1 h-12 rounded-xl bg-primary text-white font-black text-[10px] uppercase tracking-widest hover:bg-primary-dark transition-all">Add to Cart</button>
                                        <button class="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-all"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            `;
        } catch (e) {
            this.showToast('Failed to load parts list', 'error');
        }
    },

    getSidebar(active) {
        if (!this.state.user) return '';
        const isAppAdmin = this.state.user.role === 'admin';
        
        return `
            <aside class="w-full lg:w-72 bg-white border-r border-slate-200 p-8 flex flex-col gap-8 no-print h-full overflow-y-auto">
                <div>
                    <div class="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
                        <div class="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20">${this.state.user.name.charAt(0).toUpperCase()}</div>
                        <div>
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">${isAppAdmin ? 'Admin' : 'Partner'} Account</p>
                            <p class="text-sm font-black text-slate-900 truncate max-w-[120px]">${this.state.user.name}</p>
                        </div>
                    </div>

                    ${isAppAdmin ? `
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-4">Main Menu</p>
                    <nav class="flex flex-col gap-1.5 mb-10">
                        <button onclick="app.renderAdmin(document.getElementById('view-container'))" class="sidebar-link w-full text-left ${active === 'admin' ? 'active' : ''}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                            Dashboard
                        </button>
                        <button onclick="app.renderAdminInventory(document.getElementById('view-container'))" class="sidebar-link w-full text-left ${active === 'inventory' ? 'active' : ''}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                            Inventory
                        </button>
                        <button onclick="app.renderAdminUsers(document.getElementById('view-container'))" class="sidebar-link w-full text-left ${active === 'partners' ? 'active' : ''}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            Partners
                        </button>
                    </nav>
                    ` : ''}

                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-4">Workspace</p>
                    <nav class="flex flex-col gap-1.5">
                        <a href="/dashboard" data-link class="sidebar-link ${active === 'dashboard' ? 'active' : ''}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                            Dashboard
                        </a>
                        <a href="/catalog" data-link class="sidebar-link ${active === 'catalog' ? 'active' : ''}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                            Products
                        </a>
                        <a href="/quotations" data-link class="sidebar-link ${active === 'quotations' ? 'active' : ''}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            My Quotes
                        </a>
                        <a href="/invoices" data-link class="sidebar-link ${active === 'invoices' ? 'active' : ''}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                            Invoices
                        </a>
                    </nav>
                </div>

                <div class="mt-auto">
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-4">Account Management</p>
                    <nav class="flex flex-col gap-1.5">
                        ${isAppAdmin ? '' : `
                        <button onclick="app.renderMyPartsList(document.getElementById('view-container'))" class="sidebar-link w-full text-left">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg> My Parts List
                        </button>
                        `}
                        <button onclick="app.renderSystemSettings()" class="sidebar-link w-full text-left">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
                            System Settings
                        </button>
                        <a href="/logout" data-link class="sidebar-link text-rose-500 hover:bg-rose-50">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            Log Out
                        </a>
                    </nav>
                </div>
            </aside>
        `;
    },

    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icon = type === 'error'
            ? `<svg style="width:16px;height:16px;color:#ef4444;flex-shrink:0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
            : `<svg style="width:16px;height:16px;color:#10b981;flex-shrink:0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
        toast.innerHTML = `${icon}<span>${message}</span><button onclick="this.parentElement.remove()" style="margin-left:auto;color:#64748b;background:none;border:none;cursor:pointer;font-size:16px">✕</button>`;
        container.appendChild(toast);
        setTimeout(() => { 
            toast.style.opacity='0'; 
            toast.style.transform='translateX(20px)'; 
            toast.style.transition='all 0.3s ease'; 
            setTimeout(()=>toast.remove(), 300); 
        }, 4000);
    },

    async renderSystemSettings() {
        if (!this.state.user || this.state.user.role !== 'admin') {
            this.showToast('Access restricted to administrators', 'error');
            return;
        }
        const container = document.getElementById('view-container');
        container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>`;
        
        try {
            const res = await fetch(this.api('api/admin_settings.php'));
            const settings = await res.json();
            
            container.innerHTML = `
                <div class="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
                    <div>
                        <h2 class="text-4xl font-black tracking-tight text-slate-900">System <span class="text-blue-600">Core</span></h2>
                        <p class="text-slate-500 font-medium mt-2">Global configuration for the PARTSPRO ecosystem.</p>
                    </div>

                    <div class="bg-white rounded-3xl border border-slate-200 p-10 space-y-8 shadow-xl shadow-blue-900/5">
                        <form id="settings-form" class="space-y-8">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Platform Name</label>
                                    <input type="text" name="site_name" value="${settings.site_name || ''}" class="input-field font-bold">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Site Logo URL</label>
                                    <input type="text" name="site_logo" value="${settings.site_logo || ''}" class="input-field font-bold" placeholder="Leave empty for default SVG">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Currency Symbol</label>
                                    <input type="text" name="currency" value="${settings.currency || ''}" class="input-field font-bold">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Tax Percentage (%)</label>
                                    <input type="number" name="tax_percent" value="${settings.tax_percent || ''}" class="input-field font-bold">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Support Email</label>
                                    <input type="email" name="contact_email" value="${settings.contact_email || ''}" class="input-field font-bold">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Contact Phone</label>
                                    <input type="text" name="contact_phone" value="${settings.contact_phone || ''}" class="input-field font-bold">
                                </div>
                                <div class="space-y-2 md:col-span-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Office Address</label>
                                    <textarea name="contact_address" class="input-field font-bold h-24 py-4">${settings.contact_address || ''}</textarea>
                                </div>
                            </div>

                            <div class="divider"></div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="space-y-2 md:col-span-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Hero Title (Landing Page)</label>
                                    <input type="text" name="hero_title" value="${settings.hero_title || ''}" class="input-field font-bold">
                                </div>
                                <div class="space-y-2 md:col-span-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Hero Subtitle</label>
                                    <textarea name="hero_subtitle" class="input-field font-bold h-24 py-4">${settings.hero_subtitle || ''}</textarea>
                                </div>
                                <div class="space-y-2 md:col-span-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Hero Image URL</label>
                                    <input type="text" name="hero_image" value="${settings.hero_image || ''}" class="input-field font-bold">
                                </div>
                            </div>
                            
                            <div class="pt-6 border-t border-slate-100 flex justify-end gap-4">
                                <button type="button" onclick="app.renderAdmin(document.getElementById('view-container'))" class="px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all">Cancel</button>
                                <button type="submit" class="px-8 py-4 rounded-2xl bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:scale-[1.02] transition-all">Save Configuration</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            
            document.getElementById('settings-form').onsubmit = async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                
                const updateRes = await fetch(this.api('api/admin_settings.php'), {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await updateRes.json();
                if (result.success) {
                    this.showToast('System configuration synchronized successfully.');
                    await this.loadSettings();
                    this.renderAdmin(container);
                }
            };
        } catch (e) {
            container.innerHTML = `<div class="bg-rose-50 p-20 text-center text-rose-500 font-bold rounded-3xl">Failed to load system settings.</div>`;
        }
    },

    printAdminReport() {
        const stats = {
            quotes: document.getElementById('stat-active-quotations')?.textContent || '--',
            partners: document.getElementById('stat-total-partners')?.textContent || '--',
            skus: document.getElementById('stat-total-skus')?.textContent || '--',
            revenue: document.getElementById('stat-revenue')?.textContent || '₹0'
        };

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>PARTSPRO - Executive Report</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
                        body { font-family: 'Outfit', sans-serif; padding: 40px; color: #1e293b; background: #f8fafc; }
                        .header { border-bottom: 3px solid #0056B3; padding-bottom: 20px; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
                        .header h1 { font-weight: 900; color: #0056B3; margin: 0 0 5px 0; font-size: 28px; }
                        .header p { margin: 0; font-size: 14px; color: #64748b; font-weight: 700; }
                        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
                        .stat-item { padding: 25px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
                        .stat-label { font-size: 11px; font-weight: 900; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; }
                        .stat-value { font-size: 28px; font-weight: 900; margin-top: 10px; color: #0f172a; }
                        .footer { margin-top: 60px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; font-weight: 700; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div>
                            <h1>PARTSPRO</h1>
                            <p>Executive Inventory & Revenue Report</p>
                        </div>
                        <p style="font-size:11px; color:#94a3b8;">Generated on: ${new Date().toLocaleString()}</p>
                    </div>
                    <div class="stats-grid">
                        <div class="stat-item"><div class="stat-label">Active Quotations</div><div class="stat-value">${stats.quotes}</div></div>
                        <div class="stat-item"><div class="stat-label">Total Partners</div><div class="stat-value">${stats.partners}</div></div>
                        <div class="stat-item"><div class="stat-label">Inventory SKUs</div><div class="stat-value">${stats.skus}</div></div>
                        <div class="stat-item"><div class="stat-label">Total Revenue</div><div class="stat-value">${stats.revenue}</div></div>
                    </div>
                    <div class="footer">
                        &copy; 2026 PARTSPRO B2B Division. Confidential Internal Document.
                    </div>
                    <script>window.print(); setTimeout(() => window.close(), 1000);</script>
                </body>
            </html>
        `);
        printWindow.document.close();
    },

    animatePageEntry() {
        const container = document.getElementById('view-container');
        if (!container) return;
        container.style.opacity = '0';
        container.style.transform = 'translateY(16px)';
        container.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            });
        });
    }
};

app.init();
window.app = app;
