import type { Lang, Section } from '../lib/site';

type Dict = Record<string, string>;
export const ui: Record<Lang, Dict> = {
  ru: {
    'nav.services': 'Услуги', 'nav.menu': 'Меню', 'nav.close': 'Закрыть', 'nav.allServices': 'Все услуги и цены', 'nav.home': 'Главная',
    'cta.write': 'Написать в Telegram', 'cta.brief': 'Отправить бриф', 'cta.big': 'Есть задача? <em class="serif">Обсудим.</em>',
    'cta.text': 'Опишите, что нужно снять или разработать: количество товаров, где будут использоваться материалы, сроки. Мы ответим со сметой.',
    'contact.tg': 'Telegram', 'contact.tg.s': 'Быстрее всего', 'contact.phone': 'Телефон', 'contact.mail': 'Почта', 'contact.wa': 'WhatsApp', 'contact.wa.s': 'Сообщения и звонки',
    'aside.price': 'Стоимость', 'aside.priceNone': 'Расчёт по брифу', 'aside.p1': 'Съёмка 1–3 рабочих дня', 'aside.p2': 'Студия в Броварах или выезд', 'aside.p3': 'Ретушь и файлы под сайт и печать',
    'work.eyebrow': 'Портфолио', 'work.title': 'Избранные <em class="serif">работы</em>', 'work.lead': 'Food, предметная и fashion-съёмка для брендов, ресторанов и интернет-магазинов.',
    'svc.eyebrow': 'Что мы делаем', 'svc.title': 'Пять направлений — <em class="serif">одна команда</em>', 'svc.lead': 'Фото, дизайн и тексты делаются под одну задачу, поэтому реклама выглядит цельно.',
    'process.eyebrow': 'Процесс', 'process.title': 'От брифа до файлов — <em class="serif">за 1–3 дня</em>',
    'clients': 'Снимали для', 'about.eyebrow': 'О студии', 'scroll': 'Листайте', 'faq.eyebrow': 'Вопросы', 'cases': 'работ', 'menu.contacts': 'Контакты',
    'footer.nav': 'Навигация', 'footer.top': 'Наверх', 'footer.rights': 'Рекламное агентство и фотостудия, Киев',
    'nav.portfolio': 'Портфолио', 'nav.about': 'О нас', 'nav.blog': 'Блог', 'nav.contacts': 'Контакты', 'nav.faq': 'FAQ',
    'cta.order': 'Заказать съёмку', 'cta.write': 'Написать в Telegram', 'cta.call': 'Позвонить',

    'home.portfolio': 'Избранные работы', 'home.services': 'Услуги', 'home.all': 'Всё портфолио',
    'filter.all': 'Все', 'filter.food': 'Еда', 'filter.subject': 'Предметная', 'filter.fashion': 'Одежда', 'filter.interior': 'Интерьер', 'filter.jewelry': 'Украшения',
    'faq.title': 'Частые вопросы', 'related': 'Ещё по теме', 'more': 'Подробнее', 'skip': 'К содержанию',
    'footer.about': 'Креативное рекламное агентство в Киеве: фото- и видеосъёмка, реклама, брендинг, SMM, сайты.',
    'footer.contacts': 'Контакты', 'footer.services': 'Услуги', 'theme': 'Сменить тему', 'lang': 'Язык',
    'untranslated': 'Эта страница пока доступна только на русском.',
  },
  uk: {
    'nav.services': 'Послуги', 'nav.menu': 'Меню', 'nav.close': 'Закрити', 'nav.allServices': 'Усі послуги та ціни', 'nav.home': 'Головна',
    'cta.write': 'Написати в Telegram', 'cta.brief': 'Надіслати бриф', 'cta.big': 'Є завдання? <em class="serif">Обговоримо.</em>',
    'cta.text': 'Опишіть, що потрібно зняти чи розробити: кількість товарів, де використовуватимуть матеріали, терміни. Ми відповімо з кошторисом.',
    'contact.tg': 'Telegram', 'contact.tg.s': 'Найшвидше', 'contact.phone': 'Телефон', 'contact.mail': 'Пошта', 'contact.wa': 'WhatsApp', 'contact.wa.s': 'Повідомлення та дзвінки',
    'aside.price': 'Вартість', 'aside.priceNone': 'Розрахунок за брифом', 'aside.p1': 'Зйомка 1–3 робочі дні', 'aside.p2': 'Студія в Броварах або виїзд', 'aside.p3': 'Ретуш і файли для сайту та друку',
    'work.eyebrow': 'Портфоліо', 'work.title': 'Обрані <em class="serif">роботи</em>', 'work.lead': 'Food, предметна та fashion-зйомка для брендів, ресторанів та інтернет-магазинів.',
    'svc.eyebrow': 'Що ми робимо', 'svc.title': 'П’ять напрямів — <em class="serif">одна команда</em>', 'svc.lead': 'Фото, дизайн і тексти створюються під одне завдання, тому реклама виглядає цілісно.',
    'process.eyebrow': 'Процес', 'process.title': 'Від брифу до файлів — <em class="serif">за 1–3 дні</em>',
    'clients': 'Знімали для', 'about.eyebrow': 'Про студію', 'scroll': 'Гортайте', 'faq.eyebrow': 'Запитання', 'cases': 'робіт', 'menu.contacts': 'Контакти',
    'footer.nav': 'Навігація', 'footer.top': 'Нагору', 'footer.rights': 'Рекламна агенція та фотостудія, Київ',
    'nav.portfolio': 'Портфоліо', 'nav.about': 'Про нас', 'nav.blog': 'Блог', 'nav.contacts': 'Контакти', 'nav.faq': 'FAQ',
    'cta.order': 'Замовити зйомку', 'cta.write': 'Написати в Telegram', 'cta.call': 'Зателефонувати',

    'home.portfolio': 'Обрані роботи', 'home.services': 'Послуги', 'home.all': 'Усе портфоліо',
    'filter.all': 'Усі', 'filter.food': 'Їжа', 'filter.subject': 'Предметна', 'filter.fashion': 'Одяг', 'filter.interior': 'Інтер’єр', 'filter.jewelry': 'Прикраси',
    'faq.title': 'Часті запитання', 'related': 'Ще за темою', 'more': 'Докладніше', 'skip': 'До змісту',
    'footer.about': 'Креативна рекламна агенція в Києві: фото- та відеозйомка, реклама, брендинг, SMM, сайти.',
    'footer.contacts': 'Контакти', 'footer.services': 'Послуги', 'theme': 'Змінити тему', 'lang': 'Мова',
    'untranslated': 'Ця сторінка поки доступна лише російською.',
  },
  en: {
    'nav.services': 'Services', 'nav.menu': 'Menu', 'nav.close': 'Close', 'nav.allServices': 'All services & prices', 'nav.home': 'Home',
    'cta.write': 'Message on Telegram', 'cta.brief': 'Send a brief', 'cta.big': 'Got a project? <em class="serif">Let’s talk.</em>',
    'cta.text': 'Tell us what needs shooting or building: number of items, where the material will be used, deadlines. We’ll reply with a quote.',
    'contact.tg': 'Telegram', 'contact.tg.s': 'Fastest reply', 'contact.phone': 'Phone', 'contact.mail': 'Email', 'contact.wa': 'WhatsApp', 'contact.wa.s': 'Messages & calls',
    'aside.price': 'Price', 'aside.priceNone': 'Quoted from your brief', 'aside.p1': 'Shoot in 1–3 working days', 'aside.p2': 'Brovary studio or on location', 'aside.p3': 'Retouching, files for web & print',
    'work.eyebrow': 'Portfolio', 'work.title': 'Selected <em class="serif">work</em>', 'work.lead': 'Food, product and fashion photography for brands, restaurants and online stores.',
    'svc.eyebrow': 'What we do', 'svc.title': 'Five disciplines, <em class="serif">one team</em>', 'svc.lead': 'Photos, design and copy are made for one goal, so the advertising feels whole.',
    'process.eyebrow': 'Process', 'process.title': 'From brief to files <em class="serif">in 1–3 days</em>',
    'clients': 'Shot for', 'about.eyebrow': 'About the studio', 'scroll': 'Scroll', 'faq.eyebrow': 'Questions', 'cases': 'works', 'menu.contacts': 'Contacts',
    'footer.nav': 'Navigate', 'footer.top': 'Back to top', 'footer.rights': 'Advertising agency & photo studio, Kyiv',
    'nav.portfolio': 'Portfolio', 'nav.about': 'About', 'nav.blog': 'Blog', 'nav.contacts': 'Contacts', 'nav.faq': 'FAQ',
    'cta.order': 'Book a shoot', 'cta.write': 'Message on Telegram', 'cta.call': 'Call us',

    'home.portfolio': 'Selected work', 'home.services': 'Services', 'home.all': 'Full portfolio',
    'filter.all': 'All', 'filter.food': 'Food', 'filter.subject': 'Product', 'filter.fashion': 'Fashion', 'filter.interior': 'Interior', 'filter.jewelry': 'Jewelry',
    'faq.title': 'FAQ', 'related': 'Related', 'more': 'Details', 'skip': 'Skip to content',
    'footer.about': 'Creative advertising agency in Kyiv: photo and video, advertising, branding, SMM, websites.',
    'footer.contacts': 'Contacts', 'footer.services': 'Services', 'theme': 'Toggle theme', 'lang': 'Language',
    'untranslated': 'This page is currently available in Russian only.',
  },
};
export const t = (lang: Lang, k: string) => ui[lang][k] ?? ui.ru[k] ?? k;

export const sectionMeta: Record<Lang, Record<Section, { name: string; short: string }>> = {
  ru: {
    foto: { name: 'Фотосъёмка', short: 'Предметная, food, одежда, интерьер, украшения' },
    reklama: { name: 'Реклама', short: 'Наружная, транспорт, кампании, видео' },
    branding: { name: 'Брендинг и дизайн', short: 'Логотипы, фирменный стиль, упаковка, полиграфия' },
    smm: { name: 'SMM и маркетинг', short: 'Соцсети, контекст, PR' },
    web: { name: 'Сайты и SEO', short: 'Разработка, продвижение, оптимизация' },
  },
  uk: {
    foto: { name: 'Фотозйомка', short: 'Предметна, food, одяг, інтер’єр, прикраси' },
    reklama: { name: 'Реклама', short: 'Зовнішня, транспорт, кампанії, відео' },
    branding: { name: 'Брендинг і дизайн', short: 'Логотипи, фірмовий стиль, упаковка, поліграфія' },
    smm: { name: 'SMM і маркетинг', short: 'Соцмережі, контекст, PR' },
    web: { name: 'Сайти та SEO', short: 'Розробка, просування, оптимізація' },
  },
  en: {
    foto: { name: 'Photography', short: 'Product, food, fashion, interior, jewelry' },
    reklama: { name: 'Advertising', short: 'Outdoor, transit, campaigns, video' },
    branding: { name: 'Branding & Design', short: 'Logos, identity, packaging, print' },
    smm: { name: 'SMM & Marketing', short: 'Social media, paid search, PR' },
    web: { name: 'Web & SEO', short: 'Development, promotion, optimization' },
  },
};
