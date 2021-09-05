import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, FlatList, View, StyleSheet, Linking, Button } from 'react-native';
import Text from '../components/Text';
import Loading from '../components/Loading';
import theme from '../theme';
import nasaService from '../services/nasa';
import moment from 'moment';

const styles = StyleSheet.create({
  separator: {
    height: 30,
  },
  infoBox: {
    borderWidth: 1,
    borderStyle: 'solid',
    flex: 1,
    alignItems: 'center',
    borderRadius: 5, 
    margin: 5
  },
  hazardous: {
    backgroundColor: theme.colors.important,
    color: theme.colors.onDarkBackground
  },
  safe: {
    backgroundColor: 'green',
    color: theme.colors.onDarkBackground
  },
  stats: {
    display: 'flex',
    alignItems: 'center'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const Object = props => {
  const minFeet = props.diameter.feet.estimated_diameter_min.toString().slice(0, (props.diameter.feet.estimated_diameter_min.toString().indexOf('.') + 2))
  const maxFeet = props.diameter.feet.estimated_diameter_max.toString().slice(0, (props.diameter.feet.estimated_diameter_max.toString().indexOf('.') + 2))
  return (
    <View style={styles.infoBox}>
      <Text fontSize='heading' padding='paddingAround' textDecoration='underline' onPress={() => Linking.openURL(props.url)} style={{color: theme.colors.link}}>{props.name.slice(1, -1)}</Text>
      <Text padding='paddingAround'>{minFeet}-{maxFeet} feet in diameter</Text>
      <Text padding='paddingAround'style={props.hazardous ? styles.hazardous : styles.safe}>{props.hazardous ? "Potentially Hazardous" : "Safe"}</Text>
      <Text padding='paddingAround'>Approach Date: {props.data[0].close_approach_date_full}</Text>
      <Text padding='paddingAround'>Traveling at <Text fontWeight='bold'>{Number(props.data[0].relative_velocity.miles_per_hour).toLocaleString()}</Text> mph</Text>
      <Text padding='paddingAround'>Will miss Earth by <Text fontWeight='bold'>{Number(props.data[0].miss_distance.miles).toLocaleString()}</Text> miles</Text>
    </View>
  )
}

const ONE = () => {
  const [ neows, setNeows ] = useState([]);
  const [ todaysNeows, setTodaysNeows ] = useState([]);
  const [ view, setView ] = useState('daily')
  console.log(neows)

  const formattedDate = moment().format('YYYY-MM-DD')

  const fetchONES = async () => {
    const response = await nasaService.getResource('neows');
    const json = await response.json();
    setNeows(json);
    setTodaysNeows(json.near_earth_objects[formattedDate])
  };
  useEffect(() => {
    fetchONES();
  }, []);

  
  if (todaysNeows.length === 0) {
    return <Loading />
  } else {
    const avgDiameter = (todaysNeows.map(elem => elem.estimated_diameter.feet.estimated_diameter_min).reduce((a, b) => a + b, 0)) / todaysNeows.length
    const avgVelocity = (todaysNeows.map(elem => Number(elem.close_approach_data[0].relative_velocity.miles_per_hour)).reduce((a, b) => a + b, 0)) / todaysNeows.length
    const avgMissDistance = (todaysNeows.map(elem => Number(elem.close_approach_data[0].miss_distance.miles)).reduce((a, b) => a + b, 0)) / todaysNeows.length
    
    return (
      <SafeAreaView>
        <ScrollView>
          <Button title={view === 'daily' ? 'Switch to weekly view' : 'Switch to daily view'} onPress={() => setView(view === 'daily' ? 'weekly' : 'daily')}/>
          <Text fontSize='heading' padding='paddingAround' align='center'>There are currently</Text>
          <Text fontSize='big' fontWeight='bold' padding='paddingAround' align='center' style={{color: theme.colors.important}}>{view === 'daily' ? todaysNeows.length : neows.element_count}</Text>
          <Text fontSize='heading' padding='paddingAround' align='center'>Asteroids and Objects near Earth.</Text>
          <View style={styles.stats}>
          <Text fontSize='subheading' padding='paddingAround' fontWeight='bold'>Average Diameter</Text> 
          <Text>{Number(avgDiameter).toLocaleString()} feet</Text>
          </View>
          <View style={styles.stats}>
            <Text fontSize='subheading' padding='paddingAround' fontWeight='bold'>Average Velocity</Text> 
            <Text>{Number(avgVelocity).toLocaleString()} miles per hour</Text>
          </View>
          <View style={styles.stats}>
            <Text fontSize='subheading' padding='paddingAround' fontWeight='bold'>Average miss distance</Text> 
            <Text style={{paddingBottom: 20}}>{Number(avgMissDistance).toLocaleString()} miles</Text>
          </View>
          <FlatList
            data={todaysNeows}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (<Object key={item.id} name={item.name} diameter={item.estimated_diameter} hazardous={item.is_potentially_hazardous_asteroid} data={item.close_approach_data} url={item.nasa_jpl_url} />)}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

}

export default ONE;