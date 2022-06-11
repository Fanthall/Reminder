import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import constants from '../../constants';
import Main from './Main';
import BirthdayReminder from './birthday/BirthdayReminder';
import Reminder from './reminder/Reminder';
import WaterReminder from './water/WaterReminder';
import HospitalReminder from './hospital/HospitalReminder';

const AppStack = createStackNavigator();

export const RootStack = () => {
    return (
        <AppStack.Navigator
            initialRouteName='home'
            screenOptions={{ gestureEnabled: true, animationEnabled: false, headerShown: false }} >
            <AppStack.Screen
                name={constants.routes.home}
                component={Main}
            />
            <AppStack.Screen
                name={constants.routes.birthday}
                component={BirthdayReminder}
            />
            <AppStack.Screen
                name={constants.routes.reminder}
                component={Reminder}
            />
            <AppStack.Screen
                name={constants.routes.waterReminder}
                component={WaterReminder}
            />
            <AppStack.Screen
                name={constants.routes.hospital}
                component={HospitalReminder}
            />
        </AppStack.Navigator>
    );
};
