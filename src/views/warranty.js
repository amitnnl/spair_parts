export default {
    render: async (container) => {
        const s = window.app.state.settings;
        
        container.innerHTML = `
            <div class="bg-white min-h-screen">
                <!-- Header Section -->
                <section class="relative py-20 bg-slate-900 overflow-hidden">
                    <div class="absolute inset-0 opacity-10">
                        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,179,86,1),transparent)]"></div>
                        <div class="grid grid-cols-6 h-full">
                            ${Array(6).fill('<div class="border-r border-white/10 h-full"></div>').join('')}
                        </div>
                    </div>
                    
                    <div class="max-w-4xl mx-auto px-6 relative z-10 text-center">
                        <span class="inline-block px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-green-500/20">Quality Assurance</span>
                        <h1 class="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Warranty & <span class="text-green-500">Returns</span></h1>
                        <p class="text-slate-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                            Our commitment to quality means your satisfaction is guaranteed. Learn about our genuine parts warranty and hassle-free return policy.
                        </p>
                    </div>
                </section>

                <!-- Content Section -->
                <section class="py-20">
                    <div class="max-w-4xl mx-auto px-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <!-- Warranty Policy -->
                            <div class="space-y-8">
                                <div>
                                    <h2 class="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                                        </div>
                                        Genuine Warranty
                                    </h2>
                                    <p class="text-slate-600 leading-relaxed font-medium">
                                        All our products are 100% genuine and come directly from authorized brands. We honor the standard manufacturer warranty on all electrical and mechanical components.
                                    </p>
                                </div>

                                <div class="p-8 bg-slate-50 rounded-[40px] border border-slate-100 space-y-6">
                                    <div class="space-y-2">
                                        <h4 class="text-sm font-black text-slate-900 uppercase tracking-wider">What's Covered?</h4>
                                        <p class="text-xs font-bold text-slate-500 leading-relaxed">Manufacturing defects, material failure, and performance inconsistencies under normal operating conditions.</p>
                                    </div>
                                    <div class="space-y-2">
                                        <h4 class="text-sm font-black text-slate-900 uppercase tracking-wider">Duration</h4>
                                        <p class="text-xs font-bold text-slate-500 leading-relaxed">Varies by brand (typically 3-12 months). Please refer to the specific brand card for exact details.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Returns Policy -->
                            <div class="space-y-8">
                                <div>
                                    <h2 class="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                                        </div>
                                        Hassle-Free Returns
                                    </h2>
                                    <p class="text-slate-600 leading-relaxed font-medium">
                                        Ordered the wrong part? No problem. We accept returns within 7 days of delivery for all unused, sealed items in their original packaging.
                                    </p>
                                </div>

                                <div class="bg-orange-600 rounded-[40px] p-8 text-white shadow-xl shadow-orange-600/20">
                                    <div class="text-3xl font-black mb-4">7-Day Window</div>
                                    <p class="text-sm font-bold text-orange-100 leading-relaxed mb-6">Return requests must be initiated within 168 hours of delivery for a full refund or exchange.</p>
                                    <div class="pt-6 border-t border-white/20">
                                        <div class="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-200">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                            Response within 24h
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-20 p-10 bg-slate-50 rounded-[48px] border-2 border-dashed border-slate-200 text-center">
                            <h3 class="text-2xl font-black text-slate-900 mb-4">Initiate a Return</h3>
                            <p class="text-slate-500 font-medium mb-8 max-w-xl mx-auto leading-relaxed text-sm">To start a warranty claim or return request, please have your Order ID and photos of the part ready and contact our support team.</p>
                            <div class="flex flex-col sm:flex-row justify-center gap-4">
                                <a href="/support" data-link class="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all duration-300">
                                    Open Support Ticket
                                </a>
                                <a href="#" onclick="window.open('https://wa.me/${s.whatsapp_number}?text=Hello! I want to initiate a return for my order.', '_blank')" class="px-8 py-4 bg-[#25D366] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.116.554 4.183 1.604 5.999L0 24l6.162-1.616a11.803 11.803 0 005.883 1.554h.005c6.634 0 12.032-5.391 12.035-12.029a11.785 11.785 0 00-3.51-8.514z"/></svg>
                                    Chat with Returns Dept
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
};
