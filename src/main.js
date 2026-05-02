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

    renderDashboard(container) { return viewDashboard(container, this); },
    renderSupport(container) { return renderSupport(container, this); },
    renderHome(container) { return renderHome(container, this); },
    renderShipping(container) { return viewShipping.render(container); },
    renderWarranty(container) { return viewWarranty.render(container); },
    renderMyPartsList(container) { return viewMyPartsList(container, this); },

    renderLogin(container) { return renderLogin(container, this); },
    renderRegister(container) { return renderRegister(container, this); },

    renderCart(container) { return renderCart(container, this); },

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

    applySettings() {
        const s = this.state.settings;
        if (!s) return;

        // Update Site Name
        if (s.site_name) {
            document.querySelectorAll('.logo-text').forEach(el => el.textContent = s.site_name);
            document.title = s.site_name;
        }

        // Update Site Logo
        if (s.site_logo) {
            document.querySelectorAll('.logo-container').forEach(el => {
                el.innerHTML = `<img src="${this.api(s.site_logo)}" class="w-full h-full object-contain p-1">`;
                el.classList.remove('bg-primary'); // Remove default background if it's a full logo
            });
        }

        // Update Footer Info
        if (s.footer_desc) {
            const el = document.getElementById('footer-desc');
            if (el) el.textContent = s.footer_desc;
        }
        if (s.contact_address) {
            const el = document.getElementById('footer-address');
            if (el) el.innerHTML = s.contact_address.replace(/\n/g, '<br>');
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
            widget.innerHTML = `
                <div class="whatsapp-tooltip">
                    Order via WhatsApp
                </div>
                <div class="whatsapp-btn" onclick="window.open('https://wa.me/${cleanNum}?text=Hello! I am interested in ordering spare parts.', '_blank')">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.116.554 4.183 1.604 5.999L0 24l6.162-1.616a11.803 11.803 0 005.883 1.554h.005c6.634 0 12.032-5.391 12.035-12.029a11.785 11.785 0 00-3.51-8.514z"/></svg>
                </div>
            `;
        } else {
            console.warn('WhatsApp Widget skipped: whatsapp_number is missing in settings.');
        }
    },

    updateAuthUI() {
        const authContainer = document.getElementById('auth-nav');
        if (this.state.user) {
            localStorage.setItem('user', JSON.stringify(this.state.user));
            const isAdmin = this.state.user.role && this.state.user.role.toLowerCase() === 'admin';
            
            authContainer.innerHTML = `
                <div class="flex items-center gap-6">
                    <div class="hidden md:block text-right">
                        <p class="text-xs font-black text-slate-900">${this.state.user.name}</p>
                    </div>
                    <div class="flex gap-2">
                        ${isAdmin ? `
                            <a href="/admin" data-link class="px-6 py-3.5 rounded-2xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-2">
                                <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>
                                Admin Panel
                            </a>
                        ` : `
                            <a href="/dashboard" data-link class="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-slate-900/20 group">
                                <svg class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </a>
                        `}
                        <a href="/logout" data-link class="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all border border-rose-100 group" title="Logout">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        </a>
                    </div>
                </div>
            `;
        } else {
            localStorage.removeItem('user');
            authContainer.innerHTML = `
                <a href="/login" data-link class="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/20">Partner Login</a>
            `;
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
        } else if (path === '/admin') {
            this.renderAdmin(container);
        } else if (path === '/admin/inventory') {
            this.renderAdminInventory(container);
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

        await this.loadSettings();
        this.updateAuthUI();
        this.handleRouting();

        document.addEventListener('click', e => {
            const link = e.target.closest('[data-link]');
            if (link) {
                e.preventDefault();
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
