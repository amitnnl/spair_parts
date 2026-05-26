import { getSidebar } from './components/sidebar.js';
import { renderCatalog as viewCatalog } from './views/catalog.js';
import { 
    renderQuotations as viewQuotations, 
    viewQuotationDetails as viewQuotationInfo, 
    approveQuotation as confirmQuotation 
} from './views/quotations.js';
import { 
    renderInvoices as viewInvoices, 
    renderInvoiceDocument as viewInvoiceDoc 
} from './views/invoices.js';
import { 
    renderAdmin as viewAdmin, 
    loadAdminStats as fetchAdminStats, 
    loadAdminQuotations as fetchAdminQuotations, 
    loadAdminInvoices as fetchAdminInvoices,
    renderDispatchModal as viewDispatchModal,
    updateOrderStatus as patchOrderStatus,
    renderAdminInventory as viewAdminInventory, 
    filterInventory as searchInventory, 
    renderAdminUsers as viewAdminUsers, 
    updateUser as patchUser, 
    renderProcessQuotation as viewProcessQuotation,
    applyDiscountToItem as discountItem,
    applyDiscountToAll as discountAll,
    generateInvoice as createInvoice,
    renderSystemSettings as viewSystemSettings,
    printAdminReport as printReport,
    renderImportModal as viewImportModal,
    renderAddProductForm as viewAddProductForm,
    renderEditProductForm as viewEditProductForm,
    deleteProduct as removeProduct
} from './views/admin.js';
import {
    renderStockLogs as viewStockLogs,
    renderStockAdjustModal as viewStockAdjustModal,
    submitStockAdjustment as postStockAdjustment
} from './views/stock_logs.js';
import {
    renderReports as viewReports,
    exportStockReport as printStockReport,
    exportStockCSV as downloadStockCSV
} from './views/reports.js';
import { renderStaffPanel as viewStaffPanel } from './views/staff.js';
import { 
    renderDashboard as viewDashboard, 
    renderBulkOrderModal as viewBulkOrderModal, 
    renderMyPartsList as viewMyPartsList, 
    loadDashboardStats as fetchDashboardStats 
} from './views/dashboard.js';
import { renderLogin, renderRegister } from './views/auth.js';
import { renderCart } from './views/cart.js';
import { renderBrands } from './views/brands.js';
import { renderCategories } from './views/categories.js';
import { renderSupport } from './views/support.js';
import { renderHome } from './views/home.js';
import { renderProfile as viewProfile } from './views/profile.js';
import { state } from './state.js';
import { setHTML } from './api.js';
import viewShipping from './views/shipping.js';
import viewWarranty from './views/warranty.js';

// Auto-detect whether running locally or on live cPanel server.
// LOCAL:  http://localhost/spairparts  => basePath = '/spairparts'
// LIVE:   https://torvotools.com/      => basePath = ''
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const BASE_PATH = isLocal ? '/spairparts' : '';

const api = (endpoint) => {
    // If endpoint is missing, return an empty string or a default
    if (!endpoint) return '';
    // If it's already an absolute URL, return it as-is
    if (endpoint.startsWith('http')) return endpoint;
    // Build URL relative to the detected base path
    return BASE_PATH + (endpoint.startsWith('/') ? '' : '/') + endpoint;
};

const escapeHTML = (str) => {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

const app = {
    state: {
        user: JSON.parse(localStorage.getItem('user')),
        cart: JSON.parse(localStorage.getItem('cart')) || [],
        settings: {}
    },
    basePath: BASE_PATH,
    
    api: api,

    getSidebar(active) { return getSidebar(active, this); },

    renderCatalog(container) { return viewCatalog(container, this); },

    renderQuotations(container) { return viewQuotations(container, this); },
    viewQuotationDetails(id) { return viewQuotationInfo(id, this); },
    approveQuotation(id) { return confirmQuotation(id, this); },

    renderInvoices(container) { return viewInvoices(container, this); },
    renderInvoiceDocument(id) { return viewInvoiceDoc(id, this); },

    renderAdmin(container) { return viewAdmin(container, this); },
    loadAdminStats() { return fetchAdminStats(this); },
    loadAdminQuotations() { return fetchAdminQuotations(this); },
    loadAdminInvoices() { return fetchAdminInvoices(this); },
    renderDispatchModal(id, status, tracking) { return viewDispatchModal(id, status, tracking, this); },
    updateOrderStatus(id, status) { return patchOrderStatus(id, status, this); },
    renderAdminInventory(container) { return viewAdminInventory(container, this); },
    filterInventory() { return searchInventory(); },
    renderAdminUsers(container) { return viewAdminUsers(container, this); },
    updateUser(id, field, value) { return patchUser(id, field, value, this); },
    renderProcessQuotation(id) { return viewProcessQuotation(id, this); },
    applyDiscountToItem(btn, discount) { return discountItem(btn, discount); },
    applyDiscountToAll(discount) { return discountAll(discount); },
    generateInvoice(id) { return createInvoice(id, this); },
    renderSystemSettings() { return viewSystemSettings(document.getElementById('view-container'), this); },
    printAdminReport() { return printReport(); },
    renderImportModal() { return viewImportModal(this); },
    renderAddProductForm() { return viewAddProductForm(this); },
    renderEditProductForm(id) { return viewEditProductForm(id, this); },
    deleteProduct(id) { return removeProduct(id, this); },
    renderStockLogs(container) { return viewStockLogs(container, this); },
    renderStockAdjustModal(partId) { return viewStockAdjustModal(partId || null, this); },
    submitStockAdjustment() { return postStockAdjustment(this); },
    renderReports(container) { return viewReports(container, this); },
    exportStockReport() { return printStockReport(); },
    exportStockCSV() { return downloadStockCSV(); },
    renderStaffPanel(container) { return viewStaffPanel(container, this); },

    renderDashboard(container) { return viewDashboard(container, this); },
    renderProfile(container) { return viewProfile(container, this); },
    loadDashboardStats() { return fetchDashboardStats(this); },
    renderBulkOrderModal() { return viewBulkOrderModal(this); },
    renderSupport(container) { return renderSupport(container, this); },
    renderHome(container) { return renderHome(container, this); },
    renderCategories(container) { return renderCategories(container, this); },
    renderBrands(container) { return renderBrands(container, this); },
    renderShipping(container) { return viewShipping.render(container); },
    renderWarranty(container) { return viewWarranty.render(container); },
    renderMyPartsList(container) { return viewMyPartsList(container, this); },

    renderLogin(container) { return renderLogin(container, this); },
    renderRegister(container) { return renderRegister(container, this); },

    renderCart(container) { return renderCart(container, this); },

    updateCartBadge() {
        const badges = [
            document.getElementById('cart-badge'),
            document.getElementById('mobile-cart-badge')
        ];
        
        const count = this.state.cart.length;
        
        badges.forEach(badge => {
            if (!badge) return;
            if (count > 0) {
                badge.textContent = count;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        });
    },

    addToCart(productOrId) {
        let product = productOrId;
        if (typeof productOrId === 'number' || typeof productOrId === 'string') {
            product = state.products.find(p => p.id == productOrId);
        }
        
        if (!product) {
            console.error('Product not found for cart', productOrId);
            return;
        }

        const exists = this.state.cart.find(item => item.id === product.id);
        if (exists) {
            exists.quantity = (parseInt(exists.quantity) || 0) + 1;
        } else {
            this.state.cart.push({
                id: product.id,
                part_name: product.part_name,
                brand: product.brand || product.brand_name,
                machine_model: product.machine_model || product.model_name,
                quantity: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
        this.updateCartBadge();
        this.showToast('Item added to quotation cart');
    },

    updateCartQty(id, qty) {
        const item = this.state.cart.find(i => i.id === id);
        if (item) {
            item.quantity = parseInt(qty) || 1;
            localStorage.setItem('cart', JSON.stringify(this.state.cart));
            this.updateCartBadge();
        }
    },

    removeFromCart(id) {
        this.state.cart = this.state.cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
        this.updateCartBadge();
        // Re-render cart view if we are on it
        if (window.location.pathname.endsWith('/cart')) {
            this.renderCart(document.getElementById('view-container'));
        }
    },

    async submitQuotation() {
        if (!this.state.user) {
            this.showToast('Please login to submit quotation', 'error');
            history.pushState(null, null, this.basePath + '/login');
            this.handleRouting();
            return;
        }

        const btn = document.querySelector('button[onclick="app.submitQuotation()"]');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<span class="animate-pulse">Submitting Request...</span>';
        }

        try {
            const res = await fetch(this.api('api/quotations.php'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'create',
                    items: this.state.cart.map(i => ({
                        part_id: i.id,
                        quantity: i.quantity
                    }))
                })
            });
            const result = await res.json();
            if (result.success) {
                this.showToast('Quotation request submitted successfully!');
                this.state.cart = [];
                localStorage.removeItem('cart');
                this.updateCartBadge();
                history.pushState(null, null, this.basePath + '/quotations');
                this.handleRouting();
            } else {
                this.showToast(result.error || 'Submission failed', 'error');
            }
        } catch (e) {
            this.showToast('Network error, please try again', 'error');
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = 'Submit RFQ Request';
            }
        }
    },

    async editQuotation(id) {
        if (!confirm('Move items back to cart for editing? (Current pending request will be removed)')) return;
        try {
            const res = await fetch(this.api(`api/quotations.php?id=${id}`));
            const data = await res.json();
            if (data.items) {
                this.state.cart = data.items.map(i => ({
                    id: i.part_id,
                    part_name: i.part_name,
                    brand: i.brand,
                    machine_model: i.machine_model,
                    quantity: i.quantity
                }));
                localStorage.setItem('cart', JSON.stringify(this.state.cart));
                this.updateCartBadge();
                await fetch(this.api('api/quotations.php'), {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: id })
                });
                this.showToast('Items moved to cart');
                history.pushState(null, null, this.basePath + '/cart');
                this.handleRouting();
            }
        } catch (e) { this.showToast('Error', 'error'); }
    },

    getStatusClass(status) {
        switch(status) {
            case 'pending': return 'bg-amber-50 text-amber-600 border border-amber-200';
            case 'priced': return 'bg-blue-50 text-blue-600 border border-blue-200';
            case 'approved': return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
            case 'completed': return 'bg-slate-50 text-slate-500 border border-slate-200';
            default: return 'bg-slate-50 text-slate-400 border border-slate-100';
        }
    },

    cleanImageUrl(url, name) {
        if (!url || url === 'null') return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f1f5f9&color=64748b&bold=true`;
        if (url.startsWith('http')) return url;
        // The path in DB now includes 'uploads/', so we just pass it to this.api()
        return this.api(url);
    },

    async loadSettings() {
        try {
            const res = await fetch(this.api('api/admin_settings.php'));
            this.state.settings = await res.json();
            this.applySettings();
        } catch (e) {
            console.error('Failed to load settings', e);
        }
    },

    getLogoHTML(settings) {
        if (settings.site_logo) {
            return '<img src="' + escapeHTML(this.api(settings.site_logo)) + '" class="h-10 w-auto object-contain p-0.5" alt="' + escapeHTML(settings.site_name || 'Logo') + '">';
        }
        
        const siteName = settings.site_name || 'TORVO TOOLS';
        const uppercaseName = siteName.toUpperCase();
        
        if (uppercaseName.includes('TORVO')) {
            const rest = uppercaseName.replace('TORVO', '').trim();
            const restHTML = rest ? ' <span class="text-slate-800">' + escapeHTML(rest) + '</span>' : '';
            return `
                <div class="flex items-center select-none font-sans">
                    <span class="text-3xl font-extrabold text-[#ed1c24] tracking-tight font-poppins italic">TORV</span>
                    <div class="w-8 h-8 ml-0.5 flex items-center justify-center animate-[spin_10s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite]">
                        <svg viewBox="0 0 100 100" fill="none" class="w-full h-full text-[#ed1c24] drop-shadow-[0_2px_4px_rgba(237,28,36,0.3)]">
                            <circle cx="50" cy="50" r="22" stroke="currentColor" stroke-width="12" fill="none"/>
                            <path d="M50 5 L50 20" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                            <path d="M50 80 L50 95" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                            <path d="M5 50 L20 50" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                            <path d="M80 50 L95 50" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                            <path d="M18 18 L29 29" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                            <path d="M71 71 L82 82" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                            <path d="M18 82 L29 71" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                            <path d="M71 29 L82 18" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                        </svg>
                    </div>
                    ` + (restHTML ? '<span class="text-3xl font-extrabold tracking-tight font-poppins uppercase ml-2 text-slate-800">' + restHTML + '</span>' : '') + `
                </div>
            `;
        } else {
            const words = siteName.split(' ');
            if (words.length > 1) {
                const last = words.pop();
                return '<span class="text-3xl font-extrabold tracking-tight font-poppins uppercase text-slate-900">' + escapeHTML(words.join(' ')) + ' <span class="text-[#ed1c24]">' + escapeHTML(last) + '</span></span>';
            }
            return '<span class="text-3xl font-extrabold tracking-tight font-poppins uppercase text-[#ed1c24]">' + escapeHTML(siteName) + '</span>';
        }
    },

    applySettings() {
        const s = this.state.settings;
        if (!s) return;

        // Dynamic branding update in headers/drawers
        const logoHTML = this.getLogoHTML(s);
        document.querySelectorAll('.logo-container').forEach(el => {
            setHTML(el, logoHTML);
        });

        if (s.site_name) {
            document.title = s.site_name;
        }

        // Update Footer branding dynamically
        const footerSiteName = document.getElementById('footer-site-name');
        if (footerSiteName) {
            if (s.site_logo) {
                setHTML(footerSiteName, '<img src="' + escapeHTML(this.api(s.site_logo)) + '" class="h-10 w-auto object-contain p-0.5">');
            } else {
                const words = (s.site_name || 'TORVO TOOLS').split(' ');
                if (words.length > 1) {
                    const lastWord = words.pop();
                    setHTML(footerSiteName, escapeHTML(words.join(' ')) + ' <span class="text-[#ed1c24]">' + escapeHTML(lastWord) + '</span>');
                } else {
                    setHTML(footerSiteName, '<span class="text-[#ed1c24]">' + escapeHTML(s.site_name || 'TORVO') + '</span>');
                }
            }
        }

        // Update Footer Info
        if (s.footer_desc) {
            const el = document.getElementById('footer-desc');
            if (el) el.textContent = s.footer_desc;
        }
        if (s.contact_address) {
            const el = document.getElementById('footer-address');
            if (el) setHTML(el, escapeHTML(s.contact_address).replace(/\n/g, '<br>'));
        }
        if (s.contact_email) {
            const el = document.getElementById('footer-email');
            if (el) {
                el.textContent = s.contact_email;
                el.href = `mailto:${s.contact_email}`;
            }
        }

        // WhatsApp Widget Injection
        if (s.whatsapp_number) {
            console.log('Initializing WhatsApp Widget with:', s.whatsapp_number);
            let widget = document.getElementById('whatsapp-widget');
            if (!widget) {
                widget = document.createElement('div');
                widget.id = 'whatsapp-widget';
                widget.className = 'whatsapp-widget no-print';
                document.body.appendChild(widget);
            }
            const cleanNum = s.whatsapp_number.replace(/\D/g, '');
            setHTML(widget, `
                <div class="whatsapp-tooltip">
                    Order via WhatsApp
                </div>
                <div class="whatsapp-btn" onclick="window.open('https://wa.me/` + cleanNum + `?text=Hello! I am interested in ordering spare parts.', '_blank')">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.116.554 4.183 1.604 5.999L0 24l6.162-1.616a11.803 11.803 0 005.883 1.554h.005c6.634 0 12.032-5.391 12.035-12.029a11.785 11.785 0 00-3.51-8.514z"/></svg>
                </div>
            `);
        } else {
            console.warn('WhatsApp Widget skipped: whatsapp_number is missing in settings.');
        }
    },

    updateAuthUI() {
        const authContainer = document.getElementById('auth-nav');
        const cartBtn = document.getElementById('header-cart-btn');
        const mobileCartBtn = document.getElementById('mobile-cart-btn');
        if (this.state.user) {
            if (cartBtn) cartBtn.classList.remove('hidden');
            if (mobileCartBtn) mobileCartBtn.classList.remove('hidden');
            localStorage.setItem('user', JSON.stringify(this.state.user));
            const isAdmin = this.state.user.role && this.state.user.role.toLowerCase() === 'admin';
            
            setHTML(authContainer, `
                <div class="flex items-center gap-4">
                    <div class="hidden lg:block text-right">
                        <p class="text-xs font-bold text-slate-800 uppercase tracking-widest">` + escapeHTML(this.state.user.name) + `</p>
                    </div>
                    <div class="flex gap-2">
                        ` + (isAdmin ? `
                            <a href="/admin" data-link class="px-5 py-2.5 rounded-none bg-[#ed1c24] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#111111] transition-all shadow-sm flex items-center gap-1.5">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>
                                Admin
                            </a>
                        ` : this.state.user?.role?.toLowerCase() === 'staff' ? `
                            <a href="/staff" data-link class="px-5 py-2.5 rounded-none bg-amber-600 text-white text-[11px] font-bold uppercase tracking-wider hover:bg-amber-700 transition-all shadow-sm flex items-center gap-1.5">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
                                Staff
                            </a>
                        ` : `
                            <a href="/dashboard" data-link class="w-10 h-10 rounded-none bg-[#ed1c24] text-white flex items-center justify-center hover:bg-[#111111] transition-all shadow-sm group">
                                <svg class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </a>
                        `) + `
                        <a href="/logout" data-link class="w-10 h-10 rounded-none bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all border border-rose-100 group" title="Logout">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        </a>
                    </div>
                </div>
            `);
        } else {
            if (cartBtn) cartBtn.classList.add('hidden');
            if (mobileCartBtn) mobileCartBtn.classList.add('hidden');
            localStorage.removeItem('user');
            setHTML(authContainer, `
                <a href="/login" data-link class="px-6 py-2.5 text-xs font-bold text-[#ed1c24] border border-[#ed1c24] hover:bg-[#ed1c24] hover:text-white rounded-none transition-all uppercase tracking-wider font-sans">Log In</a>
                <a href="/register" data-link class="px-6 py-2.5 text-xs font-bold text-white bg-[#ed1c24] hover:bg-[#111111] rounded-none transition-all uppercase tracking-wider shadow-sm ml-2 font-sans">Sign Up</a>
            `);
        }
    },

    handleRouting() {
        // Strip basePath prefix to get the logical route (e.g. '/brands')
        const raw = window.location.pathname;
        const path = (this.basePath ? raw.replace(this.basePath, '') : raw) || '/';
        const container = document.getElementById('view-container');
        
        if (path === '/') {
            renderHome(container, this);
        } else if (path === '/catalog') {
            this.renderCatalog(container);
        } else if (path === '/dashboard') {
            this.renderDashboard(container);
        } else if (path === '/profile') {
            this.renderProfile(container);
        } else if (path === '/admin') {
            this.renderAdmin(container);
        } else if (path === '/staff') {
            this.renderStaffPanel(container);
        } else if (path === '/admin/inventory') {
            this.renderAdminInventory(container);
        } else if (path === '/admin/stock-logs') {
            this.renderStockLogs(container);
        } else if (path === '/admin/reports') {
            this.renderReports(container);
        } else if (path === '/admin/partners') {
            this.renderAdminUsers(container);
        } else if (path === '/quotations') {
            this.renderQuotations(container);
        } else if (path === '/login') {
            this.renderLogin(container);
        } else if (path === '/register') {
            this.renderRegister(container);
        } else if (path === '/invoices') {
            this.renderInvoices(container);
        } else if (path === '/cart') {
            this.renderCart(container);
        } else if (path === '/brands') {
            renderBrands(container, this);
        } else if (path === '/categories') {
            renderCategories(container, this);
        } else if (path === '/support') {
            renderSupport(container, this);
        } else if (path === '/shipping') {
            this.renderShipping(container);
        } else if (path === '/warranty') {
            this.renderWarranty(container);
        } else if (path === '/logout') {
            fetch(this.api('api/auth.php'), { 
                method: 'POST', 
                body: JSON.stringify({ action: 'logout' }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            }).then(() => {
                this.state.user = null;
                localStorage.removeItem('user');
                this.updateAuthUI();
                history.pushState(null, null, this.basePath + '/');
                this.handleRouting();
            });
        } else {
            renderHome(container, this);
        }
        
        // Update nav active states
        document.querySelectorAll('.nav-link, .mobile-nav-item').forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === path);
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.animatePageEntry();
    },

    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        // Dynamic icon container
        const iconContainer = document.createElement('div');
        iconContainer.style.display = 'flex';
        iconContainer.style.alignItems = 'center';
        iconContainer.style.flexShrink = '0';
        iconContainer.innerHTML = type === 'error'
            ? `<svg style="width:16px;height:16px;color:#ef4444;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
            : `<svg style="width:16px;height:16px;color:#10b981;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
        toast.appendChild(iconContainer);

        // Safe message span
        const textSpan = document.createElement('span');
        textSpan.style.marginLeft = '8px';
        textSpan.textContent = message;
        toast.appendChild(textSpan);

        // Safe close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.marginLeft = 'auto';
        closeBtn.style.color = '#64748b';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.fontSize = '16px';
        closeBtn.onclick = () => toast.remove();
        toast.appendChild(closeBtn);

        container.appendChild(toast);
        setTimeout(() => { 
            toast.style.opacity = '0'; 
            toast.style.transform = 'translateX(20px)'; 
            toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease'; 
            setTimeout(() => toast.remove(), 300); 
        }, 4000);
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
    },

    async init() {
        // 1. Verify session with backend first
        try {
            const checkRes = await fetch(this.api('api/auth.php'), { 
                method: 'POST', 
                body: JSON.stringify({ action: 'check' }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            const checkData = await checkRes.json();
            if (checkData.logged_in) {
                this.state.user = checkData.user;
                localStorage.setItem('user', JSON.stringify(checkData.user));
            } else {
                this.state.user = null;
                localStorage.removeItem('user');
            }
        } catch (e) {
            console.error('Session check failed', e);
        }

        this.state.searchFilters = { brand: '', category: '', item: '', query: '' };

        await this.loadSettings();
        this.updateCartBadge();
        this.updateAuthUI();
        this.handleRouting();

        // Keydown Enter listener for search input
        document.addEventListener('keydown', e => {
            if (e.target && e.target.id === 'global-text-search' && e.key === 'Enter') {
                e.preventDefault();
                const brand = document.getElementById('global-brand-select')?.value || '';
                const category = document.getElementById('global-category-select')?.value || '';
                const item = document.getElementById('global-item-select')?.value || '';
                const query = document.getElementById('global-text-search')?.value || '';

                this.state.searchFilters = { brand, category, item, query };
                
                history.pushState(null, null, this.basePath + '/catalog');
                this.handleRouting();
            }
        });

        document.addEventListener('click', e => {
            // Hamburger mobile drawer toggle
            const menuToggle = e.target.closest('#mobile-menu-toggle');
            if (menuToggle) {
                const sidebar = document.getElementById('mobile-sidebar-menu');
                if (sidebar) {
                    sidebar.classList.remove('hidden');
                    setTimeout(() => {
                        sidebar.classList.remove('opacity-0');
                        sidebar.classList.add('opacity-100');
                        const innerDrawer = sidebar.querySelector('div');
                        if (innerDrawer) {
                            innerDrawer.classList.remove('-translate-x-full');
                            innerDrawer.classList.add('transform-none');
                        }
                    }, 50);
                }
                return;
            }

            const sidebar = document.getElementById('mobile-sidebar-menu');
            const menuClose = e.target.closest('#mobile-menu-close') || 
                              (sidebar && !sidebar.classList.contains('hidden') && !e.target.closest('#mobile-sidebar-menu > div') && e.target.closest('#mobile-sidebar-menu'));
            if (menuClose && sidebar) {
                sidebar.classList.remove('opacity-100');
                sidebar.classList.add('opacity-0');
                const innerDrawer = sidebar.querySelector('div');
                if (innerDrawer) {
                    innerDrawer.classList.remove('transform-none');
                    innerDrawer.classList.add('-translate-x-full');
                }
                setTimeout(() => {
                    sidebar.classList.add('hidden');
                }, 300);
                return;
            }

            // Global search trigger
            const searchBtn = e.target.closest('#global-search-btn');
            if (searchBtn) {
                e.preventDefault();
                const brand = document.getElementById('global-brand-select')?.value || '';
                const category = document.getElementById('global-category-select')?.value || '';
                const item = document.getElementById('global-item-select')?.value || '';
                const query = document.getElementById('global-text-search')?.value || '';

                this.state.searchFilters = { brand, category, item, query };
                
                history.pushState(null, null, this.basePath + '/catalog');
                this.handleRouting();
                return;
            }

            const searchToggle = e.target.closest('#search-toggle');
            if (searchToggle) {
                const searchContainer = document.getElementById('global-search-container');
                if (searchContainer) {
                    searchContainer.classList.toggle('hidden');
                    if (!searchContainer.classList.contains('hidden')) {
                        searchContainer.querySelector('input')?.focus();
                    }
                }
                return;
            }

            const link = e.target.closest('[data-link]');
            if (link) {
                e.preventDefault();
                // Auto-close mobile sidebar menu if it was open
                const sidebarMenu = document.getElementById('mobile-sidebar-menu');
                if (sidebarMenu && !sidebarMenu.classList.contains('hidden')) {
                    sidebarMenu.classList.remove('opacity-100');
                    sidebarMenu.classList.add('opacity-0');
                    const innerDrawer = sidebarMenu.querySelector('div');
                    if (innerDrawer) {
                        innerDrawer.classList.remove('transform-none');
                        innerDrawer.classList.add('-translate-x-full');
                    }
                    sidebarMenu.classList.add('hidden');
                }
                const href = link.getAttribute('href');
                history.pushState(null, null, this.basePath + href);
                this.handleRouting();
            }
        });

        window.addEventListener('popstate', () => this.handleRouting());
    }
};

app.init();
window.app = app;
