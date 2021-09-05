import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, FlatList, View, StyleSheet, Linking, Button } from 'react-native';
import { List } from 'react-native-paper';
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

const NEObject = props => {
  const minFeet = props.diameter.feet.estimated_diameter_min.toString().slice(0, (props.diameter.feet.estimated_diameter_min.toString().indexOf('.') + 2))
  const maxFeet = props.diameter.feet.estimated_diameter_max.toString().slice(0, (props.diameter.feet.estimated_diameter_max.toString().indexOf('.') + 2))
  return (
    <View style={styles.infoBox}>
      <Text fontSize='heading' padding='paddingAround' textDecoration='underline' onPress={() => Linking.openURL(props.url)} style={{color: theme.colors.link}}>{props.name.slice(1, -1)}</Text>
      <Text padding='paddingAround'>{minFeet}-{maxFeet} feet in diameter</Text>
      <Text padding='paddingAround'style={props.hazardous ? styles.hazardous : styles.safe}>{props.hazardous ? "Potentially Hazardous" : "Safe"}</Text>
      <Text padding='paddingAround'>Approach Date: {moment(props.data[0].close_approach_date_full, 'YYYY-MMM-DD hh:mm').format('MMM Do, YYYY h:mma')}</Text>
      <Text padding='paddingAround'>Traveling at <Text fontWeight='bold'>{Number(props.data[0].relative_velocity.miles_per_hour).toLocaleString()}</Text> mph</Text>
      <Text padding='paddingAround'>Will miss Earth by <Text fontWeight='bold'>{Number(props.data[0].miss_distance.miles).toLocaleString()}</Text> miles</Text>
    </View>
  )
}

const WeeklyView = ({ neows }) => {
  let dates = Object.keys(neows)
  dates.forEach((date) => console.log(moment(date).format('MMMM Do, YYYY')))
  const formattedDates = dates.map(date => new Date(date))
  dates = formattedDates.sort((a, b) => a - b)
  return (
    <View>
      <List.Section>
      {dates.map(date => 
          <List.Accordion key={date} title={moment(date).add(1, 'day').format('MMMM Do, YYYY')}>
            <FlatList
            data={neows[moment(date).add(1, 'day').format('YYYY-MM-DD')]}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (<NEObject key={item.id} name={item.name} diameter={item.estimated_diameter} hazardous={item.is_potentially_hazardous_asteroid} data={item.close_approach_data} url={item.nasa_jpl_url} />)}
            keyExtractor={item => item.id}
          />
          </List.Accordion>
          )}
        </List.Section>
    </View>
  )
}

const ONE = () => {
  const [ neows, setNeows ] = useState([]);
  const [ todaysNeows, setTodaysNeows ] = useState([]);
  const [ view, setView ] = useState('daily')

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
    const dailyAvgDiameter = (todaysNeows.map(elem => elem.estimated_diameter.feet.estimated_diameter_min).reduce((a, b) => a + b, 0)) / todaysNeows.length
    let totalDiameter = 0
    let totalLength = 0
    const object = neows.near_earth_objects
    for (const date in object) {
      const sum = object[date].map(elem => elem.estimated_diameter.feet.estimated_diameter_min).reduce((a, b) => a + b, 0)
      totalDiameter += sum
      totalLength += object[date].length
    }
    const weeklyAvgDiameter = totalDiameter / totalLength

    const dailyAvgVelocity = (todaysNeows.map(elem => Number(elem.close_approach_data[0].relative_velocity.miles_per_hour)).reduce((a, b) => a + b, 0)) / todaysNeows.length
    let totalVelocity = 0
    let totalVLength = 0
    for (const date in object) {
      const sum = object[date].map(elem => Number(elem.close_approach_data[0].relative_velocity.miles_per_hour)).reduce((a, b) => a + b, 0)
      totalVelocity += sum
      totalVLength +=  object[date].length
    }
    const weeklyAvgVelocity = totalVelocity / totalVLength

    const dailyAvgMissDistance = (todaysNeows.map(elem => Number(elem.close_approach_data[0].miss_distance.miles)).reduce((a, b) => a + b, 0)) / todaysNeows.length
    let totalMissDistance = 0
    let totalMDLength = 0
    for (const date in object) {
      const sum = object[date].map(elem => Number(elem.close_approach_data[0].miss_distance.miles)).reduce((a, b) => a + b, 0)
      totalMissDistance += sum
      totalMDLength += object[date].length
    }
    const weeklyAvgMissDistance = totalMissDistance / totalMDLength

    const avgDiameter = view === 'daily' ? dailyAvgDiameter : weeklyAvgDiameter
    const avgVelocity = view === 'daily' ? dailyAvgVelocity : weeklyAvgVelocity
    const avgMissDistance = view === 'daily' ? dailyAvgMissDistance : weeklyAvgMissDistance
    
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
          <SafeAreaView>
          {view === 'daily' ? <FlatList
            data={todaysNeows}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (<NEObject key={item.id} name={item.name} diameter={item.estimated_diameter} hazardous={item.is_potentially_hazardous_asteroid} data={item.close_approach_data} url={item.nasa_jpl_url} />)}
            keyExtractor={item => item.id}
          /> :
          <WeeklyView neows={neows.near_earth_objects} />}
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    );
  }

}

export default ONE;