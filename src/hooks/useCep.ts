import { useState } from "react";

export interface CepResult {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export interface CepState {
  loading: boolean;
  error: string | null;
  data: CepResult | null;
}

export function useCep() {
  const [state, setState] = useState<CepState>({ loading: false, error: null, data: null });

  async function fetchCep(cep: string) {
    const clean = cep.replace(/\D/g, "");
    if (clean.length !== 8) {
      setState({ loading: false, error: "CEP deve ter 8 dígitos.", data: null });
      return null;
    }
    setState({ loading: true, error: null, data: null });
    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      if (!res.ok) throw new Error("Falha na consulta.");
      const data: CepResult = await res.json();
      if (data.erro) {
        setState({ loading: false, error: "CEP não encontrado.", data: null });
        return null;
      }
      setState({ loading: false, error: null, data });
      return data;
    } catch {
      setState({ loading: false, error: "Não foi possível consultar o CEP.", data: null });
      return null;
    }
  }

  return { ...state, fetchCep };
}