import { View, Text, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAxios } from '../services/useAxios';
import { Fragment, useEffect, useState } from 'react';
import { ConferenceBean } from '../beans/Conference';
import { Button } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditConferenceForm } from './conference/EditConferenceForm';
import { ConferenceView } from './conference/ConferenceView';
import { Conferences } from './conference/Conferences';

const Stack = createNativeStackNavigator();

export const Home = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Conferences" component={Conferences} />
            <Stack.Screen
                options={{ presentation: 'modal' }}
                name="EditConferenceForm"
                component={EditConferenceForm}
            />
            <Stack.Screen options={{ presentation: 'modal' }} name="ConferenceView" component={ConferenceView} />
        </Stack.Navigator>
    );
};
