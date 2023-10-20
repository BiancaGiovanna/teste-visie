import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, Button} from 'react-native';

class PersonList extends Component {
  constructor() {
    super();
    this.state = {
      people: [],
    };
  }

  componentDidMount() {
    fetch('http://127.0.0.1:5000/pessoas')
      .then(response => response.json())
      .then(data => {
        this.setState({people: data});
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderPersonItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
      }}>
      <Text>{item.name}</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => this.handleEdit(item)}>
          <Button title="Editar" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleDelete(item)}>
          <Button title="Deletar" color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.people}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderPersonItem}
        />
      </View>
    );
  }
}

export default PersonList;
