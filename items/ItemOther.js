import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

const ItemOther = (props) => {
    const endDate = new Date(props.item.endDate);
    const hours = endDate.getHours();
    const minutes = endDate.getMinutes();
    const day = endDate.getDate();
    const month = endDate.getMonth();
    const year = endDate.getFullYear();

    const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthsNames[month];
    return (
        <TouchableOpacity>
            <View style={[styles.noteItem, { backgroundColor: props.item.color }, props.item.img ? styles.itemWithImage : styles.itemWithoutImage]}>

                {props.item.img && <Image source={{ uri: props.item.img }} style={styles.noteImage} />}
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={styles.noteTitle}>{props.item.title}</Text>
                    <Text style={styles.noteContent}>{props.item.content}</Text>
                    <Text style={[styles.noteContent, { color: 'gray', fontSize: 10, marginTop: 28 }]}>{monthName}, {day} {year} at {hours}:{minutes}m</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ItemOther;

const styles = StyleSheet.create({
    noteItem: {
        width: 340,
        margin: 3,
        padding: 5,
        borderRadius: 15,
        overflow: 'hidden', // Cắt bỏ nội dung vượt quá kích thước item
        shadowColor: 'gray',
        shadowRadius: 10,
        elevation: 20,
        flexDirection: 'row'
    },
    itemWithImage: {
        maxHeight: 100, // Điều chỉnh chiều cao cho item có ảnh

    },
    itemWithoutImage: {
        maxHeight: 190, // Điều chỉnh chiều cao cho item không có ảnh
    },
    noteImage: {
        width: 90,
        height: 90,
        borderRadius: 10,
    },
    noteTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 2,

    },
    noteContent: {
        fontSize: 12,
        marginBottom: 8,
    },
});
