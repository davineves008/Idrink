import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/home.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/explore.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="Bebidas">
        <NativeTabs.Trigger.Label>Bebidas</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="cup.and.saucer.fill" md="local_cafe" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="Lanches">
        <NativeTabs.Trigger.Label>Lanches</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="fork.knife" md="lunch_dining" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="carrinho">
        <NativeTabs.Trigger.Label>Carrinho</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="cart.fill" md="shopping_cart" />
      </NativeTabs.Trigger>

      {/* Pedidos existe como rota, mas não aparece na barra */}
      <NativeTabs.Trigger name="pedidos" hidden />
    </NativeTabs>
  );
}
