import { setHTML } from '../api.js';

export function renderTerms(container, app) {
    window.scrollTo(0, 0);
    
    setHTML(container, `
        <div class="animate-fade-in min-h-[calc(100vh-80px)] bg-slate-50 pb-24 relative overflow-hidden">
            <!-- Background Decorations -->
            <div class="absolute top-0 left-0 w-full h-80 bg-[#111111] -skew-y-3 origin-top-left z-0 shadow-2xl"></div>
            <div class="absolute top-[-100px] right-[-100px] w-96 h-96 bg-[#ed1c24]/20 rounded-none blur-[100px] z-0 pointer-events-none"></div>

            <!-- Header -->
            <section class="relative z-10 pt-20 pb-20">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div class="inline-block px-4 py-1.5 rounded-none bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-[0.4em] text-white/90 mb-6 backdrop-blur-md">Legal & Compliance</div>
                    <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 uppercase drop-shadow-md">Terms of Service</h2>
                    <p class="text-white/80 font-medium text-base max-w-2xl mx-auto leading-relaxed">Last Updated: May 2026. These terms govern your use of the Torvo Tools B2B purchasing portal.</p>
                </div>
            </section>

            <!-- Content -->
            <section class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                <div class="bg-white/95 backdrop-blur-2xl rounded-none p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    
                    <div class="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight prose-a:text-[#ed1c24] prose-a:no-underline hover:prose-a:underline prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
                        
                        <h3 class="text-2xl mt-0 mb-4 border-b border-slate-100 pb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-none bg-[#ed1c24]/10 flex items-center justify-center text-[#ed1c24]">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </span>
                            1. Agreement to Terms
                        </h3>
                        <p>By accessing or using the Torvo Tools B2B Portal, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our procurement services.</p>

                        <h3 class="text-2xl mt-10 mb-4 border-b border-slate-100 pb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-none bg-[#ed1c24]/10 flex items-center justify-center text-[#ed1c24]">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </span>
                            2. Corporate Accounts
                        </h3>
                        <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
                        <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>

                        <h3 class="text-2xl mt-10 mb-4 border-b border-slate-100 pb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-none bg-[#ed1c24]/10 flex items-center justify-center text-[#ed1c24]">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            </span>
                            3. Orders & Pricing
                        </h3>
                        <p>All orders are subject to acceptance and availability. Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice.</p>
                        <p>In the event that a product is listed at an incorrect price, we reserve the right to refuse or cancel any orders placed for the product listed at the incorrect price.</p>

                        <h3 class="text-2xl mt-10 mb-4 border-b border-slate-100 pb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-none bg-[#ed1c24]/10 flex items-center justify-center text-[#ed1c24]">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            </span>
                            4. Warranty & Returns
                        </h3>
                        <p>We warrant that all spare parts are genuine and free from defects in material and workmanship under normal use. Defective parts must be reported within 14 days of receipt for an authorized return.</p>

                        <h3 class="text-2xl mt-10 mb-4 border-b border-slate-100 pb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-none bg-[#ed1c24]/10 flex items-center justify-center text-[#ed1c24]">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            </span>
                            5. Limitation of Liability
                        </h3>
                        <p>In no event shall Torvo Tools Private Limited, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

                    </div>
                </div>
            </section>
        </div>
    `);
}
