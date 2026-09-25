const whatsapp = message => 'https://wa.me/5514997547642?text=' + encodeURIComponent(message);
document.querySelectorAll('[data-wa]').forEach(link => {link.href=whatsapp(link.dataset.wa);link.target='_blank';link.rel='noopener noreferrer';});
document.querySelectorAll('[data-problem]').forEach(link=>{link.href='#help-form';link.addEventListener('click',()=>{document.querySelector('#problem').value=link.dataset.problem;document.querySelector('#device').focus({preventScroll:true});});});
document.querySelector('#help-form').addEventListener('submit',event=>{event.preventDefault();const message=`Olá! Vim pelo site da Adriana Eletro. Preciso de assistência. Equipamento: ${document.querySelector('#device').value}. Situação: ${document.querySelector('#problem').value}. Como funciona a avaliação?`;window.open(whatsapp(message),'_blank','noopener,noreferrer');});
document.querySelector('#year').textContent=new Date().getFullYear();

const instagramFeed = document.querySelector('[data-instagram-feed]');
const renderInstagramPosts = posts => {
  if (!instagramFeed || !posts?.length) return;
  instagramFeed.innerHTML = posts.slice(0, 5).map(post => {
    const media = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
    const caption = (post.caption || 'Postagem da Adriana Eletro').replace(/[<>&"]/g, char => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[char])).slice(0, 120);
    return `<a class="instagram-card" href="${post.permalink}" target="_blank" rel="noopener noreferrer"><img src="${media}" alt="${caption}" loading="lazy" decoding="async"><span>Instagram</span><strong>${caption}</strong></a>`;
  }).join('');
};

fetch('/api/instagram')
  .then(response => response.ok ? response.json() : Promise.reject())
  .then(data => renderInstagramPosts(data.posts))
  .catch(() => {});
