import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Button, Text, MD3Colors } from 'react-native-paper';
import { FieldState, StringField } from '../components/StringField';

export const Login = () => {
    const { navigate } = useNavigation();

    const email = useState<FieldState>({ value: '', error: '' });

    const password = useState<FieldState>({ value: '', error: '' });

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={styles.container}>
                <View style={{ flex: 1, width: '100%', justifyContent: 'center' }}>
                    <StringField state={email} inputProps={{ label: 'Email' }} />
                    <StringField state={password} inputProps={{ label: 'Password' }} />
                    <TouchableOpacity style={styles.touchableOpacity}>
                        <Text style={styles.link}>Continue without login</Text>
                    </TouchableOpacity>
                    <Button style={styles.loginButton} mode="contained">
                        Login
                    </Button>
                </View>
                <View style={styles.registrationContainer}>
                    <Text>Do not have an account? </Text>
                    <TouchableOpacity>
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
        justifyContent: 'center',
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
