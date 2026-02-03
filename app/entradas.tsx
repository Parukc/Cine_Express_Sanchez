import React from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

type TipoEntrada = "general" | "estudiante" | "vip";

const PRECIOS: Record<TipoEntrada, number> = {
  general: 5.0,
  estudiante: 3.5,
  vip: 8.0,
};

export default function EntradasScreen() {
  const [tipo, setTipo] = React.useState<TipoEntrada>("general");
  const [cantidad, setCantidad] = React.useState("1");
  const [esMiercoles, setEsMiercoles] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const cantidadNum = React.useMemo(() => {
    const num = Number(cantidad || 0);
    if (num <= 0) {
      setError("La cantidad debe ser mayor a 0");
      return 0;
    }
    setError(null);
    return num;
  }, [cantidad]);

  const calculo = React.useMemo(() => {
    const precio = PRECIOS[tipo];
    const subtotal = precio * cantidadNum;
    const descuento = esMiercoles ? subtotal * 0.15 : 0;
    const total = subtotal - descuento;

    return {
      subtotal,
      descuento,
      total,
    };
  }, [tipo, cantidadNum, esMiercoles]);

  const money = (n: number) => n.toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Total de entradas</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Tipo de entrada</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipo}
            onValueChange={(value) => setTipo(value as TipoEntrada)}
            style={styles.picker}
          >
            <Picker.Item label="General ($5.00)" value="general" />
            <Picker.Item label="Estudiante ($3.50)" value="estudiante" />
            <Picker.Item label="VIP ($8.00)" value="vip" />
          </Picker>
        </View>

        <Text style={styles.label}>Cantidad de entradas</Text>
        <TextInput
          value={cantidad}
          onChangeText={setCantidad}
          keyboardType="numeric"
          style={[styles.input, error && styles.inputError]}
          placeholder="1"
        />
        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Día promociòn -15%</Text>
          <Switch
            value={esMiercoles}
            onValueChange={setEsMiercoles}
            trackColor={{ false: "#ccc", true: "#1976d2" }}
            thumbColor={esMiercoles ? "#fff" : "#f4f3f4"}
          />
        </View>
      </View>

      <View style={styles.resultCard}>
        <Text style={styles.resultLabel}>Subtotal:</Text>
        <Text style={styles.resultValue}>${money(calculo.subtotal)}</Text>
      </View>

      {calculo.descuento > 0 && (
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Descuento (15%):</Text>
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
  label: {
    marginTop: 8,
    marginBottom: 6,
    color: "#666",
    fontWeight: "800",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.10)",
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.10)",
    marginBottom: 8,
  },
  inputError: {
    borderColor: "#c62828",
  },
  errorText: {
    color: "#c62828",
    fontSize: 12,
    fontWeight: "700",
    marginTop: -4,
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
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
