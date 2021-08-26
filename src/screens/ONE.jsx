import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import Text from '../components/Text';
import theme from '../theme';
import nasaService from '../services/nasa';

const ONE = () => {
  const [ neows, setNeows ] = useState([]);
  const fetchONES = async () => {
    const response = await nasaService.getONES()
    const json = await response.json();
    setNeows(json);
  };
  useEffect(() => {
    fetchONES();
  }, []);
  console.log(neows)
  return (
    <SafeAreaView>
      <ScrollView>
        <Text fontSize='heading' padding='paddingAround' align='center'>There are currently</Text>
        <Text fontSize='big' fontWeight='bold' padding='paddingAround' align='center' style={{color: theme.colors.important}}>{neows.element_count}</Text>
        <Text fontSize='heading' padding='paddingAround' align='center'>Asteroids and Objects near Earth.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ONE;