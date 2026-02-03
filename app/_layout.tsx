import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Cine Express" }} />
      <Stack.Screen name="cartelera" options={{ title: "Cartelera" }} />
      <Stack.Screen name="entradas" options={{ title: "Total de entradas" }} />
      <Stack.Screen name="combo-snacks" options={{ title: "Combo snacks" }} />
    </Stack>
  );
}
