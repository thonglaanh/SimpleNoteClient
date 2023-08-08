import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

const Item = (props) => {
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
                <View style={{ marginHorizontal: 5 }}>
                    <Text style={styles.noteTitle}>{props.item.title}</Text>
                    <Text style={styles.noteContent}>{props.item.content}</Text>
                    <Text style={[styles.noteContent, { color: 'gray', fontSize: 10 }]}>{monthName}, {day} {year} at {hours}:{minutes}m</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Item;

const styles = StyleSheet.create({
    noteItem: {
        width: 170,
        margin: 3,
        padding: 5,
        borderRadius: 15,
        overflow: 'hidden', // Cắt bỏ nội dung vượt quá kích thước item
        shadowColor: 'gray',
        shadowRadius: 10,
        elevation: 20,


    },
    itemWithImage: {
        maxHeight: 400, // Điều chỉnh chiều cao cho item có ảnh

    },
    itemWithoutImage: {
        maxHeight: 190, // Điều chỉnh chiều cao cho item không có ảnh
    },
    noteImage: {
        width: 160,
        height: 140,
        borderRadius: 10,
    },
    noteTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 10,

    },
    noteContent: {
        fontSize: 12,
        marginBottom: 8
    },
});
