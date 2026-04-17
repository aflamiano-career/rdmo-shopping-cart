import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { CartProvider } from "../context/CartContext";

/**
 * Renders a component wrapped in CartProvider and a memory router for testing.
 * Uses createMemoryRouter to match the production data-router API.
 */
export function renderWithProviders(ui, { route = "/" } = {}) {
  const router = createMemoryRouter(
    [
      {
        path: "*",
        element: <CartProvider>{ui}</CartProvider>,
      },
    ],
    { initialEntries: [route] },
  );

  return render(<RouterProvider router={router} />);
}

export const mockProduct = {
  id: 1,
  title: "Test Backpack",
  price: 49.99,
  image: "https://example.com/image.jpg",
  category: "test-category",
  rating: { rate: 4.5, count: 100 },
};
