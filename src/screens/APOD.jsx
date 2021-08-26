import React, { useState, useEffect } from 'react';
import { ScrollView, Image, Dimensions, SafeAreaView, View } from 'react-native';
import Text from '../components/Text';
import nasaService from '../services/nasa';

const DailyPicture = () => {
  const [ apod, setApod ] = useState([]);
  const fetchApod = async () => {
    const response = await nasaService.getAPOD()
    const json = await response.json();
    setApod(json);
  };
  useEffect(() => {
    fetchApod();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView >
        <Text fontSize='heading' align='center' padding='paddingAround'>Welcome to All About NASA!</Text>
        <Text align='center' padding='paddingAround'>{apod.date} Astronomy Picture of The Day</Text>
        <Text align='center' padding='paddingAround' fontWeight='bold'>{apod.title}</Text>
        <View style={{margin: 10}}>
        <Image style={{width: (Dimensions.get('window').width - 20), height: 300}} source={{uri: apod.hdurl}}/>
        </View>
        <View style={{borderWidth: 1, borderStyle: 'solid', margin: 10}}>
        <Text style={{padding: 20}}>{apod.explanation}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DailyPicture;
