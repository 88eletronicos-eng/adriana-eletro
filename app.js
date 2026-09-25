const whatsapp = message => 'https://wa.me/5514997547642?text=' + encodeURIComponent(message);
document.querySelectorAll('[data-wa]').forEach(link => {link.href=whatsapp(link.dataset.wa);link.target='_blank';link.rel='noopener noreferrer';});
document.querySelectorAll('[data-problem]').forEach(link=>{link.href='#help-form';link.addEventListener('click',()=>{document.querySelector('#problem').value=link.dataset.problem;document.querySelector('#device').focus({preventScroll:true});});});
document.querySelector('#help-form').addEventListener('submit',event=>{event.preventDefault();const message=`Olá! Vim pelo site da Adriana Eletro. Preciso de assistência. Equipamento: ${document.querySelector('#device').value}. Situação: ${document.querySelector('#problem').value}. Como funciona a avaliação?`;window.open(whatsapp(message),'_blank','noopener,noreferrer');});
document.querySelector('#year').textContent=new Date().getFullYear();

const brandToggle = document.querySelector('.brand-marquee-toggle');
brandToggle?.addEventListener('click', () => {
  const paused = brandToggle.closest('.brand-strip').classList.toggle('is-paused');
  brandToggle.setAttribute('aria-pressed', String(paused));
  brandToggle.textContent = paused ? 'Retomar animação' : 'Pausar animação';
});
