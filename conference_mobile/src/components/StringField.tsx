import { HelperText, TextInput, TextInputProps } from 'react-native-paper';
import { StyleSheet, View, ViewProps } from 'react-native';
export type FieldState = {
    error?: string;
    value: string;
};

type StringFieldProps = {
    state: [FieldState, React.Dispatch<React.SetStateAction<FieldState>>];
    inputProps?: TextInputProps;
};

export const StringField = ({ state, inputProps, ...other }: StringFieldProps) => {
    const [value, setValue] = state;

    const onChangeText = (value: string) => {
        setValue((old) => ({ value, error: '' }));
    };

    return (
        <View style={styles.container} {...other}>
            <TextInput value={value.value} onChangeText={onChangeText} style={styles.input} {...inputProps} />
            <HelperText style={styles.helperText} type="error" visible={Boolean(value.error)}>
                {value.error}
            </HelperText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    input: {
        width: '100%',
    },

    helperText: {
        alignSelf: 'flex-start',
    },
});
