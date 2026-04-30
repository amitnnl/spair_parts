export function renderLogin(container, app) {
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
            const res = await fetch(app.api('api/auth.php'), {
                method: 'POST',
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.success) {
                app.state.user = result.user;
                app.updateAuthUI();
                history.pushState(null, null, app.basePath + '/dashboard');
                app.handleRouting();
                app.showToast(`System synchronized. Welcome, ${result.user.name}.`);
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
