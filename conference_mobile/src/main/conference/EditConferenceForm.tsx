import { useNavigation } from '@react-navigation/native';
import { Keyboard, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Appbar, Button, TextInput, TextInputProps } from 'react-native-paper';
import { FieldState, StringField } from '../../components/StringField';
import { useState } from 'react';
import { TouchableNativeFeedback } from 'react-native';

import DatePicker, { DatePickerProps } from 'react-native-date-picker';
import { TouchableWithoutFeedback } from 'react-native';

import dayjs from 'dayjs';
import { useAxios } from '../../services/useAxios';
import { ConferenceBean } from '../../beans/Conference';

export const EditConferenceForm = ({ route }) => {
    const { goBack } = useNavigation();

    console.log(route.params?.params.conference);

    const initialData: ConferenceBean | null = route.params?.params.conference;

    const conferenceName = useState<FieldState>({ value: initialData?.conference_name ?? '', error: '' });
    const conferenceDescription = useState<FieldState>({ value: initialData?.conference_description ?? '', error: '' });
    const [conferenceStart, setConferenceStart] = useState(
        initialData?.conference_start_date ? dayjs(initialData?.conference_start_date).toDate() : new Date()
    );
    const [conferenceEnd, setConferenceEnd] = useState(
        initialData?.conference_end_date ? dayjs(initialData?.conference_end_date).toDate() : new Date()
    );

    const axiosClient = useAxios();

    const handleSubmit = () => {
        const conference: ConferenceBean = {
            id: initialData?.id ?? null,
            conference_description: conferenceDescription[0].value,
            conference_name: conferenceName[0].value,
            conference_start_date: dayjs(conferenceStart).format('YYYY-MM-DD hh:mm:ss'),
            conference_end_date: dayjs(conferenceEnd).format('YYYY-MM-DD hh:mm:ss'),
        };

        if (initialData) {
            axiosClient.put(`api/conferences/${conference.id}`, conference).then((response) => {});
            return;
        }

        axiosClient.post('api/conferences', conference).then((response) => {});
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={{ flex: 1 }}>
                <Appbar.Header style={{ backgroundColor: undefined }}>
                    <Appbar.BackAction onPress={goBack} />
                    <Appbar.Content title="Registration" />
                </Appbar.Header>
                <View style={styles.container}>
                    <StringField state={conferenceName} inputProps={{ label: 'Name' }} />
                    <StringField state={conferenceDescription} inputProps={{ multiline: true, label: 'Description' }} />
                    <DateField label="Start" date={conferenceStart} setDate={setConferenceStart} />
                    <DateField label="End" date={conferenceEnd} setDate={setConferenceEnd} />
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Button onPress={handleSubmit} mode="contained">
                            Submit
                        </Button>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

type DateFieldProps = {
    date: Date;
    setDate: (date: Date) => void;
};

const DateField = ({ date, setDate, ...other }: DateFieldProps & TextInputProps) => {
    const [open, setOpen] = useState(false);

    return (
        <TouchableOpacity
            style={{ paddingBottom: 20 }}
            onPress={() => {
                setOpen(true);
            }}
        >
            <View pointerEvents="none">
                {/*FIXME: Native paper's Text input does not work correctly with pointerEvents= none */}
                <TextInput value={dayjs(date).format('YYYY-MM-DD hh:mm')} {...other} />
            </View>
            <DatePicker
                date={date}
                open={open}
                is24hourSource="device"
                modal
                onConfirm={(newDate) => {
                    setDate(newDate);
                    setOpen(false);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 24,
        flex: 1,
    },
});
