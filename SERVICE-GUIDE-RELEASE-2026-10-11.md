# Detailed service guide release

The public catalogue now explains ten service paths:

1. Corporate security
2. Event security and bouncers
3. Residential security
4. PSO and personal protection
5. Industrial security
6. Campus and healthcare security
7. Armed security
8. Personal escorts
9. Escort vehicle
10. Facility attendants and housekeeping

The tenth category comes from the supplied R CORPS quotation RCS/00277/2026-27, which explicitly names facility attendants and housekeeping/support manpower. No private quotation amounts, identity numbers, bank details or signatures are published. Other industry services are not presumed available.

Each page explains suitable settings, scope questions, four responsibilities, an illustrative buying scenario, quotation details, FAQs and a service-specific WhatsApp enquiry. Scenarios are explanations, not claims about completed client deployments. Personnel images are supplied R CORPS originals already curated in the website assets; the escort vehicle remains a labelled illustrative concept. No new generated personnel or client-site photographs were used.

Local verification in connected Edge:

- All ten detail pages at 390px: no horizontal overflow; four scope blocks, two FAQs and correct WhatsApp recipient.
- Overview at 1440px: ten cards with original photography and the facility-support category.
- Facility-support enquiry at 360px: correct preselection, required steps, review and WhatsApp draft generation; no message sent.
- Build: 17 HTML documents, 904 local references, zero broken references, indexing/canonical checks passed.
- A stylesheet version query avoids older cached styling after deployment.

General role research: [NCERT/PSSCIVE Unarmed Security Guard](https://www.psscive.ac.in/storage/uploads/textbooks/pdf/english/security-guard-english-class-9.pdf) and [Personal Security Officer](https://www.psscive.ac.in/storage/uploads/textbooks/pdf/english/personal-security-officer-english-class-11.pdf). They inform the plain-language distinction between guarding, PSO and escort responsibilities; R CORPS availability is confirmed per assignment.

Production release: `d9d79a6`, followed by numbering correction `2b97876`, is live on https://rcorpssecurity.com/services/. The custom-domain guide and facility-support detail return HTTP 200. The deployed guide lists all ten categories with the last card numbered 10.

Connected Edge verification of the deployed facility-support page and enquiry flow at 390px completed on 11 October. The service is preselected, contact/review steps work, acknowledgement is required, and the generated link targets `919112171015` with the service, location and contact brief. No message was opened in WhatsApp or sent. Screenshots are in `qa-output/facility-live-mobile-2026-10-11.jpg` and `qa-output/whatsapp-live-mobile-2026-10-11.jpg`.

The browser's automated pointer initially did not scroll a distant form button into view. Keyboard activation completed the actual form flow; this was not a reproduced application validation failure. Real-phone WhatsApp send/receipt remains a delivery UAT item. A generated WhatsApp draft is not evidence that a visitor sent it or that Ashish received it.
