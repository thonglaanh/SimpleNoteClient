import { StyleSheet, View, TouchableOpacity, Image, TextInput, FlatList, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import Item from '../items/Item';

const Search = ({ route, navigation }) => {
    useEffect(() => {
        setListNote(route.params.item);
        setListCategory(route.params.listCategory);
    }, [route]);

    const [originalListNote, setOriginalListNote] = useState([]);
    const [listNote, setListNote] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery !== '') {
            const filteredNotes = originalListNote.filter(item => {
                return item.title.toLowerCase().includes(searchQuery.toLowerCase());
            });
            setListNote(filteredNotes)
        } else {
            setListNote(route.params.item);
        }

    };
    const handleCancel = () => {
        setSearchQuery('');
        setListNote(originalListNote);
    };

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    useEffect(() => {
        setOriginalListNote(listNote);
    }, [listNote]);


    return (
        <View style={{ flex: 1, backgroundColor: '#EEEEEE', paddingBottom: 15, paddingHorizontal: 17 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#000', marginTop: 45 }}>Search</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginVertical: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Nhập nội dung tìm kiếm..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery !== '' && (
                            <TouchableOpacity onPress={handleCancel}>
                                <Image source={require('../assets/cancel.png')} style={{ width: 20, height: 20, backgroundColor: 'gray', borderRadius: 20, padding: 10 }} />
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={handleSearch}>
                            <Text style={{ color: '#04D9D9' }}>Tìm kiếm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Text style={{ marginLeft: 10, color: 'red' }}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View>
                    {originalListNote.filter((_, i) => i % 2 === 0).map(item => (
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
                    {originalListNote.filter((_, i) => i % 2 !== 0).map(item => (
                        <TouchableOpacity
                            key={item._id}
                            onPress={() => navigation.navigate('DetailNote', { item: item, categories: listCategory })}
                            onLongPress={() => handleLongPress(item)}>
                            <Item item={item} />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

        </View>
    )
}

export default Search;

const styles = StyleSheet.create({
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
        backgroundColor: '#04D9D9',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    selectedCategory: {
        backgroundColor: '#04D9D9',
    },
    selectedCategoryText: {
        color: '#fff',
    },
    searchInput: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
})