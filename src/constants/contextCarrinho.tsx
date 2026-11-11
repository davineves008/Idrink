import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Produto = { id: number; nome: string; preco: number };
export type ItemCarrinho = Produto & { quantidade: number };

type CarrinhoContextType = {
  itens: ItemCarrinho[];
  adicionar: (p: Produto) => void;
  alterarQuantidade: (id: number, delta: number) => void;
  remover: (id: number) => void;
  limpar: () => void;
  total: number;
  quantidadeTotal: number;
};

const CarrinhoContext = createContext<CarrinhoContextType>({} as CarrinhoContextType);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const adicionar = (p: Produto) =>
    setItens(atual => {
      const existe = atual.find(i => i.id === p.id);
      return existe
        ? atual.map(i => (i.id === p.id ? { ...i, quantidade: i.quantidade + 1 } : i))
        : [...atual, { ...p, quantidade: 1 }];
    });

  const alterarQuantidade = (id: number, delta: number) =>
    setItens(atual =>
      atual
        .map(i => (i.id === id ? { ...i, quantidade: i.quantidade + delta } : i))
        .filter(i => i.quantidade > 0)
    );

  const remover = (id: number) => setItens(atual => atual.filter(i => i.id !== id));
  const limpar = () => setItens([]);

  const total = itens.reduce((s, i) => s + i.preco * i.quantidade, 0);
  const quantidadeTotal = itens.reduce((s, i) => s + i.quantidade, 0);

  return (
    <CarrinhoContext.Provider
      value={{ itens, adicionar, alterarQuantidade, remover, limpar, total, quantidadeTotal }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoContext);