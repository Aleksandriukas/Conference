import { View, Text, StyleSheet } from 'react-native';
import { Appbar, Button, MD3Colors } from 'react-native-paper';
import { useAxios } from '../services/useAxios';
import { storage } from '../App';
import { useContext } from 'react';
import { AppContext } from '../AppContext';

export const Settings = () => {
    const axiosClient = useAxios();

    const { setIsLogged } = useContext(AppContext);

    const logout = () => {
        try {
            console.log('request');
            axiosClient.post('api/logout', {}).finally(() => {
                storage.setItem('token', '');
                setIsLogged(false);
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View>
            <Appbar.Header style={{ backgroundColor: MD3Colors.primary95 }}>
                <Appbar.Content title="Settings" />
            </Appbar.Header>
            <Button onPress={logout} style={styles.logoutBtn} mode="text">
                Log out
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    logoutBtn: {
        alignSelf: 'flex-start',
    },
});
