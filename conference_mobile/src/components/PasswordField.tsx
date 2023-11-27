import { useState } from 'react';
import { StringField, StringFieldProps } from './StringField';
import { IconButton, TextInput } from 'react-native-paper';

export const PasswordField = ({ inputProps, ...other }: StringFieldProps) => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        console.log('toggleVisible');
        setVisible((old) => !old);
    };

    return (
        <StringField
            inputProps={{
                secureTextEntry: !visible,
                right: <TextInput.Icon icon={visible ? 'eye' : 'eye-off'} onPress={toggleVisible} />,
                ...inputProps,
            }}
            {...other}
        />
    );
};
