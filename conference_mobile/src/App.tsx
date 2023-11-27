import { useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { AppContext } from './AppContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main } from './main/Main';
import { Auth } from './auth/Auth';

const Stack = createNativeStackNavigator();

export default function App() {
    const [isLogged, setIsLogged] = useState(false);

    return (
        <PaperProvider>
            <AppContext.Provider value={{ isLogged, setIsLogged }}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        {isLogged ? (
                            <Stack.Screen name="Main" component={Main} />
                        ) : (
                            <Stack.Screen name="Auth" component={Auth} />
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </AppContext.Provider>
        </PaperProvider>
    );
}
