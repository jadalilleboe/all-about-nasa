import React, {useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, Linking, TouchableOpacity, View } from 'react-native';
import Text from '../components/Text';
import nasaService from '../services/nasa';

const Notification = ({ notification }) => {
  const messageBody = notification.messageBody.slice((notification.messageBody.search('## Summary') + 12), (notification.messageBody.search('## Notes')))
  return (
    <View style={{borderWidth: 1, borderStyle: 'solid', margin: 10}}>
      <Text padding='paddingAround'>Issued on {notification.messageIssueTime}</Text>
      <TouchableOpacity onPress={() =>Linking.openURL(notification.messageURL)}><Text padding='paddingAround' style={{backgroundColor: '#DDDDDD'}}>See full report</Text></TouchableOpacity>
      <Text style={{paddingTop: 0}} padding='paddingAround'>{messageBody}</Text>
    </View>
  )
}

const DONKI = () => {
  const [ notifications, setNotifications ] = useState([]);
  const fetchDONKI = async () => {
    const response = await nasaService.getResource('donki')
    const json = await response.json()
    setNotifications(json)
  }
  useEffect(() => {
    fetchDONKI();
  }, [])
  console.log(notifications)
  return (
    <SafeAreaView>
      <ScrollView>
        <Text fontSize='heading' align='center' padding='paddingAround' textDecoration='underline'>What is DONKI?</Text>
        <Text style={{ paddingTop: 0}} padding='paddingAround' fontSize='subheading'>DONKI stands for the Space Weather Database Of Notifications, Knowledge, Information. It provides daily interpretations of space weather observations, analysis, models, forecasts, and notifications provided by the Space Weather Research Center.</Text>
        <Text textDecoration='underline' align='center'>Recent Space Weather Notifications</Text>
        {notifications.map(item => 
          <Notification key={item.messageID} notification={item}/>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default DONKI;