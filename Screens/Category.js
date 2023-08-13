import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../config'
import Loading from '../Components/Loading'

const Category = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [listCategory, setListCategory] = useState([])
    const [listNote, setListNote] = useState([])
    const [name, setName] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(config.API_URL + '/note');
            setLoading(true);
            setTimeout(() => {
                setListNote(response.data.notes); // Lưu danh sách ghi chú vào state
                setListCategory([{ _id: '', name: 'All' }, ...response.data.categories]);
                setLoading(false);
            }, 2500);
        } catch (error) {
            console.error(error);
        }
    };
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderCategoryItem = ({ item }) => {
        const noteCountInCategory = item._id
            ? listNote.filter(note => note.category?._id === item._id).length
            : listNote.length;

        return (
            <View style={[styles.categoryItem, { backgroundColor: item.color }]}>
                <Text>{item.name} ({noteCountInCategory})</Text>
            </View>
        );
    };
    const suggest = ['Mua sắm', 'Cá Nhân', 'Nhật kí', 'Trường học', 'Học'];
    const selectSuggestion = (suggestion) => {
        setName(suggestion);
    };
    const renderSuggestionItem = ({ item }) => (
        <TouchableOpacity style={styles.button} onPress={() => selectSuggestion(item)}>
            <Text style={{ textAlign: 'center', color: '#AAAAAA', fontSize: 12 }}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {!loading ? (
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Image source={require('../assets/arrow.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 25 }}>Thể loại</Text>
                    </View>
                    <FlatList
                        data={listCategory}
                        keyExtractor={(item) => item._id}
                        renderItem={renderCategoryItem}
                    />
                    <Button title="Thêm danh mục" onPress={toggleModal} />
                    <Modal
                        visible={isModalVisible}
                        animationType="slide"
                        transparent={true}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={{ fontSize: 20, fontWeight: 'normal', textAlign: 'center', marginBottom: 20 }}>Nhập tên danh mục mới</Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={text => setName(text)}
                                    value={name}

                                />
                                <FlatList
                                    data={suggest}
                                    renderItem={renderSuggestionItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    numColumns={3} // Số cột mỗi hàng
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <TouchableOpacity>
                                        <Text style={styles.text}>THÊM VÀO</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={toggleModal}>
                                        <Text style={styles.text}>HỦY BỎ</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </Modal>

                </View>
            ) : (
                <Loading />
            )}
        </View>
    )
}

export default Category

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 40
    },
    categoryItem: {
        marginVertical: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingBottom: 100
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: 320,
        height: 300
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        backgroundColor: '#EEEEEE'

    },
    text: {
        color: '#00CCFF'
        , marginHorizontal: 10
    },
    button: {
        backgroundColor: '#EEEEEE',
        borderRadius: 20,
        padding: 6,
        width: 80,
        margin: 5
    }
})
