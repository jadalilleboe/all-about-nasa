import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import Text from '../components/Text';
import Loading from '../components/Loading';
import nasaService from '../services/nasa';

const styles = StyleSheet.create({
  separator: {
    height: 30,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MarsPhotos = () => {
  const [ marsPhotos, setMarsPhotos ] = useState([])
  const fetchMarsPhotos = async () => {
    const response = await nasaService.getResource('mars');
    const json = await response.json();
    setMarsPhotos(json);
  }
  useEffect(() => {
    fetchMarsPhotos();
  }, [])
  
  if (marsPhotos.length === 0) {
    return <Loading />
  }

  return (
    <>
    <Text fontSize='heading' padding='paddingAround' align='center'>Recent Photos From The Curiosity Rover</Text>
    <Text style={{ paddingTop: 0}} padding='paddingAround' align='center'>Photos from {marsPhotos[0].earth_date}</Text>
    <FlatList 
      data={marsPhotos}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        return (
          <View style={{flex: 1, alignItems: 'center'}}>
          <Image style={{width: (Dimensions.get('window').width - 20), height: 300}} source={{uri: item.img_src}} />
          <Text>{item.camera.full_name}</Text>
          </View>
        )
      }}
      keyExtractor={item => item.id.toString()}
    />
    </>
  );
}

export default MarsPhotos;