(function(){
  if((location.pathname.split('/').pop()||'index.html').toLowerCase()!=='account.html')return;
  const WORKER_BASE='https://misty-rain-65f3prycot-release-bot.sorrymoscowwork.workers.dev';
  const PROFILE_KEY='prycotTelegramProfile';
  const authView=document.getElementById('authView');
  const cabinetView=document.getElementById('cabinetView');
  const authStatus=document.getElementById('authStatus');
  const dashboardStatus=document.getElementById('dashboardStatus');
  let authRevision=0;
  if(dashboardStatus)dashboardStatus.style.display='none';
  function readCookie(){try{const m=document.cookie.match(/(?:^|; )prycotTelegramProfile=([^;]+)/);return m?JSON.parse(decodeURIComponent(m[1])):null}catch(_){return null}}
  function profile(){try{const local=JSON.parse(localStorage.getItem(PROFILE_KEY)||'null');if(local)return local}catch(_){}return readCookie()}
  function save(user){const value=JSON.stringify(user);localStorage.setItem(PROFILE_KEY,value);document.cookie='prycotTelegramProfile='+encodeURIComponent(value)+'; Max-Age=604800; Path=/; Domain=.prycot.com; Secure; SameSite=Lax'}
  function clear(){localStorage.removeItem(PROFILE_KEY);document.cookie='prycotTelegramProfile=; Max-Age=0; Path=/; Domain=.prycot.com; Secure; SameSite=Lax'}
  function showAuth(){authView?.classList.remove('hidden');cabinetView?.classList.add('hidden')}
  function showCabinet(){authView?.classList.add('hidden');cabinetView?.classList.remove('hidden')}
  function status(el,text,error){if(!el)return;el.textContent=text||'';el.classList.toggle('error',!!error)}
  function display(user){const name=[user?.first_name||'',user?.last_name||''].filter(Boolean).join(' ').trim()||'Telegram user';const label=user?.username?'@'+user.username:name;const n=document.getElementById('cabinetName'),e=document.getElementById('cabinetEmail'),a=document.getElementById('avatarBox');if(n)n.textContent=label;if(e)e.textContent='Telegram';if(a){a.innerHTML='';if(user?.photo_url){const img=document.createElement('img');img.src=user.photo_url;img.alt='';img.onerror=()=>{a.textContent=name.slice(0,1).toUpperCase()};a.appendChild(img)}else a.textContent=name.slice(0,1).toUpperCase()}}
  window.ensureAnonymousSession=async function(){return null};
  window.workerRequest=async function(path,options={}){const u=profile();if(!u||!u.id||!u.auth_date||!u.hash)throw new Error('Telegram session expired. Please log in again.');const headers={...(options.headers||{}),'X-Telegram-Auth':JSON.stringify(u)};const res=await fetch(WORKER_BASE+path,{...options,headers});let body={};try{body=await res.json()}catch(_){}if(!res.ok)throw new Error(body.error||'Dashboard request failed.');return body};
  window.onTelegramAuth=async function(user){const revision=++authRevision;try{status(authStatus,'Signing in...');save(user);const result=await fetch(WORKER_BASE+'/auth/telegram',{method:'POST',headers:{'Content-Type':'application/json','X-Telegram-Auth':JSON.stringify(user)},body:JSON.stringify({telegram:user})});let body={};try{body=await result.json()}catch(_){}if(revision!==authRevision)return;if(!result.ok||!body.authenticated)throw new Error(body.error||'Telegram authentication failed.');display(user);showCabinet();status(authStatus,'');if(typeof window.loadDashboard==='function')await window.loadDashboard();if(typeof window.loadPrycotLinks==='function')await window.loadPrycotLinks()}catch(err){if(revision!==authRevision)return;clear();showAuth();status(authStatus,err.message||'Telegram authentication failed.',true)}};
  window.restoreSession=async function(){const revision=++authRevision;const u=profile();if(!u){showAuth();return}try{const result=await fetch(WORKER_BASE+'/auth/telegram',{method:'POST',headers:{'Content-Type':'application/json','X-Telegram-Auth':JSON.stringify(u)},body:JSON.stringify({telegram:u})});let body={};try{body=await result.json()}catch(_){}if(revision!==authRevision)return;if(!result.ok||!body.authenticated){clear();showAuth();status(authStatus,body.error||'Telegram session expired. Please log in again.',true);return}save(u);display(u);showCabinet();status(authStatus,'');if(typeof window.loadDashboard==='function')await window.loadDashboard();if(revision!==authRevision)return;if(typeof window.loadPrycotLinks==='function')await window.loadPrycotLinks()}catch(err){if(revision!==authRevision)return;clear();showAuth();status(authStatus,err.message||'Load failed.',true)}};
  window.loadDashboard=async function(){try{const data=await window.workerRequest('/dashboard/releases');const releases=Array.isArray(data.releases)?data.releases:[];const summary=document.getElementById('releaseSummary'),list=document.getElementById('releaseList');if(summary)summary.textContent=releases.length+' RELEASE'+(releases.length===1?'':'S');if(!list)return;list.innerHTML='';if(!releases.length){const e=document.createElement('div');e.className='empty-releases';e.textContent='No releases yet.';list.appendChild(e);return}releases.forEach(r=>{const row=document.createElement('article');row.className='release-row';const main=document.createElement('div');main.className='release-card-main';const titleText=r.release_title||'Untitled';const artworkValue=r.artwork_url||r.cover_url||r.cover_image_url||r.image_url||r.artworkUrl||r.coverUrl||(typeof r.artwork==='string'?r.artwork:null)||(typeof r.cover==='string'?r.cover:null);let artworkUrl='';if(typeof artworkValue==='string'&&artworkValue.trim()){try{const parsed=new URL(artworkValue,location.origin);if(parsed.protocol==='https:'||parsed.protocol==='http:')artworkUrl=parsed.href}catch(_){}}if(artworkUrl){const img=document.createElement('img');img.className='release-cover';img.src=artworkUrl;img.alt=titleText+' artwork';img.loading='lazy';img.onerror=()=>{const fallback=document.createElement('div');fallback.className='release-cover-fallback';fallback.setAttribute('aria-hidden','true');fallback.textContent=(titleText.trim().charAt(0)||'P').toUpperCase();img.replaceWith(fallback)};main.appendChild(img)}else{const fallback=document.createElement('div');fallback.className='release-cover-fallback';fallback.setAttribute('aria-hidden','true');fallback.textContent=(titleText.trim().charAt(0)||'P').toUpperCase();main.appendChild(fallback)}const copy=document.createElement('div');copy.className='release-card-copy';const title=document.createElement('div');title.className='release-title';title.textContent=titleText;const artist=document.createElement('div');artist.className='release-artist';artist.textContent=r.artist_name||'';copy.append(title,artist);main.appendChild(copy);const details=document.createElement('div');details.className='release-card-details';const meta=document.createElement('div');meta.className='release-meta';meta.textContent=[r.release_type||'',r.release_date||''].filter(Boolean).join(' · ')||'Release details pending';const statusCell=document.createElement('div');statusCell.className='release-status';const statusText=String(r.status||'IN REVIEW');statusCell.textContent=statusText;const normalized=statusText.toLowerCase();if(/live|published|distribut/.test(normalized))statusCell.classList.add('status-live');else if(/pending|review|processing|submitted/.test(normalized))statusCell.classList.add('status-pending');else if(/reject|fail|error/.test(normalized))statusCell.classList.add('status-error');details.append(meta,statusCell);row.append(main,details);list.appendChild(row)})}catch(err){status(dashboardStatus,err.message||'Load failed.',true)}};\n  const PRYCOTLINK_API='https://prycotlink-api.sorrymoscowwork.workers.dev';
  async function openPrycotLink(a){
    const u=profile();
    if(!u||!u.id||!u.auth_date||!u.hash){
      alert('Please sign in with Telegram in your PRYCOT account.');
      return;
    }
    // The account and PRYCOTLINK pages share the same origin, so the verified
    // Telegram profile is already available to the creation page in storage.
    // Navigate directly and avoid the broken server-side handoff endpoint.
    window.location.href=new URL(a.href,location.origin).href;
  }
  document.addEventListener('click',e=>{
    const a=e.target&&e.target.closest?e.target.closest('a.prycotlink-create'):null;
    if(!a)return;
    e.preventDefault();
    openPrycotLink(a);
  },true);
    window.loadPrycotLinks=async function(){const revision=authRevision;try{const data=await fetch(WORKER_BASE+'/dashboard/prycotlink',{headers:{'X-Telegram-Auth':JSON.stringify(profile())}}).then(async r=>{const b=await r.json();if(revision!==authRevision)return null;if(!r.ok)throw new Error(b.error||'Could not load PRYCOTLINK');return b});if(revision!==authRevision||!data)return;const box=document.getElementById('prycotlinkList');if(!box)return;box.innerHTML='';const links=Array.isArray(data.releases)?data.releases:[];const summary=document.getElementById('prycotlinkSummary');if(summary)summary.textContent=links.length+' PAGE'+(links.length===1?'':'S');if(!links.length){const e=document.createElement('div');e.className='empty-releases';e.textContent='No PRYCOTLINK pages yet.';box.appendChild(e);return}links.forEach(r=>{const entry=document.createElement('div');entry.className='prycotlink-entry';const info=document.createElement('div');info.className='prycotlink-row';const textWrap=document.createElement('span');const title=document.createElement('strong');title.textContent=r.title||r.slug;const url=document.createElement('small');url.textContent='prycot.com/'+r.slug;textWrap.append(title,url);info.appendChild(textWrap);const open=document.createElement('a');open.className='prycotlink-open';open.href='https://prycot.com/prycotlink.html?release='+encodeURIComponent(r.slug);open.textContent='OPEN →';const analytics=document.createElement('a');analytics.className='prycotlink-analytics';analytics.href='prycotlink-analytics.html?slug='+encodeURIComponent(r.slug);analytics.textContent='ANALYTICS →';entry.append(info,open,analytics);box.appendChild(entry)})}catch(err){if(revision!==authRevision)return;const box=document.getElementById('prycotlinkList');if(box){box.innerHTML='';if(err?.message==='Unauthorized'){const e=document.createElement('div');e.className='empty-releases';e.textContent='Could not verify PRYCOTLINK session. Your account is still signed in; reload this section later.';box.appendChild(e);return}const e=document.createElement('div');e.className='empty-releases';e.textContent=err.message||'Could not load PRYCOTLINK pages.';box.appendChild(e)}}};
  document.getElementById('logoutButton')?.addEventListener('click',()=>{clear();showAuth();status(authStatus,'')});
  if(profile())window.restoreSession();
  (async function syncHomepageMenu(){try{const response=await fetch('index.html',{cache:'no-store'});if(!response.ok)return;const html=await response.text();const doc=new DOMParser().parseFromString(html,'text/html');const sourceMenu=doc.querySelector('nav.menu');const targetMenu=document.getElementById('menu');if(!sourceMenu||!targetMenu)return;targetMenu.innerHTML=sourceMenu.innerHTML;const menuStyles=[...doc.querySelectorAll('style')].map(s=>s.textContent||'').filter(css=>css.includes('.menu')).join('\n');if(menuStyles){const style=document.createElement('style');style.id='homepage-menu-sync-style';style.textContent=menuStyles;document.head.appendChild(style)}const button=document.getElementById('menuButton');const menu=document.getElementById('menu');if(button&&menu){button.onclick=function(e){e.stopPropagation();menu.classList.toggle('open')};menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));const close=menu.querySelector('.menu-close');if(close)close.addEventListener('click',()=>menu.classList.remove('open'));document.addEventListener('click',e=>{if(menu.classList.contains('open')&&!menu.contains(e.target)&&!button.contains(e.target))menu.classList.remove('open')})}const accountLink=targetMenu.querySelector('a[href="account.html"]');if(accountLink)accountLink.classList.add('active-page')}catch(_){}})();
  (function mobileLogoScroll(){
    if(!window.matchMedia('(max-width:700px)').matches)return;
    const brand=document.querySelector('.brand');
    const tagline=document.querySelector('.tagline');
    if(!brand||!tagline)return;
    const transition='filter .56s ease, opacity .56s ease, transform .56s ease';
    function update(){
      const hidden=window.scrollY>80;
      const filter=hidden?'blur(16px)':'blur(0)';
      const opacity=hidden?'0':'1';
      const transform=hidden?'translateY(-8px)':'translateY(0)';
      [brand,tagline].forEach(el=>{
        el.style.setProperty('transition',transition,'important');
        el.style.setProperty('filter',filter,'important');
        el.style.setProperty('opacity',opacity,'important');
        el.style.setProperty('transform',transform,'important');
        el.style.setProperty('pointer-events',hidden?'none':'auto','important');
      });
    }
    window.addEventListener('scroll',update,{passive:true});
    window.addEventListener('resize',update,{passive:true});
    update();
  })();
})();
