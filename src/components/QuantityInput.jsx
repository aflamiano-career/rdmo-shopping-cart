import { MinusIcon, PlusIcon } from "../icons/Icons";

export default function QuantityInput({ value, onChange, min = 1, max = 99 }) {
  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      onChange(min);
      return;
    }
    const num = parseInt(val, 10);
    if (!Number.isNaN(num)) {
      onChange(Math.max(min, Math.min(max, num)));
    }
  };

  return (
    <div className="quantity">
      <button
        className="quantity__btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        type="button"
      >
        <MinusIcon />
      </button>
      <input
        type="number"
        className="quantity__input"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        aria-label="Quantity"
      />
      <button
        className="quantity__btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        type="button"
      >
        <PlusIcon />
      </button>
    </div>
  );
}
