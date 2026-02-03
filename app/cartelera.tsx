import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { searchShows } from "../src/api/showsApi";
import type { Show } from "../src/types/show";

export default function CarteleraScreen() {
  const [searchQuery, setSearchQuery] = React.useState("batman");
  const [shows, setShows] = React.useState<Show[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSearch = React.useCallback(async () => {
    if (!searchQuery.trim()) {
      setError("Ingresa un término de búsqueda");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await searchShows(searchQuery.trim());
      setShows(results);
      if (results.length === 0) {
        setError("No se encontraron resultados");
      }
    } catch (e) {
      console.error(e);
      setError("No se pudo cargar la cartelera. Revisa tu conexión.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  React.useEffect(() => {
    handleSearch();
  }, []);

  const renderItem = ({ item }: { item: Show }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.image?.medium || "https://via.placeholder.com/120x180?text=No+Image",
        }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>
        {item.rating?.average && (
          <Text style={styles.rating}>
            ⭐ {item.rating.average.toFixed(1)} / 10
          </Text>
        )}
        {item.genres && item.genres.length > 0 && (
          <Text style={styles.genre} numberOfLines={1}>
            {item.genres.join(", ")}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cartelera</Text>

      <View style={styles.searchContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar película"
          style={styles.input}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={loading}
        >
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Buscando...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={shows}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.muted}>No hay resultados para mostrar.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f6f7fb" },
  header: { fontSize: 22, fontWeight: "900", marginBottom: 12 },
  searchContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.10)",
  },
  searchButton: {
    backgroundColor: "#1976d2",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    justifyContent: "center",
  },
  searchButtonText: {
    color: "white",
    fontWeight: "800",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  loadingText: {
    marginTop: 12,
    color: "#666",
    fontWeight: "700",
  },
  error: {
    color: "#c62828",
    fontWeight: "800",
    textAlign: "center",
  },
  list: {
    gap: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.10)",
    gap: 12,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  info: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontWeight: "900",
    fontSize: 16,
    marginBottom: 6,
  },
  rating: {
    color: "#f57c00",
    fontWeight: "800",
    marginBottom: 4,
  },
  genre: {
    color: "#666",
    fontSize: 12,
    marginTop: 4,
  },
  muted: {
    color: "#666",
    fontWeight: "700",
    paddingVertical: 14,
    textAlign: "center",
  },
});
