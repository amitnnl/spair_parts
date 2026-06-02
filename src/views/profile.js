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

                <main class="flex-1 m-4 lg:m-6 p-6 lg:p-10 bg-white rounded-[2.5rem] shadow-sm border border-slate-200">
                    <div class="max-w-4xl mx-auto space-y-12 animate-fade-in">
                        <div>
                            <div class="flex items-center gap-3 mb-2">
                                <div class="w-2 h-8 bg-bosch-blue rounded-none"></div>
                                <h2 class="text-4xl font-black text-slate-900 tracking-tighter uppercase font-display">Account <span class="text-bosch-blue">Settings</span></h2>
                            </div>
                            <p class="text-slate-600 font-medium text-lg leading-relaxed">Manage your partner profile and contact information.</p>
                        </div>

                        <div class="bg-white rounded-none shadow-2xl shadow-slate-200/50 border-2 border-slate-100 overflow-hidden">
                            <div class="p-8">
                                <form id="profile-form" class="space-y-4">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div class="space-y-1.5">
                                            <label class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name <span class="text-rose-500">*</span></label>
                                            <input type="text" name="name" value="${escapeHTML(user.name || '')}" required
                                                class="font-sans w-full h-11 bg-slate-50 border-2 border-slate-100 rounded-none px-4 text-sm font-medium text-sm-900 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white transition-all">
                                        </div>
                                        <div class="space-y-1.5">
                                            <label class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address (Primary)</label>
                                            <input type="email" value="${escapeHTML(user.email || '')}" disabled
                                                class="font-sans w-full h-11 bg-slate-100 border-2 border-slate-100 rounded-none px-4 text-sm font-medium text-sm-500 cursor-not-allowed">
                                        </div>
                                        <div class="space-y-1.5">
                                            <label class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Company / Business Name <span class="text-rose-500">*</span></label>
                                            <input type="text" name="company_name" value="${escapeHTML(user.company_name || '')}" required
                                                class="font-sans w-full h-11 bg-slate-50 border-2 border-slate-100 rounded-none px-4 text-sm font-medium text-sm-900 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white transition-all">
                                        </div>
                                        <div class="space-y-1.5">
                                            <label class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">GST / Tax ID Number <span class="text-rose-500">*</span></label>
                                            <input type="text" name="gst_number" value="${escapeHTML(user.gst_number || '')}" required
                                                class="font-sans w-full h-11 bg-slate-50 border-2 border-slate-100 rounded-none px-4 text-sm font-medium text-sm-900 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white transition-all">
                                        </div>
                                        <div class="space-y-1.5">
                                            <label class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Mobile Number <span class="text-rose-500">*</span></label>
                                            <input type="text" name="phone" value="${escapeHTML(user.phone || '')}" placeholder="+91 00000 00000" required
                                                class="font-sans w-full h-11 bg-slate-50 border-2 border-slate-100 rounded-none px-4 text-sm font-medium text-sm-900 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white transition-all">
                                        </div>
                                        <div class="space-y-1.5">
                                            <label class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">WhatsApp Number</label>
                                            <input type="text" name="whatsapp" value="${escapeHTML(user.whatsapp || '')}" placeholder="+91 00000 00000"
                                                class="font-sans w-full h-11 bg-slate-50 border-2 border-slate-100 rounded-none px-4 text-sm font-medium text-sm-900 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white transition-all">
                                        </div>
                                    </div>

                                    <div class="space-y-1.5">
                                        <label class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Business / Delivery Address <span class="text-rose-500">*</span></label>
                                        <textarea name="address" required
                                            class="font-sans w-full bg-slate-50 border-2 border-slate-100 rounded-none p-4 text-sm font-medium text-sm-900 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white transition-all h-24 resize-none">${escapeHTML(user.address || '')}</textarea>
                                    </div>

                                    <div class="pt-4 border-t border-slate-100 flex justify-end">
                                        <button type="submit" id="save-profile-btn"
                                            class="h-11 px-8 rounded-none bg-bosch-blue text-white font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-industrial-gray transition-all flex items-center gap-2">
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
                                <h4 class="text-sm font-extrabold text-amber-900 mb-1 uppercase tracking-widest">Security Note</h4>
                                <p class="text-xs text-amber-700 leading-relaxed font-medium">To maintain B2B account integrity, your email address cannot be changed directly. Please contact our support team if you need to update your primary email.</p>
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
                    localUser.profile_complete = true;
                    localStorage.setItem('user', JSON.stringify(localUser));
                    app.state.user.name = data.name;
                    app.state.user.profile_complete = true;
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
