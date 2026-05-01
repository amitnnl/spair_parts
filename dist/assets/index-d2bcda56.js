(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();function k(e,t){const s=t.state.user&&t.state.user.role&&t.state.user.role.toLowerCase()==="admin";return`
        <aside class="w-full lg:w-72 bg-[#fdfdfd] border-r border-slate-200 flex flex-col sticky top-20 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            <!-- User Status Card -->
            <div class="p-8 border-b border-slate-100 bg-slate-50/30">
                <div class="flex items-center gap-4 mb-6">
                    <div class="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-lg shadow-primary/20">
                        ${(t.state.user?t.state.user.name:"Guest Partner").charAt(0)}
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
                        ${p("/catalog","Spare Parts","M4 6h16M4 10h16M4 14h16M4 18h16",e==="catalog")}
                        ${p("/dashboard","Operational Overview","M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",e==="dashboard")}
                    </nav>
                </div>

                <div class="space-y-2">
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-4 opacity-60">Transactions</p>
                    <nav class="space-y-1.5">
                        ${p("/quotations","Active Quotations","M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",e==="quotations")}
                        ${p("/invoices","Financial Records","M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",e==="invoices")}
                    </nav>
                </div>

                ${s?`
                    <div class="space-y-2 pt-8 border-t border-slate-100">
                        <p class="text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-4 ml-4 font-poppins">Administrative Console</p>
                        <nav class="space-y-1.5">
                            ${p("/admin","Executive Insights","M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",e==="admin","slate")}
                            <button onclick="app.renderAdminInventory(document.getElementById('view-container'))" class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl ${e==="inventory"?"bg-slate-900 text-white shadow-xl shadow-slate-900/20":"text-slate-500 hover:bg-slate-50 hover:text-slate-900"} transition-all font-bold text-xs group">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                                <span class="group-hover:translate-x-1 transition-transform">Inventory Systems</span>
                            </button>
                            <button onclick="app.renderAdminUsers(document.getElementById('view-container'))" class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl ${e==="partners"?"bg-slate-900 text-white shadow-xl shadow-slate-900/20":"text-slate-500 hover:bg-slate-50 hover:text-slate-900"} transition-all font-bold text-xs group">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                                <span class="group-hover:translate-x-1 transition-transform">Global Partners</span>
                            </button>
                            <button onclick="app.renderSystemSettings()" class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl ${e==="settings"?"bg-slate-900 text-white shadow-xl shadow-slate-900/20":"text-slate-500 hover:bg-slate-50 hover:text-slate-900"} transition-all font-bold text-xs group">
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
    `}function p(e,t,s,a,o="blue"){return`
        <a href="${e}" data-link class="flex items-center gap-4 px-4 py-3.5 rounded-2xl ${a?o==="blue"?"bg-blue-600 text-white shadow-xl shadow-blue-600/20":"bg-slate-900 text-white shadow-xl shadow-slate-900/20":"text-slate-500 hover:bg-slate-50 hover:text-slate-900"} transition-all font-bold text-[11px] uppercase tracking-tight group">
            <svg class="w-4 h-4 ${a?"":"group-hover:scale-110"} transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="${a?"2.5":"2"}">
                <path stroke-linecap="round" stroke-linejoin="round" d="${s}"/>
            </svg>
            <span class="${a?"":"group-hover:translate-x-1"} transition-transform">${t}</span>
        </a>
    `}const n={user:null,cart:[],products:[],quotations:[],invoices:[],view:"home",isLoading:!1,settings:{site_name:"PARTSPRO",currency:"₹",tax_percent:"18"}};async function $(e,t){e.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const a=await(await fetch(t.api("api/products.php"))).json();n.products=a.products,n.brands=a.brands,n.models=a.models,e.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${t.getSidebar("catalog")}
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
        `,M(a.products,document.getElementById("catalog-content"),t)}catch{e.innerHTML='<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load products.</div>'}}function M(e,t,s){t.innerHTML=`
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
                        ${(n.brands||[]).map(o=>`<option value="${o}">${o}</option>`).join("")}
                    </select>
                    <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg></div>
                </div>
                <div class="relative">
                    <select id="model-filter" class="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-blue-500 transition-all cursor-pointer uppercase tracking-widest">
                        <option value="">Filter by Model</option>
                        ${(n.models||[]).map(o=>`<option value="${o}">${o}</option>`).join("")}
                    </select>
                    <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg></div>
                </div>
            </div>
        </div>

        <div id="catalog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            ${h()}
        </div>
    `;const a=()=>{document.getElementById("catalog-grid").innerHTML=h()};document.getElementById("catalog-search").oninput=a,document.getElementById("brand-filter").onchange=a,document.getElementById("model-filter").onchange=a}function h(){var o,r,l;const e=((o=document.getElementById("catalog-search"))==null?void 0:o.value.toLowerCase())||"",t=((r=document.getElementById("brand-filter"))==null?void 0:r.value)||"",s=((l=document.getElementById("model-filter"))==null?void 0:l.value)||"",a=(n.products||[]).filter(i=>{const x=i.part_name.toLowerCase().includes(e)||i.machine_model&&i.machine_model.toLowerCase().includes(e)||i.brand&&i.brand.toLowerCase().includes(e),c=!t||i.brand===t,d=!s||i.machine_model===s||i.other_fitments&&i.other_fitments.includes(s);return x&&c&&d});return a.length===0?`
            <div class="col-span-full py-20 text-center animate-in fade-in duration-500">
                <h3 class="text-xl font-bold text-slate-400">No parts found</h3>
            </div>
        `:a.map(i=>S(i)).join("")}function S(e){return`
        <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 animate-in zoom-in duration-700">
            <div class="relative h-64 bg-slate-50 overflow-hidden">
                <img src="${C(e.photo,e.part_name)}" class="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700">
                <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 bg-white/90 backdrop-blur shadow-sm border border-slate-100 text-[10px] font-black uppercase tracking-widest text-blue-600 rounded-lg">${e.brand}</span>
                </div>
            </div>
            <div class="p-8">
                <div class="mb-6">
                    <h4 class="font-black text-lg text-slate-900 leading-tight mb-1">${e.part_name}</h4>
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fits: ${e.machine_model||"Universal"}</span>
                    </div>
                </div>
                
                <div class="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div>
                        <span class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">B2B Pricing</span>
                        <span class="text-sm font-bold text-slate-900">RFQ Required</span>
                    </div>
                    <button onclick="app.addToCart(${e.id})" class="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                    </button>
                </div>
            </div>
        </div>
    `}function C(e,t="Part"){return e?e.replace("via.placeholder.com","placehold.co"):`https://placehold.co/600x600/0f172a/6366f1?text=${encodeURIComponent(t)}`}async function B(e,t){if(!t.state.user){history.pushState(null,null,t.basePath+"/login"),t.handleRouting();return}e.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const a=await(await fetch(t.api("api/quotations.php"))).json();e.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${t.getSidebar("quotations")}
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
                                    ${a.length?a.map(o=>`
                                        <tr class="hover:bg-slate-50 transition-all">
                                            <td class="p-6">
                                                <div class="font-bold text-slate-900">#Q-${String(o.id).padStart(4,"0")}</div>
                                                <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">${new Date(o.created_at).toLocaleDateString()}</div>
                                            </td>
                                            <td class="p-6 font-bold text-slate-600">${o.item_count||0} Products</td>
                                            <td class="p-6">
                                                <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${t.getStatusClass(o.status)}">
                                                    ${o.status}
                                                </span>
                                            </td>
                                            <td class="p-6 font-black text-slate-900">
                                                ${o.status==="pending"?'<span class="text-slate-400 font-bold italic">Awaiting Pricing</span>':`₹${parseFloat(o.total_amount||0).toLocaleString()}`}
                                            </td>
                                            <td class="p-6 text-right">
                                                <div class="flex justify-end gap-3">
                                                    <button onclick="app.viewQuotationDetails(${o.id})" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-slate-200 transition-all">View</button>
                                                    ${o.status==="priced"?`<button onclick="app.approveQuotation(${o.id})" class="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">Approve</button>`:""}
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
        `}catch{e.innerHTML='<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load quotations.</div>'}}async function j(e,t){const s=document.createElement("div");s.id="quotation-modal",s.className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto";try{const o=await(await fetch(t.api(`api/quotations.php?id=${e}`))).json();s.innerHTML=`
            <div class="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in duration-300 my-8">
                <div class="p-10 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h2 class="text-2xl font-black text-slate-900">Quotation Details</h2>
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">#Q-${String(e).padStart(4,"0")} • Requested on ${new Date(o.created_at).toLocaleDateString()}</p>
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
                                ${o.items.map(r=>`
                                    <tr>
                                        <td class="p-6">
                                            <div class="font-bold text-slate-900">${r.part_name}</div>
                                            <div class="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-0.5">${r.brand} • ${r.machine_model}</div>
                                        </td>
                                        <td class="p-6 text-sm font-bold text-slate-600">${r.quantity}</td>
                                        <td class="p-6 text-sm font-black text-slate-900 text-right">${r.unit_price?`₹${parseFloat(r.unit_price).toLocaleString()}`:'<span class="text-slate-400 italic">Pending</span>'}</td>
                                        <td class="p-6 text-sm font-black text-slate-900 text-right">${r.unit_price?`₹${(r.quantity*r.unit_price).toLocaleString()}`:"---"}</td>
                                    </tr>
                                `).join("")}
                            </tbody>
                            ${o.total_amount?`
                                <tfoot class="bg-slate-50 font-black">
                                    <tr>
                                        <td colspan="3" class="p-6 text-right text-slate-400 uppercase tracking-widest text-xs">Total Amount</td>
                                        <td class="p-6 text-right text-2xl text-slate-900">₹${parseFloat(o.total_amount).toLocaleString()}</td>
                                    </tr>
                                </tfoot>
                            `:""}
                        </table>
                    </div>
                    
                    <div class="flex justify-end gap-4">
                        <button onclick="document.getElementById('quotation-modal').remove()" class="px-8 py-4 rounded-2xl border border-slate-200 text-slate-400 font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all">Close Details</button>
                        ${o.status==="priced"?`<button onclick="app.approveQuotation(${e})" class="px-10 py-4 rounded-2xl bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">Approve & Order</button>`:""}
                    </div>
                </div>
            </div>
        `,document.body.appendChild(s)}catch{t.showToast("Failed to load quotation details","error")}}async function _(e,t){try{if((await(await fetch(t.api("api/quotations.php"),{method:"PUT",body:JSON.stringify({quotation_id:e,status:"approved"})})).json()).success){t.showToast("Quotation approved. We will generate your invoice shortly.");const o=document.getElementById("quotation-modal");o&&o.remove(),t.renderQuotations(document.getElementById("view-container"))}}catch{t.showToast("Error approving quotation","error")}}async function T(e,t){if(!t.state.user){history.pushState(null,null,t.basePath+"/login"),t.handleRouting();return}e.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const a=await(await fetch(t.api("api/invoices.php"))).json();e.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${t.getSidebar("invoices")}
                <main class="flex-1 p-8 lg:p-12">
                    <div class="max-w-6xl mx-auto space-y-12 animate-fade-in">
                        <div>
                            <div class="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Financial Records</div>
                            <h2 class="text-4xl font-black tracking-tight text-slate-900">Your <span class="text-emerald-600">Invoices</span></h2>
                            <p class="text-slate-500 font-medium mt-2">Official tax invoices for your approved procurement requests.</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            ${a.length?a.map(o=>`
                                <div class="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 group">
                                    <div class="flex justify-between items-start">
                                        <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">${new Date(o.created_at).toLocaleDateString()}</p>
                                            <p class="text-sm font-black text-slate-900">${o.invoice_number}</p>
                                        </div>
                                    </div>
                                    <div class="space-y-4 pt-6 border-t border-slate-100">
                                        <div class="flex justify-between items-center">
                                            <span class="text-xs font-bold text-slate-400">Total Amount</span>
                                            <span class="text-xl font-black text-slate-900">₹${parseFloat(o.total_amount).toLocaleString()}</span>
                                        </div>
                                        <button onclick="app.renderInvoiceDocument(${o.id})" class="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/20">Download PDF</button>
                                    </div>
                                </div>
                            `).join(""):`
                                <div class="col-span-full bg-slate-50 border border-slate-100 rounded-3xl p-20 text-center text-slate-400 font-bold">No invoices generated yet.</div>
                            `}
                        </div>
                    </div>
                </main>
            </div>
        `}catch{e.innerHTML='<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load invoices.</div>'}}async function P(e,t){const s=document.createElement("div");s.id="invoice-doc-modal",s.className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-lg overflow-y-auto";try{const o=await(await fetch(t.api(`api/invoices.php?id=${e}`))).json();s.innerHTML=`
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
                        <p class="text-sm font-black text-slate-900">NO: ${o.invoice_number}</p>
                        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-widest pt-2">Date: ${new Date(o.created_at).toLocaleDateString()}</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-16 py-16">
                    <div>
                        <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Billed To:</p>
                        <div class="space-y-1">
                            <h3 class="text-xl font-black text-slate-900">${o.user_name}</h3>
                            <p class="text-sm font-medium text-slate-500">${o.user_email}</p>
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
                            ${o.items.map(r=>`
                                <tr>
                                    <td class="p-6">
                                        <p class="font-black text-slate-900 text-sm">${r.part_name}</p>
                                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tight">${r.brand} • ${r.machine_model}</p>
                                    </td>
                                    <td class="p-6 text-sm font-bold text-slate-600">${r.quantity}</td>
                                    <td class="p-6 text-sm font-bold text-slate-900 text-right">₹${parseFloat(r.unit_price).toLocaleString()}</td>
                                    <td class="p-6 text-sm font-black text-slate-900 text-right">₹${(r.quantity*r.unit_price).toLocaleString()}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>

                <div class="flex justify-end border-t-[3px] border-slate-900 pt-8">
                    <div class="w-72 space-y-4">
                        <div class="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                            <span>Subtotal</span>
                            <span>₹${parseFloat(o.total_amount).toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                            <span>GST (0%)</span>
                            <span>₹0.00</span>
                        </div>
                        <div class="flex justify-between items-center pt-4 border-t border-slate-100">
                            <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Total Payable</span>
                            <span class="text-3xl font-black text-slate-900">₹${parseFloat(o.total_amount).toLocaleString()}</span>
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
    `,document.body.appendChild(s)}catch{t.showToast("Failed to load invoice details","error"),s.remove()}}async function L(e,t){if((t.state.user&&t.state.user.role?t.state.user.role.toLowerCase():"")!=="admin"){t.showToast("Administrative privileges required","error"),history.pushState(null,null,t.basePath+"/login"),t.handleRouting();return}e.innerHTML=`
        <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
            ${t.getSidebar("admin")}

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
    `,t.loadAdminStats(),t.loadAdminQuotations()}async function I(e){try{const s=await(await fetch(e.api("api/admin_stats.php"))).json();document.getElementById("stat-active-quotations")&&(document.getElementById("stat-active-quotations").textContent=s.active_quotations),document.getElementById("stat-total-partners")&&(document.getElementById("stat-total-partners").textContent=s.total_partners),document.getElementById("stat-total-skus")&&(document.getElementById("stat-total-skus").textContent=s.total_skus),document.getElementById("stat-revenue")&&(document.getElementById("stat-revenue").textContent="₹"+parseFloat(s.total_revenue||0).toLocaleString())}catch(t){console.error("Failed to load admin stats",t)}}async function A(e){const t=document.getElementById("admin-quotation-list");if(t)try{const a=await(await fetch(e.api("api/admin_quotations.php"))).json();t.innerHTML=a.length?a.map(o=>`
            <div class="bg-white border border-slate-200 rounded-3xl p-6 flex justify-between items-center hover:shadow-xl hover:shadow-blue-900/5 transition-all">
                <div>
                    <div class="font-black text-slate-900">${o.user_name}</div>
                    <div class="text-[11px] text-slate-500 font-medium mt-1">${o.user_email} • ${new Date(o.created_at).toLocaleString()}</div>
                </div>
                <div class="flex items-center gap-6">
                    <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${e.getStatusClass(o.status)}">
                        ${o.status}
                    </span>
                    ${o.status==="pending"?`<button onclick="app.renderProcessQuotation(${o.id})" class="px-5 py-2 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">Process</button>`:""}
                    ${o.status==="approved"?`<button onclick="app.generateInvoice(${o.id})" class="px-5 py-2 rounded-xl bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all">Generate Invoice</button>`:""}
                </div>
            </div>
        `).join(""):'<div class="bg-slate-50 border border-slate-100 rounded-3xl p-12 text-center text-slate-400 font-bold">No pending requests</div>'}catch{t.innerHTML='<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load requests</div>'}}async function E(e,t){e.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const s=await fetch(t.api("api/products.php")),{products:a}=await s.json();t.state.products=a,e.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${t.getSidebar("inventory")}

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
                                ${a.map(o=>q(o,t)).join("")}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        `}catch{e.innerHTML='<div class="bg-rose-50 border border-rose-100 rounded-3xl p-20 text-center text-rose-500 font-bold">Error loading warehouse data.</div>'}}function H(){var s;const e=(((s=document.getElementById("inventory-search"))==null?void 0:s.value)||"").toLowerCase();document.querySelectorAll("#inventory-table-body tr").forEach(a=>{const o=a.textContent.toLowerCase();a.style.display=o.includes(e)?"":"none"})}function q(e,t){const s=(e.stock_quantity||0)<5;return`
        <tr class="hover:bg-slate-50/80 transition-all group">
            <td class="p-6 pl-8">
                <div class="flex items-center gap-5">
                    <div class="relative">
                        <img src="${t.cleanImageUrl(e.photo,e.part_name)}" class="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-sm group-hover:scale-105 transition-transform">
                        ${s?'<span class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 rounded-full border-2 border-white animate-bounce"></span>':""}
                    </div>
                    <div>
                        <span class="font-black block text-slate-900 text-sm mb-0.5">${e.part_name}</span>
                        <span class="text-[10px] text-slate-500 uppercase font-black tracking-widest bg-slate-100 px-2 py-0.5 rounded-md inline-block">${e.machine_model||"Universal"}</span>
                    </div>
                </div>
            </td>
            <td class="p-6">
                <span class="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">${e.brand}</span>
            </td>
            <td class="p-6">
                <div class="space-y-2">
                    <span class="text-[11px] font-black uppercase tracking-widest ${s?"text-rose-600":"text-emerald-600"}">${e.stock_quantity||0} Units in Reserve</span>
                    <div class="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full rounded-full ${s?"bg-gradient-to-r from-rose-500 to-rose-400":"bg-gradient-to-r from-emerald-500 to-emerald-400"}" style="width: ${Math.min((e.stock_quantity||0)*5,100)}%"></div>
                    </div>
                </div>
            </td>
            <td class="p-6 font-black text-slate-900 text-sm">₹${e.cost||"0.00"}</td>
            <td class="p-6 pr-8 text-right">
                <div class="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onclick="app.renderEditProductForm(${e.id})" class="p-3 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 hover:shadow-lg transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                    <button onclick="app.deleteProduct(${e.id})" class="p-3 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 hover:shadow-lg transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </td>
        </tr>
    `}async function D(e,t){if(!(!t.state.user||t.state.user.role!=="admin")){e.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const a=await(await fetch(t.api("api/admin_users.php"))).json();e.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${t.getSidebar("partners")}

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
                                ${a.map(o=>`
                                    <tr class="hover:bg-slate-50/80 transition-all group">
                                        <td class="p-6 pl-8">
                                            <div class="flex items-center gap-4">
                                                <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl shadow-sm border border-blue-100">${o.name.charAt(0).toUpperCase()}</div>
                                                <div>
                                                    <span class="font-black block text-slate-900 text-sm mb-0.5">${o.name}</span>
                                                    <span class="text-[10px] text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-md inline-block">${o.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="p-6">
                                            <select onchange="app.updateUser(${o.id}, 'status', this.value)" class="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-black uppercase tracking-widest ${o.status==="active"?"text-emerald-600 border-emerald-200 focus:ring-emerald-500/20":o.status==="pending"?"text-amber-600 border-amber-200 focus:ring-amber-500/20":"text-rose-600 border-rose-200 focus:ring-rose-500/20"} focus:outline-none focus:ring-4 transition-all">
                                                <option value="pending" ${o.status==="pending"?"selected":""}>Pending</option>
                                                <option value="active" ${o.status==="active"?"selected":""}>Active</option>
                                                <option value="suspended" ${o.status==="suspended"?"selected":""}>Suspended</option>
                                            </select>
                                        </td>
                                        <td class="p-6">
                                            <div class="flex items-center gap-2">
                                                <input type="number" step="0.1" value="${o.discount_tier||0}" id="discount_${o.id}" class="w-20 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-black text-blue-600 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                                                <span class="text-slate-400 font-bold text-sm">%</span>
                                            </div>
                                        </td>
                                        <td class="p-6 pr-8 text-right">
                                            <button onclick="app.updateUser(${o.id}, 'discount_tier', document.getElementById('discount_${o.id}').value)" class="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-md shadow-slate-900/20">Save Tier</button>
                                        </td>
                                    </tr>
                                `).join("")}
                                ${a.length===0?'<tr><td colspan="4" class="p-8 text-center text-slate-500 font-bold">No partners found.</td></tr>':""}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        `}catch{e.innerHTML='<div class="p-20 text-center text-rose-500 font-bold">Error loading partners.</div>'}}}async function z(e,t){const s=document.createElement("div");s.id="process-modal",s.className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto";const r=(await(await fetch(t.api("api/admin_quotations.php"))).json()).find(d=>d.id==e),i=await(await fetch(t.api(`api/admin_quotations.php?id=${e}`))).json(),x=i.items,c=parseFloat(i.discount_tier||0);s.innerHTML=`
        <div class="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in duration-300 my-8">
            <div class="bg-slate-900 p-8 text-white flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-black tracking-tight">Process Quotation</h2>
                    <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Request from ${r.user_name} (#Q-${String(r.id).padStart(4,"0")})</p>
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
                        <h4 class="text-xl font-black text-amber-600 uppercase">${r.status}</h4>
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
                                ${x.map(d=>`
                                    <tr class="group">
                                        <td class="p-6">
                                            <div class="font-bold text-slate-900">${d.part_name}</div>
                                            <div class="text-[10px] text-slate-500 uppercase font-black tracking-tighter mt-0.5">${d.brand} • ${d.machine_model}</div>
                                        </td>
                                        <td class="p-6 text-slate-600 font-black">${d.quantity}</td>
                                        <td class="p-6 text-slate-400 font-bold text-sm">₹${d.cost||"0.00"}</td>
                                        <td class="p-6">
                                            <div class="flex items-center gap-2">
                                                <input type="number" name="price_${d.id}" data-item-id="${d.id}" data-qty="${d.quantity}" data-msrp="${d.cost||0}" step="0.01" value="${d.unit_price||""}" required class="w-28 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-black text-blue-600 focus:outline-none focus:border-blue-500 transition-all unit-price-input">
                                                <button type="button" onclick="app.applyDiscountToItem(this, ${c})" class="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                                </button>
                                            </div>
                                        </td>
                                        <td class="p-6 text-right font-black text-blue-600 subtotal-cell">₹${(d.quantity*(d.unit_price||0)).toFixed(2)}</td>
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
    `,document.body.appendChild(s),document.querySelectorAll(".unit-price-input").forEach(d=>{d.oninput=()=>u()}),u(),document.getElementById("price-quotation-form").onsubmit=async d=>{d.preventDefault();const y=Array.from(document.querySelectorAll(".unit-price-input")).map(m=>({item_id:m.dataset.itemId,unit_price:m.value})),b=await(await fetch(t.api("api/admin_quotations.php"),{method:"PUT",body:JSON.stringify({quotation_id:e,items:y})})).json();b.success?(t.showToast("Quotation priced and sent successfully!"),s.remove(),t.loadAdminQuotations()):t.showToast(b.error,"error")}}function R(e,t){const s=e.closest(".flex").querySelector("input"),o=parseFloat(s.dataset.msrp)*(1-t/100);s.value=o.toFixed(2),u()}function F(e){document.querySelectorAll(".unit-price-input").forEach(t=>{const a=parseFloat(t.dataset.msrp)*(1-e/100);t.value=a.toFixed(2)}),u()}function u(){let e=0;document.querySelectorAll(".unit-price-input").forEach(s=>{const a=parseFloat(s.dataset.qty),o=parseFloat(s.value)||0,r=a*o,l=s.closest("tr");l&&(l.querySelector(".subtotal-cell").textContent=`₹${r.toFixed(2)}`),e+=r});const t=document.getElementById("quotation-total-display");t&&(t.textContent=`₹${e.toFixed(2)}`)}async function O(e,t){try{const a=await(await fetch(t.api("api/invoices.php"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({quotation_id:e})})).json();a.success?(t.showToast("Invoice generated successfully!"),t.loadAdminQuotations()):t.showToast(a.error,"error")}catch{t.showToast("Failed to generate invoice","error")}}async function N(e,t,s,a){try{const o={id:e};o[t]=s;const l=await(await fetch(a.api("api/admin_users.php"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})).json();l.success?a.showToast("Partner updated successfully"):a.showToast(l.error||"Update failed","error")}catch{a.showToast("Failed to update partner","error")}}async function Q(e,t){if(!t.state.user||t.state.user.role!=="admin"){t.showToast("Access restricted to administrators","error");return}e.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const a=await(await fetch(t.api("api/admin_settings.php"))).json();e.innerHTML=`
            <div class="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
                <div>
                    <h2 class="text-4xl font-black tracking-tight text-slate-900">System <span class="text-blue-600">Core</span></h2>
                    <p class="text-slate-500 font-medium mt-2">Global configuration for the PARTSPRO ecosystem.</p>
                </div>

                <div class="bg-white rounded-[40px] p-8 md:p-14 shadow-2xl shadow-slate-200/50 border border-slate-100">
                    <form id="settings-form" class="space-y-16">
                        <div class="space-y-8">
                            <div class="flex items-center gap-4 border-b border-slate-100 pb-6">
                                <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-black text-slate-900 tracking-tight">General Setup</h3>
                                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Core platform identity & financials</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Platform Name</label>
                                    <input type="text" name="site_name" value="${a.site_name||"PARTSPRO Portal"}" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Site Logo URL</label>
                                    <input type="text" name="site_logo" value="${a.site_logo||""}" placeholder="Leave empty for default SVG" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Currency Symbol</label>
                                    <input type="text" name="currency" value="${a.currency||"₹"}" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Tax Percentage (%)</label>
                                    <input type="number" name="tax_percent" value="${a.tax_percent||""}" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
                                </div>
                                <div class="space-y-2 md:col-span-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Hero Main Title</label>
                                    <input type="text" name="hero_title" value="${a.hero_title||"Industrial Spares."}" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-lg font-black text-slate-900 focus:outline-none focus:border-indigo-500 transition-all">
                                </div>
                                <div class="space-y-2 md:col-span-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Hero Subtitle</label>
                                    <textarea name="hero_subtitle" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-indigo-500 transition-all h-24 resize-none">${a.hero_subtitle||"Authorized source for genuine industrial spare parts and technical components."}</textarea>
                                </div>
                                <div class="space-y-2 md:col-span-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Hero Section Image</label>
                                    <div class="flex items-center gap-4">
                                        <input type="file" name="hero_image" accept="image/*" class="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
                                        ${a.hero_image?`<img src="${t.api(a.hero_image)}" class="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm">`:""}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Contact & Support Info -->
                        <div class="bg-white rounded-[40px] p-10 border border-slate-100 shadow-premium mb-8">
                            <div class="flex items-center gap-4 mb-8">
                                <div class="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                </div>
                                <div>
                                    <h4 class="text-xl font-black text-slate-900 tracking-tight">Contact & Support Center</h4>
                                    <p class="text-slate-400 text-sm font-bold">Manage global contact details used across the platform.</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Support Email</label>
                                    <input type="email" name="contact_email" value="${a.contact_email||"support@partspro.in"}" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-rose-500 transition-all">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Technical Hotline</label>
                                    <input type="text" name="contact_phone" value="${a.contact_phone||"+91 70277 51544"}" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-rose-500 transition-all">
                                </div>
                                <div class="space-y-2 md:col-span-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Corporate Address</label>
                                    <textarea name="contact_address" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-rose-500 transition-all h-20 resize-none">${a.contact_address||""}</textarea>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-8">
                            <div class="flex items-center gap-4 border-b border-slate-100 pb-6">
                                <div class="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-black text-slate-900 tracking-tight">Contact Details</h3>
                                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Official communication channels</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Support Email</label>
                                    <input type="email" name="contact_email" value="${a.contact_email||""}" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Contact Phone</label>
                                    <input type="text" name="contact_phone" value="${a.contact_phone||""}" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all">
                                </div>
                                <div class="space-y-2 md:col-span-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Office Address</label>
                                    <textarea name="contact_address" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all h-28 resize-none">${a.contact_address||""}</textarea>
                                </div>
                            </div>
                        </div>

                        <!-- Home Page Categories -->
                        <div class="space-y-12">
                            <div class="flex items-center gap-4 border-b border-slate-100 pb-6">
                                <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-black text-slate-900 tracking-tight">Home Page Categories</h3>
                                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Featured collections on storefront</p>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 gap-12">
                                ${[1,2,3,4].map(o=>`
                                    <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-6">
                                        <h4 class="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Featured Category 0${o}</h4>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div class="space-y-2">
                                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Title</label>
                                                <input type="text" name="cat${o}_title" value="${a["cat"+o+"_title"]||""}" class="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-emerald-500 transition-all">
                                            </div>
                                            <div class="space-y-2">
                                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Background Image Upload</label>
                                                <div class="flex items-center gap-3">
                                                    <input type="file" name="cat${o}_img" accept="image/*" class="flex-1 bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-emerald-500 transition-all">
                                                    ${a["cat"+o+"_img"]?`<img src="${t.api(a["cat"+o+"_img"])}" class="w-10 h-10 rounded-lg object-cover shadow-sm">`:""}
                                                </div>
                                            </div>
                                            <div class="space-y-2 md:col-span-2">
                                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Marketing Description</label>
                                                <textarea name="cat${o}_desc" class="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-emerald-500 transition-all h-20 resize-none">${a["cat"+o+"_desc"]||""}</textarea>
                                            </div>
                                        </div>
                                    </div>
                                `).join("")}
                            </div>
                        </div>

                        <div class="pt-8 mt-12 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-4">
                            <button type="button" onclick="app.renderAdmin(document.getElementById('view-container'))" class="px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200">Cancel</button>
                            <button type="submit" class="px-10 py-5 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/30 transition-all">Save Global Settings</button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.getElementById("settings-form").onsubmit=async o=>{o.preventDefault();const r=new FormData(o.target);(await(await fetch(t.api("api/admin_settings.php"),{method:"POST",body:r})).json()).success&&(t.showToast("System configuration synchronized successfully."),await t.loadSettings(),t.renderAdmin(e))}}catch{e.innerHTML='<div class="bg-rose-50 p-20 text-center text-rose-500 font-bold rounded-3xl">Failed to load system settings.</div>'}}function U(){var s,a,o,r;const e={quotes:((s=document.getElementById("stat-active-quotations"))==null?void 0:s.textContent)||"--",partners:((a=document.getElementById("stat-total-partners"))==null?void 0:a.textContent)||"--",skus:((o=document.getElementById("stat-total-skus"))==null?void 0:o.textContent)||"--",revenue:((r=document.getElementById("stat-revenue"))==null?void 0:r.textContent)||"₹0"},t=window.open("","_blank");t.document.write(`
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
                    <div class="stat-item"><div class="stat-label">Active Quotations</div><div class="stat-value">${e.quotes}</div></div>
                    <div class="stat-item"><div class="stat-label">Total Partners</div><div class="stat-value">${e.partners}</div></div>
                    <div class="stat-item"><div class="stat-label">Inventory SKUs</div><div class="stat-value">${e.skus}</div></div>
                    <div class="stat-item"><div class="stat-label">Total Revenue</div><div class="stat-value">${e.revenue}</div></div>
                </div>
                <div class="footer">
                    &copy; 2026 PARTSPRO B2B Division. Confidential Internal Document.
                </div>
                <script>window.print(); setTimeout(() => window.close(), 1000);<\/script>
            </body>
        </html>
    `),t.document.close()}function V(e){const t=document.createElement("div");t.id="import-modal",t.className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm",t.innerHTML=`
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
    `,document.body.appendChild(t),document.getElementById("import-form").onsubmit=s=>W(s,e)}async function W(e,t){e.preventDefault();const s=e.target.querySelector("button");s.disabled=!0,s.textContent="Importing...";const a=new FormData(e.target);try{const r=await(await fetch(t.api("api/import_products.php"),{method:"POST",body:a})).json();r.success?(t.showToast(`Imported ${r.count} products successfully`),document.getElementById("import-modal").remove(),t.renderAdminInventory(document.getElementById("view-container"))):t.showToast(r.error,"error")}catch{t.showToast("Import failed","error")}finally{s.disabled=!1,s.textContent="Process Import"}}function K(e){g(null,e)}async function G(e,t){const s=t.state.products.find(a=>a.id==e);g(s,t)}function g(e,t){const s=!!e,a=document.createElement("div");a.id="product-modal",a.className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto",a.innerHTML=`
        <div class="bg-white rounded-[32px] w-full max-w-2xl p-10 space-y-8 shadow-2xl animate-in zoom-in duration-300 my-8">
            <div class="flex justify-between items-center">
                <h2 class="text-3xl font-black text-slate-900">${s?"Edit":"Add New"} <span class="text-blue-600">Product</span></h2>
                <button onclick="document.getElementById('product-modal').remove()" class="text-slate-400 hover:text-slate-900 transition-all">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <form id="product-form" class="grid grid-cols-2 gap-6">
                ${s?`<input type="hidden" name="id" value="${e.id}">`:""}
                <div class="col-span-2 space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Part Name</label>
                    <input type="text" name="part_name" value="${(e==null?void 0:e.part_name)||""}" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-500">
                </div>
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Machine Model</label>
                    <input type="text" name="machine_model" value="${(e==null?void 0:e.machine_model)||""}" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-500">
                </div>
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Brand</label>
                    <input type="text" name="brand" value="${(e==null?void 0:e.brand)||""}" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-500">
                </div>
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Cost (₹)</label>
                    <input type="number" step="0.01" name="cost" value="${(e==null?void 0:e.cost)||""}" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-500">
                </div>
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Stock Quantity</label>
                    <input type="number" name="stock_quantity" value="${(e==null?void 0:e.stock_quantity)||""}" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-500">
                </div>
                <div class="col-span-2 space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Photo</label>
                    <input type="file" name="photo" class="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100">
                </div>
                <button type="submit" class="col-span-2 py-4 rounded-2xl bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-[1.02] transition-all mt-4">${s?"Update":"Create"} Product</button>
            </form>
        </div>
    `,document.body.appendChild(a),document.getElementById("product-form").onsubmit=o=>J(o,t)}async function J(e,t){e.preventDefault();const s=e.target.querySelector("button");s.disabled=!0;const a=new FormData(e.target),o=a.has("id");try{const l=await(await fetch(t.api("api/products.php"),{method:"POST",body:a})).json();l.success?(t.showToast(`Product ${o?"updated":"created"} successfully`),document.getElementById("product-modal").remove(),t.renderAdminInventory(document.getElementById("view-container"))):t.showToast(l.error,"error")}catch{t.showToast("Submission failed","error")}finally{s.disabled=!1}}async function Y(e,t){if(confirm("Are you sure you want to remove this product?"))try{const a=await(await fetch(t.api(`api/products.php?id=${e}`),{method:"DELETE"})).json();a.success?(t.showToast("Product removed"),t.renderAdminInventory(document.getElementById("view-container"))):t.showToast(a.error,"error")}catch{t.showToast("Deletion failed","error")}}async function X(e,t){if(!t.state.user){history.pushState(null,null,t.basePath+"/login"),t.handleRouting();return}e.innerHTML=`
        <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
            ${t.getSidebar("dashboard")}

            <main class="flex-1 p-8 lg:p-12 space-y-12">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-2 h-8 bg-blue-600 rounded-full"></div>
                            <h2 class="text-4xl font-black text-slate-900 tracking-tight">Partner <span class="text-blue-600">Portal</span></h2>
                        </div>
                        <p class="text-slate-500 font-bold text-lg">Exclusive procurement overview for ${t.state.user.name}.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${[{l:"Total Procurement",v:(t.state.settings.currency||"₹")+"0.00",s:"+0%",c:"blue"},{l:"Total Savings",v:(t.state.settings.currency||"₹")+"0.00",s:"+0%",c:"emerald"},{l:"Active Orders",v:"0",s:"- -",c:"amber"},{l:"Saved Items",v:"0",s:"- -",c:"indigo"}].map(s=>`
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
    `,t.loadDashboardStats()}async function Z(e){try{const s=await(await fetch(e.api("api/dashboard_stats.php"))).json(),a=document.querySelectorAll("main h3");if(a.length>=4){const o=e.state.settings.currency||"₹";a[0].textContent=o+parseFloat(s.total_procured||0).toLocaleString(),a[1].textContent=o+parseFloat(s.total_savings||0).toLocaleString(),a[2].textContent=s.active_orders||0,a[3].textContent=s.saved_items||0}}catch(t){console.error("Failed to load dashboard stats",t)}}function tt(e){const t=document.createElement("div");t.id="bulk-order-modal",t.className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300",t.innerHTML=`
        <div class="bg-white rounded-[32px] w-full max-w-xl p-10 space-y-8 shadow-2xl shadow-blue-900/20 relative animate-in zoom-in-95 duration-300">
            <button onclick="document.getElementById('bulk-order-modal').remove()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-all text-slate-400 hover:text-slate-900">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div>
                <h2 class="text-3xl font-black text-slate-900 tracking-tight">Express <span class="text-blue-600">Bulk Order</span></h2>
                <p class="text-slate-500 font-bold mt-2">Upload your inventory request instantly.</p>
            </div>
            
            <div class="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-3">
                <p class="text-xs text-blue-600 font-black uppercase tracking-widest">CSV Format Requirement:</p>
                <p class="text-[11px] font-bold text-slate-500">Your CSV must contain these exact column headers:</p>
                <code class="text-[10px] text-blue-800 block bg-blue-100/50 p-4 rounded-xl font-mono shadow-inner border border-blue-200/50">Model/SKU, Quantity</code>
            </div>

            <form id="bulk-order-form" class="space-y-6">
                <div class="border-[3px] border-dashed border-slate-200 rounded-[24px] p-12 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer relative group">
                    <input type="file" name="order_csv" accept=".csv" required class="absolute inset-0 opacity-0 cursor-pointer z-10" onchange="document.getElementById('csv-filename').textContent = this.files[0] ? this.files[0].name : 'Drop your CSV file here or browse'">
                    <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all text-blue-500">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <p id="csv-filename" class="text-sm text-slate-500 font-black">Drop your CSV file here or <span class="text-blue-600 underline">browse</span></p>
                </div>
                <button type="submit" class="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:scale-[1.02] transition-all">Generate Quotation Cart</button>
            </form>
        </div>
    `,document.body.appendChild(t),document.getElementById("bulk-order-form").onsubmit=async s=>{s.preventDefault();const a=s.target.querySelector("button");a.disabled=!0,a.innerHTML='<span class="animate-pulse">Processing Order...</span>';const o=new FormData(s.target);try{const l=await(await fetch(e.api("api/bulk_order.php"),{method:"POST",body:o})).json();l.success?(e.showToast(`Success! ${l.count} items added to your cart.`),t.remove(),e.state.cart=l.cart,e.renderCart(document.getElementById("view-container"))):e.showToast(l.error,"error")}catch{e.showToast("Bulk order failed. Check CSV format.","error")}finally{a.disabled=!1,a.innerHTML="Generate Quotation Cart"}}}async function et(e,t){if(!t.state.user){history.pushState(null,null,t.basePath+"/login"),t.handleRouting();return}e.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{e.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${t.getSidebar("parts_list")}

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
        `}catch{t.showToast("Failed to load parts list","error")}}function st(e,t){e.innerHTML=`
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
    `,document.getElementById("login-form").onsubmit=async s=>{s.preventDefault();const a=s.target.querySelector("button");a.disabled=!0,a.innerHTML='<span class="animate-pulse">Authorizing...</span>';const o=new FormData(s.target),r=Object.fromEntries(o.entries());r.action="login";try{const i=await(await fetch(t.api("api/auth.php"),{method:"POST",body:JSON.stringify(r)})).json();i.success?(t.state.user=i.user,t.updateAuthUI(),history.pushState(null,null,t.basePath+"/dashboard"),t.handleRouting(),t.showToast(`System synchronized. Welcome, ${i.user.name}.`)):t.showToast(i.error||"Authorization failed","error")}catch{t.showToast("Authentication server offline","error")}finally{a.disabled=!1,a.innerHTML="Synchronize & Enter"}}}function at(e,t){e.innerHTML=`
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
    `,document.getElementById("register-form").onsubmit=async s=>{s.preventDefault();const a=s.target.querySelector("button");a.disabled=!0,a.innerHTML='<span class="animate-pulse">Processing...</span>';const o=new FormData(s.target),r=Object.fromEntries(o.entries());r.action="register";try{const i=await(await fetch(t.api("api/auth.php"),{method:"POST",body:JSON.stringify(r)})).json();i.success?(t.showToast("Application submitted. We will review your account soon."),history.pushState(null,null,t.basePath+"/login"),t.handleRouting()):t.showToast(i.error||"Submission failed","error")}catch{t.showToast("Network error during submission","error")}finally{a.disabled=!1,a.innerHTML="Submit Application"}}}function ot(e,t){if(t.state.cart.length===0){e.innerHTML=`
            <div class="text-center py-32 animate-in fade-in duration-500">
                <div class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                </div>
                <h2 class="text-2xl font-black text-slate-900 mb-2">Your cart is empty</h2>
                <p class="text-slate-500 font-medium mb-8">Add spare parts to your cart to request a quotation.</p>
                <a href="/catalog" data-link class="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">Browse Catalogue</a>
            </div>
        `;return}e.innerHTML=`
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
                        ${t.state.cart.map(s=>`
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
    `}function rt(e,t){const s=[{name:"BOSCH",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Bosch-logo.svg/1280px-Bosch-logo.svg.png",desc:"World leader in professional power tools and accessories."},{name:"MAKITA",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Makita_logo.svg/1280px-Makita_logo.svg.png",desc:"Innovation and quality in cordless tool technology."},{name:"DEWALT",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/DeWalt_logo.svg/1280px-DeWalt_logo.svg.png",desc:"Guaranteed Tough. Heavy-duty industrial power tools."},{name:"HIKOKI",image:"https://www.hikoki-powertools.com/common/img/logo_hikoki.png",desc:"High-performance power tools for extreme professional use."},{name:"MILWAUKEE",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Milwaukee_Tool_Logo.svg/1280px-Milwaukee_Tool_Logo.svg.png",desc:"Nothing but Heavy Duty. Leading industry innovation."},{name:"HILTI",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Hilti_logo.svg/1280px-Hilti_logo.svg.png",desc:"Specialized solutions for construction professionals."}];e.innerHTML=`
        <div class="animate-fade-in py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-20">
                    <h2 class="text-5xl font-black text-slate-900 tracking-tight mb-4">Authorized <span class="text-primary">Brands</span></h2>
                    <p class="text-slate-500 font-bold text-lg max-w-2xl mx-auto">We partner with the world's most trusted manufacturers to ensure every spare part meets strict industrial standards.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${s.map(a=>`
                        <div class="bg-white rounded-[40px] p-10 border border-slate-100 shadow-premium hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group text-center flex flex-col items-center">
                            <div class="h-20 flex items-center justify-center mb-10 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                                <img src="${a.image}" alt="${a.name}" class="max-h-full max-w-[200px] object-contain">
                            </div>
                            <h4 class="text-2xl font-black text-slate-900 mb-4">${a.name}</h4>
                            <p class="text-sm text-slate-500 font-medium leading-relaxed mb-8">${a.desc}</p>
                            <button onclick="app.renderCatalog(document.getElementById('view-container'))" class="px-8 py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm">Explore Spares</button>
                        </div>
                    `).join("")}
                </div>
            </div>
        </div>
    `}function lt(e,t){const s=[{t:t.state.settings.cat1_title||"Electrical Spares",d:t.state.settings.cat1_desc||"Switches, Carbon Brushes, Armatures & Field Coils built for high thermal endurance.",img:t.state.settings.cat1_img||"https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800",icon:"M13 10V3L4 14h7v7l9-11h-7z"},{t:t.state.settings.cat2_title||"Mechanical Units",d:t.state.settings.cat2_desc||"Precision Gears, Bearings, Shafts & Housing Assemblies ensuring seamless kinetic transfer.",img:t.state.settings.cat2_img||"https://images.unsplash.com/photo-1530124566582-a618bc2615ad?auto=format&fit=crop&q=80&w=800",icon:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"},{t:t.state.settings.cat3_title||"Power Attachments",d:t.state.settings.cat3_desc||"Chucks, SDS Adaptors, Cutting Discs & Drill Bits engineered for brutal workloads.",img:t.state.settings.cat3_img||"https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800",icon:"M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"},{t:t.state.settings.cat4_title||"Maintenance Kits",d:t.state.settings.cat4_desc||"Complete Service Kits for Industrial Hammer Drills & Saws. Minimize your downtime.",img:t.state.settings.cat4_img||"https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?auto=format&fit=crop&q=80&w=800",icon:"M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"}];e.innerHTML=`
        <div class="animate-fade-in py-20 bg-slate-50 min-h-screen">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-24">
                    <h2 class="text-5xl font-black text-slate-900 tracking-tight mb-4">Core <span class="text-primary">Categories</span></h2>
                    <p class="text-slate-500 font-bold text-lg max-w-2xl mx-auto">Explore our extensive inventory organized by functional systems to find the exact part you need faster.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    ${s.map(a=>`
                        <div onclick="app.renderCatalog(document.getElementById('view-container'))" class="group relative h-[400px] rounded-[48px] overflow-hidden cursor-pointer shadow-premium hover:shadow-2xl transition-all duration-700">
                            <img src="${t.api(a.img)}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]">
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
    `}function it(e,t){const s={email:t.state.settings.contact_email||"support@partspro.in",phone:t.state.settings.contact_phone||"+91 70277 51544",address:t.state.settings.contact_address||"Phase 2, Industrial Estate, New Delhi, IN 110020"};e.innerHTML=`
        <div class="animate-fade-in min-h-screen bg-slate-50">
            <!-- Header -->
            <section class="bg-white border-b border-slate-100 py-24">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div class="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">Connect with us</div>
                    <h2 class="text-6xl font-black text-slate-900 tracking-tight mb-6">Expert Support <span class="text-primary">Center</span></h2>
                    <p class="text-slate-500 font-bold text-lg max-w-2xl mx-auto">Need technical assistance with a part? Our specialist engineers are available 24/7 to help your business stay operational.</p>
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
                            <button type="submit" class="w-full py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/30 hover:bg-primary-dark hover:-translate-y-1 transition-all">Submit Technical Ticket</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    `,document.getElementById("support-form").onsubmit=a=>{a.preventDefault(),t.showToast("Support ticket submitted successfully. Reference: #PP-"+Math.floor(Math.random()*1e5)),a.target.reset()}}function v(e){e.innerHTML=`
        <div class="animate-fade-in">
            <!-- Hero Section (Reference Image 1) -->
            <section class="relative bg-white pt-20 pb-32 overflow-hidden border-b border-slate-100">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div class="flex flex-col lg:flex-row items-center gap-20">
                        <div class="flex-1 text-center lg:text-left">
                            <h1 class="text-6xl lg:text-[84px] font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
                                ${(n.settings.hero_title||"THE RIGHT PART. EVERY TIME.").split(".").join(".<br/>")}
                            </h1>
                            <p class="text-xl text-slate-600 mb-12 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                                ${n.settings.hero_subtitle||"Premium B2B procurement portal for genuine power tool spare parts."}
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
                        
                        <!-- Hero Image -->
                        <div class="flex-1 relative hidden lg:block">
                            <div class="absolute -inset-10 bg-primary/10 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
                            <div class="relative rounded-[48px] overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-all duration-700 h-[650px]">
                                <img src="${app.api(n.settings.hero_image)||"https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000"}" alt="Industrial Parts" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                            </div>
                            <div class="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-6 animate-bounce">
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
                        ${[{icon:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",t:"Wide Inventory",d:"Over 15,000 SKUs from 20+ world-class brands ready to ship."},{icon:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",t:"Precision Lookup",d:"Advanced search by part number, model, or technical diagram."},{icon:"M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6 0a1 1 0 001 1h1m-6 0a1 1 0 001 1h1",t:"Bulk Processing",d:"Dedicated workflow for volume orders and recurring maintenance."},{icon:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",t:"B2B Benefits",d:"Special contract pricing, credit facility, and priority support."}].map(t=>`
                            <div class="flex flex-col items-center text-center group">
                                <div class="w-20 h-20 rounded-[28px] bg-white shadow-premium border border-slate-100 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
                                    <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="${t.icon}"/></svg>
                                </div>
                                <h4 class="text-lg font-black text-slate-900 mb-3">${t.t}</h4>
                                <p class="text-sm text-slate-500 font-medium leading-relaxed px-2">${t.d}</p>
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
                        ${[{t:n.settings.cat1_title||"Electrical Spares",d:n.settings.cat1_desc||"Switches, Carbon Brushes, Armatures & Field Coils built for high thermal endurance.",img:n.settings.cat1_img||"https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800",icon:"M13 10V3L4 14h7v7l9-11h-7z"},{t:n.settings.cat2_title||"Mechanical Units",d:n.settings.cat2_desc||"Precision Gears, Bearings, Shafts & Housing Assemblies ensuring seamless kinetic transfer.",img:n.settings.cat2_img||"https://images.unsplash.com/photo-1530124566582-a618bc2615ad?auto=format&fit=crop&q=80&w=800",icon:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"},{t:n.settings.cat3_title||"Power Attachments",d:n.settings.cat3_desc||"Chucks, SDS Adaptors, Cutting Discs & Drill Bits engineered for brutal workloads.",img:n.settings.cat3_img||"https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800",icon:"M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"},{t:n.settings.cat4_title||"Maintenance Kits",d:n.settings.cat4_desc||"Complete Service Kits for Industrial Hammer Drills & Saws. Minimize your downtime.",img:n.settings.cat4_img||"https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?auto=format&fit=crop&q=80&w=800",icon:"M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"}].map(t=>`
                            <a href="/catalog" data-link class="group relative rounded-[40px] overflow-hidden bg-slate-800 flex-1 hover:flex-[3] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] flex items-end p-6 md:p-10 shadow-2xl hover:shadow-primary/20 cursor-pointer">
                                <div class="absolute inset-0">
                                    <img src="${t.img}" alt="${t.t}" class="w-full h-full object-cover opacity-50 mix-blend-overlay group-hover:scale-110 group-hover:opacity-100 transition-all duration-[1200ms] ease-out">
                                </div>
                                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-70 transition-all duration-700"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                                
                                <div class="relative z-10 w-full flex flex-col justify-end">
                                    <div class="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-6 group-hover:bg-primary group-hover:text-white group-hover:-translate-y-2 transition-all duration-500 border border-white/10 shrink-0 shadow-lg">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${t.icon}"/></svg>
                                    </div>
                                    <div class="overflow-hidden">
                                        <h4 class="text-2xl md:text-3xl font-black text-white mb-2 whitespace-nowrap transform group-hover:translate-x-2 transition-transform duration-500">${t.t}</h4>
                                        <div class="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                            <div class="overflow-hidden">
                                                <div class="transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                                    <p class="text-sm md:text-base text-slate-300 font-bold leading-relaxed pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 whitespace-normal min-w-[200px] max-w-sm">${t.d}</p>
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
    `}const nt=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",f=nt?"/spairparts":"",dt=e=>e?e.startsWith("http")?e:f+(e.startsWith("/")?"":"/")+e:"",w={state:{user:JSON.parse(localStorage.getItem("user")),cart:JSON.parse(localStorage.getItem("cart"))||[],settings:{}},basePath:f,api:dt,getSidebar(e){return k(e,this)},renderCatalog(e){return $(e,this)},renderQuotations(e){return B(e,this)},viewQuotationDetails(e){return j(e,this)},approveQuotation(e){return _(e,this)},renderInvoices(e){return T(e,this)},renderInvoiceDocument(e){return P(e,this)},renderAdmin(e){return L(e,this)},loadAdminStats(){return I(this)},loadAdminQuotations(){return A(this)},renderAdminInventory(e){return E(e,this)},filterInventory(){return H()},renderAdminUsers(e){return D(e,this)},updateUser(e,t,s){return N(e,t,s,this)},renderProcessQuotation(e){return z(e,this)},applyDiscountToItem(e,t){return R(e,t)},applyDiscountToAll(e){return F(e)},generateInvoice(e){return O(e,this)},renderSystemSettings(){return Q(document.getElementById("view-container"),this)},printAdminReport(){return U()},renderImportModal(){return V(this)},renderAddProductForm(){return K(this)},renderEditProductForm(e){return G(e,this)},deleteProduct(e){return Y(e,this)},renderDashboard(e){return X(e,this)},loadDashboardStats(){return Z(this)},renderBulkOrderModal(){return tt(this)},renderMyPartsList(e){return et(e,this)},renderLogin(e){return st(e,this)},renderRegister(e){return at(e,this)},renderCart(e){return ot(e,this)},getStatusClass(e){switch(e){case"pending":return"bg-amber-50 text-amber-600 border border-amber-200";case"priced":return"bg-blue-50 text-blue-600 border border-blue-200";case"approved":return"bg-emerald-50 text-emerald-600 border border-emerald-200";case"completed":return"bg-slate-50 text-slate-500 border border-slate-200";default:return"bg-slate-50 text-slate-400 border border-slate-100"}},cleanImageUrl(e,t){return!e||e==="null"?`https://ui-avatars.com/api/?name=${encodeURIComponent(t)}&background=f1f5f9&color=64748b&bold=true`:e.startsWith("http")?e:this.api(e)},async loadSettings(){try{const e=await fetch(this.api("api/admin_settings.php"));this.state.settings=await e.json()}catch(e){console.error("Failed to load settings",e)}},updateAuthUI(){const e=document.getElementById("auth-nav");if(this.state.user){localStorage.setItem("user",JSON.stringify(this.state.user));const t=this.state.user.role&&this.state.user.role.toLowerCase()==="admin";e.innerHTML=`
                <div class="flex items-center gap-6">
                    <div class="hidden md:block text-right">
                        <p class="text-xs font-black text-slate-900">${this.state.user.name}</p>
                    </div>
                    <div class="flex gap-2">
                        ${t?`
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
            `}else localStorage.removeItem("user"),e.innerHTML=`
                <a href="/login" data-link class="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/20">Partner Login</a>
            `},handleRouting(){const e=window.location.pathname,t=(this.basePath?e.replace(this.basePath,""):e)||"/",s=document.getElementById("view-container");t==="/"?v(s):t==="/catalog"?this.renderCatalog(s):t==="/dashboard"?this.renderDashboard(s):t==="/admin"?this.renderAdmin(s):t==="/admin/inventory"?this.renderAdminInventory(s):t==="/admin/partners"?this.renderAdminUsers(s):t==="/quotations"?this.renderQuotations(s):t==="/login"?this.renderLogin(s):t==="/register"?this.renderRegister(s):t==="/invoices"?this.renderInvoices(s):t==="/cart"?this.renderCart(s):t==="/brands"?rt(s):t==="/categories"?lt(s,this):t==="/support"?it(s,this):t==="/logout"?(this.state.user=null,this.updateAuthUI(),history.pushState(null,null,this.basePath+"/"),this.handleRouting()):v(s),document.querySelectorAll(".nav-link, .mobile-nav-item").forEach(a=>{const o=a.getAttribute("href");a.classList.toggle("active",o===t)}),window.scrollTo({top:0,behavior:"smooth"}),this.animatePageEntry()},showToast(e,t="success"){const s=document.getElementById("toast-container");if(!s)return;const a=document.createElement("div");a.className=`toast ${t}`;const o=t==="error"?'<svg style="width:16px;height:16px;color:#ef4444;flex-shrink:0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>':'<svg style="width:16px;height:16px;color:#10b981;flex-shrink:0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';a.innerHTML=`${o}<span>${e}</span><button onclick="this.parentElement.remove()" style="margin-left:auto;color:#64748b;background:none;border:none;cursor:pointer;font-size:16px">✕</button>`,s.appendChild(a),setTimeout(()=>{a.style.opacity="0",a.style.transform="translateX(20px)",a.style.transition="all 0.3s ease",setTimeout(()=>a.remove(),300)},4e3)},animatePageEntry(){const e=document.getElementById("view-container");e&&(e.style.opacity="0",e.style.transform="translateY(16px)",e.style.transition="opacity 0.4s ease, transform 0.4s ease",requestAnimationFrame(()=>{requestAnimationFrame(()=>{e.style.opacity="1",e.style.transform="translateY(0)"})}))},async init(){await this.loadSettings(),this.updateAuthUI(),this.handleRouting(),document.addEventListener("click",e=>{const t=e.target.closest("[data-link]");if(t){e.preventDefault();const s=t.getAttribute("href");history.pushState(null,null,this.basePath+s),this.handleRouting()}}),window.addEventListener("popstate",()=>this.handleRouting())}};w.init();window.app=w;
