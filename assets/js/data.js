/* Slots used by the 3D set, the tour demos and the brand studio.
   Each points at a file in assets/creatives/ (see assets/js/creatives.js for the full library).
   T[i] = { data: image, alt, title, dur, video, w, h }: 0-5 reels, 6-9 360° spins, 10-15 statics, 16-18 carousels. Brand-neutral: no client names or logos */
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
  "title": "Grime Monster vs Hero",
  "dur": "32s",
  "video": "assets/creatives/reels/popular/grime-monster-vs-kleenest-hero-ai-vfx-battle-campaign-390.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/reels/popular/boheme-bloom-kimono-mini-dress-393.jpg",
  "alt": "Reel still: model in a kimono mini dress",
  "title": "Boheme Bloom Kimono Dress",
  "dur": "27s",
  "video": "assets/creatives/reels/popular/boheme-bloom-kimono-mini-dress-393.mp4",
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
  "alt": "360 spin still: perfume bottle in warm light",
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
  "data": "assets/creatives/catalogue/standard/devotee-watch-374.jpg",
  "alt": "360 spin still: skeleton watch on black stone",
  "title": "Skeleton watch",
  "dur": "17s",
  "video": "assets/creatives/catalogue/standard/devotee-watch-374.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/statics/beauty-personal-care/deyga-deal-of-the-month-vitc.jpg",
  "alt": "Static ad: Vitamin C duo, deal of the month",
  "title": "Vitamin C Duo",
  "dur": null,
  "video": null,
  "w": 900,
  "h": 1125
 },
 {
  "data": "assets/creatives/statics/health-wellness/tript-uplift-gummies.jpg",
  "alt": "Static ad: Uplift mango gummies",
  "title": "Uplift Gummies",
  "dur": null,
  "video": null,
  "w": 900,
  "h": 1125
 },
 {
  "data": "assets/creatives/statics/beauty-personal-care/shesha-kasturi-manjal-rosewater.jpg",
  "alt": "Static ad: Kasturi Manjal and rose water summer combo",
  "title": "Kasturi Manjal + Rose Water",
  "dur": null,
  "video": null,
  "w": 900,
  "h": 1125
 },
 {
  "data": "assets/creatives/statics/fashion-apparel/mysore-pattu-celebrity-spotted.jpg",
  "alt": "Static ad: saree, celebrity spotted",
  "title": "Saree · Celebrity Spotted",
  "dur": null,
  "video": null,
  "w": 900,
  "h": 1125
 },
 {
  "data": "assets/creatives/statics/health-wellness/aarogya-summer-essentials.jpg",
  "alt": "Static ad: summer essentials",
  "title": "",
  "dur": null,
  "video": null,
  "w": 900,
  "h": 1125
 },
 {
  "data": "assets/creatives/statics/fashion-apparel/mindesa-bags-unbeatable-prices.jpg",
  "alt": "Static ad: backpack with a model in sunglasses",
  "title": "Bags · Unbeatable Prices",
  "dur": null,
  "video": null,
  "w": 900,
  "h": 1125
 },
 {
  "data": "assets/creatives/carousels/is-health-stores-bust-firming-cream/01.jpg",
  "alt": "Carousel card: bust firming cream",
  "title": "· Bust Firming Cream",
  "dur": null,
  "video": null,
  "w": 1080,
  "h": 1080
 },
 {
  "data": "assets/creatives/carousels/shesha-ayurveda-nilini-ayurvedic-hair-colour/01.jpg",
  "alt": "Carousel card: hair colour",
  "title": "· Ayurvedic Hair Colour",
  "dur": null,
  "video": null,
  "w": 1080,
  "h": 1080
 },
 {
  "data": "assets/creatives/carousels/avimee-herbal-3-easy-steps-for-healthy-hair/01.jpg",
  "alt": "Carousel card: 3 easy steps for healthy hair",
  "title": "· 3 Easy Steps for Healthy Hair",
  "dur": null,
  "video": null,
  "w": 1080,
  "h": 1080
 }
];
