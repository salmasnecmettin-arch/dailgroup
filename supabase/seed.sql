-- =========================================================================
-- DAIL GROUP — initial content seed
-- Run AFTER schema.sql. Mirrors src/lib/content.ts so the CRM has real rows
-- to edit from day one instead of an empty dashboard.
--
-- Safe to re-run any time content.ts changes: every insert upserts (updates
-- existing rows instead of skipping them), so re-running this file always
-- syncs Supabase to the latest values below.
-- =========================================================================

insert into categories (key, title, short_description, cover_url, icon, order_index) values
  ('gida', 'Gıda Ürünleri', 'Et ürünleri, tavuk ve şarküteri kalemlerinde güvenilir bayiliklerimizle kesintisiz tedarik.', '/images/et-urunleri/et-urunleri-sucuk-ahsap-tabak-01.jpg', 'Beef', 1),
  ('icecek', 'İçecek Grubu', 'Doğal maden suyu, soda ve enerji içeceği bayilikleriyle geniş bir ürün yelpazesi.', '/images/icecek/icecek-kizilay-soda-cesitleri-01.jpg', 'GlassWater', 2),
  ('insaat', 'İnşaat Hizmetleri', 'Konut ve ticari projelerde uçtan uca inşaat ve taahhüt hizmetleri.', '', 'Building2', 3)
on conflict (key) do update set
  title = excluded.title,
  short_description = excluded.short_description,
  cover_url = excluded.cover_url,
  icon = excluded.icon,
  order_index = excluded.order_index;

insert into brands (slug, name, short_name, category, tagline, description, about, color, logo_url, cover_url, gallery, order_index, active) values
  ('yakup-aga-et-urunleri', 'Yakup Ağa Et Ürünleri', 'Yakup Ağa', 'gida', 'Geleneksel lezzet, modern üretim.',
   'Yakup Ağa Et Ürünleri; sucuk, kokoreç ve şarküteri kalemlerinde yüksek kalite standartlarıyla üretim yapan, DAIL GROUP güvencesiyle bölgemize ulaştırdığımız köklü bir markadır.',
   'Sucuk ve kokoreç, Anadolu mutfağının en köklü şarküteri lezzetleri arasında yer alır. Kaliteli et ürünlerinde belirleyici unsurlar; etin taze ve hijyenik koşullarda işlenmesi, doğru baharat oranı ve soğuk zincirin kesintisiz sürdürülmesidir. DAIL GROUP olarak bayiliğini yaptığımız Yakup Ağa Et Ürünleri''nde bu standartlara azami önem verilir; ürünler üretimden sofraya kadar soğuk zincir korunarak taşınır ve saklanır.',
   '#8a1c1c', '', '/images/et-urunleri/et-urunleri-sucuk-ahsap-tabak-01.jpg',
   '["/images/et-urunleri/et-urunleri-kokorec-sandvic-01.jpg","/images/et-urunleri/et-urunleri-sucuk-rulo-dilimli-01.jpg"]'::jsonb,
   1, true),
  ('a-pilic', 'A Piliç', 'A Piliç', 'gida', 'Güvenilir kalite, her sofrada.',
   'A Piliç; hijyenik üretim tesislerinde işlenen taze tavuk ürünlerini, DAIL GROUP''un güçlü lojistik ağıyla bölgemizdeki işletmelere ulaştırıyoruz.',
   'Tavuk eti; yüksek protein oranı, düşük yağ içeriği ve uygun fiyatı sayesinde hem ev mutfaklarının hem de restoran/otel işletmelerinin vazgeçilmezleri arasındadır. Kaliteli tavuk ürünlerinde dikkat edilmesi gereken en önemli noktalar; kesim ve paketleme aşamalarında hijyen standartlarına uyum, soğuk zincirin korunması ve ürünün tazeliğinin son tüketiciye kadar muhafaza edilmesidir. DAIL GROUP, bu süreçlerin her aşamasında titizlikle çalışır.',
   '#e2721c', '', '',
   '["/images/tavuk/tavuk-pilic-doner-01.jpg"]'::jsonb,
   2, true),
  ('beysu', 'Beysu', 'Beysu', 'icecek', 'Doğanın saf hali.',
   'Beysu doğal kaynak suyu, kaynağından şişelenerek gelen doğallığı ile DAIL GROUP bayiliğinde işletmeniz için düzenli ve zamanında teslim edilir.',
   'Doğal kaynak suyu, yeraltı kaynaklarından çıktığı haliyle, herhangi bir kimyasal arıtma işlemine tabi tutulmadan doğrudan şişelenen su türüdür. Mineral dengesi kaynağın jeolojik yapısına göre şekillenir ve düzenli tüketimi günlük sıvı ihtiyacının doğal yollarla karşılanmasına katkı sağlar. DAIL GROUP olarak dağıtımını yaptığımız Beysu, kaynağından sofranıza kadar hijyenik koşullarda ulaştırılır.',
   '#0e5aa7', '', '/images/icecek/icecek-beysu-dogal-kaynak-suyu-01.jpg', '[]'::jsonb, 3, true),
  ('avsar-soda', 'Avşar Soda', 'Avşar', 'icecek', 'Doğal maden özü.',
   'Avşar Soda, doğal maden kaynağından gelen ferahlığıyla restoran ve marketlerin vazgeçilmezleri arasında yer alıyor. DAIL GROUP güvencesiyle sofralarınızda.',
   'Doğal maden sodası, yer altından doğal olarak karbondioksit kazanmış maden sularının şişelenmesiyle elde edilir ve içeriğindeki doğal mineraller sayesinde klasik gazlı içeceklerden ayrışır. Özellikle yemek yanında tüketiminde ferahlatıcı etkisiyle tercih edilir. DAIL GROUP olarak Avşar Soda''yı bölgemizdeki restoran, kafe ve marketlere düzenli tedarik zinciriyle ulaştırıyoruz.',
   '#0f7a6b', '', '/images/icecek/icecek-avsar-soda-siseler-02.jpg',
   '["/images/icecek/icecek-avsar-soda-buz-01.jpg"]'::jsonb, 4, true),
  ('sultan-uludag-su', 'Sultan Uludağ Su', 'Sultan Uludağ', 'icecek', 'Uludağ''ın eşsiz kaynağından.',
   'Sultan Uludağ Su, Uludağ''ın doğal kaynağından gelen eşsiz lezzetiyle DAIL GROUP bayiliğinde geniş bir müşteri ağına ulaştırılmaktadır.',
   'Uludağ''ın kaynak suları, düşük mineral içeriği ve yüksek saflık oranıyla Türkiye''nin en bilinen doğal kaynak sularından biri olarak kabul edilir. Dağlık bölgelerden beslenen kaynaklar, doğal filtrasyon süreciyle arınmış suyun sofralara ulaşmasını sağlar. DAIL GROUP bayiliğinde Sultan Uludağ Su, kaynağındaki tazeliğini koruyarak bölgemize düzenli olarak dağıtılmaktadır.',
   '#1447a3', '', '/images/icecek/icecek-sultan-prime-su-siseleri-01.jpg',
   '["/images/icecek/icecek-sultan-soda-afis-01.jpg"]'::jsonb, 5, true),
  ('hotline-energy', 'Hotline Energy', 'Hotline', 'icecek', 'Enerjinin adresi.',
   'Hotline Energy enerji içeceği, dinamik yaşam tarzını destekleyen formülüyle DAIL GROUP''un içecek portföyünün güçlü bir parçasıdır.',
   'Enerji içecekleri; kafein ve çeşitli vitamin bileşenleriyle anlık enerji ve odaklanma ihtiyacı duyulan anlarda tercih edilen içecek grubudur. Yoğun iş temposu, spor aktiviteleri ya da uzun mesai saatlerinde dengeli tüketildiğinde pratik bir destek sağlar. DAIL GROUP olarak Hotline Energy''yi market, kafe ve eğlence mekanlarına düzenli tedarik ile ulaştırıyoruz.',
   '#111111', '', '/images/icecek/icecek-hotline-enerji-icecegi-01.jpg', '[]'::jsonb, 6, true),
  ('kizilay-soda', 'Kızılay Soda', 'Kızılay', 'icecek', 'Doğal maden suyunun klasiği.',
   'Kızılay Soda, uzun yıllardır güvenilirliğiyle bilinen doğal maden suyu markası olarak DAIL GROUP bayiliğinde bölgemize sunulmaktadır.',
   'Kızılay Soda, Türkiye''de doğal maden sodası denince akla ilk gelen köklü markalardan biridir. Doğal kaynağından gelen mineral yapısı ve karakteristik tadıyla uzun yıllardır restoran ve ev sofralarında yerini korumaktadır. DAIL GROUP bayiliğinde Kızılay Soda, bölgemizdeki işletmelere düzenli ve kesintisiz olarak ulaştırılmaktadır.',
   '#c81414', '', '/images/icecek/icecek-kizilay-soda-cesitleri-01.jpg', '[]'::jsonb, 7, true),
  ('insaat-hizmetleri', 'İnşaat Hizmetleri', 'İnşaat', 'insaat', 'Temelden anahtar teslimine.',
   'DAIL GROUP İnşaat, konut ve ticari projelerde proje yönetiminden uygulamaya, uçtan uca inşaat ve taahhüt hizmetleri sunar. Deneyimli ekibimizle güvenli ve zamanında teslimat önceliğimizdir.',
   'Bir inşaat projesinin başarısı; doğru proje planlaması, kaliteli malzeme seçimi, alanında uzman iş gücü ve şantiye güvenliğine gösterilen özenle doğrudan ilişkilidir. Konut, ticari yapı ya da altyapı projelerinde zamanında teslimat kadar, yapının uzun ömürlü ve güvenli olması da önceliklidir. DAIL GROUP İnşaat olarak projelerimizde bu ilkeleri temel alarak, planlamadan anahtar teslime kadar her aşamada müşteri memnuniyetini ön planda tutuyoruz.',
   '#2b2e83', '', '', '[]'::jsonb, 8, true)
on conflict (slug) do update set
  name = excluded.name,
  short_name = excluded.short_name,
  category = excluded.category,
  tagline = excluded.tagline,
  description = excluded.description,
  about = excluded.about,
  color = excluded.color,
  cover_url = excluded.cover_url,
  gallery = excluded.gallery,
  order_index = excluded.order_index,
  active = excluded.active,
  updated_at = now();

insert into hero_content (id, eyebrow, title, highlight, description, background_image, primary_cta_label, primary_cta_href, secondary_cta_label, secondary_cta_href) values
  (1, 'GÜÇLÜ MARKALAR, GÜVENİLİR İŞ ORTAĞINIZ', 'DAIL', 'GROUP',
   'Gıda, içecek ve inşaat sektörlerinde kaliteli markalarımız ve profesyonel hizmet anlayışımızla yanınızdayız.',
   '', 'Hizmetlerimiz', '/hizmetlerimiz', 'İletişime Geçin', '/iletisim')
on conflict (id) do update set
  eyebrow = excluded.eyebrow,
  title = excluded.title,
  highlight = excluded.highlight,
  description = excluded.description,
  background_image = excluded.background_image,
  primary_cta_label = excluded.primary_cta_label,
  primary_cta_href = excluded.primary_cta_href,
  secondary_cta_label = excluded.secondary_cta_label,
  secondary_cta_href = excluded.secondary_cta_href,
  updated_at = now();

insert into about_content (id, title, description, mission, vision, values, timeline, management_message) values
  (1, 'Yılların Tecrübesi, Güvenin Adresi',
   'DAIL GROUP olarak gıda, içecek ve inşaat sektörlerinde edindiğimiz köklü tecrübeyi; güçlü bayilik ağımız, geniş lojistik kapasitemiz ve müşteri odaklı hizmet anlayışımızla birleştiriyoruz.',
   'İş ortaklarımıza kesintisiz, kaliteli ve güvenilir tedarik ile hizmet sunarak sektörümüzde referans bir marka olmak.',
   'Gıda, içecek ve inşaat sektörlerinde bölgemizin en tercih edilen iş ortağı olarak büyümeye devam etmek.',
   '[{"title":"Güvenilirlik","description":"Verdiğimiz sözü zamanında ve eksiksiz yerine getiririz."},{"title":"Kalite","description":"Sadece güvenilir ve kaliteli markalarla çalışırız."},{"title":"Süreklilik","description":"Kesintisiz tedarik ve 7/24 destek anlayışıyla yanınızdayız."}]'::jsonb,
   '[{"year":"Başlangıç","title":"Kuruluş","description":"Gıda bayiliği ile sektöre ilk adımımızı attık."},{"year":"Büyüme","title":"Portföy Genişlemesi","description":"İçecek grubu bayilikleri ve inşaat hizmetleri ile iş alanımızı genişlettik."},{"year":"Bugün","title":"DAIL GROUP","description":"8 bayilik ve inşaat hizmetleriyle bölgemizin güvenilir iş ortağı olduk."}]'::jsonb,
   'DAIL GROUP olarak kurulduğumuz günden bu yana temel önceliğimiz; iş ortaklarımıza güven veren, sürdürülebilir ve kaliteli bir hizmet sunmak oldu.')
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  mission = excluded.mission,
  vision = excluded.vision,
  values = excluded.values,
  timeline = excluded.timeline,
  management_message = excluded.management_message,
  updated_at = now();

insert into contact_info (id, address, phone, whatsapp, email, map_embed_url, working_hours, social) values
  (1, 'Güzelyurt, 26223 Sok No:22, 07112 Aksu/Antalya', '+90 532 651 18 30', '905326511830', 'info@dailgroup.com',
   'https://maps.google.com/maps?q=G%C3%BCzelyurt%2C%2026223%20Sok%20No%3A22%2C%2007112%20Aksu%2FAntalya&t=&z=15&ie=UTF8&iwloc=&output=embed',
   'Pazartesi - Cumartesi: 08:00 - 18:00', '{}'::jsonb)
on conflict (id) do update set
  address = excluded.address,
  phone = excluded.phone,
  whatsapp = excluded.whatsapp,
  email = excluded.email,
  map_embed_url = excluded.map_embed_url,
  working_hours = excluded.working_hours,
  updated_at = now();

insert into stats (label, value, icon, order_index) values
  ('Yıllık Tecrübe', '15+', 'Award', 1),
  ('Bayilik & Marka', '8+', 'Star', 2),
  ('Mutlu Müşteri', '500+', 'Users', 3),
  ('Destek Hizmeti', '7/24', 'Headphones', 4)
on conflict do nothing;
