import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import nasaService from '../services/nasa';

const MarsPhotos = () => {
  const [ marsPhotos, setMarsPhotos ] = useState([])
  const fetchMarsPhotos = async () => {
    const response = await nasaService.getMarsPhotos();
    const json = await response.json();
    setMarsPhotos(json);
  }
  useEffect(() => {
    fetchMarsPhotos();
  }, [])
  console.log(marsPhotos)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:16,fontWeight:'700'}}>Mars Photos</Text>
    </View>
  );
}

export default MarsPhotos;