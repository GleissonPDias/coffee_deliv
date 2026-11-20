import { z } from "zod";

export const checkoutSchema = z.object({
  cep: z
    .string()
    .min(1, "CEP é obrigatório")
    .regex(/^\d{5}-?\d{3}$/, "CEP inválido"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z
    .string()
    .min(2, "UF é obrigatória")
    .max(2, "UF deve ter 2 caracteres"),
  paymentMethod: z.enum(["credit", "debit", "cash"], {
    message: "Selecione uma forma de pagamento",
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;