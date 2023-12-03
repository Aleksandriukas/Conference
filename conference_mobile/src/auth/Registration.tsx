import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Appbar, Button, MD3Colors } from 'react-native-paper';
import App, { storage } from '../App';
import { useNavigation } from '@react-navigation/native';
import { FieldState, StringField } from '../components/StringField';
import { useState, useContext } from 'react';
import { PasswordField } from '../components/PasswordField';

import { AppContext } from '../AppContext';
import { set } from 'zod';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { useAxios } from '../services/useAxios';

export const Registration = () => {
    const name = useState<FieldState>({ value: 'ada', error: '' });
    const email = useState<FieldState>({ value: 'dad@gmail.com', error: '' });
    const password = useState<FieldState>({ value: 'asd123asd', error: '' });
    const confirmPassword = useState<FieldState>({ value: 'asd123asd', error: '' });

    const axiosClient = useAxios();

    const onRegistration = async () => {
        console.log('request');
        axiosClient
            .post('/api/register', {
                name: name[0].value,
                email: email[0].value,
                password: password[0].value,
                password_confirmation: confirmPassword[0].value,
            })
            .then((response) => {
                console.log('success');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const { goBack } = useNavigation();

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View>
                <Appbar.Header style={{ backgroundColor: MD3Colors.primary95 }}>
                    <Appbar.BackAction onPress={goBack} />
                    <Appbar.Content title="Registration" />
                </Appbar.Header>

                <View style={styles.container}>
                    <StringField state={name} inputProps={{ label: 'Name' }} />
                    <StringField state={email} inputProps={{ label: 'Email' }} />
                    <PasswordField state={password} inputProps={{ label: 'Password' }} />
                    <PasswordField state={confirmPassword} inputProps={{ label: 'Confirm password' }} />
                    <Button onPress={onRegistration} mode="contained">
                        Register
                    </Button>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 24,
        marginHorizontal: 24,
    },
});
