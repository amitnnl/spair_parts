import { setHTML } from '../api.js';

export function renderPrivacy(container, app) {
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
                    <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 uppercase drop-shadow-md">Privacy Policy</h2>
                    <p class="text-white/80 font-medium text-base max-w-2xl mx-auto leading-relaxed">Last Updated: May 2026. This Privacy Policy outlines how Torvo Tools Private Limited collects, uses, and safeguards your corporate and personal data.</p>
                </div>
            </section>

            <!-- Content -->
            <section class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                <div class="bg-white/95 backdrop-blur-2xl rounded-none p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    
                    <div class="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight prose-a:text-[#ed1c24] prose-a:no-underline hover:prose-a:underline prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
                        
                        <h3 class="text-2xl mt-0 mb-4 border-b border-slate-100 pb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-none bg-[#ed1c24]/10 flex items-center justify-center text-[#ed1c24]">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            </span>
                            1. Introduction
                        </h3>
                        <p>Welcome to the Torvo Tools B2B Portal. Torvo Tools Private Limited ("we", "our", or "us") respects your privacy and is committed to protecting your corporate and personal data. This privacy policy will inform you as to how we look after your data when you visit our portal and tell you about your privacy rights.</p>

                        <h3 class="text-2xl mt-10 mb-4 border-b border-slate-100 pb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-none bg-[#ed1c24]/10 flex items-center justify-center text-[#ed1c24]">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            </span>
                            2. Data We Collect
                        </h3>
                        <p>We may collect, use, store and transfer different kinds of data about you and your business which we have grouped together as follows:</p>
                        <ul class="list-disc pl-5 space-y-2 mt-3 mb-6">
                            <li><strong>Identity Data:</strong> includes first name, last name, username, title, and company name.</li>
                            <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                            <li><strong>Financial Data:</strong> includes bank account and payment card details for B2B transactions.</li>
                            <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
                        </ul>

                        <h3 class="text-2xl mt-10 mb-4 border-b border-slate-100 pb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-none bg-[#ed1c24]/10 flex items-center justify-center text-[#ed1c24]">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </span>
                            3. How We Use Your Data
                        </h3>
                        <p>We will only use your data when the law allows us to. Most commonly, we will use your data in the following circumstances:</p>
                        <ul class="list-disc pl-5 space-y-2 mt-3 mb-6">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with your company (e.g., fulfilling bulk spare part orders).</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>

                        <h3 class="text-2xl mt-10 mb-4 border-b border-slate-100 pb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-none bg-[#ed1c24]/10 flex items-center justify-center text-[#ed1c24]">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            </span>
                            4. Data Security
                        </h3>
                        <p>We have put in place appropriate security measures to prevent your data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your data to those employees, agents, contractors and other third parties who have a business need to know.</p>

                        <h3 class="text-2xl mt-10 mb-4 border-b border-slate-100 pb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-none bg-[#ed1c24]/10 flex items-center justify-center text-[#ed1c24]">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </span>
                            5. Contact Us
                        </h3>
                        <p>If you have any questions about this privacy policy or our privacy practices, please contact our legal team at <a href="mailto:support@torvotools.com" class="font-bold">support@torvotools.com</a>.</p>

                    </div>
                </div>
            </section>
        </div>
    `);
}
