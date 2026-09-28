'use strict';
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const cinema=document.querySelector('.cinema-hero');
const motionButton=document.querySelector('#hero-motion');
let motionPaused=false;
function syncMotion(){
  cinema?.classList.toggle('motion-paused',motionPaused||reducedMotion.matches);
  if(motionButton){motionButton.disabled=reducedMotion.matches;motionButton.setAttribute('aria-pressed',String(motionPaused||reducedMotion.matches));motionButton.textContent=reducedMotion.matches?'Motion off':motionPaused?'Resume motion ▷':'Pause motion Ⅱ';}
}
motionButton?.addEventListener('click',()=>{motionPaused=!motionPaused;syncMotion();});
let sceneRequest=0;
document.querySelectorAll('[data-scene]').forEach(button=>button.addEventListener('click',async()=>{
  const request=++sceneRequest;
  const index=button.dataset.scene;
  const nextPhoto=document.querySelector(`[data-scene-image="${index}"] img`);
  nextPhoto.loading='eager';
  try{await nextPhoto.decode();}catch{document.querySelector('#scene-announcement').textContent='This photograph could not load. Please choose another scene.';return;}
  if(request!==sceneRequest)return;
  document.querySelectorAll('[data-scene]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  document.querySelectorAll('[data-scene-image]').forEach(p=>{const active=p.dataset.sceneImage===index;p.classList.toggle('is-active',active);p.setAttribute('aria-hidden',String(!active));});
  document.querySelector('#scene-announcement').textContent=button.textContent.trim().replace(/^0\d\s*/,'')+' — photograph '+(Number(index)+1)+' of 3';
}));
const clientSection=document.querySelector('.client-section');
const marqueeButton=document.querySelector('#marquee-control');
let logosPaused=false;
function syncLogos(){
  clientSection?.classList.toggle('logos-paused',logosPaused||reducedMotion.matches);
  if(marqueeButton){marqueeButton.disabled=reducedMotion.matches;marqueeButton.setAttribute('aria-pressed',String(logosPaused||reducedMotion.matches));marqueeButton.textContent=reducedMotion.matches?'Motion off':logosPaused?'Resume logos ▷':'Pause logos Ⅱ';}
}
marqueeButton?.addEventListener('click',()=>{logosPaused=!logosPaused;syncLogos();});
document.querySelector('.all-clients')?.addEventListener('toggle',event=>clientSection.classList.toggle('clients-expanded',event.target.open));
reducedMotion.addEventListener('change',()=>{syncMotion();syncLogos();});
syncMotion();syncLogos();
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries)entry.target.classList.toggle('in-view',entry.isIntersecting);},{threshold:0.08});if(cinema)observer.observe(cinema);if(clientSection)observer.observe(clientSection);}
