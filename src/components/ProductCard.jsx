import { useState } from "react";
import { useCart } from "../context/CartContext";
import QuantityInput from "./QuantityInput";

export default function ProductCard({ product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
    setQty(1);
  };

  const roundedRate = Math.round(product.rating.rate);

  return (
    <div className="product-card" data-testid="product-card">
      <div className="product-card__visual">
        <img
          className="product-card__image"
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
        <span className="product-card__category">{product.category}</span>
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{product.title}</h3>
        <div className="product-card__meta">
          <span
            className="product-card__stars"
            aria-label={`Rating ${product.rating.rate}`}
          >
            {"★".repeat(roundedRate)}
            {"☆".repeat(5 - roundedRate)}
          </span>
          <span className="product-card__count">{product.rating.count}</span>
        </div>
        <p className="product-card__price">${product.price.toFixed(2)}</p>
        <div className="product-card__actions">
          <QuantityInput value={qty} onChange={setQty} />
          <button
            className={`product-card__add ${added ? "product-card__add--added" : ""}`}
            onClick={handleAdd}
            type="button"
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
