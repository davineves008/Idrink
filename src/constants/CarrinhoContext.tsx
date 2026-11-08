import React, { createContext, ReactNode, useContext, useState } from "react";

export type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagem?: any;
};

export type ItemCarrinho = Produto & { quantidade: number };

export type StatusPedido =
  | "Em preparo"
  | "Saiu para entrega"
  | "Entregue"
  | "Cancelado";

export type Pedido = {
  id: number;
  data: string; // ISO, ex: 2026-11-08T20:15:00.000Z
  itens: ItemCarrinho[];
  total: number;
  status: StatusPedido;
};

type CarrinhoContextType = {
  itens: ItemCarrinho[];
  adicionar: (produto: Produto) => void;
  remover: (id: number) => void;
  alterarQuantidade: (id: number, delta: number) => void;
  limpar: () => void;
  total: number;

  pedidos: Pedido[];
  finalizarPedido: () => Pedido | null;
};

const CarrinhoContext = createContext<CarrinhoContextType>(
  {} as CarrinhoContextType,
);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const adicionar = (produto: Produto) => {
    setItens((atual) => {
      const existe = atual.find((i) => i.id === produto.id);
      if (existe) {
        return atual.map((i) =>
          i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i,
        );
      }
      return [...atual, { ...produto, quantidade: 1 }];
    });
  };

  const remover = (id: number) =>
    setItens((atual) => atual.filter((i) => i.id !== id));

  const alterarQuantidade = (id: number, delta: number) => {
    setItens((atual) =>
      atual
        .map((i) =>
          i.id === id ? { ...i, quantidade: i.quantidade + delta } : i,
        )
        .filter((i) => i.quantidade > 0),
    );
  };

  const limpar = () => setItens([]);

  const total = itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0);

  // Cria um pedido a partir do carrinho atual e esvazia o carrinho.
  // Por enquanto o pedido fica só na memória do app.
  // Depois: trocar por POST /api/pedidos e carregar a lista com GET.
  const finalizarPedido = (): Pedido | null => {
    if (itens.length === 0) return null;

    const novoPedido: Pedido = {
      id: pedidos.length + 1,
      data: new Date().toISOString(),
      itens,
      total,
      status: "Em preparo",
    };

    setPedidos((atual) => [novoPedido, ...atual]); // mais recente primeiro
    setItens([]);

    return novoPedido;
  };

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionar,
        remover,
        alterarQuantidade,
        limpar,
        total,
        pedidos,
        finalizarPedido,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoContext);
