import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import createNumberMask, { TextInputMask } from "react-native-masked-text";

import api from "../services/api";
import axios from "axios";

function UserForm() {
  const [nome, setNome] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [data_admissao, setDataAdmissao] = useState("");
  const [funcao, setFuncao] = useState("");

  const [formattedDob, setFormattedDob] = useState("");
  const [formattedAdmissionDate, setFormattedAdmissionDate] = useState("");

  const validateDate = (date, userFormat) => {
    const parts = date.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);

      if (
        day >= 1 &&
        day <= 31 &&
        month >= 0 &&
        month <= 11 &&
        year >= 1900 && // Define o ano mínimo desejado
        year <= new Date().getFullYear() // Define o ano máximo desejado (ano atual)
      ) {
        return new Date(year, month, day);
      }
    }
    return null;
  };

  const handleDateChange = (text, stateSetter, formattedSetter, userFormat) => {
    const dateObj = validateDate(text, userFormat);
    if (dateObj !== null) {
      const apiFormattedDate = dateObj.toISOString().split("T")[0];

      const dateMask = createNumberMask({
        prefix: "",
        delimiter: "/",
        format: "DD/MM/YYYY",
      });

      const formattedDate = dateMask.toMask(apiFormattedDate);

      stateSetter(apiFormattedDate);
      formattedSetter(formattedDate);
    } else {
      formattedSetter(text);
    }
  };

  const userFormat = "dd/MM/yyyy";
  const apiFormat = "yyyy-MM-dd";

  const formatRg = (inputRg) => {
    const cleanedRg = inputRg.replace(/\D/g, "");

    if (cleanedRg.length <= 2) {
      return cleanedRg;
    } else if (cleanedRg.length <= 5) {
      return `${cleanedRg.slice(0, 2)}.${cleanedRg.slice(2)}`;
    } else if (cleanedRg.length <= 8) {
      return `${cleanedRg.slice(0, 2)}.${cleanedRg.slice(
        2,
        5
      )}.${cleanedRg.slice(5)}`;
    } else {
      return `${cleanedRg.slice(0, 2)}.${cleanedRg.slice(
        2,
        5
      )}.${cleanedRg.slice(5, 8)}-${cleanedRg.slice(8, 9)}`;
    }
  };

  const handleAddUser = async () => {
    const userData = {
      nome,
      rg,
      cpf,
      data_nascimento,
      data_admissao,
      funcao,
    };
    const response = await axios.post(
      `${api}/pessoas`,
      JSON.stringify(userData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      console.log("Usuário adicionado com sucesso:", response.data);
      navigation.navigate("UserList", { reload: true });
      return response.data;
    } else {
      console.error("Erro ao adicionar o usuário à API");
    }
    setNome("");
    setRg("");
    setCpf("");
    setFormattedDob("");
    setFormattedAdmissionDate("");
    setFuncao("");
  };
  function handleRg(text) {
    setRg(formatRg(text));
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicionar Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="RG"
        value={rg}
        onChangeText={handleRg}
      />
      <TextInputMask
        type="cpf"
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={(text) => setCpf(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (DD/MM/YYYY)"
        value={formattedDob}
        onChangeText={(text) =>
          handleDateChange(
            text,
            setDataNascimento,
            setFormattedDob,
            userFormat,
            apiFormat
          )
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Admissão (DD/MM/YYYY)"
        value={formattedAdmissionDate}
        onChangeText={(text) =>
          handleDateChange(
            text,
            setDataAdmissao,
            setFormattedAdmissionDate,
            userFormat,
            apiFormat
          )
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Função"
        value={funcao}
        onChangeText={(text) => setFuncao(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
        <Icon name="plus" size={20} color="white" />
        <Text style={styles.addButtonText}>Adicionar Usuário</Text>
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
