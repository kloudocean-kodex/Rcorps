import { business } from './business.mjs';

const instagramIcon='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';

export const instagramLink=(label='@corps.security')=>`<a class="instagram-link" href="${business.instagram}" target="_blank" rel="noopener noreferrer" aria-label="${label} on Instagram (opens in a new tab)"><span class="instagram-icon">${instagramIcon}</span><span>${label}</span><span class="social-arrow" aria-hidden="true">↗</span></a>`;

export const instagramStory=()=>`<div class="instagram-story" id="instagram"><div><p class="eyebrow light">FOLLOW R CORPS ON INSTAGRAM</p><h3>Closer to the people.<br><em>Behind the presence.</em></h3><p>Explore more from R CORPS, through the team’s own lens.</p></div>${instagramLink()}</div>`;
