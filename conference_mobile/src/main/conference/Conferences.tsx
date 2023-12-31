import { useContext, useEffect, useState } from 'react';
import { useAxios } from '../../services/useAxios';
import { ConferenceBean } from '../../beans/Conference';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { Appbar, Button, MD3Colors, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ConferenceItem } from '../../components/ConferenceItem';
import { AppContext } from '../../AppContext';

export const Conferences = () => {
    const axiosClient = useAxios();

    const { userType } = useContext(AppContext);
    const [data, setData] = useState<ConferenceBean[]>([]);
    const { navigate } = useNavigation();

    const [refreshing, setRefreshing] = useState(false);

    const getConferences = () => {
        try {
            setRefreshing(true);
            axiosClient
                .get('api/conferences')
                .then((response) => {
                    setData(response.data.data);
                })
                .finally(() => {
                    setRefreshing(false);
                });
        } catch (error) {
            // TODO: create popup
            Alert.alert('Error', error.response.data.message);
        }
    };

    useEffect(() => {
        getConferences();
    }, []);

    const onAdd = () => {
        navigate('EditConferenceForm', { params: { conference: null } });
    };

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header style={{ backgroundColor: MD3Colors.primary95 }}>
                <Appbar.Content title="Conferences" />
            </Appbar.Header>
            <FlatList
                refreshing={refreshing}
                onRefresh={getConferences}
                data={data}
                renderItem={({ item, index }) => {
                    return (
                        <ConferenceItem
                            onPress={() => {
                                navigate('ConferenceView', { params: { conference: item } });
                            }}
                            conference={item}
                            key={item.id}
                            index={index}
                        />
                    );
                }}
            />
            {userType === 'logged' && (
                <Button onPress={onAdd} mode="contained" style={styles.addBtn}>
                    Add
                </Button>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    addBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 16,
    },
});
