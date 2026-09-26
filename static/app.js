const $ = (id) => document.getElementById(id);
let currentType = "interior";
let authMode = "register";
const tokenKey = "pocketsmart_token";
const token = () => localStorage.getItem(tokenKey);
const typeInfo = {
 interior:{title:"A home that feels like you.",desc:"Bring your favorite textures, colors, and ideas together.",image:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=85",alt:"Cozy home interior"},
 party:{title:"Make the moment memorable.",desc:"Thoughtful ideas for gathering your favorite people.",image:"https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1100&q=85",alt:"Celebration table"},
 jewelry:{title:"A detail that feels like you.",desc:"Find a look that fits your occasion and your budget.",image:"https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1100&q=85",alt:"Elegant jewelry"}
};
function setType(type){
 currentType=type;
 document.querySelectorAll(".type-tab").forEach(b=>b.classList.toggle("active",b.dataset.type===type));
 $("guest-wrap").hidden=type!=="party";
 $("planner-image").src=typeInfo[type].image; $("planner-image").alt=typeInfo[type].alt;
 $("visual-title").textContent=typeInfo[type].title; $("visual-desc").textContent=typeInfo[type].desc;
 $("result").innerHTML="";
}
document.querySelectorAll(".type-tab").forEach(b=>b.addEventListener("click",()=>setType(b.dataset.type)));
function authHeaders(){return token()?{"Authorization":`Bearer ${token()}`}:{ };}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function money(n){return "₹"+Number(n||0).toLocaleString("en-IN",{maximumFractionDigits:2});}
function showAuth(mode="register"){authMode=mode;$("auth-modal").hidden=false;updateAuthMode();}
function updateAuthMode(){
 $("auth-title").textContent=authMode==="register"?"Create your account":"Welcome back";
 $("auth-submit").textContent=authMode==="register"?"Create account":"Log in";
 $("name-wrap").hidden=authMode!=="register";
 document.querySelectorAll("[data-auth]").forEach(b=>b.classList.toggle("active",b.dataset.auth===authMode));
 $("auth-message").textContent="";
}
$("auth-open").addEventListener("click",()=>showAuth(token()?"login":"register"));
$("auth-close").addEventListener("click",()=>$("auth-modal").hidden=true);
$("auth-modal").addEventListener("click",e=>{if(e.target===$("auth-modal"))$("auth-modal").hidden=true;});
document.querySelectorAll("[data-auth]").forEach(b=>b.addEventListener("click",()=>{authMode=b.dataset.auth;updateAuthMode();}));
$("auth-form").addEventListener("submit",async e=>{
 e.preventDefault(); const btn=$("auth-submit");btn.disabled=true;
 try{
  const body={email:$("auth-email").value.trim(),password:$("auth-password").value};
  if(authMode==="register")body.name=$("auth-name").value.trim();
  const r=await fetch(`/api/auth/${authMode}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
  const data=await r.json();if(!r.ok)throw Error(data.detail||"Authentication failed.");
  localStorage.setItem(tokenKey,data.access_token);$("auth-modal").hidden=true;updateUser();loadPlans();
 }catch(err){$("auth-message").textContent=err.message;}finally{btn.disabled=false;}
});
function updateUser(){
 const logged=!!token();$("auth-open").hidden=logged;$("logout-btn").hidden=!logged;
 if(logged){fetch("/api/auth/me",{headers:authHeaders()}).then(r=>r.ok?r.json():null).then(u=>{$("user-label").textContent=u?`Hi, ${u.name}`:"";}).catch(()=>{});}
 else $("user-label").textContent="";
}
$("logout-btn").addEventListener("click",()=>{localStorage.removeItem(tokenKey);updateUser();$("plans-list").innerHTML='<div class="empty-state">Log in to see your saved plans here.</div>';});
function renderResult(data){
 const breakdown=Object.entries(data.breakdown||{}).map(([name,d])=>`<div class="breakdown-row"><span>${escapeHtml(name)} <small>(${d.percentage??""}%)</small></span><strong>${money(d.amount)}</strong></div>`).join("");
 const rec=data.recommendations||{};const items=Array.isArray(rec.items)?rec.items:[];
 const recHtml=items.map(item=>`<article class="recommendation"><h5>${escapeHtml(item.title)}</h5><p>${escapeHtml(item.description)}</p><span class="rec-price">Estimate: ${money(item.estimated_price)}</span><a class="search-link" target="_blank" rel="noopener" href="https://www.google.com/search?tbm=shop&q=${encodeURIComponent(item.search_query||item.title||"") }">Explore products ↗</a></article>`).join("");
 const tips=(rec.tips||[]).map(t=>`<li>${escapeHtml(t)}</li>`).join("");
 $("result").innerHTML=`<div class="result-head"><div><div class="eyebrow">YOUR PLAN IS READY</div><h3>Here’s your budget plan</h3></div><span class="budget-pill">Total ${money(data.total_budget)}</span></div>
 <div class="summary-card"><div class="eyebrow">${rec.ai_generated?"GEMINI AI RECOMMENDATIONS":"PERSONALIZED PLAN"}</div><p>${escapeHtml(rec.summary||"Your budget plan is ready.")}</p>${rec.notice?`<div class="notice">${escapeHtml(rec.notice)}</div>`:""}</div>
 <div class="result-columns"><div class="result-card"><h4>Budget breakdown</h4>${breakdown}<div class="breakdown-row"><strong>Total</strong><strong>${money(data.total_budget)}</strong></div></div>
 <div class="result-card"><h4>✦ Recommendations</h4>${recHtml||"<p>No recommendations returned.</p>"}<h4 style="margin-top:20px">Smart planning tips</h4><ul class="tips">${tips}</ul></div></div>`;
 $("result").scrollIntoView({behavior:"smooth",block:"start"});
}
$("plan-form").addEventListener("submit",async e=>{
 e.preventDefault();if(!token()){showAuth("register");$("auth-message").textContent="Create an account or log in to save and generate your plan.";return;}
 const budget=Number($("budget").value);if(!budget||budget<=0){$("result").innerHTML='<div class="notice">Please enter a valid budget.</div>';return;}
 const btn=$("generate-btn");btn.disabled=true;btn.innerHTML="Building your plan…";$("result").innerHTML='<div class="summary-card">Preparing your budget and recommendations…</div>';
 try{
  const r=await fetch("/api/budget/create",{method:"POST",headers:{"Content-Type":"application/json",...authHeaders()},body:JSON.stringify({event_type:currentType,budget,preferences:$("preferences").value.trim(),guest_count:currentType==="party"&&$("guest-count").value?Number($("guest-count").value):null})});
  const data=await r.json();if(!r.ok)throw Error(data.detail||"Could not create your plan.");
  renderResult(data);await loadPlans();
 }catch(err){$("result").innerHTML=`<div class="notice">${escapeHtml(err.message)} <br>Check your login and server terminal.</div>`;}
 finally{btn.disabled=false;btn.innerHTML='Generate my plan <span>→</span>';}
});
async function loadPlans(){
 if(!token())return;
 try{
  const r=await fetch("/api/budget/my-plans",{headers:authHeaders()});const data=await r.json();if(!r.ok)throw Error(data.detail||"Unable to load plans.");
  const plans=data.plans||[];if(!plans.length){$("plans-list").innerHTML='<div class="empty-state">No saved plans yet. Create your first plan above.</div>';return;}
  $("plans-list").innerHTML=plans.map(p=>`<article class="plan-card"><div class="eyebrow">SAVED BUDGET</div><h3>${escapeHtml(p.event_type)} plan</h3><p><strong>${money(p.budget)}</strong></p><p>${escapeHtml(p.preferences||"No preferences added")}</p><div class="plan-actions"><button class="small-btn" data-view="${p.id}">View plan</button><button class="small-btn danger" data-delete="${p.id}">Delete</button></div></article>`).join("");
  document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>{const p=plans.find(x=>x.id===Number(b.dataset.view));if(p)renderResult({total_budget:p.budget,breakdown:p.breakdown,recommendations:p.recommendations});document.querySelector("#planner").scrollIntoView({behavior:"smooth"});}));
  document.querySelectorAll("[data-delete]").forEach(b=>b.addEventListener("click",async()=>{if(!confirm("Delete this saved plan?"))return;const r=await fetch(`/api/budget/${b.dataset.delete}`,{method:"DELETE",headers:authHeaders()});if(r.ok)loadPlans();else alert("Could not delete plan.");}));
 }catch(err){$("plans-list").innerHTML=`<div class="empty-state">${escapeHtml(err.message)}</div>`;}
}
$("load-plans").addEventListener("click",loadPlans);
updateUser();loadPlans();
