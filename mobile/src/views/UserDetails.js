import React from "react";
import { View, Text, StyleSheet } from "react-native";
import formatDate from "../utils/DateFormat";

function UserDetails({ route }) {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalhes do Usuário</Text>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Nome:</Text>
        <Text style={styles.detailValue}>{user.nome}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>RG:</Text>
        <Text style={styles.detailValue}>{user.rg}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>CPF:</Text>
        <Text style={styles.detailValue}>{user.cpf}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Data de nascimetno:</Text>
        <Text style={styles.detailValue}>
          {formatDate(user.data_nascimento)}
        </Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Data de admissão:</Text>
        <Text style={styles.detailValue}>{formatDate(user.data_admissao)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Função:</Text>
        <Text style={styles.detailValue}>{user.funcao}</Text>
      </View>
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
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailValue: {
    fontSize: 16,
  },
});

export default UserDetails;
