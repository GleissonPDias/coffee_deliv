import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutFormData } from "../schemas/checkoutSchema";
import { useCep } from "../hooks/useCep";

interface DeliveryAddressFormProps {
  onValid: (data: CheckoutFormData) => void;
  registerSubmit: (submit: () => void) => void;
}

export function DeliveryAddressForm({ onValid, registerSubmit }: DeliveryAddressFormProps) {
  const { fetchCep, loading, error } = useCep();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      paymentMethod: undefined as unknown as CheckoutFormData["paymentMethod"],
    },
  });

  useEffect(() => {
    registerSubmit(() => handleSubmit(onValid)());
  }, [registerSubmit, handleSubmit, onValid]);

  async function handleCepLookup(cep: string) {
    const data = await fetchCep(cep);
    if (data) {
      setValue("street", data.logradouro, { shouldValidate: true });
      setValue("neighborhood", data.bairro, { shouldValidate: true });
      setValue("city", data.localidade, { shouldValidate: true });
      setValue("state", data.uf, { shouldValidate: true });
    }
  }

  const inputClass =
    "w-full rounded border border-[var(--color-border)] bg-[var(--color-input)] px-3 py-3 text-[14px] text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] placeholder:text-[var(--color-text-label)]";

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onValid)} noValidate>
      <div className="flex items-start gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="mt-1 h-[22px] w-[22px] text-[var(--color-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
        <div>
          <p className="text-[16px] text-[var(--color-text-title)]">Endereço de Entrega</p>
          <p className="text-[14px] text-[var(--color-text-muted)]">Informe o endereço onde deseja receber seu pedido</p>
        </div>
      </div>

      <fieldset className="space-y-3">

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="cep" className="mb-1 block text-sm font-medium">
              CEP
            </label>
            <input
              id="cep"
              type="text"
              inputMode="numeric"
              {...register("cep", {
                onChange: (e) => {
                  const v = e.target.value.replace(/\D/g, "");
                  if (v.length === 8) handleCepLookup(v);
                },
              })}
              className={inputClass}
              placeholder="00000-000"
            />
            {loading && <p className="mt-1 text-xs text-[var(--color-text-muted)]">Consultando CEP...</p>}
            {error && <p className="mt-1 text-xs text-[var(--color-error)]">{error}</p>}
            {errors.cep && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.cep.message}</p>}
          </div>

          <div>
            <label htmlFor="street" className="mb-1 block text-sm font-medium">
              Rua
            </label>
            <input id="street" type="text" {...register("street")} className={inputClass} />
            {errors.street && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.street.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label htmlFor="number" className="mb-1 block text-sm font-medium">
              Número
            </label>
            <input id="number" type="text" {...register("number")} className={inputClass} />
            {errors.number && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.number.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="complement" className="mb-1 block text-sm font-medium">
              Complemento (opcional)
            </label>
            <input id="complement" type="text" {...register("complement")} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label htmlFor="neighborhood" className="mb-1 block text-sm font-medium">
              Bairro
            </label>
            <input id="neighborhood" type="text" {...register("neighborhood")} className={inputClass} />
            {errors.neighborhood && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.neighborhood.message}</p>}
          </div>
          <div>
            <label htmlFor="city" className="mb-1 block text-sm font-medium">
              Cidade
            </label>
            <input id="city" type="text" {...register("city")} className={inputClass} />
            {errors.city && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.city.message}</p>}
          </div>
          <div>
            <label htmlFor="state" className="mb-1 block text-sm font-medium">
              UF
            </label>
            <input id="state" type="text" maxLength={2} {...register("state")} className={inputClass} />
            {errors.state && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.state.message}</p>}
          </div>
        </div>
      </fieldset>

      <div className="flex items-start gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="mt-1 h-[22px] w-[22px] text-[var(--color-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </svg>
        <div>
          <p className="text-[16px] text-[var(--color-text-title)]">Pagamento</p>
          <p className="text-[14px] text-[var(--color-text-muted)]">O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
        </div>
      </div>

      <fieldset className="space-y-2">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {(["credit", "debit", "cash"] as const).map((pm) => (
            <label
              key={pm}
              className="flex flex-1 cursor-pointer items-center gap-3 rounded-md bg-[var(--color-border)] p-4 text-[12px] uppercase text-[var(--color-text-muted)]"
            >
              <input type="radio" value={pm} {...register("paymentMethod")} className="accent-[var(--color-primary)]" />
              {pm === "credit" ? "Cartão de crédito" : pm === "debit" ? "Cartão de débito" : "Dinheiro"}
            </label>
          ))}
        </div>
        {errors.paymentMethod && <p className="text-xs text-[var(--color-error)]">{errors.paymentMethod.message}</p>}
      </fieldset>
    </form>
  );
}