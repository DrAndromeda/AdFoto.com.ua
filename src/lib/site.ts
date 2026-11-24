// Business facts extracted from the archived pages (footer of adfoto.com.ua, 2021-2024).
export const SITE = {
  name: 'AdFoto',
  domain: 'adfoto.com.ua',
  phones: ['+380683534400', '+380633573570'],
  phonesDisplay: ['+38 068 353-44-00', '+38 063 357-357-0'],
  email: 'podely@adfoto.com.ua',
  address: { street: 'ул. Константиновская, 1/2, офис 48', city: 'Киев', country: 'UA' },
  geo: null as null | { lat: number; lng: number }, // TODO: confirm coordinates
  hours: 'Mo-Su 09:00-20:00', // from archived contacts page; meetings outside hours by arrangement
  social: {
    telegram: 'https://t.me/adfoto',
    facebook: 'https://www.facebook.com/AdFoto.com.ua',
    instagram: 'https://www.instagram.com/adfoto.com.ua/',
    youtube: 'https://www.youtube.com/channel/UCjAZqMoHfeVEQpQOykNkixA',
    twitter: 'https://twitter.com/AdFoto_',
    pinterest: 'https://www.pinterest.com/adfoto_com_ua/',
    linkedin: 'https://www.linkedin.com/company/adfoto',
  },
  whatsapp: 'https://wa.me/380683534400',
};
export const LANGS = ['ru', 'uk', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const SECTIONS = ['foto', 'reklama', 'branding', 'smm', 'web'] as const;
export type Section = (typeof SECTIONS)[number];
