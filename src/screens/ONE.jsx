import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, FlatList, View, StyleSheet } from 'react-native';
import Text from '../components/Text';
import Loading from '../components/Loading';
import theme from '../theme';
import nasaService from '../services/nasa';
import moment from 'moment';

const styles = StyleSheet.create({
  separator: {
    height: 30,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Object = props => {
  const minFeet = props.diameter.feet.estimated_diameter_min.toString().slice(0, (props.diameter.feet.estimated_diameter_min.toString().indexOf('.') + 2))
  const maxFeet = props.diameter.feet.estimated_diameter_max.toString().slice(0, (props.diameter.feet.estimated_diameter_max.toString().indexOf('.') + 2))
  return (
    <View>
      <Text>{props.name}</Text>
      <Text>{minFeet}-{maxFeet} feet in diameter</Text>
      <Text>{props.hazardous ? "Potentially Hazardous" : "Safe"}</Text>
      <Text>Approach Date: {props.data[0].close_approach_date_full}</Text>
      <Text>Traveling at {Number(props.data[0].relative_velocity.miles_per_hour).toLocaleString()} mph</Text>
      <Text>Will miss Earth by {Number(props.data[0].miss_distance.miles).toLocaleString()} miles</Text>
    </View>
  )
}

const ONE = () => {
  const [ neows, setNeows ] = useState([]);
  const [ todaysNeows, setTodaysNeows ] = useState([]);

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
          <Text fontSize='heading' padding='paddingAround' align='center'>There are currently</Text>
          <Text fontSize='big' fontWeight='bold' padding='paddingAround' align='center' style={{color: theme.colors.important}}>{todaysNeows.length}</Text>
          <Text fontSize='heading' padding='paddingAround' align='center'>Asteroids and Objects near Earth.</Text>
          <FlatList
            data={todaysNeows}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (<Object key={item.id} name={item.name} diameter={item.estimated_diameter} hazardous={item.is_potentially_hazardous_asteroid} data={item.close_approach_data}/>)}
            keyExtractor={item => item.id}
          />
          <Text>Average diameter: {Number(avgDiameter).toLocaleString()} feet</Text>
          <Text>Average velocity: {Number(avgVelocity).toLocaleString()} miles per hour</Text>
          <Text>Average miss distance: {Number(avgMissDistance).toLocaleString()} miles</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

}

export default ONE;