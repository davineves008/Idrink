import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';

import {
  Pressable,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppTabs() {
  return (
    <Tabs>

      {/* CONTEÚDO DAS TELAS */}
      <TabSlot style={{ flex: 1 }} />

      {/* MENU INFERIOR */}
      <TabList asChild>
        <CustomTabList>

          {/* LOGIN */}
          <TabTrigger name="index" href="/" asChild>
            <TabButton>
              <Text style={styles.iconText}>👤</Text>
              <Text style={styles.label}>Login</Text>
            </TabButton>
          </TabTrigger>

          {/* HOME */}
          <TabTrigger name="home" href="/explore" asChild>
            <TabButton>
              <Text style={styles.iconText}>🏠</Text>
              <Text style={styles.label}>Home</Text>
            </TabButton>
          </TabTrigger>

          {/* BEBIDAS */}
          <TabTrigger name="Bebidas" href="/Bebidas" asChild>
            <TabButton>
              <Text style={styles.iconText}>🥤</Text>
              <Text style={styles.label}>Bebidas</Text>
            </TabButton>
          </TabTrigger>

          {/* LANCHES */}
          <TabTrigger name="Lanches" href="/Lanches" asChild>
            <TabButton>
              <Text style={styles.iconText}>🍔</Text>
              <Text style={styles.label}>Lanches</Text>
            </TabButton>
          </TabTrigger>

          {/* PEDIDOS */}
          <TabTrigger name="Pedidos" href="/Pedidos" asChild>
            <TabButton>
              <Text style={styles.iconText}>🧾</Text>
              <Text style={styles.label}>Pedidos</Text>
            </TabButton>
          </TabTrigger>

          {/* CARRINHO */}
          <TabTrigger name="Carrinho" href="/Carrinho" asChild>
            <TabButton>
              <Text style={styles.iconText}>🛒</Text>
              <Text style={styles.label}>Carrinho</Text>
            </TabButton>
          </TabTrigger>

          {/* CADASTRO (registrado, mas escondido do menu) */}
          <TabTrigger
            name="cadastro"
            href="/cadastro"
            style={{ display: 'none' }}
          />

        </CustomTabList>
      </TabList>

    </Tabs>
  );
}


/* ==========================================
   BOTÃO
========================================== */

export function TabButton({
  children,
  isFocused,
  ...props
}: TabTriggerSlotProps) {

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.tabButton,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.tabButtonView,
          isFocused && styles.tabButtonActive,
        ]}
      >
        {children}
      </View>
    </Pressable>
  );
}


/* ==========================================
   MENU
========================================== */

export function CustomTabList(props: TabListProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      {...props}
      style={[
        styles.tabListContainer,
        { paddingBottom: Math.max(insets.bottom, 10) },
      ]}
    >
      <View style={styles.innerContainer}>

        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🍹</Text>
          <Text style={styles.logoText}>IDrink</Text>
        </View>

        {/* BOTÕES */}
        <View style={styles.buttonsContainer}>
          {props.children}
        </View>

      </View>
    </View>
  );
}


/* ==========================================
   ESTILOS
========================================== */

const styles = StyleSheet.create({

  tabListContainer: {
    position: 'absolute',

    bottom: 0,
    left: 0,
    right: 0,

    paddingHorizontal: 8,
    paddingBottom: 10,

    backgroundColor: 'transparent',
  },

  innerContainer: {
    minHeight: 72,

    backgroundColor: '#ff7a00',

    borderRadius: 18,

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 8,

    elevation: 8,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: -3,
    },

    shadowOpacity: 0.15,

    shadowRadius: 8,
  },

  logoContainer: {
    width: 50,

    alignItems: 'center',

    justifyContent: 'center',

    marginRight: 5,
  },

  logo: {
    fontSize: 21,
  },

  logoText: {
    color: '#fff',

    fontSize: 11,

    fontWeight: '800',
  },

  buttonsContainer: {
    flex: 1,

    flexDirection: 'row',

    justifyContent: 'space-around',

    alignItems: 'center',
  },

  tabButton: {
    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',
  },

  tabButtonView: {
    minWidth: 50,

    paddingVertical: 7,

    paddingHorizontal: 3,

    borderRadius: 12,

    alignItems: 'center',

    justifyContent: 'center',
  },

  tabButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },

  iconText: {
    fontSize: 18,

    marginBottom: 2,
  },

  label: {
    color: '#fff',

    fontSize: 9,

    fontWeight: '600',

    textAlign: 'center',
  },

  pressed: {
    opacity: 0.65,
  },

});