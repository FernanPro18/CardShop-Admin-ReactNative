import React from 'react';
import Login from './Src/Views/Login';
import Principal from './Src/Views/Principal';
import { createStackNavigator } from 'react-navigation';
import { ImageBackground, NetInfo, BackHandler } from 'react-native';

export default class App extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', function () {
      BackHandler.exitApp();
    });
  }
  render() {
    return (
      <AppStackNavigation />
    );
  }
}

export class Conexion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Frist: true }
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
  }
  handleConnectionChange = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (this.state.Frist && isConnected) {
        this.props.navigation.push('Login');
        this.setState({ Frist: false });
      }
      if (isConnected && this.state.Frist == false) {
        this.props.navigation.navigate('Login');
      }
      else if (!isConnected) {
        this.props.navigation.navigate('Conexion');
      }
    });
  }
  render() {
    return (
      <ImageBackground source={{ uri: 'https://image.ibb.co/d1WFc8/Conexion.png' }} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1 }} />
    );
  }
}

const AppStackNavigation = createStackNavigator({
  Conexion: { screen: Conexion, navigationOptions: () => ({header: null}) },
  Login: { screen: Login, navigationOptions: () => ({header: null}) },
})