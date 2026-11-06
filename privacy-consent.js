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
      '#'+PANEL_ID+' button{appearance:none;border:1px solid #666;border-radius:999px;padding:9px 15px;background:transparent;color:#fff;font:600 11px Helvetica,Arial,sans-serif;letter-spacing:.04em;cursor:pointer}'+
      '#'+PANEL_ID+' button[data-primary="true"]{background:#f4b38f;border-color:#f4b38f;color:#171717}'+
      '#prycot-privacy-settings{position:fixed;z-index:9998;right:16px;bottom:12px;border:1px solid #555;border-radius:999px;padding:7px 11px;background:#171717;color:#ddd;font:10px Helvetica,Arial,sans-serif;letter-spacing:.04em;cursor:pointer;opacity:.82}'+
      '@media(max-width:600px){#'+PANEL_ID+'{left:10px;right:10px;bottom:10px;padding:16px;border-radius:10px}#'+PANEL_ID+' .pc-actions{gap:7px}#'+PANEL_ID+' button{padding:9px 12px;font-size:10px}#prycot-privacy-settings{right:10px;bottom:8px}}';
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
    var settings=document.getElementById('prycot-privacy-settings');
    if(!settings){settings=document.createElement('button');settings.id='prycot-privacy-settings';settings.type='button';settings.textContent='Privacy choices';settings.addEventListener('click',function(){var p=document.getElementById(PANEL_ID);if(p)p.setAttribute('data-open','true')});document.body.appendChild(settings)}
    if(!read())document.getElementById(PANEL_ID).setAttribute('data-open','true');
  }
  window.PRYCOTPrivacy={analyticsAllowed:allowed,openSettings:function(){var p=document.getElementById(PANEL_ID);if(p)p.setAttribute('data-open','true')}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();