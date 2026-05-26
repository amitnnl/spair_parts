(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=a(o);fetch(o.href,r)}})();function P(e,t){const a=t.state.user&&t.state.user.role&&t.state.user.role.toLowerCase()==="admin";return`
        <aside class="hidden lg:flex w-72 bg-[#fdfdfd] border-r border-slate-200 flex-col sticky top-20 h-[calc(100vh-80px)] z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] print:hidden">
            <!-- User Status Card -->
            <div class="p-5 border-b border-slate-100 bg-slate-50/30">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-none bg-bosch-blue text-white flex items-center justify-center font-black text-base shadow-lg shadow-slate-900/20 shrink-0">
                        ${(t.state.user?t.state.user.name:"Guest Partner").charAt(0)}
                    </div>
                    <div>
                        <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">System Status</p>
                        <p class="text-[11px] font-bold text-emerald-600 flex items-center gap-1.5">
                            <span class="relative flex h-1.5 w-1.5">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            Live Access
                        </p>
                    </div>
                </div>
            </div>

            <div class="flex-1 p-4 space-y-5 overflow-y-auto no-scrollbar mt-1 flex flex-col justify-between">
                <div class="space-y-5">
                    <div class="space-y-1">
                        <p class="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 ml-3 opacity-60">Procurement Hub</p>
                        <nav class="space-y-0.5">
                            ${S("/catalog","Spare Parts","M4 6h16M4 10h16M4 14h16M4 18h16",e==="catalog")}
                            ${S("/dashboard","Operational Overview","M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",e==="dashboard")}
                        </nav>
                    </div>

                    <div class="space-y-1">
                        <p class="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 ml-3 opacity-60">Transactions</p>
                        <nav class="space-y-0.5">
                            ${S("/quotations","Active Quotations","M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",e==="quotations")}
                            ${S("/invoices","Financial Records","M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",e==="invoices")}
                        </nav>
                    </div>

                    ${a?`
                        <div class="space-y-1 pt-4 border-t border-slate-100">
                            <p class="text-[8px] font-black text-bosch-blue uppercase tracking-[0.3em] mb-2 ml-3 font-poppins">Administrative Console</p>
                            <nav class="space-y-0.5">
                                ${S("/admin","Executive Insights","M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",e==="admin","slate")}
                                <button onclick="app.renderAdminInventory(document.getElementById('view-container'))" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-none ${e==="inventory"?"bg-industrial-gray border-l-4 border-bosch-blue text-white shadow-lg":"text-slate-500 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent"} transition-all font-bold text-[10px] uppercase tracking-wider group">
                                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                                    <span class="group-hover:translate-x-1 transition-transform">Inventory Systems</span>
                                </button>
                                ${S("/admin/stock-logs","Stock Movement Log","M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",e==="stock-logs","slate")}
                                ${S("/admin/reports","Reports & Export","M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",e==="reports","slate")}
                                <button onclick="app.renderAdminUsers(document.getElementById('view-container'))" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-none ${e==="partners"?"bg-industrial-gray border-l-4 border-bosch-blue text-white shadow-lg":"text-slate-500 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent"} transition-all font-bold text-[10px] uppercase tracking-wider group">
                                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                                    <span class="group-hover:translate-x-1 transition-transform">Global Partners</span>
                                </button>
                                <button onclick="app.renderSystemSettings()" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-none ${e==="settings"?"bg-industrial-gray border-l-4 border-bosch-blue text-white shadow-lg":"text-slate-500 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent"} transition-all font-bold text-[10px] uppercase tracking-wider group">
                                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>
                                    <span class="group-hover:translate-x-1 transition-transform">System Configuration</span>
                                </button>
                            </nav>
                        </div>
                    `:""}
                </div>
            </div>

            <div class="p-4 border-t border-slate-100 bg-slate-50/20 shrink-0">
                <a href="/logout" data-link class="flex items-center gap-3 px-4 py-3 rounded-none text-bosch-red hover:bg-bosch-red/10 transition-all font-black text-[10px] uppercase tracking-wider group">
                    <div class="w-8 h-8 rounded-none bg-bosch-red/10 flex items-center justify-center group-hover:bg-bosch-red group-hover:text-white transition-all shadow-sm shrink-0">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    </div>
                    Logout
                </a>
            </div>
        </aside>
    `}function S(e,t,a,s,o="blue"){return`
        <a href="${e}" data-link class="flex items-center gap-3 px-4 py-2.5 rounded-none ${s?o==="blue"?"bg-bosch-blue text-white shadow-lg border-l-4 border-bosch-red":"bg-industrial-gray text-white shadow-lg border-l-4 border-bosch-blue":"text-slate-500 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent"} transition-all font-bold text-[10px] uppercase tracking-wider group">
            <svg class="w-4 h-4 shrink-0 ${s?"":"group-hover:scale-110"} transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="${s?"2.5":"2"}">
                <path stroke-linecap="round" stroke-linejoin="round" d="${a}"/>
            </svg>
            <span class="${s?"":"group-hover:translate-x-1"} transition-transform">${t}</span>
        </a>
    `}const _={user:null,cart:[],products:[],quotations:[],invoices:[],view:"home",isLoading:!1,settings:{site_name:"PARTSPRO",currency:"₹",tax_percent:"18"}};function z(){const e=window.location.pathname;return e.includes("/spairparts")?"/spairparts":e.split("/").length>2&&!e.includes(".html")?"/"+e.split("/")[1]:""}z();function g(e){return e==null?"":String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function f(e,t){e&&(e.innerHTML=t)}async function H(e,t){f(e,'<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-bosch-blue border-t-transparent rounded-none"></div></div>');try{const s=await(await fetch(t.api("api/products.php"))).json();_.products=s.products,_.brands=s.brands,_.models=s.models,f(e,`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                <!-- Custom Catalog Filter Sidebar -->
                <aside class="w-full lg:w-72 bg-[#fdfdfd] border-b lg:border-b-0 lg:border-r border-slate-200 flex-col lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] print:hidden">
                    <div class="p-5 border-b border-slate-100 bg-slate-50/30">
                        <h3 class="text-xs font-black uppercase tracking-widest text-[#111111]">Inventory Filters</h3>
                    </div>
                    <div class="p-6 space-y-6 flex-1 overflow-y-auto no-scrollbar">
                        <!-- Search -->
                        <div class="space-y-3">
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Search</label>
                            <div class="relative">
                                <input type="text" id="catalog-search" class="w-full h-12 bg-slate-50 border border-slate-200 rounded-none pl-10 pr-4 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#ed1c24] focus:bg-white transition-all placeholder:text-slate-400" placeholder="Part name or Model...">
                                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                </div>
                            </div>
                        </div>

                        <!-- Brand -->
                        <div class="space-y-3">
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Brand</label>
                            <div class="relative">
                                <select id="brand-filter" class="w-full h-12 bg-slate-50 border border-slate-200 rounded-none px-4 text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#ed1c24] transition-all cursor-pointer uppercase tracking-widest">
                                    <option value="">All Brands</option>
                                    `+(_.brands||[]).map(o=>'<option value="'+g(o)+'">'+g(o)+"</option>").join("")+`
                                </select>
                                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg></div>
                            </div>
                        </div>

                        <!-- Model -->
                        <div class="space-y-3">
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Model</label>
                            <div class="relative">
                                <select id="model-filter" class="w-full h-12 bg-slate-50 border border-slate-200 rounded-none px-4 text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#ed1c24] transition-all cursor-pointer uppercase tracking-widest">
                                    <option value="">All Models</option>
                                    `+(_.models||[]).map(o=>'<option value="'+g(o)+'">'+g(o)+"</option>").join("")+`
                                </select>
                                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg></div>
                            </div>
                        </div>
                    </div>
                </aside>

                <main class="flex-1 p-6 lg:p-10">
                    <div class="max-w-[100rem] mx-auto space-y-12 animate-fade-in">
                        <div>
                            <div class="text-[10px] font-black uppercase tracking-[0.3em] text-[#ed1c24] mb-2">Inventory Explorer</div>
                            <h2 class="text-4xl font-black tracking-tight text-[#111111] uppercase">Genuine <span class="text-[#ed1c24]">Parts Catalog</span></h2>
                            <p class="text-slate-500 font-medium mt-2 text-lg">Browse through our extensive collection of industrial spare parts.</p>
                        </div>
                        
                        <div id="catalog-content"></div>
                    </div>
                </main>
            </div>
        `),R(s.products,document.getElementById("catalog-content"),t)}catch{f(e,'<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load products.</div>')}}function R(e,t,a){const s=a.state.searchFilters||{};a.state.searchFilters=null;const o=[s.query,s.category,s.item].filter(Boolean).join(" ").trim(),r=s.brand||"",n=s.model||"",l=document.getElementById("catalog-search"),d=document.getElementById("brand-filter"),u=document.getElementById("model-filter");l&&o&&(l.value=o),d&&r&&(d.value=r),u&&n&&(u.value=n),f(t,'<div id="catalog-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">'+j()+"</div>");const i=()=>{f(document.getElementById("catalog-grid"),j())};l&&(l.oninput=i),d&&(d.onchange=i),u&&(u.onchange=i)}function j(){var o,r,n;const e=((o=document.getElementById("catalog-search"))==null?void 0:o.value.toLowerCase())||"",t=((r=document.getElementById("brand-filter"))==null?void 0:r.value)||"",a=((n=document.getElementById("model-filter"))==null?void 0:n.value)||"",s=(_.products||[]).filter(l=>{const d=l.part_name.toLowerCase().includes(e)||l.machine_model&&l.machine_model.toLowerCase().includes(e)||l.brand&&l.brand.toLowerCase().includes(e),u=!t||l.brand===t,i=!a||l.machine_model===a||l.other_fitments&&l.other_fitments.includes(a);return d&&u&&i});return s.length===0?`
            <div class="col-span-full py-20 text-center animate-in fade-in duration-500">
                <h3 class="text-xl font-bold text-slate-400">No parts found</h3>
            </div>
        `:s.map(l=>D(l)).join("")}function D(e){const t=g(e.brand),a=g(e.part_name),s=g(e.machine_model||"Universal"),o=g(e.id);return`
        <div class="bg-white border-2 border-slate-100 rounded-none overflow-hidden group transition-all duration-500 animate-in zoom-in duration-700 hover-red-glow">
            <div class="relative h-64 bg-slate-50 overflow-hidden">
                <img src="${O(e.photo,e.part_name)}" class="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700">
                <div class="absolute top-4 left-4">
                    <span class="px-3 py-1.5 bg-[#111111] text-white shadow-sm border border-slate-700 text-[9px] font-black uppercase tracking-widest rounded-none">${t}</span>
                </div>
            </div>
            <div class="p-6">
                <div class="mb-6">
                    <h4 class="font-black text-lg text-[#111111] leading-tight mb-1 uppercase tracking-widest truncate" title="${a}">${a}</h4>
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fits: ${s}</span>
                    </div>
                </div>
                
                <div class="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div>
                        <span class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">B2B Pricing</span>
                        <span class="text-sm font-black text-[#111111] uppercase">RFQ Required</span>
                    </div>
                    <button onclick="app.addToCart(${o})" class="p-3 bg-[#ed1c24] hover:bg-[#111111] text-white rounded-none transition-all shadow-sm" title="Add to RFQ Cart">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                    </button>
                </div>
            </div>
        </div>
    `}function O(e,t="Part"){return e?e.replace("via.placeholder.com","placehold.co"):`https://placehold.co/600x600/0f172a/6366f1?text=${encodeURIComponent(t)}`}async function q(e,t){if(!t.state.user){history.pushState(null,null,t.basePath+"/login"),t.handleRouting();return}const a=(t.state.user.role||"").toLowerCase(),s=a==="admin";console.log("Quotation View Access - Role:",a,"IsAdmin:",s),e.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-bosch-blue border-t-transparent rounded-none"></div></div>';try{const o=s?"api/admin_quotations.php":"api/quotations.php",n=await(await fetch(t.api(o))).json();e.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${t.getSidebar("quotations")}
                <main class="flex-1 p-8 lg:p-12">
                    <div class="max-w-6xl mx-auto space-y-12 animate-fade-in">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div>
                                <div class="text-[10px] font-black uppercase tracking-[0.3em] text-bosch-blue">${s?"Global Transaction Monitor":"Procurement History"}</div>
                                <h2 class="text-4xl font-black tracking-tight text-bosch-blue uppercase">${s?'All <span class="text-bosch-blue">Quotations</span>':'Your <span class="text-bosch-blue">Quotations</span>'}</h2>
                                <p class="text-slate-500 font-medium mt-2 text-lg">${s?"Manage and price all incoming partner requests.":"Track your request for quotes and approval statuses."}</p>
                            </div>
                            ${s?"":`
                            <button onclick="app.renderCatalog(document.getElementById('view-container'))" class="btn btn-secondary rounded-none hover:border-bosch-blue hover:text-bosch-blue flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                                New Request
                            </button>
                            `}
                        </div>

                        <div class="table-container">
                            <table class="data-table w-full text-left">
                                <thead>
                                    <tr>
                                        <th>${s?"Partner / Date":"ID / Date"}</th>
                                        <th>Items Count</th>
                                        <th>Status</th>
                                        <th>Amount</th>
                                        <th class="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100">
                                    ${n.length?n.map(l=>`
                                        <tr class="hover:bg-slate-50 transition-all">
                                            <td class="p-6">
                                                <div class="font-bold text-bosch-blue">${s?l.user_name:`#Q-${String(l.id).padStart(4,"0")}`}</div>
                                                <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">${new Date(l.created_at).toLocaleDateString()} ${s?`• #Q-${String(l.id).padStart(4,"0")}`:""}</div>
                                            </td>
                                            <td class="p-6 font-bold text-slate-600">${l.item_count||0} Products</td>
                                            <td class="p-6">
                                                <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${t.getStatusClass(l.status)}">
                                                    ${l.status}
                                                </span>
                                            </td>
                                            <td class="p-6 font-black text-bosch-blue">
                                                ${l.status==="pending"?'<span class="text-slate-400 font-bold italic">Awaiting Pricing</span>':`₹${parseFloat(l.total_amount||0).toLocaleString()}`}
                                            </td>
                                            <td class="p-6 text-right">
                                                <div class="flex justify-end gap-3">
                                                    <button onclick="${s?`app.renderProcessQuotation(${l.id})`:`app.viewQuotationDetails(${l.id})`}" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-none font-black text-[11px] uppercase tracking-widest hover:bg-slate-200 transition-all">
                                                        ${s&&l.status==="pending"?"Process":"View"}
                                                    </button>
                                                    ${!s&&l.status==="pending"?`<button onclick="app.editQuotation(${l.id})" class="px-4 py-2 bg-amber-50 text-amber-600 rounded-none font-black text-[11px] uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all">Edit</button>`:""}
                                                    ${!s&&l.status==="priced"?`<button onclick="app.approveQuotation(${l.id})" class="px-4 py-2 bg-bosch-blue text-white rounded-none font-black text-[11px] uppercase tracking-widest hover:bg-industrial-gray transition-all shadow-lg shadow-slate-900/20">Approve</button>`:""}
                                                </div>
                                            </td>
                                        </tr>
                                    `).join(""):`
                                        <tr>
                                            <td colspan="5" class="p-20 text-center text-slate-400 font-bold">${s?"No partner requests found.":"You haven't requested any quotations yet."}</td>
                                        </tr>
                                    `}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        `}catch{e.innerHTML='<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load quotations.</div>'}}async function N(e,t){const a=document.createElement("div");a.id="quotation-modal",a.className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto";try{const o=await(await fetch(t.api(`api/quotations.php?id=${e}`))).json();a.innerHTML=`
            <div class="bg-white w-full max-w-4xl rounded-none border-2 border-slate-100 shadow-premium overflow-hidden relative animate-in zoom-in duration-300 my-8">
                <div class="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div>
                        <h2 class="text-2xl font-black text-bosch-blue uppercase">Quotation Details</h2>
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">#Q-${String(e).padStart(4,"0")} • Requested on ${new Date(o.created_at).toLocaleDateString()}</p>
                    </div>
                    <button onclick="document.getElementById('quotation-modal').remove()" class="w-12 h-12 rounded-none border border-slate-200 bg-white text-slate-400 hover:bg-slate-100 hover:text-bosch-blue flex items-center justify-center transition-all">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <div class="p-10 space-y-10">
                    <div class="overflow-hidden border border-slate-200 rounded-none">
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
                                            <div class="font-bold text-bosch-blue">${r.part_name}</div>
                                            <div class="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-0.5">${r.brand} • ${r.machine_model}</div>
                                        </td>
                                        <td class="p-6 text-sm font-bold text-slate-600">${r.quantity}</td>
                                        <td class="p-6 text-sm font-black text-bosch-blue text-right">${r.unit_price?`₹${parseFloat(r.unit_price).toLocaleString()}`:'<span class="text-slate-400 italic">Pending</span>'}</td>
                                        <td class="p-6 text-sm font-black text-bosch-blue text-right">${r.unit_price?`₹${(r.quantity*r.unit_price).toLocaleString()}`:"---"}</td>
                                    </tr>
                                `).join("")}
                            </tbody>
                            ${o.total_amount?`
                                <tfoot class="bg-slate-50 font-black">
                                    <tr>
                                        <td colspan="3" class="p-6 text-right text-slate-400 uppercase tracking-widest text-xs">Total Amount</td>
                                        <td class="p-6 text-right text-2xl text-bosch-blue">₹${parseFloat(o.total_amount).toLocaleString()}</td>
                                    </tr>
                                </tfoot>
                            `:""}
                        </table>
                    </div>
                    
                    <div class="flex justify-end gap-4">
                        <button onclick="document.getElementById('quotation-modal').remove()" class="px-8 py-4 rounded-none border border-slate-200 text-slate-400 font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 hover:text-bosch-blue transition-all">Close Details</button>
                        ${o.status==="priced"?`<button onclick="app.approveQuotation(${e})" class="px-10 py-4 rounded-none bg-bosch-blue text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-industrial-gray transition-all">Approve & Order</button>`:""}
                    </div>
                </div>
            </div>
        `,document.body.appendChild(a)}catch{t.showToast("Failed to load quotation details","error")}}async function F(e,t){try{if((await(await fetch(t.api("api/quotations.php"),{method:"PUT",body:JSON.stringify({quotation_id:e,status:"approved"})})).json()).success){t.showToast("Quotation approved. We will generate your invoice shortly.");const o=document.getElementById("quotation-modal");o&&o.remove(),t.renderQuotations(document.getElementById("view-container"))}}catch{t.showToast("Error approving quotation","error")}}async function V(e,t){if(!t.state.user){history.pushState(null,null,t.basePath+"/login"),t.handleRouting();return}e.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const s=await(await fetch(t.api("api/invoices.php"))).json();e.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${t.getSidebar("invoices")}
                <main class="flex-1 p-8 lg:p-12">
                    <div class="max-w-6xl mx-auto space-y-12 animate-fade-in">
                        <div>
                            <div class="text-[10px] font-black uppercase tracking-[0.3em] text-bosch-blue">Financial Records</div>
                            <h2 class="text-4xl font-black tracking-tight text-bosch-blue uppercase">Your <span class="text-bosch-blue">Invoices</span></h2>
                            <p class="text-slate-500 font-medium mt-2">Official tax invoices for your approved procurement requests.</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            ${s.length?s.map(o=>`
                                <div class="bg-white border-2 border-slate-100 rounded-none p-8 space-y-6 hover:border-bosch-blue transition-all duration-500 group">
                                    <div class="flex justify-between items-start">
                                        <div class="w-14 h-14 rounded-none bg-industrial-gray text-white flex items-center justify-center group-hover:bg-bosch-blue transition-all">
                                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                        </div>
                                        <div class="text-right space-y-2">
                                            <span class="px-3 py-1 rounded-none border border-slate-200 text-[9px] font-black uppercase tracking-wider ${o.status==="processing"?"bg-amber-50 text-amber-600":o.status==="dispatched"?"bg-blue-50 text-blue-600":"bg-emerald-50 text-emerald-600"}">
                                                ${o.status||"processing"}
                                            </span>
                                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${new Date(o.created_at).toLocaleDateString()}</p>
                                            <p class="text-sm font-black text-bosch-blue">${o.invoice_number}</p>
                                        </div>
                                    </div>
                                    <div class="space-y-4 pt-6 border-t border-slate-100">
                                        ${o.tracking_number?`
                                            <div class="p-4 bg-slate-50 rounded-none border border-slate-100">
                                                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Tracking Number</p>
                                                <p class="text-xs font-black text-bosch-blue">${o.tracking_number}</p>
                                            </div>
                                        `:""}
                                        <div class="flex justify-between items-center px-1">
                                            <span class="text-xs font-bold text-slate-400">Total Amount</span>
                                            <span class="text-xl font-black text-bosch-blue">₹${parseFloat(o.total_amount).toLocaleString()}</span>
                                        </div>
                                        <button onclick="app.renderInvoiceDocument(${o.id})" class="w-full py-4 bg-industrial-gray text-white rounded-none font-black text-[11px] uppercase tracking-widest hover:bg-bosch-blue transition-all shadow-xl shadow-slate-900/20">View & Download</button>
                                    </div>
                                </div>
                            `).join(""):`
                                <div class="col-span-full bg-slate-50 border border-slate-100 rounded-none p-20 text-center text-slate-400 font-bold uppercase tracking-widest">No invoices generated yet.</div>
                            `}
                        </div>
                    </div>
                </main>
            </div>
        `}catch{e.innerHTML='<div class="bg-rose-50 border border-rose-100 rounded-3xl p-12 text-center text-rose-500 font-bold">Failed to load invoices.</div>'}}async function U(e,t){const a=document.createElement("div");a.id="invoice-doc-modal",a.className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-lg overflow-y-auto";try{const o=await(await fetch(t.api(`api/invoices.php?id=${e}`))).json();a.innerHTML=`
            <div id="invoice-printable-area" class="bg-white text-bosch-blue w-full max-w-4xl min-h-[11in] p-12 md:p-16 shadow-2xl relative animate-in slide-in-from-bottom-8 duration-500 rounded-none overflow-hidden mx-auto print:shadow-none print:p-0">
                
                <!-- Print-only watermark -->
                <div class="hidden print:flex absolute inset-0 items-center justify-center opacity-[0.03] pointer-events-none z-0">
                    <h1 class="text-[150px] font-black tracking-tighter uppercase transform -rotate-45">PARTSPRO</h1>
                </div>

                <!-- Premium Header Ribbon -->
                <div class="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-industrial-gray via-bosch-blue to-bosch-red print:h-2"></div>
                
                <div class="relative z-10 flex flex-col md:flex-row justify-between items-start border-b-[3px] border-slate-900 pb-10 mt-6 print:mt-4 print:pb-8">
                    <div class="space-y-4">
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-14 bg-bosch-blue text-white rounded-none flex items-center justify-center font-black text-3xl shadow-lg print:shadow-none">P</div>
                            <h1 class="text-4xl font-black tracking-tighter uppercase text-bosch-blue">PARTS<span class="text-bosch-red">PRO</span></h1>
                        </div>
                        <div class="text-[10px] md:text-[11px] font-black text-slate-500 space-y-1.5 uppercase tracking-[0.15em] leading-relaxed">
                            <p>Industrial Area, Phase 2</p>
                            <p>New Delhi, 110020, India</p>
                            <p>Support: +91 70277 51544</p>
                            <p class="text-bosch-blue mt-2">GSTIN: <span class="font-bold">07AAACT0000A1Z5</span></p>
                        </div>
                    </div>
                    <div class="text-right space-y-2 mt-8 md:mt-0">
                        <h2 class="text-5xl md:text-6xl font-black text-slate-100 tracking-tighter uppercase print:text-slate-200">TAX INVOICE</h2>
                        <div class="inline-block bg-slate-50 border border-slate-200 rounded-none p-4 mt-2 print:border-none print:bg-transparent print:p-0">
                            <p class="text-sm font-black text-bosch-blue">INV #: <span class="text-bosch-blue">${o.invoice_number}</span></p>
                            <p class="text-[11px] font-bold text-slate-500 uppercase tracking-widest pt-1">Date: ${new Date(o.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 py-10 print:py-8">
                    <div>
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">Billed To:</p>
                        <div class="space-y-1">
                            <h3 class="text-xl font-black text-bosch-blue">${o.user_name}</h3>
                            <p class="text-sm font-bold text-slate-500">${o.user_email}</p>
                        </div>
                    </div>
                    <div class="md:text-right">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">Payment Info:</p>
                        <div class="space-y-2">
                            <span class="inline-block px-4 py-1.5 bg-industrial-gray text-white rounded-none text-[10px] font-black uppercase tracking-widest border border-bosch-blue print:bg-transparent print:border-slate-300 print:text-slate-800">Payment on Delivery</span>
                            <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest pt-1">Status: <span class="${o.status==="delivered"?"text-bosch-blue":"text-amber-600"}">${o.status}</span></p>
                        </div>
                    </div>
                </div>

                <div class="relative z-10 border-[1.5px] border-slate-900 rounded-none overflow-hidden mb-10 print:border-slate-300">
                    <table class="w-full text-left">
                        <thead class="bg-slate-900 text-white print:bg-slate-100 print:text-bosch-blue print:border-b-2 print:border-slate-900">
                            <tr>
                                <th class="p-4 md:p-5 text-[10px] font-black uppercase tracking-widest">Description</th>
                                <th class="p-4 md:p-5 text-[10px] font-black uppercase tracking-widest text-center">Qty</th>
                                <th class="p-4 md:p-5 text-[10px] font-black uppercase tracking-widest text-right">Unit Price</th>
                                <th class="p-4 md:p-5 text-[10px] font-black uppercase tracking-widest text-right bg-slate-800 print:bg-slate-200">Total</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 print:divide-slate-300">
                            ${o.items.map(r=>`
                                <tr class="hover:bg-slate-50 print:hover:bg-transparent">
                                    <td class="p-4 md:p-6">
                                        <p class="font-black text-bosch-blue text-sm md:text-base">${r.part_name}</p>
                                        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-1">${r.brand} • ${r.machine_model}</p>
                                    </td>
                                    <td class="p-4 md:p-6 text-sm font-bold text-slate-700 text-center">${r.quantity}</td>
                                    <td class="p-4 md:p-6 text-sm font-bold text-slate-700 text-right">₹${parseFloat(r.unit_price).toLocaleString(void 0,{minimumFractionDigits:2})}</td>
                                    <td class="p-4 md:p-6 text-sm font-black text-bosch-blue text-right bg-slate-50/50 print:bg-transparent">₹${(r.quantity*r.unit_price).toLocaleString(void 0,{minimumFractionDigits:2})}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>

                <div class="relative z-10 flex flex-col md:flex-row justify-between items-start border-t-[3px] border-slate-900 pt-8 mt-auto print:border-slate-300">
                    <div class="mb-8 md:mb-0 max-w-xs space-y-2">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Terms & Conditions:</p>
                        <p class="text-[9px] font-bold text-slate-500 leading-relaxed text-justify">All spare parts are subject to standard warranty conditions. Returns are accepted within 7 days of delivery if parts are unused and in original packaging. This is a computer generated invoice.</p>
                    </div>
                    <div class="w-full md:w-80 space-y-3 bg-slate-50 p-6 rounded-none border border-slate-200 print:border-none print:bg-transparent print:p-0">
                        <div class="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                            <span>Subtotal</span>
                            <span class="text-slate-700">₹${parseFloat(o.total_amount).toLocaleString(void 0,{minimumFractionDigits:2})}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                            <span>GST Included</span>
                            <span class="text-slate-700">₹0.00</span>
                        </div>
                        <div class="flex justify-between items-center pt-4 border-t-2 border-slate-200 print:border-slate-900">
                            <span class="text-sm font-black text-bosch-blue uppercase tracking-widest">Total Payable</span>
                            <span class="text-3xl font-black text-bosch-blue">₹${parseFloat(o.total_amount).toLocaleString(void 0,{minimumFractionDigits:2})}</span>
                        </div>
                    </div>
                </div>

                <div class="relative z-10 mt-16 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-end print:mt-12">
                    <div class="space-y-4 mb-8 md:mb-0">
                        <h4 class="text-[10px] font-black text-bosch-blue uppercase tracking-widest">Authorised Signatory</h4>
                        <div class="w-48 h-12 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNTAiPjxwYXRoIGQ9Ik0xMCAzMGMxMC01IDIwLTEwIDMwLTggMTAgMiAyMCAxMCAzMCA4IDEwLTIgMjAtMTAgMzAtMTAgMTAtMCAyMCA4IDMwIDggMTAgMCAyMC0xMCAzMC0xMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2I4MmY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==')] bg-no-repeat bg-contain opacity-60"></div>
                        <div class="w-48 h-[2px] bg-slate-800"></div>
                        <p class="text-[9px] font-black text-slate-500 uppercase tracking-widest">PARTSPRO B2B Procurement</p>
                    </div>
                    <div class="flex gap-4 no-print w-full md:w-auto">
                        <button onclick="document.getElementById('invoice-doc-modal').remove()" class="flex-1 md:flex-none px-6 py-3.5 bg-slate-100 text-slate-500 rounded-none font-black text-[11px] uppercase tracking-widest hover:bg-slate-200 transition-all text-center">Close</button>
                        <button onclick="window.print()" class="flex-1 md:flex-none px-8 py-3.5 bg-bosch-blue text-white rounded-none font-black text-[11px] uppercase tracking-widest hover:bg-industrial-gray hover:shadow-lg transition-all flex items-center justify-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                            Print Document
                        </button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(a)}catch{t.showToast("Failed to load invoice details","error"),a.remove()}}async function Q(e,t){if((t.state.user&&t.state.user.role?t.state.user.role.toLowerCase():"")!=="admin"){t.showToast("Administrative privileges required","error"),history.pushState(null,null,t.basePath+"/login"),t.handleRouting();return}e.innerHTML=`
        <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
            ${t.getSidebar("admin")}

            <main class="flex-1 p-8 lg:p-12 space-y-12">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h2 class="text-4xl font-black text-bosch-blue tracking-tight">Executive <span class="text-bosch-blue">Dashboard</span></h2>
                        <p class="text-slate-500 mt-2 font-bold text-lg">Platform status and procurement oversight.</p>
                    </div>
                    <button onclick="app.printAdminReport()" class="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-none font-bold text-sm hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        Generate Report
                    </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${[{l:"Active Quotations",v:"--",id:"stat-active-quotations",c:"blue"},{l:"Total Partners",v:"--",id:"stat-total-partners",c:"indigo"},{l:"Inventory SKUs",v:"--",id:"stat-total-skus",c:"emerald"},{l:"Monthly Revenue",v:"₹0",id:"stat-revenue",c:"rose"}].map(s=>`
                        <div class="bg-white border-2 border-slate-100 rounded-none p-8 space-y-4 hover:border-bosch-blue transition-all">
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${s.l}</p>
                            <h3 class="text-3xl font-black text-bosch-blue" id="${s.id}">${s.v}</h3>
                            <div class="w-full h-1 bg-${s.c}-100 rounded-none overflow-hidden">
                                <div class="w-1/3 h-full bg-${s.c}-600"></div>
                            </div>
                        </div>
                    `).join("")}
                </div>

                <div class="space-y-8">
                    <div class="flex items-center gap-4">
                        <div class="w-2 h-8 bg-bosch-blue rounded-none"></div>
                        <h3 class="text-xl font-black text-bosch-blue tracking-tight uppercase">Pending Procurements</h3>
                    </div>
                    <div id="admin-quotation-list" class="grid grid-cols-1 gap-4">
                        <div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-bosch-blue border-t-transparent rounded-full"></div></div>
                    </div>
                </div>

                <div class="space-y-8">
                    <div class="flex items-center gap-4">
                        <div class="w-2 h-8 bg-bosch-red rounded-none"></div>
                        <h3 class="text-xl font-black text-bosch-blue tracking-tight uppercase">Order Fulfillment & Logistics</h3>
                    </div>
                    <div id="admin-invoice-list" class="grid grid-cols-1 gap-4">
                        <div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-bosch-red border-t-transparent rounded-full"></div></div>
                    </div>
                </div>
            </main>
        </div>
    `,t.loadAdminStats(),t.loadAdminQuotations(),t.loadAdminInvoices()}async function W(e){const t=document.getElementById("admin-invoice-list");if(t)try{const s=await(await fetch(e.api("api/invoices.php"))).json();t.innerHTML=s.length?s.map(o=>`
            <div class="bg-white border-2 border-slate-100 rounded-none p-6 flex justify-between items-center hover:border-bosch-blue transition-all">
                <div class="flex items-center gap-6">
                    <div class="w-12 h-12 rounded-none bg-slate-50 flex items-center justify-center text-slate-400">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <div>
                        <div class="font-black text-bosch-blue uppercase tracking-widest">${o.invoice_number} • ${o.user_name}</div>
                        <div class="text-[11px] text-slate-500 font-medium mt-1 uppercase tracking-widest">
                            ${new Date(o.created_at).toLocaleDateString()} • ₹${parseFloat(o.total_amount).toLocaleString()}
                            ${o.tracking_number?` • Tracking: <span class="text-bosch-blue font-bold">${o.tracking_number}</span>`:""}
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <span class="px-3 py-1 rounded-none border border-slate-200 text-[10px] font-black uppercase tracking-wider ${be(o.status)}">
                        ${o.status}
                    </span>
                    <button onclick="app.renderDispatchModal(${o.id}, '${o.status}', '${o.tracking_number||""}')" class="px-5 py-2 rounded-none bg-industrial-gray text-white text-[11px] font-black uppercase tracking-widest hover:bg-bosch-blue transition-all">Manage</button>
                </div>
            </div>
        `).join(""):'<div class="bg-slate-50 border border-slate-100 rounded-none p-12 text-center text-slate-400 font-bold uppercase tracking-widest">No active orders in fulfillment</div>'}catch{t.innerHTML='<div class="bg-rose-50 border border-rose-100 rounded-none p-12 text-center text-rose-500 font-bold uppercase tracking-widest">Failed to load orders</div>'}}async function G(e){try{const a=await(await fetch(e.api("api/admin_stats.php"))).json();document.getElementById("stat-active-quotations")&&(document.getElementById("stat-active-quotations").textContent=a.active_quotations),document.getElementById("stat-total-partners")&&(document.getElementById("stat-total-partners").textContent=a.total_partners),document.getElementById("stat-total-skus")&&(document.getElementById("stat-total-skus").textContent=a.total_skus),document.getElementById("stat-revenue")&&(document.getElementById("stat-revenue").textContent="₹"+parseFloat(a.total_revenue||0).toLocaleString())}catch(t){console.error("Failed to load admin stats",t)}}async function K(e){const t=document.getElementById("admin-quotation-list");if(t)try{const s=await(await fetch(e.api("api/admin_quotations.php"))).json();t.innerHTML=s.length?s.map(o=>`
            <div class="bg-white border-2 border-slate-100 rounded-none p-6 flex justify-between items-center hover:border-bosch-blue transition-all">
                <div>
                    <div class="font-black text-bosch-blue uppercase tracking-widest">${o.user_name}</div>
                    <div class="text-[11px] text-slate-500 font-medium mt-1 uppercase tracking-widest">${o.user_email} • ${new Date(o.created_at).toLocaleString()}</div>
                </div>
                <div class="flex items-center gap-6">
                    <span class="px-3 py-1 rounded-none border border-slate-200 text-[10px] font-black uppercase tracking-wider ${e.getStatusClass(o.status)}">
                        ${o.status}
                    </span>
                    ${o.status==="pending"?`<button onclick="app.renderProcessQuotation(${o.id})" class="px-5 py-2 rounded-none bg-bosch-blue text-white text-[11px] font-black uppercase tracking-widest hover:bg-industrial-gray transition-all">Process</button>`:""}
                    ${o.status==="approved"?`<button onclick="app.generateInvoice(${o.id})" class="px-5 py-2 rounded-none bg-bosch-red text-white text-[11px] font-black uppercase tracking-widest hover:bg-red-700 transition-all">Generate Invoice</button>`:""}
                </div>
            </div>
        `).join(""):'<div class="bg-slate-50 border border-slate-100 rounded-none p-12 text-center text-slate-400 font-bold uppercase tracking-widest">No pending requests</div>'}catch{t.innerHTML='<div class="bg-rose-50 border border-rose-100 rounded-none p-12 text-center text-rose-500 font-bold uppercase tracking-widest">Failed to load requests</div>'}}async function J(e,t){e.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-bosch-blue border-t-transparent rounded-none"></div></div>';try{const a=await fetch(t.api("api/products.php")),{products:s}=await a.json();t.state.products=s,e.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${t.getSidebar("inventory")}

                <main class="flex-1 p-8 lg:p-12 space-y-12">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h2 class="text-4xl font-black text-bosch-blue tracking-tight uppercase">Inventory <span class="text-bosch-blue">Warehouse</span></h2>
                            <p class="text-slate-500 mt-2 font-bold text-lg">Real-time stock monitoring and fitment management.</p>
                        </div>
                        <div class="flex gap-4 no-print">
                            <button onclick="app.renderImportModal()" class="px-6 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-none font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
                                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                Bulk Import
                            </button>
                            <button onclick="app.renderAddProductForm()" class="px-6 py-3.5 bg-bosch-blue text-white rounded-none font-black text-[11px] uppercase tracking-widest hover:bg-industrial-gray transition-all shadow-xl shadow-blue-900/20 flex items-center gap-2 hover:-translate-y-1">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                                Add Product
                            </button>
                        </div>
                    </div>

                    <div class="bg-white rounded-none border-2 border-slate-100 p-4 flex gap-4 shadow-sm">
                        <div class="relative flex-grow">
                            <input type="text" id="inventory-search" oninput="app.filterInventory()" class="w-full h-14 bg-slate-50 border border-slate-100 rounded-none px-14 text-sm font-bold text-slate-700 focus:outline-none focus:border-bosch-blue focus:ring-4 focus:ring-bosch-blue/10 transition-all" placeholder="Search by Part Name, Brand, or Machine Model...">
                            <svg class="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-none border-2 border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/40">
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
                                ${s.map(o=>Z(o,t)).join("")}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        `}catch{e.innerHTML='<div class="bg-rose-50 border border-rose-100 rounded-3xl p-20 text-center text-rose-500 font-bold">Error loading warehouse data.</div>'}}function Y(){var a;const e=(((a=document.getElementById("inventory-search"))==null?void 0:a.value)||"").toLowerCase();document.querySelectorAll("#inventory-table-body tr").forEach(s=>{const o=s.textContent.toLowerCase();s.style.display=o.includes(e)?"":"none"})}function Z(e,t){const a=(e.stock_quantity||0)<5;return`
        <tr class="hover:bg-slate-50/80 transition-all group border-b border-slate-100">
            <td class="p-6 pl-8">
                <div class="flex items-center gap-5">
                    <div class="relative">
                        <img src="${t.cleanImageUrl(e.photo,e.part_name)}" class="w-14 h-14 rounded-none object-cover border-2 border-slate-100 shadow-sm group-hover:scale-105 transition-transform">
                        ${a?'<span class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-bosch-red rounded-none border border-white animate-pulse"></span>':""}
                    </div>
                    <div>
                        <span class="font-black block text-bosch-blue text-sm mb-0.5 uppercase tracking-widest">${e.part_name}</span>
                        <span class="text-[10px] text-slate-500 uppercase font-black tracking-widest bg-slate-100 px-2 py-0.5 rounded-none inline-block">${e.machine_model||"Universal"}</span>
                    </div>
                </div>
            </td>
            <td class="p-6">
                <span class="px-3.5 py-1.5 rounded-none bg-industrial-gray text-white text-[9px] font-black uppercase tracking-widest border border-slate-700">${e.brand}</span>
            </td>
            <td class="p-6">
                <div class="space-y-2">
                    <span class="text-[11px] font-black uppercase tracking-widest ${a?"text-bosch-red":"text-bosch-blue"}">${e.stock_quantity||0} Units in Reserve</span>
                    <div class="w-28 h-1.5 bg-slate-100 rounded-none overflow-hidden border border-slate-200">
                        <div class="h-full rounded-none ${a?"bg-bosch-red":"bg-bosch-blue"}" style="width: ${Math.min((e.stock_quantity||0)*5,100)}%"></div>
                    </div>
                </div>
            </td>
            <td class="p-6 font-black text-bosch-blue text-sm">₹${e.cost||"0.00"}</td>
            <td class="p-6 pr-8 text-right">
                <div class="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onclick="app.renderEditProductForm(${e.id})" class="p-3 rounded-none bg-white border border-slate-200 text-slate-400 hover:text-white hover:border-bosch-blue hover:bg-bosch-blue transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                    <button onclick="app.deleteProduct(${e.id})" class="p-3 rounded-none bg-white border border-slate-200 text-slate-400 hover:text-white hover:border-bosch-red hover:bg-bosch-red transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </td>
        </tr>
    `}async function X(e,t){if(!(!t.state.user||t.state.user.role!=="admin")){e.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const s=await(await fetch(t.api("api/admin_users.php"))).json();e.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${t.getSidebar("partners")}

                <main class="flex-1 p-8 lg:p-12 space-y-12">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h2 class="text-4xl font-black text-bosch-blue tracking-tight">Partner <span class="text-bosch-blue">Management</span></h2>
                            <p class="text-slate-500 mt-2 font-bold text-lg">Manage B2B client access and custom discount tiers.</p>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/40 animate-in fade-in duration-500">
                        <table class="w-full text-left border-collapse">
                            <thead class="bg-slate-50/80 border-b border-slate-200">
                                <tr>
                                    <th class="p-6 pl-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Details</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                                    <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Discount Tier</th>
                                    <th class="p-6 pr-8 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 bg-white">
                                ${s.map(o=>{var r,n;return`
                                    <tr class="hover:bg-slate-50/80 transition-all group">
                                        <td class="p-6 pl-8">
                                            <div class="flex items-center gap-4">
                                                <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-bosch-blue flex items-center justify-center font-black text-xl shadow-sm border border-emerald-100">${o.name.charAt(0).toUpperCase()}</div>
                                                <div>
                                                    <span class="font-black block text-bosch-blue text-sm mb-0.5">${o.name}</span>
                                                    <span class="text-[10px] text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-md inline-block">${o.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="p-6">
                                            <select onchange="app.updateUser(${o.id}, 'status', this.value)" class="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-black uppercase tracking-widest ${o.status==="active"?"text-emerald-600 border-emerald-200":o.status==="pending"?"text-amber-600 border-amber-200":"text-rose-600 border-rose-200"} focus:outline-none focus:ring-4 transition-all">
                                                <option value="pending" ${o.status==="pending"?"selected":""}>Pending</option>
                                                <option value="active" ${o.status==="active"?"selected":""}>Active</option>
                                                <option value="suspended" ${o.status==="suspended"?"selected":""}>Suspended</option>
                                            </select>
                                        </td>
                                        <td class="p-6">
                                            <select onchange="app.updateUser(${o.id}, 'role', this.value)" class="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-4 transition-all">
                                                <option value="user" ${((r=o.role)==null?void 0:r.toLowerCase())==="user"||!o.role?"selected":""}>Partner</option>
                                                <option value="staff" ${((n=o.role)==null?void 0:n.toLowerCase())==="staff"?"selected":""}>Staff</option>
                                            </select>
                                        </td>
                                        <td class="p-6">
                                            <div class="flex items-center gap-2">
                                                <input type="number" step="0.1" value="${o.discount_tier||0}" id="discount_${o.id}" class="w-20 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-black text-bosch-blue focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                                                <span class="text-slate-400 font-bold text-sm">%</span>
                                            </div>
                                        </td>
                                        <td class="p-6 pr-8 text-right">
                                            <button onclick="app.updateUser(${o.id}, 'discount_tier', document.getElementById('discount_${o.id}').value)" class="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-md shadow-slate-900/20">Save</button>
                                        </td>
                                    </tr>
                                `}).join("")}
                                ${s.length===0?'<tr><td colspan="4" class="p-8 text-center text-slate-500 font-bold">No partners found.</td></tr>':""}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        `}catch{e.innerHTML='<div class="p-20 text-center text-rose-500 font-bold">Error loading partners.</div>'}}}async function ee(e,t){const a=document.createElement("div");a.id="process-modal",a.className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto";const r=(await(await fetch(t.api("api/admin_quotations.php"))).json()).find(i=>i.id==e);if(!r){t.showToast("Quotation not found or already processed.","error");return}const l=await(await fetch(t.api(`api/admin_quotations.php?id=${e}`))).json(),d=l.items,u=parseFloat(l.discount_tier||0);a.innerHTML=`
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
                    <div class="flex-1 min-w-[200px] p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
                        <p class="text-[10px] font-black text-bosch-blue uppercase tracking-widest mb-1">Partner Tier</p>
                        <h4 class="text-xl font-black text-bosch-blue">${u}% Automatic Discount</h4>
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
                                ${d.map(i=>`
                                    <tr class="group">
                                        <td class="p-6">
                                            <div class="font-bold text-bosch-blue">${i.part_name}</div>
                                            <div class="text-[10px] text-slate-500 uppercase font-black tracking-tighter mt-0.5">${i.brand} • ${i.machine_model}</div>
                                        </td>
                                        <td class="p-6 text-slate-600 font-black">${i.quantity}</td>
                                        <td class="p-6 text-slate-400 font-bold text-sm">₹${i.cost||"0.00"}</td>
                                        <td class="p-6">
                                            <div class="flex items-center gap-2">
                                                <input type="number" name="price_${i.id}" data-item-id="${i.id}" data-qty="${i.quantity}" data-msrp="${i.cost||0}" step="0.01" value="${i.unit_price||""}" required class="w-28 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-black text-bosch-blue focus:outline-none focus:border-blue-500 transition-all unit-price-input">
                                                <button type="button" onclick="app.applyDiscountToItem(this, ${u})" class="p-2 bg-emerald-50 text-bosch-blue rounded-lg hover:bg-bosch-blue hover:text-white transition-all shadow-sm">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                                </button>
                                            </div>
                                        </td>
                                        <td class="p-6 text-right font-black text-bosch-blue subtotal-cell">₹${(i.quantity*(i.unit_price||0)).toFixed(2)}</td>
                                    </tr>
                                `).join("")}
                            </tbody>
                            <tfoot class="bg-slate-50 border-t border-slate-200">
                                <tr>
                                    <td colspan="4" class="p-8 text-right font-black text-slate-400 uppercase tracking-widest text-xs">Total Quotation Value:</td>
                                    <td class="p-8 text-right font-black text-3xl text-bosch-blue" id="quotation-total-display">₹0.00</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    
                    <div class="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
                        <button type="button" onclick="app.applyDiscountToAll(${u})" class="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-bosch-blue text-white hover:bg-industrial-gray transition-all font-black text-[11px] uppercase tracking-widest shadow-xl shadow-slate-900/20">
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
    `,document.body.appendChild(a),document.querySelectorAll(".unit-price-input").forEach(i=>{i.oninput=()=>M()}),M(),document.getElementById("price-quotation-form").onsubmit=async i=>{i.preventDefault();const c=Array.from(document.querySelectorAll(".unit-price-input")).map(b=>({item_id:b.dataset.itemId,unit_price:b.value})),x=await(await fetch(t.api("api/admin_quotations.php"),{method:"PUT",body:JSON.stringify({quotation_id:e,items:c})})).json();x.success?(t.showToast("Quotation priced and sent successfully!"),a.remove(),t.loadAdminQuotations()):t.showToast(x.error,"error")}}function te(e,t){const a=e.closest(".flex").querySelector("input"),o=parseFloat(a.dataset.msrp)*(1-t/100);a.value=o.toFixed(2),M()}function se(e){document.querySelectorAll(".unit-price-input").forEach(t=>{const s=parseFloat(t.dataset.msrp)*(1-e/100);t.value=s.toFixed(2)}),M()}function M(){let e=0;document.querySelectorAll(".unit-price-input").forEach(a=>{const s=parseFloat(a.dataset.qty),o=parseFloat(a.value)||0,r=s*o,n=a.closest("tr");n&&(n.querySelector(".subtotal-cell").textContent=`₹${r.toFixed(2)}`),e+=r});const t=document.getElementById("quotation-total-display");t&&(t.textContent=`₹${e.toFixed(2)}`)}async function ae(e,t){try{const s=await(await fetch(t.api("api/invoices.php"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({quotation_id:e})})).json();s.success?(t.showToast("Invoice generated successfully!"),t.loadAdminQuotations()):t.showToast(s.error,"error")}catch{t.showToast("Failed to generate invoice","error")}}async function oe(e,t,a,s){try{const o={id:e};if(t==="status")o.status=a;else if(t==="role")o.role=a;else if(t==="discount_tier")o.discount_tier=a;else throw new Error("Unauthorized field update");const n=await(await fetch(s.api("api/admin_users.php"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})).json();n.success?s.showToast("Partner updated successfully"):s.showToast(n.error||"Update failed","error")}catch{s.showToast("Failed to update partner","error")}}async function re(e,t){if(!t.state.user||!t.state.user.role||t.state.user.role.toLowerCase()!=="admin"){t.showToast("Access restricted to administrators","error");return}e.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const s=await(await fetch(t.api("api/admin_settings.php"),{credentials:"include"})).json(),o=(i,c)=>{if(i===1){if(c==="name")return s.brand1_name;if(c==="tag")return s.brand1_tag;if(c==="desc")return s.brand1_desc;if(c==="logo")return s.brand1_logo}if(i===2){if(c==="name")return s.brand2_name;if(c==="tag")return s.brand2_tag;if(c==="desc")return s.brand2_desc;if(c==="logo")return s.brand2_logo}if(i===3){if(c==="name")return s.brand3_name;if(c==="tag")return s.brand3_tag;if(c==="desc")return s.brand3_desc;if(c==="logo")return s.brand3_logo}if(i===4){if(c==="name")return s.brand4_name;if(c==="tag")return s.brand4_tag;if(c==="desc")return s.brand4_desc;if(c==="logo")return s.brand4_logo}if(i===5){if(c==="name")return s.brand5_name;if(c==="tag")return s.brand5_tag;if(c==="desc")return s.brand5_desc;if(c==="logo")return s.brand5_logo}if(i===6){if(c==="name")return s.brand6_name;if(c==="tag")return s.brand6_tag;if(c==="desc")return s.brand6_desc;if(c==="logo")return s.brand6_logo}return""},r=(i,c)=>{if(i===1){if(c==="title")return s.cat1_title;if(c==="img")return s.cat1_img;if(c==="desc")return s.cat1_desc}if(i===2){if(c==="title")return s.cat2_title;if(c==="img")return s.cat2_img;if(c==="desc")return s.cat2_desc}if(i===3){if(c==="title")return s.cat3_title;if(c==="img")return s.cat3_img;if(c==="desc")return s.cat3_desc}if(i===4){if(c==="title")return s.cat4_title;if(c==="img")return s.cat4_img;if(c==="desc")return s.cat4_desc}return""},n=(i,c,p,x="text",b="",k="")=>`
            <div class="space-y-2 ${k}">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">${i}</label>
                <input type="${x}" name="${c}" value="${p||""}" placeholder="${b}"
                    class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
            </div>`,l=(i,c,p,x="")=>`
            <div class="space-y-2 ${x}">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">${i}</label>
                <textarea name="${c}" rows="3"
                    class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none">${p||""}</textarea>
            </div>`,d=(i,c,p)=>`
            <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">${i}</label>
                <div class="flex items-center gap-4">
                    <input type="file" name="${c}" accept="image/*"
                        class="flex-1 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold text-slate-500 focus:outline-none hover:border-blue-400 transition-all cursor-pointer">
                    ${p?`<img src="${t.api(p)}" class="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md flex-shrink-0">`:`<div class="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex-shrink-0 flex items-center justify-center text-slate-300">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                           </div>`}
                </div>
            </div>`,u=[{id:"general",label:"⚙️ General"},{id:"home",label:"🏠 Home Page"},{id:"brands",label:"🏷️ Brands"},{id:"categories",label:"📂 Categories"},{id:"support",label:"💬 Support"},{id:"footer",label:"📋 Footer"},{id:"system",label:"🔍 System Status"}];e.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${t.getSidebar("settings")}
                <main class="flex-1 p-6 lg:p-10 overflow-x-hidden">
                    <div class="max-w-5xl mx-auto">
                        <div class="mb-8">
                            <h2 class="text-3xl font-black text-bosch-blue">Website <span class="text-bosch-blue">Control Center</span></h2>
                            <p class="text-slate-500 font-medium mt-1">Edit every page, image, and text on your live website from here.</p>
                        </div>

                        <!-- Tab Nav -->
                        <div class="flex gap-2 mb-8 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
                            ${u.map((i,c)=>`
                                <button type="button" onclick="window.switchCMSTab('${i.id}')" id="tab-btn-${i.id}"
                                    class="cms-tab-btn flex-shrink-0 px-5 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${c===0?"bg-bosch-blue text-white shadow-lg shadow-slate-900/30":"text-slate-500 hover:bg-slate-100 hover:text-slate-700"}">
                                    ${i.label}
                                </button>
                            `).join("")}
                        </div>

                        <form id="cms-form" enctype="multipart/form-data">

                            <!-- GENERAL -->
                            <div id="cms-tab-general" class="cms-tab-panel space-y-6 bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
                                <div class="pb-6 border-b border-slate-100 mb-6">
                                    <h3 class="text-xl font-black text-bosch-blue">General Settings</h3>
                                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Site identity, pricing & contact info</p>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    ${n("Platform / Site Name","site_name",s.site_name,"text","PARTSPRO")}
                                    ${d("Platform Logo","site_logo",s.site_logo)}
                                    ${n("Currency Symbol","currency",s.currency,"text","₹")}
                                    ${n("Tax Rate (%)","tax_percent",s.tax_percent,"number","18")}
                                    ${n("Support Email","contact_email",s.contact_email,"email","support@partspro.in")}
                                    ${n("Contact Phone","contact_phone",s.contact_phone,"text","+91 70277 51544")}
                                    ${n("WhatsApp Number (with country code)","whatsapp_number",s.whatsapp_number,"text","+917027751544")}
                                    ${n("Footer Tagline","footer_desc",s.footer_desc,"text","The premium B2B platform...")}
                                    ${l("Corporate Address","contact_address",s.contact_address,"md:col-span-2")}
                                    ${n("Copyright Text","footer_copyright",s.footer_copyright,"text","© 2026 PARTSPRO B2B Division.")}
                                </div>
                            </div>

                            <!-- HOME PAGE -->
                            <div id="cms-tab-home" class="cms-tab-panel space-y-6 hidden">
                                <div class="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                                    <div class="pb-6 border-b border-slate-100">
                                        <h3 class="text-xl font-black text-bosch-blue">Hero Section</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Main banner headline, subtitle, background image</p>
                                    </div>
                                    <div class="grid grid-cols-1 gap-5">
                                        ${n("Hero Headline","hero_title",s.hero_title,"text","THE RIGHT PART. EVERY TIME.")}
                                        ${l("Hero Subtitle","hero_subtitle",s.hero_subtitle)}
                                        <div class="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hero Slider Images</span>
                                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                ${d("Hero Image 1","hero_image",s.hero_image)}
                                                ${d("Hero Image 2","hero_image_2",s.hero_image_2)}
                                                ${d("Hero Image 3","hero_image_3",s.hero_image_3)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- BRANDS PAGE -->
                            <div id="cms-tab-brands" class="cms-tab-panel space-y-6 hidden">
                                <div class="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                                    <div class="pb-6 border-b border-slate-100">
                                        <h3 class="text-xl font-black text-bosch-blue">Brands Page</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Page heading and 6 brand cards</p>
                                    </div>
                                    <div class="grid grid-cols-1 gap-4">
                                        ${n("Page Heading","brands_title",s.brands_title,"text","Our Trusted Brands")}
                                        ${l("Page Subtitle","brands_subtitle",s.brands_subtitle)}
                                    </div>
                                    ${["Bosch","Makita","DeWalt","Hikoki","Milwaukee","Hilti"].map((i,c)=>{const p=c+1;return`
                                        <div class="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                                            <span class="inline-block px-3 py-1 rounded-lg bg-rose-100 text-rose-700 text-[10px] font-black uppercase tracking-widest">Brand ${p} — Default: ${i}</span>
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                ${n("Brand Name","brand"+p+"_name",o(p,"name"),"text",i)}
                                                ${n("Tag / Specialty","brand"+p+"_tag",o(p,"tag"),"text","Power Tools")}
                                                ${l("Short Description","brand"+p+"_desc",o(p,"desc"))}
                                                ${d("Brand Logo","brand"+p+"_logo",o(p,"logo"))}
                                            </div>
                                        </div>`}).join("")}
                                </div>
                            </div>

                            <!-- CATEGORIES PAGE -->
                            <div id="cms-tab-categories" class="cms-tab-panel space-y-6 hidden">
                                <div class="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                                    <div class="pb-6 border-b border-slate-100">
                                        <h3 class="text-xl font-black text-bosch-blue">Categories Page</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Page heading and 4 category cards</p>
                                    </div>
                                    <div class="grid grid-cols-1 gap-4">
                                        ${n("Page Heading","cats_page_title",s.cats_page_title,"text","Core Categories")}
                                        ${l("Page Subtitle","cats_page_subtitle",s.cats_page_subtitle)}
                                    </div>
                                    <div class="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-sm text-amber-700 font-bold">
                                        ℹ️ Category cards below are shared with the Home Page panels — editing here updates both places.
                                    </div>
                                    ${[1,2,3,4].map(i=>`
                                        <div class="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                                            <span class="inline-block px-3 py-1 rounded-lg bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest">Category ${i}</span>
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                ${n("Title","cat"+i+"_title",r(i,"title"))}
                                                ${d("Card Image","cat"+i+"_img",r(i,"img"))}
                                                ${l("Description","cat"+i+"_desc",r(i,"desc"),"md:col-span-2")}
                                            </div>
                                        </div>
                                    `).join("")}
                                </div>
                            </div>

                            <!-- SUPPORT PAGE -->
                            <div id="cms-tab-support" class="cms-tab-panel space-y-6 hidden">
                                <div class="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                                    <div class="pb-6 border-b border-slate-100">
                                        <h3 class="text-xl font-black text-bosch-blue">Support Page</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Page heading, description and contact info cards</p>
                                    </div>
                                    <div class="grid grid-cols-1 gap-4">
                                        ${n("Page Heading","support_title",s.support_title,"text","Expert Support Center")}
                                        ${l("Page Subtitle / Description","support_subtitle",s.support_subtitle)}
                                        ${n("Form Submit Button Text","support_form_cta",s.support_form_cta,"text","Submit Technical Ticket")}
                                    </div>
                                    <div class="p-5 bg-green-50 border border-green-100 rounded-2xl space-y-4">
                                        <span class="text-xs font-black text-green-700 uppercase tracking-widest">Contact Cards (auto-pulled from General Settings)</span>
                                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            ${n("Email","contact_email",s.contact_email,"email")}
                                            ${n("Phone","contact_phone",s.contact_phone)}
                                            ${l("Address","contact_address",s.contact_address)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- FOOTER -->
                            <div id="cms-tab-footer" class="cms-tab-panel space-y-6 hidden">
                                <div class="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                                    <div class="pb-6 border-b border-slate-100">
                                        <h3 class="text-xl font-black text-bosch-blue">Footer Content</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Tagline, address, email and copyright text</p>
                                    </div>
                                    <div class="grid grid-cols-1 gap-4">
                                        ${n("Footer Brand Tagline","footer_desc",s.footer_desc,"text","The premium B2B platform for genuine power tool spare parts.")}
                                        ${n("Footer Email","contact_email",s.contact_email,"email")}
                                        ${l("Footer Address","contact_address",s.contact_address)}
                                        ${n("Copyright Text","footer_copyright",s.footer_copyright,"text","© 2026 PARTSPRO B2B Division. All rights reserved.")}
                                    </div>
                                </div>
                            </div>
 
                            <!-- SYSTEM STATUS -->
                            <div id="cms-tab-system" class="cms-tab-panel space-y-6 hidden bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
                                <div class="pb-6 border-b border-slate-100">
                                    <h3 class="text-xl font-black text-bosch-blue">Platform Diagnostics</h3>
                                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Verify live database values and system integrity</p>
                                </div>
                                <div class="bg-slate-50 rounded-2xl p-6 space-y-4">
                                    <div class="flex justify-between items-center border-b border-slate-200 pb-3">
                                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Database Key</span>
                                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Value</span>
                                    </div>
                                    <div class="space-y-3 font-mono text-xs overflow-x-auto">
                                        <div class="flex justify-between gap-4 p-2 hover:bg-white rounded-lg cursor-pointer transition-all" onclick="switchCMSTab('general')">
                                            <span class="text-bosch-blue font-bold">whatsapp_number</span>
                                            <div class="flex items-center gap-2">
                                                <span class="text-slate-600">${s.whatsapp_number||'<span class="text-rose-500 font-bold">NOT FOUND</span>'}</span>
                                                <svg class="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                                            </div>
                                        </div>
                                        <div class="flex justify-between gap-4 p-2 hover:bg-white rounded-lg cursor-pointer transition-all border-t border-slate-100 pt-3" onclick="switchCMSTab('general')">
                                            <span class="text-bosch-blue font-bold">site_name</span>
                                            <div class="flex items-center gap-2">
                                                <span class="text-slate-600">${s.site_name}</span>
                                                <svg class="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                                            </div>
                                        </div>
                                        <div class="flex justify-between gap-4 p-2 hover:bg-white rounded-lg cursor-pointer transition-all border-t border-slate-100 pt-3" onclick="switchCMSTab('general')">
                                            <span class="text-bosch-blue font-bold">contact_email</span>
                                            <div class="flex items-center gap-2">
                                                <span class="text-slate-600">${s.contact_email}</span>
                                                <svg class="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                                    <h4 class="text-sm font-black text-emerald-900 mb-2">Troubleshooting Tip</h4>
                                    <p class="text-xs text-emerald-700 leading-relaxed font-medium">If "whatsapp_number" shows as <span class="text-rose-500 font-bold">NOT FOUND</span> on your live site, please click "Save All Changes" at the bottom of this page to force-sync the database registry.</p>
                                </div>
                            </div>

                            <!-- Save -->
                            <div class="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                                <button type="button" onclick="app.renderAdmin(document.getElementById('view-container'))"
                                    class="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-white border border-slate-200 transition-all">
                                    Cancel
                                </button>
                                <button type="submit" id="cms-save-btn"
                                    class="px-10 py-4 rounded-2xl bg-bosch-blue text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:-translate-y-0.5 hover:bg-industrial-gray transition-all flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                                    Save All Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        `,window.switchCMSTab=i=>{var p;window.currentCMSTab=i,document.querySelectorAll(".cms-tab-panel").forEach(x=>x.classList.add("hidden")),document.querySelectorAll(".cms-tab-btn").forEach(x=>{x.classList.remove("bg-bosch-blue","text-white","shadow-lg","shadow-slate-900/30"),x.classList.add("text-slate-500")}),(p=document.getElementById("cms-tab-"+i))==null||p.classList.remove("hidden");const c=document.getElementById("tab-btn-"+i);c&&(c.classList.add("bg-bosch-blue","text-white","shadow-lg","shadow-slate-900/30"),c.classList.remove("text-slate-500"))},window.currentCMSTab&&window.currentCMSTab!=="general"&&window.switchCMSTab(window.currentCMSTab),document.getElementById("cms-form").onsubmit=async i=>{i.preventDefault();const c=document.getElementById("cms-save-btn");c.textContent="Saving…",c.disabled=!0;try{const x=await(await fetch(t.api("api/admin_settings.php"),{method:"POST",body:new FormData(i.target),credentials:"include"})).json();x.success?(t.showToast("✅ All changes saved and live!"),await t.loadSettings(),t.renderSystemSettings()):t.showToast(x.error||"Save failed","error")}catch{t.showToast("Network error","error")}finally{c.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg> Save All Changes',c.disabled=!1}}}catch(a){e.innerHTML=`<div class="bg-rose-50 p-20 text-center text-rose-500 font-bold rounded-3xl">Failed to load CMS. ${a.message}</div>`}}function ne(){var a,s,o,r;const e={quotes:((a=document.getElementById("stat-active-quotations"))==null?void 0:a.textContent)||"--",partners:((s=document.getElementById("stat-total-partners"))==null?void 0:s.textContent)||"--",skus:((o=document.getElementById("stat-total-skus"))==null?void 0:o.textContent)||"--",revenue:((r=document.getElementById("stat-revenue"))==null?void 0:r.textContent)||"₹0"},t=window.open("","_blank");t.document.write(`
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
                    .stat-value { font-size: 28px; font-weight: 900; margin-top: 10px; color: #003e64; }
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
    `),t.document.close()}function le(e){const t=document.createElement("div");t.id="import-modal",t.className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm",t.innerHTML=`
        <div class="bg-white rounded-[32px] w-full max-w-xl p-10 space-y-8 shadow-2xl animate-in zoom-in duration-300">
            <div class="flex justify-between items-center">
                <h2 class="text-3xl font-black text-bosch-blue">Bulk <span class="text-bosch-blue">Import</span></h2>
                <button onclick="document.getElementById('import-modal').remove()" class="text-slate-400 hover:text-bosch-blue transition-all">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <form id="import-form" class="space-y-6">
                <div class="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-500 transition-all cursor-pointer relative group">
                    <input type="file" name="import_csv" accept=".csv" required class="absolute inset-0 opacity-0 cursor-pointer">
                    <p class="text-slate-500 font-bold">Drop CSV file here or <span class="text-bosch-blue">browse</span></p>
                    <p class="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-black">Headers: Part Name, Machine Model, Brand, Cost, Stock</p>
                </div>
                <button type="submit" class="w-full py-4 rounded-2xl bg-bosch-blue text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-industrial-gray transition-all">Process Import</button>
            </form>
        </div>
    `,document.body.appendChild(t),document.getElementById("import-form").onsubmit=a=>ie(a,e)}async function ie(e,t){e.preventDefault();const a=e.target.querySelector("button");a.disabled=!0,a.textContent="Importing...";const s=new FormData(e.target);try{const r=await(await fetch(t.api("api/import_products.php"),{method:"POST",body:s})).json();r.success?(t.showToast(`Imported ${r.count} products successfully`),document.getElementById("import-modal").remove(),t.renderAdminInventory(document.getElementById("view-container"))):t.showToast(r.error,"error")}catch{t.showToast("Import failed","error")}finally{a.disabled=!1,a.textContent="Process Import"}}function ce(e){A(null,e)}async function de(e,t){const a=t.state.products.find(s=>s.id==e);A(a,t)}async function A(e,t){const a=!!e,s=document.createElement("div");s.id="product-modal",s.className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto",s.innerHTML=`
        <div class="bg-white rounded-[32px] w-full max-w-3xl p-6 md:p-10 space-y-6 shadow-2xl animate-in zoom-in duration-300 my-auto max-h-[95vh] overflow-y-auto custom-scrollbar">
            <div class="flex justify-between items-center">
                <h2 class="text-3xl font-black text-bosch-blue">${a?"Edit":"Add New"} <span class="text-bosch-blue">Product</span></h2>
                <button onclick="document.getElementById('product-modal').remove()" class="text-slate-400 hover:text-bosch-blue transition-all">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <form id="product-form" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                ${a?`<input type="hidden" name="id" value="${e.id}">`:""}
                <input type="hidden" name="action" value="${a?"update_product":"add_product"}">

                <!-- Spare Part Name -->
                <div class="col-span-2 space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Spare Part Name</label>
                    <div class="flex gap-2">
                        <select id="pf-partname" name="part_name_id" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                            <option value="">Select Part Name...</option>
                        </select>
                        <button type="button" onclick="window._pfAddLookup('part_name')" class="px-4 py-2 rounded-xl bg-emerald-50 text-bosch-blue font-black text-lg hover:bg-blue-100 transition-all" title="Add new part name">+</button>
                    </div>
                </div>

                <!-- Primary Fitment Section -->
                <div class="col-span-2 pt-6 pb-2 border-t border-slate-100 mt-2 flex justify-between items-center">
                    <h3 class="text-[11px] font-black text-bosch-blue uppercase tracking-[0.2em]">Primary Suitable Machine</h3>
                    <label class="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" onchange="window._pfToggleUnknownMachine(this.checked)" class="w-4 h-4 rounded border-slate-300 text-bosch-blue focus:ring-blue-500">
                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-bosch-blue transition-all">Suitable machine abhi pata nahi hai</span>
                    </label>
                </div>

                <!-- Machine Brand -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Machine Brand</label>
                    <div class="flex gap-2">
                        <select id="pf-brand" name="brand_id" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                            <option value="">Select Brand...</option>
                        </select>
                        <button type="button" onclick="window._pfAddLookup('brand')" class="px-4 py-2 rounded-xl bg-emerald-50 text-bosch-blue font-black text-lg hover:bg-blue-100 transition-all">+</button>
                    </div>
                </div>

                <!-- Machine Name -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Machine Name</label>
                    <div class="flex gap-2">
                        <select id="pf-machine" name="machine_name_id" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                            <option value="">Select Machine...</option>
                        </select>
                        <button type="button" onclick="window._pfAddLookup('machine_name')" class="px-4 py-2 rounded-xl bg-emerald-50 text-bosch-blue font-black text-lg hover:bg-blue-100 transition-all">+</button>
                    </div>
                </div>

                <!-- Machine Model -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Machine Model</label>
                    <div class="flex gap-2">
                        <select id="pf-model" name="model_id" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                            <option value="">Select Model...</option>
                        </select>
                        <button type="button" onclick="window._pfAddLookup('model')" class="px-4 py-2 rounded-xl bg-emerald-50 text-bosch-blue font-black text-lg hover:bg-blue-100 transition-all">+</button>
                    </div>
                </div>

                <!-- Machine Size -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Machine Size</label>
                    <div class="flex gap-2">
                        <select id="pf-size" name="machine_size_id" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all">
                            <option value="">Select Size...</option>
                        </select>
                        <button type="button" onclick="window._pfAddLookup('machine_size')" class="px-4 py-2 rounded-xl bg-emerald-50 text-bosch-blue font-black text-lg hover:bg-blue-100 transition-all">+</button>
                    </div>
                </div>

                <!-- Additional Machines Section -->
                <div class="col-span-2 pt-6 pb-2 border-t border-slate-100 mt-2">
                    <div class="flex justify-between items-center">
                        <h3 class="text-[11px] font-black text-bosch-blue uppercase tracking-[0.2em]">Other Suitable Machines</h3>
                        <button type="button" onclick="window._pfAddMachineRow()" class="text-[10px] font-black text-bosch-blue uppercase tracking-widest hover:underline">+ Add More Machine</button>
                    </div>
                    <div id="additional-machines-container" class="space-y-4 mt-4">
                        <!-- Dynamic rows here -->
                    </div>
                </div>

                <!-- Product Details -->
                <div class="col-span-2 pt-6 pb-2 border-t border-slate-100 mt-2">
                    <h3 class="text-[11px] font-black text-bosch-blue uppercase tracking-[0.2em]">Product Details</h3>
                </div>

                <!-- Cost -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Cost (₹)</label>
                    <input type="number" step="0.01" name="cost" value="${(e==null?void 0:e.cost)||""}" placeholder="Enter Cost"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
                </div>

                <!-- Stock Quantity -->
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Stock Quantity</label>
                    <input type="number" name="stock_quantity" value="${(e==null?void 0:e.stock_quantity)||""}" placeholder="Enter Stock"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
                </div>

                <!-- Note -->
                <div class="col-span-2 space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Note</label>
                    <input type="text" name="note" value="${(e==null?void 0:e.note)||""}" placeholder="Technical notes or descriptions"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
                </div>

                <!-- Photo -->
                <div class="col-span-2 space-y-2 pt-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Product Photo</label>
                    <input type="file" name="photo" accept="image/*"
                        class="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-emerald-50 file:text-bosch-blue hover:file:bg-blue-100">
                </div>

                <div class="col-span-2 pt-4">
                    <button type="submit" id="pf-submit-btn"
                        class="w-full py-4 rounded-2xl bg-bosch-blue text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-industrial-gray hover:scale-[1.02] transition-all">
                        Save Complete Product
                    </button>
                </div>
            </form>
        </div>
    `,document.body.appendChild(s);let o=null;fetch(t.api("api/admin_products.php?action=lookups")).then(r=>r.json()).then(r=>{o=r;const n=(l,d,u)=>{const i=document.getElementById(l);i&&d.forEach(c=>{const p=document.createElement("option");p.value=c.id,p.textContent=c.name,u&&c.id==u&&(p.selected=!0),i.appendChild(p)})};n("pf-brand",r.brands||[],e==null?void 0:e.brand_id),n("pf-machine",r.machine_names||[],e==null?void 0:e.machine_name_id),n("pf-partname",r.part_names||[],e==null?void 0:e.part_name_id),n("pf-model",r.models||[],e==null?void 0:e.model_id),n("pf-size",r.sizes||[],e==null?void 0:e.machine_size_id),a&&fetch(t.api(`api/admin_products.php?action=get_fitments&part_id=${e.id}`)).then(l=>l.json()).then(l=>{(l.fitments||[]).forEach(d=>window._pfAddMachineRow(d))})}).catch(()=>t.showToast("Could not load dropdown options","error")),window._pfAddMachineRow=(r=null)=>{const n=document.getElementById("additional-machines-container"),l=document.createElement("div");l.className="grid grid-cols-2 lg:grid-cols-4 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 relative group animate-in slide-in-from-top-2 duration-300";const d=(u,i,c)=>`
            <div class="space-y-1">
                <select name="${u}" class="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] font-bold text-slate-700 focus:outline-none focus:border-blue-500">
                    <option value="">Select...</option>
                    ${i.map(p=>`<option value="${p.id}" ${p.id==c?"selected":""}>${p.name}</option>`).join("")}
                </select>
            </div>
        `;l.innerHTML=`
            <button type="button" onclick="this.parentElement.remove()" class="absolute -right-2 -top-2 w-6 h-6 bg-white border border-slate-200 text-rose-500 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            ${d("fit_brand_id",(o==null?void 0:o.brands)||[],r==null?void 0:r.brand_id)}
            ${d("fit_machine_id",(o==null?void 0:o.machine_names)||[],r==null?void 0:r.machine_id)}
            ${d("fit_model_id",(o==null?void 0:o.models)||[],r==null?void 0:r.machine_model_id)}
            ${d("fit_size_id",(o==null?void 0:o.sizes)||[],r==null?void 0:r.machine_size_id)}
        `,n.appendChild(l)},window._pfAddLookup=async r=>{let n="";if(r==="brand")n="Brand";else if(r==="machine_name")n="Machine Name";else if(r==="part_name")n="Part Name";else if(r==="model")n="Model";else if(r==="machine_size")n="Machine Size";else return;const l=prompt(`Enter new ${n} name:`);if(!l||!l.trim())return;const d=new FormData;d.append("action","add_lookup"),d.append("type",r),d.append("name",l.trim());try{const i=await(await fetch(t.api("api/admin_products.php"),{method:"POST",body:d})).json();if(i.success){t.showToast(`${n} added!`),o=await(await fetch(t.api("api/admin_products.php?action=lookups"))).json();let p="";r==="brand"?p="pf-brand":r==="machine_name"?p="pf-machine":r==="part_name"?p="pf-partname":r==="model"?p="pf-model":r==="machine_size"&&(p="pf-size");const x=document.getElementById(p);if(x){const b=document.createElement("option");b.value=i.id,b.textContent=l.trim(),b.selected=!0,x.appendChild(b)}}else t.showToast(i.error||"Failed to add","error")}catch{t.showToast("Network error","error")}},document.getElementById("product-form").onsubmit=r=>pe(r,t)}async function pe(e,t){e.preventDefault();const a=document.getElementById("pf-submit-btn");a.disabled=!0,a.innerHTML='<span class="animate-pulse">Saving Product...</span>';const s=new FormData(e.target),o=s.has("id");try{const n=await(await fetch(t.api("api/admin_products.php"),{method:"POST",body:s})).json();if(n.success){const l=o?s.get("id"):n.id,d=document.querySelectorAll("#additional-machines-container > div");for(const u of d){const i=u.querySelector('[name="fit_model_id"]').value,c=u.querySelector('[name="fit_size_id"]').value;if(i){const p=new FormData;p.append("action","save_fitment"),p.append("part_id",l),p.append("model_id",i),p.append("machine_size_id",c),await fetch(t.api("api/admin_products.php"),{method:"POST",body:p})}}t.showToast(`Product ${o?"updated":"created"} successfully with fitments`),document.getElementById("product-modal").remove(),t.renderAdminInventory(document.getElementById("view-container"))}else t.showToast(n.error||"Submission failed","error")}catch{t.showToast("Submission failed","error")}finally{a.disabled=!1,a.textContent="Save Complete Product"}}async function ue(e,t){if(confirm("Are you sure you want to remove this product?"))try{const s=await(await fetch(t.api(`api/admin_products.php?action=delete_product&id=${e}`),{method:"DELETE"})).json();s.success?(t.showToast("Product removed"),t.renderAdminInventory(document.getElementById("view-container"))):t.showToast(s.error,"error")}catch{t.showToast("Deletion failed","error")}}function be(e){switch(e){case"processing":return"bg-amber-50 text-amber-600 border border-amber-200";case"dispatched":return"bg-emerald-50 text-bosch-blue border border-blue-200";case"delivered":return"bg-emerald-50 text-emerald-600 border border-emerald-200";default:return"bg-slate-50 text-slate-400 border border-slate-100"}}function he(e,t,a,s){const o=document.createElement("div");o.id="dispatch-modal",o.className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm",o.innerHTML=`
        <div class="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div class="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h2 class="text-xl font-black text-bosch-blue uppercase tracking-tight">Fulfillment Status</h2>
                <button onclick="document.getElementById('dispatch-modal').remove()" class="text-slate-400 hover:text-bosch-blue transition-all">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div class="p-8 space-y-8">
                <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Update Order Status</label>
                    <div class="grid grid-cols-1 gap-3">
                        ${t==="processing"?`
                            <button onclick="app.updateOrderStatus(${e}, 'dispatched')" class="flex items-center justify-between p-4 rounded-2xl border-2 border-emerald-100 bg-emerald-50 text-emerald-700 hover:border-blue-600 transition-all group">
                                <span class="font-black text-xs uppercase tracking-widest">Mark as Dispatched</span>
                                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
                            </button>
                        `:""}
                        ${t==="dispatched"?`
                            <button onclick="app.updateOrderStatus(${e}, 'delivered')" class="flex items-center justify-between p-4 rounded-2xl border-2 border-emerald-100 bg-emerald-50 text-emerald-700 hover:border-emerald-600 transition-all group">
                                <span class="font-black text-xs uppercase tracking-widest">Mark as Delivered</span>
                                <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                            </button>
                        `:""}
                        ${t==="delivered"?`
                            <div class="p-6 text-center bg-slate-50 border border-slate-200 rounded-2xl">
                                <p class="text-xs font-black text-bosch-blue uppercase tracking-widest">Order Successfully Delivered</p>
                            </div>
                        `:""}
                    </div>
                </div>

                ${t==="processing"?`
                    <div class="space-y-3">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tracking Number (Optional)</label>
                        <input type="text" id="tracking-input" placeholder="Enter Courier Tracking ID" class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-sm">
                    </div>
                `:a?`
                    <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Tracking ID</p>
                        <p class="font-black text-bosch-blue">${a}</p>
                    </div>
                `:""}
            </div>
        </div>
    `,document.body.appendChild(o)}async function xe(e,t,a){var o,r;const s=((o=document.getElementById("tracking-input"))==null?void 0:o.value)||null;try{(await(await fetch(a.api("api/invoices.php"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({invoice_id:e,status:t,tracking_number:s})})).json()).success&&(a.showToast(`Order marked as ${t}!`),(r=document.getElementById("dispatch-modal"))==null||r.remove(),a.renderAdmin(document.getElementById("view-container")))}catch{a.showToast("Failed to update status","error")}}async function ge(e,t){var s,o;if(!(((o=(s=t.state.user)==null?void 0:s.role)==null?void 0:o.toLowerCase())==="admin")){t.showToast("Admin access required","error");return}e.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const n=await(await fetch(t.api("api/stock_logs.php"))).json(),l=n.logs||[],d=n.low_stock||[];e.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${t.getSidebar("stock-logs")}
                <main class="flex-1 p-8 lg:p-12 space-y-10">

                    <!-- Header -->
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div class="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Inventory Control</div>
                            <h2 class="text-4xl font-black text-slate-900 tracking-tight">Stock <span class="text-blue-600">Movement Log</span></h2>
                            <p class="text-slate-500 mt-2 font-medium">Real-time tracking of all stock-in and stock-out transactions.</p>
                        </div>
                        <button onclick="app.renderStockAdjustModal()"
                            class="px-6 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2 hover:-translate-y-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                            Adjust Stock
                        </button>
                    </div>

                    <!-- Low Stock Alerts -->
                    ${d.length>0?`
                        <div class="bg-rose-50 border border-rose-200 rounded-3xl p-6">
                            <div class="flex items-center gap-3 mb-5">
                                <div class="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center">
                                    <svg class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                                </div>
                                <div>
                                    <p class="text-xs font-black text-rose-700 uppercase tracking-widest">⚠ Low Stock Alert — ${d.length} Item${d.length>1?"s":""} Need Restocking</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                ${d.map(u=>`
                                    <div class="bg-white border border-rose-100 rounded-2xl p-4 flex flex-col gap-1">
                                        <p class="text-xs font-black text-slate-900">${u.part_name}</p>
                                        <p class="text-[10px] text-slate-400 font-bold uppercase">${u.brand||"N/A"}</p>
                                        <div class="mt-2 flex items-center justify-between">
                                            <span class="text-xs font-black ${u.stock_quantity<=0?"text-rose-600":"text-amber-600"}">${u.stock_quantity} left</span>
                                            <button onclick="app.renderStockAdjustModal(${u.id})" class="text-[9px] font-black uppercase tracking-widest text-blue-600 hover:underline">Restock</button>
                                        </div>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `:`
                        <div class="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 flex items-center gap-4">
                            <div class="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                            </div>
                            <p class="text-xs font-black text-emerald-700 uppercase tracking-widest">All stock levels are healthy — no alerts</p>
                        </div>
                    `}

                    <!-- Transaction History Table -->
                    <div class="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/40">
                        <div class="p-8 border-b border-slate-100 flex items-center gap-4">
                            <div class="w-2 h-8 bg-blue-600 rounded-full"></div>
                            <h3 class="text-lg font-black text-slate-900">Transaction History</h3>
                            <span class="ml-auto text-xs font-black text-slate-400 uppercase tracking-widest">Last ${l.length} entries</span>
                        </div>
                        ${l.length>0?`
                            <div class="overflow-x-auto">
                                <table class="w-full text-left">
                                    <thead class="bg-slate-50/80 border-b border-slate-200">
                                        <tr>
                                            <th class="p-5 pl-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date & Time</th>
                                            <th class="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Part</th>
                                            <th class="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                                            <th class="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</th>
                                            <th class="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Note</th>
                                            <th class="p-5 pr-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Logged By</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-100">
                                        ${l.map(u=>`
                                            <tr class="hover:bg-slate-50/80 transition-all">
                                                <td class="p-5 pl-8">
                                                    <p class="text-xs font-black text-slate-900">${new Date(u.created_at).toLocaleDateString()}</p>
                                                    <p class="text-[10px] text-slate-400 font-bold">${new Date(u.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</p>
                                                </td>
                                                <td class="p-5">
                                                    <p class="text-xs font-black text-slate-900">${u.part_name}</p>
                                                    <p class="text-[10px] text-slate-400 font-bold uppercase">${u.brand_name||"N/A"}</p>
                                                </td>
                                                <td class="p-5">
                                                    <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${u.type==="in"?"bg-emerald-50 text-emerald-600 border border-emerald-200":"bg-rose-50 text-rose-600 border border-rose-200"}">
                                                        ${u.type==="in"?"▲ Stock In":"▼ Stock Out"}
                                                    </span>
                                                </td>
                                                <td class="p-5">
                                                    <span class="text-sm font-black ${u.type==="in"?"text-emerald-600":"text-rose-600"}">
                                                        ${u.type==="in"?"+":"-"}${u.quantity}
                                                    </span>
                                                </td>
                                                <td class="p-5 text-xs text-slate-500 font-medium max-w-[180px] truncate">${u.note||"—"}</td>
                                                <td class="p-5 pr-8 text-xs font-bold text-slate-700">${u.logged_by}</td>
                                            </tr>
                                        `).join("")}
                                    </tbody>
                                </table>
                            </div>
                        `:`
                            <div class="p-20 text-center text-slate-400 font-bold">No stock transactions recorded yet.</div>
                        `}
                    </div>

                </main>
            </div>
        `}catch{e.innerHTML='<div class="p-20 text-center text-rose-500 font-bold">Failed to load stock logs.</div>'}}function me(e=null,t){var s;(s=document.getElementById("stock-adjust-modal"))==null||s.remove();const a=document.createElement("div");a.id="stock-adjust-modal",a.className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/50 backdrop-blur-sm",a.innerHTML=`
        <div class="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div class="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                    <h2 class="text-xl font-black text-slate-900">Stock Adjustment</h2>
                    <p class="text-xs text-slate-400 font-bold mt-1">Add or remove units from inventory</p>
                </div>
                <button onclick="document.getElementById('stock-adjust-modal').remove()" class="text-slate-400 hover:text-slate-900 transition-all">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div class="p-8 space-y-6">
                <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Part ID or Search</label>
                    <input type="number" id="stock-part-id" value="${e||""}" placeholder="Enter Part ID"
                        class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-sm">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction Type</label>
                        <select id="stock-type" class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm">
                            <option value="in">▲ Stock In (Add)</option>
                            <option value="out">▼ Stock Out (Remove)</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</label>
                        <input type="number" id="stock-qty" min="1" value="1" placeholder="Units"
                            class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-sm">
                    </div>
                </div>
                <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Note (Optional)</label>
                    <input type="text" id="stock-note" placeholder="e.g. Monthly restock from supplier, or Used for repair order"
                        class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-sm">
                </div>
                <button onclick="app.submitStockAdjustment()" class="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
                    Record Transaction
                </button>
            </div>
        </div>
    `,document.body.appendChild(a)}async function fe(e){var r,n,l,d,u;const t=(r=document.getElementById("stock-part-id"))==null?void 0:r.value,a=(n=document.getElementById("stock-type"))==null?void 0:n.value,s=(l=document.getElementById("stock-qty"))==null?void 0:l.value,o=(d=document.getElementById("stock-note"))==null?void 0:d.value;if(!t||!s){e.showToast("Part ID and Quantity are required","error");return}try{const c=await(await fetch(e.api("api/stock_logs.php"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({part_id:parseInt(t),type:a,quantity:parseInt(s),note:o})})).json();c.success?(e.showToast(`Stock ${a==="in"?"added":"removed"} successfully! New qty: ${c.new_stock}`),(u=document.getElementById("stock-adjust-modal"))==null||u.remove(),e.renderStockLogs(document.getElementById("view-container"))):e.showToast(c.error||"Failed","error")}catch{e.showToast("Network error","error")}}async function ve(e,t){var s,o;const a=(o=(s=t.state.user)==null?void 0:s.role)==null?void 0:o.toLowerCase();if(a!=="admin"&&a!=="staff"){t.showToast("Access required","error");return}e.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const[r,n]=await Promise.all([fetch(t.api("api/products.php")),fetch(t.api("api/stock_logs.php"))]),{products:l}=await r.json(),{logs:d,low_stock:u}=await n.json();window._reportData={products:l,logs:d,low_stock:u},e.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${t.getSidebar("reports")}
                <main class="flex-1 p-8 lg:p-12 space-y-10">

                    <!-- Header -->
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div class="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Analytics</div>
                            <h2 class="text-4xl font-black text-slate-900 tracking-tight">Inventory <span class="text-blue-600">Reports</span></h2>
                            <p class="text-slate-500 mt-2 font-medium">Stock overview, low-stock alerts, and exportable reports.</p>
                        </div>
                        <div class="flex flex-wrap gap-3 no-print">
                            <button onclick="app.exportStockReport()" 
                                class="px-5 py-3 bg-emerald-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                                Export PDF
                            </button>
                            <button onclick="app.exportStockCSV()" 
                                class="px-5 py-3 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                                Export Excel / CSV
                            </button>
                        </div>
                    </div>

                    <!-- Summary Stats -->
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        ${[{label:"Total SKUs",value:(l==null?void 0:l.length)||0,color:"blue",icon:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"},{label:"Low Stock Items",value:(u==null?void 0:u.length)||0,color:"rose",icon:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"},{label:"Out of Stock",value:(l||[]).filter(h=>(h.stock_quantity||0)<=0).length,color:"amber",icon:"M6 18L18 6M6 6l12 12"},{label:"Stock Transactions",value:(d==null?void 0:d.length)||0,color:"emerald",icon:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"}].map(h=>`
                            <div class="bg-white border border-slate-200 rounded-3xl p-7 space-y-4">
                                <div class="w-12 h-12 rounded-2xl bg-${h.color}-50 flex items-center justify-center">
                                    <svg class="w-6 h-6 text-${h.color}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${h.icon}"/></svg>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${h.label}</p>
                                    <p class="text-3xl font-black text-slate-900 mt-1">${h.value}</p>
                                </div>
                            </div>
                        `).join("")}
                    </div>

                    <!-- Charts Row -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Stock Level Chart -->
                        <div class="bg-white border border-slate-200 rounded-3xl p-8">
                            <h3 class="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Stock Level by Brand</h3>
                            <canvas id="chart-stock-brand" height="260"></canvas>
                        </div>
                        <!-- Stock In vs Out Chart -->
                        <div class="bg-white border border-slate-200 rounded-3xl p-8">
                            <h3 class="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Stock Movement (Last 30 Days)</h3>
                            <canvas id="chart-movement" height="260"></canvas>
                        </div>
                    </div>

                    <!-- Low Stock Table (Printable) -->
                    <div id="printable-report" class="bg-white border border-slate-200 rounded-3xl overflow-hidden">
                        <div class="p-8 border-b border-slate-100 flex justify-between items-center">
                            <div class="flex items-center gap-4">
                                <div class="w-2 h-8 bg-rose-500 rounded-full"></div>
                                <h3 class="text-lg font-black text-slate-900">Low Stock Report</h3>
                            </div>
                            <span class="text-xs text-slate-400 font-bold">Generated: ${new Date().toLocaleDateString()}</span>
                        </div>
                        ${u&&u.length>0?`
                            <div class="overflow-x-auto">
                                <table class="w-full text-left">
                                    <thead class="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th class="p-5 pl-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Part Name</th>
                                            <th class="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand</th>
                                            <th class="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Stock</th>
                                            <th class="p-5 pr-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-100">
                                        ${u.map(h=>`
                                            <tr class="hover:bg-rose-50/50 transition-all">
                                                <td class="p-5 pl-8 font-black text-slate-900 text-sm">${h.part_name}</td>
                                                <td class="p-5 text-xs font-bold text-slate-500 uppercase">${h.brand||"N/A"}</td>
                                                <td class="p-5 text-sm font-black ${h.stock_quantity<=0?"text-rose-600":"text-amber-600"}">${h.stock_quantity} units</td>
                                                <td class="p-5 pr-8">
                                                    <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase ${h.stock_quantity<=0?"bg-rose-50 text-rose-600 border border-rose-200":"bg-amber-50 text-amber-600 border border-amber-200"}">
                                                        ${h.stock_quantity<=0?"Out of Stock":"Low Stock"}
                                                    </span>
                                                </td>
                                            </tr>
                                        `).join("")}
                                    </tbody>
                                </table>
                            </div>
                        `:'<div class="p-16 text-center text-slate-400 font-bold">✓ All items are well-stocked.</div>'}
                    </div>

                </main>
            </div>
        `,window.Chart||await new Promise((h,m)=>{const v=document.createElement("script");v.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",v.onload=h,v.onerror=m,document.head.appendChild(v)});const i={};(l||[]).forEach(h=>{const m=h.brand||"Unknown";i[m]=(i[m]||0)+(h.stock_quantity||0)});const c=Object.keys(i),p=Object.values(i);new window.Chart(document.getElementById("chart-stock-brand"),{type:"bar",data:{labels:c,datasets:[{label:"Units in Stock",data:p,backgroundColor:"#3b82f6",borderRadius:8,borderSkipped:!1}]},options:{responsive:!0,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0},x:{grid:{display:!1}}}}});const x={},b=new Date;for(let h=29;h>=0;h--){const m=new Date(b);m.setDate(m.getDate()-h);const v=m.toISOString().split("T")[0];x[v]={in:0,out:0}}(d||[]).forEach(h=>{var v,y;const m=((v=h.created_at)==null?void 0:v.split(" ")[0])||((y=h.created_at)==null?void 0:y.split("T")[0]);x[m]&&(x[m][h.type]+=parseInt(h.quantity))});const k=Object.keys(x).map(h=>new Date(h).toLocaleDateString("en-IN",{day:"2-digit",month:"short"}));new window.Chart(document.getElementById("chart-movement"),{type:"line",data:{labels:k,datasets:[{label:"Stock In",data:Object.values(x).map(h=>h.in),borderColor:"#10b981",backgroundColor:"#10b98130",fill:!0,tension:.4},{label:"Stock Out",data:Object.values(x).map(h=>h.out),borderColor:"#f43f5e",backgroundColor:"#f43f5e20",fill:!0,tension:.4}]},options:{responsive:!0,plugins:{legend:{position:"bottom"}},scales:{y:{beginAtZero:!0},x:{ticks:{maxTicksLimit:8},grid:{display:!1}}}}})}catch{e.innerHTML='<div class="p-20 text-center text-rose-500 font-bold">Failed to load reports.</div>'}}function we(){window.print()}function ke(){const{products:e,low_stock:t}=window._reportData||{};if(!e){alert("Report data not loaded yet. Please open Reports page first.");return}const a=[["Part Name","Brand","Machine Model","Stock Qty","Cost (₹)","Status","Part ID"]];e.forEach(d=>{const u=parseInt(d.stock_quantity??0),i=u<=0?"Out of Stock":u<=5?"Low Stock":"In Stock";a.push([d.part_name||"",d.brand||"",d.machine_model||"",u,d.cost||0,i,d.id])}),a.push([]),a.push(["--- STOCK LOG SUMMARY ---"]),a.push(["Date","Part Name","Brand","Type","Quantity","Note","Logged By"]);const{logs:s}=window._reportData||{};(s||[]).forEach(d=>{a.push([new Date(d.created_at).toLocaleString(),d.part_name||"",d.brand_name||"",d.type==="in"?"Stock In":"Stock Out",d.quantity,d.note||"",d.logged_by||""])});const o=a.map(d=>d.map(u=>`"${String(u).replace(/"/g,'""')}"`).join(",")).join(`
`),r=new Blob(["\uFEFF"+o],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(r),l=document.createElement("a");l.href=n,l.download=`PARTSPRO_Stock_Report_${new Date().toISOString().split("T")[0]}.csv`,l.click(),URL.revokeObjectURL(n)}async function ye(e,t){var s,o,r;const a=(o=(s=t.state.user)==null?void 0:s.role)==null?void 0:o.toLowerCase();if(a!=="staff"&&a!=="admin"){t.showToast("Staff access required","error"),history.pushState(null,null,t.basePath+"/login"),t.handleRouting();return}e.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>';try{const[n,l]=await Promise.all([fetch(t.api("api/products.php")),fetch(t.api("api/stock_logs.php"))]),{products:d}=await n.json(),{logs:u,low_stock:i}=await l.json(),c=(d||[]).reduce((b,k)=>b+(parseInt(k.stock_quantity)||0),0),p=(d||[]).filter(b=>(parseInt(b.stock_quantity)||0)<=0).length,x=(u||[]).slice(0,8);e.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${Se(t)}
                <main class="flex-1 p-8 lg:p-12 space-y-10">

                    <!-- Header -->
                    <div>
                        <div class="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Staff Console</div>
                        <h2 class="text-4xl font-black text-slate-900 tracking-tight">Inventory <span class="text-blue-600">Workstation</span></h2>
                        <p class="text-slate-500 mt-2 font-medium">Welcome, ${(r=t.state.user)==null?void 0:r.name}. Manage stock levels and view inventory status.</p>
                    </div>

                    <!-- Stats -->
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        ${[{label:"Total SKUs",value:(d==null?void 0:d.length)||0,color:"blue",icon:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"},{label:"Total Units",value:c,color:"emerald",icon:"M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"},{label:"Low Stock",value:(i==null?void 0:i.length)||0,color:"amber",icon:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"},{label:"Out of Stock",value:p,color:"rose",icon:"M6 18L18 6M6 6l12 12"}].map(b=>`
                            <div class="bg-white border border-slate-200 rounded-3xl p-7 space-y-4 hover:shadow-xl hover:shadow-${b.color}-900/5 transition-all">
                                <div class="w-12 h-12 rounded-2xl bg-${b.color}-50 flex items-center justify-center">
                                    <svg class="w-6 h-6 text-${b.color}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${b.icon}"/></svg>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${b.label}</p>
                                    <p class="text-3xl font-black text-slate-900 mt-1">${b.value}</p>
                                </div>
                            </div>
                        `).join("")}
                    </div>

                    <!-- Low Stock Alert -->
                    ${i&&i.length>0?`
                        <div class="bg-rose-50 border border-rose-200 rounded-3xl p-6">
                            <div class="flex items-center justify-between mb-5">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center">
                                        <svg class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                                    </div>
                                    <p class="text-xs font-black text-rose-700 uppercase tracking-widest">⚠ ${i.length} Item${i.length>1?"s":""} Need Restocking</p>
                                </div>
                                <button onclick="app.renderStockAdjustModal()" class="px-4 py-2 bg-rose-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-700 transition-all">
                                    Adjust Stock
                                </button>
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                ${i.map(b=>`
                                    <div class="bg-white border border-rose-100 rounded-2xl p-4">
                                        <p class="text-xs font-black text-slate-900 truncate">${b.part_name}</p>
                                        <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">${b.brand||"N/A"}</p>
                                        <div class="mt-3 flex items-center justify-between">
                                            <span class="text-sm font-black ${b.stock_quantity<=0?"text-rose-600":"text-amber-600"}">${b.stock_quantity}</span>
                                            <button onclick="app.renderStockAdjustModal(${b.id})" class="text-[9px] font-black text-blue-600 hover:underline uppercase tracking-widest">Restock</button>
                                        </div>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `:`
                        <div class="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 flex items-center gap-4">
                            <div class="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                            </div>
                            <p class="text-xs font-black text-emerald-700 uppercase tracking-widest">All stock levels are healthy — no alerts</p>
                        </div>
                    `}

                    <!-- Quick Actions -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <button onclick="app.renderStockAdjustModal()"
                            class="bg-white border-2 border-dashed border-blue-200 rounded-3xl p-8 text-center hover:border-blue-600 hover:bg-blue-50 transition-all group space-y-3">
                            <div class="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <svg class="w-7 h-7 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                            </div>
                            <p class="font-black text-sm text-slate-900">Adjust Stock</p>
                            <p class="text-xs text-slate-400 font-medium">Record stock in or stock out</p>
                        </button>
                        <a href="/admin/stock-logs" data-link
                            class="bg-white border-2 border-dashed border-emerald-200 rounded-3xl p-8 text-center hover:border-emerald-600 hover:bg-emerald-50 transition-all group space-y-3 block">
                            <div class="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto group-hover:bg-emerald-600 transition-all">
                                <svg class="w-7 h-7 text-emerald-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            </div>
                            <p class="font-black text-sm text-slate-900">Stock Log History</p>
                            <p class="text-xs text-slate-400 font-medium">View all transactions</p>
                        </a>
                        <a href="/admin/reports" data-link
                            class="bg-white border-2 border-dashed border-amber-200 rounded-3xl p-8 text-center hover:border-amber-600 hover:bg-amber-50 transition-all group space-y-3 block">
                            <div class="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto group-hover:bg-amber-600 transition-all">
                                <svg class="w-7 h-7 text-amber-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                            </div>
                            <p class="font-black text-sm text-slate-900">Reports & Export</p>
                            <p class="text-xs text-slate-400 font-medium">View charts and export CSV</p>
                        </a>
                    </div>

                    <!-- Recent Activity -->
                    <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden">
                        <div class="p-8 border-b border-slate-100 flex items-center gap-4">
                            <div class="w-2 h-8 bg-blue-600 rounded-full"></div>
                            <h3 class="text-lg font-black text-slate-900">Recent Stock Activity</h3>
                        </div>
                        ${x.length>0?`
                            <div class="divide-y divide-slate-100">
                                ${x.map(b=>`
                                    <div class="p-5 px-8 flex items-center justify-between hover:bg-slate-50 transition-all">
                                        <div class="flex items-center gap-4">
                                            <div class="w-9 h-9 rounded-xl flex items-center justify-center ${b.type==="in"?"bg-emerald-50":"bg-rose-50"}">
                                                <svg class="w-4 h-4 ${b.type==="in"?"text-emerald-600":"text-rose-600"}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="${b.type==="in"?"M5 10l7-7m0 0l7 7m-7-7v18":"M19 14l-7 7m0 0l-7-7m7 7V3"}"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm font-black text-slate-900">${b.part_name}</p>
                                                <p class="text-[10px] text-slate-400 font-bold uppercase">${b.brand_name||"N/A"} • ${new Date(b.created_at).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <span class="text-sm font-black ${b.type==="in"?"text-emerald-600":"text-rose-600"}">
                                            ${b.type==="in"?"+":"-"}${b.quantity} units
                                        </span>
                                    </div>
                                `).join("")}
                            </div>
                        `:'<div class="p-16 text-center text-slate-400 font-bold">No stock activity yet.</div>'}
                    </div>

                </main>
            </div>
        `}catch{e.innerHTML='<div class="p-20 text-center text-rose-500 font-bold">Failed to load staff panel.</div>'}}function Se(e){var o;const t=((o=e.state.user)==null?void 0:o.name)||"Staff",a=window.location.pathname,s=(r,n,l,d)=>`
        <a href="${r}" data-link class="flex items-center gap-4 px-4 py-3.5 rounded-2xl ${d?"bg-blue-600 text-white shadow-xl shadow-blue-600/20":"text-slate-500 hover:bg-slate-50 hover:text-slate-900"} transition-all font-bold text-[11px] uppercase tracking-tight group">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="${l}"/></svg>
            <span class="${d?"":"group-hover:translate-x-1"} transition-transform">${n}</span>
        </a>`;return`
        <aside class="w-full lg:w-72 bg-[#fdfdfd] border-r border-slate-200 flex flex-col sticky top-20 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            <div class="p-8 border-b border-slate-100 bg-slate-50/30">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-lg">${t.charAt(0)}</div>
                    <div>
                        <p class="text-xs font-black text-slate-900">${t}</p>
                        <span class="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-widest">Staff</span>
                    </div>
                </div>
            </div>
            <div class="flex-1 p-6 space-y-8">
                <div class="space-y-2">
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-4 opacity-60">Inventory Console</p>
                    <nav class="space-y-1.5">
                        ${s("/staff","Staff Dashboard","M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",a.includes("/staff")&&!a.includes("/stock")&&!a.includes("/report"))}
                        ${s("/admin/stock-logs","Stock Movement Log","M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",a.includes("/stock-logs"))}
                        ${s("/admin/reports","Reports & Export","M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",a.includes("/reports"))}
                        ${s("/admin/inventory","View Inventory","M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",a.includes("/inventory"))}
                    </nav>
                </div>
            </div>
            <div class="p-6 border-t border-slate-100">
                <a href="/logout" data-link class="flex items-center gap-4 px-4 py-4 rounded-2xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-black text-xs group">
                    <div class="w-10 h-10 rounded-xl bg-rose-100/50 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    </div>
                    Logout
                </a>
            </div>
        </aside>`}async function _e(e,t){if(!t.state.user){history.pushState(null,null,t.basePath+"/login"),t.handleRouting();return}e.innerHTML=`
        <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
            ${t.getSidebar("dashboard")}

            <main class="flex-1 p-8 lg:p-12 space-y-12">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-2 h-8 bg-bosch-blue rounded-none"></div>
                            <h2 class="text-4xl font-black text-bosch-blue tracking-tight uppercase">Partner <span class="text-bosch-blue">Portal</span></h2>
                        </div>
                        <p class="text-slate-500 font-bold text-lg">Exclusive procurement overview for ${t.state.user.name}.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${[{l:"Total Procurement",v:(t.state.settings.currency||"₹")+"0.00",s:"+0%",c:"blue"},{l:"Total Savings",v:(t.state.settings.currency||"₹")+"0.00",s:"+0%",c:"emerald"},{l:"Active Orders",v:"0",s:"- -",c:"amber"},{l:"Saved Items",v:"0",s:"- -",c:"indigo"}].map(a=>`
                        <div class="bg-white rounded-none p-8 shadow-2xl shadow-slate-200/50 border-2 border-slate-100 group hover:border-bosch-blue transition-all duration-300 relative overflow-hidden">
                            <div class="absolute -right-4 -top-4 w-24 h-24 bg-${a.c}-50 rounded-none blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 relative z-10">${a.l}</p>
                            <div class="flex items-end justify-between relative z-10">
                                <h3 class="text-4xl font-black text-bosch-blue">${a.v}</h3>
                                <span class="text-[10px] font-black text-${a.c}-600 bg-${a.c}-50 px-3 py-1.5 rounded-none border border-${a.c}-100 shadow-sm">${a.s}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
                
                <div class="bg-industrial-gray rounded-none p-12 text-white relative overflow-hidden shadow-xl border-l-8 border-bosch-blue">
                    <div class="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-bosch-blue/20 to-transparent"></div>
                    <div class="relative z-10 max-w-2xl">
                        <h3 class="text-3xl font-black tracking-tight mb-4 uppercase">Express Bulk Ordering</h3>
                        <p class="text-slate-400 font-medium mb-8 leading-relaxed">Skip the catalog. Upload a CSV file with SKUs (Models) and Quantities to instantly generate a massive quotation cart using your exclusive tier pricing.</p>
                        <div class="flex flex-wrap gap-4">
                            <button onclick="app.renderBulkOrderModal()" class="px-8 py-4 bg-white text-bosch-blue rounded-none font-black text-[11px] uppercase tracking-widest shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                Upload CSV Order
                            </button>
                            <button onclick="app.renderCatalog(document.getElementById('view-container'))" class="px-8 py-4 bg-bosch-blue text-white rounded-none font-black text-[11px] uppercase tracking-widest shadow-xl shadow-slate-900/30 hover:bg-slate-700 transition-colors">Browse Catalog Manually</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `,t.loadDashboardStats()}async function Me(e){try{const a=await(await fetch(e.api("api/dashboard_stats.php"))).json(),s=document.querySelectorAll("main h3");if(s.length>=4){const o=e.state.settings.currency||"₹";s[0].textContent=o+parseFloat(a.total_procured||0).toLocaleString(),s[1].textContent=o+parseFloat(a.total_savings||0).toLocaleString(),s[2].textContent=a.active_orders||0,s[3].textContent=a.saved_items||0}}catch(t){console.error("Failed to load dashboard stats",t)}}function $e(e){const t=document.createElement("div");t.id="bulk-order-modal",t.className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300",t.innerHTML=`
        <div class="bg-white rounded-none w-full max-w-xl p-10 space-y-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-300">
            <button onclick="document.getElementById('bulk-order-modal').remove()" class="absolute top-6 right-6 w-10 h-10 rounded-none bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-all text-slate-400 hover:text-bosch-blue">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div>
                <h2 class="text-3xl font-black text-bosch-blue tracking-tight uppercase">Express <span class="text-bosch-blue">Bulk Order</span></h2>
                <p class="text-slate-500 font-bold mt-2">Upload your inventory request instantly.</p>
            </div>
            
            <div class="bg-industrial-gray text-white border-l-4 border-bosch-blue rounded-none p-6 space-y-3">
                <p class="text-xs text-bosch-blue font-black uppercase tracking-widest">CSV Format Requirement:</p>
                <p class="text-[11px] font-bold text-slate-300">Your CSV must contain these exact column headers:</p>
                <code class="text-[10px] text-bosch-blue block bg-slate-900 p-4 rounded-none font-mono shadow-inner border border-bosch-blue/50">Model/SKU, Quantity</code>
            </div>

            <form id="bulk-order-form" class="space-y-6">
                <div class="border-[3px] border-dashed border-slate-200 rounded-none p-12 text-center hover:border-bosch-blue hover:bg-bosch-blue/5 transition-all cursor-pointer relative group">
                    <input type="file" name="order_csv" accept=".csv" required class="absolute inset-0 opacity-0 cursor-pointer z-10" onchange="document.getElementById('csv-filename').textContent = this.files[0] ? this.files[0].name : 'Drop your CSV file here or browse'">
                    <div class="w-16 h-16 bg-bosch-blue/10 rounded-none flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-bosch-blue/20 transition-all text-bosch-blue">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <p id="csv-filename" class="text-sm text-slate-500 font-black">Drop your CSV file here or <span class="text-bosch-blue underline">browse</span></p>
                </div>
                <button type="submit" class="w-full py-4 rounded-none bg-bosch-blue text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-industrial-gray transition-colors">Generate Quotation Cart</button>
            </form>
        </div>
    `,document.body.appendChild(t),document.getElementById("bulk-order-form").onsubmit=async a=>{a.preventDefault();const s=a.target.querySelector("button");s.disabled=!0,s.innerHTML='<span class="animate-pulse">Processing Order...</span>';const o=new FormData(a.target);try{const n=await(await fetch(e.api("api/bulk_order.php"),{method:"POST",body:o})).json();n.success?(e.showToast(`Success! ${n.count} items added to your cart.`),t.remove(),e.state.cart=n.cart,e.renderCart(document.getElementById("view-container"))):e.showToast(n.error,"error")}catch{e.showToast("Bulk order failed. Check CSV format.","error")}finally{s.disabled=!1,s.innerHTML="Generate Quotation Cart"}}}async function Ce(e,t){if(!t.state.user){history.pushState(null,null,t.basePath+"/login"),t.handleRouting();return}e.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full"></div></div>';try{e.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${t.getSidebar("parts_list")}

                <main class="flex-1 p-8 lg:p-12">
                    <div class="max-w-6xl mx-auto space-y-12 animate-fade-in">
                        <div class="flex justify-between items-end">
                            <div>
                                <div class="text-[10px] font-black uppercase tracking-[0.3em] text-bosch-blue">Personal Collection</div>
                                <h2 class="text-4xl font-black tracking-tight text-bosch-blue uppercase">My <span class="text-bosch-blue">Parts List</span></h2>
                                <p class="text-slate-500 font-medium mt-2 text-lg">Your curated selection of essential spares for quick procurement.</p>
                            </div>
                            <button onclick="app.renderCatalog(document.getElementById('view-container'))" class="px-8 py-3.5 bg-bosch-blue text-white font-black text-[10px] uppercase tracking-widest rounded-none hover:bg-industrial-gray transition-all shadow-lg shadow-blue-900/20">Add More Spares</button>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div class="card p-8 group border border-slate-200 rounded-none shadow-sm">
                                <div class="w-full h-48 bg-slate-50 rounded-none mb-6 overflow-hidden border border-slate-100 flex items-center justify-center">
                                    <svg class="w-20 h-20 text-slate-200 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                                </div>
                                <h4 class="text-lg font-black text-bosch-blue mb-1 uppercase tracking-widest">Carbon Brush GWS 600</h4>
                                <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">SKU: CB-GWS600</p>
                                <div class="flex gap-3">
                                    <button class="flex-1 h-12 rounded-none bg-bosch-blue text-white font-black text-[10px] uppercase tracking-widest hover:bg-industrial-gray transition-colors">Add to Cart</button>
                                    <button class="w-12 h-12 rounded-none border border-slate-200 flex items-center justify-center text-bosch-red hover:bg-bosch-red/10 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `}catch{t.showToast("Failed to load parts list","error")}}function je(e,t){e.innerHTML=`
        <div class="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 relative overflow-hidden bg-bosch-blue lightning-bg">
            <!-- Lightning Glow Elements -->
            <div class="lightning-glow w-[600px] h-[600px] -top-48 -right-48 opacity-20"></div>
            <div class="lightning-glow w-[400px] h-[400px] -bottom-24 -left-24 opacity-10" style="animation-delay: -2s;"></div>
            <div class="lightning-glow w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5" style="animation-delay: -4s;"></div>

            <div class="w-full max-w-md relative z-10 animate-fade-in">
                <div class="bg-white rounded-none shadow-premium border-t-8 border-bosch-blue p-12 space-y-12">
                    <div class="text-center">
                        <h2 class="text-4xl font-black text-bosch-blue tracking-tight uppercase">Partner Login</h2>
                        <p class="text-slate-500 mt-2 font-bold text-lg">Secure access to the B2B portal.</p>
                        <div class="w-16 h-1 bg-bosch-red mx-auto mt-6"></div>
                    </div>
                    
                    <form id="login-form" class="space-y-8">
                        <div class="space-y-3">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Corporate Email</label>
                            <div class="relative">
                                <input type="email" name="email" required 
                                    class="h-16 pl-14 pr-8 rounded-none border-2 border-slate-100 bg-slate-50 text-sm font-black text-slate-700 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white focus:ring-4 focus:ring-bosch-blue/10 transition-all w-full" 
                                    placeholder="name@company.com">
                                <div class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Access Password</label>
                            <div class="relative">
                                <input type="password" name="password" required 
                                    class="h-16 pl-14 pr-8 rounded-none border-2 border-slate-100 bg-slate-50 text-sm font-black text-slate-700 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white focus:ring-4 focus:ring-bosch-blue/10 transition-all w-full" 
                                    placeholder="••••••••">
                                <div class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between">
                            <label class="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" class="w-5 h-5 border-2 border-slate-200 rounded-none text-bosch-blue focus:ring-bosch-blue transition-all">
                                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-bosch-blue transition-colors">Keep me active</span>
                            </label>
                            <a href="#" class="text-[10px] font-black text-bosch-blue uppercase tracking-widest hover:underline">Reset Password</a>
                        </div>

                        <button type="submit" class="w-full h-16 rounded-none bg-bosch-blue text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-slate-900/20 hover:bg-industrial-gray transition-all flex items-center justify-center gap-3 group">
                            Synchronize & Enter
                            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                        </button>
                    </form>

                    <div class="text-center pt-8 border-t border-slate-100">
                        <p class="text-xs font-bold text-slate-500">
                            New Partner? <a href="/register" data-link class="text-bosch-blue font-black uppercase tracking-widest text-[11px] ml-2 hover:underline">Request Onboarding</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `,document.getElementById("login-form").onsubmit=async a=>{var n;a.preventDefault();const s=a.target.querySelector("button");s.disabled=!0,s.innerHTML='<span class="animate-pulse">Authorizing...</span>';const o=new FormData(a.target),r=Object.fromEntries(o.entries());r.action="login";try{const d=await(await fetch(t.api("api/auth.php"),{method:"POST",body:JSON.stringify(r)})).json();if(d.success){t.state.user=d.user,t.updateAuthUI();const u=(n=d.user.role)==null?void 0:n.toLowerCase(),i=u==="admin"?"/admin":u==="staff"?"/staff":"/dashboard";history.pushState(null,null,t.basePath+i),t.handleRouting(),t.showToast(`Welcome, ${d.user.name}.`)}else t.showToast(d.error||"Authorization failed","error")}catch{t.showToast("Authentication server offline","error")}finally{s.disabled=!1,s.innerHTML="Synchronize & Enter"}}}function Be(e,t){e.innerHTML=`
        <div class="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 bg-bosch-blue relative overflow-hidden lightning-bg">
            <!-- Lightning Glow Elements -->
            <div class="lightning-glow w-[500px] h-[500px] -top-32 -left-32 opacity-15"></div>
            <div class="lightning-glow w-[400px] h-[400px] -bottom-20 -right-20 opacity-10" style="animation-delay: -3s;"></div>
            
            <div class="w-full max-w-2xl relative z-10 animate-fade-in">
                <div class="bg-white rounded-none shadow-premium border-t-8 border-bosch-blue p-12 lg:p-16 space-y-12 relative overflow-hidden">
                    <!-- Subtle Interior Glow -->
                    <div class="absolute -top-24 -right-24 w-48 h-48 bg-bosch-blue/5 rounded-full blur-3xl"></div>
                    <div class="flex flex-col md:flex-row gap-12 items-center">
                        <div class="flex-1 space-y-6">
                            <h2 class="text-4xl font-black text-bosch-blue tracking-tight uppercase">Partner <span class="text-bosch-blue">Onboarding</span></h2>
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
                                <input type="text" name="name" required class="rounded-none border-2 border-slate-100 bg-slate-50 h-14 px-4 text-sm font-black text-slate-700 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white focus:ring-4 focus:ring-bosch-blue/10 transition-all w-full" placeholder="Full Name">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Business Email</label>
                                <input type="email" name="email" required class="rounded-none border-2 border-slate-100 bg-slate-50 h-14 px-4 text-sm font-black text-slate-700 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white focus:ring-4 focus:ring-bosch-blue/10 transition-all w-full" placeholder="Corporate Email">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Create Password</label>
                                <input type="password" name="password" required class="rounded-none border-2 border-slate-100 bg-slate-50 h-14 px-4 text-sm font-black text-slate-700 focus:outline-none focus:border-bosch-blue focus:border-l-8 focus:bg-white focus:ring-4 focus:ring-bosch-blue/10 transition-all w-full" placeholder="••••••••">
                            </div>
                            <button type="submit" class="w-full h-16 rounded-none bg-industrial-gray text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-bosch-blue transition-all">Submit Application</button>
                            <p class="text-center text-[10px] font-bold text-slate-400">By applying, you agree to our B2B Terms of Service.</p>
                        </form>
                    </div>

                    <div class="divider"></div>

                    <div class="text-center">
                        <p class="text-sm font-bold text-slate-500">
                            Already a registered partner? <a href="/login" data-link class="text-bosch-blue font-black uppercase tracking-widest text-[11px] ml-2 hover:underline">Access Portal</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `,document.getElementById("register-form").onsubmit=async a=>{a.preventDefault();const s=a.target.querySelector("button");s.disabled=!0,s.innerHTML='<span class="animate-pulse">Processing...</span>';const o=new FormData(a.target),r=Object.fromEntries(o.entries());r.action="register";try{const l=await(await fetch(t.api("api/auth.php"),{method:"POST",body:JSON.stringify(r)})).json();l.success?(t.showToast("Application submitted. We will review your account soon."),history.pushState(null,null,t.basePath+"/login"),t.handleRouting()):t.showToast(l.error||"Submission failed","error")}catch{t.showToast("Network error during submission","error")}finally{s.disabled=!1,s.innerHTML="Submit Application"}}}function Te(e,t){if(t.state.cart.length===0){e.innerHTML=`
            <div class="text-center py-32 animate-in fade-in duration-500">
                <div class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                </div>
                <h2 class="text-2xl font-black text-slate-900 mb-2">Your cart is empty</h2>
                <p class="text-slate-500 font-medium mb-8">Add spare parts to your cart to request a quotation.</p>
                <a href="/catalog" data-link class="px-8 py-3 bg-bosch-blue text-white rounded-none font-black text-[11px] uppercase tracking-widest hover:bg-industrial-gray transition-all shadow-lg shadow-slate-900/20">Browse Catalogue</a>
            </div>
        `;return}e.innerHTML=`
        <div class="max-w-4xl mx-auto py-12 px-4 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h2 class="text-3xl font-black text-slate-900 tracking-tight">Quotation Cart</h2>
                <p class="text-slate-500 mt-1 font-medium">Review and adjust items before submitting for pricing.</p>
            </div>

            <div class="bg-white rounded-none border-2 border-slate-100 shadow-sm overflow-hidden">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Spare Part Details</th>
                            <th class="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</th>
                            <th class="p-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${t.state.cart.map(a=>`
                            <tr class="hover:bg-slate-50/50 transition-colors">
                                <td class="p-6">
                                    <div class="font-black text-slate-900 uppercase tracking-widest">${a.part_name}</div>
                                    <div class="text-xs text-slate-500 font-medium mt-0.5 uppercase tracking-widest">${a.brand} • ${a.machine_model}</div>
                                </td>
                                <td class="p-6">
                                    <div class="flex items-center gap-3">
                                        <input type="number" min="1" value="${a.quantity}" onchange="app.updateCartQty(${a.id}, this.value)" class="w-20 h-10 bg-slate-50 border border-slate-200 rounded-none px-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-bosch-blue transition-all">
                                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Units</span>
                                    </div>
                                </td>
                                <td class="p-6 text-right">
                                    <button onclick="app.removeFromCart(${a.id})" class="text-bosch-red hover:text-white p-2 hover:bg-bosch-red rounded-none transition-all">
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
                    <svg class="w-10 h-10 text-white bg-bosch-blue p-2 rounded-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <div>
                        <p class="text-[10px] font-black text-slate-900 uppercase tracking-widest">Standard Response Time: 24 Hours</p>
                        <p class="text-[11px] font-medium leading-tight">Our team will review your request and provide competitive B2B pricing via email.</p>
                    </div>
                </div>
                <button onclick="app.submitQuotation()" class="w-full md:w-auto h-14 px-12 rounded-none bg-bosch-blue text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-slate-900/30 hover:bg-industrial-gray transition-all">
                    Submit RFQ Request
                </button>
            </div>
        </div>
    `}function B(e,t){const a=t.state.settings||{},s=[`<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
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
            <text x="52" y="27" text-anchor="middle" fill="white" font-size="17" font-weight="900" font-family="Arial" letter-spacing="3">HILTI</text></svg>`],o=[1,2,3,4,5,6].map((n,l)=>({name:a["brand"+n+"_name"]||["BOSCH","MAKITA","DEWALT","HIKOKI","MILWAUKEE","HILTI"][l],tag:a["brand"+n+"_tag"]||"Power Tools",desc:a["brand"+n+"_desc"]||"",logo:a["brand"+n+"_logo"]||"",svg:s[l]})),r=a.brands_title?a.brands_title.replace("text-bosch-red","text-[#ed1c24]"):'Our Trusted <span class="text-[#ed1c24]">Brands</span>';f(e,`
        <div class="animate-fade-in min-h-screen bg-slate-50">
            <!-- Page Header -->
            <section class="bg-white border-b border-slate-100 py-24">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div class="text-[10px] font-black uppercase tracking-[0.4em] text-[#ed1c24] mb-6">Authorized Partners</div>
                    <h1 class="text-6xl font-black text-slate-900 tracking-tight mb-6 uppercase">
                        ${r}
                    </h1>
                    <p class="text-slate-500 font-bold text-lg max-w-2xl mx-auto">
                        ${g(a.brands_subtitle||"We partner exclusively with the world's most trusted power tool manufacturers to ensure every spare part meets strict industrial standards.")}
                    </p>
                </div>
            </section>

            <!-- Brand Cards -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    `+o.map(n=>`
                        <div class="bg-white rounded-none p-10 border-2 border-slate-100 shadow-premium group text-center flex flex-col items-center hover-red-glow">
                            <div class="h-20 flex items-center justify-center mb-8 transition-all duration-500 transform group-hover:scale-110">
                                `+(n.logo?`<img src="${g(t.api(n.logo))}" alt="${g(n.name)}" class="h-16 w-auto object-contain">`:`<div class="grayscale group-hover:grayscale-0 transition-all duration-500">${n.svg}</div>`)+`
                            </div>
                            <span class="px-3 py-1 rounded-none bg-[#111111] text-white text-[10px] font-black uppercase tracking-widest mb-4">${g(n.tag)}</span>
                            <h4 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-widest">${g(n.name)}</h4>
                            <p class="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-1">${g(n.desc)}</p>
                            <a href="/catalog" data-link class="px-8 py-4 bg-slate-50 text-slate-900 rounded-none font-black text-[10px] uppercase tracking-widest hover:bg-[#ed1c24] hover:text-white transition-all shadow-sm w-full text-center">Explore Spares</a>
                        </div>
                    `).join("")+`
                </div>
            </section>
        </div>
    `)}function T(e,t){const a=[{t:t.state.settings.cat1_title||"Electrical Spares",d:t.state.settings.cat1_desc||"Switches, Carbon Brushes, Armatures & Field Coils built for high thermal endurance.",img:t.state.settings.cat1_img||"https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800",icon:"M13 10V3L4 14h7v7l9-11h-7z"},{t:t.state.settings.cat2_title||"Mechanical Units",d:t.state.settings.cat2_desc||"Precision Gears, Bearings, Shafts & Housing Assemblies ensuring seamless kinetic transfer.",img:t.state.settings.cat2_img||"https://images.unsplash.com/photo-1530124566582-a618bc2615ad?auto=format&fit=crop&q=80&w=800",icon:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"},{t:t.state.settings.cat3_title||"Power Attachments",d:t.state.settings.cat3_desc||"Chucks, SDS Adaptors, Cutting Discs & Drill Bits engineered for brutal workloads.",img:t.state.settings.cat3_img||"https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800",icon:"M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"},{t:t.state.settings.cat4_title||"Maintenance Kits",d:t.state.settings.cat4_desc||"Complete Service Kits for Industrial Hammer Drills & Saws. Minimize your downtime.",img:t.state.settings.cat4_img||"https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?auto=format&fit=crop&q=80&w=800",icon:"M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"}];f(e,`
        <div class="animate-fade-in py-12 bg-slate-50 min-h-screen">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-5xl font-black text-[#111111] tracking-tight mb-4 uppercase">Core <span class="text-[#ed1c24]">Categories</span></h2>
                    <p class="text-slate-500 font-bold text-lg max-w-2xl mx-auto">Explore our extensive inventory organized by functional systems to find the exact part you need faster.</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    `+a.map(s=>`
                        <div onclick="app.renderCatalog(document.getElementById('view-container'))" class="bg-white border-2 border-slate-100 rounded-none overflow-hidden group cursor-pointer transition-all duration-500 animate-in zoom-in duration-700 hover-red-glow flex flex-col justify-between">
                            <!-- Top half: Standard-sized, clean-background image box -->
                            <div class="relative h-64 bg-slate-50 overflow-hidden">
                                <img src="${g(t.api(s.img))}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="${g(s.t)}">
                                <!-- SVG overlay badge on top left -->
                                <div class="absolute top-4 left-4 w-10 h-10 bg-slate-900/60 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover:bg-[#ed1c24] transition-all duration-300">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="${g(s.icon)}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </div>
                            </div>
                            <!-- Bottom half: Info section -->
                            <div class="p-6 flex flex-col justify-between h-48 border-t border-slate-100 bg-white flex-1">
                                <div class="space-y-2">
                                    <h4 class="font-black text-lg text-[#111111] uppercase tracking-widest truncate group-hover:text-[#ed1c24] transition-colors" title="${g(s.t)}">${g(s.t)}</h4>
                                    <p class="text-slate-400 text-xs font-semibold leading-relaxed line-clamp-3">${g(s.d)}</p>
                                </div>
                                
                                <div class="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <div>
                                        <span class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">B2B Collection</span>
                                        <span class="text-sm font-black text-[#111111] uppercase">Explore Parts</span>
                                    </div>
                                    <button class="p-3 bg-[#ed1c24] hover:bg-[#111111] text-white rounded-none transition-all shadow-sm" title="Explore Spares">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join("")+`
                </div>
            </div>
        </div>
    `)}function L(e,t){const a={email:t.state.settings.contact_email||"support@partspro.in",phone:t.state.settings.contact_phone||"+91 70277 51544",address:t.state.settings.contact_address||"Phase 2, Industrial Estate, New Delhi, IN 110020"};e.innerHTML=`
        <div class="animate-fade-in min-h-screen bg-slate-50">
            <!-- Header -->
            <section class="bg-white border-b border-slate-100 py-24">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div class="text-[10px] font-black uppercase tracking-[0.4em] text-bosch-blue mb-6">Connect with us</div>
                    <h2 class="text-6xl font-black text-slate-900 tracking-tight mb-6 uppercase">${t.state.settings.support_title||'Expert Support <span class="text-bosch-blue">Center</span>'}</h2>
                    <p class="text-slate-500 font-bold text-lg max-w-2xl mx-auto">${t.state.settings.support_subtitle||"Need technical assistance with a part? Our specialist engineers are available 24/7 to help your business stay operational."}</p>
                </div>
            </section>

            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-12">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Contact Cards -->
                    <div class="space-y-8">
                        <div class="bg-white p-10 rounded-none shadow-premium border-2 border-slate-100 flex flex-col items-center text-center group hover:bg-bosch-blue hover:border-bosch-blue transition-all duration-500">
                            <div class="w-16 h-16 rounded-none bg-industrial-gray text-white flex items-center justify-center mb-6 transition-colors shadow-inner">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </div>
                            <h4 class="text-lg font-black text-slate-900 group-hover:text-white mb-2 uppercase tracking-widest">Email Support</h4>
                            <p class="text-slate-500 group-hover:text-white/80 font-bold text-sm">${a.email}</p>
                        </div>

                        <div class="bg-white p-10 rounded-none shadow-premium border-2 border-slate-100 flex flex-col items-center text-center group hover:bg-bosch-blue hover:border-bosch-blue transition-all duration-500">
                            <div class="w-16 h-16 rounded-none bg-industrial-gray text-white flex items-center justify-center mb-6 transition-colors shadow-inner">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </div>
                            <h4 class="text-lg font-black text-slate-900 group-hover:text-white mb-2 uppercase tracking-widest">Technical Hotline</h4>
                            <p class="text-slate-500 group-hover:text-white/80 font-bold text-sm">${a.phone}</p>
                        </div>

                        <div class="bg-white p-10 rounded-none shadow-premium border-2 border-slate-100 flex flex-col items-center text-center group hover:bg-industrial-gray hover:border-bosch-blue transition-all duration-500">
                            <div class="w-16 h-16 rounded-none bg-industrial-gray text-white flex items-center justify-center mb-6 transition-colors shadow-inner group-hover:bg-bosch-blue">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </div>
                            <h4 class="text-lg font-black text-slate-900 group-hover:text-white mb-2 uppercase tracking-widest">Corporate Office</h4>
                            <p class="text-slate-500 group-hover:text-white/80 font-bold text-sm px-4">${a.address}</p>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div class="lg:col-span-2 bg-white rounded-none p-16 shadow-premium border-2 border-slate-100 border-t-4 border-t-bosch-blue">
                        <div class="mb-12">
                            <h3 class="text-3xl font-black text-slate-900 tracking-tight">Send a Technical Inquiry</h3>
                            <p class="text-slate-500 font-bold mt-2">Expect a response from our engineering team within 2 business hours.</p>
                        </div>
                        <form id="support-form" class="space-y-8">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="space-y-3">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                                    <input type="text" required class="w-full bg-slate-50 border border-slate-200 rounded-none px-6 py-4 text-sm font-bold focus:outline-none focus:border-bosch-blue transition-all" placeholder="Enter your name">
                                </div>
                                <div class="space-y-3">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Work Email</label>
                                    <input type="email" required class="w-full bg-slate-50 border border-slate-200 rounded-none px-6 py-4 text-sm font-bold focus:outline-none focus:border-bosch-blue transition-all" placeholder="Enter work email">
                                </div>
                                <div class="space-y-3">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Inquiry Subject</label>
                                    <select class="w-full bg-slate-50 border border-slate-200 rounded-none px-6 py-4 text-sm font-bold focus:outline-none focus:border-bosch-blue transition-all">
                                        <option>Part Fitment Assistance</option>
                                        <option>Bulk Order Inquiry</option>
                                        <option>Technical Specification Request</option>
                                        <option>Warranty & Returns</option>
                                    </select>
                                </div>
                                <div class="space-y-3">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Part No. / Model (Optional)</label>
                                    <input type="text" class="w-full bg-slate-50 border border-slate-200 rounded-none px-6 py-4 text-sm font-bold focus:outline-none focus:border-bosch-blue transition-all" placeholder="e.g. GWS 600">
                                </div>
                            </div>
                            <div class="space-y-3">
                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Detailed Message</label>
                                <textarea required class="w-full bg-slate-50 border border-slate-200 rounded-none px-6 py-4 text-sm font-bold focus:outline-none focus:border-bosch-blue transition-all h-40 resize-none" placeholder="Describe your technical requirement..."></textarea>
                            </div>
                            <button type="submit" class="w-full py-5 bg-bosch-blue text-white rounded-none font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-900/30 hover:bg-industrial-gray transition-colors">${t.state.settings.support_form_cta||"Submit Technical Ticket"}</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    `,document.getElementById("support-form").onsubmit=s=>{s.preventDefault(),t.showToast("Support ticket submitted successfully. Reference: #PP-"+Math.floor(Math.random()*1e5)),s.target.reset()}}function C(e,t){const a=t.state.settings||{};window.clickPopularSearch=c=>{t.state.searchFilters={query:c},history.pushState(null,null,t.basePath+"/catalog"),t.handleRouting()},window.clickCategorySearch=c=>{t.state.searchFilters={category:c},history.pushState(null,null,t.basePath+"/catalog"),t.handleRouting()};const o=(a.hero_title||"ALL POWER TOOL SPARE PARTS AVAILABLE").toUpperCase().split(" "),r=o.pop()||"",n=o.join(" ")||"",l=a.hero_subtitle||"GENUINE PARTS | HIGH QUALITY | LONG LIFE",d=l.includes("|")?l.split("|").map(c=>"<span>"+g(c.trim())+"</span>").join(' <span class="text-[#ed1c24] font-black">|</span> '):"<span>"+g(l)+"</span>",u=[a.hero_image,a.hero_image_2,a.hero_image_3].filter(Boolean),i=u.length>0?u:["uploads/hero_spares_composition.png"];f(e,`
        <div class="animate-fade-in bg-zinc-50 min-h-screen">
            <!-- ═══ HERO SECTION (Mockup layout & styling with dynamic content) ═══ -->
            <section class="relative bg-white overflow-hidden py-10 lg:py-16 border-b border-zinc-100">
                <!-- Visual Background Accents -->
                <div class="absolute top-0 right-0 w-1/3 h-full bg-[#111111] transform skew-x-12 translate-x-20 z-0 hidden lg:block"></div>
                <div class="absolute top-0 right-0 w-2 h-full bg-[#ed1c24] transform skew-x-12 translate-x-8 z-0 hidden lg:block"></div>

                <div class="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        
                        <!-- Left Column: Dynamic Content & Mockup layout -->
                        <div class="lg:col-span-6 space-y-6 text-center lg:text-left">
                            <div class="flex items-center justify-center lg:justify-start gap-2 text-zinc-800">
                                <span class="text-xs font-black uppercase tracking-[0.2em] font-sans text-zinc-900">All Power Tool</span>
                                <div class="w-10 h-[2.5px] bg-[#ed1c24]"></div>
                            </div>
                            
                            <h1 class="leading-none tracking-tighter">
                                <span class="block text-[40px] sm:text-[56px] font-black text-black leading-[0.95] tracking-tight uppercase font-poppins">${n}</span>
                                <span class="relative mt-3.5 inline-block bg-[#ed1c24] text-white text-xl sm:text-2xl font-black py-2 px-9 uppercase italic transform -skew-x-12 tracking-widest">
                                    ${r}
                                </span>
                            </h1>

                            <p class="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                ${d}
                            </p>

                            <!-- Minimalist Outlined Badges -->
                            <div class="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto lg:mx-0 pt-6">
                                <div class="flex flex-col items-center text-center">
                                    <div class="w-12 h-12 rounded-full border-2 border-[#ed1c24] flex items-center justify-center text-[#ed1c24] bg-white mb-2.5 shadow-sm hover:scale-105 transition-transform duration-300">
                                        <svg class="w-6.5 h-6.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <span class="text-[9px] font-black uppercase tracking-wider text-zinc-700 leading-tight">Premium<br>Quality</span>
                                </div>
                                <div class="flex flex-col items-center text-center">
                                    <div class="w-12 h-12 rounded-full border-2 border-[#ed1c24] flex items-center justify-center text-[#ed1c24] bg-white mb-2.5 shadow-sm hover:scale-105 transition-transform duration-300">
                                        <svg class="w-6.5 h-6.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        </svg>
                                    </div>
                                    <span class="text-[9px] font-black uppercase tracking-wider text-zinc-700 leading-tight">Wide Range<br>of Parts</span>
                                </div>
                                <div class="flex flex-col items-center text-center">
                                    <div class="w-12 h-12 rounded-full border-2 border-[#ed1c24] flex items-center justify-center text-[#ed1c24] bg-white mb-2.5 shadow-sm hover:scale-105 transition-transform duration-300">
                                        <svg class="w-6.5 h-6.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                            <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                                        </svg>
                                    </div>
                                    <span class="text-[9px] font-black uppercase tracking-wider text-zinc-700 leading-tight">High<br>Durability</span>
                                </div>
                                <div class="flex flex-col items-center text-center">
                                    <div class="w-12 h-12 rounded-full border-2 border-[#ed1c24] flex items-center justify-center text-[#ed1c24] bg-white mb-2.5 shadow-sm hover:scale-105 transition-transform duration-300">
                                        <svg class="w-6.5 h-6.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" />
                                        </svg>
                                    </div>
                                    <span class="text-[9px] font-black uppercase tracking-wider text-zinc-700 leading-tight">Fast & Reliable<br>Delivery</span>
                                </div>
                            </div>
                        </div>

                        <!-- Right Column: Dynamic Slider containing B2B Settings Images -->
                        <div class="lg:col-span-6 relative flex flex-col items-center justify-center h-[350px] lg:h-[420px]">
                            <div class="absolute inset-0 bg-radial-gradient from-rose-100/30 to-transparent blur-3xl rounded-full opacity-40"></div>
                            
                            <!-- Slider Container -->
                            <div id="hero-slider" class="relative z-10 w-full h-full flex items-center justify-center">
                                `+i.map((c,p)=>'<img src="'+g(t.api(c))+'" alt="TORVO Slide '+g(p+1)+'" class="hero-slide absolute max-h-full max-w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.04)] transition-opacity duration-1000 '+(p===0?"opacity-100":"opacity-0")+'" data-index="'+g(p)+'">').join("")+`
                            </div>

                            <!-- Carousel dots indicators -->
                            <div class="flex gap-2.5 mt-4 relative z-10 select-none">
                                `+i.map((c,p)=>'<span class="slider-dot w-2 h-2 rounded-full cursor-pointer transition-colors duration-300 '+(p===0?"bg-[#ed1c24]":"bg-zinc-300")+'" data-dot="'+g(p)+'"></span>').join("")+`
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <!-- ═══ BLACK STATS RIBBON (Mockup layout & red icons) ═══ -->
            <section class="bg-[#111111] text-white py-6 border-b border-zinc-800 no-print select-none">
                <div class="max-w-7xl mx-auto px-6 lg:px-10">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
                        <div class="flex items-center gap-4">
                            <div class="text-[#ed1c24] flex-shrink-0">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                                    <circle cx="5" cy="5" r="2.5" stroke="currentColor" stroke-width="2"/>
                                    <circle cx="19" cy="5" r="2.5" stroke="currentColor" stroke-width="2"/>
                                    <circle cx="12" cy="19" r="2.5" stroke="currentColor" stroke-width="2"/>
                                    <path d="M12 9V6M5.5 7.5l4.5 3M18.5 7.5l-4.5 3M12 15v1.5" stroke="currentColor" stroke-width="2.5"/>
                                </svg>
                            </div>
                            <div class="space-y-0.5">
                                <span class="block text-xl font-extrabold tracking-tight leading-none text-white font-poppins">10,000+</span>
                                <span class="block text-[9px] font-bold uppercase tracking-wider text-zinc-400">Parts Across Top Brands</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-[#ed1c24] flex-shrink-0">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <div class="space-y-0.5">
                                <span class="block text-xl font-extrabold tracking-tight leading-none text-white font-poppins">500+</span>
                                <span class="block text-[9px] font-bold uppercase tracking-wider text-zinc-400">Brands Available</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-[#ed1c24] flex-shrink-0">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div class="space-y-0.5">
                                <span class="block text-xl font-extrabold tracking-tight leading-none text-white font-poppins">1L+</span>
                                <span class="block text-[9px] font-bold uppercase tracking-wider text-zinc-400">Happy B2B Customers</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-[#ed1c24] flex-shrink-0">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div class="space-y-0.5">
                                <span class="block text-xl font-extrabold tracking-tight leading-none text-white font-poppins">99.7%</span>
                                <span class="block text-[9px] font-bold uppercase tracking-wider text-zinc-400">Order Accuracy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ═══ POPULAR SEARCHES BAR (Mockup: White bar with grey tag pills) ═══ -->
            <section class="bg-white py-3 border-b border-zinc-200/50 no-print shadow-sm">
                <div class="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap items-center gap-4">
                    <span class="text-[10px] font-extrabold uppercase tracking-widest text-zinc-800">Popular Searches:</span>
                    <div class="flex flex-wrap gap-2">
                        `+["Carbon Brush","Armature","Bearing","Switch","Chuck","Gear","Field Coil","Spindle","Rotor","Stator"].map(c=>`<button onclick="clickPopularSearch('`+c+`')" class="px-4 py-1.5 bg-zinc-50 border border-zinc-200 hover:border-[#ed1c24] hover:text-[#ed1c24] text-[10px] font-bold uppercase tracking-wider rounded-none transition-all cursor-pointer">`+c+"</button>").join("")+`
                    </div>
                </div>
            </section>

            <!-- ═══ SHOP BY TOP CATEGORIES (Mockup categories layout with DYNAMIC text/images) ═══ -->
            <section class="py-16 bg-zinc-50">
                <div class="max-w-7xl mx-auto px-6 lg:px-10">
                    
                    <!-- Header -->
                    <div class="flex items-center justify-between mb-10">
                        <div>
                            <h2 class="text-2xl sm:text-3xl font-black text-black tracking-tight font-poppins uppercase">Shop by Top Categories</h2>
                        </div>
                        <a href="/categories" data-link class="text-xs font-bold text-[#ed1c24] hover:text-[#c1121f] transition-colors flex items-center gap-1.5 uppercase tracking-wider font-poppins">
                            View All Categories 
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M9 5l7 7-7 7"/></svg>
                        </a>
                    </div>

                    <!-- 6-Card Category Grid: Category 1-4 are database DYNAMIC. 5-6 are mockup collections -->
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        
                        <!-- 1. Electrical Parts (Dynamic) -->
                        <div onclick="clickCategorySearch('${a.cat1_title||"Electrical Parts"}')" class="bg-white border border-zinc-200 rounded-none p-4 flex flex-col justify-between h-[250px] group cursor-pointer hover-red-glow transition-all duration-300">
                            <div class="h-32 bg-slate-50 flex items-center justify-center overflow-hidden p-4">
                                <img src="${t.api(a.cat1_img)||"uploads/setting_cat1_img_69f49cd304f29.jpg"}" 
                                     alt="${a.cat1_title||"Electrical Parts"}" 
                                     class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700">
                            </div>
                            <div class="flex items-end justify-between w-full pt-3">
                                <div class="space-y-0.5 min-w-0 flex-1">
                                    <h4 class="text-xs font-black text-[#111111] uppercase tracking-widest truncate group-hover:text-[#ed1c24] transition-colors">${a.cat1_title||"Electrical Parts"}</h4>
                                    <p class="text-[9px] text-zinc-400 font-bold leading-normal truncate">${a.cat1_desc||"Switches, Cables, Carbon Brushes & more"}</p>
                                </div>
                                <span class="text-[#ed1c24] font-black text-sm leading-none transition-transform group-hover:translate-x-1 pl-2">&rarr;</span>
                            </div>
                        </div>

                        <!-- 2. Mechanical Parts (Dynamic) -->
                        <div onclick="clickCategorySearch('${a.cat2_title||"Mechanical Parts"}')" class="bg-white border border-zinc-200 rounded-none p-4 flex flex-col justify-between h-[250px] group cursor-pointer hover-red-glow transition-all duration-300">
                            <div class="h-32 bg-slate-50 flex items-center justify-center overflow-hidden p-4">
                                <img src="${t.api(a.cat2_img)||"uploads/setting_cat2_img_69f49cd3068d3.jpg"}" 
                                     alt="${a.cat2_title||"Mechanical Parts"}" 
                                     class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700">
                            </div>
                            <div class="flex items-end justify-between w-full pt-3">
                                <div class="space-y-0.5 min-w-0 flex-1">
                                    <h4 class="text-xs font-black text-[#111111] uppercase tracking-widest truncate group-hover:text-[#ed1c24] transition-colors">${a.cat2_title||"Mechanical Parts"}</h4>
                                    <p class="text-[9px] text-zinc-400 font-bold leading-normal truncate">${a.cat2_desc||"Gears, Bearings, Shafts & more"}</p>
                                </div>
                                <span class="text-[#ed1c24] font-black text-sm leading-none transition-transform group-hover:translate-x-1 pl-2">&rarr;</span>
                            </div>
                        </div>

                        <!-- 3. Accessories (Dynamic) -->
                        <div onclick="clickCategorySearch('${a.cat3_title||"Accessories"}')" class="bg-white border border-zinc-200 rounded-none p-4 flex flex-col justify-between h-[250px] group cursor-pointer hover-red-glow transition-all duration-300">
                            <div class="h-32 bg-slate-50 flex items-center justify-center overflow-hidden p-4">
                                <img src="${t.api(a.cat3_img)||"uploads/setting_cat3_img_69f49cd3083d3.jpg"}" 
                                     alt="${a.cat3_title||"Accessories"}" 
                                     class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700">
                            </div>
                            <div class="flex items-end justify-between w-full pt-3">
                                <div class="space-y-0.5 min-w-0 flex-1">
                                    <h4 class="text-xs font-black text-[#111111] uppercase tracking-widest truncate group-hover:text-[#ed1c24] transition-colors">${a.cat3_title||"Accessories"}</h4>
                                    <p class="text-[9px] text-zinc-400 font-bold leading-normal truncate">${a.cat3_desc||"Chucks, Blades, Drill Bits & more"}</p>
                                </div>
                                <span class="text-[#ed1c24] font-black text-sm leading-none transition-transform group-hover:translate-x-1 pl-2">&rarr;</span>
                            </div>
                        </div>

                        <!-- 4. Replacement Kits (Dynamic) -->
                        <div onclick="clickCategorySearch('${a.cat4_title||"Replacement Kits"}')" class="bg-white border border-zinc-200 rounded-none p-4 flex flex-col justify-between h-[250px] group cursor-pointer hover-red-glow transition-all duration-300">
                            <div class="h-32 bg-slate-50 flex items-center justify-center overflow-hidden p-4">
                                <img src="${t.api(a.cat4_img)||"uploads/setting_cat4_img_69f49cd308822.jpg"}" 
                                     alt="${a.cat4_title||"Replacement Kits"}" 
                                     class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700">
                            </div>
                            <div class="flex items-end justify-between w-full pt-3">
                                <div class="space-y-0.5 min-w-0 flex-1">
                                    <h4 class="text-xs font-black text-[#111111] uppercase tracking-widest truncate group-hover:text-[#ed1c24] transition-colors">${a.cat4_title||"Replacement Kits"}</h4>
                                    <p class="text-[9px] text-zinc-400 font-bold leading-normal truncate">${a.cat4_desc||"Kits for Maintenance & Repair"}</p>
                                </div>
                                <span class="text-[#ed1c24] font-black text-sm leading-none transition-transform group-hover:translate-x-1 pl-2">&rarr;</span>
                            </div>
                        </div>

                        <!-- 5. Tool Components (Mockup Collection) -->
                        <div onclick="clickCategorySearch('Tool Components')" class="bg-white border border-zinc-200 rounded-none p-4 flex flex-col justify-between h-[250px] group cursor-pointer hover-red-glow transition-all duration-300">
                            <div class="h-32 bg-slate-50 flex items-center justify-center overflow-hidden p-4">
                                <img src="${t.api("uploads/2-26-small-tool-holder.jpg")}" 
                                     alt="Tool Components" 
                                     class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700">
                            </div>
                            <div class="flex items-end justify-between w-full pt-3">
                                <div class="space-y-0.5 min-w-0 flex-1">
                                    <h4 class="text-xs font-black text-[#111111] uppercase tracking-widest truncate group-hover:text-[#ed1c24] transition-colors">Tool Components</h4>
                                    <p class="text-[9px] text-zinc-400 font-bold leading-normal truncate">Housings, Handles, Spindles & more</p>
                                </div>
                                <span class="text-[#ed1c24] font-black text-sm leading-none transition-transform group-hover:translate-x-1 pl-2">&rarr;</span>
                            </div>
                        </div>

                        <!-- 6. More Categories -->
                        <div onclick="app.renderCategories(document.getElementById('view-container'))" class="bg-white border border-zinc-200 rounded-none p-4 flex flex-col justify-between h-[250px] group cursor-pointer hover-red-glow transition-all duration-300">
                            <div class="h-32 bg-slate-50 flex items-center justify-center p-4">
                                <div class="w-12 h-12 rounded-none bg-rose-50 flex items-center justify-center text-[#ed1c24] group-hover:bg-[#ed1c24] group-hover:text-white transition-all duration-300">
                                    <!-- 4-square Grid Icon -->
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <rect x="3" y="3" width="7" height="7" rx="0"/>
                                        <rect x="14" y="3" width="7" height="7" rx="0"/>
                                        <rect x="14" y="14" width="7" height="7" rx="0"/>
                                        <rect x="3" y="14" width="7" height="7" rx="0"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="flex items-end justify-between w-full pt-3">
                                <div class="space-y-0.5 min-w-0 flex-1">
                                    <h4 class="text-xs font-black text-[#111111] uppercase tracking-widest truncate group-hover:text-[#ed1c24] transition-colors">More Categories</h4>
                                    <p class="text-[9px] text-zinc-400 font-bold leading-normal truncate">Explore All Collections</p>
                                </div>
                                <span class="text-[#ed1c24] font-black text-sm leading-none transition-transform group-hover:translate-x-1 pl-2">&rarr;</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <!-- ═══ TRUSTED BY PROFESSIONALS (100% Mockup Exact brand logos with actual visual styling) ═══ -->
            <section class="py-12 bg-white border-y border-zinc-200/80">
                <div class="max-w-7xl mx-auto px-6 lg:px-10">
                    <div class="text-center mb-8">
                        <span class="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Trusted by Professionals. Preferred by Brands.</span>
                    </div>
                    
                    <div class="flex items-center justify-between gap-4 relative">
                        <!-- Left Arrow (Red circle chevrons) -->
                        <button class="w-8 h-8 rounded-full border border-zinc-200 hover:border-[#ed1c24] flex items-center justify-center text-zinc-400 hover:text-[#ed1c24] transition-all flex-shrink-0 cursor-pointer shadow-sm bg-white hover:bg-rose-50">
                            <span class="text-xs font-bold font-mono">&lt;</span>
                        </button>
                        
                        <!-- Brand Logos Row -->
                        <div class="flex-1 overflow-x-auto no-scrollbar py-2">
                            <div class="flex justify-between items-center min-w-[900px] gap-8 select-none">
                                
                                <!-- 1. BOSCH -->
                                <div class="flex items-center gap-1">
                                    <div class="w-5 h-5 rounded-full border-[1.5px] border-[#ed1c24] flex items-center justify-center flex-shrink-0">
                                        <div class="w-2.5 h-2.5 bg-[#ed1c24] rounded-full"></div>
                                    </div>
                                    <span class="text-lg font-black tracking-tight text-zinc-950 uppercase font-sans">BOSCH</span>
                                </div>

                                <!-- 2. Makita -->
                                <span class="text-xl font-extrabold tracking-tight text-[#008f8c] font-sans lowercase" style="font-family: sans-serif;">makita</span>

                                <!-- 3. DEWALT -->
                                <div class="bg-[#feb80a] text-black px-3 py-1 font-black text-xs uppercase tracking-tighter shadow-sm font-sans">DEWALT</div>

                                <!-- 4. metabo -->
                                <span class="text-xl font-extrabold italic tracking-tighter text-zinc-950 font-sans">metabo</span>

                                <!-- 5. BLACK+DECKER -->
                                <div class="border-2 border-[#ff6b00] px-3 py-1 text-black font-black text-[10px] tracking-tight uppercase shadow-sm">BLACK+DECKER</div>

                                <!-- 6. HITACHI -->
                                <span class="text-lg font-black tracking-tight text-[#ed1c24] uppercase font-sans">HITACHI</span>

                                <!-- 7. Milwaukee -->
                                <span class="text-2xl font-bold tracking-tighter text-[#ed1c24] italic" style="font-family: 'Brush Script MT', cursive, sans-serif;">Milwaukee</span>

                                <!-- 8. RYOBI -->
                                <span class="text-xl font-extrabold tracking-widest text-zinc-950 font-sans">RYOBI</span>
                            </div>
                        </div>

                        <!-- Right Arrow (Red circle chevrons) -->
                        <button class="w-8 h-8 rounded-full border border-zinc-200 hover:border-[#ed1c24] flex items-center justify-center text-zinc-400 hover:text-[#ed1c24] transition-all flex-shrink-0 cursor-pointer shadow-sm bg-white hover:bg-rose-50">
                            <span class="text-xs font-bold font-mono">&gt;</span>
                        </button>
                    </div>
                </div>
            </section>

            <!-- ═══ BOTTOM STATS/INFO BAR (Mockup: 5 columns with red outline circles) ═══ -->
            <section class="py-12 bg-white border-b border-zinc-100 text-zinc-600 no-print">
                <div class="max-w-7xl mx-auto px-6 lg:px-10">
                    <div class="grid grid-cols-2 md:grid-cols-5 gap-8 items-start">
                        
                        <!-- 1. Wide Range -->
                        <div class="flex items-start gap-3.5">
                            <div class="w-8 h-8 rounded-full border border-[#ed1c24] flex items-center justify-center text-[#ed1c24] flex-shrink-0 bg-white shadow-sm">
                                <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2" />
                                </svg>
                            </div>
                            <div class="space-y-1">
                                <span class="block text-[11px] font-black uppercase tracking-wider text-slate-800 leading-tight">Wide Range</span>
                                <span class="block text-[10px] text-zinc-400 font-medium">10,000+ parts in 100+ categories</span>
                            </div>
                        </div>

                        <!-- 2. Easy Lookup -->
                        <div class="flex items-start gap-3.5">
                            <div class="w-8 h-8 rounded-full border border-[#ed1c24] flex items-center justify-center text-[#ed1c24] flex-shrink-0 bg-white shadow-sm">
                                <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <div class="space-y-1">
                                <span class="block text-[11px] font-black uppercase tracking-wider text-slate-800 leading-tight">Easy Lookup</span>
                                <span class="block text-[10px] text-zinc-400 font-medium">Find parts by model, diagram & part number</span>
                            </div>
                        </div>

                        <!-- 3. Bulk Ordering -->
                        <div class="flex items-start gap-3.5">
                            <div class="w-8 h-8 rounded-full border border-[#ed1c24] flex items-center justify-center text-[#ed1c24] flex-shrink-0 bg-white shadow-sm">
                                <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                                </svg>
                            </div>
                            <div class="space-y-1">
                                <span class="block text-[11px] font-black uppercase tracking-wider text-slate-800 leading-tight">Bulk Ordering</span>
                                <span class="block text-[10px] text-zinc-400 font-medium">Simplified bulk order & repeat order</span>
                            </div>
                        </div>

                        <!-- 4. Secure Payments -->
                        <div class="flex items-start gap-3.5">
                            <div class="w-8 h-8 rounded-full border border-[#ed1c24] flex items-center justify-center text-[#ed1c24] flex-shrink-0 bg-white shadow-sm">
                                <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div class="space-y-1">
                                <span class="block text-[11px] font-black uppercase tracking-wider text-slate-800 leading-tight">Secure Payments</span>
                                <span class="block text-[10px] text-zinc-400 font-medium">Multiple payment options & GST invoicing</span>
                            </div>
                        </div>

                        <!-- 5. Pan India Delivery -->
                        <div class="flex items-start gap-3.5">
                            <div class="w-8 h-8 rounded-full border border-[#ed1c24] flex items-center justify-center text-[#ed1c24] flex-shrink-0 bg-white shadow-sm">
                                <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                    <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" />
                                </svg>
                            </div>
                            <div class="space-y-1">
                                <span class="block text-[11px] font-black uppercase tracking-wider text-slate-800 leading-tight">Pan India Delivery</span>
                                <span class="block text-[10px] text-zinc-400 font-medium">Fast & reliable delivery across India</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    `),setTimeout(()=>{let c=0;const p=document.querySelectorAll(".hero-slide"),x=document.querySelectorAll(".slider-dot");if(p.length<=1)return;const b=setInterval(()=>{const h=(c+1)%p.length,m=document.querySelector(`.hero-slide[data-index="${c}"]`),v=document.querySelector(`.hero-slide[data-index="${h}"]`);if(!m||!v){clearInterval(b);return}m.style.opacity="0",v.style.opacity="1",x.forEach($=>$.classList.replace("bg-[#ed1c24]","bg-zinc-300"));const y=document.querySelector(`.slider-dot[data-dot="${h}"]`);y&&y.classList.replace("bg-zinc-300","bg-[#ed1c24]"),c=h},5e3);x.forEach(h=>{h.addEventListener("click",()=>{const m=parseInt(h.getAttribute("data-dot"));if(m===c)return;const v=document.querySelector(`.hero-slide[data-index="${c}"]`),y=document.querySelector(`.hero-slide[data-index="${m}"]`);v&&y&&(v.style.opacity="0",y.style.opacity="1",x.forEach($=>$.classList.replace("bg-[#ed1c24]","bg-zinc-300")),h.classList.replace("bg-zinc-300","bg-[#ed1c24]"),c=m)})});const k=new MutationObserver(()=>{document.getElementById("hero-slider")||(clearInterval(b),k.disconnect())});k.observe(document.body,{childList:!0,subtree:!0})},100)}async function Le(e,t){if(!t.state.user){history.pushState(null,null,t.basePath+"/login"),t.handleRouting();return}e.innerHTML='<div class="flex justify-center p-20"><div class="animate-spin w-10 h-10 border-4 border-bosch-blue border-t-transparent rounded-none"></div></div>';try{const s=await(await fetch(t.api("api/profile.php"))).json();e.innerHTML=`
            <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50">
                ${t.getSidebar("profile")}

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
                            <div class="p-8 lg:p-12">
                                <form id="profile-form" class="space-y-8">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div class="space-y-3">
                                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input type="text" name="name" value="${s.name||""}" required
                                                class="w-full h-14 bg-slate-50 border border-slate-200 rounded-none px-6 text-sm font-bold text-slate-800 focus:outline-none focus:border-bosch-blue transition-all">
                                        </div>
                                        <div class="space-y-3">
                                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address (Primary)</label>
                                            <input type="email" value="${s.email||""}" disabled
                                                class="w-full h-14 bg-slate-100 border border-slate-200 rounded-none px-6 text-sm font-bold text-slate-400 cursor-not-allowed">
                                        </div>
                                        <div class="space-y-3">
                                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                                            <input type="text" name="phone" value="${s.phone||""}" placeholder="+91 00000 00000"
                                                class="w-full h-14 bg-slate-50 border border-slate-200 rounded-none px-6 text-sm font-bold text-slate-800 focus:outline-none focus:border-bosch-blue transition-all">
                                        </div>
                                        <div class="space-y-3">
                                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp Number</label>
                                            <input type="text" name="whatsapp" value="${s.whatsapp||""}" placeholder="+91 00000 00000"
                                                class="w-full h-14 bg-slate-50 border border-slate-200 rounded-none px-6 text-sm font-bold text-slate-800 focus:outline-none focus:border-bosch-blue transition-all">
                                        </div>
                                    </div>

                                    <div class="space-y-3">
                                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Business / Delivery Address</label>
                                        <textarea name="address" rows="4" 
                                            class="w-full bg-slate-50 border border-slate-200 rounded-none p-6 text-sm font-bold text-slate-800 focus:outline-none focus:border-bosch-blue transition-all resize-none">${s.address||""}</textarea>
                                    </div>

                                    <div class="pt-6 border-t border-slate-100 flex justify-end">
                                        <button type="submit" id="save-profile-btn"
                                            class="px-12 py-4 rounded-none bg-bosch-blue text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-industrial-gray transition-all flex items-center gap-2">
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
        `,document.getElementById("profile-form").onsubmit=async o=>{o.preventDefault();const r=document.getElementById("save-profile-btn");r.disabled=!0,r.innerHTML='<span class="animate-pulse">Updating...</span>';const n=new FormData(o.target),l=Object.fromEntries(n.entries());try{const u=await(await fetch(t.api("api/profile.php"),{method:"POST",body:JSON.stringify(l),headers:{"Content-Type":"application/json"}})).json();if(u.success){t.showToast("Profile updated successfully");const i=JSON.parse(localStorage.getItem("user"));i.name=l.name,localStorage.setItem("user",JSON.stringify(i)),t.state.user.name=l.name,t.renderProfile(e)}else t.showToast(u.error||"Update failed","error")}catch{t.showToast("Update failed","error")}finally{r.disabled=!1,r.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg> Update Profile Info'}}}catch{t.showToast("Failed to load profile","error")}}const Ae={render:async e=>{window.app.state.settings,e.innerHTML=`
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
                        <span class="inline-block px-4 py-1.5 rounded-none bg-bosch-blue/20 text-bosch-blue text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-bosch-blue/30">Logistics & Delivery</span>
                        <h1 class="text-4xl md:text-5xl font-black text-white mb-6 leading-tight uppercase tracking-tight">Shipping <span class="text-bosch-red">Information</span></h1>
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
                                    <h2 class="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3 uppercase tracking-widest">
                                        <div class="w-10 h-10 rounded-none bg-industrial-gray text-white flex items-center justify-center">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                                        </div>
                                        Fast Delivery
                                    </h2>
                                    <p class="text-slate-600 leading-relaxed font-medium">
                                        We partner with premium courier services like BlueDart, Delhivery, and TCI Express to ensure your critical spare parts reach you as fast as possible.
                                    </p>
                                </div>

                                <div class="p-6 bg-slate-50 rounded-none border border-slate-100 border-l-8 border-l-bosch-blue space-y-4">
                                    <h3 class="font-black text-slate-900 flex items-center gap-2 uppercase tracking-widest">
                                        <svg class="w-4 h-4 text-bosch-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
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
                                    <h2 class="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3 uppercase tracking-widest">
                                        <div class="w-10 h-10 rounded-none bg-industrial-gray text-white flex items-center justify-center">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                        </div>
                                        Shipping Costs
                                    </h2>
                                    <p class="text-slate-600 leading-relaxed font-medium">
                                        Transparency is key. Our shipping rates are calculated based on weight and dimensions to ensure you get the fairest price for heavy industrial parts.
                                    </p>
                                </div>

                                <div class="space-y-4">
                                    <div class="p-6 bg-bosch-blue rounded-none text-white shadow-xl shadow-blue-900/20">
                                        <h4 class="font-black text-sm uppercase tracking-widest mb-1 opacity-80">Bulk Order Perk</h4>
                                        <div class="text-2xl font-black mb-3">Free Shipping</div>
                                        <p class="text-xs font-bold text-blue-100">On all orders above ₹15,000 across India. For smaller orders, a flat rate of ₹150 applies.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-20 p-10 bg-slate-900 rounded-none border-t-4 border-t-bosch-blue text-center relative overflow-hidden shadow-premium">
                            <div class="absolute inset-0 bg-bosch-blue/10 mix-blend-overlay"></div>
                            <div class="relative z-10">
                                <h3 class="text-2xl font-black text-white mb-4 uppercase tracking-widest">Track Your Order</h3>
                                <p class="text-slate-400 font-medium mb-8">Once your order is shipped, we will send you a tracking link via SMS and Email.</p>
                                <a href="/support" data-link class="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-none font-black text-xs uppercase tracking-widest hover:bg-bosch-blue hover:text-white transition-all duration-300">
                                    Need Help? Contact Support
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `}},Ie={render:async e=>{const t=window.app.state.settings;e.innerHTML=`
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
                        <span class="inline-block px-4 py-1.5 rounded-none bg-bosch-blue/20 text-bosch-blue text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-bosch-blue/30">Quality Assurance</span>
                        <h1 class="text-4xl md:text-5xl font-black text-white mb-6 leading-tight uppercase tracking-tight">Warranty & <span class="text-bosch-red">Returns</span></h1>
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
                                    <h2 class="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3 uppercase tracking-widest">
                                        <div class="w-10 h-10 rounded-none bg-industrial-gray text-white flex items-center justify-center">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                                        </div>
                                        Genuine Warranty
                                    </h2>
                                    <p class="text-slate-600 leading-relaxed font-medium">
                                        All our products are 100% genuine and come directly from authorized brands. We honor the standard manufacturer warranty on all electrical and mechanical components.
                                    </p>
                                </div>

                                <div class="p-8 bg-slate-50 rounded-none border border-slate-100 border-l-8 border-l-bosch-blue space-y-6">
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
                                    <h2 class="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3 uppercase tracking-widest">
                                        <div class="w-10 h-10 rounded-none bg-industrial-gray text-white flex items-center justify-center">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                                        </div>
                                        Hassle-Free Returns
                                    </h2>
                                    <p class="text-slate-600 leading-relaxed font-medium">
                                        Ordered the wrong part? No problem. We accept returns within 7 days of delivery for all unused, sealed items in their original packaging.
                                    </p>
                                </div>

                                <div class="bg-bosch-red rounded-none p-8 text-white shadow-xl shadow-red-900/20">
                                    <div class="text-3xl font-black mb-4 uppercase tracking-widest">7-Day Window</div>
                                    <p class="text-sm font-bold text-white/80 leading-relaxed mb-6">Return requests must be initiated within 168 hours of delivery for a full refund or exchange.</p>
                                    <div class="pt-6 border-t border-white/20">
                                        <div class="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                            Response within 24h
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-20 p-10 bg-slate-50 rounded-none border border-slate-200 border-t-4 border-t-bosch-blue text-center shadow-premium">
                            <h3 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-widest">Initiate a Return</h3>
                            <p class="text-slate-500 font-medium mb-8 max-w-xl mx-auto leading-relaxed text-sm">To start a warranty claim or return request, please have your Order ID and photos of the part ready and contact our support team.</p>
                            <div class="flex flex-col sm:flex-row justify-center gap-4">
                                <a href="/support" data-link class="px-8 py-4 bg-slate-900 text-white rounded-none font-black text-xs uppercase tracking-widest hover:bg-industrial-gray transition-all duration-300 shadow-sm">
                                    Open Support Ticket
                                </a>
                                <a href="#" onclick="window.open('https://wa.me/${t.whatsapp_number}?text=Hello! I want to initiate a return for my order.', '_blank')" class="px-8 py-4 bg-[#25D366] text-white rounded-none font-black text-xs uppercase tracking-widest hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.116.554 4.183 1.604 5.999L0 24l6.162-1.616a11.803 11.803 0 005.883 1.554h.005c6.634 0 12.032-5.391 12.035-12.029a11.785 11.785 0 00-3.51-8.514z"/></svg>
                                    Chat with Returns Dept
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `}},Ee=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",I=Ee?"/spairparts":"",Pe=e=>e?e.startsWith("http")?e:I+(e.startsWith("/")?"":"/")+e:"",w=e=>e==null?"":String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),E={state:{user:JSON.parse(localStorage.getItem("user")),cart:JSON.parse(localStorage.getItem("cart"))||[],settings:{}},basePath:I,api:Pe,getSidebar(e){return P(e,this)},renderCatalog(e){return H(e,this)},renderQuotations(e){return q(e,this)},viewQuotationDetails(e){return N(e,this)},approveQuotation(e){return F(e,this)},renderInvoices(e){return V(e,this)},renderInvoiceDocument(e){return U(e,this)},renderAdmin(e){return Q(e,this)},loadAdminStats(){return G(this)},loadAdminQuotations(){return K(this)},loadAdminInvoices(){return W(this)},renderDispatchModal(e,t,a){return he(e,t,a)},updateOrderStatus(e,t){return xe(e,t,this)},renderAdminInventory(e){return J(e,this)},filterInventory(){return Y()},renderAdminUsers(e){return X(e,this)},updateUser(e,t,a){return oe(e,t,a,this)},renderProcessQuotation(e){return ee(e,this)},applyDiscountToItem(e,t){return te(e,t)},applyDiscountToAll(e){return se(e)},generateInvoice(e){return ae(e,this)},renderSystemSettings(){return re(document.getElementById("view-container"),this)},printAdminReport(){return ne()},renderImportModal(){return le(this)},renderAddProductForm(){return ce(this)},renderEditProductForm(e){return de(e,this)},deleteProduct(e){return ue(e,this)},renderStockLogs(e){return ge(e,this)},renderStockAdjustModal(e){return me(e||null)},submitStockAdjustment(){return fe(this)},renderReports(e){return ve(e,this)},exportStockReport(){return we()},exportStockCSV(){return ke()},renderStaffPanel(e){return ye(e,this)},renderDashboard(e){return _e(e,this)},renderProfile(e){return Le(e,this)},loadDashboardStats(){return Me(this)},renderBulkOrderModal(){return $e(this)},renderSupport(e){return L(e,this)},renderHome(e){return C(e,this)},renderCategories(e){return T(e,this)},toggleMobileFooter(){const e=document.getElementById("main-footer"),t=document.getElementById("mobile-footer-toggle");!e||!t||(e.classList.contains("hidden")?(e.classList.remove("hidden"),t.innerHTML="Hide Footer & Site Map"):(e.classList.add("hidden"),t.innerHTML="Show Footer & Site Map"))},renderBrands(e){return B(e,this)},renderShipping(e){return Ae.render(e)},renderWarranty(e){return Ie.render(e)},renderMyPartsList(e){return Ce(e,this)},renderLogin(e){return je(e,this)},renderRegister(e){return Be(e,this)},renderCart(e){return Te(e,this)},updateCartBadge(){const e=[document.getElementById("cart-badge"),document.getElementById("mobile-cart-badge")],t=this.state.cart.length;e.forEach(a=>{a&&(t>0?(a.textContent=t,a.classList.remove("hidden")):a.classList.add("hidden"))})},addToCart(e){let t=e;if((typeof e=="number"||typeof e=="string")&&(t=_.products.find(s=>s.id==e)),!t){console.error("Product not found for cart",e);return}const a=this.state.cart.find(s=>s.id===t.id);a?a.quantity=(parseInt(a.quantity)||0)+1:this.state.cart.push({id:t.id,part_name:t.part_name,brand:t.brand||t.brand_name,machine_model:t.machine_model||t.model_name,quantity:1}),localStorage.setItem("cart",JSON.stringify(this.state.cart)),this.updateCartBadge(),this.showToast("Item added to quotation cart")},updateCartQty(e,t){const a=this.state.cart.find(s=>s.id===e);a&&(a.quantity=parseInt(t)||1,localStorage.setItem("cart",JSON.stringify(this.state.cart)),this.updateCartBadge())},removeFromCart(e){this.state.cart=this.state.cart.filter(t=>t.id!==e),localStorage.setItem("cart",JSON.stringify(this.state.cart)),this.updateCartBadge(),window.location.pathname.endsWith("/cart")&&this.renderCart(document.getElementById("view-container"))},async submitQuotation(){if(!this.state.user){this.showToast("Please login to submit quotation","error"),history.pushState(null,null,this.basePath+"/login"),this.handleRouting();return}const e=document.querySelector('button[onclick="app.submitQuotation()"]');e&&(e.disabled=!0,e.innerHTML='<span class="animate-pulse">Submitting Request...</span>');try{const a=await(await fetch(this.api("api/quotations.php"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"create",items:this.state.cart.map(s=>({part_id:s.id,quantity:s.quantity}))})})).json();a.success?(this.showToast("Quotation request submitted successfully!"),this.state.cart=[],localStorage.removeItem("cart"),this.updateCartBadge(),history.pushState(null,null,this.basePath+"/quotations"),this.handleRouting()):this.showToast(a.error||"Submission failed","error")}catch{this.showToast("Network error, please try again","error")}finally{e&&(e.disabled=!1,e.innerHTML="Submit RFQ Request")}},async editQuotation(e){if(confirm("Move items back to cart for editing? (Current pending request will be removed)"))try{const a=await(await fetch(this.api(`api/quotations.php?id=${e}`))).json();a.items&&(this.state.cart=a.items.map(s=>({id:s.part_id,part_name:s.part_name,brand:s.brand,machine_model:s.machine_model,quantity:s.quantity})),localStorage.setItem("cart",JSON.stringify(this.state.cart)),this.updateCartBadge(),await fetch(this.api("api/quotations.php"),{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e})}),this.showToast("Items moved to cart"),history.pushState(null,null,this.basePath+"/cart"),this.handleRouting())}catch{this.showToast("Error","error")}},getStatusClass(e){switch(e){case"pending":return"bg-amber-50 text-amber-600 border border-amber-200";case"priced":return"bg-blue-50 text-blue-600 border border-blue-200";case"approved":return"bg-emerald-50 text-emerald-600 border border-emerald-200";case"completed":return"bg-slate-50 text-slate-500 border border-slate-200";default:return"bg-slate-50 text-slate-400 border border-slate-100"}},cleanImageUrl(e,t){return!e||e==="null"?`https://ui-avatars.com/api/?name=${encodeURIComponent(t)}&background=f1f5f9&color=64748b&bold=true`:e.startsWith("http")?e:this.api(e)},async loadSettings(){try{const e=await fetch(this.api("api/admin_settings.php"));this.state.settings=await e.json(),this.applySettings()}catch(e){console.error("Failed to load settings",e)}},getLogoHTML(e){if(e.site_logo)return'<img src="'+w(this.api(e.site_logo))+'" class="h-10 w-auto object-contain p-0.5" alt="'+w(e.site_name||"Logo")+'">';const t=e.site_name||"TORVO TOOLS",a=t.toUpperCase();if(a.includes("TORVO")){const s=a.replace("TORVO","").trim(),o=s?' <span class="text-slate-800">'+w(s)+"</span>":"";return`
                <div class="flex items-center select-none font-sans">
                    <span class="text-3xl font-extrabold text-[#ed1c24] tracking-tight font-poppins italic">TORV</span>
                    <div class="w-8 h-8 ml-0.5 flex items-center justify-center animate-[spin_10s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite]">
                        <svg viewBox="0 0 100 100" fill="none" class="w-full h-full text-[#ed1c24] drop-shadow-[0_2px_4px_rgba(237,28,36,0.3)]">
                            <circle cx="50" cy="50" r="22" stroke="currentColor" stroke-width="12" fill="none"/>
                            <path d="M50 5 L50 20" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                            <path d="M50 80 L50 95" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                            <path d="M5 50 L20 50" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                            <path d="M80 50 L95 50" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                            <path d="M18 18 L29 29" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                            <path d="M71 71 L82 82" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                            <path d="M18 82 L29 71" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                            <path d="M71 29 L82 18" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
                        </svg>
                    </div>
                    `+(o?'<span class="text-3xl font-extrabold tracking-tight font-poppins uppercase ml-2 text-slate-800">'+o+"</span>":"")+`
                </div>
            `}else{const s=t.split(" ");if(s.length>1){const o=s.pop();return'<span class="text-3xl font-extrabold tracking-tight font-poppins uppercase text-slate-900">'+w(s.join(" "))+' <span class="text-[#ed1c24]">'+w(o)+"</span></span>"}return'<span class="text-3xl font-extrabold tracking-tight font-poppins uppercase text-[#ed1c24]">'+w(t)+"</span>"}},applySettings(){const e=this.state.settings;if(!e)return;const t=this.getLogoHTML(e);document.querySelectorAll(".logo-container").forEach(s=>{f(s,t)}),e.site_name&&(document.title=e.site_name);const a=document.getElementById("footer-site-name");if(a)if(e.site_logo)f(a,'<img src="'+w(this.api(e.site_logo))+'" class="h-10 w-auto object-contain p-0.5">');else{const s=(e.site_name||"TORVO TOOLS").split(" ");if(s.length>1){const o=s.pop();f(a,w(s.join(" "))+' <span class="text-[#ed1c24]">'+w(o)+"</span>")}else f(a,'<span class="text-[#ed1c24]">'+w(e.site_name||"TORVO")+"</span>")}if(e.footer_desc){const s=document.getElementById("footer-desc");s&&(s.textContent=e.footer_desc)}if(e.contact_address){const s=document.getElementById("footer-address");s&&f(s,w(e.contact_address).replace(/\n/g,"<br>"))}if(e.contact_email){const s=document.getElementById("footer-email");s&&(s.textContent=e.contact_email,s.href=`mailto:${e.contact_email}`)}if(e.whatsapp_number){console.log("Initializing WhatsApp Widget with:",e.whatsapp_number);let s=document.getElementById("whatsapp-widget");s||(s=document.createElement("div"),s.id="whatsapp-widget",s.className="whatsapp-widget no-print",document.body.appendChild(s));const o=e.whatsapp_number.replace(/\D/g,"");f(s,`
                <div class="whatsapp-tooltip">
                    Order via WhatsApp
                </div>
                <div class="whatsapp-btn" onclick="window.open('https://wa.me/`+o+`?text=Hello! I am interested in ordering spare parts.', '_blank')">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.116.554 4.183 1.604 5.999L0 24l6.162-1.616a11.803 11.803 0 005.883 1.554h.005c6.634 0 12.032-5.391 12.035-12.029a11.785 11.785 0 00-3.51-8.514z"/></svg>
                </div>
            `)}else console.warn("WhatsApp Widget skipped: whatsapp_number is missing in settings.")},updateAuthUI(){var s,o;const e=document.getElementById("auth-nav"),t=document.getElementById("header-cart-btn"),a=document.getElementById("mobile-cart-btn");if(this.state.user){t&&t.classList.remove("hidden"),a&&a.classList.remove("hidden"),localStorage.setItem("user",JSON.stringify(this.state.user));const r=this.state.user.role&&this.state.user.role.toLowerCase()==="admin";f(e,`
                <div class="flex items-center gap-4">
                    <div class="hidden lg:block text-right">
                        <p class="text-xs font-bold text-slate-800 uppercase tracking-widest">`+w(this.state.user.name)+`</p>
                    </div>
                    <div class="flex gap-2">
                        `+(r?`
                            <a href="/admin" data-link class="px-5 py-2.5 rounded-none bg-[#ed1c24] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#111111] transition-all shadow-sm flex items-center gap-1.5">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>
                                Admin
                            </a>
                        `:((o=(s=this.state.user)==null?void 0:s.role)==null?void 0:o.toLowerCase())==="staff"?`
                            <a href="/staff" data-link class="px-5 py-2.5 rounded-none bg-amber-600 text-white text-[11px] font-bold uppercase tracking-wider hover:bg-amber-700 transition-all shadow-sm flex items-center gap-1.5">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
                                Staff
                            </a>
                        `:`
                            <a href="/dashboard" data-link class="w-10 h-10 rounded-none bg-[#ed1c24] text-white flex items-center justify-center hover:bg-[#111111] transition-all shadow-sm group">
                                <svg class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </a>
                        `)+`
                        <a href="/logout" data-link class="w-10 h-10 rounded-none bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all border border-rose-100 group" title="Logout">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        </a>
                    </div>
                </div>
            `)}else t&&t.classList.add("hidden"),a&&a.classList.add("hidden"),localStorage.removeItem("user"),f(e,`
                <a href="/login" data-link class="px-6 py-2.5 text-xs font-bold text-[#ed1c24] border border-[#ed1c24] hover:bg-[#ed1c24] hover:text-white rounded-none transition-all uppercase tracking-wider font-sans">Log In</a>
                <a href="/register" data-link class="px-6 py-2.5 text-xs font-bold text-white bg-[#ed1c24] hover:bg-[#111111] rounded-none transition-all uppercase tracking-wider shadow-sm ml-2 font-sans">Sign Up</a>
            `)},handleRouting(){const e=window.location.pathname,t=(this.basePath?e.replace(this.basePath,""):e)||"/",a=document.getElementById("view-container");t==="/"?C(a,this):t==="/catalog"?this.renderCatalog(a):t==="/dashboard"?this.renderDashboard(a):t==="/profile"?this.renderProfile(a):t==="/admin"?this.renderAdmin(a):t==="/staff"?this.renderStaffPanel(a):t==="/admin/inventory"?this.renderAdminInventory(a):t==="/admin/stock-logs"?this.renderStockLogs(a):t==="/admin/reports"?this.renderReports(a):t==="/admin/partners"?this.renderAdminUsers(a):t==="/quotations"?this.renderQuotations(a):t==="/login"?this.renderLogin(a):t==="/register"?this.renderRegister(a):t==="/invoices"?this.renderInvoices(a):t==="/cart"?this.renderCart(a):t==="/brands"?B(a,this):t==="/categories"?T(a,this):t==="/support"?L(a,this):t==="/shipping"?this.renderShipping(a):t==="/warranty"?this.renderWarranty(a):t==="/logout"?fetch(this.api("api/auth.php"),{method:"POST",body:JSON.stringify({action:"logout"}),headers:{"Content-Type":"application/json"},credentials:"include"}).then(()=>{this.state.user=null,localStorage.removeItem("user"),this.updateAuthUI(),history.pushState(null,null,this.basePath+"/"),this.handleRouting()}):C(a,this),document.querySelectorAll(".nav-link, .mobile-nav-item").forEach(s=>{const o=s.getAttribute("href");s.classList.toggle("active",o===t)}),window.scrollTo({top:0,behavior:"smooth"}),this.animatePageEntry()},showToast(e,t="success"){const a=document.getElementById("toast-container");if(!a)return;const s=document.createElement("div");s.className=`toast ${t}`;const o=document.createElement("div");o.style.display="flex",o.style.alignItems="center",o.style.flexShrink="0",o.innerHTML=t==="error"?'<svg style="width:16px;height:16px;color:#ef4444;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>':'<svg style="width:16px;height:16px;color:#10b981;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',s.appendChild(o);const r=document.createElement("span");r.style.marginLeft="8px",r.textContent=e,s.appendChild(r);const n=document.createElement("button");n.innerHTML="✕",n.style.marginLeft="auto",n.style.color="#64748b",n.style.background="none",n.style.border="none",n.style.cursor="pointer",n.style.fontSize="16px",n.onclick=()=>s.remove(),s.appendChild(n),a.appendChild(s),setTimeout(()=>{s.style.opacity="0",s.style.transform="translateX(20px)",s.style.transition="opacity 0.3s ease, transform 0.3s ease",setTimeout(()=>s.remove(),300)},4e3)},animatePageEntry(){const e=document.getElementById("view-container");e&&(e.style.opacity="0",e.style.transform="translateY(16px)",e.style.transition="opacity 0.4s ease, transform 0.4s ease",requestAnimationFrame(()=>{requestAnimationFrame(()=>{e.style.opacity="1",e.style.transform="translateY(0)"})}))},async init(){try{const t=await(await fetch(this.api("api/auth.php"),{method:"POST",body:JSON.stringify({action:"check"}),headers:{"Content-Type":"application/json"},credentials:"include"})).json();t.logged_in?(this.state.user=t.user,localStorage.setItem("user",JSON.stringify(t.user))):(this.state.user=null,localStorage.removeItem("user"))}catch(e){console.error("Session check failed",e)}this.state.searchFilters={brand:"",category:"",item:"",query:""},await this.loadSettings(),this.updateCartBadge(),this.updateAuthUI(),this.handleRouting(),document.addEventListener("keydown",e=>{var t,a,s,o;if(e.target&&e.target.id==="global-text-search"&&e.key==="Enter"){e.preventDefault();const r=((t=document.getElementById("global-brand-select"))==null?void 0:t.value)||"",n=((a=document.getElementById("global-category-select"))==null?void 0:a.value)||"",l=((s=document.getElementById("global-item-select"))==null?void 0:s.value)||"",d=((o=document.getElementById("global-text-search"))==null?void 0:o.value)||"";this.state.searchFilters={brand:r,category:n,item:l,query:d},history.pushState(null,null,this.basePath+"/catalog"),this.handleRouting()}}),document.addEventListener("click",e=>{var l,d,u,i,c;if(e.target.closest("#mobile-menu-toggle")){const p=document.getElementById("mobile-sidebar-menu");p&&(p.classList.remove("hidden"),setTimeout(()=>{p.classList.remove("opacity-0"),p.classList.add("opacity-100");const x=p.querySelector("div");x&&(x.classList.remove("-translate-x-full"),x.classList.add("transform-none"))},50));return}const a=document.getElementById("mobile-sidebar-menu");if((e.target.closest("#mobile-menu-close")||a&&!a.classList.contains("hidden")&&!e.target.closest("#mobile-sidebar-menu > div")&&e.target.closest("#mobile-sidebar-menu"))&&a){a.classList.remove("opacity-100"),a.classList.add("opacity-0");const p=a.querySelector("div");p&&(p.classList.remove("transform-none"),p.classList.add("-translate-x-full")),setTimeout(()=>{a.classList.add("hidden")},300);return}if(e.target.closest("#global-search-btn")){e.preventDefault();const p=((l=document.getElementById("global-brand-select"))==null?void 0:l.value)||"",x=((d=document.getElementById("global-category-select"))==null?void 0:d.value)||"",b=((u=document.getElementById("global-item-select"))==null?void 0:u.value)||"",k=((i=document.getElementById("global-text-search"))==null?void 0:i.value)||"";this.state.searchFilters={brand:p,category:x,item:b,query:k},history.pushState(null,null,this.basePath+"/catalog"),this.handleRouting();return}if(e.target.closest("#search-toggle")){const p=document.getElementById("global-search-container");p&&(p.classList.toggle("hidden"),p.classList.contains("hidden")||(c=p.querySelector("input"))==null||c.focus());return}const n=e.target.closest("[data-link]");if(n){e.preventDefault();const p=document.getElementById("mobile-sidebar-menu");if(p&&!p.classList.contains("hidden")){p.classList.remove("opacity-100"),p.classList.add("opacity-0");const b=p.querySelector("div");b&&(b.classList.remove("transform-none"),b.classList.add("-translate-x-full")),p.classList.add("hidden")}const x=n.getAttribute("href");history.pushState(null,null,this.basePath+x),this.handleRouting()}}),window.addEventListener("popstate",()=>this.handleRouting())}};E.init();window.app=E;
