import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Platform, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import config from '../config';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import ColorPickerModal from '../Components/ColorPickerModal';
import DropDownPicker from 'react-native-dropdown-picker';
// import DateTimePicker from 'react-native-modal-datetime-picker';

const CreateNote = ({ navigation, route }) => {
    const { categories } = route.params;
    const [title, settitle] = useState()
    const [content, setcontent] = useState()
    const [img, setimg] = useState()
    const [endDate, setendDate] = useState(new Date());
    const [color, setcolor] = useState('#F4DFCD')
    const [category, setcategory] = useState('')
    //
    const [show, setShow] = useState(false)
    const [showColor, setShowColor] = useState(false);

    const handleSelectColor = (selectedColor) => {
        setcolor(selectedColor);
    };
    const pickImage = async () => {
        await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(res => {
            let { name, size, uri } = res.assets[0];
            let nameParts = name.split('.');
            let fileType = nameParts[nameParts.length - 1];
            var fileToUpload = {
                name: name,
                size: size,
                uri: uri,
                type: "application/" + fileType
            };
            console.log(fileToUpload, '...............file')
            setimg(fileToUpload);
        }).catch((err) => {
            console.log('Error ' + err);
        })
    }
    const postNote = async () => {
        const formData = new FormData();
        formData.append('title', title)
        formData.append('content', content)
        if (img) {
            formData.append('img', img);
        }
        formData.append('color', color)
        formData.append('category', category)
        formData.append('endDate', endDate)
        console.log(formData);
        try {
            console.log(formData);
            await axios.post(config.API_URL + '/note/createNote', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert('Đã thêm 1 ghi chú')
        } catch (error) {
            console.log('Error ' + error);
        }

    }
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(categories);
    }, [route.params])
    return (
        <View style={{ flex: 1, padding: 20, paddingTop: 40, backgroundColor: '#F4DFCD' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    style={styles.backgroundIcon}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Image source={require('../assets/arrow.png')} style={styles.icon}></Image>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={[styles.backgroundIcon, { marginHorizontal: 10 }]}>
                        <Image source={require('../assets/bookmark-white.png')} style={styles.icon}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backgroundIcon} onPress={postNote}>
                        <Image source={require('../assets/check.png')} style={styles.icon}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginTop: 25, marginRight: 40, flexDirection: 'row' }}>
                <Image source={require('../assets/category.png')} style={{ width: 20, height: 20, marginTop: 15 }} />
                <DropDownPicker
                    items={categories.map(category => ({ label: category.name, value: category._id }))}
                    value={category}
                    setValue={setcategory}
                    open={open}
                    setOpen={setOpen}
                    onChangeValue={(value) => { setcategory(value) }}
                    textStyle={{ fontSize: 12 }}
                    style={{ borderRadius: 20, backgroundColor: '#F4DFCD', borderColor: '#F4DFCD', width: 100 }}
                    dropDownContainerStyle={{ width: 150, borderColor: '#fff', borderRadius: 10, marginTop: 5 }}
                />
            </View>
            <TextInput
                style={{ fontSize: 30, fontWeight: 'bold', marginTop: 10, color: '#000' }}
                placeholder="Nhập tiêu đề của bạn"
                placeholderTextColor="gray"
                multiline={true} //
                onChangeText={(txt) => settitle(txt)} />
            <TextInput
                style={{ fontSize: 18, color: '#000', marginTop: 30 }}
                placeholder="Nhập nội dung của bạn"
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={(txt) => setcontent(txt)}
            />
            <View style={{ width: '100%', height: '40%', marginTop: 30 }}>
                {img && <Image source={{ uri: img.uri }} style={{ resizeMode: 'cover', borderRadius: 10, width: '100%', height: '100%' }} />}
            </View>
            <View style={{
                backgroundColor: '#C7EBB3',
                borderRadius: 30,
                height: 60,
                flexDirection: 'row',
                justifyContent: 'space-between', paddingHorizontal: 40,
                paddingVertical: 10,
                top: 100

            }}>

                <TouchableOpacity
                    style={[styles.backgroundIcon, { backgroundColor: 'white', width: 40, height: 40 }]}
                    onPress={() => setShow(true)}
                >
                    <Image source={require('../assets/calendar.png')} style={[styles.icon, { tintColor: 'black' }]} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.backgroundIcon, { backgroundColor: color, width: 40, height: 40 }]}
                    onPress={() => setShowColor(true)}
                >
                    <Image source={require('../assets/palette.png')} style={[styles.icon, { tintColor: 'black' }]}></Image>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.backgroundIcon, { backgroundColor: 'white', width: 40, height: 40 }]}
                    onPress={pickImage}
                >
                    <Image source={require('../assets/insert-picture-icon.png')} style={[styles.icon, { tintColor: 'black' }]}></Image>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.backgroundIcon, { backgroundColor: 'white', width: 40, height: 40 }]}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Image source={require('../assets/send.png')} style={[styles.icon, { tintColor: 'black' }]}></Image>
                </TouchableOpacity>
            </View>
            {
                showColor && (
                    <ColorPickerModal
                        visible={showColor}
                        onSelectColor={handleSelectColor}
                        onClose={() => setShowColor(false)}

                    />
                )

            }
        </View >
    );
};

export default CreateNote;

const styles = StyleSheet.create({
    backgroundIcon: {
        backgroundColor: '#000', borderRadius: 25, width: 50, height: 50, alignItems: 'center', justifyContent: 'center'
    },
    icon: {
        width: 17, height: 17, tintColor: '#fff'

    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },


});
