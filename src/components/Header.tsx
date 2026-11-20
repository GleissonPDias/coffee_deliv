import { Link, NavLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import logo from "../assets/logo.svg";

export function Header() {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-[var(--color-bg)]">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-2 px-3 py-3 md:gap-3 md:px-8 md:py-8">
        <Link to="/" aria-label="Coffee Delivery - Home">
          <img src={logo} alt="Coffee Delivery" className="h-10 w-auto" />
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-md bg-[var(--color-accent-light)] px-2 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-dark)" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span className="hidden text-[14px] text-[var(--color-accent-dark)] sm:inline">Porto Alegre, RS</span>
          </div>

          <Link
            to="/checkout"
            aria-label={`Carrinho com ${totalItems} itens`}
            className="relative flex items-center gap-1 rounded-md bg-[var(--color-primary-lighter)] p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="17" cy="20" r="1.5" />
              <path d="M3 4h2l2.5 11h10l2-7H7" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[12px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-lg"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <nav className="hidden items-center gap-4 md:flex" aria-label="Principal">
            <NavLink to="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">Home</NavLink>
            <NavLink to="/checkout" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">Checkout</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}