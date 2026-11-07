/* Slots used by the 3D set, the tour demos and the brand studio.
   Each points at a file in assets/creatives/ (see assets/js/creatives.js for the full library).
   T[i] = { data: image, alt, title, dur, video, w, h }: 0-5 reels, 6-9 360° spins, 10-15 statics, 16-18 carousels, 19-30 logos */
var VIDEOS_READY = true;
var T = [
 {
  "data": "assets/creatives/reels/starter/cp-plus.jpg",
  "alt": "Reel still: a man checking his phone in an airport lounge (CP Plus reel)",
  "title": "CP Plus",
  "dur": "19s",
  "video": "assets/creatives/reels/starter/cp-plus.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/reels/starter/brown-sweetshirt-247.jpg",
  "alt": "Reel still: man in a maroon sweatshirt sitting on the floor with a Pomeranian",
  "title": "Brown Sweetshirt",
  "dur": "23s",
  "video": "assets/creatives/reels/starter/brown-sweetshirt-247.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/reels/starter/drop-test-protection-proof-campaign-408.jpg",
  "alt": "Reel still: hand holding a phone, drop-test and protection proof reel",
  "title": "Drop Test & Protection Proof Campaign",
  "dur": "20s",
  "video": "assets/creatives/reels/starter/drop-test-protection-proof-campaign-408.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/reels/starter/dulha-ghar-ganesh-pooja-kurta-09.jpg",
  "alt": "Reel still: man holding two kurtas, Ganesh pooja kurta reel",
  "title": "Dulha Ghar · Ganesh Pooja Kurta",
  "dur": "31s",
  "video": "assets/creatives/reels/starter/dulha-ghar-ganesh-pooja-kurta-09.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/reels/starter/dulha-ghar-kurta-with-blazer-07.jpg",
  "alt": "Reel still: rack of kurtas and blazers, Dulha Ghar reel",
  "title": "Dulha Ghar · Kurta with Blazer",
  "dur": "30s",
  "video": "assets/creatives/reels/starter/dulha-ghar-kurta-with-blazer-07.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/reels/starter/elevator-fit-check-310.jpg",
  "alt": "Reel still: elevator mirror fit check in a white top and jeans",
  "title": "Elevator Fit Check",
  "dur": "25s",
  "video": "assets/creatives/reels/starter/elevator-fit-check-310.mp4",
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
  "data": "assets/creatives/catalogue/standard/devotee-watch-374.jpg",
  "alt": "360 spin still: skeleton-dial steel watch on a marble block",
  "title": "Devotee Watch",
  "dur": "19s",
  "video": "assets/creatives/catalogue/standard/devotee-watch-374.mp4",
  "w": 640,
  "h": 1138
 },
 {
  "data": "assets/creatives/catalogue/standard/frame-55.jpg",
  "alt": "360 spin still: gold horses artwork in an ornate frame",
  "title": "Frame",
  "dur": "17s",
  "video": "assets/creatives/catalogue/standard/frame-55.mp4",
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
  "data": "assets/creatives/statics/beauty-personal-care/shesha-rosewater-multani-mitti.jpg",
  "alt": "Static ad: Rose Water and Multani Mitti bestselling combo",
  "title": "Rose Water + Multani Mitti · Bestselling Combo",
  "dur": null,
  "video": null,
  "w": 900,
  "h": 1125
 },
 {
  "data": "assets/creatives/statics/beauty-personal-care/shesha-3steps-one-kit.jpg",
  "alt": "Static ad: 3 Steps One Kit, face wash, deodorant and soap",
  "title": "3 Steps, One Kit · Face Wash + Deodorant + Soap",
  "dur": null,
  "video": null,
  "w": 900,
  "h": 1125
 },
 {
  "data": "assets/creatives/statics/beauty-personal-care/shesha-summer-musthaves-ctm.jpg",
  "alt": "Static ad: Summer must-haves CTM ritual kit",
  "title": "Summer Must-Haves · CTM Ritual Kit",
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
  "data": "assets/creatives/statics/food-fmcg/krafted-millets-no-more-fatigue.jpg",
  "alt": "Static ad: Krafted Millets, no more fatigue",
  "title": "Krafted Millets · No More Fatigue",
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
