(function(){
  if((location.pathname.split('/').pop()||'index.html').toLowerCase()!=='account.html')return;
  const WORKER_BASE='https://misty-rain-65f3prycot-release-bot.sorrymoscowwork.workers.dev';
  const PROFILE_KEY='prycotTelegramProfile';
  const authView=document.getElementById('authView');
  const cabinetView=document.getElementById('cabinetView');
  const authStatus=document.getElementById('authStatus');
  const dashboardStatus=document.getElementById('dashboardStatus');
  if(dashboardStatus)dashboardStatus.style.display='none';
  function profile(){try{return JSON.parse(localStorage.getItem(PROFILE_KEY)||'null')}catch(_){return null}}
  function save(user){localStorage.setItem(PROFILE_KEY,JSON.stringify(user))}
  function clear(){localStorage.removeItem(PROFILE_KEY)}
  function showAuth(){authView?.classList.remove('hidden');cabinetView?.classList.add('hidden')}
  function showCabinet(){authView?.classList.add('hidden');cabinetView?.classList.remove('hidden')}
  function status(el,text,error){if(!el)return;el.textContent=text||'';el.classList.toggle('error',!!error)}
  function display(user){const name=[user?.first_name||'',user?.last_name||''].filter(Boolean).join(' ').trim()||'Telegram user';const label=user?.username?'@'+user.username:name;const n=document.getElementById('cabinetName'),e=document.getElementById('cabinetEmail'),p=document.getElementById('profileName'),a=document.getElementById('avatarBox');if(n)n.textContent=label;if(e)e.textContent='Telegram';if(p)p.value=label;if(a){a.innerHTML='';if(user?.photo_url){const img=document.createElement('img');img.src=user.photo_url;img.alt='';img.onerror=()=>{a.textContent=name.slice(0,1).toUpperCase()};a.appendChild(img)}else a.textContent=name.slice(0,1).toUpperCase()}}
  window.ensureAnonymousSession=async function(){return null};
  window.workerRequest=async function(path,options={}){const u=profile();if(!u||!u.id||!u.auth_date||!u.hash)throw new Error('Telegram session expired. Please log in again.');const headers={...(options.headers||{}),'X-Telegram-Auth':JSON.stringify(u)};const res=await fetch(WORKER_BASE+path,{...options,headers});let body={};try{body=await res.json()}catch(_){}if(!res.ok)throw new Error(body.error||'Dashboard request failed.');return body};
  window.onTelegramAuth=async function(user){try{status(authStatus,'Signing in...');save(user);const result=await fetch(WORKER_BASE+'/auth/telegram',{method:'POST',headers:{'Content-Type':'application/json','X-Telegram-Auth':JSON.stringify(user)},body:JSON.stringify({telegram:user})});let body={};try{body=await result.json()}catch(_){}if(!result.ok||!body.authenticated)throw new Error(body.error||'Telegram authentication failed.');display(user);showCabinet();status(authStatus,'');if(typeof window.loadDashboard==='function')await window.loadDashboard()}catch(err){clear();showAuth();status(authStatus,err.message||'Telegram authentication failed.',true)}};
  window.restoreSession=async function(){const u=profile();if(!u){showAuth();return}try{display(u);showCabinet();if(typeof window.loadDashboard==='function')await window.loadDashboard()}catch(err){showAuth();status(authStatus,err.message||'Load failed.',true)}};
  window.loadDashboard=async function(){try{const data=await window.workerRequest('/dashboard/releases');const releases=Array.isArray(data.releases)?data.releases:[];const summary=document.getElementById('releaseSummary'),list=document.getElementById('releaseList');if(summary)summary.textContent=releases.length+' RELEASE'+(releases.length===1?'':'S');if(!list)return;list.innerHTML='';if(!releases.length){const e=document.createElement('div');e.className='empty-releases';e.textContent='No releases yet.';list.appendChild(e);return}releases.forEach(r=>{const row=document.createElement('div');row.className='release-row';row.innerHTML='<div class="release-main"><div class="release-artist"></div><div class="release-title"></div></div><div class="release-meta"></div><div class="release-status"></div>';row.querySelector('.release-artist').textContent=r.artist_name||'';row.querySelector('.release-title').textContent=r.release_title||'Untitled';row.querySelector('.release-meta').textContent=(r.release_type||'')+(r.release_date?' · '+r.release_date:'');row.querySelector('.release-status').textContent=r.status||'IN REVIEW';list.appendChild(row)})}catch(err){status(dashboardStatus,err.message||'Load failed.',true)}};
  document.getElementById('logoutButton')?.addEventListener('click',()=>{clear();showAuth();status(authStatus,'')});
  const oldAgreement=document.getElementById('releaseAgreement');if(oldAgreement)oldAgreement.addEventListener('change',e=>{const b=document.getElementById('submitReleaseButton');if(!b)return;const on=e.target.checked;b.classList.toggle('release-disabled',!on);b.classList.toggle('release-enabled',on);b.setAttribute('aria-disabled',String(!on));b.tabIndex=on?0:-1});
  if(profile())window.restoreSession();
})();
