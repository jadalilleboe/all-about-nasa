import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import Text from '../components/Text';
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
  });
  return (
    <SafeAreaView>
      <ScrollView>
        <Text fontSize='heading' padding='paddingAround' align='center'>Asteroids and Objects Near Earth</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ONE;