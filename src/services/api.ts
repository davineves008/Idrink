
import { obterToken } from './authStorage';

const API_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, '');

export type Produto = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  ativo: boolean;
  imagemUrl?: string;
  categoriaId: number;
};

export async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  if (!API_URL) {
    throw new Error(
      'EXPO_PUBLIC_API_URL não definida. Confira o .env e reinicie o Expo.'
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const token = await obterToken();

    const headers = new Headers(options.headers);

    if (!headers.has('Content-Type') && options.body) {
      headers.set('Content-Type', 'application/json');
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    const texto = await res.text();
    console.log('URL chamada:', `${API_URL}${path}`);
    console.log('URL final:', res.url);
    console.log('Status HTTP:', res.status);
    console.log('Tipo de resposta:', res.headers.get('content-type'));
    console.log('HTML/JSON recebido:', texto.substring(0, 1000));

    let dados: any = null;

    if (texto) {
      try {
        dados = JSON.parse(texto);
      } catch {
        dados = texto;
      }
    }

    if (!res.ok) {
      const mensagem =
        dados?.mensagem ||
        dados?.message ||
        (typeof dados === 'string' ? dados : null) ||
        `Erro ${res.status}`;

      throw new Error(mensagem);
    }

    return dados as T;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('A conexão demorou demais. Tente novamente.');
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export const getProdutos = (categoriaId?: number) =>
  request<Produto[]>(
    categoriaId
      ? `/produtos?categoriaId=${categoriaId}`
      : '/produtos'
  );
