import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch } from 'react-router-native';
import FBIMostWanted from './FBIMostWanted'
import AppBar from './AppBar'

const Main = () => {
    return (
      <View>
        <AppBar />
        <Switch>
          <Route exact path='/'>
            <FBIMostWanted />
          </Route>
        </Switch>
      </View>
    );
}

export default Main;