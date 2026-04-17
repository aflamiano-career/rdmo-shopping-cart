# rdmo — Shopping Cart

A modern minimalist shopping cart built with React 19 + React Router v7.

## Quick Start

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build
```

## Features

### Shopping

- Browse all products on the Shop page with category filters
- Add items to cart directly from product cards
- Live cart badge in the navbar updates reactively
- Manual quantity input with increment/decrement buttons, clamped to valid range
- Setting quantity to 0 removes the item automatically
- Free shipping threshold at $50
- Empty cart state with call-to-action

### UI & Experience

- Light and dark mode with system preference detection — persists across sessions via `localStorage`
- Loading skeletons with pulse animation while products fetch
- Responsive layout across desktop, tablet, and mobile
- 404 page for unmatched routes

### Resilience

- Graceful offline fallback — embedded product data is used if the API is unreachable, so the app always works

## Architecture

**Routing.** Uses `createBrowserRouter` from React Router v7 (data router API), enabling `loader`, `action`, route-level `errorElement`, and deferred data. Router config lives in `router.jsx`, consumed by a single `<RouterProvider>` in `App.jsx`. A `RootLayout` holds shared chrome (`Navbar`, `Footer`) and an `<Outlet />` for page components.

**State management.** Cart state lives in `CartContext` with `useCallback`-memoized actions and `useMemo`-derived values (`cartCount`, `cartTotal`). Theme state lives in `ThemeContext`, which applies `data-theme` to `<html>` and exposes a `toggleTheme` function.

**Data fetching.** `useProducts` fetches from `https://fakestoreapi.com/products` and falls back to embedded data on failure.

**Error handling.** The root route declares `errorElement: <NotFoundPage />`, catching both unmatched URLs and rendering errors. `NotFoundPage` uses `useRouteError` + `isRouteErrorResponse` for appropriate messaging.

## Design

Lively minimalism: a monochrome base (cream `#F7F7F5`, off-black `#111110`) with a single electric blue accent (`#3D5AFE`) for interactive elements and highlights. Typography pairs Outfit (geometric sans) with Space Mono (monospace for prices and the logo). Dark mode inverts the grayscale scale while preserving the blue accent.

## CSS Naming Convention

All styles follow **BEM (Block Element Modifier)**:

```
block__element--modifier
```

- **Block** — standalone component (`navbar`, `product-card`, `cart-item`)
- **Element** — a part of the block, separated by `__` (`navbar__link`, `product-card__image`)
- **Modifier** — a variant or state, separated by `--` (`navbar__link--active`, `product-card__add--added`)

All styles live in a single `src/styles/global.css` file, organized by block with section headers.

## Tech Stack

| Tool         | Version |
| ------------ | ------- |
| React        | 19      |
| React Router | 7       |
| Vite         | 8       |
