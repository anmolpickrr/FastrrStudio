/* Creative library. Every file lives in assets/creatives/ in this repository.
   reels, catalogue: { title, band, tags[] (starter|standard|popular|premium, film, ugc), dur, video, preview (6s silent), poster, w, h, lang? }
   statics: { title, sub, hook, cat, catKey, ratio, src, w, h }
   carousels: { brand, title, hook, cat, slides[], w, h }
   logos: { name, src, mono, dw, dh, filter? } (dw/dh: display size for equal visual weight) */
var LIB = {
 "reels": [
  {
   "title": "CP Plus",
   "band": "starter",
   "dur": "19s",
   "video": "assets/creatives/reels/starter/cp-plus.mp4",
   "poster": "assets/creatives/reels/starter/cp-plus.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/cp-plus.preview.mp4"
  },
  {
   "title": "Brown Sweetshirt",
   "band": "starter",
   "dur": "23s",
   "video": "assets/creatives/reels/starter/brown-sweetshirt-247.mp4",
   "poster": "assets/creatives/reels/starter/brown-sweetshirt-247.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/brown-sweetshirt-247.preview.mp4"
  },
  {
   "title": "Drop Test & Protection Proof Campaign",
   "band": "starter",
   "dur": "20s",
   "video": "assets/creatives/reels/starter/drop-test-protection-proof-campaign-408.mp4",
   "poster": "assets/creatives/reels/starter/drop-test-protection-proof-campaign-408.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/drop-test-protection-proof-campaign-408.preview.mp4"
  },
  {
   "title": "Dulha Ghar · Ganesh Pooja Kurta",
   "band": "starter",
   "dur": "31s",
   "video": "assets/creatives/reels/starter/dulha-ghar-ganesh-pooja-kurta-09.mp4",
   "poster": "assets/creatives/reels/starter/dulha-ghar-ganesh-pooja-kurta-09.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/dulha-ghar-ganesh-pooja-kurta-09.preview.mp4"
  },
  {
   "title": "Dulha Ghar · Kurta with Blazer",
   "band": "starter",
   "dur": "30s",
   "video": "assets/creatives/reels/starter/dulha-ghar-kurta-with-blazer-07.mp4",
   "poster": "assets/creatives/reels/starter/dulha-ghar-kurta-with-blazer-07.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/dulha-ghar-kurta-with-blazer-07.preview.mp4"
  },
  {
   "title": "Elevator Fit Check",
   "band": "starter",
   "dur": "25s",
   "video": "assets/creatives/reels/starter/elevator-fit-check-310.mp4",
   "poster": "assets/creatives/reels/starter/elevator-fit-check-310.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/elevator-fit-check-310.preview.mp4"
  },
  {
   "title": "Hair Serum",
   "band": "starter",
   "dur": "27s",
   "video": "assets/creatives/reels/starter/hair-serum-35.mp4",
   "poster": "assets/creatives/reels/starter/hair-serum-35.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/hair-serum-35.preview.mp4"
  },
  {
   "title": "Hair Shampoo UGC",
   "band": "starter",
   "dur": "20s",
   "video": "assets/creatives/reels/starter/hair-shampoo-ugc-168.mp4",
   "poster": "assets/creatives/reels/starter/hair-shampoo-ugc-168.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter",
    "ugc"
   ],
   "preview": "assets/creatives/reels/starter/hair-shampoo-ugc-168.preview.mp4"
  },
  {
   "title": "Kitchen Grease · Before and After",
   "band": "starter",
   "dur": "29s",
   "video": "assets/creatives/reels/starter/kitchen-grease-before-after-campaign-391.mp4",
   "poster": "assets/creatives/reels/starter/kitchen-grease-before-after-campaign-391.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/kitchen-grease-before-after-campaign-391.preview.mp4"
  },
  {
   "title": "Magic Cloth Stain Remover",
   "band": "starter",
   "dur": "26s",
   "video": "assets/creatives/reels/starter/magic-cloth-stain-remover-404.mp4",
   "poster": "assets/creatives/reels/starter/magic-cloth-stain-remover-404.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/magic-cloth-stain-remover-404.preview.mp4"
  },
  {
   "title": "Rotating Photo Lamp",
   "band": "starter",
   "dur": "23s",
   "video": "assets/creatives/reels/starter/rotating-photo-lamp-305.mp4",
   "poster": "assets/creatives/reels/starter/rotating-photo-lamp-305.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/rotating-photo-lamp-305.preview.mp4"
  },
  {
   "title": "Reaction + Demo Split Screen",
   "band": "starter",
   "dur": "30s",
   "video": "assets/creatives/reels/starter/reaction-demo-split-screen-387.mp4",
   "poster": "assets/creatives/reels/starter/reaction-demo-split-screen-387.jpg",
   "w": 640,
   "h": 1138,
   "lang": "Hindi",
   "tags": [
    "starter",
    "ugc"
   ],
   "preview": "assets/creatives/reels/starter/reaction-demo-split-screen-387.preview.mp4"
  },
  {
   "title": "Root Care Precision Comb",
   "band": "starter",
   "dur": "27s",
   "video": "assets/creatives/reels/starter/root-care-precision-comb-2-351.mp4",
   "poster": "assets/creatives/reels/starter/root-care-precision-comb-2-351.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/root-care-precision-comb-2-351.preview.mp4"
  },
  {
   "title": "Snake Travel Neck Pillow",
   "band": "starter",
   "dur": "29s",
   "video": "assets/creatives/reels/starter/snake-travel-neck-pillow-322.mp4",
   "poster": "assets/creatives/reels/starter/snake-travel-neck-pillow-322.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/snake-travel-neck-pillow-322.preview.mp4"
  },
  {
   "title": "UGC · Nudella Body Glue",
   "band": "starter",
   "dur": "18s",
   "video": "assets/creatives/reels/starter/ugc-nudella-body-glue-130.mp4",
   "poster": "assets/creatives/reels/starter/ugc-nudella-body-glue-130.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter",
    "ugc"
   ],
   "preview": "assets/creatives/reels/starter/ugc-nudella-body-glue-130.preview.mp4"
  },
  {
   "title": "Graha Shakti Ring",
   "band": "starter",
   "dur": "31s",
   "video": "assets/creatives/reels/starter/graha-shakti-ring-249.mp4",
   "poster": "assets/creatives/reels/starter/graha-shakti-ring-249.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/graha-shakti-ring-249.preview.mp4"
  },
  {
   "title": "Handcrafted Girls’ Kidswear",
   "band": "starter",
   "dur": "22s",
   "video": "assets/creatives/reels/starter/handcrafted-girls-kidswear-v2-229.mp4",
   "poster": "assets/creatives/reels/starter/handcrafted-girls-kidswear-v2-229.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/handcrafted-girls-kidswear-v2-229.preview.mp4"
  },
  {
   "title": "Jewellery, Product Focused",
   "band": "starter",
   "dur": "17s",
   "video": "assets/creatives/reels/starter/jewelry-product-focused-159.mp4",
   "poster": "assets/creatives/reels/starter/jewelry-product-focused-159.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/jewelry-product-focused-159.preview.mp4"
  },
  {
   "title": "UGC · Socks, Product Focused",
   "band": "starter",
   "dur": "25s",
   "video": "assets/creatives/reels/starter/ugc-02-socks-product-focused-144.mp4",
   "poster": "assets/creatives/reels/starter/ugc-02-socks-product-focused-144.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter",
    "ugc"
   ],
   "preview": "assets/creatives/reels/starter/ugc-02-socks-product-focused-144.preview.mp4"
  },
  {
   "title": "Any 2 Combos At ₹1099 + Extra ₹100 Off",
   "band": "starter",
   "dur": "24s",
   "video": "assets/creatives/reels/starter/any-2-combos-at-1099-extra-100-off-366.mp4",
   "poster": "assets/creatives/reels/starter/any-2-combos-at-1099-extra-100-off-366.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/any-2-combos-at-1099-extra-100-off-366.preview.mp4"
  },
  {
   "title": "Belt",
   "band": "starter",
   "dur": "23s",
   "video": "assets/creatives/reels/starter/belt-367.mp4",
   "poster": "assets/creatives/reels/starter/belt-367.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/belt-367.preview.mp4"
  },
  {
   "title": "Face Towels Travel Pack of 50",
   "band": "starter",
   "dur": "17s",
   "video": "assets/creatives/reels/starter/face-towels-travel-pack-of-50-362.mp4",
   "poster": "assets/creatives/reels/starter/face-towels-travel-pack-of-50-362.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/face-towels-travel-pack-of-50-362.preview.mp4"
  },
  {
   "title": "Kumkumadi Face Cleanser",
   "band": "starter",
   "dur": "29s",
   "video": "assets/creatives/reels/starter/kumkumadi-face-cleanser-434.mp4",
   "poster": "assets/creatives/reels/starter/kumkumadi-face-cleanser-434.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/kumkumadi-face-cleanser-434.preview.mp4"
  },
  {
   "title": "Our Starter Kit",
   "band": "starter",
   "dur": "25s",
   "video": "assets/creatives/reels/starter/our-starter-kit-347.mp4",
   "poster": "assets/creatives/reels/starter/our-starter-kit-347.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/our-starter-kit-347.preview.mp4"
  },
  {
   "title": "Palazzo Set & Brown Printed",
   "band": "starter",
   "dur": "30s",
   "video": "assets/creatives/reels/starter/palazzo-set-brown-printed-317.mp4",
   "poster": "assets/creatives/reels/starter/palazzo-set-brown-printed-317.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/palazzo-set-brown-printed-317.preview.mp4"
  },
  {
   "title": "Purple Embroidered Anarkali Suit Set",
   "band": "starter",
   "dur": "17s",
   "video": "assets/creatives/reels/starter/purple-embroidered-anarkali-suit-set-343.mp4",
   "poster": "assets/creatives/reels/starter/purple-embroidered-anarkali-suit-set-343.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/purple-embroidered-anarkali-suit-set-343.preview.mp4"
  },
  {
   "title": "iPhone Shockproof Bumper",
   "band": "starter",
   "dur": "17s",
   "video": "assets/creatives/reels/starter/iphone-shockproof-bumper-272.mp4",
   "poster": "assets/creatives/reels/starter/iphone-shockproof-bumper-272.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/iphone-shockproof-bumper-272.preview.mp4"
  },
  {
   "title": "Bracelet",
   "band": "starter",
   "dur": "27s",
   "video": "assets/creatives/reels/starter/bracelet-320.mp4",
   "poster": "assets/creatives/reels/starter/bracelet-320.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/bracelet-320.preview.mp4"
  },
  {
   "title": "Orbit Photo Bracelet",
   "band": "starter",
   "dur": "30s",
   "video": "assets/creatives/reels/starter/orbit-photo-bracelet-304.mp4",
   "poster": "assets/creatives/reels/starter/orbit-photo-bracelet-304.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "starter"
   ],
   "preview": "assets/creatives/reels/starter/orbit-photo-bracelet-304.preview.mp4"
  },
  {
   "title": "Film 01 · Design × Power",
   "band": "standard",
   "dur": "16s",
   "video": "assets/creatives/reels/standard/film-01-design-power.mp4",
   "poster": "assets/creatives/reels/standard/film-01-design-power.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard",
    "film"
   ],
   "preview": "assets/creatives/reels/standard/film-01-design-power.preview.mp4"
  },
  {
   "title": "Film 03 · Design × Real Life",
   "band": "standard",
   "dur": "16s",
   "video": "assets/creatives/reels/standard/film-03-design-real-life.mp4",
   "poster": "assets/creatives/reels/standard/film-03-design-real-life.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard",
    "film"
   ],
   "preview": "assets/creatives/reels/standard/film-03-design-real-life.preview.mp4"
  },
  {
   "title": "Hair Serum & Rosemary Water Combo",
   "band": "standard",
   "dur": "35s",
   "video": "assets/creatives/reels/standard/hair-serum-rosemary-water-combo-46.mp4",
   "poster": "assets/creatives/reels/standard/hair-serum-rosemary-water-combo-46.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/hair-serum-rosemary-water-combo-46.preview.mp4"
  },
  {
   "title": "One Cutter, Three Challenges",
   "band": "standard",
   "dur": "30s",
   "video": "assets/creatives/reels/standard/ek-cutter-3-challenge-415.mp4",
   "poster": "assets/creatives/reels/standard/ek-cutter-3-challenge-415.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/ek-cutter-3-challenge-415.preview.mp4"
  },
  {
   "title": "Emerald Halo Bangle",
   "band": "standard",
   "dur": "32s",
   "video": "assets/creatives/reels/standard/emerald-halo-bangle-298.mp4",
   "poster": "assets/creatives/reels/standard/emerald-halo-bangle-298.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/emerald-halo-bangle-298.preview.mp4"
  },
  {
   "title": "Lunara Lavender Mist Lapel Collar Shirt",
   "band": "standard",
   "dur": "30s",
   "video": "assets/creatives/reels/standard/lunara-lavender-mist-lapel-collar-shirt-421.mp4",
   "poster": "assets/creatives/reels/standard/lunara-lavender-mist-lapel-collar-shirt-421.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/lunara-lavender-mist-lapel-collar-shirt-421.preview.mp4"
  },
  {
   "title": "Orange Embroidered Silk Anarkali",
   "band": "standard",
   "dur": "32s",
   "video": "assets/creatives/reels/standard/orange-embroidered-silk-anarkali-307.mp4",
   "poster": "assets/creatives/reels/standard/orange-embroidered-silk-anarkali-307.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/orange-embroidered-silk-anarkali-307.preview.mp4"
  },
  {
   "title": "Short Kurta",
   "band": "standard",
   "dur": "28s",
   "video": "assets/creatives/reels/standard/short-kurta-359.mp4",
   "poster": "assets/creatives/reels/standard/short-kurta-359.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/short-kurta-359.preview.mp4"
  },
  {
   "title": "UGC · Whitening Toothpaste Result",
   "band": "standard",
   "dur": "29s",
   "video": "assets/creatives/reels/standard/ugc-result-v2-whitening-toothpaste-94.mp4",
   "poster": "assets/creatives/reels/standard/ugc-result-v2-whitening-toothpaste-94.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard",
    "ugc"
   ],
   "preview": "assets/creatives/reels/standard/ugc-result-v2-whitening-toothpaste-94.preview.mp4"
  },
  {
   "title": "Wrinkle & Fine Line Smoothing",
   "band": "standard",
   "dur": "29s",
   "video": "assets/creatives/reels/standard/v01-wrinkle-fine-line-smoothing-new-269.mp4",
   "poster": "assets/creatives/reels/standard/v01-wrinkle-fine-line-smoothing-new-269.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/v01-wrinkle-fine-line-smoothing-new-269.preview.mp4"
  },
  {
   "title": "Voicy Lamp",
   "band": "standard",
   "dur": "32s",
   "video": "assets/creatives/reels/standard/voicy-lamp-us-based-01-331.mp4",
   "poster": "assets/creatives/reels/standard/voicy-lamp-us-based-01-331.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/voicy-lamp-us-based-01-331.preview.mp4"
  },
  {
   "title": "Branding & Production · India",
   "band": "standard",
   "dur": "30s",
   "video": "assets/creatives/reels/standard/branding-production-india-428.mp4",
   "poster": "assets/creatives/reels/standard/branding-production-india-428.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard",
    "film"
   ],
   "preview": "assets/creatives/reels/standard/branding-production-india-428.preview.mp4"
  },
  {
   "title": "Clutch Collection",
   "band": "standard",
   "dur": "23s",
   "video": "assets/creatives/reels/standard/clutch-collection-85.mp4",
   "poster": "assets/creatives/reels/standard/clutch-collection-85.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/clutch-collection-85.preview.mp4"
  },
  {
   "title": "Complete Phone Kit · Cross Sell Campaign",
   "band": "standard",
   "dur": "21s",
   "video": "assets/creatives/reels/standard/complete-phone-kit-cross-sell-campaign-406.mp4",
   "poster": "assets/creatives/reels/standard/complete-phone-kit-cross-sell-campaign-406.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/complete-phone-kit-cross-sell-campaign-406.preview.mp4"
  },
  {
   "title": "Hoodies & Sweatpants",
   "band": "standard",
   "dur": "38s",
   "video": "assets/creatives/reels/standard/hoodies-sweatpants-131.mp4",
   "poster": "assets/creatives/reels/standard/hoodies-sweatpants-131.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/hoodies-sweatpants-131.preview.mp4"
  },
  {
   "title": "Kurta Collection 4",
   "band": "standard",
   "dur": "32s",
   "video": "assets/creatives/reels/standard/kurta-collection-4-242.mp4",
   "poster": "assets/creatives/reels/standard/kurta-collection-4-242.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/kurta-collection-4-242.preview.mp4"
  },
  {
   "title": "Om3ga Action Capture Vest",
   "band": "standard",
   "dur": "27s",
   "video": "assets/creatives/reels/standard/om3ga-action-capture-vest-316.mp4",
   "poster": "assets/creatives/reels/standard/om3ga-action-capture-vest-316.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/om3ga-action-capture-vest-316.preview.mp4"
  },
  {
   "title": "Pet Embroidered Sweatshirt with Name · Varsity",
   "band": "standard",
   "dur": "39s",
   "video": "assets/creatives/reels/standard/pet-embroidered-sweatshirt-with-name-varsity-246.mp4",
   "poster": "assets/creatives/reels/standard/pet-embroidered-sweatshirt-with-name-varsity-246.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/pet-embroidered-sweatshirt-with-name-varsity-246.preview.mp4"
  },
  {
   "title": "Price Shock Urgency Campaign",
   "band": "standard",
   "dur": "14s",
   "video": "assets/creatives/reels/standard/price-shock-urgency-campaign-405.mp4",
   "poster": "assets/creatives/reels/standard/price-shock-urgency-campaign-405.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/price-shock-urgency-campaign-405.preview.mp4"
  },
  {
   "title": "Tatva Room Freshener",
   "band": "standard",
   "dur": "30s",
   "video": "assets/creatives/reels/standard/tatva-room-freshener-197.mp4",
   "poster": "assets/creatives/reels/standard/tatva-room-freshener-197.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/tatva-room-freshener-197.preview.mp4"
  },
  {
   "title": "UGC · Bracelet · Rakhi",
   "band": "standard",
   "dur": "32s",
   "video": "assets/creatives/reels/standard/ugc-braclet-rakhi-102.mp4",
   "poster": "assets/creatives/reels/standard/ugc-braclet-rakhi-102.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard",
    "ugc"
   ],
   "preview": "assets/creatives/reels/standard/ugc-braclet-rakhi-102.preview.mp4"
  },
  {
   "title": "UGC · Grin10",
   "band": "standard",
   "dur": "28s",
   "video": "assets/creatives/reels/standard/ugc-grin10-122.mp4",
   "poster": "assets/creatives/reels/standard/ugc-grin10-122.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard",
    "ugc"
   ],
   "preview": "assets/creatives/reels/standard/ugc-grin10-122.preview.mp4"
  },
  {
   "title": "Zedd Studios T-shirt",
   "band": "standard",
   "dur": "24s",
   "video": "assets/creatives/reels/standard/zedd-studios-t-shirt-shirt-315.mp4",
   "poster": "assets/creatives/reels/standard/zedd-studios-t-shirt-shirt-315.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/zedd-studios-t-shirt-shirt-315.preview.mp4"
  },
  {
   "title": "Z Plus · LPG Gas Safety",
   "band": "standard",
   "dur": "37s",
   "video": "assets/creatives/reels/standard/z-plus-lpg-gas-safety-358.mp4",
   "poster": "assets/creatives/reels/standard/z-plus-lpg-gas-safety-358.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/z-plus-lpg-gas-safety-358.preview.mp4"
  },
  {
   "title": "Bang Bang",
   "band": "standard",
   "dur": "39s",
   "video": "assets/creatives/reels/standard/bang-bang-70.mp4",
   "poster": "assets/creatives/reels/standard/bang-bang-70.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/bang-bang-70.preview.mp4"
  },
  {
   "title": "Royal Invite & Brunch",
   "band": "standard",
   "dur": "35s",
   "video": "assets/creatives/reels/standard/royal-invite-brunch-2-308.mp4",
   "poster": "assets/creatives/reels/standard/royal-invite-brunch-2-308.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/royal-invite-brunch-2-308.preview.mp4"
  },
  {
   "title": "Antiyellow Durability",
   "band": "standard",
   "dur": "14s",
   "video": "assets/creatives/reels/standard/antiyellow-durability-409.mp4",
   "poster": "assets/creatives/reels/standard/antiyellow-durability-409.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/antiyellow-durability-409.preview.mp4"
  },
  {
   "title": "Comfort Cushion",
   "band": "standard",
   "dur": "25s",
   "video": "assets/creatives/reels/standard/comfort-cushion-v05-433.mp4",
   "poster": "assets/creatives/reels/standard/comfort-cushion-v05-433.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/comfort-cushion-v05-433.preview.mp4"
  },
  {
   "title": "Dangling Blades · Statement Earrings",
   "band": "standard",
   "dur": "26s",
   "video": "assets/creatives/reels/standard/dangling-blades-statement-earrings-400.mp4",
   "poster": "assets/creatives/reels/standard/dangling-blades-statement-earrings-400.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/dangling-blades-statement-earrings-400.preview.mp4"
  },
  {
   "title": "Enerweiz Garba",
   "band": "standard",
   "dur": "32s",
   "video": "assets/creatives/reels/standard/enerweiz-garba-384.mp4",
   "poster": "assets/creatives/reels/standard/enerweiz-garba-384.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/enerweiz-garba-384.preview.mp4"
  },
  {
   "title": "Face Towels Travel Pack of 50 · Cut 2",
   "band": "standard",
   "dur": "24s",
   "video": "assets/creatives/reels/standard/face-towels-travel-pack-of-50-v2-363.mp4",
   "poster": "assets/creatives/reels/standard/face-towels-travel-pack-of-50-v2-363.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/face-towels-travel-pack-of-50-v2-363.preview.mp4"
  },
  {
   "title": "Green Stripe Boys Jogger Pajama Set",
   "band": "standard",
   "dur": "20s",
   "video": "assets/creatives/reels/standard/green-stripe-boys-jogger-pajama-set-371.mp4",
   "poster": "assets/creatives/reels/standard/green-stripe-boys-jogger-pajama-set-371.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/green-stripe-boys-jogger-pajama-set-371.preview.mp4"
  },
  {
   "title": "Jewellery Box",
   "band": "standard",
   "dur": "32s",
   "video": "assets/creatives/reels/standard/jewelry-box-1-230.mp4",
   "poster": "assets/creatives/reels/standard/jewelry-box-1-230.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/jewelry-box-1-230.preview.mp4"
  },
  {
   "title": "Polo T-shirt",
   "band": "standard",
   "dur": "30s",
   "video": "assets/creatives/reels/standard/polo-tshirt-368.mp4",
   "poster": "assets/creatives/reels/standard/polo-tshirt-368.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/polo-tshirt-368.preview.mp4"
  },
  {
   "title": "The Nutritionist's Pick",
   "band": "standard",
   "dur": "29s",
   "video": "assets/creatives/reels/standard/the-nutritionist-s-357.mp4",
   "poster": "assets/creatives/reels/standard/the-nutritionist-s-357.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/the-nutritionist-s-357.preview.mp4"
  },
  {
   "title": "Tulsi Pot",
   "band": "standard",
   "dur": "32s",
   "video": "assets/creatives/reels/standard/tulsi-pot-335.mp4",
   "poster": "assets/creatives/reels/standard/tulsi-pot-335.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/tulsi-pot-335.preview.mp4"
  },
  {
   "title": "Veymont Obsidian Black",
   "band": "standard",
   "dur": "29s",
   "video": "assets/creatives/reels/standard/veymont-obsidian-black-398.mp4",
   "poster": "assets/creatives/reels/standard/veymont-obsidian-black-398.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/veymont-obsidian-black-398.preview.mp4"
  },
  {
   "title": "Vivienne Midnight Glow Maxi Dress",
   "band": "standard",
   "dur": "29s",
   "video": "assets/creatives/reels/standard/vivienne-midnight-glow-maxi-dress-v2-419.mp4",
   "poster": "assets/creatives/reels/standard/vivienne-midnight-glow-maxi-dress-v2-419.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/vivienne-midnight-glow-maxi-dress-v2-419.preview.mp4"
  },
  {
   "title": "Abeer's Melon Bliss Lip Balm",
   "band": "standard",
   "dur": "24s",
   "video": "assets/creatives/reels/standard/abeers-melon-bliss-lip-balm-382.mp4",
   "poster": "assets/creatives/reels/standard/abeers-melon-bliss-lip-balm-382.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/abeers-melon-bliss-lip-balm-382.preview.mp4"
  },
  {
   "title": "Try Before You Buy",
   "band": "standard",
   "dur": "34s",
   "video": "assets/creatives/reels/standard/try-before-you-buy-396.mp4",
   "poster": "assets/creatives/reels/standard/try-before-you-buy-396.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard",
    "ugc"
   ],
   "preview": "assets/creatives/reels/standard/try-before-you-buy-396.preview.mp4"
  },
  {
   "title": "Women's Brown Georgette Split Set",
   "band": "standard",
   "dur": "35s",
   "video": "assets/creatives/reels/standard/women-s-brown-georgette-split-364.mp4",
   "poster": "assets/creatives/reels/standard/women-s-brown-georgette-split-364.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/reels/standard/women-s-brown-georgette-split-364.preview.mp4"
  },
  {
   "title": "PVC Foldable Transparent Storage Box",
   "band": "popular",
   "dur": "37s",
   "video": "assets/creatives/reels/popular/01-pvc-foldable-transparent-storage-box-311.mp4",
   "poster": "assets/creatives/reels/popular/01-pvc-foldable-transparent-storage-box-311.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular"
   ],
   "preview": "assets/creatives/reels/popular/01-pvc-foldable-transparent-storage-box-311.preview.mp4"
  },
  {
   "title": "ABC Combo",
   "band": "popular",
   "dur": "24s",
   "video": "assets/creatives/reels/popular/abc-combo-sra1552-1-1552.mp4",
   "poster": "assets/creatives/reels/popular/abc-combo-sra1552-1-1552.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular"
   ],
   "preview": "assets/creatives/reels/popular/abc-combo-sra1552-1-1552.preview.mp4"
  },
  {
   "title": "Animated Film · English Script",
   "band": "popular",
   "dur": "51s",
   "video": "assets/creatives/reels/popular/animated-video-english-script-1660.mp4",
   "poster": "assets/creatives/reels/popular/animated-video-english-script-1660.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular",
    "film"
   ],
   "preview": "assets/creatives/reels/popular/animated-video-english-script-1660.preview.mp4"
  },
  {
   "title": "Dulha Ghar Party Theme",
   "band": "popular",
   "dur": "26s",
   "video": "assets/creatives/reels/popular/dulha-ghar-party-theme-08.mp4",
   "poster": "assets/creatives/reels/popular/dulha-ghar-party-theme-08.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular"
   ],
   "preview": "assets/creatives/reels/popular/dulha-ghar-party-theme-08.preview.mp4"
  },
  {
   "title": "Duo Day & Night · Fun Content",
   "band": "popular",
   "dur": "30s",
   "video": "assets/creatives/reels/popular/duo-day-night-fun-content-1552.mp4",
   "poster": "assets/creatives/reels/popular/duo-day-night-fun-content-1552.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular"
   ],
   "preview": "assets/creatives/reels/popular/duo-day-night-fun-content-1552.preview.mp4"
  },
  {
   "title": "Matri Pro",
   "band": "popular",
   "dur": "27s",
   "video": "assets/creatives/reels/popular/matri-pro-198.mp4",
   "poster": "assets/creatives/reels/popular/matri-pro-198.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular"
   ],
   "preview": "assets/creatives/reels/popular/matri-pro-198.preview.mp4"
  },
  {
   "title": "One Touch Airtight Containers · Set of 6",
   "band": "popular",
   "dur": "32s",
   "video": "assets/creatives/reels/popular/one-touch-airtight-containers-set-of-6-321.mp4",
   "poster": "assets/creatives/reels/popular/one-touch-airtight-containers-set-of-6-321.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular"
   ],
   "preview": "assets/creatives/reels/popular/one-touch-airtight-containers-set-of-6-321.preview.mp4"
  },
  {
   "title": "PCOS · A Day in the Life of An Ovary",
   "band": "popular",
   "dur": "31s",
   "video": "assets/creatives/reels/popular/pcos-a-day-in-the-life-of-an-ovary-349.mp4",
   "poster": "assets/creatives/reels/popular/pcos-a-day-in-the-life-of-an-ovary-349.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular"
   ],
   "preview": "assets/creatives/reels/popular/pcos-a-day-in-the-life-of-an-ovary-349.preview.mp4"
  },
  {
   "title": "Acne Patch",
   "band": "popular",
   "dur": "34s",
   "video": "assets/creatives/reels/popular/acne-patch-266.mp4",
   "poster": "assets/creatives/reels/popular/acne-patch-266.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular"
   ],
   "preview": "assets/creatives/reels/popular/acne-patch-266.preview.mp4"
  },
  {
   "title": "Boheme Bloom Kimono Mini Dress",
   "band": "popular",
   "dur": "31s",
   "video": "assets/creatives/reels/popular/boheme-bloom-kimono-mini-dress-393.mp4",
   "poster": "assets/creatives/reels/popular/boheme-bloom-kimono-mini-dress-393.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular"
   ],
   "preview": "assets/creatives/reels/popular/boheme-bloom-kimono-mini-dress-393.preview.mp4"
  },
  {
   "title": "Butterfly Cervical Neck Pillow",
   "band": "popular",
   "dur": "34s",
   "video": "assets/creatives/reels/popular/butterfly-cervical-neck-pillow-323.mp4",
   "poster": "assets/creatives/reels/popular/butterfly-cervical-neck-pillow-323.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular"
   ],
   "preview": "assets/creatives/reels/popular/butterfly-cervical-neck-pillow-323.preview.mp4"
  },
  {
   "title": "Comfort Cushion · Cut 2",
   "band": "popular",
   "dur": "35s",
   "video": "assets/creatives/reels/popular/comfort-cushion-v2-380.mp4",
   "poster": "assets/creatives/reels/popular/comfort-cushion-v2-380.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular"
   ],
   "preview": "assets/creatives/reels/popular/comfort-cushion-v2-380.preview.mp4"
  },
  {
   "title": "Coral Candy Boho Mini Dress",
   "band": "popular",
   "dur": "32s",
   "video": "assets/creatives/reels/popular/coral-candy-boho-mini-dress-394.mp4",
   "poster": "assets/creatives/reels/popular/coral-candy-boho-mini-dress-394.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular"
   ],
   "preview": "assets/creatives/reels/popular/coral-candy-boho-mini-dress-394.preview.mp4"
  },
  {
   "title": "Grime Monster vs Kleenest Hero · AI VFX Battle Campaign",
   "band": "popular",
   "dur": "32s",
   "video": "assets/creatives/reels/popular/grime-monster-vs-kleenest-hero-ai-vfx-battle-campaign-390.mp4",
   "poster": "assets/creatives/reels/popular/grime-monster-vs-kleenest-hero-ai-vfx-battle-campaign-390.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular",
    "film"
   ],
   "preview": "assets/creatives/reels/popular/grime-monster-vs-kleenest-hero-ai-vfx-battle-campaign-390.preview.mp4"
  },
  {
   "title": "Mamansh Kids Shampoo",
   "band": "popular",
   "dur": "30s",
   "video": "assets/creatives/reels/popular/mamansh-kids-shampoo-327.mp4",
   "poster": "assets/creatives/reels/popular/mamansh-kids-shampoo-327.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular"
   ],
   "preview": "assets/creatives/reels/popular/mamansh-kids-shampoo-327.preview.mp4"
  },
  {
   "title": "UGC · Perfume Men Preview",
   "band": "popular",
   "dur": "44s",
   "video": "assets/creatives/reels/popular/ugc-perfume-men-preview-100.mp4",
   "poster": "assets/creatives/reels/popular/ugc-perfume-men-preview-100.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular",
    "ugc"
   ],
   "preview": "assets/creatives/reels/popular/ugc-perfume-men-preview-100.preview.mp4"
  },
  {
   "title": "Young Aura · Cartoonistic",
   "band": "popular",
   "dur": "41s",
   "video": "assets/creatives/reels/popular/young-aura-cartoonistic-2192.mp4",
   "poster": "assets/creatives/reels/popular/young-aura-cartoonistic-2192.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular",
    "film"
   ],
   "preview": "assets/creatives/reels/popular/young-aura-cartoonistic-2192.preview.mp4"
  },
  {
   "title": "Pookie Pet Collection",
   "band": "popular",
   "dur": "46s",
   "video": "assets/creatives/reels/popular/pookie-pet-collection-75.mp4",
   "poster": "assets/creatives/reels/popular/pookie-pet-collection-75.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular"
   ],
   "preview": "assets/creatives/reels/popular/pookie-pet-collection-75.preview.mp4"
  },
  {
   "title": "Black Beast",
   "band": "popular",
   "dur": "34s",
   "video": "assets/creatives/reels/popular/black-beast-72.mp4",
   "poster": "assets/creatives/reels/popular/black-beast-72.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular"
   ],
   "preview": "assets/creatives/reels/popular/black-beast-72.preview.mp4"
  },
  {
   "title": "UGC Enerweiz",
   "band": "popular",
   "dur": "30s",
   "video": "assets/creatives/reels/popular/ugc-enerweiz-236.mp4",
   "poster": "assets/creatives/reels/popular/ugc-enerweiz-236.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular",
    "ugc"
   ],
   "preview": "assets/creatives/reels/popular/ugc-enerweiz-236.preview.mp4"
  },
  {
   "title": "Vivienne Midnight Glow Maxi Dress · Cut 2",
   "band": "popular",
   "dur": "27s",
   "video": "assets/creatives/reels/popular/vivienne-midnight-glow-maxi-dress-366.mp4",
   "poster": "assets/creatives/reels/popular/vivienne-midnight-glow-maxi-dress-366.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "popular"
   ],
   "preview": "assets/creatives/reels/popular/vivienne-midnight-glow-maxi-dress-366.preview.mp4"
  },
  {
   "title": "Floral Grace Padded Bag Preview",
   "band": "premium",
   "dur": "44s",
   "video": "assets/creatives/reels/premium/floral-grace-padded-bag-preview-383.mp4",
   "poster": "assets/creatives/reels/premium/floral-grace-padded-bag-preview-383.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium"
   ],
   "preview": "assets/creatives/reels/premium/floral-grace-padded-bag-preview-383.preview.mp4"
  },
  {
   "title": "Mamansh Ultimate Shampoo & Conditioner",
   "band": "premium",
   "dur": "36s",
   "video": "assets/creatives/reels/premium/mamansh-ultimate-shampoo-conditioner-392.mp4",
   "poster": "assets/creatives/reels/premium/mamansh-ultimate-shampoo-conditioner-392.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium"
   ],
   "preview": "assets/creatives/reels/premium/mamansh-ultimate-shampoo-conditioner-392.preview.mp4"
  },
  {
   "title": "PCOS · Body Group Chat",
   "band": "premium",
   "dur": "45s",
   "video": "assets/creatives/reels/premium/pcos-body-group-chat-348.mp4",
   "poster": "assets/creatives/reels/premium/pcos-body-group-chat-348.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium"
   ],
   "preview": "assets/creatives/reels/premium/pcos-body-group-chat-348.preview.mp4"
  },
  {
   "title": "Long Shirts",
   "band": "premium",
   "dur": "32s",
   "video": "assets/creatives/reels/premium/long-shirts-91.mp4",
   "poster": "assets/creatives/reels/premium/long-shirts-91.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium"
   ],
   "preview": "assets/creatives/reels/premium/long-shirts-91.preview.mp4"
  },
  {
   "title": "PCOS UGC",
   "band": "premium",
   "dur": "29s",
   "video": "assets/creatives/reels/premium/pcos-ugc-271.mp4",
   "poster": "assets/creatives/reels/premium/pcos-ugc-271.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium",
    "ugc"
   ],
   "preview": "assets/creatives/reels/premium/pcos-ugc-271.preview.mp4"
  },
  {
   "title": "Freshness · Cartoon Character",
   "band": "premium",
   "dur": "39s",
   "video": "assets/creatives/reels/premium/2-freshness-cartoon-character-292.mp4",
   "poster": "assets/creatives/reels/premium/2-freshness-cartoon-character-292.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium",
    "film"
   ],
   "preview": "assets/creatives/reels/premium/2-freshness-cartoon-character-292.preview.mp4"
  },
  {
   "title": "Cartoon Character Film",
   "band": "premium",
   "dur": "31s",
   "video": "assets/creatives/reels/premium/video1-export-cartoon-charcter-291.mp4",
   "poster": "assets/creatives/reels/premium/video1-export-cartoon-charcter-291.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium",
    "film"
   ],
   "preview": "assets/creatives/reels/premium/video1-export-cartoon-charcter-291.preview.mp4"
  },
  {
   "title": "Kadak · Cartoon Character and Human",
   "band": "premium",
   "dur": "39s",
   "video": "assets/creatives/reels/premium/video3-kadak-cartoon-charcter-human-293.mp4",
   "poster": "assets/creatives/reels/premium/video3-kadak-cartoon-charcter-human-293.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium",
    "film"
   ],
   "preview": "assets/creatives/reels/premium/video3-kadak-cartoon-charcter-human-293.preview.mp4"
  },
  {
   "title": "Viral Characters · Nilini",
   "band": "premium",
   "dur": "44s",
   "video": "assets/creatives/reels/premium/viral-characters-nilini-1856.mp4",
   "poster": "assets/creatives/reels/premium/viral-characters-nilini-1856.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium",
    "film"
   ],
   "preview": "assets/creatives/reels/premium/viral-characters-nilini-1856.preview.mp4"
  }
 ],
 "catalogue": [
  {
   "title": "Adored 360",
   "band": "standard",
   "dur": "17s",
   "video": "assets/creatives/catalogue/standard/adored-360-255.mp4",
   "poster": "assets/creatives/catalogue/standard/adored-360-255.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/adored-360-255.preview.mp4"
  },
  {
   "title": "Devotee Watch",
   "band": "standard",
   "dur": "19s",
   "video": "assets/creatives/catalogue/standard/devotee-watch-374.mp4",
   "poster": "assets/creatives/catalogue/standard/devotee-watch-374.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/devotee-watch-374.preview.mp4"
  },
  {
   "title": "Frame",
   "band": "standard",
   "dur": "17s",
   "video": "assets/creatives/catalogue/standard/frame-55.mp4",
   "poster": "assets/creatives/catalogue/standard/frame-55.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/frame-55.preview.mp4"
  },
  {
   "title": "Kumkumadi Thailam Face Oil",
   "band": "standard",
   "dur": "17s",
   "video": "assets/creatives/catalogue/standard/kumkumadi-thailam-face-oil-412.mp4",
   "poster": "assets/creatives/catalogue/standard/kumkumadi-thailam-face-oil-412.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/kumkumadi-thailam-face-oil-412.preview.mp4"
  },
  {
   "title": "Orbis Collection",
   "band": "standard",
   "dur": "18s",
   "video": "assets/creatives/catalogue/standard/orbis-collection-2-319.mp4",
   "poster": "assets/creatives/catalogue/standard/orbis-collection-2-319.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/orbis-collection-2-319.preview.mp4"
  },
  {
   "title": "Pyrite Tortoise",
   "band": "standard",
   "dur": "20s",
   "video": "assets/creatives/catalogue/standard/pyrite-tortoise-56.mp4",
   "poster": "assets/creatives/catalogue/standard/pyrite-tortoise-56.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/pyrite-tortoise-56.preview.mp4"
  },
  {
   "title": "Shahi Pure Copper Water Bottle with Glass",
   "band": "standard",
   "dur": "16s",
   "video": "assets/creatives/catalogue/standard/shahi-pure-copper-water-bottle-with-glass-194.mp4",
   "poster": "assets/creatives/catalogue/standard/shahi-pure-copper-water-bottle-with-glass-194.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/shahi-pure-copper-water-bottle-with-glass-194.preview.mp4"
  },
  {
   "title": "Sky Blue Fandy Silk Embroidered Sharara Set",
   "band": "standard",
   "dur": "18s",
   "video": "assets/creatives/catalogue/standard/sky-blue-fandy-silk-embroidered-sharara-set-345.mp4",
   "poster": "assets/creatives/catalogue/standard/sky-blue-fandy-silk-embroidered-sharara-set-345.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/sky-blue-fandy-silk-embroidered-sharara-set-345.preview.mp4"
  },
  {
   "title": "Tiger Eye Crystal Ganesh Ji",
   "band": "standard",
   "dur": "16s",
   "video": "assets/creatives/catalogue/standard/tiger-eye-crystal-ganesh-ji-277.mp4",
   "poster": "assets/creatives/catalogue/standard/tiger-eye-crystal-ganesh-ji-277.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/tiger-eye-crystal-ganesh-ji-277.preview.mp4"
  },
  {
   "title": "Anti Hair Fall Hair Care Combo",
   "band": "standard",
   "dur": "17s",
   "video": "assets/creatives/catalogue/standard/anti-hair-fall-hair-care-combo-413.mp4",
   "poster": "assets/creatives/catalogue/standard/anti-hair-fall-hair-care-combo-413.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/anti-hair-fall-hair-care-combo-413.preview.mp4"
  },
  {
   "title": "Brass 3 Tier Tiffin",
   "band": "standard",
   "dur": "22s",
   "video": "assets/creatives/catalogue/standard/brass-3-tier-tiffin-158.mp4",
   "poster": "assets/creatives/catalogue/standard/brass-3-tier-tiffin-158.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/brass-3-tier-tiffin-158.preview.mp4"
  },
  {
   "title": "Copper Water Bottle",
   "band": "standard",
   "dur": "15s",
   "video": "assets/creatives/catalogue/standard/copper-water-bottle-155.mp4",
   "poster": "assets/creatives/catalogue/standard/copper-water-bottle-155.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/copper-water-bottle-155.preview.mp4"
  },
  {
   "title": "Royal Hammered Handi",
   "band": "standard",
   "dur": "15s",
   "video": "assets/creatives/catalogue/standard/royal-hammered-handi-156.mp4",
   "poster": "assets/creatives/catalogue/standard/royal-hammered-handi-156.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/royal-hammered-handi-156.preview.mp4"
  },
  {
   "title": "Recliner Manual Sofa",
   "band": "standard",
   "dur": "17s",
   "video": "assets/creatives/catalogue/standard/recliner-manual-sofa-300.mp4",
   "poster": "assets/creatives/catalogue/standard/recliner-manual-sofa-300.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/recliner-manual-sofa-300.preview.mp4"
  },
  {
   "title": "Orbis Collection · Cut 2",
   "band": "standard",
   "dur": "15s",
   "video": "assets/creatives/catalogue/standard/orbis-collection-283.mp4",
   "poster": "assets/creatives/catalogue/standard/orbis-collection-283.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/orbis-collection-283.preview.mp4"
  },
  {
   "title": "4-Seater Sofa Cum Bed, Rhombus Pattern",
   "band": "standard",
   "dur": "16s",
   "video": "assets/creatives/catalogue/standard/4-seater-sofa-cum-bed-rhombus-pattern-302.mp4",
   "poster": "assets/creatives/catalogue/standard/4-seater-sofa-cum-bed-rhombus-pattern-302.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/4-seater-sofa-cum-bed-rhombus-pattern-302.preview.mp4"
  },
  {
   "title": "Ring 14k White Gold Plated",
   "band": "standard",
   "dur": "16s",
   "video": "assets/creatives/catalogue/standard/ring-14k-white-gold-plated-352.mp4",
   "poster": "assets/creatives/catalogue/standard/ring-14k-white-gold-plated-352.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/ring-14k-white-gold-plated-352.preview.mp4"
  },
  {
   "title": "Aloe Gentle Face Cleanser",
   "band": "standard",
   "dur": "17s",
   "video": "assets/creatives/catalogue/standard/aloe-gentle-face-cleanser-411.mp4",
   "poster": "assets/creatives/catalogue/standard/aloe-gentle-face-cleanser-411.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/aloe-gentle-face-cleanser-411.preview.mp4"
  },
  {
   "title": "Divine Combo Pack Material",
   "band": "standard",
   "dur": "16s",
   "video": "assets/creatives/catalogue/standard/divine-combo-pack-material-276.mp4",
   "poster": "assets/creatives/catalogue/standard/divine-combo-pack-material-276.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/divine-combo-pack-material-276.preview.mp4"
  },
  {
   "title": "Duffle Bag",
   "band": "standard",
   "dur": "16s",
   "video": "assets/creatives/catalogue/standard/duffle-bag-1-442.mp4",
   "poster": "assets/creatives/catalogue/standard/duffle-bag-1-442.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/duffle-bag-1-442.preview.mp4"
  },
  {
   "title": "Jeera",
   "band": "standard",
   "dur": "15s",
   "video": "assets/creatives/catalogue/standard/jeera-410.mp4",
   "poster": "assets/creatives/catalogue/standard/jeera-410.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/jeera-410.preview.mp4"
  },
  {
   "title": "Om3ga Action Capture Vest",
   "band": "standard",
   "dur": "16s",
   "video": "assets/creatives/catalogue/standard/om3ga-action-capture-vest-01-422.mp4",
   "poster": "assets/creatives/catalogue/standard/om3ga-action-capture-vest-01-422.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/om3ga-action-capture-vest-01-422.preview.mp4"
  },
  {
   "title": "Velvet Suede Fabric",
   "band": "standard",
   "dur": "16s",
   "video": "assets/creatives/catalogue/standard/velvet-suede-fabric-3-1-1-301.mp4",
   "poster": "assets/creatives/catalogue/standard/velvet-suede-fabric-3-1-1-301.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/velvet-suede-fabric-3-1-1-301.preview.mp4"
  },
  {
   "title": "Veymont Obsidian Black",
   "band": "standard",
   "dur": "17s",
   "video": "assets/creatives/catalogue/standard/veymont-obsidian-black-378.mp4",
   "poster": "assets/creatives/catalogue/standard/veymont-obsidian-black-378.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/veymont-obsidian-black-378.preview.mp4"
  },
  {
   "title": "Wine Noor Chanderi Suit Set",
   "band": "standard",
   "dur": "17s",
   "video": "assets/creatives/catalogue/standard/wine-noor-chanderi-suit-set-344.mp4",
   "poster": "assets/creatives/catalogue/standard/wine-noor-chanderi-suit-set-344.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "standard"
   ],
   "preview": "assets/creatives/catalogue/standard/wine-noor-chanderi-suit-set-344.preview.mp4"
  },
  {
   "title": "3D Motion",
   "band": "premium",
   "dur": "16s",
   "video": "assets/creatives/catalogue/premium/3d-motion-446.mp4",
   "poster": "assets/creatives/catalogue/premium/3d-motion-446.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium"
   ],
   "preview": "assets/creatives/catalogue/premium/3d-motion-446.preview.mp4"
  },
  {
   "title": "Aurex",
   "band": "premium",
   "dur": "17s",
   "video": "assets/creatives/catalogue/premium/aurex-37.mp4",
   "poster": "assets/creatives/catalogue/premium/aurex-37.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium"
   ],
   "preview": "assets/creatives/catalogue/premium/aurex-37.preview.mp4"
  },
  {
   "title": "Bang Bang",
   "band": "premium",
   "dur": "16s",
   "video": "assets/creatives/catalogue/premium/bang-bang-71.mp4",
   "poster": "assets/creatives/catalogue/premium/bang-bang-71.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium"
   ],
   "preview": "assets/creatives/catalogue/premium/bang-bang-71.preview.mp4"
  },
  {
   "title": "Brown Shoe",
   "band": "premium",
   "dur": "17s",
   "video": "assets/creatives/catalogue/premium/brown-shoe-213.mp4",
   "poster": "assets/creatives/catalogue/premium/brown-shoe-213.jpg",
   "w": 640,
   "h": 1139,
   "tags": [
    "premium"
   ],
   "preview": "assets/creatives/catalogue/premium/brown-shoe-213.preview.mp4"
  },
  {
   "title": "Product Motion Film",
   "band": "premium",
   "dur": "14s",
   "video": "assets/creatives/catalogue/premium/product-motion-video-49.mp4",
   "poster": "assets/creatives/catalogue/premium/product-motion-video-49.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium"
   ],
   "preview": "assets/creatives/catalogue/premium/product-motion-video-49.preview.mp4"
  },
  {
   "title": "Pulga Legacy",
   "band": "premium",
   "dur": "20s",
   "video": "assets/creatives/catalogue/premium/pulga-legacy-86.mp4",
   "poster": "assets/creatives/catalogue/premium/pulga-legacy-86.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium"
   ],
   "preview": "assets/creatives/catalogue/premium/pulga-legacy-86.preview.mp4"
  },
  {
   "title": "Limited Uniq · Spider",
   "band": "premium",
   "dur": "21s",
   "video": "assets/creatives/catalogue/premium/thelimiteduniq-spider-337.mp4",
   "poster": "assets/creatives/catalogue/premium/thelimiteduniq-spider-337.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium"
   ],
   "preview": "assets/creatives/catalogue/premium/thelimiteduniq-spider-337.preview.mp4"
  },
  {
   "title": "LED Table Lamp",
   "band": "premium",
   "dur": "17s",
   "video": "assets/creatives/catalogue/premium/led-table-lamp-79.mp4",
   "poster": "assets/creatives/catalogue/premium/led-table-lamp-79.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium"
   ],
   "preview": "assets/creatives/catalogue/premium/led-table-lamp-79.preview.mp4"
  },
  {
   "title": "Lip Balm",
   "band": "premium",
   "dur": "18s",
   "video": "assets/creatives/catalogue/premium/lip-balm-10180x1920-435.mp4",
   "poster": "assets/creatives/catalogue/premium/lip-balm-10180x1920-435.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium"
   ],
   "preview": "assets/creatives/catalogue/premium/lip-balm-10180x1920-435.preview.mp4"
  },
  {
   "title": "Savanna Dualgrip Edition Socks",
   "band": "premium",
   "dur": "15s",
   "video": "assets/creatives/catalogue/premium/savanna-dualgrip-edition-socks-274.mp4",
   "poster": "assets/creatives/catalogue/premium/savanna-dualgrip-edition-socks-274.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium"
   ],
   "preview": "assets/creatives/catalogue/premium/savanna-dualgrip-edition-socks-274.preview.mp4"
  },
  {
   "title": "Backpack Catalogue Video",
   "band": "premium",
   "dur": "19s",
   "video": "assets/creatives/catalogue/premium/backpack-catalogue-video-v2-1559.mp4",
   "poster": "assets/creatives/catalogue/premium/backpack-catalogue-video-v2-1559.jpg",
   "w": 640,
   "h": 1138,
   "tags": [
    "premium"
   ],
   "preview": "assets/creatives/catalogue/premium/backpack-catalogue-video-v2-1559.preview.mp4"
  }
 ],
 "statics": [
  {
   "title": "Rose Water + Multani Mitti",
   "sub": "Bestselling Combo",
   "hook": "Bestselling Ayurvedic Combo, flat 10% off + 5% extra on prepaid",
   "cat": "Beauty & Personal Care",
   "catKey": "beauty-personal-care",
   "ratio": "4x5",
   "src": "assets/creatives/statics/beauty-personal-care/shesha-rosewater-multani-mitti.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "3 Steps, One Kit",
   "sub": "Face Wash + Deodorant + Soap",
   "hook": "Tan removal, skin brightening, long-lasting freshness, ₹889",
   "cat": "Beauty & Personal Care",
   "catKey": "beauty-personal-care",
   "ratio": "4x5",
   "src": "assets/creatives/statics/beauty-personal-care/shesha-3steps-one-kit.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "Summer Must-Haves",
   "sub": "CTM Ritual Kit",
   "hook": "Face wash, rose water, day & night cream in one basket",
   "cat": "Beauty & Personal Care",
   "catKey": "beauty-personal-care",
   "ratio": "4x5",
   "src": "assets/creatives/statics/beauty-personal-care/shesha-summer-musthaves-ctm.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "Mysore Pattu Saree",
   "sub": "Celebrity Spotted",
   "hook": "Celebrity Spotted social-proof creative, up to 90% off",
   "cat": "Fashion & Apparel",
   "catKey": "fashion-apparel",
   "ratio": "4x5",
   "src": "assets/creatives/statics/fashion-apparel/mysore-pattu-celebrity-spotted.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "Krafted Millets",
   "sub": "No More Fatigue",
   "hook": "Ghar ke khane ko healthy banaao, buy any 4 at ₹1,199",
   "cat": "Food & FMCG",
   "catKey": "food-fmcg",
   "ratio": "4x5",
   "src": "assets/creatives/statics/food-fmcg/krafted-millets-no-more-fatigue.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "Mindesa Bags",
   "sub": "Unbeatable Prices",
   "hook": "Lifestyle hero shot + product cutout, launch offer up to 80% off",
   "cat": "Fashion & Apparel",
   "catKey": "fashion-apparel",
   "ratio": "4x5",
   "src": "assets/creatives/statics/fashion-apparel/mindesa-bags-unbeatable-prices.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "Aarogya Nutri Mix",
   "sub": "Summer Essentials",
   "hook": "Powered by Ayurveda range shot, up to 20% off",
   "cat": "Health & Wellness",
   "catKey": "health-wellness",
   "ratio": "4x5",
   "src": "assets/creatives/statics/health-wellness/aarogya-summer-essentials.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "Kasturi Manjal + Rose Water",
   "sub": "Summer Combo",
   "hook": "Brighten & tone, daily, fades pigmentation, no yellow staining",
   "cat": "Beauty & Personal Care",
   "catKey": "beauty-personal-care",
   "ratio": "4x5",
   "src": "assets/creatives/statics/beauty-personal-care/shesha-kasturi-manjal-rosewater.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "Red Sandalwood Night Repair Cream",
   "sub": "Before/After",
   "hook": "Peel-reveal before/after, pigmented & dull to bright & even-toned",
   "cat": "Beauty & Personal Care",
   "catKey": "beauty-personal-care",
   "ratio": "4x5",
   "src": "assets/creatives/statics/beauty-personal-care/shesha-red-sandalwood-before-after.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "Deyga Aloe Vera Gel",
   "sub": "Before/After",
   "hook": "Real skin-texture before/after, just ₹370, extra 10% off first order",
   "cat": "Beauty & Personal Care",
   "catKey": "beauty-personal-care",
   "ratio": "4x5",
   "src": "assets/creatives/statics/beauty-personal-care/deyga-aloe-vera-before-after.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "Shesha Ayurveda",
   "sub": "Mother's Love Sale, Night Goddess Kit",
   "hook": "As Seen on TV, Approved by Sharks, up to 40% off + 5% prepaid",
   "cat": "Beauty & Personal Care",
   "catKey": "beauty-personal-care",
   "ratio": "4x5",
   "src": "assets/creatives/statics/beauty-personal-care/shesha-mothers-love-sale-night-goddess.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "Deyga Vitamin C Duo",
   "sub": "Deal of the Month",
   "hook": "Face wash + serum bundle, ₹999 + extra 10% for new users",
   "cat": "Beauty & Personal Care",
   "catKey": "beauty-personal-care",
   "ratio": "4x5",
   "src": "assets/creatives/statics/beauty-personal-care/deyga-deal-of-the-month-vitc.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "Matri Period Pain Relief Device",
   "sub": "Mother's Day",
   "hook": "As Seen on Shark Tank India, up to 40% off, sale price ₹2,499",
   "cat": "Health & Wellness",
   "catKey": "health-wellness",
   "ratio": "4x5",
   "src": "assets/creatives/statics/health-wellness/matri-period-pain-relief-mothers-day.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "Erweit PCOS Balance",
   "sub": "Benefit Focused",
   "hook": "Feel Balanced. Feel In Control., daily nutrition support, Buy 1 Get 1",
   "cat": "Health & Wellness",
   "catKey": "health-wellness",
   "ratio": "4x5",
   "src": "assets/creatives/statics/health-wellness/erweit-pcos-balance-benefit.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "Erweit Weitsure",
   "sub": "Gut Health, Product Focused",
   "hook": "Probiotics, prebiotic FOS, digestive enzymes & zinc, Buy 1 Get 1",
   "cat": "Health & Wellness",
   "catKey": "health-wellness",
   "ratio": "4x5",
   "src": "assets/creatives/statics/health-wellness/erweit-weitsure-gut-health.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "WinDiabonil Capsules",
   "sub": "Sugar Balance (Hindi)",
   "hook": "अब शुगर बैलेंस करना हुआ आसान, ₹999 for 60 capsules",
   "cat": "Health & Wellness",
   "catKey": "health-wellness",
   "ratio": "4x5",
   "src": "assets/creatives/statics/health-wellness/windiabonil-sugar-balance-hn.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "Erweit PCOS Balance",
   "sub": "Result Focused",
   "hook": "Struggling With Irregular Cycles?, lifestyle hero shot, Buy 1 Get 1",
   "cat": "Health & Wellness",
   "catKey": "health-wellness",
   "ratio": "4x5",
   "src": "assets/creatives/statics/health-wellness/erweit-pcos-balance-result.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "Tript Uplift Gummies",
   "sub": "Mango Flavour",
   "hook": "Full-spectrum ayurvedic proprietary blend, pack of 2 at ₹599",
   "cat": "Health & Wellness",
   "catKey": "health-wellness",
   "ratio": "4x5",
   "src": "assets/creatives/statics/health-wellness/tript-uplift-gummies.jpg",
   "w": 900,
   "h": 1125
  },
  {
   "title": "Tript Uplift Pure Extract",
   "sub": "Lemon Haze",
   "hook": "2X Potent Than Gummies, golden dewaxed extract, 1g sample option",
   "cat": "Health & Wellness",
   "catKey": "health-wellness",
   "ratio": "4x5",
   "src": "assets/creatives/statics/health-wellness/tript-uplift-pure-extract.jpg",
   "w": 900,
   "h": 1125
  }
 ],
 "carousels": [
  {
   "brand": "IS Health Stores",
   "title": "Bust Firming Cream",
   "hook": "Problem-aware opener building into an ayurvedic bust firming cream pitch",
   "cat": "Beauty & Personal Care",
   "slides": [
    "assets/creatives/carousels/is-health-stores-bust-firming-cream/01.jpg",
    "assets/creatives/carousels/is-health-stores-bust-firming-cream/02.jpg",
    "assets/creatives/carousels/is-health-stores-bust-firming-cream/03.jpg",
    "assets/creatives/carousels/is-health-stores-bust-firming-cream/04.jpg",
    "assets/creatives/carousels/is-health-stores-bust-firming-cream/05.jpg"
   ],
   "w": 1080,
   "h": 1080
  },
  {
   "brand": "Shesha Ayurveda",
   "title": "Nilini Ayurvedic Hair Colour",
   "hook": "Seasonal sale creative for an ammonia-free, ayurvedic hair colour",
   "cat": "Beauty & Personal Care",
   "slides": [
    "assets/creatives/carousels/shesha-ayurveda-nilini-ayurvedic-hair-colour/01.jpg",
    "assets/creatives/carousels/shesha-ayurveda-nilini-ayurvedic-hair-colour/02.jpg",
    "assets/creatives/carousels/shesha-ayurveda-nilini-ayurvedic-hair-colour/03.jpg",
    "assets/creatives/carousels/shesha-ayurveda-nilini-ayurvedic-hair-colour/04.jpg"
   ],
   "w": 1080,
   "h": 1080
  },
  {
   "brand": "Avimee Herbal",
   "title": "3 Easy Steps for Healthy Hair",
   "hook": "Simple 3-step routine explainer for an ayurvedic hair care range",
   "cat": "Beauty & Personal Care",
   "slides": [
    "assets/creatives/carousels/avimee-herbal-3-easy-steps-for-healthy-hair/01.jpg",
    "assets/creatives/carousels/avimee-herbal-3-easy-steps-for-healthy-hair/02.jpg",
    "assets/creatives/carousels/avimee-herbal-3-easy-steps-for-healthy-hair/03.jpg",
    "assets/creatives/carousels/avimee-herbal-3-easy-steps-for-healthy-hair/04.jpg",
    "assets/creatives/carousels/avimee-herbal-3-easy-steps-for-healthy-hair/05.jpg",
    "assets/creatives/carousels/avimee-herbal-3-easy-steps-for-healthy-hair/06.jpg"
   ],
   "w": 1080,
   "h": 1080
  }
 ],
 "logos": [
  {
   "name": "Nooky",
   "src": "assets/creatives/brand-logos/nooky.png",
   "mono": "assets/creatives/brand-logos/mono/nooky.png",
   "dw": 150,
   "dh": 33.3
  },
  {
   "name": "Juvia Jewellery",
   "src": "assets/creatives/brand-logos/juvia-jewellery.png",
   "mono": "assets/creatives/brand-logos/mono/juvia-jewellery.png",
   "dw": 110.9,
   "dh": 42.6
  },
  {
   "name": "Aarogya Nutri Mix",
   "src": "assets/creatives/brand-logos/aarogya-nutri-mix.png",
   "mono": "assets/creatives/brand-logos/mono/aarogya-nutri-mix.png",
   "dw": 109.3,
   "dh": 43.4
  },
  {
   "name": "Limited Uniq",
   "src": "assets/creatives/brand-logos/limited-uniq.png",
   "mono": "assets/creatives/brand-logos/mono/limited-uniq.png",
   "dw": 130.5,
   "dh": 33.2
  },
  {
   "name": "Cink",
   "src": "assets/creatives/brand-logos/cink.png",
   "mono": "assets/creatives/brand-logos/mono/cink.png",
   "dw": 98.0,
   "dh": 39.3
  },
  {
   "name": "Deyga",
   "src": "assets/creatives/brand-logos/deyga.png",
   "mono": "assets/creatives/brand-logos/mono/deyga.png",
   "dw": 92.2,
   "dh": 44.8
  },
  {
   "name": "Eye Sutra",
   "src": "assets/creatives/brand-logos/eye-sutra.png",
   "mono": "assets/creatives/brand-logos/mono/eye-sutra.png",
   "dw": 86.8,
   "dh": 46
  },
  {
   "name": "Easify",
   "src": "assets/creatives/brand-logos/easify.png",
   "mono": "assets/creatives/brand-logos/mono/easify.png",
   "dw": 89.4,
   "dh": 36.0
  },
  {
   "name": "EasyPick",
   "src": "assets/creatives/brand-logos/easypick.png",
   "mono": "assets/creatives/brand-logos/mono/easypick.png",
   "dw": 116.0,
   "dh": 23
  },
  {
   "name": "Erweit",
   "src": "assets/creatives/brand-logos/erweit.png",
   "mono": "assets/creatives/brand-logos/mono/erweit.png",
   "dw": 118.3,
   "dh": 32.2
  },
  {
   "name": "Estailo",
   "src": "assets/creatives/brand-logos/estailo.png",
   "mono": "assets/creatives/brand-logos/mono/estailo.png",
   "dw": 98.5,
   "dh": 25.7
  },
  {
   "name": "Shesha Ayurveda",
   "src": "assets/creatives/brand-logos/shesha-ayurveda.png",
   "mono": "assets/creatives/brand-logos/mono/shesha-ayurveda.png",
   "dw": 38.8,
   "dh": 46
  },
  {
   "name": "Goodomen",
   "src": "assets/creatives/brand-logos/goodomen.png",
   "mono": "assets/creatives/brand-logos/mono/goodomen.png",
   "dw": 150,
   "dh": 17.6
  },
  {
   "name": "S Health Stores",
   "src": "assets/creatives/brand-logos/health-stores.png",
   "mono": "assets/creatives/brand-logos/mono/health-stores.png",
   "dw": 29.9,
   "dh": 46
  },
  {
   "name": "Kamour",
   "src": "assets/creatives/brand-logos/kamour.png",
   "mono": "assets/creatives/brand-logos/mono/kamour.png",
   "dw": 118.4,
   "dh": 35.3
  },
  {
   "name": "Rias",
   "src": "assets/creatives/brand-logos/rias.png",
   "mono": "assets/creatives/brand-logos/mono/rias.png",
   "dw": 70.8,
   "dh": 46
  },
  {
   "name": "Makezmia",
   "src": "assets/creatives/brand-logos/makezmia.png",
   "mono": "assets/creatives/brand-logos/mono/makezmia.png",
   "dw": 150,
   "dh": 27.8
  },
  {
   "name": "Dulha Ghar",
   "src": "assets/creatives/brand-logos/dulha-ghar.png",
   "mono": "assets/creatives/brand-logos/mono/dulha-ghar.png",
   "dw": 46.0,
   "dh": 46
  },
  {
   "name": "Mindesa",
   "src": "assets/creatives/brand-logos/mindesa.png",
   "mono": "assets/creatives/brand-logos/mono/mindesa.png",
   "dw": 146.4,
   "dh": 39.4
  },
  {
   "name": "Reju Ayur",
   "src": "assets/creatives/brand-logos/reju-ayur.png",
   "mono": "assets/creatives/brand-logos/mono/reju-ayur.png",
   "dw": 128.0,
   "dh": 32.6
  },
  {
   "name": "TripT",
   "src": "assets/creatives/brand-logos/tript.png",
   "mono": "assets/creatives/brand-logos/mono/tript.png",
   "dw": 108.3,
   "dh": 32.7
  },
  {
   "name": "UNRLL",
   "src": "assets/creatives/brand-logos/unrll.png",
   "mono": "assets/creatives/brand-logos/mono/unrll.png",
   "dw": 89.7,
   "dh": 29.8
  },
  {
   "name": "Label by Anuja",
   "src": "assets/creatives/brand-logos/label-by-anuja.png",
   "mono": "assets/creatives/brand-logos/mono/label-by-anuja.png",
   "dw": 58.3,
   "dh": 46
  },
  {
   "name": "Cheekee",
   "src": "assets/creatives/brand-logos/cheekee.png",
   "mono": "assets/creatives/brand-logos/mono/cheekee.png",
   "dw": 108.4,
   "dh": 46
  },
  {
   "name": "Kartelo India",
   "src": "assets/creatives/brand-logos/kartelo-india.png",
   "mono": "assets/creatives/brand-logos/mono/kartelo-india.png",
   "dw": 113.0,
   "dh": 44.7
  },
  {
   "name": "Diyaa Pure",
   "src": "assets/creatives/brand-logos/diyaa-pure.png",
   "mono": "assets/creatives/brand-logos/mono/diyaa-pure.png",
   "dw": 87.4,
   "dh": 43.0
  },
  {
   "name": "Mysore Pattu Saree",
   "src": "assets/creatives/brand-logos/mysore-pattu-saree.png",
   "mono": "assets/creatives/brand-logos/mono/mysore-pattu-saree.png",
   "dw": 79.5,
   "dh": 46
  },
  {
   "name": "Kicky & Perky",
   "src": "assets/creatives/brand-logos/kicky-and-perky.png",
   "mono": "assets/creatives/brand-logos/mono/kicky-and-perky.png",
   "dw": 131.4,
   "dh": 46
  },
  {
   "name": "Avimee Herbal",
   "src": "assets/creatives/brand-logos/avimee-herbal.png",
   "mono": "assets/creatives/brand-logos/mono/avimee-herbal.png",
   "dw": 81.0,
   "dh": 46
  },
  {
   "name": "Premvastra",
   "src": "assets/creatives/brand-logos/premvastra.png",
   "mono": "assets/creatives/brand-logos/mono/premvastra.png",
   "dw": 58.1,
   "dh": 28.3
  },
  {
   "name": "Krafted Millets",
   "src": "assets/creatives/brand-logos/krafted-millets.svg",
   "mono": "assets/creatives/brand-logos/krafted-millets.svg",
   "filter": true,
   "dw": 120,
   "dh": 34
  }
 ]
};
