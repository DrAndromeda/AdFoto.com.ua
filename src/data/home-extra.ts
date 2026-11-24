import type { Lang } from '../lib/site';
type X = { about: string; kicker: string; h1: string; stats: [string, string][]; process: [string, string][]; clients: string[] };
const clients = ['Premier Food', 'Наш Молочник', 'Molendam', 'Almondo', 'Varenykyfashion', 'Lascalla', 'Eat It', 'Кришталево-чиста', 'Voleeyu', 'WeAnnaBe', 'EatFirst'];
export const homeX: Record<Lang, X> = {
  ru: {
    about: 'Агентство, которое выросло из <em class="serif">рекламной съёмки</em>',
    kicker: 'Рекламное агентство и фотостудия · Киев',
    h1: 'Снимаем так, чтобы <em class="serif">покупали</em>',
    stats: [['1–3', 'рабочих дня на съёмку'], ['от 2000 ₴', 'каталожная и fashion-съёмка'], ['5', 'направлений в одной команде'], ['9–20', 'на связи ежедневно']],
    process: [
      ['Бриф', 'Пишете, что снять, сколько позиций и где будут фото. Готовим смету и план съёмки.'],
      ['Съёмка', 'В нашей студии в Броварах или у вас: магазин, офис, склад, ресторан.'],
      ['Ретушь', 'Чистим фон, выравниваем цвет и детали, собираем серию в одном стиле.'],
      ['Файлы', 'Отдаём готовые снимки в размерах для сайта, маркетплейса, каталога и печати.'],
    ],
    clients,
  },
  uk: {
    about: 'Агенція, що виросла з <em class="serif">рекламної зйомки</em>',
    kicker: 'Рекламна агенція та фотостудія · Київ',
    h1: 'Знімаємо так, щоб <em class="serif">купували</em>',
    stats: [['1–3', 'робочі дні на зйомку'], ['від 2000 ₴', 'каталожна та fashion-зйомка'], ['5', 'напрямів в одній команді'], ['9–20', 'на зв’язку щодня']],
    process: [
      ['Бриф', 'Пишете, що зняти, скільки позицій і де будуть фото. Готуємо кошторис і план зйомки.'],
      ['Зйомка', 'У нашій студії в Броварах або у вас: магазин, офіс, склад, ресторан.'],
      ['Ретуш', 'Чистимо фон, вирівнюємо колір і деталі, збираємо серію в одному стилі.'],
      ['Файли', 'Віддаємо готові знімки в розмірах для сайту, маркетплейсу, каталогу й друку.'],
    ],
    clients,
  },
  en: {
    about: 'An agency that grew out of <em class="serif">commercial photography</em>',
    kicker: 'Advertising agency & photo studio · Kyiv',
    h1: 'Photography made <em class="serif">to sell</em>',
    stats: [['1–3', 'working days per shoot'], ['from ₴2,000', 'catalog & fashion shoots'], ['5', 'disciplines, one team'], ['9–20', 'reachable every day']],
    process: [
      ['Brief', 'Tell us what to shoot, how many items and where the photos will live. We send a quote and a shot plan.'],
      ['Shoot', 'In our Brovary studio or on your premises: shop, office, warehouse, restaurant.'],
      ['Retouch', 'Clean backgrounds, consistent color and detail, one coherent series.'],
      ['Delivery', 'Final files sized for your website, marketplace, catalog and print.'],
    ],
    clients: ['Premier Food', 'Nash Molochnik', 'Molendam', 'Almondo', 'Varenykyfashion', 'Lascalla', 'Eat It', 'Krishtaleva-chysta', 'Voleeyu', 'WeAnnaBe', 'EatFirst'],
  },
};
