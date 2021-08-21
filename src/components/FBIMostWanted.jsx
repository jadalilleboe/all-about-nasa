import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const FBIMostWanted = () => {
  const [ mostWanted, setMostWanted ] = useState([])
  const fetchFBIMostWanted = async () => {
    const response = await fetch('https://api.fbi.gov/wanted/v1/list')
    const json = await response.json()
    console.log(json)
    setMostWanted(json)
  }
  useEffec
  return (
    <View>
      <Text>Hi</Text>
    </View>
  )
}

export default FBIMostWanted;