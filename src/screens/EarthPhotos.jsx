import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import Text from '../components/Text';
import Loading from '../components/Loading';
import nasaService from '../services/nasa';
import moment from 'moment';

const styles = StyleSheet.create({
  separator: {
    height: 30,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const EarthPhotos = () => {
  const [ earthPhotos, setEarthPhotos ] = useState([])
  const fetchEarthPhotos = async () => {
    const response = await nasaService.getResource('earth');
    const json = await response.json();
    setEarthPhotos(json);
  }
  useEffect(() => {
    fetchEarthPhotos();
  }, [])
  
  if (earthPhotos.length === 0) {
    return <Loading />
  }
  return (
    <>
    <Text fontSize='heading' padding='paddingAround' align='center'>Recent Photos From NASA's EPIC camera onboard the NOAA DSCOVR spacecraft</Text>
    <Text style={{ paddingTop: 0}} padding='paddingAround' align='center'>Photos from {moment().subtract(3, 'days').format('MMMM Do, YYYY')}</Text>
    <FlatList 
      data={earthPhotos}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        return (
          <View style={{flex: 1, alignItems: 'center'}}>
          <Image style={{width: (Dimensions.get('window').width - 20), height: 300, borderRadius: 5}} source={{uri: item}} />
          </View>
        )
      }}
      keyExtractor={item => item}/>
    </>
  );
}

export default EarthPhotos;