export default {
    render: async (container) => {
        const s = window.app.state.settings;
        
        container.innerHTML = `
            <div class="bg-white min-h-screen">
                <!-- Header Section -->
                <section class="relative py-20 bg-slate-900 overflow-hidden">
                    <div class="absolute inset-0 opacity-10">
                        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,86,179,1),transparent)]"></div>
                        <div class="grid grid-cols-6 h-full">
                            ${Array(6).fill('<div class="border-r border-white/10 h-full"></div>').join('')}
                        </div>
                    </div>
                    
                    <div class="max-w-4xl mx-auto px-6 relative z-10 text-center">
                        <span class="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-500/20">Logistics & Delivery</span>
                        <h1 class="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Shipping <span class="text-blue-500">Information</span></h1>
                        <p class="text-slate-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                            Everything you need to know about how we deliver genuine spare parts to your doorstep across India.
                        </p>
                    </div>
                </section>

                <!-- Content Section -->
                <section class="py-20">
                    <div class="max-w-4xl mx-auto px-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <!-- Shipping Methods -->
                            <div class="space-y-8">
                                <div>
                                    <h2 class="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                                        </div>
                                        Fast Delivery
                                    </h2>
                                    <p class="text-slate-600 leading-relaxed font-medium">
                                        We partner with premium courier services like BlueDart, Delhivery, and TCI Express to ensure your critical spare parts reach you as fast as possible.
                                    </p>
                                </div>

                                <div class="p-6 bg-slate-50 rounded-[32px] border border-slate-100 space-y-4">
                                    <h3 class="font-black text-slate-900 flex items-center gap-2">
                                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                        Delivery Timelines
                                    </h3>
                                    <ul class="space-y-3">
                                        <li class="flex justify-between text-sm font-bold">
                                            <span class="text-slate-500">Metro Cities</span>
                                            <span class="text-slate-900">2-4 Business Days</span>
                                        </li>
                                        <li class="flex justify-between text-sm font-bold">
                                            <span class="text-slate-500">Tier 2 Cities</span>
                                            <span class="text-slate-900">4-6 Business Days</span>
                                        </li>
                                        <li class="flex justify-between text-sm font-bold">
                                            <span class="text-slate-500">Rest of India</span>
                                            <span class="text-slate-900">7-10 Business Days</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Shipping Costs -->
                            <div class="space-y-8">
                                <div>
                                    <h2 class="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                        </div>
                                        Shipping Costs
                                    </h2>
                                    <p class="text-slate-600 leading-relaxed font-medium">
                                        Transparency is key. Our shipping rates are calculated based on weight and dimensions to ensure you get the fairest price for heavy industrial parts.
                                    </p>
                                </div>

                                <div class="space-y-4">
                                    <div class="p-6 bg-blue-600 rounded-[32px] text-white shadow-xl shadow-blue-600/20">
                                        <h4 class="font-black text-sm uppercase tracking-widest mb-1 opacity-80">Bulk Order Perk</h4>
                                        <div class="text-2xl font-black mb-3">Free Shipping</div>
                                        <p class="text-xs font-bold text-blue-100">On all orders above ₹15,000 across India. For smaller orders, a flat rate of ₹150 applies.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-20 p-10 bg-slate-900 rounded-[48px] text-center relative overflow-hidden">
                            <div class="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
                            <div class="relative z-10">
                                <h3 class="text-2xl font-black text-white mb-4">Track Your Order</h3>
                                <p class="text-slate-400 font-medium mb-8">Once your order is shipped, we will send you a tracking link via SMS and Email.</p>
                                <a href="/support" data-link class="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all duration-300">
                                    Need Help? Contact Support
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
};
