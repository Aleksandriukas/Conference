import { useEffect, useState } from 'react';
import { PaperProvider, MD3Colors } from 'react-native-paper';
import { AppContext } from './AppContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main } from './main/Main';
import { Auth } from './auth/Auth';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

const Stack = createNativeStackNavigator();

export const storage = new MMKVLoader().initialize();
export default function App() {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        storage.getItem('token').then((token) => {
            console.log(token);
            if (Boolean(token)) {
                setIsLogged(true);
            } else {
                setIsLogged(false);
            }
        });
    }, []);

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
