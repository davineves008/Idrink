import { useCallback, useState } from 'react';
import { Text, View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { request } from '../services/api';

type Pedido = { id: number; dataPedido: string; valorTotal: number; status: string };

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregando, setCarregando] = useState(false);

  const carregar = async () => {
    setCarregando(true);
    try {
      setPedidos(await request<Pedido[]>('/pedidos'));
    } catch {
      setPedidos([]);
    } finally {
      setCarregando(false);
    }
  };

  useFocusEffect(useCallback(() => { carregar(); }, []));

  return (
    <FlatList
      style={s.container}
      data={pedidos}
      keyExtractor={p => String(p.id)}
      refreshControl={<RefreshControl refreshing={carregando} onRefresh={carregar} />}
      ListEmptyComponent={<Text style={s.vazio}>Nenhum pedido ainda</Text>}
      renderItem={({ item }) => (
        <View style={s.card}>
          <Text style={s.titulo}>Pedido #{item.id}</Text>
          <Text>{new Date(item.dataPedido).toLocaleDateString('pt-BR')}</Text>
          <Text>Status: {item.status}</Text>
          <Text style={s.total}>R$ {item.valorTotal.toFixed(2)}</Text>
        </View>
      )}
    />
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  vazio: { textAlign: 'center', marginTop: 40, fontSize: 16 },
  card: { padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 10 },
  titulo: { fontWeight: 'bold', fontSize: 16 },
  total: { marginTop: 4, fontWeight: 'bold' },
});