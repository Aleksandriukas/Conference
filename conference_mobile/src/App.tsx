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
    const [userType, setUserType] = useState<'nonAuth' | 'logged' | undefined>(undefined);

    useEffect(() => {
        storage.getItem('token').then((token) => {
            console.log(token);
            if (Boolean(token)) {
                setUserType('logged');
            } else {
                setUserType(undefined);
            }
        });
    }, []);

    return (
        <PaperProvider>
            <AppContext.Provider value={{ userType, setUserType }}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        {userType ? (
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
