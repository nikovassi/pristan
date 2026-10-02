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

/** Публичният линк към профила в Cal.com (напр. https://cal.com/pristan).
 *  НЕ е линкът към админ панела (app.cal.com/event-types). */
export const BOOKING_URL = 'https://cal.com/nikolay-vasilev-k7xcw8'

/** Доставчик на онлайн записването — показва се в текстовете за поверителност. */
export const BOOKING_PROVIDER = {
  name: 'Cal.com',
  /** app.cal.com = САЩ (EU-US Data Privacy Framework + SCC); cal.eu = ЕС. */
  dataLocation: 'САЩ, при гаранции по EU-US Data Privacy Framework и стандартни договорни клаузи',
  privacyUrl: 'https://cal.com/privacy',
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

  /** Професионална информация. */
  psychologist: {
    name: 'Николай Василев',
    title: 'Консултативен психолог',
    /** Портрет в /public. null = неутрален placeholder. */
    photo: '/images/nikolay-vasilev.webp' as string | null,
    photoAlt: 'Николай Василев — консултативен психолог',
    city: 'Стара Загора',
    education: [
      'Магистър по консултативна психология — ПУ „Паисий Хилендарски“, Пловдив',
      'Бакалавър по специална педагогика — Тракийски университет, Стара Загора',
    ],
    certificates: [
      'Разрешаване на конфликти и емоционална интелигентност',
      'Ефективна комуникация и трудни разговори',
      'Критическо мислене и вземане на решения',
      'Психология на мотивацията',
    ],
    experience: '5 години като мениджър „Човешки ресурси“ — ежедневна работа с хора, екипи и конфликти',
    approach: 'Ориентиран към човека и към решенията — внимателно изслушване, ясни цели и малки, реалистични стъпки',
    interests: [
      'Междуличностни конфликти и комуникация във взаимоотношенията',
      'Юношество и предизвикателно поведение — подкрепа за тийнейджъри и родители',
      'Кариерно ориентиране и професионално развитие',
      'Мотивация и личностно развитие',
    ],
    languages: ['български'],
  },

  /** Снимка на първия екран (в арката до заглавието). */
  heroImage: {
    src: '/images/kabinet.webp',
    srcSmall: '/images/kabinet-sm.webp',
    alt: 'Светла стая за разговор: два фотьойла, масичка с чаша чай и изглед към залеза',
  },

  contact: {
    phone: '0888 884 001',
    /** Телефон във формат за tel: линкове, без интервали. */
    phoneHref: '+359888884001',
    email: 'pristan.consult@gmail.com',
    /** Точен адрес на мястото за присъствени срещи. Оставете празно, за да не се публикува —
     *  тогава сайтът показва само града, а адресът се изпраща от Cal.com след записване. */
    address: '',
    city: 'Стара Загора',
    postalCode: '',
    addressNote: 'Точният адрес получаваш в имейла за потвърждение на часа.',
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
   * bookingUrl: директен линк към съответния тип среща в Cal.com (напр. https://cal.com/pristan/parva).
   *   Ако е празен, се използва BOOKING_URL.
   */
  currency: '€',
  services: [
    {
      id: 'parva',
      name: 'Първоначална консултация',
      duration: 60,
      price: 30,
      format: 'Присъствено или онлайн',
      description:
        'Първа среща, в която се запознаваме, говорим за това, което те води, и преценяваме заедно дали и как да продължим.',
      bookingUrl: 'https://cal.com/nikolay-vasilev-k7xcw8/konsultaciya',
      featured: true,
    },
    {
      id: 'individualna',
      name: 'Присъствена консултация',
      duration: 60,
      price: 30,
      format: 'Присъствено',
      description: 'Среща на живо в Стара Загора — в рамките на вече започнат процес на работа.',
      bookingUrl: 'https://cal.com/nikolay-vasilev-k7xcw8/konsultaciya',
      featured: false,
    },
    {
      id: 'online',
      name: 'Онлайн консултация',
      duration: 60,
      price: 30,
      format: 'Видеовръзка',
      description: 'Същата работа, от място, на което се чувстваш удобно. Нужни са само стабилна връзка и тихо пространство.',
      bookingUrl: 'https://cal.com/nikolay-vasilev-k7xcw8/konsultaciya',
      featured: false,
    },
  ],

  payment: {
    methods: ['в брой при присъствена среща', 'банков превод'],
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
