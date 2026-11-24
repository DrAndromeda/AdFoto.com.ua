import type { Lang, Section } from './site';

export interface Page {
  slug: string; oldPath: string; section: string; sub: string; url: string; lang: Lang;
  title: string; h1: string; description: string; cover: string | null; images: string[]; body: string; price?: string | null;
}

const mods = import.meta.glob('../data/pages/*/*.json', { eager: true, import: 'default' }) as Record<string, Page>;
const all: Page[] = Object.entries(mods).map(([k, v]) => ({ ...v, lang: k.split('/')[3] as Lang }));

export const pagesFor = (lang: Lang) => all.filter((p) => p.lang === lang);
export const getPage = (lang: Lang, slug: string) => all.find((p) => p.lang === lang && p.slug === slug);
export const bySection = (lang: Lang, s: Section) => pagesFor(lang).filter((p) => p.section === s);
export const hasTranslation = (lang: Lang, slug: string) => !!getPage(lang, slug);

/** Portfolio cases: photo pages that carry real photo galleries. */
export const portfolioCases = (lang: Lang) =>
  pagesFor(lang).filter((p) => p.section === 'foto' && p.images.length >= 2 && p.cover);

/** Prefix an internal URL (starting with "/") with the language and site base. */
export const href = (lang: Lang, path: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${lang}${path === '/' ? '/' : path}`;
};
export const asset = (p: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${p}`;

/** Make archived body HTML work under a language prefix and site base; swap <img> for optimized <picture>,
 *  and group runs of 2+ image-only paragraphs into a responsive gallery grid. */
export const renderBody = (lang: Lang, body: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let html = body
    .replace(/<img src="(\/media\/[^"]+)" alt="([^"]*)"[^>]*>/g, (_m, src, alt) => pictureHtml(src, alt))
    .replace(/<iframe /g, '<iframe title="Video" loading="lazy" ')
    .replace(/<a href="(\/[^"]*)">((?:(?!<\/a>).)*)<\/a>/gs, (m, url, inner) => {
      if (stripTags(inner)) return m; // has visible text
      const target = all.find((p) => p.url === url && p.lang === 'ru');
      return target ? `<a href="${url}" aria-label="${esc(target.h1)}">${inner}</a>` : m;
    })
    .replace(/href="\/(?!\/)/g, `href="${base}/${lang}/`);
  const imgP = String.raw`<p>\s*<picture>(?:(?!</picture>).)*</picture>\s*</p>\s*`;
  html = html.replace(new RegExp(`(?:${imgP}){2,}`, 'gs'), (run) => {
    const n = (run.match(/<picture>/g) || []).length;
    return `<div class="gallery${n % 2 ? ' odd' : ''}">${run}</div>`;
  });
  return html;
};
export const stripTags = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

import mediaManifest from '../data/media.json';
type M = { w: number; h: number; widths: number[]; stem: string };
const manifest = mediaManifest as Record<string, M>;
const B = () => import.meta.env.BASE_URL.replace(/\/$/, '');
export const mediaInfo = (src: string) => manifest[src.split('/').pop()!];
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** <picture> markup (AVIF + WebP, responsive widths, explicit dimensions) for an original /media/x.ext path. */
export const pictureHtml = (src: string, alt: string, o: { sizes?: string; eager?: boolean; noLazy?: boolean; cls?: string } = {}) => {
  const m = mediaInfo(src);
  if (!m) {
    if (/\.(gif|svg)$/i.test(src)) return `<img src="${B()}${src}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
    // Fail the build instead of silently dropping the image: run scripts/optimize-images.mjs or fix the reference.
    throw new Error(`pictureHtml: ${src} is not in src/data/media.json`);
  }
  const set = (ext: string) => m.widths.map((w) => `${B()}/media/${m.stem}-${w}.${ext} ${w}w`).join(', ');
  const mid = [...m.widths].reverse().find((w) => w <= 960) ?? m.widths[0];
  const sizes = o.sizes ?? '(min-width: 900px) 800px, 100vw';
  const h = Math.round((m.h / m.w) * m.widths[m.widths.length - 1]);
  return `<picture><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}">` +
    `<img src="${B()}/media/${m.stem}-${mid}.webp" alt="${esc(alt)}" width="${m.widths[m.widths.length - 1]}" height="${h}" ${o.eager ? 'fetchpriority="high"' : o.noLazy ? '' : 'loading="lazy"'} decoding="async"${o.cls ? ` class="${o.cls}"` : ''}></picture>`;
};
/** URL of the largest variant (for lightbox links). */
export const fullUrl = (src: string) => { const m = mediaInfo(src); return m ? `${B()}/media/${m.stem}-${m.widths[m.widths.length - 1]}.webp` : `${B()}${src}`; };

/** Largest photographic (non white-background) image of a page, falling back to the largest image. */
export const bestImage = (p: Page, opts: { photo?: boolean; minW?: number } = {}) => {
  const list = p.images.map((src) => ({ src, m: mediaInfo(src) })).filter((x) => x.m && x.m.w >= (opts.minW ?? 0));
  const photos = list.filter((x) => !(x.m as any).white);
  const pool = opts.photo ? photos : (photos.length ? photos : list);
  return pool.sort((a, b) => b.m!.w - a.m!.w)[0]?.src;
};
export const isWhite = (src: string) => !!(mediaInfo(src) as any)?.white;

/** AVIF srcset for <link rel=preload>. */
export const avifSrcset = (src: string) => { const m = mediaInfo(src); return m ? m.widths.map((w) => `${B()}/media/${m.stem}-${w}.avif ${w}w`).join(', ') : ''; };
