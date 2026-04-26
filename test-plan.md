# Test Plan — PR #2 (Orange redesign + Ozon-style cart)

## Environment
- Local dev server: `npm run dev` → http://localhost:3000 (branch `devin/1777014722-orange-redesign`)
- No auth needed (catalog and cart are public)

## What Changed
- Light theme: white + orange `#ff6a00` (was white + black)
- Dark theme: black `#0a0a0a` + orange `#ff7a1f` (was pure black + white)
- Product card `Add to cart` button replaced with **−  N шт  +** counter after first click (Ozon pattern)
- Toast notification appears at bottom of screen on add-to-cart with "Перейти в корзину" link (auto-dismiss ≈2.8s)
- Reusable `BackButton` added to Cart, Wishlist, Checkout
- Placeholder images fixed (`via.placeholder.com` → `placehold.co`)

Code refs: ProductCard.tsx:65-77, ToastContext.tsx:17-46, BackButton.tsx, Settings.tsx:14-21, global.css `:root` / `body.dark-mode`.

---

## Tests

### T1 — Ozon-style counter + toast on add-to-cart (PRIMARY)
**Start**: Catalog page `/`, empty cart.

| Step | Action | Pass criterion (concrete) |
|------|--------|--------------------------|
| 1 | Observe "Футболка Ghost" card | Orange button labeled **В корзину** is visible under price `2 990 ₽` |
| 2 | Click **В корзину** on "Футболка Ghost" | (a) Button disappears; a 3-cell row **−  1шт  +** appears in its place (orange bg, white text). (b) Toast appears at the bottom of the viewport containing literal text `Футболка Ghost добавлен в корзину` and link `Перейти в корзину →`. (c) Cart icon badge in header reads `1` |
| 3 | Click **+** on the counter twice | `qty-value` text becomes `3шт` (not `1шт`). Cart badge reads `3` |
| 4 | Click **−** 3 times | After 3 clicks, the counter row disappears and the **В корзину** button is back on the card. Cart badge is hidden (no text) |

**Would a broken impl look identical?** No — the old code always renders the "В корзину" button regardless of cart state. Step 2's state change is the key discriminator.

### T2 — Toast link navigates to cart, back button returns to catalog
| Step | Action | Pass criterion |
|------|--------|---------------|
| 1 | Click **В корзину** on any card | Toast visible |
| 2 | Click the **Перейти в корзину →** link in the toast within 2 seconds | URL becomes `/cart`. Page renders "Корзина" heading and cart item |
| 3 | Observe Cart page | A pill-shaped button **← К каталогу** is visible at the top of the page (above the h2 heading) |
| 4 | Click **← К каталогу** | URL returns to `/`. Catalog is visible |

**Broken impl discriminator**: before this PR, there was no toast and no back button on Cart.

### T3 — Orange palette in light + dark theme
| Step | Action | Pass criterion |
|------|--------|---------------|
| 1 | On Catalog (light theme), inspect "В корзину" button | Background is orange (roughly `#ff6a00`). Not black. |
| 2 | Navigate to Settings (gear icon) | "Темная тема" toggle visible, currently OFF |
| 3 | Click toggle | Page background becomes near-black (≈ `#0a0a0a`). Nav active indicator ("Настройки") text stays orange |
| 4 | Navigate back to Catalog | "В корзину" button is still orange (brighter `#ff7a1f` on dark bg). Text on cards readable on dark card bg. |

**Broken impl discriminator**: before this PR, dark-mode primary was `#ffffff` (white buttons). Any orange on the button at step 4 proves the palette change took effect.

---

## What I WILL NOT test
- Firebase auth / order placement / admin (out of PR scope, requires credentials)
- NewArrivals page (same ProductCard as Catalog, covered by T1)
- Regression of unchanged pages

## Evidence Captured
- Screen recording of the three tests in sequence
- Annotated with `setup` / `test_start` / `assertion` markers
