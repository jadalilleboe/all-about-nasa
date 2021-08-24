import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Route, Switch } from 'react-router-native';
import DailyPicture from './DailyPicture'
import AppBar from './AppBar'

const Main = () => {
    return (
      <ScrollView>
        <AppBar />
        <Switch>
          <Route exact path='/'>
            <DailyPicture />
          </Route>
        </Switch>
      </ScrollView>
    );
}

export default Main;