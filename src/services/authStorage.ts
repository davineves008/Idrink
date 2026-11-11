
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'idrink_token';
const USER_KEY = 'idrink_usuario';

export async function salvarToken(token: string) {
  if (Platform.OS === 'web') {
    localStorage.setItem(TOKEN_KEY, token);
    return;
  }

  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function obterToken(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return localStorage.getItem(TOKEN_KEY);
  }

  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function salvarUsuario(usuario: unknown) {
  const dados = JSON.stringify(usuario);

  if (Platform.OS === 'web') {
    localStorage.setItem(USER_KEY, dados);
    return;
  }

  await SecureStore.setItemAsync(USER_KEY, dados);
}

export async function obterUsuario(): Promise<any | null> {
  const dados =
    Platform.OS === 'web'
      ? localStorage.getItem(USER_KEY)
      : await SecureStore.getItemAsync(USER_KEY);

  return dados ? JSON.parse(dados) : null;
}

export async function limparAutenticacao() {
  if (Platform.OS === 'web') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return;
  }

  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(USER_KEY);
}
