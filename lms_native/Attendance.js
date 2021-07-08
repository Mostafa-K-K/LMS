import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Take_Attendance from './Take_Attendance'

import Chart from './Chart'

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='TakeAttendance' screenOptions={{
        gestureEnabled: true
      }}>

        <Stack.Screen
          name='TakeAttendance'
          component={Take_Attendance}
          options={{ title: 'Home' }}
        />



        <Stack.Screen
          name='Chart'
          component={Chart}
          options={{ title: 'Chart' }}
        />



      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default MainStackNavigator