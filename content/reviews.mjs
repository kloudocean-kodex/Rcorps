// Short, verbatim excerpts from public Google reviews, checked 28 September 2026.
// Keep the wording and attribution intact. This is a curated snapshot, not a live feed.
export const reviews = [
  { name: 'Revati Khedekar', initials: 'RK', quote: 'made all guests feel both safe & respected.', source: 'https://share.google/Xo4K6uWhXhSVLZM3h' },
  { name: 'Akash Wakle', initials: 'AW', quote: 'Excellent bouncer security service.', source: 'https://share.google/7op3tOVSHyWBNdaYW' },
  { name: 'Parth Bhalerao', initials: 'PB', quote: 'Most professional team I’ve ever worked with.', source: 'https://share.google/x3yLPQduhxyToNg1c' }
];

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export function reviewSection(business, arrow) {
  const rating = business.reviewSnapshot;
  return `<section class="review-story" id="reviews" aria-labelledby="review-heading">
    <div class="shell review-layout">
      <div class="review-intro">
        <p class="eyebrow">THEIR EXPERIENCE. THEIR WORDS.</p>
        <h2 id="review-heading">A presence<br><em>people remember.</em></h2>
        <p class="review-description">A few words from the people<br>who have experienced R CORPS.</p>
        <div class="review-rating" role="img" aria-label="Google rating: ${rating.rating} out of 5, based on ${rating.count} reviews">
          <strong aria-hidden="true">${rating.rating}<span>/ 5</span></strong>
          <div aria-hidden="true"><span class="review-stars">★★★★★</span><span>Based on ${rating.count} Google reviews</span></div>
        </div>
        <a class="review-google-link" href="${business.googleProfile}" target="_blank" rel="noopener noreferrer">Read reviews on Google ${arrow}<span class="sr-only"> (opens in a new tab)</span></a>
      </div>
      <div class="review-stage" role="region" aria-roledescription="carousel" aria-label="Selected Google review excerpts">
        <div class="review-stage-top"><span>IN THEIR OWN WORDS</span><span>Google reviews <span aria-hidden="true">↗</span></span></div>
        <div class="review-rail" id="review-rail" role="group" tabindex="0" aria-label="Review excerpts. Swipe or use the arrow buttons to explore.">
          ${reviews.map((review, i) => `<figure class="review-slide" role="group" aria-roledescription="slide" aria-label="${i+1} of ${reviews.length}: ${escape(review.name)}">
            <span class="review-quote-mark" aria-hidden="true">“</span>
            <blockquote><p>“${escape(review.quote)}”</p></blockquote>
            <figcaption><div class="review-person"><span class="review-initials" aria-hidden="true">${review.initials}</span><span><strong>${escape(review.name)}</strong><small>Google review · excerpt</small></span></div><a href="${review.source}" target="_blank" rel="noopener noreferrer" aria-label="Read ${escape(review.name)}’s full review on Google (opens in a new tab)">${arrow}</a></figcaption>
          </figure>`).join('')}
        </div>
        <div class="review-controls" hidden>
          <div class="review-dots" role="group" aria-label="Choose a review">${reviews.map((review,i)=>`<button type="button" data-review="${i}" aria-label="Show review ${i+1} by ${escape(review.name)}" ${i===0?'aria-current="true"':''}><span></span></button>`).join('')}</div>
          <span class="review-position" aria-live="polite" aria-atomic="true">01 / 03</span>
          <div class="review-arrows"><button type="button" data-review-prev aria-label="Previous review" aria-controls="review-rail" disabled>${arrow}</button><button type="button" data-review-next aria-label="Next review" aria-controls="review-rail">${arrow}</button></div>
        </div>
      </div>
      <p class="review-source-note">Selected excerpts from public Google reviews. Rating snapshot: <time datetime="${rating.lastVerified}">${rating.label}</time>. <a href="${business.googleProfile}" target="_blank" rel="noopener noreferrer">See the full picture on Google <span aria-hidden="true">↗</span></a></p>
    </div>
  </section>`;
}
