import { coffees } from "../data/coffees";
import { CoffeeCard } from "../components/CoffeeCard";

const features = [
  { label: "Compra simples e segura", color: "var(--color-primary)", icon: "✓" },
  { label: "Entrega rápida e rastreada", color: "var(--color-primary-light)", icon: "📦" },
  { label: "Embalagem mantém o café intacto", color: "var(--color-text-muted)", icon: "📦" },
  { label: "O café chega fresquinho até você", color: "var(--color-accent)", icon: "☕" },
];

export function Home() {
  return (
    <main className="mx-auto max-w-[1120px] px-4 py-8 md:px-8 md:py-12">
      <section className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-12">
        <div className="w-full md:w-1/2">
          <h1 className="font-display text-[32px] font-extrabold leading-[1.3] text-[var(--color-text)] md:text-[48px]" style={{ fontFamily: "var(--font-display)" }}>
            Encontre o café perfeito para qualquer hora do dia
          </h1>
          <p className="mt-4 text-[16px] text-[var(--color-text-title)] md:text-[20px]">
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora
          </p>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: f.color }}
                >
                  {f.icon}
                </span>
                <span className="text-[14px] text-[var(--color-text-muted)] md:text-[16px]">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80"
            alt="Café"
            className="h-[280px] w-[360px] rounded-lg object-cover md:h-[360px] md:w-[476px]"
          />
        </div>
      </section>

      <section className="mt-12 pb-12 md:mt-24 md:pb-24">
        <h2 className="mb-8 font-display text-[24px] font-extrabold text-[var(--color-text-title)] md:mb-14 md:text-[32px]" style={{ fontFamily: "var(--font-display)" }}>
          Nossos cafés
        </h2>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-10 md:gap-x-8">
          {coffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </section>
    </main>
  );
}