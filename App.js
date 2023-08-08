import { Image, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Screens/Home';
import Splash from './Screens/Splash'
import Notification from './Screens/Notification';
import CreateNote from './Screens/CreateNote';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Spash' screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: '#fff', paddingTop: 50 } }} >
        <Drawer.Screen name="Splash" component={Splash} options={{ drawerLabel: () => null }} />
        <Drawer.Screen name="CreateNote" component={CreateNote} options={{ drawerLabel: () => null }} />
        <Drawer.Screen name="Home" component={Home} options={{
          drawerLabel: ({ focused }) => (
            <View>
              <Text style={{
                fontSize: 16,
                color: focused ? '#fff' : '#000',
                fontStyle: 'italic',
              }}>Trang chủ</Text>
            </View>

          ),
          drawerIcon: ({ focused }) => (
            <View>
              <Image source={require('./assets/house.png')}
                resizeMode='contain'
                style={{
                  width: 25, height: 25,
                  tintColor: focused ? '#fff' : 'gray'
                }}
              ></Image>
            </View>
          ),
          drawerActiveBackgroundColor: '#04D9D9',
        }} />
        <Drawer.Screen name="Notification" component={Notification} options={{
          drawerLabel: 'Thông báo',
          drawerLabelStyle: {
            fontSize: 16,
            color: 'gray',
            fontStyle: 'italic',
          },
          drawerIcon: ({ focused }) => (
            <View>
              <Image source={require('./assets/bell.png')}
                resizeMode='contain'
                style={{
                  width: 25, height: 25,
                  tintColor: focused ? '#fff' : 'gray'
                }}
              ></Image>
            </View>
          ),
          drawerActiveBackgroundColor: '#04D9D9',

        }} />

      </Drawer.Navigator>
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
});
