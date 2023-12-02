import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Button, Text, MD3Colors } from 'react-native-paper';
import { FieldState, StringField } from '../components/StringField';
import { PasswordField } from '../components/PasswordField';
import { useAxios } from '../services/useAxios';

export const Login = () => {
    const axiosClient = useAxios();

    const onLogin = async () => {
        try {
            console.log('request');
            const data = axiosClient
                .post('api/login', {
                    email: email[0].value,
                    password: password[0].value,
                })
                .then((response) => {
                    console.log(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const { navigate } = useNavigation();

    const email = useState<FieldState>({ value: '', error: '' });

    const password = useState<FieldState>({ value: '', error: '' });

    const onRegistration = () => {
        navigate('Registration');
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={styles.container}>
                <Text style={{ marginTop: 48 }} variant="displaySmall">
                    Conference
                </Text>
                <View style={{ flex: 1, width: '100%', justifyContent: 'center' }}>
                    <StringField state={email} inputProps={{ label: 'Email' }} />
                    <PasswordField state={password} inputProps={{ label: 'Password' }} />
                    <TouchableOpacity style={styles.touchableOpacity}>
                        <Text style={styles.link}>Continue without login</Text>
                    </TouchableOpacity>
                    <Button
                        onPress={() => {
                            onLogin();
                        }}
                        style={styles.loginButton}
                        mode="contained"
                    >
                        Login
                    </Button>
                </View>
                <View style={styles.registrationContainer}>
                    <Text>Do not have an account? </Text>
                    <TouchableOpacity onPress={onRegistration}>
                        <Text style={styles.link}>Register!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 24,
    },
    input: {
        width: '100%',
    },

    helperText: {
        alignSelf: 'flex-start',
    },
    loginButton: {
        width: '100%',
    },

    link: {
        alignSelf: 'flex-end',
        color: MD3Colors.primary30,
    },
    touchableOpacity: {
        alignSelf: 'flex-end',
        marginBottom: 8,
    },
    registrationContainer: {
        marginBottom: 12,
        flexDirection: 'row',
    },
});
