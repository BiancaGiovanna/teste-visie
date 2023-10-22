import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import api from "../services/api";
import axios from "axios";
import formatDate from "../utils/DateFormat";

function UserList({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const handleDelete = (userId) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza de que deseja excluir este usuário?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await axios(`${api}/pessoa/${userId}`);
              setUsers((prevUsers) =>
                prevUsers.filter((user) => user.id !== userId)
              );
            } catch (error) {
              console.error("Erro ao excluir o usuário", error);
            }
          },
        },
      ]
    );
  };

  const getFirstName = (fullName) => {
    const nameParts = fullName.split(" ");
    return nameParts[0];
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${api}/pessoas`);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar a lista de pessoas", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={styles.headerText}>Nome</Text>
      <Text style={styles.headerText}>Admissão</Text>
      <Text style={styles.headerText}>Opções</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tabela de Usuários</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <Text style={styles.firstName}>{getFirstName(item.nome)}</Text>
            <Text style={styles.date}>{formatDate(item.data_admissao)}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserDetails", { user: item })}
            >
              <Icon name="info-circle" size={25} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("UserEdit", { user: item })}
            >
              <Icon name="edit" size={25} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Icon name="trash" size={25} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    backgroundColor: "#e0e0e0",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },
  firstName: {
    fontSize: 16,
    flex: 1,
  },
  date: {
    fontSize: 16,
    marginRight: 64,
    alignItems: "center",
  },
  optionsContainer: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "transparent",
    padding: 8,
  },
  deleteButton: {
    backgroundColor: "transparent",
  },
});

export default UserList;
