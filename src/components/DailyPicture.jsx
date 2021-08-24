import React, { useState, useEffect } from 'react';
import { ScrollView, Image, Dimensions, SafeAreaView, } from 'react-native';
import Text from './Text';

const DailyPicture = () => {
  const [ apod, setApod ] = useState([]);
  const fetchApod = async () => {
    const response = await fetch('https://stark-cove-38179.herokuapp.com/api/nasa/apod');
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
        <Text align='center'>{apod.title}</Text>
        <Image style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}} source={{uri: apod.hdurl}}/>
        <Text padding='paddingAround'>{apod.explanation}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DailyPicture;