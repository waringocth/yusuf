import { Shield, Star, Utensils, HeartPulse, Radio, Users, Clock, Award, Plane, CreditCard, BookOpen } from 'lucide-react';
import type { ElementType } from 'react';

export interface Service {
  icon: ElementType;
  title: string;
  description: string;
  color: string;
}

export const services: Service[] = [
  {
    icon: Shield,
    title: 'Diyanet Onaylı Programlar',
    description: 'Tüm hac ve umre programlarımız, Diyanet İşleri Başkanlığı tarafından onaylanmış ve denetlenmektedir.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Star,
    title: 'VIP & Lüks Oteller',
    description: 'Mescid-i Haram\'a yürüme mesafesinde, 4 ve 5 yıldızlı otellerde konfor ile ibadet bir arada.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Utensils,
    title: 'Türk Mutfağı & Taze Yemekler',
    description: 'Damak tadınıza uygun, kendi Türk şeflerimizin hazırladığı, helal sertifikalı taze yemekler.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: HeartPulse,
    title: 'Kapsamlı Sağlık Sigortası',
    description: 'Tüm misafirlerimiz özel seyahat sağlık sigortası ile korunmakta; acil durumlarda anında müdahale.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Radio,
    title: 'Frekans Cihazı ile Rehberlik',
    description: 'Kalabalık mekânlarda bile rehber sesini net duymanız için her gruba profesyonel frekans cihazı.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Users,
    title: 'Her 40 Kişiye Bir Rehber',
    description: 'Tecrübeli, ehil ve dini eğitimli rehberlerimiz her daim yanınızda; maneviyatınızı dolu yaşayın.',
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    icon: Clock,
    title: 'Erken Ödeme Avantajı',
    description: 'Erken kayıt yaptıran misafirlerimize özel indirim ve esnek taksit imkânları sunulmaktadır.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Award,
    title: 'THY Onaylı En İyi Acente',
    description: 'Turkish Airlines tarafından "En Fazla Umreci Taşıyan Özel Acente" ödülüne 5 kez layık görüldük.',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: Plane,
    title: 'Direkt Uçuş Seçenekleri',
    description: 'Aktarmasız, direkt charter ve THY seferleriyle konforlu ve hızlı ulaşım imkânı.',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: CreditCard,
    title: 'Online Ödeme & Taksit',
    description: 'Güvenli online ödeme altyapısı ile dilediğiniz kartla 12 aya varan taksit seçenekleri.',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: BookOpen,
    title: 'Umre Öncesi Eğitim Semineri',
    description: 'Hac ve umre yolculuğu öncesinde uzman hocalarımızla kapsamlı eğitim seminerleri veriyoruz.',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: HeartPulse,
    title: 'Kurumsal & Butik Umre',
    description: 'Şirketiniz veya aileniz için özel organize edilen, küçük gruplu butik ve kurumsal umre paketleri.',
    color: 'bg-pink-50 text-pink-600',
  },
];

export const stats = [
  { value: 33, suffix: '+', label: 'Yıllık Tecrübe' },
  { value: 15000, suffix: '+', label: 'Mutlu Misafir' },
  { value: 4.9, suffix: '/5', label: 'Müşteri Memnuniyeti' },
  { value: 50, suffix: '+', label: 'Uzman Rehber' },
];

export const testimonials = [
  {
    id: 1,
    name: 'Fatma Yılmaz',
    city: 'Ankara',
    rating: 5,
    initials: 'FY',
    date: 'Mart 2026',
    text: 'Kılınç Turizm ile yaptığım umre, hayatımın en manevi deneyimlerinden biri oldu. Organizasyon mükemmeldi; otelden ulaşıma kadar her şey titizlikle planlanmıştı. Rehberlerimizin dini bilgisi ve sabrı sayesinde her ibadeti huzurla yerine getirdik.',
  },
  {
    id: 2,
    name: 'Mehmet Kara',
    city: 'İstanbul',
    rating: 5,
    initials: 'MK',
    date: 'Şubat 2026',
    text: 'Dört defa umreye gittim, en memnun kaldığım firma Kılınç Turizm oldu. Hem donanımlı rehberleri hem de kaliteli hizmetiyle gerçekten fark yaratıyor. Türk mutfağı yemekler ayrıca çok güzeldi, her gün taze ve lezzetli.',
  },
  {
    id: 3,
    name: 'Zeynep Arslan',
    city: 'Konya',
    rating: 5,
    initials: 'ZA',
    date: 'Ocak 2026',
    text: 'İlk umremdi ve bu kadar güzel geçeceğini tahmin etmiyordum. Harem\'e yürüme mesafesindeki otel, sabah namazları, ziyaret programları… Her dakikası bereketliydi. Bir dahaki seferde de kesinlikle Kılınç Turizm\'i tercih edeceğim.',
  },
  {
    id: 4,
    name: 'Ahmet Demir',
    city: 'Bursa',
    rating: 5,
    initials: 'AD',
    date: 'Kasım 2025',
    text: 'Eşim ve çocuklarımla birlikte gittiğimiz Balkan turunda Kılınç Turizm\'in profesyonelliğini bir kez daha gördük. Saraybosna\'dan Mostar\'a kadar her nokta mükemmel planlanmıştı. Rehberimiz tarihi ayrıntıları anlatırken gerçekten büyülendik.',
  },
  {
    id: 5,
    name: 'Ayşe Çelik',
    city: 'İzmir',
    rating: 5,
    initials: 'AÇ',
    date: 'Ekim 2025',
    text: 'Platin umre paketini tercih ettim ve tam anlamıyla karşılığını aldım. 5 yıldızlı otel, kişiye özel hizmet ve dolu dolu bir program. Hocamızın rehberliğiyle maneviyatımızı en üst seviyede yaşadık. Allah razı olsun tüm ekipten.',
  },
  {
    id: 6,
    name: 'İbrahim Şahin',
    city: 'Gaziantep',
    rating: 5,
    initials: 'İŞ',
    date: 'Ağustos 2025',
    text: 'Umre eğitim seminerine katıldıktan sonra gittik; bu hazırlık gerçekten çok değerliydi. Mekke ve Medine\'deki ziyaret noktalarını anlam bilerek gezdik. Kılınç Turizm\'in frekans cihazı sistemi sayesinde kalabalıkta bile rehberimizi net duyduk.',
  },
];
