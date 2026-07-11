import type {
  AboutContent,
  Brand,
  CategoryInfo,
  ContactInfo,
  HeroContent,
  StatItem,
} from "./types";

/**
 * Static content layer. Shape mirrors the future Supabase tables 1:1 so that
 * swapping these getters for real queries (Phase 2 / CRM) requires no
 * changes in the components that consume them.
 *
 * NOTE: `insaat-hizmetleri` cover and every brand `logo` are still empty —
 * no construction photos or real brand logo files have been supplied yet.
 * Components fall back to a gradient/text treatment until the CRM is used
 * to upload the real assets.
 */

export const categories: CategoryInfo[] = [
  {
    key: "gida",
    title: "Gıda Ürünleri",
    shortDescription:
      "Et ürünleri, tavuk ve şarküteri kalemlerinde güvenilir bayiliklerimizle kesintisiz tedarik.",
    cover: "/images/et-urunleri/et-urunleri-sucuk-ahsap-tabak-01.jpg",
    icon: "Beef",
  },
  {
    key: "icecek",
    title: "İçecek Grubu",
    shortDescription:
      "Doğal maden suyu, soda ve enerji içeceği bayilikleriyle geniş bir ürün yelpazesi.",
    cover: "/images/icecek/icecek-kizilay-soda-cesitleri-01.jpg",
    icon: "GlassWater",
  },
  {
    key: "insaat",
    title: "İnşaat Hizmetleri",
    shortDescription:
      "Konut ve ticari projelerde uçtan uca inşaat ve taahhüt hizmetleri.",
    cover: "",
    icon: "Building2",
  },
];

export const brands: Brand[] = [
  {
    slug: "yakup-aga-et-urunleri",
    name: "Yakup Ağa Et Ürünleri",
    shortName: "Yakup Ağa",
    category: "gida",
    tagline: "Geleneksel lezzet, modern üretim.",
    description:
      "Yakup Ağa Et Ürünleri; sucuk, kokoreç ve şarküteri kalemlerinde yüksek kalite standartlarıyla üretim yapan, DAIL GROUP güvencesiyle bölgemize ulaştırdığımız köklü bir markadır.",
    about:
      "Sucuk ve kokoreç, Anadolu mutfağının en köklü şarküteri lezzetleri arasında yer alır. Kaliteli et ürünlerinde belirleyici unsurlar; etin taze ve hijyenik koşullarda işlenmesi, doğru baharat oranı ve soğuk zincirin kesintisiz sürdürülmesidir. DAIL GROUP olarak bayiliğini yaptığımız Yakup Ağa Et Ürünleri'nde bu standartlara azami önem verilir; ürünler üretimden sofraya kadar soğuk zincir korunarak taşınır ve saklanır.",
    color: "#8a1c1c",
    logo: "",
    cover: "/images/et-urunleri/et-urunleri-sucuk-ahsap-tabak-01.jpg",
    gallery: [
      "/images/et-urunleri/et-urunleri-kokorec-sandvic-01.jpg",
      "/images/et-urunleri/et-urunleri-sucuk-rulo-dilimli-01.jpg",
    ],
    order: 1,
    active: true,
  },
  {
    slug: "a-pilic",
    name: "A Piliç",
    shortName: "A Piliç",
    category: "gida",
    tagline: "Güvenilir kalite, her sofrada.",
    description:
      "A Piliç; hijyenik üretim tesislerinde işlenen taze tavuk ürünlerini, DAIL GROUP'un güçlü lojistik ağıyla bölgemizdeki işletmelere ulaştırıyoruz.",
    about:
      "Tavuk eti; yüksek protein oranı, düşük yağ içeriği ve uygun fiyatı sayesinde hem ev mutfaklarının hem de restoran/otel işletmelerinin vazgeçilmezleri arasındadır. Kaliteli tavuk ürünlerinde dikkat edilmesi gereken en önemli noktalar; kesim ve paketleme aşamalarında hijyen standartlarına uyum, soğuk zincirin korunması ve ürünün tazeliğinin son tüketiciye kadar muhafaza edilmesidir. DAIL GROUP, bu süreçlerin her aşamasında titizlikle çalışır.",
    color: "#e2721c",
    logo: "",
    // NOTE: the only tavuk photos supplied were packaging shots of a
    // different company's products (Şenpiliç, İstanbul) — using them would
    // misrepresent A Piliç. Left empty until a real A Piliç / DAIL GROUP
    // photo is uploaded via the admin panel.
    cover: "",
    gallery: ["/images/tavuk/tavuk-pilic-doner-01.jpg"],
    order: 2,
    active: true,
  },
  {
    slug: "beysu",
    name: "Beysu",
    shortName: "Beysu",
    category: "icecek",
    tagline: "Doğanın saf hali.",
    description:
      "Beysu doğal kaynak suyu, kaynağından şişelenerek gelen doğallığı ile DAIL GROUP bayiliğinde işletmeniz için düzenli ve zamanında teslim edilir.",
    about:
      "Doğal kaynak suyu, yeraltı kaynaklarından çıktığı haliyle, herhangi bir kimyasal arıtma işlemine tabi tutulmadan doğrudan şişelenen su türüdür. Mineral dengesi kaynağın jeolojik yapısına göre şekillenir ve düzenli tüketimi günlük sıvı ihtiyacının doğal yollarla karşılanmasına katkı sağlar. DAIL GROUP olarak dağıtımını yaptığımız Beysu, kaynağından sofranıza kadar hijyenik koşullarda ulaştırılır.",
    color: "#0e5aa7",
    logo: "",
    cover: "/images/icecek/icecek-beysu-dogal-kaynak-suyu-01.jpg",
    gallery: [],
    order: 3,
    active: true,
  },
  {
    slug: "avsar-soda",
    name: "Avşar Soda",
    shortName: "Avşar",
    category: "icecek",
    tagline: "Doğal maden özü.",
    description:
      "Avşar Soda, doğal maden kaynağından gelen ferahlığıyla restoran ve marketlerin vazgeçilmezleri arasında yer alıyor. DAIL GROUP güvencesiyle sofralarınızda.",
    about:
      "Doğal maden sodası, yer altından doğal olarak karbondioksit kazanmış maden sularının şişelenmesiyle elde edilir ve içeriğindeki doğal mineraller sayesinde klasik gazlı içeceklerden ayrışır. Özellikle yemek yanında tüketiminde ferahlatıcı etkisiyle tercih edilir. DAIL GROUP olarak Avşar Soda'yı bölgemizdeki restoran, kafe ve marketlere düzenli tedarik zinciriyle ulaştırıyoruz.",
    color: "#0f7a6b",
    logo: "",
    cover: "/images/icecek/icecek-avsar-soda-siseler-02.jpg",
    gallery: ["/images/icecek/icecek-avsar-soda-buz-01.jpg"],
    order: 4,
    active: true,
  },
  {
    slug: "sultan-uludag-su",
    name: "Sultan Uludağ Su",
    shortName: "Sultan Uludağ",
    category: "icecek",
    tagline: "Uludağ'ın eşsiz kaynağından.",
    description:
      "Sultan Uludağ Su, Uludağ'ın doğal kaynağından gelen eşsiz lezzetiyle DAIL GROUP bayiliğinde geniş bir müşteri ağına ulaştırılmaktadır.",
    about:
      "Uludağ'ın kaynak suları, düşük mineral içeriği ve yüksek saflık oranıyla Türkiye'nin en bilinen doğal kaynak sularından biri olarak kabul edilir. Dağlık bölgelerden beslenen kaynaklar, doğal filtrasyon süreciyle arınmış suyun sofralara ulaşmasını sağlar. DAIL GROUP bayiliğinde Sultan Uludağ Su, kaynağındaki tazeliğini koruyarak bölgemize düzenli olarak dağıtılmaktadır.",
    color: "#1447a3",
    logo: "",
    cover: "/images/icecek/icecek-sultan-prime-su-siseleri-01.jpg",
    gallery: ["/images/icecek/icecek-sultan-soda-afis-01.jpg"],
    order: 5,
    active: true,
  },
  {
    slug: "hotline-energy",
    name: "Hotline Energy",
    shortName: "Hotline",
    category: "icecek",
    tagline: "Enerjinin adresi.",
    description:
      "Hotline Energy enerji içeceği, dinamik yaşam tarzını destekleyen formülüyle DAIL GROUP'un içecek portföyünün güçlü bir parçasıdır.",
    about:
      "Enerji içecekleri; kafein ve çeşitli vitamin bileşenleriyle anlık enerji ve odaklanma ihtiyacı duyulan anlarda tercih edilen içecek grubudur. Yoğun iş temposu, spor aktiviteleri ya da uzun mesai saatlerinde dengeli tüketildiğinde pratik bir destek sağlar. DAIL GROUP olarak Hotline Energy'yi market, kafe ve eğlence mekanlarına düzenli tedarik ile ulaştırıyoruz.",
    color: "#111111",
    logo: "",
    cover: "/images/icecek/icecek-hotline-enerji-icecegi-01.jpg",
    gallery: [],
    order: 6,
    active: true,
  },
  {
    slug: "kizilay-soda",
    name: "Kızılay Soda",
    shortName: "Kızılay",
    category: "icecek",
    tagline: "Doğal maden suyunun klasiği.",
    description:
      "Kızılay Soda, uzun yıllardır güvenilirliğiyle bilinen doğal maden suyu markası olarak DAIL GROUP bayiliğinde bölgemize sunulmaktadır.",
    about:
      "Kızılay Soda, Türkiye'de doğal maden sodası denince akla ilk gelen köklü markalardan biridir. Doğal kaynağından gelen mineral yapısı ve karakteristik tadıyla uzun yıllardır restoran ve ev sofralarında yerini korumaktadır. DAIL GROUP bayiliğinde Kızılay Soda, bölgemizdeki işletmelere düzenli ve kesintisiz olarak ulaştırılmaktadır.",
    color: "#c81414",
    logo: "",
    cover: "/images/icecek/icecek-kizilay-soda-cesitleri-01.jpg",
    gallery: [],
    order: 7,
    active: true,
  },
  {
    slug: "insaat-hizmetleri",
    name: "İnşaat Hizmetleri",
    shortName: "İnşaat",
    category: "insaat",
    tagline: "Temelden anahtar teslimine.",
    description:
      "DAIL GROUP İnşaat, konut ve ticari projelerde proje yönetiminden uygulamaya, uçtan uca inşaat ve taahhüt hizmetleri sunar. Deneyimli ekibimizle güvenli ve zamanında teslimat önceliğimizdir.",
    about:
      "Bir inşaat projesinin başarısı; doğru proje planlaması, kaliteli malzeme seçimi, alanında uzman iş gücü ve şantiye güvenliğine gösterilen özenle doğrudan ilişkilidir. Konut, ticari yapı ya da altyapı projelerinde zamanında teslimat kadar, yapının uzun ömürlü ve güvenli olması da önceliklidir. DAIL GROUP İnşaat olarak projelerimizde bu ilkeleri temel alarak, planlamadan anahtar teslime kadar her aşamada müşteri memnuniyetini ön planda tutuyoruz.",
    color: "#2b2e83",
    logo: "",
    cover: "",
    gallery: [],
    order: 8,
    active: true,
  },
];

export const heroContent: HeroContent = {
  eyebrow: "GÜÇLÜ MARKALAR, GÜVENİLİR İŞ ORTAĞINIZ",
  title: "DAIL",
  highlight: "GROUP",
  description:
    "Gıda, içecek ve inşaat sektörlerinde kaliteli markalarımız ve profesyonel hizmet anlayışımızla yanınızdayız.",
  // Intentionally empty: no single product photo represents all three
  // sectors (gıda/içecek/inşaat). Hero renders an abstract brand-color
  // treatment instead — see components/site/hero.tsx.
  backgroundImage: "",
  primaryCta: { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
  secondaryCta: { label: "İletişime Geçin", href: "/iletisim" },
};

export const stats: StatItem[] = [
  { label: "Yıllık Tecrübe", value: "15+", icon: "Award" },
  { label: "Bayilik & Marka", value: "8+", icon: "Star" },
  { label: "Mutlu Müşteri", value: "500+", icon: "Users" },
  { label: "Destek Hizmeti", value: "7/24", icon: "Headphones" },
];

export const aboutContent: AboutContent = {
  title: "Yılların Tecrübesi, Güvenin Adresi",
  description:
    "DAIL GROUP olarak gıda, içecek ve inşaat sektörlerinde edindiğimiz köklü tecrübeyi; güçlü bayilik ağımız, geniş lojistik kapasitemiz ve müşteri odaklı hizmet anlayışımızla birleştiriyoruz. Yakup Ağa Et Ürünleri, A Piliç, Beysu, Avşar Soda, Sultan Uludağ Su, Hotline Energy ve Kızılay Soda gibi güvenilir markaların bölgemizdeki resmi bayisi olarak, işletmenizin ihtiyaç duyduğu ürünleri zamanında ve eksiksiz teslim ediyoruz. İnşaat alanındaki hizmetlerimizle de aynı güven ve kaliteyi yapı projelerine taşıyoruz.",
  mission:
    "İş ortaklarımıza kesintisiz, kaliteli ve güvenilir tedarik ile hizmet sunarak sektörümüzde referans bir marka olmak.",
  vision:
    "Gıda, içecek ve inşaat sektörlerinde bölgemizin en tercih edilen iş ortağı olarak büyümeye devam etmek.",
  values: [
    {
      title: "Güvenilirlik",
      description: "Verdiğimiz sözü zamanında ve eksiksiz yerine getiririz.",
    },
    {
      title: "Kalite",
      description: "Sadece güvenilir ve kaliteli markalarla çalışırız.",
    },
    {
      title: "Süreklilik",
      description: "Kesintisiz tedarik ve 7/24 destek anlayışıyla yanınızdayız.",
    },
  ],
  timeline: [
    {
      year: "Başlangıç",
      title: "Kuruluş",
      description: "Gıda bayiliği ile sektöre ilk adımımızı attık.",
    },
    {
      year: "Büyüme",
      title: "Portföy Genişlemesi",
      description:
        "İçecek grubu bayilikleri ve inşaat hizmetleri ile iş alanımızı genişlettik.",
    },
    {
      year: "Bugün",
      title: "DAIL GROUP",
      description:
        "8 bayilik ve inşaat hizmetleriyle bölgemizin güvenilir iş ortağı olduk.",
    },
  ],
  managementMessage:
    "DAIL GROUP olarak kurulduğumuz günden bu yana temel önceliğimiz; iş ortaklarımıza güven veren, sürdürülebilir ve kaliteli bir hizmet sunmak oldu. Bu prensipten hiçbir zaman ödün vermeden büyümeye devam ediyoruz.",
};

const rawAddress = "Güzelyurt, 26223 Sok No:22, 07112 Aksu/Antalya";

export const contactInfo: ContactInfo = {
  address: rawAddress,
  phone: "+90 532 651 18 30",
  whatsapp: "905326511830",
  email: "info@dailgroup.com",
  mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(rawAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
  workingHours: "Pazartesi - Cumartesi: 08:00 - 18:00",
  social: {},
  footerImage: "",
};

export function getBrandsByCategory(category: Brand["category"]) {
  return brands
    .filter((b) => b.category === category && b.active)
    .sort((a, b) => a.order - b.order);
}

export function getBrandBySlug(slug: string) {
  return brands.find((b) => b.slug === slug);
}
