/**
 * ЦЕНТРАЛНА КОНФИГУРАЦИЯ НА САЙТА
 * ------------------------------------------------------------
 * Всички данни, които трябва да смените, са на едно място.
 * Стойностите в [квадратни скоби] или „REPLACE_…“ са placeholder-и
 * и НЕ са реални професионални данни.
 *
 * Не поставяйте тук пароли, API ключове или клиентски данни —
 * този файл е публичен.
 */

/** Линк към онлайн записването (напр. https://pristan.simplybook.it). */
export const BOOKING_URL = 'REPLACE_WITH_BOOKING_URL'

/** Доставчик на онлайн записването — показва се в текстовете за поверителност. */
export const BOOKING_PROVIDER = {
  name: 'SimplyBook.me',
  dataLocation: 'Европейския съюз',
  privacyUrl: 'https://simplybook.me/en/policy',
}

/** Публичният адрес на сайта — използва се за canonical, sitemap и Open Graph.
 *  При build в GitHub Actions се подава автоматично чрез SITE_URL. */
export const SITE_URL: string =
  (import.meta.env.VITE_SITE_URL as string | undefined) || 'https://example.com'

export const site = {
  brand: {
    name: 'Пристан',
    nameLatin: 'Pristan',
    tagline: 'Спокойно място за разговор',
    descriptor: 'Психологическо консултиране',
  },

  /** Професионална информация — заменете с реалните данни. */
  psychologist: {
    name: 'Име на психолога',
    title: 'Професионална квалификация',
    /** Път до портрет в /public, напр. '/images/portrait.jpg'. null = неутрален placeholder. */
    photo: null as string | null,
    photoAlt: 'Портрет на психолога в кабинета',
    city: 'София',
    education: [
      '[Образователна степен, специалност — Университет, година]',
      '[Допълнителна квалификация — институция, година]',
    ],
    certificates: [
      '[Сертификат или обучение по психотерапевтичен метод]',
      '[Членство в професионална организация]',
    ],
    experience: '[Брой] години практика',
    approach: '[Вашият терапевтичен подход, напр. „интегративен“ или „когнитивно-поведенчески“]',
    interests: [
      '[Професионален интерес 1]',
      '[Професионален интерес 2]',
      '[Професионален интерес 3]',
    ],
    languages: ['български', '[друг език]'],
  },

  contact: {
    phone: '+359 00 000 0000',
    /** Телефон във формат за tel: линкове, без интервали. */
    phoneHref: '+359000000000',
    email: 'hello@example.com',
    address: '[ул. Примерна 1, ет. 2]',
    city: 'София',
    postalCode: '[1000]',
    /** Линк, който отваря адреса в Google Maps (нов прозорец). */
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sofia',
    /** Embed URL за картата. Зарежда се само след съгласие от посетителя. */
    mapsEmbedUrl: 'https://www.google.com/maps?q=Sofia&output=embed',
    hours: [
      { days: 'Понеделник – Петък', time: '10:00 – 19:00' },
      { days: 'Събота', time: 'по договаряне' },
      { days: 'Неделя', time: 'почивен ден' },
    ],
    responseNote: 'Обикновено отговарям в рамките на един работен ден.',
  },

  /** Социални мрежи — оставете празен масив, ако не използвате. */
  social: [] as { label: string; url: string }[],

  /**
   * Цени и видове консултации.
   * price: число или текст. currency се показва след цената.
   * bookingUrl: по избор — директен линк към конкретната услуга в booking системата.
   */
  currency: '€',
  services: [
    {
      id: 'parva',
      name: 'Първоначална консултация',
      duration: 60,
      price: 'XX',
      format: 'Онлайн или в кабинета',
      description:
        'Първа среща, в която се запознаваме, говорим за това, което те води, и преценяваме заедно дали и как да продължим.',
      bookingUrl: '',
      featured: true,
    },
    {
      id: 'individualna',
      name: 'Индивидуална консултация',
      duration: 50,
      price: 'XX',
      format: 'В кабинета',
      description: 'Последваща среща в рамките на започнат процес на работа.',
      bookingUrl: '',
      featured: false,
    },
    {
      id: 'online',
      name: 'Онлайн консултация',
      duration: 50,
      price: 'XX',
      format: 'Видеовръзка',
      description: 'Същата работа, от място, на което се чувстваш удобно. Нужни са само стабилна връзка и тихо пространство.',
      bookingUrl: '',
      featured: false,
    },
  ],

  payment: {
    methods: ['в брой в кабинета', 'банков превод', '[друг метод]'],
    cancellation: 'Отмяна или пренасрочване — до 24 часа преди срещата, без такса.',
  },

  /**
   * Анализ на посещенията — изключен по подразбиране.
   * Ако включите, използвайте решение без бисквитки (напр. Plausible или Umami)
   * и ще се покаже банер за съгласие.
   */
  analytics: {
    enabled: false,
    provider: 'plausible' as 'plausible' | 'umami',
    scriptUrl: '',
    domain: '',
  },

  /** Дата на последна актуализация на правните текстове. */
  legalUpdated: '01.10.2026',
}

export type Service = (typeof site.services)[number]

export const isBookingConfigured = () => /^https?:\/\//.test(BOOKING_URL)

export const serviceBookingUrl = (s?: Service) =>
  (s && s.bookingUrl) || BOOKING_URL

export const formatPrice = (price: string | number) => `${price} ${site.currency}`
