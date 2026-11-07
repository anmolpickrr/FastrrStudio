/* Showcase media for The Set. Every file lives in this repository.
   T[i] = { data: image path, alt, title, dur, video: local mp4 path or null, w, h }
   Reels and spins expect their MP4 in assets/video/ (see assets/video/README.md).
   Set VIDEOS_READY = true once those files are committed; until then the cards show stills. */
var VIDEOS_READY = false;
var T = [
 {
  "data": "assets/img/reel-00-cp-plus.jpg",
  "alt": "Reel still: a man checking his phone in an airport lounge (CP Plus reel)",
  "title": "CP PLUS Converted",
  "dur": "19s",
  "video": "assets/video/reel-00-cp-plus.mp4",
  "w": 202,
  "h": 360
 },
 {
  "data": "assets/img/reel-01-brown-sweetshirt.jpg",
  "alt": "Reel still: man in a maroon sweatshirt sitting on the floor with a Pomeranian",
  "title": "Meta   brown sweetshirt 1080x1920 (SRAP247) Converted",
  "dur": "23s",
  "video": "assets/video/reel-01-brown-sweetshirt.mp4",
  "w": 202,
  "h": 360
 },
 {
  "data": "assets/img/reel-02-drop-test-protection-proof-campaign.jpg",
  "alt": "Reel still: hand holding a phone, drop-test and protection proof reel",
  "title": "Meta   drop test & protection proof campaign 1080x1920(srap408) Converted",
  "dur": "20s",
  "video": "assets/video/reel-02-drop-test-protection-proof-campaign.mp4",
  "w": 202,
  "h": 360
 },
 {
  "data": "assets/img/reel-03-dulha-ghar-ganesh-pooja-kurta.jpg",
  "alt": "Reel still: man holding two kurtas, Ganesh pooja kurta reel",
  "title": "Meta   dulha ghar   ganesh pooja kurta 1080x1920 (srap09) Converted",
  "dur": "31s",
  "video": "assets/video/reel-03-dulha-ghar-ganesh-pooja-kurta.mp4",
  "w": 202,
  "h": 360
 },
 {
  "data": "assets/img/reel-04-dulha-ghar-kurta-with-blazer.jpg",
  "alt": "Reel still: rack of kurtas and blazers, Dulha Ghar reel",
  "title": "Meta   dulha ghar   kurta with blazer 1080x1920 (SRAP07) Converted",
  "dur": "30s",
  "video": "assets/video/reel-04-dulha-ghar-kurta-with-blazer.mp4",
  "w": 202,
  "h": 360
 },
 {
  "data": "assets/img/reel-05-elevator-fit-check.jpg",
  "alt": "Reel still: elevator mirror fit check in a white top and jeans",
  "title": "Meta   elevator fit check 1080x1920 (srap310) Converted",
  "dur": "25s",
  "video": "assets/video/reel-05-elevator-fit-check.mp4",
  "w": 202,
  "h": 360
 },
 {
  "data": "assets/img/spin-06-adored-360.jpg",
  "alt": "360 spin still: Momentier Adored perfume bottle in warm light",
  "title": "Meta   adored 360 1080x1920 (srap255) Converted",
  "dur": "17s",
  "video": "assets/video/spin-06-adored-360.mp4",
  "w": 202,
  "h": 360
 },
 {
  "data": "assets/img/spin-07-devotee-watch.jpg",
  "alt": "360 spin still: skeleton-dial steel watch on a marble block",
  "title": "Meta   devotee watch 1080x1920(srap374) Converted",
  "dur": "19s",
  "video": "assets/video/spin-07-devotee-watch.mp4",
  "w": 202,
  "h": 360
 },
 {
  "data": "assets/img/spin-08-frame.jpg",
  "alt": "360 spin still: gold horses artwork in an ornate frame",
  "title": "Meta   frame 1080x1920 (SRAP55) Converted",
  "dur": "17s",
  "video": "assets/video/spin-08-frame.mp4",
  "w": 202,
  "h": 360
 },
 {
  "data": "assets/img/spin-09-kumkumadi-thailam-face-oil.jpg",
  "alt": "360 spin still: Kumkumadi Thailam face oil bottle",
  "title": "Meta   KUMKUMADI THAILAM FACE OIL 1080x1920(srap412) Converted",
  "dur": "17s",
  "video": "assets/video/spin-09-kumkumadi-thailam-face-oil.mp4",
  "w": 202,
  "h": 360
 },
 {
  "data": "assets/img/static-10-rose-water-multani-mitti-bestselling-combo.jpg",
  "alt": "Static ad: Rose Water and Multani Mitti bestselling combo",
  "title": "Rose Water + Multani Mitti — Bestselling Combo",
  "dur": null,
  "video": null,
  "w": 288,
  "h": 360
 },
 {
  "data": "assets/img/static-11-3-steps-one-kit-face-wash-deodorant-soap.jpg",
  "alt": "Static ad: 3 Steps One Kit, face wash, deodorant and soap",
  "title": "3 Steps, One Kit — Face Wash + Deodorant + Soap",
  "dur": null,
  "video": null,
  "w": 288,
  "h": 360
 },
 {
  "data": "assets/img/static-12-summer-must-haves-ctm-ritual-kit.jpg",
  "alt": "Static ad: Summer must-haves CTM ritual kit",
  "title": "Summer Must-Haves — CTM Ritual Kit",
  "dur": null,
  "video": null,
  "w": 288,
  "h": 360
 },
 {
  "data": "assets/img/static-13-mysore-pattu-saree-celebrity-spotted.jpg",
  "alt": "Static ad: Mysore Pattu saree, celebrity spotted",
  "title": "Mysore Pattu Saree — Celebrity Spotted",
  "dur": null,
  "video": null,
  "w": 288,
  "h": 360
 },
 {
  "data": "assets/img/static-14-krafted-millets-no-more-fatigue.jpg",
  "alt": "Static ad: Krafted Millets, no more fatigue",
  "title": "Krafted Millets — No More Fatigue",
  "dur": null,
  "video": null,
  "w": 288,
  "h": 360
 },
 {
  "data": "assets/img/static-15-mindesa-bags-unbeatable-prices.jpg",
  "alt": "Static ad: Mindesa backpack with a model in sunglasses",
  "title": "Mindesa Bags — Unbeatable Prices",
  "dur": null,
  "video": null,
  "w": 288,
  "h": 360
 },
 {
  "data": "assets/img/carousel-16-is-health-stores-bust-firming-cream.jpg",
  "alt": "Carousel card: IS Health Stores bust firming cream",
  "title": "IS Health Stores — Bust Firming Cream",
  "dur": null,
  "video": null,
  "w": 360,
  "h": 360
 },
 {
  "data": "assets/img/carousel-17-shesha-ayurveda-nilini-ayurvedic-hair-colour.jpg",
  "alt": "Carousel card: Shesha Ayurveda Nilini hair colour",
  "title": "Shesha Ayurveda — Nilini Ayurvedic Hair Colour",
  "dur": null,
  "video": null,
  "w": 360,
  "h": 360
 },
 {
  "data": "assets/img/carousel-18-avimee-herbal-3-easy-steps-for-healthy-hair.jpg",
  "alt": "Carousel card: Avimee Herbal 3 easy steps for healthy hair",
  "title": "Avimee Herbal — 3 Easy Steps for Healthy Hair",
  "dur": null,
  "video": null,
  "w": 360,
  "h": 360
 },
 {
  "data": "assets/img/logo-19-nooky.png",
  "alt": "Nooky logo",
  "title": "Nooky",
  "dur": null,
  "video": null,
  "w": 200,
  "h": 46
 },
 {
  "data": "assets/img/logo-20-juvia-jewellery.png",
  "alt": "Juvia Jewellery logo",
  "title": "Juvia Jewellery",
  "dur": null,
  "video": null,
  "w": 200,
  "h": 77
 },
 {
  "data": "assets/img/logo-21-aarogya-nutri-mix.png",
  "alt": "Aarogya Nutri Mix logo",
  "title": "Aarogya Nutri Mix",
  "dur": null,
  "video": null,
  "w": 200,
  "h": 79
 },
 {
  "data": "assets/img/logo-22-limited-uniq.png",
  "alt": "Limited Uniq logo",
  "title": "Limited Uniq",
  "dur": null,
  "video": null,
  "w": 200,
  "h": 51
 },
 {
  "data": "assets/img/logo-23-cink.png",
  "alt": "Cink logo",
  "title": "Cink",
  "dur": null,
  "video": null,
  "w": 197,
  "h": 80
 },
 {
  "data": "assets/img/logo-24-deyga.png",
  "alt": "Deyga logo",
  "title": "Deyga",
  "dur": null,
  "video": null,
  "w": 164,
  "h": 80
 },
 {
  "data": "assets/img/logo-25-eye-sutra.png",
  "alt": "Eye Sutra logo",
  "title": "Eye Sutra",
  "dur": null,
  "video": null,
  "w": 149,
  "h": 80
 },
 {
  "data": "assets/img/logo-26-easify.png",
  "alt": "Easify logo",
  "title": "Easify",
  "dur": null,
  "video": null,
  "w": 199,
  "h": 80
 },
 {
  "data": "assets/img/logo-27-easypick.png",
  "alt": "EasyPick logo",
  "title": "EasyPick",
  "dur": null,
  "video": null,
  "w": 200,
  "h": 43
 },
 {
  "data": "assets/img/logo-28-erweit.png",
  "alt": "Erweit logo",
  "title": "Erweit",
  "dur": null,
  "video": null,
  "w": 200,
  "h": 54
 },
 {
  "data": "assets/img/logo-29-estailo.png",
  "alt": "Estailo logo",
  "title": "Estailo",
  "dur": null,
  "video": null,
  "w": 200,
  "h": 57
 },
 {
  "data": "assets/img/logo-30-shesha-ayurveda.png",
  "alt": "Shesha Ayurveda logo",
  "title": "Shesha Ayurveda",
  "dur": null,
  "video": null,
  "w": 68,
  "h": 80
 }
];
