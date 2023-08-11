import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Screens/Home';
import Splash from './Screens/Splash'
import Notification from './Screens/Notification';
import CreateNote from './Screens/CreateNote';
import DetailNote from './Screens/DetailNote';
import Category from './Screens/Category';
import Search from './Screens/Search';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Spash' screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: '#F4DFCD', paddingTop: 0 } }} >
        <Drawer.Screen name="Splash" component={Splash} options={{ drawerLabel: () => null }} />
        <Drawer.Screen name="CreateNote" component={CreateNote} options={{ drawerLabel: () => null }} />
        <Drawer.Screen name="Search" component={Search} options={{ drawerLabel: () => null }} />
        <Drawer.Screen name="DetailNote" component={DetailNote} options={{ drawerLabel: () => null }} />
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
                  tintColor: focused ? '#fff' : '#000'
                }}
              ></Image>
            </View>
          ),
          drawerActiveBackgroundColor: '#04D9D9',
        }} />
        <Drawer.Screen name="Notification" component={Notification} options={{
          drawerLabel: ({ focused }) => (
            <View>
              <Text style={{
                fontSize: 16,
                color: focused ? '#fff' : '#000',
                fontStyle: 'italic',
              }}>Thông báo</Text>
            </View>

          ),
          drawerIcon: ({ focused }) => (
            <View>
              <Image source={require('./assets/bell.png')}
                resizeMode='contain'
                style={{
                  width: 25, height: 25,
                  tintColor: focused ? '#fff' : '#000'
                }}
              ></Image>
            </View>
          ),
          drawerActiveBackgroundColor: '#04D9D9',

        }} />
        <Drawer.Screen name="Category" component={Category} options={{
          drawerLabel: ({ focused }) => (
            <View>
              <Text style={{
                fontSize: 16,
                color: focused ? '#fff' : '#000',
                fontStyle: 'italic',
              }}>Danh mục</Text>
            </View>

          ),
          drawerIcon: ({ focused }) => (
            <View>
              <Image source={require('./assets/category.png')}
                resizeMode='contain'
                style={{
                  width: 25, height: 25,
                  tintColor: focused ? '#fff' : '#000'
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
