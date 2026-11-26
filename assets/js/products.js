/* Sir Betalot Official Store: product catalogue.
   Edit prices, copy, sizes and stock here. Images live in assets/img/products/. */
window.SBA_STORE = {
  currency: "USD",
  locale: "en-US",
  freeShippingFrom: 75,
  collections: [
    { id: "tees", name: "Tees", blurb: "Heavyweight cotton, printed to last." },
    { id: "hoodies", name: "Hoodies", blurb: "Brushed fleece built for cold nights." },
    { id: "headwear", name: "Headwear", blurb: "Crown on. Every day." }
  ],
  products: [
    {
      id: "crown-logo-tee",
      name: "Crown Logo Tee",
      color: "Black",
      swatch: "#111111",
      collection: "tees",
      price: 35,
      badge: "Best Seller",
      sizes: { S: 12, M: 30, L: 24, XL: 9, XXL: 4 },
      images: ["crown-logo-tee-front.webp", "crown-logo-tee-model.webp"],
      short: "The original. Our full crown wordmark in bright white with neon-green eyes on a heavyweight black tee.",
      details: [
        "240 gsm 100% combed ring-spun cotton",
        "Soft-hand white plastisol print, neon-green eye detail",
        "Regular fit, ribbed crew neck, double-needle hems",
        "Pre-shrunk"
      ],
      fit: "Regular fit. True to size. Model is 185 cm and wears size L."
    },
    {
      id: "knights-club-vintage-tee",
      name: "Knights Club Vintage Tee",
      color: "Washed Purple",
      swatch: "#6A2A9A",
      collection: "tees",
      price: 42,
      badge: "New",
      sizes: { S: 8, M: 14, L: 16, XL: 6, XXL: 2 },
      images: ["knights-club-tee-front.webp", "knights-club-tee-model.webp"],
      short: "Sir Betalot himself, in a cracked vintage print on a garment-dyed purple tee. Every piece washes a little differently.",
      details: [
        "260 gsm heavyweight cotton, garment-dyed and stone-washed",
        "Cracked-ink vintage print with gold arch lettering",
        "Boxy oversized fit with dropped shoulders",
        "Each tee has a slightly different wash"
      ],
      fit: "Boxy, oversized fit. Take your usual size for a loose look, or size down for a closer fit. Model is 180 cm and wears size L."
    },
    {
      id: "live-like-a-knight-tee",
      name: "Live Like a Knight Oversized Tee",
      color: "Bone",
      swatch: "#EDE6D6",
      collection: "tees",
      price: 39,
      compareAt: 45,
      sizes: { S: 10, M: 0, L: 11, XL: 7, XXL: 3 },
      images: ["live-like-a-knight-tee-back.webp", "live-like-a-knight-tee-model.webp"],
      short: "A big crown-and-mask back print in royal purple on a soft bone-coloured oversized tee.",
      details: [
        "250 gsm 100% cotton in natural bone",
        "Oversized back print in deep purple with neon-green eyes",
        "Boxy fit, dropped shoulders, wide ribbed collar",
        "Pre-shrunk"
      ],
      fit: "Boxy, oversized fit. Model is 170 cm and wears size M."
    },
    {
      id: "royal-crest-hoodie",
      name: "Royal Crest Embroidered Hoodie",
      color: "Royal Purple",
      swatch: "#4C1671",
      collection: "hoodies",
      price: 85,
      badge: "Best Seller",
      sizes: { S: 6, M: 18, L: 20, XL: 11, XXL: 5 },
      images: ["royal-crest-hoodie-front.webp", "royal-crest-hoodie-model.webp"],
      short: "Deep royal purple fleece with a raised gold crown and neon-green eyes stitched on the chest.",
      details: [
        "420 gsm brushed-back cotton fleece",
        "Raised metallic-gold and neon-green embroidery",
        "Lined hood with gold-tipped drawcords",
        "Kangaroo pocket, ribbed cuffs and hem, woven gold hem label"
      ],
      fit: "Relaxed fit. True to size. Model is 183 cm and wears size L."
    },
    {
      id: "midnight-knight-zip-hoodie",
      name: "Midnight Knight Zip Hoodie",
      color: "Black",
      swatch: "#111111",
      collection: "hoodies",
      price: 95,
      badge: "Low Stock",
      sizes: { S: 3, M: 5, L: 4, XL: 2, XXL: 0 },
      images: ["midnight-zip-hoodie-front.webp", "midnight-zip-hoodie-back.webp", "midnight-zip-hoodie-model.webp"],
      short: "A chenille crown patch on the chest and the full knight on the back. Our heaviest piece.",
      details: [
        "450 gsm heavyweight cotton fleece",
        "Purple and gold chenille wordmark patch on the left chest",
        "Full-back knight print",
        "Matte gold metal zip and aglets"
      ],
      fit: "Relaxed fit. True to size. Model is 172 cm and wears size S."
    },
    {
      id: "crown-icon-snapback",
      name: "Crown Icon Snapback",
      color: "Purple / Gold",
      swatch: "#2D1243",
      collection: "headwear",
      price: 38,
      badge: "New",
      sizes: { "One Size": 25 },
      images: ["crown-snapback-front.webp", "crown-snapback-model.webp"],
      short: "Structured six-panel snapback with a 3D puff crown-and-mask, a gold undervisor and a gold top button.",
      details: [
        "Structured six-panel twill crown, flat brim",
        "3D puff embroidery in metallic gold with neon-green eyes",
        "Gold undervisor and top button",
        "Adjustable snap closure, one size fits most"
      ],
      fit: "One size. Adjustable snap fits head sizes 55 to 61 cm."
    }
  ]
};
