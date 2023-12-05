import { View, Text, StyleSheet, Alert } from 'react-native';
import { Appbar, Button, MD3Colors } from 'react-native-paper';
import { useAxios } from '../services/useAxios';
import { storage } from '../App';
import { useContext } from 'react';
import { AppContext } from '../AppContext';

export const Settings = () => {
    const axiosClient = useAxios();

    const { userType, setUserType } = useContext(AppContext);

    const logout = () => {
        try {
            if (userType === 'logged') {
                axiosClient.post('api/logout', {}).finally(() => {
                    storage.setItem('token', '');
                });
            }
        } catch (error) {
            // TODO: create popup
            Alert.alert('Error', error.response.data.message);
        } finally {
            setUserType(undefined);
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
        margin: 8,
    },
});
