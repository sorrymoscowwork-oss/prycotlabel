(function(){
  'use strict';
  var KEY='prycot_privacy_consent';
  var STYLE_ID='prycot-privacy-consent-style';
  var PANEL_ID='prycot-privacy-consent-panel';
  function read(){try{var v=JSON.parse(localStorage.getItem(KEY)||'null');return v&&v.version===1&&typeof v.analytics==='boolean'?v:null}catch(_){return null}}
  function allowed(){var v=read();return !!(v&&v.analytics===true)}
  function clearIds(){try{localStorage.removeItem('prycot_home_visitor_id');localStorage.removeItem('prycot_analytics_visitor')}catch(_){}}
  function save(analytics){try{localStorage.setItem(KEY,JSON.stringify({version:1,analytics:!!analytics,updatedAt:new Date().toISOString()}))}catch(_){}if(!analytics)clearIds()}
  function addStyles(){
    if(document.getElementById(STYLE_ID))return;
    var s=document.createElement('style');s.id=STYLE_ID;s.textContent=
      '#'+PANEL_ID+'{position:fixed;z-index:99999;left:20px;right:20px;bottom:20px;max-width:760px;margin:0 auto;padding:20px 22px;background:#171717;color:#f4f4f4;border:1px solid #414141;border-radius:12px;box-shadow:0 12px 40px #0009;font:13px/1.55 Helvetica,Arial,sans-serif;display:none}'+
      '#'+PANEL_ID+'[data-open="true"]{display:block}'+
      '#'+PANEL_ID+' p{margin:0 0 14px;color:#c5c5c5}'+
      '#'+PANEL_ID+' strong{color:#fff;font-weight:600}'+
      '#'+PANEL_ID+' a{color:#f4b38f;text-decoration:underline}'+
      '#'+PANEL_ID+' .pc-actions{display:flex;flex-wrap:wrap;gap:9px;align-items:center}'+
      '#'+PANEL_ID+' button{appearance:none!important;border:1px solid #FF8A70!important;border-radius:999px!important;padding:9px 15px!important;background:#FF8A70!important;background-color:#FF8A70!important;background-image:none!important;color:#0A0A0A!important;font:600 11px Helvetica,Arial,sans-serif!important;letter-spacing:.04em!important;cursor:pointer!important;animation:none!important;transition:background-color .18s ease,color .18s ease,border-color .18s ease!important}'+
      '#'+PANEL_ID+' button:hover,#'+PANEL_ID+' button:focus-visible{background:#BDA7F5!important;background-color:#BDA7F5!important;background-image:none!important;border-color:#BDA7F5!important;color:#0A0A0A!important}'+
      '#'+PANEL_ID+' .pc-actions{display:flex;flex-wrap:wrap;gap:9px;align-items:center}'+
      '@media(max-width:600px){#'+PANEL_ID+'{left:10px;right:10px;bottom:10px;padding:16px;border-radius:10px}#'+PANEL_ID+' .pc-actions{gap:7px}#'+PANEL_ID+' button{padding:9px 12px;font-size:10px}}';
    document.head.appendChild(s);
  }
  function mount(){
    addStyles();
    if(!document.getElementById(PANEL_ID)){
      var panel=document.createElement('section');panel.id=PANEL_ID;panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','false');panel.setAttribute('aria-label','Privacy choices');
      panel.innerHTML='<p><strong>Privacy choices.</strong> PRYCOT uses necessary browser storage for account features and optional analytics to count visits and link clicks. Analytics stays off unless you allow it. Read our <a href="/privacy-policy.html">Privacy Policy</a>.</p><div class="pc-actions"><button type="button" data-choice="accept" data-primary="true">Accept analytics</button><button type="button" data-choice="reject">Reject optional analytics</button><button type="button" data-choice="close">Close</button></div>';
      panel.addEventListener('click',function(e){var b=e.target.closest('button[data-choice]');if(!b)return;var choice=b.getAttribute('data-choice');if(choice==='accept'){save(true);panel.setAttribute('data-open','false');location.reload()}else if(choice==='reject'){save(false);panel.setAttribute('data-open','false');location.reload()}else panel.setAttribute('data-open','false')});
      document.body.appendChild(panel);
    }
    var footer=document.querySelector('footer.site-footer');
    if(footer){
      var link=footer.querySelector('[data-prycot-privacy-link]');
      if(!link){
        link=document.createElement('a');link.href='#privacy-choices';link.textContent='PRIVACY CHOICES';link.setAttribute('data-prycot-privacy-link','true');
        link.style.cssText='display:inline-flex;align-items:center;justify-content:center;padding:9px 13px;border:1px solid #FF8A70;border-radius:999px;background:#FF8A70;color:#0A0A0A;text-decoration:none;font:600 10px Helvetica,Arial,sans-serif;letter-spacing:.06em;white-space:nowrap;cursor:pointer;transition:background-color .18s ease,color .18s ease,border-color .18s ease;';
        link.addEventListener('mouseenter',function(){link.style.backgroundColor='#BDA7F5';link.style.borderColor='#BDA7F5'});
        link.addEventListener('mouseleave',function(){link.style.backgroundColor='#FF8A70';link.style.borderColor='#FF8A70'});
        link.addEventListener('click',function(e){e.preventDefault();var p=document.getElementById(PANEL_ID);if(p)p.setAttribute('data-open','true')});
      }
      var social=footer.querySelector('.footer-social');
      if(social){social.insertBefore(link,social.firstElementChild)}
      else if(!link.parentElement)footer.appendChild(link);
    }
    if(!read())document.getElementById(PANEL_ID).setAttribute('data-open','true');
  }
  window.PRYCOTPrivacy={analyticsAllowed:allowed,openSettings:function(){var p=document.getElementById(PANEL_ID);if(p)p.setAttribute('data-open','true')}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();