'use strict';
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#main-nav');
const closeMenu=()=>{menu?.setAttribute('aria-expanded','false');nav?.classList.remove('open');};
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav?.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav?.classList.contains('open')){closeMenu();menu.focus();}});
document.addEventListener('click',event=>{if(nav?.classList.contains('open')&&!event.target.closest('.header'))closeMenu();});
const form=document.querySelector('#quote-form');
if(form){
 let step=1,briefText='';
 const error=document.querySelector('#form-error'),fields=[...form.querySelectorAll('fieldset')],service=form.elements.service;
 const initialService=new URLSearchParams(location.search).get('service');
 if([...service.options].some(option=>option.value===initialService))service.value=initialService;
 function showStep(next){step=next;fields.forEach(f=>f.hidden=Number(f.dataset.step)!==step);document.querySelectorAll('[data-step-label]').forEach(item=>{const active=Number(item.dataset.stepLabel)===step;item.classList.toggle('active',active);if(active)item.setAttribute('aria-current','step');else item.removeAttribute('aria-current');});error.textContent='';const legend=fields[step-1].querySelector('legend');legend.tabIndex=-1;legend.focus({preventScroll:true});document.querySelector('.enquiry-card').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
 function validate(){
  const current=fields[step-1];current.querySelectorAll('[aria-invalid]').forEach(input=>input.removeAttribute('aria-invalid'));
  let invalid=null,message='';
  for(const input of current.querySelectorAll('input,select,textarea')){
   if(input.required&&(!input.value.trim()||(input.type==='checkbox'&&!input.checked))){invalid=input;message=input.type==='checkbox'?'Please acknowledge how the WhatsApp handoff works.':'Please complete '+(document.querySelector(`label[for="${input.id}"]`)?.textContent.replace('*','').trim().toLowerCase()||'this field')+'.';break;}
   if(input.type==='email'&&input.value&&!input.validity.valid){invalid=input;message='Please enter a valid email address, or leave it blank.';break;}
   if(input.id==='phone'&&input.value){const digits=input.value.replace(/[\s()+-]/g,'');if(!/^(?:91)?[6-9]\d{9}$/.test(digits)){invalid=input;message='Enter a 10-digit Indian mobile number, with optional +91.';break;}}
   if(input.id==='start'&&input.value){const today=new Date();const local=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;if(input.value<local){invalid=input;message='Choose today or a future date, or leave the date blank.';break;}}
  }
  if(invalid){error.textContent=message;invalid.setAttribute('aria-invalid','true');invalid.setAttribute('aria-describedby','form-error');invalid.focus();return false;}error.textContent='';return true;
 }
 function summary(){const data=new FormData(form);const rows=[['Service',service.selectedOptions[0].textContent],['Location',data.get('location')],['Start date',data.get('start')||'To discuss'],['Duration',data.get('duration')],['Personnel',data.get('personnel')],['Duty hours',data.get('hours')||'To discuss'],['Name',data.get('name')],['Mobile',data.get('phone')],['Company / society',data.get('company')||'Not provided'],['Email',data.get('email')||'Not provided'],['Notes',data.get('notes')||'None']];const target=document.querySelector('#enquiry-summary');target.replaceChildren();for(const [key,value]of rows){const div=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=key;dd.textContent=value;div.append(dt,dd);target.append(div);}briefText='Hello R CORPS, I would like a quotation for the following requirement.\n\n'+rows.map(([key,value])=>`${key}: ${value}`).join('\n\n');}
 form.querySelectorAll('.next').forEach(button=>button.addEventListener('click',()=>{if(!validate())return;if(step===2)summary();showStep(step+1);}));
 form.querySelectorAll('.back').forEach(button=>button.addEventListener('click',()=>showStep(step-1)));
 form.addEventListener('submit',event=>{event.preventDefault();if(!validate())return;if(step<3){if(step===2)summary();showStep(step+1);return;}summary();const wa=document.querySelector('#send-whatsapp');wa.href='https://wa.me/'+wa.dataset.number+'?text='+encodeURIComponent(briefText);form.hidden=true;const complete=document.querySelector('#enquiry-complete');complete.hidden=false;const heading=complete.querySelector('h2');heading.tabIndex=-1;heading.focus();});
 document.querySelector('#download-brief').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([briefText],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='R-CORPS-enquiry-brief.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 document.querySelector('#reset-enquiry').addEventListener('click',()=>{form.reset();form.querySelectorAll('[aria-invalid]').forEach(x=>x.removeAttribute('aria-invalid'));briefText='';document.querySelector('#enquiry-summary').replaceChildren();document.querySelector('#enquiry-complete').hidden=true;form.hidden=false;showStep(1);});
}
