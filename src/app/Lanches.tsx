import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CATEGORIAS } from '../constants/categorias';
import { getProdutos, Produto } from '../services/api';
import { useCarrinho } from '../constants/contextCarrinho';

// Quando o produto não tem imagem, mostramos um emoji de acordo com o nome.
function emojiDoLanche(nome: string) {
  const n = nome.toLowerCase();

  if (n.includes('pizza')) return '🍕';
  if (n.includes('hot dog') || n.includes('cachorro')) return '🌭';
  if (n.includes('batata')) return '🍟';
  if (n.includes('sanduíche') || n.includes('sanduiche') || n.includes('x-')) return '🥪';
  if (n.includes('pastel') || n.includes('coxinha') || n.includes('salgado')) return '🥟';
  if (n.includes('burrito') || n.includes('wrap')) return '🌯';
  return '🍔';
}

export default function LanchesScreen() {
  const [lanches, setLanches] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const { adicionar } = useCarrinho();
  const [adicionadoId, setAdicionadoId] = useState<number | null>(null);

  const carregarLanches = useCallback(async () => {
    setLoading(true);
    setErro(null);

    try {
      const dados = await getProdutos(CATEGORIAS.LANCHES);
      setLanches(dados);
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarLanches();
  }, [carregarLanches]);

  const adicionarCarrinho = (lanche: Produto) => {
    adicionar({
      id: lanche.id,
      nome: lanche.nome,
      preco: Number(lanche.preco),
    });

    setAdicionadoId(lanche.id);
    setTimeout(() => setAdicionadoId(null), 1200);
  };

  const formatarPreco = (valor: number) => {
    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* CABEÇALHO */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>🍔 Lanches</Text>
              <Text style={styles.headerSubtitle}>
                Feitos na hora, do jeito que você gosta
              </Text>
            </View>

            <TouchableOpacity
              style={styles.cartButton}
              activeOpacity={0.8}
              onPress={() => console.log('Abrindo carrinho')}
            >
              <Text style={styles.cartIcon}>🛒</Text>
            </TouchableOpacity>
          </View>

          {/* BANNER */}
          <View style={styles.banner}>
            <Text style={styles.bannerEmoji}>🍔</Text>

            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>
                Bateu a fome? 🔥
              </Text>

              <Text style={styles.bannerText}>
                Escolha seu lanche favorito e receba quentinho.
              </Text>
            </View>
          </View>

          {/* TÍTULO */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Nossos lanches
              </Text>

              {!loading && !erro && (
                <Text style={styles.sectionSubtitle}>
                  {lanches.length} produtos disponíveis
                </Text>
              )}
            </View>
          </View>

          {/* CARREGANDO */}
          {loading && (
            <View style={styles.stateContainer}>
              <ActivityIndicator size="large" color="#ff7a00" />
              <Text style={styles.stateText}>Carregando lanches...</Text>
            </View>
          )}

          {/* ERRO */}
          {!loading && erro && (
            <View style={styles.stateContainer}>
              <Text style={styles.stateTitle}>
                Não foi possível carregar os lanches
              </Text>

              <Text style={styles.stateText}>{erro}</Text>

              <TouchableOpacity
                style={styles.retryButton}
                activeOpacity={0.85}
                onPress={carregarLanches}
              >
                <Text style={styles.addButtonText}>Tentar novamente</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* LISTA VAZIA */}
          {!loading && !erro && lanches.length === 0 && (
            <View style={styles.stateContainer}>
              <Text style={styles.stateTitle}>Nenhum lanche cadastrado</Text>
              <Text style={styles.stateText}>
                Volte mais tarde para ver as novidades.
              </Text>
            </View>
          )}

          {/* PRODUTOS */}
          {!loading && !erro && (
            <View style={styles.productsContainer}>
              {lanches.map((lanche) => (
                <View key={lanche.id} style={styles.productCard}>

                  {/* IMAGEM */}
                  <View style={styles.productImageContainer}>
                    {lanche.imagemUrl ? (
                      <Image
                        source={{ uri: lanche.imagemUrl }}
                        style={styles.productImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.imagePlaceholder}>
                        <Text style={styles.placeholderEmoji}>
                          {emojiDoLanche(lanche.nome)}
                        </Text>
                      </View>
                    )}

                    {!lanche.ativo && (
                      <View style={styles.unavailableOverlay}>
                        <Text style={styles.unavailableText}>
                          Indisponível
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* CONTEÚDO */}
                  <View style={styles.productBody}>

                    <Text
                      style={styles.productName}
                      numberOfLines={1}
                    >
                      {lanche.nome}
                    </Text>

                    <Text
                      style={styles.productDescription}
                      numberOfLines={2}
                    >
                      {lanche.descricao}
                    </Text>

                    {/* PREÇO */}
                    <Text style={styles.price}>
                      {formatarPreco(lanche.preco)}
                    </Text>

                    {/* ESTOQUE */}
                    <View style={styles.stockRow}>
                      <Text style={styles.stockLabel}>
                        Estoque:
                      </Text>

                      <View
                        style={[
                          styles.stockBadge,
                          lanche.estoque <= 5
                            ? styles.stockLow
                            : styles.stockOk,
                        ]}
                      >
                        <Text
                          style={[
                            styles.stockText,
                            lanche.estoque <= 5
                              ? styles.stockLowText
                              : styles.stockOkText,
                          ]}
                        >
                          {lanche.estoque}
                        </Text>
                      </View>
                    </View>

                    {/* STATUS */}
                    <View style={styles.statusContainer}>
                      {lanche.ativo ? (
                        <View style={styles.availableBadge}>
                          <Text style={styles.availableText}>
                            🟢 Disponível
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.unavailableBadge}>
                          <Text style={styles.unavailableBadgeText}>
                            🔴 Indisponível
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* BOTÃO */}
                    {lanche.ativo ? (
                      <TouchableOpacity
                        style={styles.addButton}
                        activeOpacity={0.85}
                        onPress={() => adicionarCarrinho(lanche)}
                      >
                        <Text style={styles.addButtonText}>
                          {adicionadoId === lanche.id
                            ? '✓ Adicionado'
                            : '🛒 Adicionar'}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.disabledButton}>
                        <Text style={styles.disabledButtonText}>
                          Indisponível
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* RODAPÉ */}
          <View style={styles.footer}>
            <View style={styles.footerLine} />

            <Text style={styles.footerLogo}>
              🍔 IDrink
            </Text>

            <Text style={styles.footerText}>
              Seu delivery favorito de lanches e bebidas.
            </Text>

            <Text style={styles.footerCopyright}>
              © {new Date().getFullYear()} IDrink
            </Text>

            <Text style={styles.footerRights}>
              Todos os direitos reservados.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },

  safeArea: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  /* HEADER */

  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },

  headerTitle: {
    color: '#ff6b00',
    fontSize: 26,
    fontWeight: '800',
  },

  headerSubtitle: {
    color: '#888',
    fontSize: 13,
    marginTop: 3,
  },

  cartButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#fff3e8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cartIcon: {
    fontSize: 22,
  },

  /* BANNER */

  banner: {
    height: 190,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#ff7a00',
  },

  bannerEmoji: {
    position: 'absolute',
    top: 10,
    right: 14,
    fontSize: 110,
    opacity: 0.25,
  },

  bannerContent: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
  },

  bannerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
  },

  bannerText: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },

  /* SECTION */

  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  sectionTitle: {
    color: '#222',
    fontSize: 24,
    fontWeight: '800',
  },

  sectionSubtitle: {
    color: '#888',
    fontSize: 14,
    marginTop: 3,
  },

  /* ESTADOS (carregando, erro, vazio) */

  stateContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  stateTitle: {
    color: '#222',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },

  stateText: {
    color: '#777',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },

  retryButton: {
    height: 48,
    paddingHorizontal: 28,
    backgroundColor: '#ff7a00',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },

  /* PRODUTOS */

  productsContainer: {
    paddingHorizontal: 20,
  },

  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.09,
    shadowRadius: 10,

    elevation: 4,
  },

  productImageContainer: {
    width: '100%',
    height: 190,
    position: 'relative',
    backgroundColor: '#f8f8f8',
  },

  productImage: {
    width: '100%',
    height: '100%',
  },

  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff3e8',
  },

  placeholderEmoji: {
    fontSize: 72,
  },

  unavailableOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.50)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  unavailableText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },

  productBody: {
    padding: 18,
  },

  productName: {
    color: '#222',
    fontSize: 20,
    fontWeight: '800',
  },

  productDescription: {
    color: '#777',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },

  price: {
    color: '#ff7a00',
    fontSize: 21,
    fontWeight: '800',
    marginTop: 14,
  },

  /* ESTOQUE */

  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  stockLabel: {
    color: '#666',
    fontSize: 14,
    marginRight: 8,
  },

  stockBadge: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 20,
  },

  stockOk: {
    backgroundColor: '#e9f9ef',
  },

  stockLow: {
    backgroundColor: '#fff4e6',
  },

  stockText: {
    fontSize: 12,
    fontWeight: '700',
  },

  stockOkText: {
    color: '#198754',
  },

  stockLowText: {
    color: '#ff7a00',
  },

  /* STATUS */

  statusContainer: {
    marginTop: 12,
  },

  availableBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dff5e7',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  availableText: {
    color: '#198754',
    fontSize: 12,
    fontWeight: '700',
  },

  unavailableBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#eeeeee',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  unavailableBadgeText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '700',
  },

  /* BOTÃO */

  addButton: {
    height: 48,
    backgroundColor: '#ff7a00',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },

  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },

  disabledButton: {
    height: 48,
    backgroundColor: '#d6d6d6',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },

  disabledButtonText: {
    color: '#777',
    fontSize: 15,
    fontWeight: '700',
  },

  /* FOOTER */

  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  footerLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 25,
  },

  footerLogo: {
    color: '#ff6b00',
    fontSize: 22,
    fontWeight: '800',
  },

  footerText: {
    color: '#777',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 7,
    lineHeight: 20,
  },

  footerCopyright: {
    color: '#999',
    fontSize: 12,
    marginTop: 15,
  },

  footerRights: {
    color: '#aaa',
    fontSize: 11,
    marginTop: 3,
  },
});