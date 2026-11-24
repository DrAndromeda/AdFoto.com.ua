# Archive report (step 1)

Source: Web Archive, adfoto.com.ua, best clean snapshot per page. Files live in `archive/` (gitignored, ~179 MB).
Per-page data (title, H1, description, words, images, flags): `docs/content_inventory.json`.

## Numbers
- 126 HTML files (125 content pages + home). Median 711 words; 80 pages have 500+ words; 13 have under 300.
- 662 images referenced, 65 without alt text. 991 assets downloaded.
- 12 pages without `<title>`, 13 without meta description, no `lang` on most pages.
- Snapshots: 2024 (98), 2022 (27), 2025 (14), 2015-2019 (12).
- Spam check: casino paths (/slots, /bezdep, /bonus, /vhid, /registration, /promocode, /dodatok, /uk-lang) excluded;
  8 infected snapshots replaced by older ones. Content scan of all pages found no injected links or hidden text
  (only 2016 Yandex tracking pixels). External links: addtoany share buttons, social profiles.

## Missing (never archived)
- 23 images in `/assets/images/` (service-page illustrations, e.g. retush, kontekstnaya-reklama, marketingovye-issledovaniya)
  and 9 in `/assets/cache/images/`. These pages need replacement images.
- 9 leftover WordPress/script files (not needed).

## Real structure vs spec
The live site used flat `.html` slugs (MODX), not the `/fotosemka/...` tree in IMPROVEMENTS.md.

| Group | Pages | Notes |
|---|---|---|
| photo / food | 18 | cheese, sushi, drinks, bakery, restaurant menus |
| photo / subject | 12 | catalog, e-commerce, furniture, bedding |
| photo / fashion | 11 | designer clothing, shoes, children's, vyshyvanka, fur |
| photo / interior, jewelry | 2 + 1 | |
| ads / outdoor + transport | 17 | billboards, metro, lifts, lightboxes, signs |
| ads / agency + campaigns | 8 | |
| branding + print | 15 | logo, brand identity, packaging, brochures, business cards |
| smm / marketing | 7 | |
| video | 8 | not in the 5 services of the spec |
| web / seo | 6 | |
| blog articles | 7 | |
| meta (home, about, contacts, faq, legal, portfolio hub, blog hub) | 10 | |
| unmapped (need a manual decision) | 4 | aerosemka-v-kieve, bannernaya-reklama, fotosemka-vyshivanok-..., uslugi-vizazhista |

## Proposed URL map (needs approval)
Keep old slugs as the page slugs so old links and search rankings carry over, grouped by service:

    /ru/                          home
    /ru/foto/                     photo service  -> /ru/foto/{slug}/  (food, subject, fashion, interior, jewelry)
    /ru/reklama/                  advertising    -> /ru/reklama/{slug}/
    /ru/branding/                 branding+print
    /ru/smm/                      SMM / marketing
    /ru/web/                      web + SEO
    /ru/video/                    video (6th service, exists on the real site)
    /ru/portfolio/                filterable hub (cases come from the photo pages)
    /ru/blog/{slug}/, /ru/about/, /ru/contacts/, /ru/faq/
    same under /uk/ and /en/

Old URLs `/{slug}.html` get 301 redirects on SherlockHost (via `.htaccess`); on GitHub Pages a meta-refresh fallback.

## Open decisions
1. Add `video` as a 6th service, or merge it into advertising?
2. Keep old slugs in the new URLs (recommended) or rewrite them for better SEO?
3. The 4 unmapped pages: aerosemka -> photo, bannernaya-reklama -> ads/outdoor, vyshyvanki -> photo/fashion, vizazhist -> photo?
4. 13 thin pages (<300 words): rewrite, merge, or drop?
