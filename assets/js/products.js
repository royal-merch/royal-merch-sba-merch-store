/* Sir Betalot Official Store: product catalogue.
   Edit prices, copy, sizes and stock here. English text sits on each product, Portuguese (Brazil) in its `pt` block.
   Images live in assets/img/products/. */
window.SBA_STORE = {
  currency: "BRL",
  freeShippingFrom: 399,
  flatShipping: 29.9,
  collections: [
    { id: "tees", name: "Tees", blurb: "Heavyweight cotton, printed to last.",
      pt: { name: "Camisetas", blurb: "Algodão pesado, estampado para durar." } },
    { id: "hoodies", name: "Hoodies", blurb: "Brushed fleece built for cold nights.",
      pt: { name: "Moletons", blurb: "Moletom felpado, feito para as noites frias." } },
    { id: "headwear", name: "Headwear", blurb: "Crown on. Every day.",
      pt: { name: "Bonés", blurb: "Coroa na cabeça. Todo dia." } }
  ],
  products: [
    {
      id: "crown-logo-tee",
      name: "Crown Logo Tee",
      color: "Black",
      swatch: "#111111",
      collection: "tees",
      price: 179.9,
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
      fit: "Regular fit. True to size. Model is 185 cm and wears size L.",
      pt: {
        name: "Camiseta Crown Logo",
        color: "Preto",
        short: "A original. Nosso logo completo com coroa em branco vivo e olhos verde-neon, numa camiseta preta de algodão pesado.",
        details: [
          "Algodão 100% penteado fio 30.1, 240 g/m²",
          "Estampa em plastisol branco de toque macio, olhos em verde-neon",
          "Modelagem regular, gola careca canelada, barras com costura dupla",
          "Pré-encolhida"
        ],
        fit: "Modelagem regular. Veste no tamanho de sempre. O modelo tem 1,85 m e usa G."
      }
    },
    {
      id: "knights-club-vintage-tee",
      name: "Knights Club Vintage Tee",
      color: "Washed Purple",
      swatch: "#6A2A9A",
      collection: "tees",
      price: 219.9,
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
      fit: "Boxy, oversized fit. Take your usual size for a loose look, or size down for a closer fit. Model is 180 cm and wears size L.",
      pt: {
        name: "Camiseta Vintage Knights Club",
        color: "Roxo Lavado",
        short: "O próprio Sir Betalot numa estampa vintage craquelada, sobre camiseta roxa tingida peça a peça. Cada uma fica com uma lavagem um pouco diferente.",
        details: [
          "Algodão pesado de 260 g/m², tingido peça a peça e estonado",
          "Estampa vintage craquelada com letreiro dourado em arco",
          "Modelagem oversized quadrada com ombro caído",
          "Cada camiseta tem uma lavagem levemente diferente"
        ],
        fit: "Modelagem oversized e quadrada. Use seu tamanho de sempre para um caimento solto, ou um número menor para ficar mais justa. O modelo tem 1,80 m e usa G."
      }
    },
    {
      id: "live-like-a-knight-tee",
      name: "Live Like a Knight Oversized Tee",
      color: "Bone",
      swatch: "#EDE6D6",
      collection: "tees",
      price: 199.9,
      compareAt: 239.9,
      sizes: { S: 10, M: 0, L: 11, XL: 7, XXL: 3 },
      images: ["live-like-a-knight-tee-back.webp", "live-like-a-knight-tee-model.webp"],
      short: "A big crown-and-mask back print in royal purple on a soft bone-coloured oversized tee.",
      details: [
        "250 gsm 100% cotton in natural bone",
        "Oversized back print in deep purple with neon-green eyes",
        "Boxy fit, dropped shoulders, wide ribbed collar",
        "Pre-shrunk"
      ],
      fit: "Boxy, oversized fit. Model is 170 cm and wears size M.",
      pt: {
        name: "Camiseta Oversized Live Like a Knight",
        color: "Off-white",
        short: "Uma grande estampa de coroa e máscara nas costas, em roxo real, sobre uma camiseta oversized macia em tom off-white.",
        details: [
          "Algodão 100% de 250 g/m² em cru natural",
          "Estampa grande nas costas em roxo profundo com olhos verde-neon",
          "Modelagem quadrada, ombro caído, gola canelada larga",
          "Pré-encolhida"
        ],
        fit: "Modelagem oversized e quadrada. A modelo tem 1,70 m e usa M."
      }
    },
    {
      id: "royal-crest-hoodie",
      name: "Royal Crest Embroidered Hoodie",
      color: "Royal Purple",
      swatch: "#4C1671",
      collection: "hoodies",
      price: 449.9,
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
      fit: "Relaxed fit. True to size. Model is 183 cm and wears size L.",
      pt: {
        name: "Moletom Bordado Royal Crest",
        color: "Roxo Real",
        short: "Moletom em roxo real profundo, com coroa dourada em alto-relevo e olhos verde-neon bordados no peito.",
        details: [
          "Moletom de algodão flanelado por dentro, 420 g/m²",
          "Bordado em alto-relevo dourado metálico e verde-neon",
          "Capuz forrado com cordões de ponteira dourada",
          "Bolso canguru, punhos e barra canelados, etiqueta dourada tecida na barra"
        ],
        fit: "Modelagem solta. Veste no tamanho de sempre. O modelo tem 1,83 m e usa G."
      }
    },
    {
      id: "midnight-knight-zip-hoodie",
      name: "Midnight Knight Zip Hoodie",
      color: "Black",
      swatch: "#111111",
      collection: "hoodies",
      price: 499.9,
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
      fit: "Relaxed fit. True to size. Model is 172 cm and wears size S.",
      pt: {
        name: "Moletom com Zíper Midnight Knight",
        color: "Preto",
        short: "Patch de chenille com a coroa no peito e o cavaleiro inteiro nas costas. Nossa peça mais pesada.",
        details: [
          "Moletom de algodão pesado, 450 g/m²",
          "Patch de chenille roxo e dourado com o logo no lado esquerdo do peito",
          "Estampa do cavaleiro nas costas inteiras",
          "Zíper e ponteiras em metal dourado fosco"
        ],
        fit: "Modelagem solta. Veste no tamanho de sempre. A modelo tem 1,72 m e usa P."
      }
    },
    {
      id: "crown-icon-snapback",
      name: "Crown Icon Snapback",
      color: "Purple / Gold",
      swatch: "#2D1243",
      collection: "headwear",
      price: 199.9,
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
      fit: "One size. Adjustable snap fits head sizes 55 to 61 cm.",
      pt: {
        name: "Boné Snapback Crown Icon",
        color: "Roxo / Dourado",
        short: "Snapback estruturado de seis gomos, com coroa e máscara em bordado 3D, aba com forro dourado e botão dourado no topo.",
        details: [
          "Copa estruturada de seis gomos em sarja, aba reta",
          "Bordado 3D em alto-relevo dourado metálico com olhos verde-neon",
          "Forro da aba e botão do topo dourados",
          "Fecho snap ajustável, tamanho único"
        ],
        fit: "Tamanho único. O fecho ajustável serve em cabeças de 55 a 61 cm."
      }
    }
  ]
};
