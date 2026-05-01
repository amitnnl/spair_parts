export function renderSupport(container, app) {
    const contactInfo = {
        email: app.state.settings.contact_email || 'support@partspro.in',
        phone: app.state.settings.contact_phone || '+91 70277 51544',
        address: app.state.settings.contact_address || 'Phase 2, Industrial Estate, New Delhi, IN 110020'
    };

    container.innerHTML = `
        <div class="animate-fade-in min-h-screen bg-slate-50">
            <!-- Header -->
            <section class="bg-white border-b border-slate-100 py-24">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div class="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">Connect with us</div>
                    <h2 class="text-6xl font-black text-slate-900 tracking-tight mb-6">${app.state.settings.support_title || 'Expert Support <span class="text-primary">Center</span>'}</h2>
                    <p class="text-slate-500 font-bold text-lg max-w-2xl mx-auto">${app.state.settings.support_subtitle || 'Need technical assistance with a part? Our specialist engineers are available 24/7 to help your business stay operational.'}</p>
                </div>
            </section>

            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-12">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Contact Cards -->
                    <div class="space-y-8">
                        <div class="bg-white p-10 rounded-[40px] shadow-premium border border-slate-100 flex flex-col items-center text-center group hover:bg-primary transition-all duration-500">
                            <div class="w-16 h-16 rounded-3xl bg-blue-50 text-primary flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:text-white transition-colors shadow-inner">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </div>
                            <h4 class="text-lg font-black text-slate-900 group-hover:text-white mb-2">Email Support</h4>
                            <p class="text-slate-500 group-hover:text-white/80 font-bold text-sm">${contactInfo.email}</p>
                        </div>

                        <div class="bg-white p-10 rounded-[40px] shadow-premium border border-slate-100 flex flex-col items-center text-center group hover:bg-emerald-600 transition-all duration-500">
                            <div class="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:text-white transition-colors shadow-inner">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </div>
                            <h4 class="text-lg font-black text-slate-900 group-hover:text-white mb-2">Technical Hotline</h4>
                            <p class="text-slate-500 group-hover:text-white/80 font-bold text-sm">${contactInfo.phone}</p>
                        </div>

                        <div class="bg-white p-10 rounded-[40px] shadow-premium border border-slate-100 flex flex-col items-center text-center group hover:bg-slate-900 transition-all duration-500">
                            <div class="w-16 h-16 rounded-3xl bg-slate-50 text-slate-900 flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:text-white transition-colors shadow-inner">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </div>
                            <h4 class="text-lg font-black text-slate-900 group-hover:text-white mb-2">Corporate Office</h4>
                            <p class="text-slate-500 group-hover:text-white/80 font-bold text-sm px-4">${contactInfo.address}</p>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div class="lg:col-span-2 bg-white rounded-[48px] p-16 shadow-premium border border-slate-100">
                        <div class="mb-12">
                            <h3 class="text-3xl font-black text-slate-900 tracking-tight">Send a Technical Inquiry</h3>
                            <p class="text-slate-500 font-bold mt-2">Expect a response from our engineering team within 2 business hours.</p>
                        </div>
                        <form id="support-form" class="space-y-8">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="space-y-3">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                                    <input type="text" required class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-primary transition-all" placeholder="Enter your name">
                                </div>
                                <div class="space-y-3">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Work Email</label>
                                    <input type="email" required class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-primary transition-all" placeholder="Enter work email">
                                </div>
                                <div class="space-y-3">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Inquiry Subject</label>
                                    <select class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-primary transition-all">
                                        <option>Part Fitment Assistance</option>
                                        <option>Bulk Order Inquiry</option>
                                        <option>Technical Specification Request</option>
                                        <option>Warranty & Returns</option>
                                    </select>
                                </div>
                                <div class="space-y-3">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Part No. / Model (Optional)</label>
                                    <input type="text" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-primary transition-all" placeholder="e.g. GWS 600">
                                </div>
                            </div>
                            <div class="space-y-3">
                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Detailed Message</label>
                                <textarea required class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-primary transition-all h-40 resize-none" placeholder="Describe your technical requirement..."></textarea>
                            </div>
                            <button type="submit" class="w-full py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/30 hover:bg-primary-dark hover:-translate-y-1 transition-all">${app.state.settings.support_form_cta || 'Submit Technical Ticket'}</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    `;

    document.getElementById('support-form').onsubmit = (e) => {
        e.preventDefault();
        app.showToast('Support ticket submitted successfully. Reference: #PP-' + Math.floor(Math.random()*100000));
        e.target.reset();
    };
}
