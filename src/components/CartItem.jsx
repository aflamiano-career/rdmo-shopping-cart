import { useCart } from "../context/CartContext";
import QuantityInput from "./QuantityInput";
import { XIcon } from "../icons/Icons";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item" data-testid="cart-item">
      <div className="cart-item__product">
        <div className="cart-item__thumb">
          <img
            className="cart-item__image"
            src={item.image}
            alt={item.title}
          />
        </div>
        <div className="cart-item__info">
          <p className="cart-item__name">{item.title}</p>
          <p className="cart-item__unit-price">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="cart-item__controls">
        <QuantityInput
          value={item.quantity}
          onChange={(v) => updateQuantity(item.id, v)}
          min={0}
        />
        <p className="cart-item__total">${(item.price * item.quantity).toFixed(2)}</p>
        <button
          className="cart-item__remove"
          onClick={() => removeFromCart(item.id)}
          aria-label={`Remove ${item.title}`}
          type="button"
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
}
