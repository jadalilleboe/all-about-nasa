import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import APOD from './src/screens/APOD.jsx';
import EarthPhotos from './src/screens/EarthPhotos.jsx';
import MarsPhotos from './src/screens/MarsPhotos.jsx';
import ONE from './src/screens/ONE.jsx';
import DONKI from './src/screens/DONKI.jsx';
import ImageSearch from './src/screens/ImageSearch.jsx';
import TechProjects from './src/screens/TechProjects.jsx';
import theme from './src/theme';
import DrawerItems from './src/constants/DrawerItems';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        drawerType="front"
        initialRouteName="APOD"
        screenOptions={{
          activeTintColor: theme.colors.important,
          itemStyle: { marginVertical: 10 },
        }}
       
      >
       {
          DrawerItems.map(drawer=><Drawer.Screen 
            key={drawer.name}
            name={drawer.name}
            options={{
            drawerIcon:({focused})=>
             drawer.iconType==='Material' ? 
              <MaterialCommunityIcons 
                  name={drawer.iconName}
                  size={24} 
                  color={focused ? "#e91e63" : "black"} 
              />
            :
            drawer.iconType==='Feather' ?
              <Feather 
                name={drawer.iconName}
                size={24} 
                color={focused ? "#e91e63" : "black"} 
              /> 
            : 
            drawer.iconType==='AntDesign' ?
            <AntDesign
              name={drawer.iconName}
              size={24}
              color={focused ? "#e91e63" : "black"}
            /> :
            drawer.iconType==='Ionicons' ?
              <Ionicons 
                name={drawer.iconName}
                size={24} 
                color={focused ? "#e91e63" : "black"} 
              /> :
              <MaterialIcons
                name={drawer.iconName}
                size={24}
                color={focused ? "#e91e63" : "black"} />
           }} 
            component={
              drawer.name==='APOD'? APOD 
                : drawer.name==='Objects Near Earth' ? ONE
                  : drawer.name==='Photos From Mars' ? MarsPhotos
                    : drawer.name==='Photos of Earth' ? EarthPhotos 
                      : drawer.name==='DONKI' ? DONKI 
                        : drawer.name==='NASA Image Search' ? ImageSearch
                          : TechProjects
            }
          />)
        }
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;

