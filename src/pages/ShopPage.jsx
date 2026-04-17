import { useState, useMemo } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

export default function ShopPage() {
  const { products, loading } = useProducts();
  const [filter, setFilter] = useState("all");

  const categories = useMemo(
    () => ["all", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const filtered = useMemo(
    () =>
      filter === "all"
        ? products
        : products.filter((p) => p.category === filter),
    [products, filter]
  );

  return (
    <div className="shop">
      <div className="shop__header">
        <h1 className="shop__heading">Shop</h1>
        {!loading && <span className="shop__count">{filtered.length} items</span>}
      </div>

      {!loading && (
        <div className="shop__filters">
          {categories.map((c) => (
            <button
              key={c}
              className={`shop__filter ${filter === c ? "shop__filter--active" : ""}`}
              onClick={() => setFilter(c)}
              type="button"
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
      )}

      <div className="shop__grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton" data-testid="skeleton">
                <div className="skeleton__image" />
                <div className="skeleton__line" />
                <div className="skeleton__line skeleton__line--short" />
              </div>
            ))
          : filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
