# Autoserwis Dobczyce — original site map

Source: https://www.mechanikdobczyce.pl/ (WordPress). `sitemap.xml` /
`wp-sitemap.xml` are both empty and the rendered `<nav>` is empty (broken
menu), so the real page list only surfaced via the WP REST API
(`/wp-json/wp/v2/pages`):

- [x] **Homepage** (`/`) — logo, hero photo (mechanic with wheel wrench +
      "100% satysfakcji" badge), short trust-copy paragraph (no hidden
      costs, warranty, modern equipment, genuine parts), 4 animated stat
      counters (years experience / happy clients / days per week / "0 PLN
      hidden costs" — render as "+0" in raw HTML, filled by a counter
      script), address + embedded Google Map.
- [x] **Usługi** (`/uslugi/`) — built as `uslugi.html`. Full real services
      list plus ozonowanie/myjnia recovered from `/mechanik-dobczyce/`.
- [x] **Mechanik Dobczyce** (`/mechanik-dobczyce/`) — checked: ~95%
      word-for-word duplicate of `/uslugi/` and the homepage trust copy.
      Not rebuilt as its own page (a near-identical duplicate URL isn't a
      real distinct page, and would just confuse navigation) — but it
      contains two real services mentioned nowhere else on the site:
      **ozonowanie samochodu** (car ozone treatment) and **ręczna myjnia
      samochodowa** (hand car wash). Both folded into the new Usługi page
      instead of being lost.
- [x] **Klimatyzacja Dobczyce** (`/klimatyzacja/`) — built as `klimatyzacja.html`.
- [x] **Ustawienie zbieżności** (`/ustawienie-zbieznosci/`) — built as
      `geometria-kol.html`.
- [x] **Kontakt** (`/kontakt/`) — built as `kontakt.html` (source page was
      blank/broken; real contact info recovered from the site's own
      `/ustawienie-zbieznosci/` page and confirmed via Facebook).

## Functionality inventory

- [x] Embedded Google Map (address: ulica Mostowa 17, Dobczyce)
- [x] WordPress default search form (2 instances) — low value, not
      carried over as a "feature" (a one-page site doesn't need on-site
      search); dropped, not flagged as missing functionality.
- [x] **Phone number: 505 100 838** — missing from the homepage/kontakt page,
      but actually printed on the `/ustawienie-zbieznosci/` subpage
      ("TELEFON: 505 100 838"), and independently confirmed on the
      business's own Facebook page (facebook.com/autoserwisdobczyce, whose
      "Website" field links directly to mechanikdobczyce.pl). Facebook also
      gives hours: "Czynne całą dobę" (open 24/7). Web-search aggregators
      (Targeo etc.) list *other* phone numbers for the same street address,
      but those belong to different businesses at Mostowa 17 (e.g. "Serwis
      Zbieżności") — not used, to avoid sending customers to a competitor.
- [x] Landmark detail from `/klimatyzacja/`: workshop is "koło sklepu
      Biedronka" (next to the Biedronka store) — useful, real, kept.
- [x] Wheel alignment equipment brand named on-site: Beissbarth — kept as
      a real, specific trust detail rather than generic "modern equipment."
- [ ] No email address found anywhere (site or Facebook) — left as a
      placeholder, not invented.
- [x] Real services list recovered from `/uslugi/` — used verbatim on the
      new site instead of inventing generic mechanic-shop copy.

## Content notes

- Stat counters render "+0" in raw HTML — the real numbers are filled in
  client-side by a counter-animation script once triggered; the actual
  values weren't visible in a static fetch. Need real numbers from the
  client (years in business, client count) rather than inventing them —
  flagged, not assumed.
- Logo (`assets/images/logo-transparent.png`) is the exact image used in
  the old site's own header (`cropped-autoserwis_dobczyce_logo_new.png`) —
  already a clean vector-style mark with real alpha transparency and crisp
  edges, no AI cleanup needed, used as-is per the skill's "only enhance
  what needs it" rule. (An earlier pass mistakenly substituted a different,
  fuller logo variant found elsewhere on the site instead of the actual
  header logo — corrected per user feedback; the header asset is always
  the source, never swapped for a different-looking variant.)
- Hero photo (mechanic + wrench) is real, usable, enhanced via `codex
  exec -i` (`/hdreal /proshot input_fidelity silent`).

## Build order

1. Homepage (this iteration) — built with placeholder contact info
   clearly marked for the client to fill in, since none exists on the
   source site.

## Build status

All discovered pages built: homepage, Usługi, Klimatyzacja, Geometria kół,
Kontakt. Logo used exactly as found in the old header (no AI processing
needed — already clean vector PNG with real transparency), placed in the
header only on every page, not repeated in the footer.

## Follow-up: images found on subpages after initial build

The first pass used `curl` + text-regex for the three deeper subpages
instead of the browser tool, which skipped their images entirely — a real
gap, since `/klimatyzacja/`, `/uslugi/`, and `/ustawienie-zbieznosci/` all
had real photos never surfaced in that pass. Corrected:

- [x] `klima-1.jpg` (real photo of the shop's own Waeco A/C service
      machine) — enhanced via `codex exec -i`, used on `klimatyzacja.html`.
- [x] `uslugi-photo.jpg` (real photo, car on the lift in their bay) —
      enhanced via `codex exec -i`, used on `uslugi.html`.
- [x] `zbieznosc-photo.jpg` (real photo, car on their alignment rack,
      watermarked with their logo) — enhanced via `codex exec -i`, used on
      `geometria-kol.html`.
- [x] `klima-2.jpg` — stock photo (driver's hand on a dashboard A/C
      button). Originally left unused as "not representative enough" —
      corrected per user feedback: every real photo from the old site gets
      a slot. Enhanced via `codex exec -i`, now on `klimatyzacja.html`
      alongside `klima-1.jpg` in a two-photo grid.
- [x] `ozonowanie.jpg` — promotional flyer graphic with baked-in text.
      Its real content (benefits, price "49 zł") is on `uslugi.html`'s
      Ozonowanie entry as before. The flyer also contains a real product
      photo (the ozone-generator device in a car) composited into it —
      cropped out (`ozonowanie-device.jpg`), upscaled and enhanced via
      `codex exec -i` (was tiny/soft at 420×460 straight out of the flyer),
      and placed on the Ozonowanie service card on `uslugi.html`.

`SKILL.md` step 1 has been tightened to require using the browser tool
(not a text-only `curl` shortcut) for image/functionality extraction on
every page, specifically to prevent this happening again on future sites.

## Follow-up 4: three more real photos surfaced on `/mechanik-dobczyce/`,
## and the "not representative" exclusions above were wrong

A closer re-check of every page (per user request, "there is much more
pictures there than it's used on my page") found `/mechanik-dobczyce/`
carries three real stock photos never downloaded in the original pass —
missed because that page's content was folded into `uslugi.html` and its
images weren't separately checked:

- [x] `mechanic-hand-fixing.jpg` (wrenches in an open engine bay,
      2560×1709) — enhanced via `codex exec -i`, placed on the "Okresowe
      przeglądy i wymiana" card on `uslugi.html`.
- [x] `mechanic-wrench-hands.jpg` (mechanic holding a wrench beside a
      client's car, 2560×1709) — enhanced via `codex exec -i`, placed on
      the "Mechanika ogólna" card on `uslugi.html`.
- [x] `tire-repair.jpg` (mechanic holding a tire, 2560×1709) — enhanced
      via `codex exec -i`, placed on the "Opony" card on `uslugi.html`.

All other pages (homepage, `uslugi.html`, `ustawienie-zbieznosci`,
`kontakt`) were re-checked image-by-image against the live site and
already have every real photo accounted for. Two duplicate assets found
on the old site are intentionally *not* treated as separate pictures:
`autoserwisdobczyceNEW-*.png` (a fuller wordmark graphic, same brand mark
as the header logo, not a photo) and a second in-body instance of the
header logo on `/klimatyzacja/` — both are the logo, already covered by
the header per the logo-placement rule, not new content.

This is now a standing rule, not a one-off fix: `SKILL.md` step 4 has a
new requirement that every real photo found anywhere on the old site gets
a placed, enhanced slot on the redesign — a photo can no longer be
silently dropped as "generic stock" or "just a flyer graphic," and a
flyer's baked-in real photo must be cropped out and used like any other
source photo.

## Follow-up 2: animated stat counters — real data was there all along

The homepage's 4 stat counters ("+0 LAT", "+0 zadowolonych", "0 DNI", "0 PLN")
render "+0" in the raw/initial HTML because they're Elementor counter
widgets that animate up from 0 on scroll — the real values only exist in
`data-to-value` attributes, not in visible text at load time. The first
pass concluded "no real numbers available" from a static read, which was
wrong — the browser tool was used, but the check stopped at visible text
instead of inspecting the counter's data attributes or waiting for the
animation to resolve. Real values, confirmed directly from the live site's
`[data-to-value]` attributes:

- [x] **15** lat doświadczenia w mechanice (was placeholder "—")
- [x] **199** zadowolonych klientów (was placeholder "—")
- [x] **6** dni w tygodniu pracujemy dla Was (was wrongly shown as "24/7" —
      an assumption from the Facebook "Czynne całą dobę" hours field, which
      isn't actually the same fact as days-per-week; "6 dni w tygodniu" and
      "czynne całą dobę" aren't contradictory — 24h service on 6 of 7 days
      — but I'd conflated them into a wrong single "24/7" stat)
- [x] 0 PLN ukrytych kosztów — this one was already correct

Also found and fixed a real animation bug while verifying this: the
counter code used `gsap.from({val:0}, {val:num, ...})`, which is backwards
— `gsap.from()` animates *from* the given values back to whatever the
target's own value already was, so it was counting down from the target
to 0, not up from 0 to the target. Changed to `gsap.to()`.

## Follow-up 3: counter prefix ("+") was dropped

Even after pulling the real `data-to-value` numbers (15, 199, 6, 0), the
site's actual rendered format for two of them includes a "+" prefix
("+15 LAT", "+199") — confirmed directly from the live DOM
(`.elementor-counter-number-prefix` = "+" on those two, empty on the
other two). Fixed:

- [x] "+15" lat doświadczenia (was bare "15")
- [x] "+199" zadowolonych klientów (was bare "199")
- [x] "6" dni w tygodniu — no prefix on source, correct as-is
- [x] "0 PLN" — no prefix on source, correct as-is

`script.js`'s counter parser only handled a trailing suffix, not a
leading prefix — rewritten to capture `prefix / number / suffix`
separately via one regex (`^(\D*)(\d+)(.*)$`) so the animated count-up
still shows the "+" throughout, not just at the end.

Reference screenshots of the real source site (homepage + all 4
subpages) saved to `original-assets/screenshots/` for future
cross-checking, per user request.
