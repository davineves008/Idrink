import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCarrinho } from "../constants/CarrinhoContext";

interface Bebida {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imagem: any;
  ativo: boolean;
}

export default function BebidasScreen() {
  const router = useRouter();
  const { adicionar, itens } = useCarrinho();

  const quantidadeTotal = itens.reduce((soma, i) => soma + i.quantidade, 0);

  // Por enquanto os produtos estão fixos.
  // Depois vamos substituir pela API do ASP.NET.
  const bebidas: Bebida[] = [
    {
      id: 1,
      nome: "Coca-Cola",
      descricao: "Refrigerante Coca-Cola gelado.",
      preco: 6.5,
      estoque: 12,
      imagem: require("../../assets/images/Coca-cola.jpg"),
      ativo: true,
    },
    {
      id: 2,
      nome: "Guaraná Antarctica",
      descricao: "Refrigerante Guaraná Antarctica.",
      preco: 6.0,
      estoque: 8,
      imagem: require("../../assets/images/Pepsi.jpg"),
      ativo: true,
    },
    {
      id: 3,
      nome: "Suco Natural",
      descricao: "Suco natural preparado na hora.",
      preco: 8.5,
      estoque: 5,
      imagem: require("../../assets/images/Tang.jpg"),
      ativo: true,
    },
    {
      id: 4,
      nome: "Água Mineral",
      descricao: "Água mineral sem gás.",
      preco: 3.5,
      estoque: 15,
      imagem: require("../../assets/images/bebidas.jpg"),
      ativo: true,
    },
    {
      id: 5,
      nome: "Energético",
      descricao: "Energético para dar aquele gás.",
      preco: 10.0,
      estoque: 3,
      imagem: require("../../assets/images/bebidas.jpg"),
      ativo: true,
    },
    {
      id: 6,
      nome: "Fanta Laranja",
      descricao: "Refrigerante Fanta sabor laranja.",
      preco: 6.0,
      estoque: 0,
      imagem: require("../../assets/images/bebidas.jpg"),
      ativo: false,
    },
  ];

  const formatarPreco = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const adicionarCarrinho = (bebida: Bebida) => {
    if (!bebida.ativo) return;

    adicionar({
      id: bebida.id,
      nome: bebida.nome,
      preco: bebida.preco,
      imagem: bebida.imagem,
    });

    Alert.alert("Adicionado!", `${bebida.nome} foi para o carrinho.`);
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
              <Text style={styles.headerTitle}>🥤 Bebidas</Text>
              <Text style={styles.headerSubtitle}>Refresque seu pedido</Text>
            </View>

            <TouchableOpacity
              style={styles.cartButton}
              activeOpacity={0.8}
              onPress={() => router.push("/carrinho")}
            >
              <Text style={styles.cartIcon}>🛒</Text>

              {quantidadeTotal > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{quantidadeTotal}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* BANNER */}
          <View style={styles.banner}>
            <Image
              source={require("../../assets/images/bebidas.jpg")}
              style={styles.bannerImage}
            />

            <View style={styles.bannerOverlay} />

            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Bebidas geladas 🧊</Text>

              <Text style={styles.bannerText}>
                Escolha sua bebida favorita para acompanhar seu pedido.
              </Text>
            </View>
          </View>

          {/* TÍTULO */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Nossas bebidas</Text>

              <Text style={styles.sectionSubtitle}>
                {bebidas.length} produtos disponíveis
              </Text>
            </View>
          </View>

          {/* PRODUTOS */}
          <View style={styles.productsContainer}>
            {bebidas.map((bebida) => (
              <View key={bebida.id} style={styles.productCard}>
                {/* IMAGEM */}
                <View style={styles.productImageContainer}>
                  <Image
                    source={bebida.imagem}
                    style={styles.productImage}
                    resizeMode="contain"
                  />

                  {!bebida.ativo && (
                    <View style={styles.unavailableOverlay}>
                      <Text style={styles.unavailableText}>Indisponível</Text>
                    </View>
                  )}
                </View>

                {/* CONTEÚDO */}
                <View style={styles.productBody}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {bebida.nome}
                  </Text>

                  <Text style={styles.productDescription} numberOfLines={2}>
                    {bebida.descricao}
                  </Text>

                  {/* PREÇO */}
                  <Text style={styles.price}>
                    {formatarPreco(bebida.preco)}
                  </Text>

                  {/* ESTOQUE */}
                  <View style={styles.stockRow}>
                    <Text style={styles.stockLabel}>Estoque:</Text>

                    <View
                      style={[
                        styles.stockBadge,
                        bebida.estoque <= 5 ? styles.stockLow : styles.stockOk,
                      ]}
                    >
                      <Text
                        style={[
                          styles.stockText,
                          bebida.estoque <= 5
                            ? styles.stockLowText
                            : styles.stockOkText,
                        ]}
                      >
                        {bebida.estoque}
                      </Text>
                    </View>
                  </View>

                  {/* STATUS */}
                  <View style={styles.statusContainer}>
                    {bebida.ativo ? (
                      <View style={styles.availableBadge}>
                        <Text style={styles.availableText}>🟢 Disponível</Text>
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
                  {bebida.ativo ? (
                    <TouchableOpacity
                      style={styles.addButton}
                      activeOpacity={0.85}
                      onPress={() => adicionarCarrinho(bebida)}
                    >
                      <Text style={styles.addButtonText}>🛒 Adicionar</Text>
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

          {/* RODAPÉ */}
          <View style={styles.footer}>
            <View style={styles.footerLine} />

            <Text style={styles.footerLogo}>🍔 IDrink</Text>

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
    backgroundColor: "#f5f6fa",
  },

  safeArea: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  /* HEADER */

  header: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  headerTitle: {
    color: "#ff6b00",
    fontSize: 26,
    fontWeight: "800",
  },

  headerSubtitle: {
    color: "#888",
    fontSize: 13,
    marginTop: 3,
  },

  cartButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#fff3e8",
    justifyContent: "center",
    alignItems: "center",
  },

  cartIcon: {
    fontSize: 22,
  },

  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ff3b30",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },

  cartBadgeText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "800",
  },

  /* BANNER */

  banner: {
    height: 190,
    margin: 20,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },

  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  bannerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.40)",
  },

  bannerContent: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
  },

  bannerTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
  },

  bannerText: {
    color: "#ffffff",
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
    color: "#222",
    fontSize: 24,
    fontWeight: "800",
  },

  sectionSubtitle: {
    color: "#888",
    fontSize: 14,
    marginTop: 3,
  },

  /* PRODUTOS */

  productsContainer: {
    paddingHorizontal: 20,
  },

  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.09,
    shadowRadius: 10,

    elevation: 4,
  },

  productImageContainer: {
    width: "100%",
    height: 190,
    position: "relative",
    backgroundColor: "#f8f8f8",
  },

  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  unavailableOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.50)",
    justifyContent: "center",
    alignItems: "center",
  },

  unavailableText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
  },

  productBody: {
    padding: 18,
  },

  productName: {
    color: "#222",
    fontSize: 20,
    fontWeight: "800",
  },

  productDescription: {
    color: "#777",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },

  price: {
    color: "#ff7a00",
    fontSize: 21,
    fontWeight: "800",
    marginTop: 14,
  },

  /* ESTOQUE */

  stockRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  stockLabel: {
    color: "#666",
    fontSize: 14,
    marginRight: 8,
  },

  stockBadge: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 20,
  },

  stockOk: {
    backgroundColor: "#e9f9ef",
  },

  stockLow: {
    backgroundColor: "#fff4e6",
  },

  stockText: {
    fontSize: 12,
    fontWeight: "700",
  },

  stockOkText: {
    color: "#198754",
  },

  stockLowText: {
    color: "#ff7a00",
  },

  /* STATUS */

  statusContainer: {
    marginTop: 12,
  },

  availableBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#dff5e7",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  availableText: {
    color: "#198754",
    fontSize: 12,
    fontWeight: "700",
  },

  unavailableBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#eeeeee",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  unavailableBadgeText: {
    color: "#666",
    fontSize: 12,
    fontWeight: "700",
  },

  /* BOTÃO */

  addButton: {
    height: 48,
    backgroundColor: "#ff7a00",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },

  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },

  disabledButton: {
    height: 48,
    backgroundColor: "#d6d6d6",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },

  disabledButtonText: {
    color: "#777",
    fontSize: 15,
    fontWeight: "700",
  },

  /* FOOTER */

  footer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  footerLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#ddd",
    marginBottom: 25,
  },

  footerLogo: {
    color: "#ff6b00",
    fontSize: 22,
    fontWeight: "800",
  },

  footerText: {
    color: "#777",
    fontSize: 14,
    textAlign: "center",
    marginTop: 7,
    lineHeight: 20,
  },

  footerCopyright: {
    color: "#999",
    fontSize: 12,
    marginTop: 15,
  },

  footerRights: {
    color: "#aaa",
    fontSize: 11,
    marginTop: 3,
  },
});
