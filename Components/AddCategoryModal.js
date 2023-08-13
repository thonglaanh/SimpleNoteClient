import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import config from '../config';

const AddCategoryModal = ({ isVisible, onClose }) => {
    const [name, setName] = useState('');
    const suggest = ['Mua sắm', 'Cá Nhân', 'Nhật kí', 'Trường học', 'Học'];
    const selectSuggestion = (suggestion) => {
        setName(suggestion);
    };

    const renderSuggestionItem = ({ item }) => (
        <TouchableOpacity style={styles.suggestionButton} onPress={() => selectSuggestion(item)}>
            <Text style={styles.suggestionText}>{item}</Text>
        </TouchableOpacity>
    );
    const postCategory = async () => {
        try {
            await axios.post(config.API_URL + '/category/create', { name: name }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            alert('Đã thêm 1 mục');

        } catch (error) {
            console.log('Error ' + error);
        }

    }
    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Nhập tên danh mục mới:</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setName(text)}
                        value={name}
                        placeholder="Nhập tên danh mục"
                    />
                    <FlatList
                        data={suggest}
                        renderItem={renderSuggestionItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                    />
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={() => postCategory()}>
                            <Text style={{ color: '#5271ff', fontSize: 14, marginRight: 15 }}>THÊM VÀO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={{ color: '#00CCFF', fontSize: 14 }}>HỦY BỎ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AddCategoryModal;
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: 300,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'normal',
        textAlign: 'center',
        marginBottom: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
    },
    suggestionButton: {
        backgroundColor: '#DDDDDD',
        borderRadius: 20,
        padding: 6,
        width: 77,
        margin: 5,
    },
    suggestionText: {
        textAlign: 'center',
        color: '#AAAAAA',
        fontSize: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});


