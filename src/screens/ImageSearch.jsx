import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from "react-native";
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
  }
})

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
    </View>
  )
}

export default ImageSearch;