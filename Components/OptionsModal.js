import { Modal, View, TouchableOpacity, StyleSheet, ScrollView, Text, Image } from 'react-native';
import React from 'react';

const OptionsModal = ({ visible, onClose, onEdit, onView, onDelete }) => {
    return (
        <Modal visible={visible} animationType="slide" transparent={true} onBackdropPress={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.button} onPress={onView}>
                        <Text style={styles.text}>View</Text>
                        <Image style={styles.icon} source={require('../assets/view.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onEdit}>
                        <Text style={styles.text}>Edit</Text>
                        <Image style={styles.icon} source={require('../assets/edit1.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { borderColor: 'white' }]} onPress={onDelete}>
                        <Text style={[styles.text, { color: 'red' }]}>Delete</Text>
                        <Image style={styles.icon} source={require('../assets/delete.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 250,
        height: 150,
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 20,

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    button: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginVertical: 5

    },
    text: {
        fontSize: 20, fontWeight: 'bold'
        , marginBottom: 5
    },
    icon: {
        width: 25, height: 25
    },
});

export default OptionsModal;
