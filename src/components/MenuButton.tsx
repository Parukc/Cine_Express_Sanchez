import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function MenuButton(props: {
  title: string;
  subtitle?: string;
  onPress: () => void;
}) {
  const { title, subtitle, onPress } = props;

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.10)",
  },
  title: { fontWeight: "900", fontSize: 16 },
  subtitle: { marginTop: 4, color: "#1976d2", fontWeight: "800" },
});
