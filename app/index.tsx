import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import MenuButton from "../src/components/MenuButton";

export default function MenuScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cine Express</Text>
      <Text style={styles.subtitle}>Herramientas rápidas para taquilla y combos</Text>

      <View style={{ gap: 12, marginTop: 14 }}>
        <MenuButton
          title="Cartelera"
          subtitle="Busca películas"
          onPress={() => router.push("/cartelera")}
        />

        <MenuButton
          title="Total de entradas"
          subtitle="Calcula el precio de entradas"
          onPress={() => router.push("/entradas")}
        />

        <MenuButton
          title="Combo snacks"
          subtitle="Calcula el total de snacks"
          onPress={() => router.push("/combo-snacks")}
        />
      </View>

      <Text style={styles.note}>
        Tip: Cada pantalla tiene herramientas útiles para el cine.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f6f7fb" },
  title: { fontSize: 24, fontWeight: "900", textAlign: "center" },
  subtitle: { marginTop: 4, color: "#555", fontWeight: "700", textAlign: "center" },
  note: { marginTop: 18, color: "#1976d2", fontWeight: "800" },
});
