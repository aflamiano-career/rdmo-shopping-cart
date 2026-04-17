import { Outlet } from "react-router";
import { CartProvider } from "../context/CartContext";
import { ThemeProvider } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="app">
          <Navbar />
          <main className="app__content">
            <Outlet />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}
