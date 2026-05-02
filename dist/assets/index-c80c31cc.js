(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function s(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(r){if(r.ep)return;r.ep=!0;const l=s(r);fetch(r.href,l)}})();function $(t,e){const s=e.state.user&&e.state.user.role&&e.state.user.role.toLowerCase()==="admin";return`
        <aside class="w-full lg:w-72 bg-[#fdfdfd] border-r border-slate-200 flex flex-col sticky top-20 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            <!-- User Status Card -->
            <div class="p-8 border-b border-slate-100 bg-slate-50/30">
                <div class="flex items-center gap-4 mb-6">
                    <div class="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-lg shadow-primary/20">
                        ${(e.state.user?e.state.user.name:"Guest Partner").charAt(0)}
                    </div>
                    <div>
                        <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1.5">System Status</p>
                        <p class="text-xs font-bold text-emerald-600 flex items-center gap-2">
                            <span class="relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Live Access
                        </p>
                    </div>
                </div>
            </div>

            <div class="flex-1 p-6 space-y-10 overflow-y-auto mt-2">
                <div class="space-y-2">
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-4 opacity-60">Procurement Hub</p>
                    <nav class="space-y-1.5">
                        ${h("/catalog","Spare Parts","M4 6h16M4 10h16M4 14h16M4 18h16",t==="catalog")}
                        ${h("/dashboard","Operational Overview","M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",t==="dashboard")}
                    </nav>
                </div>

                <div class="space-y-2">
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-4 opacity-60">Transactions</p>
                    <nav class="space-y-1.5">
                        ${h("/quotations","Active Quotations","M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",t==="quotations")}
                        ${h("/invoices","Financial Records","M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",t==="invoices")}
                    </nav>
                </div>

                ${s?`
                    <div class="space-y-2 pt-8 border-t border-slate-100">
                        <p class="text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-4 ml-4 font-poppins">Administrative Console</p>
                        <nav class="space-y-1.5">
                            ${h("/admin","Executive Insights","M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",t==="admin","slate")}
                            <button onclick="app.renderAdminInventory(document.getElementById('view-container'))" class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl ${t==="inventory"?"bg-slate-900 text-white shadow-xl shadow-slate-900/20":"text-slate-500 hover:bg-slate-50 hover:text-slate-900"} transition-all font-bold text-xs group">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                                <span class="group-hover:translate-x-1 transition-transform">Inventory Systems</span>
                            </button>
                            <button onclick="app.renderAdminUsers(document.getElementById('view-container'))" class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl ${t==="partners"?"bg-slate-900 text-white shadow-xl shadow-slate-900/20":"text-slate-500 hover:bg-slate-50 hover:text-slate-900"} transition-all font-bold text-xs group">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                                <span class="group-hover:translate-x-1 transition-transform">Global Partners</span>
                            </button>
                            <button onclick="app.renderSystemSettings()" class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl ${t==="settings"?"bg-slate-900 text-white shadow-xl shadow-slate-900/20":"text-slate-500 hover:bg-slate-50 hover:text-slate-900"} transition-all font-bold text-xs group">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>
                                <span class="group-hover:translate-x-1 transition-transform">System Configuration</span>
                            </button>
                        </nav>
                    </div>
                `:""}
            </div>

            <div class="p-6 border-t border-slate-100 bg-slate-50/20">
                <a href="/logout" data-link class="flex items-center gap-4 px-4 py-4 rounded-2xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-black text-xs group">
                    <div class="w-10 h-10 rounded-xl bg-rose-100/50 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all shadow-sm">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    </div>
                    Terminal Logout
                </a>
            </div>
        </aside>
    `}function h(t,e,s,a,r="blue"){return`
        <a href="${t}" data-link class="flex items-center gap-4 px-4 py-3.5 rounded-2xl ${a?r==="blue"?"bg-blue-600 text-white shadow-xl shadow-blue-600/20":"bg-slate-900 text-white shadow-xl shadow-slate-900/20":"text-slate-500 hover:bg-slate-50 hover:text-slate-900"} transition-all font-bold text-[11px] uppercase tracking-tight group">
            <svg class="w-4 h-4 ${a?"":"group-hover:scale-110"} transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="${a?"2.5":"2"}">
                <path stroke-linecap="round" stroke-linejoin="round" d="${s}"/>
            </svg>
            <span class="${a?"":"group-hover:translate-x-1"} transition-transform">${e}</span>
        </a>
    `}const m={user:null,cart:[],products:[],quotations:[],invoices:[],view:"home",isLoading:!1,settings:{site_name:"PARTSPRO",currency:"₹",tax_percent:"18"}};async function S(t,e){t.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const a=await(await fetch(e.api("api/products.php"))).json();m.products=a.products,m.brands=a.brands,m.models=a.models,t.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${e.getSidebar("catalog")}
                <main class="flex-1 p-8 lg:p-12">
                    <div class="max-w-7xl mx-auto space-y-12 animate-fade-in">
                        <div>
                            <div class="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Inventory Explorer</div>
                            <h2 class="text-4xl font-black tracking-tight text-slate-900">Genuine <span class="text-primary">Parts Catalog</span></h2>
                            <p class="text-slate-500 font-medium mt-2 text-lg">Browse through our extensive collection of industrial spare parts.</p>
                        </div>
                        
                        <div id="catalog-content"></div>
                    </div>
                </main>
            </div>
        `,M(a.products,document.getElementById("catalog-content"),e)}catch{t.innerHTML='<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load products.</div>'}}function M(t,e,s){e.innerHTML=`
        <div class="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-900/5 p-8 lg:p-12 relative overflow-hidden mb-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                <div class="relative md:col-span-1">
                    <input type="text" id="catalog-search" class="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-12 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400" placeholder="Search by Part name or Model...">
                    <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </div>
                </div>
                <div class="relative">
                    <select id="brand-filter" class="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-blue-500 transition-all cursor-pointer uppercase tracking-widest">
                        <option value="">Filter by Brand</option>
                        ${(m.brands||[]).map(r=>`<option value="${r}">${r}</option>`).join("")}
                    </select>
                    <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg></div>
                </div>
                <div class="relative">
                    <select id="model-filter" class="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-blue-500 transition-all cursor-pointer uppercase tracking-widest">
                        <option value="">Filter by Model</option>
                        ${(m.models||[]).map(r=>`<option value="${r}">${r}</option>`).join("")}
                    </select>
                    <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg></div>
                </div>
            </div>
        </div>

        <div id="catalog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            ${f()}
        </div>
    `;const a=()=>{document.getElementById("catalog-grid").innerHTML=f()};document.getElementById("catalog-search").oninput=a,document.getElementById("brand-filter").onchange=a,document.getElementById("model-filter").onchange=a}function f(){var r,l,d;const t=((r=document.getElementById("catalog-search"))==null?void 0:r.value.toLowerCase())||"",e=((l=document.getElementById("brand-filter"))==null?void 0:l.value)||"",s=((d=document.getElementById("model-filter"))==null?void 0:d.value)||"",a=(m.products||[]).filter(n=>{const i=n.part_name.toLowerCase().includes(t)||n.machine_model&&n.machine_model.toLowerCase().includes(t)||n.brand&&n.brand.toLowerCase().includes(t),c=!e||n.brand===e,o=!s||n.machine_model===s||n.other_fitments&&n.other_fitments.includes(s);return i&&c&&o});return a.length===0?`
            <div class="col-span-full py-20 text-center animate-in fade-in duration-500">
                <h3 class="text-xl font-bold text-slate-400">No parts found</h3>
            </div>
        `:a.map(n=>C(n)).join("")}function C(t){return`
        <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 animate-in zoom-in duration-700">
            <div class="relative h-64 bg-slate-50 overflow-hidden">
                <img src="${B(t.photo,t.part_name)}" class="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700">
                <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 bg-white/90 backdrop-blur shadow-sm border border-slate-100 text-[10px] font-black uppercase tracking-widest text-blue-600 rounded-lg">${t.brand}</span>
                </div>
            </div>
            <div class="p-8">
                <div class="mb-6">
                    <h4 class="font-black text-lg text-slate-900 leading-tight mb-1">${t.part_name}</h4>
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fits: ${t.machine_model||"Universal"}</span>
                    </div>
                </div>
                
                <div class="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div>
                        <span class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">B2B Pricing</span>
                        <span class="text-sm font-bold text-slate-900">RFQ Required</span>
                    </div>
                    <button onclick="app.addToCart(${t.id})" class="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                    </button>
                </div>
            </div>
        </div>
    `}function B(t,e="Part"){return t?t.replace("via.placeholder.com","placehold.co"):`https://placehold.co/600x600/0f172a/6366f1?text=${encodeURIComponent(e)}`}async function T(t,e){if(!e.state.user){history.pushState(null,null,e.basePath+"/login"),e.handleRouting();return}t.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const a=await(await fetch(e.api("api/quotations.php"))).json();t.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${e.getSidebar("quotations")}
                <main class="flex-1 p-8 lg:p-12">
                    <div class="max-w-6xl mx-auto space-y-12 animate-fade-in">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div>
                                <div class="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Procurement History</div>
                                <h2 class="text-4xl font-black tracking-tight text-slate-900">Your <span class="text-blue-600">Quotations</span></h2>
                                <p class="text-slate-500 font-medium mt-2 text-lg">Track your request for quotes and approval statuses.</p>
                            </div>
                            <button onclick="app.renderCatalog(document.getElementById('view-container'))" class="btn btn-secondary flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                                New Request
                            </button>
                        </div>

                        <div class="table-container">
                            <table class="data-table w-full text-left">
                                <thead>
                                    <tr>
                                        <th>ID / Date</th>
                                        <th>Items Count</th>
                                        <th>Status</th>
                                        <th>Amount</th>
                                        <th class="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100">
                                    ${a.length?a.map(r=>`
                                        <tr class="hover:bg-slate-50 transition-all">
                                            <td class="p-6">
                                                <div class="font-bold text-slate-900">#Q-${String(r.id).padStart(4,"0")}</div>
                                                <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">${new Date(r.created_at).toLocaleDateString()}</div>
                                            </td>
                                            <td class="p-6 font-bold text-slate-600">${r.item_count||0} Products</td>
                                            <td class="p-6">
                                                <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${e.getStatusClass(r.status)}">
                                                    ${r.status}
                                                </span>
                                            </td>
                                            <td class="p-6 font-black text-slate-900">
                                                ${r.status==="pending"?'<span class="text-slate-400 font-bold italic">Awaiting Pricing</span>':`₹${parseFloat(r.total_amount||0).toLocaleString()}`}
                                            </td>
                                            <td class="p-6 text-right">
                                                <div class="flex justify-end gap-3">
                                                    <button onclick="app.viewQuotationDetails(${r.id})" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-slate-200 transition-all">View</button>
                                                    ${r.status==="priced"?`<button onclick="app.approveQuotation(${r.id})" class="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">Approve</button>`:""}
                                                </div>
                                            </td>
                                        </tr>
                                    `).join(""):`
                                        <tr>
                                            <td colspan="5" class="p-20 text-center text-slate-400 font-bold">You haven't requested any quotations yet.</td>
                                        </tr>
                                    `}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        `}catch{t.innerHTML='<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load quotations.</div>'}}async function j(t,e){const s=document.createElement("div");s.id="quotation-modal",s.className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto";try{const r=await(await fetch(e.api(`api/quotations.php?id=${t}`))).json();s.innerHTML=`
            <div class="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in duration-300 my-8">
                <div class="p-10 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h2 class="text-2xl font-black text-slate-900">Quotation Details</h2>
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">#Q-${String(t).padStart(4,"0")} • Requested on ${new Date(r.created_at).toLocaleDateString()}</p>
                    </div>
                    <button onclick="document.getElementById('quotation-modal').remove()" class="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 flex items-center justify-center transition-all">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <div class="p-10 space-y-10">
                    <div class="overflow-hidden border border-slate-200 rounded-2xl">
                        <table class="w-full text-left">
                            <thead class="bg-slate-50">
                                <tr>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Spare Part</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Unit Price</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                ${r.items.map(l=>`
                                    <tr>
                                        <td class="p-6">
                                            <div class="font-bold text-slate-900">${l.part_name}</div>
                                            <div class="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-0.5">${l.brand} • ${l.machine_model}</div>
                                        </td>
                                        <td class="p-6 text-sm font-bold text-slate-600">${l.quantity}</td>
                                        <td class="p-6 text-sm font-black text-slate-900 text-right">${l.unit_price?`₹${parseFloat(l.unit_price).toLocaleString()}`:'<span class="text-slate-400 italic">Pending</span>'}</td>
                                        <td class="p-6 text-sm font-black text-slate-900 text-right">${l.unit_price?`₹${(l.quantity*l.unit_price).toLocaleString()}`:"---"}</td>
                                    </tr>
                                `).join("")}
                            </tbody>
                            ${r.total_amount?`
                                <tfoot class="bg-slate-50 font-black">
                                    <tr>
                                        <td colspan="3" class="p-6 text-right text-slate-400 uppercase tracking-widest text-xs">Total Amount</td>
                                        <td class="p-6 text-right text-2xl text-slate-900">₹${parseFloat(r.total_amount).toLocaleString()}</td>
                                    </tr>
                                </tfoot>
                            `:""}
                        </table>
                    </div>
                    
                    <div class="flex justify-end gap-4">
                        <button onclick="document.getElementById('quotation-modal').remove()" class="px-8 py-4 rounded-2xl border border-slate-200 text-slate-400 font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all">Close Details</button>
                        ${r.status==="priced"?`<button onclick="app.approveQuotation(${t})" class="px-10 py-4 rounded-2xl bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">Approve & Order</button>`:""}
                    </div>
                </div>
            </div>
        `,document.body.appendChild(s)}catch{e.showToast("Failed to load quotation details","error")}}async function P(t,e){try{if((await(await fetch(e.api("api/quotations.php"),{method:"PUT",body:JSON.stringify({quotation_id:t,status:"approved"})})).json()).success){e.showToast("Quotation approved. We will generate your invoice shortly.");const r=document.getElementById("quotation-modal");r&&r.remove(),e.renderQuotations(document.getElementById("view-container"))}}catch{e.showToast("Error approving quotation","error")}}async function A(t,e){if(!e.state.user){history.pushState(null,null,e.basePath+"/login"),e.handleRouting();return}t.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const a=await(await fetch(e.api("api/invoices.php"))).json();t.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${e.getSidebar("invoices")}
                <main class="flex-1 p-8 lg:p-12">
                    <div class="max-w-6xl mx-auto space-y-12 animate-fade-in">
                        <div>
                            <div class="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Financial Records</div>
                            <h2 class="text-4xl font-black tracking-tight text-slate-900">Your <span class="text-emerald-600">Invoices</span></h2>
                            <p class="text-slate-500 font-medium mt-2">Official tax invoices for your approved procurement requests.</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            ${a.length?a.map(r=>`
                                <div class="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 group">
                                    <div class="flex justify-between items-start">
                                        <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">${new Date(r.created_at).toLocaleDateString()}</p>
                                            <p class="text-sm font-black text-slate-900">${r.invoice_number}</p>
                                        </div>
                                    </div>
                                    <div class="space-y-4 pt-6 border-t border-slate-100">
                                        <div class="flex justify-between items-center">
                                            <span class="text-xs font-bold text-slate-400">Total Amount</span>
                                            <span class="text-xl font-black text-slate-900">₹${parseFloat(r.total_amount).toLocaleString()}</span>
                                        </div>
                                        <button onclick="app.renderInvoiceDocument(${r.id})" class="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/20">Download PDF</button>
                                    </div>
                                </div>
                            `).join(""):`
                                <div class="col-span-full bg-slate-50 border border-slate-100 rounded-3xl p-20 text-center text-slate-400 font-bold">No invoices generated yet.</div>
                            `}
                        </div>
                    </div>
                </main>
            </div>
        `}catch{t.innerHTML='<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load invoices.</div>'}}async function E(t,e){const s=document.createElement("div");s.id="invoice-doc-modal",s.className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-lg overflow-y-auto";try{const r=await(await fetch(e.api(`api/invoices.php?id=${t}`))).json();s.innerHTML=`
            <div class="bg-white text-slate-900 w-full max-w-4xl min-h-[11in] p-16 shadow-2xl relative animate-in slide-in-from-bottom-8 duration-500 rounded-sm">
                <!-- Premium Header Ribbon -->
                <div class="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900"></div>
                
                <div class="flex justify-between items-start border-b-[3px] border-slate-900 pb-12 mt-4">
                    <div class="space-y-4">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center font-black text-2xl shadow-lg">P</div>
                            <h1 class="text-4xl font-black tracking-tighter uppercase">PARTS<span class="text-blue-600">PRO</span></h1>
                        </div>
                        <div class="text-[11px] font-black text-slate-500 space-y-1.5 uppercase tracking-[0.15em]">
                            <p>Industrial Area, Phase 2</p>
                            <p>New Delhi, 110020</p>
                            <p class="text-slate-900 mt-2">GSTIN: 07AAACT0000A1Z5</p>
                        </div>
                    </div>
                    <div class="text-right space-y-1">
                        <h2 class="text-6xl font-black text-slate-200 tracking-tighter uppercase opacity-50">Invoice</h2>
                        <p class="text-sm font-black text-slate-900">NO: ${r.invoice_number}</p>
                        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-widest pt-2">Date: ${new Date(r.created_at).toLocaleDateString()}</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-16 py-16">
                    <div>
                        <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Billed To:</p>
                        <div class="space-y-1">
                            <h3 class="text-xl font-black text-slate-900">${r.user_name}</h3>
                            <p class="text-sm font-medium text-slate-500">${r.user_email}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Payment Status:</p>
                        <span class="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">Payment on Delivery</span>
                    </div>
                </div>

                <div class="border-[1.5px] border-slate-900 rounded-xl overflow-hidden mb-12">
                    <table class="w-full text-left">
                        <thead class="bg-slate-900 text-white">
                            <tr>
                                <th class="p-5 text-[10px] font-black uppercase tracking-widest">Description</th>
                                <th class="p-5 text-[10px] font-black uppercase tracking-widest">Qty</th>
                                <th class="p-5 text-[10px] font-black uppercase tracking-widest text-right">Unit Price</th>
                                <th class="p-5 text-[10px] font-black uppercase tracking-widest text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${r.items.map(l=>`
                                <tr>
                                    <td class="p-6">
                                        <p class="font-black text-slate-900 text-sm">${l.part_name}</p>
                                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tight">${l.brand} • ${l.machine_model}</p>
                                    </td>
                                    <td class="p-6 text-sm font-bold text-slate-600">${l.quantity}</td>
                                    <td class="p-6 text-sm font-bold text-slate-900 text-right">₹${parseFloat(l.unit_price).toLocaleString()}</td>
                                    <td class="p-6 text-sm font-black text-slate-900 text-right">₹${(l.quantity*l.unit_price).toLocaleString()}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>

                <div class="flex justify-end border-t-[3px] border-slate-900 pt-8">
                    <div class="w-72 space-y-4">
                        <div class="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                            <span>Subtotal</span>
                            <span>₹${parseFloat(r.total_amount).toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                            <span>GST (0%)</span>
                            <span>₹0.00</span>
                        </div>
                        <div class="flex justify-between items-center pt-4 border-t border-slate-100">
                            <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Total Payable</span>
                            <span class="text-3xl font-black text-slate-900">₹${parseFloat(r.total_amount).toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div class="mt-24 pt-12 border-t border-slate-100 flex justify-between items-end no-print">
                    <div class="space-y-4">
                        <h4 class="text-xs font-black text-slate-900 uppercase tracking-widest">Authorised Signatory</h4>
                        <div class="w-48 h-px bg-slate-300"></div>
                        <p class="text-[10px] font-bold text-slate-400">PARTSPRO B2B Procurement Division</p>
                    </div>
                    <div class="flex gap-4">
                        <button onclick="window.print()" class="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                            Print Document
                        </button>
                        <button onclick="document.getElementById('invoice-doc-modal').remove()" class="px-8 py-3 bg-slate-50 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">Close Viewer</button>
                    </div>
                </div>
            </div>
        </div>
    `,document.body.appendChild(s)}catch{e.showToast("Failed to load invoice details","error"),s.remove()}}async function I(t,e){if((e.state.user&&e.state.user.role?e.state.user.role.toLowerCase():"")!=="admin"){e.showToast("Administrative privileges required","error"),history.pushState(null,null,e.basePath+"/login"),e.handleRouting();return}t.innerHTML=`
        <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
            ${e.getSidebar("admin")}

            <main class="flex-1 p-8 lg:p-12 space-y-12">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h2 class="text-4xl font-black text-slate-900 tracking-tight">Executive <span class="text-blue-600">Dashboard</span></h2>
                        <p class="text-slate-500 mt-2 font-bold text-lg">Platform status and procurement oversight.</p>
                    </div>
                    <button onclick="app.printAdminReport()" class="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        Generate Report
                    </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${[{l:"Active Quotations",v:"--",id:"stat-active-quotations",c:"blue"},{l:"Total Partners",v:"--",id:"stat-total-partners",c:"indigo"},{l:"Inventory SKUs",v:"--",id:"stat-total-skus",c:"emerald"},{l:"Monthly Revenue",v:"₹0",id:"stat-revenue",c:"rose"}].map(a=>`
                        <div class="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 hover:shadow-2xl hover:shadow-blue-900/5 transition-all">
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${a.l}</p>
                            <h3 class="text-3xl font-black text-slate-900" id="${a.id}">${a.v}</h3>
                            <div class="w-full h-1 bg-${a.c}-100 rounded-full overflow-hidden">
                                <div class="w-1/3 h-full bg-${a.c}-600"></div>
                            </div>
                        </div>
                    `).join("")}
                </div>

                <div class="space-y-8">
                    <div class="flex items-center gap-4">
                        <div class="w-2 h-8 bg-blue-600 rounded-full"></div>
                        <h3 class="text-xl font-black text-slate-900 tracking-tight">Pending Procurements</h3>
                    </div>
                    <div id="admin-quotation-list" class="grid grid-cols-1 gap-4">
                        <div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>
                    </div>
                </div>
            </main>
        </div>
    `,e.loadAdminStats(),e.loadAdminQuotations()}async function L(t){try{const s=await(await fetch(t.api("api/admin_stats.php"))).json();document.getElementById("stat-active-quotations")&&(document.getElementById("stat-active-quotations").textContent=s.active_quotations),document.getElementById("stat-total-partners")&&(document.getElementById("stat-total-partners").textContent=s.total_partners),document.getElementById("stat-total-skus")&&(document.getElementById("stat-total-skus").textContent=s.total_skus),document.getElementById("stat-revenue")&&(document.getElementById("stat-revenue").textContent="₹"+parseFloat(s.total_revenue||0).toLocaleString())}catch(e){console.error("Failed to load admin stats",e)}}async function H(t){const e=document.getElementById("admin-quotation-list");if(e)try{const a=await(await fetch(t.api("api/admin_quotations.php"))).json();e.innerHTML=a.length?a.map(r=>`
            <div class="bg-white border border-slate-200 rounded-3xl p-6 flex justify-between items-center hover:shadow-xl hover:shadow-blue-900/5 transition-all">
                <div>
                    <div class="font-black text-slate-900">${r.user_name}</div>
                    <div class="text-[11px] text-slate-500 font-medium mt-1">${r.user_email} • ${new Date(r.created_at).toLocaleString()}</div>
                </div>
                <div class="flex items-center gap-6">
                    <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${t.getStatusClass(r.status)}">
                        ${r.status}
                    </span>
                    ${r.status==="pending"?`<button onclick="app.renderProcessQuotation(${r.id})" class="px-5 py-2 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">Process</button>`:""}
                    ${r.status==="approved"?`<button onclick="app.generateInvoice(${r.id})" class="px-5 py-2 rounded-xl bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all">Generate Invoice</button>`:""}
                </div>
            </div>
        `).join(""):'<div class="bg-slate-50 border border-slate-100 rounded-3xl p-12 text-center text-slate-400 font-bold">No pending requests</div>'}catch{e.innerHTML='<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load requests</div>'}}async function z(t,e){t.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const s=await fetch(e.api("api/products.php")),{products:a}=await s.json();e.state.products=a,t.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${e.getSidebar("inventory")}

                <main class="flex-1 p-8 lg:p-12 space-y-12">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h2 class="text-4xl font-black text-slate-900 tracking-tight">Inventory <span class="text-blue-600">Warehouse</span></h2>
                            <p class="text-slate-500 mt-2 font-bold text-lg">Real-time stock monitoring and fitment management.</p>
                        </div>
                        <div class="flex gap-4 no-print">
                            <button onclick="app.renderImportModal()" class="px-6 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
                                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                Bulk Import
                            </button>
                            <button onclick="app.renderAddProductForm()" class="px-6 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2 hover:-translate-y-1">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                                Add Product
                            </button>
                        </div>
                    </div>

                    <div class="bg-white rounded-[32px] border border-slate-200 p-4 flex gap-4 shadow-sm">
                        <div class="relative flex-grow">
                            <input type="text" id="inventory-search" oninput="app.filterInventory()" class="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-14 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" placeholder="Search by Part Name, Brand, or Machine Model...">
                            <svg class="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/40">
                        <table class="w-full text-left border-collapse">
                            <thead class="bg-slate-50/80 border-b border-slate-200">
                                <tr>
                                    <th class="p-6 pl-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product & Fitment</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Status</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin Cost</th>
                                    <th class="p-6 pr-8 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="inventory-table-body" class="divide-y divide-slate-100 bg-white">
                                ${a.map(r=>q(r,e)).join("")}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        `}catch{t.innerHTML='<div class="bg-rose-50 border border-rose-100 rounded-3xl p-20 text-center text-rose-500 font-bold">Error loading warehouse data.</div>'}}function D(){var s;const t=(((s=document.getElementById("inventory-search"))==null?void 0:s.value)||"").toLowerCase();document.querySelectorAll("#inventory-table-body tr").forEach(a=>{const r=a.textContent.toLowerCase();a.style.display=r.includes(t)?"":"none"})}function q(t,e){const s=(t.stock_quantity||0)<5;return`
        <tr class="hover:bg-slate-50/80 transition-all group">
            <td class="p-6 pl-8">
                <div class="flex items-center gap-5">
                    <div class="relative">
                        <img src="${e.cleanImageUrl(t.photo,t.part_name)}" class="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-sm group-hover:scale-105 transition-transform">
                        ${s?'<span class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 rounded-full border-2 border-white animate-bounce"></span>':""}
                    </div>
                    <div>
                        <span class="font-black block text-slate-900 text-sm mb-0.5">${t.part_name}</span>
                        <span class="text-[10px] text-slate-500 uppercase font-black tracking-widest bg-slate-100 px-2 py-0.5 rounded-md inline-block">${t.machine_model||"Universal"}</span>
                    </div>
                </div>
            </td>
            <td class="p-6">
                <span class="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">${t.brand}</span>
            </td>
            <td class="p-6">
                <div class="space-y-2">
                    <span class="text-[11px] font-black uppercase tracking-widest ${s?"text-rose-600":"text-emerald-600"}">${t.stock_quantity||0} Units in Reserve</span>
                    <div class="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full rounded-full ${s?"bg-gradient-to-r from-rose-500 to-rose-400":"bg-gradient-to-r from-emerald-500 to-emerald-400"}" style="width: ${Math.min((t.stock_quantity||0)*5,100)}%"></div>
                    </div>
                </div>
            </td>
            <td class="p-6 font-black text-slate-900 text-sm">₹${t.cost||"0.00"}</td>
            <td class="p-6 pr-8 text-right">
                <div class="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onclick="app.renderEditProductForm(${t.id})" class="p-3 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 hover:shadow-lg transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                    <button onclick="app.deleteProduct(${t.id})" class="p-3 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 hover:shadow-lg transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </td>
        </tr>
    `}async function R(t,e){if(!(!e.state.user||e.state.user.role!=="admin")){t.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const a=await(await fetch(e.api("api/admin_users.php"))).json();t.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${e.getSidebar("partners")}

                <main class="flex-1 p-8 lg:p-12 space-y-12">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h2 class="text-4xl font-black text-slate-900 tracking-tight">Partner <span class="text-blue-600">Management</span></h2>
                            <p class="text-slate-500 mt-2 font-bold text-lg">Manage B2B client access and custom discount tiers.</p>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/40 animate-in fade-in duration-500">
                        <table class="w-full text-left border-collapse">
                            <thead class="bg-slate-50/80 border-b border-slate-200">
                                <tr>
                                    <th class="p-6 pl-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Partner Details</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Discount Tier</th>
                                    <th class="p-6 pr-8 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 bg-white">
                                ${a.map(r=>`
                                    <tr class="hover:bg-slate-50/80 transition-all group">
                                        <td class="p-6 pl-8">
                                            <div class="flex items-center gap-4">
                                                <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl shadow-sm border border-blue-100">${r.name.charAt(0).toUpperCase()}</div>
                                                <div>
                                                    <span class="font-black block text-slate-900 text-sm mb-0.5">${r.name}</span>
                                                    <span class="text-[10px] text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-md inline-block">${r.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="p-6">
                                            <select onchange="app.updateUser(${r.id}, 'status', this.value)" class="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-black uppercase tracking-widest ${r.status==="active"?"text-emerald-600 border-emerald-200 focus:ring-emerald-500/20":r.status==="pending"?"text-amber-600 border-amber-200 focus:ring-amber-500/20":"text-rose-600 border-rose-200 focus:ring-rose-500/20"} focus:outline-none focus:ring-4 transition-all">
                                                <option value="pending" ${r.status==="pending"?"selected":""}>Pending</option>
                                                <option value="active" ${r.status==="active"?"selected":""}>Active</option>
                                                <option value="suspended" ${r.status==="suspended"?"selected":""}>Suspended</option>
                                            </select>
                                        </td>
                                        <td class="p-6">
                                            <div class="flex items-center gap-2">
                                                <input type="number" step="0.1" value="${r.discount_tier||0}" id="discount_${r.id}" class="w-20 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-black text-blue-600 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                                                <span class="text-slate-400 font-bold text-sm">%</span>
                                            </div>
                                        </td>
                                        <td class="p-6 pr-8 text-right">
                                            <button onclick="app.updateUser(${r.id}, 'discount_tier', document.getElementById('discount_${r.id}').value)" class="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-md shadow-slate-900/20">Save Tier</button>
                                        </td>
                                    </tr>
                                `).join("")}
                                ${a.length===0?'<tr><td colspan="4" class="p-8 text-center text-slate-500 font-bold">No partners found.</td></tr>':""}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        `}catch{t.innerHTML='<div class="p-20 text-center text-rose-500 font-bold">Error loading partners.</div>'}}}async function F(t,e){const s=document.createElement("div");s.id="process-modal",s.className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto";const l=(await(await fetch(e.api("api/admin_quotations.php"))).json()).find(o=>o.id==t),n=await(await fetch(e.api(`api/admin_quotations.php?id=${t}`))).json(),i=n.items,c=parseFloat(n.discount_tier||0);s.innerHTML=`
        <div class="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in duration-300 my-8">
            <div class="bg-slate-900 p-8 text-white flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-black tracking-tight">Process Quotation</h2>
                    <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Request from ${l.user_name} (#Q-${String(l.id).padStart(4,"0")})</p>
                </div>
                <button onclick="document.getElementById('process-modal').remove()" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <div class="p-8 space-y-8">
                <div class="flex flex-wrap gap-4">
                    <div class="flex-1 min-w-[200px] p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                        <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Partner Tier</p>
                        <h4 class="text-xl font-black text-slate-900">${c}% Automatic Discount</h4>
                    </div>
                    <div class="flex-1 min-w-[200px] p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Status</p>
                        <h4 class="text-xl font-black text-amber-600 uppercase">${l.status}</h4>
                    </div>
                </div>
                
                <form id="price-quotation-form" class="space-y-8">
                    <div class="border border-slate-200 rounded-2xl overflow-hidden">
                        <table class="w-full text-left">
                            <thead class="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Spare Part Detail</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">MSRP (₹)</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Final Unit Price (₹)</th>
                                    <th class="p-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                ${i.map(o=>`
                                    <tr class="group">
                                        <td class="p-6">
                                            <div class="font-bold text-slate-900">${o.part_name}</div>
                                            <div class="text-[10px] text-slate-500 uppercase font-black tracking-tighter mt-0.5">${o.brand} • ${o.machine_model}</div>
                                        </td>
                                        <td class="p-6 text-slate-600 font-black">${o.quantity}</td>
                                        <td class="p-6 text-slate-400 font-bold text-sm">₹${o.cost||"0.00"}</td>
                                        <td class="p-6">
                                            <div class="flex items-center gap-2">
                                                <input type="number" name="price_${o.id}" data-item-id="${o.id}" data-qty="${o.quantity}" data-msrp="${o.cost||0}" step="0.01" value="${o.unit_price||""}" required class="w-28 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-black text-blue-600 focus:outline-none focus:border-blue-500 transition-all unit-price-input">
                                                <button type="button" onclick="app.applyDiscountToItem(this, ${c})" class="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                                </button>
                                            </div>
                                        </td>
                                        <td class="p-6 text-right font-black text-blue-600 subtotal-cell">₹${(o.quantity*(o.unit_price||0)).toFixed(2)}</td>
                                    </tr>
                                `).join("")}
                            </tbody>
                            <tfoot class="bg-slate-50 border-t border-slate-200">
                                <tr>
                                    <td colspan="4" class="p-8 text-right font-black text-slate-400 uppercase tracking-widest text-xs">Total Quotation Value:</td>
                                    <td class="p-8 text-right font-black text-3xl text-slate-900" id="quotation-total-display">₹0.00</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    
                    <div class="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
                        <button type="button" onclick="app.applyDiscountToAll(${c})" class="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-all font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-600/20">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            Apply Partner Discount to All
                        </button>
                        <div class="flex gap-4 w-full md:w-auto">
                            <button type="button" onclick="document.getElementById('process-modal').remove()" class="px-8 py-3.5 rounded-2xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all font-black text-[11px] uppercase tracking-widest">Cancel</button>
                            <button type="submit" class="px-10 py-3.5 rounded-2xl bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-[1.02] transition-all">Publish & Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `,document.body.appendChild(s),document.querySelectorAll(".unit-price-input").forEach(o=>{o.oninput=()=>g()}),g(),document.getElementById("price-quotation-form").onsubmit=async o=>{o.preventDefault();const p=Array.from(document.querySelectorAll(".unit-price-input")).map(b=>({item_id:b.dataset.itemId,unit_price:b.value})),x=await(await fetch(e.api("api/admin_quotations.php"),{method:"PUT",body:JSON.stringify({quotation_id:t,items:p})})).json();x.success?(e.showToast("Quotation priced and sent successfully!"),s.remove(),e.loadAdminQuotations()):e.showToast(x.error,"error")}}function O(t,e){const s=t.closest(".flex").querySelector("input"),r=parseFloat(s.dataset.msrp)*(1-e/100);s.value=r.toFixed(2),g()}function N(t){document.querySelectorAll(".unit-price-input").forEach(e=>{const a=parseFloat(e.dataset.msrp)*(1-t/100);e.value=a.toFixed(2)}),g()}function g(){let t=0;document.querySelectorAll(".unit-price-input").forEach(s=>{const a=parseFloat(s.dataset.qty),r=parseFloat(s.value)||0,l=a*r,d=s.closest("tr");d&&(d.querySelector(".subtotal-cell").textContent=`₹${l.toFixed(2)}`),t+=l});const e=document.getElementById("quotation-total-display");e&&(e.textContent=`₹${t.toFixed(2)}`)}async function U(t,e){try{const a=await(await fetch(e.api("api/invoices.php"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({quotation_id:t})})).json();a.success?(e.showToast("Invoice generated successfully!"),e.loadAdminQuotations()):e.showToast(a.error,"error")}catch{e.showToast("Failed to generate invoice","error")}}async function Q(t,e,s,a){try{const r={id:t};r[e]=s;const d=await(await fetch(a.api("api/admin_users.php"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).json();d.success?a.showToast("Partner updated successfully"):a.showToast(d.error||"Update failed","error")}catch{a.showToast("Failed to update partner","error")}}async function W(t,e){if(!e.state.user||!e.state.user.role||e.state.user.role.toLowerCase()!=="admin"){e.showToast("Access restricted to administrators","error");return}t.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const a=await(await fetch(e.api("api/admin_settings.php"),{credentials:"include"})).json(),r=(i,c,o,p="text",u="",x="")=>`
            <div class="space-y-2 ${x}">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">${i}</label>
                <input type="${p}" name="${c}" value="${o||""}" placeholder="${u}"
                    class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
            </div>`,l=(i,c,o,p="")=>`
            <div class="space-y-2 ${p}">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">${i}</label>
                <textarea name="${c}" rows="3"
                    class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none">${o||""}</textarea>
            </div>`,d=(i,c,o)=>`
            <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">${i}</label>
                <div class="flex items-center gap-4">
                    <input type="file" name="${c}" accept="image/*"
                        class="flex-1 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold text-slate-500 focus:outline-none hover:border-blue-400 transition-all cursor-pointer">
                    ${o?`<img src="${e.api(o)}" class="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md flex-shrink-0">`:`<div class="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex-shrink-0 flex items-center justify-center text-slate-300">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                           </div>`}
                </div>
            </div>`,n=[{id:"general",label:"⚙️ General"},{id:"home",label:"🏠 Home Page"},{id:"brands",label:"🏷️ Brands"},{id:"categories",label:"📂 Categories"},{id:"support",label:"💬 Support"},{id:"footer",label:"📋 Footer"},{id:"system",label:"🔍 System Status"}];t.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${e.getSidebar("settings")}
                <main class="flex-1 p-6 lg:p-10 overflow-x-hidden">
                    <div class="max-w-5xl mx-auto">
                        <div class="mb-8">
                            <h2 class="text-3xl font-black text-slate-900">Website <span class="text-blue-600">Control Center</span></h2>
                            <p class="text-slate-500 font-medium mt-1">Edit every page, image, and text on your live website from here.</p>
                        </div>

                        <!-- Tab Nav -->
                        <div class="flex gap-2 mb-8 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
                            ${n.map((i,c)=>`
                                <button type="button" onclick="window.switchCMSTab('${i.id}')" id="tab-btn-${i.id}"
                                    class="cms-tab-btn flex-shrink-0 px-5 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${c===0?"bg-blue-600 text-white shadow-lg shadow-blue-600/30":"text-slate-500 hover:bg-slate-100 hover:text-slate-700"}">
                                    ${i.label}
                                </button>
                            `).join("")}
                        </div>

                        <form id="cms-form" enctype="multipart/form-data">

                            <!-- GENERAL -->
                            <div id="cms-tab-general" class="cms-tab-panel space-y-6 bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
                                <div class="pb-6 border-b border-slate-100 mb-6">
                                    <h3 class="text-xl font-black text-slate-900">General Settings</h3>
                                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Site identity, pricing & contact info</p>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    ${r("Platform / Site Name","site_name",a.site_name,"text","PARTSPRO")}
                                    ${r("Currency Symbol","currency",a.currency,"text","₹")}
                                    ${r("Tax Rate (%)","tax_percent",a.tax_percent,"number","18")}
                                    ${r("Support Email","contact_email",a.contact_email,"email","support@partspro.in")}
                                    ${r("Contact Phone","contact_phone",a.contact_phone,"text","+91 70277 51544")}
                                    ${r("WhatsApp Number (with country code)","whatsapp_number",a.whatsapp_number,"text","+917027751544")}
                                    ${r("Footer Tagline","footer_desc",a.footer_desc,"text","The premium B2B platform...")}
                                    ${l("Corporate Address","contact_address",a.contact_address,"md:col-span-2")}
                                    ${r("Copyright Text","footer_copyright",a.footer_copyright,"text","© 2026 PARTSPRO B2B Division.")}
                                </div>
                            </div>

                            <!-- HOME PAGE -->
                            <div id="cms-tab-home" class="cms-tab-panel space-y-6 hidden">
                                <div class="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                                    <div class="pb-6 border-b border-slate-100">
                                        <h3 class="text-xl font-black text-slate-900">Hero Section</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Main banner headline, subtitle, background image</p>
                                    </div>
                                    <div class="grid grid-cols-1 gap-5">
                                        ${r("Hero Headline","hero_title",a.hero_title,"text","THE RIGHT PART. EVERY TIME.")}
                                        ${l("Hero Subtitle","hero_subtitle",a.hero_subtitle)}
                                        <div class="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hero Slider Images</span>
                                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                ${d("Hero Image 1","hero_image",a.hero_image)}
                                                ${d("Hero Image 2","hero_image_2",a.hero_image_2)}
                                                ${d("Hero Image 3","hero_image_3",a.hero_image_3)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- BRANDS PAGE -->
                            <div id="cms-tab-brands" class="cms-tab-panel space-y-6 hidden">
                                <div class="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                                    <div class="pb-6 border-b border-slate-100">
                                        <h3 class="text-xl font-black text-slate-900">Brands Page</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Page heading and 6 brand cards</p>
                                    </div>
                                    <div class="grid grid-cols-1 gap-4">
                                        ${r("Page Heading","brands_title",a.brands_title,"text","Our Trusted Brands")}
                                        ${l("Page Subtitle","brands_subtitle",a.brands_subtitle)}
                                    </div>
                                    ${["Bosch","Makita","DeWalt","Hikoki","Milwaukee","Hilti"].map((i,c)=>{const o=c+1;return`
                                        <div class="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                                            <span class="inline-block px-3 py-1 rounded-lg bg-rose-100 text-rose-700 text-[10px] font-black uppercase tracking-widest">Brand ${o} — Default: ${i}</span>
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                ${r("Brand Name","brand"+o+"_name",a["brand"+o+"_name"],"text",i)}
                                                ${r("Tag / Specialty","brand"+o+"_tag",a["brand"+o+"_tag"],"text","Power Tools")}
                                                ${l("Short Description","brand"+o+"_desc",a["brand"+o+"_desc"])}
                                                ${d("Brand Logo","brand"+o+"_logo",a["brand"+o+"_logo"])}
                                            </div>
                                        </div>`}).join("")}
                                </div>
                            </div>

                            <!-- CATEGORIES PAGE -->
                            <div id="cms-tab-categories" class="cms-tab-panel space-y-6 hidden">
                                <div class="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                                    <div class="pb-6 border-b border-slate-100">
                                        <h3 class="text-xl font-black text-slate-900">Categories Page</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Page heading and 4 category cards</p>
                                    </div>
                                    <div class="grid grid-cols-1 gap-4">
                                        ${r("Page Heading","cats_page_title",a.cats_page_title,"text","Core Categories")}
                                        ${l("Page Subtitle","cats_page_subtitle",a.cats_page_subtitle)}
                                    </div>
                                    <div class="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-sm text-amber-700 font-bold">
                                        ℹ️ Category cards below are shared with the Home Page panels — editing here updates both places.
                                    </div>
                                    ${[1,2,3,4].map(i=>`
                                        <div class="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                                            <span class="inline-block px-3 py-1 rounded-lg bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest">Category ${i}</span>
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                ${r("Title","cat"+i+"_title",a["cat"+i+"_title"])}
                                                ${d("Card Image","cat"+i+"_img",a["cat"+i+"_img"])}
                                                ${l("Description","cat"+i+"_desc",a["cat"+i+"_desc"],"md:col-span-2")}
                                            </div>
                                        </div>
                                    `).join("")}
                                </div>
                            </div>

                            <!-- SUPPORT PAGE -->
                            <div id="cms-tab-support" class="cms-tab-panel space-y-6 hidden">
                                <div class="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                                    <div class="pb-6 border-b border-slate-100">
                                        <h3 class="text-xl font-black text-slate-900">Support Page</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Page heading, description and contact info cards</p>
                                    </div>
                                    <div class="grid grid-cols-1 gap-4">
                                        ${r("Page Heading","support_title",a.support_title,"text","Expert Support Center")}
                                        ${l("Page Subtitle / Description","support_subtitle",a.support_subtitle)}
                                        ${r("Form Submit Button Text","support_form_cta",a.support_form_cta,"text","Submit Technical Ticket")}
                                    </div>
                                    <div class="p-5 bg-green-50 border border-green-100 rounded-2xl space-y-4">
                                        <span class="text-xs font-black text-green-700 uppercase tracking-widest">Contact Cards (auto-pulled from General Settings)</span>
                                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            ${r("Email","contact_email",a.contact_email,"email")}
                                            ${r("Phone","contact_phone",a.contact_phone)}
                                            ${l("Address","contact_address",a.contact_address)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- FOOTER -->
                            <div id="cms-tab-footer" class="cms-tab-panel space-y-6 hidden">
                                <div class="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                                    <div class="pb-6 border-b border-slate-100">
                                        <h3 class="text-xl font-black text-slate-900">Footer Content</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Tagline, address, email and copyright text</p>
                                    </div>
                                    <div class="grid grid-cols-1 gap-4">
                                        ${r("Footer Brand Tagline","footer_desc",a.footer_desc,"text","The premium B2B platform for genuine power tool spare parts.")}
                                        ${r("Footer Email","contact_email",a.contact_email,"email")}
                                        ${l("Footer Address","contact_address",a.contact_address)}
                                        ${r("Copyright Text","footer_copyright",a.footer_copyright,"text","© 2026 PARTSPRO B2B Division. All rights reserved.")}
                                    </div>
                                </div>
                            </div>
 
                            <!-- SYSTEM STATUS -->
                            <div id="cms-tab-system" class="cms-tab-panel space-y-6 hidden bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
                                <div class="pb-6 border-b border-slate-100">
                                    <h3 class="text-xl font-black text-slate-900">Platform Diagnostics</h3>
                                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Verify live database values and system integrity</p>
                                </div>
                                <div class="bg-slate-50 rounded-2xl p-6 space-y-4">
                                    <div class="flex justify-between items-center border-b border-slate-200 pb-3">
                                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Database Key</span>
                                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Value</span>
                                    </div>
                                    <div class="space-y-3 font-mono text-xs overflow-x-auto">
                                        <div class="flex justify-between gap-4">
                                            <span class="text-blue-600 font-bold">whatsapp_number</span>
                                            <span class="text-slate-600">${a.whatsapp_number||'<span class="text-rose-500 font-bold">NOT FOUND</span>'}</span>
                                        </div>
                                        <div class="flex justify-between gap-4 border-t border-slate-100 pt-3">
                                            <span class="text-blue-600 font-bold">site_name</span>
                                            <span class="text-slate-600">${a.site_name}</span>
                                        </div>
                                        <div class="flex justify-between gap-4 border-t border-slate-100 pt-3">
                                            <span class="text-blue-600 font-bold">contact_email</span>
                                            <span class="text-slate-600">${a.contact_email}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                                    <h4 class="text-sm font-black text-blue-900 mb-2">Troubleshooting Tip</h4>
                                    <p class="text-xs text-blue-700 leading-relaxed font-medium">If "whatsapp_number" shows as <span class="text-rose-500 font-bold">NOT FOUND</span> on your live site, please click "Save All Changes" at the bottom of this page to force-sync the database registry.</p>
                                </div>
                            </div>

                            <!-- Save -->
                            <div class="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                                <button type="button" onclick="app.renderAdmin(document.getElementById('view-container'))"
                                    class="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-white border border-slate-200 transition-all">
                                    Cancel
                                </button>
                                <button type="submit" id="cms-save-btn"
                                    class="px-10 py-4 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:-translate-y-0.5 hover:bg-blue-700 transition-all flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                                    Save All Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        `,window.switchCMSTab=i=>{var o;document.querySelectorAll(".cms-tab-panel").forEach(p=>p.classList.add("hidden")),document.querySelectorAll(".cms-tab-btn").forEach(p=>{p.classList.remove("bg-blue-600","text-white","shadow-lg","shadow-blue-600/30"),p.classList.add("text-slate-500")}),(o=document.getElementById("cms-tab-"+i))==null||o.classList.remove("hidden");const c=document.getElementById("tab-btn-"+i);c&&(c.classList.add("bg-blue-600","text-white","shadow-lg","shadow-blue-600/30"),c.classList.remove("text-slate-500"))},document.getElementById("cms-form").onsubmit=async i=>{i.preventDefault();const c=document.getElementById("cms-save-btn");c.textContent="Saving…",c.disabled=!0;try{const p=await(await fetch(e.api("api/admin_settings.php"),{method:"POST",body:new FormData(i.target),credentials:"include"})).json();p.success?(e.showToast("✅ All changes saved and live!"),await e.loadSettings()):e.showToast(p.error||"Save failed","error")}catch{e.showToast("Network error","error")}finally{c.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg> Save All Changes',c.disabled=!1}}}catch(s){t.innerHTML=`<div class="bg-rose-50 p-20 text-center text-rose-500 font-bold rounded-3xl">Failed to load CMS. ${s.message}</div>`}}function V(){var s,a,r,l;const t={quotes:((s=document.getElementById("stat-active-quotations"))==null?void 0:s.textContent)||"--",partners:((a=document.getElementById("stat-total-partners"))==null?void 0:a.textContent)||"--",skus:((r=document.getElementById("stat-total-skus"))==null?void 0:r.textContent)||"--",revenue:((l=document.getElementById("stat-revenue"))==null?void 0:l.textContent)||"₹0"},e=window.open("","_blank");e.document.write(`
        <html>
            <head>
                <title>PARTSPRO - Executive Report</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
                    body { font-family: 'Outfit', sans-serif; padding: 40px; color: #1e293b; background: #f8fafc; }
                    .header { border-bottom: 3px solid #0056B3; padding-bottom: 20px; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
                    .header h1 { font-weight: 900; color: #0056B3; margin: 0 0 5px 0; font-size: 28px; }
                    .header p { margin: 0; font-size: 14px; color: #64748b; font-weight: 700; }
                    .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
                    .stat-item { padding: 25px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
                    .stat-label { font-size: 11px; font-weight: 900; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; }
                    .stat-value { font-size: 28px; font-weight: 900; margin-top: 10px; color: #0f172a; }
                    .footer { margin-top: 60px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; font-weight: 700; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div>
                        <h1>PARTSPRO</h1>
                        <p>Executive Inventory & Revenue Report</p>
                    </div>
                    <p style="font-size:11px; color:#94a3b8;">Generated on: ${new Date().toLocaleString()}</p>
                </div>
                <div class="stats-grid">
                    <div class="stat-item"><div class="stat-label">Active Quotations</div><div class="stat-value">${t.quotes}</div></div>
                    <div class="stat-item"><div class="stat-label">Total Partners</div><div class="stat-value">${t.partners}</div></div>
                    <div class="stat-item"><div class="stat-label">Inventory SKUs</div><div class="stat-value">${t.skus}</div></div>
                    <div class="stat-item"><div class="stat-label">Total Revenue</div><div class="stat-value">${t.revenue}</div></div>
                </div>
                <div class="footer">
                    &copy; 2026 PARTSPRO B2B Division. Confidential Internal Document.
                </div>
                <script>window.print(); setTimeout(() => window.close(), 1000);<\/script>
            </body>
        </html>
    `),e.document.close()}function K(t){const e=document.createElement("div");e.id="import-modal",e.className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm",e.innerHTML=`
        <div class="bg-white rounded-[32px] w-full max-w-xl p-10 space-y-8 shadow-2xl animate-in zoom-in duration-300">
            <div class="flex justify-between items-center">
                <h2 class="text-3xl font-black text-slate-900">Bulk <span class="text-blue-600">Import</span></h2>
                <button onclick="document.getElementById('import-modal').remove()" class="text-slate-400 hover:text-slate-900 transition-all">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <form id="import-form" class="space-y-6">
                <div class="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-500 transition-all cursor-pointer relative group">
                    <input type="file" name="import_csv" accept=".csv" required class="absolute inset-0 opacity-0 cursor-pointer">
                    <p class="text-slate-500 font-bold">Drop CSV file here or <span class="text-blue-600">browse</span></p>
                    <p class="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-black">Headers: Part Name, Machine Model, Brand, Cost, Stock</p>
                </div>
                <button type="submit" class="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">Process Import</button>
            </form>
        </div>
    `,document.body.appendChild(e),document.getElementById("import-form").onsubmit=s=>G(s,t)}async function G(t,e){t.preventDefault();const s=t.target.querySelector("button");s.disabled=!0,s.textContent="Importing...";const a=new FormData(t.target);try{const l=await(await fetch(e.api("api/import_products.php"),{method:"POST",body:a})).json();l.success?(e.showToast(`Imported ${l.count} products successfully`),document.getElementById("import-modal").remove(),e.renderAdminInventory(document.getElementById("view-container"))):e.showToast(l.error,"error")}catch{e.showToast("Import failed","error")}finally{s.disabled=!1,s.textContent="Process Import"}}function J(t){y(null,t)}async function Y(t,e){const s=e.state.products.find(a=>a.id==t);y(s,e)}async function y(t,e){const s=!!t,a=document.createElement("div");a.id="product-modal",a.className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto",a.innerHTML=`
        <div class="bg-white rounded-[32px] w-full max-w-3xl p-6 md:p-10 space-y-6 shadow-2xl animate-in zoom-in duration-300 my-auto max-h-[95vh] overflow-y-auto custom-scrollbar">
            <div class="flex justify-between items-center">
                <h2 class="text-3xl font-black text-slate-900">${s?"Edit":"Add New"} <span class="text-blue-600">Product</span></h2>
                <button onclick="document.getElementById('product-modal').remove()" class="text-slate-400 hover:text-slate-900 transition-all">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <form id="product-form" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                ${s?`<input type="hidden" name="id" value="${t.id}">`:""}
                <input type="hidden" name="action" value="${s?"update_product":"add_product"}">

                <!-- Spare Part Name -->
                <div class="col-span-2 space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Spare Part Name</label>
                    <div class="flex gap-2">
                        <select id="pf-partname" name="part_name_id" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                            <option value="">Select Part Name...</option>
                        </select>
                        <button type="button" onclick="window._pfAddLookup('part_name')" class="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-black text-lg hover:bg-blue-100 transition-all" title="Add new part name">+</button>
                    </div>
                </div>

                <!-- Primary Fitment Section -->
                <div class="col-span-2 pt-6 pb-2 border-t border-slate-100 mt-2">
                    <h3 class="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Primary Suitable Machine</h3>
                </div>

                <!-- Machine Brand -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Machine Brand</label>
                    <div class="flex gap-2">
                        <select id="pf-brand" name="brand_id" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                            <option value="">Select Brand...</option>
                        </select>
                        <button type="button" onclick="window._pfAddLookup('brand')" class="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-black text-lg hover:bg-blue-100 transition-all">+</button>
                    </div>
                </div>

                <!-- Machine Name -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Machine Name</label>
                    <div class="flex gap-2">
                        <select id="pf-machine" name="machine_name_id" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                            <option value="">Select Machine...</option>
                        </select>
                        <button type="button" onclick="window._pfAddLookup('machine_name')" class="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-black text-lg hover:bg-blue-100 transition-all">+</button>
                    </div>
                </div>

                <!-- Machine Model -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Machine Model</label>
                    <div class="flex gap-2">
                        <select id="pf-model" name="model_id" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                            <option value="">Select Model...</option>
                        </select>
                        <button type="button" onclick="window._pfAddLookup('model')" class="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-black text-lg hover:bg-blue-100 transition-all">+</button>
                    </div>
                </div>

                <!-- Machine Size -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Machine Size</label>
                    <div class="flex gap-2">
                        <select id="pf-size" name="machine_size_id" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                            <option value="">Select Size...</option>
                        </select>
                        <button type="button" onclick="window._pfAddLookup('machine_size')" class="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-black text-lg hover:bg-blue-100 transition-all">+</button>
                    </div>
                </div>

                <!-- Additional Machines Section -->
                <div class="col-span-2 pt-6 pb-2 border-t border-slate-100 mt-2">
                    <div class="flex justify-between items-center">
                        <h3 class="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Other Suitable Machines</h3>
                        <button type="button" onclick="window._pfAddMachineRow()" class="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">+ Add More Machine</button>
                    </div>
                    <div id="additional-machines-container" class="space-y-4 mt-4">
                        <!-- Dynamic rows here -->
                    </div>
                </div>

                <!-- Product Details -->
                <div class="col-span-2 pt-6 pb-2 border-t border-slate-100 mt-2">
                    <h3 class="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Product Details</h3>
                </div>

                <!-- Cost -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Cost (₹)</label>
                    <input type="number" step="0.01" name="cost" value="${(t==null?void 0:t.cost)||""}" placeholder="Enter Cost"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
                </div>

                <!-- Stock Quantity -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Stock Quantity</label>
                    <input type="number" name="stock_quantity" value="${(t==null?void 0:t.stock_quantity)||""}" placeholder="Enter Stock"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
                </div>

                <!-- Note -->
                <div class="col-span-2 space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Note</label>
                    <input type="text" name="note" value="${(t==null?void 0:t.note)||""}" placeholder="Technical notes or descriptions"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
                </div>

                <!-- Photo -->
                <div class="col-span-2 space-y-2 pt-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Product Photo</label>
                    <input type="file" name="photo" accept="image/*"
                        class="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100">
                </div>

                <div class="col-span-2 pt-4">
                    <button type="submit" id="pf-submit-btn"
                        class="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:scale-[1.02] transition-all">
                        Save Complete Product
                    </button>
                </div>
            </form>
        </div>
    `,document.body.appendChild(a);let r=null;fetch(e.api("api/admin_products.php?action=lookups")).then(l=>l.json()).then(l=>{r=l;const d=(n,i,c)=>{const o=document.getElementById(n);o&&i.forEach(p=>{const u=document.createElement("option");u.value=p.id,u.textContent=p.name,c&&p.id==c&&(u.selected=!0),o.appendChild(u)})};d("pf-brand",l.brands||[],t==null?void 0:t.brand_id),d("pf-machine",l.machine_names||[],t==null?void 0:t.machine_name_id),d("pf-partname",l.part_names||[],t==null?void 0:t.part_name_id),d("pf-model",l.models||[],t==null?void 0:t.model_id),d("pf-size",l.sizes||[],t==null?void 0:t.machine_size_id),s&&fetch(e.api(`api/admin_products.php?action=get_fitments&part_id=${t.id}`)).then(n=>n.json()).then(n=>{(n.fitments||[]).forEach(i=>window._pfAddMachineRow(i))})}).catch(()=>e.showToast("Could not load dropdown options","error")),window._pfAddMachineRow=(l=null)=>{const d=document.getElementById("additional-machines-container"),n=document.createElement("div");n.className="grid grid-cols-2 lg:grid-cols-4 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 relative group animate-in slide-in-from-top-2 duration-300";const i=(c,o,p)=>`
            <div class="space-y-1">
                <select name="${c}" class="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] font-bold text-slate-700 focus:outline-none focus:border-blue-500">
                    <option value="">Select...</option>
                    ${o.map(u=>`<option value="${u.id}" ${u.id==p?"selected":""}>${u.name}</option>`).join("")}
                </select>
            </div>
        `;n.innerHTML=`
            <button type="button" onclick="this.parentElement.remove()" class="absolute -right-2 -top-2 w-6 h-6 bg-white border border-slate-200 text-rose-500 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            ${i("fit_brand_id",(r==null?void 0:r.brands)||[],l==null?void 0:l.brand_id)}
            ${i("fit_machine_id",(r==null?void 0:r.machine_names)||[],l==null?void 0:l.machine_id)}
            ${i("fit_model_id",(r==null?void 0:r.models)||[],l==null?void 0:l.machine_model_id)}
            ${i("fit_size_id",(r==null?void 0:r.sizes)||[],l==null?void 0:l.machine_size_id)}
        `,d.appendChild(n)},window._pfAddLookup=async l=>{const d={brand:"Brand",machine_name:"Machine Name",part_name:"Part Name",model:"Model",machine_size:"Machine Size"},n=prompt(`Enter new ${d[l]} name:`);if(!n||!n.trim())return;const i=new FormData;i.append("action","add_lookup"),i.append("type",l),i.append("name",n.trim());try{const o=await(await fetch(e.api("api/admin_products.php"),{method:"POST",body:i})).json();if(o.success){e.showToast(`${d[l]} added!`),r=await(await fetch(e.api("api/admin_products.php?action=lookups"))).json();const u={brand:"pf-brand",machine_name:"pf-machine",part_name:"pf-partname",model:"pf-model",machine_size:"pf-size"},x=document.getElementById(u[l]);if(x){const b=document.createElement("option");b.value=o.id,b.textContent=n.trim(),b.selected=!0,x.appendChild(b)}}else e.showToast(o.error||"Failed to add","error")}catch{e.showToast("Network error","error")}},document.getElementById("product-form").onsubmit=l=>X(l,e)}async function X(t,e){t.preventDefault();const s=document.getElementById("pf-submit-btn");s.disabled=!0,s.innerHTML='<span class="animate-pulse">Saving Product...</span>';const a=new FormData(t.target),r=a.has("id");try{let l;if(r){const n={id:a.get("id"),brand_id:a.get("brand_id"),machine_name_id:a.get("machine_name_id"),part_name_id:a.get("part_name_id"),model_id:a.get("model_id"),machine_size_id:a.get("machine_size_id"),cost:a.get("cost"),note:a.get("note")};l=await fetch(e.api("api/admin_products.php"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})}else l=await fetch(e.api("api/admin_products.php"),{method:"POST",body:a});const d=await l.json();if(d.success){const n=r?a.get("id"):d.id,i=document.querySelectorAll("#additional-machines-container > div");for(const c of i){const o=c.querySelector('[name="fit_model_id"]').value,p=c.querySelector('[name="fit_size_id"]').value;if(o){const u=new FormData;u.append("action","save_fitment"),u.append("part_id",n),u.append("model_id",o),u.append("machine_size_id",p),await fetch(e.api("api/admin_products.php"),{method:"POST",body:u})}}e.showToast(`Product ${r?"updated":"created"} successfully with fitments`),document.getElementById("product-modal").remove(),e.renderAdminInventory(document.getElementById("view-container"))}else e.showToast(d.error||"Submission failed","error")}catch{e.showToast("Submission failed","error")}finally{s.disabled=!1,s.textContent="Save Complete Product"}}async function Z(t,e){if(confirm("Are you sure you want to remove this product?"))try{const a=await(await fetch(e.api(`api/admin_products.php?action=delete_product&id=${t}`),{method:"DELETE"})).json();a.success?(e.showToast("Product removed"),e.renderAdminInventory(document.getElementById("view-container"))):e.showToast(a.error,"error")}catch{e.showToast("Deletion failed","error")}}async function ee(t,e){if(!e.state.user){history.pushState(null,null,e.basePath+"/login"),e.handleRouting();return}t.innerHTML=`
        <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
            ${e.getSidebar("dashboard")}

            <main class="flex-1 p-8 lg:p-12 space-y-12">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-2 h-8 bg-blue-600 rounded-full"></div>
                            <h2 class="text-4xl font-black text-slate-900 tracking-tight">Partner <span class="text-blue-600">Portal</span></h2>
                        </div>
                        <p class="text-slate-500 font-bold text-lg">Exclusive procurement overview for ${e.state.user.name}.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${[{l:"Total Procurement",v:(e.state.settings.currency||"₹")+"0.00",s:"+0%",c:"blue"},{l:"Total Savings",v:(e.state.settings.currency||"₹")+"0.00",s:"+0%",c:"emerald"},{l:"Active Orders",v:"0",s:"- -",c:"amber"},{l:"Saved Items",v:"0",s:"- -",c:"indigo"}].map(s=>`
                        <div class="bg-white rounded-[32px] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            <div class="absolute -right-4 -top-4 w-24 h-24 bg-${s.c}-50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 relative z-10">${s.l}</p>
                            <div class="flex items-end justify-between relative z-10">
                                <h3 class="text-4xl font-black text-slate-900">${s.v}</h3>
                                <span class="text-[10px] font-black text-${s.c}-600 bg-${s.c}-50 px-3 py-1.5 rounded-xl border border-${s.c}-100 shadow-sm">${s.s}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
                
                <div class="bg-slate-900 rounded-[40px] p-12 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
                    <div class="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent"></div>
                    <div class="relative z-10 max-w-2xl">
                        <h3 class="text-3xl font-black tracking-tight mb-4">Express Bulk Ordering</h3>
                        <p class="text-slate-400 font-medium mb-8 leading-relaxed">Skip the catalog. Upload a CSV file with SKUs (Models) and Quantities to instantly generate a massive quotation cart using your exclusive tier pricing.</p>
                        <div class="flex flex-wrap gap-4">
                            <button onclick="app.renderBulkOrderModal()" class="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-white/10 hover:scale-105 transition-transform flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                Upload CSV Order
                            </button>
                            <button onclick="app.renderCatalog(document.getElementById('view-container'))" class="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-600/30 hover:scale-105 transition-transform">Browse Catalog Manually</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `,e.loadDashboardStats()}async function te(t,e){if(!e.state.user){history.pushState(null,null,e.basePath+"/login"),e.handleRouting();return}t.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{t.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${e.getSidebar("parts_list")}

                <main class="flex-1 p-8 lg:p-12">
                    <div class="max-w-6xl mx-auto space-y-12 animate-fade-in">
                        <div class="flex justify-between items-end">
                            <div>
                                <div class="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Personal Collection</div>
                                <h2 class="text-4xl font-black tracking-tight text-slate-900">My <span class="text-primary">Parts List</span></h2>
                                <p class="text-slate-500 font-medium mt-2 text-lg">Your curated selection of essential spares for quick procurement.</p>
                            </div>
                            <button onclick="app.renderCatalog(document.getElementById('view-container'))" class="px-8 py-3.5 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">Add More Spares</button>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div class="card p-8 group">
                                <div class="w-full h-48 bg-slate-50 rounded-2xl mb-6 overflow-hidden border border-slate-100 flex items-center justify-center">
                                    <svg class="w-20 h-20 text-slate-200 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                                </div>
                                <h4 class="text-lg font-black text-slate-900 mb-1">Carbon Brush GWS 600</h4>
                                <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">SKU: CB-GWS600</p>
                                <div class="flex gap-3">
                                    <button class="flex-1 h-12 rounded-xl bg-primary text-white font-black text-[10px] uppercase tracking-widest hover:bg-primary-dark transition-all">Add to Cart</button>
                                    <button class="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-all"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `}catch{e.showToast("Failed to load parts list","error")}}function se(t,e){t.innerHTML=`
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
    `,document.getElementById("login-form").onsubmit=async s=>{s.preventDefault();const a=s.target.querySelector("button");a.disabled=!0,a.innerHTML='<span class="animate-pulse">Authorizing...</span>';const r=new FormData(s.target),l=Object.fromEntries(r.entries());l.action="login";try{const n=await(await fetch(e.api("api/auth.php"),{method:"POST",body:JSON.stringify(l)})).json();n.success?(e.state.user=n.user,e.updateAuthUI(),history.pushState(null,null,e.basePath+"/dashboard"),e.handleRouting(),e.showToast(`System synchronized. Welcome, ${n.user.name}.`)):e.showToast(n.error||"Authorization failed","error")}catch{e.showToast("Authentication server offline","error")}finally{a.disabled=!1,a.innerHTML="Synchronize & Enter"}}}function ae(t,e){t.innerHTML=`
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
    `,document.getElementById("register-form").onsubmit=async s=>{s.preventDefault();const a=s.target.querySelector("button");a.disabled=!0,a.innerHTML='<span class="animate-pulse">Processing...</span>';const r=new FormData(s.target),l=Object.fromEntries(r.entries());l.action="register";try{const n=await(await fetch(e.api("api/auth.php"),{method:"POST",body:JSON.stringify(l)})).json();n.success?(e.showToast("Application submitted. We will review your account soon."),history.pushState(null,null,e.basePath+"/login"),e.handleRouting()):e.showToast(n.error||"Submission failed","error")}catch{e.showToast("Network error during submission","error")}finally{a.disabled=!1,a.innerHTML="Submit Application"}}}function re(t,e){if(e.state.cart.length===0){t.innerHTML=`
            <div class="text-center py-32 animate-in fade-in duration-500">
                <div class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                </div>
                <h2 class="text-2xl font-black text-slate-900 mb-2">Your cart is empty</h2>
                <p class="text-slate-500 font-medium mb-8">Add spare parts to your cart to request a quotation.</p>
                <a href="/catalog" data-link class="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">Browse Catalogue</a>
            </div>
        `;return}t.innerHTML=`
        <div class="max-w-4xl mx-auto py-12 px-4 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h2 class="text-3xl font-black text-slate-900 tracking-tight">Quotation Cart</h2>
                <p class="text-slate-500 mt-1 font-medium">Review and adjust items before submitting for pricing.</p>
            </div>

            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Spare Part Details</th>
                            <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</th>
                            <th class="p-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${e.state.cart.map(s=>`
                            <tr class="hover:bg-slate-50/50 transition-colors">
                                <td class="p-6">
                                    <div class="font-bold text-slate-900">${s.part_name}</div>
                                    <div class="text-xs text-slate-500 font-medium mt-0.5">${s.brand} • ${s.machine_model}</div>
                                </td>
                                <td class="p-6">
                                    <div class="flex items-center gap-3">
                                        <input type="number" min="1" value="${s.quantity}" onchange="app.updateCartQty(${s.id}, this.value)" class="w-20 h-10 bg-slate-50 border border-slate-200 rounded-lg px-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
                                        <span class="text-xs font-bold text-slate-400 uppercase">Units</span>
                                    </div>
                                </td>
                                <td class="p-6 text-right">
                                    <button onclick="app.removeFromCart(${s.id})" class="text-rose-500 hover:text-rose-600 p-2 hover:bg-rose-50 rounded-lg transition-all">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                    </button>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-slate-200">
                <div class="flex items-center gap-4 text-slate-500">
                    <svg class="w-10 h-10 text-blue-600 bg-blue-50 p-2 rounded-xl" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <div>
                        <p class="text-xs font-bold text-slate-900 uppercase">Standard Response Time: 24 Hours</p>
                        <p class="text-[11px] font-medium leading-tight">Our team will review your request and provide competitive B2B pricing via email.</p>
                    </div>
                </div>
                <button onclick="app.submitQuotation()" class="w-full md:w-auto h-16 px-12 rounded-2xl bg-blue-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all active:translate-y-0">
                    Submit RFQ Request
                </button>
            </div>
        </div>
    `}function le(t,e){const s=e.state.settings||{},a=[`<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
            <circle cx="20" cy="20" r="18" fill="#E20015"/><text x="20" y="25" text-anchor="middle" fill="white" font-size="11" font-weight="bold" font-family="Arial">b</text>
            <text x="50" y="26" fill="#1a1a1a" font-size="18" font-weight="900" font-family="Arial">BOSCH</text></svg>`,`<svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
            <rect x="0" y="8" width="26" height="26" rx="3" fill="#00ADEF"/><text x="13" y="27" text-anchor="middle" fill="white" font-size="14" font-weight="900" font-family="Arial">M</text>
            <text x="36" y="28" fill="#1a1a1a" font-size="18" font-weight="900" font-family="Arial">MAKITA</text></svg>`,`<svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
            <rect x="0" y="5" width="135" height="32" rx="4" fill="#FEBD17"/>
            <text x="68" y="27" text-anchor="middle" fill="#1a1a1a" font-size="16" font-weight="900" font-family="Arial" letter-spacing="2">DEWALT</text></svg>`,`<svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
            <rect x="0" y="5" width="32" height="32" rx="4" fill="#E30613"/><text x="16" y="27" text-anchor="middle" fill="white" font-size="13" font-weight="900" font-family="Arial">HI</text>
            <text x="42" y="28" fill="#1a1a1a" font-size="18" font-weight="900" font-family="Arial">HiKOKI</text></svg>`,`<svg viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
            <rect x="0" y="5" width="155" height="32" rx="4" fill="#E31837"/>
            <text x="78" y="27" text-anchor="middle" fill="white" font-size="13" font-weight="900" font-family="Arial" letter-spacing="1">MILWAUKEE</text></svg>`,`<svg viewBox="0 0 110 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
            <rect x="0" y="5" width="105" height="32" rx="4" fill="#E2001A"/>
            <text x="52" y="27" text-anchor="middle" fill="white" font-size="17" font-weight="900" font-family="Arial" letter-spacing="3">HILTI</text></svg>`],r=[1,2,3,4,5,6].map((l,d)=>({name:s["brand"+l+"_name"]||["BOSCH","MAKITA","DEWALT","HIKOKI","MILWAUKEE","HILTI"][d],tag:s["brand"+l+"_tag"]||"Power Tools",desc:s["brand"+l+"_desc"]||"",logo:s["brand"+l+"_logo"]||"",svg:a[d]}));t.innerHTML=`
        <div class="animate-fade-in min-h-screen bg-slate-50">
            <!-- Page Header -->
            <section class="bg-white border-b border-slate-100 py-24">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div class="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">Authorized Partners</div>
                    <h1 class="text-6xl font-black text-slate-900 tracking-tight mb-6">
                        ${s.brands_title||'Our Trusted <span class="text-primary">Brands</span>'}
                    </h1>
                    <p class="text-slate-500 font-bold text-lg max-w-2xl mx-auto">
                        ${s.brands_subtitle||"We partner exclusively with the world's most trusted power tool manufacturers to ensure every spare part meets strict industrial standards."}
                    </p>
                </div>
            </section>

            <!-- Brand Cards -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${r.map(l=>`
                        <div class="bg-white rounded-[40px] p-10 border border-slate-100 shadow-premium hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group text-center flex flex-col items-center">
                            <div class="h-20 flex items-center justify-center mb-8 transition-all duration-500 transform group-hover:scale-110">
                                ${l.logo?`<img src="${e.api(l.logo)}" alt="${l.name}" class="h-16 w-auto object-contain">`:`<div class="grayscale group-hover:grayscale-0 transition-all duration-500">${l.svg}</div>`}
                            </div>
                            <span class="px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-4">${l.tag}</span>
                            <h4 class="text-2xl font-black text-slate-900 mb-4">${l.name}</h4>
                            <p class="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-1">${l.desc}</p>
                            <a href="/catalog" data-link class="px-8 py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm w-full text-center">Explore Spares</a>
                        </div>
                    `).join("")}
                </div>
            </section>
        </div>
    `}function oe(t,e){const s=[{t:e.state.settings.cat1_title||"Electrical Spares",d:e.state.settings.cat1_desc||"Switches, Carbon Brushes, Armatures & Field Coils built for high thermal endurance.",img:e.state.settings.cat1_img||"https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800",icon:"M13 10V3L4 14h7v7l9-11h-7z"},{t:e.state.settings.cat2_title||"Mechanical Units",d:e.state.settings.cat2_desc||"Precision Gears, Bearings, Shafts & Housing Assemblies ensuring seamless kinetic transfer.",img:e.state.settings.cat2_img||"https://images.unsplash.com/photo-1530124566582-a618bc2615ad?auto=format&fit=crop&q=80&w=800",icon:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"},{t:e.state.settings.cat3_title||"Power Attachments",d:e.state.settings.cat3_desc||"Chucks, SDS Adaptors, Cutting Discs & Drill Bits engineered for brutal workloads.",img:e.state.settings.cat3_img||"https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800",icon:"M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"},{t:e.state.settings.cat4_title||"Maintenance Kits",d:e.state.settings.cat4_desc||"Complete Service Kits for Industrial Hammer Drills & Saws. Minimize your downtime.",img:e.state.settings.cat4_img||"https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?auto=format&fit=crop&q=80&w=800",icon:"M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"}];t.innerHTML=`
        <div class="animate-fade-in py-20 bg-slate-50 min-h-screen">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-24">
                    <h2 class="text-5xl font-black text-slate-900 tracking-tight mb-4">Core <span class="text-primary">Categories</span></h2>
                    <p class="text-slate-500 font-bold text-lg max-w-2xl mx-auto">Explore our extensive inventory organized by functional systems to find the exact part you need faster.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    ${s.map(a=>`
                        <div onclick="app.renderCatalog(document.getElementById('view-container'))" class="group relative h-[400px] rounded-[48px] overflow-hidden cursor-pointer shadow-premium hover:shadow-2xl transition-all duration-700">
                            <img src="${e.api(a.img)}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]">
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                            
                            <div class="absolute bottom-10 left-10 right-10 flex flex-col items-start gap-4">
                                <div class="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-2 group-hover:bg-primary transition-all duration-500 shadow-xl">
                                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="${a.icon}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </div>
                                <h4 class="text-3xl font-black text-white leading-tight">${a.t}</h4>
                                <p class="text-slate-200 font-medium text-sm leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">${a.d}</p>
                                <div class="mt-4 inline-flex items-center gap-3 text-xs font-black text-primary bg-white px-6 py-3 rounded-2xl uppercase tracking-widest shadow-xl transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                                    View Parts <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                                </div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        </div>
    `}function w(t,e){const s={email:e.state.settings.contact_email||"support@partspro.in",phone:e.state.settings.contact_phone||"+91 70277 51544",address:e.state.settings.contact_address||"Phase 2, Industrial Estate, New Delhi, IN 110020"};t.innerHTML=`
        <div class="animate-fade-in min-h-screen bg-slate-50">
            <!-- Header -->
            <section class="bg-white border-b border-slate-100 py-24">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div class="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">Connect with us</div>
                    <h2 class="text-6xl font-black text-slate-900 tracking-tight mb-6">${e.state.settings.support_title||'Expert Support <span class="text-primary">Center</span>'}</h2>
                    <p class="text-slate-500 font-bold text-lg max-w-2xl mx-auto">${e.state.settings.support_subtitle||"Need technical assistance with a part? Our specialist engineers are available 24/7 to help your business stay operational."}</p>
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
                            <p class="text-slate-500 group-hover:text-white/80 font-bold text-sm">${s.email}</p>
                        </div>

                        <div class="bg-white p-10 rounded-[40px] shadow-premium border border-slate-100 flex flex-col items-center text-center group hover:bg-emerald-600 transition-all duration-500">
                            <div class="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:text-white transition-colors shadow-inner">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </div>
                            <h4 class="text-lg font-black text-slate-900 group-hover:text-white mb-2">Technical Hotline</h4>
                            <p class="text-slate-500 group-hover:text-white/80 font-bold text-sm">${s.phone}</p>
                        </div>

                        <div class="bg-white p-10 rounded-[40px] shadow-premium border border-slate-100 flex flex-col items-center text-center group hover:bg-slate-900 transition-all duration-500">
                            <div class="w-16 h-16 rounded-3xl bg-slate-50 text-slate-900 flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:text-white transition-colors shadow-inner">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </div>
                            <h4 class="text-lg font-black text-slate-900 group-hover:text-white mb-2">Corporate Office</h4>
                            <p class="text-slate-500 group-hover:text-white/80 font-bold text-sm px-4">${s.address}</p>
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
                            <button type="submit" class="w-full py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/30 hover:bg-primary-dark hover:-translate-y-1 transition-all">${e.state.settings.support_form_cta||"Submit Technical Ticket"}</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    `,document.getElementById("support-form").onsubmit=a=>{a.preventDefault(),e.showToast("Support ticket submitted successfully. Reference: #PP-"+Math.floor(Math.random()*1e5)),a.target.reset()}}function v(t,e){const s=e.state.settings||{};t.innerHTML=`
        <div class="animate-fade-in">
            <!-- Hero Section (Reference Image 1) -->
            <section class="relative bg-white pt-20 pb-16 overflow-hidden border-b border-slate-100">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div class="flex flex-col lg:flex-row items-center gap-20">
                        <div class="flex-1 text-center lg:text-left">
                            <h1 class="text-6xl lg:text-[84px] font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
                                 ${(s.hero_title||"THE RIGHT PART. EVERY TIME.").split(".").join(".<br/>")}
                            </h1>
                            <p class="text-xl text-slate-600 mb-12 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                                ${s.hero_subtitle||"Premium B2B procurement portal for genuine power tool spare parts."}
                            </p>
                            
                            <div class="flex flex-wrap justify-center lg:justify-start gap-10 mb-16">
                                <div class="flex items-center gap-3">
                                    <div class="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg></div>
                                    <span class="text-sm font-black text-slate-800 uppercase tracking-wider">Genuine Parts</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg></div>
                                    <span class="text-sm font-black text-slate-800 uppercase tracking-wider">B2B Pricing</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg></div>
                                    <span class="text-sm font-black text-slate-800 uppercase tracking-wider">Pan India</span>
                                </div>
                            </div>

                        </div>
                        
                        <!-- Hero Slider -->
                        <div class="flex-1 relative hidden lg:block h-[650px]">
                            <div class="absolute -inset-10 bg-primary/10 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
                            
                            <!-- Slider Container -->
                            <div id="hero-slider" class="relative w-full h-full rounded-[48px] overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-all duration-700">
                                ${[s.hero_image,s.hero_image_2,s.hero_image_3].map((a,r)=>`
                                    <div class="hero-slide absolute inset-0 transition-opacity duration-1000 ${r===0?"opacity-100":"opacity-0"}" data-index="${r}">
                                        <img src="${e.api(a)||"https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000"}" 
                                             class="w-full h-full object-cover">
                                        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                                    </div>
                                `).join("")}
                            </div>

                            <!-- Floating Badge -->
                            <div class="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-6 animate-bounce z-20">
                                <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Partners</p>
                                    <p class="text-2xl font-black text-slate-900">5,000+</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Tabbed Search Module (Full Width Command Center) -->
                <div class="relative z-20 mt-12 mb-12">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,86,179,0.15)] border border-slate-100 p-2 overflow-hidden animate-slide-up">
                            <div class="flex p-1 gap-1">
                                <button class="flex-1 py-4 text-xs font-black uppercase tracking-widest text-primary bg-primary/5 rounded-2xl border border-primary/10">Search by Part</button>
                                <button class="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Search by Tool</button>
                            </div>
                            <div class="p-6 flex flex-col md:flex-row gap-4">
                                <div class="relative flex-shrink-0 w-full md:w-64">
                                    <select class="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 text-sm font-black text-slate-800 appearance-none focus:outline-none focus:border-primary transition-all">
                                        <option>SELECT BRAND</option>
                                        <option>BOSCH</option>
                                        <option>MAKITA</option>
                                        <option>DEWALT</option>
                                        <option>HIKOKI</option>
                                    </select>
                                    <div class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M19 9l-7 7-7-7"/></svg>
                                    </div>
                                </div>
                                <div class="relative flex-grow">
                                    <input type="text" placeholder="Enter Part Name, No. or Model..." class="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-14 text-sm font-bold text-slate-800 focus:outline-none focus:border-primary transition-all">
                                    <div class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                    </div>
                                </div>
                                <button class="h-14 px-12 bg-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">Find Parts</button>
                            </div>
                            <div class="px-8 pb-6 flex items-center gap-4">
                                <span class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Hot Searches:</span>
                                <div class="flex gap-4">
                                    <a href="#" class="text-[11px] font-bold text-primary hover:underline">Carbon Brush</a>
                                    <a href="#" class="text-[11px] font-bold text-primary hover:underline">Armature</a>
                                    <a href="#" class="text-[11px] font-bold text-primary hover:underline">Field Coil</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Features Section (Reference Image 2) -->
            <section class="pb-16 bg-slate-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-24">
                        <h2 class="text-4xl font-black text-slate-900 mb-4 tracking-tight">Built for Professionals.</h2>
                        <p class="text-slate-500 font-bold text-lg">Streamlining industrial spare parts procurement across India.</p>
                        <div class="w-24 h-1.5 bg-primary mx-auto rounded-full mt-8"></div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        ${[{icon:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",t:"Wide Inventory",d:"Over 15,000 SKUs from 20+ world-class brands ready to ship."},{icon:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",t:"Precision Lookup",d:"Advanced search by part number, model, or technical diagram."},{icon:"M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6 0a1 1 0 001 1h1m-6 0a1 1 0 001 1h1",t:"Bulk Processing",d:"Dedicated workflow for volume orders and recurring maintenance."},{icon:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",t:"B2B Benefits",d:"Special contract pricing, credit facility, and priority support."}].map(a=>`
                            <div class="flex flex-col items-center text-center group">
                                <div class="w-20 h-20 rounded-[28px] bg-white shadow-premium border border-slate-100 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
                                    <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="${a.icon}"/></svg>
                                </div>
                                <h4 class="text-lg font-black text-slate-900 mb-3">${a.t}</h4>
                                <p class="text-sm text-slate-500 font-medium leading-relaxed px-2">${a.d}</p>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </section>

            <!-- Shop by Category - Dynamic Accordion -->
            <section class="pb-16 bg-white relative overflow-hidden">
                <div class="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div class="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                        <div class="max-w-3xl">
                            <h2 class="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4">Shop by Core Categories.</h2>
                            <p class="text-slate-500 font-bold text-lg leading-relaxed max-w-xl">Precision-engineered spares for every industrial tool in your fleet. Hover to explore.</p>
                        </div>
                        <a href="/catalog" data-link class="inline-flex items-center gap-3 px-8 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 uppercase tracking-widest text-[10px] font-black group transition-all border border-slate-200">
                            View Entire Catalog 
                            <div class="w-6 h-6 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/20 text-white">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </a>
                    </div>
                    
                    <div class="flex flex-col md:flex-row gap-4 h-[400px] md:h-[250px] lg:h-[300px] w-full">
                        ${[{t:s.cat1_title||"Electrical Spares",d:s.cat1_desc||"Switches, Carbon Brushes, Armatures & Field Coils built for high thermal endurance.",img:e.api(s.cat1_img)||"https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800",icon:"M13 10V3L4 14h7v7l9-11h-7z"},{t:s.cat2_title||"Mechanical Units",d:s.cat2_desc||"Precision Gears, Bearings, Shafts & Housing Assemblies ensuring seamless kinetic transfer.",img:e.api(s.cat2_img)||"https://images.unsplash.com/photo-1530124566582-a618bc2615ad?auto=format&fit=crop&q=80&w=800",icon:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"},{t:s.cat3_title||"Power Attachments",d:s.cat3_desc||"Chucks, SDS Adaptors, Cutting Discs & Drill Bits engineered for brutal workloads.",img:e.api(s.cat3_img)||"https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800",icon:"M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"},{t:s.cat4_title||"Maintenance Kits",d:s.cat4_desc||"Complete Service Kits for Industrial Hammer Drills & Saws. Minimize your downtime.",img:e.api(s.cat4_img)||"https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?auto=format&fit=crop&q=80&w=800",icon:"M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"}].map(a=>`
                            <a href="/catalog" data-link class="group relative rounded-[40px] overflow-hidden bg-slate-800 flex-1 hover:flex-[3] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] flex items-end p-6 md:p-10 shadow-2xl hover:shadow-primary/20 cursor-pointer">
                                <div class="absolute inset-0">
                                    <img src="${a.img}" alt="${a.t}" class="w-full h-full object-cover opacity-50 mix-blend-overlay group-hover:scale-110 group-hover:opacity-100 transition-all duration-[1200ms] ease-out">
                                </div>
                                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-70 transition-all duration-700"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                                
                                <div class="relative z-10 w-full flex flex-col justify-end">
                                    <div class="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-6 group-hover:bg-primary group-hover:text-white group-hover:-translate-y-2 transition-all duration-500 border border-white/10 shrink-0 shadow-lg">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${a.icon}"/></svg>
                                    </div>
                                    <div class="overflow-hidden">
                                        <h4 class="text-2xl md:text-3xl font-black text-white mb-2 whitespace-nowrap transform group-hover:translate-x-2 transition-transform duration-500">${a.t}</h4>
                                        <div class="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                            <div class="overflow-hidden">
                                                <div class="transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                                    <p class="text-sm md:text-base text-slate-300 font-bold leading-relaxed pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 whitespace-normal min-w-[200px] max-w-sm">${a.d}</p>
                                                    <span class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 bg-primary/10 px-4 py-2 rounded-xl">
                                                        Explore Collection <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        `).join("")}
                    </div>
                </div>
            </section>

            <!-- Brand Strip -->
            <section class="py-12 bg-white border-y border-slate-100">
                <div class="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <span class="text-2xl font-black tracking-tighter text-slate-400">BOSCH</span>
                    <span class="text-2xl font-black tracking-tighter text-slate-400">MAKITA</span>
                    <span class="text-2xl font-black tracking-tighter text-slate-400">DEWALT</span>
                    <span class="text-2xl font-black tracking-tighter text-slate-400">HIKOKI</span>
                    <span class="text-2xl font-black tracking-tighter text-slate-400">MILWAUKEE</span>
                    <span class="text-2xl font-black tracking-tighter text-slate-400">HILTI</span>
                </div>
            </section>
        </div>
    `,setTimeout(()=>{let a=0;const r=document.querySelectorAll(".hero-slide");if(r.length<=1)return;const l=setInterval(()=>{const n=(a+1)%r.length,i=document.querySelector(`.hero-slide[data-index="${a}"]`),c=document.querySelector(`.hero-slide[data-index="${n}"]`);if(!i||!c){clearInterval(l);return}i.style.opacity="0",c.style.opacity="1",a=n},5e3),d=new MutationObserver(()=>{document.getElementById("hero-slider")||(clearInterval(l),d.disconnect())});d.observe(document.body,{childList:!0,subtree:!0})},100)}const ie={render:async t=>{window.app.state.settings,t.innerHTML=`
            <div class="bg-white min-h-screen">
                <!-- Header Section -->
                <section class="relative py-20 bg-slate-900 overflow-hidden">
                    <div class="absolute inset-0 opacity-10">
                        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,86,179,1),transparent)]"></div>
                        <div class="grid grid-cols-6 h-full">
                            ${Array(6).fill('<div class="border-r border-white/10 h-full"></div>').join("")}
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
        `}},ne={render:async t=>{const e=window.app.state.settings;t.innerHTML=`
            <div class="bg-white min-h-screen">
                <!-- Header Section -->
                <section class="relative py-20 bg-slate-900 overflow-hidden">
                    <div class="absolute inset-0 opacity-10">
                        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,179,86,1),transparent)]"></div>
                        <div class="grid grid-cols-6 h-full">
                            ${Array(6).fill('<div class="border-r border-white/10 h-full"></div>').join("")}
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
                                <a href="#" onclick="window.open('https://wa.me/${e.whatsapp_number}?text=Hello! I want to initiate a return for my order.', '_blank')" class="px-8 py-4 bg-[#25D366] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.116.554 4.183 1.604 5.999L0 24l6.162-1.616a11.803 11.803 0 005.883 1.554h.005c6.634 0 12.032-5.391 12.035-12.029a11.785 11.785 0 00-3.51-8.514z"/></svg>
                                    Chat with Returns Dept
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `}},de=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",k=de?"/spairparts":"",ce=t=>t?t.startsWith("http")?t:k+(t.startsWith("/")?"":"/")+t:"",_={state:{user:JSON.parse(localStorage.getItem("user")),cart:JSON.parse(localStorage.getItem("cart"))||[],settings:{}},basePath:k,api:ce,getSidebar(t){return $(t,this)},renderCatalog(t){return S(t,this)},renderQuotations(t){return T(t,this)},viewQuotationDetails(t){return j(t,this)},approveQuotation(t){return P(t,this)},renderInvoices(t){return A(t,this)},renderInvoiceDocument(t){return E(t,this)},renderAdmin(t){return I(t,this)},loadAdminStats(){return L(this)},loadAdminQuotations(){return H(this)},renderAdminInventory(t){return z(t,this)},filterInventory(){return D()},renderAdminUsers(t){return R(t,this)},updateUser(t,e,s){return Q(t,e,s,this)},renderProcessQuotation(t){return F(t,this)},applyDiscountToItem(t,e){return O(t,e)},applyDiscountToAll(t){return N(t)},generateInvoice(t){return U(t,this)},renderSystemSettings(){return W(document.getElementById("view-container"),this)},printAdminReport(){return V()},renderImportModal(){return K(this)},renderAddProductForm(){return J(this)},renderEditProductForm(t){return Y(t,this)},deleteProduct(t){return Z(t,this)},renderDashboard(t){return ee(t,this)},renderSupport(t){return w(t,this)},renderHome(t){return v(t,this)},renderShipping(t){return ie.render(t)},renderWarranty(t){return ne.render(t)},renderMyPartsList(t){return te(t,this)},renderLogin(t){return se(t,this)},renderRegister(t){return ae(t,this)},renderCart(t){return re(t,this)},getStatusClass(t){switch(t){case"pending":return"bg-amber-50 text-amber-600 border border-amber-200";case"priced":return"bg-blue-50 text-blue-600 border border-blue-200";case"approved":return"bg-emerald-50 text-emerald-600 border border-emerald-200";case"completed":return"bg-slate-50 text-slate-500 border border-slate-200";default:return"bg-slate-50 text-slate-400 border border-slate-100"}},cleanImageUrl(t,e){return!t||t==="null"?`https://ui-avatars.com/api/?name=${encodeURIComponent(e)}&background=f1f5f9&color=64748b&bold=true`:t.startsWith("http")?t:this.api(t)},async loadSettings(){try{const t=await fetch(this.api("api/admin_settings.php"));this.state.settings=await t.json(),this.applySettings()}catch(t){console.error("Failed to load settings",t)}},applySettings(){const t=this.state.settings;if(t){if(t.site_name&&(document.querySelectorAll(".logo-text").forEach(e=>e.textContent=t.site_name),document.title=t.site_name),t.site_logo&&document.querySelectorAll(".logo-container").forEach(e=>{e.innerHTML=`<img src="${this.api(t.site_logo)}" class="w-full h-full object-contain p-1">`,e.classList.remove("bg-primary")}),t.footer_desc){const e=document.getElementById("footer-desc");e&&(e.textContent=t.footer_desc)}if(t.contact_address){const e=document.getElementById("footer-address");e&&(e.innerHTML=t.contact_address.replace(/\n/g,"<br>"))}if(t.contact_email){const e=document.getElementById("footer-email");e&&(e.textContent=t.contact_email,e.href=`mailto:${t.contact_email}`)}if(t.whatsapp_number){console.log("Initializing WhatsApp Widget with:",t.whatsapp_number);let e=document.getElementById("whatsapp-widget");e||(e=document.createElement("div"),e.id="whatsapp-widget",e.className="whatsapp-widget no-print",document.body.appendChild(e));const s=t.whatsapp_number.replace(/\D/g,"");e.innerHTML=`
                <div class="whatsapp-tooltip">
                    Order via WhatsApp
                </div>
                <div class="whatsapp-btn" onclick="window.open('https://wa.me/${s}?text=Hello! I am interested in ordering spare parts.', '_blank')">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.116.554 4.183 1.604 5.999L0 24l6.162-1.616a11.803 11.803 0 005.883 1.554h.005c6.634 0 12.032-5.391 12.035-12.029a11.785 11.785 0 00-3.51-8.514z"/></svg>
                </div>
            `}else console.warn("WhatsApp Widget skipped: whatsapp_number is missing in settings.")}},updateAuthUI(){const t=document.getElementById("auth-nav");if(this.state.user){localStorage.setItem("user",JSON.stringify(this.state.user));const e=this.state.user.role&&this.state.user.role.toLowerCase()==="admin";t.innerHTML=`
                <div class="flex items-center gap-6">
                    <div class="hidden md:block text-right">
                        <p class="text-xs font-black text-slate-900">${this.state.user.name}</p>
                    </div>
                    <div class="flex gap-2">
                        ${e?`
                            <a href="/admin" data-link class="px-6 py-3.5 rounded-2xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-2">
                                <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>
                                Admin Panel
                            </a>
                        `:`
                            <a href="/dashboard" data-link class="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-slate-900/20 group">
                                <svg class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </a>
                        `}
                        <a href="/logout" data-link class="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all border border-rose-100 group" title="Logout">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        </a>
                    </div>
                </div>
            `}else localStorage.removeItem("user"),t.innerHTML=`
                <a href="/login" data-link class="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/20">Partner Login</a>
            `},handleRouting(){const t=window.location.pathname,e=(this.basePath?t.replace(this.basePath,""):t)||"/",s=document.getElementById("view-container");e==="/"?v(s,this):e==="/catalog"?this.renderCatalog(s):e==="/dashboard"?this.renderDashboard(s):e==="/admin"?this.renderAdmin(s):e==="/admin/inventory"?this.renderAdminInventory(s):e==="/admin/partners"?this.renderAdminUsers(s):e==="/quotations"?this.renderQuotations(s):e==="/login"?this.renderLogin(s):e==="/register"?this.renderRegister(s):e==="/invoices"?this.renderInvoices(s):e==="/cart"?this.renderCart(s):e==="/brands"?le(s,this):e==="/categories"?oe(s,this):e==="/support"?w(s,this):e==="/shipping"?this.renderShipping(s):e==="/warranty"?this.renderWarranty(s):e==="/logout"?(this.state.user=null,this.updateAuthUI(),history.pushState(null,null,this.basePath+"/"),this.handleRouting()):v(s,this),document.querySelectorAll(".nav-link, .mobile-nav-item").forEach(a=>{const r=a.getAttribute("href");a.classList.toggle("active",r===e)}),window.scrollTo({top:0,behavior:"smooth"}),this.animatePageEntry()},showToast(t,e="success"){const s=document.getElementById("toast-container");if(!s)return;const a=document.createElement("div");a.className=`toast ${e}`;const r=e==="error"?'<svg style="width:16px;height:16px;color:#ef4444;flex-shrink:0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>':'<svg style="width:16px;height:16px;color:#10b981;flex-shrink:0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';a.innerHTML=`${r}<span>${t}</span><button onclick="this.parentElement.remove()" style="margin-left:auto;color:#64748b;background:none;border:none;cursor:pointer;font-size:16px">✕</button>`,s.appendChild(a),setTimeout(()=>{a.style.opacity="0",a.style.transform="translateX(20px)",a.style.transition="all 0.3s ease",setTimeout(()=>a.remove(),300)},4e3)},animatePageEntry(){const t=document.getElementById("view-container");t&&(t.style.opacity="0",t.style.transform="translateY(16px)",t.style.transition="opacity 0.4s ease, transform 0.4s ease",requestAnimationFrame(()=>{requestAnimationFrame(()=>{t.style.opacity="1",t.style.transform="translateY(0)"})}))},async init(){try{const e=await(await fetch(this.api("api/auth.php"),{method:"POST",body:JSON.stringify({action:"check"}),headers:{"Content-Type":"application/json"},credentials:"include"})).json();e.logged_in?(this.state.user=e.user,localStorage.setItem("user",JSON.stringify(e.user))):(this.state.user=null,localStorage.removeItem("user"))}catch(t){console.error("Session check failed",t)}await this.loadSettings(),this.updateAuthUI(),this.handleRouting(),document.addEventListener("click",t=>{const e=t.target.closest("[data-link]");if(e){t.preventDefault();const s=e.getAttribute("href");history.pushState(null,null,this.basePath+s),this.handleRouting()}}),window.addEventListener("popstate",()=>this.handleRouting())}};_.init();window.app=_;
