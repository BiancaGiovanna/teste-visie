import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserList from './views/UserList';
import UserForm from './views/UserForm';
import {Button} from '@rneui/base';
import Icon from 'react-native-vector-icons/Ionicons';
const Stack = createNativeStackNavigator();

export default props => {
  const addIcon = <Icon name="add" size={25} color="white" />;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UserList"
        screenOptions={screenOptions}>
        <Stack.Screen
          name="UserList"
          component={UserList}
          options={({navigation}) => {
            return {
              title: 'VISIE APP',
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('UserForm')}
                  type="clear"
                  icon={addIcon}
                />
              ),
            };
          }}
        />
        <Stack.Screen
          name="UserForm"
          component={UserForm}
          options={{title: 'Fomulário de cadastro'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const screenOptions = {
  headerStyle: {
    backgroundColor: '#cc0000',
  },
  headerTintColor: '#fff',
  headerTittleStyle: {
    fontWeight: 'bold',
  },
};
