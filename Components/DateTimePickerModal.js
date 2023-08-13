import React, { useState } from 'react';
import { View, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickerModal = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('datetime'); // Chỉnh sửa mode thành 'datetime'
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS == 'ios');
        setDate(currentDate);
        console.log(currentDate); // selectedDate chứa cả ngày và giờ
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode); // Chỉnh sửa mode thành 'datetime'
    }

    return (
        <View style={styles.container}>
            <Button title='Date and Time picker' onPress={() => showMode('datetime')} />
            {show && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode='time' // Sử dụng giá trị mode từ state
                    is24Hour={true}
                    display='default'
                    onChange={onChange} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DateTimePickerModal;
