import { escapeHTML, setHTML } from '../api.js';

export function renderSupport(container, app) {
    const contactInfo = {
        email: app.state.settings.contact_email || 'support@torvotools.com',
        phone: app.state.settings.contact_phone || '+91 70277 51544',
        address: app.state.settings.contact_address || 'Phase 2, Industrial Estate, New Delhi, IN 110020'
    };

    const supportTitle = app.state.settings.support_title
        ? escapeHTML(app.state.settings.support_title)
        : 'Expert Support <span class="text-[#ed1c24]">Center</span>';

    const supportSubtitle = app.state.settings.support_subtitle
        ? escapeHTML(app.state.settings.support_subtitle)
        : 'Need technical assistance with a part? Our specialist engineers are available 24/7 to help your business stay operational.';

    const supportCTA = app.state.settings.support_form_cta
        ? escapeHTML(app.state.settings.support_form_cta)
        : 'Submit Technical Ticket';

    setHTML(container, `
        <div class="animate-fade-in min-h-[calc(100vh-80px)] bg-slate-50 pb-20 relative overflow-hidden">
            <!-- Background Decorations -->
            <div class="absolute top-0 left-0 w-full h-80 bg-[#111111] -skew-y-3 origin-top-left z-0 shadow-2xl"></div>
            <div class="absolute top-[-100px] right-[-100px] w-96 h-96 bg-[#ed1c24]/20 rounded-full blur-[100px] z-0 pointer-events-none"></div>

            <!-- Header -->
            <section class="relative z-10 pt-20 pb-28">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div class="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-[0.4em] text-white/90 mb-6 backdrop-blur-md">Connect with us</div>
                    <h2 class="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 uppercase drop-shadow-md">${supportTitle}</h2>
                    <p class="text-white/80 font-medium text-lg max-w-2xl mx-auto leading-relaxed">${supportSubtitle}</p>
                </div>
            </section>

            <section class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Contact Cards -->
                    <div class="space-y-6">
                        <div class="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 flex flex-col items-center text-center group hover-red-glow relative overflow-hidden cursor-default shadow-sm">
                            <div class="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                            <div class="relative z-10">
                                <div class="w-14 h-14 rounded-2xl bg-slate-100 text-[#111111] flex items-center justify-center mb-5 group-hover:bg-[#ed1c24] group-hover:text-white transition-all duration-300 shadow-sm group-hover:scale-110 mx-auto">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <h4 class="text-sm font-black text-slate-900 mb-1.5 uppercase tracking-widest">Email Support</h4>
                                <p class="text-slate-500 font-semibold text-sm transition-colors group-hover:text-[#ed1c24]">${escapeHTML(contactInfo.email)}</p>
                            </div>
                        </div>

                        <div class="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 flex flex-col items-center text-center group hover-red-glow relative overflow-hidden cursor-default shadow-sm">
                            <div class="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                            <div class="relative z-10">
                                <div class="w-14 h-14 rounded-2xl bg-slate-100 text-[#111111] flex items-center justify-center mb-5 group-hover:bg-[#ed1c24] group-hover:text-white transition-all duration-300 shadow-sm group-hover:scale-110 mx-auto">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                </div>
                                <h4 class="text-sm font-black text-slate-900 mb-1.5 uppercase tracking-widest">Technical Hotline</h4>
                                <p class="text-slate-500 font-semibold text-sm transition-colors group-hover:text-[#ed1c24]">${escapeHTML(contactInfo.phone)}</p>
                            </div>
                        </div>

                        <div class="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 flex flex-col items-center text-center group hover-red-glow relative overflow-hidden cursor-default shadow-sm">
                            <div class="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                            <div class="relative z-10">
                                <div class="w-14 h-14 rounded-2xl bg-slate-100 text-[#111111] flex items-center justify-center mb-5 group-hover:bg-[#ed1c24] group-hover:text-white transition-all duration-300 shadow-sm group-hover:scale-110 mx-auto">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                </div>
                                <h4 class="text-sm font-black text-slate-900 mb-1.5 uppercase tracking-widest">Corporate Office</h4>
                                <p class="text-slate-500 font-semibold text-sm transition-colors group-hover:text-[#ed1c24] px-2 leading-snug">${escapeHTML(contactInfo.address)}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div class="lg:col-span-2 bg-white/95 backdrop-blur-2xl rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group">
                        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ed1c24] via-[#111111] to-[#ed1c24] opacity-80"></div>
                        <div class="mb-8">
                            <h3 class="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                <span class="bg-[#ed1c24]/10 text-[#ed1c24] p-2 rounded-xl">
                                    <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                                </span>
                                Send a Technical Inquiry
                            </h3>
                            <p class="text-slate-500 font-medium mt-3 text-sm flex items-center gap-2">
                                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                Expect a response from our engineering team within 2 business hours.
                            </p>
                        </div>
                        <form id="support-form" class="space-y-5">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="space-y-1.5 relative group/input">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 transition-colors group-focus-within/input:text-[#ed1c24]">Full Name</label>
                                    <input type="text" name="name" required class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 h-12 text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#ed1c24] focus:ring-4 focus:ring-[#ed1c24]/10 focus:bg-white transition-all shadow-sm" placeholder="Enter your name">
                                </div>
                                <div class="space-y-1.5 relative group/input">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 transition-colors group-focus-within/input:text-[#ed1c24]">Work Email</label>
                                    <input type="email" name="email" required class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 h-12 text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#ed1c24] focus:ring-4 focus:ring-[#ed1c24]/10 focus:bg-white transition-all shadow-sm" placeholder="Enter work email">
                                </div>
                                <div class="space-y-1.5 relative group/input md:col-span-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 transition-colors group-focus-within/input:text-[#ed1c24]">Contact / WhatsApp Number</label>
                                    <input type="tel" name="phone" required class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 h-12 text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#ed1c24] focus:ring-4 focus:ring-[#ed1c24]/10 focus:bg-white transition-all shadow-sm" placeholder="Enter your contact number">
                                </div>
                                <div class="space-y-1.5 relative group/input">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 transition-colors group-focus-within/input:text-[#ed1c24]">Inquiry Subject</label>
                                    <select name="subject" class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 h-12 text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#ed1c24] focus:ring-4 focus:ring-[#ed1c24]/10 focus:bg-white transition-all shadow-sm appearance-none cursor-pointer">
                                        <option>Part Fitment Assistance</option>
                                        <option>Bulk Order Inquiry</option>
                                        <option>Technical Specification Request</option>
                                        <option>Warranty &amp; Returns</option>
                                    </select>
                                </div>
                                <div class="space-y-1.5 relative group/input">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 transition-colors group-focus-within/input:text-[#ed1c24]">Part No. / Model (Optional)</label>
                                    <input type="text" name="part_no" class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 h-12 text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#ed1c24] focus:ring-4 focus:ring-[#ed1c24]/10 focus:bg-white transition-all shadow-sm" placeholder="e.g. GWS 600">
                                </div>
                            </div>
                            <div class="space-y-1.5 relative group/input">
                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 transition-colors group-focus-within/input:text-[#ed1c24]">Detailed Message</label>
                                <textarea name="message" required class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#ed1c24] focus:ring-4 focus:ring-[#ed1c24]/10 focus:bg-white transition-all min-h-[120px] resize-none shadow-sm" placeholder="Describe your technical requirement..."></textarea>
                            </div>
                            <div class="pt-2">
                                <button id="support-submit-btn" type="submit" class="w-full h-14 bg-[#111111] hover:bg-[#ed1c24] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-[#111111]/20 hover:shadow-[#ed1c24]/30 transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 border-2 border-transparent">
                                    <span>${supportCTA}</span>
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <!-- Google Maps Location Section -->
            <section class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 reveal-element">
                <div class="bg-white/95 backdrop-blur-2xl rounded-[2rem] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group">
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ed1c24] via-[#111111] to-[#ed1c24] opacity-80"></div>
                    <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h3 class="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                <span class="bg-[#ed1c24]/10 text-[#ed1c24] p-2 rounded-xl">
                                    <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                </span>
                                Visit Our Warehouse & Headquarters
                            </h3>
                            <p class="text-slate-500 font-medium mt-1 text-sm pl-12">
                                Located in the industrial heart of New Delhi. Direct procurement and technical consultations available.
                            </p>
                        </div>
                        <a href="https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}" target="_blank" class="px-5 py-2.5 bg-slate-900 hover:bg-[#ed1c24] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2">
                            Open in Google Maps
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                        </a>
                    </div>
                    
                    <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative w-full h-[400px]">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14022.428784869542!2d77.26834199342084!3d28.521481512411986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce110196238b7%3A0xe10438cfebdf4a!2sPhase%20II%2C%20Okhla%20Industrial%20Estate%2C%20New%20Delhi%2C%20Delhi%20110020!5e0!3m2!1sen!2sin!4v1717140000000!5m2!1sen!2sin" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="w-full h-full filter brightness-95 contrast-100 hover:brightness-100 transition-all duration-300"></iframe>
                    </div>
                </div>
            </section>
        </div>
    `);

    document.getElementById('support-form').onsubmit = async (e) => {
        e.preventDefault();
        const btn = document.getElementById('support-submit-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="animate-pulse">Submitting Ticket...</span>';
        btn.disabled = true;

        try {
            const formData = new FormData(e.target);
            const res = await fetch(app.api('api/support.php'), {
                method: 'POST',
                body: formData
            });
            const result = await res.json();
            
            if (result.success) {
                app.showToast('Support ticket submitted. Reference: ' + result.reference);
                e.target.reset();
            } else {
                app.showToast(result.error || 'Failed to submit ticket', 'error');
            }
        } catch (err) {
            app.showToast('Network error while submitting ticket', 'error');
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    };
}

