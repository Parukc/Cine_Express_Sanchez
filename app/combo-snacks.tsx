import React from "react";
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

const PRECIOS = {
  popcorn: 2.5,
  bebida: 1.75,
  nachos: 3.0,
};

export default function ComboSnacksScreen() {
  const [popcorn, setPopcorn] = React.useState("0");
  const [bebida, setBebida] = React.useState("0");
  const [nachos, setNachos] = React.useState("0");
  const [clienteFrecuente, setClienteFrecuente] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const validarCantidades = React.useCallback(() => {
    const pop = Number(popcorn || 0);
    const beb = Number(bebida || 0);
    const nach = Number(nachos || 0);

    if (pop < 0 || beb < 0 || nach < 0) {
      setError("Las cantidades no pueden ser negativas");
      return false;
    }
    setError(null);
    return true;
  }, [popcorn, bebida, nachos]);

  React.useEffect(() => {
    validarCantidades();
  }, [popcorn, bebida, nachos, validarCantidades]);

  const calculo = React.useMemo(() => {
    const pop = Math.max(0, Number(popcorn || 0));
    const beb = Math.max(0, Number(bebida || 0));
    const nach = Math.max(0, Number(nachos || 0));

    const subtotal =
      pop * PRECIOS.popcorn + beb * PRECIOS.bebida + nach * PRECIOS.nachos;
    const descuento = clienteFrecuente ? subtotal * 0.1 : 0;
    const total = subtotal - descuento;

    return {
      subtotal,
      descuento,
      total,
    };
  }, [popcorn, bebida, nachos, clienteFrecuente]);

  const money = (n: number) => n.toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Combo snacks</Text>

      <View style={styles.card}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Popcorn ($2.50)</Text>
          <TextInput
            value={popcorn}
            onChangeText={setPopcorn}
            keyboardType="numeric"
            style={styles.input}
            placeholder="0"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bebida ($1.75)</Text>
          <TextInput
            value={bebida}
            onChangeText={setBebida}
            keyboardType="numeric"
            style={styles.input}
            placeholder="0"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nachos ($3.00)</Text>
          <TextInput
            value={nachos}
            onChangeText={setNachos}
            keyboardType="numeric"
            style={styles.input}
            placeholder="0"
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Cliente frecuente -10%</Text>
          <Switch
            value={clienteFrecuente}
            onValueChange={setClienteFrecuente}
            trackColor={{ false: "#ccc", true: "#1976d2" }}
            thumbColor={clienteFrecuente ? "#fff" : "#f4f3f4"}
          />
        </View>
      </View>

      <View style={styles.resultCard}>
        <Text style={styles.resultLabel}>Subtotal:</Text>
        <Text style={styles.resultValue}>${money(calculo.subtotal)}</Text>
      </View>

      {calculo.descuento > 0 && (
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Descuento (10%):</Text>
          <Text style={[styles.resultValue, styles.discount]}>
            -${money(calculo.descuento)}
          </Text>
        </View>
      )}

      <View style={[styles.resultCard, styles.totalCard]}>
        <Text style={styles.totalLabel}>TOTAL:</Text>
        <Text style={styles.totalValue}>${money(calculo.total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f6f7fb" },
  header: { fontSize: 22, fontWeight: "900", marginBottom: 12 },
  card: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.10)",
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
    color: "#666",
    fontWeight: "800",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.10)",
  },
  errorText: {
    color: "#c62828",
    fontSize: 12,
    fontWeight: "700",
    marginTop: -8,
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingVertical: 8,
  },
  switchLabel: {
    fontWeight: "800",
    fontSize: 16,
  },
  resultCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.10)",
    marginBottom: 8,
  },
  resultLabel: {
    fontWeight: "800",
    fontSize: 16,
  },
  resultValue: {
    fontWeight: "800",
    fontSize: 16,
  },
  discount: {
    color: "#c62828",
  },
  totalCard: {
    backgroundColor: "#1976d2",
    borderColor: "#1976d2",
  },
  totalLabel: {
    fontWeight: "900",
    fontSize: 18,
    color: "white",
  },
  totalValue: {
    fontWeight: "900",
    fontSize: 20,
    color: "white",
  },
});
