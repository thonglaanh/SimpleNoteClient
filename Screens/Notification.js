import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import config from '../config';
import ItemOther from '../items/ItemOther';


const Notification = ({ navigation }) => {
    const [ListNote, setListNote] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchData = async () => {
        try {
            const response = await axios.get(config.API_URL + '/notification');
            setLoading(true);
            setTimeout(() => {
                setListNote(response.data);
                console.log(response.data);
                setLoading(false);
            }, 2500);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <ImageBackground source={require('../assets/background.jpg')} style={styles.container}>
            {!loading ? (
                <View>
                    <View style={{ flexDirection: 'row', marginTop: 45 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Image source={require('../assets/arrow.png')} style={{ width: 28, height: 28, margin: 6, marginRight: 20 }} />
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 28, color: '#000' }}>Notification</Text>
                    </View>
                    <View style={{ backgroundColor: '#FFEFD5', margin: 5, borderRadius: 10, padding: 7, flexDirection: 'row', marginTop: 20 }}>
                        <Image source={require('../assets/promotion.png')} style={{ width: 18, height: 18, marginRight: 5 }} />
                        <Text style={{ color: '#FF8C00', fontSize: 12 }}>Danh sách những việc cần làm đã hết hạn sẽ xuất hiện      tại đây</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        {ListNote.map(item => (
                            <TouchableOpacity
                                key={item._id}
                                onLongPress={() => handleLongPress(item)}>
                                <ItemOther item={item.note} />

                            </TouchableOpacity>
                        ))}
                    </View>
                </View>


            ) : (
                <Loading />
            )}
        </ImageBackground>
    )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#EEEEEE', paddingBottom: 15, paddingHorizontal: 17,

    },
})