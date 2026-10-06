
import React, { useState } from 'react';
import {
  Alert,
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

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert(
        'Atenção',
        'Preencha o e-mail e a senha.'
      );
      return;
    }

    // Por enquanto apenas teste.
    // Depois vamos conectar com o seu ASP.NET Core.
    console.log('E-mail:', email);
    console.log('Senha:', senha);

    Alert.alert(
      'Login',
      'Login realizado com sucesso!'
    );
  };

  const handleCadastro = () => {
    Alert.alert(
      'Cadastro',
      'Tela de cadastro será criada em breve.'
    );
  };

  const handleEsqueciSenha = () => {
    Alert.alert(
      'Recuperar senha',
      'Tela de recuperação de senha será criada em breve.'
    );
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
            <View style={styles.loginContainer}>

              {/* LOGO */}
              <View style={styles.logoArea}>

                <View style={styles.logoIcon}>
                  <Text style={styles.logoEmoji}>🍔</Text>
                  <Text style={styles.logoEmoji}>🥤</Text>
                </View>

                <Text style={styles.logoTitle}>
                  IDrink
                </Text>

                <Text style={styles.logoSubtitle}>
                  Pedidos rápidos e práticos
                </Text>

              </View>

              {/* E-MAIL */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  E-mail
                </Text>

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputIcon}>
                    ✉️
                  </Text>

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
                </View>
              </View>

              {/* SENHA */}
              <View style={styles.inputGroup}>

                <View style={styles.passwordHeader}>
                  <Text style={styles.label}>
                    Senha
                  </Text>

                  <TouchableOpacity
                    onPress={handleEsqueciSenha}
                  >
                    <Text style={styles.forgotLink}>
                      Esqueceu a senha?
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputIcon}>
                    🔒
                  </Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Sua senha"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                  />
                </View>

              </View>

              {/* BOTÃO ENTRAR */}
              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.8}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>
                  Entrar
                </Text>
              </TouchableOpacity>

              {/* CADASTRO */}
              <View style={styles.footer}>

                <Text style={styles.footerText}>
                  Ainda não possui uma conta?
                </Text>

                <TouchableOpacity
                  onPress={handleCadastro}
                >
                  <Text style={styles.createAccount}>
                    Criar conta
                  </Text>
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
  container: {
    flex: 1,
    backgroundColor: '#ff7a00',
  },

  safeArea: {
    flex: 1,
  },

  keyboard: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  /* CARD */

  loginContainer: {
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
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,

    elevation: 10,
  },

  /* LOGO */

  logoArea: {
    alignItems: 'center',
    marginBottom: 35,
  },

  logoIcon: {
    width: 110,
    height: 110,

    borderRadius: 55,

    backgroundColor: '#ff7a00',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 15,

    shadowColor: '#ff7a00',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 15,

    elevation: 8,
  },

  logoEmoji: {
    fontSize: 34,
    lineHeight: 38,
  },

  logoTitle: {
    color: '#ff6b00',
    fontSize: 48,
    fontWeight: '800',
  },

  logoSubtitle: {
    marginTop: 6,
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },

  /* INPUTS */

  inputGroup: {
    marginBottom: 22,
  },

  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  forgotLink: {
    color: '#ff6b00',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },

  inputWrapper: {
    height: 52,
    position: 'relative',
    justifyContent: 'center',
  },

  inputIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 2,
    fontSize: 18,
  },

  input: {
    width: '100%',
    height: 52,

    borderWidth: 1,
    borderColor: '#ddd',

    borderRadius: 12,

    backgroundColor: '#fafafa',

    paddingLeft: 48,
    paddingRight: 15,

    fontSize: 15,
    color: '#333',
  },

  /* BOTÃO */

  loginButton: {
    height: 55,
    width: '100%',

    borderRadius: 14,

    backgroundColor: '#ff7a00',

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 5,

    shadowColor: '#ff7a00',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    elevation: 5,
  },

  loginButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  /* FOOTER */

  footer: {
    alignItems: 'center',
    marginTop: 25,
  },

  footerText: {
    color: '#777',
    fontSize: 14,
    marginBottom: 5,
  },

  createAccount: {
    color: '#ff6b00',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
