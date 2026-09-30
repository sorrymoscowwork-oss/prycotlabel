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

  function addPlatformFooter(){
    const footer = document.querySelector('footer');
    if(!footer || footer.querySelector('.platform-footer')) return;

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
