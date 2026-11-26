# Sir Betalot Official Store (demo)

Live: https://lucavandort-spec.github.io/sba-merch-store/ (GitHub Pages from `main`, root). Pushes to `main` redeploy it.

A static e-commerce store for SBA merch, laid out like a regular brand shop (shop.hardrock.com was the reference):
announcement bar, sticky header, hero, category tiles, best sellers, a Knights Club feature, lookbook, newsletter,
collection page with filters and sort, product pages with gallery, sizes, stock and size guide, and a cart drawer
saved in the browser. Built 27 Nov 2026. No build step: plain HTML, CSS and JS, so it runs on GitHub Pages as is.

## Run it
```
python3 -m http.server 8793 --directory sba-merch-store
```
then open http://localhost:8793 (or start `sba-store` from `.claude/launch.json`).

## Style
Everything follows `client/SBA Assets/Brand Assets/Styles.pdf`: night purple #1F0D2F background, #2D1243 / #4C1671
surfaces, gold #F5B301 accents, neon green #0FFF1F primary buttons (SBA site button style, You Blockhead Caps label in
#2D1243), the 241036-581982 velvet gradient on the Knights Club panel. Headings in You Blockhead Caps, body in Rubik.
Logos and the knight come from the client pack.

## Products (edit in `assets/js/products.js`)
| Product | Colour | Price | Images |
|---|---|---|---|
| Crown Logo Tee | Black | $35 | front, on model |
| Knights Club Vintage Tee | Washed Purple | $42 | front, on model |
| Live Like a Knight Oversized Tee | Bone | $39 (was $45) | back, on model |
| Royal Crest Embroidered Hoodie | Royal Purple | $85 | front, on model |
| Midnight Knight Zip Hoodie | Black | $95 | front, back, on model |
| Crown Icon Snapback | Purple / Gold | $38 | front, on model |

Prices, stock per size, fabric weights and fit notes are placeholders to confirm with SBA and the print supplier.

## Images
Generated on Higgsfield, 26-27 Nov 2026. Originals (PNG, ~2K) in `raw/` (git-ignored); the site uses WebP copies in
`assets/img/products/`.
- Product photos: GPT Image 2.6, high, 2K, with the SBA logo / icon / knight / gold crown as references
  (picked for exact logo and print text). Jobs: tee 079034fd, vintage tee 67348bd8, bone tee 25fabdbd,
  hoodie 2eccc49a, zip hoodie dc46f1ee (back 9fe5738a), snapback 9e56f3fa.
- On-model and hero shots: Seedream 5.5, 2K, each with its product photo as reference. Jobs: 7f3e03cc, 777ddda2,
  2aae5cff, 55d49588, ce0baea5, 0511bf0a, hero 4fe07dbc.

## Not done yet (before going live)
- Checkout, accounts and the newsletter are front-end only. Checkout shows a "connects at launch" message; hook it to
  Shopify (Buy Button / Storefront API), Stripe Checkout or similar before taking orders.
- No customer reviews or ratings on purpose: add real ones once there are buyers.
- Footer social links point to `#`; swap in SBA's real profiles.
- Currency is USD and copy is English. For a Brazil storefront change `currency`/`locale` in `products.js` to
  `BRL` / `pt-BR` and translate the copy.

