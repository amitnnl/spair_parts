import { escapeHTML } from '../api.js';

export async function renderProfile(container, app) {
    if (!app.state.user) {
        history.pushState(null, null, app.basePath + '/login');
        app.handleRouting();
        return;
    }

    container.innerHTML = `<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-bosch-blue border-t-transparent rounded-none"></div></div>`;

    try {
        const res = await fetch(app.api('api/profile.php'));
        const user = await res.json();

        container.innerHTML = `
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${app.getSidebar('profile')}

                <main class="flex-1 p-8 lg:p-12">
                    <div class="max-w-4xl mx-auto space-y-12 animate-fade-in">
                        <div>
                            <div class="flex items-center gap-3 mb-2">
                                <div class="w-2 h-8 bg-bosch-blue rounded-none"></div>
                                <h2 class="text-4xl font-black text-slate-900 tracking-tight uppercase">Account <span class="text-bosch-blue">Settings</span></h2>
                            </div>
                            <p class="text-slate-500 font-bold text-lg">Manage your partner profile and contact information.</p>
                        </div>

                        <div class="bg-white rounded-none shadow-2xl shadow-slate-200/50 border-2 border-slate-100 overflow-hidden">
                            <div class="p-8">
                                <form id="profile-form" class="space-y-4">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div class="space-y-1.5">
                                            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input type="text" name="name" value="${escapeHTML(user.name || '')}" required
                                                class="w-full h-11 bg-slate-50 border-2 border-slate-100 rounded-none px-4 text-xs font-black text-slate-700 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white transition-all">
                                        </div>
                                        <div class="space-y-1.5">
                                            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address (Primary)</label>
                                            <input type="email" value="${escapeHTML(user.email || '')}" disabled
                                                class="w-full h-11 bg-slate-100 border-2 border-slate-100 rounded-none px-4 text-xs font-black text-slate-400 cursor-not-allowed">
                                        </div>
                                        <div class="space-y-1.5">
                                            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                                            <input type="text" name="phone" value="${escapeHTML(user.phone || '')}" placeholder="+91 00000 00000"
                                                class="w-full h-11 bg-slate-50 border-2 border-slate-100 rounded-none px-4 text-xs font-black text-slate-700 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white transition-all">
                                        </div>
                                        <div class="space-y-1.5">
                                            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp Number</label>
                                            <input type="text" name="whatsapp" value="${escapeHTML(user.whatsapp || '')}" placeholder="+91 00000 00000"
                                                class="w-full h-11 bg-slate-50 border-2 border-slate-100 rounded-none px-4 text-xs font-black text-slate-700 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white transition-all">
                                        </div>
                                    </div>

                                    <div class="space-y-1.5">
                                        <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Business / Delivery Address</label>
                                        <textarea name="address" 
                                            class="w-full bg-slate-50 border-2 border-slate-100 rounded-none p-4 text-xs font-black text-slate-700 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white transition-all h-24 resize-none">${escapeHTML(user.address || '')}</textarea>
                                    </div>

                                    <div class="pt-4 border-t border-slate-100 flex justify-end">
                                        <button type="submit" id="save-profile-btn"
                                            class="h-11 px-8 rounded-none bg-bosch-blue text-white font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-industrial-gray transition-all flex items-center gap-2">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                                            Update Profile Info
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="p-8 bg-amber-50 rounded-none border border-amber-100 border-l-8 border-l-amber-400 flex items-start gap-6">
                            <div class="w-12 h-12 rounded-none bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                            </div>
                            <div>
                                <h4 class="text-sm font-black text-amber-900 mb-1 uppercase tracking-tight">Security Note</h4>
                                <p class="text-xs text-amber-700 leading-relaxed font-medium">To maintain B2B account integrity, your Email address cannot be changed directly. Please contact our support team if you need to update your primary email.</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `;

        document.getElementById('profile-form').onsubmit = async (e) => {
            e.preventDefault();
            const btn = document.getElementById('save-profile-btn');
            btn.disabled = true;
            btn.innerHTML = '<span class="animate-pulse">Updating...</span>';

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            try {
                const res = await fetch(app.api('api/profile.php'), {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' }
                });
                const result = await res.json();
                if (result.success) {
                    app.showToast('Profile updated successfully');
                    // Update local storage name if changed
                    const localUser = JSON.parse(localStorage.getItem('user'));
                    localUser.name = data.name;
                    localStorage.setItem('user', JSON.stringify(localUser));
                    app.state.user.name = data.name;
                    // Re-render to show new name in sidebar etc
                    app.renderProfile(container);
                } else {
                    app.showToast(result.error || 'Update failed', 'error');
                }
            } catch (err) {
                app.showToast('Update failed', 'error');
            } finally {
                btn.disabled = false;
                btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg> Update Profile Info';
            }
        };

    } catch (e) {
        app.showToast('Failed to load profile', 'error');
    }
}
