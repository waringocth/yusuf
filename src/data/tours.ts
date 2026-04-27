export interface Tour {
  id: number;
  slug: string;
  title: string;
  category: 'umre' | 'hac' | 'yurtici' | 'yurtdisi' | 'balkan' | 'kultur';
  categoryLabel: string;
  duration: string;
  price: string;
  currency: string;
  date: string;
  seats: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  highlights: string[];
  description: string;
}

export const tours: Tour[] = [
  {
    id: 1,
    slug: 'temmuz-umre-ekonomik',
    title: 'Temmuz Ayı Ekonomik Umre Programı',
    category: 'umre',
    categoryLabel: 'Umre',
    duration: '14 Gece / 15 Gün',
    price: '1.850',
    currency: '$',
    date: '5 Temmuz 2026',
    seats: 12,
    rating: 4.9,
    reviewCount: 184,
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=900&auto=format&fit=crop',
    badge: 'Çok Satan',
    highlights: ['Mescid-i Haram\'a Yürüme Mesafesi', '4★ Otel Konaklaması', 'Türk Mutfağı', 'Tecrübeli Rehber'],
    description: 'Mekke ve Medine\'de 4 yıldızlı otellerde konaklamalı, Diyanet onaylı kapsamlı umre programı.',
  },
  {
    id: 2,
    slug: 'temmuz-umre-gumus',
    title: 'Temmuz Ayı Gümüş Umre Paketi',
    category: 'umre',
    categoryLabel: 'Umre',
    duration: '14 Gece / 15 Gün',
    price: '2.350',
    currency: '$',
    date: '5 Temmuz 2026',
    seats: 8,
    rating: 5.0,
    reviewCount: 97,
    image: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=900&auto=format&fit=crop',
    badge: 'Önerilen',
    highlights: ['Harem\'e 200m Mesafe', '4★ Superior Otel', 'Türk Mutfağı', 'Özel Frekans Cihazı'],
    description: 'Premium konfor ve maneviyatı bir arada sunan, Harem\'e yakın konumlarda 4.5 yıldızlı konaklama.',
  },
  {
    id: 3,
    slug: 'temmuz-umre-altin',
    title: 'Temmuz Ayı Altın Umre Paketi',
    category: 'umre',
    categoryLabel: 'Umre',
    duration: '14 Gece / 15 Gün',
    price: '3.200',
    currency: '$',
    date: '5 Temmuz 2026',
    seats: 5,
    rating: 5.0,
    reviewCount: 63,
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=900&auto=format&fit=crop',
    badge: 'VIP',
    highlights: ['5★ Lüks Otel', 'Harem\'e Direkt Geçiş', 'Özel Türk Şefi', 'VIP Transfer'],
    description: 'En prestijli otellerde lüks konaklama ile maneviyatınızı zirveye taşıyacak özel bir umre deneyimi.',
  },
  {
    id: 4,
    slug: 'istanbul-kultur-turu',
    title: 'İstanbul & Trakya Kültür Turu',
    category: 'yurtici',
    categoryLabel: 'Yurtiçi',
    duration: '4 Gece / 5 Gün',
    price: '8.500',
    currency: '₺',
    date: '15 Mayıs 2026',
    seats: 30,
    rating: 4.8,
    reviewCount: 211,
    image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=900&auto=format&fit=crop',
    badge: 'Yeni',
    highlights: ['Ayasofya Ziyareti', 'Topkapı Sarayı', 'Boğaz Turu', '4★ Otel'],
    description: 'Osmanlı\'nın başkentinde tarihi ve kültürel bir yolculuk; Ayasofya\'dan Kapalıçarşı\'ya.',
  },
  {
    id: 5,
    slug: 'balkan-turu-2026',
    title: 'Balkanlar Kültür & Tarih Turu',
    category: 'balkan',
    categoryLabel: 'Balkan',
    duration: '7 Gece / 8 Gün',
    price: '1.090',
    currency: '€',
    date: '10 Haziran 2026',
    seats: 20,
    rating: 4.9,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1555990538-1ac7e1f0f2fb?q=80&w=900&auto=format&fit=crop',
    badge: undefined,
    highlights: ['Saraybosna', 'Mostar', 'Dubrovnik', 'Arnavutluk'],
    description: 'Balkanların zengin İslam mirasını ve doğal güzelliklerini uzman rehberler eşliğinde keşfediyoruz.',
  },
  {
    id: 6,
    slug: 'endulus-ispanya-turu',
    title: 'Endülüs & İspanya Kültür Turu',
    category: 'yurtdisi',
    categoryLabel: 'Yurtdışı',
    duration: '9 Gece / 10 Gün',
    price: '2.490',
    currency: '€',
    date: '22 Ağustos 2026',
    seats: 18,
    rating: 4.9,
    reviewCount: 54,
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=900&auto=format&fit=crop',
    badge: 'Popüler',
    highlights: ['Kurtuba Camii', 'Elhamra Sarayı', 'Sevilla', 'Madrid'],
    description: 'İslam uygarlığının muhteşem izlerini Endülüs\'te takip ediyoruz. Kurtuba, Granada ve Sevilla eksiksiz.',
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
