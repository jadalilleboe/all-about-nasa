import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';
import Text from '../components/Text';
import nasaService from '../services/nasa';

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
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>NASA Technology Projects</Text>
        {techProjects.map(project => 
          <View key={project.projectId} style={{margin: 10}}>
            <Text>{project.title}</Text>
            <Text>{project.description}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default TechProjects;