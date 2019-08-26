import React from 'react';
import { StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { Block, Text } from './components';

export default class App extends React.Component {
  state = { fontsLoaded: false };

  async componentDidMount() {
    await this.loadFonts();
    this.setState({ fontsLoaded: true });
  }

  loadFonts = async () =>
    Font.loadAsync({
      'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
      'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
    });

  render() {
    const { fontsLoaded } = this.state;
    if (!fontsLoaded) {
      return <AppLoading />;
    }
    return (
      <Block center middle color="white" style={styles.container}>
        <Text bold h1>
          iBlood
        </Text>
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  container: {},
});
