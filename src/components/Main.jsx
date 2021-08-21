import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch } from 'react-router-native';
import Home from './Home'
import AppBar from './AppBar'

const Main = () => {
    return (
      <View>
        <AppBar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </View>
    );
}

export default Main;