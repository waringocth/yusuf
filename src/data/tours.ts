export interface Tour {
  id: number;
  slug: string;
  title: string;
  category: 'umre' | 'hac' | 'yurtici' | 'yurtdisi' | 'balkan' | 'kultur';
  categoryLabel?: string;
  duration: string;
  price: string;
  currency: string;
  date: string;
  seats: number;
  rating: number;
  reviewCount?: number;
  image: string;
  badge?: string;
  highlights: string[];
  description: string;
  itinerary: { day: number; title: string; description: string }[];
  included: string[];
  excluded: string[];
  hotels: { name: string; location: string; distance: string; rating: number }[];
  importantNotes: string[];
}

const dummyItinerary = [
  { day: 1, title: 'Cidde Varış ve Mekke\'ye Geçiş', description: 'Havalimanında karşılama sonrası özel araçlarla Mekke otelimize geçiş. İhram ve ilk umre ziyareti.' },
  { day: 2, title: 'Mekke Serbest Zaman', description: 'Otelde kahvaltı ve ibadet için serbest zaman. Akşam otelde bilgilendirme toplantısı.' },
  { day: 3, title: 'Mekke Ziyaretleri', description: 'Arafat, Müzdelife, Mina, Sevr ve Nur Dağları dışarıdan ziyaret. Panoramik şehir turu.' },
  { day: 4, title: 'Medine\'ye Geçiş', description: 'Sabah kahvaltısının ardından lüks otobüslerimizle Medine\'ye hareket. Otele yerleşme ve Mescid-i Nebevi\'yi selamlama.' },
  { day: 5, title: 'Medine Ziyaretleri', description: 'Uhud Şehitliği, Quba Mescidi, Kıbleteyn Mescidi ve Hendek Savaşı alanının gezilmesi.' },
  { day: 6, title: 'Dönüş Yolculuğu', description: 'Serbest zamanın ardından havalimanına transfer ve dönüş yolculuğu.' }
];

const dummyHotels = [
  { name: 'Swissôtel Makkah', location: 'Mekke', distance: '100m (Yürüme Mesafesi)', rating: 5 },
  { name: 'Pullman Zamzam', location: 'Medine', distance: '150m (Yürüme Mesafesi)', rating: 5 }
];

const dummyIncluded = ['Gidiş-Dönüş Uçak Biletleri', 'Mekke ve Medine Konaklaması', 'Sabah ve Akşam Açık Büfe Yemek', 'Vize ve Diyanet Kartı İşlemleri', 'Seyahat Sağlık Sigortası', 'Lüks Otobüslerle Transferler'];
const dummyExcluded = ['Kişisel Harcamalar', 'Yurtdışı Çıkış Harcı', 'Öğle Yemekleri', 'Ekstra Bagaj Ücretleri'];
const dummyNotes = ['Pasaportunuzun en az 1 yıl geçerlilik süresi olmalıdır.', 'Uçuş saatinden 3 saat önce havalimanında bulunmanız gerekmektedir.', 'Otel odaları standart 2 veya 3 kişiliktir.', 'Program sıralamasında rehber tarafından değişiklik yapılabilir.'];

export const tours: Tour[] = [
  {
    id: 1,
    slug: 'ekonomik-umre-programi',
    title: 'Ekonomik Umre Programı',
    category: 'umre',
    categoryLabel: 'Umre',
    duration: '14 Gece / 15 Gün',
    price: '1.850',
    currency: '$',
    date: '5 Temmuz 2026',
    seats: 12,
    rating: 4.9,
    reviewCount: 184,
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1200&auto=format&fit=crop',
    badge: 'Çok Satan',
    highlights: ['Mescid-i Haram\'a Yürüme Mesafesi', '4★ Otel Konaklaması', 'Türk Mutfağı', 'Tecrübeli Rehber'],
    description: 'Mekke ve Medine\'de 4 yıldızlı otellerde konaklamalı, Diyanet onaylı kapsamlı umre programı. Huzurlu ve manevi bir iklimde ibadetlerinizi eksiksiz yerine getireceksiniz.',
    itinerary: dummyItinerary,
    included: dummyIncluded,
    excluded: dummyExcluded,
    hotels: [
      { name: 'Elaf Bakkah Hotel', location: 'Mekke', distance: '2.5km (24 Saat Ring Servisi)', rating: 4 },
      { name: 'Elaf Taiba', location: 'Medine', distance: '300m', rating: 4 }
    ],
    importantNotes: dummyNotes,
  },
  {
    id: 2,
    slug: 'gumus-umre-programi',
    title: 'Gümüş Umre Programı',
    category: 'umre',
    categoryLabel: 'Umre',
    duration: '14 Gece / 15 Gün',
    price: '2.350',
    currency: '$',
    date: '5 Temmuz 2026',
    seats: 8,
    rating: 5.0,
    reviewCount: 97,
    image: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=1200&auto=format&fit=crop',
    badge: 'Önerilen',
    highlights: ['Harem\'e 200m Mesafe', '4★ Superior Otel', 'Türk Mutfağı', 'Özel Frekans Cihazı'],
    description: 'Premium konfor ve maneviyatı bir arada sunan, Harem\'e yakın konumlarda 4.5 yıldızlı konaklama. Deneyimli hocalarımız eşliğinde dolu dolu bir umre.',
    itinerary: dummyItinerary,
    included: dummyIncluded,
    excluded: dummyExcluded,
    hotels: [
      { name: 'Millennium Makkah', location: 'Mekke', distance: '200m (Yürüme Mesafesi)', rating: 5 },
      { name: 'Dar Al Hijra', location: 'Medine', distance: '150m (Yürüme Mesafesi)', rating: 4 }
    ],
    importantNotes: dummyNotes,
  },
  {
    id: 3,
    slug: 'altin-umre-programi',
    title: 'Altın Umre Programı',
    category: 'umre',
    categoryLabel: 'Umre',
    duration: '14 Gece / 15 Gün',
    price: '3.200',
    currency: '$',
    date: '5 Temmuz 2026',
    seats: 5,
    rating: 5.0,
    reviewCount: 63,
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop',
    badge: 'VIP',
    highlights: ['5★ Lüks Otel', 'Harem\'e Direkt Geçiş', 'Özel Türk Şefi', 'VIP Transfer'],
    description: 'En prestijli otellerde lüks konaklama ile maneviyatınızı zirveye taşıyacak özel bir umre deneyimi. Üst düzey konfor arayan misafirlerimiz için tasarlandı.',
    itinerary: dummyItinerary,
    included: dummyIncluded,
    excluded: dummyExcluded,
    hotels: dummyHotels,
    importantNotes: dummyNotes,
  },
  {
    id: 4,
    slug: 'standart-hac-programi',
    title: 'Standart Hac Programı',
    category: 'hac',
    categoryLabel: 'Hac',
    duration: '20 Gece / 21 Gün',
    price: '5.500',
    currency: '$',
    date: 'Mayıs 2026',
    seats: 30,
    rating: 4.8,
    reviewCount: 211,
    image: 'https://images.unsplash.com/photo-1565552643983-6655b8109dcb?q=80&w=1200&auto=format&fit=crop',
    badge: 'Popüler',
    highlights: ['Arafat Çadırı', 'Müzdelife Vakfesi', 'Şeytan Taşlama', 'Rehberlik Hizmeti'],
    description: 'Diyanet standartlarında, tecrübeli hocalarımız eşliğinde güvenilir hac programı. Haccın tüm menasiklerini eksiksiz yerine getirme imkanı.',
    itinerary: [
      { day: 1, title: 'İstanbul - Cidde Uçuşu', description: 'Havalimanında toplanma ve ihrama girme niyetinin ardından Cidde\'ye uçuş.' },
      { day: 2, title: 'Mekke\'ye Varış ve İlk Umre', description: 'Otele yerleşme, dinlenme ve hocalarımız eşliğinde Haccın ilk adımı olan Kudüm Tavafı/Umre.' },
      { day: 8, title: 'Terviye Günü (Arafat\'a Geçiş)', description: 'Mina ve ardından Arafat çadırlarına geçiş ve geceleme.' },
      { day: 9, title: 'Arafat ve Müzdelife Vakfesi', description: 'Arafat vakfesi, dualar, gün batımı sonrası Müzdelife\'ye geçiş ve taş toplama.' },
      { day: 10, title: 'Şeytan Taşlama ve Kurban', description: 'Mina\'da Akabe Cemresi\'nin taşlanması, kurban kesimi ve tıraş olup ihramdan çıkma.' },
      { day: 15, title: 'Medine\'ye Hareket', description: 'Mekke Veda Tavafı sonrası lüks otobüslerle Medine\'ye geçiş.' }
    ],
    included: dummyIncluded,
    excluded: dummyExcluded,
    hotels: [
      { name: 'Anjum Hotel', location: 'Mekke', distance: '500m', rating: 4 },
      { name: 'Rawdat Al Aqeeq', location: 'Medine', distance: '250m', rating: 4 }
    ],
    importantNotes: ['Hac kurasında ismi çıkan veya özel vizesi olanlar katılabilir.', 'Aşı kartı zorunludur.', 'Mina ve Arafat çadırları standart Diyanet tipi klimalı çadırlardır.'],
  },
  {
    id: 5,
    slug: 'kisa-donem-hac-programi',
    title: 'Kısa Dönem Hac Programı',
    category: 'hac',
    categoryLabel: 'Hac',
    duration: '14 Gece / 15 Gün',
    price: '6.200',
    currency: '$',
    date: 'Mayıs 2026',
    seats: 20,
    rating: 4.9,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?q=80&w=1200&auto=format&fit=crop',
    badge: 'Yeni',
    highlights: ['Hızlı Transfer', 'Özel Çadır', 'Yakın Mesafe Otel', 'Sağlık Hizmeti'],
    description: 'Zamanı kısıtlı olan hacı adaylarımız için optimize edilmiş, konforlu kısa dönem hac programı. İş adamları ve çalışanlar için ideal.',
    itinerary: dummyItinerary,
    included: dummyIncluded,
    excluded: dummyExcluded,
    hotels: dummyHotels,
    importantNotes: dummyNotes,
  },
  {
    id: 6,
    slug: 'luks-hac-programi',
    title: 'Lüks Hac Programı',
    category: 'hac',
    categoryLabel: 'Hac',
    duration: '25 Gece / 26 Gün',
    price: '8.500',
    currency: '$',
    date: 'Mayıs 2026',
    seats: 10,
    rating: 5.0,
    reviewCount: 54,
    image: 'https://images.unsplash.com/photo-1531055745124-7eb3ff6837ca?q=80&w=1200&auto=format&fit=crop',
    badge: 'VIP',
    highlights: ['5★ Konaklama', 'VIP Arafat Çadırı', 'Özel Araçlar', 'Açık Büfe Yemek'],
    description: 'En üst düzey konfor arayan misafirlerimiz için her detayı düşünülmüş lüks hac deneyimi. Özel araçlarla transfer ve premium hizmetler.',
    itinerary: dummyItinerary,
    included: [...dummyIncluded, 'Özel Rehberlik Hizmeti', 'VIP Arafat ve Mina Çadırı', 'Özel Araçlarla Ara Transferler'],
    excluded: dummyExcluded,
    hotels: [
      { name: 'Raffles Makkah Palace', location: 'Mekke', distance: '0m (Harem İçi)', rating: 5 },
      { name: 'The Oberoi', location: 'Medine', distance: '0m (Harem İçi)', rating: 5 }
    ],
    importantNotes: dummyNotes,
  },
];

export const tourCategories = [
  {
    id: 'umre',
    label: 'Umre Turları',
    count: 8,
    fromPrice: '$1.375\'ten başlayan',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=700&auto=format&fit=crop',
    description: 'Kutsal topraklarda huzurlu bir yolculuk',
  },
  {
    id: 'hac',
    label: 'Hac Programları',
    count: 4,
    fromPrice: 'Fiyat bilgisi için arayın',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=700&auto=format&fit=crop',
    description: '2026 hac kontenjanları için kayıt alıyoruz',
  },
  {
    id: 'yurtici',
    label: 'Yurtiçi Turları',
    count: 12,
    fromPrice: '₺6.500\'den başlayan',
    image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=700&auto=format&fit=crop',
    description: 'Anadolu\'nun eşsiz güzelliklerini keşfedin',
  },
  {
    id: 'yurtdisi',
    label: 'Yurtdışı Turları',
    count: 22,
    fromPrice: '$1.200\'den başlayan',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=700&auto=format&fit=crop',
    description: '26 ülkede profesyonel rehberlik hizmeti',
  },
  {
    id: 'balkan',
    label: 'Balkan Turları',
    count: 6,
    fromPrice: '€1.090\'dan başlayan',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=700&auto=format&fit=crop',
    description: 'İslam mirasının izlerinde Balkanlar',
  },
  {
    id: 'kultur',
    label: 'Kültür Turları',
    count: 15,
    fromPrice: '₺4.990\'dan başlayan',
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=700&auto=format&fit=crop',
    description: 'Tarihi ve kültürel değerleri birlikte keşfedelim',
  },
];
