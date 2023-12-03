import { View } from 'react-native';
import { ConferenceBean } from '../beans/Conference';
import { Text } from 'react-native-paper';
import dayjs from 'dayjs';
import { TouchableOpacity } from 'react-native';

export type ConferenceItemProps = {
    conference: ConferenceBean;
    index: number;
    onPress: () => void;
};

export const ConferenceItem = ({ conference, onPress, index }: ConferenceItemProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ gap: 8, padding: 12, borderTopWidth: index === 0 ? 0 : 0.5 }}>
            <Text variant="labelMedium">{conference.conference_name}</Text>
            <Text variant="bodyMedium">
                {conference.conference_start_date} - {conference.conference_end_date}
            </Text>
        </TouchableOpacity>
    );
};
