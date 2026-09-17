# Na Stradomiu — original site map

Source: https://nastradomiu.pl/ (Joomla, template `wt_minima_pro`)

Single-page restaurant site. Only two real URLs exist; everything else is an
in-page anchor/section on the homepage.

- [x] **Homepage** (`/`) — hero/logo, address + phone, Facebook link, 3 info
      blocks (Danie Dnia / Dania na Wynos / Przyjęcia), photo gallery slider
      (26 images), contact form (email + message, reCAPTCHA), embedded Google
      Map, footer with hours-free contact line + PFR funding banner.
- [ ] **Polityka Prywatności** (`/polityka-prywatnosci`) — GDPR privacy
      policy text. Legally required, must be rebuilt (can stay plain/simple,
      no redesign flourish needed beyond matching the new site's type/colors).

No other subpages, no online menu/PDF, no booking system, no blog, no other
socials besides Facebook.

## Functionality inventory (must all work on the redesign)

- [x] Click-to-call phone links (`tel:+48123768000`, `tel:+48539105945`)
- [x] Facebook profile link (opens in new tab) — site explicitly says the
      daily menu is only posted there, not on the website
- [x] Photo gallery / lightbox (26 interior + historical-mural photos)
- [x] Contact form (email + message → sends to restaurant)
- [x] Embedded Google Map (address: ul. Niepodległości 45, 32-400 Myślenice)
- [x] Footer legal link to Polityka Prywatności
- [x] PFR support-program banner image (footer) — likely a funding
      compliance requirement, keep visible
- [ ] **Proposed addition (flag to client, don't assume):** a simple
      "see today's menu on Facebook" button treated as a real CTA instead of
      a passive mention, since that's genuinely how customers get the
      current menu today.
- [x] **Opening hours added** — not stated anywhere in the old site's text,
      but found embedded as an image inside the old logo banner
      (`images/logo2final.webp`): Pon–Pt 10:00–19:00, Sob–Ndz 12:00–18:00.
      Added as real text to the contact section.

## Content notes

- The handwritten menu board photographed in the gallery shows very old
  prices (zupa 5 zł, bigos 6,50 zł) — clearly stale, not to be reproduced as
  current pricing anywhere on the new site. Dish *names* from it are fine to
  reuse as example dishes; prices are not shown, matching the business's own
  practice of only posting current menu/prices on Facebook.
- Business name on registration/legal doc (privacy policy): `"NA STRADOMIU"
  S.C. Anna Muniak, Katarzyna Muniak`, email `biuro@nastradomiu.pl`.
- No food close-up photos exist in the original gallery (all interior/room
  shots) — two dish photos were generated for the homepage per the skill's
  "no source photo for this slot" rule, matching the site's real dishes
  (kotlet schabowy set, rosół/flaczki).
- **Image enhancement approach:** the bundled `gpt-image-bridge` wrapper
  script is text-to-image only (no input-image flag), but `codex exec`
  itself supports true photo editing via `-i/--image <file>`. All 26 real
  interior photos were enhanced with a direct `codex exec -i <photo>` call
  (bypassing the wrapper) — `/hdreal /proshot`, edit mode, same room/objects/
  text preserved, just professionally corrected exposure/white balance/
  sharpness — output in `assets/images/enhanced/`. The two AI-generated dish
  photos (hero, "Danie dnia") were made with gpt-image-2 text generation
  since those had no real source photo to preserve.
- **Logo:** the only real logo asset was a watermark burned into every
  gallery photo (oval "Na Stradomiu — Kuchnia Polska — od 1993r." badge,
  top-left corner) plus a wide non-transparent banner
  (`images/logo2final.webp`). Isolated the oval badge from a clean photo
  instance, cut a transparent PNG, upscaled 6x (Lanczos) and sharpened →
  `assets/images/logo-transparent.png`, now used in the header on both
  pages instead of a text wordmark.

## Build order

1. Homepage (this iteration)
2. Polityka Prywatności page (after user reviews homepage)
