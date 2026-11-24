import type { Lang } from '../lib/site';
interface Home { title: string; description: string; h1: string; lead: string; sections: { h: string; p: string[] }[] }
export const home: Record<Lang, Home> = {
  ru: {
    title: 'AdFoto — рекламная и предметная съёмка, брендинг, сайты в Киеве',
    description: 'Креативное агентство в Киеве: предметная и food-съёмка, одежда, интерьер, наружная реклама, логотипы и фирменный стиль, SEO и сайты. Съёмка от 2000 грн, срок 1–3 рабочих дня.',
    h1: 'Фото, которые продают. Реклама, которую замечают.',
    lead: 'Снимаем товары, еду, одежду и интерьеры, делаем рекламу, логотипы и сайты. Студия в Броварах, офис в центре Киева, работаем по всей Украине.',
    sections: [
      { h: 'Что мы делаем', p: [
        'AdFoto — небольшое агентство полного цикла: фотографы, видеооператоры, дизайнеры, копирайтеры, маркетолог и SEO-специалист. Название — от Advertising Foto: агентство выросло из рекламной фотосъёмки, и она остаётся основой.',
        'Заказчики приходят с разными задачами: каталог для интернет-магазина, меню ресторана, упаковка, наружная реклама, сайт. Мы ведём проект от идеи до готовых файлов, поэтому фото, дизайн и текст сделаны под одну задачу, а не собраны из разных рук.' ] },
      { h: 'Как проходит съёмка', p: [
        'Начинаем с брифа: количество товаров, вид продукции, где будут использоваться снимки. Предметную съёмку проводим в студии в Броварах, габаритные предметы и дорогие украшения снимаем у вас — в магазине, офисе, на складе или в ресторане. Нужны только чистое место и розетка.',
        'Обычно съёмка занимает от одного до трёх рабочих дней и зависит от числа предметов и сложности света. Срочный заказ возможен за дополнительную плату. После съёмки делаем ретушь и отдаём файлы в нужных размерах для сайта, каталога или печати.' ] },
      { h: 'Цены и работы', p: [
        'Каталожная съёмка и съёмка одежды — от 2000 грн, съёмка еды — от 2500 грн. Итоговая цена зависит от количества кадров и сложности, поэтому для точной сметы пришлите бриф на почту или в Telegram.',
        'В портфолио — съёмки для Premier Food («Наш Молочник», Molendam), дизайнерской одежды Almondo и Varenykyfashion, постельного белья Lascalla, программ питания Eat It, а также реклама для компании «Кришталево-чиста».' ] },
      { h: 'Работаем по всей Украине', p: [
        'Онлайн-заказы принимаем по всей стране, для обсуждения деталей приезжаем на встречу. Мы на связи ежедневно с 9:00 до 20:00, по договорённости встретимся и вне этого времени.' ] },
    ],
  },
  uk: {
    title: 'AdFoto — рекламна та предметна зйомка, брендинг, сайти в Києві',
    description: 'Креативна агенція в Києві: предметна та food-зйомка, одяг, інтер’єр, зовнішня реклама, логотипи й фірмовий стиль, SEO та сайти. Зйомка від 2000 грн, термін 1–3 робочі дні.',
    h1: 'Фото, що продають. Реклама, яку помічають.',
    lead: 'Знімаємо товари, їжу, одяг та інтер’єри, робимо рекламу, логотипи й сайти. Студія в Броварах, офіс у центрі Києва, працюємо по всій Україні.',
    sections: [
      { h: 'Що ми робимо', p: [
        'AdFoto — невелика агенція повного циклу: фотографи, відеооператори, дизайнери, копірайтери, маркетолог і SEO-спеціаліст. Назва — від Advertising Foto: агенція виросла з рекламної фотозйомки, і вона лишається основою.',
        'Замовники приходять із різними завданнями: каталог для інтернет-магазину, меню ресторану, упаковка, зовнішня реклама, сайт. Ми ведемо проєкт від ідеї до готових файлів, тож фото, дизайн і текст створені під одне завдання.' ] },
      { h: 'Як проходить зйомка', p: [
        'Починаємо з брифу: кількість товарів, вид продукції, де використовуватимуть знімки. Предметну зйомку проводимо в студії в Броварах, габаритні речі та коштовні прикраси знімаємо у вас — у магазині, офісі, на складі чи в ресторані. Потрібні лише чисте місце та розетка.',
        'Зазвичай зйомка триває від одного до трьох робочих днів, залежно від кількості предметів і складності світла. Термінове замовлення можливе за додаткову плату. Після зйомки робимо ретуш і віддаємо файли в потрібних розмірах для сайту, каталогу чи друку.' ] },
      { h: 'Ціни та роботи', p: [
        'Каталожна зйомка та зйомка одягу — від 2000 грн, зйомка їжі — від 2500 грн. Остаточна ціна залежить від кількості кадрів і складності, тож для точного кошторису надішліть бриф на пошту або в Telegram.',
        'У портфоліо — зйомки для Premier Food («Наш Молочник», Molendam), дизайнерського одягу Almondo та Varenykyfashion, постільної білизни Lascalla, програм харчування Eat It, а також реклама для компанії «Кришталево-чиста».' ] },
      { h: 'Працюємо по всій Україні', p: [
        'Онлайн-замовлення приймаємо по всій країні, для обговорення деталей приїжджаємо на зустріч. Ми на зв’язку щодня з 9:00 до 20:00, за домовленістю зустрінемось і поза цим часом.' ] },
    ],
  },
  en: {
    title: 'AdFoto — product & advertising photography, branding, websites in Kyiv',
    description: 'Creative agency in Kyiv: product and food photography, fashion, interiors, outdoor advertising, logos and identity, SEO and websites. Shoots from UAH 2,000, 1–3 working days.',
    h1: 'Photos that sell. Advertising people notice.',
    lead: 'We shoot products, food, fashion and interiors, and build advertising, logos and websites. Studio in Brovary, office in central Kyiv, clients across Ukraine.',
    sections: [
      { h: 'What we do', p: [
        'AdFoto is a small full-cycle agency: photographers, videographers, designers, copywriters, a marketer and an SEO specialist. The name stands for Advertising Foto: the agency grew out of commercial photography, and it is still the core of the work.',
        'Clients come with different jobs: an online-store catalog, a restaurant menu, packaging, outdoor advertising, a website. We run the project from idea to final files, so photos, design and copy are made for one purpose rather than stitched together from different vendors.' ] },
      { h: 'How a shoot works', p: [
        'We start with a brief: how many items, what kind of product, where the images will be used. Product shoots happen in our studio in Brovary; oversized items and valuable jewelry are shot on your premises — shop, office, warehouse or restaurant. All we need is a clean space and a power socket.',
        'A shoot usually takes one to three working days, depending on the number of items and the lighting. Rush orders are possible for an extra fee. After the shoot we retouch the images and deliver files sized for web, catalog or print.' ] },
      { h: 'Prices and work', p: [
        'Catalog and apparel shoots start at UAH 2,000; food photography starts at UAH 2,500. The final price depends on the number of frames and complexity, so send a brief by email or Telegram for an exact quote.',
        'Our portfolio includes shoots for Premier Food (Nash Molochnik, Molendam), designer clothing brands Almondo and Varenykyfashion, Lascalla bedding, Eat It meal plans, and advertising for the water company Krishtaleva-chysta.' ] },
      { h: 'Across Ukraine', p: [
        'We take online orders from anywhere in the country and travel to meetings to go over the details. We are reachable daily from 9:00 to 20:00, and can meet outside those hours by arrangement.' ] },
    ],
  },
};
