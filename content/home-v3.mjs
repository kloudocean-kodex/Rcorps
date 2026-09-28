import { teamPicture, personnelSection, vehicleSection } from './personnel.mjs';
export function createHome({picture, button, arrow, services, faqs, googleProof, clients}) {
  const scene=(name,alt,cls='',eager=false)=>`<picture class="${cls}"><source srcset="/assets/v3/${name}-640.webp 640w, /assets/v3/${name}-1200.webp 1200w, /assets/v3/${name}-1800.webp 1800w" sizes="(max-width: 700px) 100vw, 55vw" type="image/webp"><img src="/assets/v3/${name}-1200.webp" alt="${alt}" width="1200" height="800" loading="${eager?'eager':'lazy'}" decoding="async"></picture>`;
  const mark=c=>`<li class="client-mark"><img src="${c.src}" alt="${c.name}" width="180" height="100" loading="lazy" decoding="async"></li>`;
  const logos=clients.map(mark).join('');
  return `<section class="cinema-hero" aria-label="R CORPS introduction">
    <div class="cinema-images" id="hero-scenes">
      <div class="cinema-scene is-active" data-scene-image="0">${teamPicture('portrait','R CORPS security professional standing in a lobby','',true)}</div>
      <div class="cinema-scene" data-scene-image="1" aria-hidden="true">${teamPicture('guard','R CORPS uniformed guard at an entrance')}</div>
      <div class="cinema-scene" data-scene-image="2" aria-hidden="true">${teamPicture('team','Three R CORPS security professionals in a lobby')}</div>
    </div>
    <div class="cinema-shade"></div><div class="cinema-frame" aria-hidden="true"></div>
    <div class="shell cinema-copy"><p class="eyebrow light"><span class="red-dash"></span> R CORPS SECURITY SERVICES / PUNE</p>
      <h1>YOUR WORLD.<br><em>Our watch.</em></h1>
      <p class="cinema-description">For the places you build.<br>The moments you celebrate.<br>The people who matter.</p>
      <div class="cinema-actions">${button('Plan your security','/get-a-quote/')}<a class="cinema-story-link" href="#the-approach"><span class="round-arrow">↓</span> Discover our approach</a></div>
    </div>
    <div class="cinema-bottom shell"><div class="scene-choices" role="group" aria-label="Choose a team photograph">
      <button type="button" data-scene="0" aria-pressed="true" aria-controls="hero-scenes"><span>01</span><span>The presence</span></button>
      <button type="button" data-scene="1" aria-pressed="false" aria-controls="hero-scenes"><span>02</span><span>The guard</span></button>
      <button type="button" data-scene="2" aria-pressed="false" aria-controls="hero-scenes"><span>03</span><span>The team</span></button>
    </div><button type="button" class="motion-control" id="hero-motion" aria-pressed="false">Pause motion <span aria-hidden="true">Ⅱ</span></button></div>
    <p class="sr-only" id="scene-announcement" aria-live="polite">The presence — photograph 1 of 3</p>
  </section>

  <section class="client-section" id="clients" aria-labelledby="client-heading">
    <div class="shell client-heading"><div><p class="eyebrow">SELECTED CLIENTS</p><h2 id="client-heading">Across places. <em>Across possibilities.</em></h2></div><button type="button" class="marquee-control" id="marquee-control" aria-pressed="false">Pause logos <span aria-hidden="true">Ⅱ</span></button></div>
    <div class="client-window"><div class="client-track"><ul class="client-group" aria-label="Clients listed in the R CORPS company profile">${logos}</ul><ul class="client-group" aria-hidden="true">${logos.replaceAll(/alt="[^"]*"/g,'alt=""')}</ul></div></div>
    <div class="shell client-foot"><p>Client references from the R CORPS company profile.</p><details class="all-clients"><summary>View all 15 clients <span aria-hidden="true">+</span></summary><ul class="client-grid">${logos}</ul></details></div>
  </section>

  <section class="editorial-intro shell" id="the-approach"><div><p class="eyebrow">THE THINKING BEHIND THE PRESENCE</p><span class="editorial-index" aria-hidden="true">R / C</span></div><div><h2>Good security lets life<br><em>take centre stage.</em></h2><div class="intro-columns"><p>A busy workplace. An important occasion. An ordinary day at home. Each deserves a security requirement built around the people who use it.</p><p>R CORPS brings a personal approach to professional security. Start with the place, understand the priorities and define the presence it needs.</p></div><a class="text-link" href="/about/">Get to know R CORPS ${arrow}</a></div></section>

  <section class="worlds-section" id="services"><div class="shell"><div class="worlds-heading"><div><p class="eyebrow">01 / SECURITY, SHAPED AROUND YOU</p><h2>Different worlds.<br><em>The same attention.</em></h2></div><p>Choose the setting.<br>We’ll help you shape the requirement.</p></div>
    <div class="world-grid">
      <a class="world-card world-workplace" href="/services/corporate-security/">${teamPicture('guard','R CORPS uniformed security guard at an entrance')}<div class="world-shade"></div><div class="world-card-top"><span>01 / WORKPLACES</span><span class="world-arrow">${arrow}</span></div><div class="world-card-copy"><p>Make room for<br><em>business as usual.</em></p><span>Corporate & commercial security</span></div></a>
      <a class="world-card world-event" href="/services/event-security/">${scene('night','R CORPS security team member at an illuminated event')}<div class="world-shade"></div><div class="world-card-top"><span>02 / OCCASIONS</span><span class="world-arrow">${arrow}</span></div><div class="world-card-copy"><p>Your moment.<br><em>Our attention.</em></p><span>Event security & bouncers</span></div></a>
      <a class="world-card world-personal" href="/services/personal-protection/">${teamPicture('pso','Supplied personal security officer photograph beside a vehicle')}<div class="world-shade"></div><div class="world-card-top"><span>03 / PEOPLE</span><span class="world-arrow">${arrow}</span></div><div class="world-card-copy"><p>Close attention.<br><em>Quiet confidence.</em></p><span>PSOs & personal protection</span></div></a>
    </div><div class="service-directory"><span>EXPLORE EVERY SERVICE</span><div>${services.map(s=>`<a href="/services/${s.slug}/">${s.name} <span aria-hidden="true">↗</span></a>`).join('')}</div></div></div></section>

  ${personnelSection(arrow)}
  ${vehicleSection(button)}
  <section class="people-story shell" id="on-the-ground"><div class="formation-image">${teamPicture('team','Three R CORPS security professionals in a lobby')}<span class="photo-caption">THE PEOPLE BEHIND THE PRESENCE / R CORPS</span><span class="corner-line" aria-hidden="true"></span></div><div class="people-story-copy"><p class="eyebrow">02 / A HUMAN APPROACH</p><h2>A strong presence.<br><em>A considered approach.</em></h2><p class="story-lead">The uniform is the first thing you see.<br>The details are where the work begins.</p><p>Who needs access? Where will people gather? Which hours need cover? Good conversations make those responsibilities clear, before an assignment takes shape.</p><div class="story-principles"><div><span>01</span><p><strong>Understand the environment.</strong><small>The place, its people and its everyday rhythm.</small></p></div><div><span>02</span><p><strong>Define the responsibility.</strong><small>Clear duties, timings and points of contact.</small></p></div><div><span>03</span><p><strong>Keep the conversation open.</strong><small>A named contact and agreed next steps.</small></p></div></div>${button('Tell us what you need','/get-a-quote/','outline')}</div></section>

  <section class="field-journal"><div class="shell"><div class="journal-heading"><div><p class="eyebrow light">03 / THROUGH OUR LENS</p><h2>It starts before<br><em>the first arrival.</em></h2></div><p>Look closer at the preparation,<br>the coordination and the presence.<br><span>Original R CORPS team photography.</span></p></div><div class="journal-grid">
    <figure class="journal-wide">${teamPicture('escort','R CORPS personnel accompanying guests through an indoor arrival area')}<figcaption><span>01 / THE ARRIVAL</span><h3>Make every arrival considered.</h3></figcaption></figure>
    <figure class="journal-portrait">${teamPicture('officer','Client-supplied personal security personnel photograph in a grey uniform')}<figcaption><span>02 / THE CONNECTION</span><h3>Keep people in the picture.</h3></figcaption></figure>
    <figure class="journal-final">${teamPicture('team','Three R CORPS security professionals in a lobby')}<figcaption><span>03 / THE PRESENCE</span><h3>Be part of the plan.</h3></figcaption></figure>
    </div><div class="journal-close"><span>Real people. Real surroundings. R CORPS.</span><a class="text-link" href="/services/event-security/">Explore event security ${arrow}</a></div></div></section>

  <section class="planning-section shell"><div><p class="eyebrow">04 / THE NEXT CHAPTER</p><h2>From a first conversation<br><em>to a clear requirement.</em></h2><p>You don’t need to know every detail.<br>Start with the place and what matters to you.</p>${button('Start your enquiry','/get-a-quote/')}</div><ol class="planning-list"><li><span>01</span><div><h3>Tell us about your world.</h3><p>The location, service, timing and people involved.</p></div></li><li><span>02</span><div><h3>Shape the scope together.</h3><p>Personnel, posts, duties and practical expectations.</p></div></li><li><span>03</span><div><h3>See the commercial picture.</h3><p>A quotation with the service period, rates, applicable taxes and terms.</p></div></li><li><span>04</span><div><h3>Agree the way forward.</h3><p>Confirm the assignment and deployment arrangements.</p></div></li></ol></section>

  ${googleProof()}
  <section class="section shell faq-section"><div><p class="eyebrow">A FEW USEFUL ANSWERS</p><h2>Before<br><em>we begin.</em></h2><p>Clear information for your first conversation.</p></div><div class="faq-list">${faqs.slice(0,5).map((f,i)=>`<details><summary><span class="faq-number">0${i+1}</span><span>${f[0]}</span><i aria-hidden="true">+</i></summary><p>${f[1]}</p></details>`).join('')}</div></section>

  <section class="closing-scene">${picture('hero','R CORPS personnel attending an outdoor event','closing-photo')}<div class="closing-shade"></div><div class="shell closing-content"><p class="eyebrow light">YOUR WORLD IS WORTH A CONVERSATION.</p><h2>Let’s give it<br><em>our attention.</em></h2><p>A workplace. An occasion. A personal requirement.<br>Start with what matters to you.</p>${button('Plan your security','/get-a-quote/')}<span>PUNE, MAHARASHTRA / R CORPS SECURITY SERVICES</span></div></section>`;
}
