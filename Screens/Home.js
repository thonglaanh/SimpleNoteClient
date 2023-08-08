import { StyleSheet, View, TouchableOpacity, Image, TextInput, FlatList, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import LoadingScreen from '../Components/Loading';
import Item from '../items/Item';
import OptionsModal from '../Components/OptionsModal';
import { DrawerActions } from '@react-navigation/native';


const Home = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [listNote, setListNote] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [categoryQuery, setCategoryQuery] = useState();
    const [searchQuery, setSearchQuery] = useState();
    const [account, setAccount] = useState();
    const [time, settime] = useState()
    const [showOption, setshowOption] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})


    //Lấy time hiện tại
    useEffect(() => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        let greeting;
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
                    category: categoryQuery,
                    title: searchQuery,
                },
            });
            setLoading(true);
            setTimeout(() => {
                setAccount(response.data.account);
                setListCategory([{ _id: '', name: 'All' }, ...response.data.categories]);
                setListNote(response.data.notes);
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
        console.log(account);
    }, [listCategory, listNote, account]);

    const renderCategoryItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.categoryItem}
            // onPress={() => searchCategory(item._id)}
            >
                <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
        );
    };
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

    return (
        <View style={{ flex: 1, backgroundColor: '#EEEEEE', paddingBottom: 15, paddingHorizontal: 15 }}>
            {!loading ? (
                <View style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl onRefresh={fetchData} />}>
                        <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#000', marginTop: 45 }}>{time}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', marginRight: 15 }}>
                            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                                <Image source={require('../assets/menu.png')} style={{ width: 35, height: 35, tintColor: '#04D9D9' }} />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                                    <Image source={require('../assets/magnifying-glass.png')} style={{ width: 25, height: 25, marginRight: 20 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                                    <Image source={require('../assets/bell.png')} style={{ width: 25, height: 25 }} />
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
                            <View >
                                {
                                    listNote.filter((_, i) => i % 2 === 0).map(item => <TouchableOpacity onPress={() => {
                                        navigation.navigate('DetailNote', { item: selectedItem, categories: listCategory });
                                        console.log(item);
                                    }}
                                        onLongPress={() => handleLongPress(item)}>
                                        <Item item={item}></Item>
                                    </TouchableOpacity>)
                                }
                            </View>
                            <View >
                                {
                                    listNote.filter((_, i) => i % 2 !== 0).map(item => <TouchableOpacity onPress={() => navigation.navigate('DetailNote', { item: selectedItem, categories: listCategory })} onLongPress={() => handleLongPress(item)}><Item item={item}></Item></TouchableOpacity>)
                                }
                            </View>
                        </View>
                    </ScrollView>
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
                        onPress={() => navigation.navigate('CreateNote')}
                    >
                        <Image source={require('../assets/plus.png')} style={{ width: 30, height: 30, tintColor: 'white' }} />
                    </TouchableOpacity>
                </View>
            ) : (
                <LoadingScreen />
            )}

        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    categoryItem: {
        marginVertical: 15,
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderRadius: 20,
        marginHorizontal: 7,
        backgroundColor: '#DDDDDD'
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
        backgroundColor: '#04D9D9',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});
