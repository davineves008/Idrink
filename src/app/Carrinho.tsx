import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { useCarrinho } from '../constants/contextCarrinho';
import { request } from '../services/api';


const PAGAMENTOS = ['Pix', 'Cartão', 'Dinheiro'];

export default function Carrinho() {
  const {
    itens = [],
    alterarQuantidade = () => {},
    remover = () => {},
    limpar = () => {},
    total = 0,
  } = useCarrinho();

  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [obs, setObs] = useState('');
  const [enviando, setEnviando] = useState(false);

    async function finalizar() {
  if (!rua || !numero || !bairro || !cidade || !cep || !pagamento) {
    Alert.alert('Atenção', 'Preencha o endereço e escolha a forma de pagamento.');
    return;
  }
  setEnviando(true);
  try {
    await request<any>('/pedidos', {
      method: 'POST',
      body: JSON.stringify({
        itens: itens.map(i => ({ produtoId: i.id, quantidade: i.quantidade })),
        rua, numero, bairro, cidade, cep,
        formaPagamento: pagamento,
        observacoes: obs,
      }),
    });
    limpar();
    setRua(''); setNumero(''); setBairro(''); setCidade(''); setCep('');
    setPagamento(''); setObs('');
    Alert.alert('Pedido realizado!');
  } catch (e: any) {
    Alert.alert('Erro', e?.message ?? 'Não foi possível finalizar o pedido.');
  } finally {
    setEnviando(false);
  }
}

  const formulario = itens.length > 0 && (
    <View style={s.rodape}>
      <Text style={s.secao}>Endereço de entrega</Text>
      <TextInput style={s.input} placeholder="Rua" value={rua} onChangeText={setRua} />
      <View style={s.linha}>
        <TextInput style={[s.input, { flex: 1 }]} placeholder="Número" value={numero} onChangeText={setNumero} />
        <TextInput style={[s.input, { flex: 2 }]} placeholder="Bairro" value={bairro} onChangeText={setBairro} />
      </View>
      <View style={s.linha}>
        <TextInput style={[s.input, { flex: 2 }]} placeholder="Cidade" value={cidade} onChangeText={setCidade} />
        <TextInput style={[s.input, { flex: 1 }]} placeholder="CEP" keyboardType="numeric" value={cep} onChangeText={setCep} />
      </View>

      <Text style={s.secao}>Forma de pagamento</Text>
      <View style={s.linha}>
        {PAGAMENTOS.map(p => (
          <TouchableOpacity
            key={p}
            style={[s.chip, pagamento === p && s.chipAtivo]}
            onPress={() => setPagamento(p)}
          >
            <Text style={pagamento === p ? s.chipTxtAtivo : undefined}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={s.input}
        placeholder="Observações (opcional)"
        value={obs}
        onChangeText={setObs}
      />

      <Text style={s.total}>Total: R$ {total.toFixed(2)}</Text>
      <TouchableOpacity style={[s.finalizar, enviando && { opacity: 0.6 }]} onPress={finalizar} disabled={enviando}>
        <Text style={s.finalizarTxt}>{enviando ? 'Enviando...' : 'Finalizar pedido'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      style={s.container}
      data={itens}
      keyExtractor={i => String(i.id)}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={<Text style={s.vazio}>Seu carrinho está vazio</Text>}
      ListFooterComponent={formulario || null}
      renderItem={({ item }) => (
        <View style={s.item}>
          <View style={{ flex: 1 }}>
            <Text style={s.nome}>{item.nome}</Text>
            <Text>R$ {(item.preco * item.quantidade).toFixed(2)}</Text>
          </View>
          <TouchableOpacity onPress={() => alterarQuantidade(item.id, -1)}><Text style={s.btn}>−</Text></TouchableOpacity>
          <Text style={s.qtd}>{item.quantidade}</Text>
          <TouchableOpacity onPress={() => alterarQuantidade(item.id, 1)}><Text style={s.btn}>+</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => remover(item.id)}><Text style={s.remover}>🗑</Text></TouchableOpacity>
        </View>
      )}
    />
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  vazio: { textAlign: 'center', marginTop: 40, fontSize: 16 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#ddd', gap: 10 },
  nome: { fontWeight: 'bold', fontSize: 16 },
  btn: { fontSize: 24, paddingHorizontal: 8 },
  qtd: { fontSize: 16, minWidth: 20, textAlign: 'center' },
  remover: { fontSize: 20, marginLeft: 6 },
  rodape: { paddingTop: 16, paddingBottom: 32 },
  secao: { fontWeight: 'bold', fontSize: 16, marginTop: 8, marginBottom: 6 },
  linha: { flexDirection: 'row', gap: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 8 },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, borderColor: '#ccc', marginBottom: 8 },
  chipAtivo: { backgroundColor: '#e63946', borderColor: '#e63946' },
  chipTxtAtivo: { color: '#fff', fontWeight: 'bold' },
  total: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  finalizar: { backgroundColor: '#e63946', padding: 14, borderRadius: 8, alignItems: 'center' },
  finalizarTxt: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});