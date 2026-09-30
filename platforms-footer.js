(function(){
  const platforms = [
    ['Yandex Music','https://cdn.simpleicons.org/yandexmusic/ffffff'],
    ['VK Music','https://cdn.simpleicons.org/vk/ffffff'],
    ['Apple Music','https://cdn.simpleicons.org/applemusic/ffffff'],
    ['Spotify','https://cdn.simpleicons.org/spotify/ffffff'],
    ['YouTube Music','https://cdn.simpleicons.org/youtubemusic/ffffff'],
    ['Deezer','https://cdn.simpleicons.org/deezer/ffffff'],
    ['SoundCloud','https://cdn.simpleicons.org/soundcloud/ffffff'],
    ['TikTok','https://cdn.simpleicons.org/tiktok/ffffff'],
    ['Shazam','https://cdn.simpleicons.org/shazam/ffffff'],
    ['TIDAL','https://cdn.simpleicons.org/tidal/ffffff'],
    ['Amazon Music','https://cdn.simpleicons.org/amazonmusic/ffffff'],
    ['MTS Music','https://cdn.simpleicons.org/mts/ffffff'],
    ['ZVUK','https://cdn.simpleicons.org/zvuk/ffffff'],
    ['iHeartRadio','https://cdn.simpleicons.org/iheartradio/ffffff'],
    ['Boomplay','https://cdn.simpleicons.org/boomplay/ffffff']
  ];

  function injectStyles(){
    if(document.getElementById('platform-footer-style')) return;
    const style=document.createElement('style');
    style.id='platform-footer-style';
    style.textContent=`
      footer{display:flex!important;flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;gap:0!important}
      .platform-footer{width:100%;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:22px 30px;margin:0 0 22px;padding:0;}
      .platform-logo{display:flex;align-items:center;justify-content:center;width:auto;height:18px;flex:0 0 auto;opacity:.92;transition:opacity .2s ease}
      .platform-logo:hover{opacity:1}
      .platform-logo img{display:block;width:auto;height:16px;max-width:76px;object-fit:contain}
      footer>.platform-footer~span{display:block}
      footer>.platform-footer~span+span{margin-left:auto}
      @media(max-width:700px){
        .platform-footer{gap:16px 20px;margin-bottom:18px;padding:0 4px}
        .platform-logo{height:16px}
        .platform-logo img{height:14px;max-width:64px}
        footer>.platform-footer~span+span{margin-left:0}
      }
    `;
    document.head.appendChild(style);
  }

  function addPlatformFooter(){
    const footer = document.querySelector('footer');
    if(!footer || footer.querySelector('.platform-footer')) return;
    injectStyles();

    const block = document.createElement('div');
    block.className = 'platform-footer';
    block.setAttribute('aria-label','Digital distribution platforms');

    platforms.forEach(([name,src])=>{
      const item = document.createElement('span');
      item.className = 'platform-logo';
      item.setAttribute('title',name);
      item.setAttribute('aria-label',name);
      const img = document.createElement('img');
      img.src = src;
      img.alt = name;
      img.loading = 'lazy';
      img.decoding = 'async';
      item.appendChild(img);
      block.appendChild(item);
    });

    footer.insertBefore(block, footer.firstChild);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',addPlatformFooter);
  else addPlatformFooter();
})();
