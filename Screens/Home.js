import { StyleSheet, View, TouchableOpacity, Image, TextInput, FlatList, Text, ScrollView, RefreshControl, Button, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import LoadingScreen from '../Components/Loading';
import Item from '../items/Item';
import OptionsModal from '../Components/OptionsModal';
import { DrawerActions } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import AddCategoryModal from '../Components/AddCategoryModal';

const Home = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [listNote, setListNote] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [itemNotification, setItemNotification] = useState();
    const [searchQuery, setSearchQuery] = useState();
    const [time, settime] = useState()
    const [showOption, setshowOption] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [length, setlength] = useState(0)

    const postNotification = async () => {
        try {
            await axios.post(config.API_URL + '/notification/create', { note: itemNotification }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        } catch (error) {
            console.log('Error ' + error);
        }

    }

    const toggleAddModal = () => {
        setIsAddModalVisible(!isAddModalVisible);
    };


    // Hàm gửi thông báo
    const sendNotification = (note) => {
        console.log(note.title);
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Ghi chú đã hết hạn',
                body: `Ghi chú "${note.title}" đã hết hạn`,
                imgUrl: note.img
            },
            trigger: null, // Gửi ngay lập tức
        });
    };

    useEffect(() => {
        // Khởi tạo expo-notifications khi component được mount
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,

            }),
        });
    }, []);

    useEffect(() => {
        // Kiểm tra và gửi thông báo khi endDate đến thời gian thực
        const checkAndSendNotifications = () => {
            const currentDate = new Date();
            listNote.forEach(note => {
                const endDate = new Date(note.endDate);
                if (Math.abs(endDate.getTime() - currentDate.getTime()) < 500) {
                    console.log(endDate + " --- " + currentDate);
                    console.log("Sending notification for:", note.title);
                    sendNotification(note);
                    setItemNotification(note._id);
                    postNotification();
                }
            });
        };
        // Kiểm tra và gửi thông báo mỗi 1 phút
        const interval = setInterval(() => {
            checkAndSendNotifications();
        }, 1000);
        return () => clearInterval(interval);
    }, [listNote]);


    //Lấy time hiện tại
    useEffect(() => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        if (currentHour >= 5 && currentHour < 12) {
            settime('Chào buổi sáng')
        } else if (currentHour >= 12 && currentHour < 18) {
            settime('Chào buổi chiều')
        } else {
            settime('Chào buổi tối')

        }
    })
    //Lấy data
    const fetchData = async () => {
        try {
            const response = await axios.get(config.API_URL + '/note', {
                params: {
                    category: selectedCategory, // Use selected category here
                    title: searchQuery,
                },
            });
            setLoading(true);
            setTimeout(() => {
                setListCategory([{ _id: '', name: 'All' }, ...response.data.categories]);
                setListNote(response.data.notes);
                setlength(response.data.lengthNote)
                setLoading(false);
            }, 2500);
        } catch (error) {
            console.error(error);
        }
    };
    //
    useEffect(() => {
        fetchData();
    }, []);
    //Log data thôi
    useEffect(() => {
        console.log(listNote);
        console.log(listCategory);
    }, [listCategory, listNote]);

    const [isAllCategorySelected, setIsAllCategorySelected] = useState(true);
    const searchCategory = (item) => {
        setIsAllCategorySelected(item._id === '');
        setSelectedCategory(item._id);
        fetchData();
    };
    const renderCategoryItem = ({ item }) => {
        const isSelected = selectedCategory === item._id;
        const isAllSelected = isAllCategorySelected && item._id === '';
        return (
            <TouchableOpacity
                style={[
                    styles.categoryItem,
                    isSelected || isAllSelected ? styles.selectedCategory : null,
                ]}
                onPress={() => {
                    searchCategory(item);
                }}>
                <Text
                    style={[
                        styles.categoryText,
                        isSelected || isAllSelected ? styles.selectedCategoryText : null,
                    ]}
                >
                    {item.name} {item._id == '' ? `(${length})` : null}
                </Text>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        fetchData();
    }, [selectedCategory]);
    //Xử lý option
    const handleLongPress = (item) => {
        setSelectedItem(item);
        setshowOption(true);
    };
    const handleEdit = () => {
        navigation.navigate('DetailNote', { item: selectedItem, categories: listCategory });
        setshowOption(false);
    };
    const handleView = () => {
        navigation.navigate('DetailNote', { item: selectedItem, categories: listCategory });
        setshowOption(false);
    };
    const handleDelete = async () => {
        try {
            await axios.delete(config.API_URL + '/note/deleteNote/' + selectedItem._id);
            console.log('Success');
            fetchData();

        } catch (error) {
            console.log(error);

        }
        setshowOption(false);
    };
    //

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={styles.container}>
            {!loading ? (
                <View style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl onRefresh={fetchData} />}>
                        <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#000', marginTop: 45 }}>{time}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', marginRight: 10 }}>
                            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                                <Image source={require('../assets/menuuu.png')} style={{ width: 25, height: 25, tintColor: '#5271ff', marginLeft: 10 }} />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Search', { item: listNote, listCategory: listCategory })}>
                                    <Image source={require('../assets/search-interface-symbol.png')} style={{ width: 25, height: 25, marginRight: 25 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                                    <Image source={require('../assets/bell.png')} style={{ width: 26, height: 26, marginRight: 25 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleAddModal}>
                                    <Image source={require('../assets/category.png')} style={{ width: 26, height: 26 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <FlatList
                            data={listCategory}
                            keyExtractor={(item) => item._id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={renderCategoryItem}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                {listNote.filter((_, i) => i % 2 === 0).map(item => (
                                    <TouchableOpacity
                                        key={item._id}
                                        onPress={() => {
                                            navigation.navigate('DetailNote', { item: item, categories: listCategory });
                                            console.log(item);
                                        }}
                                        onLongPress={() => handleLongPress(item)}>
                                        <Item item={item} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View>
                                {listNote.filter((_, i) => i % 2 !== 0).map(item => (
                                    <TouchableOpacity
                                        key={item._id}
                                        onPress={() => navigation.navigate('DetailNote', { item: item, categories: listCategory })}
                                        onLongPress={() => handleLongPress(item)}>
                                        <Item item={item} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                    {/* Các modal */}
                    <AddCategoryModal
                        isVisible={isAddModalVisible}
                        onClose={toggleAddModal}
                    />
                    {showOption && (
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <OptionsModal
                                visible={showOption}
                                conClose={() => setshowOption(false)}
                                onEdit={handleEdit}
                                onView={handleView}
                                onDelete={handleDelete}
                            /></View>
                    )}
                    <TouchableOpacity
                        style={styles.floatingButton}
                        onPress={() => navigation.navigate('CreateNote', { categories: listCategory })}
                    >
                        <Image source={require('../assets/plus.png')} style={{ width: 30, height: 30, tintColor: 'white' }} />
                    </TouchableOpacity>
                </View>
            ) : (
                <LoadingScreen />
            )}
        </ImageBackground>

    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#EEEEEE', paddingBottom: 15, paddingHorizontal: 17
    },
    categoryItem: {
        marginVertical: 15,
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderRadius: 20,
        marginHorizontal: 7,
        backgroundColor: '#DDDDDD',
    },
    categoryText: {
        fontSize: 16,
        color: '#888888',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#5271ff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    selectedCategory: {
        backgroundColor: '#5271ff',
    },
    selectedCategoryText: {
        color: '#fff',
    }

});
