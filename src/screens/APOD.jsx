import React, { useState, useEffect } from 'react';
import { ScrollView, Image, Dimensions, SafeAreaView, View } from 'react-native';
import Text from '../components/Text.jsx';
import YoutubePlayer from 'react-native-youtube-iframe';
import nasaService from '../services/nasa';
import Loading from '../components/Loading.jsx';
import moment from 'moment';

const DailyPicture = () => {
  const [ apod, setApod ] = useState(null);
  const fetchApod = async () => {
    const response = await nasaService.getResource('apod')
    const json = await response.json();
    setApod(json);
  };
  useEffect(() => {
    fetchApod();
  }, []);
  if (!apod) {
    return <Loading />
  }
  return (
    <SafeAreaView>
      <ScrollView >
        <Text fontSize='heading' align='center' padding='paddingAround'>Welcome to All About NASA!</Text>
        <Text align='center' padding='paddingAround'>{moment().format('MMMM Do, YYYY')} Astronomy Picture of The Day</Text>
        <Text align='center' padding='paddingAround' fontWeight='bold'>{apod.title}</Text>
        <View style={{margin: 10}}>
        {
          (apod.url.includes('youtube')) 
            ? <YoutubePlayer height={300}
            play={true}
            videoId={apod.url.slice(30, 41)}/> 
            : <Image style={{width: (Dimensions.get('window').width - 20), height: 300, borderRadius: 5}} source={{uri: apod.hdurl}}/>
        }
        </View>
        <View style={{borderWidth: 1, borderStyle: 'solid', margin: 10, borderRadius: 5}}>
        <Text style={{padding: 20}}>{apod.explanation}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DailyPicture;
