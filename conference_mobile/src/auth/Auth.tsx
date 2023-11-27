import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './Login';
import { Registration } from './Registration';

const Stack = createNativeStackNavigator();

export const Auth = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={Registration} />
        </Stack.Navigator>
    );
};
