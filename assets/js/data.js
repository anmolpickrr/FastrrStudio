/* Slots used by the 3D set, the tour demos and the brand studio.
   Each points at a file in assets/creatives/ (see assets/js/creatives.js for the full library).
   T[i] = { data: image, alt, title, dur, video, w, h }: 0-5 reels, 6-9 360° spins, 10-15 statics, 16-18 carousels, 19-30 logos */
var VIDEOS_READY = true;
var T = [
 {
  "data": "assets/creatives/reels/standard/vivienne-midnight-glow-maxi-dress-v2-419.jpg",
  "alt": "Reel still: model in a midnight blue maxi dress",
  "title": "Vivienne Midnight Glow Maxi Dress",
  "dur": "29s",
  "video": "assets/creatives/reels/standard/vivienne-midnight-glow-maxi-dress-v2-419.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/reels/popular/grime-monster-vs-kleenest-hero-ai-vfx-battle-campaign-390.jpg",
  "alt": "Reel still: AI VFX battle between a grime monster and a cleaning hero",
  "title": "Grime Monster vs Kleenest Hero",
  "dur": "32s",
  "video": "assets/creatives/reels/popular/grime-monster-vs-kleenest-hero-ai-vfx-battle-campaign-390.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/reels/popular/matri-pro-198.jpg",
  "alt": "Reel still: Matri Pro period pain relief device",
  "title": "Matri Pro",
  "dur": "27s",
  "video": "assets/creatives/reels/popular/matri-pro-198.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/reels/popular/coral-candy-boho-mini-dress-394.jpg",
  "alt": "Reel still: model in a coral boho mini dress",
  "title": "Coral Candy Boho Mini Dress",
  "dur": "32s",
  "video": "assets/creatives/reels/popular/coral-candy-boho-mini-dress-394.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/reels/standard/hoodies-sweatpants-131.jpg",
  "alt": "Reel still: streetwear hoodie and sweatpants",
  "title": "Hoodies & Sweatpants",
  "dur": "38s",
  "video": "assets/creatives/reels/standard/hoodies-sweatpants-131.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/reels/popular/pookie-pet-collection-75.jpg",
  "alt": "Reel still: pet accessories collection",
  "title": "Pookie Pet Collection",
  "dur": "46s",
  "video": "assets/creatives/reels/popular/pookie-pet-collection-75.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/catalogue/standard/adored-360-255.jpg",
  "alt": "360 spin still: Momentier Adored perfume bottle in warm light",
  "title": "Adored 360",
  "dur": "17s",
  "video": "assets/creatives/catalogue/standard/adored-360-255.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/catalogue/standard/ring-14k-white-gold-plated-352.jpg",
  "alt": "360 spin still: white gold plated ring",
  "title": "Ring 14k White Gold Plated",
  "dur": "16s",
  "video": "assets/creatives/catalogue/standard/ring-14k-white-gold-plated-352.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/catalogue/standard/tiger-eye-crystal-ganesh-ji-277.jpg",
  "alt": "360 spin still: tiger eye crystal Ganesh idol",
  "title": "Tiger Eye Crystal Ganesh Ji",
  "dur": "16s",
  "video": "assets/creatives/catalogue/standard/tiger-eye-crystal-ganesh-ji-277.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/catalogue/standard/kumkumadi-thailam-face-oil-412.jpg",
  "alt": "360 spin still: Kumkumadi Thailam face oil bottle",
  "title": "Kumkumadi Thailam Face Oil",
  "dur": "17s",
  "video": "assets/creatives/catalogue/standard/kumkumadi-thailam-face-oil-412.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/statics/beauty-personal-care/deyga-deal-of-the-month-vitc.jpg",
  "alt": "Static ad: Deyga Vitamin C duo, deal of the month",
  "title": "Deyga Vitamin C Duo",
  "dur": null,
  "video": null,
  "w": 900,
  "h": 1125
 },
 {
  "data": "assets/creatives/statics/health-wellness/tript-uplift-gummies.jpg",
  "alt": "Static ad: Tript Uplift mango gummies",
  "title": "Tript Uplift Gummies",
  "dur": null,
  "video": null,
  "w": 900,
  "h": 1125
 },
 {
  "data": "assets/creatives/statics/beauty-personal-care/shesha-kasturi-manjal-rosewater.jpg",
  "alt": "Static ad: Shesha Kasturi Manjal and rose water summer combo",
  "title": "Kasturi Manjal + Rose Water",
  "dur": null,
  "video": null,
  "w": 900,
  "h": 1125
 },
 {
  "data": "assets/creatives/statics/fashion-apparel/mysore-pattu-celebrity-spotted.jpg",
  "alt": "Static ad: Mysore Pattu saree, celebrity spotted",
  "title": "Mysore Pattu Saree · Celebrity Spotted",
  "dur": null,
  "video": null,
  "w": 900,
  "h": 1125
 },
 {
  "data": "assets/creatives/statics/health-wellness/aarogya-summer-essentials.jpg",
  "alt": "Static ad: Aarogya Nutri Mix summer essentials",
  "title": "Aarogya Nutri Mix",
  "dur": null,
  "video": null,
  "w": 900,
  "h": 1125
 },
 {
  "data": "assets/creatives/statics/fashion-apparel/mindesa-bags-unbeatable-prices.jpg",
  "alt": "Static ad: Mindesa backpack with a model in sunglasses",
  "title": "Mindesa Bags · Unbeatable Prices",
  "dur": null,
  "video": null,
  "w": 900,
  "h": 1125
 },
 {
  "data": "assets/creatives/carousels/is-health-stores-bust-firming-cream/01.jpg",
  "alt": "Carousel card: IS Health Stores bust firming cream",
  "title": "IS Health Stores · Bust Firming Cream",
  "dur": null,
  "video": null,
  "w": 1080,
  "h": 1080
 },
 {
  "data": "assets/creatives/carousels/shesha-ayurveda-nilini-ayurvedic-hair-colour/01.jpg",
  "alt": "Carousel card: Shesha Ayurveda Nilini hair colour",
  "title": "Shesha Ayurveda · Nilini Ayurvedic Hair Colour",
  "dur": null,
  "video": null,
  "w": 1080,
  "h": 1080
 },
 {
  "data": "assets/creatives/carousels/avimee-herbal-3-easy-steps-for-healthy-hair/01.jpg",
  "alt": "Carousel card: Avimee Herbal 3 easy steps for healthy hair",
  "title": "Avimee Herbal · 3 Easy Steps for Healthy Hair",
  "dur": null,
  "video": null,
  "w": 1080,
  "h": 1080
 },
 {
  "data": "assets/creatives/brand-logos/nooky.png",
  "alt": "Nooky logo",
  "title": "Nooky",
  "dur": null,
  "video": null,
  "w": 790,
  "h": 180
 },
 {
  "data": "assets/creatives/brand-logos/juvia-jewellery.png",
  "alt": "Juvia Jewellery logo",
  "title": "Juvia Jewellery",
  "dur": null,
  "video": null,
  "w": 470,
  "h": 180
 },
 {
  "data": "assets/creatives/brand-logos/aarogya-nutri-mix.png",
  "alt": "Aarogya Nutri Mix logo",
  "title": "Aarogya Nutri Mix",
  "dur": null,
  "video": null,
  "w": 453,
  "h": 180
 },
 {
  "data": "assets/creatives/brand-logos/limited-uniq.png",
  "alt": "Limited Uniq logo",
  "title": "Limited Uniq",
  "dur": null,
  "video": null,
  "w": 707,
  "h": 180
 },
 {
  "data": "assets/creatives/brand-logos/cink.png",
  "alt": "Cink logo",
  "title": "Cink",
  "dur": null,
  "video": null,
  "w": 444,
  "h": 180
 },
 {
  "data": "assets/creatives/brand-logos/deyga.png",
  "alt": "Deyga logo",
  "title": "Deyga",
  "dur": null,
  "video": null,
  "w": 370,
  "h": 180
 },
 {
  "data": "assets/creatives/brand-logos/eye-sutra.png",
  "alt": "Eye Sutra logo",
  "title": "Eye Sutra",
  "dur": null,
  "video": null,
  "w": 336,
  "h": 180
 },
 {
  "data": "assets/creatives/brand-logos/easify.png",
  "alt": "Easify logo",
  "title": "Easify",
  "dur": null,
  "video": null,
  "w": 447,
  "h": 180
 },
 {
  "data": "assets/creatives/brand-logos/easypick.png",
  "alt": "EasyPick logo",
  "title": "EasyPick",
  "dur": null,
  "video": null,
  "w": 457,
  "h": 99
 },
 {
  "data": "assets/creatives/brand-logos/erweit.png",
  "alt": "Erweit logo",
  "title": "Erweit",
  "dur": null,
  "video": null,
  "w": 661,
  "h": 180
 },
 {
  "data": "assets/creatives/brand-logos/estailo.png",
  "alt": "Estailo logo",
  "title": "Estailo",
  "dur": null,
  "video": null,
  "w": 330,
  "h": 94
 },
 {
  "data": "assets/creatives/brand-logos/shesha-ayurveda.png",
  "alt": "Shesha Ayurveda logo",
  "title": "Shesha Ayurveda",
  "dur": null,
  "video": null,
  "w": 152,
  "h": 180
 }
];
