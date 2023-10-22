import React from "react";
import { TouchableOpacity } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Icon from "react-native-vector-icons/FontAwesome";

import UserList from "./src/views/UserList";
import UserAdd from "./src/views/UserAdd";
import UserEdit from "./src/views/UserEdit";
import UserDetails from "./src/views/UserDetails";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UserList"
        screenOptions={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#cc0000",
          },
        }}
      >
        <Stack.Screen
          name="UserList"
          component={UserList}
          options={({ navigation }) => ({
            title: "Lista de Usuários",
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("UserAdd")}
              >
                <Icon name="plus" size={20} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="UserAdd"
          component={UserAdd}
          options={{ title: "Adicionar Usuário" }}
        />
        <Stack.Screen
          name="UserEdit"
          component={UserEdit}
          options={{ title: "Editar Usuário" }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={{ title: "Detalhes do Usuário" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
