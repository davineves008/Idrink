
import { request } from './api';
import {
  salvarToken,
  salvarUsuario,
  obterToken,
  obterUsuario,
  limparAutenticacao,
} from './authStorage';

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  perfil: string;
};

type LoginResponse = {
  token: string;
  expiraEm: string;
  usuario: Usuario;
};

export async function login(
  email: string,
  senha: string
): Promise<Usuario> {
  const resposta = await request<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      senha,
    }),
  });

  if (!resposta?.token || !resposta?.usuario) {
    throw new Error('A API retornou uma resposta de login inválida.');
  }

  await salvarToken(resposta.token);
  await salvarUsuario(resposta.usuario);

  return resposta.usuario;
}

export async function buscarUsuarioLogado() {
  return await request<Usuario>('/auth/me');
}

export async function verificarSessao(): Promise<Usuario | null> {
  const token = await obterToken();

  if (!token) return null;

  try {
    const usuario = await buscarUsuarioLogado();
    await salvarUsuario(usuario);
    return usuario;
  } catch {
    await limparAutenticacao();
    return null;
  }
}

export async function logout() {
  await limparAutenticacao();
}

export { obterUsuario };
