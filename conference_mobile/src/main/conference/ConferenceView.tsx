import { Alert, ScrollView, View } from 'react-native';
import { Appbar, Button, Text, Portal, Modal } from 'react-native-paper';
import { ConferenceBean } from '../../beans/Conference';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { AppContext } from '../../AppContext';
import { useAxios } from '../../services/useAxios';

export const ConferenceView = ({ route }) => {
    const initialData: ConferenceBean | null = route.params?.params.conference;
    const { isLogged } = useContext(AppContext);

    const { goBack, navigate } = useNavigation();
    const axiosClient = useAxios();

    const [isVisible, setIsVisible] = useState(false);

    if (!initialData) {
        // TODO create popups
        Alert.alert('Conference not found');
        goBack();
    }

    const onEdit = () => {
        navigate('EditConferenceForm', { params: { conference: initialData } });
    };

    const onDelete = () => {
        axiosClient.delete(`api/conferences/${initialData!.id}`).then(() => {
            navigate('Conferences');
        });
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <Appbar.Header style={{ backgroundColor: undefined }}>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title={initialData!.conference_name} />
            </Appbar.Header>
            <View style={{ margin: 24, gap: 16, flexGrow: 1 }}>
                <View>
                    <Text variant="titleLarge">Description:</Text>
                    <Text variant="bodyLarge">{initialData!.conference_description}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text variant="titleLarge">Start:</Text>
                    <Text variant="bodyLarge">{initialData!.conference_start_date}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text variant="titleLarge">End:</Text>
                    <Text variant="bodyLarge">{initialData!.conference_end_date}</Text>
                </View>
                {isLogged && (
                    <View
                        style={{
                            flexDirection: 'row',
                            flexGrow: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            onPress={() => {
                                setIsVisible(true);
                            }}
                            mode="text"
                        >
                            Delete
                        </Button>
                        <Button onPress={onEdit} mode="contained">
                            Edit
                        </Button>
                    </View>
                )}
                <Portal>
                    <Modal
                        visible={isVisible}
                        onDismiss={() => {
                            setIsVisible(false);
                        }}
                        contentContainerStyle={{
                            backgroundColor: 'white',
                            padding: 24,
                            margin: 24,
                            borderRadius: 12,
                            gap: 32,
                        }}
                    >
                        <Text>Do you want to delete the conference {initialData!.conference_name}?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
                            <Button
                                onPress={() => {
                                    setIsVisible(false);
                                }}
                                mode="text"
                            >
                                Cancel
                            </Button>
                            <Button onPress={onDelete} mode="contained">
                                Confirm
                            </Button>
                        </View>
                    </Modal>
                </Portal>
            </View>
        </ScrollView>
    );
};
