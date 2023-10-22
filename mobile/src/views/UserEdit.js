import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "../services/api";
import axios from "axios";

function UserForm({ route, navigation }) {
  const [nome, setName] = useState("");
  const [funcao, setFuncao] = useState("");
  const [oldUser, setOldUser] = useState(null);
  const { user } = route.params;

  useEffect(() => {
    if (route.params.user) {
      const userToEdit = route.params.user;
      setOldUser(userToEdit);
      setName(userToEdit.nome);
      setFuncao(userToEdit.funcao);
    }
  }, [route.params.user]);

  const handleEditUser = async () => {
    try {
      const userDataToEdit = {
        nome,
        funcao,
      };

      const response = await axios.put(
        `${api}/pessoa/${user.id}`,
        userDataToEdit,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Usuário editado com sucesso:", response.data);
        navigation.navigate("UserList", { reload: true });
      } else {
        console.error("Erro ao editar o usuário na API");
      }
    } catch (error) {
      console.error("Erro ao editar o usuário:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Função"
        value={funcao}
        onChangeText={(text) => setFuncao(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleEditUser}>
        <Text style={styles.addButtonText}>Editar Usuário</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "green",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default UserForm;
