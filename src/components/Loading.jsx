import React from 'react';
import { View } from 'react-native';
import Text from './Text.jsx';

const Loading = () => {
  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text fontSize='big' fontWeight='bold'>Loading...</Text></View>
};

export default Loading;