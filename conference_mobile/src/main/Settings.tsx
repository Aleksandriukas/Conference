import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export const Settings = () => {
    return (
        <View>
            <Button
                onPress={() => {
                    console.log('ss');
                }}
                style={styles.logoutBtn}
                mode="text"
            >
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
