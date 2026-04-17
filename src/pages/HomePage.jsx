import { useNavigate } from "react-router";
import { ArrowIcon } from "../icons/Icons";
import useProducts from "../hooks/useProducts";

const PERKS = [
  { icon: "→", title: "Free Shipping", desc: "On orders $50+" },
  { icon: "↺", title: "30-Day Returns", desc: "No questions asked" },
  { icon: "◇", title: "Secure Checkout", desc: "Encrypted payments" },
  { icon: "♡", title: "24/7 Support", desc: "We're always here" },
];

const TICKER_WORDS = [
  "Clothing",
  "·",
  "Electronics",
  "·",
  "Jewelry",
  "·",
  "Accessories",
  "·",
  "Clothing",
  "·",
  "Electronics",
  "·",
  "Jewelry",
  "·",
  "Accessories",
  "·",
];

export default function HomePage() {
  const { products, loading } = useProducts();
  const navigate = useNavigate();
  const picks = products.filter((p) => p.rating.rate >= 4.5).slice(0, 4);

  return (
    <div className="home">
      <section className="hero">
        <p className="hero__eyebrow">New for 2026</p>
        <h1 className="hero__heading">
          Everyday objects,
          <br />
          <em>elevated.</em>
        </h1>
        <p className="hero__body">
          A curated collection of products that do more with less. Clean design,
          honest materials, fair prices.
        </p>
        <button
          className="btn btn--primary"
          onClick={() => navigate("/shop")}
          type="button"
        >
          Shop now <ArrowIcon />
        </button>
      </section>

      <section className="ticker">
        <div className="ticker__track">
          {[0, 1].map((r) => (
            <div key={r} className="ticker__set" aria-hidden={r > 0}>
              {TICKER_WORDS.map((w, i) => (
                <span
                  key={`${r}-${i}`}
                  className={w === "·" ? "ticker__dot" : "ticker__word"}
                >
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="picks">
        <div className="picks__header">
          <h2 className="picks__heading">Staff Picks</h2>
          <button
            className="btn btn--link"
            onClick={() => navigate("/shop")}
            type="button"
          >
            All products <ArrowIcon />
          </button>
        </div>
        <div className="picks__grid">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton" data-testid="skeleton">
                  <div className="skeleton__image" />
                  <div className="skeleton__line" />
                  <div className="skeleton__line skeleton__line--short" />
                </div>
              ))
            : picks.map((p) => (
                <div key={p.id} className="picks__card-wrap">
                  <div
                    className="picks__card"
                    onClick={() => navigate("/shop")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && navigate("/shop")}
                  >
                    <div className="picks__card-image">
                      <img src={p.image} alt={p.title} />
                    </div>
                    <p className="picks__card-name">{p.title}</p>
                    <p className="picks__card-price">${p.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
        </div>
      </section>

      <section className="perks">
        {PERKS.map((p) => (
          <div key={p.title} className="perks__item">
            <span className="perks__icon">{p.icon}</span>
            <div>
              <p className="perks__title">{p.title}</p>
              <p className="perks__desc">{p.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
