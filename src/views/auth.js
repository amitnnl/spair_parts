export function renderLogin(container, app) {
    container.innerHTML = `
        <div class="min-h-[calc(100vh-80px)] flex items-center justify-center py-8 px-4 relative overflow-hidden bg-bosch-blue lightning-bg">
            <!-- Lightning Glow Elements -->
            <div class="lightning-glow w-[500px] h-[500px] -top-48 -right-48 opacity-20"></div>
            <div class="lightning-glow w-[300px] h-[300px] -bottom-24 -left-24 opacity-10" style="animation-delay: -2s;"></div>
            <div class="lightning-glow w-[200px] h-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5" style="animation-delay: -4s;"></div>

            <div class="w-full max-w-sm relative z-10 animate-fade-in">
                <div class="bg-white rounded-none shadow-premium border-t-8 border-bosch-blue p-8 space-y-6">
                    <div class="text-center">
                        <h2 class="text-2xl font-black text-bosch-blue tracking-tight uppercase">Partner Login</h2>
                        <p class="text-slate-500 mt-1 font-bold text-sm">Secure access to the B2B portal.</p>
                        <div class="w-12 h-1 bg-bosch-red mx-auto mt-3"></div>
                    </div>
                    
                    <form id="login-form" class="space-y-4">
                        <div class="space-y-1.5">
                            <label class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Corporate Email</label>
                            <div class="relative">
                                <input type="email" name="email" required 
                                    class="h-11 pl-11 pr-4 rounded-none border-2 border-slate-100 bg-slate-50 text-xs font-black text-slate-700 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white focus:ring-4 focus:ring-bosch-blue/10 transition-all w-full" 
                                    placeholder="name@company.com">
                                <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-1.5">
                            <label class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Access Password</label>
                            <div class="relative">
                                <input type="password" name="password" required 
                                    class="h-11 pl-11 pr-4 rounded-none border-2 border-slate-100 bg-slate-50 text-xs font-black text-slate-700 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white focus:ring-4 focus:ring-bosch-blue/10 transition-all w-full" 
                                    placeholder="••••••••">
                                <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between">
                            <label class="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" class="w-4 h-4 border-2 border-slate-200 rounded-none text-bosch-blue focus:ring-bosch-blue transition-all">
                                <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-bosch-blue transition-colors">Keep me active</span>
                            </label>
                            <a href="#" class="text-[9px] font-black text-bosch-blue uppercase tracking-widest hover:underline">Reset Password</a>
                        </div>

                        <button type="submit" class="w-full h-11 rounded-none bg-bosch-blue text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-slate-900/10 hover:bg-industrial-gray transition-all flex items-center justify-center gap-2 group">
                            Synchronize & Enter
                            <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                        </button>
                    </form>

                    <div class="text-center pt-4 border-t border-slate-100">
                        <p class="text-[11px] font-bold text-slate-500">
                            New Partner? <a href="/register" data-link class="text-bosch-blue font-black uppercase tracking-widest text-[10px] ml-1 hover:underline">Request Onboarding</a>
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
            const res = await fetch(app.api('api/auth.php'), {
                method: 'POST',
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.success) {
                app.state.user = result.user;
                app.updateAuthUI();
                const role = result.user.role?.toLowerCase();
                const dest = role === 'admin' ? '/admin' : role === 'staff' ? '/staff' : '/dashboard';
                history.pushState(null, null, app.basePath + dest);
                app.handleRouting();
                app.showToast(`Welcome, ${result.user.name}.`);
            } else {
                app.showToast(result.error || 'Authorization failed', 'error');
            }
        } catch (e) {
            app.showToast('Authentication server offline', 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = 'Synchronize & Enter';
        }
    };
}

export function renderRegister(container, app) {
    container.innerHTML = `
        <div class="min-h-[calc(100vh-80px)] flex items-center justify-center py-8 px-4 bg-bosch-blue relative overflow-hidden lightning-bg">
            <!-- Lightning Glow Elements -->
            <div class="lightning-glow w-[400px] h-[400px] -top-32 -left-32 opacity-15"></div>
            <div class="lightning-glow w-[300px] h-[300px] -bottom-20 -right-20 opacity-10" style="animation-delay: -3s;"></div>
            
            <div class="w-full max-w-xl relative z-10 animate-fade-in">
                <div class="bg-white rounded-none shadow-premium border-t-8 border-bosch-blue p-8 lg:p-10 space-y-6 relative overflow-hidden">
                    <!-- Subtle Interior Glow -->
                    <div class="absolute -top-24 -right-24 w-48 h-48 bg-bosch-blue/5 rounded-full blur-3xl"></div>
                    <div class="flex flex-col md:flex-row gap-8 items-center">
                        <div class="flex-1 space-y-4">
                            <h2 class="text-2xl font-black text-bosch-blue tracking-tight uppercase">Partner <span class="text-bosch-blue">Onboarding</span></h2>
                            <p class="text-slate-500 font-bold text-xs leading-relaxed">Apply for a specialized B2B account to unlock wholesale pricing and credit facilities.</p>
                            <div class="space-y-3 pt-2">
                                <div class="flex items-center gap-2.5">
                                    <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>
                                    <span class="text-[9px] font-black text-slate-700 uppercase tracking-widest">Wholesale Contract Pricing</span>
                                </div>
                                <div class="flex items-center gap-2.5">
                                    <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>
                                    <span class="text-[9px] font-black text-slate-700 uppercase tracking-widest">Priority Stock Allocation</span>
                                </div>
                            </div>
                        </div>

                        <form id="register-form" class="flex-1 space-y-4">
                            <div class="space-y-1.5">
                                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
                                <input type="text" name="name" required class="rounded-none border-2 border-slate-100 bg-slate-50 h-11 px-4 text-xs font-black text-slate-700 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white focus:ring-4 focus:ring-bosch-blue/10 transition-all w-full" placeholder="Full Name">
                            </div>
                            <div class="space-y-1.5">
                                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Business Email</label>
                                <input type="email" name="email" required class="rounded-none border-2 border-slate-100 bg-slate-50 h-11 px-4 text-xs font-black text-slate-700 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white focus:ring-4 focus:ring-bosch-blue/10 transition-all w-full" placeholder="Corporate Email">
                            </div>
                            <div class="space-y-1.5">
                                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Create Password</label>
                                <input type="password" name="password" required class="rounded-none border-2 border-slate-100 bg-slate-50 h-11 px-4 text-xs font-black text-slate-700 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white focus:ring-4 focus:ring-bosch-blue/10 transition-all w-full" placeholder="••••••••">
                            </div>
                            <button type="submit" class="w-full h-11 rounded-none bg-industrial-gray text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-bosch-blue transition-all">Submit Application</button>
                            <p class="text-center text-[9px] font-bold text-slate-400">By applying, you agree to our B2B Terms of Service.</p>
                        </form>
                    </div>

                    <div class="h-[1px] bg-slate-100 my-4"></div>

                    <div class="text-center pt-2">
                        <p class="text-[11px] font-bold text-slate-500">
                            Already a registered partner? <a href="/login" data-link class="text-bosch-blue font-black uppercase tracking-widest text-[10px] ml-1 hover:underline">Access Portal</a>
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
            const res = await fetch(app.api('api/auth.php'), {
                method: 'POST',
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.success) {
                app.showToast('Application submitted. We will review your account soon.');
                history.pushState(null, null, app.basePath + '/login');
                app.handleRouting();
            } else {
                app.showToast(result.error || 'Submission failed', 'error');
            }
        } catch (e) {
            app.showToast('Network error during submission', 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = 'Submit Application';
        }
    };
}
