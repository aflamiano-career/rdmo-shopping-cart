import { NavLink } from "react-router";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { BagIcon, SunIcon, MoonIcon } from "../icons/Icons";

export default function Navbar() {
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__brand">
        <span className="navbar__dot" />
        rdmo
      </NavLink>
      <div className="navbar__links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `navbar__link ${isActive ? "navbar__link--active" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `navbar__link ${isActive ? "navbar__link--active" : ""}`
          }
        >
          Shop
        </NavLink>
        <button
          className="navbar__theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `navbar__link navbar__link--cart ${isActive ? "navbar__link--active" : ""}`
          }
          aria-label={`Cart with ${cartCount} items`}
        >
          <BagIcon />
          {cartCount > 0 && (
            <span className="navbar__badge" data-testid="cart-badge">
              {cartCount}
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
