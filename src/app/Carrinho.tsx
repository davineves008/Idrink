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

export default function CarrinhoScreen() {
  const router = useRouter();
  const { itens, alterarQuantidade, remover, limpar, total, finalizarPedido } =
    useCarrinho();

  const quantidadeTotal = itens.reduce((soma, i) => soma + i.quantidade, 0);

  const formatarPreco = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const confirmarLimpar = () => {
    Alert.alert("Limpar carrinho", "Deseja remover todos os itens?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Limpar", style: "destructive", onPress: limpar },
    ]);
  };

  const confirmarPedido = () => {
    if (itens.length === 0) return;

    // TODO: quando a API estiver pronta, enviar o pedido aqui:
    // POST /api/pedidos com { itens: [{ produtoId, quantidade }] }
    // e só criar o pedido local se a resposta for ok.
    const pedido = finalizarPedido();
    if (!pedido) return;

    Alert.alert(
      "Pedido realizado! 🎉",
      `Seu pedido #${pedido.id} foi enviado com sucesso.`,
    );
    router.push("/pedidos");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>🛒 Carrinho</Text>
            <Text style={styles.headerSubtitle}>
              {quantidadeTotal} {quantidadeTotal === 1 ? "item" : "itens"}
            </Text>
          </View>

          {itens.length > 0 ? (
            <TouchableOpacity activeOpacity={0.8} onPress={confirmarLimpar}>
              <Text style={styles.clearText}>Limpar</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.clearPlaceholder} />
          )}
        </View>

        {itens.length === 0 ? (
          /* CARRINHO VAZIO */
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🛒</Text>
            <Text style={styles.emptyTitle}>Seu carrinho está vazio</Text>
            <Text style={styles.emptyText}>
              Adicione bebidas e lanches para montar seu pedido.
            </Text>

            <TouchableOpacity
              style={styles.emptyButton}
              activeOpacity={0.85}
              onPress={() => router.back()}
            >
              <Text style={styles.emptyButtonText}>Ver produtos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* LISTA DE ITENS */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {itens.map((item) => (
                <View key={item.id} style={styles.itemCard}>
                  {item.imagem ? (
                    <Image
                      source={item.imagem}
                      style={styles.itemImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View
                      style={[styles.itemImage, styles.itemImagePlaceholder]}
                    >
                      <Text style={{ fontSize: 28 }}>🥤</Text>
                    </View>
                  )}

                  <View style={styles.itemInfo}>
                    <View style={styles.itemTopRow}>
                      <Text style={styles.itemName} numberOfLines={1}>
                        {item.nome}
                      </Text>

                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => remover(item.id)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Text style={styles.removeIcon}>🗑</Text>
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.itemUnitPrice}>
                      {formatarPreco(item.preco)} cada
                    </Text>

                    <View style={styles.itemBottomRow}>
                      {/* QUANTIDADE */}
                      <View style={styles.quantityBox}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          activeOpacity={0.7}
                          onPress={() => alterarQuantidade(item.id, -1)}
                        >
                          <Text style={styles.quantityButtonText}>−</Text>
                        </TouchableOpacity>

                        <Text style={styles.quantityText}>
                          {item.quantidade}
                        </Text>

                        <TouchableOpacity
                          style={styles.quantityButton}
                          activeOpacity={0.7}
                          onPress={() => alterarQuantidade(item.id, 1)}
                        >
                          <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>

                      {/* SUBTOTAL */}
                      <Text style={styles.itemSubtotal}>
                        {formatarPreco(item.preco * item.quantidade)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* RESUMO / RODAPÉ FIXO */}
            <View style={styles.summary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{formatarPreco(total)}</Text>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatarPreco(total)}</Text>
              </View>

              <TouchableOpacity
                style={styles.checkoutButton}
                activeOpacity={0.85}
                onPress={confirmarPedido}
              >
                <Text style={styles.checkoutButtonText}>Finalizar pedido</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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

  /* HEADER */

  header: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#fff3e8",
    justifyContent: "center",
    alignItems: "center",
  },

  backIcon: {
    color: "#ff6b00",
    fontSize: 22,
    fontWeight: "800",
  },

  headerCenter: {
    flex: 1,
    alignItems: "center",
  },

  headerTitle: {
    color: "#ff6b00",
    fontSize: 24,
    fontWeight: "800",
  },

  headerSubtitle: {
    color: "#888",
    fontSize: 13,
    marginTop: 2,
  },

  clearText: {
    color: "#ff3b30",
    fontSize: 14,
    fontWeight: "700",
    width: 50,
    textAlign: "right",
  },

  clearPlaceholder: {
    width: 50,
  },

  /* LISTA */

  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },

  itemCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 12,
    flexDirection: "row",
    marginBottom: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
  },

  itemImage: {
    width: 92,
    height: 92,
    borderRadius: 14,
    backgroundColor: "#f8f8f8",
  },

  itemImagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },

  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },

  itemTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemName: {
    flex: 1,
    color: "#222",
    fontSize: 17,
    fontWeight: "800",
    marginRight: 8,
  },

  removeIcon: {
    fontSize: 18,
  },

  itemUnitPrice: {
    color: "#888",
    fontSize: 13,
    marginTop: 2,
  },

  itemBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff3e8",
    borderRadius: 20,
  },

  quantityButton: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },

  quantityButtonText: {
    color: "#ff6b00",
    fontSize: 20,
    fontWeight: "800",
  },

  quantityText: {
    minWidth: 24,
    textAlign: "center",
    color: "#222",
    fontSize: 15,
    fontWeight: "800",
  },

  itemSubtotal: {
    color: "#ff7a00",
    fontSize: 17,
    fontWeight: "800",
  },

  /* RESUMO */

  summary: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 10,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  summaryLabel: {
    color: "#777",
    fontSize: 15,
  },

  summaryValue: {
    color: "#444",
    fontSize: 15,
    fontWeight: "700",
  },

  summaryDivider: {
    height: 1,
    backgroundColor: "#eeeeee",
    marginVertical: 12,
  },

  totalLabel: {
    color: "#222",
    fontSize: 18,
    fontWeight: "800",
  },

  totalValue: {
    color: "#ff7a00",
    fontSize: 22,
    fontWeight: "800",
  },

  checkoutButton: {
    height: 52,
    backgroundColor: "#ff7a00",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },

  checkoutButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "800",
  },

  /* VAZIO */

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyEmoji: {
    fontSize: 64,
  },

  emptyTitle: {
    color: "#222",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 14,
  },

  emptyText: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 8,
  },

  emptyButton: {
    height: 48,
    paddingHorizontal: 28,
    backgroundColor: "#ff7a00",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  emptyButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
});
