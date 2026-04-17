import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { BagIcon, ArrowIcon } from "../icons/Icons";

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart, cartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <div className="cart__empty">
          <BagIcon size={48} />
          <h2 className="cart__empty-heading">Nothing here yet</h2>
          <p className="cart__empty-text">Your cart is waiting to be filled.</p>
          <button
            className="btn btn--primary"
            onClick={() => navigate("/shop")}
            type="button"
          >
            Browse products <ArrowIcon />
          </button>
        </div>
      </div>
    );
  }

  const ship = cartTotal >= 50 ? 0 : 4.99;

  return (
    <div className="cart">
      <div className="cart__header">
        <h1 className="cart__heading">Cart</h1>
        <span className="cart__count">
          {cartCount} {cartCount === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="cart__layout">
        <div className="cart__list">
          <div className="cart__list-head">
            <span>Product</span>
            <span>Qty</span>
            <span>Total</span>
            <span />
          </div>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <aside className="summary">
          <h3 className="summary__heading">Summary</h3>
          <div className="summary__row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary__row">
            <span>Shipping</span>
            <span>{ship === 0 ? "Free" : `$${ship.toFixed(2)}`}</span>
          </div>
          <div className="summary__divider" />
          <div className="summary__row summary__row--total">
            <span>Total</span>
            <span>${(cartTotal + ship).toFixed(2)}</span>
          </div>
          <button className="btn btn--checkout" type="button">
            Checkout
          </button>
          <button className="btn btn--clear" onClick={clearCart} type="button">
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
}
