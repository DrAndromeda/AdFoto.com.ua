// Inline SVG icons (stroke-based, currentColor). 24x24 viewBox.
const s = (d: string, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${d}</svg>`;
export const icon = {
  arrow: s('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  arrowUpRight: s('<path d="M7 17 17 7M8 7h9v9"/>'),
  chevron: s('<path d="m6 9 6 6 6-6"/>'),
  chevronRight: s('<path d="m9 6 6 6-6 6"/>'),
  menu: s('<path d="M4 8h16M4 16h16"/>'),
  close: s('<path d="M6 6l12 12M18 6 6 18"/>'),
  sun: s('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', ' class="sun"'),
  moon: s('<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"/>', ' class="moon"'),
  phone: s('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'),
  mail: s('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  pin: s('<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>'),
  clock: s('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  check: s('<path d="m5 12 4.5 4.5L19 7"/>'),
  telegram: s('<path d="M21 4 3 11l6 2 2 6 3-4 5 4 2-15Z"/><path d="m9 13 9-6"/>'),
  whatsapp: s('<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.3L4 20Z"/><path d="M9 9.5c.3 1.6 1.9 3.6 4 4.3l1.2-1 1.8.8-.4 1.4c-3.5.3-7-3.2-7-6.4L10 8l.9 1.7-.9.9"/>'),
  instagram: s('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/>'),
  facebook: s('<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z"/>'),
  youtube: s('<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9 5 3-5 3V9Z"/>'),
  linkedin: s('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>'),
  info: s('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.01"/>'),
};
