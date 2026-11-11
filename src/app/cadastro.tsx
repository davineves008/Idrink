import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { request } from '../services/api';
import { login } from '../services/auth';

export default function CadastroScreen() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleCadastro = async () => {
    setErro(null);

    if (!nome.trim() || !email.trim() || !senha) {
      setErro('Preencha nome, e-mail e senha.');
      return;
    }
    if (senha.length < 6) {
      setErro('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }
    if (senha !== confirmar) {
      setErro('As senhas não conferem.');
      return;
    }

    try {
      setCarregando(true);

      await request<any>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          senha,
        }),
      });

      // Conta criada: já entra no app
      await login(email.trim(), senha);
      router.replace('/explore');
    } catch (e: any) {
      setErro(e?.message || 'Não foi possível criar a conta.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>
              <Text style={styles.title}>Criar conta</Text>
              <Text style={styles.subtitle}>
                Cadastre-se para fazer seus pedidos
              </Text>

              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu nome"
                placeholderTextColor="#999"
                value={nome}
                onChangeText={setNome}
              />

              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor="#999"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
              />

              <Text style={styles.label}>Confirmar senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Repita a senha"
                placeholderTextColor="#999"
                secureTextEntry
                value={confirmar}
                onChangeText={setConfirmar}
              />

              {erro && <Text style={styles.erro}>{erro}</Text>}

              <TouchableOpacity
                style={[styles.button, carregando && { opacity: 0.7 }]}
                activeOpacity={0.8}
                onPress={handleCadastro}
                disabled={carregando}
              >
                {carregando ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.buttonText}>Criar conta</Text>
                )}
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Já possui uma conta?</Text>
                <TouchableOpacity onPress={() => router.replace('/')}>
                  <Text style={styles.link}>Entrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ff7a00' },
  safeArea: { flex: 1 },
  keyboard: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  card: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 28,
    paddingVertical: 35,
    borderTopWidth: 5,
    borderTopColor: '#ff7a00',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },

  title: { color: '#ff6b00', fontSize: 32, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: '#666', fontSize: 15, textAlign: 'center', marginTop: 6, marginBottom: 24 },

  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fafafa',
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#333',
    marginBottom: 18,
  },

  erro: { color: '#d62828', fontSize: 14, fontWeight: '600', marginBottom: 14, textAlign: 'center' },

  button: {
    height: 55,
    width: '100%',
    borderRadius: 14,
    backgroundColor: '#ff7a00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#ff7a00',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: { color: '#ffffff', fontSize: 17, fontWeight: 'bold' },

  footer: { alignItems: 'center', marginTop: 25 },
  footerText: { color: '#777', fontSize: 14, marginBottom: 5 },
  link: { color: '#ff6b00', fontSize: 15, fontWeight: 'bold' },
});