import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';
import { List } from 'react-native-paper';
import Text from '../components/Text.jsx';
import Loading from '../components/Loading.jsx'
import nasaService from '../services/nasa';
import moment from 'moment';

const TechProjects = () => {
  const [ techProjects, setTechProjects ] = useState([]);
  const fetchTechProjects = async () => {
    const response = await nasaService.getResource('tech');
    const json = await response.json()
    setTechProjects(json)
  }
  useEffect(() => {
    fetchTechProjects();
  })
  if (techProjects.length === 0) {
    return <Loading />
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <Text align='center' fontSize='heading' padding='paddingAround'>NASA Technology Projects</Text>
        {techProjects.map(project => 
          // <View key={project.projectId} style={{margin: 10}}>
          //   <Text>{project.title}</Text>
          //   <Text>{project.description}</Text>
          // </View>
          <List.Accordion key={project.projectId} title={project.title} titleNumberOfLines={3}>
            <Text>Start Date: {moment(project.startMonth, 'M').format('MMMM')} {project.startYear}</Text>
            <Text>End Date: {moment(project.endMonth, 'M').format('MMMM')} {project.endYear}</Text>
            <Text>Status: {project.statusDescription}</Text>
            <Text fontWeight='bold'>Principal Investigator</Text>
            <Text>{project.principalInvestigators[0].firstName} {project.principalInvestigators[0].lastName}</Text>
            <Text fontWeight='bold' align='center' padding='paddingAround'>Description</Text>
            <Text padding='paddingAround'>{project.description}</Text>
          </List.Accordion>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default TechProjects;