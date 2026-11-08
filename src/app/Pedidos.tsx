import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusPedido, useCarrinho } from "../constants/CarrinhoContext";

const coresStatus: Record<StatusPedido, { fundo: string; texto: string }> = {
  "Em preparo": { fundo: "#fff4e6", texto: "#ff7a00" },
  "Saiu para entrega": { fundo: "#e7f1ff", texto: "#0d6efd" },
  Entregue: { fundo: "#dff5e7", texto: "#198754" },
  Cancelado: { fundo: "#fde8e8", texto: "#dc3545" },
};

export default function PedidosScreen() {
  const router = useRouter();
  const { pedidos } = useCarrinho();

  const formatarPreco = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatarData = (iso: string) => {
    return new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>📦 Meus pedidos</Text>
            <Text style={styles.headerSubtitle}>
              {pedidos.length} {pedidos.length === 1 ? "pedido" : "pedidos"}
            </Text>
          </View>
        </View>

        {pedidos.length === 0 ? (
          /* SEM PEDIDOS */
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>📦</Text>
            <Text style={styles.emptyTitle}>Nenhum pedido ainda</Text>
            <Text style={styles.emptyText}>
              Quando você finalizar um pedido, ele aparece aqui.
            </Text>

            <TouchableOpacity
              style={styles.emptyButton}
              activeOpacity={0.85}
              onPress={() => router.push("/Bebidas")}
            >
              <Text style={styles.emptyButtonText}>Ver bebidas</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {pedidos.map((pedido) => {
              const cor = coresStatus[pedido.status];
              const quantidadeItens = pedido.itens.reduce(
                (soma, i) => soma + i.quantidade,
                0,
              );

              return (
                <View key={pedido.id} style={styles.orderCard}>
                  {/* TOPO */}
                  <View style={styles.orderTopRow}>
                    <View>
                      <Text style={styles.orderTitle}>Pedido #{pedido.id}</Text>
                      <Text style={styles.orderDate}>
                        {formatarData(pedido.data)}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: cor.fundo },
                      ]}
                    >
                      <Text style={[styles.statusText, { color: cor.texto }]}>
                        {pedido.status}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  {/* ITENS */}
                  {pedido.itens.map((item) => (
                    <View key={item.id} style={styles.itemRow}>
                      <Text style={styles.itemName} numberOfLines={1}>
                        {item.quantidade}x {item.nome}
                      </Text>
                      <Text style={styles.itemPrice}>
                        {formatarPreco(item.preco * item.quantidade)}
                      </Text>
                    </View>
                  ))}

                  <View style={styles.divider} />

                  {/* TOTAL */}
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>
                      Total ({quantidadeItens}{" "}
                      {quantidadeItens === 1 ? "item" : "itens"})
                    </Text>
                    <Text style={styles.totalValue}>
                      {formatarPreco(pedido.total)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
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

  /* LISTA */

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  orderCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
  },

  orderTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  orderTitle: {
    color: "#222",
    fontSize: 18,
    fontWeight: "800",
  },

  orderDate: {
    color: "#888",
    fontSize: 13,
    marginTop: 3,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#eeeeee",
    marginVertical: 12,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  itemName: {
    flex: 1,
    color: "#444",
    fontSize: 15,
    marginRight: 10,
  },

  itemPrice: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    color: "#222",
    fontSize: 15,
    fontWeight: "700",
  },

  totalValue: {
    color: "#ff7a00",
    fontSize: 20,
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
