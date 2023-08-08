import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';

const colors = ['#ffffff', '#F7CAC9', '#F3E1EB', '#FFD3B5', '#FFF2CC', '#D4F1F4', '#C9E4CA', '#FFDBC5', '#FCE1E6', '#E6E6FA', '#F0FFF0', '#FFF5E1'];

const ColorPickerModal = ({ visible, onSelectColor, onClose }) => {
    return (
        <Modal visible={visible} animationType="slide" transparent={true} onBackdropPress={onClose}>


            <ScrollView horizontal>

                <View style={styles.modalContainer}>

                    <View style={styles.colorPickerContainer}>

                        {colors.map((color) => (
                            <TouchableOpacity
                                key={color}
                                style={[styles.colorPickerItem, { backgroundColor: color }]}
                                onPress={() => {
                                    onSelectColor(color);
                                    onClose();
                                }}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>

        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    colorPickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f4f4f4',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingVertical: 40,
        paddingHorizontal: 10
    },
    colorPickerItem: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 12
    },
});

export default ColorPickerModal;
