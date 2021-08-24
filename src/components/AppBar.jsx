import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
    paddingBottom: Constants.statusBarHeight
  },
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <ScrollView horizontal>
      <Link to='/'>
        <Text fontSize='heading' color='onDarkBackground' padding='paddingAround'>APOD</Text>
      </Link>
      <Link to='/recentcrimes'>
        <Text fontSize='heading' color='onDarkBackground' padding='paddingAround'>Mars Rover</Text>
      </Link>
      <Link to='/map'>
        <Text fontSize='heading' color='onDarkBackground' padding='paddingAround'>Map</Text>
      </Link>
      </ScrollView>
  </View>);
};

export default AppBar;