import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Image, ImageBackground } from 'react-native';

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home');
        }, 3000)

    }, []);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 0.9,
            duration: 2500,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={styles.container}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <Image
                    source={require('../assets/notes.png')}
                    style={styles.icon}
                    resizeMode='contain'
                />

            </Animated.View >
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 100,
        height: 100,
    },
});

export default Splash;
