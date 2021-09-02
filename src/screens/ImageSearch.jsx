import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Text from '../components/Text';
import theme from '../theme';
import nasaService from '../services/nasa';

const styles = StyleSheet.create({
  input: {
    borderWidth: 3,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    fontSize: theme.fontSizes.body
  },
  separator: {
    height: 30
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ImageSearch = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [ photos, setPhotos ] = useState([]);

  const onSubmit = async data => {
    const response = await nasaService.imageSearch(data)
    const json = await response.json();
    setPhotos(json);
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="searchValue"
        defaultValue=""
      />
      {errors.searchValue && <Text padding='paddingAround' style={{color: theme.colors.important}}>Please search for something.</Text>}
      <View style={{margin: 10}}><Button title="Search" onPress={handleSubmit(onSubmit)}/></View>
      {(photos.length === 0) ? <Text>Hi</Text> : 
        <FlatList 
        data={photos}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => {
          return (
          <View style={{borderStyle: 'dashed', borderWidth: 1}}>
            <TouchableOpacity onPress={() => Alert.alert(item.data[0].title, item.data[0].description)}>
            <Image style={{width: (Dimensions.get('window').width - 20), height: 300}} source={{uri: item.links[0].href}}/></TouchableOpacity>
          </View>
          );
        }}
        keyExtractor={item => item.data[0].nasa_id}
        />
      }
    </View>
  )
}

export default ImageSearch;