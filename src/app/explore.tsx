
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { obterUsuario } from '../services/auth';


export default function HomeScreen() {

  const [nomeUsuario, setNomeUsuario] = useState('');

  useEffect(() => {
    async function carregarUsuario() {
      const usuario = await obterUsuario();

      if (usuario) {
        setNomeUsuario(usuario.nome);
      }
    }

    carregarUsuario();
  }, []);



  const handleLanches = () => {
    router.push('/Lanches');
  }
  const handleBebidas = () => {
    router.push('/Bebidas');
  }
  return (
    <View style={styles.container}>

      <SafeAreaView style={styles.safeArea}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* ================= HEADER ================= */}

          <View style={styles.header}>

            <View style={styles.logoContainer}>

              <View style={styles.logoCircle}>
                <Text style={styles.logoEmoji}>🍔</Text>
                <Text style={styles.logoEmoji}>🥤</Text>
              </View>

              <View>
                <Text style={styles.logoTitle}>
                  IDrink
                </Text>

                <Text style={styles.logoSubtitle}>
                  Delivery
                </Text>
              </View>

            </View>

            <TouchableOpacity
              style={styles.profileButton}
              activeOpacity={0.8}
            >
              <Text style={styles.profileIcon}>
                👤
              </Text>
            </TouchableOpacity>

          </View>


          {/* ================= HERO ================= */}

          <View style={styles.hero}>
            <Text style={styles.heroTitle}>
              Olá, {nomeUsuario || 'Cliente'}!
            </Text>

            <Text style={styles.heroSubtitle}>
              O que você deseja pedir hoje?
            </Text>

            <Text style={styles.heroDescription}>
              Escolha sua categoria favorita e faça seu pedido.
            </Text>
          </View>


          {/* ================= CATEGORIAS ================= */}

          <View style={styles.sectionHeader}>

            <Text style={styles.sectionTitle}>
              Categorias
            </Text>

            <Text style={styles.sectionSubtitle}>
              Escolha uma opção
            </Text>

          </View>


          {/* ================= LANCHES ================= */}

          <TouchableOpacity
            style={styles.categoryCard}
            activeOpacity={0.9}
            onPress={handleLanches}
          >

            <View style={styles.categoryImage}>

              <Image
                source={require('../../assets/images/lanches.jpg')}
                style={styles.categoryImagePhoto}
              />

              <View style={styles.imageOverlay} />

            </View>

            <View style={styles.categoryBody}>

              <View style={styles.categoryTitleRow}>

                <Text style={styles.categoryTitle}>
                  🍔 Lanches
                </Text>

                <View style={styles.arrowLanches}>
                  <Text style={styles.arrowText}>
                    →
                  </Text>
                </View>

              </View>

              <Text style={styles.categoryDescription}>
                Hambúrgueres artesanais, pizzas,
                batatas, porções e muito mais.
              </Text>

              <View style={styles.lanchesButton}>
                <Text style={styles.buttonText}>
                  Ver Lanches
                </Text>
              </View>

            </View>

          </TouchableOpacity>


          {/* ================= BEBIDAS ================= */}


          <TouchableOpacity
            style={styles.categoryCard}
            activeOpacity={0.9}
            onPress={handleBebidas}
          >

            <View style={styles.categoryImage}>

              <Image
                source={require('../../assets/images/bebidas.jpg')}
                style={styles.categoryImagePhoto}
              />

              <View style={styles.imageOverlay} />

            </View>

            <View style={styles.categoryBody}>

              <View style={styles.categoryTitleRow}>

                <Text style={styles.categoryTitle}>
                  🥤 Bebidas
                </Text>

                <View style={styles.arrowBebidas}>
                  <Text style={styles.arrowText}>
                    →
                  </Text>
                </View>

              </View>

              <Text style={styles.categoryDescription}>
                Refrigerantes, sucos, energéticos,
                águas e muito mais.
              </Text>

              <View style={styles.bebidasButton}>
                <Text style={styles.buttonText}>
                  Ver Bebidas
                </Text>
              </View>

            </View>

          </TouchableOpacity>




          {/* ================= BENEFÍCIOS ================= */}

          <View style={styles.infoBox}>

            <Text style={styles.infoTitle}>
              Por que pedir no IDrink?
            </Text>


            {/* ENTREGA */}

            <View style={styles.infoItem}>

              <View style={styles.infoIcon}>
                <Text style={styles.infoEmoji}>
                  🚀
                </Text>
              </View>

              <View style={styles.infoText}>

                <Text style={styles.infoItemTitle}>
                  Entrega Rápida
                </Text>

                <Text style={styles.infoDescription}>
                  Receba seu pedido em poucos minutos.
                </Text>

              </View>

            </View>


            {/* PRODUTOS */}

            <View style={styles.infoItem}>

              <View style={styles.infoIcon}>
                <Text style={styles.infoEmoji}>
                  🍔
                </Text>
              </View>

              <View style={styles.infoText}>

                <Text style={styles.infoItemTitle}>
                  Produtos Frescos
                </Text>

                <Text style={styles.infoDescription}>
                  Ingredientes selecionados todos os dias.
                </Text>

              </View>

            </View>


            {/* QUALIDADE */}

            <View style={styles.infoItem}>

              <View style={styles.infoIcon}>
                <Text style={styles.infoEmoji}>
                  ⭐
                </Text>
              </View>

              <View style={styles.infoText}>

                <Text style={styles.infoItemTitle}>
                  Qualidade Garantida
                </Text>

                <Text style={styles.infoDescription}>
                  Satisfação garantida em cada pedido.
                </Text>

              </View>

            </View>

          </View>


          {/* ================= FOOTER ================= */}

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

  /* ================= CONTAINER ================= */

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


  /* ================= HEADER ================= */

  header: {
    backgroundColor: '#ffffff',

    paddingHorizontal: 20,
    paddingVertical: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoCircle: {
    width: 52,
    height: 52,

    borderRadius: 26,

    backgroundColor: '#ff7a00',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 10,
  },

  logoEmoji: {
    fontSize: 18,
    lineHeight: 20,
  },

  logoTitle: {
    color: '#ff6b00',
    fontSize: 26,
    fontWeight: '800',
  },

  logoSubtitle: {
    color: '#888',
    fontSize: 12,
    marginTop: -2,
  },

  profileButton: {
    width: 45,
    height: 45,

    borderRadius: 23,

    backgroundColor: '#fff3e8',

    justifyContent: 'center',
    alignItems: 'center',
  },

  profileIcon: {
    fontSize: 21,
  },


  /* ================= HERO ================= */

  hero: {
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 25,
  },

  heroTitle: {
    color: '#222',
    fontSize: 32,
    fontWeight: '800',
  },

  heroSubtitle: {
    color: '#333',
    fontSize: 22,
    fontWeight: '600',
    marginTop: 4,
  },

  heroDescription: {
    color: '#777',
    fontSize: 15,
    marginTop: 10,
    lineHeight: 22,
  },


  /* ================= SECTION ================= */

  sectionHeader: {
    paddingHorizontal: 22,
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


  /* ================= CATEGORY CARD ================= */

  categoryCard: {
    backgroundColor: '#ffffff',

    marginHorizontal: 20,
    marginBottom: 22,

    borderRadius: 20,

    overflow: 'hidden',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.10,
    shadowRadius: 12,

    elevation: 5,
  },


  /* IMAGEM */

  categoryImage: {
    width: '100%',
    height: 200,

    position: 'relative',
  },

  categoryImagePhoto: {
    width: '100%',
    height: '100%',

    resizeMode: 'cover',
  },

  imageOverlay: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: 'rgba(0,0,0,0.08)',
  },


  /* CORPO DO CARD */

  categoryBody: {
    padding: 22,
  },

  categoryTitleRow: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',
  },

  categoryTitle: {
    color: '#222',
    fontSize: 22,
    fontWeight: '800',
  },

  categoryDescription: {
    color: '#666',

    fontSize: 14,

    lineHeight: 21,

    marginTop: 10,
    marginBottom: 18,
  },


  /* SETAS */

  arrowLanches: {
    width: 38,
    height: 38,

    borderRadius: 19,

    backgroundColor: '#fff0f1',

    justifyContent: 'center',
    alignItems: 'center',
  },

  arrowBebidas: {
    width: 38,
    height: 38,

    borderRadius: 19,

    backgroundColor: '#edf4ff',

    justifyContent: 'center',
    alignItems: 'center',
  },

  arrowText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#555',
  },


  /* ================= BOTÕES ================= */

  lanchesButton: {
    height: 48,

    borderRadius: 10,

    backgroundColor: '#dc3545',

    justifyContent: 'center',
    alignItems: 'center',
  },

  bebidasButton: {
    height: 48,

    borderRadius: 10,

    backgroundColor: '#0d6efd',

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',

    fontSize: 16,

    fontWeight: 'bold',
  },


  /* ================= BENEFÍCIOS ================= */

  infoBox: {
    backgroundColor: '#ffffff',

    marginHorizontal: 20,
    marginTop: 15,

    borderRadius: 18,

    padding: 22,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 4,
  },

  infoTitle: {
    color: '#222',

    fontSize: 20,

    fontWeight: '800',

    marginBottom: 20,
  },

  infoItem: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 20,
  },

  infoIcon: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: '#fff3e8',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 13,
  },

  infoEmoji: {
    fontSize: 21,
  },

  infoText: {
    flex: 1,
  },

  infoItemTitle: {
    color: '#333',

    fontSize: 16,

    fontWeight: '700',

    marginBottom: 3,
  },

  infoDescription: {
    color: '#777',

    fontSize: 13,

    lineHeight: 18,
  },


  /* ================= FOOTER ================= */

  footer: {
    alignItems: 'center',

    paddingHorizontal: 20,
    paddingTop: 35,
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

