import { useState } from 'react';
import { View, Text } from 'react-native';
import { PaperProvider, Button } from 'react-native-paper';
import { SafeAreaFrameContext } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppContext } from './AppContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './main/Home';
import { Login } from './auth/Login';
import { Main } from './main/Main';
import { Auth } from './auth/Auth';

const Stack = createNativeStackNavigator();

export default function App() {
    const [isLogged, setIsLogged] = useState(true);

    return (
        <PaperProvider>
            <AppContext.Provider value={{ isLogged, setIsLogged }}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        {isLogged ? (
                            <Stack.Screen name="Home" component={Main} />
                        ) : (
                            <Stack.Screen name="Login" component={Auth} />
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </AppContext.Provider>
        </PaperProvider>
    );
}
